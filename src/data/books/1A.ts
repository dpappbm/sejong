import { createWord, withAOrEo, withPast, withEu, withPlainStem, nounWithParticle, type Word } from '../../lib/conjugation';
import type { BookData } from '../types';

const korean = (text: string) => `<span class="korean">${text}</span>`;
const koreanWithTranslation = (koreanText: string, hungarianText: string) => `<span class="korean">${koreanText}</span><span class="translation">${hungarianText}</span>`;
const koreanGlossedInRow = (text: string) => `<span class="korean glossed-in-row">${text}</span>`;
const simpleTable = (headers: string[], rows: string[][]) => `<div class="table-wrapper"><table class="plain"><thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const negateWithAn = (word: Word) => (word.wordClass === 'verb' && word.stem.endsWith('하') && word.stem.length > 1) ? word.stem.slice(0, -1) + ' 안 해요' : '안 ' + withAOrEo(word, '요');

export default {
  lessons: {
    1: { korean: '안녕하세요? 저는 안나예요', hungarian: 'Jó napot! Anna vagyok.' },
    2: { korean: '전화번호가 뭐예요?', hungarian: 'Mi a telefonszámod?', pronunciation: '연음', pronunciationHungarian: 'átkötés (a 받침 átkerül a következő szótagra)' },
    3: { korean: '제 가방은 책상 옆에 있어요', hungarian: 'A táskám az íróasztal mellett van.' },
    4: { korean: '한국어를 공부해요', hungarian: 'Koreait tanulok.', pronunciation: '억양', pronunciationHungarian: 'kijelentő és kérdő hanglejtés' },
    5: { korean: '빵하고 우유를 사요', hungarian: 'Kenyeret és tejet veszek.' },
    6: { korean: '사과 다섯 개 주세요', hungarian: 'Öt almát kérek.', pronunciation: '평파열음화', pronunciationHungarian: 'a 받침 egyszerűsödése (ㅋ, ㄲ → [ㄱ] stb.)' },
    7: { korean: '일곱 시에 시작해요', hungarian: 'Hétkor kezdődik.' },
    8: { korean: '날씨가 더워요?', hungarian: 'Meleg van?', pronunciation: '끊어 말하기', pronunciationHungarian: 'tagolás: az 안 egybeolvad az igével (안 더워요 [안더워요])' },
    9: { korean: '공원에서 산책했어요', hungarian: 'Sétáltam a parkban.' },
    10: { korean: '우리 같이 놀이공원에 갈까요?', hungarian: 'Elmenjünk együtt a vidámparkba?', pronunciation: 'ㅎ 탈락', pronunciationHungarian: 'a ㅎ kiesése (좋아요 [조아요])' },
  },
  points: [
    {
      lesson: 1, point: 1, form: '이에요/예요', name: '„… vagyok / … az” (a 이다 udvarias alakja)', studentBookPage: 38, vocabularyGrammarPage: 30,
      explanation: `<p>Főnév után áll, és azt mondja meg, <b>ki vagy mi</b> valaki/valami: „Anna diák.” A magyarban ilyenkor nincs ige, a koreaiban kell. Kérdésben ugyanez az alak, csak emelkedő hanglejtéssel.</p>
<p>Ha a főnév <b>mássalhangzóra (받침)</b> végződik: <b>이에요</b>, ha <b>magánhangzóra</b>: <b>예요</b>. Egybeírjuk a főnévvel.</p>`,
      table: { kind: 'noun', nouns: ['vowelEnding', 'consonantEnding', { word: '학생', description: 'mássalhangzóra végződik' }, { word: '의사', description: 'magánhangzóra végződik' }], nounColumns: [{ header: 'Kijelentés', conjugate: noun => nounWithParticle(noun, '이에요.', '예요.') }, { header: 'Kérdés', conjugate: noun => nounWithParticle(noun, '이에요?', '예요?') }] },
      examples: [['저는 안나<b>예요</b>.', 'Anna vagyok.'], ['저는 학생<b>이에요</b>.', 'Diák vagyok.'], ['이거 뭐<b>예요</b>?', 'Mi ez?'], ['마크 씨는 의사<b>예요</b>?', 'Mark orvos?']],
      ownNote: `<p>A ${korean('예요')} kiejtése a gyakorlatban [에요]. Tagadása nem ${korean('안 이에요')}, hanem ${korean('이/가 아니에요')} (1A 2. lecke). Formális alakja ${korean('입니다')} (pl. ${korean('학생입니다')}), ezt az 1B 4. lecke vezeti be.</p>`,
    },
    {
      lesson: 1, point: 2, form: '은/는', name: 'a mondat témája („ami … illeti”)', studentBookPage: 39, vocabularyGrammarPage: 31,
      explanation: `<p>Főnév után jelöli, hogy a mondat <b>miről szól</b> (téma). Bemutatkozásnál: ${korean('저는 …')} = „Én … vagyok”. Gyakran <b>szembeállítást</b> is jelez: „én viszont…”.</p>
