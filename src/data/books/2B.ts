import { withAOrEo, withPast, withEu, withPlainStem, type Word } from '../../lib/conjugation';
import { exampleList } from '../../lib/html';
import type { BookData, PointSource } from '../types';
const korean = (text: string) => `<span class="korean">${text}</span>`;
const koreanWithTranslation = (koreanText: string, hungarianText: string) => `<span class="korean">${koreanText}</span><span class="translation">${hungarianText}</span>`;
const simpleTable = (headers: string[], rows: string[][]) => `<div class="table-wrapper"><table class="plain"><thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const vocabularyGrammarPageOf = (lesson: number, point: number) => 26 + 2 * (lesson - 1) + (point - 1), studentBookPageOf = (lesson: number, point: number) => 16 + 8 * (lesson - 1) + (point - 1);
const isItdaOrEopda = (word: Word) => /(있|없)다$/.test(word.dictionaryForm);
const presentModifier = (word: Word, ending: string) => (word.wordClass === 'verb' || isItdaOrEopda(word)) ? withPlainStem(word, '는' + ending) : withEu(word, 'ㄴ' + ending);
const informalSpeech = (word: Word) => withAOrEo(word, '');

const points: PointSource[] = [
  {
    lesson: 1, point: 1, form: '-(으)ㄹ래요?', name: '„Lenne kedved …? / Mit szeretnél?” (a másik szándéka)',
    explanation: `<p>Ige után a hallgató <b>szándékára, kedvére</b> kérdez rá: „Akarsz …?”, „Mit szeretnél …?”. Kötetlen, beszélt nyelvi, közvetlen hangulatú.</p>
