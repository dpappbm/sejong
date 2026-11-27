import {
  bold,
  korean,
  koreanGlossedInRow,
  koreanWithTranslation,
  list,
  paragraph,
  reference,
  simpleTable,
  text,
} from '../../lib/richText';
import {
  presentModifier,
  withPast,
  withEu,
  withPlainStem,
  plainStyleStatement,
  nounWithParticle,
  type Word,
} from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';
const vocabularyGrammarPageOf = (lesson: number, point: number) => 20 + 2 * (lesson - 1) + (point - 1),
  studentBookPageOf = (lesson: number, point: number) => 8 * lesson + 6 + 2 * (point - 1);
const reportedStatementDaeyo = (word: Word) => plainStyleStatement(word).slice(0, -1) + '대요';

const points: PointSource[] = [
  {
    lesson: 1,
    point: 1,
    form: '-는다면/ㄴ다면/다면',
    name: '„ha (netán) …” (elképzelt, valószínűtlen feltétel)',
    explanation: [
      paragraph`Feltételt vagy feltevést fejez ki, főleg ha az ${bold('kevéssé valószínű vagy nem valós')}: „ha (egyszer) lehetőségem lenne…”. Valószínű, reális feltételre inkább a ${korean('-(으)면')} kell.`,
      list(
        text`${bold('Ige')}: 받침 után ${korean('-는다면')}, magánhangzó után ${korean('-ㄴ다면')} (ㄹ kiesik: ${korean('산다면')})`,
        text`${bold('Melléknév')}, ${korean('있다/없다')}: ${korean('-다면')}`,
        text`${bold('Főnév')}: ${korean('(이)라면')}; ${bold('múlt')}: ${korean('-았다면/었다면')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => plainStyleStatement(word) + '면' },
        { header: 'Múlt', conjugate: word => withPast(word, '다면') },
      ],
    },
    examples: [
      [
        text`여건이 ${bold('된다면')} 외국에서 1년쯤 살아 봤으면 해요.`,
        'Ha a körülmények engedik, szeretnék egy évet külföldön élni.',
      ],
      [text`복권에 당첨${bold('된다면')} 세계 여행을 하고 싶어요.`, 'Ha megnyerném a lottót, beutaznám a világot.'],
      [text`내가 너${bold('라면')} 그렇게 안 할 거야.`, 'A helyedben nem csinálnám így.'],
      [
        text`시간을 되돌릴 수 ${bold('있다면')} 고등학생 때로 돌아가고 싶어요.`,
        'Ha vissza lehetne forgatni az időt, a gimis éveimbe mennék vissza.',
      ],
      [
        text`그 노래를 매일 듣${bold('는다면')} 가사를 외울 수 있을 거예요.`,
        'Ha minden nap hallgatnád azt a dalt, meg tudnád tanulni a szövegét.',
        '-는다 előtt nincs ㄷ-változás: 듣는다면',
      ],
    ],
    ownNote: [
      paragraph`Ugyanaz a forma, mint a 한다체 (${reference('3A-12-1')}) + ${korean('-면')}. A ${korean('-았다면/었다면')} megvalósulatlan múltat is jelenthet: ${korean('그때 공부를 열심히 했다면…')} „ha akkor szorgalmasan tanultam volna…”.`,
    ],
  },
  {
    lesson: 1,
    point: 2,
    form: '-았으면/었으면 하다',
    name: '„szeretném, ha …; bárcsak …” (óhaj)',
    explanation: [
      paragraph`Ige vagy melléknév után a beszélő ${bold('reményét, kívánságát')} fejezi ki. A múlt idő jele itt ${bold('nem múltat')} jelent, hanem a kívánság erősségét. A ${korean('하다')} el is hagyható: ${korean('-았으면/었으면.')}`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-았으면/었으면 해요', conjugate: word => withPast(word, '으면 해요') },
        { header: '-았으면/었으면 좋겠어요', conjugate: word => withPast(word, '으면 좋겠어요') },
      ],
    },
    examples: [
      [text`외국에서 1년쯤 살아 ${bold('봤으면 해요')}.`, 'Szeretnék egyszer egy évet külföldön élni.'],
      [text`이번 시험에 꼭 합격${bold('했으면 해요')}.`, 'Nagyon remélem, hogy átmegyek ezen a vizsgán.'],
      [text`주말에 날씨가 좀 따뜻${bold('했으면 좋겠어요')}.`, 'Bárcsak hétvégén kicsit melegebb lenne.'],
      [text`내일은 덜 ${bold('더웠으면')}….`, 'Bárcsak holnap kevésbé lenne meleg…', 'ㅂ-rendhagyó: 덥다 → 더웠으면'],
    ],
    ownNote: [
      paragraph`A ${korean('-(으)면 좋겠다')} (${reference('2A-10-2')}) semlegesebb; a ${korean('-았으면/었으면')} változat erősebb, sóvárgóbb. Másnak udvarias kérésként is: ${korean('조용히 해 줬으면 해요')} „örülnék, ha csendben lennétek”.`,
    ],
  },
  {
    lesson: 2,
    point: 1,
    form: '-(으)ㄹ 만하다',
    name: '„érdemes …; megéri …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy valamit ${bold('érdemes megtenni')}, megéri, vagy ${bold('elfogadható, elviselhető')}. Főnév előtt jelzőként: ${korean('-(으)ㄹ 만한 N')} (${korean('가 볼 만한 곳')} „hely, ahová érdemes elmenni”).`,
      paragraph`${bold('받침')} után: ${bold('-을 만하다')}, magánhangzó után: ${bold('-ㄹ 만하다')}, ㄹ-tőnél: ${korean('살 만하다')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-(으)ㄹ 만해요', conjugate: word => withEu(word, 'ㄹ 만해요') },
        { header: '-(으)ㄹ 만한 + főnév', conjugate: word => withEu(word, 'ㄹ 만한') + ' 것' },
      ],
    },
    examples: [
      [text`한 번쯤 가 볼 ${bold('만한')} 곳이야.`, 'Egyszer érdemes elmenni oda.'],
      [text`이 영화는 정말 볼 ${bold('만해요')}.`, 'Ezt a filmet tényleg érdemes megnézni.'],
      [
        text`요즘 들을 ${bold('만한')} 노래 좀 추천해 주세요.`,
        'Ajánlj valami dalt, amit érdemes mostanában meghallgatni.',
        'ㄷ-rendhagyó: 듣다 → 들을 만한',
      ],
      [text`이 정도 추위는 참을 ${bold('만해요')}.`, 'Ekkora hideget még ki lehet bírni.'],
    ],
  },
  {
    lesson: 2,
    point: 2,
    form: '-던데',
    name: '„(azt tapasztaltam, hogy) …, (és / de) …”',
    explanation: [
      paragraph`Ige vagy melléknév után a ${bold('múltban közvetlenül tapasztalt')} tényt vagy élményt mondja el háttérként, és ehhez kapcsolódik a mondat folytatása (javaslat, kérdés, ellentét). A tő végétől függetlenül ${korean('-던데')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-던데', conjugate: word => withPlainStem(word, '던데') },
        { header: 'Múlt: -았던데/었던데', conjugate: word => withPast(word, '던데') },
      ],
    },
    examples: [
      [
        text`거기 경치가 정말 좋${bold('던데')} 한번 가 보세요.`,
        'Ott tényleg gyönyörű a kilátás (láttam), egyszer menj el.',
      ],
      [text`그 식당 음식이 맛있${bold('던데')} 같이 갈래요?`, 'Annak az étteremnek finom az étele, eljössz velem?'],
      [
        text`어제 보니까 많이 바쁘${bold('던데')} 오늘은 괜찮아요?`,
        'Tegnap láttam, hogy nagyon elfoglalt voltál – ma jobb?',
      ],
      [
        text`그 노래 처음 들었을 때는 별로${bold('던데')} 이제는 좋아요.`,
        'Amikor először hallottam azt a dalt, nem tetszett, de most már szeretem.',
      ],
      [
        text`그 식당 음식이 좀 맵${bold('던데')} 괜찮겠어요?`,
        'Annak az étteremnek elég csípős az étele – biztos jó lesz?',
        '-던 előtt nincs ㅂ-változás: 맵던데',
      ],
    ],
    ownNote: [
      paragraph`Mondatvégi párja a ${korean('-던데요')} (${reference('3B-10-1')}). A ${korean('-는데')} (${reference('2A-08-1')}) háttér-jelentésének „tapasztalati” változata: a ${korean('-던-')} a felidézett múltbeli élményt jelzi.`,
    ],
  },
  {
    lesson: 3,
    point: 1,
    form: '-는대요/ㄴ대요/대요',
    name: 'rövidített függő beszéd: „azt mondják, hogy …”',
    explanation: [
      paragraph`A ${korean('-는다고/ㄴ다고/다고 해요')} (${reference('3A-02-1')}) ${bold('rövidített')} alakja, beszélt nyelvben nagyon gyakori: hallott hírt adunk tovább.`,
      list(
        text`${bold('Ige')}: 받침 után ${korean('-는대요')}, magánhangzó után ${korean('-ㄴ대요')}`,
        text`${bold('Melléknév')}: ${korean('-대요')}`,
        text`${bold('Főnév')}: ${korean('(이)래요')}; ${bold('múlt')}: ${korean('-았대요/었대요')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: reportedStatementDaeyo },
        { header: 'Múlt: -았대요/었대요', conjugate: word => withPast(word, '대요') },
      ],
    },
    examples: [
      [text`드디어 새 앨범이 나온${bold('대')}.`, 'Azt mondják, végre kijön az új album.'],
      [text`마크 씨가 다음 달에 결혼한${bold('대요')}.`, 'Azt mondják, Mark jövő hónapban megnősül.'],
      [
        text`내일은 많이 ${bold('춥대요')}.`,
        'Azt mondják, holnap nagyon hideg lesz.',
        '-대요 előtt nincs ㅂ-változás: 춥대요',
      ],
      [text`그 가수가 어제 공연을 ${bold('했대요')}.`, 'Azt mondják, az énekes tegnap koncertezett.'],
    ],
    ownNote: [
      paragraph`Vigyázat: ${korean('-대요')} (= ${korean('-다고 해요')}, hallott hír) ≠ ${korean('-데요')} (= ${korean('-더라고요')}, saját élmény). ${korean('맛있대요')} „azt mondják, finom”, ${korean('맛있데요')} „(kóstoltam,) finom volt”.`,
    ],
  },
  {
    lesson: 3,
    point: 2,
    form: '-냬요, -(으)래요, -재요',
    name: 'rövidített idézett kérdés, felszólítás, javaslat',
    explanation: [
      paragraph`A függő beszéd többi fajtájának ${bold('rövid')} alakjai:`,
      simpleTable(
        ['Eredeti', 'Teljes függő beszéd', 'Rövid alak'],
        [
          ['kérdés', korean('-냐고 해요'), korean('-냬요')],
          ['felszólítás', korean('-(으)라고 해요'), korean('-(으)래요')],
          ['javaslat', korean('-자고 해요'), korean('-재요')],
        ]
      ),
      paragraph`A ${korean('-냬요')} a tő végétől függetlenül ugyanaz, ㄹ-tőnél az ㄹ kiesik (${korean('사냬요')}). ${korean('-(으)래요')}: 받침 után ${korean('-으래요')}, magánhangzó és ㄹ után ${korean('-래요')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: 'Kérdés: -냬요', conjugate: word => withPlainStem(word, '냬요') },
        { header: 'Felszólítás: -(으)래요', conjugate: word => withEu(word, '래요') },
        { header: 'Javaslat: -재요', conjugate: word => withPlainStem(word, '재요') },
      ],
    },
    examples: [
      [text`친구가 주말에 뭐 하${bold('냬요')}.`, 'A barátom azt kérdezi, mit csinálok hétvégén.'],
      [text`선생님이 내일까지 숙제를 내${bold('래요')}.`, 'A tanár azt mondta, holnapig adjuk be a házit.'],
      [text`동생이 같이 영화 보${bold('재요')}.`, 'Az öcsém azt javasolja, nézzünk meg együtt egy filmet.'],
      [
        text`엄마가 음악을 좀 작게 들${bold('으래요')}.`,
        'Anya azt mondta, hallgassam halkabban a zenét.',
        'ㄷ-rendhagyó: 듣다 → 들으래요',
      ],
    ],
    ownNote: [
      paragraph`Vigyázat: a ${korean('-(으)래요')} kétféle lehet: idézett felszólítás (${korean('가래요')} „azt mondta, menjek”) és a ${korean('-(으)ㄹ래요?')} (${reference('2B-01-1')}, ${korean('갈래요?')} „mennél?”) – a kettő különböző!`,
    ],
  },
  {
    lesson: 4,
    point: 1,
    form: '(으)로 인해서',
    name: '„… miatt, … következtében” (hivatalos)',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt jelöli, hogy valami ${bold('oka, előidézője')} az utána következőnek. Főleg ${bold('hivatalos')} beszédben, hírekben, írásban. Rövidebben ${korean('(으)로 인해')}; főnév előtt ${korean('(으)로 인한 N')}.`,
      paragraph`${bold('받침')} után: ${bold('으로 인해서')}, magánhangzó és ${bold('ㄹ')} után: ${bold('로 인해서')}.`,
    ],
    table: {
      kind: 'noun',
      nouns: [
        { word: '폭설', description: 'ㄹ-re végződik' },
        { word: '태풍', description: 'mássalhangzóra végződik' },
        { word: '사고', description: 'magánhangzóra végződik' },
      ],
      nounColumns: [
        { header: '(으)로 인해서', conjugate: noun => nounWithParticle(noun, '으로 인해서', '로 인해서', true) },
        {
          header: '(으)로 인한 + főnév',
          conjugate: noun => nounWithParticle(noun, '으로 인한 피해', '로 인한 피해', true),
        },
      ],
    },
    examples: [
      [
        text`폭설${bold('로 인해서')} 많은 피해가 발생하고 있습니다.`,
        'A heves havazás következtében nagy károk keletkeznek.',
      ],
      [text`태풍${bold('으로 인해')} 비행기가 결항되었습니다.`, 'A tájfun miatt törölték a járatokat.'],
      [text`교통사고${bold('로 인한')} 사망자가 줄었습니다.`, 'Csökkent a közlekedési balesetekben elhunytak száma.'],
      [text`스트레스${bold('로 인해서')} 잠을 못 자는 사람이 많아요.`, 'Sokan nem tudnak aludni a stressz miatt.'],
    ],
    ownNote: [
      paragraph`Hétköznapi beszédben inkább ${korean('N 때문에')} (${reference('2B-09-1')}) vagy ${korean('-아서/어서')}.`,
    ],
  },
  {
    lesson: 4,
    point: 2,
    form: '-(으)면서 (계기)',
    name: '„azzal, hogy …; ahogy …, úgy …” (ok, kiváltó esemény)',
    explanation: [
      paragraph`Ige vagy melléknév után azt fejezi ki, hogy az első rész a második ${bold('oka, kiváltója')}: „ahogy X történt, (úgy) Y”. Hírekben, leírásokban gyakori. Alakja megegyezik a ${reference('2A-06-1', '2A 6. leckében')} tanult egyidejűség-jelentésűvel: ${bold('받침')} után ${korean('-으면서')}, magánhangzó és ${bold('ㄹ')} után ${korean('-면서')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-(으)면서', conjugate: word => withEu(word, '면서') }],
    },
    examples: [
      [
        text`눈이 많이 내리${bold('면서')} 교통사고가 늘었습니다.`,
        'Az erős havazással megnövekedett a közlekedési balesetek száma.',
      ],
      [
        text`날씨가 ${bold('추워지면서')} 감기 환자가 많아졌어요.`,
        'Ahogy hidegre fordult az idő, megnőtt a megfázásos betegek száma.',
        'ㅂ-rendhagyó: 춥다 → 추워지면서',
      ],
      [
        text`스마트폰을 사용하${bold('면서')} 생활이 편리해졌어요.`,
        'Az okostelefonok használatával kényelmesebb lett az élet.',
      ],
      [
        text`기온이 올라가${bold('면서')} 얼음이 녹기 시작했어요.`,
        'Ahogy emelkedett a hőmérséklet, elkezdett olvadni a jég.',
      ],
    ],
    ownNote: [
      paragraph`A „miközben” (egyidejűség) jelentéstől az különbözteti meg, hogy itt a két tagmondat ${bold('alanya eltérhet')}, és ok–okozati kapcsolat van köztük.`,
    ],
  },
  {
    lesson: 5,
    point: 1,
    form: '-냐면',
    name: '„hogy …? (hát) …” (saját kérdés megismétlése magyarázat előtt)',
    explanation: [
      paragraph`A ${korean('-냐고 하면')} („ha azt kérdezed, hogy …”) ${bold('rövidítése')}. A beszélő megismétli a (feltett vagy várható) kérdést, majd megadja rá a választ: „Hogy miért? Hát azért, mert…”. Főleg beszédben, gyakran ${korean('-냐면요')} alakban. ㄹ-tőnél az ㄹ kiesik (${korean('사냐면')}); főnévvel ${korean('(이)냐면')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-냐면(요)', conjugate: word => withPlainStem(word, '냐면요') },
        { header: 'Múlt: -았냐면/었냐면', conjugate: word => withPast(word, '냐면') },
      ],
    },
    examples: [
      [
        text`어떤 앱을 주로 사용하${bold('냐면요')}, 지도 앱을 제일 많이 써요.`,
        'Hogy milyen appot használok főleg? Leginkább a térképes appot.',
      ],
      [
        text`왜 한국어를 배우${bold('냐면')} 한국 드라마를 좋아하기 때문이에요.`,
        'Hogy miért tanulok koreaiul? Mert szeretem a koreai sorozatokat.',
      ],
      [
        text`그 식당이 왜 유명하${bold('냐면')} 음식이 싸고 맛있거든요.`,
        'Hogy miért híres az az étterem? Mert olcsó és finom.',
      ],
      [text`어디에 살${bold('았냐면')} 부산에서 살았어요.`, 'Hogy hol laktam? Puszanban.'],
      [
        text`왜 그 노래를 자주 듣${bold('냐면')} 마음이 편해지거든요.`,
        'Hogy miért hallgatom gyakran azt a dalt? Mert megnyugtat.',
        '-냐 előtt nincs ㄷ-változás: 듣냐면',
      ],
    ],
  },
  {
    lesson: 5,
    point: 2,
    form: '-기가 쉽다, 어렵다, 힘들다, 편하다',
    name: '„könnyű / nehéz / fárasztó / kényelmes …-ni”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy cselekvés elvégzése vagy egy dolog bekövetkezése ${bold('könnyű, nehéz, fárasztó vagy kényelmes')}. A tő végétől függetlenül ${korean('-기가')} + melléknév; a ${korean('가')} el is maradhat.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-기가 쉬워요', conjugate: word => withPlainStem(word, '기가 쉬워요') },
        { header: '-기가 어려워요', conjugate: word => withPlainStem(word, '기가 어려워요') },
        { header: '-기가 편해요', conjugate: word => withPlainStem(word, '기가 편해요') },
      ],
    },
    examples: [
      [text`이 앱은 사용하${bold('기가 편해요')}.`, 'Ezt az appot kényelmes használni.'],
      [text`한국어 발음은 따라 하${bold('기가 어려워요')}.`, 'A koreai kiejtést nehéz utánozni.'],
      [text`아침에 일찍 일어나${bold('기가 힘들어요')}.`, 'Nehéz (fárasztó) reggel korán kelni.'],
      [text`겨울에는 감기에 걸리${bold('기 쉬워요')}.`, 'Télen könnyű megfázni.'],
      [
        text`이 노래는 가사가 쉬워서 따라 부르${bold('기가 쉬워요')}.`,
        'Ennek a dalnak egyszerű a szövege, könnyű vele együtt énekelni.',
        'ㅂ-rendhagyó: 쉽다 → 쉬워요',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('쉽다, 어렵다')} ㅂ-rendhagyó, így ragozva: ${korean('쉬워요, 어려워요')}. Hasonló: ${korean('-기가 좋다')} (${reference('2A-05-1')}).`,
    ],
  },
  {
    lesson: 6,
    point: 1,
    form: '-(으)ㄹ 뿐만 아니라',
    name: '„nemcsak …, hanem … is”',
    explanation: [
      paragraph`Ige vagy melléknév után azt fejezi ki, hogy az első tény mellé a második is ${bold('hozzájön')}: „nemcsak X, hanem Y is”. A második részben gyakran ${korean('도')} áll. Főnévvel: ${korean('N뿐만 아니라')}.`,
      paragraph`${bold('받침')} után: ${bold('-을 뿐만 아니라')}, magánhangzó után: ${bold('-ㄹ 뿐만 아니라')}; múltra: ${korean('-았을/었을 뿐만 아니라')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-(으)ㄹ 뿐만 아니라', conjugate: word => withEu(word, 'ㄹ 뿐만 아니라') }],
    },
    examples: [
      [
        text`마늘은 면역력을 높여 ${bold('줄 뿐만 아니라')} 암 예방에도 좋습니다.`,
        'A fokhagyma nemcsak az immunrendszert erősíti, hanem a rák megelőzésében is segít.',
      ],
      [
        text`이 식당은 음식이 맛있${bold('을 뿐만 아니라')} 값도 싸요.`,
        'Ebben az étteremben nemcsak finom az étel, hanem olcsó is.',
      ],
      [
        text`그 가수는 노래를 잘${bold('할 뿐만 아니라')} 춤도 잘 춰요.`,
        'Az az énekes nemcsak jól énekel, hanem jól is táncol.',
      ],
      [
        text`오늘은 ${bold('추울 뿐만 아니라')} 바람도 많이 불어요.`,
        'Ma nemcsak hideg van, hanem erős szél is fúj.',
        'ㅂ-rendhagyó: 춥다 → 추울',
      ],
    ],
  },
  {
    lesson: 6,
    point: 2,
    form: '-게 하다',
    name: '„…-tat, -tet; ráveszi, hogy …” (műveltetés)',
    explanation: [
      paragraph`Ige vagy melléknév után azt fejezi ki, hogy valaki ${bold('ráveszi, utasítja')} a másikat valamire, vagy ${bold('előidéz')} egy állapotot: ${korean('아이를 웃게 해요')} „megnevetteti a gyereket”. A tő végétől függetlenül ${korean('-게 하다')}. Akit rávesznek, ${korean('을/를')} vagy ${korean('에게')} partikulát kap.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-게 해요', conjugate: word => withPlainStem(word, '게 해요') },
        { header: 'Múlt: -게 했어요', conjugate: word => withPlainStem(word, '게 했어요') },
      ],
    },
    examples: [
      [text`엄마가 저에게 매일 채소를 먹${bold('게 했어요')}.`, 'Anya rávett, hogy minden nap egyek zöldséget.'],
      [text`선생님이 학생들을 큰 소리로 읽${bold('게 하셨어요')}.`, 'A tanár hangosan olvastatta a diákokat.'],
      [text`그 영화는 사람들을 웃${bold('게 해요')}.`, 'Az a film megnevetteti az embereket.'],
      [text`따뜻한 차는 몸을 따뜻하${bold('게 해')} 줘요.`, 'A meleg tea átmelegíti a testet.'],
      [
        text`선생님이 학생들에게 한국 노래를 듣${bold('게 하셨어요')}.`,
        'A tanár koreai dalokat hallgattatott a diákokkal.',
        '-게 előtt nincs ㄷ-változás: 듣게',
      ],
    ],
    ownNote: [
      paragraph`Hasonló szerkezet a ${korean('-도록 하다')} (${reference('3A-10-1')}). Néhány igének saját műveltető alakja is van: ${korean('먹이다')} „etet”, ${korean('입히다')} „öltöztet”, ${korean('울리다')} „megríkat”.`,
    ],
  },
  {
    lesson: 7,
    point: 1,
    form: '-(으)ㄹ 뻔하다',
    name: '„majdnem …-tam”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy valami ${bold('majdnem megtörtént')}, de végül ${bold('nem')}. Mindig ${bold('múlt')} időben: ${korean('-(으)ㄹ 뻔했어요')}.`,
      paragraph`${bold('받침')} után: ${bold('-을 뻔했다')}, magánhangzó után: ${bold('-ㄹ 뻔했다')}, ㄹ-tőnél: ${korean('잃어버릴 뻔했다, 울 뻔했다')}.`,
      paragraph`A könyv külön említi a túlzó ${korean('-아서/어서 죽을 뻔하다')} fordulatot (beszélt nyelv): ${korean('배고파서 죽을 뻔했어요')} „majd éhen haltam”.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-(으)ㄹ 뻔했어요', conjugate: word => withEu(word, 'ㄹ 뻔했어요') }],
    },
    examples: [
      [text`버스가 흔들려서 넘어${bold('질 뻔했어요')}.`, 'A busz megrázkódott, majdnem elestem.'],
      [text`늦잠을 자서 비행기를 놓${bold('칠 뻔했어요')}.`, 'Elaludtam, majdnem lekéstem a repülőt.'],
      [
        text`영화가 너무 슬퍼서 ${bold('울 뻔했어요')}.`,
        'Olyan szomorú volt a film, hogy majdnem elsírtam magam.',
        'ㄹ-tő: 울다 → 울',
      ],
      [text`길을 몰라서 길을 잃${bold('을 뻔했어요')}.`, 'Nem ismertem az utat, majdnem eltévedtem.'],
    ],
    ownNote: [
      paragraph`Gyakran ${korean('하마터면')} („egy hajszálon múlt”) vezeti be: ${korean('하마터면 다칠 뻔했어요')}.`,
    ],
  },
  {
    lesson: 7,
    point: 2,
    form: '아무 N(이)나',
    name: '„bármelyik, akármilyen …”',
    conjugable: false,
    explanation: [
      paragraph`Az ${korean('아무')} („bármely”) + főnév + ${korean('(이)나')} azt fejezi ki, hogy ${bold('mindegy, melyik')}: „bármi jó”. 받침 után ${korean('이나')}, magánhangzó után ${korean('나')}. Gyakori: ${korean('아무거나')} „bármi”, ${korean('아무나')} „bárki”, ${korean('아무 데나')} „bárhol”, ${korean('아무 때나')} „bármikor”.`,
    ],
    customContent: [
      simpleTable(
        ['Kifejezés', 'Jelentés', 'Tagadással (아무 N도)'],
        [
          [koreanGlossedInRow('아무거나'), 'bármi', koreanWithTranslation('아무것도 없어요', 'semmi sincs')],
          [koreanGlossedInRow('아무나'), 'bárki', koreanWithTranslation('아무도 안 왔어요', 'senki sem jött')],
          [
            koreanGlossedInRow('아무 데나'),
            'bárhol, bárhová',
            koreanWithTranslation('아무 데도 안 가요', 'sehová sem megyek'),
          ],
          [koreanGlossedInRow('아무 때나'), 'bármikor', '—'],
        ]
      ),
    ],
    examples: [
      [text`${bold('아무거나')} 괜찮아요.`, 'Bármi jó.'],
      [text`${bold('아무 데나')} 앉으세요.`, 'Üljön le, ahová szeretne.'],
      [text`${bold('아무 때나')} 연락하세요.`, 'Bármikor kereshet.'],
      [text`그 일은 ${bold('아무나')} 할 수 있는 일이 아니에요.`, 'Azt a munkát nem tudja akárki elvégezni.'],
    ],
  },
  {
    lesson: 8,
    point: 1,
    form: '-는/(으)ㄴ/(으)ㄹ 듯이',
    name: '„mintha …; úgy, ahogy …”',
    explanation: [
      paragraph`Hasonlatot fejez ki: a második rész ${bold('olyan módon')} történik, ${bold('mintha')} az első igaz lenne. Irodalmi, leíró szövegekben gyakori.`,
      list(
        text`${bold('Ige')}: jelen ${korean('-는 듯이')}, múlt ${korean('-(으)ㄴ 듯이')}, feltételezett ${korean('-(으)ㄹ 듯이')}`,
        text`${bold('Melléknév')}: ${korean('-(으)ㄴ 듯이')}`
      ),
      paragraph`Feltételezést is kifejez („úgy tűnik”), és mondatvégen ${korean('-는/(으)ㄴ/(으)ㄹ 듯하다')} alakban is áll: ${korean('비가 올 듯해요')} „úgy tűnik, esni fog”.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => presentModifier(word, ' 듯이') },
        { header: 'Múlt (ige)', conjugate: word => (word.wordClass === 'verb' ? withEu(word, 'ㄴ 듯이') : null) },
        { header: '-(으)ㄹ 듯이', conjugate: word => withEu(word, 'ㄹ 듯이') },
      ],
    },
    examples: [
      [text`아이가 잠을 ${bold('자는 듯이')} 조용해요.`, 'A gyerek olyan csendes, mintha aludna.'],
      [
        text`그는 아무 일도 없었던 ${bold('듯이')} 웃었어요.`,
        'Úgy nevetett, mintha mi sem történt volna.',
        { uses: ['4B-02-2'] },
      ],
      [text`하늘이 금방이라도 비가 ${bold('올 듯이')} 어두워요.`, 'Olyan sötét az ég, mintha mindjárt esni kezdene.'],
      [
        text`그 사람은 모든 것을 다 ${bold('아는 듯이')} 말해요.`,
        'Úgy beszél, mintha mindent tudna.',
        'ㄹ-tő: 알다 → 아는',
      ],
    ],
    ownNote: [
      paragraph`Rövidebben ${korean('-듯이 / -듯')} igető után is: ${korean('물 쓰듯이')} „mint a vizet (pazarolva)”. Állandósult: ${korean('밥 먹듯이')} „rendszeresen, mint az evés”.`,
    ],
  },
  {
    lesson: 8,
    point: 2,
    form: '피동 (-이-, -히-, -리-, -기-)',
    name: 'szenvedő (passzív) igék',
    conjugable: false,
    explanation: [
      paragraph`A szenvedő ige azt fejezi ki, hogy az alany ${bold('elszenvedi')} a cselekvést (nem ő végzi): ${korean('문을 열다')} „kinyitja az ajtót” → ${korean('문이 열리다')} „az ajtó kinyílik”. Bizonyos tárgyas igék tövéhez ${bold('-이-, -히-, -리-, -기-')} járul. Hogy melyik, azt szavanként kell megtanulni.`,
    ],
    customContent: [
      simpleTable(
        ['Toldalék', 'Cselekvő', 'Szenvedő', 'Jelentés'],
        [
          [
            '-이-',
            koreanWithTranslation('보다 · 쓰다 · 놓다 · 바꾸다', 'lát · ír · tesz · cserél'),
            koreanGlossedInRow('보이다 · 쓰이다 · 놓이다 · 바뀌다'),
            'látszik · íródik · le van téve · megváltozik',
          ],
          [
            '-히-',
            koreanWithTranslation('닫다 · 먹다 · 잡다 · 읽다 · 막다', 'bezár · eszik · megfog · olvas · elzár'),
            koreanGlossedInRow('닫히다 · 먹히다 · 잡히다 · 읽히다 · 막히다'),
            'bezáródik · megevődik · elkapják · olvassák · eldugul',
          ],
          [
            '-리-',
            koreanWithTranslation('열다 · 듣다 · 팔다 · 걸다 · 풀다', 'kinyit · hall · elad · felakaszt · megold'),
            koreanGlossedInRow('열리다 · 들리다 · 팔리다 · 걸리다 · 풀리다'),
            'kinyílik · hallatszik · elkel · lóg/tart · megoldódik',
          ],
          [
            '-기-',
            koreanWithTranslation('안다 · 끊다 · 쫓다 · 씻다', 'ölel · megszakít · üldöz · mos'),
            koreanGlossedInRow('안기다 · 끊기다 · 쫓기다 · 씻기다'),
            'ölelik · megszakad · üldözik · lemosódik',
          ],
        ]
      ),
    ],
    examples: [
      [
        text`가을이 되면 잘 익은 감이 주렁주렁 ${bold('달렸다')}.`,
        'Ősszel fürtökben lógtak az érett datolyaszilvák (달다 → 달리다).',
      ],
      [text`바람 때문에 문이 ${bold('열렸어요')}.`, 'A szél miatt kinyílt az ajtó.'],
      [text`창밖으로 바다가 ${bold('보여요')}.`, 'Az ablakból látszik a tenger.'],
      [
        text`옆방에서 음악 소리가 ${bold('들려요')}.`,
        'A szomszéd szobából zene hallatszik.',
        'a 듣다 szenvedő alakja 들리다 (nem ㄷ-rendhagyó alak)',
      ],
    ],
    ownNote: [
      paragraph`A szenvedő igék maguk szabályosan ragozódnak: ${korean('열려요, 열렸어요, 닫혀 있어요')}. Az ${korean('-아/어 있다')}-val állapotot jeleznek: ${korean('문이 열려 있어요')} „nyitva van az ajtó”. Sok igének nincs ilyen alakja; ott ${korean('-아/어지다')} vagy ${korean('되다')} használatos (${korean('만들어지다, 사용되다')}).`,
    ],
  },
  {
    lesson: 9,
    point: 1,
    form: '-지 않아요?',
    name: '„nem …? hát nem …?” (egyetértést váró kérdés)',
    explanation: [
      paragraph`Ige vagy melléknév után a beszélő a véleményét ${bold('kérdés formájában')} mondja, és a hallgató ${bold('egyetértését várja')}: „Hát nem jó volt?”. A tő végétől függetlenül ${korean('-지 않아요?')}; múlt: ${korean('-지 않았어요?')}; főnévvel ${korean('-(이)지 않아요?')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-지 않아요?', conjugate: word => withPlainStem(word, '지 않아요?') },
        { header: 'Múlt: -지 않았어요?', conjugate: word => withPlainStem(word, '지 않았어요?') },
      ],
    },
    examples: [
      [text`이번 주 방송 정말 볼 만하${bold('지 않았어')}?`, 'Hát nem volt tényleg érdemes megnézni az e heti adást?'],
      [text`이 노래 정말 좋${bold('지 않아요')}?`, 'Hát nem nagyon jó ez a dal?'],
      [text`오늘 좀 덥${bold('지 않아요')}?`, 'Nem kicsit meleg van ma?', '-지 előtt nincs ㅂ-változás: 덥지'],
      [text`그 배우 연기 정말 잘하${bold('지 않아요')}?`, 'Hát nem játszik nagyon jól az a színész?'],
    ],
    ownNote: [
      paragraph`Alakra azonos a hosszú tagadás kérdő formájával (${reference('2A-05-2')}), de a hanglejtés és a helyzet mutatja, hogy itt ${bold('állítást')} erősítünk meg. Közeli rokona a ${korean('-잖아요')} (${reference('3A-06-1')}).`,
    ],
  },
  {
    lesson: 9,
    point: 2,
    form: '얼마나 -는다고요/ㄴ다고요/다고요',
    name: '„de mennyire …!” (nyomatékos állítás)',
    explanation: [
      paragraph`Az ${korean('얼마나')} („mennyire”) + idézett állító forma + ${korean('-고요')} a beszélő ${bold('nyomatékos, érzelmes állítása')}: „Nem is tudod, mennyire …!”.`,
      list(
        text`${bold('Ige')}: 받침 után ${korean('-는다고요')}, magánhangzó után ${korean('-ㄴ다고요')}`,
        text`${bold('Melléknév')}: ${korean('-다고요')}; múlt: ${korean('-았다고요/었다고요')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => '얼마나 ' + plainStyleStatement(word) + '고요' },
        { header: 'Múlt', conjugate: word => '얼마나 ' + withPast(word, '다고요') },
      ],
    },
    examples: [
      [text`그 드라마가 ${bold('얼마나')} 재미있${bold('다고요')}.`, 'Nem is tudod, mennyire jó az a sorozat!'],
      [text`우리 아이가 ${bold('얼마나')} 잘 먹${bold('는다고요')}.`, 'Nem is hinnéd, milyen jó étvágyú a gyerekünk!'],
      [
        text`어제 ${bold('얼마나 추웠다고요')}.`,
        'Ha tudnád, milyen hideg volt tegnap!',
        'ㅂ-rendhagyó: 춥다 → 추웠다고요',
      ],
      [
        text`그 가수 노래를 들으면 ${bold('얼마나')} 마음이 편해${bold('진다고요')}.`,
        'Ha hallgatod annak az énekesnek a dalait, nem is tudod, mennyire megnyugszol!',
      ],
    ],
  },
  {
    lesson: 10,
    point: 1,
    form: '-더니',
    name: '„(láttam, hogy) …, aztán / de (most) …”',
    explanation: [
      paragraph`Ige vagy melléknév után a beszélő által ${bold('a múltban megfigyelt')} helyzetet idézi fel, és azt mondja el, mi ${bold('következett utána')}, vagy mi változott meg: „Tegnap még hideg volt, ma meg meleg van.” Általában ${bold('más személyről')} vagy dolgokról (nem a beszélőről). A tő végétől függetlenül ${korean('-더니')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-더니', conjugate: word => withPlainStem(word, '더니') }],
    },
    examples: [
      [text`주인공이 책상 위를 보${bold('더니')} 깜짝 놀랐어요.`, 'A főszereplő ránézett az asztalra, és megdöbbent.'],
      [
        text`어제는 춥${bold('더니')} 오늘은 따뜻하네요.`,
        'Tegnap még hideg volt, ma meg meleg van.',
        '-더니 előtt nincs ㅂ-változás: 춥더니',
      ],
      [
        text`동생이 열심히 공부하${bold('더니')} 시험에 합격했어요.`,
        'Az öcsém szorgalmasan tanult, és át is ment a vizsgán.',
      ],
      [
        text`마크 씨가 아까부터 음악을 듣${bold('더니')} 갑자기 노래를 불러요.`,
        'Mark egy ideje zenét hallgatott, most meg hirtelen énekel.',
      ],
    ],
    ownNote: [
      paragraph`A beszélő saját cselekvésének következményére a ${korean('-았더니/었더니')} (${reference('3B-10-2')}) kell: ${korean('운동을 했더니 피곤해요')}.`,
    ],
  },
  {
    lesson: 10,
    point: 2,
    form: '-는/(으)ㄴ 것이다',
    name: '„arról van szó, hogy …; szóval …” (magyarázat, kiemelés)',
    explanation: [
      paragraph`A mondatot ${korean('것이다')} („az a dolog”) zárja: a beszélő ${bold('magyaráz, összefoglal, kiemel')}, vagy történetet mesél élénken. Beszédben: ${korean('-는 거예요 / -는 거야')}.`,
      list(
        text`${bold('Ige')}: jelen ${korean('-는 것이다')}, múlt ${korean('-(으)ㄴ 것이다')}`,
        text`${bold('Melléknév')}: ${korean('-(으)ㄴ 것이다')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => presentModifier(word, ' 거예요') },
        { header: 'Múlt (ige)', conjugate: word => (word.wordClass === 'verb' ? withEu(word, 'ㄴ 거예요') : null) },
      ],
    },
    examples: [
      [
        text`주인공이 깜짝 놀라서 무엇인가를 찾기 시작하${bold('는 거야')}.`,
        'És akkor a főszereplő megdöbben, és elkezd keresni valamit.',
      ],
      [text`그래서 늦${bold('은 거예요')}.`, 'Szóval ezért késtem el.'],
      [
        text`한국어를 배우는 이유는 한국 친구와 이야기하고 싶기 때문${bold('인 거예요')}.`,
        'Azért tanulok koreaiul, mert koreai barátaimmal szeretnék beszélgetni.',
      ],
      [text`그 노래를 듣고 ${bold('운 거예요')}?`, 'Szóval attól a daltól sírtál el?', 'ㄹ-tő: 울다 → 운'],
    ],
    correctIncorrect: [
      { correct: '그 노래를 듣고 운 거예요?', translation: 'Szóval attól a daltól sírtál el?' },
      { incorrect: '그 노래를 듣고 울은 거예요?', reason: 'ㄹ-tőnél az ㄹ kiesik: 울다 → 운' },
    ],
    ownNote: [
      paragraph`Történetmesélésben a ${korean('-는 거야')} jelen idő élénkebbé teszi az elbeszélést („és akkor odamegy…”).`,
    ],
  },
  {
    lesson: 11,
    point: 1,
    form: '(으)로서',
    name: '„-ként, … minőségében”',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt jelöli, milyen ${bold('minőségben, státuszban, szerepben')} tesz valamit valaki: „szülőként”, „diákként”. ${bold('받침')} után ${korean('으로서')}, magánhangzó és ${bold('ㄹ')} után ${korean('로서')}.`,
    ],
    table: {
      kind: 'noun',
      nouns: [
        { word: '부모', description: 'magánhangzóra végződik' },
        { word: '학생', description: 'mássalhangzóra végződik' },
        { word: '대표', description: 'magánhangzóra végződik' },
      ],
      nounColumns: [{ header: '(으)로서', conjugate: noun => nounWithParticle(noun, '으로서', '로서', true) }],
    },
    examples: [
      [text`춘천은 관광 도시${bold('로서')} 유명해요.`, 'Csuncshon turistavárosként híres.'],
      [text`학생${bold('으로서')} 열심히 공부해야 해요.`, 'Diákként szorgalmasan kell tanulnom.'],
      [text`저는 반 대표${bold('로서')} 이 자리에 왔습니다.`, 'Az osztály képviselőjeként jöttem el.'],
      [
        text`부모${bold('로서')} 아이에게 좋은 모범이 되고 싶어요.`,
        'Szülőként jó példát szeretnék mutatni a gyereknek.',
      ],
    ],
    ownNote: [
      paragraph`Ne keverjük össze a ${korean('(으)로써')} alakkal, amely ${bold('eszközt')} jelent („azáltal, hogy…”): ${korean('대화로써 문제를 해결했어요')}.`,
    ],
  },
  {
    lesson: 11,
    point: 2,
    form: '에 대해서',
    name: '„-ról/-ről, … témájában”',
    conjugable: false,
    explanation: [
      paragraph`Főnév után a beszéd, gondolkodás ${bold('tárgyát, témáját')} jelöli: „Koreáról beszélek”. Rövidebben: ${korean('에 대해')}. Főnév előtt: ${korean('에 대한 N')} (${korean('한국에 대한 책')} „Koreáról szóló könyv”). Minden főnév után ugyanaz.`,
    ],
    examples: [
      [text`저는 춘천${bold('에 대해')} 소개하겠습니다.`, 'Csuncshonról fogok beszélni.'],
      [text`한국 문화${bold('에 대해서')} 알고 싶어요.`, 'Szeretnék a koreai kultúráról tanulni.'],
      [text`환경 문제${bold('에 대한')} 기사를 읽었어요.`, 'Olvastam egy cikket a környezeti problémákról.'],
      [text`그 일${bold('에 대해서')} 어떻게 생각해요?`, 'Mit gondolsz erről a dologról?'],
    ],
  },
  {
    lesson: 12,
    point: 1,
    form: '-(으)며',
    name: '„és” (hivatalos, írott felsorolás)',
    explanation: [
      paragraph`Ige vagy melléknév után két vagy több tényt, állapotot ${bold('sorol fel')}, mint a ${korean('-고')}, de ${bold('írottabb, hivatalosabb')} stílusban (előadás, jelentés, leírás). Három vagy több tag esetén szép váltogatni: ${korean('-고 … -(으)며 …')}.`,
      paragraph`${bold('받침')} után: ${bold('-으며')}, magánhangzó és ${bold('ㄹ')} után: ${bold('-며')}. Főnévvel: ${korean('-(이)며')}.`,
    ],
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)며', conjugate: word => withEu(word, '며') }] },
    examples: [
      [
        text`한국은 사계절이 뚜렷하${bold('며')} 산이 많습니다.`,
        'Koreában jól elkülönülnek az évszakok, és sok a hegy.',
      ],
      [text`서울은 한국의 수도이${bold('며')} 가장 큰 도시입니다.`, 'Szöul Korea fővárosa és legnagyobb városa.'],
      [
        text`이 지역은 여름에 ${bold('더우며')} 비가 많이 옵니다.`,
        'Ezen a vidéken nyáron meleg van, és sok eső esik.',
        'ㅂ-rendhagyó: 덥다 → 더우며',
      ],
      [text`그는 노래를 부르${bold('며')} 춤을 췄습니다.`, 'Énekelt és közben táncolt.'],
    ],
    ownNote: [
      paragraph`A ${korean('-(으)며')} egyidejűséget is jelenthet (= ${korean('-(으)면서')}), ahogy az utolsó példában.`,
    ],
  },
  {
    lesson: 12,
    point: 2,
    form: '-고자 하다',
    name: '„szándékozom …” (hivatalos szándék)',
    explanation: [
      paragraph`Ige után a beszélő ${bold('szándékát, célját')} fejezi ki ${bold('hivatalos')} helyzetben (előadás, beszéd, jelentés). A ${korean('-(으)려고 하다')} írott, formális párja. A tő végétől függetlenül ${korean('-고자 하다')}; jellemzően ${korean('-고자 합니다')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-고자 합니다', conjugate: word => withPlainStem(word, '고자 합니다') }],
    },
    examples: [
      [text`한국에 대해 발표하${bold('고자 합니다')}.`, 'Koreáról szeretnék előadást tartani.'],
      [text`오늘은 환경 문제에 대해 이야기하${bold('고자 합니다')}.`, 'Ma a környezeti problémákról kívánok beszélni.'],
      [
        text`여러분의 의견을 듣${bold('고자')} 이 자리를 마련했습니다.`,
        'Azért szerveztük ezt az alkalmat, hogy meghallgassuk a véleményüket.',
        '-고 előtt nincs ㄷ-változás: 듣고자',
      ],
      [
        text`한국 회사에 취직하${bold('고자')} 한국어를 배우고 있습니다.`,
        'Azért tanulok koreaiul, hogy koreai cégnél helyezkedjek el.',
      ],
    ],
  },
];
export default {
  lessons: {
    1: {
      korean: '여건이 된다면 외국에서 1년쯤 살아 봤으면 해요',
      hungarian: 'Ha a körülmények engedik, szeretnék egy évet külföldön élni.',
    },
    2: {
      korean: '한 번쯤 가 볼 만한 곳이야',
      hungarian: 'Egyszer érdemes elmenni oda.',
      pronunciation: '유음화',
      pronunciationHungarian: 'likvidásodás, a tagolástól függően (잘 나왔지? [잘라와찌])',
    },
    3: { korean: '드디어 새 앨범이 나온대', hungarian: 'Azt mondják, végre kijön az új album.' },
    4: {
      korean: '폭설로 인해서 많은 피해가 발생하고 있습니다',
      hungarian: 'A heves havazás nagy károkat okoz.',
      pronunciation: 'ㅎ 탈락',
      pronunciationHungarian: 'a ㅎ kiesése',
    },
    5: { korean: '어떤 앱을 주로 사용하냐면요', hungarian: 'Hogy milyen appot használok főleg? Hát…' },
    6: {
      korean: '마늘은 면역력을 높여 줄 뿐만 아니라 암 예방에도 좋습니다',
      hungarian: 'A fokhagyma nemcsak az immunrendszert erősíti, hanem a rák megelőzésében is segít.',
      pronunciation: '비음화',
      pronunciationHungarian: 'orrhangúsodás',
    },
    7: { korean: '버스가 흔들려서 넘어질 뻔했어요', hungarian: 'A busz megrázkódott, majdnem elestem.' },
    8: {
      korean: '가을이 되면 잘 익은 감이 주렁주렁 달렸다',
      hungarian: 'Ősszel fürtökben lógtak az érett datolyaszilvák.',
      pronunciation: '경음화',
      pronunciationHungarian: 'keményedés',
    },
    9: { korean: '이번 주 방송 정말 볼 만하지 않았어?', hungarian: 'Hát nem volt érdemes megnézni az e heti adást?' },
    10: {
      korean: '주인공이 책상 위를 보더니 깜짝 놀라서 무엇인가를 찾기 시작하는 거야',
      hungarian: 'A főszereplő ránéz az asztalra, megdöbben, és keresni kezd valamit.',
      pronunciation: '억양 (의문문)',
      pronunciationHungarian: 'a kérdő mondat hanglejtése',
    },
    11: { korean: '저는 춘천에 대해 소개하겠습니다', hungarian: 'Csuncshonról fogok beszélni.' },
    12: {
      korean: '한국에 대해 발표하고자 합니다',
      hungarian: 'Koreáról szeretnék előadást tartani.',
      pronunciation: '유음화',
      pronunciationHungarian: 'likvidásodás (연락 [열락], 설날 [설랄])',
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
