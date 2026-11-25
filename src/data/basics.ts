// The "Alapszabályok" (basic rules) chapter. Its tables are computed by the conjugation engine;
// every Korean cell gets a Hungarian line through the helpers (the lexicon and the table patterns).
import {
  createWord,
  formalEnding,
  modifierForm,
  withAOrEo,
  withEu,
  withPast,
  withPlainStem,
  type Word,
  type WordClass,
} from '../lib/conjugation';
import { koreanSpan, translationLine } from '../lib/html';
import { lexiconEntry, translatedCell, wordGloss } from '../lib/translations';

const helpers = {
  translatedCell: (korean: string | null, dictionaryForm: string, pattern: string) => {
    const entry = lexiconEntry(dictionaryForm);
    return translatedCell(korean, dictionaryForm, entry ? { [entry.wordClass]: pattern } : null, 'Alapszabályok');
  },
  wordGloss: (dictionaryForm: string) => wordGloss(dictionaryForm, 'Alapszabályok'),
  translation: translationLine,
};

const verb = (dictionaryForm: string) => createWord(dictionaryForm, 'verb'),
  adjective = (dictionaryForm: string) => createWord(dictionaryForm, 'adjective');
const koreanWithGloss = (dictionaryForm: string) => koreanSpan(dictionaryForm) + helpers.wordGloss(dictionaryForm);
const byWordClass = (word: Word, verbValue: string, adjectiveValue: string) =>
  word.wordClass === 'verb' ? verbValue : adjectiveValue;

export const aOrEoRows = [
  { dictionaryForm: '가다', rule: 'ㅏ + 아 → ㅏ' },
  { dictionaryForm: '서다', rule: 'ㅓ + 어 → ㅓ' },
  { dictionaryForm: '보다', rule: 'ㅗ + 아 → ㅘ' },
  { dictionaryForm: '주다', rule: 'ㅜ + 어 → ㅝ' },
  { dictionaryForm: '마시다', rule: 'ㅣ + 어 → ㅕ' },
  { dictionaryForm: '되다', rule: 'ㅚ + 어 → ㅙ' },
  { dictionaryForm: '보내다', rule: 'ㅐ + 어 → ㅐ' },
  { dictionaryForm: '켜다', rule: 'ㅕ + 어 → ㅕ' },
  { dictionaryForm: '쉬다', rule: 'ㅟ + 어 → nincs összevonás' },
  { dictionaryForm: '받다', rule: 'ㅏ, 받침 → +아' },
  { dictionaryForm: '먹다', rule: 'egyéb, 받침 → +어' },
  { dictionaryForm: '공부하다', rule: '하다 → 해' },
].map(({ dictionaryForm, rule }) => [
  koreanWithGloss(dictionaryForm),
  rule,
  helpers.translatedCell(withAOrEo(verb(dictionaryForm), '요'), dictionaryForm, '{presentFirstSingular}'),
  helpers.translatedCell(withPast(verb(dictionaryForm), '어요'), dictionaryForm, '{pastFirstSingular}'),
]);

export const rieulStemRows = ['만들다', '살다', '알다'].map(dictionaryForm => {
  const word = verb(dictionaryForm);
  return [
    koreanWithGloss(dictionaryForm),
    helpers.translatedCell(withAOrEo(word, '요'), dictionaryForm, '{presentFirstSingular}'),
    helpers.translatedCell(withEu(word, '면'), dictionaryForm, 'ha {presentFirstSingular}'),
    helpers.translatedCell(withEu(word, '세요'), dictionaryForm, 'Ön {presentThirdSingular} / {imperativeFormal}!'),
    helpers.translatedCell(withEu(word, '니까'), dictionaryForm, 'mert {presentFirstSingular}, …'),
    helpers.translatedCell(withPlainStem(word, '는'), dictionaryForm, 'aki {presentThirdSingular}'),
    helpers.translatedCell(withEu(word, 'ㄴ'), dictionaryForm, 'aki {pastThirdSingular}'),
    helpers.translatedCell(withEu(word, 'ㄹ 거예요'), dictionaryForm, '{infinitive} fogok'),
    helpers.translatedCell(formalEnding(word), dictionaryForm, '{presentFirstSingular} (formális)'),
  ];
});

