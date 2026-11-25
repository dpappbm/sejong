# Sejong Korean grammar (1A–4B) in Hungarian

All 188 grammar points of the 세종한국어 1A–4B textbooks (2022 edition), explained in Hungarian, with computed conjugation tables, translated examples, pronunciation rules, honorific words and numbers.

Live site: https://dpappbm.github.io/sejong/

Built with [Astro](https://astro.build); GitHub Actions tests every pull request, and tests, builds and publishes every push to `main`. If a check fails, the version published before stays online.

```
npm install
npm run dev      # local preview at http://localhost:4321/sejong/
npm run format   # format the code with Prettier
npm run build    # format check, type check, tests, build and internal link check
npm test         # tests only
```

Content lives in `src/data/`, its logic (conjugation, references) in `src/lib/`, the templates in `src/components/` and `src/pages/`. The tests, including every check of the content, are in `test/`, in the same structure as the files they test.

## Sound files

The Korean texts can be read aloud by a text-to-speech model that runs locally in Docker. The tools, their settings and the reasons behind them are described in [scripts/audio/README.md](scripts/audio/README.md); the generated files in `public/audio/` are not part of the repository. They are stored in a GitHub release: `npm run audio:download` fetches them.
