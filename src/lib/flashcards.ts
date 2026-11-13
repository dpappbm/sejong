// Logic of the flash-card game (src/components/LessonFlashcardDialog.astro), shared by the browser script and the tests.
// Every selected row is asked once, in random order, in a random language; the answer has to be picked from four
// buttons: the row's other side and three other rows' texts in the same language.

export type CardKind = 'rule' | 'example' | 'vocabulary';
export type Language = 'korean' | 'hungarian';
/** A source of random numbers in [0, 1), like Math.random; the tests pass a seeded one. */
export type Random = () => number;

export interface Card {
  korean: string;
  hungarian: string;
  kind: CardKind;
}

export interface Option {
  card: Card;
  /** The text on the button. */
  text: string;
}

export interface Round {
  card: Card;
  questionLanguage: Language;
  question: string;
  /** Four answers, the correct one among them. */
  options: Option[];
  correctIndex: number;
}

export const OPTION_COUNT = 4;

const HANGUL = /[ᄀ-ᇿ㄰-㆏가-힣]/;

/** The kind of the rows behind a key of the row tree ("point-2-rule", "point-2-examples", "vocabulary-textbook"). */
export function cardKind(key: string): CardKind {
  if (key.startsWith('vocabulary')) return 'vocabulary';
  return key.endsWith('-rule') ? 'rule' : 'example';
}

/** Drops the parenthesised parts that contain Korean ("hálás (고마워요 = köszönöm)" → "hálás"): they would give the answer away. */
export function hideKoreanHints(hungarian: string): string {
  const hidden = hungarian.replace(/\s*\([^()]*\)/g, part => (HANGUL.test(part) ? '' : part)).replace(/\s+/g, ' ').trim();
  return hidden || hungarian;
}

/** The text of a card as it is shown in the game. */
export const cardText = (card: Card, language: Language) => (language === 'korean' ? card.korean : hideKoreanHints(card.hungarian));

export const otherLanguage = (language: Language): Language => (language === 'korean' ? 'hungarian' : 'korean');

/** Texts that only differ in case or spacing count as the same. */
const sameText = (text: string) => text.replace(/\s+/g, ' ').trim().toLowerCase();

/** A shuffled copy (Fisher–Yates). */
export function shuffle<T>(items: readonly T[], random: Random = Math.random): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

/**
 * The cards that can be wrong answers to a card asked in the given language, one per distinct answer text.
 * Left out: a card whose answer text is the correct one, and a card whose question-side text is the question
 * (its answer would be correct, too).
 */
export function distractorCandidates(card: Card, questionLanguage: Language, pool: readonly Card[]): Card[] {
  const answerLanguage = otherLanguage(questionLanguage);
  const question = sameText(cardText(card, questionLanguage));
  const seen = new Set([sameText(cardText(card, answerLanguage))]);
  const candidates: Card[] = [];
  for (const other of pool) {
    if (other === card || sameText(cardText(other, questionLanguage)) === question) continue;
    const answer = sameText(cardText(other, answerLanguage));
    if (seen.has(answer)) continue;
    seen.add(answer);
    candidates.push(other);
  }
  return candidates;
}

/** The languages a card can be asked in: those with enough distinct wrong answers in the pool. */
const playableLanguages = (card: Card, pool: readonly Card[]) =>
  (['korean', 'hungarian'] as const).filter(language => distractorCandidates(card, language, pool).length >= OPTION_COUNT - 1);

/** Every card has four distinct answers in at least one language. */
export const canPlay = (cards: readonly Card[], pool: readonly Card[]) =>
  cards.length > 0 && cards.every(card => playableLanguages(card, pool).length > 0);

/**
 * A round for a card: a random question language (the other one if this has too few wrong answers), and three
 * wrong answers drawn from the same kind of rows first, then from the others. null if the card cannot be asked.
 */
export function buildRound(card: Card, pool: readonly Card[], random: Random = Math.random): Round | null {
  const first: Language = random() < 0.5 ? 'korean' : 'hungarian';
  for (const questionLanguage of [first, otherLanguage(first)]) {
    const candidates = distractorCandidates(card, questionLanguage, pool);
    if (candidates.length < OPTION_COUNT - 1) continue;
    const distractors = [
      ...shuffle(candidates.filter(other => other.kind === card.kind), random),
      ...shuffle(candidates.filter(other => other.kind !== card.kind), random),
    ].slice(0, OPTION_COUNT - 1);
    const answerLanguage = otherLanguage(questionLanguage);
    const options = shuffle([card, ...distractors], random).map(option => ({ card: option, text: cardText(option, answerLanguage) }));
    return { card, questionLanguage, question: cardText(card, questionLanguage), options, correctIndex: options.findIndex(option => option.card === card) };
  }
  return null;
}

/**
 * The wrong answers of a "Csak a hibásak" game: the mistaken cards alone if they are enough, otherwise the whole
 * earlier selection (buildRound draws the same kind of rows first).
 */
export const retryPool = (mistakes: readonly Card[], selection: readonly Card[]): Card[] =>
  canPlay(mistakes, mistakes) ? [...mistakes] : [...selection];
