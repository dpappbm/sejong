import { describe, expect, it } from 'vitest';
import { basicRules } from '../../src/data/basics';
import type { ColumnTranslation, LexiconEntry } from '../../src/data/types';
import { columnTranslations, conjugatedForm, nounRows, wordRows } from '../../src/lib/conjugationTable';
import { LESSONS } from '../../src/lib/content';
import { plainText, textsOf } from '../../src/lib/richText';
import { cellTranslation, lexiconEntry } from '../../src/lib/translations';
import { untranslatedKorean } from '../helpers';

interface Cell {
  where: string;
  word: string;
  entry: LexiconEntry | undefined;
  /** The Korean form; null if the word has none. */
  form: string | null;
  pattern: string | undefined;
  translation: ColumnTranslation | undefined;
}

const tables = LESSONS.flatMap(lesson => lesson.points).flatMap(({ book, lesson, point, table }) => {
  if (!table) return [];
  const key = `${book}-${lesson}-${point}`;
  const columns = table.kind === 'noun' ? table.nounColumns : table.columns;
  const translations = columnTranslations(key);
  const toCells = (word: string, forms: (string | null)[]): Cell[] =>
    forms.map((form, index) => {
      const entry = lexiconEntry(word);
      const translation = translations?.[index];
      const pattern = entry && translation?.[entry.wordClass];
      return { where: `${key} [${columns[index].header}] ${word}`, word, entry, form, pattern, translation };
    });
  const { regular, irregular } = table.kind === 'noun' ? { regular: [], irregular: [] } : wordRows(table);
  const cells =
    table.kind === 'noun'
      ? nounRows(table).flatMap(({ word }) =>
          toCells(
            word,
            table.nounColumns.map(column => column.conjugate(word))
          )
        )
      : [...regular, ...irregular].flatMap(word =>
          toCells(
            word.dictionaryForm,
            table.columns.map(column => conjugatedForm(column, word))
          )
        );
  return [{ key, columns, translations, cells }];
});
const cells = tables.flatMap(table => table.cells);
const filledCells = cells.filter(cell => cell.form !== null);
const failing = (hasProblem: (cell: Cell) => boolean | undefined) =>
  filledCells.filter(hasProblem).map(cell => `${cell.where}: ${cell.pattern ?? ''}`);

describe('conjugation tables', () => {
  it('have a Hungarian pattern for every column', () => {
    expect(
      tables
        .filter(({ columns, translations }) => translations?.length !== columns.length)
        .map(({ key, columns, translations }) => `${key}: ${columns.length} columns, ${translations?.length} patterns`)
    ).toEqual([]);
  });

  it('use words of the lexicon', () => {
    expect([...new Set(cells.filter(cell => !cell.entry).map(cell => cell.where))]).toEqual([]);
  });

  it('translate every cell', () => {
    expect(failing(cell => !cellTranslation(cell.word, cell.translation))).toEqual([]);
    expect(filledCells.length).toBeGreaterThan(1000);
  });

  it('fill every placeholder', () => {
    expect(failing(cell => /\{\w+\}/.test(cellTranslation(cell.word, cell.translation) ?? ''))).toEqual([]);
  });

  it('do not negate verbs whose preverb would split off or that have a negative meaning', () => {
    const negative = /(^|[\s(])(nem|ne) \{/;
    expect(
      failing(
        ({ entry, pattern }) =>
          entry?.wordClass === 'verb' &&
          (entry.hasPreverb || entry.hasNegativeMeaning) &&
          !!pattern &&
          negative.test(pattern)
      )
    ).toEqual([]);
  });

  it('do not build broken Hungarian from van / nincs', () => {
    const broken = /(nincs (volt|lesz|lenne)|nem nincs|ne nincs|nem van|van volt|van lesz)/;
    expect(failing(cell => broken.test(cellTranslation(cell.word, cell.translation) ?? ''))).toEqual([]);
  });
});

describe('basic rules', () => {
  it('translate every Korean cell of the word tables', () => {
    const problems = basicRules.flatMap(rule =>
      untranslatedKorean(
        rule.id,
        rule.content.filter(block => block.kind === 'table' && block.headers.includes('Szó'))
      )
    );
    expect(problems).toEqual([]);
  });

  it('fill every placeholder', () => {
    const texts = basicRules.flatMap(rule => textsOf(rule.content)).map(plainText);
    expect(texts.filter(text => /\{\w+\}/.test(text))).toEqual([]);
  });
});
