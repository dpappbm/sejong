import { bold, lineBreak, reference, text } from '../lib/richText';
import type { LessonPronunciation, PronunciationCategory, PronunciationData } from './types';

const categories: PronunciationCategory[] = [
  {
    id: 'linking',
    korean: '연음',
    hungarian: 'Átkötés',
    intro:
      'A 받침 átkerül a következő, magánhangzóval kezdődő szótag elejére: 음악 [으막], 먹어요 [머거요]. Kettős 받침-nél csak a második mássalhangzó kerül át: 읽어요 [일거요]. Ez a legalapvetőbb kiejtési szabály, a többi erre épül.',
  },
  {
    id: 'final-consonant-sound',
    korean: '평파열음화',
    hungarian: 'A 받침 hangja',
    intro:
      'A szótag végén csak hét hang lehet: [ㄱ], [ㄴ], [ㄷ], [ㄹ], [ㅁ], [ㅂ], [ㅇ]. Minden más 받침 ezek valamelyikére egyszerűsödik. A többi szabály ezzel a hangzással számol: a „[ㄷ] hangzású 받침” a ㄷ mellett a ㅅ, ㅆ, ㅈ, ㅊ, ㅌ 받침-et is jelenti.',
  },
  {
    id: 'double-final-consonant',
    korean: '겹받침',
    hungarian: 'Kettős 받침',
    intro:
      'A kettős 받침-ből a szótag végén és mássalhangzó előtt csak az egyik mássalhangzó hallatszik. Magánhangzó előtt a második átkerül a következő szótagra. Hogy melyik marad meg, azt betűpáronként kell megjegyezni: ㄶ → [ㄴ], ㄼ → [ㄹ], ㄺ → [ㄱ] (ㄱ előtt [ㄹ]).',
  },
  {
    id: 'tensification',
    korean: '경음화',
    hungarian: 'Keményedés',
    intro:
      'Bizonyos helyzetekben a sima ㄱ, ㄷ, ㅂ, ㅅ, ㅈ a feszes (kemény) párjává válik: [ㄲ], [ㄸ], [ㅃ], [ㅆ], [ㅉ]. A leggyakoribb eset a [ㄱ], [ㄷ], [ㅂ] hangzású 받침 utáni helyzet, ez mindig bekövetkezik. A többi esetet a tankönyv leckénként hozza: -(으)ㄹ után, 사이시옷 után, összetett szavakban és kínai eredetű szavakban.',
  },
  {
    id: 'aspiration',
    korean: '격음화',
    hungarian: 'Hehezetesedés',
    intro:
      'A ㅎ és a mellette álló ㄱ, ㄷ, ㅂ, ㅈ összeolvad, és a hehezetes párjuk lesz belőlük: [ㅋ], [ㅌ], [ㅍ], [ㅊ]. Mindegy, melyik áll elöl: 축하 [추카] (ㄱ + ㅎ), 좋다 [조타] (ㅎ + ㄷ).',
  },
  {
    id: 'nasalization',
    korean: '비음화',
    hungarian: 'Orrhangúsodás',
    intro:
      'Orrhang (ㄴ, ㅁ) előtt a [ㄱ], [ㄷ], [ㅂ] hangzású 받침 is orrhanggá válik: [ㅇ], [ㄴ], [ㅁ]. Ide tartozik az is, amikor az ㅁ, ㅇ (és a ㄱ, ㅂ) után álló ㄹ [ㄴ]-nek hangzik: 음료수 [음뇨수], 독립 [동닙].',
  },
  {
    id: 'liquidization',
    korean: '유음화',
    hungarian: 'Likvidásodás',
    intro:
      'Ha ㄴ és ㄹ kerül egymás mellé, bármelyik sorrendben, mindkettő [ㄹ]-nek hangzik: 연락 [열락], 설날 [설랄].',
  },
  {
    id: 'n-insertion',
    korean: 'ㄴ 첨가',
    hungarian: 'ㄴ betoldása',
    intro:
      'Összetett szavakban és egybeejtett szókapcsolatokban egy [ㄴ] toldódik be, ha az első tag 받침-re végződik, a második pedig 이-vel (vagy 야, 여, 요, 유-val) kezdődik. Utána az orrhangúsodás is működhet: 한국 요리 [한궁뇨리].',
  },
  {
    id: 'h-weakening',
    korean: 'ㅎ 탈락 · ㅎ 약화',
    hungarian: 'A ㅎ kiesése és gyengülése',
    intro:
      'Magánhangzó előtt a ㅎ 받침 nem hangzik: 좋아요 [조아요]. Az ㄴ, ㄹ, ㅁ, ㅇ után álló ㅎ beszédben gyengén szól, vagy el is marad: 전화 [저놔], 운항 [우낭].',
  },
  {
    id: 'palatalization',
    korean: '구개음화',
    hungarian: 'Palatalizáció',
    intro: 'A ㄷ és ㅌ 받침 a 이 előtt [ㅈ]-vé, illetve [ㅊ]-vé válik: 같이 [가치], 굳이 [구지].',
  },
  {
    id: 'consonant-series',
    korean: '평음 · 경음 · 격음',
    hungarian: 'Sima, feszes és hehezetes mássalhangzók',
    intro:
      'A koreai zárhangok hármas sorokban állnak: sima (ㄱ ㄷ ㅂ ㅅ ㅈ), feszes (ㄲ ㄸ ㅃ ㅆ ㅉ) és hehezetes (ㅋ ㅌ ㅍ ㅊ). A feszesnél a torok megfeszül, és alig jön levegő. A hehezetest erős levegőfújás kíséri. A sima a kettő között van, lágyan ejtjük.',
  },
  {
    id: 'vowels',
    korean: '모음',
    hungarian: 'Magánhangzók',
    intro:
      'Néhány magánhangzónál a tankönyv egyszerűbb vagy élőbeszédes ejtést is megad: a ㅈ, ㅉ, ㅊ utáni ㅛ [ㅗ]-nak hangzik, a ㅢ ejtése attól függ, hol áll (lásd lent), a ㅚ [ㅞ]-nek, a végződésekben pedig a ㅗ beszédben gyakran [ㅜ] (하고요 [하구요]).',
    extra: {
      title: 'Az ㅢ négy esete',
      rows: [
        [
          'szó elején, mássalhangzó nélkül (의)',
          '[의]',
          [
            ['의사', '의사', 'orvos'],
            ['의자', '의자', 'szék'],
          ],
        ],
        [
          'mássalhangzó után (희, 늬, 띄 …)',
          'mindig [이]',
          [
            ['희망', '히망', 'remény'],
            ['무늬', '무니', 'minta'],
            ['띄어쓰기', '띠어쓰기', 'szóköz (írásban)'],
          ],
        ],
        [
          'a szó belsejében, nem első szótagként',
          '[의] vagy [이]',
          [
            ['회의', '회의/회이', 'értekezlet'],
            ['주의', '주의/주이', 'figyelem'],
          ],
        ],
        [
          'birtokos partikula (-의: „valakinek a …”)',
          '[의] vagy [에]',
          [
            ['나의', '나의/나에', 'az én …-m'],
            ['친구의 책', '친구의/친구에 책', 'a barátom könyve'],
          ],
        ],
      ],
      note: 'Élőbeszédben gyakran a legegyszerűbb ejtés hallható: [이], partikulaként [에].',
    },
  },
  {
    id: 'loanwords',
    korean: '외래어 발음',
    hungarian: 'Jövevényszavak',
    intro:
      'A nyugati jövevényszavakat gyakran keményebben ejtik, mint ahogy írják: 버스 [뻐쓰], 서비스 [써비쓰]. A helyesírás ezt nem jelöli.',
  },
  {
    id: 'intonation',
    korean: '억양',
    hungarian: 'Hanglejtés',
    intro:
      'A mondatvég dallama megváltoztatja a jelentést: ugyanaz a 먹어요 emelkedő (↗) hanglejtéssel kérdés, ereszkedővel (↘) kijelentés. Néhány végződésnek (-네요, -거든, -(으)ㄹ 텐데) saját dallama van.',
  },
  {
    id: 'phrasing',
    korean: '끊어 말하기',
    hungarian: 'Tagolás és egybeolvasás',
    intro:
      'A mondatot értelmi egységenként tagoljuk (∨), és nem tartunk szünetet minden szóköznél. Az 안 például egybeolvad a következő igével.',
  },
];

