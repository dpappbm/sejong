// Shapes of the content files in src/data. Content (explanations, translations) is Hungarian and Korean;
// formatting and links are elements of the texts (lib/richText.ts), never HTML.
import type { SampleSetName, Word, WordClass } from '../lib/conjugation';
import type { BookCode } from '../lib/content';
import type { Content, Text } from '../lib/richText';

// ---------- ids ----------
type LessonNumber = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
/** Global id of a grammar point: book, two-digit lesson, point number, e.g. "3A-09-1". */
export type PointId = `${BookCode}-${LessonNumber}-${1 | 2}`;
/** Global id of a basic rule, e.g. "rule-5". */
export type RuleId = `rule-${number}`;
/** Global id of a card of the "Számok" chapter, e.g. "numbers-large". */
export type NumbersId = `numbers-${string}`;
/** Whatever a text can link to. */
export type ReferenceId =
  | PointId
  | RuleId
  | NumbersId
  | `lesson-${BookCode}-${number}`
  | `pronunciation-${string}`
  | `honorific-category-${number}`;

// ---------- examples ----------
export interface ExampleDetails {
  note?: Text;
  /** Structures of other lessons in the example, shown with ↗ (taught later) or ↖ (taught earlier). */
  uses?: PointId[];
}
/** A Korean example sentence with its Hungarian translation and an optional note (e.g. an irregular form). */
export type Example = [korean: Text, hungarian: Text, details?: string | ExampleDetails];
/** A correct usage sample: the Korean sentence, its translation and an optional remark. */
export interface CorrectSample {
  correct: Text;
  translation: Text;
  note?: Text;
}
/** An incorrect usage sample: the Korean sentence, why it is wrong, and optionally what it meant to say. */
export interface IncorrectSample {
  incorrect: Text;
  reason: Text;
  translation?: Text;
}
export type CorrectIncorrect = CorrectSample | IncorrectSample;
export type KoreanHungarian = [korean: string, hungarian: string];
/** The same with formatting. */
export type TextPair = [korean: Text, hungarian: Text];

// ---------- books (1A … 4B) ----------
export interface Lesson {
  korean: string;
  hungarian: string;
  /** Short label of the lesson's textbook pronunciation box, if the lesson has one. */
  pronunciation?: string;
  pronunciationHungarian?: string;
}

/** Table column for verbs and adjectives: computes the conjugated form of a sample word. */
export interface WordColumn {
  header: string;
  conjugate: (word: Word) => string | null;
}
/** Table column for nouns: computes the noun + particle form. */
export interface NounColumn {
  header: string;
  conjugate: (noun: string) => string;
}
/** A noun table row: a predefined sample noun by its ending, or an explicit noun with a description. */
export type NounRow = 'vowelEnding' | 'consonantEnding' | 'rieulEnding' | { word: string; description: string };

export interface WordTable {
  kind?: undefined;
  /** Sample words of the regular rows (default: verbsAndAdjectives); the irregular rows come from the matching irregular set. */
  sampleSet?: SampleSetName;
  words?: Word[];
  irregularWords?: Word[];
  /** Further dictionary forms to conjugate; the ones not yet in the table are added to the regular or irregular rows. */
  additionalWords?: string[];
  /** false: no irregular rows. */
  irregular?: false;
  columns: WordColumn[];
}
export interface NounTable {
  kind: 'noun';
  nouns?: NounRow[];
  nounColumns: NounColumn[];
}

/** "Tiszteleti alak" section: only where the honorific is a distinct form (께, 계시다, 드리다 …). */
export interface Honorific {
  /** [base Korean, base Hungarian, honorific Korean, honorific Hungarian] */
  rows?: [string, string, string, string][];
  note?: Content;
  examples?: Example[];
  correctIncorrect?: CorrectIncorrect[];
}

export interface PointSource {
  lesson: number;
  point: number;
  /** The grammar form as the textbook writes it, e.g. "-아/어 보이다". */
  form: string;
  /** Hungarian name of the point. */
  name: string;
  explanation: Content;
  table?: WordTable | NounTable;
  examples?: Example[];
  correctIncorrect?: CorrectIncorrect[];
  honorific?: Honorific;
  /** "＋ Saját kiegészítés" box: content beyond the textbook. */
  ownNote?: Content;
  /** Hand-written content (usually a table) shown before the conjugation table. */
  customContent?: Content;
  /** Related points and rules that the texts do not link to (the links of the texts need not be listed). */
  references?: ReferenceId[];
  /** false: the point is not conjugated (no irregular rows expected). */
  conjugable?: boolean;
  /** true: a conjugable table without irregular rows is intended. */
  irregularRowsOptional?: boolean;
  studentBookPage?: number;
  vocabularyGrammarPage?: number;
}

export interface Point extends PointSource {
  studentBookPage: number;
  vocabularyGrammarPage: number;
}

export interface BookData {
  lessons: Record<number, Lesson>;
  points: Point[];
}

// ---------- chapters of cards (basic rules, numbers) ----------
export interface ContentCard {
  id: RuleId | NumbersId;
  /** Numbered title, e.g. "5. A rendhagyó (불규칙) osztályok". */
  title: string;
  content: Content;
  /** Related points that the content does not link to. */
  references?: ReferenceId[];
}
export interface BasicRule extends ContentCard {
  id: RuleId;
}
export interface NumbersCard extends ContentCard {
  id: NumbersId;
}

