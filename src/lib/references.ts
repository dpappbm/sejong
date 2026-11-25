// The store of the links between points and the cards of the basic rules, honorific words and numbers. It is built once from the fields of the
// content files: every reference() in a text, every "uses" of an example and every "references" list connects the two
// cards in both directions ("Kapcsolódó pontok" bar).
import { basicRules } from '../data/basics';
import honorifics from '../data/honorifics';
import { numbersCards } from '../data/numbers';
import type { ContentCard, CorrectIncorrect, HonorificCategory, ReferenceId } from '../data/types';
import { POINTS_BY_ID, type PointInfo } from './content';
import { exampleParts, exampleTexts, examplesOf, referencesOf, textsOf, type Content, type Text } from './richText';

export interface ReferenceTarget {
  id: ReferenceId;
  /** Short label, e.g. "3A 9/1" or "Alapszabályok". */
  label: string;
  form: string;
  /** Hover title. */
  title: string;
  /** true: the form is plain Hungarian text (not Korean). */
  plain?: boolean;
}

// ---------- targets ----------
export const honorificCategoryId = (index: number) => `honorific-category-${index + 1}` as const;
export const honorificCategoryTitle = (category: HonorificCategory, index: number) =>
  `${index + 1}. ${category.hungarian}`;

const pointTarget = ({ id, book, lesson, point, form, name }: PointInfo): ReferenceTarget => ({
  id,
  label: `${book} ${lesson}/${point}`,
  form,
  title: `${book} · ${lesson}. lecke · ${point}. nyelvtan: ${form} – ${name}`,
});
const chapterTarget = (id: ReferenceId, chapter: string, title: string): ReferenceTarget => ({
  id,
  label: chapter,
  form: title,
  title: `${chapter} · ${title}`,
  plain: true,
});

const targets = new Map<string, ReferenceTarget>(
  [
    ...[...POINTS_BY_ID.values()].map(pointTarget),
    ...basicRules.map(rule => chapterTarget(rule.id, 'Alapszabályok', rule.title)),
    ...honorifics.categories.map((category, index) =>
      chapterTarget(honorificCategoryId(index), 'Tiszteleti szavak', honorificCategoryTitle(category, index))
    ),
    ...numbersCards.map(card => chapterTarget(card.id, 'Számok', card.title)),
  ].map(target => [target.id, target])
);

/** The card an id stands for; undefined for lessons and pronunciation categories, which have no "Kapcsolódó pontok" bar. */
export const targetOf = (id: ReferenceId): ReferenceTarget | undefined => targets.get(id);
export const allTargets = (): ReferenceTarget[] => [...targets.values()];

// ---------- sources ----------
/** A card with everything in it that can refer to another one. */
export interface ReferenceSource {
  id: ReferenceId;
  texts: Text[];
  /** Ids given in fields. */
  ids: ReferenceId[];
}

const isDefined = <T>(value: T | undefined): value is T => value !== undefined;

const sampleTexts = (items: CorrectIncorrect[] = []): Text[] =>
  items
    .flatMap(item =>
      'correct' in item ? [item.correct, item.translation, item.note] : [item.incorrect, item.reason, item.translation]
    )
    .filter(isDefined);

export function pointSource(point: PointInfo): ReferenceSource {
  const { honorific } = point;
  const contents: Content[] = [point.explanation, point.customContent, point.ownNote, honorific?.note].filter(
    isDefined
  );
  const examples = [...(point.examples ?? []), ...(honorific?.examples ?? [])];
  return {
    id: point.id,
    texts: [
      ...contents.flatMap(textsOf),
      ...examples.flatMap(exampleTexts),
      ...sampleTexts(point.correctIncorrect),
      ...sampleTexts(honorific?.correctIncorrect),
    ],
    ids: [
      ...[...examples, ...contents.flatMap(examplesOf)].flatMap(example => exampleParts(example).uses),
      ...(point.references ?? []),
    ],
  };
}

export const cardSource = (card: ContentCard): ReferenceSource => ({
  id: card.id,
  texts: textsOf(card.content),
  ids: card.references ?? [],
});

export const honorificSource = (category: HonorificCategory, index: number): ReferenceSource => ({
  id: honorificCategoryId(index),
  texts: [...textsOf(category.intro ?? []), ...textsOf(category.note ?? []), ...sampleTexts(category.correctIncorrect)],
  ids: category.rows.flatMap(row => row.references ?? []),
});

export const referenceSources = (): ReferenceSource[] => [
  ...[...POINTS_BY_ID.values()].map(pointSource),
  ...basicRules.map(cardSource),
  ...honorifics.categories.map(honorificSource),
  ...numbersCards.map(cardSource),
];

// ---------- graph ----------
/** Every card with the cards it refers to. */
export const buildReferences = (sources: ReferenceSource[]): Map<string, Set<ReferenceId>> =>
  new Map(sources.map(({ id, texts, ids }) => [id, new Set([...texts.flatMap(referencesOf), ...ids])]));

const references = buildReferences(referenceSources());

/** The ids a card refers to. */
export const referencesFrom = (id: ReferenceId): ReferenceId[] => [...(references.get(id) ?? [])];

// The chapters first, in the order of the menu, then the points.
const CHAPTER_PREFIXES = ['rule-', 'honorific-category-', 'numbers-'];
const orderOf = ({ id }: ReferenceTarget) => {
  const chapter = CHAPTER_PREFIXES.findIndex(prefix => id.startsWith(prefix));
  return (chapter < 0 ? CHAPTER_PREFIXES.length : chapter) + id;
};

/** The "Kapcsolódó pontok" of a card: everything it refers to and everything that refers to it. */
export function relatedTo(id: ReferenceId): ReferenceTarget[] {
  const related = new Set<string>(references.get(id));
  for (const [from, ids] of references) if (ids.has(id)) related.add(from);
  related.delete(id);
  return allTargets()
    .filter(target => related.has(target.id))
    .sort((a, b) => orderOf(a).localeCompare(orderOf(b)));
}
