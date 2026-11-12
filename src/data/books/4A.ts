import { withPast, withEu, withPlainStem, plainStyleStatement, nounWithParticle, type Word } from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';

const korean = (text: string) => `<span class="korean">${text}</span>`;
const koreanWithTranslation = (koreanText: string, hungarianText: string) => `<span class="korean">${koreanText}</span><span class="translation">${hungarianText}</span>`;
const koreanGlossedInRow = (text: string) => `<span class="korean glossed-in-row">${text}</span>`;
const simpleTable = (headers: string[], rows: string[][]) => `<div class="table-wrapper"><table class="plain"><thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const vocabularyGrammarPageOf = (lesson: number, point: number) => 20 + 2 * (lesson - 1) + (point - 1), studentBookPageOf = (lesson: number, point: number) => 8 * lesson + 6 + 2 * (point - 1);
const isItdaOrEopda = (word: Word) => /(있|없)다$/.test(word.dictionaryForm);
const presentModifier = (word: Word, ending: string) => (word.wordClass === 'verb' || isItdaOrEopda(word)) ? withPlainStem(word, '는' + ending) : withEu(word, 'ㄴ' + ending);
const reportedStatementDaeyo = (word: Word) => plainStyleStatement(word).slice(0, -1) + '대요';

const points: PointSource[] = [
  {
    lesson: 1, point: 1, form: '-는다면/ㄴ다면/다면', name: '„ha (netán) …” (elképzelt, valószínűtlen feltétel)',
    explanation: `<p>Feltételt vagy feltevést fejez ki, főleg ha az <b>kevéssé valószínű vagy nem valós</b>: „ha (egyszer) lehetőségem lenne…”. Valószínű, reális feltételre inkább a ${korean('-(으)면')} kell.</p>
