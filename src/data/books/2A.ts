import { createWord, withAOrEo, withPast, withEu, withPlainStem, nounWithParticle, type Word } from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';
const korean = (text: string) => `<span class="korean">${text}</span>`;
const koreanWithTranslation = (koreanText: string, hungarianText: string) => `<span class="korean">${koreanText}</span><span class="translation">${hungarianText}</span>`;
const simpleTable = (headers: string[], rows: string[][]) => `<div class="table-wrapper"><table class="plain"><thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const vocabularyGrammarPageOf = (lesson: number, point: number) => 24 + 2 * (lesson - 1) + (point - 1), studentBookPageOf = (lesson: number, point: number) => 16 + 8 * (lesson - 1) + (point - 1);
const isItdaOrEopda = (word: Word) => /(있|없)다$/.test(word.dictionaryForm);
const presentModifier = (word: Word, ending: string) => (word.wordClass === 'verb' || isItdaOrEopda(word)) ? withPlainStem(word, '는' + ending) : withEu(word, 'ㄴ' + ending);

const points: PointSource[] = [
  {
    lesson: 1, point: 1, form: '(이)라고 하다', name: '„…-nak hívják / hívnak” (név, megnevezés)', conjugable: false,
    explanation: `<p>Főnév után a <b>nevet</b> vagy azt adja meg, <b>minek nevezünk</b> valamit: „X-nek hívják”. Bemutatkozásban: ${korean('저는 마크라고 해요')}. Idézett kifejezés után is áll.</p>
<p><b>받침</b> után: <b>이라고 하다</b>, magánhangzó után: <b>라고 하다</b>.</p>`,
    table: { kind: 'noun', nouns: [{ word: '마크', description: 'magánhangzóra végződik' }, { word: '수진', description: 'mássalhangzóra végződik' }, { word: '떡볶이', description: 'magánhangzóra végződik' }, { word: '세종학당', description: 'mássalhangzóra végződik' }], nounColumns: [{ header: '(이)라고 해요', conjugate: noun => nounWithParticle(noun, '이라고 해요', '라고 해요') }] },
    examples: [['안녕하세요. 저는 마크<b>라고 해요</b>.', 'Jó napot! Marknak hívnak.'], ['이 음식은 한국어로 뭐<b>라고 해요</b>?', 'Hogy hívják ezt az ételt koreaiul?'], ['이건 떡볶이<b>라고 해요</b>.', 'Ezt tokpokkinak hívják.'], ['한국에서는 생일에 미역국<b>이라고 하는</b> 음식을 먹어요.', 'Koreában születésnapon egy mijokguk nevű ételt esznek.']],
    ownNote: `<p>Az ${korean('이에요/예요')}-hoz képest a ${korean('(이)라고 해요')} kicsit szerényebb, formálisabb bemutatkozás. Jelzőként: ${korean('N(이)라고 하는 N')} „egy … nevű …”. A 3A 2. és 12. leckében ugyanez a ${korean('-라고/-다고')} forma már idézést (függő beszédet) jelöl.</p>`,
  },
  {
    lesson: 1, point: 2, form: '-는 (동사 현재)', name: 'ige jelen idejű jelzői alakja („programot készítő…”)',
    explanation: `<p>Ige után áll, amikor az ige egy <b>főnevet jelöl</b>, és a cselekvés <b>most, rendszeresen</b> történik: ${korean('프로그램을 만드는 일')} „programkészítő munka (a munka, ami programok készítése)”. Magyarra gyakran vonatkozó mellékmondattal fordítjuk („aki/ami …”).</p>
