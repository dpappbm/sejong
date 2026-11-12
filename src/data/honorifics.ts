import type { HonorificsData } from './types';

export default {
  intro: `<p>A koreai a tiszteletet a <b>-(으)시-</b> végződésen túl <b>külön szavakkal</b> is kifejezi. Ez a gyűjtemény ezeket a párokat veszi sorra:</p>
<ul><li><b>tiszteleti szó</b> a tisztelt személyre és arra, amit ő tesz: ${'<span class="korean">자다 → 주무시다, 집 → 댁</span>'};</li>
<li><b>szerény alak</b> magunkra és arra, amit mi teszünk a tisztelt személy felé: ${'<span class="korean">주다 → 드리다, 나 → 저</span>'};</li>
<li><b>megszólítás</b>: kinek mit mondunk a „te/Ön” helyett.</li></ul>
<p>A „Leckék” oszlop linkjei arra a nyelvtani pontra visznek, ahol a könyv az alakot tanítja.</p>`,
  categories: [
    {
      hungarian: 'Partikulák', korean: '조사',
      rows: [
        { base: ['이/가', 'alanyjelölő'], honorific: ['께서', 'alanyjelölő (tiszteleti)'], example: ['할아버지께서 신문을 읽으세요.', 'A nagyapa újságot olvas.'], references: ['1A-02-1', '2B-03-1'] },
        { base: ['은/는', 'témajelölő'], honorific: ['께서는', 'témajelölő (tiszteleti)'], example: ['어머니께서는 요리사세요.', 'Édesanyám szakács.'], references: ['1A-01-2'] },
        { base: ['에게/한테', '„-nak/-nek” (kinek?)'], honorific: ['께', '„-nak/-nek” (tiszteleti)'], example: ['선생님께 꽃을 드렸어요.', 'Virágot adtam a tanárnak.'], references: ['1B-12-1', '2B-07-1'] },
        { base: ['에게서/한테서', '„-tól/-től” (kitől?)'], honorific: ['께', '„-tól/-től” (tiszteleti)'], example: ['선생님께 한국어를 배웠어요.', 'A tanártól tanultam koreaiul.'], references: ['2B-07-1'] },
        { base: ['에게만/에게도', '„csak neki” / „neki is”'], honorific: ['께만/께도', '„csak neki” / „neki is” (tiszteleti)'], example: ['할머니께도 전화를 드렸어요.', 'A nagymamát is felhívtam.'], references: ['2B-03-2'] },
      ],
    },
    {
      hungarian: 'Főnevek', korean: '명사',
      rows: [
        { base: ['사람', 'ember'], honorific: ['분', 'személy (tiszteleti: úr, hölgy); fő'], example: ['저분이 누구세요?', 'Ki az az úr (hölgy)?'], references: [] },
        { base: ['이름', 'név'], honorific: ['성함', 'név (tiszteleti)'], example: ['성함이 어떻게 되세요?', 'Hogy hívják? (Mi a neve?)'], references: ['2B-03-1'] },
        { base: ['나이', 'életkor'], honorific: ['연세', 'életkor (tiszteleti)'], example: ['할머니께서는 연세가 어떻게 되세요?', 'Hány éves a nagymamája?'], references: ['2B-03-1'] },
        { base: ['집', 'ház, otthon'], honorific: ['댁', 'ház, otthon (tiszteleti)'], example: ['선생님 댁이 어디세요?', 'Hol lakik, tanár úr?'], references: ['2B-03-1'] },
        { base: ['밥', 'étel, étkezés (főtt rizs)'], honorific: ['진지', 'étel, étkezés (tiszteleti)'], example: ['할아버지, 진지 드세요.', 'Nagyapa, tessék enni!'], references: ['2B-03-1'] },
        { base: ['말', 'szó, beszéd'], honorific: ['말씀', 'szó, amit (a tisztelt személy) mond'], example: ['선생님 말씀을 잘 들으세요.', 'Figyeljetek arra, amit a tanár mond.'], references: ['2B-03-1'] },
        { base: ['생일', 'születésnap'], honorific: ['생신', 'születésnap (tiszteleti)'], example: ['내일이 아버지 생신이에요.', 'Holnap lesz édesapám születésnapja.'], references: [] },
        { base: ['아들 / 딸', 'fiú / lány (gyermek)'], honorific: ['아드님 / 따님', '(valakinek a) fia / lánya (tiszteleti)'], example: ['따님이 정말 예쁘네요.', 'Nagyon szép a lánya!'], references: [] },
      ],
    },
    {
      hungarian: 'Igék és melléknevek', korean: '동사·형용사',
      rows: [
        { base: ['있다 (hely)', 'ott van, tartózkodik'], honorific: ['계시다', 'ott van, tartózkodik (tiszteleti)'], example: ['사장님은 지금 사무실에 계세요.', 'Az igazgató úr most az irodában van.'], references: ['1A-03-2', '1B-11-2', '2B-03-1'] },
        { base: ['없다 (hely)', 'nincs ott'], honorific: ['안 계시다', 'nincs ott (tiszteleti)'], example: ['아버지는 지금 집에 안 계세요.', 'Édesapám most nincs otthon.'], references: ['1A-03-2'] },
        { base: ['있다 (birtoklás)', 'van neki'], honorific: ['있으시다', 'van neki (tiszteleti; itt nem 계시다!)'], example: ['내일 시간 있으세요?', 'Holnap van ideje?'], references: ['1A-03-2'] },
        { base: ['자다', 'alszik'], honorific: ['주무시다', 'alszik (tiszteleti)'], example: ['안녕히 주무세요.', 'Jó éjszakát! (Aludjon jól!)'], references: ['1B-11-2', '2B-03-1'] },
        { base: ['먹다 / 마시다', 'eszik / iszik'], honorific: ['드시다', 'eszik, iszik (tiszteleti)'], example: ['맛있게 드세요.', 'Jó étvágyat!'], references: ['2B-03-1'] },
        { base: ['말하다', 'mond, beszél'], honorific: ['말씀하시다', 'mond, beszél (tiszteleti)'], example: ['천천히 말씀해 주세요.', 'Kérem, mondja lassabban.'], references: ['1A-06-2', '2B-03-1'] },
        { base: ['아프다', 'beteg, fáj'], honorific: ['편찮으시다', 'beteg (tiszteleti)'], example: ['할머니께서 요즘 편찮으세요.', 'A nagymama mostanában beteg.'], references: ['2B-03-1'] },
        { base: ['죽다', 'meghal'], honorific: ['돌아가시다', 'elhunyt, meghalt (tiszteleti)'], example: ['할아버지께서 작년에 돌아가셨어요.', 'A nagyapám tavaly elhunyt.'], references: [] },
      ],
      note: `<p>A többi igénél és melléknévnél elég a szabályos <span class="korean">-(으)시-</span>: <span class="korean">가다 → 가세요, 읽다 → 읽으세요</span> ([[2B-03-1]]).</p>`,
    },
    {
      hungarian: 'Szerény alakok', korean: '겸양 표현',
      intro: `<p>Ezekkel <b>magunkat</b> tesszük „kisebbé”: amikor mi teszünk valamit egy tisztelt személyért vagy felé. Magunkra soha nem használunk tiszteleti szót.</p>`,
      rows: [
        { base: ['나 / 우리', 'én / mi'], honorific: ['저 / 저희', 'én / mi (szerény)'], example: ['저희 집에 한번 놀러 오세요.', 'Jöjjön el egyszer hozzánk!'], references: [] },
        { base: ['주다', 'ad'], honorific: ['드리다', 'ad (tisztelt személynek)'], example: ['어머니께 선물을 드렸어요.', 'Ajándékot adtam édesanyámnak.'], references: ['1B-12-1', '2B-03-2'] },
        { base: ['-아/어 주다', 'megteszi valakinek'], honorific: ['-아/어 드리다', 'megteszi (tisztelt személynek)'], example: ['할머니 가방을 들어 드렸어요.', 'Vittem a nagymama táskáját.'], references: ['2B-04-2', '3B-01-2'] },
        { base: ['말하다', 'mond, szól'], honorific: ['말씀드리다', 'elmond, szól (tisztelt személynek)'], example: ['제가 선생님께 말씀드릴게요.', 'Majd én szólok a tanár úrnak.'], references: ['2B-03-2'] },
        { base: ['묻다', 'kérdez'], honorific: ['여쭙다 / 여쭈다', 'megkérdez (tisztelt személyt)'], example: ['선생님께 여쭤볼게요.', 'Megkérdezem a tanár urat.'], references: [] },
        { base: ['보다 / 만나다', 'lát / találkozik'], honorific: ['뵙다 / 뵈다', 'lát, találkozik (tisztelt személlyel)'], example: ['처음 뵙겠습니다.', 'Örvendek! (szó szerint: először látom Önt)'], references: ['1B-04-2'] },
        { base: ['데리고 가다', 'magával visz (valakit)'], honorific: ['모시고 가다', 'elkísér, elvisz (tisztelt személyt)'], example: ['할머니를 모시고 병원에 갔어요.', 'Elkísértem a nagymamát a kórházba.'], references: [] },
      ],
      note: `<p>A <span class="korean">저희</span> („mi”) csak akkor áll, ha a megszólított nem tartozik bele; ha ő is a „mi” része, <span class="korean">우리</span> marad.</p>`,
    },
    {
      hungarian: 'Megszólítás', korean: '호칭',
      rows: [
        { base: ['씨', 'név után: egyenrangúnak (마크 씨)'], honorific: ['님', 'cím, beosztás után (선생님, 사장님, 부장님)'], example: ['김 선생님, 안녕하세요?', 'Jó napot, Kim tanár úr!'], references: [] },
        { base: ['부모', 'szülők'], honorific: ['부모님', 'szülők (tiszteleti)'], example: ['부모님께서는 잘 지내세요?', 'Jól vannak a szülei?'], references: [] },
        { base: ['아버지 / 어머니', 'apa / anya'], honorific: ['아버님 / 어머님', '(valakinek az) édesapja / édesanyja; após / anyós'], example: ['어머님께서 요리를 정말 잘하세요.', 'Az édesanyja nagyon jól főz.'], references: [] },
        { base: null, honorific: ['여러분', 'mindnyájan; kedves mindenki (megszólítás)'], example: ['여러분, 안녕하세요?', 'Jó napot mindenkinek!'], references: [] },
        { base: ['손님', 'vendég, vásárló'], honorific: ['고객님', 'ügyfél (tisztelt megszólítás)'], example: ['고객님, 무엇을 도와 드릴까요?', 'Miben segíthetek? (ügyfélnek)'], references: [] },
        { base: ['너', 'te (tegező)'], honorific: ['név + 씨/님, cím', 'a „te/Ön” helyett a megszólított neve vagy címe áll, vagy elmarad'], example: ['마크 씨는 어디에 살아요?', 'Ön hol lakik, Mark?'], references: [] },
        { base: null, honorific: ['당신', '⚠ „Ön/maga”: csak házastársak között („drágám”), írásban, dalban, reklámban; szemtől szemben idegennek sértő'], example: ['여보, 당신도 커피 마실래요?', 'Drágám, te is kérsz kávét? (házastársak között)'], references: [] },
      ],
      note: `<p>Koreaiul nincs olyan „Ön”, amit bárkinek mondhatunk. Udvariasan a megszólított <b>címét vagy nevét</b> ismételjük, vagy egyszerűen elhagyjuk a „te/Ön”-t.</p>`,
      correctIncorrect: [{ correct: '선생님, 이거 선생님 가방이세요?', translation: 'Tanár úr, ez az Ön táskája?' }, { incorrect: '당신 가방이에요?', reason: 'idegennek, tanárnak sértő' }],
    },
  ],
} satisfies HonorificsData;
