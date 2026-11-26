// The rows and the column translations of the "Képzés" conjugation tables (shared by the components and the checks).
import hungarianTables from '../data/hungarianTables';
import type { ColumnTranslation, NounTable, WordColumn, WordTable } from '../data/types';
import {
  SAMPLE_WORD_SETS,
  createWord,
  decomposeSyllable,
  finalIndex,
  irregularSampleSet,
  type Word,
} from './conjugation';
import { lexiconEntry } from './translations';

const SAMPLE_NOUNS = {
  vowelEnding: { word: '친구', description: 'magánhangzóra végződik' },
  consonantEnding: { word: '선생님', description: 'mássalhangzóra (받침) végződik' },
  rieulEnding: { word: '지하철', description: 'ㄹ-re végződik' },
} as const;

/** key: "<book>-<lesson>-<point>" */
export const columnTranslations = (key: string): ColumnTranslation[] | undefined =>
  (hungarianTables as Record<string, ColumnTranslation[]>)[key];

/** The sample-noun description that matches a noun's last syllable. */
function nounEndingDescription(noun: string): string {
  const final = decomposeSyllable(noun.slice(-1)).final;
  if (final === 0) return SAMPLE_NOUNS.vowelEnding.description;
  if (final === finalIndex('ㄹ')) return SAMPLE_NOUNS.rieulEnding.description;
  return SAMPLE_NOUNS.consonantEnding.description;
}

export function nounRows(table: NounTable): { word: string; description: string }[] {
  const rows = (table.nouns ?? ['vowelEnding', 'consonantEnding']).map(row =>
    typeof row === 'string' ? SAMPLE_NOUNS[row] : row
  );
  const listed = new Set(rows.map(row => row.word));
  const additional = (table.additionalNouns ?? [])
    .filter(noun => !listed.has(noun))
    .map(noun => ({ word: noun, description: nounEndingDescription(noun) }));
  return [...rows, ...additional];
}

/** An additional word with its word class from the lexicon. */
function additionalWord(dictionaryForm: string): Word {
  const entry = lexiconEntry(dictionaryForm);
  if (!entry || entry.wordClass === 'noun')
    throw new Error(`additional word without a verb, adjective or existential entry: ${dictionaryForm}`);
  return createWord(dictionaryForm, entry.wordClass);
}

/** Irregular rows hold the irregular stems; ㄹ-stems stay among the regular ones, as in the sample sets. */
const isIrregularRow = (word: Word) => word.irregularity !== '' && word.irregularity !== 'ㄹ';

export function wordRows(table: WordTable): { regular: Word[]; irregular: Word[] } {
  const sampleSet = table.sampleSet ?? 'verbsAndAdjectives';
  const sampleWords = table.words ?? SAMPLE_WORD_SETS[sampleSet];
  const regular =
    table.existential === false ? sampleWords.filter(word => word.wordClass !== 'existential') : sampleWords;
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
