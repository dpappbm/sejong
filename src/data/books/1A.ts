import {
  createWord,
  nounWithParticle,
  withAOrEo,
  withEu,
  withPast,
  withPlainStem,
  type Word,
} from '../../lib/conjugation';
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
import type { BookData } from '../types';
/** Noun + 하다 verbs (공부하다) take 안 before 하다; -아/어하다 verbs (좋아하다) are not split. */
const isNounPlusHada = (word: Word) =>
  word.wordClass === 'verb' && word.stem.endsWith('하') && word.stem.length > 1 && !/[아어]하$/.test(word.stem);
const negateWithAn = (word: Word) =>
  isNounPlusHada(word)
    ? nounWithParticle(word.stem.slice(0, -1), '을', '를') + ' 안 해요'
    : '안 ' + withAOrEo(word, '요');

export default {
  lessons: {
    1: { korean: '안녕하세요? 저는 안나예요', hungarian: 'Jó napot! Anna vagyok.' },
    2: {
      korean: '전화번호가 뭐예요?',
      hungarian: 'Mi a telefonszámod?',
      pronunciation: '연음',
      pronunciationHungarian: 'átkötés (a 받침 átkerül a következő szótagra)',
    },
    3: { korean: '제 가방은 책상 옆에 있어요', hungarian: 'A táskám az íróasztal mellett van.' },
    4: {
      korean: '한국어를 공부해요',
      hungarian: 'Koreait tanulok.',
      pronunciation: '억양',
      pronunciationHungarian: 'kijelentő és kérdő hanglejtés',
    },
    5: { korean: '빵하고 우유를 사요', hungarian: 'Kenyeret és tejet veszek.' },
    6: {
      korean: '사과 다섯 개 주세요',
      hungarian: 'Öt almát kérek.',
      pronunciation: '평파열음화',
      pronunciationHungarian: 'a 받침 egyszerűsödése (ㅋ, ㄲ → [ㄱ] stb.)',
    },
    7: { korean: '일곱 시에 시작해요', hungarian: 'Hétkor kezdődik.' },
    8: {
      korean: '날씨가 더워요?',
      hungarian: 'Meleg van?',
      pronunciation: '끊어 말하기',
      pronunciationHungarian: 'tagolás: az 안 egybeolvad az igével (안 더워요 [안더워요])',
    },
    9: { korean: '공원에서 산책했어요', hungarian: 'Sétáltam a parkban.' },
    10: {
      korean: '우리 같이 놀이공원에 갈까요?',
      hungarian: 'Elmenjünk együtt a vidámparkba?',
      pronunciation: 'ㅎ 탈락',
      pronunciationHungarian: 'a ㅎ kiesése (좋아요 [조아요])',
    },
  },
  points: [
    {
      lesson: 1,
      point: 1,
      form: '이에요/예요',
      name: '„… vagyok / … az” (a 이다 udvarias alakja)',
      studentBookPage: 38,
      vocabularyGrammarPage: 30,
      explanation: [
        paragraph`Főnév után áll, és azt mondja meg, ${bold('ki vagy mi')} valaki/valami: „Anna diák.” A magyarban ilyenkor nincs ige, a koreaiban kell. Kérdésben ugyanez az alak, csak emelkedő hanglejtéssel.`,
        paragraph`Ha a főnév ${bold('mássalhangzóra (받침)')} végződik: ${bold('이에요')}, ha ${bold('magánhangzóra')}: ${bold('예요')}. Egybeírjuk a főnévvel.`,
      ],
      table: {
        additionalNouns: ['물', '사과', '책상', '의자', '선생님', '요리사', '회사원', '안나 씨'],
        kind: 'noun',
        nouns: [
          'vowelEnding',
          'consonantEnding',
          { word: '학생', description: 'mássalhangzóra végződik' },
          { word: '의사', description: 'magánhangzóra végződik' },
        ],
        nounColumns: [
          { header: 'Kijelentés', conjugate: noun => nounWithParticle(noun, '이에요.', '예요.') },
          { header: 'Kérdés', conjugate: noun => nounWithParticle(noun, '이에요?', '예요?') },
        ],
      },
      examples: [
        [text`저는 안나${bold('예요')}.`, 'Anna vagyok.'],
        [text`저는 학생${bold('이에요')}.`, 'Diák vagyok.'],
        [text`이거 뭐${bold('예요')}?`, 'Mi ez?'],
        [text`마크 씨는 의사${bold('예요')}?`, 'Mark orvos?'],
      ],
      ownNote: [
        paragraph`A ${korean('예요')} kiejtése a gyakorlatban [에요]. Tagadása nem ${korean('안 이에요')}, hanem ${korean('이/가 아니에요')} (${reference('1A-02-2')}). Formális alakja ${korean('입니다')} (pl. ${korean('학생입니다')}), ezt az ${reference('1B-04-2')} vezeti be.`,
      ],
    },
    {
      lesson: 1,
      point: 2,
      form: '은/는',
      name: 'a mondat témája („ami … illeti”)',
      studentBookPage: 39,
      vocabularyGrammarPage: 31,
      explanation: [
        paragraph`Főnév után jelöli, hogy a mondat ${bold('miről szól')} (téma). Bemutatkozásnál: ${korean('저는 …')} = „Én … vagyok”. Gyakran ${bold('szembeállítást')} is jelez: „én viszont…”.`,
        paragraph`${bold('받침')} után: ${bold('은')}, magánhangzó után: ${bold('는')}.`,
      ],
      table: {
        additionalNouns: ['가방', '저', '동생', '모자', '서울', '친구', '이 사람', '주노 씨'],
        kind: 'noun',
        nouns: [
          'vowelEnding',
          'consonantEnding',
          { word: '저', description: 'magánhangzóra végződik' },
          { word: '이름', description: 'mássalhangzóra végződik' },
        ],
        nounColumns: [{ header: '은/는', conjugate: noun => nounWithParticle(noun, '은', '는') }],
      },
      examples: [
        [text`저${bold('는')} 마크예요.`, 'Mark vagyok.'],
        [text`이름${bold('은')} 뭐예요?`, 'Mi a neved? (szó szerint: a név mi?)'],
        [text`안나 씨${bold('는')} 미국 사람이에요.`, 'Anna amerikai.'],
        [
          text`저${bold('는')} 회사원이에요. 동생${bold('은')} 학생이에요.`,
          'Én irodai dolgozó vagyok, a húgom/öcsém pedig diák.',
        ],
      ],
      honorific: {
        rows: [['은/는', 'témajelölő', '께서는', 'témajelölő (tiszteleti)']],
        note: [
          paragraph`Tisztelt személy (szülő, nagyszülő, tanár, idősebb) után a ${korean('은/는')} helyett ${korean('께서는')} állhat. Ilyenkor az állítmány is tiszteleti alakot kap (${korean('-(으)시-')}, ${reference('2B-03-1')}). Hétköznapi beszédben a sima ${korean('은/는')} + tiszteleti ige is elég.`,
        ],
        examples: [
          [text`할아버지${bold('께서는')} 의사세요.`, 'A nagyapám orvos.'],
          [text`선생님${bold('께서는')} 한국 사람이세요.`, 'A tanár úr koreai.'],
          [
            text`저는 학생이에요. 아버지${bold('께서는')} 회사원이세요.`,
            'Én diák vagyok, édesapám pedig irodai dolgozó.',
          ],
        ],
      },
    },
    {
      lesson: 2,
      point: 1,
      form: '이/가',
      name: 'alanyjelölő',
      studentBookPage: 46,
      vocabularyGrammarPage: 32,
      explanation: [
        paragraph`Főnév után jelöli a mondat ${bold('alanyát')}, vagyis azt, aki/ami valamit csinál vagy valamilyen. Kérdőszó alanyként is ezt kapja: ${korean('뭐가, 누가')}.`,
        paragraph`${bold('받침')} után: ${bold('이')}, magánhangzó után: ${bold('가')}.`,
      ],
      table: {
        additionalNouns: ['가방', '카페', '동생', '요리사', '이름', '안나 씨', '선생님', '전화번호'],
        kind: 'noun',
        nouns: [
          'vowelEnding',
          'consonantEnding',
          { word: '전화번호', description: 'magánhangzóra végződik' },
          { word: '가방', description: 'mássalhangzóra végződik' },
        ],
        nounColumns: [{ header: '이/가', conjugate: noun => nounWithParticle(noun, '이', '가') }],
      },
      examples: [
        [text`전화번호${bold('가')} 뭐예요?`, 'Mi a telefonszámod?'],
        [text`이메일 주소${bold('가')} 뭐예요?`, 'Mi az e-mail címed?'],
        [text`가방${bold('이')} 어디에 있어요?`, 'Hol van a táska?'],
        [text`날씨${bold('가')} 좋아요.`, 'Jó idő van.'],
      ],
      ownNote: [
        paragraph`${bold('은/는 vagy 이/가?')} A ${korean('은/는')} a már ismert témát vagy a szembeállítást jelöli („én pedig…”), a ${korean('이/가')} az új információt, az alanyt hangsúlyozza. Kérdőszó (${korean('누가, 뭐가')}) és a rá adott válasz mindig ${korean('이/가')}-t kap: ${korean('누가 왔어요? – 마크 씨가 왔어요.')}`,
        paragraph`Különleges alakok: ${korean('저 + 가 → 제가')}, ${korean('나 + 가 → 내가')}, ${korean('누구 + 가 → 누가')}.`,
      ],
      correctIncorrect: [
        { correct: '제가 할게요.', translation: 'Én megcsinálom.' },
        { incorrect: '저가 할게요.', reason: 'a 저 („én”) a 가 előtt 제-vé változik: 제가' },
      ],
      honorific: {
        rows: [['이/가', 'alanyjelölő', '께서', 'alanyjelölő (tiszteleti)']],
        note: [
          paragraph`Tisztelt személy alanyként ${korean('께서')}-t kaphat, az állítmány ilyenkor ${korean('-(으)시-')} alakú (${reference('2B-03-1')}). A ${korean('께서')} ünnepélyesebb; beszélt nyelvben gyakran elég a ${korean('이/가')} + tiszteleti ige: ${korean('선생님이 오셨어요')}.`,
        ],
        examples: [
          [text`어머니${bold('께서')} 오셨어요.`, 'Megjött édesanyám.'],
          [text`할머니${bold('께서')} 김치를 만드세요.`, 'A nagymama kimcsit készít.'],
          ['선생님이 오셨어요.', 'Megjött a tanár úr. (beszélt nyelv: 이 + tiszteleti ige)'],
        ],
      },
    },
    {
      lesson: 2,
      point: 2,
      form: '이/가 아니에요',
      name: 'főnév tagadása („nem …”)',
      studentBookPage: 47,
      vocabularyGrammarPage: 33,
      explanation: [
        paragraph`A ${korean('이에요/예요')} tagadása: „X nem Y”. A tagadott főnév az ${korean('이/가')} partikulát kapja, utána jön az ${korean('아니에요')}.`,
        paragraph`${bold('받침')} után: ${bold('이 아니에요')}, magánhangzó után: ${bold('가 아니에요')}.`,
      ],
      table: {
        additionalNouns: ['물', '구두', '식당', '의자', '학생', '친구', '한국 사람', '옷 가게'],
        kind: 'noun',
        nouns: [
          'vowelEnding',
          'consonantEnding',
          { word: '의사', description: 'magánhangzóra végződik' },
          { word: '학생', description: 'mássalhangzóra végződik' },
        ],
        nounColumns: [{ header: 'Tagadás', conjugate: noun => nounWithParticle(noun, '이 아니에요', '가 아니에요') }],
      },
      examples: [
        [text`저는 학생${bold('이 아니에요')}.`, 'Nem vagyok diák.'],
        [text`이건 제 우산${bold('이 아니에요')}.`, 'Ez nem az én esernyőm.'],
        [
          text`가: 의사예요? 나: 아니요, 의사${bold('가 아니에요')}. 간호사예요.`,
          '– Orvos vagy? – Nem, nem vagyok orvos. Ápoló vagyok.',
        ],
        [text`제 전화번호는 010-1234가 ${bold('아니에요')}.`, 'Az én telefonszámom nem 010-1234.'],
      ],
    },
    {
      lesson: 3,
      point: 1,
      form: '이, 그, 저',
      name: 'mutató szavak: ez, az (nálad), az (ott)',
      studentBookPage: 54,
      vocabularyGrammarPage: 34,
      explanation: [
        paragraph`Főnév előtt állnak, és a dolog ${bold('távolságát')} jelzik:`,
        list(
          text`${bold('이')}: a beszélőhöz közel („ez”)`,
          text`${bold('그')}: a hallgatóhoz közel, vagy a már említett dolog („az”)`,
          text`${bold('저')}: mindkettőtől távol („amaz, az ott”)`
        ),
      ],
      customContent: [
        simpleTable(
          ['', '이 (itt nálam)', '그 (nálad)', '저 (ott)'],
          [
            [
              '+ 것 „dolog”',
              koreanWithTranslation('이것 → 이거', 'ez (a dolog)'),
              koreanWithTranslation('그것 → 그거', 'az (ott nálad)'),
              koreanWithTranslation('저것 → 저거', 'az (ott messze)'),
            ],
            [
              '+ 사람',
              koreanWithTranslation('이 사람', 'ez az ember'),
              koreanWithTranslation('그 사람', 'az az ember (nálad)'),
              koreanWithTranslation('저 사람', 'az az ember (ott)'),
            ],
            [
              'hely',
              koreanWithTranslation('여기', 'itt'),
              koreanWithTranslation('거기', 'ott (nálad)'),
              koreanWithTranslation('저기', 'amott'),
            ],
          ]
        ),
      ],
      examples: [
        [text`${bold('이')} 책은 제 책이에요.`, 'Ez a könyv az enyém.'],
        [text`${bold('그')} 가방은 누구 거예요?`, 'Kié az a táska (ott nálad)?'],
        [text`${bold('저')} 사람은 우리 선생님이에요.`, 'Az az ember ott a tanárunk.'],
        [text`${bold('이거')} 얼마예요?`, 'Mennyibe kerül ez?'],
      ],
      ownNote: [
        paragraph`Beszédben az ${korean('이것, 그것, 저것')} rövidül: ${korean('이거, 그거, 저거')}; partikulával: ${korean('이게 (= 이것이), 이건 (= 이것은), 이걸 (= 이것을)')}. A ${korean('여기 / 거기 / 저기')} („itt / ott / amott”) ugyanezt a hármasságot követi.`,
      ],
    },
    {
      lesson: 3,
      point: 2,
      form: '에 있다, 없다',
      name: 'hol van / nincs valami',
      studentBookPage: 55,
      vocabularyGrammarPage: 35,
      explanation: [
        paragraph`Hely + ${korean('에')} + ${korean('있다/없다')}: megmondja, ${bold('hol van')} (vagy nincs) valaki, valami. Az ${korean('에')} minden főnév után ugyanaz. Gyakran helyhatározó szóval együtt: ${korean('책상 옆에')} „az asztal mellett”.`,
      ],
      customContent: [
        simpleTable(
          ['Helyviszony', 'Koreai', 'Példa'],
          [
            ['előtt', koreanGlossedInRow('앞'), koreanWithTranslation('학교 앞에', 'az iskola előtt')],
            ['mögött', koreanGlossedInRow('뒤'), koreanWithTranslation('집 뒤에', 'a ház mögött')],
            ['mellett', koreanGlossedInRow('옆'), koreanWithTranslation('책상 옆에', 'az íróasztal mellett')],
            ['fölött, -on', koreanGlossedInRow('위'), koreanWithTranslation('책상 위에', 'az íróasztalon')],
            ['alatt', koreanGlossedInRow('아래 / 밑'), koreanWithTranslation('의자 아래에', 'a szék alatt')],
            ['benn', koreanGlossedInRow('안'), koreanWithTranslation('가방 안에', 'a táskában')],
            ['kinn', koreanGlossedInRow('밖'), koreanWithTranslation('교실 밖에', 'az osztálytermen kívül')],
          ]
        ),
      ],
      examples: [
        [text`가방이 책상 옆${bold('에 있어요')}.`, 'A táska az íróasztal mellett van.'],
        [text`교실에 시계가 ${bold('없어요')}.`, 'Az osztályteremben nincs óra.'],
        [
          text`가: 화장실이 어디${bold('에 있어요')}? 나: 일 층${bold('에 있어요')}.`,
          '– Hol van a mosdó? – A földszinten (1. emeleten).',
        ],
        [text`지갑이 가방 안${bold('에 없어요')}.`, 'A pénztárca nincs a táskában.'],
      ],
      ownNote: [
        paragraph`A ${korean('있다/없다')} birtoklást is jelent: ${korean('저는 동생이 있어요')} = „Van egy öcsém/húgom.”`,
      ],
      honorific: {
        rows: [
          ['있다 (személy)', 'ott van, tartózkodik', '계시다', 'ott van (tiszteleti)'],
          ['없다 (személy)', 'nincs ott', '안 계시다', 'nincs ott (tiszteleti)'],
          ['있다 (birtoklás)', 'van neki', '있으시다', 'van neki (tiszteleti)'],
        ],
        note: [
          paragraph`Ha egy ${bold('tisztelt személy')} tartózkodási helyéről beszélünk, a ${korean('있다')} helyett ${korean('계시다')} áll. Ha viszont a tisztelt személynek ${bold('van valamije')} (idő, gyerek, kérdés), a szabályos ${korean('있으시다')} a helyes, nem a ${korean('계시다')}.`,
        ],
        examples: [
          [text`선생님이 교실에 ${bold('계세요')}.`, 'A tanár úr az osztályteremben van.'],
          [text`아버지는 지금 집에 ${bold('안 계세요')}.`, 'Édesapám most nincs otthon.'],
          [text`내일 시간 ${bold('있으세요')}?`, 'Holnap van ideje?'],
        ],
        correctIncorrect: [
          { correct: '할머니가 방에 계세요.', translation: 'A nagymama a szobában van.' },
          { incorrect: '할머니가 방에 있으세요.', reason: 'helynél 계시다 kell' },
        ],
      },
    },
    {
      lesson: 4,
      point: 1,
      form: '-아요/어요',
      name: 'udvarias jelen idő (해요체)',
      studentBookPage: 62,
      vocabularyGrammarPage: 36,
      explanation: [
        paragraph`Ige vagy melléknév tövéhez kapcsolódik, cselekvést vagy állapotot fejez ki ${bold('udvarias, hétköznapi stílusban')}. Kijelentésre és kérdésre is jó, a különbséget csak a hanglejtés adja.`,
        paragraph`Ha a tő utolsó magánhangzója ${bold('ㅏ vagy ㅗ')}: ${bold('-아요')}, minden más magánhangzó után: ${bold('-어요')}, a ${bold('하다')} → ${bold('해요')}. A magánhangzók összevonásáról az ${reference('rule-2')} pontja szól.`,
      ],
      table: {
        additionalWords: [
          '보다',
          '먹다',
          '일하다',
          '사다',
          '읽다',
          '공부하다',
          '자다',
          '마시다',
          '요리하다',
          '만나다',
          '듣다',
          '좋아하다',
        ],
        sampleSet: 'verbsAndAdjectives',
        columns: [{ header: '-아요/어요', conjugate: word => withAOrEo(word, '요') }],
      },
      examples: [
        [text`지금 뭐 ${bold('해요')}?`, 'Mit csinálsz most?'],
        [text`책을 ${bold('읽어요')}.`, 'Könyvet olvasok.'],
        [text`커피를 ${bold('마셔요')}.`, 'Kávét iszom.'],
        [text`음악을 ${bold('들어요')}.`, 'Zenét hallgatok.', 'ㄷ-rendhagyó: 듣다 → 들어요'],
        [text`요즘 정말 ${bold('바빠요')}.`, 'Mostanában nagyon elfoglalt vagyok.', '으-kiesés: 바쁘다 → 바빠요'],
      ],
    },
    {
      lesson: 4,
      point: 2,
      form: '을/를',
      name: 'tárgyjelölő',
      studentBookPage: 63,
      vocabularyGrammarPage: 37,
      explanation: [
        paragraph`Főnév után jelöli a mondat ${bold('tárgyát')} (kit? mit?). ${bold('받침')} után: ${bold('을')}, magánhangzó után: ${bold('를')}.`,
      ],
      table: {
        additionalNouns: ['밥', '사과', '책', '영화', '음악', '친구', '학생', '커피'],
        kind: 'noun',
        nouns: [
          'vowelEnding',
          'consonantEnding',
          { word: '커피', description: 'magánhangzóra végződik' },
          { word: '빵', description: 'mássalhangzóra végződik' },
        ],
        nounColumns: [{ header: '을/를', conjugate: noun => nounWithParticle(noun, '을', '를') }],
      },
      examples: [
        [text`한국어${bold('를')} 공부해요.`, 'Koreait tanulok.'],
        [text`빵${bold('을')} 먹어요.`, 'Kenyeret eszem.'],
        [text`친구${bold('를')} 만나요.`, 'Találkozom a barátommal.'],
        [text`영화${bold('를')} 봐요.`, 'Filmet nézek.'],
      ],
      ownNote: [
        paragraph`Beszédben gyakran elmarad: ${korean('밥 먹어요')}. Figyelem: néhány ige mást vonz, mint a magyarban: ${korean('친구를 만나요')} „a barátommal találkozom” (koreaiul tárgy), ${korean('버스를 타요')} „buszra szállok”.`,
      ],
    },
    {
      lesson: 5,
      point: 1,
      form: '에 가다',
      name: 'hová megy („-ba/-be, -ra/-re megy”)',
      studentBookPage: 70,
      vocabularyGrammarPage: 38,
      explanation: [
        paragraph`Hely + ${korean('에')} + ${korean('가다')}: a mozgás ${bold('célját, irányát')} jelöli. Ugyanígy ${korean('오다')} (jön), ${korean('다니다')} (jár valahová). Az ${korean('에')} minden főnév után ugyanaz.`,
      ],
      examples: [
        [text`편의점${bold('에 가요')}.`, 'A kisboltba megyek.'],
        [text`어디${bold('에 가요')}?`, 'Hová mész?'],
        [text`주말에 백화점${bold('에 가요')}.`, 'Hétvégén az áruházba megyek.'],
        [text`우리 집${bold('에 오세요')}.`, 'Gyere el hozzánk.'],
      ],
    },
    {
      lesson: 5,
      point: 2,
      form: '하고',
      name: '„és” főnevek között',
      studentBookPage: 71,
      vocabularyGrammarPage: 39,
      explanation: [
        paragraph`Két ${bold('főnevet')} köt össze („kenyér ${bold('és')} tej”). Bármilyen főnév után ugyanaz. Helyette használható a ${korean('와/과')} is (magánhangzó után ${korean('와')}, 받침 után ${korean('과')}), ez kicsit írottabb.`,
      ],
      table: {
        kind: 'noun',
        nouns: [
          'vowelEnding',
          'consonantEnding',
          { word: '우유', description: 'magánhangzóra végződik' },
          { word: '빵', description: 'mássalhangzóra végződik' },
        ],
        nounColumns: [
          { header: '하고', conjugate: noun => noun + '하고' },
          { header: '와/과', conjugate: noun => nounWithParticle(noun, '과', '와') },
        ],
      },
      examples: [
        [text`빵${bold('하고')} 우유를 사요.`, 'Kenyeret és tejet veszek.'],
        [text`사과${bold('와')} 배가 있어요.`, 'Van alma és körte.'],
        [text`책${bold('과')} 공책을 샀어요.`, 'Könyvet és füzetet vettem.'],
        [text`친구${bold('하고')} 영화를 봐요.`, 'A barátommal filmet nézek.'],
      ],
      ownNote: [
        paragraph`A ${korean('하고')} és a ${korean('와/과')} jelentése „-val/-vel” is lehet: ${korean('친구하고 같이 가요')} = „A barátommal együtt megyek.” Igéket, mondatokat a ${korean('-고')} köt össze (${reference('1B-07-2')}), nem a ${korean('하고')}.`,
      ],
    },
    {
      lesson: 6,
      point: 1,
      form: '단위 명사',
      name: 'számlálószavak (darab, fő, állat…)',
      studentBookPage: 78,
      vocabularyGrammarPage: 40,
      explanation: [
        paragraph`Megszámolt dolgoknál a szám után ${bold('számlálószó')} áll: ${korean('개')} (darab, tárgy), ${korean('명')} (fő, ember), ${korean('마리')} (állat). Sorrend: ${bold('főnév + szám + számlálószó')}. A számlálószavak előtt a ${bold('koreai eredetű')} számok állnak, és az 1, 2, 3, 4, 20 rövid alakot kap.`,
      ],
      customContent: [
        simpleTable(
          ['Szám', 'Önálló', 'Számlálószó előtt', 'Példa'],
          [
            [
              '1',
              koreanGlossedInRow('하나'),
              koreanGlossedInRow('한'),
              koreanWithTranslation('사과 한 개', 'egy alma'),
            ],
            ['2', koreanGlossedInRow('둘'), koreanGlossedInRow('두'), koreanWithTranslation('학생 두 명', 'két diák')],
            [
              '3',
              koreanGlossedInRow('셋'),
              koreanGlossedInRow('세'),
              koreanWithTranslation('고양이 세 마리', 'három macska'),
            ],
            [
              '4',
              koreanGlossedInRow('넷'),
              koreanGlossedInRow('네'),
              koreanWithTranslation('빵 네 개', 'négy (darab) kenyér'),
            ],
            [
              '5–10',
              koreanWithTranslation('다섯, 여섯, 일곱, 여덟, 아홉, 열', 'öt, hat, hét, nyolc, kilenc, tíz'),
              'változatlan',
              koreanWithTranslation('사과 다섯 개', 'öt alma'),
            ],
            ['20', koreanGlossedInRow('스물'), koreanGlossedInRow('스무'), koreanWithTranslation('스무 명', 'húsz fő')],
          ]
        ),
      ],
      examples: [
        [text`사과 다섯 ${bold('개')} 주세요.`, 'Öt almát kérek.'],
        [text`우리 반에 학생이 열두 ${bold('명')} 있어요.`, 'Az osztályunkban tizenkét diák van.'],
        [text`고양이 두 ${bold('마리')}가 있어요.`, 'Két macskám van.'],
        [text`콜라 한 ${bold('병')}하고 커피 두 ${bold('잔')} 주세요.`, 'Egy üveg kólát és két csésze kávét kérek.'],
      ],
      ownNote: [
        paragraph`További gyakori számlálószavak: ${korean('병')} (üveg), ${korean('잔')} (pohár, csésze), ${korean('권')} (könyv), ${korean('장')} (lap, jegy), ${korean('살')} (életév), ${korean('분')} (fő, tiszteleti). Ezek mind koreai eredetű számot kapnak. Kérdés: ${korean('몇 개예요?')} „Hány darab?”`,
      ],
    },
    {
      lesson: 6,
      point: 2,
      form: '-(으)세요',
      name: 'udvarias kérés, felszólítás',
      studentBookPage: 79,
      vocabularyGrammarPage: 41,
      explanation: [
        paragraph`Igéhez kapcsolódik, és udvarias ${bold('kérést vagy felszólítást')} fejez ki („tessék …”, „kérem, …”).`,
        paragraph`${bold('받침')} után: ${bold('-으세요')}, magánhangzó után: ${bold('-세요')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik, és ${bold('-세요')} jön: ${korean('만들다 → 만드세요')}.`,
      ],
      table: {
        additionalWords: ['앉다', '가다', '읽다', '보다', '듣다', '대답하다'],
        sampleSet: 'verbs',
        columns: [{ header: '-(으)세요', conjugate: word => withEu(word, '세요') }],
      },
      examples: [
        [text`여기 앉${bold('으세요')}.`, 'Kérem, üljön le ide.'],
        [text`사과 다섯 개 주${bold('세요')}.`, 'Öt almát kérek.'],
        [text`천천히 말해 주${bold('세요')}.`, 'Kérem, beszéljen lassan.'],
        [text`이 노래를 들${bold('으세요')}.`, 'Hallgassa meg ezt a dalt.', 'ㄷ-rendhagyó: 듣다 → 들으세요'],
      ],
      ownNote: [paragraph`Tiltás: ${korean('-지 마세요')} (${reference('2B-05-2')}).`],
      honorific: {
        rows: [
          ['먹다 / 마시다', 'eszik / iszik', '드세요', 'egyen / igyon'],
          ['자다', 'alszik', '주무세요', 'aludjon'],
          ['있다', 'ott van, marad', '계세요', 'maradjon'],
          ['말하다', 'mond, beszél', '말씀하세요', 'mondja'],
        ],
        note: [
          paragraph`A ${korean('-(으)세요')} maga is udvarias, tiszteleti alak. Néhány igének azonban ${bold('külön tiszteleti szava')} van, és ezeknél nem a sima ${korean('-(으)세요')}-t, hanem a külön szót használjuk.`,
        ],
        examples: [
          [text`맛있게 ${bold('드세요')}.`, 'Jó étvágyat!'],
          [text`안녕히 ${bold('주무세요')}.`, 'Jó éjszakát! (tiszteleti)'],
          [text`안녕히 ${bold('계세요')}.`, 'Viszontlátásra! (annak mondjuk, aki marad)'],
          [text`천천히 ${bold('말씀하세요')}.`, 'Mondja nyugodtan, lassan.'],
        ],
        correctIncorrect: [
          { correct: '맛있게 드세요.', translation: 'Jó étvágyat!', note: 'tiszteleti alak' },
          { incorrect: '맛있게 먹으세요.', reason: 'nyelvtanilag képezhető, de idősebbnek nem így mondjuk' },
        ],
      },
    },
    {
      lesson: 7,
      point: 1,
      form: '에 (시간)',
      name: 'időpont („-kor, -n”)',
      studentBookPage: 86,
      vocabularyGrammarPage: 42,
      explanation: [
        paragraph`Időt jelölő főnév után azt mondja meg, ${bold('mikor')} történik valami: ${korean('세 시에')} „háromkor”, ${korean('월요일에')} „hétfőn”. Minden főnév után ugyanaz.`,
        paragraph`${bold(text`Nem kap ${korean('에')}-t:`)} ${korean('오늘, 내일, 어제, 언제, 지금, 매일, 요즘')}. A ${korean('이에요/예요')} elé sem tesszük: ${korean('몇 시예요?')}`,
      ],
      examples: [
        [text`일곱 시${bold('에')} 시작해요.`, 'Hétkor kezdődik.'],
        [text`토요일${bold('에')} 친구를 만나요.`, 'Szombaton találkozom a barátommal.'],
        [text`3월 15일${bold('에')} 한국에 가요.`, 'Március 15-én Koreába megyek.'],
        ['내일 뭐 해요?', 'Mit csinálsz holnap? (a 내일 nem kap 에-t)'],
      ],
      correctIncorrect: [
        { correct: '오늘 공부해요.', translation: 'Ma tanulok.' },
        { incorrect: '오늘에 공부해요.', reason: 'az 오늘 („ma”) nem kap 에-t' },
      ],
    },
    {
      lesson: 7,
      point: 2,
      form: '○시 ○분',
      name: 'az idő kifejezése (óra, perc)',
      studentBookPage: 87,
      vocabularyGrammarPage: 43,
      explanation: [
        paragraph`Az ${bold('órát')} (${korean('시')}) ${bold('koreai eredetű')} számmal mondjuk (${korean('한, 두, 세…')}), a ${bold('percet')} (${korean('분')}) ${bold('kínai eredetű')} számmal (${korean('일, 이, 삼…')}).`,
      ],
      customContent: [
        simpleTable(
          ['Idő', 'Koreaiul'],
          [
            ['1:00', koreanWithTranslation('한 시', 'egy óra')],
            ['2:10', koreanWithTranslation('두 시 십 분', 'két óra tíz (perc)')],
            ['3:30', koreanWithTranslation('세 시 삼십 분 = 세 시 반', 'fél négy (szó szerint: három óra fél)')],
            ['4:45', koreanWithTranslation('네 시 사십오 분', 'háromnegyed öt (négy óra negyvenöt)')],
            ['11:05', koreanWithTranslation('열한 시 오 분', 'tizenegy óra öt (perc)')],
            ['12:00', koreanWithTranslation('열두 시', 'tizenkét óra')],
          ]
        ),
      ],
      examples: [
        [text`지금 몇 ${bold('시')}예요?`, 'Hány óra van most?'],
        [text`수업이 아홉 ${bold('시')} 삼십 ${bold('분')}에 시작해요.`, 'Az óra fél tízkor kezdődik.'],
        [text`열두 ${bold('시')}에 점심을 먹어요.`, 'Tizenkét órakor ebédelek.'],
        [text`다섯 ${bold('시')} 반에 만나요.`, 'Fél hatkor találkozunk.'],
      ],
      ownNote: [
        paragraph`${korean('반')} = fél (${korean('두 시 반')} = fél három). ${korean('오전')} = délelőtt, ${korean('오후')} = délután: ${korean('오후 세 시')}. „-tól -ig” időre: ${korean('아홉 시부터 다섯 시까지')}.`,
      ],
    },
    {
      lesson: 8,
      point: 1,
      form: '안',
      name: 'rövid tagadás („nem”)',
      studentBookPage: 94,
      vocabularyGrammarPage: 44,
      explanation: [
        paragraph`Az ige vagy melléknév ${bold('elé')} téve tagad: ${korean('안 가요')} „nem megyek”. ${bold('Főnév + 하다')} igéknél a ${korean('안')} a ${korean('하다')} elé kerül: ${korean('공부 안 해요')}. A ${korean('있다, 없다')} nem kap ${korean('안')}-t (${korean('있다')} tagadása: ${korean('없다')}).`,
      ],
      table: {
        additionalWords: [
          '가다',
          '일하다',
          '좋다',
          '먹다',
          '공부하다',
          '비싸다',
          '오다',
          '요리하다',
          '덥다',
          '좋아하다',
          '운동하다',
          '춥다',
        ],
        existential: false,
        sampleSet: 'verbsAndAdjectives',
        columns: [{ header: '안 + -아요/어요', conjugate: negateWithAn }],
      },
      examples: [
        [text`오늘은 날씨가 ${bold('안')} 추워요.`, 'Ma nincs hideg.', 'ㅂ-rendhagyó: 춥다 → 추워요'],
        [text`저는 커피를 ${bold('안')} 마셔요.`, 'Nem iszom kávét.'],
        [text`주말에 공부 ${bold('안')} 해요.`, 'Hétvégén nem tanulok.'],
        [text`이 김치는 ${bold('안')} 매워요.`, 'Ez a kimcsi nem csípős.', 'ㅂ-rendhagyó: 맵다 → 매워요'],
      ],
      correctIncorrect: [
        { correct: '운동 안 해요.', translation: 'Nem sportolok.' },
        { incorrect: '안 운동해요.', reason: 'főnév + 하다 igénél a 안 középre kerül' },
        {
          correct: '피곤하지 않아요 / 안 피곤해요.',
          translation: 'Nem vagyok fáradt.',
          note: 'a 하다 melléknév nem bomlik szét (nem: 피곤 안 해요)',
        },
      ],
      ownNote: [
        paragraph`A hosszú tagadás ${korean('-지 않다')} (${reference('2A-05-2')}) ugyanazt jelenti, csak kicsit írottabb. A „nem tudom megcsinálni” jelentésű tagadás ${korean('못')} (${reference('1B-01-2')}).`,
      ],
    },
    {
      lesson: 8,
      point: 2,
      form: 'ㅂ 불규칙',
      name: 'ㅂ-rendhagyó igék és melléknevek',
      studentBookPage: 95,
      vocabularyGrammarPage: 45,
      explanation: [
        paragraph`Néhány ㅂ-re végződő szónál ${bold('magánhangzóval kezdődő végződés előtt')} a ㅂ ${bold('우')}-vá változik, és ${korean('우 + 어요 = 워요')}: ${korean('덥다 → 더워요')}. Ilyen: ${korean('덥다, 춥다, 맵다, 무겁다, 가볍다, 쉽다, 어렵다')}.`,
        paragraph`Nem minden ㅂ-végű szó rendhagyó: ${korean('입다, 잡다, 좁다')} szabályos (${korean('입어요')}).`,
      ],
      table: {
        additionalWords: ['덥다', '맵다', '쉽다', '가볍다', '춥다', '무겁다', '어렵다', '아름답다'],
        words: [
          createWord('덥다', 'adjective'),
          createWord('춥다', 'adjective'),
          createWord('맵다', 'adjective'),
          createWord('무겁다', 'adjective'),
          createWord('쉽다', 'adjective'),
          createWord('돕다', 'verb'),
        ],
        irregularWords: [createWord('입다', 'verb'), createWord('좁다', 'adjective'), createWord('잡다', 'verb')],
        columns: [
          { header: '-아요/어요', conjugate: word => withAOrEo(word, '요') },
          { header: 'Múlt', conjugate: word => withPast(word, '어요') },
          {
            header: '-(으)ㄴ (jelző)',
            conjugate: word => (word.wordClass === 'adjective' ? withEu(word, 'ㄴ') : withEu(word, 'ㄴ')),
          },
          { header: '-고 (változatlan)', conjugate: word => withPlainStem(word, '고') },
        ],
      },
      irregularRowsOptional: true,
      examples: [
        [text`날씨가 ${bold('더워요')}?`, 'Meleg van?'],
        [text`한국어가 ${bold('어려워요')}?`, 'Nehéz a koreai?'],
        [text`이 가방은 ${bold('가벼워요')}.`, 'Ez a táska könnyű.'],
        [text`동생을 ${bold('도와요')}.`, 'Segítek az öcsémnek.', 'kivétel: 돕다 → 도와요 (nem 도워요)'],
      ],
      ownNote: [
        paragraph`A táblázat második részében (${korean('입다, 좁다, 잡다')}) szabályos szavak vannak: náluk a ㅂ mindig megmarad. Kivétel a rendhagyók közt: ${korean('돕다, 곱다 → 도와요, 고와요')}. A rendhagyóság csak magánhangzós végződés előtt jelentkezik: ${korean('덥고, 덥지만, 덥습니다')} szabályos.`,
      ],
    },
    {
      lesson: 9,
      point: 1,
      form: '에서',
      name: 'a cselekvés helye („-ban/-ben, -on/-en”)',
      studentBookPage: 102,
      vocabularyGrammarPage: 46,
      explanation: [
        paragraph`Hely után azt jelöli, ${bold('hol történik')} egy cselekvés: ${korean('공원에서 산책해요')}. Minden főnév után ugyanaz.`,
      ],
      examples: [
        [text`공원${bold('에서')} 산책했어요.`, 'A parkban sétáltam.'],
        [text`도서관${bold('에서')} 책을 읽어요.`, 'A könyvtárban olvasok.'],
        [text`어디${bold('에서')} 일해요?`, 'Hol dolgozol?'],
        [text`카페${bold('에서')} 친구를 만나요.`, 'A kávézóban találkozom a barátommal.'],
      ],
      ownNote: [
        paragraph`${bold('에 vagy 에서?')} Létige (${korean('있다/없다')}) és mozgás célja (${korean('가다, 오다')}) mellett ${korean('에')}: ${korean('집에 있어요, 집에 가요')}. Ha a helyen ${bold('csinálunk valamit')}: ${korean('에서')}: ${korean('집에서 쉬어요')}. Az ${korean('에서')} „-ból/-ből, -tól/-től” (kiindulópont) is lehet: ${korean('어디에서 왔어요?')} „Honnan jöttél?”`,
      ],
      correctIncorrect: [
        { correct: '도서관에서 공부해요.', translation: 'A könyvtárban tanulok.' },
        {
          incorrect: '도서관에 공부해요.',
          reason: 'a cselekvés helyét 에서 jelöli; az 에 létezésnél és a mozgás céljánál áll',
        },
      ],
    },
    {
      lesson: 9,
      point: 2,
      form: '-았/었-',
      name: 'múlt idő',
      studentBookPage: 103,
      vocabularyGrammarPage: 47,
      explanation: [
        paragraph`Ige vagy melléknév tövéhez kapcsolódik, ${bold('múltbeli cselekvést vagy állapotot')} fejez ki. Utána jön a mondatvég, pl. ${korean('-어요')}: ${korean('갔어요')}.`,
        paragraph`${bold('ㅏ, ㅗ')} után: ${bold('-았-')}, egyéb magánhangzó után: ${bold('-었-')}, ${bold('하다')} → ${bold('했-')}. Ugyanúgy vonódik össze, mint a ${korean('-아요/어요')}.`,
      ],
      table: {
        additionalWords: [
          '가다',
          '먹다',
          '일하다',
          '보다',
          '쉬다',
          '공부하다',
          '좋다',
          '읽다',
          '따뜻하다',
          '만나다',
          '춥다',
          '수영하다',
        ],
        sampleSet: 'verbsAndAdjectives',
        columns: [{ header: '-았어요/었어요', conjugate: word => withPast(word, '어요') }],
      },
      examples: [
        [text`주말에 공원에서 산책${bold('했어요')}.`, 'Hétvégén sétáltam a parkban.'],
        [text`어제 친구를 ${bold('만났어요')}.`, 'Tegnap találkoztam a barátommal.'],
        [text`아침에 빵을 ${bold('먹었어요')}.`, 'Reggel kenyeret ettem.'],
        [text`어제는 날씨가 ${bold('추웠어요')}.`, 'Tegnap hideg volt.', 'ㅂ-rendhagyó: 춥다 → 추웠어요'],
      ],
      ownNote: [
        paragraph`Főnév + 이다 múlt ideje: 받침 után ${korean('-이었어요')}, magánhangzó után ${korean('-였어요')}: ${korean('학생이었어요, 의사였어요')}.`,
      ],
    },
    {
      lesson: 10,
      point: 1,
      form: '-고 싶다',
      name: '„szeretnék …” (vágy)',
      studentBookPage: 110,
      vocabularyGrammarPage: 48,
      explanation: [
        paragraph`Ige után azt fejezi ki, amit a beszélő ${bold('szeretne, kíván')}. A tő végétől függetlenül mindig ${korean('-고 싶다')}. Ha az alany ${bold('harmadik személy')}: ${korean('-고 싶어 하다')}.`,
      ],
      table: {
        additionalWords: ['가다', '먹다', '만들다', '요리하다'],
        sampleSet: 'verbs',
        columns: [
          { header: '-고 싶어요', conjugate: word => withPlainStem(word, '고 싶어요') },
          { header: '3. személy: -고 싶어 해요', conjugate: word => withPlainStem(word, '고 싶어 해요') },
        ],
      },
      examples: [
        [text`놀이공원에 가${bold('고 싶어요')}.`, 'Vidámparkba szeretnék menni.'],
        [text`뭐 먹${bold('고 싶어요')}?`, 'Mit szeretnél enni?'],
        [
          text`동생은 한국 음악을 듣${bold('고 싶어 해요')}.`,
          'Az öcsém koreai zenét szeretne hallgatni.',
          'a -고 előtt a ㄷ-rendhagyó nem változik: 듣고',
        ],
        [text`주말에 집에서 쉬${bold('고 싶어요')}.`, 'Hétvégén otthon szeretnék pihenni.'],
      ],
      ownNote: [
        paragraph`A ${korean('-고')} mássalhangzóval kezdődik, ezért itt ${bold('minden')} szó szabályos (${korean('듣고, 돕고, 만들고')}). A ${korean('싶다')} maga ragozódik: ${korean('싶어요, 싶었어요, 싶습니다')}.`,
      ],
    },
    {
      lesson: 10,
      point: 2,
      form: '-(으)ㄹ까요? (제안)',
      name: '„… -junk?” (javaslat)',
      studentBookPage: 111,
      vocabularyGrammarPage: 49,
      explanation: [
        paragraph`Ige után a hallgató ${bold('véleményét kérdezi')} egy közös cselekvésről: „Menjünk…?”, „Együnk…?”.`,
        paragraph`${bold('받침')} után: ${bold('-을까요?')}, magánhangzó után: ${bold('-ㄹ까요?')}, ${bold('ㄹ-tőnél')}: ${bold('-까요?')} (${korean('만들다 → 만들까요?')}).`,
      ],
      table: {
        additionalWords: ['먹다', '가다', '앉다', '배우다', '찍다', '산책하다', '걷다', '만들다'],
        sampleSet: 'verbs',
        columns: [{ header: '-(으)ㄹ까요?', conjugate: word => withEu(word, 'ㄹ까요?') }],
      },
      examples: [
        [text`우리 같이 놀이공원에 ${bold('갈까요')}?`, 'Elmenjünk együtt a vidámparkba?'],
        [text`뭐 먹${bold('을까요')}?`, 'Mit együnk?'],
        [text`같이 음악을 들${bold('을까요')}?`, 'Hallgassunk együtt zenét?', 'ㄷ-rendhagyó: 듣다 → 들을까요?'],
        [text`가: 몇 시에 만${bold('날까요')}? 나: 세 시에 만나요.`, '– Hánykor találkozzunk? – Háromkor.'],
      ],
      ownNote: [
        paragraph`Válaszként gyakran ${korean('-아요/어요')} (javaslat, ${reference('1B-06-2')}): ${korean('좋아요, 같이 가요!')} Ugyanez a végződés ${bold('találgató kérdés')} is lehet („vajon…?”), ezt a ${reference('2A-02-2')} tanítja.`,
      ],
    },
  ],
} satisfies BookData;
