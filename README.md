# Sejong Korean grammar (1A–4B) in Hungarian

All 188 grammar points of the 세종한국어 1A–4B textbooks (2022 edition), explained in Hungarian, with computed conjugation tables, translated examples, pronunciation rules and honorific words.

Live site: https://dpappbm.github.io/sejong/

Built with [Astro](https://astro.build); every push to `main` is built and published by GitHub Actions.

```
npm install
npm run dev      # local preview at http://localhost:4321/sejong/
npm run format   # format the code with Prettier
npm run build    # format check, type check, tests, build and internal link check
npm test         # tests only
```

Content lives in `src/data/`, rendering and checks in `src/lib/`, pages in `src/pages/`.

## Sound files

The Korean texts can be read aloud by a text-to-speech model that runs locally in Docker. The tools, their settings and the reasons behind them are described in [scripts/audio/README.md](scripts/audio/README.md); the generated files in `public/audio/` are not part of the repository. They are stored in a GitHub release: `npm run audio:download` fetches them.
