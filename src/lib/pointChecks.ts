import hungarianTables from '../data/hungarianTables';
import type { ColumnTranslation, CorrectIncorrect, Honorific, NounTable, WordTable } from '../data/types';
import type { PointInfo } from './content';
import { reportProblem } from './problems';

export function checkPoint(point: PointInfo): void {
  const where = `${point.book} lesson ${point.lesson} point ${point.point}`;
  if (!point.explanation) reportProblem(`${where}: no explanation`);
  if (!point.studentBookPage || !point.vocabularyGrammarPage) reportProblem(`${where}: no source page`);
  if (!point.examples || point.examples.length < 3) reportProblem(`${where}: fewer than 3 examples`);
  if (point.examples?.some(example => !example[1])) reportProblem(`${where}: example without translation`);
  checkCorrectIncorrect(where, point.correctIncorrect);
  if (
    point.conjugable !== false &&
    point.table &&
    point.table.kind !== 'noun' &&
    point.table.irregular === false &&
    !point.irregularRowsOptional
  ) {
    reportProblem(`${where}: conjugable but no irregular rows`);
  }
}

export function checkHonorifics(honorific: Honorific | undefined, key: string, book: string): string {
  if (!honorific) return '';
  for (const row of honorific.rows ?? []) {
    if (row.length < 4 || row.some(cell => !cell))
      reportProblem(`${key}: incomplete honorific table row: ${row.join(' | ')}`);
  }
  if (!honorific.examples || honorific.examples.length < 2)
    reportProblem(`${key}: honorific section with fewer than 2 examples`);
  for (const [korean, hungarian] of honorific.examples ?? [])
    if (!hungarian) reportProblem(`${key}: honorific example without translation: ${korean}`);
  checkCorrectIncorrect(`${key} honorific`, honorific.correctIncorrect);
}

/** Every correct sample needs a translation, every incorrect one a reason. */
export function checkCorrectIncorrect(where: string, items: CorrectIncorrect[] | undefined): void {
  for (const item of items ?? []) {
    if ('correct' in item) {
      if (!item.translation.trim()) reportProblem(`${where}: correct sample without translation: ${item.correct}`);
    } else if (!item.reason.trim()) reportProblem(`${where}: incorrect sample without reason: ${item.incorrect}`);
  }
}

export function checkConjugationTable(table: WordTable | NounTable | undefined, key: string): void {
  if (!table) return;
  const columns = table.kind === 'noun' ? table.nounColumns : table.columns;
  const translations = (hungarianTables as Record<string, ColumnTranslation[]>)[key];
  if (!translations) reportProblem(`${key}: no column translations in hungarianTables`);
  else if (translations.length !== columns.length)
    reportProblem(`${key}: ${columns.length} columns but ${translations.length} column translations`);
}
