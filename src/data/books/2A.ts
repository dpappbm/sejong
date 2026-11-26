import { bold, korean, koreanWithTranslation, list, paragraph, reference, simpleTable, text } from '../../lib/richText';
import {
  presentModifier,
  createWord,
  withAOrEo,
  withPast,
  withEu,
  withPlainStem,
  nounWithParticle,
} from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';
const vocabularyGrammarPageOf = (lesson: number, point: number) => 24 + 2 * (lesson - 1) + (point - 1),
  studentBookPageOf = (lesson: number, point: number) => 16 + 8 * (lesson - 1) + (point - 1);

const points: PointSource[] = [
  {
    lesson: 1,
    point: 1,
    form: '(이)라고 하다',
    name: '„…-nak hívják / hívnak” (név, megnevezés)',
    conjugable: false,
    explanation: [
      paragraph`Főnév után a ${bold('nevet')} vagy azt adja meg, ${bold('minek nevezünk')} valamit: „X-nek hívják”. Bemutatkozásban: ${korean('저는 마크라고 해요')}. Idézett kifejezés után is áll.`,
      paragraph`${bold('받침')} után: ${bold('이라고 하다')}, magánhangzó után: ${bold('라고 하다')}.`,
    ],
    table: {
      additionalNouns: ['유진', '마리', '재민', '주노', '한복', '불고기', '비빔밥', '김치', '서울', '한국어'],
      kind: 'noun',
      nouns: [
        { word: '마크', description: 'magánhangzóra végződik' },
        { word: '수진', description: 'mássalhangzóra végződik' },
        { word: '떡볶이', description: 'magánhangzóra végződik' },
        { word: '세종학당', description: 'mássalhangzóra végződik' },
      ],
      nounColumns: [{ header: '(이)라고 해요', conjugate: noun => nounWithParticle(noun, '이라고 해요', '라고 해요') }],
    },
    examples: [
      [text`안녕하세요. 저는 마크${bold('라고 해요')}.`, 'Jó napot! Marknak hívnak.'],
      [text`이 음식은 한국어로 뭐${bold('라고 해요')}?`, 'Hogy hívják ezt az ételt koreaiul?'],
      [text`이건 떡볶이${bold('라고 해요')}.`, 'Ezt tokpokkinak hívják.'],
      [
        text`한국에서는 생일에 미역국${bold('이라고 하는')} 음식을 먹어요.`,
        'Koreában születésnapon egy mijokguk nevű ételt esznek.',
      ],
    ],
    ownNote: [
      paragraph`Az ${korean('이에요/예요')}-hoz képest a ${korean('(이)라고 해요')} kicsit szerényebb, formálisabb bemutatkozás. Jelzőként: ${korean('N(이)라고 하는 N')} „egy … nevű …”. A ${reference('3A-02-1', '3A 2.')} és ${reference('3A-12-2', '12. leckében')} ugyanez a ${korean('-라고/-다고')} forma már idézést (függő beszédet) jelöl.`,
    ],
  },
  {
    lesson: 1,
    point: 2,
    form: '-는 (동사 현재)',
    name: 'ige jelen idejű jelzői alakja („programot készítő…”)',
    explanation: [
      paragraph`Ige után áll, amikor az ige egy ${bold('főnevet jelöl')}, és a cselekvés ${bold('most, rendszeresen')} történik: ${korean('프로그램을 만드는 일')} „programkészítő munka (a munka, ami programok készítése)”. Magyarra gyakran vonatkozó mellékmondattal fordítjuk („aki/ami …”).`,
      paragraph`A tő végétől függetlenül ${bold('-는')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik: ${korean('만들다 → 만드는')}. A ${korean('있다/없다')} is ${korean('-는')}: ${korean('맛있는')}.`,
    ],
    table: {
      additionalWords: ['먹다', '보다', '받다', '마시다', '읽다', '만나다', '듣다', '공부하다', '웃다', '만들다'],
      sampleSet: 'verbs',
      columns: [{ header: '-는 + főnév', conjugate: word => withPlainStem(word, '는') + ' 사람' }],
    },
    examples: [
      [text`저는 프로그램을 만드${bold('는')} 일을 해요.`, 'Programokat készítek (ez a munkám).'],
      [text`저기 커피를 마시${bold('는')} 사람이 제 친구예요.`, 'Az ott kávét ivó ember a barátom.'],
      [
        text`요즘 자주 듣${bold('는')} 노래가 뭐예요?`,
        'Milyen dalt hallgatsz mostanában gyakran?',
        '-는 előtt a ㄷ-rendhagyó nem változik: 듣는',
      ],
      [text`제가 사${bold('는')} 동네는 조용해요.`, 'A környék, ahol lakom, csendes.', 'ㄹ-tő: 살다 → 사는'],
    ],
    ownNote: [
      paragraph`Az ige jelzői alakjai: ${bold('múlt')} ${korean('-(으)ㄴ')} (${reference('2A-12-2')}), ${bold('jelen')} ${korean('-는')}, ${bold('jövő')} ${korean('-(으)ㄹ')} (${reference('2B-02-2')}). A melléknév jelen ideje ${korean('-(으)ㄴ')} (${reference('1B-04-1')}). Összefoglaló: ${reference('rule-7')}`,
    ],
  },
  {
    lesson: 2,
    point: 1,
    form: '-거나, (이)나',
    name: '„vagy” (választás)',
    explanation: [
      paragraph`Két vagy több lehetőség közül ${bold('az egyiket')} választjuk. Ige és melléknév után: ${bold('-거나')} (a tő végétől függetlenül). Főnév után: ${bold('(이)나')} – 받침 után ${korean('이나')}, magánhangzó után ${korean('나')}.`,
    ],
    table: {
      additionalWords: ['만들다', '듣다', '가다', '그리다', '하다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-거나', conjugate: word => withPlainStem(word, '거나') }],
    },
    customContent: [
      simpleTable(
        ['Főnév', '(이)나'],
        [
          [koreanWithTranslation('커피', 'kávé'), koreanWithTranslation(text`커피${bold('나')} 차`, 'kávé vagy tea')],
          [
            koreanWithTranslation('빵', 'kenyér'),
            koreanWithTranslation(text`빵${bold('이나')} 과자`, 'kenyér vagy keksz'),
          ],
          [
            koreanWithTranslation('토요일', 'szombat'),
            koreanWithTranslation(text`토요일${bold('이나')} 일요일`, 'szombat vagy vasárnap'),
          ],
        ]
      ),
    ],
    examples: [
      [text`주말에는 등산을 하${bold('거나')} 운동 모임에 가요.`, 'Hétvégén túrázom vagy sportklubba megyek.'],
      [text`심심할 때 음악을 듣${bold('거나')} 영화를 봐요.`, 'Ha unatkozom, zenét hallgatok vagy filmet nézek.'],
      [text`커피${bold('나')} 주스를 마실까요?`, 'Igyunk kávét vagy gyümölcslevet?'],
      [text`빵${bold('이나')} 과자를 사 오세요.`, 'Hozz kenyeret vagy kekszet.'],
      [
        text`날씨가 너무 덥${bold('거나')} 추우면 집에 있어요.`,
        'Ha túl meleg vagy túl hideg van, otthon maradok.',
        '-거나 előtt nincs ㅂ-változás: 덥거나 (de: 춥다 → 추우면)',
      ],
    ],
  },
  {
    lesson: 2,
    point: 2,
    form: '-(으)ㄹ까요? (추측)',
    name: '„vajon …?” (találgató kérdés)',
    explanation: [
      paragraph`Olyan dologról kérdezi a másik ${bold('véleményét, tippjét')}, amit egyikük sem tud biztosan: „Szerinted …?”, „Vajon …?”. Igével és melléknévvel is.`,
      paragraph`${bold('받침')} után: ${bold('-을까요?')}, magánhangzó után: ${bold('-ㄹ까요?')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik és ${bold('-ㄹ까요?')} jön (${korean('멀다 → 멀까요?')}). Múltra: ${korean('-았을까요/었을까요?')}`,
    ],
    table: {
      additionalWords: ['먹다', '가다', '좋다', '보다', '받다', '바쁘다', '걷다', '시원하다', '어렵다', '만들다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-(으)ㄹ까요?', conjugate: word => withEu(word, 'ㄹ까요?') },
        { header: 'Múlt: -았을까요/었을까요?', conjugate: word => withPast(word, '을까요?') },
      ],
    },
    examples: [
      [text`내일 날씨가 좋${bold('을까요')}?`, 'Szerinted holnap jó idő lesz?'],
      [text`이 옷이 저한테 어울${bold('릴까요')}?`, 'Vajon jól áll majd nekem ez a ruha?'],
      [
        text`한국어 시험이 ${bold('어려울까요')}?`,
        'Vajon nehéz lesz a koreai vizsga?',
        'ㅂ-rendhagyó: 어렵다 → 어려울까요',
      ],
      [text`마크 씨가 벌써 도착${bold('했을까요')}?`, 'Vajon Mark már megérkezett?'],
    ],
    ownNote: [
      paragraph`Az alak ugyanaz, mint az ${reference('1A-10-2')} javaslata (${korean('같이 갈까요?')} „menjünk együtt?”), de a jelentés más: itt nem együtt csinálunk valamit, hanem ${bold('találgatunk')}. Válasz: ${korean('-(으)ㄹ 거예요')} (feltételezés): ${korean('네, 좋을 거예요')}.`,
    ],
  },
  {
    lesson: 3,
    point: 1,
    form: '마다',
    name: '„minden …”',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt jelenti, hogy valami ${bold('kivétel nélkül mindegyikre')} igaz: ${korean('아침마다')} „minden reggel”, ${korean('사람마다')} „mindenkinél (emberenként)”. Minden főnév után ugyanaz. Állandósult: ${korean('밤이면 밤마다')} „éjjelente”, ${korean('날이면 날마다')} „nap mint nap”.`,
    ],
    examples: [
      [text`요즘 아침${bold('마다')} 회의가 있어요.`, 'Mostanában minden reggel értekezlet van.'],
      [text`주말${bold('마다')} 친구를 만나요.`, 'Minden hétvégén találkozom a barátommal.'],
      [
        text`사람${bold('마다')} 좋아하는 음식이 달라요.`,
        'Mindenkinek más étel ízlik.',
        '르-rendhagyó: 다르다 → 달라요',
      ],
      [text`이 버스는 10분${bold('마다')} 와요.`, 'Ez a busz tízpercenként jön.'],
    ],
    ownNote: [
      paragraph`Néhány szónál inkább a ${korean('매-')} előtag használatos: ${korean('매일')} „minden nap” (= ${korean('날마다')}), ${korean('매주')} „minden héten”, ${korean('매년')} „minden évben”. ${korean('매일마다')} kerülendő (kétszer mondja ugyanazt).`,
    ],
  },
  {
    lesson: 3,
    point: 2,
    form: '-(으)ㄹ 때',
    name: '„amikor …”',
    explanation: [
      paragraph`Ige vagy melléknév után azt az ${bold('időpontot vagy időszakot')} jelöli, amikor valami történik: „amikor X, Y”.`,
      paragraph`${bold('받침')} után: ${bold('-을 때')}, magánhangzó után: ${bold('-ㄹ 때')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik és ${bold('-ㄹ 때')}: ${korean('만들 때')}. Múltra: ${korean('-았을/었을 때')}. Főnévvel: ${korean('N 때')} (${korean('방학 때')}).`,
    ],
    table: {
      additionalWords: ['먹다', '가다', '읽다', '보다', '있다', '공부하다', '춥다', '운동하다', '듣다', '만들다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-(으)ㄹ 때', conjugate: word => withEu(word, 'ㄹ 때') },
        { header: 'Múlt: -았을/었을 때', conjugate: word => withPast(word, '을 때') },
      ],
    },
    examples: [
      [text`시간이 있${bold('을 때')} 뭐 해요?`, 'Mit csinálsz, amikor van időd?'],
      [
        text`날씨가 ${bold('추울 때')} 따뜻한 차를 마셔요.`,
        'Amikor hideg van, meleg teát iszom.',
        'ㅂ-rendhagyó: 춥다 → 추울 때',
      ],
      [
        text`한국에 처음 ${bold('왔을 때')} 한국어를 잘 못했어요.`,
        'Amikor először jöttem Koreába, nem beszéltem jól koreaiul.',
      ],
      [text`어렸${bold('을 때')} 피아노를 배웠어요.`, 'Gyerekkoromban zongorázni tanultam.'],
    ],
    correctIncorrect: [
      { correct: '방학 때 여행을 가요.', translation: 'A szünetben elutazom.' },
      { incorrect: '방학할 때에 여행을 가요.', reason: 'főnévnél egyszerűen N 때' },
      { incorrect: '아침 때 운동해요.', reason: 'az 아침, 오후, 저녁 után nem kell 때: 아침에' },
    ],
  },
  {
    lesson: 4,
    point: 1,
    form: '-기로 하다',
    name: '„elhatároztam / megbeszéltük, hogy …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy valamit ${bold('elhatároztunk, megbeszéltünk, megígértünk')}. A tő végétől függetlenül ${korean('-기로 하다')}. Mivel a döntés már megszületett, ${bold('múlt időben')} használjuk, akkor is, ha a cselekvés a jövőben lesz: ${korean('내일 만나기로 했어요')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-기로 했어요', conjugate: word => withPlainStem(word, '기로 했어요') }],
    },
    examples: [
      [
        text`내일 친구하고 영화를 보${bold('기로 했어요')}.`,
        'Megbeszéltem a barátommal, hogy holnap megnézünk egy filmet.',
      ],
      [text`올해부터 담배를 끊${bold('기로 했어요')}.`, 'Elhatároztam, hogy idéntől leszokom a cigiről.'],
      [text`파티에 청바지를 입${bold('기로 했어요')}.`, 'Úgy döntöttem, farmert veszek fel a buliba.'],
      [
        text`주말에 이사하는 친구를 돕${bold('기로 했어요')}.`,
        'Megígértem, hogy hétvégén segítek a költöző barátomnak.',
        '-기 előtt a ㅂ-rendhagyó nem változik: 돕기로',
      ],
    ],
  },
  {
    lesson: 4,
    point: 2,
    form: '에다가',
    name: '„… mellé még …, …-hoz/-hez” (hozzáadás)',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt jelzi, hogy ehhez ${bold('még valami hozzájön')}: ${korean('청바지에다가 티셔츠를 입어요')} „a farmerhez pólót veszek fel”. Minden főnév után ugyanaz. Helyette állhat ${korean('에')} vagy ${korean('에다')} is; az ${korean('에다가/에다')} inkább beszélt nyelvi.`,
    ],
    examples: [
      [text`청바지${bold('에다가')} 티셔츠를 입으려고 해요.`, 'A farmerhez pólót akarok felvenni.'],
      [text`커피${bold('에다가')} 설탕을 넣었어요.`, 'Cukrot tettem a kávéba.'],
      [text`밥${bold('에다가')} 김치를 올려서 먹어요.`, 'A rizsre kimcsit teszek és úgy eszem.'],
      [text`떡볶이${bold('에다가')} 김밥도 시켰어요.`, 'A tokpokki mellé kimbapot is rendeltem.'],
    ],
  },
  {
    lesson: 5,
    point: 1,
    form: '-기가 좋다',
    name: '„jó (könnyű, kényelmes) …-ni”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy valamit ${bold('könnyű, kényelmes megtenni')}, alkalmas rá a hely vagy helyzet. A tő végétől függetlenül ${korean('-기가 좋다')}; a ${korean('가')} el is maradhat: ${korean('-기 좋다')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-기가 좋아요', conjugate: word => withPlainStem(word, '기가 좋아요') }],
    },
    examples: [
      [
        text`거실 창문이 커서 경치를 구경하${bold('기가 좋아요')}.`,
        'A nappali ablaka nagy, jól lehet nézni a kilátást.',
      ],
      [text`이 동네는 지하철역이 가까워서 살${bold('기 좋아요')}.`, 'Ez a környék közel van a metróhoz, jó itt lakni.'],
      [text`이 공원은 넓어서 산책하${bold('기가 좋아요')}.`, 'Ez a park tágas, jó itt sétálni.'],
      [
        text`이 노래는 조용해서 공부할 때 듣${bold('기 좋아요')}.`,
        'Ez a dal csendes, tanulás közben jó hallgatni.',
        '-기 előtt nincs rendhagyóság: 듣기',
      ],
    ],
    ownNote: [
      paragraph`Ugyanígy: ${korean('-기(가) 쉽다 / 어렵다 / 힘들다 / 편하다')} „könnyű / nehéz / fárasztó / kényelmes …-ni” (${reference('4A-05-2')}).`,
    ],
  },
  {
    lesson: 5,
    point: 2,
    form: '-지 않다, -지 못하다',
    name: 'hosszú tagadás („nem …”, „nem tud …”)',
    explanation: [
      paragraph`A ${korean('안')} és a ${korean('못')} hosszú, kicsit írottabb párja.`,
      list(
        text`${bold('-지 않다')}: igénél azt jelenti, hogy az alany ${bold('nem akarja')} megtenni; melléknévnél, hogy valami ${bold('nem olyan')}. Igével és melléknévvel is.`,
        text`${bold('-지 못하다')}: csak igével; az alany ${bold('nem képes')} megtenni, vagy körülmények miatt nem lehetséges.`
      ),
      paragraph`A tő végétől függetlenül ${korean('-지')}; a ${korean('않다 / 못하다')} ragozódik.`,
    ],
    table: {
      existential: false,
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-지 않아요', conjugate: word => withPlainStem(word, '지 않아요') },
        {
          header: '-지 못해요 (csak ige)',
          conjugate: word => (word.wordClass === 'verb' ? withPlainStem(word, '지 못해요') : null),
        },
      ],
    },
    examples: [
      [text`이 집은 크${bold('지 않지만')} 깨끗해요.`, 'Ez a ház nem nagy, de tiszta.'],
      [text`저는 아침을 먹${bold('지 않아요')}.`, 'Nem reggelizem.'],
      [
        text`어제 너무 바빠서 숙제를 하${bold('지 못했어요')}.`,
        'Tegnap túl elfoglalt voltam, nem tudtam megcsinálni a házit.',
      ],
      [text`오늘은 날씨가 덥${bold('지 않아요')}.`, 'Ma nincs meleg.', '-지 előtt a ㅂ-rendhagyó nem változik: 덥지'],
    ],
    ownNote: [
      paragraph`${korean('안 가요 = 가지 않아요')}, ${korean('못 가요 = 가지 못해요')}. A ${korean('-지 못하다')} melléknévvel csak ritkán, „nem elég …” értelemben áll (${korean('넉넉하지 못하다')}).`,
    ],
  },
  {
    lesson: 6,
    point: 1,
    form: '-(으)면서 (동시)',
    name: '„miközben …” (egyidejűség)',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy két cselekvést ${bold('egyszerre')} végez ugyanaz a személy.`,
      paragraph`${bold('받침')} után: ${bold('-으면서')}, magánhangzó után: ${bold('-면서')}, ${bold('ㄹ-tő')} után is ${bold('-면서')} (${korean('놀면서')}).`,
    ],
    table: {
      additionalWords: ['먹다', '보다', '읽다', '마시다', '입다', '춤추다', '찍다', '운동하다', '듣다', '만들다'],
      sampleSet: 'verbs',
      columns: [{ header: '-(으)면서', conjugate: word => withEu(word, '면서') }],
    },
    examples: [
      [text`커피를 마시${bold('면서')} 음악을 들어요.`, 'Kávézás közben zenét hallgatok.'],
      [text`음악을 들${bold('으면서')} 공부해요.`, 'Zenehallgatás közben tanulok.', 'ㄷ-rendhagyó: 듣다 → 들으면서'],
      [text`밥을 먹${bold('으면서')} 텔레비전을 봐요.`, 'Evés közben tévézem.'],
      [text`아르바이트를 하${bold('면서')} 학교에 다녀요.`, 'Diákmunka mellett járok iskolába.'],
    ],
    correctIncorrect: [
      { correct: '저는 노래하면서 춤을 춰요.', translation: 'Éneklés közben táncolok.' },
      { incorrect: '저는 노래하면서 동생은 춤을 춰요.', reason: 'a két cselekvés alanya azonos kell legyen' },
    ],
  },
  {
    lesson: 6,
    point: 2,
    form: '-지요?',
    name: '„…, ugye?” (megerősítő kérdés)',
    explanation: [
      paragraph`Ige vagy melléknév után, amikor a beszélő olyasmit kérdez, amit ${bold('már tud vagy sejt')}, és csak ${bold('megerősítést')} vár. A tő végétől függetlenül ${korean('-지요?')}; beszédben gyakran ${korean('-죠?')}. Múltra: ${korean('-았지요/었지요?')}`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-지요?', conjugate: word => withPlainStem(word, '지요?') },
        { header: 'Múlt: -았지요/었지요?', conjugate: word => withPast(word, '지요?') },
      ],
    },
    examples: [
      [text`한국 음식이 맛있${bold('지요')}?`, 'Finom a koreai étel, ugye?'],
      [text`내일 시험이 있${bold('지요')}?`, 'Holnap vizsga van, ugye?'],
      [text`어제 많이 ${bold('추웠지요')}?`, 'Tegnap nagyon hideg volt, ugye?', 'múlt: 춥다 → 추웠지요'],
      [text`요즘 회사 일이 바쁘${bold('죠')}?`, 'Mostanában sok a munka a cégnél, ugye?'],
    ],
    ownNote: [
      paragraph`Kérdőszóval (${korean('뭐, 어디, 누구')}) udvarias, puhított kérdés: ${korean('이게 뭐지요?')} „Mi is ez?” Kijelentésként (eső hanglejtéssel) „hiszen…”: ${korean('제가 말했지요')}.`,
    ],
  },
  {
    lesson: 7,
    point: 1,
    form: '-(으)면',
    name: '„ha …” (feltétel)',
    explanation: [
      paragraph`Ige vagy melléknév után ${bold('feltételt')} fejez ki: „ha X, akkor Y”. Akkor is, ha valami még nem biztos vagy nem valósult meg.`,
      paragraph`${bold('받침')} után: ${bold('-으면')}, magánhangzó után: ${bold('-면')}, ${bold('ㄹ-tő')} után is ${bold('-면')} (${korean('만들면')}).`,
    ],
    table: {
      additionalWords: ['먹다', '가다', '많다', '마시다', '좋다', '아프다', '듣다', '피곤하다', '쉽다', '힘들다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-(으)면', conjugate: word => withEu(word, '면') }],
    },
    examples: [
      [text`스트레스를 받${bold('으면')} 가슴이 답답해요.`, 'Ha stresszes vagyok, szorít a mellkasom.'],
      [text`시간이 있${bold('으면')} 같이 영화 볼까요?`, 'Ha van időd, megnézünk együtt egy filmet?'],
      [
        text`날씨가 ${bold('더우면')} 바다에 가요.`,
        'Ha meleg van, a tengerhez megyünk.',
        'ㅂ-rendhagyó: 덥다 → 더우면',
      ],
      [
        text`이 노래를 들${bold('으면')} 기분이 좋아져요.`,
        'Ha ezt a dalt hallgatom, jobb kedvem lesz.',
        { note: 'ㄷ-rendhagyó: 듣다 → 들으면', uses: ['3A-09-1'] },
      ],
    ],
    ownNote: [
      paragraph`Főnévvel: ${korean('-(이)면')}: ${korean('학생이면')}, ${korean('주말이면')}. Valószínűtlen, elképzelt feltételre a ${reference('4A-01-1')} ${korean('-는다면/ㄴ다면/다면')} alakot tanít.`,
    ],
  },
  {
    lesson: 7,
    point: 2,
    form: 'ㅅ 불규칙',
    name: 'ㅅ-rendhagyó igék és melléknevek',
    explanation: [
      paragraph`Néhány ㅅ-re végződő szónál (${korean('붓다, 젓다, 짓다, 낫다')}) a ㅅ ${bold('magánhangzóval kezdődő végződés előtt kiesik')}: ${korean('짓다 → 지어요, 지으면')}. A kiesés után a szótagok ${bold('nem vonódnak össze')}: ${korean('나아요')}, nem ${korean('나요')}.`,
      paragraph`Szabályos (a ㅅ megmarad): ${korean('씻다, 웃다, 벗다')}.`,
    ],
    table: {
      additionalWords: ['낫다', '붓다', '젓다', '짓다', '씻다'],
      words: [
        createWord('짓다', 'verb'),
        createWord('붓다', 'verb'),
        createWord('젓다', 'verb'),
        createWord('낫다', 'adjective'),
      ],
      irregularWords: [createWord('씻다', 'verb'), createWord('웃다', 'verb'), createWord('벗다', 'verb')],
      columns: [
        { header: '-아요/어요', conjugate: word => withAOrEo(word, '요') },
        { header: 'Múlt', conjugate: word => withPast(word, '어요') },
        { header: '-(으)면', conjugate: word => withEu(word, '면') },
        { header: '-고 (változatlan)', conjugate: word => withPlainStem(word, '고') },
      ],
    },
    irregularRowsOptional: true,
    examples: [
      [text`감기가 다 ${bold('나았어요')}.`, 'Teljesen meggyógyultam a megfázásból.', 'ㅅ-rendhagyó: 낫다 → 나았어요'],
      [text`라면을 끓일 때 물을 너무 많이 ${bold('부었어요')}.`, 'Amikor rament főztem, túl sok vizet öntöttem bele.'],
      [text`이 건물은 언제 ${bold('지었어요')}?`, 'Mikor épült ez az épület?'],
      [text`커피에 설탕을 넣고 잘 ${bold('저으세요')}.`, 'Tegyen cukrot a kávéba, és jól keverje meg.'],
    ],
    ownNote: [
      paragraph`A táblázat második részében (${korean('씻다, 웃다, 벗다')}) szabályos szavak vannak: ${korean('씻어요, 웃어요, 벗어요')}. A ${korean('낫다')} kétféle: „meggyógyul” (ige) és „jobb” (melléknév): ${korean('이게 더 나아요')}.`,
    ],
  },
  {
    lesson: 8,
    point: 1,
    form: '-는데/(으)ㄴ데',
    name: '„…, és (ezért) …”: háttér, előzmény',
    explanation: [
      paragraph`Ige, melléknév, ${korean('이다/아니다')} után a ${bold('hátteret, helyzetet')} mutatja be, mielőtt a lényeget mondanánk; gyakran kérdés, kérés vagy javaslat előtt: „Holnap szabad vagyok – menjünk moziba?”`,
      list(
        text`${bold('Ige')}: ${korean('-는데')} (ㄹ kiesik: ${korean('사는데')}); ${bold('있다/없다')}: ${korean('-는데')}`,
        text`${bold('Melléknév')}: 받침 után ${korean('-은데')}, magánhangzó után ${korean('-ㄴ데')} (ㄹ kiesik: ${korean('긴데')})`,
        text`${bold('Főnév')}: ${korean('-인데')}; múlt: ${korean('-았는데/었는데')}`
      ),
    ],
    table: {
      additionalWords: [
        '먹다',
        '읽다',
        '가다',
        '공부하다',
        '만들다',
        '많다',
        '좋다',
        '춥다',
        '없다',
        '재미있다',
        '싸다',
        '크다',
        '고프다',
        '아프다',
        '심심하다',
      ],
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => presentModifier(word, '데') },
        { header: 'Múlt: -았는데/었는데', conjugate: word => withPast(word, '는데') },
      ],
    },
    examples: [
      [text`잠이 안 오${bold('는데')} 어떻게 해야 돼요?`, 'Nem jön álom a szememre, mit csináljak?'],
      [text`배가 고${bold('픈데')} 뭐 먹을까요?`, 'Éhes vagyok, mit együnk?', '으-tő: 고프다 → 고픈데'],
      [
        text`오늘 날씨가 ${bold('추운데')} 따뜻하게 입으세요.`,
        'Ma hideg van, öltözz fel melegen.',
        'ㅂ-rendhagyó: 춥다 → 추운데',
      ],
      [
        text`내일이 친구 생일${bold('인데')} 뭘 선물하면 좋을까요?`,
        'Holnap lesz a barátom születésnapja – mit ajándékozzak?',
      ],
    ],
    ownNote: [
      paragraph`A ${reference('2B-08-1')} ugyanezt az alakot ${bold('ellentétre')} („de”) is használja, a ${reference('2B-09-2')} pedig mondatvégen (${korean('-는데요')}) csodálkozásra. Beszélgetésben a ${korean('-는데요')} puhított válasz is lehet: ${korean('저는 마크인데요')} „Én Mark vagyok (és…?)”.`,
      paragraph`Kérdés vagy kérés előtt udvarias bevezetés is: ${korean('죄송한데 화장실이 어디예요?')} „Elnézést, hol van a mosdó?” A ${korean('죄송하지만')} formálisabb, és inkább elutasítást, rossz hírt vezet be (${korean('-지만')}, ${reference('1B-09-1')}).`,
    ],
  },
  {
    lesson: 8,
    point: 2,
    form: '-아/어 보다 (시도)',
    name: '„próbáld meg …” (javaslat, tanács)',
    explanation: [
      paragraph`Ige után azt javasolja, hogy a másik ${bold('próbáljon ki')} valamit, amit még nem csinált. Gyakran ${korean('-아/어 보세요')} alakban. A ${bold('-아/어')} szabály szerint: ${korean('가 보세요, 먹어 보세요, 해 보세요')}.`,
    ],
    table: {
      additionalWords: [
        '앉다',
        '찾다',
        '가다',
        '만나다',
        '일어나다',
        '먹다',
        '읽다',
        '마시다',
        '배우다',
        '듣다',
        '하다',
        '구경하다',
        '여행하다',
        '운동하다',
        '이야기하다',
      ],
      sampleSet: 'verbs',
      columns: [{ header: '-아/어 보세요', conjugate: word => withAOrEo(word, ' 보세요') }],
    },
    examples: [
      [
        text`잠이 안 오면 가벼운 운동을 해 ${bold('보세요')}.`,
        'Ha nem jön álom a szemedre, próbálj meg egy kis könnyű testmozgást.',
      ],
      [text`이 김치 한번 먹어 ${bold('보세요')}.`, 'Kóstold meg ezt a kimcsit.'],
      [
        text`이 노래를 들어 ${bold('보세요')}. 정말 좋아요.`,
        'Hallgasd meg ezt a dalt, nagyon jó.',
        'ㄷ-rendhagyó: 듣다 → 들어 보세요',
      ],
      ['이 옷 입어 봐도 돼요?', 'Felpróbálhatom ezt a ruhát?'],
    ],
    ownNote: [
      paragraph`A ${korean('보다')} („látni”) önmagával nem kapcsolódik: ${korean('봐 보세요')} helyett ${korean('보세요')}. A ${reference('2A-12-1')} ugyanezt ${bold('tapasztalatra')} használja: ${korean('먹어 봤어요')} „már ettem (kipróbáltam)”.`,
    ],
  },
  {
    lesson: 9,
    point: 1,
    form: '-는/(으)ㄴ/(으)ㄹ 것 같다',
    name: '„úgy tűnik, …; szerintem …” (feltételezés)',
    explanation: [
      paragraph`Ige, melléknév, ${korean('이다/아니다')} után a beszélő ${bold('feltételezését')} fejezi ki, vagy udvariasan, puhítva mond véleményt.`,
      simpleTable(
        ['', 'Múlt', 'Jelen', 'Jövő / feltételezés'],
        [
          ['Ige', korean('-(으)ㄴ 것 같다'), korean('-는 것 같다'), korean('-(으)ㄹ 것 같다')],
          ['Melléknév', '—', korean('-(으)ㄴ 것 같다'), korean('-(으)ㄹ 것 같다')],
          ['Főnév + 이다', '—', korean('-인 것 같다'), korean('-일 것 같다')],
        ]
      ),
      paragraph`ㄹ-tőnél az ㄹ kiesik: ${korean('만드는, 만든, 만들 것 같다')}.`,
    ],
    table: {
      additionalWords: [
        '먹다',
        '오다',
        '듣다',
        '만들다',
        '재미있다',
        '작다',
        '좁다',
        '좋다',
        '늦다',
        '괜찮다',
        '짜다',
        '크다',
        '따뜻하다',
        '멀다',
        '춥다',
        '찍다',
        '마시다',
        '어렵다',
      ],
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Múlt (ige)', conjugate: word => (word.wordClass === 'verb' ? withEu(word, 'ㄴ 것 같아요') : null) },
        { header: 'Jelen', conjugate: word => presentModifier(word, ' 것 같아요') },
        { header: 'Jövő', conjugate: word => withEu(word, 'ㄹ 것 같아요') },
      ],
    },
    examples: [
      [text`밖에 비가 오${bold('는 것 같아요')}.`, 'Úgy tűnik, kint esik az eső.'],
      [text`이 음식은 좀 ${bold('매울 것 같아요')}.`, 'Ez az étel szerintem csípős lesz.', 'ㅂ-rendhagyó: 맵다 → 매울'],
      [text`마크 씨가 벌써 집에 ${bold('간 것 같아요')}.`, 'Úgy tűnik, Mark már hazament.'],
      [text`이 옷이 저한테 좀 ${bold('작은 것 같아요')}.`, 'Ez a ruha szerintem egy kicsit kicsi nekem.'],
    ],
    ownNote: [
      paragraph`Koreaiul gyakran puhítunk vele akkor is, ha biztosak vagyunk: ${korean('맛있는 것 같아요')} „szerintem finom”. A ${korean('-(으)ㄹ 것 같다')} és a ${korean('-(으)ㄹ 거예요')} közel áll egymáshoz, de a ${korean('것 같다')} szubjektívebb, gyakran benyomáson alapul.`,
    ],
  },
  {
    lesson: 9,
    point: 2,
    form: '-는 게 어때요?',
    name: '„mi lenne, ha …?” (javaslat)',
    explanation: [
      paragraph`Ige után a hallgatónak ${bold('javasol')} valamit: „Mi lenne, ha …?”, „Nem kéne …?” A tő végétől függetlenül ${korean('-는 게 어때요?')}; ㄹ-tőnél az ㄹ kiesik: ${korean('만드는 게 어때요?')}`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-는 게 어때요?', conjugate: word => withPlainStem(word, '는 게 어때요?') }],
    },
    examples: [
      [text`그럼 칼국수를 먹${bold('는 게 어때요')}?`, 'Akkor mi lenne, ha kalguksut ennénk?'],
      [text`피곤하면 좀 쉬${bold('는 게 어때요')}?`, 'Ha fáradt vagy, nem pihennél egy kicsit?'],
      [
        text`한국 노래를 많이 듣${bold('는 게 어때요')}?`,
        'Mi lenne, ha sok koreai dalt hallgatnál?',
        '-는 előtt nincs ㄷ-változás: 듣는',
      ],
      [
        text`친구한테 직접 만드${bold('는 게 어때요')}?`,
        'Mi lenne, ha te magad készítenéd el a barátodnak?',
        'ㄹ-tő: 만들다 → 만드는',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('게')} a ${korean('것이')} rövidülése. Múlt idejű változata, ${korean('-는 게 어땠어요?')}, nem javaslat, hanem kérdés: „Milyen volt …?”. Hasonló javaslatok: ${korean('-아/어 보세요')}, ${korean('-(으)ㄹ까요?')}, ${korean('-지 그래요?')} (${reference('4B-03-2')}).`,
    ],
  },
  {
    lesson: 10,
    point: 1,
    form: 'ㅎ 불규칙',
    name: 'ㅎ-rendhagyó melléknevek (színek, 그렇다, 어떻다)',
    explanation: [
      paragraph`A ㅎ-ra végződő melléknevek többsége (${korean('하얗다, 까맣다, 파랗다, 빨갛다, 노랗다, 어떻다, 그렇다')}) rendhagyó:`,
      list(
        text`${bold('-(으)')} végződés előtt a ㅎ ${bold('kiesik')}, és nincs 으: ${korean('빨갛다 → 빨간, 빨가면')}`,
        text`${bold('-아/어')} előtt a ㅎ kiesik, és a magánhangzó ${bold('ㅐ')} lesz (ㅑ után ㅒ): ${korean('빨개요, 그래요, 하얘요')}`
      ),
      paragraph`Szabályos: ${korean('좋다')} (melléknév), ${korean('놓다, 넣다')} (ige).`,
    ],
    table: {
      additionalWords: ['까맣다', '파랗다', '빨갛다', '노랗다', '하얗다', '좋다'],
      words: [
        createWord('빨갛다', 'adjective'),
        createWord('노랗다', 'adjective'),
        createWord('파랗다', 'adjective'),
        createWord('하얗다', 'adjective'),
        createWord('까맣다', 'adjective'),
        createWord('그렇다', 'adjective'),
        createWord('어떻다', 'adjective'),
      ],
      irregularWords: [createWord('좋다', 'adjective'), createWord('놓다', 'verb'), createWord('넣다', 'verb')],
      columns: [
        { header: '-아요/어요', conjugate: word => withAOrEo(word, '요') },
        { header: 'Múlt', conjugate: word => withPast(word, '어요') },
        {
          header: '-(으)ㄴ',
          conjugate: word => (word.wordClass === 'adjective' ? withEu(word, 'ㄴ') : withEu(word, 'ㄴ')),
        },
        { header: '-(으)면', conjugate: word => withEu(word, '면') },
        { header: '-고', conjugate: word => withPlainStem(word, '고') },
      ],
    },
    irregularRowsOptional: true,
    examples: [
      [
        text`그럼 저 ${bold('까만')} 구두는 어때요?`,
        'Akkor mit szólsz ahhoz a fekete cipőhöz?',
        'ㅎ-rendhagyó: 까맣다 → 까만',
      ],
      [text`가을이 되면 단풍이 ${bold('빨개요')}.`, 'Ősszel vörösek a levelek.'],
      [text`하늘이 정말 ${bold('파래요')}.`, 'Az ég nagyon kék.'],
      [text`${bold('어떤')} 색을 좋아해요? – ${bold('하얀')} 색을 좋아해요.`, '– Milyen színt szeretsz? – A fehéret.'],
    ],
    ownNote: [
      paragraph`A táblázat második része (${korean('좋다, 놓다, 넣다')}) szabályos. Mássalhangzós végződés előtt (${korean('-고, -지만, -네요')}) a ㅎ megmarad: ${korean('빨갛고, 그렇네요')}. A ${korean('그래요')} gyakori válasz: „Úgy van / Tényleg?”.`,
    ],
  },
  {
    lesson: 10,
    point: 2,
    form: '-(으)면 좋겠다',
    name: '„jó lenne, ha …; bárcsak …” (kívánság)',
    explanation: [
      paragraph`Ige vagy melléknév után ${bold('kívánságot, reményt')} fejez ki: „jó lenne, ha …”.`,
      paragraph`${bold('받침')} után: ${bold('-으면 좋겠다')}, magánhangzó vagy ${bold('ㄹ')} után: ${bold('-면 좋겠다')}. Leggyakrabban ${korean('-(으)면 좋겠어요')} alakban.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-(으)면 좋겠어요', conjugate: word => withEu(word, '면 좋겠어요') }],
    },
    examples: [
      [text`주말에 날씨가 좋${bold('으면 좋겠어요')}.`, 'Jó lenne, ha hétvégén szép idő lenne.'],
      [text`빨리 방학이 ${bold('되면 좋겠어요')}.`, 'Bárcsak hamar jönne a szünet.'],
      [text`한국어를 잘하${bold('면 좋겠어요')}.`, 'Jó lenne, ha jól beszélnék koreaiul.'],
      [
        text`내일은 덜 ${bold('추우면 좋겠어요')}.`,
        'Jó lenne, ha holnap kevésbé lenne hideg.',
        'ㅂ-rendhagyó: 춥다 → 추우면',
      ],
    ],
    ownNote: [
      paragraph`Erősebb kívánság a múlt idővel: ${korean('-았으면/었으면 좋겠다')} (${korean('여행을 갔으면 좋겠어요')}), ennek a ${korean('-았으면/었으면 하다')} változatát a ${reference('4A-01-2')} tanítja.`,
    ],
  },
  {
    lesson: 11,
    point: 1,
    form: '-(으)ㄴ 적이 있다',
    name: '„már …-tam/-tem valaha” (tapasztalat)',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy valami ${bold('a múltban már megtörtént')} velünk (tapasztalat). Tagadás: ${korean('-(으)ㄴ 적이 없다')} „még soha”.`,
      paragraph`${bold('받침')} után: ${bold('-은 적이 있다')}, magánhangzó után: ${bold('-ㄴ 적이 있다')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik: ${korean('만든 적이 있다')}.`,
    ],
    table: {
      additionalWords: ['먹다', '가다', '받다', '만나다', '읽다', '기다리다', '듣다', '여행하다', '붓다', '살다'],
      sampleSet: 'verbs',
      columns: [
        { header: '-(으)ㄴ 적이 있어요', conjugate: word => withEu(word, 'ㄴ 적이 있어요') },
        { header: '-(으)ㄴ 적이 없어요', conjugate: word => withEu(word, 'ㄴ 적이 없어요') },
      ],
    },
    examples: [
      [text`한국을 여행${bold('한 적이 있어요')}?`, 'Utaztál már Koreában?'],
      [text`저는 김치를 만${bold('든 적이 있어요')}.`, 'Csináltam már kimcsit.', 'ㄹ-tő: 만들다 → 만든'],
      [text`그 노래를 들${bold('은 적이 없어요')}.`, 'Még sosem hallottam azt a dalt.', 'ㄷ-rendhagyó: 듣다 → 들은'],
      [text`한복을 입${bold('은 적이 있어요')}?`, 'Viseltél már hanbokot?'],
    ],
    ownNote: [
      paragraph`Gyakran a ${korean('-아/어 보다')}-val együtt: ${korean('가 본 적이 있어요')} „voltam már ott (kipróbáltam)”. Rendszeres, mindennapos dologra nem használjuk: ${korean('아침을 먹은 적이 있어요')} furcsa.`,
    ],
  },
  {
    lesson: 11,
    point: 2,
    form: '동안',
    name: '„… alatt, … ideig” (időtartam)',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt az ${bold('időtartamot')} jelöli, ameddig valami tart: ${korean('일주일 동안')} „egy hétig / egy hét alatt”. Minden főnév után ugyanaz.`,
    ],
    examples: [
      [text`방학 ${bold('동안')} 한국을 여행했어요.`, 'A szünetben beutaztam Koreát.'],
      [text`3년 ${bold('동안')} 한국어를 공부했어요.`, 'Három évig tanultam koreaiul.'],
      [text`얼마 ${bold('동안')} 한국에 있을 거예요?`, 'Mennyi ideig leszel Koreában?'],
      [text`두 시간 ${bold('동안')} 기다렸어요.`, 'Két órát vártam.'],
    ],
    ownNote: [
      paragraph`Igével: ${korean('-는 동안')} „amíg …, miközben …”: ${korean('제가 요리하는 동안 청소 좀 해 주세요')}. Rövid időre gyakran elmarad: ${korean('두 시간 기다렸어요')}.`,
    ],
  },
  {
    lesson: 12,
    point: 1,
    form: '-아/어 보다 (경험)',
    name: '„már kipróbáltam, csináltam” (tapasztalat)',
    explanation: [
      paragraph`Ige után, főleg ${bold('múlt időben')} (${korean('-아/어 봤어요')}), azt fejezi ki, hogy valamit ${bold('már megtapasztaltunk, kipróbáltunk')}. Leginkább különleges élményekről (utazás, hobbi). A ${bold('-아/어')} szabály szerint képezzük.`,
    ],
    table: {
      additionalWords: [
        '살다',
        '먹다',
        '공부하다',
        '찾다',
        '마시다',
        '여행하다',
        '가다',
        '만들다',
        '요리하다',
        '사다',
        '배우다',
        '운동하다',
        '만나다',
        '듣다',
        '전화하다',
      ],
      sampleSet: 'verbs',
      columns: [
        { header: '-아/어 봤어요', conjugate: word => withAOrEo(word, ' 봤어요') },
        { header: 'Kérdés', conjugate: word => withAOrEo(word, ' 봤어요?') },
      ],
    },
    examples: [
      [text`박물관에서 도장을 만들어 ${bold('봤어요')}.`, 'A múzeumban kipróbáltam a pecsétkészítést.'],
      [text`부산에 가 ${bold('봤어요')}?`, 'Voltál már Puszanban?'],
      [text`한복을 입어 ${bold('봤는데')} 정말 예뻤어요.`, 'Felpróbáltam a hanbokot, nagyon szép volt.'],
      [text`이 노래 들어 ${bold('봤어요')}?`, 'Hallottad már ezt a dalt?', 'ㄷ-rendhagyó: 듣다 → 들어 봤어요'],
    ],
    ownNote: [
      paragraph`Az ${korean('-(으)ㄴ 적이 있다')}-val együtt is gyakori: ${korean('먹어 본 적이 있어요')}. A ${korean('보다')} igénél: ${korean('봤어요')} (nem ${korean('봐 봤어요')}).`,
    ],
  },
  {
    lesson: 12,
    point: 2,
    form: '-(으)ㄴ (동사 과거)',
    name: 'ige múlt idejű jelzői alakja („a tegnap látott film”)',
    explanation: [
      paragraph`Ige után áll, amikor az ige ${bold('főnevet jelöl')}, és a cselekvés ${bold('már megtörtént')} (vagy befejeződött, és az eredménye megmaradt): ${korean('어제 본 영화')} „a film, amit tegnap láttam”.`,
      paragraph`${bold('받침')} után: ${bold('-은')}, magánhangzó után: ${bold('-ㄴ')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik: ${korean('만들다 → 만든')}.`,
    ],
    table: {
      additionalWords: ['먹다', '보다', '받다', '마시다', '읽다', '만나다', '듣다', '공부하다', '붓다', '만들다'],
      sampleSet: 'verbs',
      columns: [{ header: '-(으)ㄴ + főnév', conjugate: word => withEu(word, 'ㄴ') + ' 것' }],
    },
    examples: [
      [
        text`이건 제가 직접 만${bold('든')} 도장이에요.`,
        'Ezt a pecsétet én magam készítettem.',
        'ㄹ-tő: 만들다 → 만든',
      ],
      [text`어제 ${bold('본')} 영화가 정말 재미있었어요.`, 'A film, amit tegnap láttam, nagyon érdekes volt.'],
      [text`지난주에 ${bold('산')} 옷을 오늘 입었어요.`, 'Ma felvettem a ruhát, amit a múlt héten vettem.'],
      [
        text`아까 들${bold('은')} 노래 제목이 뭐예요?`,
        'Mi a címe a dalnak, amit az előbb hallottunk?',
        'ㄷ-rendhagyó: 듣다 → 들은',
      ],
    ],
    ownNote: [
      paragraph`Vigyázat: melléknévnél a ${korean('-(으)ㄴ')} ${bold('jelen')} időt jelent (${korean('작은 가방')} „kis táska”), igénél ${bold('múltat')} (${korean('먹은 음식')} „a megevett étel”). Ige jelen: ${korean('-는')}, jövő: ${korean('-(으)ㄹ')}.`,
    ],
  },
];
export default {
  lessons: {
    1: {
      korean: '저는 프로그램 만드는 일을 해요',
      hungarian: 'Programokat készítek (ez a munkám).',
      pronunciation: 'ㄴ 첨가',
      pronunciationHungarian: 'ㄴ betoldása (무슨 일 [무슨닐])',
    },
    2: { korean: '등산을 하거나 운동 모임에 가요', hungarian: 'Túrázom vagy sportklubba járok.' },
    3: {
      korean: '요즘 아침마다 회의가 있어요',
      hungarian: 'Mostanában minden reggel értekezlet van.',
      pronunciation: '평음, 경음, 격음',
      pronunciationHungarian: 'sima, feszes és hehezetes mássalhangzók',
    },
    4: { korean: '청바지에다가 티셔츠를 입으려고 해요', hungarian: 'A farmerhez pólót akarok felvenni.' },
    5: {
      korean: '거실 창문이 커서 경치를 구경하기가 좋아요',
      hungarian: 'A nappali ablaka nagy, jól lehet nézni a kilátást.',
      pronunciation: '겹받침 ㄺ',
      pronunciationHungarian: 'kettős 받침 ㄺ (밝다 [박따], 밝고 [발꼬], 밝아요 [발가요])',
    },
    6: { korean: '커피를 마시면서 음악을 들어요', hungarian: 'Kávézás közben zenét hallgatok.' },
    7: {
      korean: '스트레스를 받으면 가슴이 답답해요',
      hungarian: 'Ha stresszes vagyok, szorít a mellkasom.',
      pronunciation: '이중모음 단순화',
      pronunciationHungarian: 'kettőshangzó egyszerűsödése: ㅈ, ㅉ, ㅊ után ㅛ → [ㅗ] (바쁘죠 [바쁘조])',
    },
    8: {
      korean: '잠이 안 오면 가벼운 운동을 해 보세요',
      hungarian: 'Ha nem jön álom a szemedre, próbálj meg könnyű testmozgást.',
    },
    9: {
      korean: '그럼 칼국수를 먹는 게 어때요?',
      hungarian: 'Akkor mi lenne, ha kalguksut ennénk?',
      pronunciation: '경음화',
      pronunciationHungarian: 'keményedés',
    },
    10: { korean: '그럼 저 까만 구두는 어때요?', hungarian: 'Akkor mit szólsz ahhoz a fekete cipőhöz?' },
    11: {
      korean: '한국을 여행한 적이 있어요?',
      hungarian: 'Utaztál már Koreában?',
      pronunciation: '비음화',
      pronunciationHungarian: 'orrhangúsodás',
    },
    12: { korean: '박물관에서 도장을 만들어 봤어요', hungarian: 'A múzeumban pecsétet készítettem.' },
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
