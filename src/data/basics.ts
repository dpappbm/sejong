// The "Alapszabályok" (basic rules) chapter. Its tables are computed by the conjugation engine;
// every Korean cell gets a Hungarian line from the lexicon and the table patterns.
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
import {
  bold,
  korean,
  koreanWithTranslation,
  list,
  mutedParagraph,
  paragraph,
  reference,
  simpleTable,
  text,
  type Text,
} from '../lib/richText';
import { fillHungarianPattern, lexiconEntry } from '../lib/translations';
import type { BasicRule } from './types';

/** A Korean form with its Hungarian line, built from a {placeholder} pattern and the lexicon entry of dictionaryForm. */
function translatedCell(koreanForm: string | null, dictionaryForm: string, pattern: string): Text {
  if (koreanForm === null) return '—';
  const entry = lexiconEntry(dictionaryForm);
  return entry ? koreanWithTranslation(koreanForm, fillHungarianPattern(pattern, entry)) : korean(koreanForm);
}

const verb = (dictionaryForm: string) => createWord(dictionaryForm, 'verb'),
  adjective = (dictionaryForm: string) => createWord(dictionaryForm, 'adjective');

function koreanWithGloss(dictionaryForm: string): Text {
  const entry = lexiconEntry(dictionaryForm);
  return entry ? koreanWithTranslation(dictionaryForm, entry.hungarian) : korean(dictionaryForm);
}
const byWordClass = (word: Word, verbValue: string, adjectiveValue: string) =>
  word.wordClass === 'verb' ? verbValue : adjectiveValue;

const aOrEoRows = [
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
  translatedCell(withAOrEo(verb(dictionaryForm), '요'), dictionaryForm, '{presentFirstSingular}'),
  translatedCell(withPast(verb(dictionaryForm), '어요'), dictionaryForm, '{pastFirstSingular}'),
]);

const rieulStemRows = ['만들다', '살다', '알다'].map(dictionaryForm => {
  const word = verb(dictionaryForm);
  return [
    koreanWithGloss(dictionaryForm),
    translatedCell(withAOrEo(word, '요'), dictionaryForm, '{presentFirstSingular}'),
    translatedCell(withEu(word, '면'), dictionaryForm, 'ha {presentFirstSingular}'),
    translatedCell(withEu(word, '세요'), dictionaryForm, 'Ön {presentThirdSingular} / {imperativeFormal}!'),
    translatedCell(withEu(word, '니까'), dictionaryForm, 'mert {presentFirstSingular}, …'),
    translatedCell(withPlainStem(word, '는'), dictionaryForm, 'aki {presentThirdSingular}'),
    translatedCell(withEu(word, 'ㄴ'), dictionaryForm, 'aki {pastThirdSingular}'),
    translatedCell(withEu(word, 'ㄹ 거예요'), dictionaryForm, '{infinitive} fogok'),
    translatedCell(formalEnding(word), dictionaryForm, '{presentFirstSingular} (formális)'),
  ];
});

