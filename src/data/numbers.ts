// The "Számok" chapter: the two number systems and the counters of each.
import {
  bold,
  exampleList,
  korean,
  koreanGlossedInRow,
  koreanWithTranslation,
  list,
  paragraph,
  reference,
  simpleTable,
  text,
  type Content,
  type Text,
} from '../lib/richText';
import type { NumbersCard } from './types';

const UNCHANGED = 'változatlan';
const NONE = '–';

/** A number with its native form, the native form before a counter (if it is different) and the Sino-Korean form. */
const numberRow = (number: string, native: string | null, beforeCounter: string | null, sino: string): Text[] => [
  number,
  native ? koreanGlossedInRow(native) : NONE,
  beforeCounter ? koreanGlossedInRow(beforeCounter) : native ? UNCHANGED : NONE,
  koreanGlossedInRow(sino),
];

const numberRows = [
  numberRow('0', null, null, '영 / 공'),
  numberRow('1', '하나', '한', '일'),
  numberRow('2', '둘', '두', '이'),
  numberRow('3', '셋', '세', '삼'),
  numberRow('4', '넷', '네', '사'),
  numberRow('5', '다섯', null, '오'),
  numberRow('6', '여섯', null, '육'),
  numberRow('7', '일곱', null, '칠'),
  numberRow('8', '여덟', null, '팔'),
  numberRow('9', '아홉', null, '구'),
  numberRow('10', '열', null, '십'),
  numberRow('11', '열하나', '열한', '십일'),
  numberRow('20', '스물', '스무', '이십'),
  numberRow('30', '서른', null, '삼십'),
  numberRow('40', '마흔', null, '사십'),
  numberRow('50', '쉰', null, '오십'),
  numberRow('60', '예순', null, '육십'),
  numberRow('70', '일흔', null, '칠십'),
  numberRow('80', '여든', null, '팔십'),
  numberRow('90', '아흔', null, '구십'),
  numberRow('100', null, null, '백'),
];

const largeNumberRows: Text[][] = [
  ['1\u00a0000', koreanGlossedInRow('천'), 'ezer', NONE],
  ['10\u00a0000', koreanGlossedInRow('만'), 'tízezer', 'új egység'],
  ['100\u00a0000', koreanGlossedInRow('십만'), 'százezer', '10 × 10\u00a0000'],
  ['1\u00a0000\u00a0000', koreanGlossedInRow('백만'), 'egymillió', '100 × 10\u00a0000'],
  ['10\u00a0000\u00a0000', koreanGlossedInRow('천만'), 'tízmillió', '1\u00a0000 × 10\u00a0000'],
];

const counterRow = ([counter, meaning, example, translation]: [string, string, string, string]): Text[] => [
  koreanGlossedInRow(counter),
  meaning,
  koreanWithTranslation(example, translation),
];

const COUNTER_HEADERS = ['Számlálószó', 'Mit számol', 'Példa'];

const nativeCounterRows = (
  [
    ['개', 'darab (tárgy)', '사과 세 개', 'három alma'],
    ['명', 'fő', '학생 네 명', 'négy diák'],
    ['분', 'fő (tiszteleti)', '손님 두 분', 'két vendég'],
    ['마리', 'állat', '고양이 한 마리', 'egy macska'],
    ['병', 'üveg, palack', '콜라 두 병', 'két üveg kóla'],
    ['잔', 'pohár, csésze', '커피 한 잔', 'egy csésze kávé'],
    ['권', 'könyv, füzet', '책 다섯 권', 'öt könyv'],
    ['장', 'lapos dolog (papír, jegy, fénykép)', '표 세 장', 'három jegy'],
    ['살', 'életkor', '스무 살', 'húszéves'],
    ['시', 'óra (időpont)', '아홉 시', 'kilenc óra'],
    ['시간', 'óra (időtartam)', '두 시간', 'két óra hosszat'],
    ['번', 'alkalom', '한 번', 'egyszer'],
    ['달', 'hónap (időtartam)', '세 달', 'három hónap'],
  ] as [string, string, string, string][]
).map(counterRow);

