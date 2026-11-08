import { withAOrEo, withPast, withEu, withPlainStem, formalEnding, nounWithParticle, type Word } from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';

const korean = (text: string) => `<span class="korean">${text}</span>`;
const koreanWithTranslation = (koreanText: string, hungarianText: string) => `<span class="korean">${koreanText}</span><span class="translation">${hungarianText}</span>`;
const koreanGlossedInRow = (text: string) => `<span class="korean glossed-in-row">${text}</span>`;
const simpleTable = (headers: string[], rows: string[][]) => `<div class="table-wrapper"><table class="plain"><thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const withAdverbBeforeVerb = (word: Word, adverb: string) => (word.wordClass === 'verb' && word.stem.endsWith('하') && word.stem.length > 1) ? word.stem.slice(0, -1) + ` ${adverb} 해요` : `${adverb} ` + withAOrEo(word, '요');
const vocabularyGrammarPageOf = (lesson: number, point: number) => 26 + 2 * (lesson - 1) + (point - 1), studentBookPageOf = (lesson: number, point: number) => 16 + 8 * (lesson - 1) + (point - 1);

const points: PointSource[] = [
  {
    lesson: 1, point: 1, form: '무슨', name: '„milyen, miféle?” (főnév előtt)', conjugable: false,
    explanation: `<p>Mindig <b>főnév előtt</b> áll, és a főnévre <b>pontosabban</b> kérdez rá: milyen fajta, milyen típusú.</p>`,
    examples: [['<b>무슨</b> 음식을 좋아해요?', 'Milyen ételeket szeretsz?'], ['<b>무슨</b> 영화를 봤어요?', 'Milyen filmet néztél?'], ['오늘이 <b>무슨</b> 요일이에요?', 'Milyen nap van ma?'], ['<b>무슨</b> 일이에요?', 'Mi történt? / Miről van szó?']],
    ownNote: `<p><b>무슨 – 어떤 – 어느:</b> a ${korean('무슨')} a fajtára kérdez („milyen fajta?”), az ${korean('어떤')} inkább a tulajdonságra („milyen?”, ${korean('어떤 사람이에요?')} „Milyen ember?”), az ${korean('어느')} adott lehetőségek közül választ („melyik?”, ${korean('어느 나라 사람이에요?')}).</p>`,
  },
  {
    lesson: 1, point: 2, form: '못', name: '„nem tud(ja megtenni)” (képtelenség)',
    explanation: `<p>Ige <b>elé</b> téve azt jelenti, hogy valami <b>nem sikerül, nem lehetséges</b>: képesség hiánya vagy külső ok miatt. <b>Főnév + 하다</b> igéknél a ${korean('못')} a ${korean('하다')} elé kerül: ${korean('수영 못 해요')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '못 + -아요/어요', conjugate: word => withAdverbBeforeVerb(word, '못') }] },
    examples: [['저는 매운 음식을 <b>못</b> 먹어요.', 'Nem tudok csípőset enni.'], ['수영 <b>못</b> 해요.', 'Nem tudok úszni.'], ['어제 바빠서 숙제를 <b>못</b> 했어요.', 'Tegnap elfoglalt voltam, ezért nem tudtam megcsinálni a házit.'], ['시끄러워서 음악을 <b>못</b> 들어요.', 'Olyan zaj van, hogy nem tudok zenét hallgatni.', 'ㄷ-rendhagyó: 듣다 → 들어요']],
    ownNote: `<p><b>안 vagy 못?</b> ${korean('안 가요')} = „nem megyek” (nem akarok, döntés); ${korean('못 가요')} = „nem tudok menni” (nem rajtam múlik). A ${korean('못')} melléknév előtt nem állhat. Kiejtésben összeolvad: ${korean('못 해요')} [모태요], ${korean('못 먹어요')} [몬머거요]. Hosszú alakja: ${korean('-지 못하다')} (2A 5. lecke).</p>`,
  },
  {
    lesson: 2, point: 1, form: '-(으)러 가다', name: '„megy, hogy …” (a mozgás célja)',
    explanation: `<p>Ige után megmondja, <b>milyen céllal megyünk</b> valahová. Csak mozgást jelentő igékkel áll: ${korean('가다, 오다, 다니다')}.</p>
<p><b>받침</b> után: <b>-으러</b>, magánhangzó után: <b>-러</b>, <b>ㄹ-tő</b> után is <b>-러</b> (${korean('놀다 → 놀러')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)러 가요', conjugate: word => withEu(word, '러 가요') }] },
    examples: [['도서관에 책을 빌리<b>러 가요</b>.', 'Könyvtárba megyek könyvet kölcsönözni.'], ['친구 집에 놀<b>러 가요</b>.', 'Átmegyek a barátomhoz játszani/lógni.'], ['점심 먹<b>으러 갈까요</b>?', 'Elmenjünk ebédelni?'], ['동생이 이사해서 도우<b>러 왔어요</b>.', 'Az öcsém költözött, eljöttem segíteni.', 'ㅂ-rendhagyó: 돕다 → 도우러']],
    correctIncorrect: [[1, '한국어를 배우러 세종학당에 다녀요.', 'Szedzsong Intézetbe járok koreait tanulni.'], [0, '한국어를 배우러 공부해요.', 'a -(으)러 után mozgást jelentő ige kell']],
  },
  {
    lesson: 2, point: 2, form: '도', name: '„is”', conjugable: false,
    explanation: `<p>Főnév vagy más partikula után: „is”, azaz a már említett dolog mellé még valami <b>hozzájön</b>. Alany és tárgy után <b>helyettesíti</b> a ${korean('은/는, 이/가, 을/를')} partikulát. Az ${korean('에')} és ${korean('에서')} után megmarad előtte: ${korean('에도, 에서도')}.</p>`,
    examples: [['저<b>도</b> 학생이에요.', 'Én is diák vagyok.'], ['사과를 샀어요. 바나나<b>도</b> 샀어요.', 'Almát vettem. Banánt is vettem.'], ['주말에<b>도</b> 일해요.', 'Hétvégén is dolgozom.'], ['도서관에서<b>도</b> 공부하고 집에서<b>도</b> 공부해요.', 'A könyvtárban is tanulok, és otthon is.']],
    correctIncorrect: [[1, '저도 가요.', 'Én is megyek.'], [0, '저는도 가요.', ''], [1, '서울에도 가요.', 'Szöulba is megyek.']],
  },
  {
    lesson: 3, point: 1, form: '-아서/어서 (이유)', name: '„mert …, ezért …” (ok)',
    explanation: `<p>Ige vagy melléknév után az <b>okot</b> fejezi ki: „X, ezért Y”. A <b>-아/어</b> szabály szerint képezzük (ㅏ, ㅗ → -아서, egyéb → -어서, 하다 → 해서).</p>
<p>Megkötések: elé <b>nem kerülhet múlt</b> (-았/었-) és ${korean('-겠-')} (az időt a mondat vége adja), és utána <b>nem állhat felszólítás vagy javaslat</b>.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-아서/어서', conjugate: word => withAOrEo(word, '서') }] },
    examples: [['배가 고<b>파서</b> 빵을 먹었어요.', 'Éhes voltam, ezért ettem egy kis kenyeret.', '으-kiesés: 고프다 → 고파서'], ['옷이 너무 <b>커서</b> 바꾸고 싶어요.', 'A ruha túl nagy, ezért szeretném kicserélni.'], ['날씨가 <b>추워서</b> 집에 있었어요.', 'Hideg volt, ezért otthon maradtam.', 'ㅂ-rendhagyó: 춥다 → 추워서'], ['오늘은 일이 많<b>아서</b> 바빠요.', 'Ma sok a munka, ezért elfoglalt vagyok.']],
    correctIncorrect: [[1, '어제 아파서 학교에 못 갔어요.', 'Tegnap beteg voltam, ezért nem mentem iskolába.'], [0, '어제 아팠어서 학교에 못 갔어요.', 'múlt idő nem kerülhet a -아서 elé'], [0, '비가 와서 우산을 가져가세요.', 'felszólítás előtt -(으)니까 kell (1B 12. lecke)']],
    ownNote: `<p>Főnévvel: ${korean('-이라서 / 라서')} (vagy ${korean('-이어서 / 여서')}): ${korean('휴가라서 여행을 가요')}. Gyakori rövid válasz: ${korean('왜요? – 바빠서요.')} „Miért? – Mert elfoglalt vagyok.”</p>`,
  },
  {
    lesson: 3, point: 2, form: '-(으)ㄹ 거예요', name: 'jövő idő, terv („… fogok”)',
    explanation: `<p>Ige után <b>jövőbeli cselekvést, tervet</b> fejez ki.</p>
<p><b>받침</b> után: <b>-을 거예요</b>, magánhangzó után: <b>-ㄹ 거예요</b>, <b>ㄹ-tő</b>: <b>거예요</b> (${korean('만들다 → 만들 거예요')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ 거예요', conjugate: word => withEu(word, 'ㄹ 거예요') }, { header: 'Kérdés', conjugate: word => withEu(word, 'ㄹ 거예요?') }] },
    examples: [['주말에 백화점에서 쇼핑<b>할 거예요</b>.', 'Hétvégén az áruházban fogok vásárolni.'], ['내일 뭐 <b>할 거예요</b>?', 'Mit fogsz csinálni holnap?'], ['저녁에 불고기를 <b>만들 거예요</b>.', 'Este bulgogit fogok főzni.'], ['방학에 한국 노래를 많이 들<b>을 거예요</b>.', 'A szünetben sok koreai dalt fogok hallgatni.', 'ㄷ-rendhagyó: 듣다 → 들을 거예요']],
    ownNote: `<p>Melléknévvel (és harmadik személyről) <b>feltételezést</b> fejez ki: ${korean('내일은 더울 거예요')} „holnap valószínűleg meleg lesz”. A ${korean('거예요')} a ${korean('것이에요')} rövidült alakja; formálisan ${korean('-(으)ㄹ 겁니다')}.</p>`,
  },
  {
    lesson: 4, point: 1, form: '-(으)ㄴ (형용사)', name: 'melléknév jelzői alakja („nagy táska”)',
    explanation: `<p>Melléknév után áll, ha a melléknév egy <b>főnevet jelöl</b>: ${korean('큰 가방')} „nagy táska”.</p>
<p><b>받침</b> után: <b>-은</b>, magánhangzó után: <b>-ㄴ</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik, és <b>-ㄴ</b> jön: ${korean('길다 → 긴')}.</p>`,
    table: { sampleSet: 'adjectives', columns: [{ header: '-(으)ㄴ (+ főnév)', conjugate: word => withEu(word, 'ㄴ') }] },
    examples: [['더 <b>큰</b> 사이즈는 없어요?', 'Nincs nagyobb méret?'], ['<b>작은</b> 가방을 사고 싶어요.', 'Egy kis táskát szeretnék venni.'], ['<b>매운</b> 음식을 좋아해요?', 'Szereted a csípős ételeket?', 'ㅂ-rendhagyó: 맵다 → 매운'], ['<b>긴</b> 치마가 예뻐요.', 'A hosszú szoknya szép.', 'ㄹ-tő: 길다 → 긴']],
    ownNote: `<p>A ${korean('있다/없다')} és összetételeik (${korean('맛있다, 재미있다, 멋있다')}) jelzői alakja <b>-는</b>: ${korean('맛있는 음식')}, ${korean('재미없는 영화')}. A ㅎ-rendhagyóknál a ㅎ kiesik: ${korean('빨갛다 → 빨간')} (2A 10. lecke).</p>`,
    correctIncorrect: [[1, '맛있는 빵', ''], [0, '맛있은 빵', '']],
  },
  {
    lesson: 4, point: 2, form: '-습니다/ㅂ니다, -습니까?/ㅂ니까?', name: 'formális (hivatalos) stílus',
    explanation: `<p>A legformálisabb beszédszint (격식체): hírekben, előadáson, ügyfélszolgálaton, katonaságnál, hivatalos helyzetben. Kijelentés: ${korean('-습니다/ㅂ니다')}, kérdés: ${korean('-습니까?/ㅂ니까?')}</p>
<p><b>받침</b> után: <b>-습니다</b>, magánhangzó után: <b>-ㅂ니다</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik: ${korean('만들다 → 만듭니다')}. Főnévvel: ${korean('학생입니다')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: 'Kijelentés', conjugate: word => formalEnding(word) }, { header: 'Kérdés', conjugate: word => formalEnding(word, true) }] },
    examples: [['처음 뵙겠<b>습니다</b>. 저는 마크<b>입니다</b>.', 'Örvendek. Mark vagyok.'], ['이 가방은 얼마<b>입니까</b>?', 'Mennyibe kerül ez a táska?'], ['이 식당은 음식이 아주 맛있<b>습니다</b>.', 'Ebben az étteremben nagyon finom az étel.'], ['저는 서울에 <b>삽니다</b>.', 'Szöulban élek.', 'ㄹ-tő: 살다 → 삽니다']],
    ownNote: `<p>A rendhagyó szavak itt <b>szabályosak</b>, mert a végződés mássalhangzóval kezdődik: ${korean('덥습니다, 듣습니다, 짓습니다')}. Múlt idő: ${korean('-았습니다/었습니다')} (${korean('갔습니다')}).</p>`,
  },
  {
    lesson: 5, point: 1, form: '의문사', name: 'kérdőszavak', conjugable: false,
    explanation: `<p>A kérdőszavak azt jelölik, amire kíváncsiak vagyunk. A kérdőszó a mondatban oda kerül, ahol a válaszban az új információ áll.</p>`,
    customHtml: simpleTable(['Kérdőszó', 'Jelentés', 'Példa'], [[koreanGlossedInRow('누구 (누가)'), 'ki', koreanWithTranslation('누구예요? · 누가 왔어요?', 'Ki ez? · Ki jött?')], [koreanGlossedInRow('어디'), 'hol, hová', koreanWithTranslation('어디에 가요?', 'Hová mész?')], [koreanGlossedInRow('무엇 (뭐)'), 'mi', koreanWithTranslation('뭐 먹어요?', 'Mit eszel?')], [koreanGlossedInRow('언제'), 'mikor', koreanWithTranslation('언제 와요?', 'Mikor jössz?')], [koreanGlossedInRow('얼마'), 'mennyi (ár)', koreanWithTranslation('얼마예요?', 'Mennyibe kerül?')], [koreanGlossedInRow('얼마나'), 'mennyi ideig, mennyire', koreanWithTranslation('얼마나 걸려요?', 'Mennyi ideig tart?')], [koreanGlossedInRow('어떻게'), 'hogyan', koreanWithTranslation('어떻게 가요?', 'Hogyan jutok oda? / Hogyan mész?')], [koreanGlossedInRow('왜'), 'miért', koreanWithTranslation('왜 안 와요?', 'Miért nem jössz?')], [koreanGlossedInRow('몇'), 'hány (+ számlálószó)', koreanWithTranslation('몇 시예요?', 'Hány óra van?')], [koreanGlossedInRow('어떤'), 'milyen', koreanWithTranslation('어떤 음식을 좋아해요?', 'Milyen ételt szeretsz?')]]),
    examples: [['세종식당이 <b>어디</b>에 있어요?', 'Hol van a Szedzsong étterem?'], ['학교까지 <b>얼마나</b> 걸려요?', 'Mennyi idő az iskoláig?'], ['<b>왜</b> 한국어를 배워요?', 'Miért tanulsz koreaiul?', 'ㅜ+어 → ㅝ: 배우다 → 배워요'], ['<b>누가</b> 이 케이크를 만들었어요?', 'Ki sütötte ezt a tortát?']],
    ownNote: `<p>A ${korean('누구')} alanyként ${korean('누가')} lesz (nem ${korean('누구가')}). A ${korean('무엇')} beszédben ${korean('뭐')}; ${korean('무엇을 → 뭘')}, ${korean('무엇이 → 뭐가')}.</p>`,
  },
  {
    lesson: 5, point: 2, form: '(으)로 (방향)', name: 'irány („-felé, -ba/-be”)', conjugable: false,
    explanation: `<p>Főnév után azt a <b>helyet vagy irányt</b> jelöli, amerre haladunk: ${korean('오른쪽으로 가세요')} „menjen jobbra”.</p>
<p><b>받침</b> után: <b>으로</b>, magánhangzó után: <b>로</b>, <b>ㄹ-re végződő</b> főnév után is <b>로</b>: ${korean('지하철로')}.</p>`,
    table: { kind: 'noun', nouns: ['vowelEnding', 'consonantEnding', 'rieulEnding', { word: '왼쪽', description: 'mássalhangzóra végződik' }, { word: '위', description: 'magánhangzóra végződik' }], nounColumns: [{ header: '(으)로', conjugate: noun => nounWithParticle(noun, '으로', '로', true) }] },
    examples: [['쭉 가서 왼쪽<b>으로</b> 가세요.', 'Menjen egyenesen, aztán balra.'], ['이 버스는 시청<b>으로</b> 가요.', 'Ez a busz a városháza felé megy.'], ['이쪽<b>으로</b> 오세요.', 'Jöjjön erre.'], ['2층<b>으로</b> 올라가세요.', 'Menjen fel az első emeletre (2층).'],
      ['학교에 지하철<b>로</b> 가요.', 'Metróval megyek iskolába.', '＋ Saját: eszköz („-val/-vel”) · ㄹ után is 로'],
      ['우리는 오래전부터 친구<b>로</b> 지내요.', 'Régóta barátok vagyunk. (szó szerint: barátként élünk egymással)', '＋ Saját: szerep, minőség („-ként”)'],
      ['저는 그 사람을 좋은 친구<b>로</b> 생각해요.', 'Jó barátomnak tartom őt.', '＋ Saját: „valakinek / valaminek tart”'],
      ['제 어머니는 고등학교에서 선생님<b>으로</b> 일해요.', 'Édesanyám tanárként dolgozik egy gimnáziumban.', '＋ Saját: szerep, minőség („-ként”)']],
    ownNote: `<p>Az ${korean('에')} a célpontot jelöli (${korean('학교에 가요')}), a ${korean('(으)로')} az irányt vagy útvonalat (${korean('학교 쪽으로 가요')}).</p>
<p>A ${korean('(으)로')}-nak irányon kívül még két gyakori jelentése van (a fenti táblázat is ezeket mutatja a személyeknél és a 지하철-nál):</p>
<ul><li><b>eszköz, módszer</b> („-val/-vel, -ul/-ül”): ${korean('지하철로 가요')} „metróval megyek”, ${korean('버스로')} „busszal”, ${korean('한국어로 말해요')} „koreaiul beszélek”, ${korean('손으로 먹어요')} „kézzel eszem”;</li>
<li><b>szerep, minőség</b> („-ként, valaminek”), főleg személyekkel: ${korean('친구로 지내다')} „barátként érintkezni, barátok lenni”, ${korean('친구로 생각하다')} „barátjának tartja”, ${korean('선생님으로 일하다')} „tanárként dolgozik”. Ennek hivatalosabb, nyomatékosabb párja a ${korean('(으)로서')} (4A 11. lecke).</li></ul>
<p><b>Vigyázat:</b> személy <b>felé</b> mozgásnál nem ${korean('(으)로')} kell, hanem ${korean('에게/한테')} („hozzá”) vagy ${korean('N 쪽으로')} („felé”).</p>`,
    correctIncorrect: [[1, '친구한테 가요.', 'A barátomhoz megyek.'], [1, '친구 쪽으로 걸어가요.', 'A barátom felé sétálok.'], [0, '친구로 가요.', 'irányként rossz; így azt jelentené: „barátként megyek”']],
  },
  {
    lesson: 6, point: 1, form: '○에서 ○까지', name: '„-tól/-től … -ig” (helyek között)', conjugable: false,
    explanation: `<p>Két hely között az <b>indulási</b> (${korean('에서')}) és az <b>érkezési</b> (${korean('까지')}) pontot jelöli. Minden főnév után ugyanaz.</p>`,
    examples: [['집<b>에서</b> 학교<b>까지</b> 멀어요?', 'Messze van az iskola a lakásodtól?'], ['서울<b>에서</b> 부산<b>까지</b> 기차로 세 시간 걸려요.', 'Szöultól Puszanig vonattal három óra.'], ['여기<b>에서</b> 한국미술관<b>까지</b> 어떻게 가요?', 'Hogyan jutok el innen a Koreai Művészeti Múzeumig?'], ['명동<b>까지</b> 지하철로 가세요.', 'Menjen metróval Myeongdongig.']],
    ownNote: `<p><b>Időnél</b> a „-tól/-től” nem ${korean('에서')}, hanem ${korean('부터')}: ${korean('아홉 시부터 다섯 시까지')} „kilenctől ötig”. Az ${korean('에서부터')} a kiindulópont hangsúlyozása (2B 2. lecke).</p>`,
  },
  {
    lesson: 6, point: 2, form: '-아요/어요 (제안)', name: 'javaslat („… -junk!”)',
    explanation: `<p>A ${korean('-아요/어요')} végződés (1A 4. lecke) <b>javaslatként</b> is használható: „menjünk”, „együnk”. Alakja ugyanaz, csak a helyzet (és gyakran a ${korean('같이')} „együtt”) mutatja, hogy javaslatról van szó.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: 'Javaslat: -아요/어요', conjugate: word => '같이 ' + withAOrEo(word, '요') }] },
    examples: [['같이 <b>가요</b>.', 'Menjünk együtt.'], ['가: 뭐 먹을까요? 나: 비빔밥 <b>먹어요</b>.', '– Mit együnk? – Együnk bibimbapot.'], ['지하철로 <b>가요</b>. 버스는 너무 느려요.', 'Menjünk metróval, a busz túl lassú.'], ['우리 같이 음악을 <b>들어요</b>.', 'Hallgassunk együtt zenét.', 'ㄷ-rendhagyó: 듣다 → 들어요']],
    ownNote: `<p>A javaslat három szintje: kérdés ${korean('-(으)ㄹ까요?')} („menjünk?”), kijelentés ${korean('-아요/어요')} („menjünk!”), formális ${korean('-(으)ㅂ시다')} (${korean('갑시다')}, idősebbnek nem illik mondani). Barátok közt: ${korean('-자')} (3A 1. lecke).</p>`,
  },
  {
    lesson: 7, point: 1, form: '-(으)려고 하다', name: '„… akarok, szándékozom” (terv)',
    explanation: `<p>Ige után <b>tervet, szándékot</b> fejez ki: „azt tervezem, hogy …”.</p>
<p><b>받침</b> után: <b>-으려고 하다</b>, magánhangzó után: <b>-려고 하다</b>, <b>ㄹ-tő</b> után is <b>-려고 하다</b> (${korean('만들려고 해요')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)려고 해요', conjugate: word => withEu(word, '려고 해요') }, { header: 'Múlt: -(으)려고 했어요', conjugate: word => withEu(word, '려고 했어요') }] },
    examples: [['제주도에 가<b>려고 해요</b>.', 'Dzsedzsu-szigetre szeretnék menni.'], ['이번 방학에 한국 요리를 배우<b>려고 해요</b>.', 'Ebben a szünetben koreai főzést akarok tanulni.'], ['주말에 집에서 쉬<b>려고 해요</b>.', 'Hétvégén otthon akarok pihenni.'], ['아침마다 한국어 뉴스를 들<b>으려고 해요</b>.', 'Minden reggel koreai híreket akarok hallgatni.', 'ㄷ-rendhagyó: 듣다 → 들으려고']],
    ownNote: `<p>Múlt időben (${korean('-(으)려고 했어요')}) gyakran azt jelenti, hogy a terv <b>nem valósult meg</b>: ${korean('가려고 했어요. 그런데 못 갔어요')}. A ${korean('-(으)려고')} kötőszóként is áll: ${korean('살을 빼려고 운동해요')} „azért mozgok, hogy fogyjak”.</p>`,
  },
  {
    lesson: 7, point: 2, form: '-고 (나열)', name: '„és” (tagmondatok felsorolása)',
    explanation: `<p>Ige vagy melléknév után két vagy több <b>tényt sorol fel</b>: „X és Y”. A tő végétől függetlenül mindig ${korean('-고')}. Az első tagmondatba általában <b>nem tesszük</b> a múlt/jövő jelét, az időt a mondat vége adja. A két tagmondat sorrendje felcserélhető, és alanyuk különbözhet.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-고', conjugate: word => withPlainStem(word, '고') }] },
    examples: [['제주도는 바다가 아름답<b>고</b> 음식이 맛있어요.', 'Dzsedzsun gyönyörű a tenger és finomak az ételek.'], ['저는 영화를 보<b>고</b> 동생은 음악을 들어요.', 'Én filmet nézek, az öcsém pedig zenét hallgat.'], ['이 방은 넓<b>고</b> 밝아요.', 'Ez a szoba tágas és világos.'], ['날씨가 덥<b>고</b> 습해요.', 'Meleg és párás idő van.', '-고 előtt a ㅂ-rendhagyó nem változik: 덥고']],
    ownNote: `<p>Az ${korean('도')}-val kiemelhető, hogy mindkettőre igaz: ${korean('값도 싸고 맛도 있어요')} „olcsó is, finom is”. Egymás utáni cselekvésre is használható („…, aztán …”): ${korean('밥을 먹고 커피를 마셨어요')}. A 3A 4. leckében tanult ${korean('-고 나서')} ezt hangsúlyozza.</p>`,
  },
  {
    lesson: 8, point: 1, form: '-(으)ㄴ 후에', name: '„miután …”',
    explanation: `<p>Ige után azt fejezi ki, hogy az első cselekvés <b>időben megelőzi</b> a másodikat: „miután X, Y”.</p>
<p><b>받침</b> után: <b>-은 후에</b>, magánhangzó után: <b>-ㄴ 후에</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik: ${korean('만든 후에')}. A második tagmondat lehet múlt vagy jövő idejű is.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄴ 후에', conjugate: word => withEu(word, 'ㄴ 후에') }] },
    examples: [['수업이 끝<b>난 후에</b> 뭐 할 거예요?', 'Mit fogsz csinálni óra után?'], ['밥을 먹<b>은 후에</b> 산책했어요.', 'Evés után sétáltam.'], ['이 음악을 들<b>은 후에</b> 기분이 좋아졌어요.', 'Miután meghallgattam ezt a zenét, jobb kedvem lett.', 'ㄷ-rendhagyó: 듣다 → 들은 후에'], ['여행을 다녀<b>온 후에</b> 사진을 보여 줄게요.', 'Miután hazajöttem az utazásról, megmutatom a képeket.']],
    ownNote: `<p>Főnévvel: ${korean('N 후에')}: ${korean('수업 후에')}, ${korean('식사 후에')}. Rokon kifejezések: ${korean('-(으)ㄴ 다음에')}, ${korean('-고 나서')} (3A 4. lecke). Az ellentéte ${korean('-기 전에')} (1B 10. lecke).</p>
<p><b>Magyar fordítás:</b> rövid, tárgy nélküli cselekvésnél a főneves alak a természetes: ${korean('밥을 먹은 후에')} „evés után”, ${korean('공부한 후에')} „tanulás után”. Ha a cselekvésnek saját tárgya, alanya vagy részlete van, „miután” + ige kell: ${korean('저녁을 다 먹은 후에')} „miután megettem a vacsorát”, ${korean('친구가 도착한 후에')} „miután a barátom megérkezett”. Nem minden igének van jó főneves párja („menés után” ✗ → „miután elmentem”). A koreai forma mindig teljes tagmondat; a táblázat ezért mindkét fordítást mutatja, ahol van főneves alak.</p>`,
  },
  {
    lesson: 8, point: 2, form: '보다', name: '„-nál/-nél” (összehasonlítás)', conjugable: false,
    explanation: `<p>Főnév után azt jelöli, <b>amihez hasonlítunk</b>: ${korean('A보다 B가 커요')} „B nagyobb, mint A”. Gyakran a ${korean('더')} („jobban”) szóval együtt. A ${korean('보다')}-s főnév állhat elöl vagy hátrébb is.</p>`,
    examples: [['이번 여행이 지난번 여행<b>보다</b> 좋았어요.', 'Ez az utazás jobb volt, mint a múltkori.'], ['저는 커피<b>보다</b> 차를 더 좋아해요.', 'A teát jobban szeretem, mint a kávét.'], ['오늘이 어제<b>보다</b> 더 추워요.', 'Ma hidegebb van, mint tegnap.', 'ㅂ-rendhagyó: 춥다 → 추워요'], ['지하철이 버스<b>보다</b> 빨라요.', 'A metró gyorsabb a busznál.', '르-rendhagyó: 빠르다 → 빨라요']],
    ownNote: `<p>Felsőfok: ${korean('제일 / 가장')} + melléknév: ${korean('제일 좋아요')} „a legjobb”. Kérdés: ${korean('뭐가 더 좋아요?')} „Melyik jobb?”</p>`,
  },
  {
    lesson: 9, point: 1, form: '-지만', name: '„de, viszont”',
    explanation: `<p>Ige vagy melléknév után az előzővel <b>ellentétes</b> tartalmat vezet be: „X, de Y”. A tő végétől függetlenül ${korean('-지만')}; állhat előtte <b>múlt</b> (${korean('-았지만/었지만')}) és ${korean('-겠-')} is. A két alany különbözhet; a szembeállítást gyakran ${korean('은/는')} erősíti.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-지만', conjugate: word => withPlainStem(word, '지만') }, { header: 'Múlt: -았지만/었지만', conjugate: word => withPast(word, '지만') }] },
    examples: [['한국어는 어렵<b>지만</b> 재미있어요.', 'A koreai nehéz, de érdekes.', '-지만 előtt a ㅂ-rendhagyó nem változik: 어렵지만'], ['약을 먹었<b>지만</b> 아직 아파요.', 'Bevettem a gyógyszert, de még mindig fáj.'], ['형은 키가 크<b>지만</b> 저는 작아요.', 'A bátyám magas, én viszont alacsony vagyok.'], ['비싸<b>지만</b> 사고 싶어요.', 'Drága, de meg akarom venni.']],
  },
  {
    lesson: 9, point: 2, form: '-아야/어야 되다', name: '„kell, muszáj”',
    explanation: `<p>Ige vagy melléknév után azt fejezi ki, hogy valamit <b>meg kell tenni</b>, vagy valaminek valamilyennek <b>kell lennie</b>. A <b>-아/어</b> szabály szerint képezzük: ${korean('가야 돼요, 먹어야 돼요, 해야 돼요')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-아야/어야 돼요', conjugate: word => withAOrEo(word, '야 돼요') }] },
    examples: [['감기에 걸렸어요. 집에서 푹 쉬<b>어야 돼요</b>.', 'Megfáztam. Otthon alaposan pihennem kell.'], ['내일 일찍 일어나<b>야 돼요</b>.', 'Holnap korán kell kelnem.'], ['약을 먹<b>어야 돼요</b>?', 'Be kell vennem a gyógyszert?'], ['선생님 말씀을 잘 들<b>어야 돼요</b>.', 'Jól oda kell figyelni a tanár szavaira.', 'ㄷ-rendhagyó: 듣다 → 들어야']],
    ownNote: `<p>Ugyanezt jelenti a ${korean('-아야/어야 하다')} (${korean('가야 해요')}), ez kicsit írottabb. Tagadása nem „nem kell”, hanem ${korean('-지 않아도 되다')} vagy ${korean('안 -아도/어도 되다')} (2B 6. lecke): ${korean('안 가도 돼요')} „nem kell menni”.</p>`,
  },
  {
    lesson: 10, point: 1, form: '-기 전에', name: '„mielőtt …”',
    explanation: `<p>Ige után azt fejezi ki, hogy a második cselekvés az első <b>előtt</b> történik: „mielőtt X, Y”. A tő végétől függetlenül ${korean('-기 전에')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-기 전에', conjugate: word => withPlainStem(word, '기 전에') }] },
    examples: [['학교에 가<b>기 전에</b> 수영을 해요.', 'Iskola előtt úszom.'], ['자<b>기 전에</b> 책을 읽어요.', 'Lefekvés előtt olvasok.'], ['밥을 먹<b>기 전에</b> 손을 씻으세요.', 'Evés előtt mosson kezet.'], ['음식을 만들<b>기 전에</b> 재료를 샀어요.', 'Mielőtt elkészítettem az ételt, megvettem a hozzávalókat.'], ['음악을 듣<b>기 전에</b> 숙제를 끝냈어요.', 'Mielőtt zenét hallgattam volna, befejeztem a házit.', '-기 előtt nincs ㄷ-változás: 듣기 전에']],
    ownNote: `<p>Főnévvel: ${korean('N 전에')}: ${korean('수업 전에')}, ${korean('삼 년 전에')} „három évvel ezelőtt”. Az első tagmondat soha nem kap múlt időt: ${korean('가기 전에')}, nem ${korean('갔기 전에')}.</p>
<p><b>Magyar fordítás:</b> rövid cselekvésnél a főneves alak a természetes: ${korean('자기 전에')} „lefekvés előtt”, ${korean('먹기 전에')} „evés előtt”. Ha a cselekvésnek saját tárgya, alanya vagy részlete van, „mielőtt” + ige kell: ${korean('한국에 가기 전에')} „mielőtt Koreába megyek”.</p>`,
  },
  {
    lesson: 10, point: 2, form: '-아서/어서 (순서)', name: '„… és (ott/azzal) …” (egymásra épülő cselekvések)',
    explanation: `<p>Ige után azt fejezi ki, hogy a cselekvések <b>egymás után</b> történnek, és a második <b>szorosan az elsőre épül</b> (ugyanott, ugyanazzal a dologgal): ${korean('친구를 만나서 영화를 봤어요')} „találkoztam a barátommal, és (vele) megnéztük a filmet”.</p>
<p>Elé nem kerül ${korean('-았/었-')} vagy ${korean('-겠-')}. A két tagmondat <b>alanya azonos</b>, a másodikban általában elhagyjuk.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-아서/어서', conjugate: word => withAOrEo(word, '서') }] },
    examples: [['아침에 일어<b>나서</b> 세수를 해요.', 'Reggel felkelek és megmosakszom.'], ['도서관에 <b>가서</b> 공부했어요.', 'Elmentem a könyvtárba és (ott) tanultam.'], ['김밥을 <b>만들어서</b> 친구하고 먹었어요.', 'Kimbapot csináltam, és megettem a barátommal.'], ['친구를 <b>도와서</b> 같이 이사했어요.', 'Segítettem a barátomnak, és együtt költöztünk.', 'ㅂ-rendhagyó: 돕다 → 도와서']],
    ownNote: `<p><b>-아서/어서 vagy -고?</b> A ${korean('-고')} csak időrendet jelez, a cselekvések függetlenek: ${korean('밥을 먹고 학교에 가요')}. A ${korean('-아서/어서')} esetén a második az első eredményére épül: ${korean('학교에 가서 친구를 만나요')} (az iskolában találkozom vele). Mozgásigéknél (${korean('가다, 오다')}), ${korean('만나다')}, ${korean('만들다')}, ${korean('사다')} után jellemzően ${korean('-아서/어서')}; ${korean('입다, 타다')} után ${korean('-고')}: ${korean('코트를 입고 나갔어요')}.</p>`,
  },
  {
    lesson: 11, point: 1, form: '-(으)ㄹ 수 있다, 없다', name: '„tud(ok), képes / nem tud”',
    explanation: `<p>Ige után azt fejezi ki, hogy valamire <b>képesek vagyunk</b>, vagy valami <b>lehetséges</b>. A tagadás ${korean('-(으)ㄹ 수 없다')}.</p>
<p><b>받침</b> után: <b>-을 수 있다</b>, magánhangzó után: <b>-ㄹ 수 있다</b>, <b>ㄹ-tő</b>: <b>수 있다</b> (${korean('만들 수 있어요')}).</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ 수 있어요', conjugate: word => withEu(word, 'ㄹ 수 있어요') }, { header: '-(으)ㄹ 수 없어요', conjugate: word => withEu(word, 'ㄹ 수 없어요') }] },
    examples: [['한국 음식을 <b>만들 수 있어요</b>?', 'Tudsz koreai ételt főzni?'], ['저는 한국어로 이메일을 <b>쓸 수 있어요</b>.', 'Tudok koreaiul e-mailt írni.'], ['여기에서 사진을 찍<b>을 수 없어요</b>.', 'Itt nem lehet fényképezni.'], ['너무 무거워서 혼자 <b>들 수 없어요</b>.', 'Túl nehéz, nem tudom egyedül felemelni.', '들다 (emelni) ㄹ-tő: 들 수 – vö. 듣다 → 들을 수 (hallani)']],
    ownNote: `<p>Vigyázat a hasonló alakokra: ${korean('들다')} („emelni”, ㄹ-tő) → ${korean('들 수 있어요')}, de ${korean('듣다')} („hallani”, ㄷ-rendhagyó) → ${korean('들을 수 있어요')}. A ${korean('-(으)ㄹ 수 없다')} és a ${korean('못')} hasonló: ${korean('못 가요 ≈ 갈 수 없어요')}.</p>`,
  },
  {
    lesson: 11, point: 2, form: '-고 있다', name: 'folyamatban lévő cselekvés („éppen …”)',
    explanation: `<p>Ige után azt fejezi ki, hogy egy cselekvés <b>éppen folyamatban van</b>. A tő végétől függetlenül ${korean('-고 있다')}; a ${korean('있다')} ragozódik: ${korean('있어요, 있었어요')}.</p>`,
    table: { sampleSet: 'verbs', columns: [{ header: '-고 있어요', conjugate: word => withPlainStem(word, '고 있어요') }, { header: 'Múlt: -고 있었어요', conjugate: word => withPlainStem(word, '고 있었어요') }] },
    examples: [['지금 뭐 하<b>고 있어요</b>?', 'Mit csinálsz most?'], ['동생은 방에서 음악을 듣<b>고 있어요</b>.', 'Az öcsém a szobájában zenét hallgat.', '-고 előtt a ㄷ-rendhagyó nem változik: 듣고'], ['어제 전화했을 때 뭐 하<b>고 있었어요</b>?', 'Mit csináltál tegnap, amikor hívtalak?'], ['요즘 한국어를 배우<b>고 있어요</b>.', 'Mostanában koreait tanulok.']],
    honorific: {
      rows: [['-고 있다', 'éppen csinálja', '-고 계시다', 'éppen csinálja (tiszteleti)']],
      note: `<p>Ha egy <b>tisztelt személy</b> csinál éppen valamit, a ${korean('있다')} helyére ${korean('계시다')} kerül: ${korean('읽고 계세요')}, nem ${korean('읽고 있으세요')}. Ha az igének külön tiszteleti alakja van, az is megjelenik: ${korean('자다 → 주무시고 계세요')}.</p>`,
      examples: [['할머니께서 <b>주무시고 계세요</b>.', 'A nagymama (éppen) alszik.'], ['아버지께서 신문을 읽<b>고 계세요</b>.', 'Édesapám éppen újságot olvas.'], ['선생님께서 지금 회의하<b>고 계세요</b>.', 'A tanár úr éppen értekezleten van.']],
    },
    ownNote: `<p>A ${korean('입다, 신다, 쓰다')} (ruha) + ${korean('-고 있다')} állapotot is jelent: ${korean('안경을 쓰고 있어요')} „szemüveget visel”.</p>`,
  },
  {
    lesson: 12, point: 1, form: '에게, 한테', name: '„-nak/-nek” (kinek?)', conjugable: false,
    explanation: `<p>Személy (vagy állat) után azt jelöli, <b>akire a cselekvés irányul</b>: kinek adunk, kinek szólunk, kinek telefonálunk. A ${korean('한테')} beszélt nyelvi, az ${korean('에게')} kicsit írottabb. Minden főnév után ugyanaz.</p>`,
    examples: [['저는 지니 씨<b>에게</b> 펜을 선물할 거예요.', 'Tollat fogok ajándékozni Dzsininek.'], ['친구<b>한테</b> 전화했어요.', 'Felhívtam a barátomat.'], ['동생<b>에게</b> 이메일을 보냈어요.', 'E-mailt küldtem az öcsémnek.'], ['고양이<b>한테</b> 밥을 줬어요.', 'Megetettem a macskát.']],
    ownNote: `<p>Tárgyra, helyre (pl. intézményre) nem ${korean('에게')}, hanem ${korean('에')}: ${korean('꽃에 물을 줘요')}, ${korean('회사에 전화해요')}. Az ellenkező irány („-tól/-től”): ${korean('에게서 / 한테서')}.</p>`,
    correctIncorrect: [[1, '나무에 물을 줘요.', 'Meglocsolom a fát.'], [0, '나무에게 물을 줘요.', '']],
    honorific: {
      rows: [['에게 / 한테', '-nak/-nek', '께', '-nak/-nek (tiszteleti)'], ['주다', 'ad', '드리다', 'ad (tiszteleti)']],
      note: `<p>Tisztelt személynek (szülő, nagyszülő, tanár) a ${korean('에게/한테')} helyett ${korean('께')} jár, és ilyenkor az „ad” sem ${korean('주다')}, hanem ${korean('드리다')}. Részletesen a 2B 7. lecke tanítja.</p>`,
      examples: [['할머니<b>께</b> 선물을 드렸어요.', 'Ajándékot adtam a nagymamának.'], ['선생님<b>께</b> 전화했어요.', 'Felhívtam a tanár urat.'], ['부모님<b>께</b> 편지를 썼어요.', 'Levelet írtam a szüleimnek.']],
    },
  },
  {
    lesson: 12, point: 2, form: '-(으)니까 (이유)', name: '„mert …, (hát) …” (ok, főleg kérés előtt)',
    explanation: `<p>Ige vagy melléknév után az <b>okot</b> fejezi ki. A ${korean('-아서/어서')}-szal szemben utána állhat <b>felszólítás, javaslat</b> (${korean('-(으)세요, -(으)ㄹ까요?')}), és előtte <b>múlt idő</b> is.</p>
<p><b>받침</b> után: <b>-으니까</b>, magánhangzó után: <b>-니까</b>, <b>ㄹ-tőnél</b> az ㄹ kiesik: ${korean('사니까, 머니까')}.</p>`,
    table: { sampleSet: 'verbsAndAdjectives', columns: [{ header: '-(으)니까', conjugate: word => withEu(word, '니까') }, { header: 'Múlt: -았으니까/었으니까', conjugate: word => withPast(word, '으니까') }] },
    examples: [['비가 오<b>니까</b> 우산을 가져가세요.', 'Esik az eső, vigyél esernyőt.'], ['지니 씨가 그림을 좋아하<b>니까</b> 그림책을 선물할 거예요.', 'Dzsini szereti a képeket, ezért képeskönyvet fogok neki adni.'], ['오늘은 날씨가 <b>더우니까</b> 집에 있어요.', 'Ma meleg van, maradjunk itthon.', 'ㅂ-rendhagyó: 덥다 → 더우니까'], ['어제 많이 걸<b>었으니까</b> 오늘은 쉴까요?', 'Tegnap sokat gyalogoltunk, pihenjünk ma?']],
    correctIncorrect: [[1, '시간이 없으니까 택시를 탑시다.', 'Nincs időnk, fogjunk taxit.'], [0, '시간이 없어서 택시를 탑시다.', 'javaslat előtt nem állhat -아서']],
    ownNote: `<p>Köszönésben, bocsánatkérésben viszont a ${korean('-아서/어서')} a természetes: ${korean('늦어서 죄송합니다')} (nem ${korean('늦었으니까')}). A 2B 7. lecke a ${korean('-(으)니까')} másik jelentését tanítja: „amikor …, rájöttem, hogy…” (felfedezés).</p>`,
  },
];
export default {
  lessons: {
    1: { korean: '무슨 음식을 좋아해요?', hungarian: 'Milyen ételeket szeretsz?' },
    2: { korean: '도서관에 책을 빌리러 가요', hungarian: 'Könyvtárba megyek könyvet kölcsönözni.', pronunciation: '격음화', pronunciationHungarian: 'hehezetesedés (ㅎ + ㄱ/ㄷ/ㅈ/ㅂ → ㅋ/ㅌ/ㅊ/ㅍ)' },
    3: { korean: '백화점에서 쇼핑할 거예요', hungarian: 'Az áruházban fogok vásárolni.' },
    4: { korean: '더 큰 사이즈는 없어요?', hungarian: 'Nincs nagyobb méret?', pronunciation: '비음화', pronunciationHungarian: 'orrhangúsodás (합니다 [함니다])' },
    5: { korean: '세종식당이 어디에 있어요?', hungarian: 'Hol van a Szedzsong étterem?' },
    6: { korean: '한국미술관까지 어떻게 가요?', hungarian: 'Hogyan jutok el a Koreai Művészeti Múzeumig?', pronunciation: '경음화', pronunciationHungarian: 'keményedés (세종학당 [세종학땅])' },
    7: { korean: '제주도에 가려고 해요', hungarian: 'Dzsedzsu-szigetre akarok menni.' },
    8: { korean: '지난번 여행보다 좋았어요', hungarian: 'Jobb volt, mint a múltkori utazás.', pronunciation: '겹받침 ㄶ', pronunciationHungarian: 'kettős 받침 ㄶ (괜찮아요 [괜차나요])' },
    9: { korean: '집에서 푹 쉬어야 돼요', hungarian: 'Otthon alaposan ki kell pihenned magad.' },
    10: { korean: '학교에 가기 전에 수영을 해요', hungarian: 'Iskola előtt úszom.', pronunciation: '겹받침 ㄼ', pronunciationHungarian: 'kettős 받침 ㄼ (여덟 [여덜], 넓어요 [널버요])' },
    11: { korean: '한국 음식을 만들 수 있어요?', hungarian: 'Tudsz koreai ételt főzni?' },
    12: { korean: '저는 지니 씨에게 펜을 선물할 거예요', hungarian: 'Tollat fogok ajándékozni Dzsininek.', pronunciation: '격음화', pronunciationHungarian: 'hehezetesedés' },
  },
  points: points.map(point => Object.assign({ studentBookPage: studentBookPageOf(point.lesson, point.point), vocabularyGrammarPage: vocabularyGrammarPageOf(point.lesson, point.point) }, point)),
} satisfies BookData;