const REGULAR_PAIR_HUNGARIAN: Record<string, string> = {
  '받다, 닫다, 믿다': 'kap, bezár, hisz',
  '입다, 잡다, 좁다': 'visel, megfog, szűk',
  '씻다, 웃다, 벗다': 'mos, nevet, levesz',
  '좋다, 놓다, 넣다': 'jó, tesz, betesz',
  '따르다 (→ 따라요)': 'követ, tölt (italt)',
};
const irregularRows = (<[string, string, WordClass, Text, string][]>[
  ['ㄷ', '듣다', 'verb', text`${reference('1A-04-1')} (들어요) – külön szabályként nem`, '받다, 닫다, 믿다'],
  ['ㄷ', '걷다', 'verb', '', ''],
  ['ㅂ', '덥다', 'adjective', reference('1A-08-2'), '입다, 잡다, 좁다'],
  ['ㅂ', '돕다', 'verb', text`${reference('1A-08-2')} (돕다 → 도와요 kivétel)`, ''],
  ['ㅅ', '짓다', 'verb', reference('2A-07-2'), '씻다, 웃다, 벗다'],
  ['ㅅ', '낫다', 'adjective', '', ''],
  ['ㅎ', '그렇다', 'adjective', reference('2A-10-1'), '좋다, 놓다, 넣다'],
  ['ㅎ', '하얗다', 'adjective', '', ''],
  ['르', '모르다', 'verb', '1B–2A szókincsében (몰라요) – külön szabályként nem', '따르다 (→ 따라요)'],
  ['르', '다르다', 'adjective', '', ''],
  ['으', '바쁘다', 'adjective', 'a tankönyv példáiban (바빠요) – külön szabályként nem', '–'],
  ['으', '쓰다', 'verb', '', ''],
  ['ㄹ', '만들다', 'verb', 'minden képzési szabálynál (ㄹ-kiesés)', '–'],
]).map(([irregularity, dictionaryForm, wordClass, whereTaught, regularPair]) => {
  const word = createWord(dictionaryForm, wordClass);
  return [
    bold(irregularity),
    koreanWithGloss(dictionaryForm),
    translatedCell(withAOrEo(word, '요'), dictionaryForm, byWordClass(word, '{presentFirstSingular}', '{base}')),
    translatedCell(withPast(word, '어요'), dictionaryForm, byWordClass(word, '{pastFirstSingular}', '{base} volt')),
    translatedCell(withEu(word, '면'), dictionaryForm, byWordClass(word, 'ha {presentFirstSingular}', 'ha {base}')),
    translatedCell(
      wordClass === 'verb' ? modifierForm(word, 'past') : modifierForm(word, 'present'),
      dictionaryForm,
      byWordClass(word, 'aki {pastThirdSingular}', '{base} …')
    ),
    translatedCell(
      withEu(word, '니까'),
      dictionaryForm,
      byWordClass(word, 'mert {presentFirstSingular}, …', 'mert {base}, …')
    ),
    translatedCell(
      withPlainStem(word, '고'),
      dictionaryForm,
      byWordClass(word, '{presentFirstSingular} és …', '{base} és …')
    ),
    translatedCell(
      formalEnding(word),
      dictionaryForm,
      byWordClass(word, '{presentFirstSingular} (formális)', '{base} (formális)')
    ),
    whereTaught,
    regularPair && regularPair !== '–'
      ? koreanWithTranslation(regularPair, REGULAR_PAIR_HUNGARIAN[regularPair])
      : regularPair,
  ];
});

const particleRows = [
  [
    'téma',
    '은 / 는',
    text`책${bold('은')}`,
    text`친구${bold('는')}`,
    reference('1A-01-2'),
    'a könyv (pedig) …',
    'a barát (pedig) …',
  ],
  [
    'alany',
    '이 / 가',
    text`책${bold('이')}`,
    text`친구${bold('가')}`,
    reference('1A-02-1'),
    'a könyv … (alany)',
    'a barát … (alany)',
  ],
  ['tárgy', '을 / 를', text`책${bold('을')}`, text`친구${bold('를')}`, reference('1A-04-2'), 'a könyvet', 'a barátot'],
  [
    '„és” (főnevek)',
    '과 / 와 · 하고',
    text`책${bold('과')}`,
    text`친구${bold('와')}`,
    reference('1A-05-2'),
    'könyv és …',
    'barát és …',
  ],
  [
    '„vagy”',
    '이나 / 나',
    text`책${bold('이나')}`,
    text`친구${bold('나')}`,
    reference('2A-02-1'),
    'könyv vagy …',
    'barát vagy …',
  ],
  [
    'irány, eszköz',
    '으로 / 로 (ㄹ után: 로)',
    text`책${bold('으로')}`,
    text`친구${bold('로')} · 지하철${bold('로')}`,
    reference('1B-05-2'),
    'könyvvel (eszköz)',
    'barátként · metróval',
  ],
  [
    '„-nak hívják”',
    '이라고 / 라고',
    text`책${bold('이라고')}`,
    text`친구${bold('라고')}`,
    reference('2A-01-1'),
    '„könyvnek” hívják',
    '„barátnak” hívják',
  ],
  [
    '„az … -vagyok”',
    '이에요 / 예요',
    text`책${bold('이에요')}`,
    text`친구${bold('예요')}`,
    reference('1A-01-1'),
    '(ez egy) könyv',
    '(ő egy) barát',
  ],
  [
    '„ő nem …”',
    '이 아니에요 / 가 아니에요',
    text`책${bold('이 아니에요')}`,
    text`친구${bold('가 아니에요')}`,
    reference('1A-02-2'),
    '(ez) nem könyv',
    '(ő) nem barát',
  ],
].map(([role, particle, afterConsonant, afterVowel, taught, consonantHungarian, vowelHungarian]) => [
  role,
  korean(particle),
  koreanWithTranslation(afterConsonant, consonantHungarian),
  koreanWithTranslation(afterVowel, vowelHungarian),
  taught,
]);
const otherParticleRows = [
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
].map(([particle, meaning]) => [korean(particle), meaning]);