<p><b>받침</b> után: <b>은</b>, magánhangzó után: <b>는</b>.</p>`,
      table: { kind: 'noun', nouns: ['vowelEnding', 'consonantEnding', { word: '저', description: 'magánhangzóra végződik' }, { word: '이름', description: 'mássalhangzóra végződik' }], nounColumns: [{ header: '은/는', conjugate: noun => nounWithParticle(noun, '은', '는') }] },
      examples: [['저<b>는</b> 마크예요.', 'Mark vagyok.'], ['이름<b>은</b> 뭐예요?', 'Mi a neved? (szó szerint: a név mi?)'], ['안나 씨<b>는</b> 미국 사람이에요.', 'Anna amerikai.'], ['저<b>는</b> 회사원이에요. 동생<b>은</b> 학생이에요.', 'Én irodai dolgozó vagyok, a húgom/öcsém pedig diák.']],
      honorific: {
        rows: [['은/는', 'témajelölő', '께서는', 'témajelölő (tiszteleti)']],
        note: `<p>Tisztelt személy (szülő, nagyszülő, tanár, idősebb) után a ${korean('은/는')} helyett ${korean('께서는')} állhat. Ilyenkor az állítmány is tiszteleti alakot kap (${korean('-(으)시-')}, 2B 3. lecke). Hétköznapi beszédben a sima ${korean('은/는')} + tiszteleti ige is elég.</p>`,
        examples: [['할아버지<b>께서는</b> 의사세요.', 'A nagyapám orvos.'], ['선생님<b>께서는</b> 한국 사람이세요.', 'A tanár úr koreai.'], ['저는 학생이에요. 아버지<b>께서는</b> 회사원이세요.', 'Én diák vagyok, édesapám pedig irodai dolgozó.']],
      },
    },
    {
      lesson: 2, point: 1, form: '이/가', name: 'alanyjelölő', studentBookPage: 46, vocabularyGrammarPage: 32,
      explanation: `<p>Főnév után jelöli a mondat <b>alanyát</b>, vagyis azt, aki/ami valamit csinál vagy valamilyen. Kérdőszó alanyként is ezt kapja: ${korean('뭐가, 누가')}.</p>
<p><b>받침</b> után: <b>이</b>, magánhangzó után: <b>가</b>.</p>`,
      table: { kind: 'noun', nouns: ['vowelEnding', 'consonantEnding', { word: '전화번호', description: 'magánhangzóra végződik' }, { word: '가방', description: 'mássalhangzóra végződik' }], nounColumns: [{ header: '이/가', conjugate: noun => nounWithParticle(noun, '이', '가') }] },
      examples: [['전화번호<b>가</b> 뭐예요?', 'Mi a telefonszámod?'], ['이메일 주소<b>가</b> 뭐예요?', 'Mi az e-mail címed?'], ['가방<b>이</b> 어디에 있어요?', 'Hol van a táska?'], ['날씨<b>가</b> 좋아요.', 'Jó idő van.']],
      ownNote: `<p><b>은/는 vagy 이/가?</b> A ${korean('은/는')} a már ismert témát vagy a szembeállítást jelöli („én pedig…”), a ${korean('이/가')} az új információt, az alanyt hangsúlyozza. Kérdőszó (${korean('누가, 뭐가')}) és a rá adott válasz mindig ${korean('이/가')}-t kap: ${korean('누가 왔어요? – 마크 씨가 왔어요.')}</p>
<p>Különleges alakok: ${korean('저 + 가 → 제가')}, ${korean('나 + 가 → 내가')}, ${korean('누구 + 가 → 누가')}.</p>`,
      correctIncorrect: [{ correct: '제가 할게요.', translation: 'Én megcsinálom.' }, { incorrect: '저가 할게요.', reason: 'a 저 („én”) a 가 előtt 제-vé változik: 제가' }],
      honorific: {
        rows: [['이/가', 'alanyjelölő', '께서', 'alanyjelölő (tiszteleti)']],
        note: `<p>Tisztelt személy alanyként ${korean('께서')}-t kaphat, az állítmány ilyenkor ${korean('-(으)시-')} alakú (2B 3. lecke). A ${korean('께서')} ünnepélyesebb; beszélt nyelvben gyakran elég a ${korean('이/가')} + tiszteleti ige: ${korean('선생님이 오셨어요')}.</p>`,
        examples: [['어머니<b>께서</b> 오셨어요.', 'Megjött édesanyám.'], ['할머니<b>께서</b> 김치를 만드세요.', 'A nagymama kimcsit készít.'], ['선생님이 오셨어요.', 'Megjött a tanár úr. (beszélt nyelv: 이 + tiszteleti ige)']],
      },
    },
    {
      lesson: 2, point: 2, form: '이/가 아니에요', name: 'főnév tagadása („nem …”)', studentBookPage: 47, vocabularyGrammarPage: 33,
      explanation: `<p>A ${korean('이에요/예요')} tagadása: „X nem Y”. A tagadott főnév az ${korean('이/가')} partikulát kapja, utána jön az ${korean('아니에요')}.</p>
