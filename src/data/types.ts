// Shapes of the content files in src/data. Content (explanations, translations) is Hungarian and Korean;
// HTML strings may contain inline markup such as <b>, <span class="korean"> and <span class="translation">.
import type { SampleSetName, Word, WordClass } from '../lib/conjugation';

/** A Korean example sentence with its Hungarian translation and an optional note (e.g. an irregular form). */
export type Example = [korean: string, hungarian: string, note?: string];
/** A correct (1) or incorrect (0) usage sample with an optional Hungarian explanation. */
export type CorrectIncorrect = [isCorrect: number, korean: string, hungarian?: string];
export type KoreanHungarian = [korean: string, hungarian: string];

/** Global id of a grammar point: book, two-digit lesson, point number, e.g. "3A-09-1". */
export type PointId = string;

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
  note?: string;
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
  explanation: string;
  table?: WordTable | NounTable;
  examples?: Example[];
  correctIncorrect?: CorrectIncorrect[];
  honorific?: Honorific;
  /** "＋ Saját kiegészítés" box: content beyond the textbook. */
  ownNote?: string;
  /** Hand-written HTML (usually a table) shown before the conjugation table. */
  customHtml?: string;
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

// ---------- pronunciation ----------
export interface PronunciationCategory {
  id: string;
  korean: string;
  hungarian: string;
  intro: string;
  /** Own supplementary table, e.g. the four cases of ㅢ: rows of [position, pronunciation, [korean, pronunciation, hungarian][]]. */
  extra?: {
    title: string;
    rows: [string, string, [string, string, string][]][];
    note?: string;
  };
}

/** The textbook "발음" box of a lesson. */
export interface LessonPronunciation {
  category: string;
  studentBookPage: number;
  /** Sample word or sentence of the box ('' if the box has none). */
  sampleWord: string;
  /** Its pronunciation; an array lists intermediate and final steps; '' if none. */
  samplePronunciation: string | string[];
  hungarian: string;
  rule: string;
  /** Practice items: [korean (highlight in <b>), pronunciation ('' if none), hungarian]. */
  examples: [string, string | string[], string][];
  /** Own short note (shown with "＋ Saját"). */
  note?: string;
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
  explanation: string;
  /** The same sentence with each degree of the scale. */
  examples?: KoreanHungarian[];
  /** Typical mix-ups between the members: incorrect and correct sentence pairs. */
  correctIncorrect?: CorrectIncorrect[];
  /** Side branches: [point id, explanation]. */
  side?: [PointId, string][];
}
export interface FormGroup {
  id: string;
  kind: 'form';
  title: string;
  explanation: string;
  /** [point id, breakdown (HTML), Hungarian meaning, [example (HTML), translation]] */
  members: [PointId, string, string, KoreanHungarian][];
}
export type RelatedGroup = ScaleGroup | FormGroup;

// ---------- vocabulary ----------
export interface LessonVocabulary {
  /** The textbook's words (flash cards of the lesson). */
  textbook?: KoreanHungarian[];
  /** Words beyond the textbook list (workbook, texts, class notes), shown with "＋ Saját". */
  own?: KoreanHungarian[];
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
  intro?: string;
  rows: HonorificRow[];
  /** In note and intro, [[<point id>]] becomes a link. */
  note?: string;
  correctIncorrect?: CorrectIncorrect[];
}
export interface HonorificsData {
  intro: string;
  categories: HonorificCategory[];
}

// ---------- forward references ----------
/** An earlier example already uses a structure taught later. */
export interface ForwardReference {
  /** A point id (example), "vocabulary <book>-<lesson>" or "pronunciation <book>-<lesson>". */
  location: string;
  /** A unique part of the Korean text (without HTML). */
  koreanText: string;
  /** The later point. */
  target: PointId;
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