<ul><li><b>Ige</b>: 받침 után ${korean('-는다면')}, magánhangzó után ${korean('-ㄴ다면')} (ㄹ kiesik: ${korean('산다면')})</li><li><b>Melléknév</b>, ${korean('있다/없다')}: ${korean('-다면')}</li><li><b>Főnév</b>: ${korean('(이)라면')}; <b>múlt</b>: ${korean('-았다면/었다면')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => plainStyleStatement(word) + '면' }, { header: 'Múlt', conjugate: word => withPast(word, '다면') }] },
    examples: [['여건이 <b>된다면</b> 외국에서 1년쯤 살아 봤으면 해요.', 'Ha a körülmények engedik, szeretnék egy évet külföldön élni.'], ['복권에 당첨<b>된다면</b> 세계 여행을 하고 싶어요.', 'Ha megnyerném a lottót, beutaznám a világot.'], ['내가 너<b>라면</b> 그렇게 안 할 거야.', 'A helyedben nem csinálnám így.'], ['시간을 되돌릴 수 <b>있다면</b> 고등학생 때로 돌아가고 싶어요.', 'Ha vissza lehetne forgatni az időt, a gimis éveimbe mennék vissza.'], ['그 노래를 매일 듣<b>는다면</b> 가사를 외울 수 있을 거예요.', 'Ha minden nap hallgatnád azt a dalt, meg tudnád tanulni a szövegét.', '-는다 előtt nincs ㄷ-változás: 듣는다면']],
    ownNote: `<p>Ugyanaz a forma, mint a 한다체 (3A 12. lecke) + ${korean('-면')}. A ${korean('-았다면/었다면')} megvalósulatlan múltat is jelenthet: ${korean('그때 공부를 열심히 했다면…')} „ha akkor szorgalmasan tanultam volna…”.</p>`,
  },
  {
    lesson: 1, point: 2, form: '-았으면/었으면 하다', name: '„szeretném, ha …; bárcsak …” (óhaj)',
    explanation: `<p>Ige vagy melléknév után a beszélő <b>reményét, kívánságát</b> fejezi ki. A múlt idő jele itt <b>nem múltat</b> jelent, hanem a kívánság erősségét. A ${korean('하다')} el is hagyható: ${korean('-았으면/었으면.')}</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-았으면/었으면 해요', conjugate: word => withPast(word, '으면 해요') }, { header: '-았으면/었으면 좋겠어요', conjugate: word => withPast(word, '으면 좋겠어요') }] },
    examples: [['외국에서 1년쯤 살아 <b>봤으면 해요</b>.', 'Szeretnék egyszer egy évet külföldön élni.'], ['이번 시험에 꼭 합격<b>했으면 해요</b>.', 'Nagyon remélem, hogy átmegyek ezen a vizsgán.'], ['주말에 날씨가 좀 따뜻<b>했으면 좋겠어요</b>.', 'Bárcsak hétvégén kicsit melegebb lenne.'], ['내일은 덜 <b>더웠으면</b>….', 'Bárcsak holnap kevésbé lenne meleg…', 'ㅂ-rendhagyó: 덥다 → 더웠으면']],
    ownNote: `<p>A ${korean('-(으)면 좋겠다')} (2A 10. lecke) semlegesebb; a ${korean('-았으면/었으면')} változat erősebb, sóvárgóbb. Másnak udvarias kérésként is: ${korean('조용히 해 줬으면 해요')} „örülnék, ha csendben lennétek”.</p>`,
  },
  {
    lesson: 2, point: 1, form: '-(으)ㄹ 만하다', name: '„érdemes …; megéri …”',
    explanation: `<p>Ige után azt fejezi ki, hogy valamit <b>érdemes megtenni</b>, megéri, vagy <b>elfogadható, elviselhető</b>. Főnév előtt jelzőként: ${korean('-(으)ㄹ 만한 N')} (${korean('가 볼 만한 곳')} „hely, ahová érdemes elmenni”).</p>
<p><b>받침</b> után: <b>-을 만하다</b>, magánhangzó után: <b>-ㄹ 만하다</b>, ㄹ-tőnél: ${korean('살 만하다')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ 만해요', conjugate: word => withEu(word, 'ㄹ 만해요') }, { header: '-(으)ㄹ 만한 + főnév', conjugate: word => withEu(word, 'ㄹ 만한') + ' 것' }] },
    examples: [['한 번쯤 가 볼 <b>만한</b> 곳이야.', 'Egyszer érdemes elmenni oda.'], ['이 영화는 정말 볼 <b>만해요</b>.', 'Ezt a filmet tényleg érdemes megnézni.'], ['요즘 들을 <b>만한</b> 노래 좀 추천해 주세요.', 'Ajánlj valami dalt, amit érdemes mostanában meghallgatni.', 'ㄷ-rendhagyó: 듣다 → 들을 만한'], ['이 정도 추위는 참을 <b>만해요</b>.', 'Ekkora hideget még ki lehet bírni.']],
  },
  {
    lesson: 2, point: 2, form: '-던데', name: '„(azt tapasztaltam, hogy) …, (és / de) …”',
    explanation: `<p>Ige vagy melléknév után a <b>múltban közvetlenül tapasztalt</b> tényt vagy élményt mondja el háttérként, és ehhez kapcsolódik a mondat folytatása (javaslat, kérdés, ellentét). A tő végétől függetlenül ${korean('-던데')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-던데', conjugate: word => withPlainStem(word, '던데') }, { header: 'Múlt: -았던데/었던데', conjugate: word => withPast(word, '던데') }] },
    examples: [['거기 경치가 정말 좋<b>던데</b> 한번 가 보세요.', 'Ott tényleg gyönyörű a kilátás (láttam), egyszer menj el.'], ['그 식당 음식이 맛있<b>던데</b> 같이 갈래요?', 'Annak az étteremnek finom az étele, eljössz velem?'], ['어제 보니까 많이 바쁘<b>던데</b> 오늘은 괜찮아요?', 'Tegnap láttam, hogy nagyon elfoglalt voltál – ma jobb?'], ['그 노래 처음 들었을 때는 별로<b>던데</b> 이제는 좋아요.', 'Amikor először hallottam azt a dalt, nem tetszett, de most már szeretem.'], ['그 식당 음식이 좀 맵<b>던데</b> 괜찮겠어요?', 'Annak az étteremnek elég csípős az étele – biztos jó lesz?', '-던 előtt nincs ㅂ-változás: 맵던데']],
    ownNote: `<p>Mondatvégi párja a ${korean('-던데요')} (3B 10. lecke). A ${korean('-는데')} (2A 8. lecke) háttér-jelentésének „tapasztalati” változata: a ${korean('-던-')} a felidézett múltbeli élményt jelzi.</p>`,
  },
  {
    lesson: 3, point: 1, form: '-는대요/ㄴ대요/대요', name: 'rövidített függő beszéd: „azt mondják, hogy …”',
    explanation: `<p>A ${korean('-는다고/ㄴ다고/다고 해요')} (3A 2. lecke) <b>rövidített</b> alakja, beszélt nyelvben nagyon gyakori: hallott hírt adunk tovább.</p>
<ul><li><b>Ige</b>: 받침 után ${korean('-는대요')}, magánhangzó után ${korean('-ㄴ대요')}</li><li><b>Melléknév</b>: ${korean('-대요')}</li><li><b>Főnév</b>: ${korean('(이)래요')}; <b>múlt</b>: ${korean('-았대요/었대요')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: reportedStatementDaeyo }, { header: 'Múlt: -았대요/었대요', conjugate: word => withPast(word, '대요') }] },
    examples: [['드디어 새 앨범이 나온<b>대</b>.', 'Azt mondják, végre kijön az új album.'], ['마크 씨가 다음 달에 결혼한<b>대요</b>.', 'Azt mondják, Mark jövő hónapban megnősül.'], ['내일은 많이 <b>춥대요</b>.', 'Azt mondják, holnap nagyon hideg lesz.', '-대요 előtt nincs ㅂ-változás: 춥대요'], ['그 가수가 어제 공연을 <b>했대요</b>.', 'Azt mondják, az énekes tegnap koncertezett.']],
    ownNote: `<p>Vigyázat: ${korean('-대요')} (= ${korean('-다고 해요')}, hallott hír) ≠ ${korean('-데요')} (= ${korean('-더라고요')}, saját élmény). ${korean('맛있대요')} „azt mondják, finom”, ${korean('맛있데요')} „(kóstoltam,) finom volt”.</p>`,
  },
  {
    lesson: 3, point: 2, form: '-냬요, -(으)래요, -재요', name: 'rövidített idézett kérdés, felszólítás, javaslat',
    explanation: `<p>A függő beszéd többi fajtájának <b>rövid</b> alakjai:</p>
${simpleTable(['Eredeti', 'Teljes függő beszéd', 'Rövid alak'], [['kérdés', korean('-냐고 해요'), korean('-냬요')], ['felszólítás', korean('-(으)라고 해요'), korean('-(으)래요')], ['javaslat', korean('-자고 해요'), korean('-재요')]])}
<p>A ${korean('-냬요')} a tő végétől függetlenül ugyanaz, ㄹ-tőnél az ㄹ kiesik (${korean('사냬요')}). ${korean('-(으)래요')}: 받침 után ${korean('-으래요')}, magánhangzó és ㄹ után ${korean('-래요')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: 'Kérdés: -냬요', conjugate: word => withPlainStem(word, '냬요') }, { header: 'Felszólítás: -(으)래요', conjugate: word => withEu(word, '래요') }, { header: 'Javaslat: -재요', conjugate: word => withPlainStem(word, '재요') }] },
    examples: [['친구가 주말에 뭐 하<b>냬요</b>.', 'A barátom azt kérdezi, mit csinálok hétvégén.'], ['선생님이 내일까지 숙제를 내<b>래요</b>.', 'A tanár azt mondta, holnapig adjuk be a házit.'], ['동생이 같이 영화 보<b>재요</b>.', 'Az öcsém azt javasolja, nézzünk meg együtt egy filmet.'], ['엄마가 음악을 좀 작게 들<b>으래요</b>.', 'Anya azt mondta, hallgassam halkabban a zenét.', 'ㄷ-rendhagyó: 듣다 → 들으래요']],
    ownNote: `<p>Vigyázat: a ${korean('-(으)래요')} kétféle lehet: idézett felszólítás (${korean('가래요')} „azt mondta, menjek”) és a ${korean('-(으)ㄹ래요?')} (2B 1. lecke, ${korean('갈래요?')} „mennél?”) – a kettő különböző!</p>`,
  },
  {
    lesson: 4, point: 1, form: '(으)로 인해서', name: '„… miatt, … következtében” (hivatalos)', conjugable: false,
    explanation: `<p>Főnév után azt jelöli, hogy valami <b>oka, előidézője</b> az utána következőnek. Főleg <b>hivatalos</b> beszédben, hírekben, írásban. Rövidebben ${korean('(으)로 인해')}; főnév előtt ${korean('(으)로 인한 N')}.</p>
<p><b>받침</b> után: <b>으로 인해서</b>, magánhangzó és <b>ㄹ</b> után: <b>로 인해서</b>.</p>`,
    table: { kind: 'noun', nouns: [{ word: '폭설', description: 'ㄹ-re végződik' }, { word: '태풍', description: 'mássalhangzóra végződik' }, { word: '사고', description: 'magánhangzóra végződik' }], nounColumns: [{ header: '(으)로 인해서', conjugate: noun => nounWithParticle(noun, '으로 인해서', '로 인해서', true) }, { header: '(으)로 인한 + főnév', conjugate: noun => nounWithParticle(noun, '으로 인한 피해', '로 인한 피해', true) }] },
    examples: [['폭설<b>로 인해서</b> 많은 피해가 발생하고 있습니다.', 'A heves havazás következtében nagy károk keletkeznek.'], ['태풍<b>으로 인해</b> 비행기가 결항되었습니다.', 'A tájfun miatt törölték a járatokat.'], ['교통사고<b>로 인한</b> 사망자가 줄었습니다.', 'Csökkent a közlekedési balesetekben elhunytak száma.'], ['스트레스<b>로 인해서</b> 잠을 못 자는 사람이 많아요.', 'Sokan nem tudnak aludni a stressz miatt.']],
    ownNote: `<p>Hétköznapi beszédben inkább ${korean('N 때문에')} (2B 9. lecke) vagy ${korean('-아서/어서')}.</p>`,
  },
  {
    lesson: 4, point: 2, form: '-(으)면서 (계기)', name: '„azzal, hogy …; ahogy …, úgy …” (ok, kiváltó esemény)',
    explanation: `<p>Ige vagy melléknév után azt fejezi ki, hogy az első rész a második <b>oka, kiváltója</b>: „ahogy X történt, (úgy) Y”. Hírekben, leírásokban gyakori. Alakja megegyezik a 2A 6. leckében tanult egyidejűség-jelentésűvel: <b>받침</b> után ${korean('-으면서')}, magánhangzó és <b>ㄹ</b> után ${korean('-면서')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)면서', conjugate: word => withEu(word, '면서') }] },
    examples: [['눈이 많이 내리<b>면서</b> 교통사고가 늘었습니다.', 'Az erős havazással megnövekedett a közlekedési balesetek száma.'], ['날씨가 <b>추워지면서</b> 감기 환자가 많아졌어요.', 'Ahogy hidegre fordult az idő, megnőtt a megfázásos betegek száma.', 'ㅂ-rendhagyó: 춥다 → 추워지면서'], ['스마트폰을 사용하<b>면서</b> 생활이 편리해졌어요.', 'Az okostelefonok használatával kényelmesebb lett az élet.'], ['기온이 올라가<b>면서</b> 얼음이 녹기 시작했어요.', 'Ahogy emelkedett a hőmérséklet, elkezdett olvadni a jég.']],
    ownNote: `<p>A „miközben” (egyidejűség) jelentéstől az különbözteti meg, hogy itt a két tagmondat <b>alanya eltérhet</b>, és ok–okozati kapcsolat van köztük.</p>`,
  },
  {
    lesson: 5, point: 1, form: '-냐면', name: '„hogy …? (hát) …” (saját kérdés megismétlése magyarázat előtt)',
    explanation: `<p>A ${korean('-냐고 하면')} („ha azt kérdezed, hogy …”) <b>rövidítése</b>. A beszélő megismétli a (feltett vagy várható) kérdést, majd megadja rá a választ: „Hogy miért? Hát azért, mert…”. Főleg beszédben, gyakran ${korean('-냐면요')} alakban. ㄹ-tőnél az ㄹ kiesik (${korean('사냐면')}); főnévvel ${korean('(이)냐면')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-냐면(요)', conjugate: word => withPlainStem(word, '냐면요') }, { header: 'Múlt: -았냐면/었냐면', conjugate: word => withPast(word, '냐면') }] },
    examples: [['어떤 앱을 주로 사용하<b>냐면요</b>, 지도 앱을 제일 많이 써요.', 'Hogy milyen appot használok főleg? Leginkább a térképes appot.'], ['왜 한국어를 배우<b>냐면</b> 한국 드라마를 좋아하기 때문이에요.', 'Hogy miért tanulok koreaiul? Mert szeretem a koreai sorozatokat.'], ['그 식당이 왜 유명하<b>냐면</b> 음식이 싸고 맛있거든요.', 'Hogy miért híres az az étterem? Mert olcsó és finom.'], ['어디에 살<b>았냐면</b> 부산에서 살았어요.', 'Hogy hol laktam? Puszanban.'], ['왜 그 노래를 자주 듣<b>냐면</b> 마음이 편해지거든요.', 'Hogy miért hallgatom gyakran azt a dalt? Mert megnyugtat.', '-냐 előtt nincs ㄷ-változás: 듣냐면']],
  },
  {
    lesson: 5, point: 2, form: '-기가 쉽다, 어렵다, 힘들다, 편하다', name: '„könnyű / nehéz / fárasztó / kényelmes …-ni”',
    explanation: `<p>Ige után azt fejezi ki, hogy egy cselekvés elvégzése vagy egy dolog bekövetkezése <b>könnyű, nehéz, fárasztó vagy kényelmes</b>. A tő végétől függetlenül ${korean('-기가')} + melléknév; a ${korean('가')} el is maradhat.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-기가 쉬워요', conjugate: word => withPlainStem(word, '기가 쉬워요') }, { header: '-기가 어려워요', conjugate: word => withPlainStem(word, '기가 어려워요') }, { header: '-기가 편해요', conjugate: word => withPlainStem(word, '기가 편해요') }] },
    examples: [['이 앱은 사용하<b>기가 편해요</b>.', 'Ezt az appot kényelmes használni.'], ['한국어 발음은 따라 하<b>기가 어려워요</b>.', 'A koreai kiejtést nehéz utánozni.'], ['아침에 일찍 일어나<b>기가 힘들어요</b>.', 'Nehéz (fárasztó) reggel korán kelni.'], ['겨울에는 감기에 걸리<b>기 쉬워요</b>.', 'Télen könnyű megfázni.'], ['이 노래는 가사가 쉬워서 따라 부르<b>기가 쉬워요</b>.', 'Ennek a dalnak egyszerű a szövege, könnyű vele együtt énekelni.', 'ㅂ-rendhagyó: 쉽다 → 쉬워요']],
    ownNote: `<p>A ${korean('쉽다, 어렵다')} ㅂ-rendhagyó, így ragozva: ${korean('쉬워요, 어려워요')}. Hasonló: ${korean('-기가 좋다')} (2A 5. lecke).</p>`,
  },
  {
    lesson: 6, point: 1, form: '-(으)ㄹ 뿐만 아니라', name: '„nemcsak …, hanem … is”',
    explanation: `<p>Ige vagy melléknév után azt fejezi ki, hogy az első tény mellé a második is <b>hozzájön</b>: „nemcsak X, hanem Y is”. A második részben gyakran ${korean('도')} áll. Főnévvel: ${korean('N뿐만 아니라')}.</p>
<p><b>받침</b> után: <b>-을 뿐만 아니라</b>, magánhangzó után: <b>-ㄹ 뿐만 아니라</b>; múltra: ${korean('-았을/었을 뿐만 아니라')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)ㄹ 뿐만 아니라', conjugate: word => withEu(word, 'ㄹ 뿐만 아니라') }] },
    examples: [['마늘은 면역력을 높여 <b>줄 뿐만 아니라</b> 암 예방에도 좋습니다.', 'A fokhagyma nemcsak az immunrendszert erősíti, hanem a rák megelőzésében is segít.'], ['이 식당은 음식이 맛있<b>을 뿐만 아니라</b> 값도 싸요.', 'Ebben az étteremben nemcsak finom az étel, hanem olcsó is.'], ['그 가수는 노래를 잘<b>할 뿐만 아니라</b> 춤도 잘 춰요.', 'Az az énekes nemcsak jól énekel, hanem jól is táncol.'], ['오늘은 <b>추울 뿐만 아니라</b> 바람도 많이 불어요.', 'Ma nemcsak hideg van, hanem erős szél is fúj.', 'ㅂ-rendhagyó: 춥다 → 추울']],
  },
  {
    lesson: 6, point: 2, form: '-게 하다', name: '„…-tat, -tet; ráveszi, hogy …” (műveltetés)',
    explanation: `<p>Ige vagy melléknév után azt fejezi ki, hogy valaki <b>ráveszi, utasítja</b> a másikat valamire, vagy <b>előidéz</b> egy állapotot: ${korean('아이를 웃게 해요')} „megnevetteti a gyereket”. A tő végétől függetlenül ${korean('-게 하다')}. Akit rávesznek, ${korean('을/를')} vagy ${korean('에게')} partikulát kap.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-게 해요', conjugate: word => withPlainStem(word, '게 해요') }, { header: 'Múlt: -게 했어요', conjugate: word => withPlainStem(word, '게 했어요') }] },
    examples: [['엄마가 저에게 매일 채소를 먹<b>게 했어요</b>.', 'Anya rávett, hogy minden nap egyek zöldséget.'], ['선생님이 학생들을 큰 소리로 읽<b>게 하셨어요</b>.', 'A tanár hangosan olvastatta a diákokat.'], ['그 영화는 사람들을 웃<b>게 해요</b>.', 'Az a film megnevetteti az embereket.'], ['따뜻한 차는 몸을 따뜻하<b>게 해</b> 줘요.', 'A meleg tea átmelegíti a testet.'], ['선생님이 학생들에게 한국 노래를 듣<b>게 하셨어요</b>.', 'A tanár koreai dalokat hallgattatott a diákokkal.', '-게 előtt nincs ㄷ-változás: 듣게']],
    ownNote: `<p>Hasonló szerkezet a ${korean('-도록 하다')} (3A 10. lecke). Néhány igének saját műveltető alakja is van: ${korean('먹이다')} „etet”, ${korean('입히다')} „öltöztet”, ${korean('울리다')} „megríkat”.</p>`,
  },
  {
    lesson: 7, point: 1, form: '-(으)ㄹ 뻔하다', name: '„majdnem …-tam”',
    explanation: `<p>Ige után azt fejezi ki, hogy valami <b>majdnem megtörtént</b>, de végül <b>nem</b>. Mindig <b>múlt</b> időben: ${korean('-(으)ㄹ 뻔했어요')}.</p>
<p><b>받침</b> után: <b>-을 뻔했다</b>, magánhangzó után: <b>-ㄹ 뻔했다</b>, ㄹ-tőnél: ${korean('잃어버릴 뻔했다, 울 뻔했다')}.</p>
<p>A könyv külön említi a túlzó ${korean('-아서/어서 죽을 뻔하다')} fordulatot (beszélt nyelv): ${korean('배고파서 죽을 뻔했어요')} „majd éhen haltam”.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ 뻔했어요', conjugate: word => withEu(word, 'ㄹ 뻔했어요') }] },
    examples: [['버스가 흔들려서 넘어<b>질 뻔했어요</b>.', 'A busz megrázkódott, majdnem elestem.'], ['늦잠을 자서 비행기를 놓<b>칠 뻔했어요</b>.', 'Elaludtam, majdnem lekéstem a repülőt.'], ['영화가 너무 슬퍼서 <b>울 뻔했어요</b>.', 'Olyan szomorú volt a film, hogy majdnem elsírtam magam.', 'ㄹ-tő: 울다 → 울'], ['길을 몰라서 길을 잃<b>을 뻔했어요</b>.', 'Nem ismertem az utat, majdnem eltévedtem.']],
    ownNote: `<p>Gyakran ${korean('하마터면')} („egy hajszálon múlt”) vezeti be: ${korean('하마터면 다칠 뻔했어요')}.</p>`,
  },
  {
    lesson: 7, point: 2, form: '아무 N(이)나', name: '„bármelyik, akármilyen …”', conjugable: false,
    explanation: `<p>Az ${korean('아무')} („bármely”) + főnév + ${korean('(이)나')} azt fejezi ki, hogy <b>mindegy, melyik</b>: „bármi jó”. 받침 után ${korean('이나')}, magánhangzó után ${korean('나')}. Gyakori: ${korean('아무거나')} „bármi”, ${korean('아무나')} „bárki”, ${korean('아무 데나')} „bárhol”, ${korean('아무 때나')} „bármikor”.</p>`,
    customHtml: simpleTable(['Kifejezés', 'Jelentés', 'Tagadással (아무 N도)'], [[koreanGlossedInRow('아무거나'), 'bármi', koreanWithTranslation('아무것도 없어요', 'semmi sincs')], [koreanGlossedInRow('아무나'), 'bárki', koreanWithTranslation('아무도 안 왔어요', 'senki sem jött')], [koreanGlossedInRow('아무 데나'), 'bárhol, bárhová', koreanWithTranslation('아무 데도 안 가요', 'sehová sem megyek')], [koreanGlossedInRow('아무 때나'), 'bármikor', '—']]),
    examples: [['<b>아무거나</b> 괜찮아요.', 'Bármi jó.'], ['<b>아무 데나</b> 앉으세요.', 'Üljön le, ahová szeretne.'], ['<b>아무 때나</b> 연락하세요.', 'Bármikor kereshet.'], ['그 일은 <b>아무나</b> 할 수 있는 일이 아니에요.', 'Azt a munkát nem tudja akárki elvégezni.']],
  },
  {
    lesson: 8, point: 1, form: '-는/(으)ㄴ/(으)ㄹ 듯이', name: '„mintha …; úgy, ahogy …”',
    explanation: `<p>Hasonlatot fejez ki: a második rész <b>olyan módon</b> történik, <b>mintha</b> az első igaz lenne. Irodalmi, leíró szövegekben gyakori.</p>
<ul><li><b>Ige</b>: jelen ${korean('-는 듯이')}, múlt ${korean('-(으)ㄴ 듯이')}, feltételezett ${korean('-(으)ㄹ 듯이')}</li><li><b>Melléknév</b>: ${korean('-(으)ㄴ 듯이')}</li></ul>
<p>Feltételezést is kifejez („úgy tűnik”), és mondatvégen ${korean('-는/(으)ㄴ/(으)ㄹ 듯하다')} alakban is áll: ${korean('비가 올 듯해요')} „úgy tűnik, esni fog”.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => presentModifier(word, ' 듯이') }, { header: 'Múlt (ige)', conjugate: word => word.wordClass === 'verb' ? withEu(word, 'ㄴ 듯이') : null }, { header: '-(으)ㄹ 듯이', conjugate: word => withEu(word, 'ㄹ 듯이') }] },
    examples: [['아이가 잠을 <b>자는 듯이</b> 조용해요.', 'A gyerek olyan csendes, mintha aludna.'], ['그는 아무 일도 없었던 <b>듯이</b> 웃었어요.', 'Úgy nevetett, mintha mi sem történt volna.'], ['하늘이 금방이라도 비가 <b>올 듯이</b> 어두워요.', 'Olyan sötét az ég, mintha mindjárt esni kezdene.'], ['그 사람은 모든 것을 다 <b>아는 듯이</b> 말해요.', 'Úgy beszél, mintha mindent tudna.', 'ㄹ-tő: 알다 → 아는']],
    ownNote: `<p>Rövidebben ${korean('-듯이 / -듯')} igető után is: ${korean('물 쓰듯이')} „mint a vizet (pazarolva)”. Állandósult: ${korean('밥 먹듯이')} „rendszeresen, mint az evés”.</p>`,
  },
  {
    lesson: 8, point: 2, form: '피동 (-이-, -히-, -리-, -기-)', name: 'szenvedő (passzív) igék', conjugable: false,
    explanation: `<p>A szenvedő ige azt fejezi ki, hogy az alany <b>elszenvedi</b> a cselekvést (nem ő végzi): ${korean('문을 열다')} „kinyitja az ajtót” → ${korean('문이 열리다')} „az ajtó kinyílik”. Bizonyos tárgyas igék tövéhez <b>-이-, -히-, -리-, -기-</b> járul. Hogy melyik, azt szavanként kell megtanulni.</p>`,
    customHtml: simpleTable(['Toldalék', 'Cselekvő', 'Szenvedő', 'Jelentés'], [['-이-', koreanWithTranslation('보다 · 쓰다 · 놓다 · 바꾸다', 'lát · ír · tesz · cserél'), koreanGlossedInRow('보이다 · 쓰이다 · 놓이다 · 바뀌다'), 'látszik · íródik · le van téve · megváltozik'], ['-히-', koreanWithTranslation('닫다 · 먹다 · 잡다 · 읽다 · 막다', 'bezár · eszik · megfog · olvas · elzár'), koreanGlossedInRow('닫히다 · 먹히다 · 잡히다 · 읽히다 · 막히다'), 'bezáródik · megevődik · elkapják · olvassák · eldugul'], ['-리-', koreanWithTranslation('열다 · 듣다 · 팔다 · 걸다 · 풀다', 'kinyit · hall · elad · felakaszt · megold'), koreanGlossedInRow('열리다 · 들리다 · 팔리다 · 걸리다 · 풀리다'), 'kinyílik · hallatszik · elkel · lóg/tart · megoldódik'], ['-기-', koreanWithTranslation('안다 · 끊다 · 쫓다 · 씻다', 'ölel · megszakít · üldöz · mos'), koreanGlossedInRow('안기다 · 끊기다 · 쫓기다 · 씻기다'), 'ölelik · megszakad · üldözik · lemosódik']]),
    examples: [['가을이 되면 잘 익은 감이 주렁주렁 <b>달렸다</b>.', 'Ősszel fürtökben lógtak az érett datolyaszilvák (달다 → 달리다).'], ['바람 때문에 문이 <b>열렸어요</b>.', 'A szél miatt kinyílt az ajtó.'], ['창밖으로 바다가 <b>보여요</b>.', 'Az ablakból látszik a tenger.'], ['옆방에서 음악 소리가 <b>들려요</b>.', 'A szomszéd szobából zene hallatszik.', 'a 듣다 szenvedő alakja 들리다 (nem ㄷ-rendhagyó alak)']],
    ownNote: `<p>A szenvedő igék maguk szabályosan ragozódnak: ${korean('열려요, 열렸어요, 닫혀 있어요')}. Az ${korean('-아/어 있다')}-val állapotot jeleznek: ${korean('문이 열려 있어요')} „nyitva van az ajtó”. Sok igének nincs ilyen alakja; ott ${korean('-아/어지다')} vagy ${korean('되다')} használatos (${korean('만들어지다, 사용되다')}).</p>`,
  },
  {
    lesson: 9, point: 1, form: '-지 않아요?', name: '„nem …? hát nem …?” (egyetértést váró kérdés)',
    explanation: `<p>Ige vagy melléknév után a beszélő a véleményét <b>kérdés formájában</b> mondja, és a hallgató <b>egyetértését várja</b>: „Hát nem jó volt?”. A tő végétől függetlenül ${korean('-지 않아요?')}; múlt: ${korean('-지 않았어요?')}; főnévvel ${korean('-(이)지 않아요?')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-지 않아요?', conjugate: word => withPlainStem(word, '지 않아요?') }, { header: 'Múlt: -지 않았어요?', conjugate: word => withPlainStem(word, '지 않았어요?') }] },
    examples: [['이번 주 방송 정말 볼 만하<b>지 않았어</b>?', 'Hát nem volt tényleg érdemes megnézni az e heti adást?'], ['이 노래 정말 좋<b>지 않아요</b>?', 'Hát nem nagyon jó ez a dal?'], ['오늘 좀 덥<b>지 않아요</b>?', 'Nem kicsit meleg van ma?', '-지 előtt nincs ㅂ-változás: 덥지'], ['그 배우 연기 정말 잘하<b>지 않아요</b>?', 'Hát nem játszik nagyon jól az a színész?']],
    ownNote: `<p>Alakra azonos a hosszú tagadás kérdő formájával (2A 5. lecke), de a hanglejtés és a helyzet mutatja, hogy itt <b>állítást</b> erősítünk meg. Közeli rokona a ${korean('-잖아요')} (3A 6. lecke).</p>`,
  },
  {
    lesson: 9, point: 2, form: '얼마나 -는다고요/ㄴ다고요/다고요', name: '„de mennyire …!” (nyomatékos állítás)',
    explanation: `<p>Az ${korean('얼마나')} („mennyire”) + idézett állító forma + ${korean('-고요')} a beszélő <b>nyomatékos, érzelmes állítása</b>: „Nem is tudod, mennyire …!”.</p>
<ul><li><b>Ige</b>: 받침 után ${korean('-는다고요')}, magánhangzó után ${korean('-ㄴ다고요')}</li><li><b>Melléknév</b>: ${korean('-다고요')}; múlt: ${korean('-았다고요/었다고요')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => '얼마나 ' + plainStyleStatement(word) + '고요' }, { header: 'Múlt', conjugate: word => '얼마나 ' + withPast(word, '다고요') }] },
    examples: [['그 드라마가 <b>얼마나</b> 재미있<b>다고요</b>.', 'Nem is tudod, mennyire jó az a sorozat!'], ['우리 아이가 <b>얼마나</b> 잘 먹<b>는다고요</b>.', 'Nem is hinnéd, milyen jó étvágyú a gyerekünk!'], ['어제 <b>얼마나 추웠다고요</b>.', 'Ha tudnád, milyen hideg volt tegnap!', 'ㅂ-rendhagyó: 춥다 → 추웠다고요'], ['그 가수 노래를 들으면 <b>얼마나</b> 마음이 편해<b>진다고요</b>.', 'Ha hallgatod annak az énekesnek a dalait, nem is tudod, mennyire megnyugszol!']],
  },
  {
    lesson: 10, point: 1, form: '-더니', name: '„(láttam, hogy) …, aztán / de (most) …”',
    explanation: `<p>Ige vagy melléknév után a beszélő által <b>a múltban megfigyelt</b> helyzetet idézi fel, és azt mondja el, mi <b>következett utána</b>, vagy mi változott meg: „Tegnap még hideg volt, ma meg meleg van.” Általában <b>más személyről</b> vagy dolgokról (nem a beszélőről). A tő végétől függetlenül ${korean('-더니')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-더니', conjugate: word => withPlainStem(word, '더니') }] },
    examples: [['주인공이 책상 위를 보<b>더니</b> 깜짝 놀랐어요.', 'A főszereplő ránézett az asztalra, és megdöbbent.'], ['어제는 춥<b>더니</b> 오늘은 따뜻하네요.', 'Tegnap még hideg volt, ma meg meleg van.', '-더니 előtt nincs ㅂ-változás: 춥더니'], ['동생이 열심히 공부하<b>더니</b> 시험에 합격했어요.', 'Az öcsém szorgalmasan tanult, és át is ment a vizsgán.'], ['마크 씨가 아까부터 음악을 듣<b>더니</b> 갑자기 노래를 불러요.', 'Mark egy ideje zenét hallgatott, aztán hirtelen énekelni kezdett.']],
    ownNote: `<p>A beszélő saját cselekvésének következményére a ${korean('-았더니/었더니')} (3B 10. lecke) kell: ${korean('운동을 했더니 피곤해요')}.</p>`,
  },
  {
    lesson: 10, point: 2, form: '-는/(으)ㄴ 것이다', name: '„arról van szó, hogy …; szóval …” (magyarázat, kiemelés)',
    explanation: `<p>A mondatot ${korean('것이다')} („az a dolog”) zárja: a beszélő <b>magyaráz, összefoglal, kiemel</b>, vagy történetet mesél élénken. Beszédben: ${korean('-는 거예요 / -는 거야')}.</p>
<ul><li><b>Ige</b>: jelen ${korean('-는 것이다')}, múlt ${korean('-(으)ㄴ 것이다')}</li><li><b>Melléknév</b>: ${korean('-(으)ㄴ 것이다')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => presentModifier(word, ' 거예요') }, { header: 'Múlt (ige)', conjugate: word => word.wordClass === 'verb' ? withEu(word, 'ㄴ 거예요') : null }] },
    examples: [['주인공이 깜짝 놀라서 무엇인가를 찾기 시작하<b>는 거야</b>.', 'És akkor a főszereplő megdöbben, és elkezd keresni valamit.'], ['그래서 늦<b>은 거예요</b>.', 'Szóval ezért késtem el.'], ['한국어를 배우는 이유는 한국 친구와 이야기하고 싶기 때문<b>인 거예요</b>.', 'Azért tanulok koreaiul, mert koreai barátaimmal szeretnék beszélgetni.'], ['그 노래를 듣고 <b>운 거예요</b>?', 'Szóval attól a daltól sírtál el?', 'ㄹ-tő: 울다 → 운']],
    correctIncorrect: [{ correct: '그 노래를 듣고 운 거예요?', translation: 'Szóval attól a daltól sírtál el?' }, { incorrect: '그 노래를 듣고 울은 거예요?', reason: 'ㄹ-tőnél az ㄹ kiesik: 울다 → 운' }],
    ownNote: `<p>Történetmesélésben a ${korean('-는 거야')} jelen idő élénkebbé teszi az elbeszélést („és akkor odamegy…”).</p>`,
  },
  {
    lesson: 11, point: 1, form: '(으)로서', name: '„-ként, … minőségében”', conjugable: false,
    explanation: `<p>Főnév után azt jelöli, milyen <b>minőségben, státuszban, szerepben</b> tesz valamit valaki: „szülőként”, „diákként”. <b>받침</b> után ${korean('으로서')}, magánhangzó és <b>ㄹ</b> után ${korean('로서')}.</p>`,
    table: { kind: 'noun', nouns: [{ word: '부모', description: 'magánhangzóra végződik' }, { word: '학생', description: 'mássalhangzóra végződik' }, { word: '대표', description: 'magánhangzóra végződik' }], nounColumns: [{ header: '(으)로서', conjugate: noun => nounWithParticle(noun, '으로서', '로서', true) }] },
    examples: [['춘천은 관광 도시<b>로서</b> 유명해요.', 'Csuncshon turistavárosként híres.'], ['학생<b>으로서</b> 열심히 공부해야 해요.', 'Diákként szorgalmasan kell tanulnom.'], ['저는 반 대표<b>로서</b> 이 자리에 왔습니다.', 'Az osztály képviselőjeként jöttem el.'], ['부모<b>로서</b> 아이에게 좋은 모범이 되고 싶어요.', 'Szülőként jó példát szeretnék mutatni a gyereknek.']],
    ownNote: `<p>Ne keverjük össze a ${korean('(으)로써')} alakkal, amely <b>eszközt</b> jelent („azáltal, hogy…”): ${korean('대화로써 문제를 해결했어요')}.</p>`,
  },
  {
    lesson: 11, point: 2, form: '에 대해서', name: '„-ról/-ről, … témájában”', conjugable: false,
    explanation: `<p>Főnév után a beszéd, gondolkodás <b>tárgyát, témáját</b> jelöli: „Koreáról beszélek”. Rövidebben: ${korean('에 대해')}. Főnév előtt: ${korean('에 대한 N')} (${korean('한국에 대한 책')} „Koreáról szóló könyv”). Minden főnév után ugyanaz.</p>`,
    examples: [['저는 춘천<b>에 대해</b> 소개하겠습니다.', 'Csuncshonról fogok beszélni.'], ['한국 문화<b>에 대해서</b> 알고 싶어요.', 'Szeretnék a koreai kultúráról tanulni.'], ['환경 문제<b>에 대한</b> 기사를 읽었어요.', 'Olvastam egy cikket a környezeti problémákról.'], ['그 일<b>에 대해서</b> 어떻게 생각해요?', 'Mit gondolsz erről a dologról?']],
  },
  {
    lesson: 12, point: 1, form: '-(으)며', name: '„és” (hivatalos, írott felsorolás)',
    explanation: `<p>Ige vagy melléknév után két vagy több tényt, állapotot <b>sorol fel</b>, mint a ${korean('-고')}, de <b>írottabb, hivatalosabb</b> stílusban (előadás, jelentés, leírás). Három vagy több tag esetén szép váltogatni: ${korean('-고 … -(으)며 …')}.</p>
<p><b>받침</b> után: <b>-으며</b>, magánhangzó és <b>ㄹ</b> után: <b>-며</b>. Főnévvel: ${korean('-(이)며')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)며', conjugate: word => withEu(word, '며') }] },
    examples: [['한국은 사계절이 뚜렷하<b>며</b> 산이 많습니다.', 'Koreában jól elkülönülnek az évszakok, és sok a hegy.'], ['서울은 한국의 수도이<b>며</b> 가장 큰 도시입니다.', 'Szöul Korea fővárosa és legnagyobb városa.'], ['이 지역은 여름에 <b>더우며</b> 비가 많이 옵니다.', 'Ezen a vidéken nyáron meleg van, és sok eső esik.', 'ㅂ-rendhagyó: 덥다 → 더우며'], ['그는 노래를 부르<b>며</b> 춤을 췄습니다.', 'Énekelt és közben táncolt.']],
    ownNote: `<p>A ${korean('-(으)며')} egyidejűséget is jelenthet (= ${korean('-(으)면서')}), ahogy az utolsó példában.</p>`,
  },
  {
    lesson: 12, point: 2, form: '-고자 하다', name: '„szándékozom …” (hivatalos szándék)',
    explanation: `<p>Ige után a beszélő <b>szándékát, célját</b> fejezi ki <b>hivatalos</b> helyzetben (előadás, beszéd, jelentés). A ${korean('-(으)려고 하다')} írott, formális párja. A tő végétől függetlenül ${korean('-고자 하다')}; jellemzően ${korean('-고자 합니다')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-고자 합니다', conjugate: word => withPlainStem(word, '고자 합니다') }] },
    examples: [['한국에 대해 발표하<b>고자 합니다</b>.', 'Koreáról szeretnék előadást tartani.'], ['오늘은 환경 문제에 대해 이야기하<b>고자 합니다</b>.', 'Ma a környezeti problémákról kívánok beszélni.'], ['여러분의 의견을 듣<b>고자</b> 이 자리를 마련했습니다.', 'Azért szerveztük ezt az alkalmat, hogy meghallgassuk a véleményüket.', '-고 előtt nincs ㄷ-változás: 듣고자'], ['한국 회사에 취직하<b>고자</b> 한국어를 배우고 있습니다.', 'Azért tanulok koreaiul, hogy koreai cégnél helyezkedjek el.']],
  },
];
export default {
  lessons: {
    1: { korean: '여건이 된다면 외국에서 1년쯤 살아 봤으면 해요', hungarian: 'Ha a körülmények engedik, szeretnék egy évet külföldön élni.' },
    2: { korean: '한 번쯤 가 볼 만한 곳이야', hungarian: 'Egyszer érdemes elmenni oda.', pronunciation: '유음화', pronunciationHungarian: 'likvidásodás, a tagolástól függően (잘 나왔지? [잘라와찌])' },
    3: { korean: '드디어 새 앨범이 나온대', hungarian: 'Azt mondják, végre kijön az új album.' },
    4: { korean: '폭설로 인해서 많은 피해가 발생하고 있습니다', hungarian: 'A heves havazás nagy károkat okoz.', pronunciation: 'ㅎ 탈락', pronunciationHungarian: 'a ㅎ kiesése' },
    5: { korean: '어떤 앱을 주로 사용하냐면요', hungarian: 'Hogy milyen appot használok főleg? Hát…' },
    6: { korean: '마늘은 면역력을 높여 줄 뿐만 아니라 암 예방에도 좋습니다', hungarian: 'A fokhagyma nemcsak az immunrendszert erősíti, hanem a rák megelőzésében is segít.', pronunciation: '비음화', pronunciationHungarian: 'orrhangúsodás' },
    7: { korean: '버스가 흔들려서 넘어질 뻔했어요', hungarian: 'A busz megrázkódott, majdnem elestem.' },
    8: { korean: '가을이 되면 잘 익은 감이 주렁주렁 달렸다', hungarian: 'Ősszel fürtökben lógtak az érett datolyaszilvák.', pronunciation: '경음화', pronunciationHungarian: 'keményedés' },
    9: { korean: '이번 주 방송 정말 볼 만하지 않았어?', hungarian: 'Hát nem volt érdemes megnézni az e heti adást?' },
    10: { korean: '주인공이 책상 위를 보더니 깜짝 놀라서 무엇인가를 찾기 시작하는 거야', hungarian: 'A főszereplő ránéz az asztalra, megdöbben, és keresni kezd valamit.', pronunciation: '억양 (의문문)', pronunciationHungarian: 'a kérdő mondat hanglejtése' },
    11: { korean: '저는 춘천에 대해 소개하겠습니다', hungarian: 'Csuncshonról fogok beszélni.' },
    12: { korean: '한국에 대해 발표하고자 합니다', hungarian: 'Koreáról szeretnék előadást tartani.', pronunciation: '유음화', pronunciationHungarian: 'likvidásodás (연락 [열락], 설날 [설랄])' },
  },
  points: points.map(point => Object.assign({ studentBookPage: studentBookPageOf(point.lesson, point.point), vocabularyGrammarPage: vocabularyGrammarPageOf(point.lesson, point.point) }, point)),
} satisfies BookData;