<p><b>받침</b> után: <b>이 아니에요</b>, magánhangzó után: <b>가 아니에요</b>.</p>`,
      table: { kind: 'noun', nouns: ['vowelEnding', 'consonantEnding', { word: '의사', description: 'magánhangzóra végződik' }, { word: '학생', description: 'mássalhangzóra végződik' }], nounColumns: [{ header: 'Tagadás', conjugate: noun => nounWithParticle(noun, '이 아니에요', '가 아니에요') }] },
      examples: [['저는 학생<b>이 아니에요</b>.', 'Nem vagyok diák.'], ['이건 제 우산<b>이 아니에요</b>.', 'Ez nem az én esernyőm.'], ['가: 의사예요? 나: 아니요, 의사<b>가 아니에요</b>. 간호사예요.', '– Orvos vagy? – Nem, nem vagyok orvos. Ápoló vagyok.'], ['제 전화번호는 010-1234가 <b>아니에요</b>.', 'Az én telefonszámom nem 010-1234.']],
    },
    {
      lesson: 3, point: 1, form: '이, 그, 저', name: 'mutató szavak: ez, az (nálad), az (ott)', studentBookPage: 54, vocabularyGrammarPage: 34,
      explanation: `<p>Főnév előtt állnak, és a dolog <b>távolságát</b> jelzik:</p>
<ul><li><b>이</b>: a beszélőhöz közel („ez”)</li><li><b>그</b>: a hallgatóhoz közel, vagy a már említett dolog („az”)</li><li><b>저</b>: mindkettőtől távol („amaz, az ott”)</li></ul>`,
      customHtml: simpleTable(['', '이 (itt nálam)', '그 (nálad)', '저 (ott)'], [['+ 것 „dolog”', koreanWithTranslation('이것 → 이거', 'ez (a dolog)'), koreanWithTranslation('그것 → 그거', 'az (ott nálad)'), koreanWithTranslation('저것 → 저거', 'az (ott messze)')], ['+ 사람', koreanWithTranslation('이 사람', 'ez az ember'), koreanWithTranslation('그 사람', 'az az ember (nálad)'), koreanWithTranslation('저 사람', 'az az ember (ott)')], ['hely', koreanWithTranslation('여기', 'itt'), koreanWithTranslation('거기', 'ott (nálad)'), koreanWithTranslation('저기', 'amott')]]),
      examples: [['<b>이</b> 책은 제 책이에요.', 'Ez a könyv az enyém.'], ['<b>그</b> 가방은 누구 거예요?', 'Kié az a táska (ott nálad)?'], ['<b>저</b> 사람은 우리 선생님이에요.', 'Az az ember ott a tanárunk.'], ['<b>이거</b> 얼마예요?', 'Mennyibe kerül ez?']],
      ownNote: `<p>Beszédben az ${korean('이것, 그것, 저것')} rövidül: ${korean('이거, 그거, 저거')}; partikulával: ${korean('이게 (= 이것이), 이건 (= 이것은), 이걸 (= 이것을)')}. A ${korean('여기 / 거기 / 저기')} („itt / ott / amott”) ugyanezt a hármasságot követi.</p>`,
    },
    {
      lesson: 3, point: 2, form: '에 있다, 없다', name: 'hol van / nincs valami', studentBookPage: 55, vocabularyGrammarPage: 35,
      explanation: `<p>Hely + ${korean('에')} + ${korean('있다/없다')}: megmondja, <b>hol van</b> (vagy nincs) valaki, valami. Az ${korean('에')} minden főnév után ugyanaz. Gyakran helyhatározó szóval együtt: ${korean('책상 옆에')} „az asztal mellett”.</p>`,
      customHtml: simpleTable(['Helyviszony', 'Koreai', 'Példa'], [['előtt', koreanGlossedInRow('앞'), koreanWithTranslation('학교 앞에', 'az iskola előtt')], ['mögött', koreanGlossedInRow('뒤'), koreanWithTranslation('집 뒤에', 'a ház mögött')], ['mellett', koreanGlossedInRow('옆'), koreanWithTranslation('책상 옆에', 'az íróasztal mellett')], ['fölött, -on', koreanGlossedInRow('위'), koreanWithTranslation('책상 위에', 'az íróasztalon')], ['alatt', koreanGlossedInRow('아래 / 밑'), koreanWithTranslation('의자 아래에', 'a szék alatt')], ['benn', koreanGlossedInRow('안'), koreanWithTranslation('가방 안에', 'a táskában')], ['kinn', koreanGlossedInRow('밖'), koreanWithTranslation('교실 밖에', 'az osztálytermen kívül')]]),
      examples: [['가방이 책상 옆<b>에 있어요</b>.', 'A táska az íróasztal mellett van.'], ['교실에 시계가 <b>없어요</b>.', 'Az osztályteremben nincs óra.'], ['가: 화장실이 어디<b>에 있어요</b>? 나: 일 층<b>에 있어요</b>.', '– Hol van a mosdó? – A földszinten (1. emeleten).'], ['지갑이 가방 안<b>에 없어요</b>.', 'A pénztárca nincs a táskában.']],
      ownNote: `<p>A ${korean('있다/없다')} birtoklást is jelent: ${korean('저는 동생이 있어요')} = „Van egy öcsém/húgom.”</p>`,
      honorific: {
        rows: [['있다 (személy)', 'ott van, tartózkodik', '계시다', 'ott van (tiszteleti)'], ['없다 (személy)', 'nincs ott', '안 계시다', 'nincs ott (tiszteleti)'], ['있다 (birtoklás)', 'van neki', '있으시다', 'van neki (tiszteleti)']],
        note: `<p>Ha egy <b>tisztelt személy</b> tartózkodási helyéről beszélünk, a ${korean('있다')} helyett ${korean('계시다')} áll. Ha viszont a tisztelt személynek <b>van valamije</b> (idő, gyerek, kérdés), a szabályos ${korean('있으시다')} a helyes, nem a ${korean('계시다')}.</p>`,
        examples: [['선생님이 교실에 <b>계세요</b>.', 'A tanár úr az osztályteremben van.'], ['아버지는 지금 집에 <b>안 계세요</b>.', 'Édesapám most nincs otthon.'], ['내일 시간 <b>있으세요</b>?', 'Holnap van ideje?']],
        correctIncorrect: [{ correct: '할머니가 방에 계세요.', translation: 'A nagymama a szobában van.' }, { incorrect: '할머니가 방에 있으세요.', reason: 'helynél 계시다 kell' }],
      },
    },
    {
      lesson: 4, point: 1, form: '-아요/어요', name: 'udvarias jelen idő (해요체)', studentBookPage: 62, vocabularyGrammarPage: 36,
      explanation: `<p>Ige vagy melléknév tövéhez kapcsolódik, cselekvést vagy állapotot fejez ki <b>udvarias, hétköznapi stílusban</b>. Kijelentésre és kérdésre is jó, a különbséget csak a hanglejtés adja.</p>
