// Korean conjugation engine: Hangul syllable arithmetic plus the irregular verb classes.
// Every conjugation table on the site is computed here, so the textbook forms
// (e.g. 듣다 → 들어요, 만들다 → 만드는, 돕다 → 도와요) never have to be typed by hand.

const HANGUL_SYLLABLE_BASE = 0xac00;
const LAST_HANGUL_SYLLABLE = 0xd7a3;
const SYLLABLES_PER_INITIAL = 588;
const SYLLABLES_PER_VOWEL = 28;

const INITIAL_CONSONANTS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const FINAL_CONSONANTS = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const VOWELS = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';

export type WordClass = 'verb' | 'adjective' | 'noun';
/** The irregular class of a stem; the empty string means regular. */
export type Irregularity = 'ㄷ' | 'ㅂ' | 'ㅅ' | 'ㅎ' | '르' | '으' | 'ㄹ' | '';
export type ModifierTense = 'present' | 'past' | 'future';

export interface Word {
  dictionaryForm: string;
  stem: string;
  wordClass: WordClass;
  irregularity: Irregularity;
}

interface SyllableParts {
  initial: number;
  vowel: number;
  final: number;
}

const isHangulSyllable = (character: string) => {
  const code = character.charCodeAt(0);
  return code >= HANGUL_SYLLABLE_BASE && code <= LAST_HANGUL_SYLLABLE;
};

export function decomposeSyllable(character: string): SyllableParts {
  const offset = character.charCodeAt(0) - HANGUL_SYLLABLE_BASE;
  return {
    initial: Math.floor(offset / SYLLABLES_PER_INITIAL),
    vowel: Math.floor((offset % SYLLABLES_PER_INITIAL) / SYLLABLES_PER_VOWEL),
    final: offset % SYLLABLES_PER_VOWEL,
  };
}

export function composeSyllable(initial: number, vowel: number, final = 0): string {
  return String.fromCharCode(HANGUL_SYLLABLE_BASE + initial * SYLLABLES_PER_INITIAL + vowel * SYLLABLES_PER_VOWEL + final);
}

const vowelIndex = (jamo: string) => VOWELS.indexOf(jamo);
const finalIndex = (jamo: string) => FINAL_CONSONANTS.indexOf(jamo);

/** Replaces the final consonant (받침) of the last syllable. */
export function withFinalConsonant(text: string, final: number): string {
  const parts = decomposeSyllable(text.slice(-1));
  return text.slice(0, -1) + composeSyllable(parts.initial, parts.vowel, final);
}

export function hasFinalConsonant(text: string): boolean {
  const last = text.trim().slice(-1);
  return isHangulSyllable(last) && decomposeSyllable(last).final !== 0;
}

// ---- irregular classes ----
const IRREGULAR_WORDS: Record<Exclude<Irregularity, '으' | 'ㄹ' | ''>, string[]> = {
  'ㄷ': ['듣다', '걷다', '묻다', '싣다', '깨닫다'],
  'ㅂ': ['덥다', '춥다', '맵다', '쉽다', '어렵다', '무겁다', '가볍다', '돕다', '곱다', '귀엽다', '가깝다', '아름답다', '즐겁다', '반갑다', '고맙다', '시끄럽다', '부럽다', '뜨겁다', '차갑다', '더럽다', '눕다', '굽다'],
  'ㅅ': ['짓다', '붓다', '젓다', '낫다', '긋다'],
  'ㅎ': ['그렇다', '이렇다', '저렇다', '어떻다', '빨갛다', '노랗다', '파랗다', '하얗다', '까맣다'],
  '르': ['모르다', '부르다', '빠르다', '다르다', '고르다', '자르다', '마르다', '흐르다', '오르다', '서두르다', '누르다', '기르다'],
};

