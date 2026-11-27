import {
  bold,
  korean,
  koreanGlossedInRow,
  koreanWithTranslation,
  list,
  paragraph,
  reference,
  simpleTable,
  text,
} from '../../lib/richText';
import {
  modifierForm,
  withAOrEo,
  withPast,
  withEu,
  withPlainStem,
  formalEnding,
  nounWithParticle,
  type Word,
} from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';
const withAdverbBeforeVerb = (word: Word, adverb: string) =>
  word.wordClass === 'verb' && word.stem.endsWith('하') && word.stem.length > 1
    ? word.stem.slice(0, -1) + ` ${adverb} 해요`
    : `${adverb} ` + withAOrEo(word, '요');
const vocabularyGrammarPageOf = (lesson: number, point: number) => 26 + 2 * (lesson - 1) + (point - 1),
  studentBookPageOf = (lesson: number, point: number) => 16 + 8 * (lesson - 1) + (point - 1);

const points: PointSource[] = [
  {
    lesson: 1,
    point: 1,
    form: '무슨',
    name: '„milyen, miféle?” (főnév előtt)',
    conjugable: false,
    explanation: [
      paragraph`Mindig ${bold('főnév előtt')} áll, és a főnévre ${bold('pontosabban')} kérdez rá: milyen fajta, milyen típusú.`,
    ],
    examples: [
      [text`${bold('무슨')} 음식을 좋아해요?`, 'Milyen ételeket szeretsz?'],
      [text`${bold('무슨')} 영화를 봤어요?`, 'Milyen filmet néztél?'],
      [text`오늘이 ${bold('무슨')} 요일이에요?`, 'Milyen nap van ma?'],
      [text`${bold('무슨')} 일이에요?`, 'Mi történt? / Miről van szó?'],
    ],
    ownNote: [
      paragraph`${bold('무슨 – 어떤 – 어느:')} a ${korean('무슨')} a fajtára kérdez („milyen fajta?”), az ${korean('어떤')} inkább a tulajdonságra („milyen?”, ${korean('어떤 사람이에요?')} „Milyen ember?”), az ${korean('어느')} adott lehetőségek közül választ („melyik?”, ${korean('어느 나라 사람이에요?')}).`,
    ],
  },
  {
    lesson: 1,
    point: 2,
    form: '못',
    name: '„nem tud(ja megtenni)” (képtelenség)',
    explanation: [
      paragraph`Ige ${bold('elé')} téve azt jelenti, hogy valami ${bold('nem sikerül, nem lehetséges')}: képesség hiánya vagy külső ok miatt. ${bold('Főnév + 하다')} igéknél a ${korean('못')} a ${korean('하다')} elé kerül: ${korean('수영 못 해요')}.`,
    ],
    table: {
      additionalWords: [
        '가다',
        '공부하다',
        '먹다',
        '수영하다',
        '치다',
        '요리하다',
        '타다',
        '운동하다',
        '만나다',
        '이야기하다',
      ],
      sampleSet: 'verbs',
      columns: [{ header: '못 + -아요/어요', conjugate: word => withAdverbBeforeVerb(word, '못') }],
    },
    examples: [
      [text`저는 매운 음식을 ${bold('못')} 먹어요.`, 'Nem tudok csípőset enni.'],
      [text`수영 ${bold('못')} 해요.`, 'Nem tudok úszni.'],
      [
        text`어제 바빠서 숙제를 ${bold('못')} 했어요.`,
        'Tegnap elfoglalt voltam, ezért nem tudtam megcsinálni a házit.',
      ],
      [
        text`시끄러워서 음악을 ${bold('못')} 들어요.`,
        'Olyan zaj van, hogy nem tudok zenét hallgatni.',
        'ㄷ-rendhagyó: 듣다 → 들어요',
      ],
    ],
    ownNote: [
      paragraph`${bold('안 vagy 못?')} ${korean('안 가요')} = „nem megyek” (nem akarok, döntés); ${korean('못 가요')} = „nem tudok menni” (nem rajtam múlik). A ${korean('못')} melléknév előtt nem állhat. Kiejtésben összeolvad: ${korean('못 해요')} [모태요], ${korean('못 먹어요')} [몬머거요]. Hosszú alakja: ${korean('-지 못하다')} (${reference('2A-05-2')}).`,
    ],
  },
  {
    lesson: 2,
    point: 1,
    form: '-(으)러 가다',
    name: '„megy, hogy …” (a mozgás célja)',
    explanation: [
      paragraph`Ige után megmondja, ${bold('milyen céllal megyünk')} valahová. Csak mozgást jelentő igékkel áll: ${korean('가다, 오다, 다니다')}.`,
      paragraph`${bold('받침')} után: ${bold('-으러')}, magánhangzó után: ${bold('-러')}, ${bold('ㄹ-tő')} után is ${bold('-러')} (${korean('놀다 → 놀러')}).`,
    ],
    table: {
      additionalWords: ['먹다', '보다', '씻다', '사다', '찍다', '만나다', '찾다', '운동하다', '듣다', '놀다'],
      sampleSet: 'verbs',
      columns: [{ header: '-(으)러 가요', conjugate: word => withEu(word, '러 가요') }],
    },
    examples: [
      [text`도서관에 책을 빌리${bold('러 가요')}.`, 'Könyvtárba megyek könyvet kölcsönözni.'],
      [text`친구 집에 놀${bold('러 가요')}.`, 'Átmegyek a barátomhoz játszani/lógni.'],
      [text`점심 먹${bold('으러 갈까요')}?`, 'Elmenjünk ebédelni?'],
      [
        text`동생이 이사해서 도우${bold('러 왔어요')}.`,
        'Az öcsém költözött, eljöttem segíteni.',
        'ㅂ-rendhagyó: 돕다 → 도우러',
      ],
    ],
    correctIncorrect: [
      { correct: '한국어를 배우러 세종학당에 다녀요.', translation: 'Szedzsong Intézetbe járok koreait tanulni.' },
      { incorrect: '한국어를 배우러 공부해요.', reason: 'a -(으)러 után mozgást jelentő ige kell' },
    ],
  },
  {
    lesson: 2,
    point: 2,
    form: '도',
    name: '„is”',
    conjugable: false,
    explanation: [
      paragraph`Főnév vagy más partikula után: „is”, azaz a már említett dolog mellé még valami ${bold('hozzájön')}. Alany és tárgy után ${bold('helyettesíti')} a ${korean('은/는, 이/가, 을/를')} partikulát. Az ${korean('에')} és ${korean('에서')} után megmarad előtte: ${korean('에도, 에서도')}.`,
    ],
    examples: [
      [text`저${bold('도')} 학생이에요.`, 'Én is diák vagyok.'],
      [text`사과를 샀어요. 바나나${bold('도')} 샀어요.`, 'Almát vettem. Banánt is vettem.'],
      [text`주말에${bold('도')} 일해요.`, 'Hétvégén is dolgozom.'],
      [text`도서관에서${bold('도')} 공부하고 집에서${bold('도')} 공부해요.`, 'A könyvtárban is tanulok, és otthon is.'],
    ],
    correctIncorrect: [
      { correct: '저도 가요.', translation: 'Én is megyek.' },
      { incorrect: '저는도 가요.', reason: 'a 도 az 은/는 helyére lép, nem mellé: 저도' },
      { correct: '서울에도 가요.', translation: 'Szöulba is megyek.' },
    ],
  },
  {
    lesson: 3,
    point: 1,
    form: '-아서/어서 (이유)',
    name: '„mert …, ezért …” (ok)',
    explanation: [
      paragraph`Ige vagy melléknév után az ${bold('okot')} fejezi ki: „X, ezért Y”. A ${bold('-아/어')} szabály szerint képezzük (ㅏ, ㅗ → -아서, egyéb → -어서, 하다 → 해서).`,
      paragraph`Megkötések: elé ${bold('nem kerülhet múlt')} (-았/었-) és ${korean('-겠-')} (az időt a mondat vége adja), és utána ${bold('nem állhat felszólítás vagy javaslat')}.`,
    ],
    table: {
      additionalWords: [
        '가다',
        '먹다',
        '공부하다',
        '오다',
        '신다',
        '운동하다',
        '작다',
        '쉽다',
        '따뜻하다',
        '좋다',
        '예쁘다',
        '시원하다',
      ],
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-아서/어서', conjugate: word => withAOrEo(word, '서') }],
    },
    examples: [
      [
        text`배가 고${bold('파서')} 빵을 먹었어요.`,
        'Éhes voltam, ezért ettem egy kis kenyeret.',
        '으-kiesés: 고프다 → 고파서',
      ],
      [text`옷이 너무 ${bold('커서')} 바꾸고 싶어요.`, 'A ruha túl nagy, ezért szeretném kicserélni.'],
      [
        text`날씨가 ${bold('추워서')} 집에 있었어요.`,
        'Hideg volt, ezért otthon maradtam.',
        'ㅂ-rendhagyó: 춥다 → 추워서',
      ],
      [text`오늘은 일이 많${bold('아서')} 바빠요.`, 'Ma sok a munka, ezért elfoglalt vagyok.'],
    ],
    correctIncorrect: [
      { correct: '어제 아파서 학교에 못 갔어요.', translation: 'Tegnap beteg voltam, ezért nem mentem iskolába.' },
      { incorrect: '어제 아팠어서 학교에 못 갔어요.', reason: 'múlt idő nem kerülhet a -아서 elé' },
      {
        incorrect: '비가 와서 우산을 가져가세요.',
        reason: text`felszólítás előtt -(으)니까 kell (${reference('1B-12-2')})`,
        correction: { correct: '비가 오니까 우산을 가져가세요.', translation: 'Esik az eső, vigyél esernyőt.' },
      },
    ],
    ownNote: [
      paragraph`Főnévvel: ${korean('-이라서 / 라서')} (vagy ${korean('-이어서 / 여서')}): ${korean('휴가라서 여행을 가요')}. Gyakori rövid válasz: ${korean('왜요? – 바빠서요.')} „Miért? – Mert elfoglalt vagyok.”`,
    ],
  },
  {
    lesson: 3,
    point: 2,
    form: '-(으)ㄹ 거예요',
    name: 'jövő idő, terv („… fogok”)',
    explanation: [
      paragraph`Ige után ${bold('jövőbeli cselekvést, tervet')} fejez ki.`,
      paragraph`${bold('받침')} után: ${bold('-을 거예요')}, magánhangzó után: ${bold('-ㄹ 거예요')}, ${bold('ㄹ-tő')}: ${bold('거예요')} (${korean('만들다 → 만들 거예요')}).`,
    ],
    table: {
      additionalWords: ['먹다', '가다', '신다', '보다', '읽다', '공부하다', '듣다', '만들다'],
      sampleSet: 'verbs',
      columns: [
        { header: '-(으)ㄹ 거예요', conjugate: word => withEu(word, 'ㄹ 거예요') },
        { header: 'Kérdés', conjugate: word => withEu(word, 'ㄹ 거예요?') },
      ],
    },
    examples: [
      [text`주말에 백화점에서 쇼핑${bold('할 거예요')}.`, 'Hétvégén az áruházban fogok vásárolni.'],
      [text`내일 뭐 ${bold('할 거예요')}?`, 'Mit fogsz csinálni holnap?'],
      [text`저녁에 불고기를 ${bold('만들 거예요')}.`, 'Este bulgogit fogok főzni.'],
      [
        text`방학에 한국 노래를 많이 들${bold('을 거예요')}.`,
        'A szünetben sok koreai dalt fogok hallgatni.',
        'ㄷ-rendhagyó: 듣다 → 들을 거예요',
      ],
    ],
    ownNote: [
      paragraph`Melléknévvel (és harmadik személyről) ${bold('feltételezést')} fejez ki: ${korean('내일은 더울 거예요')} „holnap valószínűleg meleg lesz”. A ${korean('거예요')} a ${korean('것이에요')} rövidült alakja; formálisan ${korean('-(으)ㄹ 겁니다')}.`,
    ],
  },
  {
    lesson: 4,
    point: 1,
    form: '-(으)ㄴ (형용사)',
    name: 'melléknév jelzői alakja („nagy táska”)',
    explanation: [
      paragraph`Melléknév után áll, ha a melléknév egy ${bold('főnevet jelöl')}: ${korean('큰 가방')} „nagy táska”.`,
      paragraph`${bold('받침')} után: ${bold('-은')}, magánhangzó után: ${bold('-ㄴ')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik, és ${bold('-ㄴ')} jön: ${korean('길다 → 긴')}.`,
    ],
    table: {
      additionalWords: ['낮다', '싸다', '넓다', '크다', '작다', '비싸다', '맵다', '편하다', '맛있다', '길다'],
      sampleSet: 'adjectives',
      columns: [{ header: '-(으)ㄴ (+ főnév)', conjugate: word => modifierForm(word, 'present') }],
    },
    examples: [
      [text`더 ${bold('큰')} 사이즈는 없어요?`, 'Nincs nagyobb méret?'],
      [text`${bold('작은')} 가방을 사고 싶어요.`, 'Egy kis táskát szeretnék venni.'],
      [text`${bold('매운')} 음식을 좋아해요?`, 'Szereted a csípős ételeket?', 'ㅂ-rendhagyó: 맵다 → 매운'],
      [text`${bold('긴')} 치마가 예뻐요.`, 'A hosszú szoknya szép.', 'ㄹ-tő: 길다 → 긴'],
    ],
    ownNote: [
      paragraph`A ${korean('있다/없다')} és összetételeik (${korean('맛있다, 재미있다, 멋있다')}) jelzői alakja ${bold('-는')}: ${korean('맛있는 음식')}, ${korean('재미없는 영화')}. A ㅎ-rendhagyóknál a ㅎ kiesik: ${korean('빨갛다 → 빨간')} (${reference('2A-10-1')}).`,
    ],
    correctIncorrect: [
      { correct: '맛있는 빵', translation: 'finom kenyér' },
      { incorrect: '맛있은 빵', reason: 'az 있다/없다 végű szavak jelzői alakja -는: 맛있는' },
    ],
  },
  {
    lesson: 4,
    point: 2,
    form: '-습니다/ㅂ니다, -습니까?/ㅂ니까?',
    name: 'formális (hivatalos) stílus',
    explanation: [
      paragraph`A legformálisabb beszédszint (격식체): hírekben, előadáson, ügyfélszolgálaton, katonaságnál, hivatalos helyzetben. Kijelentés: ${korean('-습니다/ㅂ니다')}, kérdés: ${korean('-습니까?/ㅂ니까?')}`,
      paragraph`${bold('받침')} után: ${bold('-습니다')}, magánhangzó után: ${bold('-ㅂ니다')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik: ${korean('만들다 → 만듭니다')}. Főnévvel: ${korean('학생입니다')}.`,
    ],
    table: {
      additionalWords: ['듣다', '가다', '먹다', '만나다', '읽다', '공부하다', '낮다', '크다', '짧다', '길다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Kijelentés', conjugate: word => formalEnding(word) },
        { header: 'Kérdés', conjugate: word => formalEnding(word, true) },
      ],
    },
    examples: [
      [text`처음 뵙겠${bold('습니다')}. 저는 마크${bold('입니다')}.`, 'Örvendek. Mark vagyok.'],
      [text`이 가방은 얼마${bold('입니까')}?`, 'Mennyibe kerül ez a táska?'],
      [text`이 식당은 음식이 아주 맛있${bold('습니다')}.`, 'Ebben az étteremben nagyon finom az étel.'],
      [text`저는 서울에 ${bold('삽니다')}.`, 'Szöulban élek.', 'ㄹ-tő: 살다 → 삽니다'],
    ],
    ownNote: [
      paragraph`A rendhagyó szavak itt ${bold('szabályosak')}, mert a végződés mássalhangzóval kezdődik: ${korean('덥습니다, 듣습니다, 짓습니다')}. Múlt idő: ${korean('-았습니다/었습니다')} (${korean('갔습니다')}).`,
    ],
  },
  {
    lesson: 5,
    point: 1,
    form: '의문사',
    name: 'kérdőszavak',
    conjugable: false,
    explanation: [
      paragraph`A kérdőszavak azt jelölik, amire kíváncsiak vagyunk. A kérdőszó a mondatban oda kerül, ahol a válaszban az új információ áll.`,
    ],
    customContent: [
      simpleTable(
        ['Kérdőszó', 'Jelentés', 'Példa'],
        [
          [
            koreanGlossedInRow('누구 (누가)'),
            'ki',
            koreanWithTranslation('누구예요? · 누가 왔어요?', 'Ki ez? · Ki jött?'),
          ],
          [koreanGlossedInRow('어디'), 'hol, hová', koreanWithTranslation('어디에 가요?', 'Hová mész?')],
          [koreanGlossedInRow('무엇 (뭐)'), 'mi', koreanWithTranslation('뭐 먹어요?', 'Mit eszel?')],
          [koreanGlossedInRow('언제'), 'mikor', koreanWithTranslation('언제 와요?', 'Mikor jössz?')],
          [koreanGlossedInRow('얼마'), 'mennyi (ár)', koreanWithTranslation('얼마예요?', 'Mennyibe kerül?')],
          [
            koreanGlossedInRow('얼마나'),
            'mennyi ideig, mennyire',
            koreanWithTranslation('얼마나 걸려요?', 'Mennyi ideig tart?'),
          ],
          [
            koreanGlossedInRow('어떻게'),
            'hogyan',
            koreanWithTranslation('어떻게 가요?', 'Hogyan jutok oda? / Hogyan mész?'),
          ],
          [koreanGlossedInRow('왜'), 'miért', koreanWithTranslation('왜 안 와요?', 'Miért nem jössz?')],
          [koreanGlossedInRow('몇'), 'hány (+ számlálószó)', koreanWithTranslation('몇 시예요?', 'Hány óra van?')],
          [
            koreanGlossedInRow('어떤'),
            'milyen',
            koreanWithTranslation('어떤 음식을 좋아해요?', 'Milyen ételt szeretsz?'),
          ],
        ]
      ),
    ],
    examples: [
      [text`세종식당이 ${bold('어디')}에 있어요?`, 'Hol van a Szedzsong étterem?'],
      [text`학교까지 ${bold('얼마나')} 걸려요?`, 'Mennyi idő az iskoláig?'],
      [text`${bold('왜')} 한국어를 배워요?`, 'Miért tanulsz koreaiul?', 'ㅜ+어 → ㅝ: 배우다 → 배워요'],
      [text`${bold('누가')} 이 케이크를 만들었어요?`, 'Ki sütötte ezt a tortát?'],
    ],
    ownNote: [
      paragraph`A ${korean('누구')} alanyként ${korean('누가')} lesz (nem ${korean('누구가')}). A ${korean('무엇')} beszédben ${korean('뭐')}; ${korean('무엇을 → 뭘')}, ${korean('무엇이 → 뭐가')}.`,
    ],
  },
  {
    lesson: 5,
    point: 2,
    form: '(으)로 (방향)',
    name: 'irány („-felé, -ba/-be”)',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt a ${bold('helyet vagy irányt')} jelöli, amerre haladunk: ${korean('오른쪽으로 가세요')} „menjen jobbra”.`,
      paragraph`${bold('받침')} után: ${bold('으로')}, magánhangzó után: ${bold('로')}, ${bold('ㄹ-re végződő')} főnév után is ${bold('로')}: ${korean('지하철로')}.`,
    ],
    table: {
      additionalNouns: ['안', '뒤', '앞', '위', '1층', '지하', '이쪽', '카페', '오른쪽', '사무실'],
      kind: 'noun',
      nouns: [
        'vowelEnding',
        'consonantEnding',
        'rieulEnding',
        { word: '왼쪽', description: 'mássalhangzóra végződik' },
        { word: '위', description: 'magánhangzóra végződik' },
      ],
      nounColumns: [{ header: '(으)로', conjugate: noun => nounWithParticle(noun, '으로', '로', true) }],
    },
    examples: [
      [text`쭉 가서 왼쪽${bold('으로')} 가세요.`, 'Menjen egyenesen, aztán balra.'],
      [text`이 버스는 시청${bold('으로')} 가요.`, 'Ez a busz a városháza felé megy.'],
      [text`이쪽${bold('으로')} 오세요.`, 'Jöjjön erre.'],
      [text`2층${bold('으로')} 올라가세요.`, 'Menjen fel az első emeletre (2층).'],
      [
        text`학교에 지하철${bold('로')} 가요.`,
        'Metróval megyek iskolába.',
        '＋ Saját: eszköz („-val/-vel”) · ㄹ után is 로',
      ],
      [
        text`우리는 오래전부터 친구${bold('로')} 지내요.`,
        'Régóta barátok vagyunk. (szó szerint: barátként élünk egymással)',
        '＋ Saját: szerep, minőség („-ként”)',
      ],
      [
        text`저는 그 사람을 좋은 친구${bold('로')} 생각해요.`,
        'Jó barátomnak tartom őt.',
        '＋ Saját: „valakinek / valaminek tart”',
      ],
      [
        text`제 어머니는 고등학교에서 선생님${bold('으로')} 일해요.`,
        'Édesanyám tanárként dolgozik egy gimnáziumban.',
        '＋ Saját: szerep, minőség („-ként”)',
      ],
    ],
    ownNote: [
      paragraph`Az ${korean('에')} a célpontot jelöli (${korean('학교에 가요')}), a ${korean('(으)로')} az irányt vagy útvonalat (${korean('학교 쪽으로 가요')}).`,
      paragraph`A ${korean('(으)로')}-nak irányon kívül még két gyakori jelentése van (a fenti táblázat is ezeket mutatja a személyeknél és a 지하철-nál):`,
      list(
        text`${bold('eszköz, módszer')} („-val/-vel, -ul/-ül”): ${korean('지하철로 가요')} „metróval megyek”, ${korean('버스로')} „busszal”, ${korean('한국어로 말해요')} „koreaiul beszélek”, ${korean('손으로 먹어요')} „kézzel eszem”;`,
        text`${bold('szerep, minőség')} („-ként, valaminek”), főleg személyekkel: ${korean('친구로 지내다')} „barátként érintkezni, barátok lenni”, ${korean('친구로 생각하다')} „barátjának tartja”, ${korean('선생님으로 일하다')} „tanárként dolgozik”. Ennek hivatalosabb, nyomatékosabb párja a ${korean('(으)로서')} (${reference('4A-11-1')}).`
      ),
      paragraph`${bold('Vigyázat:')} személy ${bold('felé')} mozgásnál nem ${korean('(으)로')} kell, hanem ${korean('에게/한테')} („hozzá”) vagy ${korean('N 쪽으로')} („felé”).`,
    ],
    correctIncorrect: [
      { correct: '친구 쪽으로 걸어가요.', translation: 'A barátom felé sétálok.' },
      {
        incorrect: '친구로 가요.',
        reason: 'irányként rossz; így azt jelentené: „barátként megyek”',
        correction: { correct: '친구한테 가요.', translation: 'A barátomhoz megyek.' },
      },
    ],
  },
  {
    lesson: 6,
    point: 1,
    form: '○에서 ○까지',
    name: '„-tól/-től … -ig” (helyek között)',
    conjugable: false,
    explanation: [
      paragraph`Két hely között az ${bold('indulási')} (${korean('에서')}) és az ${bold('érkezési')} (${korean('까지')}) pontot jelöli. Minden főnév után ugyanaz.`,
    ],
    examples: [
      [text`집${bold('에서')} 학교${bold('까지')} 멀어요?`, 'Messze van az iskola a lakásodtól?'],
      [text`서울${bold('에서')} 부산${bold('까지')} 기차로 세 시간 걸려요.`, 'Szöultól Puszanig vonattal három óra.'],
      [
        text`여기${bold('에서')} 한국미술관${bold('까지')} 어떻게 가요?`,
        'Hogyan jutok el innen a Koreai Művészeti Múzeumig?',
      ],
      [text`명동${bold('까지')} 지하철로 가세요.`, 'Menjen metróval Myeongdongig.'],
    ],
    ownNote: [
      paragraph`${bold('Időnél')} a „-tól/-től” nem ${korean('에서')}, hanem ${korean('부터')}: ${korean('아홉 시부터 다섯 시까지')} „kilenctől ötig”. Az ${korean('에서부터')} a kiindulópont hangsúlyozása (${reference('2B-02-1')}).`,
    ],
  },
  {
    lesson: 6,
    point: 2,
    form: '-아요/어요 (제안)',
    name: 'javaslat („… -junk!”)',
    explanation: [
      paragraph`A ${korean('-아요/어요')} végződés (${reference('1A-04-1')}) ${bold('javaslatként')} is használható: „menjünk”, „együnk”. Alakja ugyanaz, csak a helyzet (és gyakran a ${korean('같이')} „együtt”) mutatja, hogy javaslatról van szó.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: 'Javaslat: -아요/어요', conjugate: word => '같이 ' + withAOrEo(word, '요') }],
    },
    examples: [
      [text`같이 ${bold('가요')}.`, 'Menjünk együtt.'],
      [text`가: 뭐 먹을까요? 나: 비빔밥 ${bold('먹어요')}.`, '– Mit együnk? – Együnk bibimbapot.'],
      [text`지하철로 ${bold('가요')}. 버스는 너무 느려요.`, 'Menjünk metróval, a busz túl lassú.'],
      [text`우리 같이 음악을 ${bold('들어요')}.`, 'Hallgassunk együtt zenét.', 'ㄷ-rendhagyó: 듣다 → 들어요'],
    ],
    ownNote: [
      paragraph`A javaslat három szintje: kérdés ${korean('-(으)ㄹ까요?')} („menjünk?”), kijelentés ${korean('-아요/어요')} („menjünk!”), formális ${korean('-(으)ㅂ시다')} (${korean('갑시다')}, idősebbnek nem illik mondani). Barátok közt: ${korean('-자')} (${reference('3A-01-1')}).`,
    ],
  },
  {
    lesson: 7,
    point: 1,
    form: '-(으)려고 하다',
    name: '„… akarok, szándékozom” (terv)',
    explanation: [
      paragraph`Ige után ${bold('tervet, szándékot')} fejez ki: „azt tervezem, hogy …”.`,
      paragraph`${bold('받침')} után: ${bold('-으려고 하다')}, magánhangzó után: ${bold('-려고 하다')}, ${bold('ㄹ-tő')} után is ${bold('-려고 하다')} (${korean('만들려고 해요')}).`,
    ],
    table: {
      additionalWords: ['먹다', '가다', '신다', '배우다', '입다', '여행하다', '듣다', '놀다'],
      sampleSet: 'verbs',
      columns: [
        { header: '-(으)려고 해요', conjugate: word => withEu(word, '려고 해요') },
        { header: 'Múlt: -(으)려고 했어요', conjugate: word => withEu(word, '려고 했어요') },
      ],
    },
    examples: [
      [text`제주도에 가${bold('려고 해요')}.`, 'Dzsedzsu-szigetre szeretnék menni.'],
      [text`이번 방학에 한국 요리를 배우${bold('려고 해요')}.`, 'Ebben a szünetben koreai főzést akarok tanulni.'],
      [text`주말에 집에서 쉬${bold('려고 해요')}.`, 'Hétvégén otthon akarok pihenni.'],
      [
        text`아침마다 한국어 뉴스를 들${bold('으려고 해요')}.`,
        'Minden reggel koreai híreket akarok hallgatni.',
        'ㄷ-rendhagyó: 듣다 → 들으려고',
      ],
    ],
    ownNote: [
      paragraph`Múlt időben (${korean('-(으)려고 했어요')}) gyakran azt jelenti, hogy a terv ${bold('nem valósult meg')}: ${korean('가려고 했어요. 그런데 못 갔어요')}. A ${korean('-(으)려고')} kötőszóként is áll: ${korean('살을 빼려고 운동해요')} „azért mozgok, hogy fogyjak”.`,
    ],
  },
  {
    lesson: 7,
    point: 2,
    form: '-고 (나열)',
    name: '„és” (tagmondatok felsorolása)',
    explanation: [
      paragraph`Ige vagy melléknév után két vagy több ${bold('tényt sorol fel')}: „X és Y”. A tő végétől függetlenül mindig ${korean('-고')}. Az első tagmondatba általában ${bold('nem tesszük')} a múlt/jövő jelét, az időt a mondat vége adja. A két tagmondat sorrendje felcserélhető, és alanyuk különbözhet.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-고', conjugate: word => withPlainStem(word, '고') }],
    },
    examples: [
      [text`제주도는 바다가 아름답${bold('고')} 음식이 맛있어요.`, 'Dzsedzsun gyönyörű a tenger és finomak az ételek.'],
      [text`저는 영화를 보${bold('고')} 동생은 음악을 들어요.`, 'Én filmet nézek, az öcsém pedig zenét hallgat.'],
      [text`이 방은 넓${bold('고')} 밝아요.`, 'Ez a szoba tágas és világos.'],
      [text`날씨가 덥${bold('고')} 습해요.`, 'Meleg és párás idő van.', '-고 előtt a ㅂ-rendhagyó nem változik: 덥고'],
    ],
    ownNote: [
      paragraph`Az ${korean('도')}-val kiemelhető, hogy mindkettőre igaz: ${korean('값도 싸고 맛도 있어요')} „olcsó is, finom is”. Egymás utáni cselekvésre is használható („…, aztán …”): ${korean('밥을 먹고 커피를 마셨어요')}. A ${reference('3A-04-1', '3A 4. leckében')} tanult ${korean('-고 나서')} ezt hangsúlyozza.`,
    ],
  },
  {
    lesson: 8,
    point: 1,
    form: '-(으)ㄴ 후에',
    name: '„miután …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy az első cselekvés ${bold('időben megelőzi')} a másodikat: „miután X, Y”.`,
      paragraph`${bold('받침')} után: ${bold('-은 후에')}, magánhangzó után: ${bold('-ㄴ 후에')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik: ${korean('만든 후에')}. A második tagmondat lehet múlt vagy jövő idejű is.`,
    ],
    table: {
      additionalWords: ['먹다', '보다', '씻다', '사다', '읽다', '마시다', '듣다', '만들다'],
      sampleSet: 'verbs',
      columns: [{ header: '-(으)ㄴ 후에', conjugate: word => withEu(word, 'ㄴ 후에') }],
    },
    examples: [
      [text`수업이 끝${bold('난 후에')} 뭐 할 거예요?`, 'Mit fogsz csinálni óra után?'],
      [text`밥을 먹${bold('은 후에')} 산책했어요.`, 'Evés után sétáltam.'],
      [
        text`이 음악을 들${bold('은 후에')} 기분이 좋아졌어요.`,
        'Miután meghallgattam ezt a zenét, jobb kedvem lett.',
        { note: 'ㄷ-rendhagyó: 듣다 → 들은 후에', uses: ['3A-09-1'] },
      ],
      [
        text`여행을 다녀${bold('온 후에')} 사진을 보여 줄게요.`,
        'Miután hazajöttem az utazásról, megmutatom a képeket.',
      ],
    ],
    ownNote: [
      paragraph`Főnévvel: ${korean('N 후에')}: ${korean('수업 후에')}, ${korean('식사 후에')}. Rokon kifejezések: ${korean('-(으)ㄴ 다음에')}, ${korean('-고 나서')} (${reference('3A-04-1')}). Az ellentéte ${korean('-기 전에')} (${reference('1B-10-1')}).`,
      paragraph`${bold('Magyar fordítás:')} rövid, tárgy nélküli cselekvésnél a főneves alak a természetes: ${korean('밥을 먹은 후에')} „evés után”, ${korean('공부한 후에')} „tanulás után”. Ha a cselekvésnek saját tárgya, alanya vagy részlete van, „miután” + ige kell: ${korean('저녁을 다 먹은 후에')} „miután megettem a vacsorát”, ${korean('친구가 도착한 후에')} „miután a barátom megérkezett”. Nem minden igének van jó főneves párja („menés után” ✗ → „miután elmentem”). A koreai forma mindig teljes tagmondat; a táblázat ezért mindkét fordítást mutatja, ahol van főneves alak.`,
    ],
  },
  {
    lesson: 8,
    point: 2,
    form: '보다',
    name: '„-nál/-nél” (összehasonlítás)',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt jelöli, ${bold('amihez hasonlítunk')}: ${korean('A보다 B가 커요')} „B nagyobb, mint A”. Gyakran a ${korean('더')} („jobban”) szóval együtt. A ${korean('보다')}-s főnév állhat elöl vagy hátrébb is.`,
    ],
    examples: [
      [text`이번 여행이 지난번 여행${bold('보다')} 좋았어요.`, 'Ez az utazás jobb volt, mint a múltkori.'],
      [text`저는 커피${bold('보다')} 차를 더 좋아해요.`, 'A teát jobban szeretem, mint a kávét.'],
      [text`오늘이 어제${bold('보다')} 더 추워요.`, 'Ma hidegebb van, mint tegnap.', 'ㅂ-rendhagyó: 춥다 → 추워요'],
      [text`지하철이 버스${bold('보다')} 빨라요.`, 'A metró gyorsabb a busznál.', '르-rendhagyó: 빠르다 → 빨라요'],
    ],
    ownNote: [
      paragraph`Felsőfok: ${korean('제일 / 가장')} + melléknév: ${korean('제일 좋아요')} „a legjobb”. Kérdés: ${korean('뭐가 더 좋아요?')} „Melyik jobb?”`,
    ],
  },
  {
    lesson: 9,
    point: 1,
    form: '-지만',
    name: '„de, viszont”',
    explanation: [
      paragraph`Ige vagy melléknév után az előzővel ${bold('ellentétes')} tartalmat vezet be: „X, de Y”. A tő végétől függetlenül ${korean('-지만')}; állhat előtte ${bold('múlt')} (${korean('-았지만/었지만')}) és ${korean('-겠-')} is. A két alany különbözhet; a szembeállítást gyakran ${korean('은/는')} erősíti.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-지만', conjugate: word => withPlainStem(word, '지만') },
        { header: 'Múlt: -았지만/었지만', conjugate: word => withPast(word, '지만') },
      ],
    },
    examples: [
      [
        text`한국어는 어렵${bold('지만')} 재미있어요.`,
        'A koreai nehéz, de érdekes.',
        '-지만 előtt a ㅂ-rendhagyó nem változik: 어렵지만',
      ],
      [text`약을 먹었${bold('지만')} 아직 아파요.`, 'Bevettem a gyógyszert, de még mindig fáj.'],
      [text`형은 키가 크${bold('지만')} 저는 작아요.`, 'A bátyám magas, én viszont alacsony vagyok.'],
      [text`비싸${bold('지만')} 사고 싶어요.`, 'Drága, de meg akarom venni.'],
    ],
  },
  {
    lesson: 9,
    point: 2,
    form: '-아야/어야 되다',
    name: '„kell, muszáj”',
    explanation: [
      paragraph`Ige vagy melléknév után azt fejezi ki, hogy valamit ${bold('meg kell tenni')}, vagy valaminek valamilyennek ${bold('kell lennie')}. A ${bold('-아/어')} szabály szerint képezzük: ${korean('가야 돼요, 먹어야 돼요, 해야 돼요')}.`,
    ],
    table: {
      additionalWords: [
        '가다',
        '먹다',
        '일하다',
        '오다',
        '쉬다',
        '공부하다',
        '타다',
        '있다',
        '준비하다',
        '좋다',
        '크다',
        '편하다',
      ],
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-아야/어야 돼요', conjugate: word => withAOrEo(word, '야 돼요') }],
    },
    examples: [
      [text`감기에 걸렸어요. 집에서 푹 쉬${bold('어야 돼요')}.`, 'Megfáztam. Otthon alaposan pihennem kell.'],
      [text`내일 일찍 일어나${bold('야 돼요')}.`, 'Holnap korán kell kelnem.'],
      [text`약을 먹${bold('어야 돼요')}?`, 'Be kell vennem a gyógyszert?'],
      [
        text`선생님 말씀을 잘 들${bold('어야 돼요')}.`,
        'Jól oda kell figyelni a tanár szavaira.',
        'ㄷ-rendhagyó: 듣다 → 들어야',
      ],
    ],
    ownNote: [
      paragraph`Ugyanezt jelenti a ${korean('-아야/어야 하다')} (${korean('가야 해요')}), ez kicsit írottabb. Tagadása nem „nem kell”, hanem ${korean('-지 않아도 되다')} vagy ${korean('안 -아도/어도 되다')} (${reference('2B-06-1')}): ${korean('안 가도 돼요')} „nem kell menni”.`,
    ],
  },
  {
    lesson: 10,
    point: 1,
    form: '-기 전에',
    name: '„mielőtt …”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy a második cselekvés az első ${bold('előtt')} történik: „mielőtt X, Y”. A tő végétől függetlenül ${korean('-기 전에')}.`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-기 전에', conjugate: word => withPlainStem(word, '기 전에') }] },
    examples: [
      [text`학교에 가${bold('기 전에')} 수영을 해요.`, 'Iskola előtt úszom.'],
      [text`자${bold('기 전에')} 책을 읽어요.`, 'Lefekvés előtt olvasok.'],
      [text`밥을 먹${bold('기 전에')} 손을 씻으세요.`, 'Evés előtt mosson kezet.'],
      [text`음식을 만들${bold('기 전에')} 재료를 샀어요.`, 'Mielőtt elkészítettem az ételt, megvettem a hozzávalókat.'],
      [
        text`음악을 듣${bold('기 전에')} 숙제를 끝냈어요.`,
        'Mielőtt zenét hallgattam volna, befejeztem a házit.',
        '-기 előtt nincs ㄷ-változás: 듣기 전에',
      ],
    ],
    ownNote: [
      paragraph`Főnévvel: ${korean('N 전에')}: ${korean('수업 전에')}, ${korean('삼 년 전에')} „három évvel ezelőtt”. Az első tagmondat soha nem kap múlt időt: ${korean('가기 전에')}, nem ${korean('갔기 전에')}.`,
      paragraph`${bold('Magyar fordítás:')} rövid cselekvésnél a főneves alak a természetes: ${korean('자기 전에')} „lefekvés előtt”, ${korean('먹기 전에')} „evés előtt”. Ha a cselekvésnek saját tárgya, alanya vagy részlete van, „mielőtt” + ige kell: ${korean('한국에 가기 전에')} „mielőtt Koreába megyek”.`,
    ],
  },
  {
    lesson: 10,
    point: 2,
    form: '-아서/어서 (순서)',
    name: '„… és (ott/azzal) …” (egymásra épülő cselekvések)',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy a cselekvések ${bold('egymás után')} történnek, és a második ${bold('szorosan az elsőre épül')} (ugyanott, ugyanazzal a dologgal): ${korean('친구를 만나서 영화를 봤어요')} „találkoztam a barátommal, és (vele) megnéztük a filmet”.`,
      paragraph`Elé nem kerül ${korean('-았/었-')} vagy ${korean('-겠-')}. A két tagmondat ${bold('alanya azonos')}, a másodikban általában elhagyjuk.`,
    ],
    table: {
      additionalWords: [
        '가다',
        '씻다',
        '수영하다',
        '사다',
        '찍다',
        '요리하다',
        '오다',
        '만들다',
        '전화하다',
        '만나다',
        '쓰다',
        '초대하다',
        '일어나다',
        '걷다',
        '이야기하다',
      ],
      sampleSet: 'verbs',
      columns: [{ header: '-아서/어서', conjugate: word => withAOrEo(word, '서') }],
    },
    examples: [
      [text`아침에 일어${bold('나서')} 세수를 해요.`, 'Reggel felkelek és megmosakszom.'],
      [text`도서관에 ${bold('가서')} 공부했어요.`, 'Elmentem a könyvtárba és (ott) tanultam.'],
      [text`김밥을 ${bold('만들어서')} 친구하고 먹었어요.`, 'Kimbapot csináltam, és megettem a barátommal.'],
      [
        text`친구를 ${bold('도와서')} 같이 이사했어요.`,
        'Segítettem a barátomnak, és együtt költöztünk.',
        'ㅂ-rendhagyó: 돕다 → 도와서',
      ],
    ],
    ownNote: [
      paragraph`${bold('-아서/어서 vagy -고?')} A ${korean('-고')} csak időrendet jelez, a cselekvések függetlenek: ${korean('밥을 먹고 학교에 가요')}. A ${korean('-아서/어서')} esetén a második az első eredményére épül: ${korean('학교에 가서 친구를 만나요')} (az iskolában találkozom vele). Mozgásigéknél (${korean('가다, 오다')}), ${korean('만나다')}, ${korean('만들다')}, ${korean('사다')} után jellemzően ${korean('-아서/어서')}; ${korean('입다, 타다')} után ${korean('-고')}: ${korean('코트를 입고 나갔어요')}.`,
    ],
  },
  {
    lesson: 11,
    point: 1,
    form: '-(으)ㄹ 수 있다, 없다',
    name: '„tud(ok), képes / nem tud”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy valamire ${bold('képesek vagyunk')}, vagy valami ${bold('lehetséges')}. A tagadás ${korean('-(으)ㄹ 수 없다')}.`,
      paragraph`${bold('받침')} után: ${bold('-을 수 있다')}, magánhangzó után: ${bold('-ㄹ 수 있다')}, ${bold('ㄹ-tő')}: ${bold('수 있다')} (${korean('만들 수 있어요')}).`,
    ],
    table: {
      additionalWords: ['먹다', '가다', '받다', '치다', '읽다', '타다', '찍다', '운전하다', '듣다', '만들다'],
      sampleSet: 'verbs',
      columns: [
        { header: '-(으)ㄹ 수 있어요', conjugate: word => withEu(word, 'ㄹ 수 있어요') },
        { header: '-(으)ㄹ 수 없어요', conjugate: word => withEu(word, 'ㄹ 수 없어요') },
      ],
    },
    examples: [
      [text`한국 음식을 ${bold('만들 수 있어요')}?`, 'Tudsz koreai ételt főzni?'],
      [text`저는 한국어로 이메일을 ${bold('쓸 수 있어요')}.`, 'Tudok koreaiul e-mailt írni.'],
      [text`여기에서 사진을 찍${bold('을 수 없어요')}.`, 'Itt nem lehet fényképezni.'],
      [
        text`너무 무거워서 혼자 ${bold('들 수 없어요')}.`,
        'Túl nehéz, nem tudom egyedül felemelni.',
        '들다 (emelni) ㄹ-tő: 들 수 – vö. 듣다 → 들을 수 (hallani)',
      ],
    ],
    ownNote: [
      paragraph`Vigyázat a hasonló alakokra: ${korean('들다')} („emelni”, ㄹ-tő) → ${korean('들 수 있어요')}, de ${korean('듣다')} („hallani”, ㄷ-rendhagyó) → ${korean('들을 수 있어요')}. A ${korean('-(으)ㄹ 수 없다')} és a ${korean('못')} hasonló: ${korean('못 가요 ≈ 갈 수 없어요')}.`,
    ],
  },
  {
    lesson: 11,
    point: 2,
    form: '-고 있다',
    name: 'folyamatban lévő cselekvés („éppen …”)',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy cselekvés ${bold('éppen folyamatban van')}. A tő végétől függetlenül ${korean('-고 있다')}; a ${korean('있다')} ragozódik: ${korean('있어요, 있었어요')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-고 있어요', conjugate: word => withPlainStem(word, '고 있어요') },
        { header: 'Múlt: -고 있었어요', conjugate: word => withPlainStem(word, '고 있었어요') },
      ],
    },
    examples: [
      [text`지금 뭐 하${bold('고 있어요')}?`, 'Mit csinálsz most?'],
      [
        text`동생은 방에서 음악을 듣${bold('고 있어요')}.`,
        'Az öcsém a szobájában zenét hallgat.',
        '-고 előtt a ㄷ-rendhagyó nem változik: 듣고',
      ],
      [text`어제 전화했을 때 뭐 하${bold('고 있었어요')}?`, 'Mit csináltál tegnap, amikor hívtalak?'],
      [text`요즘 한국어를 배우${bold('고 있어요')}.`, 'Mostanában koreait tanulok.'],
    ],
    honorific: {
      rows: [['-고 있다', 'éppen csinálja', '-고 계시다', 'éppen csinálja (tiszteleti)']],
      note: [
        paragraph`Ha egy ${bold('tisztelt személy')} csinál éppen valamit, a ${korean('있다')} helyére ${korean('계시다')} kerül: ${korean('읽고 계세요')}, nem ${korean('읽고 있으세요')}. Ha az igének külön tiszteleti alakja van, az is megjelenik: ${korean('자다 → 주무시고 계세요')}.`,
      ],
      examples: [
        [text`할머니께서 ${bold('주무시고 계세요')}.`, 'A nagymama (éppen) alszik.'],
        [text`아버지께서 신문을 읽${bold('고 계세요')}.`, 'Édesapám éppen újságot olvas.'],
        [text`선생님께서 지금 회의하${bold('고 계세요')}.`, 'A tanár úr éppen értekezleten van.'],
      ],
    },
    ownNote: [
      paragraph`A ${korean('입다, 신다, 쓰다')} (ruha) + ${korean('-고 있다')} állapotot is jelent: ${korean('안경을 쓰고 있어요')} „szemüveget visel”.`,
    ],
  },
  {
    lesson: 12,
    point: 1,
    form: '에게, 한테',
    name: '„-nak/-nek” (kinek?)',
    conjugable: false,
    explanation: [
      paragraph`Személy (vagy állat) után azt jelöli, ${bold('akire a cselekvés irányul')}: kinek adunk, kinek szólunk, kinek telefonálunk. A ${korean('한테')} beszélt nyelvi, az ${korean('에게')} kicsit írottabb. Minden főnév után ugyanaz.`,
    ],
    examples: [
      [text`저는 지니 씨${bold('에게')} 펜을 선물할 거예요.`, 'Tollat fogok ajándékozni Dzsininek.'],
      [text`친구${bold('한테')} 전화했어요.`, 'Felhívtam a barátomat.'],
      [text`동생${bold('에게')} 이메일을 보냈어요.`, 'E-mailt küldtem az öcsémnek.'],
      [text`고양이${bold('한테')} 밥을 줬어요.`, 'Megetettem a macskát.'],
    ],
    ownNote: [
      paragraph`Tárgyra, helyre (pl. intézményre) nem ${korean('에게')}, hanem ${korean('에')}: ${korean('꽃에 물을 줘요')}, ${korean('회사에 전화해요')}. Az ellenkező irány („-tól/-től”): ${korean('에게서 / 한테서')}.`,
    ],
    correctIncorrect: [
      {
        incorrect: '나무에게 물을 줘요.',
        reason: 'az 에게 csak élőlény (ember, állat) után áll; növény, tárgy után 에',
        correction: { correct: '나무에 물을 줘요.', translation: 'Meglocsolom a fát.' },
      },
    ],
    honorific: {
      rows: [
        ['에게 / 한테', '-nak/-nek', '께', '-nak/-nek (tiszteleti)'],
        ['주다', 'ad', '드리다', 'ad (tiszteleti)'],
      ],
      note: [
        paragraph`Tisztelt személynek (szülő, nagyszülő, tanár) a ${korean('에게/한테')} helyett ${korean('께')} jár, és ilyenkor az „ad” sem ${korean('주다')}, hanem ${korean('드리다')}. Részletesen a ${reference('2B-07-1')} tanítja.`,
      ],
      examples: [
        [text`할머니${bold('께')} 선물을 드렸어요.`, 'Ajándékot adtam a nagymamának.'],
        [text`선생님${bold('께')} 전화했어요.`, 'Felhívtam a tanár urat.'],
        [text`부모님${bold('께')} 편지를 썼어요.`, 'Levelet írtam a szüleimnek.'],
      ],
    },
  },
  {
    lesson: 12,
    point: 2,
    form: '-(으)니까 (이유)',
    name: '„mert …, (hát) …” (ok, főleg kérés előtt)',
    explanation: [
      paragraph`Ige vagy melléknév után az ${bold('okot')} fejezi ki. A ${korean('-아서/어서')}-szal szemben utána állhat ${bold('felszólítás, javaslat')} (${korean('-(으)세요, -(으)ㄹ까요?')}), és előtte ${bold('múlt idő')} is.`,
      paragraph`${bold('받침')} után: ${bold('-으니까')}, magánhangzó után: ${bold('-니까')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik: ${korean('사니까, 머니까')}.`,
    ],
    table: {
      additionalWords: ['먹다', '가다', '많다', '하다', '있다', '바쁘다', '좋다', '비싸다', '덥다', '멀다'],
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-(으)니까', conjugate: word => withEu(word, '니까') },
        { header: 'Múlt: -았으니까/었으니까', conjugate: word => withPast(word, '으니까') },
      ],
    },
    examples: [
      [text`비가 오${bold('니까')} 우산을 가져가세요.`, 'Esik az eső, vigyél esernyőt.'],
      [
        text`지니 씨가 그림을 좋아하${bold('니까')} 그림책을 선물할 거예요.`,
        'Dzsini szereti a képeket, ezért képeskönyvet fogok neki adni.',
      ],
      [
        text`오늘은 날씨가 ${bold('더우니까')} 집에 있어요.`,
        'Ma meleg van, maradjunk itthon.',
        'ㅂ-rendhagyó: 덥다 → 더우니까',
      ],
      [text`어제 많이 걸${bold('었으니까')} 오늘은 쉴까요?`, 'Tegnap sokat gyalogoltunk, pihenjünk ma?'],
    ],
    correctIncorrect: [
      { correct: '시간이 없으니까 택시를 탑시다.', translation: 'Nincs időnk, fogjunk taxit.' },
      { incorrect: '시간이 없어서 택시를 탑시다.', reason: 'javaslat előtt nem állhat -아서' },
    ],
    ownNote: [
      paragraph`Köszönésben, bocsánatkérésben viszont a ${korean('-아서/어서')} a természetes: ${korean('늦어서 죄송합니다')} (nem ${korean('늦었으니까')}). A ${reference('2B-07-2')} a ${korean('-(으)니까')} másik jelentését tanítja: „amikor …, rájöttem, hogy…” (felfedezés).`,
    ],
  },
];
export default {
  lessons: {
    1: { korean: '무슨 음식을 좋아해요?', hungarian: 'Milyen ételeket szeretsz?' },
    2: {
      korean: '도서관에 책을 빌리러 가요',
      hungarian: 'Könyvtárba megyek könyvet kölcsönözni.',
      pronunciation: '격음화',
      pronunciationHungarian: 'hehezetesedés (ㅎ + ㄱ/ㄷ/ㅈ/ㅂ → ㅋ/ㅌ/ㅊ/ㅍ)',
    },
    3: { korean: '백화점에서 쇼핑할 거예요', hungarian: 'Az áruházban fogok vásárolni.' },
    4: {
      korean: '더 큰 사이즈는 없어요?',
      hungarian: 'Nincs nagyobb méret?',
      pronunciation: '비음화',
      pronunciationHungarian: 'orrhangúsodás (합니다 [함니다])',
    },
    5: { korean: '세종식당이 어디에 있어요?', hungarian: 'Hol van a Szedzsong étterem?' },
    6: {
      korean: '한국미술관까지 어떻게 가요?',
      hungarian: 'Hogyan jutok el a Koreai Művészeti Múzeumig?',
      pronunciation: '경음화',
      pronunciationHungarian: 'keményedés (세종학당 [세종학땅])',
    },
    7: { korean: '제주도에 가려고 해요', hungarian: 'Dzsedzsu-szigetre akarok menni.' },
    8: {
      korean: '지난번 여행보다 좋았어요',
      hungarian: 'Jobb volt, mint a múltkori utazás.',
      pronunciation: '겹받침 ㄶ',
      pronunciationHungarian: 'kettős 받침 ㄶ (괜찮아요 [괜차나요])',
    },
    9: { korean: '집에서 푹 쉬어야 돼요', hungarian: 'Otthon alaposan ki kell pihenned magad.' },
    10: {
      korean: '학교에 가기 전에 수영을 해요',
      hungarian: 'Iskola előtt úszom.',
      pronunciation: '겹받침 ㄼ',
      pronunciationHungarian: 'kettős 받침 ㄼ (여덟 [여덜], 넓어요 [널버요])',
    },
    11: { korean: '한국 음식을 만들 수 있어요?', hungarian: 'Tudsz koreai ételt főzni?' },
    12: {
      korean: '저는 지니 씨에게 펜을 선물할 거예요',
      hungarian: 'Tollat fogok ajándékozni Dzsininek.',
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