const modifierRows = [
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
    ? translatedCell(modifierForm(word, 'past') + ' 사람', word.dictionaryForm, 'az ember, aki {pastThirdSingular}')
    : '—',
  translatedCell(
    modifierForm(word, 'present') + (word.wordClass === 'verb' ? ' 사람' : ' 것'),
    word.dictionaryForm,
    byWordClass(word, 'az ember, aki {presentThirdSingular}', '{base} dolog')
  ),
  translatedCell(
    modifierForm(word, 'future') + (word.wordClass === 'verb' ? ' 사람' : ' 것'),
    word.dictionaryForm,
    byWordClass(word, 'az ember, aki {infinitive} fog', 'ami {base} lesz')
  ),
]);
modifierRows.push([
  koreanWithTranslation('학생이다', 'diák (valaki)'),
  'főnév + 이다',
  '—',
  koreanWithTranslation('학생인 사람', 'az ember, aki diák'),
  koreanWithTranslation('학생일 때', 'amikor diák (lesz / volt)'),
]);

const speechRows = [
  [
    korean('해요체'),
    koreanWithTranslation('가요 · 먹어요', 'megyek · eszem'),
    koreanWithTranslation('가요? · 먹어요?', 'mész? · eszel?'),
    'udvarias, hétköznapi',
    reference('1A-04-1'),
  ],
  [
    korean('합쇼체 (격식체)'),
    koreanWithTranslation('갑니다 · 먹습니다', 'megyek · eszem (formális)'),
    koreanWithTranslation('갑니까? · 먹습니까?', 'megy? · eszik? (Ön, formális)'),
    'hivatalos, formális',
    reference('1B-04-2'),
  ],
  [
    korean('반말 (해체)'),
    koreanWithTranslation('가 · 먹어', 'megyek · eszem (tegező)'),
    koreanWithTranslation('가? · 먹어? · 가니? · 먹니?', 'mész? · eszel? (tegező)'),
    'barátok, fiatalabbak',
    text`${reference('2B-11-1')} · ${reference('3A-01-1')}`,
  ],
  [
    korean('한다체 (írott)'),
    koreanWithTranslation('간다 · 먹는다 · 작다', 'megy · eszik · kicsi (írott)'),
    '—',
    'újság, jelentés, napló',
    reference('3A-12-1'),
  ],
];