<p>A tő végétől függetlenül <b>-는</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik: ${korean('만들다 → 만드는')}. A ${korean('있다/없다')} is ${korean('-는')}: ${korean('맛있는')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-는 + főnév', conjugate: word => withPlainStem(word, '는') + ' 사람' }] },
    examples: [['저는 프로그램을 만드<b>는</b> 일을 해요.', 'Programokat készítek (ez a munkám).'], ['저기 커피를 마시<b>는</b> 사람이 제 친구예요.', 'Az ott kávét ivó ember a barátom.'], ['요즘 자주 듣<b>는</b> 노래가 뭐예요?', 'Milyen dalt hallgatsz mostanában gyakran?', '-는 előtt a ㄷ-rendhagyó nem változik: 듣는'], ['제가 사<b>는</b> 동네는 조용해요.', 'A környék, ahol lakom, csendes.', 'ㄹ-tő: 살다 → 사는']],
    ownNote: `<p>Az ige jelzői alakjai: <b>múlt</b> ${korean('-(으)ㄴ')} (2A 12. lecke), <b>jelen</b> ${korean('-는')}, <b>jövő</b> ${korean('-(으)ㄹ')} (2B 2. lecke). A melléknév jelen ideje ${korean('-(으)ㄴ')} (1B 4. lecke). Összefoglaló: Alapszabályok 7.</p>`,
  },
  {
    lesson: 2, point: 1, form: '-거나, (이)나', name: '„vagy” (választás)',
    explanation: `<p>Két vagy több lehetőség közül <b>az egyiket</b> választjuk. Ige és melléknév után: <b>-거나</b> (a tő végétől függetlenül). Főnév után: <b>(이)나</b> – 받침 után ${korean('이나')}, magánhangzó után ${korean('나')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-거나', conjugate: word => withPlainStem(word, '거나') }] },
    customHtml: simpleTable(['Főnév', '(이)나'], [[koreanWithTranslation('커피', 'kávé'), koreanWithTranslation('커피<b>나</b> 차', 'kávé vagy tea')], [koreanWithTranslation('빵', 'kenyér'), koreanWithTranslation('빵<b>이나</b> 과자', 'kenyér vagy keksz')], [koreanWithTranslation('토요일', 'szombat'), koreanWithTranslation('토요일<b>이나</b> 일요일', 'szombat vagy vasárnap')]]),
    examples: [['주말에는 등산을 하<b>거나</b> 운동 모임에 가요.', 'Hétvégén túrázom vagy sportklubba megyek.'], ['심심할 때 음악을 듣<b>거나</b> 영화를 봐요.', 'Ha unatkozom, zenét hallgatok vagy filmet nézek.'], ['커피<b>나</b> 주스를 마실까요?', 'Igyunk kávét vagy gyümölcslevet?'], ['빵<b>이나</b> 과자를 사 오세요.', 'Hozz kenyeret vagy kekszet.'], ['날씨가 너무 덥<b>거나</b> 추우면 집에 있어요.', 'Ha túl meleg vagy túl hideg van, otthon maradok.', '-거나 előtt nincs ㅂ-változás: 덥거나 (de: 춥다 → 추우면)']],
  },
  {
    lesson: 2, point: 2, form: '-(으)ㄹ까요? (추측)', name: '„vajon …?” (találgató kérdés)',
    explanation: `<p>Olyan dologról kérdezi a másik <b>véleményét, tippjét</b>, amit egyikük sem tud biztosan: „Szerinted …?”, „Vajon …?”. Igével és melléknévvel is.</p>
<p><b>받침</b> után: <b>-을까요?</b>, magánhangzó után: <b>-ㄹ까요?</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik és <b>-ㄹ까요?</b> jön (${korean('멀다 → 멀까요?')}). Múltra: ${korean('-았을까요/었을까요?')}</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)ㄹ까요?', conjugate: word => withEu(word, 'ㄹ까요?') }, { header: 'Múlt: -았을까요/었을까요?', conjugate: word => withPast(word, '을까요?') }] },
    examples: [['내일 날씨가 좋<b>을까요</b>?', 'Szerinted holnap jó idő lesz?'], ['이 옷이 저한테 어울<b>릴까요</b>?', 'Vajon jól áll majd nekem ez a ruha?'], ['한국어 시험이 <b>어려울까요</b>?', 'Vajon nehéz lesz a koreai vizsga?', 'ㅂ-rendhagyó: 어렵다 → 어려울까요'], ['마크 씨가 벌써 도착<b>했을까요</b>?', 'Vajon Mark már megérkezett?']],
    ownNote: `<p>Az alak ugyanaz, mint az 1A 10. lecke javaslata (${korean('같이 갈까요?')} „menjünk együtt?”), de a jelentés más: itt nem együtt csinálunk valamit, hanem <b>találgatunk</b>. Válasz: ${korean('-(으)ㄹ 거예요')} (feltételezés): ${korean('네, 좋을 거예요')}.</p>`,
  },
  {
    lesson: 3, point: 1, form: '마다', name: '„minden …”', conjugable: false,
    explanation: `<p>Főnév után azt jelenti, hogy valami <b>kivétel nélkül mindegyikre</b> igaz: ${korean('아침마다')} „minden reggel”, ${korean('사람마다')} „mindenkinél (emberenként)”. Minden főnév után ugyanaz. Állandósult: ${korean('밤이면 밤마다')} „éjjelente”, ${korean('날이면 날마다')} „nap mint nap”.</p>`,
    examples: [['요즘 아침<b>마다</b> 회의가 있어요.', 'Mostanában minden reggel értekezlet van.'], ['주말<b>마다</b> 친구를 만나요.', 'Minden hétvégén találkozom a barátommal.'], ['사람<b>마다</b> 좋아하는 음식이 달라요.', 'Mindenkinek más étel ízlik.', '르-rendhagyó: 다르다 → 달라요'], ['이 버스는 10분<b>마다</b> 와요.', 'Ez a busz tízpercenként jön.']],
    ownNote: `<p>Néhány szónál inkább a ${korean('매-')} előtag használatos: ${korean('매일')} „minden nap” (= ${korean('날마다')}), ${korean('매주')} „minden héten”, ${korean('매년')} „minden évben”. ${korean('매일마다')} kerülendő (kétszer mondja ugyanazt).</p>`,
  },
  {
    lesson: 3, point: 2, form: '-(으)ㄹ 때', name: '„amikor …”',
    explanation: `<p>Ige vagy melléknév után azt az <b>időpontot vagy időszakot</b> jelöli, amikor valami történik: „amikor X, Y”.</p>
<p><b>받침</b> után: <b>-을 때</b>, magánhangzó után: <b>-ㄹ 때</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik és <b>-ㄹ 때</b>: ${korean('만들 때')}. Múltra: ${korean('-았을/었을 때')}. Főnévvel: ${korean('N 때')} (${korean('방학 때')}).</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)ㄹ 때', conjugate: word => withEu(word, 'ㄹ 때') }, { header: 'Múlt: -았을/었을 때', conjugate: word => withPast(word, '을 때') }] },
    examples: [['시간이 있<b>을 때</b> 뭐 해요?', 'Mit csinálsz, amikor van időd?'], ['날씨가 <b>추울 때</b> 따뜻한 차를 마셔요.', 'Amikor hideg van, meleg teát iszom.', 'ㅂ-rendhagyó: 춥다 → 추울 때'], ['한국에 처음 <b>왔을 때</b> 한국어를 잘 못했어요.', 'Amikor először jöttem Koreába, nem beszéltem jól koreaiul.'], ['어렸<b>을 때</b> 피아노를 배웠어요.', 'Gyerekkoromban zongorázni tanultam.']],
    correctIncorrect: [[1, '방학 때 여행을 가요.', ''], [0, '방학할 때에 여행을 가요.', 'főnévnél egyszerűen N 때'], [0, '아침 때 운동해요.', 'az 아침, 오후, 저녁 után nem kell 때: 아침에']],
  },
  {
    lesson: 4, point: 1, form: '-기로 하다', name: '„elhatároztam / megbeszéltük, hogy …”',
    explanation: `<p>Ige után azt fejezi ki, hogy valamit <b>elhatároztunk, megbeszéltünk, megígértünk</b>. A tő végétől függetlenül ${korean('-기로 하다')}. Mivel a döntés már megszületett, <b>múlt időben</b> használjuk, akkor is, ha a cselekvés a jövőben lesz: ${korean('내일 만나기로 했어요')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-기로 했어요', conjugate: word => withPlainStem(word, '기로 했어요') }] },
    examples: [['내일 친구하고 영화를 보<b>기로 했어요</b>.', 'Megbeszéltem a barátommal, hogy holnap megnézünk egy filmet.'], ['올해부터 담배를 끊<b>기로 했어요</b>.', 'Elhatároztam, hogy idéntől leszokom a cigiről.'], ['파티에 청바지를 입<b>기로 했어요</b>.', 'Úgy döntöttem, farmert veszek fel a buliba.'], ['주말에 이사하는 친구를 돕<b>기로 했어요</b>.', 'Megígértem, hogy hétvégén segítek a költöző barátomnak.', '-기 előtt a ㅂ-rendhagyó nem változik: 돕기로']],
  },
  {
    lesson: 4, point: 2, form: '에다가', name: '„… mellé még …, …-hoz/-hez” (hozzáadás)', conjugable: false,
    explanation: `<p>Főnév után azt jelzi, hogy ehhez <b>még valami hozzájön</b>: ${korean('청바지에다가 티셔츠를 입어요')} „a farmerhez pólót veszek fel”. Minden főnév után ugyanaz. Helyette állhat ${korean('에')} vagy ${korean('에다')} is; az ${korean('에다가/에다')} inkább beszélt nyelvi.</p>`,
    examples: [['청바지<b>에다가</b> 티셔츠를 입으려고 해요.', 'A farmerhez pólót akarok felvenni.'], ['커피<b>에다가</b> 설탕을 넣었어요.', 'Cukrot tettem a kávéba.'], ['밥<b>에다가</b> 김치를 올려서 먹어요.', 'A rizsre kimcsit teszek és úgy eszem.'], ['떡볶이<b>에다가</b> 김밥도 시켰어요.', 'A tokpokki mellé kimbapot is rendeltem.']],
  },
  {
    lesson: 5, point: 1, form: '-기가 좋다', name: '„jó (könnyű, kényelmes) …-ni”',
    explanation: `<p>Ige után azt fejezi ki, hogy valamit <b>könnyű, kényelmes megtenni</b>, alkalmas rá a hely vagy helyzet. A tő végétől függetlenül ${korean('-기가 좋다')}; a ${korean('가')} el is maradhat: ${korean('-기 좋다')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-기가 좋아요', conjugate: word => withPlainStem(word, '기가 좋아요') }] },
    examples: [['거실 창문이 커서 경치를 구경하<b>기가 좋아요</b>.', 'A nappali ablaka nagy, jól lehet nézni a kilátást.'], ['이 동네는 지하철역이 가까워서 살<b>기 좋아요</b>.', 'Ez a környék közel van a metróhoz, jó itt lakni.'], ['이 공원은 넓어서 산책하<b>기가 좋아요</b>.', 'Ez a park tágas, jó itt sétálni.'], ['이 노래는 조용해서 공부할 때 듣<b>기 좋아요</b>.', 'Ez a dal csendes, tanulás közben jó hallgatni.', '-기 előtt nincs rendhagyóság: 듣기']],
    ownNote: `<p>Ugyanígy: ${korean('-기(가) 쉽다 / 어렵다 / 힘들다 / 편하다')} „könnyű / nehéz / fárasztó / kényelmes …-ni” (4A 5. lecke).</p>`,
  },
  {
    lesson: 5, point: 2, form: '-지 않다, -지 못하다', name: 'hosszú tagadás („nem …”, „nem tud …”)',
    explanation: `<p>A ${korean('안')} és a ${korean('못')} hosszú, kicsit írottabb párja.</p>
<ul><li><b>-지 않다</b>: igénél azt jelenti, hogy az alany <b>nem akarja</b> megtenni; melléknévnél, hogy valami <b>nem olyan</b>. Igével és melléknévvel is.</li><li><b>-지 못하다</b>: csak igével; az alany <b>nem képes</b> megtenni, vagy körülmények miatt nem lehetséges.</li></ul>
<p>A tő végétől függetlenül ${korean('-지')}; a ${korean('않다 / 못하다')} ragozódik.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-지 않아요', conjugate: word => withPlainStem(word, '지 않아요') }, { header: '-지 못해요 (csak ige)', conjugate: word => word.wordClass === 'verb' ? withPlainStem(word, '지 못해요') : null }] },
    examples: [['이 집은 크<b>지 않지만</b> 깨끗해요.', 'Ez a ház nem nagy, de tiszta.'], ['저는 아침을 먹<b>지 않아요</b>.', 'Nem reggelizem.'], ['어제 너무 바빠서 숙제를 하<b>지 못했어요</b>.', 'Tegnap túl elfoglalt voltam, nem tudtam megcsinálni a házit.'], ['오늘은 날씨가 덥<b>지 않아요</b>.', 'Ma nincs meleg.', '-지 előtt a ㅂ-rendhagyó nem változik: 덥지']],
    ownNote: `<p>${korean('안 가요 = 가지 않아요')}, ${korean('못 가요 = 가지 못해요')}. A ${korean('-지 못하다')} melléknévvel csak ritkán, „nem elég …” értelemben áll (${korean('넉넉하지 못하다')}).</p>`,
  },
  {
    lesson: 6, point: 1, form: '-(으)면서 (동시)', name: '„miközben …” (egyidejűség)',
    explanation: `<p>Ige után azt fejezi ki, hogy két cselekvést <b>egyszerre</b> végez ugyanaz a személy.</p>
<p><b>받침</b> után: <b>-으면서</b>, magánhangzó után: <b>-면서</b>, <b>ㄹ-tő</b> után is <b>-면서</b> (${korean('놀면서')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)면서', conjugate: word => withEu(word, '면서') }] },
    examples: [['커피를 마시<b>면서</b> 음악을 들어요.', 'Kávézás közben zenét hallgatok.'], ['음악을 들<b>으면서</b> 공부해요.', 'Zenehallgatás közben tanulok.', 'ㄷ-rendhagyó: 듣다 → 들으면서'], ['밥을 먹<b>으면서</b> 텔레비전을 봐요.', 'Evés közben tévézem.'], ['아르바이트를 하<b>면서</b> 학교에 다녀요.', 'Diákmunka mellett járok iskolába.']],
    correctIncorrect: [[1, '저는 노래하면서 춤을 춰요.', ''], [0, '저는 노래하면서 동생은 춤을 춰요.', 'a két cselekvés alanya azonos kell legyen']],
  },
  {
    lesson: 6, point: 2, form: '-지요?', name: '„…, ugye?” (megerősítő kérdés)',
    explanation: `<p>Ige vagy melléknév után, amikor a beszélő olyasmit kérdez, amit <b>már tud vagy sejt</b>, és csak <b>megerősítést</b> vár. A tő végétől függetlenül ${korean('-지요?')}; beszédben gyakran ${korean('-죠?')}. Múltra: ${korean('-았지요/었지요?')}</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-지요?', conjugate: word => withPlainStem(word, '지요?') }, { header: 'Múlt: -았지요/었지요?', conjugate: word => withPast(word, '지요?') }] },
    examples: [['한국 음식이 맛있<b>지요</b>?', 'Finom a koreai étel, ugye?'], ['내일 시험이 있<b>지요</b>?', 'Holnap vizsga van, ugye?'], ['어제 많이 <b>추웠지요</b>?', 'Tegnap nagyon hideg volt, ugye?', 'múlt: 춥다 → 추웠지요'], ['요즘 회사 일이 바쁘<b>죠</b>?', 'Mostanában sok a munka a cégnél, ugye?']],
    ownNote: `<p>Kérdőszóval (${korean('뭐, 어디, 누구')}) udvarias, puhított kérdés: ${korean('이게 뭐지요?')} „Mi is ez?” Kijelentésként (eső hanglejtéssel) „hiszen…”: ${korean('제가 말했지요')}.</p>`,
  },
  {
    lesson: 7, point: 1, form: '-(으)면', name: '„ha …” (feltétel)',
    explanation: `<p>Ige vagy melléknév után <b>feltételt</b> fejez ki: „ha X, akkor Y”. Akkor is, ha valami még nem biztos vagy nem valósult meg.</p>
<p><b>받침</b> után: <b>-으면</b>, magánhangzó után: <b>-면</b>, <b>ㄹ-tő</b> után is <b>-면</b> (${korean('만들면')}).</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)면', conjugate: word => withEu(word, '면') }] },
    examples: [['스트레스를 받<b>으면</b> 가슴이 답답해요.', 'Ha stresszes vagyok, szorít a mellkasom.'], ['시간이 있<b>으면</b> 같이 영화 볼까요?', 'Ha van időd, megnézünk együtt egy filmet?'], ['날씨가 <b>더우면</b> 바다에 가요.', 'Ha meleg van, a tengerhez megyünk.', 'ㅂ-rendhagyó: 덥다 → 더우면'], ['이 노래를 들<b>으면</b> 기분이 좋아져요.', 'Ha ezt a dalt hallgatom, jobb kedvem lesz.', 'ㄷ-rendhagyó: 듣다 → 들으면']],
    ownNote: `<p>Főnévvel: ${korean('-(이)면')}: ${korean('학생이면')}, ${korean('주말이면')}. Valószínűtlen, elképzelt feltételre a 4A 1. lecke ${korean('-는다면/ㄴ다면/다면')} alakot tanít.</p>`,
  },
  {
    lesson: 7, point: 2, form: 'ㅅ 불규칙', name: 'ㅅ-rendhagyó igék és melléknevek',
    explanation: `<p>Néhány ㅅ-re végződő szónál (${korean('붓다, 젓다, 짓다, 낫다')}) a ㅅ <b>magánhangzóval kezdődő végződés előtt kiesik</b>: ${korean('짓다 → 지어요, 지으면')}. A kiesés után a szótagok <b>nem vonódnak össze</b>: ${korean('나아요')}, nem ${korean('나요')}.</p>
<p>Szabályos (a ㅅ megmarad): ${korean('씻다, 웃다, 벗다')}.</p>`,
    table: { words: [createWord('짓다', 'verb'), createWord('붓다', 'verb'), createWord('젓다', 'verb'), createWord('낫다', 'adjective')], irregularWords: [createWord('씻다', 'verb'), createWord('웃다', 'verb'), createWord('벗다', 'verb')], columns: [{ header: '-아요/어요', conjugate: word => withAOrEo(word, '요') }, { header: 'Múlt', conjugate: word => withPast(word, '어요') }, { header: '-(으)면', conjugate: word => withEu(word, '면') }, { header: '-고 (változatlan)', conjugate: word => withPlainStem(word, '고') }] },
    irregularRowsOptional: true,
    examples: [['감기가 다 <b>나았어요</b>.', 'Teljesen meggyógyultam a megfázásból.', 'ㅅ-rendhagyó: 낫다 → 나았어요'], ['라면을 끓일 때 물을 너무 많이 <b>부었어요</b>.', 'Amikor rament főztem, túl sok vizet öntöttem bele.'], ['이 건물은 언제 <b>지었어요</b>?', 'Mikor épült ez az épület?'], ['커피에 설탕을 넣고 잘 <b>저으세요</b>.', 'Tegyen cukrot a kávéba, és jól keverje meg.']],
    ownNote: `<p>A táblázat második részében (${korean('씻다, 웃다, 벗다')}) szabályos szavak vannak: ${korean('씻어요, 웃어요, 벗어요')}. A ${korean('낫다')} kétféle: „meggyógyul” (ige) és „jobb” (melléknév): ${korean('이게 더 나아요')}.</p>`,
  },
  {
    lesson: 8, point: 1, form: '-는데/(으)ㄴ데', name: '„…, és (ezért) …”: háttér, előzmény',
    explanation: `<p>Ige, melléknév, ${korean('이다/아니다')} után a <b>hátteret, helyzetet</b> mutatja be, mielőtt a lényeget mondanánk; gyakran kérdés, kérés vagy javaslat előtt: „Holnap szabad vagyok – menjünk moziba?”</p>
<ul><li><b>Ige</b>: ${korean('-는데')} (ㄹ kiesik: ${korean('사는데')}); <b>있다/없다</b>: ${korean('-는데')}</li><li><b>Melléknév</b>: 받침 után ${korean('-은데')}, magánhangzó után ${korean('-ㄴ데')} (ㄹ kiesik: ${korean('긴데')})</li><li><b>Főnév</b>: ${korean('-인데')}; múlt: ${korean('-았는데/었는데')}</li></ul>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Jelen', conjugate: word => presentModifier(word, '데') }, { header: 'Múlt: -았는데/었는데', conjugate: word => withPast(word, '는데') }] },
    examples: [['잠이 안 오<b>는데</b> 어떻게 해야 돼요?', 'Nem jön álom a szememre, mit csináljak?'], ['배가 고<b>픈데</b> 뭐 먹을까요?', 'Éhes vagyok, mit együnk?', '으-tő: 고프다 → 고픈데'], ['오늘 날씨가 <b>추운데</b> 따뜻하게 입으세요.', 'Ma hideg van, öltözz fel melegen.', 'ㅂ-rendhagyó: 춥다 → 추운데'], ['내일이 친구 생일<b>인데</b> 뭘 선물하면 좋을까요?', 'Holnap lesz a barátom születésnapja – mit ajándékozzak?']],
    ownNote: `<p>A 2B 8. lecke ugyanezt az alakot <b>ellentétre</b> („de”) is használja, a 2B 9. lecke pedig mondatvégen (${korean('-는데요')}) csodálkozásra. Beszélgetésben a ${korean('-는데요')} puhított válasz is lehet: ${korean('저는 마크인데요')} „Én Mark vagyok (és…?)”.</p>`,
  },
  {
    lesson: 8, point: 2, form: '-아/어 보다 (시도)', name: '„próbáld meg …” (javaslat, tanács)',
    explanation: `<p>Ige után azt javasolja, hogy a másik <b>próbáljon ki</b> valamit, amit még nem csinált. Gyakran ${korean('-아/어 보세요')} alakban. A <b>-아/어</b> szabály szerint: ${korean('가 보세요, 먹어 보세요, 해 보세요')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-아/어 보세요', conjugate: word => withAOrEo(word, ' 보세요') }] },
    examples: [['잠이 안 오면 가벼운 운동을 해 <b>보세요</b>.', 'Ha nem jön álom a szemedre, próbálj meg egy kis könnyű testmozgást.'], ['이 김치 한번 먹어 <b>보세요</b>.', 'Kóstold meg ezt a kimcsit.'], ['이 노래를 들어 <b>보세요</b>. 정말 좋아요.', 'Hallgasd meg ezt a dalt, nagyon jó.', 'ㄷ-rendhagyó: 듣다 → 들어 보세요'], ['이 옷 입어 봐도 돼요?', 'Felpróbálhatom ezt a ruhát?']],
    ownNote: `<p>A ${korean('보다')} („látni”) önmagával nem kapcsolódik: ${korean('봐 보세요')} helyett ${korean('보세요')}. A 2A 12. lecke ugyanezt <b>tapasztalatra</b> használja: ${korean('먹어 봤어요')} „már ettem (kipróbáltam)”.</p>`,
  },
  {
    lesson: 9, point: 1, form: '-는/(으)ㄴ/(으)ㄹ 것 같다', name: '„úgy tűnik, …; szerintem …” (feltételezés)',
    explanation: `<p>Ige, melléknév, ${korean('이다/아니다')} után a beszélő <b>feltételezését</b> fejezi ki, vagy udvariasan, puhítva mond véleményt.</p>
${simpleTable(['', 'Múlt', 'Jelen', 'Jövő / feltételezés'], [['Ige', korean('-(으)ㄴ 것 같다'), korean('-는 것 같다'), korean('-(으)ㄹ 것 같다')], ['Melléknév', '—', korean('-(으)ㄴ 것 같다'), korean('-(으)ㄹ 것 같다')], ['Főnév + 이다', '—', korean('-인 것 같다'), korean('-일 것 같다')]])}
<p>ㄹ-tőnél az ㄹ kiesik: ${korean('만드는, 만든, 만들 것 같다')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Múlt (ige)', conjugate: word => word.wordClass === 'verb' ? withEu(word, 'ㄴ 것 같아요') : null }, { header: 'Jelen', conjugate: word => presentModifier(word, ' 것 같아요') }, { header: 'Jövő', conjugate: word => withEu(word, 'ㄹ 것 같아요') }] },
    examples: [['밖에 비가 오<b>는 것 같아요</b>.', 'Úgy tűnik, kint esik az eső.'], ['이 음식은 좀 <b>매울 것 같아요</b>.', 'Ez az étel szerintem csípős lesz.', 'ㅂ-rendhagyó: 맵다 → 매울'], ['마크 씨가 벌써 집에 <b>간 것 같아요</b>.', 'Úgy tűnik, Mark már hazament.'], ['이 옷이 저한테 좀 <b>작은 것 같아요</b>.', 'Ez a ruha szerintem egy kicsit kicsi nekem.']],
    ownNote: `<p>Koreaiul gyakran puhítunk vele akkor is, ha biztosak vagyunk: ${korean('맛있는 것 같아요')} „szerintem finom”. A ${korean('-(으)ㄹ 것 같다')} és a ${korean('-(으)ㄹ 거예요')} közel áll egymáshoz, de a ${korean('것 같다')} szubjektívebb, gyakran benyomáson alapul.</p>`,
  },
  {
    lesson: 9, point: 2, form: '-는 게 어때요?', name: '„mi lenne, ha …?” (javaslat)',
    explanation: `<p>Ige után a hallgatónak <b>javasol</b> valamit: „Mi lenne, ha …?”, „Nem kéne …?” A tő végétől függetlenül ${korean('-는 게 어때요?')}; ㄹ-tőnél az ㄹ kiesik: ${korean('만드는 게 어때요?')}</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-는 게 어때요?', conjugate: word => withPlainStem(word, '는 게 어때요?') }] },
    examples: [['그럼 칼국수를 먹<b>는 게 어때요</b>?', 'Akkor mi lenne, ha kalguksut ennénk?'], ['피곤하면 좀 쉬<b>는 게 어때요</b>?', 'Ha fáradt vagy, nem pihennél egy kicsit?'], ['한국 노래를 많이 듣<b>는 게 어때요</b>?', 'Mi lenne, ha sok koreai dalt hallgatnál?', '-는 előtt nincs ㄷ-változás: 듣는'], ['친구한테 직접 만드<b>는 게 어때요</b>?', 'Mi lenne, ha te magad készítenéd el a barátodnak?', 'ㄹ-tő: 만들다 → 만드는']],
    ownNote: `<p>A ${korean('게')} a ${korean('것이')} rövidülése. Múlt idejű változata, ${korean('-는 게 어땠어요?')}, nem javaslat, hanem kérdés: „Milyen volt …?”. Hasonló javaslatok: ${korean('-아/어 보세요')}, ${korean('-(으)ㄹ까요?')}, ${korean('-지 그래요?')} (4B 3. lecke).</p>`,
  },
  {
    lesson: 10, point: 1, form: 'ㅎ 불규칙', name: 'ㅎ-rendhagyó melléknevek (színek, 그렇다, 어떻다)',
    explanation: `<p>A ㅎ-ra végződő melléknevek többsége (${korean('하얗다, 까맣다, 파랗다, 빨갛다, 노랗다, 어떻다, 그렇다')}) rendhagyó:</p>
<ul><li><b>-(으)</b> végződés előtt a ㅎ <b>kiesik</b>, és nincs 으: ${korean('빨갛다 → 빨간, 빨가면')}</li><li><b>-아/어</b> előtt a ㅎ kiesik, és a magánhangzó <b>ㅐ</b> lesz (ㅑ után ㅒ): ${korean('빨개요, 그래요, 하얘요')}</li></ul>
<p>Szabályos: ${korean('좋다')} (melléknév), ${korean('놓다, 넣다')} (ige).</p>`,
    table: { words: [createWord('빨갛다', 'adjective'), createWord('노랗다', 'adjective'), createWord('파랗다', 'adjective'), createWord('하얗다', 'adjective'), createWord('까맣다', 'adjective'), createWord('그렇다', 'adjective'), createWord('어떻다', 'adjective')], irregularWords: [createWord('좋다', 'adjective'), createWord('놓다', 'verb'), createWord('넣다', 'verb')], columns: [{ header: '-아요/어요', conjugate: word => withAOrEo(word, '요') }, { header: 'Múlt', conjugate: word => withPast(word, '어요') }, { header: '-(으)ㄴ', conjugate: word => word.wordClass === 'adjective' ? withEu(word, 'ㄴ') : withEu(word, 'ㄴ') }, { header: '-(으)면', conjugate: word => withEu(word, '면') }, { header: '-고', conjugate: word => withPlainStem(word, '고') }] },
    irregularRowsOptional: true,
    examples: [['그럼 저 <b>까만</b> 구두는 어때요?', 'Akkor mit szólsz ahhoz a fekete cipőhöz?', 'ㅎ-rendhagyó: 까맣다 → 까만'], ['가을이 되면 단풍이 <b>빨개요</b>.', 'Ősszel vörösek a levelek.'], ['하늘이 정말 <b>파래요</b>.', 'Az ég nagyon kék.'], ['<b>어떤</b> 색을 좋아해요? – <b>하얀</b> 색을 좋아해요.', '– Milyen színt szeretsz? – A fehéret.']],
    ownNote: `<p>A táblázat második része (${korean('좋다, 놓다, 넣다')}) szabályos. Mássalhangzós végződés előtt (${korean('-고, -지만, -네요')}) a ㅎ megmarad: ${korean('빨갛고, 그렇네요')}. A ${korean('그래요')} gyakori válasz: „Úgy van / Tényleg?”.</p>`,
  },
  {
    lesson: 10, point: 2, form: '-(으)면 좋겠다', name: '„jó lenne, ha …; bárcsak …” (kívánság)',
    explanation: `<p>Ige vagy melléknév után <b>kívánságot, reményt</b> fejez ki: „jó lenne, ha …”.</p>
<p><b>받침</b> után: <b>-으면 좋겠다</b>, magánhangzó vagy <b>ㄹ</b> után: <b>-면 좋겠다</b>. Leggyakrabban ${korean('-(으)면 좋겠어요')} alakban.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)면 좋겠어요', conjugate: word => withEu(word, '면 좋겠어요') }] },
    examples: [['주말에 날씨가 좋<b>으면 좋겠어요</b>.', 'Jó lenne, ha hétvégén szép idő lenne.'], ['빨리 방학이 <b>되면 좋겠어요</b>.', 'Bárcsak hamar jönne a szünet.'], ['한국어를 잘하<b>면 좋겠어요</b>.', 'Jó lenne, ha jól beszélnék koreaiul.'], ['내일은 덜 <b>추우면 좋겠어요</b>.', 'Jó lenne, ha holnap kevésbé lenne hideg.', 'ㅂ-rendhagyó: 춥다 → 추우면']],
    ownNote: `<p>Erősebb kívánság a múlt idővel: ${korean('-았으면/었으면 좋겠다')} (${korean('여행을 갔으면 좋겠어요')}), ennek a ${korean('-았으면/었으면 하다')} változatát a 4A 1. lecke tanítja.</p>`,
  },
  {
    lesson: 11, point: 1, form: '-(으)ㄴ 적이 있다', name: '„már …-tam/-tem valaha” (tapasztalat)',
    explanation: `<p>Ige után azt fejezi ki, hogy valami <b>a múltban már megtörtént</b> velünk (tapasztalat). Tagadás: ${korean('-(으)ㄴ 적이 없다')} „még soha”.</p>
<p><b>받침</b> után: <b>-은 적이 있다</b>, magánhangzó után: <b>-ㄴ 적이 있다</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik: ${korean('만든 적이 있다')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄴ 적이 있어요', conjugate: word => withEu(word, 'ㄴ 적이 있어요') }, { header: '-(으)ㄴ 적이 없어요', conjugate: word => withEu(word, 'ㄴ 적이 없어요') }] },
    examples: [['한국을 여행<b>한 적이 있어요</b>?', 'Utaztál már Koreában?'], ['저는 김치를 만<b>든 적이 있어요</b>.', 'Csináltam már kimcsit.', 'ㄹ-tő: 만들다 → 만든'], ['그 노래를 들<b>은 적이 없어요</b>.', 'Még sosem hallottam azt a dalt.', 'ㄷ-rendhagyó: 듣다 → 들은'], ['한복을 입<b>은 적이 있어요</b>?', 'Viseltél már hanbokot?']],
    ownNote: `<p>Gyakran a ${korean('-아/어 보다')}-val együtt: ${korean('가 본 적이 있어요')} „voltam már ott (kipróbáltam)”. Rendszeres, mindennapos dologra nem használjuk: ${korean('아침을 먹은 적이 있어요')} furcsa.</p>`,
  },
  {
    lesson: 11, point: 2, form: '동안', name: '„… alatt, … ideig” (időtartam)', conjugable: false,
    explanation: `<p>Főnév után azt az <b>időtartamot</b> jelöli, ameddig valami tart: ${korean('일주일 동안')} „egy hétig / egy hét alatt”. Minden főnév után ugyanaz.</p>`,
    examples: [['방학 <b>동안</b> 한국을 여행했어요.', 'A szünetben beutaztam Koreát.'], ['3년 <b>동안</b> 한국어를 공부했어요.', 'Három évig tanultam koreaiul.'], ['얼마 <b>동안</b> 한국에 있을 거예요?', 'Mennyi ideig leszel Koreában?'], ['두 시간 <b>동안</b> 기다렸어요.', 'Két órát vártam.']],
    ownNote: `<p>Igével: ${korean('-는 동안')} „amíg …, miközben …”: ${korean('제가 요리하는 동안 청소 좀 해 주세요')}. Rövid időre gyakran elmarad: ${korean('두 시간 기다렸어요')}.</p>`,
  },
  {
    lesson: 12, point: 1, form: '-아/어 보다 (경험)', name: '„már kipróbáltam, csináltam” (tapasztalat)',
    explanation: `<p>Ige után, főleg <b>múlt időben</b> (${korean('-아/어 봤어요')}), azt fejezi ki, hogy valamit <b>már megtapasztaltunk, kipróbáltunk</b>. Leginkább különleges élményekről (utazás, hobbi). A <b>-아/어</b> szabály szerint képezzük.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-아/어 봤어요', conjugate: word => withAOrEo(word, ' 봤어요') }, { header: 'Kérdés', conjugate: word => withAOrEo(word, ' 봤어요?') }] },
    examples: [['박물관에서 도장을 만들어 <b>봤어요</b>.', 'A múzeumban kipróbáltam a pecsétkészítést.'], ['부산에 가 <b>봤어요</b>?', 'Voltál már Puszanban?'], ['한복을 입어 <b>봤는데</b> 정말 예뻤어요.', 'Felpróbáltam a hanbokot, nagyon szép volt.'], ['이 노래 들어 <b>봤어요</b>?', 'Hallottad már ezt a dalt?', 'ㄷ-rendhagyó: 듣다 → 들어 봤어요']],
    ownNote: `<p>Az ${korean('-(으)ㄴ 적이 있다')}-val együtt is gyakori: ${korean('먹어 본 적이 있어요')}. A ${korean('보다')} igénél: ${korean('봤어요')} (nem ${korean('봐 봤어요')}).</p>`,
  },
  {
    lesson: 12, point: 2, form: '-(으)ㄴ (동사 과거)', name: 'ige múlt idejű jelzői alakja („a tegnap látott film”)',
    explanation: `<p>Ige után áll, amikor az ige <b>főnevet jelöl</b>, és a cselekvés <b>már megtörtént</b> (vagy befejeződött, és az eredménye megmaradt): ${korean('어제 본 영화')} „a film, amit tegnap láttam”.</p>
<p><b>받침</b> után: <b>-은</b>, magánhangzó után: <b>-ㄴ</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik: ${korean('만들다 → 만든')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄴ + főnév', conjugate: word => withEu(word, 'ㄴ') + ' 것' }] },
    examples: [['이건 제가 직접 만<b>든</b> 도장이에요.', 'Ezt a pecsétet én magam készítettem.', 'ㄹ-tő: 만들다 → 만든'], ['어제 <b>본</b> 영화가 정말 재미있었어요.', 'A film, amit tegnap láttam, nagyon érdekes volt.'], ['지난주에 <b>산</b> 옷을 오늘 입었어요.', 'Ma felvettem a ruhát, amit a múlt héten vettem.'], ['아까 들<b>은</b> 노래 제목이 뭐예요?', 'Mi a címe a dalnak, amit az előbb hallottunk?', 'ㄷ-rendhagyó: 듣다 → 들은']],
    ownNote: `<p>Vigyázat: melléknévnél a ${korean('-(으)ㄴ')} <b>jelen</b> időt jelent (${korean('작은 가방')} „kis táska”), igénél <b>múltat</b> (${korean('먹은 음식')} „a megevett étel”). Ige jelen: ${korean('-는')}, jövő: ${korean('-(으)ㄹ')}.</p>`,
  },
];
export default {
  lessons: {
    1: { korean: '저는 프로그램 만드는 일을 해요', hungarian: 'Programokat készítek (ez a munkám).', pronunciation: 'ㄴ 첨가', pronunciationHungarian: 'ㄴ betoldása (무슨 일 [무슨닐])' },
    2: { korean: '등산을 하거나 운동 모임에 가요', hungarian: 'Túrázom vagy sportklubba járok.' },
    3: { korean: '요즘 아침마다 회의가 있어요', hungarian: 'Mostanában minden reggel értekezlet van.', pronunciation: '평음, 경음, 격음', pronunciationHungarian: 'sima, feszes és hehezetes mássalhangzók' },
    4: { korean: '청바지에다가 티셔츠를 입으려고 해요', hungarian: 'A farmerhez pólót akarok felvenni.' },
    5: { korean: '거실 창문이 커서 경치를 구경하기가 좋아요', hungarian: 'A nappali ablaka nagy, jól lehet nézni a kilátást.', pronunciation: '겹받침 ㄺ', pronunciationHungarian: 'kettős 받침 ㄺ (밝다 [박따], 밝고 [발꼬], 밝아요 [발가요])' },
    6: { korean: '커피를 마시면서 음악을 들어요', hungarian: 'Kávézás közben zenét hallgatok.' },
    7: { korean: '스트레스를 받으면 가슴이 답답해요', hungarian: 'Ha stresszes vagyok, szorít a mellkasom.', pronunciation: '이중모음 단순화', pronunciationHungarian: 'kettőshangzó egyszerűsödése: ㅈ, ㅉ, ㅊ után ㅛ → [ㅗ] (바쁘죠 [바쁘조])' },
    8: { korean: '잠이 안 오면 가벼운 운동을 해 보세요', hungarian: 'Ha nem jön álom a szemedre, próbálj meg könnyű testmozgást.' },
    9: { korean: '그럼 칼국수를 먹는 게 어때요?', hungarian: 'Akkor mi lenne, ha kalguksut ennénk?', pronunciation: '경음화', pronunciationHungarian: 'keményedés' },
    10: { korean: '그럼 저 까만 구두는 어때요?', hungarian: 'Akkor mit szólsz ahhoz a fekete cipőhöz?' },
    11: { korean: '한국을 여행한 적이 있어요?', hungarian: 'Utaztál már Koreában?', pronunciation: '비음화', pronunciationHungarian: 'orrhangúsodás' },
    12: { korean: '박물관에서 도장을 만들어 봤어요', hungarian: 'A múzeumban pecsétet készítettem.' },
  },
  points: points.map(point => Object.assign({ studentBookPage: studentBookPageOf(point.lesson, point.point), vocabularyGrammarPage: vocabularyGrammarPageOf(point.lesson, point.point) }, point)),
} satisfies BookData;