const sinoCounterRows = (
  [
    ['년', 'év', '이천이십육 년', '2026 (kétezer-huszonhatodik év)'],
    ['월', 'hónap (naptári)', '삼월', 'március'],
    ['일', 'nap', '십오 일', 'tizenötödike; tizenöt nap'],
    ['분', 'perc', '삼십 분', 'harminc perc'],
    ['초', 'másodperc', '십 초', 'tíz másodperc'],
    ['원', 'von (pénz)', '오천 원', 'ötezer von'],
    ['층', 'szint, emelet', '이 층', 'második szint (nálunk első emelet)'],
    ['번', 'sorszám', '삼 번', 'hármas szám'],
    ['호', 'szoba-, ajtószám', '백일 호', '101-es szoba'],
    ['쪽', 'oldal (könyvben)', '이십 쪽', 'huszadik oldal'],
    ['주년', 'évforduló', '일주년', 'első évforduló'],
    ['인분', 'adag', '이 인분', 'két adag'],
    ['개월', 'hónap (időtartam)', '육 개월', 'hat hónap'],
    ['주일', 'hét (időtartam)', '이 주일', 'két hét'],
    ['학년', 'évfolyam', '삼 학년', 'harmadik évfolyam'],
    ['세', 'életkor (hivatalos)', '이십 세', 'húszéves (hivatalos)'],
  ] as [string, string, string, string][]
).map(counterRow);

const bothRows: Text[][] = [
  [
    koreanGlossedInRow('번'),
    koreanWithTranslation('한 번', 'egyszer'),
    koreanWithTranslation('일 번', '1-es szám'),
    'alkalom, illetve sorszám',
  ],
  [
    koreanGlossedInRow('분'),
    koreanWithTranslation('두 분', 'két fő (tiszteleti)'),
    koreanWithTranslation('이 분', 'két perc'),
    'ember, illetve perc',
  ],
  [
    koreanGlossedInRow('달 / 개월'),
    koreanWithTranslation('한 달', 'egy hónap'),
    koreanWithTranslation('일 개월', 'egy hónap'),
    text`ugyanazt jelenti; a ${koreanGlossedInRow('달')} hétköznapi, a ${koreanGlossedInRow('개월')} hivatalosabb`,
  ],
  [
    koreanGlossedInRow('살 / 세'),
    koreanWithTranslation('스무 살', 'húszéves'),
    koreanWithTranslation('이십 세', 'húszéves'),
    text`ugyanazt jelenti; a ${koreanGlossedInRow('살')} hétköznapi, a ${koreanGlossedInRow('세')} hivatalos, írott`,
  ],
];

export const numbersIntro: Content = [
  paragraph`A koreaiban ${bold('két számsor')} van, és a számlálószó (vagy a helyzet) dönti el, melyik kell:`,
  list(
    text`a ${bold('koreai eredetű')} számokkal ${bold('megszámolunk')}: darabot, embert, alkalmat; ezzel mondjuk az órát és hétköznapian az életkort is;`,
    text`a ${bold('kínai eredetű')} számokkal ${bold('számozunk és mérünk')}: dátum, perc, pénz, emelet, telefonszám.`
  ),
];

