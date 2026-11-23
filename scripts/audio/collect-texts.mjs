// Collects the Korean texts that get a sound file, from the content files of one book:
// the examples, the example lists of the own notes and the correct samples of the grammar points, the textbook
// vocabulary and the examples of the pronunciation boxes. Writes scripts/audio/work/texts-<book>.json.
// Usage: npm run audio:collect -- --book 3A
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { runnerImport } from 'vite';
import { audioId, plainText, spokenText } from './spoken-text.mjs';

const directory = new URL('./', import.meta.url);
const { values: options } = parseArgs({ options: { book: { type: 'string', default: '3A' } } });
const { book } = options;

const load = async path =>
  (await runnerImport(path, { root: process.cwd(), configFile: false, logLevel: 'error' })).module;
const { BOOK_DATA } = await load('/src/lib/content.ts');
const { default: vocabulary } = await load('/src/data/vocabulary/index.ts');
const { default: pronunciation } = await load('/src/data/pronunciation.ts');
const { spokenForms } = JSON.parse(readFileSync(new URL('overrides.json', directory), 'utf8'));

if (!BOOK_DATA[book]) throw new Error(`Unknown book: ${book}`);

/** The items of the example lists (exampleList() in src/lib/html.ts) of an own note. */
function exampleListItems(html) {
  return [...html.matchAll(/<ul class="examples">(.*?)<\/ul>/gs)].flatMap(([, list]) =>
    [
      ...list.matchAll(/<li><span class="korean">(.*?)<\/span><span class="hungarian">(.*?)<\/span>(?=<span|<\/li>)/gs),
    ].map(([, korean, hungarian]) => [korean, hungarian])
  );
}

const entries = [];
const add = (source, lesson, korean, hungarian, pronunciationText) =>
  entries.push({
    source,
    lesson,
    text: plainText(korean),
    hungarian: plainText(hungarian ?? ''),
    ...(pronunciationText?.length ? { pronunciation: [pronunciationText].flat().join(' → ') } : {}),
    korean,
  });

for (const point of BOOK_DATA[book].points) {
  const examples = [...(point.examples ?? []), ...(point.honorific?.examples ?? [])];
  for (const [korean, hungarian] of examples) add('example', point.lesson, korean, hungarian);
  for (const [korean, hungarian] of exampleListItems(point.ownNote ?? ''))
    add('ownNote', point.lesson, korean, hungarian);
  for (const sample of [...(point.correctIncorrect ?? []), ...(point.honorific?.correctIncorrect ?? [])])
    if ('correct' in sample) add('correct', point.lesson, sample.correct, sample.translation);
}
for (const lesson of Object.keys(BOOK_DATA[book].lessons).map(Number)) {
  for (const [korean, hungarian] of vocabulary[`${book}-${lesson}`]?.textbook ?? [])
    add('vocabulary', lesson, korean, hungarian);
  for (const [korean, expected, hungarian] of pronunciation.lessons[`${book}-${lesson}`]?.examples ?? [])
    add('pronunciation', lesson, korean, hungarian, expected);
}

const problems = [];
const texts = new Map();
for (const { korean, ...entry } of entries) {
  try {
    const spoken = spokenText(korean, spokenForms);
    const id = audioId(spoken);
    if (!texts.has(id)) texts.set(id, { id, spoken, uses: [] });
    if (texts.get(id).spoken !== spoken)
      throw new Error(`File name collision: "${texts.get(id).spoken}" and "${spoken}"`);
    texts.get(id).uses.push(entry);
  } catch (error) {
    problems.push(error.message);
  }
}
if (problems.length) {
  console.error([...new Set(problems)].join('\n'));
  process.exit(1);
}

const output = new URL(`work/texts-${book}.json`, directory);
mkdirSync(new URL('work/', directory), { recursive: true });
writeFileSync(output, JSON.stringify([...texts.values()], null, 1) + '\n');

const counts = {};
for (const { source } of entries) counts[source] = (counts[source] ?? 0) + 1;
console.log(
  `${book}: ${entries.length} texts (${Object.entries(counts)
    .map(([source, count]) => `${source} ${count}`)
    .join(', ')}), ${texts.size} different spoken texts`
);
