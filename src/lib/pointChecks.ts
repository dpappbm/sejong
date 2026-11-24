// Content checks of the grammar points: missing translations, incomplete rows, references that would stay unlinked.
import type { CorrectIncorrect, Example, Honorific, NounTable, WordTable } from '../data/types';
import { columnTranslations, conjugatedForm, nounRows, wordRows } from './conjugationTable';
import type { PointInfo } from './content';
import { hasReference } from './crossReferences';
import { reportProblem } from './problems';
import { checkCustomTableTranslations, translatedCell, wordGloss } from './translations';

export function checkPoint(point: PointInfo): void {
  const key = `${point.book}-${point.lesson}-${point.point}`;
  const where = `${point.book} lesson ${point.lesson} point ${point.point}`;

  if (!point.explanation) reportProblem(`${where}: no explanation`);
  if (!point.studentBookPage || !point.vocabularyGrammarPage) reportProblem(`${where}: no source page`);
  if (!point.examples || point.examples.length < 3) reportProblem(`${where}: fewer than 3 examples`);
  if (point.examples?.some(example => !example[1])) reportProblem(`${where}: example without translation`);
  checkUnlinkedExamples(where, point.examples);
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
  checkCustomTableTranslations(key, point.customHtml);
  if (point.table) checkConjugationTable(point.table, key);
  if (point.honorific) checkHonorific(point.honorific, key);
}

function checkHonorific(honorific: Honorific, key: string): void {
  for (const row of honorific.rows ?? []) {
    if (row.length < 4 || row.some(cell => !cell))
      reportProblem(`${key}: incomplete honorific table row: ${row.join(' | ')}`);
  }
  if (!honorific.examples || honorific.examples.length < 2)
    reportProblem(`${key}: honorific section with fewer than 2 examples`);
  for (const [korean, hungarian] of honorific.examples ?? [])
    if (!hungarian) reportProblem(`${key}: honorific example without translation: ${korean}`);
  checkUnlinkedExamples(`${key} honorific`, honorific.examples);
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

/** Every word needs a lexicon entry, every cell a Hungarian line (wordGloss and translatedCell report the missing ones). */
function checkConjugationTable(table: WordTable | NounTable, key: string): void {
  const columns = table.kind === 'noun' ? table.nounColumns : table.columns;
  const translations = columnTranslations(key);
  if (!translations) reportProblem(`${key}: no column translations in hungarianTables`);
  else if (translations.length !== columns.length)
    reportProblem(`${key}: ${columns.length} columns but ${translations.length} column translations`);

  const checkRow = (word: string, forms: (string | null)[]) => {
    wordGloss(word, key);
    forms.forEach((form, index) =>
      translatedCell(form, word, translations?.[index], `${key} [${columns[index].header}] ${word}`)
    );
  };
  if (table.kind === 'noun') {
    for (const { word } of nounRows(table))
      checkRow(
        word,
        table.nounColumns.map(column => column.conjugate(word))
      );
  } else {
    const { regular, irregular } = wordRows(table);
    for (const word of [...regular, ...irregular])
      checkRow(
        word.dictionaryForm,
        table.columns.map(column => conjugatedForm(column, word))
      );
  }
}

/** References in examples are not linked, so there must not be any. */
function checkUnlinkedExamples(where: string, examples: Example[] | undefined): void {
  for (const [korean, hungarian, note = ''] of examples ?? [])
    if (hasReference(hungarian) || hasReference(note))
      reportProblem(`${where}: reference in an example would stay unlinked: ${korean}`);
}