// ---------- pronunciation ----------
export interface PronunciationCategory {
  id: string;
  korean: string;
  hungarian: string;
  intro: string;
  /** Own supplementary table, e.g. the four cases of ㅢ: rows of [position, pronunciation, [korean, pronunciation, hungarian][]]. */
  extra?: {
    title: string;
    rows: [string, string, [Text, string, string][]][];
    note?: string;
  };
}

export type PronunciationExample = [
  korean: Text,
  pronunciation: string | string[],
  hungarian: string,
  uses?: PointId[],
];

/** The textbook "발음" box of a lesson. */
export interface LessonPronunciation {
  category: string;
  studentBookPage: number;
  /** Sample word or sentence of the box ('' if the box has none). */
  sampleWord: Text;
  /** Its pronunciation; an array lists intermediate and final steps; '' if none. */
  samplePronunciation: string | string[];
  hungarian: string;
  rule: Text;
  /** Practice items: [korean, pronunciation ('' if none), hungarian, structures taught later]. */
  examples: PronunciationExample[];
  /** Own short note (shown with "＋ Saját"). */
  note?: Text;
}

export interface PronunciationData {
  categories: PronunciationCategory[];
  /** Keyed by "<book>-<lesson>", e.g. "3A-8". */
  lessons: Record<string, LessonPronunciation>;
}

// ---------- related structures ("Rokon szerkezetek", "Közös építőelem") ----------
export interface ScaleGroup {
  id: string;
  kind?: undefined;
  title: string;
  /** Points of the scale in order (x < y < z): [point id, short label]. */
  scale: [PointId, string][];
  /** true: the members are alternatives, not degrees; they are separated by "·" instead of "<". */
  unordered?: boolean;
  explanation: Content;
  /** The same sentence with each degree of the scale. */
  examples?: TextPair[];
  /** Typical mix-ups between the members: incorrect and correct sentence pairs. */
  correctIncorrect?: CorrectIncorrect[];
  /** Side branches: [point id, explanation]. */
  side?: [PointId, Text][];
}
export interface FormGroup {
  id: string;
  kind: 'form';
  title: string;
  explanation: Content;
  /** [point id, breakdown, Hungarian meaning, [example, translation]] */
  members: [PointId, Text, string, TextPair][];
}
export type RelatedGroup = ScaleGroup | FormGroup;

// ---------- vocabulary ----------
/**
 * Where an own word comes from (not shown yet): classNotes "órai jegyzet", textbook "tankönyv" (beyond its word list),
 * workbook "munkafüzet", extraActivityBook "extra activity füzet".
 */
export const VOCABULARY_SOURCES = ['classNotes', 'textbook', 'workbook', 'extraActivityBook'] as const;
export type VocabularySource = (typeof VOCABULARY_SOURCES)[number];
export interface VocabularyDetails {
  /** Given for the own words added since the sources are tracked. */
  source?: VocabularySource;
  /** Structures taught later in the word or phrase, shown with ↗. */
  uses?: PointId[];
}
export type VocabularyRow = [korean: string, hungarian: string, details?: VocabularySource | VocabularyDetails];

export interface LessonVocabulary {
  /** The textbook's words (flash cards of the lesson). */
  textbook?: VocabularyRow[];
  /** Words beyond the textbook list (workbook, texts, class notes), shown with "＋ Saját". */
  own?: VocabularyRow[];
}

// ---------- honorific words chapter ----------
export interface HonorificRow {
  /** Base form [korean, hungarian], or null if there is none. */
  base: KoreanHungarian | null;
  honorific: KoreanHungarian;
  example: KoreanHungarian;
  /** Points where the page teaches the form. */
  references?: PointId[];
}
export interface HonorificCategory {
  hungarian: string;
  korean: string;
  intro?: Content;
  rows: HonorificRow[];
  note?: Content;
  correctIncorrect?: CorrectIncorrect[];
}
export interface HonorificsData {
  intro: Content;
  categories: HonorificCategory[];
}

// ---------- Hungarian translations of the conjugation tables ----------
export interface VerbEntry {
  wordClass: 'verb';
  hungarian: string;
  infinitive: string;
  personalInfinitiveFirstSingular: string;
  presentFirstSingular: string;
  presentSecondSingular: string;
  presentThirdSingular: string;
  pastFirstSingular: string;
  pastSecondSingular: string;
  pastThirdSingular: string;
  imperativeInformal: string;
  imperativeFormal: string;
  subjunctiveFirstSingular: string;
  subjunctiveFirstPlural: string;
  conditionalFirstSingular: string;
  conditionalThirdSingular: string;
  verbalNoun: string;
  relativePronoun: string;
  pastParticiple: string;
  /** Perfective past with a preverb (megírtam), only where needed. */
  perfectiveFirstSingular?: string;
  /** Natural "X után/előtt" noun (írás után), only where Hungarian really says it so. */
  timeNoun?: string;
  /** The verb has a preverb that would split off in a negative pattern. */
  hasPreverb?: boolean;
  /** The verb's meaning is already negative. */
  hasNegativeMeaning?: boolean;
}
export interface AdjectiveEntry {
  wordClass: 'adjective';
  hungarian: string;
  base: string;
  comparative: string;
}
export interface NounEntry {
  wordClass: 'noun';
  hungarian: string;
  base: string;
  definite: string;
  accusative: string;
  dative: string;
  essive: string;
  /** The typical meaning of the (으)로 particle with this noun. */
  roMeaning: string;
}
export type LexiconEntry = VerbEntry | AdjectiveEntry | NounEntry;

/** Hungarian pattern per word class for one table column, e.g. { verb: '{presentFirstSingular}, de …' }. */
export type ColumnTranslation = Partial<Record<WordClass, string>>;
