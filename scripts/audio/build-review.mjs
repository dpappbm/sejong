// Builds three local pages from the generated sound files in scripts/audio/work/: index.html with every text of the
// book, review.html with the takes the measurements find suspicious, and pronunciation.html with the examples of the
// pronunciation boxes, which have to be said exactly as the book expects. Not part of the site.
// Usage: npm run audio:review -- --book 3A
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

const { values: options } = parseArgs({ options: { book: { type: 'string', default: '3A' } } });
const { book } = options;
const directory = new URL('./', import.meta.url);
const audio = new URL('../../public/audio/', directory);
const read = url => JSON.parse(readFileSync(url, 'utf8'));
const texts = read(new URL(`work/texts-${book}.json`, directory));
const manifest = read(new URL('manifest.json', audio));
const { voices } = read(new URL('profiles.json', directory));

const SOURCES = {
  example: 'példa',
  ownNote: 'saját kiegészítés',
  correct: 'korrekt',
  vocabulary: 'szókincs',
  pronunciation: 'kiejtés',
};
const PROBLEMS = {
  'fast': 'gyors',
  'slow': 'lassú',
  'long or repeated': 'hosszú vagy ismétel',
  'cut off': 'csonka',
  'extra sound': 'fölös hang',
};
const RATINGS = [
  ['good', 'Jó'],
  ['ok', 'Elmegy'],
  ['bad', 'Rossz'],
];
const escape = text => text.replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`);

/** Why a take deserves a listen (empty: nothing found). A take picked by its seed has been listened to. */
function suspicions(entry) {
  if (entry.peak < 0.05) return ['néma'];
  if (entry.override?.seed) return [];
  const found = entry.problems.map(problem => PROBLEMS[problem] ?? problem);
  if (entry.fallback) found.push('tartalék módszer');
  else if (entry.usable / entry.takes < 0.3 && !entry.problems.length)
    found.push(`kevés jó próba (${entry.usable}/${entry.takes})`);
  return found;
}

const missing = [];
const cells = new Map();
for (const voice of Object.keys(voices)) {
  for (const text of texts) {
    const entry = manifest[voice]?.[text.id];
    if (!entry || !existsSync(new URL(`${voice}/${text.id}.mp3`, audio))) missing.push(`${voice}: ${text.spoken}`);
    else cells.set(`${voice}-${text.id}`, { ...entry, suspicions: suspicions(entry) });
  }
}

const play = (voice, text) =>
  `<button class="play" data-src="../../../public/audio/${voice}/${text.id}.mp3" aria-label="${escape(text.spoken)} – ${voice}">▶ ${voice}</button>`;
const rate = (voice, text) => {
  const key = `${voice}-${text.id}`;
  return `<div class="rating">${RATINGS.map(
    ([value, label]) =>
      `<button class="rate" data-key="${key}" data-value="${value}" aria-pressed="false">${label}</button>`
  ).join(
    ''
  )}<input class="note" id="note-${key}" data-key="${key}" placeholder="megjegyzés" aria-label="Megjegyzés"></div>`;
};
const cell = (voice, text) => {
  const entry = cells.get(`${voice}-${text.id}`);
  if (!entry) return '<td class="none">nincs</td>';
  return `<td>${play(voice, text)}${entry.suspicions.length ? `<small>${entry.suspicions.join(', ')}</small>` : ''}${rate(voice, text)}</td>`;
};
const heading = text => {
  const use = text.uses[0];
  const read = text.uses.every(({ text: shown }) => shown === text.spoken)
    ? ''
    : `<div class="meta">felolvasva: ${escape(text.spoken)}</div>`;
  const expected = text.uses.find(({ pronunciation }) => pronunciation)?.pronunciation;
  return `<th><span lang="ko">${escape(use.text)}</span><div class="meta">${escape(use.hungarian)}</div>${read}${
    expected ? `<div class="meta">elvárt kiejtés: <span lang="ko">[${escape(expected)}]</span></div>` : ''
  }<div class="meta">${[...new Set(text.uses.map(({ lesson, source }) => `${lesson}. lecke, ${SOURCES[source]}`))].join('; ')}</div></th>`;
};
const row = (text, only) =>
  `<tr>${heading(text)}${Object.keys(voices)
    .map(voice => (only?.(voice) === false ? '<td></td>' : cell(voice, text)))
    .join('')}</tr>`;
const table = rows =>
  `<div class="scroll"><table><thead><tr><th>Szöveg</th>${Object.keys(voices)
    .map(voice => `<th>${voice}</th>`)
    .join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;

const style = `
:root{--bg:#f6f8f9;--panel:#fff;--fg:#17242b;--muted:#5a6b74;--line:#d5dee3;--accent:#0b6b76;--on-accent:#fff;--good:#2f7d4f;--ok:#8a6a12;--bad:#b3382c}
@media(prefers-color-scheme:dark){:root{--bg:#10191d;--panel:#182429;--fg:#e4edf0;--muted:#9ab0b9;--line:#2d3e46;--accent:#5fc3ce;--on-accent:#0c2428;--good:#3d8a5b;--ok:#94731c;--bad:#cf5a4b;color-scheme:dark}}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.45 system-ui,"Malgun Gothic",sans-serif}
main{max-width:1280px;margin:auto;padding:20px 16px 90px;display:grid;gap:20px}h1,h2,p{margin:0}section{background:var(--panel);border:1px solid var(--line);padding:14px;min-width:0}
.scroll{overflow-x:auto;margin-top:8px}table{border-collapse:collapse;width:100%}th,td{text-align:left;vertical-align:top;padding:8px 10px;border-top:1px solid var(--line);font-weight:400}thead th{border:0;color:var(--muted)}tbody th{min-width:230px;font-size:1.05rem}
.meta,small{color:var(--muted);font-size:.8rem}small{display:block;color:var(--bad)}.none{color:var(--muted)}
button{font:inherit;cursor:pointer}.play{border:2px solid var(--accent);background:none;color:var(--accent);border-radius:20px;padding:6px 14px}.play.playing{background:var(--accent);color:var(--on-accent)}
.rating{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}.rate{border:1px solid var(--line);background:none;color:inherit;font-size:.78rem;padding:2px 7px}.rate[aria-pressed=true]{color:#fff}.rate[data-value=good][aria-pressed=true]{background:var(--good)}.rate[data-value=ok][aria-pressed=true]{background:var(--ok)}.rate[data-value=bad][aria-pressed=true]{background:var(--bad)}
.note{font:inherit;font-size:.78rem;padding:2px 5px;width:130px;border:1px solid var(--line);background:var(--bg);color:inherit}button:focus-visible,input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.bar{position:fixed;inset:auto 0 0;background:var(--panel);border-top:1px solid var(--line);padding:10px 16px;display:flex;gap:12px;align-items:center;justify-content:center}.bar button{background:var(--accent);color:var(--on-accent);padding:8px 16px;border:0}`;

const script = `
const names = ${JSON.stringify(Object.fromEntries(texts.map(text => [text.id, text.spoken])))};
const labels = ${JSON.stringify(Object.fromEntries(RATINGS.map(([value, label]) => [value, label.toLowerCase()])))};
const storageKey = 'audio-review-${book}';
const audio = new Audio();
let current;
let saved = {};
try { saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}'); } catch {}
const status = document.getElementById('status');
const rated = () => Object.entries(saved).filter(([, entry]) => entry.rating || entry.note);
const stop = () => { audio.pause(); current?.classList.remove('playing'); current = null; };
audio.onended = stop;
const show = () => {
  for (const button of document.querySelectorAll('.rate')) button.setAttribute('aria-pressed', String(saved[button.dataset.key]?.rating === button.dataset.value));
  status.textContent = rated().length + ' értékelve';
};
const store = () => { try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch {} show(); };
for (const input of document.querySelectorAll('.note')) input.value = saved[input.dataset.key]?.note ?? '';
show();
document.addEventListener('input', event => {
  if (!event.target.matches('.note')) return;
  (saved[event.target.dataset.key] ??= {}).note = event.target.value;
  store();
});
const report = () => rated().map(([key, entry]) => {
  const [voice, id] = key.split('-');
  return [names[id] ?? id, voice, labels[entry.rating] ?? '', entry.note ?? ''].filter(Boolean).join(' | ');
}).join('\\n');
const copy = async text => {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  const area = document.createElement('textarea');
  area.value = text;
  document.body.append(area);
  area.select();
  const copied = document.execCommand('copy');
  area.remove();
  return copied;
};
document.addEventListener('click', async event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.matches('.play')) {
    const same = button === current;
    stop();
    if (same) return;
    current = button;
    button.classList.add('playing');
    audio.src = button.dataset.src;
    audio.play().catch(() => button.classList.remove('playing'));
  } else if (button.matches('.rate')) {
    const entry = (saved[button.dataset.key] ??= {});
    entry.rating = entry.rating === button.dataset.value ? undefined : button.dataset.value;
    store();
  } else if (button.id === 'copy') {
    status.textContent = (await copy(report())) ? 'Másolva' : 'A másolás nem sikerült';
  }
});`;

const page = (title, intro, content) =>
  `<!doctype html><html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>${style}</style></head><body><main><header><h1>${title}</h1><p>${intro}</p></header>${content}</main><div class="bar"><button id="copy">Jegyzet másolása</button><span id="status" role="status"></span></div><script>${script}</script></body></html>`;

const lessons = [...new Set(texts.map(text => text.uses[0].lesson))].sort((a, b) => a - b);
const sections = lessons
  .map(
    lesson =>
      `<section><h2>${lesson}. lecke</h2>${table(texts.filter(text => text.uses[0].lesson === lesson).map(text => row(text)))}</section>`
  )
  .join('');
writeFileSync(
  new URL('work/index.html', directory),
  page(
    `${book} hangfájlok`,
    `Gépi hang (Supertonic 3). ${texts.length} szöveg, ${Object.keys(voices).length} hang.`,
    sections
  )
);

const isSuspicious = (voice, text) => (cells.get(`${voice}-${text.id}`)?.suspicions.length ?? 0) > 0;
const suspicious = texts.filter(text => Object.keys(voices).some(voice => isSuspicious(voice, text)));
writeFileSync(
  new URL('work/review.html', directory),
  page(
    `${book} gyanús hangfájlok`,
    'Csak azok, amelyeknél a mérés gondot talált. Az ok a lejátszó alatt pirossal olvasható.',
    `<section>${table(suspicious.map(text => row(text, voice => isSuspicious(voice, text))))}</section>`
  )
);

const isPronunciation = text => text.uses.some(({ source }) => source === 'pronunciation');
writeFileSync(
  new URL('work/pronunciation.html', directory),
  page(
    `${book} kiejtés-példák`,
    'A szöveg alatt az elvárt kiejtés. Rossz az a hang, amelyik mást mond: az oldalon annál a hangnál nem lesz gomb.',
    `<section>${table(texts.filter(isPronunciation).map(text => row(text)))}</section>`
  )
);

const counts = {};
for (const [key, entry] of cells) {
  const voice = key.split('-')[0];
  counts[voice] ??= { files: 0, suspicious: 0, megabytes: 0 };
  counts[voice].files += 1;
  counts[voice].suspicious += entry.suspicions.length ? 1 : 0;
  counts[voice].megabytes += entry.bytes / 1e6;
}
for (const [voice, { files, suspicious: flagged, megabytes }] of Object.entries(counts))
  console.log(`${voice}: ${files} files, ${megabytes.toFixed(1)} MB, ${flagged} suspicious`);
if (missing.length) console.log(`${missing.length} files are missing`);
