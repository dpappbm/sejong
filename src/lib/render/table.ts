// The "Képzés" conjugation table of a grammar point: sample words × columns, each cell with its Hungarian line.
import hungarianTables from '../../data/hungarianTables';
import type { ColumnTranslation, NounRow, NounTable, WordTable } from '../../data/types';
import { SAMPLE_WORD_SETS, irregularSampleSet, stemTypeLabel, type Word } from '../conjugation';
import { koreanSpan } from '../html';
import { reportProblem } from '../problems';
import { translatedCell, wordGloss } from '../translations';

const SAMPLE_NOUNS = { vowelEnding: '친구', consonantEnding: '선생님', rieulEnding: '지하철' } as const;
const SAMPLE_NOUN_DESCRIPTIONS = {
  vowelEnding: 'magánhangzóra végződik',
  consonantEnding: 'mássalhangzóra (받침) végződik',
  rieulEnding: 'ㄹ-re végződik',
} as const;

const resolveNounRow = (row: NounRow) =>
  typeof row === 'string' ? { word: SAMPLE_NOUNS[row], description: SAMPLE_NOUN_DESCRIPTIONS[row] } : row;

/** key: "<book>-<lesson>-<point>", the key of the column translations in hungarianTables. */
export function renderConjugationTable(table: WordTable | NounTable | undefined, key: string): string {
  if (!table) return '';
  const columns = table.kind === 'noun' ? table.nounColumns : table.columns;
  const translations = (hungarianTables as Record<string, ColumnTranslation[]>)[key];
  if (!translations) reportProblem(`${key}: no column translations in hungarianTables`);
  else if (translations.length !== columns.length) reportProblem(`${key}: ${columns.length} columns but ${translations.length} column translations`);
  const specs = translations ?? [];
  const head = `<tr><th>Szó</th><th>Típus</th>${columns.map(column => `<th>${column.header}</th>`).join('')}</tr>`;

  if (table.kind === 'noun') {
    const rows = (table.nouns ?? ['vowelEnding', 'consonantEnding']).map(resolveNounRow).map(({ word, description }) =>
      `<tr><td>${koreanSpan(word)}${wordGloss(word, key)}</td><td>${description}</td>${table.nounColumns.map((column, index) =>
        `<td>${translatedCell(column.conjugate(word), word, specs[index], `${key} [${column.header}] ${word}`)}</td>`).join('')}</tr>`);
    return `<div class="table-wrapper"><table class="conjugation-table"><thead>${head}</thead><tbody>${rows.join('')}</tbody></table></div>`;
  }

  const sampleSet = table.sampleSet ?? 'verbsAndAdjectives';
  const regularWords = table.words ?? SAMPLE_WORD_SETS[sampleSet];
  const irregularWords = table.irregularWords ?? irregularSampleSet(sampleSet);
  const cell = (word: Word, index: number) => {
    const column = table.columns[index];
    let form: string | null;
    try {
      form = column.conjugate(word);
    } catch (error) {
      throw new Error(`table function failed for ${word.dictionaryForm} / ${column.header}: ${(error as Error).message}`);
    }
    return translatedCell(form, word.dictionaryForm, specs[index], `${key} [${column.header}] ${word.dictionaryForm}`);
  };
  const wordClassNote = (word: Word) => (word.wordClass === 'adjective' ? ' <small>(mn.)</small>' : word.wordClass === 'verb' ? ' <small>(ige)</small>' : '');
  const row = (word: Word) =>
    `<tr><td>${koreanSpan(word.dictionaryForm)}${wordGloss(word.dictionaryForm, key)}</td><td>${stemTypeLabel(word)}${wordClassNote(word)}</td>${table.columns.map((_column, index) => `<td>${cell(word, index)}</td>`).join('')}</tr>`;
  let body = regularWords.map(row).join('');
  if (irregularWords.length && table.irregular !== false) {
    body += `<tr class="subheading-row"><td colspan="${table.columns.length + 2}">Rendhagyó szavak ugyanezzel a végződéssel</td></tr>`;
    body += irregularWords.map(row).join('');
  }
  return `<div class="table-wrapper"><table class="conjugation-table"><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
}