const cards: [id: NumbersCard['id'], title: string, content: Content][] = [
  [
    'numbers-numerals',
    'Koreai és kínai eredetű számok',
    [
      paragraph`A kínai eredetű számokat az ${reference('lesson-1A-2', '1A 2. lecke')}, a koreai eredetűeket az ${reference('lesson-1A-6', '1A 6. lecke')} szókincse hozza. Koreai eredetű szám csak 1-től 99-ig van.`,
      simpleTable(['Szám', 'Koreai eredetű', 'Számlálószó előtt', 'Kínai eredetű'], numberRows),
      list(
        text`${bold('Nulla')}: ${korean('영')} a számtanban, hőmérsékletnél, eredményben; ${korean('공')} telefon- és szobaszámban, számjegyenként mondva: ${korean('공일공')} „010”.`,
        text`${bold('Összetett számok')}: tízes + egyes, mindkét sorban: ${korean('스물하나')}, illetve ${korean('이십일')} „21”.`,
        text`${bold('Rövid alak')} számlálószó előtt: az utolsó tag rövidül, ${korean('열두 명')} „tizenkét fő”, ${korean('서른세 살')} „harminchárom éves”. A ${korean('스무')} csak a kerek 20: ${korean('스무 개')} „húsz darab”, de ${korean('스물한 개')} „huszonegy darab”.`,
        text`${bold('100-tól')} a százas mindig kínai eredetű, a maradék lehet koreai: ${korean('백다섯 개')} „százöt darab”. Nagyobb mennyiségnél már 100 alatt is gyakori a kínai: ${korean('오십 명')} „ötven fő”.`,
        text`${bold('Kiejtés')}: ${korean('여덟')} [여덜] (${reference('pronunciation-double-final-consonant', 'Kiejtés 3.')}), ${korean('십육')} [심뉵] (${reference('pronunciation-n-insertion', 'Kiejtés 8.')}).`
      ),
    ],
  ],
  [
    'numbers-large',
    'Nagy számok',
    [
      paragraph`Csak kínai eredetűek. A koreai ${bold('tízezresével')} csoportosít: az ezer után a ${korean('만')} (10\u00a0000) az új egység, ezért a számjegyeket hátulról ${bold('négyesével')} érdemes tagolni: 35\u00a0000 = 3|5000 → ${korean('삼만 오천')}, 128\u00a0000 = 12|8000 → ${korean('십이만 팔천')}.`,
      simpleTable(['Szám', 'Kínai eredetű', 'Magyarul', 'Felépítés'], largeNumberRows),
      paragraph`Az elöl álló 1-et nem mondjuk: ${korean('백 원')} „száz von”, ${korean('천 원')} „ezer von”, ${korean('만 원')} „tízezer von” (nem ${korean('일만 원')}). Kiejtés: ${korean('십만')} [심만], ${korean('백만')} [뱅만] (${reference('pronunciation-nasalization', 'Kiejtés 6.')}).`,
      exampleList([
        ['이 가방은 삼만 오천 원이에요.', 'Ez a táska harmincötezer von.'],
        ['비행기표가 백이십만 원이에요.', 'A repülőjegy egymillió-kétszázezer von.'],
      ]),
    ],
  ],
  [
    'numbers-native-counters',
    'Számlálószavak koreai eredetű számmal',
    [
      paragraph`Sorrend: ${bold('főnév + szám + számlálószó')} (${reference('1A-06-1')}). Az 1–4 és a 20 rövid alakot kap: ${korean('한, 두, 세, 네, 스무')}.`,
      simpleTable(COUNTER_HEADERS, nativeCounterRows),
    ],
  ],
  [
    'numbers-sino-counters',
    'Számlálószavak kínai eredetű számmal',
    [
      paragraph`A szám alakja mindig ugyanaz, nincs rövid alakja.`,
      simpleTable(COUNTER_HEADERS, sinoCounterRows),
      paragraph`Eltelt időnél is a számlálószó dönt (${reference('3A-07-1')}): ${korean('한국에 온 지 육 개월 됐어요')} „hat hónapja jöttem Koreába”, de ${korean('한국에 온 지 여섯 달 됐어요')} ugyanezzel a jelentéssel.`,
    ],
  ],
  [
    'numbers-both',
    'Ugyanaz, két számsorral',
    [
      paragraph`Van, ahol a számsor változtatja meg a jelentést, és van, ahol két számlálószó jelenti ugyanazt:`,
      simpleTable(['Szó', 'Koreai eredetű számmal', 'Kínai eredetű számmal', 'Különbség'], bothRows),
    ],
  ],
  [
    'numbers-date-and-time',
    'Dátum és idő',
    [
      list(
        text`${bold('Dátum')}: az év, a hónap és a nap is kínai eredetű szám: ${korean('이천이십육 년 삼월 십오 일')} „2026. március 15.” (${reference('lesson-1A-7', '1A 7. lecke')}). Két hónapnév rendhagyó: ${korean('유월')} „június” (nem ${korean('육월')}) és ${korean('시월')} „október” (nem ${korean('십월')}). Kérdés: ${korean('몇 월 며칠이에요?')} „Hányadika van?”`,
        text`${bold('Időpont')}: az óra koreai, a perc kínai eredetű: ${korean('세 시 이십오 분')} „3 óra 25 perc” (${reference('1A-07-2')}).`,
        text`${bold('Menetrend, hivatalos idő')}: a 24 órás időben az óra is kínai eredetű: ${korean('십오 시 삼십 분')} „15:30”.`,
        text`${bold('Időtartam')}: az óra koreai, a perc kínai eredetű: ${korean('두 시간 삼십 분')} „két és fél óra”.`
      ),
      exampleList([
        ['오늘은 유월 십 일이에요.', 'Ma június 10. van.'],
        ['기차가 십오 시 삼십 분에 출발해요.', 'A vonat 15:30-kor indul.'],
        ['집에서 회사까지 한 시간 이십 분 걸려요.', 'Otthonról a munkahelyig egy óra húsz perc az út.'],
      ]),
    ],
  ],
];

export const numbersCards: NumbersCard[] = cards.map(([id, title, content], index) => ({
  id,
  title: `${index + 1}. ${title}`,
  content,
}));