const lessons: Record<string, LessonPronunciation> = {
  // ---------- 1A ----------
  '1A-2': {
    category: 'linking',
    studentBookPage: 48,
    sampleWord: '맞아요',
    samplePronunciation: '마자요',
    hungarian: 'így van',
    rule: 'Ha a 받침 után magánhangzóval kezdődő szótag jön, a 받침 átkerül a következő szótag elejére.',
    examples: [
      [text`제 ${bold('이름은')} 안나예요.`, '이르믄', 'A nevem Anna.'],
      [text`저는 ${bold('회사원이에요')}.`, '회사워니에요', 'Irodai dolgozó vagyok.'],
    ],
  },
  '1A-4': {
    category: 'intonation',
    studentBookPage: 64,
    sampleWord: '공부해요? ↗ · 공부해요. ↘',
    samplePronunciation: '',
    hungarian: 'Tanulsz? · Tanulok.',
    rule: 'A kérdő mondat vége emelkedik (↗), minden más mondaté ereszkedik (↘).',
    examples: [
      [
        text`가: 밥을 ${bold('먹어요')}? ↗${lineBreak}나: 네. 밥을 ${bold('먹어요')}. ↘`,
        '',
        'A: Eszel? – B: Igen, eszem.',
      ],
    ],
  },
  '1A-6': {
    category: 'final-consonant-sound',
    studentBookPage: 80,
    sampleWord: '다섯',
    samplePronunciation: '다섣',
    hungarian: 'öt',
    rule: 'A szótag végén csak hét hang lehet: [ㄱ], [ㄴ], [ㄷ], [ㄹ], [ㅁ], [ㅂ], [ㅇ]. A ㅋ és a ㄲ [ㄱ]-nek hangzik; a ㅅ, ㅆ, ㅈ, ㅊ, ㅌ [ㄷ]-nek; a ㅍ [ㅂ]-nek.',
    examples: [
      [bold('책, 밖, 부엌'), '책, 박, 부억', 'könyv, kint, konyha'],
      [bold('옷, 꽃, 끝'), '옫, 꼳, 끋', 'ruha, virág, vég'],
      [bold('밥, 앞, 옆'), '밥, 압, 엽', 'rizs (étel), elöl, mellett'],
    ],
  },
  '1A-8': {
    category: 'phrasing',
    studentBookPage: 96,
    sampleWord: '안 더워요',
    samplePronunciation: '안더워요',
    hungarian: 'nincs meleg',
    rule: 'Az 안-t külön írjuk, de olvasáskor egybeolvad a következő szóval, nincs előtte szünet.',
    examples: [
      [text`지금은 비가 ${bold('안 와요')}.`, '아놔요', 'Most nem esik az eső.'],
      [text`저는 여름을 ${bold('안 좋아해요')}.`, '안조아해요', 'Nem szeretem a nyarat.'],
    ],
  },
  '1A-10': {
    category: 'h-weakening',
    studentBookPage: 112,
    sampleWord: '좋아요',
    samplePronunciation: '조아요',
    hungarian: 'jó',
    rule: 'Ha a ㅎ 받침 után magánhangzó jön, a ㅎ nem hangzik.',
    examples: [
      [text`운동을 ${bold('좋아해요')}.`, '조아해요', 'Szeretek sportolni.'],
      [text`사람이 ${bold('많아요')}.`, '마나요', 'Sokan vannak.'],
    ],
  },
  // ---------- 1B ----------
  '1B-2': {
    category: 'aspiration',
    studentBookPage: 26,
    sampleWord: '특히',
    samplePronunciation: '트키',
    hungarian: 'különösen',
    rule: 'Ha a ㄱ, ㄷ, ㅂ, ㅈ 받침 után ㅎ jön, összeolvadnak: [ㅋ], [ㅌ], [ㅍ], [ㅊ] lesz belőlük.',
    examples: [
      [text`${bold('백화점에')} 가요.`, '배콰저메', 'Az áruházba megyek.'],
      [text`수업을 ${bold('시작해요')}.`, '시자캐요', 'Elkezdjük az órát.'],
    ],
  },
  '1B-4': {
    category: 'nasalization',
    studentBookPage: 42,
    sampleWord: '있습니다',
    samplePronunciation: ['읻씁니다', '읻씀니다'],
    hungarian: 'van',
    rule: 'Orrhang (ㄴ, ㅁ) előtt a ㄱ, ㄷ, ㅂ 받침 orrhanggá válik: [ㅇ], [ㄴ], [ㅁ].',
    examples: [
      [text`비가 ${bold('옵니다')}.`, '옴니다', 'Esik az eső.'],
      [text`저는 ${bold('한국말을')} 배워요.`, '한궁마를', 'Koreaiul tanulok.'],
    ],
  },
  '1B-6': {
    category: 'tensification',
    studentBookPage: 58,
    sampleWord: '세종학당',
    samplePronunciation: '세종학땅',
    hungarian: 'Szedzsong Intézet',
    rule: 'A [ㄱ], [ㄷ], [ㅂ] hangzású 받침 után a ㄷ [ㄸ]-nek, a ㅂ [ㅃ]-nek hangzik.',
    examples: [
      [text`${bold('깍두기')} 좀 더 주세요.`, '깍뚜기', 'Kérek még egy kis kaktugit (retekkimcsit).'],
      [text`${bold('10분쯤')} 걸려요.`, '십뿐쯤', 'Kb. 10 percig tart.'],
    ],
  },
  '1B-8': {
    category: 'double-final-consonant',
    studentBookPage: 74,
    sampleWord: '괜찮았어요',
    samplePronunciation: ['괜찬았어요', '괜차나써요'],
    hungarian: 'rendben volt',
    rule: 'A kettős 받침 két mássalhangzóból áll. A ㄶ a szótag végén és magánhangzó előtt is [ㄴ]-nek hangzik.',
    examples: [
      [text`가게가 정말 ${bold('많았어요')}.`, '마나써요', 'Tényleg sok bolt volt.'],
      [text`날씨는 ${bold('괜찮아요')}.`, '괜차나요', 'Az idő rendben van.'],
    ],
  },
  '1B-10': {
    category: 'double-final-consonant',
    studentBookPage: 90,
    sampleWord: '여덟',
    samplePronunciation: '여덜',
    hungarian: 'nyolc',
    rule: 'A ㄼ a szótag végén és mássalhangzó előtt [ㄹ]-nek hangzik. Ha magánhangzó jön utána, mindkét mássalhangzó hallatszik.',
    examples: [
      [text`${bold('여덟')} 명이에요.`, '여덜', 'Nyolcan vagyunk.'],
      [text`방이 ${bold('넓어요')}.`, '널버요', 'Tágas a szoba.'],
    ],
  },
  '1B-12': {
    category: 'aspiration',
    studentBookPage: 106,
    sampleWord: '못 했어요',
    samplePronunciation: ['몯해써요', '모태써요'],
    hungarian: 'nem tudtam megcsinálni',
    rule: 'A ㄱ, ㄷ, ㅂ, ㅈ 받침 a következő ㅎ-val összeolvad: [ㅋ], [ㅌ], [ㅍ], [ㅊ] lesz belőle. Két szó határán is.',
    examples: [
      [text`생일을 ${bold('축하해요')}.`, '추카해요', 'Boldog születésnapot!'],
      [text`동생에게 ${bold('입학')} 선물을 했어요.`, '이팍', 'Ajándékot adtam az öcsémnek, mert iskolába került.'],
    ],
  },
  // ---------- 2A ----------
  '2A-1': {
    category: 'n-insertion',
    studentBookPage: 18,
    sampleWord: '무슨 일',
    samplePronunciation: '무슨닐',
    hungarian: 'milyen munka; mi történt',
    rule: 'Ha két szót egyben ejtünk, az első 받침-re végződik, és a második 이-vel kezdődik, ㄴ toldódik be: [니].',
    examples: [
      [text`빵을 ${bold('만드는 일을')} 해요.`, '만드는니를', 'Kenyérsütéssel foglalkozom.'],
      [text`${bold('서른일곱')} 살이에요.`, '서른닐곱', '37 éves vagyok.'],
    ],
  },
  '2A-3': {
    category: 'consonant-series',
    studentBookPage: 34,
    sampleWord: '',
    samplePronunciation: '',
    hungarian: '',
    rule: 'Figyelj a ㅈ, ㅉ, ㅊ kiejtésére! A ㅈ lágy. A ㅉ-nél a legfeszesebb a torok. A ㅊ-nél jön ki a legtöbb levegő.',
    examples: [
      [text`같이 ${bold('저녁')} 먹어요.`, '저녁', 'Vacsorázzunk együtt.'],
      [text`${bold('아침 7시쯤에')} 일어나요.`, '아침 일곱씨쯔메', 'Reggel 7 körül kelek.'],
    ],
  },
  '2A-5': {
    category: 'double-final-consonant',
    studentBookPage: 50,
    sampleWord: '밝다 · 밝고 · 밝아요',
    samplePronunciation: '박따 · 발꼬 · 발가요',
    hungarian: 'világos',
    rule: 'Az igék és melléknevek ㄺ 받침-je a szótag végén és a ㄱ-n kívüli mássalhangzók előtt [ㄱ]-nek hangzik. ㄱ előtt [ㄹ]-nek. Ha magánhangzó jön utána, mindkét mássalhangzó hallatszik.',
    examples: [
      [text`날씨가 ${bold('맑다')}.`, '막따', 'Derült az idő.'],
      [text`책을 ${bold('읽고')} 싶어요.`, '일꼬', 'Könyvet szeretnék olvasni.'],
      [text`${bold('밝은')} 집이 좋아요.`, '발근', 'A világos lakást szeretem.'],
    ],
  },
  '2A-7': {
    category: 'vowels',
    studentBookPage: 66,
    sampleWord: '바쁘죠',
    samplePronunciation: '바쁘조',
    hungarian: 'elfoglalt vagy, ugye?',
    rule: 'A ㅛ magánhangzó a ㅈ, ㅉ, ㅊ után [ㅗ]-nak hangzik.',
    examples: [
      [text`얼굴 많이 ${bold('부었죠')}?`, '부얻쪼', 'Nagyon bedagadt az arcod, ugye?'],
      [text`스트레스가 ${bold('많죠')}?`, '만초', 'Sok a stressz, ugye?'],
    ],
  },
  '2A-9': {
    category: 'tensification',
    studentBookPage: 82,
    sampleWord: '칼국수',
    samplePronunciation: '칼국쑤',
    hungarian: 'kalguksu (kézzel vágott tésztaleves)',
    rule: 'A [ㄱ], [ㄷ], [ㅂ] hangzású 받침 után a ㅅ [ㅆ]-nek, a ㅈ [ㅉ]-nek hangzik.',
    examples: [
      [text`저는 ${bold('칼국수를')} 좋아해요.`, '칼국쑤를', 'Szeretem a kalguksut.'],
      [text`짜장면은 ${bold('맵지')} 않아요.`, '맵찌', 'A csadzsangmjon nem csípős.'],
    ],
  },
  '2A-11': {
    category: 'nasalization',
    studentBookPage: 98,
    sampleWord: '작년',
    samplePronunciation: '장년',
    hungarian: 'tavaly',
    rule: 'A ㄱ, ㄲ, ㅋ 받침 [ㄱ]-nek hangzik. Ha ezután ㄴ jön, a [ㄱ]-ből [ㅇ] lesz.',
    examples: [
      [text`${bold('작년에')} 한국을 여행했어요.`, '장녀네', 'Tavaly Koreában utaztam.'],
      [text`자주 ${bold('먹는')} 음식이 뭐예요?`, '멍는', 'Mit eszel gyakran?'],
    ],
  },
  // ---------- 2B ----------
  '2B-1': {
    category: 'nasalization',
    studentBookPage: 18,
    sampleWord: '갔는데',
    samplePronunciation: ['갇는데', '간는데'],
    hungarian: 'elmentem, és…',
    rule: 'A ㅆ 받침 [ㄷ]-nek hangzik. Ha utána ㄴ jön, a [ㄷ]-ből [ㄴ] lesz.',
    examples: [
      [
        text`어제 동아리 모임에 ${bold('갔는데')} 재미있었어요.`,
        '간는데',
        'Tegnap elmentem a klubtalálkozóra, és jó volt.',
      ],
      [
        text`시험이 ${bold('끝났으니까')} 동아리 모임 할래요?`,
        '끈나쓰니까',
        'Vége a vizsgáknak, tartsunk klubtalálkozót?',
      ],
    ],
  },
  '2B-3': {
    category: 'tensification',
    studentBookPage: 34,
    sampleWord: '먹고',
    samplePronunciation: '먹꼬',
    hungarian: 'eszik, és…',
    rule: 'A [ㄱ], [ㄷ], [ㅂ] hangzású 받침 után a ㄱ [ㄲ]-nek hangzik.',
    examples: [
      [text`코트를 ${bold('입고')} 나가세요.`, '입꼬', 'Vegyen kabátot, mielőtt kimegy.'],
      [text`직접 만드신 ${bold('목걸이예요')}.`, '목꺼리예요', 'Ezt a nyakláncot saját kezűleg készítette.'],
    ],
  },
  '2B-5': {
    category: 'intonation',
    studentBookPage: 50,
    sampleWord: '공부하네요!',
    samplePronunciation: '',
    hungarian: 'Nahát, tanulsz!',
    rule: 'A -네요-s felkiáltó mondat vége előbb lemegy, aztán kicsit felmegy.',
    examples: [
      [text`사람이 아주 ${bold('많네요')}!`, '만네요', 'Hű, de sokan vannak!'],
      [text`공연이 정말 ${bold('재미있네요')}!`, '재미인네요', 'Ez az előadás tényleg érdekes!'],
    ],
  },
  '2B-7': {
    category: 'phrasing',
    studentBookPage: 66,
    sampleWord: '',
    samplePronunciation: '',
    hungarian: '',
    rule: 'A hosszú mondatot középen tagolva olvassuk. Figyelj a szünetjelre (∨)!',
    examples: [
      ['마리 씨한테서 듣고 ∨ 이미 만났어요.', '', 'Maritól hallottam róla, és már találkoztam is vele.'],
      ['저도 ∨ 수업 끝나고 ∨ 소개 좀 해 주세요.', '', 'Óra után engem is mutasson be neki, kérem.'],
    ],
  },
  '2B-9': {
    category: 'h-weakening',
    studentBookPage: 82,
    sampleWord: '결혼',
    samplePronunciation: '결혼',
    hungarian: 'házasság',
    rule: 'Az ㄴ, ㄹ, ㅁ, ㅇ után álló ㅎ-t gyengén is ejthetjük (a tankönyv a mintaszóban halványan jelöli).',
    examples: [
      [text`언니가 9월에 ${bold('결혼해요')}.`, '', 'A nővérem szeptemberben férjhez megy.'],
      [text`저는 오늘 ${bold('은행에')} 갈 거예요.`, '', 'Ma bankba megyek.'],
    ],
  },
  '2B-11': {
    category: 'intonation',
    studentBookPage: 98,
    sampleWord: '학교에서도 한국어를 배워? ↗',
    samplePronunciation: '',
    hungarian: 'Az iskolában is tanulsz koreaiul?',
    rule: 'A tegező (반말) kérdés vége is emelkedik.',
    examples: [
      [
        text`재민: 학교에서도 한국어를 ${bold('배워')}? ↗${lineBreak}안나: 응.`,
        '',
        'Dzsemin: Az iskolában is tanulsz koreaiul? – Anna: Igen.',
      ],
    ],
  },
  // ---------- 3A ----------
  '3A-2': {
    category: 'aspiration',
    studentBookPage: 26,
    sampleWord: '입학',
    samplePronunciation: '이팍',
    hungarian: 'beiratkozás (iskolába)',
    rule: 'Ha a ㅂ 받침 után ㅎ jön, a kettő összeolvad: [ㅍ].',
    examples: [
      [text`3월에 ${bold('입학을')} 해요.`, '이파글', 'Márciusban kezdem az iskolát.'],
      [text`${bold('급하게')} 나오다가 미끄러졌어.`, '그파게', 'Sietve jöttem ki, és elcsúsztam.'],
      [text`무늬가 너무 ${bold('복잡한')} 것 같아요.`, '복짜판', 'Szerintem túl bonyolult a minta.'],
    ],
  },
  '3A-4': {
    category: 'tensification',
    studentBookPage: 42,
    sampleWord: '버릴게',
    samplePronunciation: '버릴께',
    hungarian: 'kidobom',
    rule: 'A -(으)ㄹ után álló ㄱ, ㄷ, ㅂ, ㅅ, ㅈ keményedik: [ㄲ], [ㄸ], [ㅃ], [ㅆ], [ㅉ].',
    examples: [
      [text`내가 먼저 ${bold('쓸게')}.`, '쓸께', 'Majd én használom először.'],
      [text`내일 일찍 ${bold('올게요')}.`, '올께요', 'Holnap korán jövök.'],
      [text`열심히 ${bold('공부할게요')}.`, '공부할께요', 'Szorgalmasan fogok tanulni.'],
    ],
  },
  '3A-6': {
    category: 'loanwords',
    studentBookPage: 58,
    sampleWord: '',
    samplePronunciation: '',
    hungarian: '',
    rule: 'A ㄱ, ㄷ, ㅂ, ㅅ, ㅈ betűvel írt jövevényszavakat általában keményen ejtjük: [ㄲ], [ㄸ], [ㅃ], [ㅆ], [ㅉ].',
    examples: [
      [text`${bold('서비스 센터에서')} 수리했어요.`, '써비쓰 쎈터에서', 'A szervizben javíttattam meg.'],
      [text`${bold('버스를')} 타고 갔어요.`, '뻐쓰를', 'Busszal mentem.'],
      [text`이 돈을 ${bold('달러로')} 바꿔 주세요.`, '딸러로', 'Kérem, váltsa át ezt a pénzt dollárra.'],
    ],
  },
  '3A-8': {
    category: 'nasalization',
    studentBookPage: 74,
    sampleWord: '음료수',
    samplePronunciation: '음뇨수',
    hungarian: 'üdítőital',
    rule: 'Ha az ㅇ vagy ㅁ 받침 után ㄹ jön, a ㄹ [ㄴ]-nek hangzik.',
    examples: [
      [text`시원한 ${bold('음료수를')} 마셔야겠어요.`, '음뇨수를', 'Innom kell egy hideg üdítőt.'],
      [bold('한국어능력시험'), '한구거능녁씨험', 'koreai nyelvvizsga (TOPIK)'],
      [text`${bold('강릉에')} 한번 가 보세요.`, '강능에', 'Menjen el egyszer Kangnungba.'],
    ],
  },
  '3A-10': {
    category: 'vowels',
    studentBookPage: 90,
    sampleWord: '거의',
    samplePronunciation: '거의/거이',
    hungarian: 'majdnem',
    rule: 'A szó második szótagjában álló 의 ejthető [의]-nek vagy [이]-nek is.',
    examples: [
      [text`열은 ${bold('거의')} 내렸어요.`, '거의/거이', 'A láz majdnem lement.'],
      [text`환불 ${bold('유의')} 사항은 다음과 같아요.`, '유의/유이', 'A visszatérítés tudnivalói a következők.'],
      [text`세종학당에 ${bold('문의해')} 보세요.`, '무늬해/무니해', 'Érdeklődjön a Szedzsong Intézetben.'],
    ],
    note: text`A 의 máshol másképp hangzik: szó elején [의], mássalhangzó után mindig [이], birtokos partikulaként [의] vagy [에]. Részletesen: ${reference('pronunciation-vowels', '→ Kiejtés 12.')}`,
  },
  '3A-12': {
    category: 'vowels',
    studentBookPage: 106,
    sampleWord: '괴물',
    samplePronunciation: '괴물/궤물',
    hungarian: 'szörny',
    rule: 'A ㅚ magánhangzó ejthető [ㅚ]-nek vagy [ㅞ]-nek.',
    examples: [
      [
        text`한국 영화 〈${bold('괴물')}〉을 좋아해요.`,
        '괴물/궤물',
        'Szeretem a 〈괴물〉 („The Host”) című koreai filmet.',
      ],
      [text`${bold('외국어')} 공부에 관심이 많아요.`, '외구거/웨구거', 'Nagyon érdekel az idegennyelv-tanulás.'],
      [text`${bold('회의')} 준비를 했어요.`, '회의/훼의', 'Felkészültem az értekezletre.'],
    ],
  },
  // ---------- 3B ----------
  '3B-2': {
    category: 'vowels',
    studentBookPage: 26,
    sampleWord: '-하고요',
    samplePronunciation: '하고요/하구요',
    hungarian: '…és (még) …',
    rule: 'A -더라고요 és a -하고요 pontos kiejtése [더라고요], [하고요], de beszédben gyakran [더라구요], [하구요].',
    examples: [
      [text`콘서트가 ${bold('감동적이더라고요')}.`, '감동저기더라고요/감동저기더라구요', 'Megható volt a koncert.'],
      [
        text`친구가 참 착해요. ${bold('성실하고요')}.`,
        '성실하고요/성실하구요',
        'A barátom nagyon kedves. És szorgalmas is.',
      ],
      [
        text`저는 ${bold('학생이고요')}, 친구는 회사원이에요.`,
        '학쌩이고요/학쌩이구요',
        'Én diák vagyok, a barátom pedig irodai dolgozó.',
      ],
    ],
  },
  '3B-4': {
    category: 'phrasing',
    studentBookPage: 42,
    sampleWord: '그럼 ∨ 뭐부터 하면 돼?',
    samplePronunciation: '',
    hungarian: 'Akkor mivel kezdjem?',
    rule: 'Ha határozószó vagy indulatszó áll a mondat elején, utána rövid szünetet tartunk, és úgy folytatjuk. Így hangzik természetesen.',
    examples: [
      [text`${bold('그럼')} ∨ 다음에 만나요.`, '', 'Akkor majd legközelebb találkozunk.'],
      [text`${bold('아,')} ∨ 나도 알아요.`, '', 'Ja, én is tudom.'],
      [text`${bold('우선')} ∨ 청소부터 하자.`, '', 'Először takarítsunk.'],
    ],
  },
  '3B-6': {
    category: 'palatalization',
    studentBookPage: 58,
    sampleWord: '같이',
    samplePronunciation: ['가티', '가치'],
    hungarian: 'együtt',
    rule: 'Ha a ㄷ vagy ㅌ 받침 után 이 jön, a ㄷ [ㅈ]-nek, a ㅌ [ㅊ]-nek hangzik.',
    examples: [
      [
        text`어차피 지정석이니까 ${bold('굳이')} 일찍 가서 줄 안 서도 돼.`,
        '구지',
        'Úgyis számozott helyek vannak, nem kell feltétlenül korán odamenni sorba állni.',
      ],
      [text`소파를 벽 쪽에 ${bold('붙이세요')}.`, '부치세요', 'Tolja a kanapét a falhoz.'],
      [text`${bold('똑같이')} 그려 보세요.`, '똑까치', 'Rajzolja le pontosan ugyanígy.'],
    ],
  },
  '3B-8': {
    category: 'tensification',
    studentBookPage: 74,
    sampleWord: '오랫동안',
    samplePronunciation: ['오랟동안', '오랟똥안'],
    hungarian: 'sokáig',
    rule: 'A [ㄷ] hangzású 받침 után a ㄱ, ㄷ, ㅂ, ㅅ, ㅈ keményedik: [ㄲ], [ㄸ], [ㅃ], [ㅆ], [ㅉ].',
    examples: [
      [text`${bold('오랫동안')} 고향에 못 갔어요.`, '오랟똥안', 'Sokáig nem jutottam haza.'],
      [text`${bold('옷걸이가')} 필요해요.`, '옫꺼리가', 'Kell egy vállfa.'],
      [text`${bold('찻잔을')} 모으는 것이 취미예요.`, '찯짜늘', 'A hobbim a teáscsészék gyűjtése.'],
    ],
  },
  '3B-10': {
    category: 'nasalization',
    studentBookPage: 90,
    sampleWord: '윷놀이',
    samplePronunciation: ['윧놀이', '윤놀이'],
    hungarian: 'jutnori (hagyományos koreai táblajáték)',
    rule: 'Ha a [ㄷ] hangzású 받침 után ㄴ vagy ㅁ jön, a [ㄷ]-ből [ㄴ] lesz.',
    examples: [
      [text`${bold('윷놀이')} 할 줄 알죠?`, '윤노리', 'Ugye tudsz jutnorit játszani?', ['4B-02-1']],
      [text`생일 선물로 ${bold('꽃만')} 샀어요.`, '꼰만', 'Szülinapi ajándéknak csak virágot vettem.'],
      [text`${bold('눈빛만')} 봐도 알 수 있어요.`, '눈빈만', 'Már a tekintetéből is látszik.'],
    ],
  },
  '3B-12': {
    category: 'aspiration',
    studentBookPage: 106,
    sampleWord: '그렇구나',
    samplePronunciation: '그러쿠나',
    hungarian: 'szóval így van',
    rule: 'A ㅎ 받침 után álló ㄱ, ㄷ, ㅈ összeolvad vele: [ㅋ], [ㅌ], [ㅊ].',
    examples: [
      [text`${bold('그렇구나')}. 이제 알았어.`, '그러쿠나', 'Szóval így van. Most már értem.'],
      [text`인맥을 ${bold('쌓다')}.`, '싸타', 'Kapcsolatokat épít.'],
      [text`나야 늘 ${bold('그렇지')}.`, '그러치', 'Velem mindig minden a régi.'],
    ],
  },
  // ---------- 4A ----------
  '4A-2': {
    category: 'liquidization',
    studentBookPage: 24,
    sampleWord: '잘 나왔지?',
    samplePronunciation: '잘:나와찌/잘라와찌',
    hungarian: 'Jól sikerült (a kép), ugye?',
    rule: 'A kiejtés attól is függ, hol tartunk szünetet. Az ㄴ a ㄹ előtt vagy után [ㄹ]-nek hangzik.',
    examples: [
      [text`${bold('실내')} 온도가 낮다.`, '실래', 'Alacsony a beltéri hőmérséklet.'],
      [text`${bold('오늘날까지')} 전해진다.`, '오늘랄까지', 'Napjainkig fennmaradt.'],
    ],
  },
  '4A-4': {
    category: 'h-weakening',
    studentBookPage: 40,
    sampleWord: '운항',
    samplePronunciation: '운항/우낭',
    hungarian: 'járatközlekedés',
    rule: 'Az ㄴ után álló ㅎ-t vagy nem ejtjük, vagy csak gyengén.',
    examples: [
      [text`${bold('가만히')} 누워 있다.`, '가만히/가마니', 'Csendben fekszik.'],
      [text`매달 ${bold('꾸준히')} 저축하고 있다.`, '꾸준히/꾸주니', 'Minden hónapban rendszeresen takarékoskodik.'],
    ],
  },
  '4A-6': {
    category: 'nasalization',
    studentBookPage: 56,
    sampleWord: '면역력',
    samplePronunciation: ['며녁녁', '며녕녁'],
    hungarian: 'immunitás',
    rule: 'Ha a ㄱ 받침 után ㄹ jön, a ㄹ [ㄴ]-nek hangzik, a ㄱ pedig az [ㄴ] előtt [ㅇ]-vá válik.',
    examples: [
      [text`올해 집을 나와 ${bold('독립을')} 했다.`, '동니블', 'Idén elköltöztem otthonról, és önálló lettem.'],
      [
        text`퇴근길에 ${bold('강변북로가')} 많이 막혔다.`,
        '강변붕노가',
        'Munkából hazafelé nagy dugó volt a Gangbjon északi parti úton.',
      ],
    ],
  },
  '4A-8': {
    category: 'tensification',
    studentBookPage: 72,
    sampleWord: '대문집',
    samplePronunciation: '대문찝',
    hungarian: 'nagykapus ház',
    rule: 'Ha kínai eredetű és koreai szó összetett szót alkot, az ㄴ, ㄹ, ㅁ, ㅇ után álló ㄱ, ㄷ, ㅅ, ㅂ, ㅈ gyakran keményedik: [ㄲ], [ㄸ], [ㅆ], [ㅃ], [ㅉ].',
    examples: [
      [text`이제 ${bold('고생길이')} 훤하다.`, '고생끼리', 'Most már világos, hogy nehéz idők jönnek.'],
      [
        text`바람이 불자 ${bold('등불이')} 흔들렸다.`,
        '등뿌리',
        'Ahogy fújni kezdett a szél, meglibbent a lámpás lángja.',
      ],
    ],
  },
  '4A-10': {
    category: 'intonation',
    studentBookPage: 88,
    sampleWord: text`가: 어디 가요? ↗ – 나: 네. 잠깐 나갔다 오려고요.${lineBreak}가: 어디 가요? ↘ – 나: 도서관에 가요.`,
    samplePronunciation: '',
    hungarian: 'Elmész valahová? – Igen, csak kiugrom. · Hová mész? – A könyvtárba.',
    rule: 'Más a hanglejtés, ha igen/nem választ várunk, és más, ha arra kérdezünk rá, hogy „mi” vagy „hol”. Az igen/nem kérdés vége emelkedik. A kérdőszavas kérdésben a kérdőszó (어디, 뭐) hangsúlyos, a mondat vége ereszkedik.',
    examples: [
      [
        text`가: ${bold('뭐가')} 없어졌어? ↗${lineBreak}나: 응. 지갑이 없어졌어.`,
        '',
        'A: Eltűnt valami? – B: Igen, eltűnt a pénztárcám.',
      ],
      [
        text`가: ${bold('뭐가')} 없어졌어? ↘${lineBreak}나: 선물 받은 지갑이 없어졌어.`,
        '',
        'A: Mi tűnt el? – B: Az ajándékba kapott pénztárcám.',
      ],
    ],
  },
  '4A-12': {
    category: 'liquidization',
    studentBookPage: 104,
    sampleWord: '한류',
    samplePronunciation: '할류',
    hungarian: 'koreai hullám (hallyu)',
    rule: 'Az ㄴ a ㄹ előtt vagy után [ㄹ]-nek hangzik.',
    examples: [
      [text`한국에 가기 전에 ${bold('연락했다')}.`, '열라캗따', 'Mielőtt Koreába mentem, jelentkeztem.'],
      [text`이 앱은 사용이 ${bold('편리하다')}.`, '펼리하다', 'Ez az alkalmazás kényelmesen használható.'],
    ],
  },
  // ---------- 4B ----------
  '4B-2': {
    category: 'intonation',
    studentBookPage: 24,
    sampleWord: '내성적인 줄 알았거든. ↘',
    samplePronunciation: '',
    hungarian: 'Azt hittem, hogy zárkózott.',
    rule: 'Ha a -거든 okot fejez ki, a mondat vége lemegy. Ha viszont egy tényt magyarázunk, és a történet folytatódik, a vége felmegy.',
    examples: [
      [
        text`생각보다 키가 작아서 놀랐어. 사진만 봤을 때는 키가 큰 줄 ${bold('알았거든.')} ↘`,
        '',
        'Meglepődtem, hogy alacsonyabb, mint gondoltam. A fénykép alapján azt hittem, magas.',
      ],
      [
        text`빈자리가 나서 얼른 ${bold('앉았거든요.')} ↗ 근데 할아버지가 오셔서….`,
        '',
        'Megüresedett egy hely, gyorsan leültem. De aztán jött egy idős bácsi, és…',
      ],
    ],
  },
  '4B-4': {
    category: 'intonation',
    studentBookPage: 40,
    sampleWord: '좋은 선수가 되었을 텐데. ↘',
    samplePronunciation: '',
    hungarian: 'Jó sportoló lett volna belőle.',
    rule: 'A sajnálkozást kifejező -(으)ㄹ 텐데 végén a hang lemegy. Utána rövid szünet jön, és úgy folytatjuk a következő kifejezéssel.',
    examples: [
      [text`미리 말했으면 ${bold('준비했을 텐데.')} ↘`, '', 'Ha előre szóltál volna, felkészültem volna.'],
      [
        text`일찍 돈을 벌었으면 부자가 ${bold('되었을 텐데.')} ↘`,
        '',
        'Ha korán kezdtem volna pénzt keresni, gazdag lettem volna.',
      ],
    ],
  },
  '4B-6': {
    category: 'tensification',
    studentBookPage: 56,
    sampleWord: '출장',
    samplePronunciation: '출짱',
    hungarian: 'kiküldetés',
    rule: 'Kínai eredetű szavakban az ㄹ 받침 után álló ㄷ, ㅅ, ㅈ keményedik: [ㄸ], [ㅆ], [ㅉ].',
    examples: [
      [
        text`과학 기술의 ${bold('발전으로')} 인해 일자리가 줄어들었다.`,
        '발쩌느로',
        'A tudomány és a technika fejlődése miatt kevesebb lett a munkahely.',
      ],
      [
        text`봄은 날씨가 따뜻해서 야외 ${bold('활동에')} 좋은 계절이다.`,
        '활똥에',
        'A tavasz meleg időjárása miatt jó évszak a szabadtéri programokhoz.',
      ],
    ],
  },
  '4B-8': {
    category: 'nasalization',
    studentBookPage: 72,
    sampleWord: '승려',
    samplePronunciation: '승녀',
    hungarian: 'szerzetes',
    rule: 'Az ㅇ 받침 után álló ㄹ [ㄴ]-nek hangzik.',
    examples: [
      [
        text`이번 학기에도 세종학당에 ${bold('등록했다')}.`,
        '등노캗따',
        'Ebben a félévben is beiratkoztam a Szedzsong Intézetbe.',
      ],
      [text`이삿짐을 ${bold('정리해서')} 옮겼다.`, '정니해서', 'Összepakoltam a költözési holmit, és elvittem.'],
    ],
  },
  '4B-10': {
    category: 'tensification',
    studentBookPage: 88,
    sampleWord: '효과',
    samplePronunciation: '효과/효꽈',
    hungarian: 'hatás',
    rule: 'A 효과, 관건, 불법 és hasonló szavakban a második szótag ㄱ-ja és ㅂ-je ejthető [ㄱ], [ㅂ]-nek és [ㄲ], [ㅃ]-nek is.',
    examples: [
      [
        text`초등학교 앞에 주차를 하는 것은 ${bold('불법이다')}.`,
        '불버비다/불뻐비다',
        'Az általános iskola előtt tilos parkolni.',
      ],
      [
        text`오늘 경기의 ${bold('관건은')} 두 감독의 전략이다.`,
        '관거는/관꺼는',
        'A mai meccsen a két edző stratégiája a döntő.',
      ],
    ],
  },
  '4B-12': {
    category: 'phrasing',
    studentBookPage: 104,
    sampleWord: '저는 ∨ 이번에 4단계를 끝으로 ∨ 세종학당을 마치는 ∨ 안나입니다.',
    samplePronunciation: '',
    hungarian: 'Anna vagyok, és ezzel a 4. szinttel befejezem a Szedzsong Intézetet.',
    rule: 'A hosszú mondatot értelmi egységekre tagolva természetesebb mondani.',
    examples: [
      [
        '어렸을 때는 ∨ 연습하는 게 힘들어서 ∨ 야구가 별로 즐겁지 않았는데 ∨ 요즘에는 다시 하고 싶더라고요.',
        '',
        'Gyerekkoromban nehéz volt az edzés, ezért nem nagyon élveztem a baseballt, de mostanában újra kedvem lett hozzá.',
      ],
      [
        '이 자리를 빌려 ∨ 열심히 가르쳐 주신 선생님들께 ∨ 진심으로 감사하다는 말씀을 ∨ 드리고 싶습니다.',
        '',
        'Ezúton szeretném szívből megköszönni a tanáraimnak, hogy olyan lelkesen tanítottak.',
      ],
    ],
  },
};

export default { categories, lessons } satisfies PronunciationData;