const REGULAR_PAIR_HUNGARIAN: Record<string, string> = {
  '받다, 닫다, 믿다': 'kap, bezár, hisz',
  '입다, 잡다, 좁다': 'visel, megfog, szűk',
  '씻다, 웃다, 벗다': 'mos, nevet, levesz',
  '좋다, 놓다, 넣다': 'jó, tesz, betesz',
  '따르다 (→ 따라요)': 'követ, tölt (italt)',
};
export const irregularRows = (<[string, string, WordClass, string, string][]>[
  ['ㄷ', '듣다', 'verb', '1A 4. lecke (들어요) – külön szabályként nem', '받다, 닫다, 믿다'],
  ['ㄷ', '걷다', 'verb', '', ''],
  ['ㅂ', '덥다', 'adjective', '1A 8. lecke', '입다, 잡다, 좁다'],
  ['ㅂ', '돕다', 'verb', '1A 8. lecke (돕다 → 도와요 kivétel)', ''],
  ['ㅅ', '짓다', 'verb', '2A 7. lecke', '씻다, 웃다, 벗다'],
  ['ㅅ', '낫다', 'adjective', '', ''],
  ['ㅎ', '그렇다', 'adjective', '2A 10. lecke', '좋다, 놓다, 넣다'],
  ['ㅎ', '하얗다', 'adjective', '', ''],
  ['르', '모르다', 'verb', '1B–2A szókincsében (몰라요) – külön szabályként nem', '따르다 (→ 따라요)'],
  ['르', '다르다', 'adjective', '', ''],
  ['으', '바쁘다', 'adjective', 'a tankönyv példáiban (바빠요) – külön szabályként nem', '–'],
  ['으', '쓰다', 'verb', '', ''],
  ['ㄹ', '만들다', 'verb', 'minden képzési szabálynál (ㄹ-kiesés)', '–'],
]).map(([irregularity, dictionaryForm, wordClass, whereTaught, regularPair]) => {
  const word = createWord(dictionaryForm, wordClass);
  return [
    `<b>${irregularity}</b>`,
    koreanWithGloss(dictionaryForm),
    helpers.translatedCell(
      withAOrEo(word, '요'),
      dictionaryForm,
      byWordClass(word, '{presentFirstSingular}', '{base}')
    ),
    helpers.translatedCell(
      withPast(word, '어요'),
      dictionaryForm,
      byWordClass(word, '{pastFirstSingular}', '{base} volt')
    ),
    helpers.translatedCell(
      withEu(word, '면'),
      dictionaryForm,
      byWordClass(word, 'ha {presentFirstSingular}', 'ha {base}')
    ),
    helpers.translatedCell(
      wordClass === 'verb' ? modifierForm(word, 'past') : modifierForm(word, 'present'),
      dictionaryForm,
      byWordClass(word, 'aki {pastThirdSingular}', '{base} …')
    ),
    helpers.translatedCell(
      withEu(word, '니까'),
      dictionaryForm,
      byWordClass(word, 'mert {presentFirstSingular}, …', 'mert {base}, …')
    ),
    helpers.translatedCell(
      withPlainStem(word, '고'),
      dictionaryForm,
      byWordClass(word, '{presentFirstSingular} és …', '{base} és …')
    ),
    helpers.translatedCell(
      formalEnding(word),
      dictionaryForm,
      byWordClass(word, '{presentFirstSingular} (formális)', '{base} (formális)')
    ),
    whereTaught,
    regularPair && regularPair !== '–'
      ? koreanSpan(regularPair) + helpers.translation(REGULAR_PAIR_HUNGARIAN[regularPair])
      : regularPair,
  ];
});

export const particleRows = [
  ['téma', '은 / 는', '책<b>은</b>', '친구<b>는</b>', '1A 1. lecke', 'a könyv (pedig) …', 'a barát (pedig) …'],
  ['alany', '이 / 가', '책<b>이</b>', '친구<b>가</b>', '1A 2. lecke', 'a könyv … (alany)', 'a barát … (alany)'],
  ['tárgy', '을 / 를', '책<b>을</b>', '친구<b>를</b>', '1A 4. lecke', 'a könyvet', 'a barátot'],
  ['„és” (főnevek)', '과 / 와 · 하고', '책<b>과</b>', '친구<b>와</b>', '1A 5. lecke', 'könyv és …', 'barát és …'],
  ['„vagy”', '이나 / 나', '책<b>이나</b>', '친구<b>나</b>', '2A 2. lecke', 'könyv vagy …', 'barát vagy …'],
  [
    'irány, eszköz',
    '으로 / 로 (ㄹ után: 로)',
    '책<b>으로</b>',
    '친구<b>로</b> · 지하철<b>로</b>',
    '1B 5. lecke',
    'könyvvel (eszköz)',
    'barátként · metróval',
  ],
  [
    '„-nak hívják”',
    '이라고 / 라고',
    '책<b>이라고</b>',
    '친구<b>라고</b>',
    '2A 1. lecke',
    '„könyvnek” hívják',
    '„barátnak” hívják',
  ],
  [
    '„az … -vagyok”',
    '이에요 / 예요',
    '책<b>이에요</b>',
    '친구<b>예요</b>',
    '1A 1. lecke',
    '(ez egy) könyv',
    '(ő egy) barát',
  ],
  [
    '„ő nem …”',
    '이 아니에요 / 가 아니에요',
    '책<b>이 아니에요</b>',
    '친구<b>가 아니에요</b>',
    '1A 2. lecke',
    '(ez) nem könyv',
    '(ő) nem barát',
  ],
].map(([role, particle, afterConsonant, afterVowel, taught, consonantHungarian, vowelHungarian]) => [
  role,
  koreanSpan(particle),
  koreanSpan(afterConsonant) + helpers.translation(consonantHungarian),
  koreanSpan(afterVowel) + helpers.translation(vowelHungarian),
  taught,
]);
export const otherParticleRows = [
  ['에', 'hely (van), idő, irány'],
  ['에서', 'cselekvés helye, „-ból/-ből” (hely)'],
  ['에게 / 한테', '„-nak/-nek” (személy)'],
  ['에게서 / 한테서', '„-tól/-től” (személy)'],
  ['도', '„is”'],
  ['만', '„csak”'],
  ['보다', '„-nál/-nél” (összehasonlítás)'],
  ['까지 · 부터', '„-ig” · „-tól/-től”'],
  ['마다', '„minden”'],
  ['처럼 · 같이', '„mint”, „-ként”'],
].map(([particle, meaning]) => [koreanSpan(particle), meaning]);

