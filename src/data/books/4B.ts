import { withAOrEo, withPast, withEu, withPlainStem, plainStyleStatement, type Word } from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';

const korean = (text: string) => `<span class="korean">${text}</span>`;
const vocabularyGrammarPageOf = (lesson: number, point: number) => 20 + 2 * (lesson - 1) + (point - 1), studentBookPageOf = (lesson: number, point: number) => 8 * lesson + 6 + 2 * (point - 1);
const isItdaOrEopda = (word: Word) => /(있|없)다$/.test(word.dictionaryForm);
const presentModifier = (word: Word, ending: string) => (word.wordClass === 'verb' || isItdaOrEopda(word)) ? withPlainStem(word, '는' + ending) : withEu(word, 'ㄴ' + ending);

const points: PointSource[] = [
  {
    lesson: 1, point: 1, form: '-는/(으)ㄴ 데다가', name: '„ráadásul, azon felül, hogy …”',
    explanation: `<p>Azt fejezi ki, hogy az első tényhez a második <b>hozzáadódik</b>, gyakran fokozva: „nemcsak …, ráadásul még … is”. A második részben gyakran ${korean('도, 까지')}.</p>
<ul><li><b>Ige</b>, ${korean('있다/없다')}: jelen ${korean('-는 데다가')}, múlt ${korean('-(으)ㄴ 데다가')}</li><li><b>Melléknév</b>: ${korean('-(으)ㄴ 데다가')}</li><li><b>Főnév</b>: ${korean('-인 데다가')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => presentModifier(word, ' 데다가') }, { header: 'Múlt (ige)', conjugate: word => word.wordClass === 'verb' ? withEu(word, 'ㄴ 데다가') : null }] },
    examples: [['뭐든지 적극적<b>인 데다가</b> 유머 감각도 있어요.', 'Mindenben aktív, ráadásul humorérzéke is van.'], ['그 식당은 음식이 맛있<b>는 데다가</b> 값도 싸요.', 'Annak az étteremnek finom az étele, ráadásul olcsó is.'], ['오늘은 <b>추운 데다가</b> 바람도 많이 불어요.', 'Ma hideg van, ráadásul erős szél is fúj.', 'ㅂ-rendhagyó: 춥다 → 추운'], ['아침을 못 먹<b>은 데다가</b> 점심도 늦게 먹었어요.', 'Nem reggeliztem, ráadásul ebédelni is későn ebédeltem.']],
    ownNote: `<p>A ${korean('-(으)ㄹ 뿐만 아니라')} (4A 6. lecke) közeli rokona; a ${korean('-는 데다가')} beszéltebb, és inkább azonos irányú (pozitív + pozitív, negatív + negatív) tényeket halmoz.</p>`,
  },
  {
    lesson: 1, point: 2, form: '-든지', name: '„akár …, akár …; bármit / bárhol …”',
    explanation: `<p>Azt fejezi ki, hogy <b>mindegy, melyiket</b> választjuk, nincs különbség. Ige vagy melléknév után, gyakran ismételve: ${korean('-든지 -든지')}. Kérdőszóval: ${korean('뭐든지')} „bármi”, ${korean('언제든지')} „bármikor”, ${korean('어디든지')} „bárhol”, ${korean('누구든지')} „bárki”. Rövid alakja ${korean('-든')}. A tő végétől függetlenül ${korean('-든지')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-든지', conjugate: word => withPlainStem(word, '든지') }] },
    examples: [['그 친구는 <b>뭐든지</b> 적극적이에요.', 'Az a barátom mindenben aktív.'], ['비가 오<b>든지</b> 눈이 오<b>든지</b> 매일 운동해요.', 'Akár esik, akár havazik, minden nap edzek.'], ['궁금한 게 있으면 <b>언제든지</b> 물어보세요.', 'Ha bármi kérdésed van, bármikor kérdezz.'], ['음악을 듣<b>든지</b> 책을 읽<b>든지</b> 하고 싶은 거 해.', 'Hallgass zenét vagy olvass, csinálj, amit szeretnél.', '-든지 előtt nincs ㄷ-változás: 듣든지']],
    ownNote: `<p>A ${korean('-거나')} (2A 2. lecke) egyszerű „vagy”; a ${korean('-든지')} azt hangsúlyozza, hogy <b>bármelyik</b> megfelel. Nem keverendő a ${korean('-던지')} („annyira …, hogy”) alakkal.</p>`,
  },
  {
    lesson: 2, point: 1, form: '-는/(으)ㄴ/(으)ㄹ 줄 알다', name: '„azt hittem, hogy …” (téves feltételezés)',
    explanation: `<p>Azt fejezi ki, hogy a beszélő <b>valamit hitt, gondolt, de nem így volt</b>: „azt hittem, hogy …”. Általában múltban: ${korean('-는 줄 알았어요')}. Ellentéte: ${korean('-는 줄 몰랐어요')} „nem gondoltam volna, hogy … (pedig így van)”.</p>
<ul><li><b>Ige</b>: jelen ${korean('-는')}, múlt ${korean('-(으)ㄴ')}, jövő/feltételezés ${korean('-(으)ㄹ 줄 알다')}</li><li><b>Melléknév</b>: ${korean('-(으)ㄴ')}, ${korean('-(으)ㄹ 줄 알다')}; <b>főnév</b>: ${korean('-인 줄 알다')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => presentModifier(word, ' 줄 알았어요') }, { header: 'Múlt (ige)', conjugate: word => word.wordClass === 'verb' ? withEu(word, 'ㄴ 줄 알았어요') : null }, { header: 'Jövő', conjugate: word => withEu(word, 'ㄹ 줄 알았어요') }] },
    examples: [['처음 만났을 때는 얌전한 성격<b>인 줄 알았거든</b>.', 'Amikor először találkoztunk, azt hittem, csendes természetű.'], ['오늘이 금요일<b>인 줄 알았어요</b>.', 'Azt hittem, ma péntek van.'], ['시험이 <b>어려울 줄 알았는데</b> 쉬웠어요.', 'Azt hittem, nehéz lesz a vizsga, de könnyű volt.', 'ㅂ-rendhagyó: 어렵다 → 어려울'], ['네가 벌써 집에 <b>간 줄 몰랐어</b>.', 'Nem gondoltam volna, hogy már hazamentél.']],
    ownNote: `<p>Vigyázat: a ${korean('-(으)ㄹ 줄 알다/모르다')} jelentheti azt is, hogy <b>tudja/nem tudja, hogyan kell</b> valamit csinálni: ${korean('수영할 줄 알아요')} „tudok úszni”. Ezt a helyzet és az igeidő dönti el.</p>`,
  },
  {
    lesson: 2, point: 2, form: '-던', name: 'felidézett múlt jelzői alakja („a régen …-t …”)',
    explanation: `<p>Ige vagy melléknév után, főnév előtt: a beszélő által <b>felidézett múltbeli</b> (gyakran ismétlődő vagy félbemaradt) helyzettel jelöli a főnevet: ${korean('어렸을 때 살던 집')} „a ház, ahol gyerekkoromban laktam”. A tő végétől függetlenül ${korean('-던')}; ${korean('-았던/었던')} a befejezett múltat hangsúlyozza.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-던 + főnév', conjugate: word => withPlainStem(word, '던') + ' 것' }, { header: '-았던/었던 + főnév', conjugate: word => withPast(word, '던') + ' 것' }] },
    examples: [['어렸을 때 살<b>던</b> 집에 가 봤어요.', 'Elmentem a házhoz, ahol gyerekkoromban laktam.'], ['이건 제가 자주 듣<b>던</b> 노래예요.', 'Ezt a dalt hallgattam régen gyakran.', '-던 előtt nincs ㄷ-változás: 듣던'], ['아까 마시<b>던</b> 커피 어디 있어요?', 'Hol van a kávé, amit az előbb ittam (és nem ittam meg)?'], ['작년에 같이 <b>갔던</b> 식당 기억나요?', 'Emlékszel az étteremre, ahová tavaly együtt mentünk?']],
    ownNote: `<p>${korean('먹은 빵')} = a megevett kenyér (elfogyott); ${korean('먹던 빵')} = a kenyér, amit ettem (félbehagytam, maradt belőle). Melléknévvel a ${korean('-던')} múltbeli, már nem fennálló állapotot jelez: ${korean('예쁘던 꽃')}.</p>`,
  },
  {
    lesson: 3, point: 1, form: '-(으)ㄹ까 -(으)ㄹ까', name: '„… vagy …?” (tépelődés két lehetőség között)',
    explanation: `<p>Két igét ${korean('-(으)ㄹ까')} alakban egymás után téve azt fejezzük ki, hogy <b>két lehetőség között tépelődünk</b>: „…-jak, vagy …-jak?”. Gyakran ${korean('아니면')} („vagy”) köti össze, és ${korean('고민이다, 생각 중이다')} zárja.</p>
<p><b>받침</b> után: <b>-을까</b>, magánhangzó után: <b>-ㄹ까</b>, ㄹ-tőnél: ${korean('살까')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ까', conjugate: word => withEu(word, 'ㄹ까') }] },
    examples: [['사업을 시작<b>할까</b> 아니면 회사에 취직<b>할까</b> 고민이야.', 'Azon töprengek, vállalkozásba kezdjek, vagy elhelyezkedjek egy cégnél.'], ['점심에 비빔밥을 먹<b>을까</b> 냉면을 먹<b>을까</b>?', 'Bibimbapot egyek ebédre vagy nengmyeont?'], ['주말에 집에서 <b>쉴까</b> 친구를 <b>만날까</b> 생각 중이에요.', 'Azon gondolkodom, hétvégén otthon pihenjek vagy a barátommal találkozzam.'], ['이 노래를 들<b>을까</b> 저 노래를 들<b>을까</b>?', 'Ezt a dalt hallgassam, vagy azt?', 'ㄷ-rendhagyó: 듣다 → 들을까']],
  },
  {
    lesson: 3, point: 2, form: '-지 그래요?', name: '„miért nem …? nem kéne …?” (tanács)',
    explanation: `<p>Ige után <b>tanácsot, javaslatot</b> ad a hallgatónak, kissé közvetlen, beszélt nyelvi hangon: „Miért nem próbálod meg …?”. A tő végétől függetlenül ${korean('-지 그래요?')}. Múltban (${korean('-지 그랬어요?')}) szemrehányó: „miért nem …-tál?”.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-지 그래요?', conjugate: word => withPlainStem(word, '지 그래요?') }, { header: 'Múlt: -지 그랬어요?', conjugate: word => withPlainStem(word, '지 그랬어요?') }] },
    examples: [['피곤하면 좀 쉬<b>지 그래요</b>?', 'Ha fáradt vagy, miért nem pihensz egy kicsit?'], ['그렇게 고민되면 부모님께 여쭤보<b>지 그래요</b>?', 'Ha ennyire gondolkodóba ejt, miért nem kérdezed meg a szüleidet?'], ['비가 오는데 우산을 가져가<b>지 그랬어요</b>?', 'Esik – miért nem vittél esernyőt?'], ['그 강의를 한번 들어 보<b>지 그래요</b>?', 'Miért nem hallgatod meg egyszer azt az előadást?', 'ㄷ-rendhagyó: 듣다 → 들어 보다']],
    ownNote: `<p>Idősebbnek, feljebbvalónak nem illik mondani. Udvariasabb tanácsok: ${korean('-는 게 어때요?')} (2A 9. lecke), ${korean('-아/어 보세요')}.</p>`,
  },
  {
    lesson: 4, point: 1, form: '-았어야/었어야 했는데', name: '„…-nom kellett volna (pedig)” (megbánás)',
    explanation: `<p>Ige után a beszélő <b>megbánja</b>, hogy a múltban <b>nem tette meg</b>, amit kellett volna. Tagadva: ${korean('-지 말았어야 했는데')} „nem kellett volna …”. ㅏ, ㅗ után ${korean('-았어야')}, egyébként ${korean('-었어야')}, 하다 → ${korean('했어야')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-았어야/었어야 했는데', conjugate: word => withPast(word, '어야 했는데') }, { header: '-지 말았어야 했는데', conjugate: word => withPlainStem(word, '지 말았어야 했는데') }] },
    examples: [['그때 그 꿈을 포기하<b>지 말았어야 했는데</b>.', 'Akkor nem kellett volna feladnom azt az álmot.'], ['어제 일찍 <b>잤어야 했는데</b> 늦게까지 게임을 했어요.', 'Tegnap korán kellett volna lefeküdnöm, de késő estig játszottam.'], ['부모님 말씀을 잘 들<b>었어야 했는데</b>.', 'Jobban kellett volna hallgatnom a szüleimre.', 'ㄷ-rendhagyó: 듣다 → 들었어야'], ['미리 표를 예매<b>했어야 했는데</b>.', 'Előre meg kellett volna vennem a jegyet.']],
    ownNote: `<p>Enyhébb megbánás: ${korean('-(으)ㄹ걸 그랬다')} (3B 6. lecke). A ${korean('-아야/어야 하다')} („kell”) múlt idejű alakja + ${korean('-는데')} (be nem fejezett, sajnálkozó mondatvég).</p>`,
  },
  {
    lesson: 4, point: 2, form: '-았을/었을 텐데', name: '„biztos …-t volna; pedig …-t volna” (megvalósulatlan múlt)',
    explanation: `<p>Ige vagy melléknév után <b>múltra vonatkozó feltételezést</b> fejez ki: „biztos (nehéz) volt…”. Gyakran a ${korean('-았더라면/었더라면')} vagy ${korean('-(으)면')} után: ha valami másképp történt volna, mi lett volna az eredmény (<b>megvalósulatlan</b>). ㅏ, ㅗ után ${korean('-았을 텐데')}, egyébként ${korean('-었을 텐데')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-았을/었을 텐데', conjugate: word => withPast(word, '을 텐데') }] },
    examples: [['그때 포기하지 않았으면 지금 가수가 되<b>었을 텐데</b>.', 'Ha akkor nem adom fel, most énekes lehetnék.'], ['혼자 이사하느라 힘들<b>었을 텐데</b> 왜 연락 안 했어요?', 'Biztos nehéz volt egyedül költözni – miért nem szóltál?'], ['조금만 일찍 출발했으면 안 <b>늦었을 텐데</b>.', 'Ha egy kicsit korábban indulok, nem késtem volna el.'], ['어제 많이 <b>추웠을 텐데</b> 괜찮았어요?', 'Tegnap biztos nagyon hideg volt – jól voltál?', 'ㅂ-rendhagyó: 춥다 → 추웠을']],
    ownNote: `<p>A 3B 2. lecke ${korean('-(으)ㄹ 텐데')} alakjának múlt idejű változata. Mondatvégen (${korean('-았을/었을 텐데요')}) sajnálkozó hangú.</p>`,
  },
  {
    lesson: 5, point: 1, form: '에 비해서', name: '„…-hoz képest, …-nál/-nél” (összehasonlítás)', conjugable: false,
    explanation: `<p>Főnév után az <b>összehasonlítás alapját</b> jelöli: „X-hez képest”. A ${korean('보다')} (1B 8. lecke) hivatalosabb, írottabb párja; jelentésekben, statisztikákban gyakori. Rövidebben: ${korean('에 비해')}. Minden főnév után ugyanaz.</p>`,
    examples: [['40대는 청소년들<b>에 비해서</b> 결혼을 해야 한다는 응답이 많았습니다.', 'A negyvenesek körében a fiatalokhoz képest többen válaszolták, hogy házasodni kell.'], ['올해는 작년<b>에 비해</b> 비가 많이 왔어요.', 'Idén a tavalyihoz képest sok eső esett.'], ['서울은 다른 도시<b>에 비해서</b> 집값이 비싸요.', 'Szöulban más városokhoz képest drágák a lakások.'], ['나이<b>에 비해</b> 젊어 보이시네요.', 'A korához képest fiatalnak tűnik.']],
  },
  {
    lesson: 5, point: 2, form: '-아야지/어야지', name: '„… kell(ene) (hát)!” (elhatározás, szükségszerűség)',
    explanation: `<p>Ige után a beszélő <b>elhatározását</b> („ezt meg kell csinálnom”) fejezi ki, vagy <b>másnak mondja</b>, hogy valamit meg kell tennie, illetve valaminek <b>így kell lennie</b> („hát persze, hogy …”). Udvariasan: ${korean('-아야지요 / -아야죠')}. A <b>-아/어</b> szabály szerint.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-아야지', conjugate: word => withAOrEo(word, '야지') }, { header: '-아야지요', conjugate: word => withAOrEo(word, '야지요') }] },
    examples: [['올해는 꼭 운동을 시작<b>해야지</b>.', 'Idén mindenképp el kell kezdenem edzeni!'], ['가: 결혼은 꼭 해야 돼요? 나: 그럼요, 결혼은 <b>해야지요</b>.', '– Muszáj megházasodni? – Hát persze, házasodni kell.'], ['내일 시험이니까 오늘은 일찍 <b>자야지</b>.', 'Holnap vizsga lesz, ma korán le kell feküdnöm.'], ['다른 사람 말도 잘 들<b>어야지요</b>.', 'Mások szavára is oda kell figyelni!', 'ㄷ-rendhagyó: 듣다 → 들어야지요']],
    ownNote: `<p>Elhatározásként közeli a ${korean('-아야겠다/어야겠다')} (3A 8. lecke); a ${korean('-아야지')} gyakran magunknak mondott fogadalom. Másnak mondva enyhe kioktatás lehet.</p>`,
  },
  {
    lesson: 6, point: 1, form: '-는지/(으)ㄴ지 알다, 모르다', name: '„tudja/nem tudja, hogy (mi, hol, hogyan) …” (beágyazott kérdés)',
    explanation: `<p>Egy kérdést <b>mellékmondatként</b> ágyaz be: „Tudod, <b>hogyan</b> szólítják a pincért?” Utána ${korean('알다, 모르다')}, ${korean('궁금하다, 물어보다')} stb. Gyakran kérdőszóval (${korean('뭐, 어디, 어떻게, 왜')}).</p>
<ul><li><b>Ige</b>, ${korean('있다/없다')}: ${korean('-는지')} (ㄹ kiesik: ${korean('사는지')}); múlt ${korean('-았는지/었는지')}; jövő ${korean('-(으)ㄹ지')}</li><li><b>Melléknév</b>: 받침 után ${korean('-은지')}, magánhangzó után ${korean('-ㄴ지')}</li><li><b>Főnév</b>: ${korean('-인지')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen + 알아요?', conjugate: word => presentModifier(word, '지 알아요?') }, { header: 'Múlt', conjugate: word => withPast(word, '는지 몰라요') }, { header: 'Jövő: -(으)ㄹ지', conjugate: word => withEu(word, 'ㄹ지 몰라요') }] },
    examples: [['식당에서 직원을 어떻게 부르<b>는지 알아요</b>?', 'Tudod, hogyan szólítják az étteremben a pincért?'], ['이 근처에 은행이 어디에 있<b>는지 아세요</b>?', 'Tudja, hol van errefelé bank?'], ['그 사람이 왜 화가 <b>났는지</b> 모르겠어요.', 'Nem tudom, miért lett mérges.'], ['내일 날씨가 <b>추울지</b> 모르겠어요.', 'Nem tudom, hideg lesz-e holnap.', 'ㅂ-rendhagyó: 춥다 → 추울지']],
    ownNote: `<p>Ne keverjük a 3A 7. lecke ${korean('-(으)ㄴ 지')} szerkezetével („… óta”): az utóbbit szóközzel írjuk (${korean('만난 지 1년')}), a ${korean('-는지')} egybeírandó.</p>
<p>Gyakori kész kifejezés a <b>${korean('그래서 그런지')}</b> (${korean('그렇다 + -(으)ㄴ지')}) „talán ezért, lehet, hogy emiatt”, és általánosan ${korean('-아서/어서 그런지')} „talán azért, mert …”: feltételezett okot mond, utána nem jön ${korean('알다/모르다')}. ${korean('피곤해서 그런지 머리가 아파요')} „Talán a fáradtságtól fáj a fejem.”</p>`,
  },
  {
    lesson: 6, point: 2, form: '-는다면서요?/ㄴ다면서요?/다면서요?', name: '„úgy hallottam, hogy …, igaz?” (hallott hír megerősítése)',
    explanation: `<p>Olyasmit kérdez meg, amit a beszélő <b>valahonnan hallott</b>, és a hallgatótól <b>megerősítést</b> vár: „Úgy hallottam, költözöl – igaz?”.</p>
<ul><li><b>Ige</b>: 받침 után ${korean('-는다면서요?')}, magánhangzó után ${korean('-ㄴ다면서요?')}</li><li><b>Melléknév</b>: ${korean('-다면서요?')}; <b>főnév</b>: ${korean('(이)라면서요?')}; <b>múlt</b>: ${korean('-았다면서요?/었다면서요?')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => plainStyleStatement(word) + '면서요?' }, { header: 'Múlt', conjugate: word => withPast(word, '다면서요?') }] },
    examples: [['한국에서는 식당에서 "여기요"라고 부른<b>다면서요</b>?', 'Úgy hallottam, Koreában az étteremben úgy szólítják a pincért, hogy „여기요” – igaz?'], ['다음 달에 결혼한<b>다면서요</b>? 축하해요!', 'Úgy hallottam, jövő hónapban megházasodsz. Gratulálok!'], ['그 영화가 그렇게 재미있<b>다면서요</b>?', 'Azt hallottam, olyan nagyon jó az a film – tényleg?'], ['어제 많이 <b>추웠다면서요</b>?', 'Úgy hallottam, tegnap nagyon hideg volt – igaz?', 'ㅂ-rendhagyó: 춥다 → 추웠다면서요']],
    ownNote: `<p>A függő beszéd (${korean('-는다고 하다')}) + ${korean('-면서요?')} rövidülése. 반말: ${korean('-는다면서?')}</p>`,
  },
  {
    lesson: 7, point: 1, form: '-는 데에', name: '„…-hoz, …-ban (cél, terület)”',
    explanation: `<p>Ige után azt a <b>célt, helyzetet, területet</b> jelöli, amelyhez valami szükséges, hasznos vagy amire valamit fordítunk: „a tanuláshoz”, „a döntésben”. Utána gyakran ${korean('필요하다, 도움이 되다, 좋다, 쓰다, 걸리다')}. A tő végétől függetlenül ${korean('-는 데(에)')}; ㄹ-tőnél az ㄹ kiesik.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-는 데에', conjugate: word => withPlainStem(word, '는 데에') }] },
    examples: [['비행기가 안전하게 다니<b>는 데에</b> 필요한 일을 해요.', 'Olyan munkát végzek, ami ahhoz kell, hogy a gépek biztonságosan közlekedjenek.'], ['이 책은 한국어를 공부하<b>는 데</b> 도움이 돼요.', 'Ez a könyv segít a koreai tanulásában.'], ['집을 구하<b>는 데</b> 한 달이 걸렸어요.', 'Egy hónapba telt, mire lakást találtam.'], ['이 음식을 만드<b>는 데</b> 두 시간이 걸려요.', 'Ennek az ételnek az elkészítése két óra.', 'ㄹ-tő: 만들다 → 만드는']],
  },
  {
    lesson: 7, point: 2, form: '-다 보니', name: '„ahogy (sokáig) …, rájöttem / úgy alakult, hogy …”',
    explanation: `<p>Ige után azt fejezi ki, hogy egy cselekvést <b>folyamatosan, ismételten</b> végezve <b>új felismerésre</b> jutottunk, vagy új helyzet alakult ki. A 3A 11. lecke ${korean('-다 보니까')} alakjának rövid változata. A tő végétől függetlenül ${korean('-다 보니')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-다 보니', conjugate: word => withPlainStem(word, '다 보니') }] },
    examples: [['이 일을 하<b>다 보니</b> 하늘을 더 좋아하게 됐어요.', 'Ahogy ezt a munkát végzem, egyre jobban megszerettem az eget.'], ['한국 드라마를 보<b>다 보니</b> 한국어 실력이 늘었어요.', 'Ahogy koreai sorozatokat néztem, fejlődött a koreaim.'], ['이야기하<b>다 보니</b> 시간이 이렇게 됐네요.', 'Ahogy beszélgettünk, el is repült az idő.'], ['매일 그 노래를 듣<b>다 보니</b> 가사를 다 외웠어요.', 'Ahogy minden nap hallgattam azt a dalt, megtanultam a szövegét.', '-다 előtt nincs ㄷ-változás: 듣다 보니']],
  },
  {
    lesson: 8, point: 1, form: '-는다는/ㄴ다는/다는 점에서', name: '„abban a tekintetben, hogy …; azért, mert …”',
    explanation: `<p>Azt a <b>szempontot, okot</b> jelöli, amiért valamit értékelünk, tisztelünk, kritizálunk: „abból a szempontból, hogy …”. Hivatalos, írott stílus.</p>
<ul><li><b>Ige</b>: 받침 után ${korean('-는다는')}, magánhangzó után ${korean('-ㄴ다는')}</li><li><b>Melléknév</b>: ${korean('-다는')}; <b>főnév</b>: ${korean('(이)라는')}; <b>múlt</b>: ${korean('-았다는/었다는')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => plainStyleStatement(word) + '는 점에서' }, { header: 'Múlt', conjugate: word => withPast(word, '다는 점에서') }] },
    examples: [['삶에 대한 가르침을 <b>줬다는 점에서</b> 존경을 받습니다.', 'Azért tisztelik, mert tanítást adott az életről.'], ['이 제품은 가볍<b>다는 점에서</b> 인기가 많아요.', 'Ez a termék abból a szempontból népszerű, hogy könnyű.'], ['그 선수는 포기하지 않<b>는다는 점에서</b> 대단해요.', 'Az a sportoló abban nagyszerű, hogy soha nem adja fel.'], ['한글은 배우기 쉽<b>다는 점에서</b> 훌륭한 문자예요.', 'A hangul abból a szempontból kiváló írás, hogy könnyű megtanulni.', '-다는 előtt nincs ㅂ-változás: 쉽다는']],
    ownNote: `<p>A ${korean('-는다는')} a ${korean('-는다고 하는')} rövidülése (idéző jelző). Ugyanígy: ${korean('-는다는 것, -는다는 사실, -는다는 이야기')}.</p>`,
  },
  {
    lesson: 8, point: 2, form: '-(으)ㄴ 결과', name: '„…-nak az eredményeként”',
    explanation: `<p>Ige után azt fejezi ki, hogy a második rész az első cselekvés <b>eredménye, következménye</b>. Hivatalos, írott stílus (jelentés, cikk). Főnévvel: ${korean('N의 결과')}.</p>
<p><b>받침</b> után: <b>-은 결과</b>, magánhangzó után: <b>-ㄴ 결과</b>, ㄹ-tőnél az ㄹ kiesik.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄴ 결과', conjugate: word => withEu(word, 'ㄴ 결과') }] },
    examples: [['열심히 노력<b>한 결과</b> 꿈을 이루었습니다.', 'Kitartó erőfeszítései eredményeként valóra váltotta az álmát.'], ['설문 조사를 <b>한 결과</b> 대부분이 찬성했습니다.', 'A felmérés eredménye szerint a többség egyetértett.'], ['매일 운동<b>한 결과</b> 건강이 좋아졌어요.', 'A napi edzés eredményeként javult az egészségem.'], ['환자의 이야기를 자세히 들<b>은 결과</b> 원인을 찾았습니다.', 'A beteg részletes meghallgatása után megtalálták az okot.', 'ㄷ-rendhagyó: 듣다 → 들은']],
  },
  {
    lesson: 9, point: 1, form: '-(으)ㄹ수록', name: '„minél …, annál …”',
    explanation: `<p>Ige vagy melléknév után azt fejezi ki, hogy az első rész <b>fokozódásával</b> a második is fokozódik: „minél többet …, annál …”. Erősítve: ${korean('-(으)면 -(으)ㄹ수록')} (${korean('보면 볼수록')}). ${korean('갈수록')} = „egyre inkább”.</p>
<p><b>받침</b> után: <b>-을수록</b>, magánhangzó után: <b>-ㄹ수록</b>, ㄹ-tőnél: ${korean('살수록')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)ㄹ수록', conjugate: word => withEu(word, 'ㄹ수록') }, { header: '-(으)면 -(으)ㄹ수록', conjugate: word => withEu(word, '면 ') + withEu(word, 'ㄹ수록') }] },
    examples: [['<b>갈수록</b> 현금을 사용하는 사람들이 줄어들고 있습니다.', 'Egyre kevesebben használnak készpénzt.'], ['한국어는 공부<b>할수록</b> 재미있어요.', 'A koreai minél többet tanulom, annál érdekesebb.'], ['이 노래는 들<b>으면</b> 들<b>을수록</b> 좋아요.', 'Ez a dal minél többször hallgatom, annál jobb.', 'ㄷ-rendhagyó: 듣다 → 들으면 들을수록'], ['날씨가 <b>더울수록</b> 물을 많이 마셔야 해요.', 'Minél melegebb van, annál több vizet kell inni.', 'ㅂ-rendhagyó: 덥다 → 더울수록']],
  },
  {
    lesson: 9, point: 2, form: '-(으)나', name: '„de, azonban” (írott ellentét)',
    explanation: `<p>Ige vagy melléknév után az előzővel <b>ellentétes</b> tartalmat vezet be, mint a ${korean('-지만')}, de <b>írottabb, hivatalosabb</b> stílusban. Múlt: ${korean('-았으나/었으나')}; főnév: ${korean('-(이)나')}.</p>
<p><b>받침</b> után: <b>-으나</b>, magánhangzó és <b>ㄹ</b> után: <b>-나</b> (ㄹ kiesik: ${korean('사나')}).</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)나', conjugate: word => withEu(word, '나') }, { header: 'Múlt: -았으나/었으나', conjugate: word => withPast(word, '으나') }] },
    examples: [['카드 사용은 늘었<b>으나</b> 현금 사용은 줄었습니다.', 'A kártyahasználat nőtt, a készpénzhasználat viszont csökkent.'], ['이 방법은 간단하<b>나</b> 시간이 많이 걸립니다.', 'Ez a módszer egyszerű, de sok időt vesz igénybe.'], ['날씨는 <b>추우나</b> 하늘은 맑습니다.', 'Hideg van, de tiszta az ég.', 'ㅂ-rendhagyó: 춥다 → 추우나'], ['여러 번 연락했<b>으나</b> 답이 없었습니다.', 'Többször kerestem, de nem jött válasz.']],
  },
  {
    lesson: 10, point: 1, form: '-는다고/ㄴ다고/다고 생각하다', name: '„úgy gondolom, hogy …” (vélemény)',
    explanation: `<p>A beszélő <b>véleményét</b> fejezi ki: „úgy gondolom, hogy …”. A gondolat tartalma idéző (한다체) alakot kap:</p>
<ul><li><b>Ige</b>: 받침 után ${korean('-는다고')}, magánhangzó után ${korean('-ㄴ다고')}</li><li><b>Melléknév</b>: ${korean('-다고')}; <b>főnév</b>: ${korean('(이)라고')}; ${korean('-아야/어야 한다고')} („kell”)</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-는다고/ㄴ다고/다고 생각해요', conjugate: word => plainStyleStatement(word) + '고 생각해요' }] },
    examples: [['저는 인터넷에서 실명을 써야 <b>한다고 생각해요</b>.', 'Szerintem az interneten valódi nevet kellene használni.'], ['저는 그 의견이 맞<b>다고 생각해요</b>.', 'Úgy gondolom, az a vélemény helyes.'], ['외국어를 배울 때는 많이 듣<b>는 게 중요하다고 생각해요</b>.', 'Úgy gondolom, nyelvtanulásnál fontos sokat hallgatni.'], ['저는 혼자 사는 게 더 <b>편하다고 생각해요</b>.', 'Szerintem egyedül élni kényelmesebb.'], ['한국어를 잘하려면 많이 들<b>어야 한다고 생각해요</b>.', 'Úgy gondolom, ha jól akarsz koreaiul, sokat kell hallgatnod.', 'ㄷ-rendhagyó: 듣다 → 들어야']],
    ownNote: `<p>Kérdés: ${korean('어떻게 생각해요?')} „Mit gondolsz?”. Udvarias, óvatos véleményre: ${korean('-지 않을까 싶어요')} (4B 11. lecke), ${korean('-는 거 아닐까 해요')} (4B 10. lecke).</p>`,
  },
  {
    lesson: 10, point: 2, form: '-는/(으)ㄴ 거 아닐까 하다', name: '„nem lehet, hogy …? Talán …” (óvatos vélemény)',
    explanation: `<p>A beszélő <b>óvatosan, bizonytalanul</b> mondja ki a véleményét vagy feltevését: „Szerintem talán …”. Beszédben a ${korean('것')} → ${korean('거')}.</p>
<ul><li><b>Ige</b>, ${korean('있다/없다')}: jelen ${korean('-는 거')}, múlt ${korean('-(으)ㄴ 거')}</li><li><b>Melléknév</b>: ${korean('-(으)ㄴ 거')}; <b>főnév</b>: ${korean('-인 거')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => presentModifier(word, ' 거 아닐까 해요') }, { header: 'Múlt (ige)', conjugate: word => word.wordClass === 'verb' ? withEu(word, 'ㄴ 거 아닐까 해요') : null }] },
    examples: [['실명을 쓰면 표현의 자유가 줄어드<b>는 거 아닐까 해요</b>.', 'Talán csökkenne a szólásszabadság, ha valódi nevet kellene használni.'], ['그 사람이 벌써 떠<b>난 거 아닐까 해요</b>.', 'Lehet, hogy az illető már elment.'], ['이 가격은 좀 비<b>싼 거 아닐까 해요</b>.', 'Szerintem ez az ár talán kicsit drága.'], ['요즘 날씨가 너무 <b>더운 거 아닐까 해요</b>.', 'Szerintem mostanában talán túl meleg van.', 'ㅂ-rendhagyó: 덥다 → 더운']],
  },
  {
    lesson: 11, point: 1, form: '-지 않을까 싶다', name: '„azt hiszem, (talán) …” (óvatos jóslat)',
    explanation: `<p>Ige vagy melléknév után a beszélő <b>bizonytalan jövőbeli tervét vagy feltevését</b> fejezi ki óvatosan: „azt hiszem, talán …”. A tő végétől függetlenül ${korean('-지 않을까 싶다')}; múltra: ${korean('-지 않았을까 싶다')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-지 않을까 싶어요', conjugate: word => withPlainStem(word, '지 않을까 싶어요') }, { header: 'Múlt', conjugate: word => withPlainStem(word, '지 않았을까 싶어요') }] },
    examples: [['10년 후엔 행복한 가정을 이루고 있<b>지 않을까 싶어요</b>.', 'Azt hiszem, tíz év múlva boldog családom lesz.'], ['내일은 비가 오<b>지 않을까 싶어요</b>.', 'Azt hiszem, holnap esni fog.'], ['이 정도면 충분하<b>지 않을까 싶어요</b>.', 'Szerintem ennyi talán elég.'], ['아마 벌써 도착하<b>지 않았을까 싶어요</b>.', 'Azt hiszem, valószínűleg már megérkezett.'], ['내일은 오늘보다 덜 춥<b>지 않을까 싶어요</b>.', 'Azt hiszem, holnap kevésbé lesz hideg, mint ma.', '-지 előtt nincs ㅂ-változás: 춥지']],
    ownNote: `<p>Formailag tagadó, jelentésben <b>állító</b>: ${korean('오지 않을까')} = „talán jön”. A ${korean('-(으)ㄹ 것 같다')} (2A 9. lecke) óvatosabb, szerényebb változata.</p>`,
  },
  {
    lesson: 11, point: 2, form: '-기보다는', name: '„ahelyett, hogy …, inkább …”',
    explanation: `<p>Ige után azt fejezi ki, hogy az első lehetőség <b>helyett inkább</b> a másodikat választjuk, az jobb: „ahelyett, hogy …, inkább …”. Gyakran ${korean('차라리, 오히려')}. A tő végétől függetlenül ${korean('-기보다는')}. Főnévvel: ${korean('N보다는')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-기보다는', conjugate: word => withPlainStem(word, '기보다는') }] },
    examples: [['돈을 많이 벌<b>기보다는</b> 행복하게 살고 싶어요.', 'Ahelyett, hogy sok pénzt keressek, inkább boldogan szeretnék élni.'], ['혼자 고민하<b>기보다는</b> 친구와 이야기해 보세요.', 'Ahelyett, hogy egyedül gyötrődnél, inkább beszélj a barátoddal.'], ['주말에는 밖에 나가<b>기보다는</b> 집에서 쉬는 편이에요.', 'Hétvégén kimozdulás helyett inkább otthon pihenek.'], ['음악을 듣<b>기보다는</b> 직접 연주하는 걸 좋아해요.', 'Inkább játszani szeretek, mint zenét hallgatni.', '-기 előtt nincs ㄷ-változás: 듣기']],
  },
  {
    lesson: 12, point: 1, form: '-는다니/ㄴ다니/다니', name: '„hogy …! (el sem hiszem)” (meglepődés)',
    explanation: `<p>Valamit, amit hallottunk vagy megtudtunk, <b>meglepetéssel, hitetlenkedve</b> ismétlünk meg: „Hogy már diplomázunk! Nem hiszem el.” Gyakran felkiáltó mondatban, vagy ${korean('-다니요?')} kérdésként.</p>
<ul><li><b>Ige</b>: 받침 után ${korean('-는다니')}, magánhangzó után ${korean('-ㄴ다니')}</li><li><b>Melléknév</b>: ${korean('-다니')}; <b>főnév</b>: ${korean('(이)라니')}; <b>múlt</b>: ${korean('-았다니/었다니')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => plainStyleStatement(word) + '니' }, { header: 'Múlt', conjugate: word => withPast(word, '다니') }] },
    examples: [['벌써 졸업을 한<b>다니</b>! 믿기지가 않습니다.', 'Hogy már diplomázunk! El sem hiszem.'], ['그 사람이 가수<b>라니</b> 정말 몰랐어요.', 'Hogy ő énekes! Ezt tényleg nem tudtam.'], ['10월인데 이렇게 <b>덥다니</b>!', 'Október van, és ilyen meleg!', '-다니 előtt nincs ㅂ-változás: 덥다니'], ['이 노래를 한 번도 안 들어 <b>봤다니</b>!', 'Hogy még egyszer se hallottad ezt a dalt!']],
  },
  {
    lesson: 12, point: 2, form: '-기를 바라다', name: '„remélem, hogy …; kívánom, hogy …”',
    explanation: `<p>Ige vagy melléknév után <b>kívánságot, reményt</b> fejez ki, gyakran jókívánságként, hivatalos beszédben, üdvözlőlapon. A tő végétől függetlenül ${korean('-기를 바라다')}; ragozva: ${korean('바라요, 바랍니다')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-기를 바라요', conjugate: word => withPlainStem(word, '기를 바라요') }, { header: '-기를 바랍니다', conjugate: word => withPlainStem(word, '기를 바랍니다') }] },
    examples: [['모두 행복하<b>기를 바랍니다</b>.', 'Kívánom, hogy mindenki boldog legyen.'], ['좋은 결과가 있<b>기를 바라요</b>.', 'Remélem, jó eredmény lesz.'], ['새해에는 건강하<b>시기를 바랍니다</b>.', 'Jó egészséget kívánok az új évre.'], ['앞으로도 우리 노래를 많이 들어 주시<b>기를 바랍니다</b>.', 'Reméljük, a jövőben is sokat hallgatják majd a dalainkat.', 'ㄷ-rendhagyó: 듣다 → 들어 주시다']],
    correctIncorrect: [{ correct: '행복하기를 바라요.', translation: 'Remélem, boldog leszel.' }, { incorrect: '행복하기를 바래요.', reason: 'gyakran hallani, de a helyes alak 바라요 (바라다 → 바라 + 요)' }],
    ownNote: `<p>A ${korean('바라다')} szabályos: ${korean('바라 + 요 → 바라요')} (az ㅏ összevonódik). A ${korean('바래요')} a beszédben elterjedt, de helytelen alak; a tankönyv is külön kiemeli.</p>`,
  },
];
export default {
  lessons: {
    1: { korean: '뭐든지 적극적인 데다가 유머 감각도 있어요', hungarian: 'Mindenben aktív, ráadásul humorérzéke is van.' },
    2: { korean: '처음 만났을 때는 얌전한 성격인 줄 알았거든', hungarian: 'Amikor először találkoztunk, azt hittem, csendes természetű.', pronunciation: '억양 (-거든)', pronunciationHungarian: 'a -거든 hanglejtése' },
    3: { korean: '사업을 시작할까 아니면 회사에 취직할까 고민이야', hungarian: 'Azon töprengek, vállalkozásba kezdjek, vagy elhelyezkedjek egy cégnél.' },
    4: { korean: '그때 그 꿈을 포기하지 말았어야 했는데', hungarian: 'Akkor nem kellett volna feladnom azt az álmot.', pronunciation: '억양 (-았을/었을 텐데)', pronunciationHungarian: 'a -았을/었을 텐데 hanglejtése' },
    5: { korean: '40대는 청소년들에 비해서 결혼을 해야 한다는 응답이 많았습니다', hungarian: 'A negyvenesek körében a fiatalokhoz képest többen mondták, hogy házasodni kell.' },
    6: { korean: '식당에서 직원을 어떻게 부르는지 알아요?', hungarian: 'Tudod, hogyan szólítják az étteremben a pincért?', pronunciation: '경음화', pronunciationHungarian: 'keményedés' },
    7: { korean: '저는 하늘길을 관리하는 일을 합니다', hungarian: 'A légi útvonalak irányításával foglalkozom.' },
    8: { korean: '삶에 대한 가르침을 줬다는 점에서 존경을 받습니다', hungarian: 'Azért tisztelik, mert tanítást adott az életről.', pronunciation: '비음화', pronunciationHungarian: 'orrhangúsodás' },
    9: { korean: '갈수록 현금을 사용하는 사람들이 줄어들고 있습니다', hungarian: 'Egyre kevesebben használnak készpénzt.' },
    10: { korean: '저는 인터넷에서 실명을 써야 한다고 생각해요', hungarian: 'Szerintem az interneten valódi nevet kellene használni.', pronunciation: '현실 발음 (한자어 경음화)', pronunciationHungarian: 'kínai eredetű szavak keményedése (효과 [효과/효꽈])' },
    11: { korean: '10년 후엔 행복한 가정을 이루고 있지 않을까 싶어요', hungarian: 'Azt hiszem, tíz év múlva boldog családom lesz.' },
    12: { korean: '벌써 졸업을 한다니! 믿기지가 않습니다', hungarian: 'Hogy már diplomázunk! El sem hiszem.', pronunciation: '끊어 말하기', pronunciationHungarian: 'tagolás, szünet' },
  },
  points: points.map(point => Object.assign({ studentBookPage: studentBookPageOf(point.lesson, point.point), vocabularyGrammarPage: vocabularyGrammarPageOf(point.lesson, point.point) }, point)),
} satisfies BookData;