export function irregularityOf(dictionaryForm: string): Irregularity {
  for (const [irregularity, words] of Object.entries(IRREGULAR_WORDS)) {
    if (words.includes(dictionaryForm)) return irregularity as Irregularity;
  }
  const stem = dictionaryForm.slice(0, -1);
  const last = decomposeSyllable(stem.slice(-1));
  if (last.final === finalIndex('ㄹ')) return 'ㄹ';
  if (last.final === 0 && last.vowel === vowelIndex('ㅡ')) return '으';
  return '';
}

export function createWord(dictionaryForm: string, wordClass: WordClass): Word {
  return { dictionaryForm, stem: dictionaryForm.slice(0, -1), wordClass, irregularity: irregularityOf(dictionaryForm) };
}

// ---- -아/어 stem ----
const isBrightVowel = (vowel: number) => vowel === vowelIndex('ㅏ') || vowel === vowelIndex('ㅗ') || vowel === vowelIndex('ㅑ');

/** The stem with -아/어 attached and contracted: 가 → 가, 먹 → 먹어, 하 → 해, 듣 → 들어. */
export function aOrEoStem(word: Word): string {
  const stem = word.stem;
  const last = stem.slice(-1);
  const beforeLast = stem.slice(0, -1);
  const parts = decomposeSyllable(last);
  if (stem === '이') return '이어';
  if (last === '하') return beforeLast + '해';
  switch (word.irregularity) {
    case 'ㄷ':
      return beforeLast + composeSyllable(parts.initial, parts.vowel, finalIndex('ㄹ')) + (isBrightVowel(parts.vowel) ? '아' : '어');
    case 'ㅂ':
      return beforeLast + composeSyllable(parts.initial, parts.vowel, 0) + (word.dictionaryForm === '돕다' || word.dictionaryForm === '곱다' ? '와' : '워');
    case 'ㅅ':
      return beforeLast + composeSyllable(parts.initial, parts.vowel, 0) + (isBrightVowel(parts.vowel) ? '아' : '어');
    case 'ㅎ':
      return beforeLast + composeSyllable(parts.initial, parts.vowel === vowelIndex('ㅑ') ? vowelIndex('ㅒ') : vowelIndex('ㅐ'), 0);
    case '르': {
      const previous = decomposeSyllable(beforeLast.slice(-1));
      return beforeLast.slice(0, -1) + composeSyllable(previous.initial, previous.vowel, finalIndex('ㄹ')) + (isBrightVowel(previous.vowel) ? '라' : '러');
    }
    case '으': {
      const bright = beforeLast.length ? isBrightVowel(decomposeSyllable(beforeLast.slice(-1)).vowel) : false;
      return beforeLast + composeSyllable(parts.initial, bright ? vowelIndex('ㅏ') : vowelIndex('ㅓ'), 0);
    }
  }
  if (parts.final !== 0) return stem + (isBrightVowel(parts.vowel) ? '아' : '어');
  const contractions: Record<string, string> = { 'ㅏ': 'ㅏ', 'ㅓ': 'ㅓ', 'ㅕ': 'ㅕ', 'ㅐ': 'ㅐ', 'ㅔ': 'ㅔ', 'ㅗ': 'ㅘ', 'ㅜ': 'ㅝ', 'ㅣ': 'ㅕ', 'ㅚ': 'ㅙ' };
  const contracted = contractions[VOWELS[parts.vowel]];
  if (contracted) return beforeLast + composeSyllable(parts.initial, vowelIndex(contracted), 0);
  return stem + '어'; // ㅟ, ㅢ etc. do not contract
}

/** -아/어 + ending: withAOrEo(가다, '요') → 가요. */
export const withAOrEo = (word: Word, ending = '') => aOrEoStem(word) + ending;
/** Past stem: 갔, 먹었, 했. */
export const pastStem = (word: Word) => withFinalConsonant(aOrEoStem(word), finalIndex('ㅆ'));
/** Past stem + ending: withPast(가다, '어요') → 갔어요. */
export const withPast = (word: Word, ending = '') => pastStem(word) + ending;

