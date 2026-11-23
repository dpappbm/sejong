# Korean sound files

Tools that read the Korean texts of the site aloud with a text-to-speech model and save them as MP3. The model is [Supertonic 3](https://huggingface.co/Supertone/supertonic-3); it runs locally in Docker, on the CPU, without an account or a network connection.

The tools are in the repository; **the sound files are not**. They are written to `public/audio/`, which git ignores, so the development server serves them right away at `/sejong/audio/<voice>/<id>.mp3`.

## First run

You need Node (see `engines` in `package.json`), Docker with a running engine, and about 2 GB of free space for the image and the model.

```
npm install
npm run audio:setup                  # build the image, download the model (once, about 400 MB)
npm run audio:collect -- --book 3A   # collect the texts of book 3A
npm run audio:generate               # dry run: how many files are missing
npm run audio:generate -- --write    # generate them
npm run audio:review -- --book 3A    # build the two listening pages
```

Generating takes about 4 seconds per file on a four-core laptop, uses all its cores and about 2 GB of memory (less with `--workers 2`). The run can be stopped at any time: the next one continues with the missing files.

To listen, open `scripts/audio/work/index.html` (every text) or `scripts/audio/work/review.html` (only the files the measurements find suspicious). Both work from the disk, remember your ratings in the browser and copy them with one button.

## What gets a sound file

`collect-texts.mjs` reads the content files of one book:

| File                            | Field                                                                |
| ------------------------------- | -------------------------------------------------------------------- |
| `src/data/books/<book>.ts`      | `examples` (also those of the honorific section)                     |
| `src/data/books/<book>.ts`      | the `exampleList(…)` items of `ownNote`                              |
| `src/data/books/<book>.ts`      | `correct` of `correctIncorrect` (the incorrect samples get no sound) |
| `src/data/vocabulary/<book>.ts` | `textbook` (the `own` words get no sound)                            |
| `src/data/pronunciation.ts`     | `examples` of the lessons of the book                                |

Markup is dropped, and the same text gets one file. Some texts are read differently than written (`spoken-text.mjs`): the speakers of a dialogue (`가:`, `나:`) are left out, and `하나/한` is read as `하나, 한`.

Numbers, Latin letters, parentheses and alternatives inside a phrase are never guessed: `놓고/두고 오다` and `다치다/부상을 당하다` look alike, but share different parts. A text with any of them needs its spoken form in `overrides.json`, otherwise the collector stops and lists the texts:

```json
"spokenForms": {
  "서울에 산 지 5년이 됐어요.": "서울에 산 지 오 년이 됐어요.",
  "한글날 (10. 9.)": "한글날",
  "상을 타다/받다": "상을 타다, 상을 받다"
}
```

## Files

| File                                      | Role                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| `docker.mjs`                              | `audio:setup` and `audio:generate`: runs the container                   |
| `Dockerfile`, `requirements.txt`          | the environment, with exact versions                                     |
| `collect-texts.mjs`                       | `audio:collect`: content files → `work/texts-<book>.json`                |
| `spoken-text.mjs`, `spoken-text.test.mjs` | the spoken form of a text, and its tests (part of `npm test`)            |
| `generate.py`                             | texts → MP3 and manifest                                                 |
| `score.py`                                | measures a take: length, pauses, pitch range                             |
| `profiles.json`                           | speeds and methods of each voice                                         |
| `overrides.json`                          | spoken forms and hand-picked takes                                       |
| `build-review.mjs`                        | `audio:review`: the listening pages                                      |
| `work/`                                   | collected texts and listening pages (ignored by git)                     |
| `public/audio/manifest.json`              | what was generated and how: text, speed, seed, problems (ignored by git) |

The name of a file is the first 12 hexadecimal digits of the SHA-256 of the spoken text (`audioId()`), so a changed text gets a new file.

Options of `npm run audio:generate -- …`:

| Option                    | Meaning                                                     |
| ------------------------- | ----------------------------------------------------------- |
| `--write`                 | generate (without it: only a report)                        |
| `--book 3A`               | the book, default 3A                                        |
| `--voices F1,M4`          | only these voices                                           |
| `--only "나라"`           | only this spoken text                                       |
| `--force`                 | also regenerate existing files                              |
| `--limit 20`              | at most this many files                                     |
| `--workers 4 --threads 2` | processes, and threads of each; the default was the fastest |

## Settings and why

Every text is synthesized several times (5 seeds per speed, 8 steps) and the best take is kept. Four classes by the length of the text, in syllables:

| Class    | Text                                   | F1        | F5        | M4        | M2        |
| -------- | -------------------------------------- | --------- | --------- | --------- | --------- |
| `long`   | 8 or more                              | 0.75      | 0.75      | 0.77      | 0.75      |
| `medium` | 3–7                                    | 0.7       | 0.7       | 0.7       | 0.7       |
| `short`  | 1–2                                    | 1.05, 1.2 | 0.9, 1.05 | 0.9, 1.05 | 0.9, 1.05 |
| `stop`   | 1–2, ending in an unreleased stop (밥) | carrier   | carrier   | carrier   | period    |

They come from listening tests in which every take was rated good, acceptable or bad:

- **Short words need a faster setting.** The model plans about 1.6 seconds even for one syllable. Slowed down, it may say the word twice or stretch it.
- **Sentences: 0.75.** 11 of 12 sentences were rated good at 0.75, 4 of 12 at 0.8 and at 0.85. F5 and M4 sound rushed above that; F1 and M2 bear it better. The take of typical length is kept.
- **Final stops: a carrier sentence.** `밥. 그래요.` is synthesized and cut at the pause: 11 of 24 good, none bad. With a comma or `...` at the end 4 of 24 were good. The carrier starts with ㄱ, because a ㄴ would nasalize the final stop and a vowel would link to it. Without a clear pause the word is read alone (`fallback`).
- **More steps do not help.** 16 steps sound nearly the same as 8 and take twice as long.
- **The measurements only catch failures** (repeated, cut off, rushed). They cannot tell a good take from an acceptable one, and cannot judge the pronunciation. That needs listening.

Silence is trimmed to 50 ms before and 250 ms after the speech, the loudness is evened out, and the result is saved as mono MP3 at 48 kbps.

## Fixing a bad file

1. If the text is read wrongly, give its spoken form in `spokenForms` and run `audio:collect` again.
2. If only the take is bad, set another one for that voice in `takes`, keyed by the spoken text. With `speed` (0.7–2.0, the limits of the package) alone the best of the 5 seeds at that speed is kept; with `seed` exactly that take is used, and the review page no longer calls it suspicious. `method` is `plain`, `period` (both read the text alone) or `carrier`, by default the one of the profile:

   ```json
   "takes": {
     "마크 씨가 요즘 바쁜가 봐요. 연락이 없어요.": { "F5": { "speed": 0.8 } },
     "꽃": { "F1": { "method": "carrier", "speed": 0.8, "seed": 7 } }
   }
   ```

3. Run `npm run audio:generate -- --write`. Only the files whose entry changed are generated again. The file of a text that no longer exists is not deleted.

## Adding a book

Run `audio:collect -- --book 3B`, add the spoken forms it asks for, then `audio:generate -- --book 3B --write`. Files of other books stay.

## Where the sound files come from (planned)

`AUDIO_SOURCE` will decide who fills `public/audio/`: `local` (default, development) uses the files that are there, `release` (GitHub Pages) downloads them from a GitHub release before the build. The address of the files is the same in both cases.

## License

The model weights are under OpenRAIL-M. Its licensor claims no rights in the output, but forbids distributing machine-generated content without saying so: **wherever the sound is published, it has to be marked as a machine voice**. The license text is in the model volume (`/model/LICENSE`). The revision of the model is fixed in `docker.mjs`.