<p>Ha a tő utolsó magánhangzója <b>ㅏ vagy ㅗ</b>: <b>-아요</b>, minden más magánhangzó után: <b>-어요</b>, a <b>하다</b> → <b>해요</b>. A magánhangzók összevonásáról az Alapszabályok 2. pontja szól.</p>`,
      table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-아요/어요', conjugate: word => withAOrEo(word, '요') }] },
      examples: [['지금 뭐 <b>해요</b>?', 'Mit csinálsz most?'], ['책을 <b>읽어요</b>.', 'Könyvet olvasok.'], ['커피를 <b>마셔요</b>.', 'Kávét iszom.'], ['음악을 <b>들어요</b>.', 'Zenét hallgatok.', 'ㄷ-rendhagyó: 듣다 → 들어요'], ['요즘 정말 <b>바빠요</b>.', 'Mostanában nagyon elfoglalt vagyok.', '으-kiesés: 바쁘다 → 바빠요']],
    },
    {
      lesson: 4, point: 2, form: '을/를', name: 'tárgyjelölő', studentBookPage: 63, vocabularyGrammarPage: 37,
      explanation: `<p>Főnév után jelöli a mondat <b>tárgyát</b> (kit? mit?). <b>받침</b> után: <b>을</b>, magánhangzó után: <b>를</b>.</p>`,
      table: { kind: 'noun', nouns: ['vowelEnding', 'consonantEnding', { word: '커피', description: 'magánhangzóra végződik' }, { word: '빵', description: 'mássalhangzóra végződik' }], nounColumns: [{ header: '을/를', conjugate: noun => nounWithParticle(noun, '을', '를') }] },
      examples: [['한국어<b>를</b> 공부해요.', 'Koreait tanulok.'], ['빵<b>을</b> 먹어요.', 'Kenyeret eszem.'], ['친구<b>를</b> 만나요.', 'Találkozom a barátommal.'], ['영화<b>를</b> 봐요.', 'Filmet nézek.']],
      ownNote: `<p>Beszédben gyakran elmarad: ${korean('밥 먹어요')}. Figyelem: néhány ige mást vonz, mint a magyarban: ${korean('친구를 만나요')} „a barátommal találkozom” (koreaiul tárgy), ${korean('버스를 타요')} „buszra szállok”.</p>`,
    },
    {
      lesson: 5, point: 1, form: '에 가다', name: 'hová megy („-ba/-be, -ra/-re megy”)', studentBookPage: 70, vocabularyGrammarPage: 38,
      explanation: `<p>Hely + ${korean('에')} + ${korean('가다')}: a mozgás <b>célját, irányát</b> jelöli. Ugyanígy ${korean('오다')} (jön), ${korean('다니다')} (jár valahová). Az ${korean('에')} minden főnév után ugyanaz.</p>`,
      examples: [['편의점<b>에 가요</b>.', 'A kisboltba megyek.'], ['어디<b>에 가요</b>?', 'Hová mész?'], ['주말에 백화점<b>에 가요</b>.', 'Hétvégén az áruházba megyek.'], ['우리 집<b>에 오세요</b>.', 'Gyere el hozzánk.']],
    },
    {
      lesson: 5, point: 2, form: '하고', name: '„és” főnevek között', studentBookPage: 71, vocabularyGrammarPage: 39,
      explanation: `<p>Két <b>főnevet</b> köt össze („kenyér <b>és</b> tej”). Bármilyen főnév után ugyanaz. Helyette használható a ${korean('와/과')} is (magánhangzó után ${korean('와')}, 받침 után ${korean('과')}), ez kicsit írottabb.</p>`,
      table: { kind: 'noun', nouns: ['vowelEnding', 'consonantEnding', { word: '우유', description: 'magánhangzóra végződik' }, { word: '빵', description: 'mássalhangzóra végződik' }], nounColumns: [{ header: '하고', conjugate: noun => noun + '하고' }, { header: '와/과', conjugate: noun => nounWithParticle(noun, '과', '와') }] },
      examples: [['빵<b>하고</b> 우유를 사요.', 'Kenyeret és tejet veszek.'], ['사과<b>와</b> 배가 있어요.', 'Van alma és körte.'], ['책<b>과</b> 공책을 샀어요.', 'Könyvet és füzetet vettem.'], ['친구<b>하고</b> 영화를 봐요.', 'A barátommal filmet nézek.']],
      ownNote: `<p>A ${korean('하고')} és a ${korean('와/과')} jelentése „-val/-vel” is lehet: ${korean('친구하고 같이 가요')} = „A barátommal együtt megyek.” Igéket, mondatokat a ${korean('-고')} köt össze (1B 7. lecke), nem a ${korean('하고')}.</p>`,
    },
    {
      lesson: 6, point: 1, form: '단위 명사', name: 'számlálószavak (darab, fő, állat…)', studentBookPage: 78, vocabularyGrammarPage: 40,
      explanation: `<p>Megszámolt dolgoknál a szám után <b>számlálószó</b> áll: ${korean('개')} (darab, tárgy), ${korean('명')} (fő, ember), ${korean('마리')} (állat). Sorrend: <b>főnév + szám + számlálószó</b>. A számlálószavak előtt a <b>koreai eredetű</b> számok állnak, és az 1, 2, 3, 4, 20 rövid alakot kap.</p>`,
      customHtml: simpleTable(['Szám', 'Önálló', 'Számlálószó előtt', 'Példa'], [['1', koreanGlossedInRow('하나'), koreanGlossedInRow('한'), koreanWithTranslation('사과 한 개', 'egy alma')], ['2', koreanGlossedInRow('둘'), koreanGlossedInRow('두'), koreanWithTranslation('학생 두 명', 'két diák')], ['3', koreanGlossedInRow('셋'), koreanGlossedInRow('세'), koreanWithTranslation('고양이 세 마리', 'három macska')], ['4', koreanGlossedInRow('넷'), koreanGlossedInRow('네'), koreanWithTranslation('빵 네 개', 'négy (darab) kenyér')], ['5–10', koreanWithTranslation('다섯, 여섯, 일곱, 여덟, 아홉, 열', 'öt, hat, hét, nyolc, kilenc, tíz'), 'változatlan', koreanWithTranslation('사과 다섯 개', 'öt alma')], ['20', koreanGlossedInRow('스물'), koreanGlossedInRow('스무'), koreanWithTranslation('스무 명', 'húsz fő')]]),
      examples: [['사과 다섯 <b>개</b> 주세요.', 'Öt almát kérek.'], ['우리 반에 학생이 열두 <b>명</b> 있어요.', 'Az osztályunkban tizenkét diák van.'], ['고양이 두 <b>마리</b>가 있어요.', 'Két macskám van.'], ['콜라 한 <b>병</b>하고 커피 두 <b>잔</b> 주세요.', 'Egy üveg kólát és két csésze kávét kérek.']],
      ownNote: `<p>További gyakori számlálószavak: ${korean('병')} (üveg), ${korean('잔')} (pohár, csésze), ${korean('권')} (könyv), ${korean('장')} (lap, jegy), ${korean('살')} (életév), ${korean('분')} (fő, tiszteleti). Ezek mind koreai eredetű számot kapnak. Kérdés: ${korean('몇 개예요?')} „Hány darab?”</p>`,
    },
    {
      lesson: 6, point: 2, form: '-(으)세요', name: 'udvarias kérés, felszólítás', studentBookPage: 79, vocabularyGrammarPage: 41,
      explanation: `<p>Igéhez kapcsolódik, és udvarias <b>kérést vagy felszólítást</b> fejez ki („tessék …”, „kérem, …”).</p>