// ---- endings with an optional (으) ----
/** Attaches an ending that starts with a bare jamo (ㄴ/ㄹ/ㅂ) as the final consonant. */
function attachFinalJamo(text: string, ending: string): string {
  return withFinalConsonant(text, finalIndex(ending[0])) + ending.slice(1);
}

/** Ending with an optional (으): withEu(먹다, '면') → 먹으면, withEu(만들다, 'ㄴ') → 만든. */
export function withEu(word: Word, ending: string): string {
  const stem = word.stem;
  const parts = decomposeSyllable(stem.slice(-1));
  const beforeLast = stem.slice(0, -1);
  const startsWithJamo = !isHangulSyllable(ending[0]);
  const initialSound = startsWithJamo ? ending[0] : INITIAL_CONSONANTS[decomposeSyllable(ending[0]).initial];
  if (word.irregularity === 'ㅎ') {
    const base = beforeLast + composeSyllable(parts.initial, parts.vowel, 0);
    return startsWithJamo ? attachFinalJamo(base, ending) : base + ending;
  }
  if (word.irregularity === 'ㅂ') {
    const base = beforeLast + composeSyllable(parts.initial, parts.vowel, 0);
    return startsWithJamo ? base + attachFinalJamo('우', ending) : base + '우' + ending;
  }
  if (word.irregularity === 'ㄹ') {
    if (startsWithJamo) return attachFinalJamo(stem, ending); // 만든, 만들, 만듭
    if ('ㄴㅅㅂ'.includes(initialSound)) return withFinalConsonant(stem, 0) + ending; // 만드세요, 만드니까
    return stem + ending; // 만들면, 만들러
  }
  let base = stem;
  if (word.irregularity === 'ㄷ') base = withFinalConsonant(stem, finalIndex('ㄹ'));
  if (word.irregularity === 'ㅅ') base = withFinalConsonant(stem, 0);
  if (parts.final === 0) return startsWithJamo ? attachFinalJamo(stem, ending) : stem + ending;
  return startsWithJamo ? base + attachFinalJamo('으', ending) : base + '으' + ending;
}

/** Consonant-initial endings attached to the plain stem (-고, -지만, -네요, -는, -니?); ㄹ drops before ㄴ/ㅅ/ㅂ. */
export function withPlainStem(word: Word, ending: string): string {
  const initialSound = INITIAL_CONSONANTS[decomposeSyllable(ending[0]).initial];
  if (word.irregularity === 'ㄹ' && 'ㄴㅅㅂ'.includes(initialSound)) return withFinalConsonant(word.stem, 0) + ending;
  return word.stem + ending;
}

/** Formal ending -습니다/-ㅂ니다, or the question -습니까?/-ㅂ니까?. */
export function formalEnding(word: Word, question = false): string {
  const ending = question ? '니까?' : '니다';
  const parts = decomposeSyllable(word.stem.slice(-1));
  if (word.irregularity === 'ㄹ' || parts.final === 0) return withFinalConsonant(word.stem, finalIndex('ㅂ')) + ending;
  return word.stem + '습' + ending;
}

/** Plain written style (한다체) statement, also used in reported speech: 간다, 먹는다, 바쁘다. */
export function plainStyleStatement(word: Word): string {
  if (word.wordClass === 'adjective' || word.wordClass === 'noun') return word.dictionaryForm;
  const parts = decomposeSyllable(word.stem.slice(-1));
  if (word.irregularity === 'ㄹ' || parts.final === 0) return withFinalConsonant(word.stem, finalIndex('ㄴ')) + '다';
  return word.stem + '는다';
}

