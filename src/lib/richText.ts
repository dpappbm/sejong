// The text of the content files, as data: a text is a string, an element (bold, Korean, link …) or a list of these,
// and a longer content is a list of blocks (paragraph, list, table …). No HTML: components/text/ renders them.
import type { Example, PointId, ReferenceId, RuleId } from '../data/types';
import type { BookCode } from './content';

export type TextElement =
  | { kind: 'bold'; content: Text }
  | { kind: 'korean'; content: Text; glossedInRow?: boolean }
  | { kind: 'translation'; content: Text }
  | { kind: 'reference'; to: ReferenceId; label: string }
  | { kind: 'warning'; content: Text }
  | { kind: 'lineBreak' };

export type Text = string | TextElement | readonly Text[];

export type Block =
  | { kind: 'paragraph'; content: Text; muted?: boolean }
  | { kind: 'heading'; content: Text }
  | { kind: 'list'; items: Text[] }
  | { kind: 'examples'; items: Example[] }
  | { kind: 'table'; headers: string[]; rows: Text[][] }
  | { kind: 'comparison'; patterns: [string, string]; rows: [Example, Example][] };

/** The lesson a text belongs to: decides about its play buttons and the direction of its forward marks. */
export interface TextPlace {
  book: BookCode;
  lesson: number;
}

/** A content of several blocks, e.g. the explanation of a point. */
export type Content = Block[];

// ---------- texts ----------
/** text`A ${korean('-니?')} kérdés` */
export function text(strings: TemplateStringsArray, ...values: Text[]): Text {
  const parts = strings.flatMap((string, index): Text[] => (index ? [values[index - 1], string] : [string]));
  const filled = parts.filter(part => part !== '');
  return filled.length === 1 ? filled[0] : filled;
}

export const bold = (content: Text): TextElement => ({ kind: 'bold', content });

export const korean = (content: Text): TextElement => ({ kind: 'korean', content });

/** A Korean cell whose meaning stands in a Hungarian column of the same table row. */
export const koreanGlossedInRow = (content: Text): TextElement => ({ kind: 'korean', content, glossedInRow: true });

/** A Hungarian translation line under a Korean form. */
export const translation = (content: Text): TextElement => ({ kind: 'translation', content });

export const koreanWithTranslation = (koreanText: Text, hungarian: Text): Text => [
  korean(koreanText),
  translation(hungarian),
];

export const lineBreak: TextElement = { kind: 'lineBreak' };

/** A highlighted caution: an amber label with a ⚠ mark before the text. */
export const warning = (content: Text): TextElement => ({ kind: 'warning', content });

/** "3A 9. lecke" for a point, "Alapszabályok 2." for a basic rule. */
export function referenceLabel(to: PointId | RuleId): string {
  if (to.startsWith('rule-')) return `Alapszabályok ${to.slice('rule-'.length)}.`;
  const [book, lesson] = to.split('-');
  return `${book} ${Number(lesson)}. lecke`;
}

/** A link to a point, rule or chapter card. It also connects the two in the "Kapcsolódó pontok" bars (references.ts). */
export function reference(to: PointId | RuleId, label?: string): TextElement;
export function reference(to: ReferenceId, label: string): TextElement;
export function reference(to: ReferenceId, label?: string): TextElement {
  return { kind: 'reference', to, label: label ?? referenceLabel(to as PointId | RuleId) };
}

// ---------- blocks ----------
export const paragraph = (strings: TemplateStringsArray, ...values: Text[]): Block => ({
  kind: 'paragraph',
  content: text(strings, ...values),
});

/** A paragraph in small, grey letters. */
export const mutedParagraph = (strings: TemplateStringsArray, ...values: Text[]): Block => ({
  kind: 'paragraph',
  content: text(strings, ...values),
  muted: true,
});

export const heading = (content: Text): Block => ({ kind: 'heading', content });

export const list = (...items: Text[]): Block => ({ kind: 'list', items });

/** Example cards (Korean, Hungarian, optional note line), in the layout of the "Példák" section. */
export const exampleList = (items: Example[]): Block => ({ kind: 'examples', items });

export const simpleTable = (headers: string[], rows: Text[][]): Block => ({ kind: 'table', headers, rows });

/** Sentence pairs of two contrasted patterns, one pattern per column, the Hungarian under the Korean. */
export const comparisonTable = (patterns: [string, string], rows: [Example, Example][]): Block => ({
  kind: 'comparison',
  patterns,
  rows,
});

// ---------- reading ----------
/** The text as the reader sees it, without formatting. */
export function plainText(value: Text): string {
  if (typeof value === 'string') return value;
  if ('kind' in value) {
    if (value.kind === 'lineBreak') return ' ';
    if (value.kind === 'warning') return `⚠ ${plainText(value.content)}`;
    return value.kind === 'reference' ? value.label : plainText(value.content);
  }
  return value.map(plainText).join('');
}

/** An example with its optional parts unpacked. */
export function exampleParts([koreanText, hungarian, details]: Example) {
  const { note, uses = [] } = typeof details === 'object' ? details : { note: details };
  return { korean: koreanText, hungarian, note, uses };
}

export const exampleTexts = (example: Example): Text[] => {
  const { korean: koreanText, hungarian, note } = exampleParts(example);
  return note === undefined ? [koreanText, hungarian] : [koreanText, hungarian, note];
};

/** Every text of a content, in reading order. */
export const textsOf = (content: Content): Text[] =>
  content.flatMap((block): Text[] => {
    switch (block.kind) {
      case 'paragraph':
      case 'heading':
        return [block.content];
      case 'list':
        return block.items;
      case 'examples':
        return block.items.flatMap(exampleTexts);
      case 'table':
        return [...block.headers, ...block.rows.flat()];
      case 'comparison':
        return [...block.patterns, ...block.rows.flat().flatMap(exampleTexts)];
    }
  });

/** The examples of the example lists and comparison tables of a content. */
export const examplesOf = (content: Content): Example[] =>
  content.flatMap((block): Example[] => {
    if (block.kind === 'examples') return block.items;
    return block.kind === 'comparison' ? block.rows.flat() : [];
  });

/** The elements of a text, the nested ones too. */
export function elementsOf(value: Text): TextElement[] {
  if (typeof value === 'string') return [];
  if ('kind' in value) return 'content' in value ? [value, ...elementsOf(value.content)] : [value];
  return value.flatMap(elementsOf);
}

/** The ids the text links to. */
export const referencesOf = (value: Text): ReferenceId[] =>
  elementsOf(value).flatMap(element => (element.kind === 'reference' ? [element.to] : []));