<p><b>받침</b> után: <b>-으세요</b>, magánhangzó után: <b>-세요</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik, és <b>-세요</b> jön: ${korean('만들다 → 만드세요')}.</p>`,
      table: { sampleSet: 'verbs', columns: [{ header: '-(으)세요', conjugate: word => withEu(word, '세요') }] },
      examples: [['여기 앉<b>으세요</b>.', 'Kérem, üljön le ide.'], ['사과 다섯 개 주<b>세요</b>.', 'Öt almát kérek.'], ['천천히 말해 주<b>세요</b>.', 'Kérem, beszéljen lassan.'], ['이 노래를 들<b>으세요</b>.', 'Hallgassa meg ezt a dalt.', 'ㄷ-rendhagyó: 듣다 → 들으세요']],
      ownNote: `<p>Tiltás: ${korean('-지 마세요')} (2B 5. lecke).</p>`,
      honorific: {
        rows: [['먹다 / 마시다', 'eszik / iszik', '드세요', 'egyen / igyon'], ['자다', 'alszik', '주무세요', 'aludjon'], ['있다', 'ott van, marad', '계세요', 'maradjon'], ['말하다', 'mond, beszél', '말씀하세요', 'mondja']],
        note: `<p>A ${korean('-(으)세요')} maga is udvarias, tiszteleti alak. Néhány igének azonban <b>külön tiszteleti szava</b> van, és ezeknél nem a sima ${korean('-(으)세요')}-t, hanem a külön szót használjuk.</p>`,
        examples: [['맛있게 <b>드세요</b>.', 'Jó étvágyat!'], ['안녕히 <b>주무세요</b>.', 'Jó éjszakát! (tiszteleti)'], ['안녕히 <b>계세요</b>.', 'Viszontlátásra! (annak mondjuk, aki marad)'], ['천천히 <b>말씀하세요</b>.', 'Mondja nyugodtan, lassan.']],
        correctIncorrect: [{ correct: '맛있게 드세요.', translation: 'Jó étvágyat!', note: 'tiszteleti alak' }, { incorrect: '맛있게 먹으세요.', reason: 'nyelvtanilag képezhető, de idősebbnek nem így mondjuk' }],
      },
    },
    {
      lesson: 7, point: 1, form: '에 (시간)', name: 'időpont („-kor, -n”)', studentBookPage: 86, vocabularyGrammarPage: 42,
      explanation: `<p>Időt jelölő főnév után azt mondja meg, <b>mikor</b> történik valami: ${korean('세 시에')} „háromkor”, ${korean('월요일에')} „hétfőn”. Minden főnév után ugyanaz.</p>