/** Noun-modifying form: -는 / -(으)ㄴ / -(으)ㄹ. Returns null where the tense does not exist (past adjective). */
export function modifierForm(word: Word, tense: ModifierTense): string | null {
  const isItdaOrEopda = /(있|없)다$/.test(word.dictionaryForm);
  if (tense === 'future') return withEu(word, 'ㄹ');
  if (tense === 'past') return word.wordClass === 'verb' ? withEu(word, 'ㄴ') : null;
  if (word.wordClass === 'verb' || isItdaOrEopda) return withPlainStem(word, '는');
  return withEu(word, 'ㄴ');
}

// ---- nouns ----
/** Picks the particle variant by the noun's ending: 친구는 / 선생님은; with rieulCountsAsVowel 지하철로. */
export function nounWithParticle(noun: string, afterConsonant: string, afterVowel: string, rieulCountsAsVowel = false): string {
  const parts = decomposeSyllable(noun.trim().slice(-1));
  if (parts.final === 0) return noun + afterVowel;
  if (rieulCountsAsVowel && parts.final === finalIndex('ㄹ')) return noun + afterVowel;
  return noun + afterConsonant;
}

/** Noun + 이다 ending (학생이에요); the vowel-final contraction (의사예요) is handled by the caller. */
export function nounWithCopula(noun: string, ending: string): string {
  return hasFinalConsonant(noun) ? noun + '이' + ending : noun + ending;
}

// ---- sample word sets shown in the conjugation tables ----
export const SAMPLE_WORD_SETS = {
  verbs: [createWord('가다', 'verb'), createWord('먹다', 'verb'), createWord('공부하다', 'verb'), createWord('만들다', 'verb')],
  irregularVerbs: [createWord('듣다', 'verb'), createWord('돕다', 'verb'), createWord('짓다', 'verb'), createWord('부르다', 'verb'), createWord('쓰다', 'verb')],
  adjectives: [createWord('싸다', 'adjective'), createWord('작다', 'adjective'), createWord('피곤하다', 'adjective'), createWord('길다', 'adjective')],
  irregularAdjectives: [createWord('덥다', 'adjective'), createWord('낫다', 'adjective'), createWord('빨갛다', 'adjective'), createWord('다르다', 'adjective'), createWord('바쁘다', 'adjective')],
  verbsAndAdjectives: [createWord('가다', 'verb'), createWord('먹다', 'verb'), createWord('공부하다', 'verb'), createWord('만들다', 'verb'), createWord('작다', 'adjective'), createWord('바쁘다', 'adjective')],
  irregularVerbsAndAdjectives: [createWord('듣다', 'verb'), createWord('덥다', 'adjective'), createWord('돕다', 'verb'), createWord('짓다', 'verb'), createWord('그렇다', 'adjective'), createWord('부르다', 'verb'), createWord('쓰다', 'verb')],
} satisfies Record<string, Word[]>;

export type SampleSetName = 'verbs' | 'adjectives' | 'verbsAndAdjectives';

export function irregularSampleSet(name: SampleSetName): Word[] {
  const irregularName = `irregular${name[0].toUpperCase()}${name.slice(1)}` as keyof typeof SAMPLE_WORD_SETS;
  return SAMPLE_WORD_SETS[irregularName];
}

const IRREGULARITY_LABELS: Record<Irregularity, string> = {
  'ㄷ': 'ㄷ-rendhagyó',
  'ㅂ': 'ㅂ-rendhagyó',
  'ㅅ': 'ㅅ-rendhagyó',
  'ㅎ': 'ㅎ-rendhagyó',
  '르': '르-rendhagyó',
  '으': '으-kiesés',
  'ㄹ': 'ㄹ-tő (ㄹ-kiesés)',
  '': '',
};

/** Hungarian label of the stem type, shown in the "Típus" column of the conjugation tables. */
export function stemTypeLabel(word: Word): string {
  if (word.irregularity) return IRREGULARITY_LABELS[word.irregularity];
  if (word.stem.endsWith('하')) return '하다';
  return decomposeSyllable(word.stem.slice(-1)).final ? 'mássalhangzóra végződő tő' : 'magánhangzóra végződő tő';
}
