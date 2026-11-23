"""Generates the missing sound files of one book (runs in the container, see docker.mjs and README.md).

Reads /work/texts-<book>.json, profiles.json and overrides.json; writes /audio/<voice>/<id>.mp3 and /audio/manifest.json.
Without --write it only reports what is missing.
"""

import argparse
import json
import multiprocessing
import os
import subprocess
import time

import numpy as np

from score import length_class, levels, measure, problems, score, segments

SCRIPTS = os.path.dirname(os.path.abspath(__file__))
MODEL, AUDIO, WORK = "/model", "/audio", "/work"
MANIFEST = f"{AUDIO}/manifest.json"

with open(f"{SCRIPTS}/profiles.json", encoding="utf-8") as file:
    PROFILES = json.load(file)
with open(f"{SCRIPTS}/overrides.json", encoding="utf-8") as file:
    TAKES = json.load(file)["takes"]

# Filled in each worker process by start_worker().
tts = None
styles = {}
carrier_lengths = {}


def start_worker(threads):
    global tts
    from supertonic import TTS

    tts = TTS(model_dir=MODEL, auto_download=False, intra_op_num_threads=threads, inter_op_num_threads=1)


def synthesize(text, voice, speed, seed):
    if voice not in styles:
        styles[voice] = tts.get_voice_style(voice_name=voice)
    np.random.seed(seed)
    wav, _ = tts.synthesize(text, voice_style=styles[voice], lang="ko", speed=speed, total_steps=PROFILES["steps"])
    return np.asarray(wav).reshape(-1).astype(np.float64)


def cut_carrier(x, voice, speed):
    """The samples up to the carrier sentence, or None when there is no clear pause before it."""
    rate = tts.sample_rate
    if (voice, speed) not in carrier_lengths:
        parts = segments(synthesize(PROFILES["carrier"], voice, speed, 1), rate, 0.12)
        carrier_lengths[voice, speed] = parts[-1][1] - parts[0][0]
    parts = segments(x, rate, 0.12)
    if len(parts) < 2 or not 0.6 <= (parts[-1][1] - parts[-1][0]) / carrier_lengths[voice, speed] <= 1.6:
        return None
    # the pause may hold an intake of breath, so stop shortly after the text
    return x[: int(min(parts[-1][0] - 0.03, parts[-2][1] + 0.2) * rate)]


def make_takes(text, voice, method, speeds, seeds, factor):
    """All usable takes of a text with one method."""
    takes = []
    for speed in speeds:
        for seed in seeds:
            if method == "carrier":
                x = cut_carrier(synthesize(f"{text.rstrip('.')}. {PROFILES['carrier']}", voice, speed, seed), voice, speed)
                if x is None:
                    continue
            else:
                x = synthesize(text, voice, speed, seed)  # the package adds the final period
            m = measure(x, tts.sample_rate)
            takes.append(dict(x=x, speed=speed, seed=seed, problems=problems(m, text, factor), score=score(m, text, factor), **m))
    return takes


def choose(takes, kind):
    """Sentences: the take of typical length; words: the best score."""
    if kind != "long":
        return min(takes, key=lambda take: take["score"])
    clean = [take for take in takes if not take["problems"]] or takes
    median = np.median([take["length"] for take in clean])
    return min(clean, key=lambda take: abs(take["length"] - median))


def finish(x):
    """Trims the silence, fades out and evens out the loudness."""
    rate = tts.sample_rate
    voiced = np.flatnonzero(levels(x, rate) > -45) * 0.0025
    end = int((voiced[-1] + 0.255) * rate)
    y = x[max(0, int((voiced[0] - 0.05) * rate)) : end].copy()
    fade = int(0.02 * rate)
    y[-fade:] *= np.linspace(1, 0, fade)
    y = np.concatenate([y, np.zeros(max(0, end - len(x)))])
    hop, window = int(0.0025 * rate), int(0.005 * rate)
    loud = np.flatnonzero(levels(y, rate) > -30)
    rms = np.sqrt(np.mean([np.mean(y[f * hop : f * hop + window] ** 2) for f in loud]))
    return y * min(10 ** (-20 / 20) / rms, 10 ** (-1.5 / 20) / np.abs(y).max())