<p><b>Nem kap ${korean('에')}-t:</b> ${korean('오늘, 내일, 어제, 언제, 지금, 매일, 요즘')}. A ${korean('이에요/예요')} elé sem tesszük: ${korean('몇 시예요?')}</p>`,
      examples: [['일곱 시<b>에</b> 시작해요.', 'Hétkor kezdődik.'], ['토요일<b>에</b> 친구를 만나요.', 'Szombaton találkozom a barátommal.'], ['3월 15일<b>에</b> 한국에 가요.', 'Március 15-én Koreába megyek.'], ['내일 뭐 해요?', 'Mit csinálsz holnap? (a 내일 nem kap 에-t)']],
      correctIncorrect: [{ correct: '오늘 공부해요.', translation: 'Ma tanulok.' }, { incorrect: '오늘에 공부해요.', reason: 'az 오늘 („ma”) nem kap 에-t' }],
    },
    {
      lesson: 7, point: 2, form: '○시 ○분', name: 'az idő kifejezése (óra, perc)', studentBookPage: 87, vocabularyGrammarPage: 43,
      explanation: `<p>Az <b>órát</b> (${korean('시')}) <b>koreai eredetű</b> számmal mondjuk (${korean('한, 두, 세…')}), a <b>percet</b> (${korean('분')}) <b>kínai eredetű</b> számmal (${korean('일, 이, 삼…')}).</p>`,
      customHtml: simpleTable(['Idő', 'Koreaiul'], [['1:00', koreanWithTranslation('한 시', 'egy óra')], ['2:10', koreanWithTranslation('두 시 십 분', 'két óra tíz (perc)')], ['3:30', koreanWithTranslation('세 시 삼십 분 = 세 시 반', 'fél négy (szó szerint: három óra fél)')], ['4:45', koreanWithTranslation('네 시 사십오 분', 'háromnegyed öt (négy óra negyvenöt)')], ['11:05', koreanWithTranslation('열한 시 오 분', 'tizenegy óra öt (perc)')], ['12:00', koreanWithTranslation('열두 시', 'tizenkét óra')]]),
      examples: [['지금 몇 <b>시</b>예요?', 'Hány óra van most?'], ['수업이 아홉 <b>시</b> 삼십 <b>분</b>에 시작해요.', 'Az óra fél tízkor kezdődik.'], ['열두 <b>시</b>에 점심을 먹어요.', 'Tizenkét órakor ebédelek.'], ['다섯 <b>시</b> 반에 만나요.', 'Fél hatkor találkozunk.']],
      ownNote: `<p>${korean('반')} = fél (${korean('두 시 반')} = fél három). ${korean('오전')} = délelőtt, ${korean('오후')} = délután: ${korean('오후 세 시')}. „-tól -ig” időre: ${korean('아홉 시부터 다섯 시까지')}.</p>`,
    },
    {
      lesson: 8, point: 1, form: '안', name: 'rövid tagadás („nem”)', studentBookPage: 94, vocabularyGrammarPage: 44,
      explanation: `<p>Az ige vagy melléknév <b>elé</b> téve tagad: ${korean('안 가요')} „nem megyek”. <b>Főnév + 하다</b> igéknél a ${korean('안')} a ${korean('하다')} elé kerül: ${korean('공부 안 해요')}. A ${korean('있다, 없다')} nem kap ${korean('안')}-t (${korean('있다')} tagadása: ${korean('없다')}).</p>`,
      table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '안 + -아요/어요', conjugate: negateWithAn }] },
      examples: [['오늘은 날씨가 <b>안</b> 추워요.', 'Ma nincs hideg.', 'ㅂ-rendhagyó: 춥다 → 추워요'], ['저는 커피를 <b>안</b> 마셔요.', 'Nem iszom kávét.'], ['주말에 공부 <b>안</b> 해요.', 'Hétvégén nem tanulok.'], ['이 김치는 <b>안</b> 매워요.', 'Ez a kimcsi nem csípős.', 'ㅂ-rendhagyó: 맵다 → 매워요']],
      correctIncorrect: [{ correct: '운동 안 해요.', translation: 'Nem sportolok.' }, { incorrect: '안 운동해요.', reason: 'főnév + 하다 igénél a 안 középre kerül' }, { correct: '피곤하지 않아요 / 안 피곤해요.', translation: 'Nem vagyok fáradt.', note: 'a 하다 melléknév nem bomlik szét (nem: 피곤 안 해요)' }],
      ownNote: `<p>A hosszú tagadás ${korean('-지 않다')} (2A 5. lecke) ugyanazt jelenti, csak kicsit írottabb. A „nem tudom megcsinálni” jelentésű tagadás ${korean('못')} (1B 1. lecke).</p>`,
    },
    {
      lesson: 8, point: 2, form: 'ㅂ 불규칙', name: 'ㅂ-rendhagyó igék és melléknevek', studentBookPage: 95, vocabularyGrammarPage: 45,
      explanation: `<p>Néhány ㅂ-re végződő szónál <b>magánhangzóval kezdődő végződés előtt</b> a ㅂ <b>우</b>-vá változik, és ${korean('우 + 어요 = 워요')}: ${korean('덥다 → 더워요')}. Ilyen: ${korean('덥다, 춥다, 맵다, 무겁다, 가볍다, 쉽다, 어렵다')}.</p>
