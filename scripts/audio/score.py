"""Measurements and scoring of one take (a mono float array)."""

import re

import numpy as np

HOP, WINDOW = 0.0025, 0.005
# Final consonants pronounced as an unreleased stop (index of the syllable's final in its Unicode code point).
STOP_FINALS = {1, 2, 3, 7, 9, 14, 17, 18, 19, 20, 22, 23, 24, 25, 26}


def syllable_count(text):
    return len(re.findall("[가-힣]", text))


def length_class(text):
    """The class of a spoken text in profiles.json: short, stop, medium or long."""
    syllables = syllable_count(text)
    if syllables >= 8:
        return "long"
    if syllables >= 3:
        return "medium"
    last = re.findall("[가-힣]", text)[-1]
    is_stop = (ord(last) - 0xAC00) % 28 in STOP_FINALS
    return "stop" if is_stop and not re.search("[ ,]", text) else "short"


def target_length(text, factor):
    """Expected seconds of speech; an unreleased final stop cuts the last syllable short."""
    seconds = 0.15 + 0.17 * syllable_count(text)
    return (seconds - (0.1 if length_class(text) == "stop" else 0)) * factor


def levels(x, rate):
    """Level of each 5 ms frame in dB relative to the loudest frame."""
    hop, window = int(HOP * rate), int(WINDOW * rate)
    power = np.cumsum(np.concatenate([[0.0], x.astype(np.float64) ** 2]))
    starts = np.arange(0, len(x) - window, hop)
    rms = np.sqrt(np.maximum(power[starts + window] - power[starts], 0) / window)
    return 20 * np.log10(np.maximum(rms, 1e-7) / rms.max())


def segments(x, rate, min_gap):
    """(start, end) of the sounding parts separated by at least `min_gap` seconds below -38 dB; breath and noise dropped."""
    db = levels(x, rate)
    loud = np.flatnonzero(db > -38)
    parts, start = [], loud[0]
    for a, b in zip(loud[:-1], loud[1:]):
        if (b - a) * HOP >= min_gap:
            parts.append((start, a))
            start = b
    parts.append((start, loud[-1]))
    return [(a * HOP, b * HOP + WINDOW) for a, b in parts if db[a : b + 1].max() > -20]


def pitch(x, rate):
    """Pitch in semitones relative to the take's own median, NaN where unvoiced."""
    step = max(1, round(rate / 16000))
    if step > 1:
        kernel = np.hanning(2 * step + 1)
        x = np.convolve(x, kernel / kernel.sum(), "same")[::step]
        rate = rate / step
    size, hop = int(0.04 * rate), int(0.01 * rate)
    window = np.hanning(size)
    bias = np.fft.irfft(np.abs(np.fft.rfft(window, 4096)) ** 2)[:size]
    bias = np.maximum(bias / bias[0], 0.05)
    frames = range(0, len(x) - size, hop)
    energy = np.array([np.sqrt(np.mean(x[i : i + size] ** 2)) for i in frames])
    hz = []
    for k, i in enumerate(frames):
        if energy[k] < energy.max() * 0.06:
            hz.append(np.nan)
            continue
        frame = (x[i : i + size] - x[i : i + size].mean()) * window
        auto = np.fft.irfft(np.abs(np.fft.rfft(frame, 4096)) ** 2)[:size]
        auto = auto / max(auto[0], 1e-12) / bias
        low, high = int(rate / 400), int(rate / 70)
        peak = low + int(np.argmax(auto[low:high]))
        hz.append(rate / peak if auto[peak] > 0.6 else np.nan)
    hz = np.array(hz)
    if np.isnan(hz).all():
        return hz
    median = np.nanmedian(hz)
    hz[(hz < median * 0.55) | (hz > median * 1.9)] = np.nan
    return 12 * np.log2(hz / median)


def measure(x, rate):
    parts = segments(x, rate, 0.15)
    semitones = pitch(x, rate)
    semitones = semitones[~np.isnan(semitones)]
    span = float(np.percentile(semitones, 95) - np.percentile(semitones, 5)) if len(semitones) >= 5 else 0.0
    return dict(
        length=parts[-1][1] - parts[0][0],
        parts=len(parts),
        fine_parts=len(segments(x, rate, 0.06)),
        span=span,
    )


def problems(m, text, factor):
    """What is suspicious about a take."""
    syllables, kind = syllable_count(text), length_class(text)
    found = []
    ratio = m["length"] / target_length(text, factor)
    if syllables == 1:
        if m["length"] > (0.42 if kind == "stop" else 0.35):
            found.append("long or repeated")
        if m["length"] < (0.1 if kind == "stop" else 0.18):
            found.append("cut off")
    elif ratio < (0.7 if kind == "long" else 0.8):
        found.append("fast")
    elif ratio > (1.4 if kind == "long" else 1.2):
        found.append("slow")
    if not re.search("[ ,]", text) and (m["parts"] > 1 or (syllables == 1 and m["fine_parts"] > 1)):
        found.append("extra sound")
    return found


def score(m, text, factor):
    """Smaller is better."""
    tempo = abs(np.log(m["length"] / target_length(text, factor)))
    if syllable_count(text) == 1 and length_class(text) != "stop":
        tempo = 0.0
    return 10 * len(problems(m, text, factor)) + tempo * 4 + m["span"] / 4
