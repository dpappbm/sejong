import {
  bold,
  comparisonTable,
  exampleList,
  korean,
  list,
  paragraph,
  reference,
  simpleTable,
  text,
} from '../../lib/richText';
import {
  createWord,
  plainStyleStatement,
  withAOrEo,
  withEu,
  withPast,
  withPlainStem,
  type Word,
} from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';
const vocabularyGrammarPageOf = (lesson: number, point: number) => 24 + 2 * (lesson - 1) + (point - 1),
  studentBookPageOf = (lesson: number, point: number) => 16 + 8 * (lesson - 1) + (point - 1);
const isItdaOrEopda = (word: Word) => /(있|없)다$/.test(word.dictionaryForm);
const presentModifier = (word: Word, ending: string) =>
  word.wordClass === 'verb' || isItdaOrEopda(word) ? withPlainStem(word, '는' + ending) : withEu(word, 'ㄴ' + ending);
const VERBS_WITH_BODA = [
  createWord('가다', 'verb'),
  createWord('먹다', 'verb'),
  createWord('공부하다', 'verb'),
  createWord('만들다', 'verb'),
  createWord('보다', 'verb'),
];

const points: PointSource[] = [
  {
    lesson: 1,
    point: 1,
    form: '-니?, -자',
    name: 'tegező kérdés (-니?) és javaslat (-자)',
    explanation: [
      paragraph`Két ${bold('반말')} (tegező) végződés, fiatalabbaknak és közeli barátoknak:`,
      list(
        text`${bold('-니?')}: kérdés. Ige, melléknév, ${korean('이다')} után, és a ${korean('-(으)시-, -았/었-, -겠-')} után is: ${korean('먹니?, 바쁘니?, 학생이니?, 갔니?')}. ㄹ-tőnél az ㄹ kiesik: ${korean('사니?')}`,
        text`${bold('-자')}: javaslat („…-junk”). Csak igével: ${korean('가자, 먹자')}.`
      ),
      paragraph`Mindkettő a tő végétől függetlenül ugyanaz.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-니?', conjugate: word => withPlainStem(word, '니?') },
        {
          header: 'Múlt: -았니?/었니?',
          conjugate: word => withPast(word, '니?'),
        },
        {
          header: '-자 (csak ige)',
          conjugate: word => (word.wordClass === 'verb' ? withPlainStem(word, '자') : null),
        },
      ],
    },
    examples: [
      [text`그동안 어떻게 지냈${bold('니')}?`, 'Hogy voltál mostanában?'],
      [text`요즘 회사 일이 바쁘${bold('니')}?`, 'Sok a munka mostanában a cégnél?'],
      [text`주말에 같이 영화 보${bold('자')}.`, 'Nézzünk meg együtt egy filmet a hétvégén.'],
      [
        text`우리 이 노래 같이 듣${bold('자')}.`,
        'Hallgassuk meg együtt ezt a dalt.',
        '-자 előtt nincs ㄷ-változás: 듣자',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-니?')} kicsit „felülről” kérdez (szülő gyereknek, idősebb fiatalabbnak); barátok közt a sima ${korean('-아/어?')} (${korean('뭐 해?')}) gyakoribb. A ${korean('-자')} tagadása: ${korean('-지 말자')} („ne …-junk”).`,
    ],
  },
  {
    lesson: 1,
    point: 2,
    form: '-아/어 보이다',
    name: '„…-nak/-nek látszik, … tűnik”',
    explanation: [
      paragraph`Melléknév után azt fejezi ki, hogy valami ${bold('külsőre, ránézésre olyannak tűnik')}: ${korean('피곤해 보여요')} „fáradtnak tűnsz”. A ${bold('-아/어')} szabály szerint (ㅏ, ㅗ → ${korean('-아 보이다')}, egyéb → ${korean('-어 보이다')}, 하다 → ${korean('해 보이다')}).`,
    ],
    table: {
      additionalWords: [
        '넓다',
        '바쁘다',
        '편안하다',
        '맛있다',
        '무섭다',
        '친절하다',
        '비싸다',
        '크다',
        '피곤하다',
        '슬프다',
      ],
      sampleSet: 'adjectives',
      columns: [
        {
          header: '-아/어 보여요',
          conjugate: word => withAOrEo(word, ' 보여요'),
        },
      ],
    },
    examples: [
      [text`요즘 좀 피곤${bold('해 보여요')}.`, 'Mostanában kicsit fáradtnak tűnsz.'],
      [text`이 음식이 정말 맛있${bold('어 보여요')}.`, 'Ez az étel nagyon finomnak tűnik.'],
      [
        text`그 가방 무거${bold('워 보여요')}. 제가 들어 줄게요.`,
        'Nehéznek tűnik az a táska. Majd én viszem.',
        'ㅂ-rendhagyó: 무겁다 → 무거워 보여요',
      ],
      [text`오늘 기분이 좋${bold('아 보이네요')}.`, 'Ma jókedvűnek tűnsz!'],
    ],
    ownNote: [
      paragraph`Főnévvel: ${korean('N처럼 보이다')} vagy ${korean('N 같아 보이다')}: ${korean('학생처럼 보여요')}. A ${korean('보이다')} maga ragozódik: ${korean('보여요, 보였어요')}.`,
    ],
  },
  {
    lesson: 2,
    point: 1,
    form: '-는다고/ㄴ다고/다고 하다',
    name: 'függő beszéd: kijelentés idézése („azt mondja, hogy …”)',
    explanation: [
      paragraph`Más ember ${bold('kijelentését adjuk tovább')}: „Azt mondja, hogy …”. Az idézett mondat egyszerű (한다체) alakot kap, és ${korean('-고 하다')} követi:`,
      list(
        text`${bold('Ige')}: 받침 után ${korean('-는다고')}, magánhangzó után ${korean('-ㄴ다고')}, ㄹ-tőnél az ㄹ kiesik: ${korean('만든다고')}`,
        text`${bold('Melléknév')} (és ${korean('있다/없다')}): ${korean('-다고')}`,
        text`${bold('Főnév')}: 받침 után ${korean('-이라고')}, magánhangzó után ${korean('-라고')}`,
        text`${bold('Múlt')}: ${korean('-았다고/었다고')}; ${bold('jövő')}: ${korean('-(으)ㄹ 거라고')}`
      ),
    ],
    table: {
      additionalWords: ['가다', '아프다', '살다', '받다', '자다', '공부하다', '듣다', '맛있다', '맑다', '재미있다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [
        {
          header: 'Jelen',
          conjugate: word => plainStyleStatement(word) + '고 해요',
        },
        { header: 'Múlt', conjugate: word => withPast(word, '다고 해요') },
        { header: 'Jövő', conjugate: word => withEu(word, 'ㄹ 거라고 해요') },
      ],
    },
    examples: [
      [text`지수가 요즘 좀 바쁘${bold('다고 해')}.`, 'Dzsisu azt mondja, mostanában elég elfoglalt.'],
      [text`마크 씨가 주말에 이사${bold('한다고 해요')}.`, 'Mark azt mondja, hétvégén költözik.'],
      [text`뉴스에서 내일 비가 ${bold('올 거라고 했어요')}.`, 'A hírekben azt mondták, holnap esni fog.'],
      [
        text`친구가 그 노래를 매일 듣${bold('는다고 해요')}.`,
        'A barátom azt mondja, minden nap azt a dalt hallgatja.',
        '-는다 előtt nincs ㄷ-változás: 듣는다고',
      ],
    ],
    ownNote: [
      paragraph`A beszélő szempontjából változnak a névmások: ha valaki azt mondja „én”, az idézetben ${korean('자기')} vagy a neve áll. A ${korean('하다')} helyett állhat ${korean('말하다, 듣다')} is: ${korean('… 다고 들었어요')} „azt hallottam, hogy …”.`,
    ],
  },
  {
    lesson: 2,
    point: 2,
    form: '-나/(으)ㄴ가 보다',
    name: '„úgy látszik, …; biztos …” (következtetés)',
    explanation: [
      paragraph`Abból, amit ${bold('láttunk vagy hallottunk')}, következtetünk valamire: „úgy tűnik, hogy …”. Első személyről nem használjuk.`,
      list(
        text`${bold('Ige')} (és ${korean('있다/없다')}): ${korean('-나 보다')} (ㄹ kiesik: ${korean('사나 보다')}); a könyv szerint ${korean('-는가 보다')} is lehet`,
        text`${bold('Melléknév')}: 받침 után ${korean('-은가 보다')}, magánhangzó után ${korean('-ㄴ가 보다')}`,
        text`${bold('Főnév')}: ${korean('-인가 보다')}; ${bold('múlt')}: ${korean('-았나/었나 보다')}`
      ),
    ],
    table: {
      additionalWords: ['오다', '크다', '늦다', '자다', '듣다', '바쁘다', '춥다', '피곤하다', '전화하다', '재미있다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [
        {
          header: 'Jelen',
          conjugate: word =>
            word.wordClass === 'verb' || isItdaOrEopda(word)
              ? withPlainStem(word, '나 봐요')
              : withEu(word, 'ㄴ가 봐요'),
        },
        {
          header: 'Múlt: -았나/었나 봐요',
          conjugate: word => withPast(word, '나 봐요'),
        },
      ],
    },
    examples: [
      [
        text`마크 씨가 요즘 바${bold('쁜가 봐요')}. 연락이 없어요.`,
        'Mark mostanában biztos elfoglalt, nem jelentkezik.',
      ],
      [
        text`밖에 비가 오${bold('나 봐요')}. 사람들이 우산을 쓰고 있어요.`,
        'Úgy látszik, kint esik: az emberek esernyőt tartanak.',
      ],
      [text`지수 씨가 기분이 좋${bold('은가 봐요')}.`, 'Dzsisu úgy tűnik, jókedvű.'],
      [
        text`날씨가 많이 ${bold('추운가 봐요')}. 다들 코트를 입었어요.`,
        'Biztos nagyon hideg van, mindenki kabátot visel.',
        'ㅂ-rendhagyó: 춥다 → 추운가 봐요',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-는/(으)ㄴ/(으)ㄹ 것 같다')} (${reference('2A-09-1')}) a beszélő benyomását is kifejezheti, a ${korean('-나/(으)ㄴ가 보다')} viszont mindig ${bold('külső jelből')} (láttam, hallottam) következtet.`,
    ],
    correctIncorrect: [
      { correct: '마크 씨가 배가 고픈가 봐요.', translation: 'Mark biztos éhes.' },
      { incorrect: '제가 배가 고픈가 봐요.', reason: 'első személyre nem' },
    ],
  },
  {
    lesson: 3,
    point: 1,
    form: '-(으)ㄹ까 하다',
    name: '„azon gondolkodom, hogy …” (bizonytalan terv)',
    explanation: [
      paragraph`Ige után a beszélő ${bold('bizonytalan szándékát')}, még ${bold('változhat terveit')} fejezi ki: „arra gondoltam, hogy talán …”. Gyakran ${korean('-(으)ㄹ까 해요')} vagy ${korean('-(으)ㄹ까 생각 중이에요')}.`,
      paragraph`${bold('받침')} után: ${bold('-을까 하다')}, magánhangzó után: ${bold('-ㄹ까 하다')}, ㄹ-tőnél: ${korean('만들까 하다')}.`,
    ],
    table: {
      additionalWords: ['가다', '읽다', '살다', '듣다', '자다', '묻다', '놀다', '운동하다', '먹다', '짓다'],
      sampleSet: 'verbs',
      columns: [
        {
          header: '-(으)ㄹ까 해요',
          conjugate: word => withEu(word, 'ㄹ까 해요'),
        },
      ],
    },
    examples: [
      [text`이번에 이사를 ${bold('할까 해요')}.`, 'Arra gondoltam, hogy most költözöm.'],
      [text`주말에 집에서 김치를 ${bold('만들까 해요')}.`, 'Azon gondolkodom, hogy hétvégén kimcsit csinálok.'],
      [
        text`방학에 한국어 수업을 들${bold('을까 해요')}.`,
        'Arra gondolok, hogy a szünetben koreai órákat veszek.',
        'ㄷ-rendhagyó: 듣다 → 들을까',
      ],
      [text`오늘은 일찍 ${bold('잘까 해요')}.`, 'Ma talán korán lefekszem.'],
    ],
    ownNote: [
      paragraph`Mennyire biztos? ${korean('-(으)ㄹ 거예요')} (biztos terv) → ${korean('-(으)려고 해요')} (szándék) → ${korean('-(으)ㄹ까 해요')} (még csak fontolgatom). Múltban: ${korean('-(으)ㄹ까 했어요')} „gondoltam rá, (de…)”.`,
    ],
  },
  {
    lesson: 3,
    point: 2,
    form: '-지만 않으면',
    name: '„csak (az) ne …, és …; feltéve, hogy nem …”',
    explanation: [
      paragraph`Ige vagy melléknév után egy ${bold('nem kívánt helyzetet zár ki')} feltételként: „ha csak nem …”, „feltéve, hogy nem …”. A tő végétől függetlenül ${korean('-지만 않으면')}. Főnévvel: ${korean('N만 아니면')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        {
          header: '-지만 않으면',
          conjugate: word => withPlainStem(word, '지만 않으면'),
        },
      ],
    },
    examples: [
      [text`역에서 멀${bold('지만 않으면')} 괜찮아요.`, 'Ha nincs messze az állomástól, jó lesz.'],
      [text`비가 오${bold('지만 않으면')} 내일 등산 갈 거예요.`, 'Ha csak nem esik, holnap túrázni megyünk.'],
      [
        text`너무 시끄럽${bold('지만 않으면')} 이 집으로 할게요.`,
        'Ha nem túl zajos, ezt a lakást választom.',
        '-지 előtt nincs ㅂ-változás: 시끄럽지',
      ],
      [
        text`월세가 비싸${bold('지만 않으면')} 바로 이사하고 싶어요.`,
        'Ha a lakbér nem drága, azonnal be szeretnék költözni.',
      ],
      [text`주말${bold('만 아니면')} 언제든지 괜찮아요.`, 'Bármikor jó, csak ne hétvégén.', { uses: ['4B-01-2'] }],
    ],
  },
  {
    lesson: 4,
    point: 1,
    form: '-고 나서',
    name: '„miután befejezte …, (utána) …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy az első cselekvést ${bold('befejezzük')}, és ${bold('utána')} jön a második. A tő végétől függetlenül ${korean('-고 나서')}. Felcserélhető a ${korean('-(으)ㄴ 후에')}-vel.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        {
          header: '-고 나서',
          conjugate: word => withPlainStem(word, '고 나서'),
        },
      ],
    },
    examples: [
      [text`청소를 하${bold('고 나서')} 빨래를 할게요.`, 'Miután kitakarítottam, kimosok.'],
      [text`밥을 먹${bold('고 나서')} 설거지를 했어요.`, 'Evés után elmosogattam.'],
      [
        text`설명을 듣${bold('고 나서')} 질문하세요.`,
        'A magyarázat meghallgatása után kérdezzen.',
        '-고 előtt nincs ㄷ-változás: 듣고',
      ],
      [text`숙제를 다 하${bold('고 나서')} 게임을 해요.`, 'Csak miután az összes házit megcsináltam, játszom.'],
    ],
    ownNote: [
      paragraph`A sima ${korean('-고')} is jelenthet időrendet, a ${korean('-고 나서')} azt hangsúlyozza, hogy az első ${bold('teljesen befejeződött')}. A ${korean('-아서/어서')} (${reference('1B-10-2')}) kapcsolódó cselekvésekre kell (${korean('가서, 만나서')}), ezeknél a ${korean('-고 나서')} nem természetes.`,
    ],
  },
  {
    lesson: 4,
    point: 2,
    form: '-(으)ㄹ 테니까',
    name: '„én majd …, (úgyhogy) te …” (szándék + kérés)',
    explanation: [
      paragraph`Ige után a beszélő ${bold('szándékát')} mondja ki, és erre alapozva ${bold('kér vagy javasol')} valamit a hallgatónak: „Én kitakarítom a nappalit, te csináld a konyhát.” A második tagmondat gyakran ${korean('-(으)세요, -아/어 주세요, -(으)ㄹ래요?')}`,
      paragraph`${bold('받침')} után: ${bold('-을 테니까')}, magánhangzó után: ${bold('-ㄹ 테니까')}, ㄹ-tőnél: ${korean('만들 테니까')}. ${bold('Feltételezést')} is kifejezhet: „biztos …, úgyhogy …”.`,
    ],
    table: {
      additionalWords: ['가다', '놀다', '사다', '자다', '먹다', '읽다', '오다', '준비하다', '듣다', '돕다'],
      sampleSet: 'verbs',
      columns: [
        {
          header: '-(으)ㄹ 테니까',
          conjugate: word => withEu(word, 'ㄹ 테니까'),
        },
      ],
    },
    examples: [
      [
        text`나는 거실 청소를 ${bold('할 테니까')} 넌 주방 청소를 해 줘.`,
        'Én kitakarítom a nappalit, te csináld meg a konyhát.',
      ],
      [text`제가 음식을 ${bold('만들 테니까')} 마크 씨는 음료수를 사 오세요.`, 'Én megfőzöm az ételt, te hozz italt.'],
      [text`제가 짐을 들어 ${bold('줄 테니까')} 문 좀 열어 주세요.`, 'Én viszem a csomagokat, te nyisd ki az ajtót.'],
      [text`길이 많이 ${bold('막힐 테니까')} 지하철을 타세요.`, 'Biztos nagy lesz a dugó, menj metróval.'],
      [
        text`제가 이사를 도${bold('울 테니까')} 걱정하지 마세요.`,
        'Majd én segítek a költözésben, ne aggódj.',
        'ㅂ-rendhagyó: 돕다 → 도울 테니까',
      ],
    ],
    ownNote: [
      paragraph`Az első tagmondat alanya a beszélő (szándék esetén), a másodiké a hallgató. Feltételezés jelentésben melléknévvel is: ${korean('추울 테니까 따뜻하게 입어')} „biztos hideg lesz, öltözz fel melegen”.`,
    ],
  },
  {
    lesson: 5,
    point: 1,
    form: '-아/어 보니까',
    name: '„amikor kipróbáltam, rájöttem, hogy …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy ${bold('tapasztalat után')} új tényre, érzésre, gondolatra jöttünk rá. A második tagmondat általában ${bold('múlt')} idejű vagy a felismert állapot. A ${bold('-아/어')} szabály szerint; a ${korean('보다')} ige esetén csak ${korean('보니까')} (nem ${korean('봐 보니까')}).`,
    ],
    table: {
      additionalWords: ['가다', '배우다', '신다', '받다', '잡다', '여행하다', '만들다', '보다', '듣다', '운전하다'],
      words: VERBS_WITH_BODA,
      irregularWords: [
        createWord('듣다', 'verb'),
        createWord('돕다', 'verb'),
        createWord('짓다', 'verb'),
        createWord('부르다', 'verb'),
        createWord('쓰다', 'verb'),
      ],
      columns: [
        {
          header: '-아/어 보니까',
          conjugate: word => (word.dictionaryForm === '보다' ? '보니까' : withAOrEo(word, ' 보니까')),
        },
      ],
    },
    examples: [
      [
        text`집에 와서 입어 ${bold('보니까')} 옷이 좀 작았어요.`,
        'Otthon felpróbáltam, és kiderült, hogy a ruha kicsit kicsi.',
      ],
      [
        text`한국 음식을 먹어 ${bold('보니까')} 생각보다 안 매웠어요.`,
        'Amikor megkóstoltam a koreai ételt, kevésbé volt csípős, mint gondoltam.',
      ],
      [
        text`그 노래를 들어 ${bold('보니까')} 정말 좋았어요.`,
        'Meghallgattam azt a dalt, és tényleg nagyon jó volt.',
        'ㄷ-rendhagyó: 듣다 → 들어 보니까',
      ],
      [text`영수증을 ${bold('보니까')} 가격이 잘못됐어요.`, 'Ránéztem a blokkra, és rossz volt rajta az ár.'],
    ],
    ownNote: [
      paragraph`A ${korean('-(으)니까')} felfedezés-jelentésének (${reference('2B-07-2')}) változata; a ${korean('-아/어 보다')} itt azt emeli ki, hogy szándékosan kipróbáltunk valamit.`,
      paragraph`A második tagmondat a már megszerzett tapasztalat ${bold('eredménye')}: múlt idejű, vagy jelen idejű állapot (${korean('입어 보니까 딱 맞아요')}). ${bold('Jövő idő, szándék, felszólítás nem')} állhat utána.`,
      paragraph`Ez a ${bold('próba')} alakja. Ha hosszú vagy ismétlődő ${bold('folyamat')} vezetett a felismeréshez, ${korean('-다 보니까')} kell (${reference('3A-11-1')}, ott a részletes összevetés): ${korean('한번 먹어 보니까 맛있었어요')} (megkóstoltam, és finom volt), de ${korean('매일 먹다 보니까 좋아하게 됐어요')} (minden nap ettem, és megszerettem).`,
    ],
    correctIncorrect: [
      {
        incorrect: '옷을 입어 보니까 잘 맞을 거예요.',
        reason: 'a felismerés már megtörtént, utána nem jöhet jövő idő',
      },
      { correct: '옷을 입어 보니까 딱 맞았어요.', translation: 'Felpróbáltam a ruhát, és pont jó volt.' },
      { incorrect: '영화를 봐 보니까 더 재미있었어요.', reason: 'a 보다 igénél csak 보니까' },
      { correct: '영화를 보니까 더 재미있었어요.', translation: 'Amikor megnéztem a filmet, még érdekesebb volt.' },
    ],
  },
  {
    lesson: 5,
    point: 2,
    form: '-(으)려면',
    name: '„ha … akarsz, (akkor) …”',
    explanation: [
      paragraph`Ige után ${bold('szándékot, tervet')} állít fel feltételként: „ha X-et akarod, akkor Y kell”. A második tagmondat gyakran ${korean('-아야/어야 되다, -(으)세요, 필요하다')}.`,
      paragraph`${bold('받침')} után: ${bold('-으려면')}, magánhangzó és ${bold('ㄹ')} után: ${bold('-려면')} (${korean('만들려면')}).`,
    ],
    table: {
      additionalWords: ['사다', '모으다', '보다', '만나다', '부르다', '일하다', '먹다', '걷다', '만들다', '등산하다'],
      sampleSet: 'verbs',
      columns: [{ header: '-(으)려면', conjugate: word => withEu(word, '려면') }],
    },
    examples: [
      [text`환불하${bold('려면')} 영수증이 필요합니다.`, 'A visszatérítéshez szükség van a blokkra.'],
      [text`명동에 가${bold('려면')} 4호선을 타세요.`, 'Ha Myeongdongba akarsz menni, szállj fel a 4-es metróra.'],
      [
        text`한국어를 잘하${bold('려면')} 매일 들${bold('어야 돼요')}.`,
        'Ha jól akarsz koreaiul, minden nap hallgatnod kell.',
        'ㄷ-rendhagyó: 듣다 → 들어야',
      ],
      [
        text`김치를 맛있게 만들${bold('려면')} 좋은 재료가 필요해요.`,
        'Ha finom kimcsit akarsz csinálni, jó alapanyag kell.',
        'ㄹ-tő: 만들다 → 만들려면',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-(으)면')} egyszerű feltétel, a ${korean('-(으)려면')} = ${korean('-(으)려고 하면')} a szándékot teszi feltétellé.`,
      paragraph`Utána ${bold('felszólítás és javaslat is')} állhat, a ${korean('-아야/어야')} (${reference('3A-10-2')}) után viszont nem:`,
      exampleList([['숙제를 하려면 지금 같이 합시다.', 'Ha meg akarod csinálni a házit, csináljuk most együtt.']]),
      paragraph`${bold('Átfordítás:')} ha a cél a mondat végére kerül, ${korean('-(으)면 … -(으)ㄹ 수 있어요')} lesz belőle:`,
      exampleList([
        [
          '싸고 예쁜 옷을 사려면 학교 근처에 있는 옷 가게에 가 보세요.',
          'Ha olcsó és szép ruhát akarsz venni, nézz be az iskola közelében lévő ruhaboltba.',
        ],
        [
          '학교 근처에 있는 옷 가게에 가면 싸고 예쁜 옷을 살 수 있어요.',
          'Ha elmész az iskola közelében lévő ruhaboltba, olcsó és szép ruhát vehetsz.',
        ],
        ['시험에 합격하려면 열심히 공부해야 해요.', 'Ha át akarsz menni a vizsgán, keményen kell tanulnod.'],
        ['열심히 공부하면 시험에 합격할 수 있어요.', 'Ha keményen tanulsz, átmehetsz a vizsgán.'],
      ]),
      paragraph`${bold('Melléknévvel')} csak akkor természetes, ha olyan állapotot jelöl, amit el lehet érni: ${korean('행복하려면')} „ha boldog akarsz lenni”, ${korean('건강하려면')} „ha egészséges akarsz lenni”. Egyébként ${korean('-아지려면/어지려면')} (${reference('3A-09-1')}): ${korean('예뻐지려면')} „ha szebb akarsz lenni”.`,
    ],
    correctIncorrect: [
      { correct: '학교에 가려면 버스를 타야 돼요.', translation: 'Ha iskolába akarsz menni, buszra kell szállnod.' },
      { incorrect: '학교에 가면 버스를 타야 돼요.', reason: 'így azt jelenti: „ha (már) mész”' },
    ],
  },
  {
    lesson: 6,
    point: 1,
    form: '-잖아요',
    name: '„hiszen …; tudod, hogy …”',
    explanation: [
      paragraph`Ige vagy melléknév után olyasmit mond ki, amit a beszélő szerint ${bold('a hallgató is tud')} (vagy tudnia kellene); ${bold('emlékeztet')}, vagy indokként hivatkozik rá: „Hiszen tegnap mondtam!” A tő végétől függetlenül ${korean('-잖아요')}; múlt: ${korean('-았잖아요/었잖아요')}, főnév: ${korean('-(이)잖아요')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        {
          header: '-잖아요',
          conjugate: word => withPlainStem(word, '잖아요'),
        },
        {
          header: 'Múlt: -았잖아요/었잖아요',
          conjugate: word => withPast(word, '잖아요'),
        },
      ],
    },
    examples: [
      [
        text`이 노트북은 3년 전에 샀${bold('잖아요')}. 그래서 자주 고장 나요.`,
        'Hiszen ezt a laptopot három éve vettem, ezért romlik el gyakran.',
      ],
      [text`어제 제가 말${bold('했잖아요')}.`, 'Hiszen tegnap megmondtam!'],
      [
        text`오늘 날씨가 ${bold('춥잖아요')}. 따뜻하게 입으세요.`,
        'Hiszen ma hideg van. Öltözz fel melegen.',
        '-잖아요 előtt nincs ㅂ-változás: 춥잖아요',
      ],
      [text`마크 씨는 한국 사람${bold('이잖아요')}.`, 'Hiszen Mark koreai.'],
    ],
    ownNote: [
      paragraph`Idősebbnek óvatosan használjuk, mert szemrehányóan is hangozhat („ezt neked tudnod kellene”). 반말-ban: ${korean('-잖아')}.`,
    ],
  },
  {
    lesson: 6,
    point: 2,
    form: '-(으)려다가',
    name: '„… akartam, de (végül) …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy valamit ${bold('szándékoztunk')} megtenni, de ${bold('közbejött valami')}, ezért abbahagytuk vagy mást csináltunk.`,
      paragraph`${bold('받침')} után: ${bold('-으려다가')}, magánhangzó és ${bold('ㄹ')} után: ${bold('-려다가')}.`,
    ],
    table: {
      additionalWords: ['보다', '듣다', '사다', '배우다', '찾다', '마시다', '씻다', '게임하다', '살다', '돕다'],
      sampleSet: 'verbs',
      columns: [{ header: '-(으)려다가', conjugate: word => withEu(word, '려다가') }],
    },
    examples: [
      [
        text`새로 사${bold('려다가')} 수리해서 쓰고 있어요.`,
        'Újat akartam venni, de inkább megjavíttattam, és azt használom.',
      ],
      [
        text`버스를 타${bold('려다가')} 사람이 너무 많아서 걸어왔어요.`,
        'Buszra akartam szállni, de túl sokan voltak, ezért gyalog jöttem.',
      ],
      [text`라면을 먹${bold('으려다가')} 밥을 했어요.`, 'Ramyeont akartam enni, de végül rizst főztem.'],
      [
        text`음악을 들${bold('으려다가')} 그냥 잤어요.`,
        'Zenét akartam hallgatni, de inkább lefeküdtem aludni.',
        'ㄷ-rendhagyó: 듣다 → 들으려다가',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-(으)려고 하다')} + ${korean('-다가')} összevonása. A két tagmondat alanya azonos.`,
    ],
  },
  {
    lesson: 7,
    point: 1,
    form: '-(으)ㄴ 지',
    name: '„… óta (eltelt idő)”',
    explanation: [
      paragraph`Ige után azt fejezi ki, mennyi ${bold('idő telt el')} egy cselekvés óta. Szerkezete: ${korean('-(으)ㄴ 지 + idő + 되다 / 지나다')}. Kérdés: ${korean('-(으)ㄴ 지 얼마나 됐어요/지났어요?')}; válasz: ${korean('-(으)ㄴ 지 (idő) 됐어요/지났어요')}. A ${korean('지났어요')}-t inkább rövidebb időre mondjuk.`,
      paragraph`${bold('받침')} után: ${bold('-은 지')}, magánhangzó után: ${bold('-ㄴ 지')}, ㄹ-tőnél az ㄹ kiesik: ${korean('산 지')}.`,
    ],
    table: {
      additionalWords: ['먹다', '살다', '사다', '듣다', '자다', '만나다', '찾다', '배우다', '입다', '돕다'],
      sampleSet: 'verbs',
      columns: [
        {
          header: '-(으)ㄴ 지 1년 됐어요',
          conjugate: word => withEu(word, 'ㄴ 지 1년 됐어요'),
        },
      ],
    },
    examples: [
      [text`여자 친구하고 만${bold('난 지')} 곧 3년이 돼.`, 'Nemsokára három éve járunk a barátnőmmel.'],
      [text`한국어를 배${bold('운 지')} 얼마나 됐어요?`, 'Mióta tanulsz koreaiul?'],
      [text`서울에 ${bold('산 지')} 5년이 됐어요.`, 'Öt éve élek Szöulban.', 'ㄹ-tő: 살다 → 산 지'],
      [text`밥을 먹${bold('은 지')} 30분밖에 안 지났어요.`, 'Csak fél órája ettem.'],
    ],
    ownNote: [
      paragraph`A ${korean('지')} itt önálló szó („idő, óta”), ezért mindig ${bold('szóközzel')} írjuk: ${korean('만난 지')}. Napokra, hónapokra: ${korean('온 지 일주일 됐어요')} „egy hete jöttem”.`,
    ],
  },
  {
    lesson: 7,
    point: 2,
    form: '-자고 하다',
    name: 'függő beszéd: javaslat idézése („azt javasolta, hogy …-junk”)',
    explanation: [
      paragraph`Más ${bold('javaslatát, ajánlatát')} adjuk tovább: „azt mondta, menjünk …”. Az eredeti javaslat (${korean('같이 가요 / 갑시다 / 가자')}) ige + ${korean('-자고 하다')} lesz, a tő végétől függetlenül. Más idéző ige is állhat: ${korean('-자고 했어요 / 말했어요')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        {
          header: '-자고 했어요',
          conjugate: word => withPlainStem(word, '자고 했어요'),
        },
        {
          header: 'Tagadó: -지 말자고 했어요',
          conjugate: word => withPlainStem(word, '지 말자고 했어요'),
        },
      ],
    },
    examples: [
      [
        text`친구가 주말에 같이 영화를 보${bold('자고 했어요')}.`,
        'A barátom azt javasolta, hogy hétvégén nézzünk meg együtt egy filmet.',
      ],
      [
        text`여자 친구가 기념일에 여행을 가${bold('자고 해요')}.`,
        'A barátnőm azt mondja, menjünk el utazni az évfordulón.',
      ],
      [
        text`부장님께서 회의를 내일 하${bold('자고 하셨어요')}.`,
        'Az osztályvezető azt javasolta, hogy holnap tartsuk az értekezletet.',
      ],
      [
        text`동생이 같이 음악을 듣${bold('자고 했어요')}.`,
        'Az öcsém azt mondta, hallgassunk együtt zenét.',
        '-자 előtt nincs ㄷ-változás: 듣자고',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-자고 하다')} akkor is jó, ha az eredeti mondat udvarias volt (${korean('같이 갈까요?')}, ${korean('갑시다')}), vagyis nem 반말-t idéz: a ${korean('-자')} itt csak az idézett tartalom formája. Két szereplő a ${korean('-자고 하다')} mellett: kinek mondta (${korean('에게/한테')}).`,
    ],
  },
  {
    lesson: 8,
    point: 1,
    form: '-기 위해서',
    name: '„azért, hogy …; … céljából”',
    explanation: [
      paragraph`Ige után a ${bold('célt, szándékot')} fejezi ki: „azért, hogy …”. A tő végétől függetlenül ${korean('-기 위해서')} (rövidebben ${korean('-기 위해')}). Főnévvel: ${korean('N을/를 위해서')} „valakiért, valami érdekében”.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        {
          header: '-기 위해서',
          conjugate: word => withPlainStem(word, '기 위해서'),
        },
      ],
    },
    examples: [
      [
        text`한글날을 기념하${bold('기 위해서')} 여러 가지 행사를 한다고 해.`,
        'A hangul napja alkalmából (megünneplésére) sokféle rendezvényt tartanak.',
      ],
      [
        text`건강해지${bold('기 위해서')} 매일 운동해요.`,
        'Azért edzek minden nap, hogy egészséges legyek.',
        { uses: ['3A-09-1'] },
      ],
      [
        text`한국 회사에 취직하${bold('기 위해서')} 한국어를 배워요.`,
        'Azért tanulok koreaiul, hogy koreai cégnél helyezkedjek el.',
      ],
      [text`가족${bold('을 위해서')} 열심히 일해요.`, 'A családomért dolgozom keményen.'],
      [
        text`한국 뉴스를 잘 듣${bold('기 위해서')} 매일 연습해요.`,
        'Minden nap gyakorlok, hogy jól értsem a koreai híreket.',
        '-기 előtt nincs ㄷ-változás: 듣기',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-(으)러')} (${reference('1B-02-1')}) csak mozgásigékkel áll, a ${korean('-기 위해서')} bármilyen igével; a ${korean('-(으)려고')} hétköznapibb, a ${korean('-기 위해서')} kicsit hivatalosabb, írottabb.`,
      paragraph`Főnév előtt a ${korean('위하다')} jelzői alakja áll: ${korean('N을/를 위한 + főnév')}, ${korean('-기 위한 + főnév')} „…-ra szánt, … céljára szolgáló”: ${korean('휴식을 위한 시간이 부족해요')} „kevés a pihenésre szánt idő”, ${korean('건강을 지키기 위한 방법')} „az egészség megőrzésének módja”.`,
      paragraph`${bold('Melléknév')} közvetlenül nem állhat előtte. Előbb igévé kell tenni: ${korean('-아지다/어지다')} (${reference('3A-09-1')}) „…-vá válni”, vagy ${korean('-게 하다')} (${reference('4A-06-2')}) „…-vá tenni”.`,
      paragraph`Tagadva ${korean('-지 않기 위해(서)')} „azért, hogy ne …”. Főnévvel a rövid ${korean('위해')} is gyakori:`,
      exampleList([
        ['늦지 않기 위해 일찍 출발했어요.', 'Korán elindultam, hogy ne késsek el.'],
        ['취직한 친구를 위해 선물을 샀어요.', 'Ajándékot vettem a barátomnak, aki elhelyezkedett.'],
      ]),
    ],
    correctIncorrect: [
      { incorrect: '예쁘기 위해서 마스크 팩을 자주 해요.', reason: 'a 예쁘다 melléknév, a -기 위해서 előtt ige kell' },
      {
        correct: '예뻐지기 위해서 마스크 팩을 자주 해요.',
        translation: 'Gyakran teszek fel arcpakolást, hogy szebb legyek.',
        note: '-아지다/어지다: 예쁘다 → 예뻐지다',
      },
      {
        correct: '몸을 따뜻하게 하기 위해서 따뜻한 차를 마셔요.',
        translation: 'Forró teát iszom, hogy átmelegítsem magam.',
        note: '-게 하다: 따뜻하다 → 따뜻하게 하다',
      },
    ],
  },
  {
    lesson: 8,
    point: 2,
    form: '-아야겠다/어야겠다',
    name: '„ezt meg kell tennem!” (erős elhatározás)',
    explanation: [
      paragraph`Ige után a beszélő ${bold('erős szándékát, elhatározását')} fejezi ki, gyakran egy helyzet hatására: „Akkor ezt most már meg kell csinálnom.” A ${bold('-아/어')} szabály szerint (ㅏ, ㅗ → ${korean('-아야겠다')}, egyéb → ${korean('-어야겠다')}, 하다 → ${korean('해야겠다')}).`,
    ],
    table: {
      additionalWords: ['가다', '듣다', '읽다', '보다', '마시다', '운동하다', '공부하다', '사다', '만들다', '돕다'],
      sampleSet: 'verbs',
      columns: [
        {
          header: '-아야겠어요/어야겠어요',
          conjugate: word => withAOrEo(word, '야겠어요'),
        },
      ],
    },
    examples: [
      [
        text`한글날에 행사가 많네요. 저도 가 ${bold('봐야겠어요')}.`,
        'Sok rendezvény van a hangul napján. Nekem is el kell mennem megnézni!',
      ],
      [text`살이 쪘어요. 오늘부터 운동을 ${bold('해야겠어요')}.`, 'Híztam. Mától edzenem kell!'],
      [text`내일 시험이 있어요. 오늘은 일찍 ${bold('자야겠어요')}.`, 'Holnap vizsga lesz. Ma korán le kell feküdnöm.'],
      [
        text`그 노래가 정말 좋다고 해요. 저도 ${bold('들어야겠어요')}.`,
        'Azt mondják, nagyon jó az a dal. Nekem is meg kell hallgatnom!',
        'ㄷ-rendhagyó: 듣다 → 들어야겠어요',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-아야/어야 되다/하다')} („kell”) és a ${korean('-겠-')} (szándék) összetétele. Csak a beszélő saját szándékára; másnak tanácsként: ${korean('-아야/어야 될 것 같아요')}.`,
    ],
  },
  {
    lesson: 9,
    point: 1,
    form: '-아지다/어지다',
    name: '„…-vá válik, egyre …” (fokozatos változás)',
    explanation: [
      paragraph`Melléknév után azt fejezi ki, hogy egy állapot az idő múlásával ${bold('fokozatosan megváltozik')}: ${korean('좋다 → 좋아지다')} „jobb lesz”. A melléknévből így ${bold('ige')} lesz. A ${bold('-아/어')} szabály szerint: ㅏ, ㅗ → ${korean('-아지다')}, egyéb → ${korean('-어지다')}, 하다 → ${korean('해지다')}.`,
    ],
    table: {
      additionalWords: ['작다', '많다', '춥다', '크다', '길다', '좋다', '맑다', '흐리다', '다르다', '덥다'],
      sampleSet: 'adjectives',
      columns: [
        {
          header: '-아져요/어져요',
          conjugate: word => withAOrEo(word, '져요'),
        },
        {
          header: 'Múlt: -아졌어요/어졌어요',
          conjugate: word => withAOrEo(word, '졌어요'),
        },
      ],
    },
    examples: [
      [text`비가 오면 오히려 기분이 좋${bold('아지는데요')}.`, 'Ha esik az eső, nekem épp jobb kedvem lesz.'],
      [
        text`요즘 날씨가 많이 ${bold('추워졌어요')}.`,
        'Mostanában nagyon hideg lett.',
        'ㅂ-rendhagyó: 춥다 → 추워졌어요',
      ],
      [text`한국어 공부가 재미있${bold('어졌어요')}.`, 'Érdekesebb lett a koreai tanulás.'],
      [
        text`가을이 되면 나뭇잎이 ${bold('빨개져요')}.`,
        'Ősszel a levelek pirosak lesznek.',
        'ㅎ-rendhagyó: 빨갛다 → 빨개져요',
      ],
      [
        text`감기가 나${bold('아지다가')} 다시 심${bold('해졌어요')}.`,
        'Már javulóban volt a megfázásom, de újra rosszabb lett.',
        { note: 'ㅅ-rendhagyó: 낫다 → 나아지다 · -다가: a javulás még tartott', uses: ['2B-04-1'] },
      ],
      [
        text`감기가 나${bold('아졌다가')} 다시 심${bold('해졌어요')}.`,
        'Javult a megfázásom, aztán újra rosszabb lett.',
        { note: '-았다가/었다가: a javulás már megtörtént', uses: ['2B-04-1'] },
      ],
    ],
    ownNote: [
      paragraph`Mivel a ${korean('-아지다/어지다')} igét képez, a jelzői és egyéb alakok igei szabályt követnek: ${korean('좋아지는 날씨')} (jelen: ${korean('-는')}), ${korean('좋아지고 있어요')} „egyre jobb”.`,
      paragraph`${bold('Igével')} szenvedő jelentést ad: a dolog „magától megtörténik, létrejön”.`,
      simpleTable(
        ['Ige', '-아/어지다', 'Jelentés'],
        [
          [korean('만들다'), korean('만들어지다'), 'elkészül, létrejön'],
          [korean('정하다'), korean('정해지다'), 'eldől'],
          [korean('이루다'), korean('이루어지다'), 'megvalósul'],
          [korean('짓다'), korean('지어지다'), text`felépül – ㅅ-rendhagyó (${reference('2A-07-2')})`],
          [korean('켜다'), korean('켜지다'), 'bekapcsolódik, kigyullad'],
        ]
      ),
      exampleList([
        ['회의 날짜가 정해졌어요.', 'Eldőlt a megbeszélés időpontja.'],
        ['꿈이 이루어졌어요.', 'Megvalósult az álmom.'],
        ['이 건물은 백 년 전에 지어졌어요.', 'Ez az épület száz éve épült.', 'ㅅ-rendhagyó: 짓다 → 지어졌어요'],
        ['어제부터 휴대폰 화면이 안 켜져요.', 'Tegnap óta nem kapcsol be a telefonom kijelzője.'],
      ]),
      paragraph`Érzést kifejező igével azt jelenti, hogy az érzés ${bold('magától, akaratlanul')} jön: ${korean('기다리다 → 기다려지다')} „(alig) várom”.`,
      exampleList([['방학이 정말 기다려져요.', 'Már nagyon várom a szünetet.']]),
      paragraph`Sok igének saját szenvedő alakja van (${reference('4A-08-2')}): ${korean('쓰다 → 쓰이다')}, ${korean('열다 → 열리다')}; ott azt használjuk.`,
      paragraph`Ha nem egy tulajdonság, hanem egy ${bold('cselekvés vagy szokás')} alakul ki, igével ${korean('-게 되다')} áll (${reference('2B-12-2')}):`,
      exampleList([
        ['한국어 실력이 좋아졌어요.', 'Javult a koreaitudásom.', '좋다 „jó” → 좋아지다'],
        ['한국어를 좋아하게 됐어요.', 'Megszerettem a koreait.', '좋아하다 „szeret” → 좋아하게 되다'],
      ]),
    ],
    correctIncorrect: [
      { correct: '날씨가 따뜻해졌어요.', translation: 'Melegebb lett az idő.' },
      {
        incorrect: '날씨가 따뜻했어졌어요.',
        reason: 'a múlt idő jele a 지다 végére kerül (-아졌어요/어졌어요), a melléknév töve után nem állhat',
      },
    ],
  },
  {
    lesson: 9,
    point: 2,
    form: '-는/(으)ㄴ 대신에',
    name: '„… helyett; cserébe …”',
    explanation: [
      paragraph`Egy cselekvést vagy állapotot ${bold('mással helyettesítünk')}: „X helyett Y”; vagy egy hátrányt ${bold('előny ellensúlyoz')}: „drága, de cserébe …”.`,
      list(
        text`${bold('Ige')}: ${korean('-는 대신에')}`,
        text`${bold('Melléknév')}: 받침 után ${korean('-은 대신에')}, magánhangzó után ${korean('-ㄴ 대신에')}`,
        text`${bold('Főnév')}: ${korean('N 대신에')}`
      ),
    ],
    table: {
      additionalWords: ['작다', '사다', '멀다', '찾다', '덥다', '만들다', '좋다', '오다', '다르다', '산책하다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [
        {
          header: '-는/(으)ㄴ 대신에',
          conjugate: word => presentModifier(word, ' 대신에'),
        },
        {
          header: 'Ige múlt: -(으)ㄴ 대신에',
          conjugate: word => (word.wordClass === 'verb' ? withEu(word, 'ㄴ 대신에') : null),
        },
      ],
    },
    examples: [
      [text`주말에는 밖에 나가${bold('는 대신에')} 집에서 쉬어요.`, 'Hétvégén kimozdulás helyett otthon pihenek.'],
      [
        text`이 식당은 음식이 비${bold('싼 대신에')} 아주 맛있어요.`,
        'Ebben az étteremben drága az étel, de cserébe nagyon finom.',
      ],
      [
        text`날씨가 ${bold('추운 대신에')} 하늘이 맑아요.`,
        'Hideg van, de cserébe tiszta az ég.',
        'ㅂ-rendhagyó: 춥다 → 추운',
      ],
      [text`커피 ${bold('대신에')} 차를 마셨어요.`, 'Kávé helyett teát ittam.'],
    ],
    correctIncorrect: [
      { incorrect: '비가 오는 대신에 우산을 가져가세요.', reason: 'az esernyő nem helyettesíti az esőt' },
      { correct: '비가 오는데 우산을 가져가세요.', translation: 'Esik az eső, vigyél esernyőt.' },
      { incorrect: '한국어는 어려운 대신에 공부해요.', reason: 'a tanulás nem ellensúlyozza, hogy nehéz' },
      { correct: '한국어는 어렵지만 공부해요.', translation: 'A koreai nehéz, de tanulom.' },
    ],
    ownNote: [
      paragraph`Az ${korean('에')} elhagyható: ${korean('대신')}. Az ${korean('있다/없다')} igeként ragozódik: ${korean('맛있는 대신에')}.`,
      paragraph`${bold('Helyettesítés')} – az első elmarad, helyette a második történik:`,
      exampleList([['버스를 타는 대신에 걸어갔어요.', 'Buszozás helyett gyalog mentem.']]),
      paragraph`${bold('Kompenzáció')} – az egyiket a másik ellensúlyozza, mindkét irányban:`,
      exampleList([
        ['이 집은 작은 대신에 월세가 싸요.', 'Ez a lakás kicsi, viszont olcsó a bérleti díja.'],
        ['월급이 많은 대신에 일이 힘들어요.', 'Jó a fizetés, cserébe nehéz a munka.'],
        [
          '일찍 출근하는 대신에 일찍 퇴근할 수 있어서 좋아요.',
          'Jó, hogy korán kell bejönnöm, mert cserébe korán is mehetek haza.',
        ],
      ]),
      paragraph`Ha az első cselekvés ${bold('már megtörtént')}, az ige múlt idejű jelzői alakja áll: ${korean('-(으)ㄴ 대신에')} (${korean('먹은, 본, 한')}; ㄹ-tő: ${korean('산, 만든')}). Ez mindig kompenzáció:`,
      exampleList([['주말에 일한 대신에 월요일에 쉬어요.', 'Hétvégén dolgoztam, cserébe hétfőn pihenek.']]),
      paragraph`Nem egy újabb „de”: csak akkor használható, ha a második tag az elsőt ${bold('helyettesíti vagy ellensúlyozza')}. Puszta ellentétre a ${korean('-지만')} (${reference('1B-09-1')}) vagy a lágyabb ${korean('-는데')} (${reference('2B-08-1')}) való; ha az első tag csak a folytatás háttere, szintén a ${korean('-는데')} (${reference('2A-08-1')}).`,
    ],
  },
  {
    lesson: 10,
    point: 1,
    form: '-도록 하다',
    name: '„tegye meg, hogy …” (utasítás, engedély)',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy valakit ${bold('rávesz, utasít vagy hagy')} megtenni valamit. Gyakori alakja a ${korean('-도록 하세요')}: udvarias, de határozott tanács, utasítás („Kérem, tegye meg, hogy …”). A beszélő saját szándékára: ${korean('-도록 할게요')} („igyekszem majd …”). A ${korean('-도록')} önállóan ${bold('célt')} is jelöl: „úgy, hogy …”.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        {
          header: '-도록 하세요',
          conjugate: word => withPlainStem(word, '도록 하세요'),
        },
        {
          header: '-도록 할게요',
          conjugate: word => withPlainStem(word, '도록 할게요'),
        },
      ],
    },
    examples: [
      [text`오늘은 일찍 들어가${bold('도록 하세요')}.`, 'Ma menjen haza korán.'],
      [text`약을 먹고 푹 쉬${bold('도록 하세요')}.`, 'Vegye be a gyógyszert, és pihenjen sokat.'],
      [text`다음부터는 늦지 않${bold('도록 할게요')}.`, 'Legközelebb igyekszem nem késni.'],
      [
        text`뒤에서도 잘 들리${bold('도록')} 크게 말씀해 주세요.`,
        'Kérem, beszéljen hangosan, hogy hátul is jól hallják.',
      ],
      [
        text`다른 사람을 많이 돕${bold('도록 하세요')}.`,
        'Igyekezzen sokat segíteni másoknak.',
        '-도록 előtt nincs ㅂ-változás: 돕도록',
      ],
    ],
    ownNote: [
      paragraph`Hangulatban a ${korean('-(으)세요')}-nél hivatalosabb, „orvosi/főnöki” utasítás. Cél jelentésben a ${korean('-게')} (${reference('2B-10-2')}) közeli rokona.`,
      paragraph`${bold('Utasítás másnak')} – a beszédszint a viszonytól függ:`,
      exampleList([
        ['방을 청소하도록 해.', 'Takarítsd ki a szobádat!', 'anya a gyereknek (반말)'],
        ['물을 많이 마시도록 하세요.', 'Igyon sok vizet!', 'orvos a betegnek'],
        ['내일은 일찍 오도록 하십시오.', 'Holnap jöjjön be korán!', 'főnök a beosztottnak'],
      ]),
      paragraph`${bold('Saját szándék')} – csak a beszélőről, ${korean('-(으)ㄹ게요')} vagy ${korean('-겠-')} alakkal; a ${korean('-도록 하겠습니다')} hivatalos ígéret:`,
      exampleList([
        ['제가 가도록 하겠습니다.', 'Majd én megyek.'],
        ['앞으로 조심하도록 하겠습니다.', 'A jövőben vigyázni fogok.'],
      ]),
      paragraph`${bold('Cél')} – ${korean('-도록')} magában, gyakran tagadva (${korean('-지 않도록')} „hogy ne …”):`,
      exampleList([
        ['잊지 않도록 메모해 두어요.', 'Felírom, hogy ne felejtsem el.'],
        ['감기에 걸리지 않도록 따뜻하게 입어요.', 'Melegen öltözöm, hogy ne fázzak meg.'],
        ['잘 보이도록 앞에 앉아요.', 'Előre ülök, hogy jól lássak.'],
      ]),
    ],
  },
  {
    lesson: 10,
    point: 2,
    form: '-아야/어야',
    name: '„csak ha …; ahhoz, hogy … (kell)” (szükséges feltétel)',
    explanation: [
      paragraph`Ige vagy melléknév után azt fejezi ki, hogy az első rész a második ${bold('elengedhetetlen feltétele')}: „csak akkor Y, ha X”. A ${bold('-아/어')} szabály szerint: ${korean('가야, 먹어야, 해야')}.`,
    ],
    table: {
      additionalWords: ['먹다', '작다', '만들다', '춥다', '쉬다', '다르다', '공부하다', '놀다', '사다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-아야/어야', conjugate: word => withAOrEo(word, '야') }],
    },
    examples: [
      [text`푹 쉬${bold('어야')} 감기가 빨리 나아요.`, 'Csak ha sokat pihensz, gyógyulsz meg gyorsan a megfázásból.'],
      [text`약을 먹${bold('어야')} 나을 거예요.`, 'Csak ha beveszed a gyógyszert, gyógyulsz meg.'],
      [text`날씨가 따뜻${bold('해야')} 산책을 할 수 있어요.`, 'Csak ha meleg az idő, tudunk sétálni.'],
      [
        text`선생님 설명을 잘 들${bold('어야')} 이해할 수 있어요.`,
        'Csak ha jól figyelsz a tanár magyarázatára, érted meg.',
        'ㄷ-rendhagyó: 듣다 → 들어야',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-아야/어야 되다')} („kell”, ${reference('1B-09-2')}) is erre épül: „csak akkor lesz rendben, ha …”.`,
      paragraph`A ${korean('-(으)면')} (${reference('2A-07-1')}) elégséges feltétel („ha”), a ${korean('-아야/어야')} szükséges („csak ha”): ${korean('매일 들으면 / 들어야 잘할 수 있어요')}. Céllal kezdve ugyanez ${korean('-(으)려면')}-nel (${reference('3A-05-2')}): ${korean('잘하려면 매일 들어야 돼요')}.`,
      paragraph`Gyakori fordulat: ${korean('-아야/어야지요')} („hát persze, hogy … kell”): ${korean('아프면 병원에 가야지요.')} – Ha beteg vagy, persze hogy orvoshoz kell menni.`,
    ],
    correctIncorrect: [
      {
        correct: '빨리 나으려면 약을 먹어야 해요.',
        translation: 'Ha gyorsan meg akarsz gyógyulni, be kell venned a gyógyszert.',
        note: 'elöl a cél, a „kell” a végén',
      },
      {
        correct: '약을 먹어야 빨리 나을 수 있어요.',
        translation: 'Csak ha beveszed a gyógyszert, gyógyulhatsz meg gyorsan.',
        note: 'ugyanez fordítva: elöl a feltétel (ㅅ-rendhagyó: 낫다 → 나을)',
      },
      {
        correct: '시험에 합격하려면 열심히 공부해야 돼요.',
        translation: 'Ha át akarsz menni a vizsgán, keményen kell tanulnod.',
      },
      {
        correct: '열심히 공부해야 시험에 합격할 수 있어요.',
        translation: 'Csak ha keményen tanulsz, mehetsz át a vizsgán.',
      },
      {
        incorrect: '시간이 있어야 같이 영화 봅시다.',
        reason: 'a -아야/어야 után nem állhat felszólítás vagy javaslat (-(으)세요, -ㅂ시다, -(으)ㄹ까요?)',
        translation: 'Ha van időd, nézzünk meg együtt egy filmet.',
      },
      {
        correct: '시간이 있으면 같이 영화 봅시다.',
        translation: 'Ha van időd, nézzünk meg együtt egy filmet.',
        note: 'kéréshez, javaslathoz -(으)면',
      },
    ],
  },
  {
    lesson: 11,
    point: 1,
    form: '-다 보면',
    name: '„ha az ember sokáig …, (előbb-utóbb) …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy ha egy cselekvést ${bold('folyamatosan, sokáig')} végzünk, akkor ${bold('rájövünk')} valamire vagy ${bold('új állapotba')} kerülünk. A tő végétől függetlenül ${korean('-다 보면')}; a ${korean('-다가 보면')} rövidült alakja.`,
      list(
        text`${korean('-다 보면')} + ${bold('jelen')} vagy ${bold('jövő')}: ami általában így van, vagy várhatóan így lesz`,
        text`${korean('-다 보니까')} + ${bold('múlt')}: ami már megtörtént („ahogy …, rájöttem / úgy alakult, hogy …”)`
      ),
    ],
    table: {
      sampleSet: 'verbs',
      words: VERBS_WITH_BODA,
      columns: [
        {
          header: '-다 보면',
          conjugate: word => withPlainStem(word, '다 보면'),
        },
        {
          header: '-다 보니까',
          conjugate: word => withPlainStem(word, '다 보니까'),
        },
      ],
    },
    examples: [
      [
        text`한국 드라마를 계속 보${bold('다 보면')} 한국어 실력이 늘 거예요.`,
        'Ha sokáig nézel koreai sorozatokat, fejlődni fog a koreaid.',
      ],
      [text`열심히 연습하${bold('다 보면')} 잘하게 될 거예요.`, 'Ha sokat gyakorolsz, előbb-utóbb jól fog menni.'],
      [
        text`이야기를 하${bold('다 보면')} 시간 가는 것을 몰라요.`,
        'Ha az ember beszélget, észre sem veszi, hogy múlik az idő.',
      ],
      [
        text`한국에서 살${bold('다 보면')} 한국 문화에 익숙해져요.`,
        'Ha az ember Koreában él, idővel hozzászokik a koreai kultúrához.',
        'ㄹ-tő: -다 előtt az ㄹ megmarad: 살다 보면',
      ],
      [text`혼자 살${bold('다 보니까')} 요리를 잘하게 됐어요.`, 'Ahogy egyedül éltem, megtanultam jól főzni.'],
      [
        text`외국어를 배우${bold('다 보니까')} 다른 나라의 문화를 더 잘 이해하게 됐어요.`,
        'Ahogy idegen nyelvet tanultam, jobban megértettem más országok kultúráját.',
      ],
      [
        text`매일 듣${bold('다 보니까')} 그 노래가 좋아졌어요.`,
        'Ahogy minden nap hallgattam, megszerettem azt a dalt.',
        '-다 előtt nincs ㄷ-változás: 듣다 보니까',
      ],
    ],
    ownNote: [
      paragraph`${bold('Ugyanaz a folyamat, más idő:')}`,
      comparisonTable(
        ['-다 보면 + jelen, jövő', '-다 보니까 + múlt'],
        [
          [
            [
              '운동을 하다 보면 건강이 좋아져요.',
              'Ha az ember sportol, idővel egészségesebb lesz.',
              'általában így van',
            ],
            ['운동을 하다 보니까 건강이 좋아졌어요.', 'Ahogy sportoltam, egészségesebb lettem.', 'így történt'],
          ],
          [
            [
              '이 길로 쭉 가다 보면 큰 공원이 나올 거예요.',
              'Ha végigmegy ezen az úton, egy nagy parkhoz fog érni.',
              'útbaigazítás',
            ],
            [
              '큰 길로 쭉 가다 보니까 큰 공원이 나왔어요.',
              'Ahogy végigmentem a nagy úton, egy nagy parkhoz értem.',
              'elmesélés',
            ],
          ],
        ]
      ),
      paragraph`A ${korean('-다 보니까')} és a ${korean('-아/어 보니까')} (${reference('3A-05-1')}) is a felfedezést jelölő ${korean('-(으)니까')}-ra (${reference('2B-07-2')}) épül: „…, és rájöttem”. A különbség az, ${bold('hogyan')} jutottunk a felismeréshez:`,
      list(
        text`Kipróbáltam, és kiderült? → ${korean('-아/어 보니까')}`,
        text`Sokáig vagy újra meg újra csináltam, és közben így alakult? → ${korean('-다 보니까')}`
      ),
      simpleTable(
        ['', '-아/어 보니까', '-다 보니까'],
        [
          ['Cselekvés', 'szándékos próba, egyszer is elég', 'tartós vagy ismétlődő folyamat'],
          [
            'Eredmény',
            'benyomás, ítélet: „finom”, „kicsi”, „nehezebb, mint hittem”',
            'fokozatos változás, észrevétlenül kialakult helyzet',
          ],
          [
            'Hangulat',
            'tudatos, tárgyszerű: „kipróbáltam, tudom”',
            'visszatekintő, kicsit csodálkozó: „nem terveztem, így alakult”; mentegetőzésre is jó',
          ],
          ['Hol', 'vélemény, ajánlás: étel, ruha, hely, munka', 'élettörténet, szokás, fejlődés, „elszaladt az idő”'],
          [
            'Gyakori szavak',
            text`${korean('한번')} (egyszer), ${korean('직접')} (saját magam), ${korean('처음')} (először)`,
            text`${korean('계속')} (folyamatosan), ${korean('매일')} (minden nap), ${korean('자꾸')} (folyton), ${korean('오래')} (sokáig)`,
          ],
          ['Mihez járul', 'igéhez', text`igéhez; okként melléknévhez és ${korean('이다')}-hoz is`],
        ]
      ),
      paragraph`${bold('Ugyanaz az ige, más jelentés:')}`,
      comparisonTable(
        ['-아/어 보니까', '-다 보니까'],
        [
          [
            [
              '김치를 먹어 보니까 생각보다 안 매웠어요.',
              'Megkóstoltam a kimcsit, és kevésbé volt csípős, mint gondoltam.',
              'próba → benyomás',
            ],
            [
              '김치를 매일 먹다 보니까 좋아하게 됐어요.',
              'Ahogy minden nap kimcsit ettem, megszerettem.',
              'folyamat → változás',
            ],
          ],
          [
            [
              '부산에서 살아 보니까 정말 편해요.',
              'Most, hogy Busanban élek, látom, hogy nagyon kényelmes.',
              'kipróbáltam, milyen',
            ],
            [
              '부산에서 오래 살다 보니까 사투리를 쓰게 됐어요.',
              'Ahogy sokáig Busanban éltem, rászoktam a tájszólásra.',
              'magától alakult így',
            ],
          ],
          [
            ['그 사람을 직접 만나 보니까 아주 친절했어요.', 'Személyesen találkoztam vele, és nagyon kedves volt.'],
            ['그 사람을 자주 만나다 보니까 친해졌어요.', 'Ahogy gyakran találkoztunk, összebarátkoztunk.'],
          ],
        ]
      ),
      paragraph`${bold('Közös:')} mindkettő tapasztalatból levont felismerés. A második tagmondat megtörtént vagy most is fennálló tény, ezért ${bold('jövő idő, felszólítás, javaslat nem')} állhat utána; jövőre a ${korean('-다 보면')} való. Múlt idő jele egyik előtt sincs: ${korean('먹어 보니까, 먹다 보니까')}. (A ${korean('먹어 봤으니까')} már ok: „mivel ettem már ilyet”.)`,
      paragraph`${bold(text`A ${korean('보다')} ige:`)} próbaként csak ${korean('보니까')} (nem ${korean('봐 보니까')}), folyamatként viszont szabályos a ${korean('보다 보니까')}:`,
      exampleList([['드라마를 보다 보니까 한국어 실력이 늘었어요.', 'Ahogy sorozatokat néztem, fejlődött a koreaim.']]),
      paragraph`${bold(text`Melléknév és ${korean('이다')}:`)} a ${korean('-다 보니까')} itt okot ad, gyakran mentegetőzve; az ${korean('-아/어 보니까')} ide nem jó:`,
      exampleList([
        ['요즘 바쁘다 보니까 연락을 못 했어요.', 'Mostanában annyi a dolgom, hogy nem tudtam jelentkezni.'],
        ['외국인이다 보니까 존댓말이 어려워요.', 'Külföldi lévén nehéznek találom az udvarias beszédet.'],
      ]),
      paragraph`Vigyázat: a ${korean('바빠 보이니까')} más szerkezet (${korean('-아/어 보이다')}, ${reference('3A-01-2')}): „mivel elfoglaltnak látszik”.`,
      paragraph`${bold('Stílus:')} mindkettő hétköznapi beszéd. A ${korean('까')} nélküli ${korean('-아/어 보니')} és ${korean('-다 보니')} (${reference('4B-07-2')}) tömörebb, írásban gyakoribb.`,
    ],
    correctIncorrect: [
      { incorrect: '신발을 한번 신다 보니까 좀 작았어요.', reason: 'egyszeri próba, nem folyamat' },
      { correct: '신발을 한번 신어 보니까 좀 작았어요.', translation: 'Felpróbáltam a cipőt, és kicsit kicsi volt.' },
      {
        incorrect: '이야기해 보니까 벌써 12시가 됐어요.',
        reason: 'nem próba: beszélgetés közben telt el az idő',
      },
      { correct: '이야기하다 보니까 벌써 12시가 됐어요.', translation: 'Ahogy beszélgettünk, már 12 óra is lett.' },
      { incorrect: '열심히 연습하다 보니까 잘하게 될 거예요.', reason: 'jövő idő nem állhat utána' },
      {
        correct: '열심히 연습하다 보면 잘하게 될 거예요.',
        translation: 'Ha sokat gyakorolsz, előbb-utóbb jól fog menni.',
        note: 'jövőre -다 보면',
      },
      { incorrect: '재미로 하다 보면 요리 실력이 많이 늘었어요.', reason: 'a -다 보면 után nem állhat múlt idő' },
      {
        correct: '재미로 하다 보니까 요리 실력이 많이 늘었어요.',
        translation: 'Csak kedvtelésből csináltam, és közben sokat fejlődött a főzőtudásom.',
        note: 'megtörtént dologra -다 보니까',
      },
      { incorrect: '매일 걸었다 보니까 건강해졌어요.', reason: 'a -다 elé nem kerül múlt idő' },
      { correct: '매일 걷다 보니까 건강해졌어요.', translation: 'Ahogy minden nap sétáltam, egészségesebb lettem.' },
      { incorrect: '요즘 바빠 보니까 연락을 못 했어요.', reason: 'melléknévnél nincs próba: ok, tehát -다 보니까' },
      {
        correct: '요즘 바쁘다 보니까 연락을 못 했어요.',
        translation: 'Mostanában annyi a dolgom, hogy nem tudtam jelentkezni.',
      },
    ],
  },
  {
    lesson: 11,
    point: 2,
    form: '-더라고요',
    name: '„azt tapasztaltam, hogy …” (saját élmény felidézése)',
    explanation: [
      paragraph`Ige, melléknév vagy főnév után a beszélő a ${bold('múltban közvetlenül látott, megtapasztalt')} dolgot idézi fel és meséli el: „(láttam, és) tényleg …”.`,
      list(
        text`${bold('Ige, melléknév')}: a tő végétől függetlenül ${korean('-더라고요')}, ha akkor és ott ${bold('éppen azt')} láttam, éreztem`,
        text`${bold('Múlt')}: ${korean('-았더라고요/었더라고요')}, ha a cselekvés már lezajlott, és csak az ${bold('eredményét')} vettem észre`,
        text`${bold('Főnév')}: 받침 után ${korean('-이더라고요')} (${korean('곡이더라고요, 느낌이더라고요')}), magánhangzó után ${korean('-더라고요')} (${korean('친구더라고요, 드라마더라고요')})`,
        text`Barátok között (반말): ${korean('-더라고')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        {
          header: '-더라고요',
          conjugate: word => withPlainStem(word, '더라고요'),
        },
        {
          header: 'Múlt: -았더라고요/었더라고요',
          conjugate: word => withPast(word, '더라고요'),
        },
      ],
    },
    examples: [
      [text`주말에는 집에서 쉬는 게 좋${bold('더라고요')}.`, 'Azt tapasztaltam, hétvégén jó otthon pihenni.'],
      [text`그 식당 음식이 정말 맛있${bold('더라고요')}.`, 'Annak az étteremnek tényleg finom az étele (voltam ott).'],
      [text`제주도는 바람이 많이 불${bold('더라고요')}.`, 'Dzsedzsun nagyon fúj a szél (tapasztaltam).'],
      [
        text`어제 가 보니까 날씨가 정말 덥${bold('더라고요')}.`,
        'Tegnap ott voltam, és tényleg nagyon meleg volt.',
        '-더라고요 előtt nincs ㅂ-változás: 덥더라고요',
      ],
      [text`주노 씨가 오늘 출근을 안 ${bold('했더라고요')}.`, 'Észrevettem, hogy Dzsuno ma nem jött be dolgozni.'],
      [
        text`어제 사무실 앞에서 큰 사고가 ${bold('났더라고')}.`,
        'Láttam, hogy tegnap nagy baleset történt az iroda előtt.',
        '반말, múlt',
      ],
      [
        text`어제 들은 노래는 제가 아는 곡이${bold('더라고요')}.`,
        'Kiderült, hogy ismerem a tegnap hallott dalt.',
        'főnév: 곡 → 곡이더라고요',
      ],
    ],
    ownNote: [
      paragraph`${bold('Ki lehet az alany?')} Csak azt mondhatjuk így, amit ${bold('megfigyeltünk')} vagy ${bold('magunk átéltünk')}:`,
      simpleTable(
        ['', 'én', 'más'],
        [
          ['Ige, jelen', '❌ nem látom magam', '✅ láttam'],
          ['Ige, múlt', '✅ visszanézve', '✅ utólag láttam'],
          ['Érzést, benyomást jelentő melléknév', '✅ átéltem', '❌ nem én éltem át'],
        ]
      ),
      paragraph`A melléknév tilalma csak arra vonatkozik, amit a másik ${bold('érez')}. Dologról vagy látható tulajdonságról jó:`,
      exampleList([
        ['새로 생긴 식당이 맛있더라고요.', 'Finom az új étterem (kipróbáltam).'],
        ['안나 씨가 키가 크더라고요.', 'Láttam, hogy Anna magas.'],
      ]),
      paragraph`Ha a másik érzése ${bold('kívülről látszik')}, a melléknévből ${korean('-아/어하다')} igét képezünk: ${korean('반갑다 → 반가워하다')} „örül, kimutatja az örömét”.`,
      paragraph`A ${korean('저는/나는')} témaként állhat az elején, ha a megfigyelt dolog alanya más:`,
      exampleList([
        [
          '나는 도서관보다 카페가 집중이 잘 되더라고.',
          'Azt tapasztaltam, hogy kávézóban jobban tudok koncentrálni, mint a könyvtárban.',
          '반말; a 되더라고 alanya a 집중',
        ],
      ]),
      paragraph`Ha nem mi tapasztaltuk, csak ${bold('hallottuk')}, ${korean('-는다고/ㄴ다고/다고 하다')} (${reference('3A-02-1')}) kell: ${korean('맛있더라고요')} „finom volt (kóstoltam)”, ${korean('맛있다고 해요')} „azt mondják, finom”.`,
    ],
    correctIncorrect: [
      { incorrect: '저는 주말에 쇼핑몰에 가더라고요.', reason: 'a saját cselekvésemet nem figyelhetem kívülről' },
      {
        correct: '안나 씨가 주말에 쇼핑몰에 가더라고요.',
        translation: 'Láttam, hogy Anna a hétvégén a plázába ment.',
        note: 'mást figyeltem meg',
      },
      {
        correct: '저는 일 년 동안 많은 일을 했더라고요.',
        translation: 'Visszanézve látom, hogy egy év alatt sok mindent csináltam.',
        note: 'múlt idővel saját magamról is',
      },
      {
        correct: '안나 씨가 일 년 동안 많은 일을 했더라고요.',
        translation: 'Észrevettem, hogy Anna egy év alatt sok mindent csinált.',
      },
      {
        correct: '주노 씨를 만나서 반갑더라고요.',
        translation: 'Örültem, hogy találkoztam Dzsunóval.',
        note: 'a saját érzésem',
      },
      { incorrect: '안나 씨가 주노 씨를 만나서 반갑더라고요.', reason: 'más érzését nem élhetem át' },
      {
        correct: '안나 씨가 주노 씨를 만나서 반가워하더라고요.',
        translation: 'Láttam, hogy Anna örült, amikor találkozott Dzsunóval.',
        note: '-아/어하다: kívülről látható érzés',
      },
      {
        correct: '새로운 식당에 갔는데 맛있더라고요.',
        translation: 'Voltam egy új étteremben, és finom volt.',
        note: 'én kóstoltam',
      },
      { incorrect: '안나 씨가 새로운 식당에 갔는데 맛있더라고요.', reason: 'Anna kóstolta, nem én' },
    ],
  },
  {
    lesson: 12,
    point: 1,
    form: '-는다/ㄴ다/다 (한다체)',
    name: 'írott, semleges stílus (újság, jelentés, napló)',
    explanation: [
      paragraph`Hírekben, cikkekben, jelentésekben, naplóban használt ${bold('írott')} stílus (한다체). Nem udvarias és nem udvariatlan, egyszerűen semleges.`,
      list(
        text`${bold('Ige')}: 받침 után ${korean('-는다')}, magánhangzó után ${korean('-ㄴ다')}, ㄹ-tőnél az ㄹ kiesik: ${korean('만든다')}`,
        text`${bold('Melléknév')} (${korean('있다/없다')} is): ${korean('-다')}`,
        text`${bold('Főnév')}: 받침 után ${korean('-이다')}, magánhangzó után ${korean('-다')}`,
        text`${bold('Múlt')}: ${korean('-았다/었다')}; ${bold('jövő')}: ${korean('-(으)ㄹ 것이다')}`
      ),
    ],
    table: {
      additionalWords: ['오다', '예쁘다', '만들다', '읽다', '좋다', '듣다', '운동하다', '맛있다', '깨끗하다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => plainStyleStatement(word) },
        { header: 'Múlt', conjugate: word => withPast(word, '다') },
        { header: 'Jövő', conjugate: word => withEu(word, 'ㄹ 것이다') },
      ],
    },
    examples: [
      [text`이 영화를 꼭 보라고 추천하고 싶${bold('다')}.`, 'Mindenkinek ajánlom, hogy nézze meg ezt a filmet.'],
      [
        text`요즘 한국 드라마를 보는 사람이 늘고 있${bold('다')}.`,
        'Mostanában egyre többen néznek koreai sorozatokat.',
      ],
      [
        text`나는 매일 아침 음악을 ${bold('듣는다')}.`,
        'Minden reggel zenét hallgatok.',
        '-는다 előtt nincs ㄷ-változás: 듣는다',
      ],
      [text`그 영화는 정말 감동적이${bold('었다')}.`, 'Az a film igazán megható volt.'],
    ],
    ownNote: [
      paragraph`A függő beszéd (${korean('-는다고 하다')}, ${reference('3A-02-1')}) is erre a formára épül. Kérdés írott stílusban: ${korean('-는가? / -(으)ㄴ가?')}, ${korean('-나?')}.`,
    ],
  },
  {
    lesson: 12,
    point: 2,
    form: '-(으)라고 하다',
    name: 'függő beszéd: felszólítás idézése („azt mondta, hogy tegyem …”)',
    explanation: [
      paragraph`Más ${bold('felszólítását, kérését, tanácsát')} adjuk tovább. Ige után:`,
      list(
        text`${bold('받침')} után ${korean('-으라고 하다')}, magánhangzó és ${bold('ㄹ')} után ${korean('-라고 하다')}`,
        text`Tiltás (${korean('-지 마세요')}) → ${korean('-지 말라고 하다')}`,
        text`Ha a beszélő ${bold('magának')} kért valamit (${korean('-아/어 주세요')}) → ${korean('-아/어 달라고 하다')}; ha harmadik személynek → ${korean('-아/어 주라고 하다')}`
      ),
    ],
    table: {
      additionalWords: ['가다', '먹다', '만들다', '찾다', '보다', '쉬다', '듣다', '공부하다', '열다', '사다'],
      sampleSet: 'verbs',
      columns: [
        {
          header: '-(으)라고 했어요',
          conjugate: word => withEu(word, '라고 했어요'),
        },
        {
          header: '-지 말라고 했어요',
          conjugate: word => withPlainStem(word, '지 말라고 했어요'),
        },
        {
          header: '-아/어 달라고 했어요',
          conjugate: word => withAOrEo(word, ' 달라고 했어요'),
        },
      ],
    },
    examples: [
      [
        text`친구가 이 영화를 꼭 보${bold('라고 했어요')}.`,
        'A barátom azt mondta, mindenképp nézzem meg ezt a filmet.',
      ],
      [text`의사 선생님이 푹 쉬${bold('라고 하셨어요')}.`, 'Az orvos azt mondta, pihenjek sokat.'],
      [
        text`선생님께서 수업 시간에 휴대폰을 쓰지 ${bold('말라고 하셨어요')}.`,
        'A tanár azt mondta, ne használjuk a mobilt óra alatt.',
      ],
      [
        text`동생이 숙제를 도와 ${bold('달라고 했어요')}.`,
        'Az öcsém megkért, hogy segítsek neki a házival.',
        'ㅂ-rendhagyó: 돕다 → 도와 달라고',
      ],
    ],
    honorific: {
      rows: [
        [
          '-아/어 주라고 하다',
          'azt mondta, tegyem meg neki (harmadik személynek)',
          '-아/어 드리라고 하다',
          'azt mondta, tegyem meg (tisztelt személynek)',
        ],
        ['-(으)라고 했어요', 'azt mondta, hogy …', '-(으)라고 하셨어요', 'azt mondta (tisztelt személy mondta)'],
      ],
      note: [
        paragraph`Ha a felszólítás egy ${bold('tisztelt harmadik személy javára')} szól, a ${korean('주라고')} helyett ${korean('드리라고')} áll (vö. ${korean('-아/어 드리다')}, ${reference('3B-01-2')}). Ha a felszólítást ${bold('tisztelt személy mondta')}, az idéző ige kap tiszteleti alakot: ${korean('하셨어요')}, ${korean('말씀하셨어요')}.`,
      ],
      examples: [
        [
          text`어머니가 할머니를 도와 ${bold('드리라고 했어요')}.`,
          'Anya azt mondta, segítsek a nagymamának.',
          'ㅂ-rendhagyó: 돕다 → 도와 드리라고',
        ],
        [text`선생님께서 내일 다시 오${bold('라고 하셨어요')}.`, 'A tanár úr azt mondta, jöjjek vissza holnap.'],
        [text`아버지께서 할아버지께 전화 ${bold('드리라고 하셨어요')}.`, 'Apa azt mondta, hívjam fel a nagyapát.'],
      ],
    },
    ownNote: [
      paragraph`A négy függő beszéd-típus: kijelentés ${korean('-는다고/ㄴ다고/다고')}, felszólítás ${korean('-(으)라고')}, javaslat ${korean('-자고')}, kérdés ${korean('-냐고')} (ez utóbbi a ${reference('4A-03-2', '4A 3. leckében')} jön, a rövidített ${korean('-냬요, -(으)래요, -재요')} alakokkal együtt).`,
    ],
  },
];
export default {
  lessons: {
    1: {
      korean: '그동안 어떻게 지냈니?',
      hungarian: 'Hogy voltál mostanában?',
    },
    2: {
      korean: '요즘 좀 바쁘다고 해',
      hungarian: 'Azt mondja, mostanában elég elfoglalt.',
      pronunciation: '격음화',
      pronunciationHungarian: 'hehezetesedés',
    },
    3: {
      korean: '이번에 이사를 할까 해요',
      hungarian: 'Arra gondoltam, hogy most költözöm.',
    },
    4: {
      korean: '나는 거실 청소를 할 테니까 넌 주방 청소를 해 줘',
      hungarian: 'Én kitakarítom a nappalit, te csináld a konyhát.',
      pronunciation: '경음화',
      pronunciationHungarian: 'keményedés',
    },
    5: {
      korean: '환불하려면 영수증이 필요합니다',
      hungarian: 'A visszatérítéshez szükség van a blokkra.',
    },
    6: {
      korean: '새로 사려다가 수리해서 쓰고 있어요',
      hungarian: 'Újat akartam venni, de megjavíttattam, és azt használom.',
      pronunciation: '외래어 발음',
      pronunciationHungarian: 'jövevényszavak kiejtése',
    },
    7: {
      korean: '여자 친구하고 만난 지 곧 3년이 돼',
      hungarian: 'Nemsokára három éve járunk a barátnőmmel.',
    },
    8: {
      korean: '한글날을 기념하기 위해서 여러 가지 행사를 한다고 해',
      hungarian: 'A hangul napja alkalmából sokféle rendezvényt tartanak.',
      pronunciation: '비음화',
      pronunciationHungarian: 'orrhangúsodás',
    },
    9: {
      korean: '비가 오면 오히려 기분이 좋아지는데요',
      hungarian: 'Ha esik az eső, nekem épp jobb kedvem lesz.',
    },
    10: {
      korean: '오늘은 일찍 들어가도록 하세요',
      hungarian: 'Ma menjen haza korán.',
      pronunciation: '모음 ㅢ',
      pronunciationHungarian: 'az ㅢ kiejtése (거의 [거의/거이])',
    },
    11: {
      korean: '주말에는 집에서 쉬는 게 좋더라고요',
      hungarian: 'Azt tapasztaltam, hétvégén jó otthon pihenni.',
    },
    12: {
      korean: '이 영화를 꼭 보라고 추천하고 싶다',
      hungarian: 'Mindenkinek ajánlom, hogy nézze meg ezt a filmet.',
      pronunciation: '모음 ㅚ',
      pronunciationHungarian: 'az ㅚ kiejtése (괴물 [괴물/궤물])',
    },
  },
  points: points.map(point =>
    Object.assign(
      {
        studentBookPage: studentBookPageOf(point.lesson, point.point),
        vocabularyGrammarPage: vocabularyGrammarPageOf(point.lesson, point.point),
      },
      point
    )
  ),
} satisfies BookData;