<p>Nem minden ㅂ-végű szó rendhagyó: ${korean('입다, 잡다, 좁다')} szabályos (${korean('입어요')}).</p>`,
      table: { words: [createWord('덥다', 'adjective'), createWord('춥다', 'adjective'), createWord('맵다', 'adjective'), createWord('무겁다', 'adjective'), createWord('쉽다', 'adjective'), createWord('돕다', 'verb')], irregularWords: [createWord('입다', 'verb'), createWord('좁다', 'adjective'), createWord('잡다', 'verb')], columns: [{ header: '-아요/어요', conjugate: word => withAOrEo(word, '요') }, { header: 'Múlt', conjugate: word => withPast(word, '어요') }, { header: '-(으)ㄴ (jelző)', conjugate: word => word.wordClass === 'adjective' ? withEu(word, 'ㄴ') : withEu(word, 'ㄴ') }, { header: '-고 (változatlan)', conjugate: word => withPlainStem(word, '고') }] },
      irregularRowsOptional: true,
      examples: [['날씨가 <b>더워요</b>?', 'Meleg van?'], ['한국어가 <b>어려워요</b>?', 'Nehéz a koreai?'], ['이 가방은 <b>가벼워요</b>.', 'Ez a táska könnyű.'], ['동생을 <b>도와요</b>.', 'Segítek az öcsémnek.', 'kivétel: 돕다 → 도와요 (nem 도워요)']],
      ownNote: `<p>A táblázat második részében (${korean('입다, 좁다, 잡다')}) szabályos szavak vannak: náluk a ㅂ mindig megmarad. Kivétel a rendhagyók közt: ${korean('돕다, 곱다 → 도와요, 고와요')}. A rendhagyóság csak magánhangzós végződés előtt jelentkezik: ${korean('덥고, 덥지만, 덥습니다')} szabályos.</p>`,
    },
    {
      lesson: 9, point: 1, form: '에서', name: 'a cselekvés helye („-ban/-ben, -on/-en”)', studentBookPage: 102, vocabularyGrammarPage: 46,
      explanation: `<p>Hely után azt jelöli, <b>hol történik</b> egy cselekvés: ${korean('공원에서 산책해요')}. Minden főnév után ugyanaz.</p>`,
      examples: [['공원<b>에서</b> 산책했어요.', 'A parkban sétáltam.'], ['도서관<b>에서</b> 책을 읽어요.', 'A könyvtárban olvasok.'], ['어디<b>에서</b> 일해요?', 'Hol dolgozol?'], ['카페<b>에서</b> 친구를 만나요.', 'A kávézóban találkozom a barátommal.']],
      ownNote: `<p><b>에 vagy 에서?</b> Létige (${korean('있다/없다')}) és mozgás célja (${korean('가다, 오다')}) mellett ${korean('에')}: ${korean('집에 있어요, 집에 가요')}. Ha a helyen <b>csinálunk valamit</b>: ${korean('에서')}: ${korean('집에서 쉬어요')}. Az ${korean('에서')} „-ból/-ből, -tól/-től” (kiindulópont) is lehet: ${korean('어디에서 왔어요?')} „Honnan jöttél?”</p>`,
      correctIncorrect: [{ correct: '도서관에서 공부해요.', translation: 'A könyvtárban tanulok.' }, { incorrect: '도서관에 공부해요.', reason: 'a cselekvés helyét 에서 jelöli; az 에 létezésnél és a mozgás céljánál áll' }],
    },
    {
      lesson: 9, point: 2, form: '-았/었-', name: 'múlt idő', studentBookPage: 103, vocabularyGrammarPage: 47,
      explanation: `<p>Ige vagy melléknév tövéhez kapcsolódik, <b>múltbeli cselekvést vagy állapotot</b> fejez ki. Utána jön a mondatvég, pl. ${korean('-어요')}: ${korean('갔어요')}.</p>
