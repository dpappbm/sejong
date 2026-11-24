// The rows and the column translations of the "Képzés" conjugation tables (shared by the components and the checks).
import hungarianTables from '../data/hungarianTables';
import type { ColumnTranslation, NounTable, WordColumn, WordTable } from '../data/types';
import { SAMPLE_WORD_SETS, irregularSampleSet, type Word } from './conjugation';

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

export function wordRows(table: WordTable): { regular: Word[]; irregular: Word[] } {
  const sampleSet = table.sampleSet ?? 'verbsAndAdjectives';
  return {
    regular: table.words ?? SAMPLE_WORD_SETS[sampleSet],
    irregular: table.irregular === false ? [] : (table.irregularWords ?? irregularSampleSet(sampleSet)),
  };
}

export function conjugatedForm(column: WordColumn, word: Word): string | null {
  try {
    return column.conjugate(word);
  } catch (error) {
    throw new Error(`table function failed for ${word.dictionaryForm} / ${column.header}: ${(error as Error).message}`);
  }
}
