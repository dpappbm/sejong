import { bold, korean, list, paragraph, reference, text } from '../../lib/richText';
import {
  presentModifier,
  withAOrEo,
  withPast,
  withEu,
  withPlainStem,
  plainStyleStatement,
} from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';
const vocabularyGrammarPageOf = (lesson: number, point: number) => 20 + 2 * (lesson - 1) + (point - 1),
  studentBookPageOf = (lesson: number, point: number) => 8 * lesson + 6 + 2 * (point - 1);

const points: PointSource[] = [
  {
    lesson: 1,
    point: 1,
    form: '-는/(으)ㄴ 데다가',
    name: '„ráadásul, azon felül, hogy …”',
    explanation: [
      paragraph`Azt fejezi ki, hogy az első tényhez a második ${bold('hozzáadódik')}, gyakran fokozva: „nemcsak …, ráadásul még … is”. A második részben gyakran ${korean('도, 까지')}.`,
      list(
        text`${bold('Ige')}, ${korean('있다/없다')}: jelen ${korean('-는 데다가')}, múlt ${korean('-(으)ㄴ 데다가')}`,
        text`${bold('Melléknév')}: ${korean('-(으)ㄴ 데다가')}`,
        text`${bold('Főnév')}: ${korean('-인 데다가')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => presentModifier(word, ' 데다가') },
        { header: 'Múlt (ige)', conjugate: word => (word.wordClass === 'verb' ? withEu(word, 'ㄴ 데다가') : null) },
      ],
    },
    examples: [
      [text`뭐든지 적극적${bold('인 데다가')} 유머 감각도 있어요.`, 'Mindenben aktív, ráadásul humorérzéke is van.'],
      [
        text`그 식당은 음식이 맛있${bold('는 데다가')} 값도 싸요.`,
        'Annak az étteremnek finom az étele, ráadásul olcsó is.',
      ],
      [
        text`오늘은 ${bold('추운 데다가')} 바람도 많이 불어요.`,
        'Ma hideg van, ráadásul erős szél is fúj.',
        'ㅂ-rendhagyó: 춥다 → 추운',
      ],
      [
        text`아침을 못 먹${bold('은 데다가')} 점심도 늦게 먹었어요.`,
        'Nem reggeliztem, ráadásul ebédelni is későn ebédeltem.',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-(으)ㄹ 뿐만 아니라')} (${reference('4A-06-1')}) közeli rokona; a ${korean('-는 데다가')} beszéltebb, és inkább azonos irányú (pozitív + pozitív, negatív + negatív) tényeket halmoz.`,
    ],
  },
  {
    lesson: 1,
    point: 2,
    form: '-든지',
    name: '„akár …, akár …; bármit / bárhol …”',
    explanation: [
      paragraph`Azt fejezi ki, hogy ${bold('mindegy, melyiket')} választjuk, nincs különbség. Ige vagy melléknév után, gyakran ismételve: ${korean('-든지 -든지')}. Kérdőszóval: ${korean('뭐든지')} „bármi”, ${korean('언제든지')} „bármikor”, ${korean('어디든지')} „bárhol”, ${korean('누구든지')} „bárki”. Rövid alakja ${korean('-든')}. A tő végétől függetlenül ${korean('-든지')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-든지', conjugate: word => withPlainStem(word, '든지') }],
    },
    examples: [
      [text`그 친구는 ${bold('뭐든지')} 적극적이에요.`, 'Az a barátom mindenben aktív.'],
      [
        text`비가 오${bold('든지')} 눈이 오${bold('든지')} 매일 운동해요.`,
        'Akár esik, akár havazik, minden nap edzek.',
      ],
      [text`궁금한 게 있으면 ${bold('언제든지')} 물어보세요.`, 'Ha bármi kérdésed van, bármikor kérdezz.'],
      [
        text`음악을 듣${bold('든지')} 책을 읽${bold('든지')} 하고 싶은 거 해.`,
        'Hallgass zenét vagy olvass, csinálj, amit szeretnél.',
        '-든지 előtt nincs ㄷ-változás: 듣든지',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-거나')} (${reference('2A-02-1')}) egyszerű „vagy”; a ${korean('-든지')} azt hangsúlyozza, hogy ${bold('bármelyik')} megfelel. Nem keverendő a ${korean('-던지')} („annyira …, hogy”) alakkal.`,
    ],
  },
  {
    lesson: 2,
    point: 1,
    form: '-는/(으)ㄴ/(으)ㄹ 줄 알다',
    name: '„azt hittem, hogy …” (téves feltételezés)',
    explanation: [
      paragraph`Azt fejezi ki, hogy a beszélő ${bold('valamit hitt, gondolt, de nem így volt')}: „azt hittem, hogy …”. Általában múltban: ${korean('-는 줄 알았어요')}. Ellentéte: ${korean('-는 줄 몰랐어요')} „nem gondoltam volna, hogy … (pedig így van)”.`,
      list(
        text`${bold('Ige')}: jelen ${korean('-는')}, múlt ${korean('-(으)ㄴ')}, jövő/feltételezés ${korean('-(으)ㄹ 줄 알다')}`,
        text`${bold('Melléknév')}: ${korean('-(으)ㄴ')}, ${korean('-(으)ㄹ 줄 알다')}; ${bold('főnév')}: ${korean('-인 줄 알다')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => presentModifier(word, ' 줄 알았어요') },
        {
          header: 'Múlt (ige)',
          conjugate: word => (word.wordClass === 'verb' ? withEu(word, 'ㄴ 줄 알았어요') : null),
        },
        { header: 'Jövő', conjugate: word => withEu(word, 'ㄹ 줄 알았어요') },
      ],
    },
    examples: [
      [
        text`처음 만났을 때는 얌전한 성격${bold('인 줄 알았거든')}.`,
        'Amikor először találkoztunk, azt hittem, csendes természetű.',
      ],
      [text`오늘이 금요일${bold('인 줄 알았어요')}.`, 'Azt hittem, ma péntek van.'],
      [
        text`시험이 ${bold('어려울 줄 알았는데')} 쉬웠어요.`,
        'Azt hittem, nehéz lesz a vizsga, de könnyű volt.',
        'ㅂ-rendhagyó: 어렵다 → 어려울',
      ],
      [text`네가 벌써 집에 ${bold('간 줄 몰랐어')}.`, 'Nem gondoltam volna, hogy már hazamentél.'],
    ],
    ownNote: [
      paragraph`Vigyázat: a ${korean('-(으)ㄹ 줄 알다/모르다')} jelentheti azt is, hogy ${bold('tudja/nem tudja, hogyan kell')} valamit csinálni: ${korean('수영할 줄 알아요')} „tudok úszni”. Ezt a helyzet és az igeidő dönti el.`,
    ],
  },
  {
    lesson: 2,
    point: 2,
    form: '-던',
    name: 'felidézett múlt jelzői alakja („a régen …-t …”)',
    explanation: [
      paragraph`Ige vagy melléknév után, főnév előtt: a beszélő által ${bold('felidézett múltbeli')} (gyakran ismétlődő vagy félbemaradt) helyzettel jelöli a főnevet: ${korean('어렸을 때 살던 집')} „a ház, ahol gyerekkoromban laktam”. A tő végétől függetlenül ${korean('-던')}; ${korean('-았던/었던')} a befejezett múltat hangsúlyozza.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-던 + főnév', conjugate: word => withPlainStem(word, '던') + ' 것' },
        { header: '-았던/었던 + főnév', conjugate: word => withPast(word, '던') + ' 것' },
      ],
    },
    examples: [
      [text`어렸을 때 살${bold('던')} 집에 가 봤어요.`, 'Elmentem a házhoz, ahol gyerekkoromban laktam.'],
      [
        text`이건 제가 자주 듣${bold('던')} 노래예요.`,
        'Ezt a dalt hallgattam régen gyakran.',
        '-던 előtt nincs ㄷ-változás: 듣던',
      ],
      [text`아까 마시${bold('던')} 커피 어디 있어요?`, 'Hol van a kávé, amit az előbb ittam (és nem ittam meg)?'],
      [text`작년에 같이 ${bold('갔던')} 식당 기억나요?`, 'Emlékszel az étteremre, ahová tavaly együtt mentünk?'],
    ],
    ownNote: [
      paragraph`${korean('먹은 빵')} = a megevett kenyér (elfogyott); ${korean('먹던 빵')} = a kenyér, amit ettem (félbehagytam, maradt belőle). Melléknévvel a ${korean('-던')} múltbeli, már nem fennálló állapotot jelez: ${korean('예쁘던 꽃')}.`,
    ],
  },
  {
    lesson: 3,
    point: 1,
    form: '-(으)ㄹ까 -(으)ㄹ까',
    name: '„… vagy …?” (tépelődés két lehetőség között)',
    explanation: [
      paragraph`Két igét ${korean('-(으)ㄹ까')} alakban egymás után téve azt fejezzük ki, hogy ${bold('két lehetőség között tépelődünk')}: „…-jak, vagy …-jak?”. Gyakran ${korean('아니면')} („vagy”) köti össze, és ${korean('고민이다, 생각 중이다')} zárja.`,
      paragraph`${bold('받침')} után: ${bold('-을까')}, magánhangzó után: ${bold('-ㄹ까')}, ㄹ-tőnél: ${korean('살까')}.`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ까', conjugate: word => withEu(word, 'ㄹ까') }] },
    examples: [
      [
        text`사업을 시작${bold('할까')} 아니면 회사에 취직${bold('할까')} 고민이야.`,
        'Azon töprengek, vállalkozásba kezdjek, vagy elhelyezkedjek egy cégnél.',
      ],
      [text`점심에 비빔밥을 먹${bold('을까')} 냉면을 먹${bold('을까')}?`, 'Bibimbapot egyek ebédre vagy nengmyeont?'],
      [
        text`주말에 집에서 ${bold('쉴까')} 친구를 ${bold('만날까')} 생각 중이에요.`,
        'Azon gondolkodom, hétvégén otthon pihenjek vagy a barátommal találkozzam.',
      ],
      [
        text`이 노래를 들${bold('을까')} 저 노래를 들${bold('을까')}?`,
        'Ezt a dalt hallgassam, vagy azt?',
        'ㄷ-rendhagyó: 듣다 → 들을까',
      ],
    ],
  },
  {
    lesson: 3,
    point: 2,
    form: '-지 그래요?',
    name: '„miért nem …? nem kéne …?” (tanács)',
    explanation: [
      paragraph`Ige után ${bold('tanácsot, javaslatot')} ad a hallgatónak, kissé közvetlen, beszélt nyelvi hangon: „Miért nem próbálod meg …?”. A tő végétől függetlenül ${korean('-지 그래요?')}. Múltban (${korean('-지 그랬어요?')}) szemrehányó: „miért nem …-tál?”.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-지 그래요?', conjugate: word => withPlainStem(word, '지 그래요?') },
        { header: 'Múlt: -지 그랬어요?', conjugate: word => withPlainStem(word, '지 그랬어요?') },
      ],
    },
    examples: [
      [text`피곤하면 좀 쉬${bold('지 그래요')}?`, 'Ha fáradt vagy, miért nem pihensz egy kicsit?'],
      [
        text`그렇게 고민되면 부모님께 여쭤보${bold('지 그래요')}?`,
        'Ha ennyire gondolkodóba ejt, miért nem kérdezed meg a szüleidet?',
      ],
      [text`비가 오는데 우산을 가져가${bold('지 그랬어요')}?`, 'Esik – miért nem vittél esernyőt?'],
      [
        text`그 강의를 한번 들어 보${bold('지 그래요')}?`,
        'Miért nem hallgatod meg egyszer azt az előadást?',
        'ㄷ-rendhagyó: 듣다 → 들어 보다',
      ],
    ],
    ownNote: [
      paragraph`Idősebbnek, feljebbvalónak nem illik mondani. Udvariasabb tanácsok: ${korean('-는 게 어때요?')} (${reference('2A-09-2')}), ${korean('-아/어 보세요')}.`,
    ],
  },
  {
    lesson: 4,
    point: 1,
    form: '-았어야/었어야 했는데',
    name: '„…-nom kellett volna (pedig)” (megbánás)',
    explanation: [
      paragraph`Ige után a beszélő ${bold('megbánja')}, hogy a múltban ${bold('nem tette meg')}, amit kellett volna. Tagadva: ${korean('-지 말았어야 했는데')} „nem kellett volna …”. ㅏ, ㅗ után ${korean('-았어야')}, egyébként ${korean('-었어야')}, 하다 → ${korean('했어야')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-았어야/었어야 했는데', conjugate: word => withPast(word, '어야 했는데') },
        { header: '-지 말았어야 했는데', conjugate: word => withPlainStem(word, '지 말았어야 했는데') },
      ],
    },
    examples: [
      [text`그때 그 꿈을 포기하${bold('지 말았어야 했는데')}.`, 'Akkor nem kellett volna feladnom azt az álmot.'],
      [
        text`어제 일찍 ${bold('잤어야 했는데')} 늦게까지 게임을 했어요.`,
        'Tegnap korán kellett volna lefeküdnöm, de késő estig játszottam.',
      ],
      [
        text`부모님 말씀을 잘 들${bold('었어야 했는데')}.`,
        'Jobban kellett volna hallgatnom a szüleimre.',
        'ㄷ-rendhagyó: 듣다 → 들었어야',
      ],
      [text`미리 표를 예매${bold('했어야 했는데')}.`, 'Előre meg kellett volna vennem a jegyet.'],
    ],
    ownNote: [
      paragraph`Enyhébb megbánás: ${korean('-(으)ㄹ걸 그랬다')} (${reference('3B-06-2')}). A ${korean('-아야/어야 하다')} („kell”) múlt idejű alakja + ${korean('-는데')} (be nem fejezett, sajnálkozó mondatvég).`,
    ],
  },
  {
    lesson: 4,
    point: 2,
    form: '-았을/었을 텐데',
    name: '„biztos …-t volna; pedig …-t volna” (megvalósulatlan múlt)',
    explanation: [
      paragraph`Ige vagy melléknév után ${bold('múltra vonatkozó feltételezést')} fejez ki: „biztos (nehéz) volt…”. Gyakran a ${korean('-았더라면/었더라면')} vagy ${korean('-(으)면')} után: ha valami másképp történt volna, mi lett volna az eredmény (${bold('megvalósulatlan')}). ㅏ, ㅗ után ${korean('-았을 텐데')}, egyébként ${korean('-었을 텐데')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-았을/었을 텐데', conjugate: word => withPast(word, '을 텐데') }],
    },
    examples: [
      [
        text`그때 포기하지 않았으면 지금 가수가 되${bold('었을 텐데')}.`,
        'Ha akkor nem adom fel, most énekes lehetnék.',
      ],
      [
        text`혼자 이사하느라 힘들${bold('었을 텐데')} 왜 연락 안 했어요?`,
        'Biztos nehéz volt egyedül költözni – miért nem szóltál?',
      ],
      [text`조금만 일찍 출발했으면 안 ${bold('늦었을 텐데')}.`, 'Ha egy kicsit korábban indulok, nem késtem volna el.'],
      [
        text`어제 많이 ${bold('추웠을 텐데')} 괜찮았어요?`,
        'Tegnap biztos nagyon hideg volt – jól voltál?',
        'ㅂ-rendhagyó: 춥다 → 추웠을',
      ],
    ],
    ownNote: [
      paragraph`A ${reference('3B-02-2')} ${korean('-(으)ㄹ 텐데')} alakjának múlt idejű változata. Mondatvégen (${korean('-았을/었을 텐데요')}) sajnálkozó hangú.`,
    ],
  },
  {
    lesson: 5,
    point: 1,
    form: '에 비해서',
    name: '„…-hoz képest, …-nál/-nél” (összehasonlítás)',
    conjugable: false,
    explanation: [
      paragraph`Főnév után az ${bold('összehasonlítás alapját')} jelöli: „X-hez képest”. A ${korean('보다')} (${reference('1B-08-2')}) hivatalosabb, írottabb párja; jelentésekben, statisztikákban gyakori. Rövidebben: ${korean('에 비해')}. Minden főnév után ugyanaz.`,
    ],
    examples: [
      [
        text`40대는 청소년들${bold('에 비해서')} 결혼을 해야 한다는 응답이 많았습니다.`,
        'A negyvenesek körében a fiatalokhoz képest többen válaszolták, hogy házasodni kell.',
      ],
      [text`올해는 작년${bold('에 비해')} 비가 많이 왔어요.`, 'Idén a tavalyihoz képest sok eső esett.'],
      [text`서울은 다른 도시${bold('에 비해서')} 집값이 비싸요.`, 'Szöulban más városokhoz képest drágák a lakások.'],
      [text`나이${bold('에 비해')} 젊어 보이시네요.`, 'A korához képest fiatalnak tűnik.'],
    ],
  },
  {
    lesson: 5,
    point: 2,
    form: '-아야지/어야지',
    name: '„… kell(ene) (hát)!” (elhatározás, szükségszerűség)',
    explanation: [
      paragraph`Ige után a beszélő ${bold('elhatározását')} („ezt meg kell csinálnom”) fejezi ki, vagy ${bold('másnak mondja')}, hogy valamit meg kell tennie, illetve valaminek ${bold('így kell lennie')} („hát persze, hogy …”). Udvariasan: ${korean('-아야지요 / -아야죠')}. A ${bold('-아/어')} szabály szerint.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-아야지', conjugate: word => withAOrEo(word, '야지') },
        { header: '-아야지요', conjugate: word => withAOrEo(word, '야지요') },
      ],
    },
    examples: [
      [text`올해는 꼭 운동을 시작${bold('해야지')}.`, 'Idén mindenképp el kell kezdenem edzeni!'],
      [
        text`가: 결혼은 꼭 해야 돼요? 나: 그럼요, 결혼은 ${bold('해야지요')}.`,
        '– Muszáj megházasodni? – Hát persze, házasodni kell.',
      ],
      [text`내일 시험이니까 오늘은 일찍 ${bold('자야지')}.`, 'Holnap vizsga lesz, ma korán le kell feküdnöm.'],
      [
        text`다른 사람 말도 잘 들${bold('어야지요')}.`,
        'Mások szavára is oda kell figyelni!',
        'ㄷ-rendhagyó: 듣다 → 들어야지요',
      ],
    ],
    ownNote: [
      paragraph`Elhatározásként közeli a ${korean('-아야겠다/어야겠다')} (${reference('3A-08-2')}); a ${korean('-아야지')} gyakran magunknak mondott fogadalom. Másnak mondva enyhe kioktatás lehet.`,
    ],
  },
  {
    lesson: 6,
    point: 1,
    form: '-는지/(으)ㄴ지 알다, 모르다',
    name: '„tudja/nem tudja, hogy (mi, hol, hogyan) …” (beágyazott kérdés)',
    explanation: [
      paragraph`Egy kérdést ${bold('mellékmondatként')} ágyaz be: „Tudod, ${bold('hogyan')} szólítják a pincért?” Utána ${korean('알다, 모르다')}, ${korean('궁금하다, 물어보다')} stb. Gyakran kérdőszóval (${korean('뭐, 어디, 어떻게, 왜')}).`,
      list(
        text`${bold('Ige')}, ${korean('있다/없다')}: ${korean('-는지')} (ㄹ kiesik: ${korean('사는지')}); múlt ${korean('-았는지/었는지')}; jövő ${korean('-(으)ㄹ지')}`,
        text`${bold('Melléknév')}: 받침 után ${korean('-은지')}, magánhangzó után ${korean('-ㄴ지')}`,
        text`${bold('Főnév')}: ${korean('-인지')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen + 알아요?', conjugate: word => presentModifier(word, '지 알아요?') },
        { header: 'Múlt', conjugate: word => withPast(word, '는지 몰라요') },
        { header: 'Jövő: -(으)ㄹ지', conjugate: word => withEu(word, 'ㄹ지 몰라요') },
      ],
    },
    examples: [
      [text`식당에서 직원을 어떻게 부르${bold('는지 알아요')}?`, 'Tudod, hogyan szólítják az étteremben a pincért?'],
      [text`이 근처에 은행이 어디에 있${bold('는지 아세요')}?`, 'Tudja, hol van errefelé bank?'],
      [text`그 사람이 왜 화가 ${bold('났는지')} 모르겠어요.`, 'Nem tudom, miért lett mérges.'],
      [
        text`내일 날씨가 ${bold('추울지')} 모르겠어요.`,
        'Nem tudom, hideg lesz-e holnap.',
        'ㅂ-rendhagyó: 춥다 → 추울지',
      ],
    ],
    ownNote: [
      paragraph`Ne keverjük a ${reference('3A-07-1')} ${korean('-(으)ㄴ 지')} szerkezetével („… óta”): az utóbbit szóközzel írjuk (${korean('만난 지 1년')}), a ${korean('-는지')} egybeírandó.`,
      paragraph`Gyakori kész kifejezés a ${bold(korean('그래서 그런지'))} (${korean('그렇다 + -(으)ㄴ지')}) „talán ezért, lehet, hogy emiatt”, és általánosan ${korean('-아서/어서 그런지')} „talán azért, mert …”: feltételezett okot mond, utána nem jön ${korean('알다/모르다')}. ${korean('피곤해서 그런지 머리가 아파요')} „Talán a fáradtságtól fáj a fejem.”`,
    ],
  },
  {
    lesson: 6,
    point: 2,
    form: '-는다면서요?/ㄴ다면서요?/다면서요?',
    name: '„úgy hallottam, hogy …, igaz?” (hallott hír megerősítése)',
    explanation: [
      paragraph`Olyasmit kérdez meg, amit a beszélő ${bold('valahonnan hallott')}, és a hallgatótól ${bold('megerősítést')} vár: „Úgy hallottam, költözöl – igaz?”.`,
      list(
        text`${bold('Ige')}: 받침 után ${korean('-는다면서요?')}, magánhangzó után ${korean('-ㄴ다면서요?')}`,
        text`${bold('Melléknév')}: ${korean('-다면서요?')}; ${bold('főnév')}: ${korean('(이)라면서요?')}; ${bold('múlt')}: ${korean('-았다면서요?/었다면서요?')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => plainStyleStatement(word) + '면서요?' },
        { header: 'Múlt', conjugate: word => withPast(word, '다면서요?') },
      ],
    },
    examples: [
      [
        text`한국에서는 식당에서 "여기요"라고 부른${bold('다면서요')}?`,
        'Úgy hallottam, Koreában az étteremben úgy szólítják a pincért, hogy „여기요” – igaz?',
      ],
      [text`다음 달에 결혼한${bold('다면서요')}? 축하해요!`, 'Úgy hallottam, jövő hónapban megházasodsz. Gratulálok!'],
      [text`그 영화가 그렇게 재미있${bold('다면서요')}?`, 'Azt hallottam, olyan nagyon jó az a film – tényleg?'],
      [
        text`어제 많이 ${bold('추웠다면서요')}?`,
        'Úgy hallottam, tegnap nagyon hideg volt – igaz?',
        'ㅂ-rendhagyó: 춥다 → 추웠다면서요',
      ],
    ],
    ownNote: [
      paragraph`A függő beszéd (${korean('-는다고 하다')}) + ${korean('-면서요?')} rövidülése. 반말: ${korean('-는다면서?')}`,
    ],
  },
  {
    lesson: 7,
    point: 1,
    form: '-는 데에',
    name: '„…-hoz, …-ban (cél, terület)”',
    explanation: [
      paragraph`Ige után azt a ${bold('célt, helyzetet, területet')} jelöli, amelyhez valami szükséges, hasznos vagy amire valamit fordítunk: „a tanuláshoz”, „a döntésben”. Utána gyakran ${korean('필요하다, 도움이 되다, 좋다, 쓰다, 걸리다')}. A tő végétől függetlenül ${korean('-는 데(에)')}; ㄹ-tőnél az ㄹ kiesik.`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-는 데에', conjugate: word => withPlainStem(word, '는 데에') }] },
    examples: [
      [
        text`비행기가 안전하게 다니${bold('는 데에')} 필요한 일을 해요.`,
        'Olyan munkát végzek, ami ahhoz kell, hogy a gépek biztonságosan közlekedjenek.',
      ],
      [text`이 책은 한국어를 공부하${bold('는 데')} 도움이 돼요.`, 'Ez a könyv segít a koreai tanulásában.'],
      [text`집을 구하${bold('는 데')} 한 달이 걸렸어요.`, 'Egy hónapba telt, mire lakást találtam.'],
      [
        text`이 음식을 만드${bold('는 데')} 두 시간이 걸려요.`,
        'Ennek az ételnek az elkészítése két óra.',
        'ㄹ-tő: 만들다 → 만드는',
      ],
    ],
  },
  {
    lesson: 7,
    point: 2,
    form: '-다 보니',
    name: '„ahogy (sokáig) …, rájöttem / úgy alakult, hogy …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy cselekvést ${bold('folyamatosan, ismételten')} végezve ${bold('új felismerésre')} jutottunk, vagy új helyzet alakult ki. A ${reference('3A-11-1')} ${korean('-다 보니까')} alakjának rövid változata. A tő végétől függetlenül ${korean('-다 보니')}.`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-다 보니', conjugate: word => withPlainStem(word, '다 보니') }] },
    examples: [
      [
        text`이 일을 하${bold('다 보니')} 하늘을 더 좋아하게 됐어요.`,
        'Ahogy ezt a munkát végzem, egyre jobban megszerettem az eget.',
      ],
      [
        text`한국 드라마를 보${bold('다 보니')} 한국어 실력이 늘었어요.`,
        'Ahogy koreai sorozatokat néztem, fejlődött a koreaim.',
      ],
      [text`이야기하${bold('다 보니')} 시간이 이렇게 됐네요.`, 'Ahogy beszélgettünk, el is repült az idő.'],
      [
        text`매일 그 노래를 듣${bold('다 보니')} 가사를 다 외웠어요.`,
        'Ahogy minden nap hallgattam azt a dalt, megtanultam a szövegét.',
        '-다 előtt nincs ㄷ-változás: 듣다 보니',
      ],
    ],
  },
  {
    lesson: 8,
    point: 1,
    form: '-는다는/ㄴ다는/다는 점에서',
    name: '„abban a tekintetben, hogy …; azért, mert …”',
    explanation: [
      paragraph`Azt a ${bold('szempontot, okot')} jelöli, amiért valamit értékelünk, tisztelünk, kritizálunk: „abból a szempontból, hogy …”. Hivatalos, írott stílus.`,
      list(
        text`${bold('Ige')}: 받침 után ${korean('-는다는')}, magánhangzó után ${korean('-ㄴ다는')}`,
        text`${bold('Melléknév')}: ${korean('-다는')}; ${bold('főnév')}: ${korean('(이)라는')}; ${bold('múlt')}: ${korean('-았다는/었다는')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => plainStyleStatement(word) + '는 점에서' },
        { header: 'Múlt', conjugate: word => withPast(word, '다는 점에서') },
      ],
    },
    examples: [
      [
        text`삶에 대한 가르침을 ${bold('줬다는 점에서')} 존경을 받습니다.`,
        'Azért tisztelik, mert tanítást adott az életről.',
      ],
      [
        text`이 제품은 가볍${bold('다는 점에서')} 인기가 많아요.`,
        'Ez a termék abból a szempontból népszerű, hogy könnyű.',
      ],
      [
        text`그 선수는 포기하지 않${bold('는다는 점에서')} 대단해요.`,
        'Az a sportoló abban nagyszerű, hogy soha nem adja fel.',
      ],
      [
        text`한글은 배우기 쉽${bold('다는 점에서')} 훌륭한 문자예요.`,
        'A hangul abból a szempontból kiváló írás, hogy könnyű megtanulni.',
        '-다는 előtt nincs ㅂ-változás: 쉽다는',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-는다는')} a ${korean('-는다고 하는')} rövidülése (idéző jelző). Ugyanígy: ${korean('-는다는 것, -는다는 사실, -는다는 이야기')}.`,
    ],
  },
  {
    lesson: 8,
    point: 2,
    form: '-(으)ㄴ 결과',
    name: '„…-nak az eredményeként”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy a második rész az első cselekvés ${bold('eredménye, következménye')}. Hivatalos, írott stílus (jelentés, cikk). Főnévvel: ${korean('N의 결과')}.`,
      paragraph`${bold('받침')} után: ${bold('-은 결과')}, magánhangzó után: ${bold('-ㄴ 결과')}, ㄹ-tőnél az ㄹ kiesik.`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄴ 결과', conjugate: word => withEu(word, 'ㄴ 결과') }] },
    examples: [
      [
        text`열심히 노력${bold('한 결과')} 꿈을 이루었습니다.`,
        'Kitartó erőfeszítései eredményeként valóra váltotta az álmát.',
      ],
      [
        text`설문 조사를 ${bold('한 결과')} 대부분이 찬성했습니다.`,
        'A felmérés eredménye szerint a többség egyetértett.',
      ],
      [text`매일 운동${bold('한 결과')} 건강이 좋아졌어요.`, 'A napi edzés eredményeként javult az egészségem.'],
      [
        text`환자의 이야기를 자세히 들${bold('은 결과')} 원인을 찾았습니다.`,
        'A beteg részletes meghallgatása után megtalálták az okot.',
        'ㄷ-rendhagyó: 듣다 → 들은',
      ],
    ],
  },
  {
    lesson: 9,
    point: 1,
    form: '-(으)ㄹ수록',
    name: '„minél …, annál …”',
    explanation: [
      paragraph`Ige vagy melléknév után azt fejezi ki, hogy az első rész ${bold('fokozódásával')} a második is fokozódik: „minél többet …, annál …”. Erősítve: ${korean('-(으)면 -(으)ㄹ수록')} (${korean('보면 볼수록')}). ${korean('갈수록')} = „egyre inkább”.`,
      paragraph`${bold('받침')} után: ${bold('-을수록')}, magánhangzó után: ${bold('-ㄹ수록')}, ㄹ-tőnél: ${korean('살수록')}.`,
    ],
    table: {
      existential: false,
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-(으)ㄹ수록', conjugate: word => withEu(word, 'ㄹ수록') },
        { header: '-(으)면 -(으)ㄹ수록', conjugate: word => withEu(word, '면 ') + withEu(word, 'ㄹ수록') },
      ],
    },
    examples: [
      [text`${bold('갈수록')} 현금을 사용하는 사람들이 줄어들고 있습니다.`, 'Egyre kevesebben használnak készpénzt.'],
      [text`한국어는 공부${bold('할수록')} 재미있어요.`, 'A koreai minél többet tanulom, annál érdekesebb.'],
      [
        text`이 노래는 들${bold('으면')} 들${bold('을수록')} 좋아요.`,
        'Ez a dal minél többször hallgatom, annál jobb.',
        'ㄷ-rendhagyó: 듣다 → 들으면 들을수록',
      ],
      [
        text`날씨가 ${bold('더울수록')} 물을 많이 마셔야 해요.`,
        'Minél melegebb van, annál több vizet kell inni.',
        'ㅂ-rendhagyó: 덥다 → 더울수록',
      ],
    ],
  },
  {
    lesson: 9,
    point: 2,
    form: '-(으)나',
    name: '„de, azonban” (írott ellentét)',
    explanation: [
      paragraph`Ige vagy melléknév után az előzővel ${bold('ellentétes')} tartalmat vezet be, mint a ${korean('-지만')}, de ${bold('írottabb, hivatalosabb')} stílusban. Múlt: ${korean('-았으나/었으나')}; főnév: ${korean('-(이)나')}.`,
      paragraph`${bold('받침')} után: ${bold('-으나')}, magánhangzó és ${bold('ㄹ')} után: ${bold('-나')} (ㄹ kiesik: ${korean('사나')}).`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-(으)나', conjugate: word => withEu(word, '나') },
        { header: 'Múlt: -았으나/었으나', conjugate: word => withPast(word, '으나') },
      ],
    },
    examples: [
      [
        text`카드 사용은 늘었${bold('으나')} 현금 사용은 줄었습니다.`,
        'A kártyahasználat nőtt, a készpénzhasználat viszont csökkent.',
      ],
      [text`이 방법은 간단하${bold('나')} 시간이 많이 걸립니다.`, 'Ez a módszer egyszerű, de sok időt vesz igénybe.'],
      [text`날씨는 ${bold('추우나')} 하늘은 맑습니다.`, 'Hideg van, de tiszta az ég.', 'ㅂ-rendhagyó: 춥다 → 추우나'],
      [text`여러 번 연락했${bold('으나')} 답이 없었습니다.`, 'Többször kerestem, de nem jött válasz.'],
    ],
  },
  {
    lesson: 10,
    point: 1,
    form: '-는다고/ㄴ다고/다고 생각하다',
    name: '„úgy gondolom, hogy …” (vélemény)',
    explanation: [
      paragraph`A beszélő ${bold('véleményét')} fejezi ki: „úgy gondolom, hogy …”. A gondolat tartalma idéző (한다체) alakot kap:`,
      list(
        text`${bold('Ige')}: 받침 után ${korean('-는다고')}, magánhangzó után ${korean('-ㄴ다고')}`,
        text`${bold('Melléknév')}: ${korean('-다고')}; ${bold('főnév')}: ${korean('(이)라고')}; ${korean('-아야/어야 한다고')} („kell”)`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-는다고/ㄴ다고/다고 생각해요', conjugate: word => plainStyleStatement(word) + '고 생각해요' },
      ],
    },
    examples: [
      [
        text`저는 인터넷에서 실명을 써야 ${bold('한다고 생각해요')}.`,
        'Szerintem az interneten valódi nevet kellene használni.',
      ],
      [text`저는 그 의견이 맞${bold('다고 생각해요')}.`, 'Úgy gondolom, az a vélemény helyes.'],
      [
        text`외국어를 배울 때는 많이 듣${bold('는 게 중요하다고 생각해요')}.`,
        'Úgy gondolom, nyelvtanulásnál fontos sokat hallgatni.',
      ],
      [text`저는 혼자 사는 게 더 ${bold('편하다고 생각해요')}.`, 'Szerintem egyedül élni kényelmesebb.'],
      [
        text`한국어를 잘하려면 많이 들${bold('어야 한다고 생각해요')}.`,
        'Úgy gondolom, ha jól akarsz koreaiul, sokat kell hallgatnod.',
        'ㄷ-rendhagyó: 듣다 → 들어야',
      ],
    ],
    ownNote: [
      paragraph`Kérdés: ${korean('어떻게 생각해요?')} „Mit gondolsz?”. Udvarias, óvatos véleményre: ${korean('-지 않을까 싶어요')} (${reference('4B-11-1')}), ${korean('-는 거 아닐까 해요')} (${reference('4B-10-2')}).`,
    ],
  },
  {
    lesson: 10,
    point: 2,
    form: '-는/(으)ㄴ 거 아닐까 하다',
    name: '„nem lehet, hogy …? Talán …” (óvatos vélemény)',
    explanation: [
      paragraph`A beszélő ${bold('óvatosan, bizonytalanul')} mondja ki a véleményét vagy feltevését: „Szerintem talán …”. Beszédben a ${korean('것')} → ${korean('거')}.`,
      list(
        text`${bold('Ige')}, ${korean('있다/없다')}: jelen ${korean('-는 거')}, múlt ${korean('-(으)ㄴ 거')}`,
        text`${bold('Melléknév')}: ${korean('-(으)ㄴ 거')}; ${bold('főnév')}: ${korean('-인 거')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => presentModifier(word, ' 거 아닐까 해요') },
        {
          header: 'Múlt (ige)',
          conjugate: word => (word.wordClass === 'verb' ? withEu(word, 'ㄴ 거 아닐까 해요') : null),
        },
      ],
    },
    examples: [
      [
        text`실명을 쓰면 표현의 자유가 줄어드${bold('는 거 아닐까 해요')}.`,
        'Talán csökkenne a szólásszabadság, ha valódi nevet kellene használni.',
      ],
      [text`그 사람이 벌써 떠${bold('난 거 아닐까 해요')}.`, 'Lehet, hogy az illető már elment.'],
      [text`이 가격은 좀 비${bold('싼 거 아닐까 해요')}.`, 'Szerintem ez az ár talán kicsit drága.'],
      [
        text`요즘 날씨가 너무 ${bold('더운 거 아닐까 해요')}.`,
        'Szerintem mostanában talán túl meleg van.',
        'ㅂ-rendhagyó: 덥다 → 더운',
      ],
    ],
  },
  {
    lesson: 11,
    point: 1,
    form: '-지 않을까 싶다',
    name: '„azt hiszem, (talán) …” (óvatos jóslat)',
    explanation: [
      paragraph`Ige vagy melléknév után a beszélő ${bold('bizonytalan jövőbeli tervét vagy feltevését')} fejezi ki óvatosan: „azt hiszem, talán …”. A tő végétől függetlenül ${korean('-지 않을까 싶다')}; múltra: ${korean('-지 않았을까 싶다')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-지 않을까 싶어요', conjugate: word => withPlainStem(word, '지 않을까 싶어요') },
        { header: 'Múlt', conjugate: word => withPlainStem(word, '지 않았을까 싶어요') },
      ],
    },
    examples: [
      [
        text`10년 후엔 행복한 가정을 이루고 있${bold('지 않을까 싶어요')}.`,
        'Azt hiszem, tíz év múlva boldog családom lesz.',
      ],
      [text`내일은 비가 오${bold('지 않을까 싶어요')}.`, 'Azt hiszem, holnap esni fog.'],
      [text`이 정도면 충분하${bold('지 않을까 싶어요')}.`, 'Szerintem ennyi talán elég.'],
      [text`아마 벌써 도착하${bold('지 않았을까 싶어요')}.`, 'Azt hiszem, valószínűleg már megérkezett.'],
      [
        text`내일은 오늘보다 덜 춥${bold('지 않을까 싶어요')}.`,
        'Azt hiszem, holnap kevésbé lesz hideg, mint ma.',
        '-지 előtt nincs ㅂ-változás: 춥지',
      ],
    ],
    ownNote: [
      paragraph`Formailag tagadó, jelentésben ${bold('állító')}: ${korean('오지 않을까')} = „talán jön”. A ${korean('-(으)ㄹ 것 같다')} (${reference('2A-09-1')}) óvatosabb, szerényebb változata.`,
    ],
  },
  {
    lesson: 11,
    point: 2,
    form: '-기보다는',
    name: '„ahelyett, hogy …, inkább …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy az első lehetőség ${bold('helyett inkább')} a másodikat választjuk, az jobb: „ahelyett, hogy …, inkább …”. Gyakran ${korean('차라리, 오히려')}. A tő végétől függetlenül ${korean('-기보다는')}. Főnévvel: ${korean('N보다는')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-기보다는', conjugate: word => withPlainStem(word, '기보다는') }],
    },
    examples: [
      [
        text`돈을 많이 벌${bold('기보다는')} 행복하게 살고 싶어요.`,
        'Ahelyett, hogy sok pénzt keressek, inkább boldogan szeretnék élni.',
      ],
      [
        text`혼자 고민하${bold('기보다는')} 친구와 이야기해 보세요.`,
        'Ahelyett, hogy egyedül gyötrődnél, inkább beszélj a barátoddal.',
      ],
      [
        text`주말에는 밖에 나가${bold('기보다는')} 집에서 쉬는 편이에요.`,
        'Hétvégén kimozdulás helyett inkább otthon pihenek.',
      ],
      [
        text`음악을 듣${bold('기보다는')} 직접 연주하는 걸 좋아해요.`,
        'Inkább játszani szeretek, mint zenét hallgatni.',
        '-기 előtt nincs ㄷ-változás: 듣기',
      ],
    ],
  },
  {
    lesson: 12,
    point: 1,
    form: '-는다니/ㄴ다니/다니',
    name: '„hogy …! (el sem hiszem)” (meglepődés)',
    explanation: [
      paragraph`Valamit, amit hallottunk vagy megtudtunk, ${bold('meglepetéssel, hitetlenkedve')} ismétlünk meg: „Hogy már diplomázunk! Nem hiszem el.” Gyakran felkiáltó mondatban, vagy ${korean('-다니요?')} kérdésként.`,
      list(
        text`${bold('Ige')}: 받침 után ${korean('-는다니')}, magánhangzó után ${korean('-ㄴ다니')}`,
        text`${bold('Melléknév')}: ${korean('-다니')}; ${bold('főnév')}: ${korean('(이)라니')}; ${bold('múlt')}: ${korean('-았다니/었다니')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => plainStyleStatement(word) + '니' },
        { header: 'Múlt', conjugate: word => withPast(word, '다니') },
      ],
    },
    examples: [
      [text`벌써 졸업을 한${bold('다니')}! 믿기지가 않습니다.`, 'Hogy már diplomázunk! El sem hiszem.'],
      [text`그 사람이 가수${bold('라니')} 정말 몰랐어요.`, 'Hogy ő énekes! Ezt tényleg nem tudtam.'],
      [
        text`10월인데 이렇게 ${bold('덥다니')}!`,
        'Október van, és ilyen meleg!',
        '-다니 előtt nincs ㅂ-változás: 덥다니',
      ],
      [text`이 노래를 한 번도 안 들어 ${bold('봤다니')}!`, 'Hogy még egyszer se hallottad ezt a dalt!'],
    ],
  },
  {
    lesson: 12,
    point: 2,
    form: '-기를 바라다',
    name: '„remélem, hogy …; kívánom, hogy …”',
    explanation: [
      paragraph`Ige vagy melléknév után ${bold('kívánságot, reményt')} fejez ki, gyakran jókívánságként, hivatalos beszédben, üdvözlőlapon. A tő végétől függetlenül ${korean('-기를 바라다')}; ragozva: ${korean('바라요, 바랍니다')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-기를 바라요', conjugate: word => withPlainStem(word, '기를 바라요') },
        { header: '-기를 바랍니다', conjugate: word => withPlainStem(word, '기를 바랍니다') },
      ],
    },
    examples: [
      [text`모두 행복하${bold('기를 바랍니다')}.`, 'Kívánom, hogy mindenki boldog legyen.'],
      [text`좋은 결과가 있${bold('기를 바라요')}.`, 'Remélem, jó eredmény lesz.'],
      [text`새해에는 건강하${bold('시기를 바랍니다')}.`, 'Jó egészséget kívánok az új évre.'],
      [
        text`앞으로도 우리 노래를 많이 들어 주시${bold('기를 바랍니다')}.`,
        'Reméljük, a jövőben is sokat hallgatják majd a dalainkat.',
        'ㄷ-rendhagyó: 듣다 → 들어 주시다',
      ],
    ],
    correctIncorrect: [
      { correct: '행복하기를 바라요.', translation: 'Remélem, boldog leszel.' },
      { incorrect: '행복하기를 바래요.', reason: 'gyakran hallani, de a helyes alak 바라요 (바라다 → 바라 + 요)' },
    ],
    ownNote: [
      paragraph`A ${korean('바라다')} szabályos: ${korean('바라 + 요 → 바라요')} (az ㅏ összevonódik). A ${korean('바래요')} a beszédben elterjedt, de helytelen alak; a tankönyv is külön kiemeli.`,
    ],
  },
];
export default {
  lessons: {
    1: {
      korean: '뭐든지 적극적인 데다가 유머 감각도 있어요',
      hungarian: 'Mindenben aktív, ráadásul humorérzéke is van.',
    },
    2: {
      korean: '처음 만났을 때는 얌전한 성격인 줄 알았거든',
      hungarian: 'Amikor először találkoztunk, azt hittem, csendes természetű.',
      pronunciation: '억양 (-거든)',
      pronunciationHungarian: 'a -거든 hanglejtése',
    },
    3: {
      korean: '사업을 시작할까 아니면 회사에 취직할까 고민이야',
      hungarian: 'Azon töprengek, vállalkozásba kezdjek, vagy elhelyezkedjek egy cégnél.',
    },
    4: {
      korean: '그때 그 꿈을 포기하지 말았어야 했는데',
      hungarian: 'Akkor nem kellett volna feladnom azt az álmot.',
      pronunciation: '억양 (-았을/었을 텐데)',
      pronunciationHungarian: 'a -았을/었을 텐데 hanglejtése',
    },
    5: {
      korean: '40대는 청소년들에 비해서 결혼을 해야 한다는 응답이 많았습니다',
      hungarian: 'A negyvenesek körében a fiatalokhoz képest többen mondták, hogy házasodni kell.',
    },
    6: {
      korean: '식당에서 직원을 어떻게 부르는지 알아요?',
      hungarian: 'Tudod, hogyan szólítják az étteremben a pincért?',
      pronunciation: '경음화',
      pronunciationHungarian: 'keményedés',
    },
    7: { korean: '저는 하늘길을 관리하는 일을 합니다', hungarian: 'A légi útvonalak irányításával foglalkozom.' },
    8: {
      korean: '삶에 대한 가르침을 줬다는 점에서 존경을 받습니다',
      hungarian: 'Azért tisztelik, mert tanítást adott az életről.',
      pronunciation: '비음화',
      pronunciationHungarian: 'orrhangúsodás',
    },
    9: {
      korean: '갈수록 현금을 사용하는 사람들이 줄어들고 있습니다',
      hungarian: 'Egyre kevesebben használnak készpénzt.',
    },
    10: {
      korean: '저는 인터넷에서 실명을 써야 한다고 생각해요',
      hungarian: 'Szerintem az interneten valódi nevet kellene használni.',
      pronunciation: '현실 발음 (한자어 경음화)',
      pronunciationHungarian: 'kínai eredetű szavak keményedése (효과 [효과/효꽈])',
    },
    11: {
      korean: '10년 후엔 행복한 가정을 이루고 있지 않을까 싶어요',
      hungarian: 'Azt hiszem, tíz év múlva boldog családom lesz.',
    },
    12: {
      korean: '벌써 졸업을 한다니! 믿기지가 않습니다',
      hungarian: 'Hogy már diplomázunk! El sem hiszem.',
      pronunciation: '끊어 말하기',
      pronunciationHungarian: 'tagolás, szünet',
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
