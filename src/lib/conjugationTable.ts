// The rows and the column translations of the "Képzés" conjugation tables (shared by the components and the checks).
import hungarianTables from '../data/hungarianTables';
import type { ColumnTranslation, NounTable, WordColumn, WordTable } from '../data/types';
import { SAMPLE_WORD_SETS, createWord, irregularSampleSet, type Word } from './conjugation';
import { lexiconEntry } from './translations';

const SAMPLE_NOUNS = {
  vowelEnding: { word: '친구', description: 'magánhangzóra végződik' },
  consonantEnding: { word: '선생님', description: 'mássalhangzóra (받침) végződik' },
  rieulEnding: { word: '지하철', description: 'ㄹ-re végződik' },
} as const;

/** key: "<book>-<lesson>-<point>" */
export const columnTranslations = (key: string): ColumnTranslation[] | undefined =>
  (hungarianTables as Record<string, ColumnTranslation[]>)[key];

export const nounRows = (table: NounTable): { word: string; description: string }[] =>
  (table.nouns ?? ['vowelEnding', 'consonantEnding']).map(row => (typeof row === 'string' ? SAMPLE_NOUNS[row] : row));

/** An additional word with its word class from the lexicon. */
function additionalWord(dictionaryForm: string): Word {
  const entry = lexiconEntry(dictionaryForm);
  if (!entry || entry.wordClass === 'noun')
    throw new Error(`additional word without a verb or adjective entry: ${dictionaryForm}`);
  return createWord(dictionaryForm, entry.wordClass);
}

/** Irregular rows hold the irregular stems; ㄹ-stems stay among the regular ones, as in the sample sets. */
const isIrregularRow = (word: Word) => word.irregularity !== '' && word.irregularity !== 'ㄹ';

export function wordRows(table: WordTable): { regular: Word[]; irregular: Word[] } {
  const sampleSet = table.sampleSet ?? 'verbsAndAdjectives';
  const regular = table.words ?? SAMPLE_WORD_SETS[sampleSet];
  const irregular = table.irregular === false ? [] : (table.irregularWords ?? irregularSampleSet(sampleSet));
  const listed = new Set([...regular, ...irregular].map(word => word.dictionaryForm));
  const additional = (table.additionalWords ?? []).filter(form => !listed.has(form)).map(additionalWord);
  if (table.irregular === false) return { regular: [...regular, ...additional], irregular };
  return {
    regular: [...regular, ...additional.filter(word => !isIrregularRow(word))],
    irregular: [...irregular, ...additional.filter(isIrregularRow)],
  };
}

export function conjugatedForm(column: WordColumn, word: Word): string | null {
  try {
    return column.conjugate(word);
  } catch (error) {
    throw new Error(`table function failed for ${word.dictionaryForm} / ${column.header}: ${(error as Error).message}`);
  }
}
