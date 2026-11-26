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
const vocabularyGrammarPageOf = (lesson: number, point: number) => 26 + 2 * (lesson - 1) + (point - 1),
  studentBookPageOf = (lesson: number, point: number) => 16 + 8 * (lesson - 1) + (point - 1);

const points: PointSource[] = [
  {
    lesson: 1,
    point: 1,
    form: '-아도/어도',
    name: '„még ha … is; hiába …”',
    explanation: [
      paragraph`Ige vagy melléknév után azt fejezi ki, hogy az első részben mondott tény vagy feltételezés ${bold('ellenére')} a várttal ellentétes dolog történik: „Hiába esik, elmegyek.” Gyakran ${korean('아무리')} („bármennyire”) erősíti. A ${bold('-아/어')} szabály szerint (${korean('가도, 먹어도, 해도')}). Főnévvel: ${korean('N(이)라도')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-아도/어도', conjugate: word => withAOrEo(word, '도') }],
    },
    examples: [
      [
        text`아무리 바${bold('빠도')} 주말에는 부모님께 전화해요.`,
        'Akármilyen elfoglalt vagyok, hétvégén felhívom a szüleimet.',
        '으-kiesés: 바쁘다 → 바빠도',
      ],
      [text`비가 ${bold('와도')} 축구를 할 거예요.`, 'Még ha esik is, focizni fogunk.'],
      [text`약을 먹${bold('어도')} 감기가 안 나아요.`, 'Hiába szedem a gyógyszert, nem múlik a megfázás.'],
      [
        text`아무리 들${bold('어도')} 무슨 말인지 모르겠어요.`,
        'Akárhányszor hallgatom, nem értem, mit mond.',
        { note: 'ㄷ-rendhagyó: 듣다 → 들어도', uses: ['4B-06-1'] },
      ],
    ],
    ownNote: [
      paragraph`A ${reference('2B-06-1', '2B 6. leckében')} tanult ${korean('-아도/어도 되다')} (engedély) is erre épül: „ha megcsinálod is, rendben van”.`,
    ],
  },
  {
    lesson: 1,
    point: 2,
    form: '-아/어 드리다',
    name: '„megteszi (tisztelt) valakinek”',
    explanation: [
      paragraph`A ${korean('-아/어 주다')} (${reference('2B-04-2')}) ${bold('tiszteleti')} párja: akkor használjuk, ha a cselekvést ${bold('idősebb, tisztelt személy javára')} végezzük. A címzett gyakran ${korean('께')} vagy ${korean('에게')} partikulát kap. A ${bold('-아/어')} szabály szerint.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-아/어 드릴게요', conjugate: word => withAOrEo(word, ' 드릴게요') },
        { header: 'Múlt: -아/어 드렸어요', conjugate: word => withAOrEo(word, ' 드렸어요') },
      ],
    },
    examples: [
      [
        text`할아버지, 할머니 이야기도 들어 ${bold('드렸어요')}.`,
        'A nagyszülők történeteit is meghallgattam.',
        'ㄷ-rendhagyó: 듣다 → 들어 드렸어요',
      ],
      [text`어머니께 편지를 써 ${bold('드렸어요')}.`, 'Levelet írtam édesanyámnak.'],
      [text`제가 가방을 들어 ${bold('드릴게요')}.`, 'Majd én viszem a táskáját.'],
      [
        text`할머니 댁에 가서 청소를 도와 ${bold('드렸어요')}.`,
        'Elmentem a nagymamámhoz, és segítettem neki takarítani.',
        'ㅂ-rendhagyó: 돕다 → 도와 드렸어요',
      ],
    ],
    ownNote: [
      paragraph`Felajánlás udvariasan: ${korean('-아/어 드릴까요?')} („…-jak Önnek?”). A ${korean('주다')} „ad” tiszteleti párja önállóan is ${korean('드리다')}: ${korean('선물을 드렸어요')}.`,
    ],
  },
  {
    lesson: 2,
    point: 1,
    form: '-(으)ㄹ까 봐',
    name: '„attól tartva, hogy …; nehogy …”',
    explanation: [
      paragraph`Ige vagy melléknév után azt fejezi ki, hogy a beszélő ${bold('aggódik, fél')} egy lehetséges helyzettől, és ezért tesz (vagy nem tesz) valamit. A második tagmondat a megtett óvintézkedés. ${korean('-(으)ㄹ까 봐서')} alakban is.`,
      paragraph`${bold('받침')} után: ${bold('-을까 봐')}, magánhangzó után: ${bold('-ㄹ까 봐')}, ㄹ-tőnél: ${korean('멀까 봐')}. Múltra: ${korean('-았을까/었을까 봐')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-(으)ㄹ까 봐', conjugate: word => withEu(word, 'ㄹ까 봐') },
        { header: 'Múlt', conjugate: word => withPast(word, '을까 봐') },
      ],
    },
    examples: [
      [text`표가 없${bold('을까 봐')} 미리 예매했어요.`, 'Attól tartva, hogy nem lesz jegy, előre megvettem.'],
      [text`늦${bold('을까 봐')} 택시를 탔어요.`, 'Féltem, hogy elkések, ezért taxiba ültem.'],
      [
        text`밖이 ${bold('추울까 봐')} 코트를 가져왔어요.`,
        'Féltem, hogy kint hideg lesz, ezért hoztam kabátot.',
        'ㅂ-rendhagyó: 춥다 → 추울까 봐',
      ],
      [text`아이가 깰${bold('까 봐')} 조용히 들어왔어요.`, 'Csendben jöttem be, nehogy felébredjen a gyerek.'],
    ],
    ownNote: [
      paragraph`A második tagmondat nem lehet felszólítás vagy jövő idejű terv (${korean('-(으)세요, -(으)ㄹ 거예요')}); a félelem ténylegesen befolyásolta a cselekvést. ${korean('-(으)ㄹ까 봐 걱정이에요')} „attól félek, hogy…”.`,
    ],
  },
  {
    lesson: 2,
    point: 2,
    form: '-(으)ㄹ 텐데',
    name: '„biztos …, (pedig / és) …” (feltételezés + folytatás)',
    explanation: [
      paragraph`Ige vagy melléknév után a beszélő ${bold('feltételezését')} mondja ki, és ehhez kapcsolódóan folytatja: kérdés, javaslat, aggodalom. „Biztos fáradt vagy, pihenj.”`,
      paragraph`${bold('받침')} után: ${bold('-을 텐데')}, magánhangzó után: ${bold('-ㄹ 텐데')}. Múltra: ${korean('-았을/었을 텐데')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-(으)ㄹ 텐데', conjugate: word => withEu(word, 'ㄹ 텐데') },
        { header: 'Múlt: -았을/었을 텐데', conjugate: word => withPast(word, '을 텐데') },
      ],
    },
    examples: [
      [
        text`티켓을 구하는 게 쉽지 않${bold('았을 텐데')} 어떻게 구했어요?`,
        'Nem lehetett könnyű jegyet szerezni – hogy sikerült?',
      ],
      [text`많이 피곤${bold('할 텐데')} 좀 쉬세요.`, 'Biztos nagyon fáradt vagy, pihenj egy kicsit.'],
      [
        text`밖에 ${bold('추울 텐데')} 따뜻하게 입고 나가세요.`,
        'Kint biztos hideg van, öltözz fel melegen.',
        'ㅂ-rendhagyó: 춥다 → 추울 텐데',
      ],
      [text`지금 출발하면 길이 막${bold('힐 텐데')}요.`, 'Ha most indulsz, biztos dugó lesz.'],
    ],
    ownNote: [
      paragraph`Mondatvégen (${korean('-(으)ㄹ 텐데요')}) aggodalmat, sajnálkozást fejez ki. A ${reference('4B-04-2')} ${korean('-았을/었을 텐데')} alakja: „pedig …-t volna” (megvalósulatlan múlt).`,
    ],
  },
  {
    lesson: 3,
    point: 1,
    form: '-거든요',
    name: '„merthogy …, ugyanis …” (magyarázó ok)',
    explanation: [
      paragraph`Ige vagy melléknév után olyan ${bold('okot vagy hátteret')} ad meg, amit ${bold('csak a beszélő tud')}, magától értetődő természetességgel: „Merthogy …”. A tő végétől függetlenül ${korean('-거든요')}; múlt: ${korean('-았거든요/었거든요')}.`,
      paragraph`Különbség: ${korean('-거든요')} = csak én tudom az okot; ${korean('-잖아요')} = mindketten tudjuk.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-거든요', conjugate: word => withPlainStem(word, '거든요') },
        { header: 'Múlt: -았거든요/었거든요', conjugate: word => withPast(word, '거든요') },
      ],
    },
    examples: [
      [
        text`저는 매운 음식을 잘 먹어요. 어렸을 때부터 많이 먹었${bold('거든요')}.`,
        'Jól bírom a csípőset. Gyerekkorom óta sokat eszem.',
      ],
      [text`오늘은 못 가요. 약속이 있${bold('거든요')}.`, 'Ma nem tudok menni. Ugyanis programom van.'],
      [
        text`창문 좀 열어도 돼요? 좀 덥${bold('거든요')}.`,
        'Kinyithatom az ablakot? Ugyanis kicsit meleg van.',
        '-거든요 előtt nincs ㅂ-változás: 덥거든요',
      ],
      [
        text`요즘 이 노래만 들어요. 정말 좋${bold('거든요')}.`,
        'Mostanában csak ezt a dalt hallgatom. Tudniillik nagyon jó.',
      ],
    ],
    ownNote: [
      paragraph`Beszélgetés elején is: új téma bevezetése, amire folytatás jön: ${korean('제가 다음 주에 이사하거든요. 그래서…')}. Idősebbnek túl sokszor mondva tiszteletlennek hathat.`,
    ],
  },
  {
    lesson: 3,
    point: 2,
    form: '-는구나/구나',
    name: '„ó, szóval …!” (most észrevett tény, tegező)',
    explanation: [
      paragraph`A beszélő ${bold('épp most')} lát, hall vagy ért meg valamit, és erre ${bold('rácsodálkozik')}. Magában mondva, fiatalabbnak vagy közeli barátnak (tegező stílus).`,
      paragraph`${bold('Ige')}: ${korean('-는구나')} (ㄹ kiesik: ${korean('사는구나')}), ${bold('melléknév')} és ${korean('있다/없다')}: ${korean('-구나')} (a ${korean('있다/없다')} lehet ${korean('-는구나')} is); ${bold('főnév')}: ${korean('-(이)구나')}; ${bold('múlt')}: ${korean('-았구나/었구나')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        {
          header: 'Jelen',
          conjugate: word => (word.wordClass === 'verb' ? withPlainStem(word, '는구나') : withPlainStem(word, '구나')),
        },
        { header: 'Múlt: -았구나/었구나', conjugate: word => withPast(word, '구나') },
      ],
    },
    examples: [
      [text`매운 음식을 진짜 잘 먹${bold('는구나')}!`, 'Hű, tényleg jól bírod a csípőset!'],
      [text`벌써 봄이 왔${bold('구나')}.`, 'Ó, már itt a tavasz.'],
      [text`오늘 정말 ${bold('덥구나')}.`, 'Ma aztán meleg van!', '-구나 előtt nincs ㅂ-változás: 덥구나'],
      [text`네가 이 케이크를 만${bold('들었구나')}!`, 'Szóval te sütötted ezt a tortát!'],
    ],
    ownNote: [
      paragraph`Udvarias változata ${korean('-는군요/군요')}; a ${korean('-네요')} (${reference('2B-05-1')}) hasonló, de jobban a hallgatóhoz szól. A ${korean('-구나')} gyakran félig magának mondott felismerés.`,
    ],
  },
  {
    lesson: 4,
    point: 1,
    form: '-아/어 놓다',
    name: '„elkészít, megcsinál (és úgy hagy)”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy cselekvést ${bold('befejeztünk')}, és az ${bold('eredménye megmarad')}, úgy is hagyjuk; gyakran előkészületként. A ${bold('-아/어')} szabály szerint (${korean('사 놓다, 씻어 놓다, 해 놓다')}).`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-아/어 놓았어요', conjugate: word => withAOrEo(word, ' 놓았어요') },
        { header: 'Javaslat: -아/어 놓자', conjugate: word => withAOrEo(word, ' 놓자') },
      ],
    },
    examples: [
      [text`채소부터 씻어서 썰어 ${bold('놓자')}.`, 'Először mossuk meg és vágjuk fel a zöldséget.'],
      [text`손님이 오기 전에 음식을 만들어 ${bold('놓았어요')}.`, 'A vendégek érkezése előtt elkészítettem az ételt.'],
      [text`창문을 열어 ${bold('놓았어요')}.`, 'Kinyitottam (és nyitva hagytam) az ablakot.'],
      [text`재료를 미리 사 ${bold('놓을게요')}.`, 'Előre megveszem a hozzávalókat.'],
      [text`밥을 미리 지${bold('어 놓았어요')}.`, 'Előre megfőztem a rizst.', 'ㅅ-rendhagyó: 짓다 → 지어 놓다'],
    ],
    ownNote: [
      paragraph`Beszédben gyakran rövidül: ${korean('놓아요 → 놔요, 놓았어요 → 놨어요')}. Nagyon közeli rokona a ${korean('-아/어 두다')} (${reference('3B-11-2')}); a ${korean('두다')} inkább a hosszabb megtartást, a ${korean('놓다')} inkább a kész állapotot hangsúlyozza.`,
    ],
  },
  {
    lesson: 4,
    point: 2,
    form: '-(으)ㄴ 다음에',
    name: '„miután …, utána …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy cselekvést ${bold('először')} elvégzünk, és ${bold('utána')} jön a következő; különösen lépések, receptek, utasítások sorrendjében. Rokon kifejezések: ${korean('-고 나서')}, ${korean('-(으)ㄴ 후에')}.`,
      paragraph`${bold('받침')} után: ${bold('-은 다음에')}, magánhangzó után: ${bold('-ㄴ 다음에')}, ㄹ-tőnél az ㄹ kiesik: ${korean('만든 다음에')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-(으)ㄴ 다음에', conjugate: word => withEu(word, 'ㄴ 다음에') }],
    },
    examples: [
      [text`채소를 씻${bold('은 다음에')} 썰어요.`, 'Miután megmostuk a zöldséget, felvágjuk.'],
      [text`물이 끓${bold('은 다음에')} 라면을 넣으세요.`, 'Miután felforrt a víz, tegye bele a ramyeont.'],
      [
        text`소스를 만${bold('든 다음에')} 고기에 부어요.`,
        'Miután elkészült a szósz, ráöntjük a húsra.',
        'ㄹ-tő: 만들다 → 만든',
      ],
      [
        text`설명을 들${bold('은 다음에')} 시작하세요.`,
        'A magyarázat meghallgatása után kezdjenek hozzá.',
        'ㄷ-rendhagyó: 듣다 → 들은',
      ],
    ],
  },
  {
    lesson: 5,
    point: 1,
    form: '-자마자',
    name: '„amint …, (azonnal) …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy az első történés után ${bold('rögtön, azonnal')} jön a második. A tő végétől függetlenül ${korean('-자마자')}. Melléknév a ${korean('-아지다/어지다')}-val igévé alakítva állhat előtte: ${korean('추워지자마자')}.`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-자마자', conjugate: word => withPlainStem(word, '자마자') }] },
    examples: [
      [text`집에 도착하${bold('자마자')} 잠이 들었어요.`, 'Amint hazaértem, elaludtam.'],
      [text`수업이 끝나${bold('자마자')} 친구에게 전화했어요.`, 'Amint vége lett az órának, felhívtam a barátomat.'],
      [
        text`그 소식을 듣${bold('자마자')} 달려왔어요.`,
        'Amint meghallottam a hírt, odarohantam.',
        '-자 előtt nincs ㄷ-változás: 듣자마자',
      ],
      [text`날씨가 추워지${bold('자마자')} 감기에 걸렸어요.`, 'Amint hideg lett, megfáztam.'],
    ],
    ownNote: [
      paragraph`Elé nem kerül múlt idő: ${korean('도착하자마자')}, nem ${korean('도착했자마자')}; az időt a mondat vége adja.`,
    ],
  },
  {
    lesson: 5,
    point: 2,
    form: '-아/어 버리다',
    name: '„teljesen el-/meg-/ki- …” (befejezettség, megkönnyebbülés, sajnálat)',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy cselekvés ${bold('teljesen befejeződött')}, semmi nem maradt belőle. Gyakran a beszélő érzését is mutatja: ${bold('megkönnyebbülést')} (letudtam), vagy ${bold('sajnálatot')} (sajnos megtörtént). A ${bold('-아/어')} szabály szerint.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-아/어 버렸어요', conjugate: word => withAOrEo(word, ' 버렸어요') }],
    },
    examples: [
      [text`딴생각을 하다가 버스를 놓쳐 ${bold('버렸어요')}.`, 'Elkalandoztak a gondolataim, és lekéstem a buszt.'],
      [text`배가 고파서 케이크를 다 먹어 ${bold('버렸어요')}.`, 'Éhes voltam, és megettem az egész tortát.'],
      [text`숙제를 빨리 해 ${bold('버리고')} 놀러 가자.`, 'Csináljuk meg gyorsan a házit, aztán menjünk játszani.'],
      [text`비밀번호를 잊어 ${bold('버렸어요')}.`, 'Elfelejtettem a jelszót.'],
      [
        text`그 이야기를 들어 ${bold('버렸으니까')} 이제 모르는 척할 수 없어요.`,
        'Már meghallottam azt a történetet, most már nem tehetek úgy, mintha nem tudnám.',
        'ㄷ-rendhagyó: 듣다 → 들어 버리다',
      ],
    ],
  },
  {
    lesson: 6,
    point: 1,
    form: '-았었/었었-',
    name: 'régmúlt: „valaha …, de már nem”',
    explanation: [
      paragraph`Ige vagy melléknév után azt fejezi ki, hogy egy helyzet ${bold('a múltban fennállt, de már nem tart')}: „régen …, (de most már nem)”. ㅏ, ㅗ után ${korean('-았었-')}, egyébként ${korean('-었었-')}, 하다 → ${korean('했었-')}. Főnévvel: 받침 után ${korean('-이었었-')}, magánhangzó után ${korean('-였었-')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-았었어요/었었어요', conjugate: word => withPast(word, '었어요') }],
    },
    examples: [
      [text`작년에는 머리가 길${bold('었었어요')}.`, 'Tavaly hosszú hajam volt (most már nem).'],
      [text`어렸을 때 부산에 살${bold('았었어요')}.`, 'Gyerekkoromban Puszanban laktam.'],
      [text`그 식당에 가 봤는데 문을 닫${bold('았었어요')}.`, 'Elmentem abba az étterembe, de (akkor) zárva volt.'],
      [
        text`예전에는 이 노래를 자주 들${bold('었었어요')}.`,
        'Régen gyakran hallgattam ezt a dalt.',
        'ㄷ-rendhagyó: 듣다 → 들었었어요',
      ],
    ],
    ownNote: [
      paragraph`${korean('갔어요')} „elment (és lehet, hogy még ott van)”, ${korean('갔었어요')} „elment, de már visszajött / már nem igaz”. Magyarul gyakran a „régen”, „valamikor” szóval adjuk vissza.`,
    ],
  },
  {
    lesson: 6,
    point: 2,
    form: '-(으)ㄹ걸 그랬다',
    name: '„jobb lett volna, ha …” (megbánás)',
    explanation: [
      paragraph`Ige után a beszélő ${bold('megbánását')} fejezi ki valami miatt, amit ${bold('nem tett meg')}: „Bárcsak …-tam volna!”. Tagadva: ${korean('-지 말걸 그랬다')} „bárcsak ne tettem volna”. Beszédben gyakran csak ${korean('-(으)ㄹ걸')}.`,
      paragraph`${bold('받침')} után: ${bold('-을걸 그랬다')}, magánhangzó után: ${bold('-ㄹ걸 그랬다')}, ㄹ-tőnél: ${korean('만들걸')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-(으)ㄹ걸 그랬어요', conjugate: word => withEu(word, 'ㄹ걸 그랬어요') },
        { header: '-지 말걸 그랬어요', conjugate: word => withPlainStem(word, '지 말걸 그랬어요') },
      ],
    },
    examples: [
      [text`제가 좀 참${bold('을걸 그랬어요')}.`, 'Jobb lett volna, ha visszafogom magam.'],
      [text`우산을 가져${bold('올걸 그랬어요')}.`, 'Bárcsak hoztam volna esernyőt.'],
      [text`그 말을 하${bold('지 말걸 그랬어요')}.`, 'Bárcsak ne mondtam volna ezt.'],
      [
        text`선생님 말씀을 잘 들${bold('을걸 그랬어요')}.`,
        'Jobban oda kellett volna figyelnem a tanár szavaira.',
        'ㄷ-rendhagyó: 듣다 → 들을걸',
      ],
    ],
    ownNote: [
      paragraph`Kiejtése: [-ㄹ껄]. Hasonló, de erősebb: ${korean('-았어야/었어야 했는데')} (${reference('4B-04-1')}).`,
    ],
  },
  {
    lesson: 7,
    point: 1,
    form: '-아/어 가지고',
    name: '„…, és ezért / és azzal …” (beszélt nyelvi ok, sorrend)',
    explanation: [
      paragraph`Ige vagy melléknév után azt fejezi ki, hogy az első rész a második ${bold('oka')}, vagy hogy az első cselekvés eredményével folytatjuk. A ${korean('-아서/어서')} ${bold('beszélt nyelvi')}, lazább párja. A ${bold('-아/어')} szabály szerint.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-아/어 가지고', conjugate: word => withAOrEo(word, ' 가지고') }],
    },
    examples: [
      [text`너무 바${bold('빠 가지고')} 연락을 못 했어.`, 'Annyira elfoglalt voltam, hogy nem tudtam jelentkezni.'],
      [
        text`날씨가 ${bold('추워 가지고')} 밖에 안 나갔어요.`,
        'Olyan hideg volt, hogy ki se mentem.',
        'ㅂ-rendhagyó: 춥다 → 추워 가지고',
      ],
      [text`돈을 모${bold('아 가지고')} 노트북을 샀어요.`, 'Összegyűjtöttem a pénzt, és vettem belőle egy laptopot.'],
      [text`김밥을 만들${bold('어 가지고')} 소풍을 갔어요.`, 'Csináltam kimbapot, és elvittem a kirándulásra.'],
    ],
    ownNote: [
      paragraph`A ${korean('-아서/어서')} megkötései itt is érvényesek: elé nem kerül múlt idő, és utána nem állhat felszólítás. Írásban, hivatalos helyzetben kerüljük.`,
    ],
  },
  {
    lesson: 7,
    point: 2,
    form: '-는다거나/ㄴ다거나',
    name: '„például … vagy …” (példák felsorolása)',
    explanation: [
      paragraph`Két vagy több ${bold('példát sorol fel')}, amelyek közül bármelyik szóba jöhet: „például kempingezünk, vagy …”. Gyakran ${korean('-는다거나 -는다거나 하다')} szerkezetben.`,
      list(
        text`${bold('Ige')}: 받침 után ${korean('-는다거나')}, magánhangzó után ${korean('-ㄴ다거나')} (ㄹ kiesik: ${korean('만든다거나')})`,
        text`${bold('Melléknév')}: ${korean('-다거나')}`,
        text`${bold('Főnév')}: ${korean('(이)라거나')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-는다거나/ㄴ다거나/다거나', conjugate: word => plainStyleStatement(word) + '거나' }],
    },
    examples: [
      [
        text`캠핑을 같이 간${bold('다거나')} 친목 모임을 해요.`,
        'Például együtt kempingezünk vagy baráti találkozókat tartunk.',
      ],
      [
        text`주말에는 영화를 본${bold('다거나')} 음악을 듣${bold('는다거나')} 해요.`,
        'Hétvégén például filmet nézek vagy zenét hallgatok.',
        '-는다 előtt nincs ㄷ-változás: 듣는다거나',
      ],
      [
        text`방이 너무 좁${bold('다거나')} 어둡${bold('다거나')} 하면 말씀하세요.`,
        'Ha például túl szűk vagy sötét a szoba, szóljon.',
      ],
      [
        text`떡볶이${bold('라거나')} 김밥 같은 분식을 좋아해요.`,
        'Szeretem a gyorsételeket, például a tokpokkit vagy a kimbapot.',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-거나')} (${reference('2A-02-1')}) egyszerű „vagy”; a ${korean('-는다거나')} hozzáteszi, hogy ezek csak ${bold('példák')} a sok lehetőség közül.`,
    ],
  },
  {
    lesson: 8,
    point: 1,
    form: '-느라고',
    name: '„mivel épp …-tam (ezért nem tudtam …)”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy az első cselekvés ${bold('miatt')} lett egy ${bold('negatív következmény')} (nem tudtam, késtem, fáradt lettem…). A két cselekvés ${bold('egy időben')} zajlik, és az alanyuk azonos. A tő végétől függetlenül ${korean('-느라고')}; ㄹ-tőnél az ㄹ kiesik (${korean('노느라고')}).`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-느라고', conjugate: word => withPlainStem(word, '느라고') }] },
    examples: [
      [
        text`일하${bold('느라고')} 바빠서 오랫동안 못 갔어요.`,
        'A munka miatt annyira elfoglalt voltam, hogy sokáig nem tudtam elmenni.',
      ],
      [text`게임을 하${bold('느라고')} 숙제를 못 했어요.`, 'Játszottam, ezért nem csináltam meg a házit.'],
      [
        text`음악을 듣${bold('느라고')} 전화 소리를 못 들었어요.`,
        'Zenét hallgattam, ezért nem hallottam a telefont.',
        '-느라고 előtt nincs ㄷ-változás: 듣느라고',
      ],
      [
        text`친구들과 노${bold('느라고')} 늦었어요.`,
        'A barátaimmal lógtam, ezért késtem el.',
        'ㄹ-tő: 놀다 → 노느라고',
      ],
    ],
    correctIncorrect: [
      { correct: '공부하느라고 못 잤어요.', translation: 'Tanultam, ezért nem tudtam aludni.' },
      { incorrect: '공부했느라고 못 잤어요.', reason: 'elé nem kerül múlt idő' },
      { incorrect: '비가 오느라고 못 갔어요.', reason: 'csak szándékos cselekvés lehet, nem időjárás' },
    ],
    ownNote: [
      paragraph`Melléknévvel nem áll, és utána nem jöhet felszólítás vagy javaslat. Bocsánatkérésben gyakori: ${korean('준비하느라고 늦었어요. 죄송해요.')}`,
    ],
  },
  {
    lesson: 8,
    point: 2,
    form: '-기는요',
    name: '„ugyan már, dehogy …” (szerény tagadás)',
    explanation: [
      paragraph`Ige vagy melléknév után a másik állítását ${bold('finoman, szerényen tagadja')}; főleg ${bold('dicséretre')} adott válaszként, illetve bocsánatkérésre, köszönetre: „Ugyan, dehogy!”. A tő végétől függetlenül ${korean('-기는요')}; főnévvel ${korean('-은요/는요')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-기는요', conjugate: word => withPlainStem(word, '기는요') }],
    },
    examples: [
      [
        text`가: 한국어를 정말 잘하시네요. 나: 잘하${bold('기는요')}. 아직 멀었어요.`,
        '– Nagyon jól beszél koreaiul! – Ugyan már, még messze vagyok tőle.',
      ],
      [
        text`가: 음식이 정말 맛있어요. 나: 맛있${bold('기는요')}. 그냥 간단하게 만들었어요.`,
        '– Nagyon finom az étel! – Ugyan, csak gyorsan összedobtam.',
      ],
      [text`가: 많이 바쁘시죠? 나: 바쁘${bold('기는요')}.`, '– Biztos nagyon elfoglalt. – Dehogy.'],
      [
        text`가: 도와줘서 고마워요. 나: 고맙${bold('기는요')}.`,
        '– Köszönöm a segítséget! – Ugyan, nincs mit.',
        '-기 előtt nincs ㅂ-változás: 고맙기는요',
      ],
    ],
    ownNote: [
      paragraph`Barátok közt: ${korean('-기는')} (${korean('잘하기는!')}). Hangnemtől függően ellentmondás is lehet: ${korean('가깝기는요, 엄청 멀어요')} „Közel? Ugyan, nagyon messze van!”`,
    ],
  },
  {
    lesson: 9,
    point: 1,
    form: '-는/(으)ㄴ 모양이다',
    name: '„úgy tűnik, hogy …” (következtetés tényekből)',
    explanation: [
      paragraph`Egy ${bold('tény vagy helyzet alapján következtetünk')}: „úgy látszik, …”. Első személyről nem mondjuk.`,
      list(
        text`${bold('Jelen')}: ige és ${korean('있다/없다')} ${korean('-는 모양이다')}; melléknév 받침 után ${korean('-은')}, magánhangzó után ${korean('-ㄴ 모양이다')}`,
        text`${bold('Múlt')} (ige): ${korean('-(으)ㄴ 모양이다')}`,
        text`Főnév: ${korean('-인 모양이다')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => presentModifier(word, ' 모양이에요') },
        { header: 'Múlt (ige)', conjugate: word => (word.wordClass === 'verb' ? withEu(word, 'ㄴ 모양이에요') : null) },
      ],
    },
    examples: [
      [
        text`두 사람이 많이 부러${bold('운 모양이에요')}.`,
        'Úgy tűnik, nagyon irigyli őket.',
        'ㅂ-rendhagyó: 부럽다 → 부러운',
      ],
      [
        text`불이 꺼져 있어요. 다들 집에 ${bold('간 모양이에요')}.`,
        'Le van kapcsolva a villany. Úgy látszik, mindenki hazament.',
      ],
      [
        text`밖에 비가 오${bold('는 모양이에요')}. 우산을 쓴 사람이 많아요.`,
        'Úgy tűnik, esik: sokan tartanak esernyőt.',
      ],
      [text`마크 씨가 오늘 기분이 좋${bold('은 모양이에요')}.`, 'Mark ma úgy tűnik, jókedvű.'],
    ],
    ownNote: [
      paragraph`Közel áll a ${korean('-나/(으)ㄴ가 보다')} (${reference('3A-02-2')}) jelentéséhez; a ${korean('모양이다')} kicsit írottabb, tárgyilagosabb.`,
    ],
  },
  {
    lesson: 9,
    point: 2,
    form: '같이',
    name: '„mint, -ként” (hasonlóság)',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt fejezi ki, hogy valami az adott főnév ${bold('jellegzetes tulajdonságához hasonló')}: ${korean('천사같이 착해요')} „angyalian jószívű”. Legtöbbször felcserélhető a ${korean('처럼')}-mel (${reference('2B-12-1')}), de bizonyos ${bold('állandósult hasonlatokban')} csak az egyik természetes: ${korean('불같이 화를 내다')} „dühbe gurul”, de ${korean('새처럼 날고 싶다')} „repülni szeretnék, mint a madár”.`,
    ],
    examples: [
      [text`그 사람은 천사${bold('같이')} 착해요.`, 'Angyalian jószívű.'],
      [text`아버지가 불${bold('같이')} 화를 내셨어요.`, 'Apa dühbe gurult (szó szerint: tűzként).'],
      [text`오늘은 봄날${bold('같이')} 따뜻해요.`, 'Ma olyan meleg van, mint tavasszal.'],
      [text`우리 언니는 모델${bold('같이')} 키가 커요.`, 'A nővérem magas, mint egy modell.'],
    ],
    ownNote: [
      paragraph`Vigyázat: a ${korean('같이')} „együtt” jelentésben külön szó (${korean('친구하고 같이 가요')}), itt viszont ${bold('partikula')}, egybeírjuk a főnévvel. Jelzőként: ${korean('N 같은 N')}.`,
    ],
  },
  {
    lesson: 10,
    point: 1,
    form: '-던데요',
    name: '„azt láttam (tapasztaltam), hogy … ám!” (felidézett élmény, csodálkozva)',
    explanation: [
      paragraph`Ige vagy melléknév után a beszélő a ${bold('múltban közvetlenül átélt jelenetet')} idézi fel, és ${bold('csodálkozva, elismerően')} beszél róla: „Láttam, tényleg nagyon …!”. A tő végétől függetlenül ${korean('-던데요')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-던데요', conjugate: word => withPlainStem(word, '던데요') },
        { header: 'Múlt: -았던데요/었던데요', conjugate: word => withPast(word, '던데요') },
      ],
    },
    examples: [
      [text`그 식당 떡국이 정말 맛있${bold('던데요')}.`, 'Annak az étteremnek a tteokgukja tényleg nagyon finom volt!'],
      [text`마크 씨가 노래를 정말 잘하${bold('던데요')}.`, 'Mark tényleg nagyon jól énekel (hallottam)!'],
      [text`어제 가 보니까 사람이 정말 많${bold('던데요')}.`, 'Tegnap ott jártam, és tényleg rengeteg ember volt.'],
      [text`제주도는 바람이 많이 불${bold('던데요')}.`, 'Dzsedzsun aztán erősen fúj a szél.'],
      [
        text`어제 가 보니까 거기는 정말 덥${bold('던데요')}.`,
        'Tegnap ott jártam, és tényleg nagyon meleg volt!',
        '-던 előtt nincs ㅂ-változás: 덥던데요',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-더라고요')} (${reference('3A-11-2')}) közeli rokona; a ${korean('-던데요')} jobban kifejezi a meglepetést, és nyitva hagyja a beszélgetést (a hallgató reakcióját várja).`,
    ],
  },
  {
    lesson: 10,
    point: 2,
    form: '-았더니/었더니',
    name: '„amikor …-tam, (erre az lett, hogy) …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy a beszélő ${bold('valamit megtett')}, és ennek ${bold('eredményeként vagy reakcióként')} valami történt / kiderült. Az első tagmondat alanya általában a beszélő. ㅏ, ㅗ után ${korean('-았더니')}, egyébként ${korean('-었더니')}, 하다 → ${korean('했더니')}.`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-았더니/었더니', conjugate: word => withPast(word, '더니') }] },
    examples: [
      [
        text`떡국을 한 그릇 다 먹${bold('었더니')} 배가 불러요.`,
        'Megettem egy egész tál tteokgukot, most tele vagyok.',
        '르-rendhagyó: 부르다 → 불러요',
      ],
      [text`아침에 운동을 ${bold('했더니')} 기분이 좋아요.`, 'Reggel edzettem, és most jó kedvem van.'],
      [text`친구에게 전화${bold('했더니')} 안 받았어요.`, 'Felhívtam a barátomat, de nem vette fel.'],
      [
        text`그 노래를 계속 들${bold('었더니')} 가사를 다 외웠어요.`,
        'Annyit hallgattam azt a dalt, hogy az egész szövegét megtanultam.',
        'ㄷ-rendhagyó: 듣다 → 들었더니',
      ],
    ],
    ownNote: [
      paragraph`A ${reference('4A-10-1', '4A 10. leckében')} tanult ${korean('-더니')} (múlt idő jele nélkül) más személy megfigyelt változását írja le; a ${korean('-았더니/었더니')} a ${bold('saját')} cselekvés következményét.`,
    ],
  },
  {
    lesson: 11,
    point: 1,
    form: '-아/어 가다',
    name: '„egyre …, folyamatosan …” (változás a jövő felé)',
    explanation: [
      paragraph`Ige (vagy ${korean('-아지다')}-s melléknév) után azt fejezi ki, hogy egy cselekvés vagy változás ${bold('folyamatosan halad előre')}, egy végpont felé: „egyre jobban …”, „folyamatosan …”. A ${bold('-아/어')} szabály szerint.`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-아/어 가요', conjugate: word => withAOrEo(word, ' 가요') }] },
    examples: [
      [text`숙제를 거의 다 해 ${bold('가요')}.`, 'Már majdnem kész vagyok a házival.'],
      [text`날씨가 점점 추워져 ${bold('가요')}.`, 'Egyre hidegebb lesz.', 'ㅂ-rendhagyó: 춥다 → 추워져 가요'],
      [text`한국 생활에 조금씩 익숙해져 ${bold('가요')}.`, 'Lassan megszokom a koreai életet.'],
      [text`요리가 다 되어 ${bold('가요')}. 조금만 기다리세요.`, 'Mindjárt kész az étel, várjatok egy kicsit.'],
    ],
    ownNote: [
      paragraph`A ${korean('-아/어 오다')} a múltból a jelen felé tartó folyamatot jelenti: ${korean('10년 동안 한국어를 공부해 왔어요')} „tíz éve tanulok koreaiul (egészen mostanáig)”.`,
    ],
  },
  {
    lesson: 11,
    point: 2,
    form: '-아/어 두다',
    name: '„előre megcsinál, eltesz (későbbre)”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy cselekvés eredményét ${bold('megtartjuk')}, vagy valamit ${bold('előre elvégzünk')}, hogy később felhasználjuk, felkészüljünk. A ${bold('-아/어')} szabály szerint.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-아/어 두세요', conjugate: word => withAOrEo(word, ' 두세요') },
        { header: '-아/어 두면 좋아요', conjugate: word => withAOrEo(word, ' 두면 좋아요') },
      ],
    },
    examples: [
      [
        text`자격증 준비나 외국어 공부도 미리 해 ${bold('두면')} 좋을 거야.`,
        'Jó lesz előre készülni a vizsgákra és nyelvet tanulni.',
      ],
      [text`중요한 내용은 메모해 ${bold('두세요')}.`, 'A fontos dolgokat jegyezd fel.'],
      [text`여행 가기 전에 호텔을 예약해 ${bold('뒀어요')}.`, 'Az utazás előtt lefoglaltam a szállodát.'],
      [
        text`면접 전에 예상 질문을 들어 ${bold('두세요')}.`,
        'Az interjú előtt hallgasd meg a várható kérdéseket.',
        'ㄷ-rendhagyó: 듣다 → 들어 두세요',
      ],
    ],
    ownNote: [
      paragraph`Szinte minden esetben felcserélhető a ${korean('-아/어 놓다')}-val (${reference('3B-04-1')}). Rövid alakok: ${korean('두었어요 → 뒀어요')}.`,
    ],
  },
  {
    lesson: 12,
    point: 1,
    form: '-기는 하다',
    name: '„… az igaz, (de) …” (részleges egyetértés)',
    explanation: [
      paragraph`Ige vagy melléknév után a másik véleményét ${bold('részben elismeri')}, de utána ${bold('enyhén ellentmond')} vagy mást tesz hozzá: „Drága az igaz, de jó minőségű.” Gyakran ${korean('-기는 하는데 / -기는 하지만')}. Ugyanazt a szót ismételjük: ${korean('비싸기는 비싸요')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-기는 해요', conjugate: word => withPlainStem(word, '기는 해요') },
        {
          header: '-기는 하는데/한데',
          conjugate: word => withPlainStem(word, '기는 ') + (word.wordClass === 'verb' ? '하는데' : '한데'),
        },
      ],
    },
    examples: [
      [
        text`가: 유학 준비가 힘들죠? 나: 힘들${bold('기는 해요')}. 그래도 재미있어요.`,
        '– Nehéz a tanulmányi út előkészítése, ugye? – Nehéz, az igaz. De azért érdekes.',
      ],
      [text`이 옷이 예쁘${bold('기는 한데')} 너무 비싸요.`, 'Szép ez a ruha, de túl drága.'],
      [
        text`한국어가 어렵${bold('기는 하지만')} 재미있어요.`,
        'A koreai nehéz, az igaz, de érdekes.',
        '-기 előtt nincs ㅂ-változás: 어렵기는',
      ],
      [text`그 노래를 듣${bold('기는 했는데')} 제목은 몰라요.`, 'Hallottam a dalt, de a címét nem tudom.'],
    ],
  },
  {
    lesson: 12,
    point: 2,
    form: '-는 중이다',
    name: '„épp …-ok, folyamatban van”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy cselekvés ${bold('éppen folyamatban van')}, „épp …-ban/-ben vagyok”. A tő végétől függetlenül ${korean('-는 중이다')}; ㄹ-tőnél az ㄹ kiesik (${korean('만드는 중이에요')}). Főnévvel rövidebben: ${korean('N 중이다')} (${korean('회의 중이에요')}).`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-는 중이에요', conjugate: word => withPlainStem(word, '는 중이에요') }],
    },
    examples: [
      [text`한국으로 유학을 가려고 준비하${bold('는 중이에요')}.`, 'Épp arra készülök, hogy Koreába menjek tanulni.'],
      [text`지금 밥을 먹${bold('는 중이에요')}. 이따가 전화할게요.`, 'Épp eszem. Később visszahívlak.'],
      [text`케이크를 만드${bold('는 중이에요')}.`, 'Épp tortát sütök.', 'ㄹ-tő: 만들다 → 만드는'],
      [text`부장님은 지금 회의 ${bold('중이세요')}.`, 'Az osztályvezető úr épp értekezleten van.'],
    ],
    ownNote: [
      paragraph`A ${korean('-고 있다')} (${reference('1B-11-2')}) hétköznapibb; a ${korean('-는 중이다')} jobban hangsúlyozza, hogy ${bold('éppen most')} zajlik (pl. telefonban: „épp nem érek rá”). Állapotigékkel (${korean('알다, 좋아하다')}) egyik sem használható.`,
    ],
  },
];
export default {
  lessons: {
    1: { korean: '할아버지, 할머니 이야기도 들어 드렸어요', hungarian: 'A nagyszülők történeteit is meghallgattam.' },
    2: {
      korean: '티켓을 구하는 게 쉽지 않았을 텐데 어떻게 구했어요?',
      hungarian: 'Nem lehetett könnyű jegyet szerezni – hogy sikerült?',
      pronunciation: '현실 발음 (고모음화)',
      pronunciationHungarian: 'élőbeszédes kiejtés: ㅗ → ㅜ (-하고요 [하구요], -더라고요 [더라구요])',
    },
    3: { korean: '매운 음식을 진짜 잘 먹는구나', hungarian: 'Hű, tényleg jól bírod a csípőset!' },
    4: {
      korean: '채소부터 씻어서 썰어 놓자',
      hungarian: 'Először mossuk meg és vágjuk fel a zöldséget.',
      pronunciation: '끊어 말하기',
      pronunciationHungarian: 'tagolás, szünet',
    },
    5: {
      korean: '딴생각을 하다가 버스를 놓쳐 버렸어요',
      hungarian: 'Elkalandoztak a gondolataim, és lekéstem a buszt.',
    },
    6: {
      korean: '제가 좀 참을걸 그랬어요',
      hungarian: 'Jobb lett volna, ha visszafogom magam.',
      pronunciation: '구개음화',
      pronunciationHungarian: 'palatalizáció (같이 [가치], 굳이 [구지])',
    },
    7: {
      korean: '캠핑을 같이 간다거나 친목 모임을 해요',
      hungarian: 'Például együtt kempingezünk vagy baráti találkozókat tartunk.',
    },
    8: {
      korean: '일하느라고 바빠서 오랫동안 못 갔어요',
      hungarian: 'A munka miatt sokáig nem tudtam elmenni.',
      pronunciation: '경음화',
      pronunciationHungarian: 'keményedés',
    },
    9: { korean: '두 사람이 많이 부러운 모양이에요', hungarian: 'Úgy tűnik, nagyon irigyli őket.' },
    10: {
      korean: '떡국을 한 그릇 다 먹었더니 배가 불러요',
      hungarian: 'Megettem egy egész tál tteokgukot, most tele vagyok.',
      pronunciation: '비음화',
      pronunciationHungarian: 'orrhangúsodás',
    },
    11: {
      korean: '자격증 준비나 외국어 공부도 미리 해 두면 좋을 거야',
      hungarian: 'Jó lesz előre készülni a vizsgákra és nyelvet tanulni.',
    },
    12: {
      korean: '한국으로 유학을 가려고 준비하는 중이에요',
      hungarian: 'Épp arra készülök, hogy Koreába menjek tanulni.',
      pronunciation: '격음화',
      pronunciationHungarian: 'hehezetesedés',
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
