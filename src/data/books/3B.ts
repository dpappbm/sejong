import { withAOrEo, withPast, withEu, withPlainStem, plainStyleStatement, type Word } from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';

const korean = (text: string) => `<span class="korean">${text}</span>`;
const vocabularyGrammarPageOf = (lesson: number, point: number) => 26 + 2 * (lesson - 1) + (point - 1), studentBookPageOf = (lesson: number, point: number) => 16 + 8 * (lesson - 1) + (point - 1);
const isItdaOrEopda = (word: Word) => /(있|없)다$/.test(word.dictionaryForm);
const presentModifier = (word: Word, ending: string) => (word.wordClass === 'verb' || isItdaOrEopda(word)) ? withPlainStem(word, '는' + ending) : withEu(word, 'ㄴ' + ending);

const points: PointSource[] = [
  {
    lesson: 1, point: 1, form: '-아도/어도', name: '„még ha … is; hiába …”',
    explanation: `<p>Ige vagy melléknév után azt fejezi ki, hogy az első részben mondott tény vagy feltételezés <b>ellenére</b> a várttal ellentétes dolog történik: „Hiába esik, elmegyek.” Gyakran ${korean('아무리')} („bármennyire”) erősíti. A <b>-아/어</b> szabály szerint (${korean('가도, 먹어도, 해도')}). Főnévvel: ${korean('N(이)라도')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-아도/어도', conjugate: word => withAOrEo(word, '도') }] },
    examples: [['아무리 바<b>빠도</b> 주말에는 부모님께 전화해요.', 'Akármilyen elfoglalt vagyok, hétvégén felhívom a szüleimet.', '으-kiesés: 바쁘다 → 바빠도'], ['비가 <b>와도</b> 축구를 할 거예요.', 'Még ha esik is, focizni fogunk.'], ['약을 먹<b>어도</b> 감기가 안 나아요.', 'Hiába szedem a gyógyszert, nem múlik a megfázás.'], ['아무리 들<b>어도</b> 무슨 말인지 모르겠어요.', 'Akárhányszor hallgatom, nem értem, mit mond.', 'ㄷ-rendhagyó: 듣다 → 들어도']],
    ownNote: `<p>A 2B 6. leckében tanult ${korean('-아도/어도 되다')} (engedély) is erre épül: „ha megcsinálod is, rendben van”.</p>`,
  },
  {
    lesson: 1, point: 2, form: '-아/어 드리다', name: '„megteszi (tisztelt) valakinek”',
    explanation: `<p>A ${korean('-아/어 주다')} (2B 4. lecke) <b>tiszteleti</b> párja: akkor használjuk, ha a cselekvést <b>idősebb, tisztelt személy javára</b> végezzük. A címzett gyakran ${korean('께')} vagy ${korean('에게')} partikulát kap. A <b>-아/어</b> szabály szerint.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-아/어 드릴게요', conjugate: word => withAOrEo(word, ' 드릴게요') }, { header: 'Múlt: -아/어 드렸어요', conjugate: word => withAOrEo(word, ' 드렸어요') }] },
    examples: [['할아버지, 할머니 이야기도 들어 <b>드렸어요</b>.', 'A nagyszülők történeteit is meghallgattam.', 'ㄷ-rendhagyó: 듣다 → 들어 드렸어요'], ['어머니께 편지를 써 <b>드렸어요</b>.', 'Levelet írtam édesanyámnak.'], ['제가 가방을 들어 <b>드릴게요</b>.', 'Majd én viszem a táskáját.'], ['할머니 댁에 가서 청소를 도와 <b>드렸어요</b>.', 'Elmentem a nagymamámhoz, és segítettem neki takarítani.', 'ㅂ-rendhagyó: 돕다 → 도와 드렸어요']],
    ownNote: `<p>Felajánlás udvariasan: ${korean('-아/어 드릴까요?')} („…-jak Önnek?”). A ${korean('주다')} „ad” tiszteleti párja önállóan is ${korean('드리다')}: ${korean('선물을 드렸어요')}.</p>`,
  },
  {
    lesson: 2, point: 1, form: '-(으)ㄹ까 봐', name: '„attól tartva, hogy …; nehogy …”',
    explanation: `<p>Ige vagy melléknév után azt fejezi ki, hogy a beszélő <b>aggódik, fél</b> egy lehetséges helyzettől, és ezért tesz (vagy nem tesz) valamit. A második tagmondat a megtett óvintézkedés. ${korean('-(으)ㄹ까 봐서')} alakban is.</p>
<p><b>받침</b> után: <b>-을까 봐</b>, magánhangzó után: <b>-ㄹ까 봐</b>, ㄹ-tőnél: ${korean('멀까 봐')}. Múltra: ${korean('-았을까/었을까 봐')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)ㄹ까 봐', conjugate: word => withEu(word, 'ㄹ까 봐') }, { header: 'Múlt', conjugate: word => withPast(word, '을까 봐') }] },
    examples: [['표가 없<b>을까 봐</b> 미리 예매했어요.', 'Attól tartva, hogy nem lesz jegy, előre megvettem.'], ['늦<b>을까 봐</b> 택시를 탔어요.', 'Féltem, hogy elkések, ezért taxiba ültem.'], ['밖이 <b>추울까 봐</b> 코트를 가져왔어요.', 'Féltem, hogy kint hideg lesz, ezért hoztam kabátot.', 'ㅂ-rendhagyó: 춥다 → 추울까 봐'], ['아이가 깰<b>까 봐</b> 조용히 들어왔어요.', 'Csendben jöttem be, nehogy felébredjen a gyerek.']],
    ownNote: `<p>A második tagmondat nem lehet felszólítás vagy jövő idejű terv (${korean('-(으)세요, -(으)ㄹ 거예요')}); a félelem ténylegesen befolyásolta a cselekvést. ${korean('-(으)ㄹ까 봐 걱정이에요')} „attól félek, hogy…”.</p>`,
  },
  {
    lesson: 2, point: 2, form: '-(으)ㄹ 텐데', name: '„biztos …, (pedig / és) …” (feltételezés + folytatás)',
    explanation: `<p>Ige vagy melléknév után a beszélő <b>feltételezését</b> mondja ki, és ehhez kapcsolódóan folytatja: kérdés, javaslat, aggodalom. „Biztos fáradt vagy, pihenj.”</p>
<p><b>받침</b> után: <b>-을 텐데</b>, magánhangzó után: <b>-ㄹ 텐데</b>. Múltra: ${korean('-았을/었을 텐데')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)ㄹ 텐데', conjugate: word => withEu(word, 'ㄹ 텐데') }, { header: 'Múlt: -았을/었을 텐데', conjugate: word => withPast(word, '을 텐데') }] },
    examples: [['티켓을 구하는 게 쉽지 않<b>았을 텐데</b> 어떻게 구했어요?', 'Nem lehetett könnyű jegyet szerezni – hogy sikerült?'], ['많이 피곤<b>할 텐데</b> 좀 쉬세요.', 'Biztos nagyon fáradt vagy, pihenj egy kicsit.'], ['밖에 <b>추울 텐데</b> 따뜻하게 입고 나가세요.', 'Kint biztos hideg van, öltözz fel melegen.', 'ㅂ-rendhagyó: 춥다 → 추울 텐데'], ['지금 출발하면 길이 막<b>힐 텐데</b>요.', 'Ha most indulsz, biztos dugó lesz.']],
    ownNote: `<p>Mondatvégen (${korean('-(으)ㄹ 텐데요')}) aggodalmat, sajnálkozást fejez ki. A 4B 4. lecke ${korean('-았을/었을 텐데')} alakja: „pedig …-t volna” (megvalósulatlan múlt).</p>`,
  },
  {
    lesson: 3, point: 1, form: '-거든요', name: '„merthogy …, ugyanis …” (magyarázó ok)',
    explanation: `<p>Ige vagy melléknév után olyan <b>okot vagy hátteret</b> ad meg, amit <b>csak a beszélő tud</b>, magától értetődő természetességgel: „Merthogy …”. A tő végétől függetlenül ${korean('-거든요')}; múlt: ${korean('-았거든요/었거든요')}.</p>
<p>Különbség: ${korean('-거든요')} = csak én tudom az okot; ${korean('-잖아요')} = mindketten tudjuk.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-거든요', conjugate: word => withPlainStem(word, '거든요') }, { header: 'Múlt: -았거든요/었거든요', conjugate: word => withPast(word, '거든요') }] },
    examples: [['저는 매운 음식을 잘 먹어요. 어렸을 때부터 많이 먹었<b>거든요</b>.', 'Jól bírom a csípőset. Gyerekkorom óta sokat eszem.'], ['오늘은 못 가요. 약속이 있<b>거든요</b>.', 'Ma nem tudok menni. Ugyanis programom van.'], ['창문 좀 열어도 돼요? 좀 덥<b>거든요</b>.', 'Kinyithatom az ablakot? Ugyanis kicsit meleg van.', '-거든요 előtt nincs ㅂ-változás: 덥거든요'], ['요즘 이 노래만 들어요. 정말 좋<b>거든요</b>.', 'Mostanában csak ezt a dalt hallgatom. Tudniillik nagyon jó.']],
    ownNote: `<p>Beszélgetés elején is: új téma bevezetése, amire folytatás jön: ${korean('제가 다음 주에 이사하거든요. 그래서…')}. Idősebbnek túl sokszor mondva tiszteletlennek hathat.</p>`,
  },
  {
    lesson: 3, point: 2, form: '-는구나/구나', name: '„ó, szóval …!” (most észrevett tény, tegező)',
    explanation: `<p>A beszélő <b>épp most</b> lát, hall vagy ért meg valamit, és erre <b>rácsodálkozik</b>. Magában mondva, fiatalabbnak vagy közeli barátnak (tegező stílus).</p>
<p><b>Ige</b>: ${korean('-는구나')} (ㄹ kiesik: ${korean('사는구나')}), <b>melléknév</b> és ${korean('있다/없다')}: ${korean('-구나')} (a ${korean('있다/없다')} lehet ${korean('-는구나')} is); <b>főnév</b>: ${korean('-(이)구나')}; <b>múlt</b>: ${korean('-았구나/었구나')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => word.wordClass === 'verb' ? withPlainStem(word, '는구나') : withPlainStem(word, '구나') }, { header: 'Múlt: -았구나/었구나', conjugate: word => withPast(word, '구나') }] },
    examples: [['매운 음식을 진짜 잘 먹<b>는구나</b>!', 'Hű, tényleg jól bírod a csípőset!'], ['벌써 봄이 왔<b>구나</b>.', 'Ó, már itt a tavasz.'], ['오늘 정말 <b>덥구나</b>.', 'Ma aztán meleg van!', '-구나 előtt nincs ㅂ-változás: 덥구나'], ['네가 이 케이크를 만<b>들었구나</b>!', 'Szóval te sütötted ezt a tortát!']],
    ownNote: `<p>Udvarias változata ${korean('-는군요/군요')}; a ${korean('-네요')} (2B 5. lecke) hasonló, de jobban a hallgatóhoz szól. A ${korean('-구나')} gyakran félig magának mondott felismerés.</p>`,
  },
  {
    lesson: 4, point: 1, form: '-아/어 놓다', name: '„elkészít, megcsinál (és úgy hagy)”',
    explanation: `<p>Ige után azt fejezi ki, hogy egy cselekvést <b>befejeztünk</b>, és az <b>eredménye megmarad</b>, úgy is hagyjuk; gyakran előkészületként. A <b>-아/어</b> szabály szerint (${korean('사 놓다, 씻어 놓다, 해 놓다')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-아/어 놓았어요', conjugate: word => withAOrEo(word, ' 놓았어요') }, { header: 'Javaslat: -아/어 놓자', conjugate: word => withAOrEo(word, ' 놓자') }] },
    examples: [['채소부터 씻어서 썰어 <b>놓자</b>.', 'Először mossuk meg és vágjuk fel a zöldséget.'], ['손님이 오기 전에 음식을 만들어 <b>놓았어요</b>.', 'A vendégek érkezése előtt elkészítettem az ételt.'], ['창문을 열어 <b>놓았어요</b>.', 'Kinyitottam (és nyitva hagytam) az ablakot.'], ['재료를 미리 사 <b>놓을게요</b>.', 'Előre megveszem a hozzávalókat.'], ['밥을 미리 지<b>어 놓았어요</b>.', 'Előre megfőztem a rizst.', 'ㅅ-rendhagyó: 짓다 → 지어 놓다']],
    ownNote: `<p>Beszédben gyakran rövidül: ${korean('놓아요 → 놔요, 놓았어요 → 놨어요')}. Nagyon közeli rokona a ${korean('-아/어 두다')} (3B 11. lecke); a ${korean('두다')} inkább a hosszabb megtartást, a ${korean('놓다')} inkább a kész állapotot hangsúlyozza.</p>`,
  },
  {
    lesson: 4, point: 2, form: '-(으)ㄴ 다음에', name: '„miután …, utána …”',
    explanation: `<p>Ige után azt fejezi ki, hogy egy cselekvést <b>először</b> elvégzünk, és <b>utána</b> jön a következő; különösen lépések, receptek, utasítások sorrendjében. Rokon kifejezések: ${korean('-고 나서')}, ${korean('-(으)ㄴ 후에')}.</p>
<p><b>받침</b> után: <b>-은 다음에</b>, magánhangzó után: <b>-ㄴ 다음에</b>, ㄹ-tőnél az ㄹ kiesik: ${korean('만든 다음에')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄴ 다음에', conjugate: word => withEu(word, 'ㄴ 다음에') }] },
    examples: [['채소를 씻<b>은 다음에</b> 썰어요.', 'Miután megmostuk a zöldséget, felvágjuk.'], ['물이 끓<b>은 다음에</b> 라면을 넣으세요.', 'Miután felforrt a víz, tegye bele a ramyeont.'], ['소스를 만<b>든 다음에</b> 고기에 부어요.', 'Miután elkészült a szósz, ráöntjük a húsra.', 'ㄹ-tő: 만들다 → 만든'], ['설명을 들<b>은 다음에</b> 시작하세요.', 'A magyarázat meghallgatása után kezdjenek hozzá.', 'ㄷ-rendhagyó: 듣다 → 들은']],
  },
  {
    lesson: 5, point: 1, form: '-자마자', name: '„amint …, (azonnal) …”',
    explanation: `<p>Ige után azt fejezi ki, hogy az első történés után <b>rögtön, azonnal</b> jön a második. A tő végétől függetlenül ${korean('-자마자')}. Melléknév a ${korean('-아지다/어지다')}-val igévé alakítva állhat előtte: ${korean('추워지자마자')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-자마자', conjugate: word => withPlainStem(word, '자마자') }] },
    examples: [['집에 도착하<b>자마자</b> 잠이 들었어요.', 'Amint hazaértem, elaludtam.'], ['수업이 끝나<b>자마자</b> 친구에게 전화했어요.', 'Amint vége lett az órának, felhívtam a barátomat.'], ['그 소식을 듣<b>자마자</b> 달려왔어요.', 'Amint meghallottam a hírt, odarohantam.', '-자 előtt nincs ㄷ-változás: 듣자마자'], ['날씨가 추워지<b>자마자</b> 감기에 걸렸어요.', 'Amint hideg lett, megfáztam.']],
    ownNote: `<p>Elé nem kerül múlt idő: ${korean('도착하자마자')}, nem ${korean('도착했자마자')}; az időt a mondat vége adja.</p>`,
  },
  {
    lesson: 5, point: 2, form: '-아/어 버리다', name: '„teljesen el-/meg-/ki- …” (befejezettség, megkönnyebbülés, sajnálat)',
    explanation: `<p>Ige után azt fejezi ki, hogy egy cselekvés <b>teljesen befejeződött</b>, semmi nem maradt belőle. Gyakran a beszélő érzését is mutatja: <b>megkönnyebbülést</b> (letudtam), vagy <b>sajnálatot</b> (sajnos megtörtént). A <b>-아/어</b> szabály szerint.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-아/어 버렸어요', conjugate: word => withAOrEo(word, ' 버렸어요') }] },
    examples: [['딴생각을 하다가 버스를 놓쳐 <b>버렸어요</b>.', 'Elkalandoztak a gondolataim, és lekéstem a buszt.'], ['배가 고파서 케이크를 다 먹어 <b>버렸어요</b>.', 'Éhes voltam, és megettem az egész tortát.'], ['숙제를 빨리 해 <b>버리고</b> 놀러 가자.', 'Csináljuk meg gyorsan a házit, aztán menjünk játszani.'], ['비밀번호를 잊어 <b>버렸어요</b>.', 'Elfelejtettem a jelszót.'], ['그 이야기를 들어 <b>버렸으니까</b> 이제 모르는 척할 수 없어요.', 'Már meghallottam azt a történetet, most már nem tehetek úgy, mintha nem tudnám.', 'ㄷ-rendhagyó: 듣다 → 들어 버리다']],
  },
  {
    lesson: 6, point: 1, form: '-았었/었었-', name: 'régmúlt: „valaha …, de már nem”',
    explanation: `<p>Ige vagy melléknév után azt fejezi ki, hogy egy helyzet <b>a múltban fennállt, de már nem tart</b>: „régen …, (de most már nem)”. ㅏ, ㅗ után ${korean('-았었-')}, egyébként ${korean('-었었-')}, 하다 → ${korean('했었-')}. Főnévvel: 받침 után ${korean('-이었었-')}, magánhangzó után ${korean('-였었-')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-았었어요/었었어요', conjugate: word => withPast(word, '었어요') }] },
    examples: [['작년에는 머리가 길<b>었었어요</b>.', 'Tavaly hosszú hajam volt (most már nem).'], ['어렸을 때 부산에 살<b>았었어요</b>.', 'Gyerekkoromban Puszanban laktam.'], ['그 식당에 가 봤는데 문을 닫<b>았었어요</b>.', 'Elmentem abba az étterembe, de (akkor) zárva volt.'], ['예전에는 이 노래를 자주 들<b>었었어요</b>.', 'Régen gyakran hallgattam ezt a dalt.', 'ㄷ-rendhagyó: 듣다 → 들었었어요']],
    ownNote: `<p>${korean('갔어요')} „elment (és lehet, hogy még ott van)”, ${korean('갔었어요')} „elment, de már visszajött / már nem igaz”. Magyarul gyakran a „régen”, „valamikor” szóval adjuk vissza.</p>`,
  },
  {
    lesson: 6, point: 2, form: '-(으)ㄹ걸 그랬다', name: '„jobb lett volna, ha …” (megbánás)',
    explanation: `<p>Ige után a beszélő <b>megbánását</b> fejezi ki valami miatt, amit <b>nem tett meg</b>: „Bárcsak …-tam volna!”. Tagadva: ${korean('-지 말걸 그랬다')} „bárcsak ne tettem volna”. Beszédben gyakran csak ${korean('-(으)ㄹ걸')}.</p>
<p><b>받침</b> után: <b>-을걸 그랬다</b>, magánhangzó után: <b>-ㄹ걸 그랬다</b>, ㄹ-tőnél: ${korean('만들걸')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ걸 그랬어요', conjugate: word => withEu(word, 'ㄹ걸 그랬어요') }, { header: '-지 말걸 그랬어요', conjugate: word => withPlainStem(word, '지 말걸 그랬어요') }] },
    examples: [['제가 좀 참<b>을걸 그랬어요</b>.', 'Jobb lett volna, ha visszafogom magam.'], ['우산을 가져<b>올걸 그랬어요</b>.', 'Bárcsak hoztam volna esernyőt.'], ['그 말을 하<b>지 말걸 그랬어요</b>.', 'Bárcsak ne mondtam volna ezt.'], ['선생님 말씀을 잘 들<b>을걸 그랬어요</b>.', 'Jobban oda kellett volna figyelnem a tanár szavaira.', 'ㄷ-rendhagyó: 듣다 → 들을걸']],
    ownNote: `<p>Kiejtése: [-ㄹ껄]. Hasonló, de erősebb: ${korean('-았어야/었어야 했는데')} (4B 4. lecke).</p>`,
  },
  {
    lesson: 7, point: 1, form: '-아/어 가지고', name: '„…, és ezért / és azzal …” (beszélt nyelvi ok, sorrend)',
    explanation: `<p>Ige vagy melléknév után azt fejezi ki, hogy az első rész a második <b>oka</b>, vagy hogy az első cselekvés eredményével folytatjuk. A ${korean('-아서/어서')} <b>beszélt nyelvi</b>, lazább párja. A <b>-아/어</b> szabály szerint.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-아/어 가지고', conjugate: word => withAOrEo(word, ' 가지고') }] },
    examples: [['너무 바<b>빠 가지고</b> 연락을 못 했어.', 'Annyira elfoglalt voltam, hogy nem tudtam jelentkezni.'], ['날씨가 <b>추워 가지고</b> 밖에 안 나갔어요.', 'Olyan hideg volt, hogy ki se mentem.', 'ㅂ-rendhagyó: 춥다 → 추워 가지고'], ['돈을 모<b>아 가지고</b> 노트북을 샀어요.', 'Összegyűjtöttem a pénzt, és vettem belőle egy laptopot.'], ['김밥을 만들<b>어 가지고</b> 소풍을 갔어요.', 'Csináltam kimbapot, és elvittem a kirándulásra.']],
    ownNote: `<p>A ${korean('-아서/어서')} megkötései itt is érvényesek: elé nem kerül múlt idő, és utána nem állhat felszólítás. Írásban, hivatalos helyzetben kerüljük.</p>`,
  },
  {
    lesson: 7, point: 2, form: '-는다거나/ㄴ다거나', name: '„például … vagy …” (példák felsorolása)',
    explanation: `<p>Két vagy több <b>példát sorol fel</b>, amelyek közül bármelyik szóba jöhet: „például kempingezünk, vagy …”. Gyakran ${korean('-는다거나 -는다거나 하다')} szerkezetben.</p>
<ul><li><b>Ige</b>: 받침 után ${korean('-는다거나')}, magánhangzó után ${korean('-ㄴ다거나')} (ㄹ kiesik: ${korean('만든다거나')})</li><li><b>Melléknév</b>: ${korean('-다거나')}</li><li><b>Főnév</b>: ${korean('(이)라거나')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-는다거나/ㄴ다거나/다거나', conjugate: word => plainStyleStatement(word) + '거나' }] },
    examples: [['캠핑을 같이 간<b>다거나</b> 친목 모임을 해요.', 'Például együtt kempingezünk vagy baráti találkozókat tartunk.'], ['주말에는 영화를 본<b>다거나</b> 음악을 듣<b>는다거나</b> 해요.', 'Hétvégén például filmet nézek vagy zenét hallgatok.', '-는다 előtt nincs ㄷ-változás: 듣는다거나'], ['방이 너무 좁<b>다거나</b> 어둡<b>다거나</b> 하면 말씀하세요.', 'Ha például túl szűk vagy sötét a szoba, szóljon.'], ['떡볶이<b>라거나</b> 김밥 같은 분식을 좋아해요.', 'Szeretem a gyorsételeket, például a tokpokkit vagy a kimbapot.']],
    ownNote: `<p>A ${korean('-거나')} (2A 2. lecke) egyszerű „vagy”; a ${korean('-는다거나')} hozzáteszi, hogy ezek csak <b>példák</b> a sok lehetőség közül.</p>`,
  },
  {
    lesson: 8, point: 1, form: '-느라고', name: '„mivel épp …-tam (ezért nem tudtam …)”',
    explanation: `<p>Ige után azt fejezi ki, hogy az első cselekvés <b>miatt</b> lett egy <b>negatív következmény</b> (nem tudtam, késtem, fáradt lettem…). A két cselekvés <b>egy időben</b> zajlik, és az alanyuk azonos. A tő végétől függetlenül ${korean('-느라고')}; ㄹ-tőnél az ㄹ kiesik (${korean('노느라고')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-느라고', conjugate: word => withPlainStem(word, '느라고') }] },
    examples: [['일하<b>느라고</b> 바빠서 오랫동안 못 갔어요.', 'A munka miatt annyira elfoglalt voltam, hogy sokáig nem tudtam elmenni.'], ['게임을 하<b>느라고</b> 숙제를 못 했어요.', 'Játszottam, ezért nem csináltam meg a házit.'], ['음악을 듣<b>느라고</b> 전화 소리를 못 들었어요.', 'Zenét hallgattam, ezért nem hallottam a telefont.', '-느라고 előtt nincs ㄷ-változás: 듣느라고'], ['친구들과 노<b>느라고</b> 늦었어요.', 'A barátaimmal lógtam, ezért késtem el.', 'ㄹ-tő: 놀다 → 노느라고']],
    correctIncorrect: [{ correct: '공부하느라고 못 잤어요.', translation: 'Tanultam, ezért nem tudtam aludni.' }, { incorrect: '공부했느라고 못 잤어요.', reason: 'elé nem kerül múlt idő' }, { incorrect: '비가 오느라고 못 갔어요.', reason: 'csak szándékos cselekvés lehet, nem időjárás' }],
    ownNote: `<p>Melléknévvel nem áll, és utána nem jöhet felszólítás vagy javaslat. Bocsánatkérésben gyakori: ${korean('준비하느라고 늦었어요. 죄송해요.')}</p>`,
  },
  {
    lesson: 8, point: 2, form: '-기는요', name: '„ugyan már, dehogy …” (szerény tagadás)',
    explanation: `<p>Ige vagy melléknév után a másik állítását <b>finoman, szerényen tagadja</b>; főleg <b>dicséretre</b> adott válaszként, illetve bocsánatkérésre, köszönetre: „Ugyan, dehogy!”. A tő végétől függetlenül ${korean('-기는요')}; főnévvel ${korean('-은요/는요')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-기는요', conjugate: word => withPlainStem(word, '기는요') }] },
    examples: [['가: 한국어를 정말 잘하시네요. 나: 잘하<b>기는요</b>. 아직 멀었어요.', '– Nagyon jól beszél koreaiul! – Ugyan már, még messze vagyok tőle.'], ['가: 음식이 정말 맛있어요. 나: 맛있<b>기는요</b>. 그냥 간단하게 만들었어요.', '– Nagyon finom az étel! – Ugyan, csak gyorsan összedobtam.'], ['가: 많이 바쁘시죠? 나: 바쁘<b>기는요</b>.', '– Biztos nagyon elfoglalt. – Dehogy.'], ['가: 도와줘서 고마워요. 나: 고맙<b>기는요</b>.', '– Köszönöm a segítséget! – Ugyan, nincs mit.', '-기 előtt nincs ㅂ-változás: 고맙기는요']],
    ownNote: `<p>Barátok közt: ${korean('-기는')} (${korean('잘하기는!')}). Hangnemtől függően ellentmondás is lehet: ${korean('가깝기는요, 엄청 멀어요')} „Közel? Ugyan, nagyon messze van!”</p>`,
  },
  {
    lesson: 9, point: 1, form: '-는/(으)ㄴ 모양이다', name: '„úgy tűnik, hogy …” (következtetés tényekből)',
    explanation: `<p>Egy <b>tény vagy helyzet alapján következtetünk</b>: „úgy látszik, …”. Első személyről nem mondjuk.</p>
<ul><li><b>Jelen</b>: ige és ${korean('있다/없다')} ${korean('-는 모양이다')}; melléknév 받침 után ${korean('-은')}, magánhangzó után ${korean('-ㄴ 모양이다')}</li><li><b>Múlt</b> (ige): ${korean('-(으)ㄴ 모양이다')}</li><li>Főnév: ${korean('-인 모양이다')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => presentModifier(word, ' 모양이에요') }, { header: 'Múlt (ige)', conjugate: word => word.wordClass === 'verb' ? withEu(word, 'ㄴ 모양이에요') : null }] },
    examples: [['두 사람이 많이 부러<b>운 모양이에요</b>.', 'Úgy tűnik, nagyon irigyli őket.', 'ㅂ-rendhagyó: 부럽다 → 부러운'], ['불이 꺼져 있어요. 다들 집에 <b>간 모양이에요</b>.', 'Le van kapcsolva a villany. Úgy látszik, mindenki hazament.'], ['밖에 비가 오<b>는 모양이에요</b>. 우산을 쓴 사람이 많아요.', 'Úgy tűnik, esik: sokan tartanak esernyőt.'], ['마크 씨가 오늘 기분이 좋<b>은 모양이에요</b>.', 'Mark ma úgy tűnik, jókedvű.']],
    ownNote: `<p>Közel áll a ${korean('-나/(으)ㄴ가 보다')} (3A 2. lecke) jelentéséhez; a ${korean('모양이다')} kicsit írottabb, tárgyilagosabb.</p>`,
  },
  {
    lesson: 9, point: 2, form: '같이', name: '„mint, -ként” (hasonlóság)', conjugable: false,
    explanation: `<p>Főnév után azt fejezi ki, hogy valami az adott főnév <b>jellegzetes tulajdonságához hasonló</b>: ${korean('천사같이 착해요')} „angyalian jószívű”. Legtöbbször felcserélhető a ${korean('처럼')}-mel (2B 12. lecke), de bizonyos <b>állandósult hasonlatokban</b> csak az egyik természetes: ${korean('불같이 화를 내다')} „dühbe gurul”, de ${korean('새처럼 날고 싶다')} „repülni szeretnék, mint a madár”.</p>`,
    examples: [['그 사람은 천사<b>같이</b> 착해요.', 'Angyalian jószívű.'], ['아버지가 불<b>같이</b> 화를 내셨어요.', 'Apa dühbe gurult (szó szerint: tűzként).'], ['오늘은 봄날<b>같이</b> 따뜻해요.', 'Ma olyan meleg van, mint tavasszal.'], ['우리 언니는 모델<b>같이</b> 키가 커요.', 'A nővérem magas, mint egy modell.']],
    ownNote: `<p>Vigyázat: a ${korean('같이')} „együtt” jelentésben külön szó (${korean('친구하고 같이 가요')}), itt viszont <b>partikula</b>, egybeírjuk a főnévvel. Jelzőként: ${korean('N 같은 N')}.</p>`,
  },
  {
    lesson: 10, point: 1, form: '-던데요', name: '„azt láttam (tapasztaltam), hogy … ám!” (felidézett élmény, csodálkozva)',
    explanation: `<p>Ige vagy melléknév után a beszélő a <b>múltban közvetlenül átélt jelenetet</b> idézi fel, és <b>csodálkozva, elismerően</b> beszél róla: „Láttam, tényleg nagyon …!”. A tő végétől függetlenül ${korean('-던데요')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-던데요', conjugate: word => withPlainStem(word, '던데요') }, { header: 'Múlt: -았던데요/었던데요', conjugate: word => withPast(word, '던데요') }] },
    examples: [['그 식당 떡국이 정말 맛있<b>던데요</b>.', 'Annak az étteremnek a tteokgukja tényleg nagyon finom volt!'], ['마크 씨가 노래를 정말 잘하<b>던데요</b>.', 'Mark tényleg nagyon jól énekel (hallottam)!'], ['어제 가 보니까 사람이 정말 많<b>던데요</b>.', 'Tegnap ott jártam, és tényleg rengeteg ember volt.'], ['제주도는 바람이 많이 불<b>던데요</b>.', 'Dzsedzsun aztán erősen fúj a szél.'], ['어제 가 보니까 거기는 정말 덥<b>던데요</b>.', 'Tegnap ott jártam, és tényleg nagyon meleg volt!', '-던 előtt nincs ㅂ-változás: 덥던데요']],
    ownNote: `<p>A ${korean('-더라고요')} (3A 11. lecke) közeli rokona; a ${korean('-던데요')} jobban kifejezi a meglepetést, és nyitva hagyja a beszélgetést (a hallgató reakcióját várja).</p>`,
  },
  {
    lesson: 10, point: 2, form: '-았더니/었더니', name: '„amikor …-tam, (erre az lett, hogy) …”',
    explanation: `<p>Ige után azt fejezi ki, hogy a beszélő <b>valamit megtett</b>, és ennek <b>eredményeként vagy reakcióként</b> valami történt / kiderült. Az első tagmondat alanya általában a beszélő. ㅏ, ㅗ után ${korean('-았더니')}, egyébként ${korean('-었더니')}, 하다 → ${korean('했더니')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-았더니/었더니', conjugate: word => withPast(word, '더니') }] },
    examples: [['떡국을 한 그릇 다 먹<b>었더니</b> 배가 불러요.', 'Megettem egy egész tál tteokgukot, most tele vagyok.', '르-rendhagyó: 부르다 → 불러요'], ['아침에 운동을 <b>했더니</b> 기분이 좋아요.', 'Reggel edzettem, és most jó kedvem van.'], ['친구에게 전화<b>했더니</b> 안 받았어요.', 'Felhívtam a barátomat, de nem vette fel.'], ['그 노래를 계속 들<b>었더니</b> 가사를 다 외웠어요.', 'Annyit hallgattam azt a dalt, hogy az egész szövegét megtanultam.', 'ㄷ-rendhagyó: 듣다 → 들었더니']],
    ownNote: `<p>A 4A 10. leckében tanult ${korean('-더니')} (múlt idő jele nélkül) más személy megfigyelt változását írja le; a ${korean('-았더니/었더니')} a <b>saját</b> cselekvés következményét.</p>`,
  },
  {
    lesson: 11, point: 1, form: '-아/어 가다', name: '„egyre …, folyamatosan …” (változás a jövő felé)',
    explanation: `<p>Ige (vagy ${korean('-아지다')}-s melléknév) után azt fejezi ki, hogy egy cselekvés vagy változás <b>folyamatosan halad előre</b>, egy végpont felé: „egyre jobban …”, „folyamatosan …”. A <b>-아/어</b> szabály szerint.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-아/어 가요', conjugate: word => withAOrEo(word, ' 가요') }] },
    examples: [['숙제를 거의 다 해 <b>가요</b>.', 'Már majdnem kész vagyok a házival.'], ['날씨가 점점 추워져 <b>가요</b>.', 'Egyre hidegebb lesz.', 'ㅂ-rendhagyó: 춥다 → 추워져 가요'], ['한국 생활에 조금씩 익숙해져 <b>가요</b>.', 'Lassan megszokom a koreai életet.'], ['요리가 다 되어 <b>가요</b>. 조금만 기다리세요.', 'Mindjárt kész az étel, várjatok egy kicsit.']],
    ownNote: `<p>A ${korean('-아/어 오다')} a múltból a jelen felé tartó folyamatot jelenti: ${korean('10년 동안 한국어를 공부해 왔어요')} „tíz éve tanulok koreaiul (egészen mostanáig)”.</p>`,
  },
  {
    lesson: 11, point: 2, form: '-아/어 두다', name: '„előre megcsinál, eltesz (későbbre)”',
    explanation: `<p>Ige után azt fejezi ki, hogy egy cselekvés eredményét <b>megtartjuk</b>, vagy valamit <b>előre elvégzünk</b>, hogy később felhasználjuk, felkészüljünk. A <b>-아/어</b> szabály szerint.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-아/어 두세요', conjugate: word => withAOrEo(word, ' 두세요') }, { header: '-아/어 두면 좋아요', conjugate: word => withAOrEo(word, ' 두면 좋아요') }] },
    examples: [['자격증 준비나 외국어 공부도 미리 해 <b>두면</b> 좋을 거야.', 'Jó lesz előre készülni a vizsgákra és nyelvet tanulni.'], ['중요한 내용은 메모해 <b>두세요</b>.', 'A fontos dolgokat jegyezd fel.'], ['여행 가기 전에 호텔을 예약해 <b>뒀어요</b>.', 'Az utazás előtt lefoglaltam a szállodát.'], ['면접 전에 예상 질문을 들어 <b>두세요</b>.', 'Az interjú előtt hallgasd meg a várható kérdéseket.', 'ㄷ-rendhagyó: 듣다 → 들어 두세요']],
    ownNote: `<p>Szinte minden esetben felcserélhető a ${korean('-아/어 놓다')}-val (3B 4. lecke). Rövid alakok: ${korean('두었어요 → 뒀어요')}.</p>`,
  },
  {
    lesson: 12, point: 1, form: '-기는 하다', name: '„… az igaz, (de) …” (részleges egyetértés)',
    explanation: `<p>Ige vagy melléknév után a másik véleményét <b>részben elismeri</b>, de utána <b>enyhén ellentmond</b> vagy mást tesz hozzá: „Drága az igaz, de jó minőségű.” Gyakran ${korean('-기는 하는데 / -기는 하지만')}. Ugyanazt a szót ismételjük: ${korean('비싸기는 비싸요')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-기는 해요', conjugate: word => withPlainStem(word, '기는 해요') }, { header: '-기는 하는데/한데', conjugate: word => withPlainStem(word, '기는 ') + (word.wordClass === 'verb' ? '하는데' : '한데') }] },
    examples: [['가: 유학 준비가 힘들죠? 나: 힘들<b>기는 해요</b>. 그래도 재미있어요.', '– Nehéz a tanulmányi út előkészítése, ugye? – Nehéz, az igaz. De azért érdekes.'], ['이 옷이 예쁘<b>기는 한데</b> 너무 비싸요.', 'Szép ez a ruha, de túl drága.'], ['한국어가 어렵<b>기는 하지만</b> 재미있어요.', 'A koreai nehéz, az igaz, de érdekes.', '-기 előtt nincs ㅂ-változás: 어렵기는'], ['그 노래를 듣<b>기는 했는데</b> 제목은 몰라요.', 'Hallottam a dalt, de a címét nem tudom.']],
  },
  {
    lesson: 12, point: 2, form: '-는 중이다', name: '„épp …-ok, folyamatban van”',
    explanation: `<p>Ige után azt fejezi ki, hogy egy cselekvés <b>éppen folyamatban van</b>, „épp …-ban/-ben vagyok”. A tő végétől függetlenül ${korean('-는 중이다')}; ㄹ-tőnél az ㄹ kiesik (${korean('만드는 중이에요')}). Főnévvel rövidebben: ${korean('N 중이다')} (${korean('회의 중이에요')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-는 중이에요', conjugate: word => withPlainStem(word, '는 중이에요') }] },
    examples: [['한국으로 유학을 가려고 준비하<b>는 중이에요</b>.', 'Épp arra készülök, hogy Koreába menjek tanulni.'], ['지금 밥을 먹<b>는 중이에요</b>. 이따가 전화할게요.', 'Épp eszem. Később visszahívlak.'], ['케이크를 만드<b>는 중이에요</b>.', 'Épp tortát sütök.', 'ㄹ-tő: 만들다 → 만드는'], ['부장님은 지금 회의 <b>중이세요</b>.', 'Az osztályvezető úr épp értekezleten van.']],
    ownNote: `<p>A ${korean('-고 있다')} (1B 11. lecke) hétköznapibb; a ${korean('-는 중이다')} jobban hangsúlyozza, hogy <b>éppen most</b> zajlik (pl. telefonban: „épp nem érek rá”). Állapotigékkel (${korean('알다, 좋아하다')}) egyik sem használható.</p>`,
  },
];
export default {
  lessons: {
    1: { korean: '할아버지, 할머니 이야기도 들어 드렸어요', hungarian: 'A nagyszülők történeteit is meghallgattam.' },
    2: { korean: '티켓을 구하는 게 쉽지 않았을 텐데 어떻게 구했어요?', hungarian: 'Nem lehetett könnyű jegyet szerezni – hogy sikerült?', pronunciation: '현실 발음 (고모음화)', pronunciationHungarian: 'élőbeszédes kiejtés: ㅗ → ㅜ (-하고요 [하구요], -더라고요 [더라구요])' },
    3: { korean: '매운 음식을 진짜 잘 먹는구나', hungarian: 'Hű, tényleg jól bírod a csípőset!' },
    4: { korean: '채소부터 씻어서 썰어 놓자', hungarian: 'Először mossuk meg és vágjuk fel a zöldséget.', pronunciation: '끊어 말하기', pronunciationHungarian: 'tagolás, szünet' },
    5: { korean: '딴생각을 하다가 버스를 놓쳐 버렸어요', hungarian: 'Elkalandoztak a gondolataim, és lekéstem a buszt.' },
    6: { korean: '제가 좀 참을걸 그랬어요', hungarian: 'Jobb lett volna, ha visszafogom magam.', pronunciation: '구개음화', pronunciationHungarian: 'palatalizáció (같이 [가치], 굳이 [구지])' },
    7: { korean: '캠핑을 같이 간다거나 친목 모임을 해요', hungarian: 'Például együtt kempingezünk vagy baráti találkozókat tartunk.' },
    8: { korean: '일하느라고 바빠서 오랫동안 못 갔어요', hungarian: 'A munka miatt sokáig nem tudtam elmenni.', pronunciation: '경음화', pronunciationHungarian: 'keményedés' },
    9: { korean: '두 사람이 많이 부러운 모양이에요', hungarian: 'Úgy tűnik, nagyon irigyli őket.' },
    10: { korean: '떡국을 한 그릇 다 먹었더니 배가 불러요', hungarian: 'Megettem egy egész tál tteokgukot, most tele vagyok.', pronunciation: '비음화', pronunciationHungarian: 'orrhangúsodás' },
    11: { korean: '자격증 준비나 외국어 공부도 미리 해 두면 좋을 거야', hungarian: 'Jó lesz előre készülni a vizsgákra és nyelvet tanulni.' },
    12: { korean: '한국으로 유학을 가려고 준비하는 중이에요', hungarian: 'Épp arra készülök, hogy Koreába menjek tanulni.', pronunciation: '격음화', pronunciationHungarian: 'hehezetesedés' },
  },
  points: points.map(point => Object.assign({ studentBookPage: studentBookPageOf(point.lesson, point.point), vocabularyGrammarPage: vocabularyGrammarPageOf(point.lesson, point.point) }, point)),
} satisfies BookData;