<p><b>ㅏ, ㅗ</b> után: <b>-았-</b>, egyéb magánhangzó után: <b>-었-</b>, <b>하다</b> → <b>했-</b>. Ugyanúgy vonódik össze, mint a ${korean('-아요/어요')}.</p>`,
      table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-았어요/었어요', conjugate: word => withPast(word, '어요') }] },
      examples: [['주말에 공원에서 산책<b>했어요</b>.', 'Hétvégén sétáltam a parkban.'], ['어제 친구를 <b>만났어요</b>.', 'Tegnap találkoztam a barátommal.'], ['아침에 빵을 <b>먹었어요</b>.', 'Reggel kenyeret ettem.'], ['어제는 날씨가 <b>추웠어요</b>.', 'Tegnap hideg volt.', 'ㅂ-rendhagyó: 춥다 → 추웠어요']],
      ownNote: `<p>Főnév + 이다 múlt ideje: 받침 után ${korean('-이었어요')}, magánhangzó után ${korean('-였어요')}: ${korean('학생이었어요, 의사였어요')}.</p>`,
    },
    {
      lesson: 10, point: 1, form: '-고 싶다', name: '„szeretnék …” (vágy)', studentBookPage: 110, vocabularyGrammarPage: 48,
      explanation: `<p>Ige után azt fejezi ki, amit a beszélő <b>szeretne, kíván</b>. A tő végétől függetlenül mindig ${korean('-고 싶다')}. Ha az alany <b>harmadik személy</b>: ${korean('-고 싶어 하다')}.</p>`,
      table: { sampleSet: 'verbs', columns: [{ header: '-고 싶어요', conjugate: word => withPlainStem(word, '고 싶어요') }, { header: '3. személy: -고 싶어 해요', conjugate: word => withPlainStem(word, '고 싶어 해요') }] },
      examples: [['놀이공원에 가<b>고 싶어요</b>.', 'Vidámparkba szeretnék menni.'], ['뭐 먹<b>고 싶어요</b>?', 'Mit szeretnél enni?'], ['동생은 한국 음악을 듣<b>고 싶어 해요</b>.', 'Az öcsém koreai zenét szeretne hallgatni.', 'a -고 előtt a ㄷ-rendhagyó nem változik: 듣고'], ['주말에 집에서 쉬<b>고 싶어요</b>.', 'Hétvégén otthon szeretnék pihenni.']],
      ownNote: `<p>A ${korean('-고')} mássalhangzóval kezdődik, ezért itt <b>minden</b> szó szabályos (${korean('듣고, 돕고, 만들고')}). A ${korean('싶다')} maga ragozódik: ${korean('싶어요, 싶었어요, 싶습니다')}.</p>`,
    },
    {
      lesson: 10, point: 2, form: '-(으)ㄹ까요? (제안)', name: '„… -junk?” (javaslat)', studentBookPage: 111, vocabularyGrammarPage: 49,
      explanation: `<p>Ige után a hallgató <b>véleményét kérdezi</b> egy közös cselekvésről: „Menjünk…?”, „Együnk…?”.</p>
<p><b>받침</b> után: <b>-을까요?</b>, magánhangzó után: <b>-ㄹ까요?</b>, <b>ㄹ-tőnél</b>: <b>-까요?</b> (${korean('만들다 → 만들까요?')}).</p>`,
      table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ까요?', conjugate: word => withEu(word, 'ㄹ까요?') }] },
      examples: [['우리 같이 놀이공원에 <b>갈까요</b>?', 'Elmenjünk együtt a vidámparkba?'], ['뭐 먹<b>을까요</b>?', 'Mit együnk?'], ['같이 음악을 들<b>을까요</b>?', 'Hallgassunk együtt zenét?', 'ㄷ-rendhagyó: 듣다 → 들을까요?'], ['가: 몇 시에 만<b>날까요</b>? 나: 세 시에 만나요.', '– Hánykor találkozzunk? – Háromkor.']],
      ownNote: `<p>Válaszként gyakran ${korean('-아요/어요')} (javaslat, 1B 6. lecke): ${korean('좋아요, 같이 가요!')} Ugyanez a végződés <b>találgató kérdés</b> is lehet („vajon…?”), ezt a 2A 2. lecke tanítja.</p>`,
    },
  ],
} satisfies BookData;
