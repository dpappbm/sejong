import type { PointId, VocabularyDetails, VocabularyRow } from '../data/types';

const detailsOf = ([, , details]: VocabularyRow): VocabularyDetails =>
  typeof details === 'object' ? details : { source: details };

export const vocabularySource = (row: VocabularyRow) => detailsOf(row).source;

/** Structures taught later in the word or phrase. */
export const vocabularyUses = (row: VocabularyRow): PointId[] => detailsOf(row).uses ?? [];