<p><b>받침</b> után: <b>-을래요?</b>, magánhangzó után: <b>-ㄹ래요?</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik és <b>-ㄹ래요?</b> jön (${korean('만들래요?')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ래요?', conjugate: word => withEu(word, 'ㄹ래요?') }] },
    examples: [['이번 주 금요일에 동아리 모임 <b>할래요</b>?', 'Lenne kedved pénteken klubtalálkozót tartani?'], ['뭐 마<b>실래요</b>?', 'Mit innál?'], ['저녁에 같이 김밥 만<b>들래요</b>?', 'Csinálunk este együtt kimbapot?', 'ㄹ-tő: 만들다 → 만들래요'], ['이 노래 같이 들<b>을래요</b>?', 'Meghallgatod velem ezt a dalt?', 'ㄷ-rendhagyó: 듣다 → 들을래요']],
    ownNote: `<p>Kijelentésként a beszélő saját szándékát jelenti: ${korean('저는 커피 마실래요')} „Én kávét kérek”.</p>`,
    honorific: {
      rows: [['-(으)ㄹ래요?', 'akarsz …? (közvetlen)', '-(으)시겠어요?', 'parancsol …? (udvarias)'], ['-(으)ㄹ래요?', 'akarsz …? (közvetlen)', '-(으)실래요?', 'kér …? (barátságos, tiszteleti)']],
      note: `<p>Idősebbnek, vendégnek, ügyfélnek a ${korean('-(으)ㄹ래요?')} túl közvetlen. A legudvariasabb a ${korean('-(으)시겠어요?')}; a ${korean('-(으)실래요?')} tiszteleti, de barátságosabb, kötetlenebb. A külön tiszteleti igék itt is érvényesek: ${korean('먹다/마시다 → 드시다')}.</p>`,
      examples: [['뭐 <b>드시겠어요</b>?', 'Mit parancsol? (Mit enne/inna?)'], ['커피 한 잔 <b>드실래요</b>?', 'Kér egy kávét?'], ['여기 앉<b>으시겠어요</b>?', 'Leülne ide?']],
    },
  },
  {
    lesson: 1, point: 2, form: '-(으)ㄹ게요', name: '„… majd én …; megígérem, hogy …” (szándék, ígéret)',
    explanation: `<p>Ige után a beszélő <b>szándékát, akaratát</b> fejezi ki, sokszor a hallgatóra tekintettel: <b>ígéret, vállalás</b>. Csak első személyben, és kérdésben nem használjuk.</p>
<p><b>받침</b> után: <b>-을게요</b>, magánhangzó után: <b>-ㄹ게요</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik és <b>-ㄹ게요</b> jön (${korean('만들게요')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ게요', conjugate: word => withEu(word, 'ㄹ게요') }] },
    examples: [['제가 음식을 준비<b>할게요</b>.', 'Az ételt majd én készítem el.'], ['내일 꼭 일찍 <b>올게요</b>.', 'Megígérem, hogy holnap korán jövök.'], ['이사할 때 제가 도<b>울게요</b>.', 'Ha költözöl, segítek.', 'ㅂ-rendhagyó: 돕다 → 도울게요'], ['다음부터는 선생님 말씀을 잘 들<b>을게요</b>.', 'Mostantól jól oda fogok figyelni a tanárra.', 'ㄷ-rendhagyó: 듣다 → 들을게요']],
    ownNote: `<p><b>-(으)ㄹ게요 vagy -(으)ㄹ 거예요?</b> Az ${korean('-(으)ㄹ 거예요')} semleges terv („ezt fogom csinálni”), a ${korean('-(으)ㄹ게요')} a hallgatónak szóló vállalás, ígéret („rendben, majd én…”). Kiejtése: [-ㄹ께요].</p>`,
    correctIncorrect: [{ correct: '제가 갈게요.', translation: 'Majd én megyek.' }, { incorrect: '마크 씨가 갈게요.', reason: 'csak a beszélő szándéka lehet' }, { incorrect: '뭐 먹을게요?', reason: 'kérdésben -(으)ㄹ래요? kell' }],
  },
  {
    lesson: 2, point: 1, form: '에서부터', name: '„-tól/-től (kezdve)” (kiinduló hely hangsúlyozva)', conjugable: false,
    explanation: `<p>Főnév után azt a <b>helyet</b> jelöli, <b>ahonnan</b> egy cselekvés vagy állapot kiindul, és ezt <b>hangsúlyozza</b>. Az ${korean('에서')} és a ${korean('부터')} összetétele, gyakran ${korean('까지')}-val párban. Minden főnév után ugyanaz.</p>`,
    examples: [['세종학당<b>에서부터</b> 걸어서 10분쯤 걸려요.', 'A Szedzsong Intézettől gyalog kb. 10 perc.'], ['집<b>에서부터</b> 학교까지 뛰어왔어요.', 'Otthonról egészen az iskoláig futottam.'], ['여기<b>에서부터</b> 저기까지 청소해 주세요.', 'Innen addig takarítsd ki, kérlek.'], ['공항<b>에서부터</b> 비가 오기 시작했어요.', 'Már a reptéren elkezdett esni.']],
    ownNote: `<p>Időnél egyszerűen ${korean('부터')}: ${korean('아침부터 저녁까지')}. Az ${korean('에서')} önmagában is jelenthet kiindulópontot (${korean('집에서 학교까지')}); a ${korean('부터')} csak kiemeli.</p>`,
  },
  {
    lesson: 2, point: 2, form: '-(으)ㄹ (동사 미래)', name: 'ige jövő idejű jelzői alakja („az elvégzendő munka”)',
    explanation: `<p>Ige után áll, amikor az ige <b>főnevet jelöl</b>, és a cselekvés <b>jövőbeli, tervezett, szándékolt</b>: ${korean('내일 할 일')} „a holnapi teendő (amit holnap csinálok)”.</p>
<p><b>받침</b> után: <b>-을</b>, magánhangzó után: <b>-ㄹ</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik: ${korean('만들 음식')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ + főnév', conjugate: word => withEu(word, 'ㄹ') + ' 거' }] },
    examples: [['주말에 <b>할</b> 일이 많아요.', 'Sok teendőm van hétvégére.'], ['파티에서 먹<b>을</b> 음식을 샀어요.', 'Megvettem az ételt, amit a bulin eszünk.'], ['여행 갈 때 들<b>을</b> 노래를 골랐어요.', 'Kiválasztottam a dalokat, amiket az úton hallgatok.', 'ㄷ-rendhagyó: 듣다 → 들을'], ['내일 만<b>들</b> 케이크 재료를 준비했어요.', 'Előkészítettem a holnapi torta hozzávalóit.', 'ㄹ-tő: 만들다 → 만들']],
    ownNote: `<p>Sok állandó szerkezet erre épül: ${korean('-(으)ㄹ 때')}, ${korean('-(으)ㄹ 수 있다')}, ${korean('-(으)ㄹ 거예요')}, ${korean('-(으)ㄹ 것 같다')}. Összefoglaló: Alapszabályok 7.</p>`,
  },
  {
    lesson: 3, point: 1, form: '-(으)시-', name: 'tiszteleti alak (az alany tisztelete)',
    explanation: `<p>Ige vagy melléknév tövéhez kapcsolódik, és az <b>alany iránti tiszteletet</b> fejezi ki (idősebb, magasabb rangú személy). Utána jön a többi végződés: ${korean('-(으)세요')} (= ${korean('시 + 어요')}), ${korean('-(으)셨어요')}, ${korean('-(으)십니다')}.</p>
<p><b>받침</b> után: <b>-으시-</b>, magánhangzó után: <b>-시-</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik: ${korean('만드시다')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen -(으)세요', conjugate: word => withEu(word, '세요') }, { header: 'Múlt -(으)셨어요', conjugate: word => withEu(word, '셨어요') }, { header: 'Formális -(으)십니다', conjugate: word => withEu(word, '십니다') }] },
    customHtml: `<h5>Külön tiszteleti szavak</h5>` + simpleTable(['Alap', 'Tiszteleti', 'Alap', 'Tiszteleti'], [[koreanWithTranslation('먹다 / 마시다', 'eszik / iszik'), koreanWithTranslation('드시다', 'eszik, iszik (tiszteleti)'), koreanWithTranslation('이/가', 'alanyjelölő'), koreanWithTranslation('께서', 'alanyjelölő (tiszteleti)')], [koreanWithTranslation('자다', 'alszik'), koreanWithTranslation('주무시다', 'alszik (tiszteleti)'), koreanWithTranslation('은/는', 'témajelölő'), koreanWithTranslation('께서는', 'témajelölő (tiszteleti)')], [koreanWithTranslation('있다 (személy)', 'van, ott tartózkodik'), koreanWithTranslation('계시다', 'van, ott tartózkodik (tiszteleti)'), koreanWithTranslation('에게', '-nak/-nek (személynek)'), koreanWithTranslation('께', '-nak/-nek (tiszteleti)')], [koreanWithTranslation('말하다', 'mond, beszél'), koreanWithTranslation('말씀하시다', 'mond, beszél (tiszteleti)'), koreanWithTranslation('집', 'ház, otthon'), koreanWithTranslation('댁', 'ház, otthon (tiszteleti)')], [koreanWithTranslation('아프다', 'beteg, fáj'), koreanWithTranslation('편찮으시다', 'beteg (tiszteleti)'), koreanWithTranslation('나이 / 이름', 'életkor / név'), koreanWithTranslation('연세 / 성함', 'életkor / név (tiszteleti)')]]),
    examples: [['할머니께서 직접 만<b>드신</b> 목걸이예요.', 'Ezt a nyakláncot a nagymamám maga készítette.', 'ㄹ-tő: 만들다 → 만드신'], ['아버지께서는 회사에 다니<b>세요</b>.', 'Édesapám egy cégnél dolgozik.'], ['선생님께서 음악을 들<b>으세요</b>.', 'A tanár úr zenét hallgat.', 'ㄷ-rendhagyó: 듣다 → 들으세요'], ['할아버지께서 진지를 <b>드셨어요</b>.', 'Nagyapa megebédelt (tiszteleti szavakkal).']],
    ownNote: `<p>Magunkra soha nem használjuk. A ${korean('-(으)세요')} lehet kijelentés („ő …”), kérdés és felszólítás is (1A 6. lecke). A rendhagyók a 으-kezdetű végződés szabályait követik: ${korean('덥다 → 더우세요, 짓다 → 지으세요')}.</p>`,
  },
  {
    lesson: 3, point: 2, form: '에게만, 에게도', name: '„csak neki” / „neki is”', conjugable: false,
    explanation: `<p>Az ${korean('에게')} („-nak/-nek”) összetételei: <b>에게만</b> = ${korean('에게 + 만')} „<b>csak</b> neki (egyetlen személynek)”; <b>에게도</b> = ${korean('에게 + 도')} „neki <b>is</b> (a másik mellett)”. Minden főnév után ugyanaz; beszédben ${korean('한테만, 한테도')}.</p>`,
    examples: [['이 이야기는 너<b>에게만</b> 말하는 거야.', 'Ezt csak neked mondom.'], ['동생<b>에게도</b> 선물을 줬어요.', 'Az öcsémnek is adtam ajándékot.'], ['저는 친구들<b>한테만</b> 연락했어요.', 'Csak a barátaimnak szóltam.']],
    honorific: {
      rows: [['에게만', 'csak neki', '께만', 'csak neki (tiszteleti)'], ['에게도', 'neki is', '께도', 'neki is (tiszteleti)']],
      note: `<p>Tisztelt személynél az ${korean('에게')} helyére ${korean('께')} kerül (2B 7. lecke), a ${korean('만')} és a ${korean('도')} ugyanúgy hozzájárul. Az „ad” ilyenkor ${korean('드리다')}, a „mond” ${korean('말씀드리다')}.</p>`,
      examples: [['부모님<b>께도</b> 편지를 썼어요.', 'A szüleimnek is írtam levelet.'], ['이 일은 선생님<b>께만</b> 말씀드렸어요.', 'Ezt csak a tanár úrnak mondtam el.'], ['할아버지<b>께도</b> 선물을 드렸어요.', 'A nagyapának is adtam ajándékot.']],
    },
  },
  {
    lesson: 4, point: 1, form: '-다가', name: '„… közben (abbahagyva) …”: megszakított cselekvés',
    explanation: `<p>Ige után azt fejezi ki, hogy egy cselekvés vagy állapot <b>megszakad</b>, és átvált egy másikba; vagy hogy valami közben, <b>útközben</b> történik más: ${korean('오다가 친구를 만났어요')} „idefelé jövet összefutottam egy barátommal”. A tő végétől függetlenül ${korean('-다가')}; beszédben ${korean('-다')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-다가', conjugate: word => withPlainStem(word, '다가') }] },
    examples: [['세종학당에 오<b>다가</b> 중학교 때 친구를 만났어요.', 'Idefelé jövet összefutottam egy középiskolai barátommal.'], ['공부하<b>다가</b> 잠이 들었어요.', 'Tanulás közben elaludtam.'], ['음악을 듣<b>다가</b> 전화를 받았어요.', 'Zenehallgatás közben felvettem a telefont.', '-다가 előtt nincs ㄷ-változás: 듣다가'], ['밥을 먹<b>다가</b> 갑자기 나갔어요.', 'Evés közben hirtelen kiment.']],
    ownNote: `<p>A két tagmondat alanya azonos. ${korean('-았다가/었다가')}: az első cselekvés <b>befejeződött</b>, majd jött a másik: ${korean('학교에 갔다가 왔어요')} „elmentem az iskolába és visszajöttem”.</p>
<p>Változást jelentő igével (${korean('-아지다/어지다')}, 3A 9. lecke) jól látszik a különbség:</p>
${exampleList([['감기가 나아지다가 다시 심해졌어요.', 'Már javulóban volt a megfázásom, de újra rosszabb lett.', 'ㅅ-rendhagyó: 낫다 → 나아지다'], ['감기가 나아졌다가 다시 심해졌어요.', 'Javult a megfázásom, aztán újra rosszabb lett.']])}`,
  },
  {
    lesson: 4, point: 2, form: '-아/어 주다', name: '„megteszi valakinek / valaki kedvéért”',
    explanation: `<p>Ige után azt fejezi ki, hogy a cselekvést <b>valaki más javára</b> végezzük: segítség felajánlása, ígérete, illetve <b>segítség kérése</b> (${korean('-아/어 주세요')}). A <b>-아/어</b> szabály szerint: ${korean('가 주다, 읽어 주다, 해 주다')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: 'Kérés: -아/어 주세요', conjugate: word => withAOrEo(word, ' 주세요') }, { header: 'Felajánlás: -아/어 줄게요', conjugate: word => withAOrEo(word, ' 줄게요') }] },
    examples: [['사진 좀 찍어 <b>주세요</b>.', 'Lefotóznál, kérlek?'], ['제가 가방을 들어 <b>줄게요</b>.', 'Majd én viszem a táskádat.'], ['친구가 길을 가르쳐 <b>줬어요</b>.', 'A barátom megmutatta az utat.'], ['제 이야기 좀 들어 <b>주세요</b>.', 'Hallgass meg, kérlek.', 'ㄷ-rendhagyó: 듣다 → 들어 주세요']],
    ownNote: `<p>Ha a beszélő magának kér: ${korean('-아/어 주세요')}; idézve ${korean('-아/어 달라고 하다')} (3A 12. lecke).</p>`,
    honorific: {
      rows: [['-아/어 주다', 'megteszi valakinek', '-아/어 드리다', 'megteszi tisztelt személynek'], ['-아/어 주다', 'valaki megteszi nekem', '-아/어 주시다', 'tisztelt személy teszi meg nekem']],
      note: `<p>Két irány van. Ha <b>a kedvezményezett</b> tisztelt (mi teszünk valamit egy idősebbnek), ${korean('-아/어 드리다')} kell (3B 1. lecke). Ha <b>a cselekvő</b> tisztelt (egy idősebb tesz nekünk valamit), ${korean('-아/어 주시다')}. Kérésnél a ${korean('-아/어 주세요')} már udvarias; még udvariasabb a ${korean('-아/어 주시겠어요?')}.</p>`,
      examples: [['할머니께 책을 읽어 <b>드렸어요</b>.', 'Felolvastam egy könyvet a nagymamának.'], ['선생님께서 길을 가르쳐 <b>주셨어요</b>.', 'A tanár úr megmutatta nekem az utat.'], ['제가 가방을 들어 <b>드릴게요</b>.', 'Majd én viszem a táskáját.'], ['사진 좀 찍어 <b>주시겠어요</b>?', 'Lefényképezne, kérem?']],
    },
  },
  {
    lesson: 5, point: 1, form: '-네요', name: '„… (de) …!” (most tapasztalt dologra rácsodálkozás)',
    explanation: `<p>Ige vagy melléknév után olyasmit mond ki, amit a beszélő <b>épp most, közvetlenül tapasztalt</b> meg; gyakran <b>rácsodálkozás</b>: „De szép!”, „Nahát, esik!”. A tő végétől függetlenül ${korean('-네요')}, <b>ㄹ-tőnél</b> az ㄹ kiesik (${korean('기네요, 사네요')}). Állhat előtte ${korean('-았/었-')} és ${korean('-(으)시-')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-네요', conjugate: word => withPlainStem(word, '네요') }, { header: 'Múlt: -았네요/었네요', conjugate: word => withPast(word, '네요') }] },
    examples: [['와, 공연장이 정말 크<b>네요</b>!', 'Hű, de nagy ez a koncertterem!'], ['밖에 비가 오<b>네요</b>.', 'Nahát, kint esik.'], ['한국어를 정말 잘하시<b>네요</b>.', 'Ön tényleg nagyon jól beszél koreaiul!'], ['오늘 날씨가 덥<b>네요</b>.', 'Ma aztán meleg van!', '-네요 előtt nincs ㅂ-változás: 덥네요']],
    ownNote: `<p>A ㅎ-rendhagyóknál is megmarad a ㅎ: ${korean('그렇네요')} (ritkábban ${korean('그러네요')}). Barátok közt: ${korean('-네')} (${korean('예쁘네!')}). Hasonló, de egyedül, magában mondott csodálkozás: ${korean('-는구나/구나')} (3B 3. lecke).</p>`,
  },
  {
    lesson: 5, point: 2, form: '-지 말다', name: 'tiltás („ne …!”)',
    explanation: `<p>Ige után <b>tilt</b>: „ne csináld!”. Leggyakrabban ${korean('-지 마세요')} alakban. A tő végétől függetlenül ${korean('-지')}; a ${korean('말다')} ragozódik (${korean('마세요, 마, 맙시다')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-지 마세요', conjugate: word => withPlainStem(word, '지 마세요') }, { header: 'Barátnak: -지 마', conjugate: word => withPlainStem(word, '지 마') }] },
    examples: [['공연 중에 핸드폰을 사용하<b>지 마세요</b>.', 'Az előadás alatt ne használja a mobilját!'], ['여기에서 사진을 찍<b>지 마세요</b>.', 'Itt ne fényképezzen!'], ['걱정하<b>지 마세요</b>.', 'Ne aggódjon!'], ['큰 소리로 음악을 듣<b>지 마세요</b>.', 'Ne hallgasson hangosan zenét!', '-지 előtt nincs ㄷ-változás: 듣지']],
    ownNote: `<p>Közös tiltás: ${korean('-지 맙시다')} („ne …-junk”). Két dolog közül választva: ${korean('-지 말고')} („ne X-et, hanem Y-t”): ${korean('버스를 타지 말고 지하철을 타세요')}. Melléknévvel nem állhat.</p>`,
  },
  {
    lesson: 6, point: 1, form: '-아도/어도 되다', name: '„szabad …, lehet …” (engedély)',
    explanation: `<p>Ige után <b>engedélyt</b> kér vagy ad: „Szabad …?”, „Igen, nyugodtan …”. A <b>-아/어</b> szabály szerint: ${korean('가도 돼요, 먹어도 돼요, 해도 돼요')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-아도/어도 돼요(?)', conjugate: word => withAOrEo(word, '도 돼요') }] },
    examples: [['여기에서 노트북을 사용해<b>도 돼요</b>?', 'Használhatom itt a laptopot?'], ['네, 사용해<b>도 돼요</b>.', 'Igen, használhatja.'], ['창문 좀 열어<b>도 돼요</b>?', 'Kinyithatom az ablakot?'], ['이 노래 좀 들어<b>도 돼요</b>?', 'Meghallgathatom ezt a dalt?', 'ㄷ-rendhagyó: 듣다 → 들어도']],
    ownNote: `<p>„Nem kell …”: ${korean('안 -아도/어도 되다')} vagy ${korean('-지 않아도 되다')}: ${korean('내일은 안 와도 돼요')}. Udvariasabb engedélykérés: ${korean('-아도/어도 될까요?')}. Tiltó válasz: ${korean('-(으)면 안 되다')} (következő pont).</p>`,
  },
  {
    lesson: 6, point: 2, form: '-(으)면 안 되다', name: '„nem szabad …” (tiltás)',
    explanation: `<p>Ige után azt mondja, hogy valamit <b>nem szabad</b> megtenni, vagy valami nem lehet úgy. Szabályok, tiltások leírására.</p>
<p><b>받침</b> után: <b>-으면 안 되다</b>, magánhangzó és <b>ㄹ</b> után: <b>-면 안 되다</b>.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)면 안 돼요', conjugate: word => withEu(word, '면 안 돼요') }] },
    examples: [['도서관에서 음식을 먹<b>으면 안 돼요</b>.', 'A könyvtárban nem szabad enni.'], ['여기에 차를 세우<b>면 안 돼요</b>.', 'Ide nem szabad leparkolni.'], ['수업 시간에 음악을 들<b>으면 안 돼요</b>.', 'Óra alatt nem szabad zenét hallgatni.', 'ㄷ-rendhagyó: 듣다 → 들으면'], ['가: 여기에서 사진을 찍어도 돼요? 나: 아니요, 찍<b>으면 안 돼요</b>.', '– Szabad itt fényképezni? – Nem, nem szabad.']],
  },
  {
    lesson: 7, point: 1, form: '에게서, 한테서, 께', name: '„-tól/-től” (személytől) és a tiszteleti 께', conjugable: false,
    explanation: `<p>Személy (vagy állat) után azt jelöli, <b>akitől</b> valami származik: kaptunk, hallottunk, tanultunk tőle. Az ${korean('에게서')} kicsit írottabb, a ${korean('한테서')} beszélt nyelvi.</p>
<p>A <b>께</b> az ${korean('에게')} („-nak/-nek”) tiszteleti párja: ${korean('할머니께 드렸어요')}. Minden főnév után ugyanaz.</p>`,
    examples: [['마리 씨<b>한테서</b> 그 친구 이야기를 들었어요.', 'Maritól hallottam erről a barátról.'], ['친구<b>에게서</b> 편지를 받았어요.', 'Levelet kaptam a barátomtól.'], ['선생님<b>께</b> 질문했어요.', 'Kérdeztem a tanártól (tiszteleti: a tanárnak tettem fel kérdést).'], ['어머니<b>께</b> 꽃을 드렸어요.', 'Virágot adtam édesanyámnak.']],
    ownNote: `<p>„-tól/-től” tiszteleti alakja szintén ${korean('께')}: ${korean('선생님께 배웠어요')} „a tanártól tanultam”. Beszédben a ${korean('서')} gyakran elmarad: ${korean('친구한테 들었어요')}. Helyekről: ${korean('에서')}: ${korean('회사에서 연락이 왔어요')}.</p>`,
  },
  {
    lesson: 7, point: 2, form: '-(으)니까 (발견)', name: '„amikor …, rájöttem, hogy …” (felfedezés)',
    explanation: `<p>Ige után azt fejezi ki, hogy az első cselekvés közben vagy után a beszélő <b>rájött, észrevett</b> valamit. A második tagmondat a felfedezett tény, gyakran múlt időben.</p>
<p><b>받침</b> után: <b>-으니까</b>, magánhangzó és <b>ㄹ</b> után: <b>-니까</b> (ㄹ kiesik: ${korean('사니까')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)니까', conjugate: word => withEu(word, '니까') }] },
    examples: [['집에 오<b>니까</b> 택배가 와 있었어요.', 'Amikor hazaértem, már ott volt a csomag.'], ['한국에 살아 보<b>니까</b> 정말 편해요.', 'Most, hogy Koreában élek, látom, hogy nagyon kényelmes.'], ['아침에 일어나<b>니까</b> 눈이 오고 있었어요.', 'Amikor reggel felkeltem, épp havazott.'], ['그 노래를 들<b>으니까</b> 고향 생각이 났어요.', 'Amikor meghallottam azt a dalt, eszembe jutott az otthonom.', 'ㄷ-rendhagyó: 듣다 → 들으니까']],
    ownNote: `<p>Az első tagmondat általában <b>nem kap múlt időt</b> (${korean('가니까')}, nem ${korean('갔으니까')}), ebben különbözik az ok-jelentésű ${korean('-(으)니까')}-tól (1B 12. lecke). Gyakori változata a ${korean('-아/어 보니까')} (3A 5. lecke).</p>`,
  },
  {
    lesson: 8, point: 1, form: '-는데/(으)ㄴ데 (대조)', name: '„…, de …” (ellentét)',
    explanation: `<p>Ige, melléknév, ${korean('이다')} után azt fejezi ki, hogy a második tagmondat <b>ellentétben áll</b> az elsővel: két szembeállított tény. Képzése azonos a 2A 8. leckében tanult háttér-jelentésűvel:</p>
<ul><li><b>Ige</b> és <b>있다/없다</b>: ${korean('-는데')} (ㄹ kiesik)</li><li><b>Melléknév</b>: 받침 után ${korean('-은데')}, magánhangzó után ${korean('-ㄴ데')} (ㄹ kiesik)</li><li>Múlt: ${korean('-았는데/었는데')}, főnév: ${korean('-인데')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => presentModifier(word, '데') }, { header: 'Múlt: -았는데/었는데', conjugate: word => withPast(word, '는데') }] },
    examples: [['어렸을 때는 머리가 길었<b>는데</b> 지금은 짧은 머리가 편해요.', 'Gyerekkoromban hosszú hajam volt, most viszont a rövid kényelmes.'], ['형은 키가 <b>큰데</b> 저는 작아요.', 'A bátyám magas, én viszont alacsony.'], ['이 식당은 음식은 맛있<b>는데</b> 좀 비싸요.', 'Ebben az étteremben finom az étel, de kicsit drága.'], ['어제는 <b>추웠는데</b> 오늘은 따뜻해요.', 'Tegnap hideg volt, ma viszont meleg van.', 'ㅂ-rendhagyó: 춥다 → 추웠는데']],
    ownNote: `<p>A ${korean('-지만')}-nál (1B 9. lecke) lágyabb, beszéltebb. A szembeállítást gyakran ${korean('은/는')} is erősíti mindkét tagmondatban.</p>`,
  },
  {
    lesson: 8, point: 2, form: '밖에', name: '„csak, nem más, mint …” (tagadással)', conjugable: false,
    explanation: `<p>Főnév után azt fejezi ki, hogy <b>nincs más lehetőség</b>, csak ez az egy. Mindig <b>tagadó</b> állítmánnyal áll (${korean('없다, 안, 못, 모르다')}). Minden főnév után ugyanaz.</p>`,
    examples: [['지갑에 천 원<b>밖에</b> 없어요.', 'Csak ezer von van a pénztárcámban.'], ['저는 한국어<b>밖에</b> 몰라요.', 'Csak koreaiul tudok.', '르-rendhagyó: 모르다 → 몰라요'], ['어제 세 시간<b>밖에</b> 못 잤어요.', 'Tegnap csak három órát tudtam aludni.'], ['우리 반에는 남학생이 한 명<b>밖에</b> 없어요.', 'Az osztályunkban csak egy fiú van.']],
    correctIncorrect: [{ correct: '천 원밖에 없어요.', translation: 'Csak ezer wonom van.' }, { incorrect: '천 원밖에 있어요.', reason: 'a 밖에 után tagadás kell' }, { correct: '천 원만 있어요.', translation: 'Csak ezer wonom van.', note: 'állító mondatban: 만 „csak”' }],
    ownNote: `<p>A ${korean('만')} („csak”) semleges, a ${korean('밖에')} hangsúlyozza, hogy <b>kevés</b>, és sajnáljuk. Igével: ${korean('-(으)ㄹ 수밖에 없다')} „nem tehetek mást, mint…”.</p>`,
  },
  {
    lesson: 9, point: 1, form: '-기 때문에', name: '„mivel, mert” (ok)',
    explanation: `<p>Ige vagy melléknév után az <b>okot, okozatot</b> fejezi ki: „mivel X, Y”. A tő végétől függetlenül ${korean('-기 때문에')}. Múltra: ${korean('-았기/었기 때문에')}; a ${korean('-겠-')} nem állhat előtte. Főnévvel: ${korean('N 때문에')} „X miatt”.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-기 때문에', conjugate: word => withPlainStem(word, '기 때문에') }, { header: 'Múlt: -았기/었기 때문에', conjugate: word => withPast(word, '기 때문에') }] },
    examples: [['그 사람은 성격이 좋<b>기 때문에</b> 친구가 많아요.', 'Mivel jó a természete, sok barátja van.'], ['어제 늦게 <b>잤기 때문에</b> 피곤해요.', 'Mivel tegnap későn feküdtem le, fáradt vagyok.'], ['날씨가 덥<b>기 때문에</b> 사람들이 바다에 가요.', 'Mivel meleg van, az emberek a tengerhez mennek.', '-기 előtt nincs ㅂ-változás: 덥기'], ['비 <b>때문에</b> 경기가 취소됐어요.', 'Az eső miatt elmaradt a meccs.']],
    ownNote: `<p>Erősebb, írottabb ok-kifejezés, mint a ${korean('-아서/어서')}. Felszólítás, javaslat előtt nem természetes; oda ${korean('-(으)니까')} kell. Mondat végén: ${korean('-기 때문이에요')} „azért, mert…”.</p>`,
  },
  {
    lesson: 9, point: 2, form: '-는데요/(으)ㄴ데요 (감탄)', name: '„… ám! milyen …!” (rácsodálkozás, csodálat)',
    explanation: `<p>Mondat végén valamiről <b>csodálattal, meglepetéssel, lelkesedéssel</b> beszél, gyakran válaszként: „Jaj, de jó!”, „Én is szeretnék!”. Képzése:</p>
<ul><li><b>Ige</b>, <b>있다/없다</b>: ${korean('-는데요')} (ㄹ kiesik)</li><li><b>Melléknév</b>: 받침 után ${korean('-은데요')}, magánhangzó után ${korean('-ㄴ데요')} (ㄹ kiesik)</li><li>Főnév: ${korean('-인데요')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-는데요/(으)ㄴ데요', conjugate: word => presentModifier(word, '데요') }] },
    examples: [['저도 그런 사람을 만나고 싶<b>은데요</b>!', 'Én is szeretnék egy ilyen emberrel találkozni!'], ['와, 그 사람 정말 멋있<b>는데요</b>!', 'Hű, az az ember nagyon menő!'], ['이 옷 정말 예<b>쁜데요</b>!', 'Nagyon szép ez a ruha!'], ['생각보다 날씨가 <b>추운데요</b>.', 'Hidegebb van, mint gondoltam.', 'ㅂ-rendhagyó: 춥다 → 추운데요']],
    ownNote: `<p>Ugyanez a forma lehet <b>puha ellenvetés</b> vagy <b>várakozás a válaszra</b> is: ${korean('저는 내일 시간이 없는데요')} „Nekem holnap nincs időm… (szóval?)”. A hanglejtés dönti el a jelentést.</p>`,
  },
  {
    lesson: 10, point: 1, form: '-는/(으)ㄴ 편이다', name: '„inkább …, viszonylag …”',
    explanation: `<p>Azt fejezi ki, hogy valami <b>nagyjából, inkább</b> ilyen, ebbe a csoportba tartozik; óvatos, nem túl határozott állítás.</p>
<ul><li><b>Ige</b>, <b>있다/없다</b>: ${korean('-는 편이다')} (ㄹ kiesik)</li><li><b>Melléknév</b>: 받침 után ${korean('-은 편이다')}, magánhangzó után ${korean('-ㄴ 편이다')} (ㄹ kiesik)</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-는/(으)ㄴ 편이에요', conjugate: word => presentModifier(word, ' 편이에요') }] },
    examples: [['산악자전거는 조금 위험<b>한 편이에요</b>.', 'A hegyi kerékpározás viszonylag veszélyes.'], ['저는 아침을 많이 먹<b>는 편이에요</b>.', 'Reggelire inkább sokat eszem.'], ['이 동네는 집값이 비<b>싼 편이에요</b>.', 'Ezen a környéken viszonylag drágák a lakások.'], ['한국어 문법이 좀 <b>어려운 편이에요</b>.', 'A koreai nyelvtan viszonylag nehéz.', 'ㅂ-rendhagyó: 어렵다 → 어려운']],
    ownNote: `<p>Igénél gyakran határozószóval: ${korean('자주, 많이, 잘, 일찍')}: ${korean('일찍 일어나는 편이에요')}. Múltbeli jellemzőre: ${korean('-(으)ㄴ 편이었다')}.</p>`,
  },
  {
    lesson: 10, point: 2, form: '-게', name: '„úgy, hogy …; azért, hogy …” (cél, eredmény)',
    explanation: `<p>Ige vagy melléknév után a következő cselekvés <b>célját vagy kívánt eredményét</b> adja meg: „úgy csináld, hogy …”, „azért, hogy …”. A tő végétől függetlenül ${korean('-게')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-게', conjugate: word => withPlainStem(word, '게') }] },
    examples: [['다치지 않<b>게</b> 조심하세요.', 'Vigyázz, nehogy megsérülj.'], ['뒤에서도 잘 들리<b>게</b> 크게 말해 주세요.', 'Beszéljen hangosan, hogy hátul is jól halljuk.'], ['감기에 걸리지 않<b>게</b> 따뜻하게 입으세요.', 'Öltözz fel melegen, hogy ne fázz meg.'], ['아이들이 먹기 쉽<b>게</b> 작게 잘랐어요.', 'Kicsire vágtam, hogy a gyerekek könnyen meg tudják enni.', '-게 előtt nincs ㅂ-változás: 쉽게']],
    ownNote: `<p>Melléknévből határozószót is képez: ${korean('맛있게 드세요')} „egyen jóízűen”, ${korean('예쁘게, 크게, 따뜻하게')}. Rokon szerkezetek: ${korean('-게 되다')} (2B 12. lecke), ${korean('-게 하다')} (4A 6. lecke).</p>`,
  },
  {
    lesson: 11, point: 1, form: '-아/어 (반말)', name: 'tegező, közvetlen stílus (반말)',
    explanation: `<p>A ${korean('-아요/어요')} <b>tegező</b> (반말) változata: egyszerűen elhagyjuk a ${korean('요')}-t. Fiatalabbaknak, hasonló korú barátoknak, közeli ismerősöknek. Kijelentés, kérdés, felszólítás és javaslat is lehet.</p>
<p>Képzése a <b>-아/어</b> szabály szerint (${korean('가, 먹어, 해')}). Főnév + 이다: 받침 után ${korean('-이야')}, magánhangzó után ${korean('-야')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-아/어', conjugate: informalSpeech }, { header: 'Múlt: -았어/었어', conjugate: word => withPast(word, '어') }] },
    examples: [['처음에는 모르는 게 많아서 답답<b>했어</b>.', 'Eleinte sok mindent nem tudtam, frusztráló volt.'], ['지금 뭐 <b>해</b>? – 음악 <b>들어</b>.', '– Mit csinálsz most? – Zenét hallgatok.', 'ㄷ-rendhagyó: 듣다 → 들어'], ['오늘 너무 <b>더워</b>.', 'Ma nagyon meleg van.', 'ㅂ-rendhagyó: 덥다 → 더워'], ['이거 누구 <b>거야</b>? – 내 <b>거야</b>.', '– Ez kié? – Az enyém.']],
    ownNote: `<p>반말-ban a névmások is változnak: ${korean('저 → 나 (제가 → 내가)')}, ${korean('네 → 응')}, ${korean('아니요 → 아니')}, és a ${korean('너')} „te”. Más 반말-végződések: ${korean('-니?, -자')} (3A 1. lecke), ${korean('-는구나')} (3B 3. lecke). Idősebbnek vagy ismeretlennek soha!</p>`,
  },
  {
    lesson: 11, point: 2, form: '에는, 에서는', name: 'időpont / hely kiemelése témaként', conjugable: false,
    explanation: `<p>Az ${korean('에')} / ${korean('에서')} és a ${korean('는')} összetétele: mindkét partikula jelentése megmarad, de az időpontot vagy helyet <b>témává teszi, kiemeli</b>, gyakran <b>szembeállítva</b> egy másikkal. Minden főnév után ugyanaz.</p>`,
    examples: [['처음<b>에는</b> 모르는 게 많아서 답답했어.', 'Eleinte (az elején) sok mindent nem tudtam.'], ['주말<b>에는</b> 보통 집에서 쉬어요.', 'Hétvégén általában otthon pihenek.'], ['한국<b>에서는</b> 생일에 미역국을 먹어요.', 'Koreában születésnapon mijokgukot esznek.'], ['집<b>에서는</b> 한국어를 안 써요. 학교<b>에서만</b> 써요.', 'Otthon nem beszélek koreaiul, csak az iskolában.']],
    ownNote: `<p>Ugyanígy: ${korean('에도')} „-on/-en is”, ${korean('에서도')} „-ban/-ben is”, ${korean('에서만')} „csak -ban/-ben”, ${korean('에게는')} „neki pedig”.</p>`,
  },
  {
    lesson: 12, point: 1, form: '처럼', name: '„mint, -ként, olyan, mint …”', conjugable: false,
    explanation: `<p>Főnév után azt fejezi ki, hogy valami <b>ugyanolyan vagy hasonló</b>, mint az előtte álló főnév. Minden főnév után ugyanaz.</p>`,
    examples: [['난 너<b>처럼</b> 카페를 하고 싶어.', 'Én is kávézót szeretnék nyitni, mint te.'], ['그 사람은 가수<b>처럼</b> 노래를 잘해요.', 'Úgy énekel, mint egy énekes.'], ['오늘은 여름<b>처럼</b> 더워요.', 'Ma olyan meleg van, mint nyáron.', 'ㅂ-rendhagyó: 덥다 → 더워요'], ['아이<b>처럼</b> 웃었어요.', 'Úgy nevetett, mint egy gyerek.']],
    ownNote: `<p>A 3B 9. leckében tanult ${korean('같이')} majdnem ugyanezt jelenti. Jelzőként: ${korean('N 같은 N')} „X-hez hasonló”: ${korean('너 같은 친구')}.</p>`,
  },
  {
    lesson: 12, point: 2, form: '-게 되다', name: '„úgy alakult, hogy …; …-vá vált”',
    explanation: `<p>Ige után azt fejezi ki, hogy egy helyzet vagy állapot <b>valamilyen hatásra megváltozott</b>, „úgy alakult”, nem (csak) a saját döntésünk miatt. A tő végétől függetlenül ${korean('-게 되다')}; gyakran múltban (${korean('-게 됐어요')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-게 됐어요', conjugate: word => withPlainStem(word, '게 됐어요') }, { header: 'Jövő: -게 될 거예요', conjugate: word => withPlainStem(word, '게 될 거예요') }] },
    examples: [['한국 드라마를 보고 한국어를 공부하<b>게 됐어요</b>.', 'A koreai sorozatok miatt kezdtem el koreaiul tanulni.'], ['다음 달부터 서울에서 일하<b>게 됐어요</b>.', 'Úgy alakult, hogy jövő hónaptól Szöulban dolgozom.'], ['처음에는 매운 음식을 못 먹었는데 이제 잘 먹<b>게 됐어요</b>.', 'Eleinte nem bírtam a csípőset, de mostanra megszoktam.'], ['그 가수의 노래를 자주 듣<b>게 됐어요</b>.', 'Mostanában gyakran hallgatom annak az énekesnek a dalait (rászoktam).', '-게 előtt nincs ㄷ-változás: 듣게']],
    ownNote: `<p>Melléknévvel inkább ${korean('-아지다/어지다')} (3A 9. lecke): ${korean('예뻐졌어요')}. Udvarias közlésben a ${korean('-게 되다')} szerényebb, mint az egyszerű múlt: ${korean('결혼하게 됐습니다')} „Úgy hozta a sors, hogy megházasodom”.</p>`,
  },
];
export default {
  lessons: {
    1: { korean: '이번 주 금요일에 동아리 모임 할래요?', hungarian: 'Lenne kedved pénteken klubtalálkozót tartani?', pronunciation: '비음화', pronunciationHungarian: 'orrhangúsodás' },
    2: { korean: '세종학당에서부터 걸어서 10분쯤 걸려요', hungarian: 'A Szedzsong Intézettől gyalog kb. 10 perc.' },
    3: { korean: '할머니께서 직접 만드신 목걸이예요', hungarian: 'Ezt a nyakláncot a nagymamám készítette.', pronunciation: '경음화', pronunciationHungarian: 'keményedés ([ㄱ], [ㄷ], [ㅂ] után: 먹고 [먹꼬])' },
    4: { korean: '세종학당에 오다가 중학교 때 친구를 만났어요', hungarian: 'Idefelé jövet összefutottam egy középiskolai barátommal.' },
    5: { korean: '공연 중에 핸드폰을 사용하지 마세요', hungarian: 'Az előadás alatt ne használja a mobilját!', pronunciation: '억양 (감탄문)', pronunciationHungarian: 'a felkiáltó mondat hanglejtése' },
    6: { korean: '여기에서 노트북을 사용해도 돼요?', hungarian: 'Használhatom itt a laptopot?' },
    7: { korean: '마리 씨한테서 그 친구 이야기를 들었어요', hungarian: 'Maritól hallottam erről a barátról.', pronunciation: '끊어 말하기', pronunciationHungarian: 'tagolás, szünet' },
    8: { korean: '어렸을 때는 머리가 길었는데 지금은 짧은 머리가 편해요', hungarian: 'Gyerekkoromban hosszú hajam volt, most a rövid kényelmes.' },
    9: { korean: '저도 그런 사람을 만나고 싶은데요!', hungarian: 'Én is szeretnék egy ilyen emberrel találkozni!', pronunciation: 'ㅎ 약화', pronunciationHungarian: 'a ㅎ gyengülése ㄴ, ㄹ, ㅁ, ㅇ után (결혼)' },
    10: { korean: '산악자전거는 조금 위험한 편이에요', hungarian: 'A hegyi kerékpározás viszonylag veszélyes.' },
    11: { korean: '처음에는 모르는 게 많아서 답답했어', hungarian: 'Eleinte sok mindent nem tudtam, frusztráló volt.', pronunciation: '억양 (반말 의문문)', pronunciationHungarian: 'a tegező kérdés hanglejtése' },
    12: { korean: '난 너처럼 카페를 하고 싶어', hungarian: 'Én is kávézót szeretnék nyitni, mint te.' },
  },
  points: points.map(point => Object.assign({ studentBookPage: studentBookPageOf(point.lesson, point.point), vocabularyGrammarPage: vocabularyGrammarPageOf(point.lesson, point.point) }, point)),
} satisfies BookData;