def save(y, path):
    """Writes the MP3 under a temporary name first, so that an interrupted run leaves no half file."""
    temporary = f"/tmp/{os.getpid()}"
    tts.save_audio(y.astype(np.float32), f"{temporary}.wav")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    part = f"{path}.{os.getpid()}.part"
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", f"{temporary}.wav", "-ac", "1", "-b:a", "48k", "-f", "mp3", part], check=True
    )
    os.replace(part, path)


def generate(job):
    voice, audio_id, text = job
    kind = length_class(text)
    profile = PROFILES["voices"][voice][kind]
    factor = profile["length"]
    override = TAKES.get(text, {}).get(voice)
    started = time.time()
    if override:
        method, speeds, seeds = override["method"], [override["speed"]], [override["seed"]]
    else:
        method, speeds, seeds = profile["method"], profile["speeds"], range(1, PROFILES["seeds"] + 1)
    takes = make_takes(text, voice, method, speeds, seeds, factor)
    fallback = False
    if not takes:
        if override:
            raise RuntimeError(f"{voice} {text}: the take in overrides.json cannot be cut")
        fallback, method = True, PROFILES["fallback"]["method"]
        takes = make_takes(text, voice, method, PROFILES["fallback"]["speeds"], seeds, factor)
    best = choose(takes, kind)
    y = finish(best["x"])
    path = f"{AUDIO}/{voice}/{audio_id}.mp3"
    save(y, path)
    return voice, audio_id, dict(
        text=text,
        kind=kind,
        method=method,
        speed=best["speed"],
        seed=best["seed"],
        override=override,
        fallback=fallback,
        seconds=round(len(y) / tts.sample_rate, 2),
        speech=round(best["length"], 2),
        span=round(best["span"], 1),
        peak=round(float(np.abs(y).max()), 3),
        problems=best["problems"],
        usable=sum(not take["problems"] for take in takes),
        takes=len(takes),
        bytes=os.path.getsize(path),
        cost=round(time.time() - started, 1),
    )


def write_manifest(manifest):
    with open(f"{MANIFEST}.part", "w", encoding="utf-8") as file:
        json.dump(manifest, file, ensure_ascii=False, indent=1)
    os.replace(f"{MANIFEST}.part", MANIFEST)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", default="3A")
    parser.add_argument("--voices", default=",".join(PROFILES["voices"]))
    parser.add_argument("--only", help="only this spoken text")
    parser.add_argument("--force", action="store_true", help="also regenerate existing files")
    parser.add_argument("--limit", type=int, help="at most this many files")
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--threads", type=int, default=2, help="threads per worker")
    parser.add_argument("--write", action="store_true", help="generate the files (default: only report)")
    options = parser.parse_args()

    with open(f"{WORK}/texts-{options.book}.json", encoding="utf-8") as file:
        texts = json.load(file)
    manifest = {}
    if os.path.exists(MANIFEST):
        with open(MANIFEST, encoding="utf-8") as file:
            manifest = json.load(file)

    def is_done(voice, text):
        entry = manifest.get(voice, {}).get(text["id"])
        # a new or changed entry in overrides.json makes the file outdated
        return (
            entry is not None
            and entry["override"] == TAKES.get(text["spoken"], {}).get(voice)
            and os.path.exists(f"{AUDIO}/{voice}/{text['id']}.mp3")
        )

    jobs = []
    for voice in options.voices.split(","):
        selected = [text for text in texts if options.only in (None, text["spoken"])]
        missing = [text for text in selected if options.force or not is_done(voice, text)]
        print(f"{voice}: {len(selected)} texts, {len(selected) - len(missing)} done, {len(missing)} to generate", flush=True)
        jobs += [(voice, text["id"], text["spoken"]) for text in missing]
    jobs = jobs[: options.limit]
    if not options.write or not jobs:
        print("Nothing written." + (" Add --write to generate." if jobs else ""))
        return

    started = time.time()
    with multiprocessing.get_context("spawn").Pool(options.workers, start_worker, (options.threads,)) as pool:
        for done, (voice, audio_id, entry) in enumerate(pool.imap_unordered(generate, jobs), 1):
            manifest.setdefault(voice, {})[audio_id] = entry
            write_manifest(manifest)  # after every file, so that an interrupted run loses nothing
            if done % 20 == 0 or done == len(jobs):
                elapsed = time.time() - started
                print(f"{done}/{len(jobs)}  {elapsed / 60:.1f} min, {elapsed / done * (len(jobs) - done) / 60:.0f} min left", flush=True)


if __name__ == "__main__":
    main()