const RULES: Omit<BasicRule, 'id'>[] = [
  {
    title: 'Szótő, 받침 és szófajok',
    content: [
      paragraph`A szótári alak mindig ${bold('-다')} végű (${korean('가다, 먹다, 작다')}). A ragozáshoz a ${bold('-다')} elhagyásával kapott ${bold('szótő')} kell: ${korean('가다 → 가-')}, ${korean('먹다 → 먹-')}.`,
      paragraph`A legtöbb szabály azon múlik, hogy a tő utolsó szótagjának van-e ${bold('받침')}-ja (zárómássalhangzója): ${korean('가-')} magánhangzóra végződik, ${korean('먹-')} mássalhangzóra (ㄱ). Külön csoport az ${bold('ㄹ-tő')} (${korean('만들-, 살-')}), mert a ㄹ bizonyos végződések előtt kiesik.`,
      paragraph`${bold('Ige')} (동사): cselekvés, pl. ${korean('가다, 먹다')}. ${bold('Melléknév')} (형용사): állapot, tulajdonság, pl. ${korean('작다, 바쁘다')}. A koreai melléknév igeként ragozódik („kicsinek lenni”). A ${korean('있다/없다')} és összetételeik (${korean('맛있다, 재미없다')}) több helyen igeként viselkednek (pl. ${korean('맛있는')}). A ${bold(korean('하다'))} végű szavak (${korean('공부하다, 피곤하다')}) mindig szabályosan ${korean('해')}-vé változnak.`,
    ],
  },
  {
    title: '-아/어 végződések: melyiket és hogyan vonódnak össze',
    content: [
      paragraph`Ha a tő utolsó magánhangzója ${bold('ㅏ vagy ㅗ')}, akkor ${bold('-아')} jön, minden más esetben ${bold('-어')}, a ${bold('하다')} pedig ${bold('해')} lesz. Ugyanez a szabály minden -아/어 kezdetű végződésre (${korean('-아요/어요, -았/었-, -아서/어서, -아도/어도, -아야/어야, -아/어 보다, -아/어 주다')} …). Ha a tő magánhangzóra végződik, a két magánhangzó összevonódik:`,
      simpleTable(['Szó', 'Szabály', '-아요/어요', 'Múlt: -았어요/었어요'], aOrEoRows),
    ],
  },
  {
    title: '-(으) végződések: mikor kell a 으',
    content: [
      paragraph`Ha egy végződés ${bold('(으)')}-val kezdődik (${korean('-(으)면, -(으)세요, -(으)니까, -(으)ㄴ, -(으)ㄹ')} …), akkor ${bold('mássalhangzós tő után')} kell a 으 (${korean('먹으면')}), ${bold('magánhangzós tő után')} nem kell (${korean('가면')}). Ha a végződés egyetlen ㄴ vagy ㄹ, az a tő utolsó szótagjába olvad: ${korean('가 + ㄴ → 간')}, ${korean('가 + ㄹ → 갈')}.`,
      paragraph`Ugyanígy viselkednek a főnevek utáni párok: ${bold('mássalhangzó után')} a hosszabb alak (${korean('책이에요, 책을, 책으로')}), ${bold('magánhangzó után')} a rövidebb (${korean('친구예요, 친구를, 친구로')}). A partikulák listája a 6. pontban van.`,
    ],
  },
  {
    title: 'Az ㄹ-tő (ㄹ 탈락)',
    content: [
      paragraph`Az ㄹ-re végződő tő ㄹ-je ${bold('kiesik')}, ha a végződés ${bold('ㄴ, ㅂ, ㅅ')} hanggal kezdődik (${korean('만드는, 만듭니다, 만드세요, 만드니까')}), vagy ha a végződés maga ㄴ/ㄹ (${korean('만든, 만들')}). Ilyenkor ${bold('nincs 으')} sem. A ${korean('-(으)면, -(으)러, -(으)려고, -(으)면서')} előtt az ㄹ megmarad, és 으 nélkül kapcsolódik: ${korean('만들면, 만들러')}. A tankönyv ezt minden „형태” résznél külön kiírja.`,
      simpleTable(
        [
          'Szó',
          '-아요/어요',
          '-(으)면',
          '-(으)세요',
          '-(으)니까',
          '-는',
          '-(으)ㄴ',
          '-(으)ㄹ 거예요',
          '-습니다/ㅂ니다',
        ],
        rieulStemRows
      ),
    ],
  },
  {
    title: 'A rendhagyó (불규칙) osztályok',
    content: [
      paragraph`A rendhagyóság mindig csak ${bold('magánhangzóval kezdődő végződés előtt')} (${korean('-아/어, -(으)…')}) jelentkezik. Mássalhangzós végződés előtt (${korean('-고, -지만, -습니다')}) minden szó szabályos. A „Szabályos párja” oszlopban olyan szavak vannak, amelyek ugyanúgy végződnek, mégis szabályosak.`,
      list(
        text`${bold('ㄷ')}: ㄷ → ㄹ magánhangzó előtt: ${korean('듣다 → 들어요, 들으면')}.`,
        text`${bold('ㅂ')}: ㅂ → 우 (${korean('우 + 어 = 워')}): ${korean('덥다 → 더워요, 더우면, 더운')}. Kivétel: ${korean('돕다, 곱다 → 도와요, 고와요')}.`,
        text`${bold('ㅅ')}: a ㅅ kiesik, de a 으 megmarad és nincs összevonás: ${korean('짓다 → 지어요, 지으면')}.`,
        text`${bold('ㅎ')} (csak melléknevek): a ㅎ kiesik; -아/어 előtt a magánhangzó ㅐ (ㅑ után ㅒ): ${korean('그렇다 → 그래요, 그러면, 그런')}; ${korean('하얗다 → 하얘요')}.`,
        text`${bold('르')}: -아/어 előtt a 르 → ㄹ + 라/러: ${korean('모르다 → 몰라요')}, ${korean('부르다 → 불러요')}.`,
        text`${bold('으')}: -아/어 előtt a ㅡ kiesik; az előző szótag dönt az 아/어 között: ${korean('바쁘다 → 바빠요')}, ${korean('예쁘다 → 예뻐요')}, egyszótagú: ${korean('쓰다 → 써요')}.`,
        text`${bold('ㄹ')}: lásd a 4. pontot.`
      ),
      simpleTable(
        [
          'Osztály',
          'Szó',
          '-아요/어요',
          'Múlt',
          '-(으)면',
          'Jelző -(으)ㄴ / -는',
          '-(으)니까',
          '-고',
          '-습니다',
          'Hol tanultuk',
          'Szabályos párja',
        ],
        irregularRows
      ),
      mutedParagraph`A tankönyv külön nyelvtani pontként csak az ${bold('ㅂ')} (${reference('1A-08-2')}), az ${bold('ㅅ')} (${reference('2A-07-2')}) és az ${bold('ㅎ')} (${reference('2A-10-1')}) rendhagyóságot tanítja, az ㄹ-kiesést pedig minden képzési szabálynál megemlíti. A ${bold('ㄷ, 르, 으')} osztályok a szókincsben és a példákban fordulnak elő (${korean('들어요, 몰라요, 바빠요')}), ezek leírása itt saját kiegészítés.`,
    ],
  },
  {
    title: 'Partikulák: mássalhangzó vagy magánhangzó után',
    content: [
      simpleTable(
        ['Szerep', 'Mássalhangzó / magánhangzó után', 'pl. 책 (받침)', 'pl. 친구 (nincs 받침)', 'Tanultuk'],
        particleRows
      ),
      paragraph`Változatlan partikulák (bármi után ugyanaz):`,
      simpleTable(['Partikula', 'Jelentés'], otherParticleRows),
    ],
  },
  {
    title: 'Jelzői alakok (관형형) egy táblázatban',
    content: [
      paragraph`Ige: ${bold('múlt -(으)ㄴ')}, ${bold('jelen -는')}, ${bold('jövő -(으)ㄹ')}. Melléknév: ${bold('jelen -(으)ㄴ')}. A ${korean('있다/없다')} (és ${korean('맛있다')} stb.) jelen időben ${bold('-는')}. Főnév: ${korean('-인')}. Rendhagyó szavaknál a rendhagyóság itt is érvényes (${korean('들은, 더운')}).`,
      simpleTable(['Szó', 'Szófaj', 'Múlt (ige)', 'Jelen', 'Jövő / feltételezés'], modifierRows),
    ],
  },
  {
    title: 'Beszédszintek, amelyekkel a könyv dolgozik',
    content: [simpleTable(['Stílus', 'Kijelentés', 'Kérdés', 'Mikor', 'Tanultuk'], speechRows)],
  },
];

export const basicRules: BasicRule[] = RULES.map((rule, index) => ({
  ...rule,
  id: `rule-${index + 1}`,
  title: `${index + 1}. ${rule.title}`,
}));