export const modifierRows = [
  verb('가다'),
  verb('먹다'),
  verb('만들다'),
  verb('듣다'),
  adjective('크다'),
  adjective('작다'),
  adjective('길다'),
  adjective('덥다'),
  createWord('맛있다', 'adjective'),
].map(word => [
  koreanWithGloss(word.dictionaryForm),
  word.wordClass === 'verb' ? 'ige' : 'melléknév',
  word.wordClass === 'verb'
    ? helpers.translatedCell(
        modifierForm(word, 'past') + ' 사람',
        word.dictionaryForm,
        'az ember, aki {pastThirdSingular}'
      )
    : '—',
  helpers.translatedCell(
    modifierForm(word, 'present') + (word.wordClass === 'verb' ? ' 사람' : ' 것'),
    word.dictionaryForm,
    byWordClass(word, 'az ember, aki {presentThirdSingular}', '{base} dolog')
  ),
  helpers.translatedCell(
    modifierForm(word, 'future') + (word.wordClass === 'verb' ? ' 사람' : ' 것'),
    word.dictionaryForm,
    byWordClass(word, 'az ember, aki {infinitive} fog', 'ami {base} lesz')
  ),
]);
modifierRows.push([
  koreanSpan('학생이다') + helpers.translation('diák (valaki)'),
  'főnév + 이다',
  '—',
  koreanSpan('학생인 사람') + helpers.translation('az ember, aki diák'),
  koreanSpan('학생일 때') + helpers.translation('amikor diák (lesz / volt)'),
]);

export const speechRows = [
  [
    koreanSpan('해요체'),
    koreanSpan('가요 · 먹어요') + helpers.translation('megyek · eszem'),
    koreanSpan('가요? · 먹어요?') + helpers.translation('mész? · eszel?'),
    'udvarias, hétköznapi',
    '1A 4. lecke',
  ],
  [
    koreanSpan('합쇼체 (격식체)'),
    koreanSpan('갑니다 · 먹습니다') + helpers.translation('megyek · eszem (formális)'),
    koreanSpan('갑니까? · 먹습니까?') + helpers.translation('megy? · eszik? (Ön, formális)'),
    'hivatalos, formális',
    '1B 4. lecke',
  ],
  [
    koreanSpan('반말 (해체)'),
    koreanSpan('가 · 먹어') + helpers.translation('megyek · eszem (tegező)'),
    koreanSpan('가? · 먹어? · 가니? · 먹니?') + helpers.translation('mész? · eszel? (tegező)'),
    'barátok, fiatalabbak',
    '2B 11. lecke · 3A 1. lecke',
  ],
  [
    koreanSpan('한다체 (írott)'),
    koreanSpan('간다 · 먹는다 · 작다') + helpers.translation('megy · eszik · kicsi (írott)'),
    '—',
    'újság, jelentés, napló',
    '3A 12. lecke',
  ],
];

export interface BasicRule {
  /** Global id, e.g. "rule-5". */
  id: string;
  /** Numbered title, e.g. "5. A rendhagyó (불규칙) osztályok". */
  title: string;
  /** Table rows with lesson references, registered before rendering. */
  referenceRows: string[][];
}

const RULES: [title: string, referenceRows?: string[][]][] = [
  ['Szótő, 받침 és szófajok'],
  ['-아/어 végződések: melyiket és hogyan vonódnak össze'],
  ['-(으) végződések: mikor kell a 으'],
  ['Az ㄹ-tő (ㄹ 탈락)'],
  ['A rendhagyó (불규칙) osztályok', irregularRows],
  ['Partikulák: mássalhangzó vagy magánhangzó után', particleRows],
  ['Jelzői alakok (관형형) egy táblázatban'],
  ['Beszédszintek, amelyekkel a könyv dolgozik', speechRows],
];

export const basicRules: BasicRule[] = RULES.map(([title, referenceRows = []], index) => ({
  id: `rule-${index + 1}`,
  title: `${index + 1}. ${title}`,
  referenceRows,
}));
