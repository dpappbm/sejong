import type { RelatedGroup } from './types';

export default [
  {
    id: 'future-intention', title: 'jövőbeli szándék, elhatározottság',
    scale: [
      ['1A-10-1', 'vágy'],
      ['3A-03-1', 'fontolgatom'],
      ['1B-07-1', 'szándékom'],
      ['1B-03-2', 'tervem, fogom'],
      ['2A-04-1', 'eldöntöttem'],
    ],
    explanation: '<p>Minél jobbra, annál biztosabb, hogy meg is lesz. A -고 싶다 csak vágy, nincs mögötte terv. A -(으)ㄹ까 하다 még csak ötlet. A -(으)려고 하다 szándék, de még változhat. A -(으)ㄹ 거예요 a sima „fogok”: terv, amit nem hangsúlyozunk külön. A -기로 하다 kész döntés vagy megállapodás (többnyire múlt időben: -기로 했어요).</p>',
    examples: [
      ['여행 가고 싶어요.', 'Szeretnék elutazni.'],
      ['여행 갈까 해요.', 'Gondolkodom rajta, hogy elutazom.'],
      ['여행 가려고 해요.', 'El akarok utazni.'],
      ['여행 갈 거예요.', 'El fogok utazni.'],
      ['여행 가기로 했어요.', 'Elhatároztam (megbeszéltük), hogy elutazom.'],
    ],
    side: [
      ['3A-08-2', 'hirtelen, erős elhatározás: „ezt meg kell tennem!”'],
      ['4B-05-2', 'ugyanez magamnak mondva, tegezve'],
      ['2B-01-2', 'ígéret a hallgatónak: „majd én …”'],
      ['2B-01-1', '„én …-t kérek / akarok”; kérdésként a másik szándékát kérdezi'],
      ['4A-12-2', 'a -(으)려고 하다 hivatalos, írott párja'],
    ],
  },
  {
    id: 'contrast', title: 'ellentét – „de, viszont, cserébe”',
    scale: [
      ['2B-08-1', 'lágy, beszélt'],
      ['1B-09-1', 'határozott'],
      ['4B-09-2', 'írott, hivatalos'],
    ],
    explanation: '<p>Mindhárom „de”; jobbra haladva az ellentét egyre határozottabb, a stílus egyre írottabb. Beszédben a -는데 a leggyakoribb: inkább bemutatja a helyzetet, mint szembeállít. A -지만 két tényt világosan szembeállít, vagy a várttal ellentétes folytatást hoz. A -(으)나 ugyanez írásban, hivatalos szövegben.</p>' +
      '<p>Segítő kérdések:</p><ul><li>Mi áll szemben az első állítással? → -지만</li><li>Minek a háttere, előzménye az első tag? → -는데</li><li>Mi helyettesíti vagy ellensúlyozza az első dolgot? → -는/(으)ㄴ 대신에</li></ul>',
    examples: [
      ['이 식당은 비싼데 음식이 맛있어요.', 'Ez az étterem drága, viszont finom az étel.'],
      ['이 식당은 비싸지만 음식이 맛있어요.', 'Ez az étterem drága, de finom az étel.'],
      ['이 식당은 비싸나 음식이 맛있습니다.', 'Az étterem drága, azonban az étel finom.'],
      ['이 식당은 비싼 대신에 음식이 정말 맛있어요.', 'Ez az étterem drága, cserébe nagyon finom az étel.'],
    ],
    correctIncorrect: [
      { incorrect: '주말에 부산에 가지만 같이 갈래요?', reason: 'nincs ellentét: az utazás csak a kérdés háttere' },
      { correct: '주말에 부산에 가는데 같이 갈래요?', translation: 'Hétvégén Busanba megyek. Jössz velem?' },
      { incorrect: '커피를 마시지만 차를 마셨어요.', reason: 'a kávé elmaradt, a tea került a helyére' },
      { correct: '커피를 마시는 대신에 차를 마셨어요.', translation: 'Kávé helyett teát ittam.' },
    ],
    side: [
      ['3A-09-2', 'nem puszta ellentét: a második tag az elsőt helyettesíti („helyett”) vagy ellensúlyozza („cserébe”)'],
      ['2A-08-1', 'ugyanaz az alak ellentét nélkül: háttér, előzmény a folytatáshoz'],
    ],
  },
  {
    id: 'change', title: 'változás – „…-vá válik, úgy alakul, egyre …”',
    unordered: true,
    scale: [
      ['3A-09-1', 'melléknév: az állapot megváltozik'],
      ['2B-12-2', 'ige: úgy alakul, hogy …'],
      ['3B-11-1', 'a változás halad előre'],
    ],
    explanation: '<p>Mindhárom változást fejez ki, de mást változtat. Ha egy <b>tulajdonság, állapot</b> lesz más, a melléknévhez -아지다/어지다 járul. Ha egy <b>cselekvés, szokás, helyzet</b> alakul ki (nem csak a saját döntésünkből), az igéhez -게 되다. Melléknévvel a -게 되다 egyszerű változásra nem természetes: 날씨가 추워졌어요, nem 춥게 됐어요. Az -아/어 가다 azt teszi hozzá, hogy a folyamat még tart, egy végpont felé halad; az -아지다-val össze is kapcsolható: 추워져 가요.</p>',
    examples: [
      ['한국어 실력이 좋아졌어요.', 'Javult a koreaitudásom.'],
      ['한국어를 좋아하게 됐어요.', 'Megszerettem a koreai nyelvet.'],
      ['한국어 실력이 좋아져 가요.', 'Egyre jobb a koreaitudásom.'],
    ],
    correctIncorrect: [
      { incorrect: '한국어 실력이 좋아하게 됐어요.', reason: 'a 좋다 („jó”) állapota változik, nem a 좋아하다' },
      { correct: '한국어 실력이 좋아졌어요.', translation: 'Javult a koreaitudásom.' },
      { incorrect: '한국어를 좋아졌어요.', reason: 'a 좋아지다 mellett nem állhat 을/를' },
      { correct: '한국어를 좋아하게 됐어요.', translation: 'Megszerettem a koreait.', note: 'ugyanígy helyes: 한국어가 좋아졌어요.' },
      { incorrect: '매일 운동해졌어요.', reason: 'az 운동하다 ige: új szokásra -게 되다' },
      { correct: '매일 운동하게 됐어요.', translation: 'Úgy alakult, hogy mindennap edzek.' },
    ],
  },

  {
    id: 'gi',
    kind: 'form',
    title: '-기',
    explanation: '<p>A -기 az ige vagy a melléknév tövéből főnevet képez: 가다 → 가기 „menés”, 먹다 → 먹기 „evés”. Ezért kaphat partikulát (가, 를, 는, (으)로, 보다), és állhat főnév előtt (전, 때문). A család tagjainak jelentése többnyire kiolvasható a felbontásból.</p>',

    members: [
      ['1B-10-1', '-기 + <b>전</b> („előtt”) + 에', 'mielőtt …', ['자<b>기 전에</b> 이를 닦아요.', 'Lefekvés előtt fogat mosok.']],
      ['2A-04-1', '-기 + <b>(으)로</b> + 하다', 'elhatározza / megbeszélik, hogy …', ['주말에 친구와 영화를 보<b>기로 했어요</b>.', 'Megbeszéltük a barátommal, hogy hétvégén filmet nézünk.']],
      ['2A-05-1', '-기 + <b>가</b> + 좋다 („jó”)', 'jó …-ni', ['이 공원은 산책하<b>기가 좋아요</b>.', 'Ebben a parkban jó sétálni.']],
      ['2B-09-1', '-기 + <b>때문</b> („ok”) + 에', 'mert …', ['비가 오<b>기 때문에</b> 집에 있을 거예요.', 'Mivel esik az eső, otthon maradok.']],
      ['3A-08-1', '-기 + <b>위하다</b> („-ért van”) + -아서', 'azért, hogy …', ['건강을 지키<b>기 위해서</b> 매일 걸어요.', 'Azért gyalogolok minden nap, hogy megőrizzem az egészségemet.']],
      ['3B-08-2', '-기 + <b>는</b> + 요', 'ugyan már, dehogy …', ['가: 한국어 정말 잘하시네요. 나: 잘하<b>기는요</b>.', '– Nagyon jól beszél koreaiul! – Ugyan, dehogy!']],
      ['3B-12-1', '-기 + <b>는</b> + 하다', '… az igaz, (de) …', ['이 옷이 예쁘<b>기는 한데</b> 너무 비싸요.', 'Ez a ruha szép, az igaz, de túl drága.']],
      ['4A-05-2', '-기 + <b>가</b> + 쉽다 / 어렵다 …', 'könnyű / nehéz …-ni', ['한국어 발음은 정확하게 하<b>기가 어려워요</b>.', 'A koreai kiejtést nehéz pontosan eltalálni.']],
      ['4B-11-2', '-기 + <b>보다</b> („-nál”) + 는', 'ahelyett, hogy …, inkább', ['집에서 쉬<b>기보다는</b> 밖에 나가고 싶어요.', 'Ahelyett, hogy otthon pihennék, inkább kimennék.']],
      ['4B-12-2', '-기 + <b>를</b> + 바라다 („remél”)', 'remélem, hogy …', ['시험에 꼭 합격하<b>기를 바라요</b>.', 'Remélem, hogy mindenképp sikerül a vizsgád.']],
    ]
  },
  {
    id: 'auxiliary-verbs', kind: 'form', title: '-아/어 + segédige',
    explanation: '<p>Az -아/어 alak (ugyanaz, mint az -아요/어요, csak -요 nélkül) után egy második ige áll. Ez a cselekvés módját, irányát vagy eredményét adja hozzá: 보다 „néz → kipróbál”, 주다 „ad → valakinek megtesz”, 놓다/두다 „tesz → elkészít és úgy hagy”, 버리다 „eldob → teljesen megtesz”, 가다 „megy → egyre …”.</p>',
    members: [
      ['2A-08-2', '-아/어 + <b>보다</b> („néz”)', 'próbáld meg …', ['이 김치 한번 먹<b>어 보세요</b>.', 'Kóstold meg ezt a kimcsit!']],
      ['2A-12-1', '-아/어 + <b>보다</b>, múlt időben', 'már csináltam (tapasztalat)', ['제주도에 <b>가 봤어요</b>.', 'Voltam már Csedzsu-szigeten.']],
      ['2B-04-2', '-아/어 + <b>주다</b> („ad”)', 'megteszi valakinek', ['친구가 사진을 찍<b>어 줬어요</b>.', 'A barátom lefényképezett (nekem).']],
      ['3A-01-2', '-아/어 + <b>보이다</b> („látszik”)', '…-nak látszik', ['오늘 피곤<b>해 보여요</b>.', 'Ma fáradtnak tűnsz.']],
      ['3A-05-1', '-아/어 + <b>보다</b> + -(으)니까', 'amikor kipróbáltam, rájöttem …', ['한복을 입<b>어 보니까</b> 생각보다 편했어요.', 'Felpróbáltam a hanbokot, és rájöttem, hogy kényelmesebb, mint gondoltam.']],
      ['3A-09-1', '-아/어 + <b>지다</b>', '…-vá válik, egyre …', ['날씨가 점점 추<b>워져요</b>.', 'Egyre hidegebb lesz az idő.']],
      ['3B-01-2', '-아/어 + <b>드리다</b> (a 주다 tiszteleti párja)', 'megteszi (tisztelt) valakinek', ['할머니께 편지를 읽<b>어 드렸어요</b>.', 'Felolvastam a levelet a nagymamának.']],
      ['3B-04-1', '-아/어 + <b>놓다</b> („letesz”)', 'elkészít (és úgy hagy)', ['손님이 오기 전에 음식을 만들<b>어 놓았어요</b>.', 'Mielőtt a vendégek megjöttek, elkészítettem az ételt.']],
      ['3B-05-2', '-아/어 + <b>버리다</b> („eldob”)', 'teljesen, végleg megtesz', ['케이크를 혼자 다 먹<b>어 버렸어요</b>.', 'Egyedül megettem az egész tortát.']],
      ['3B-07-1', '-아/어 + <b>가지다</b> („fog, tart”) + 고', '…, és ezért / és azzal …', ['돈을 모<b>아 가지고</b> 노트북을 샀어요.', 'Összegyűjtöttem a pénzt, és abból vettem laptopot.']],
      ['3B-11-1', '-아/어 + <b>가다</b> („megy”)', 'egyre …, folyamatosan', ['한국 생활에 점점 익숙해<b>져 가요</b>.', 'Egyre jobban megszokom a koreai életet.']],
      ['3B-11-2', '-아/어 + <b>두다</b> („tesz”)', 'előre megcsinál, eltesz', ['여행 가기 전에 호텔을 예약<b>해 두었어요</b>.', 'Utazás előtt előre lefoglaltam a szállodát.']],
    ],
  },
  {
    id: 'aya', kind: 'form', title: '-아야/어야',
    explanation: '<p>Az -아야/어야 jelentése „csak ha …, csak úgy …” (szükséges feltétel). Erre épülnek a „kell” jelentésű szerkezetek: „csak ha megteszem, (akkor) rendben (되다)”.</p>',
    members: [
      ['1B-09-2', '-아야/어야 + <b>되다</b>', 'kell, muszáj', ['내일까지 숙제를 내<b>야 돼요</b>.', 'Holnapig be kell adnom a házi feladatot.']],
      ['3A-08-2', '-아야/어야 + <b>-겠다</b> (szándék)', 'ezt meg kell tennem!', ['너무 늦었네요. 이제 집에 가<b>야겠어요</b>.', 'Nagyon késő van, most már haza kell mennem.']],
      ['3A-10-2', '-아야/어야 (magában)', 'csak ha …; ahhoz, hogy …', ['연습을 많이 해<b>야</b> 잘할 수 있어요.', 'Csak ha sokat gyakorolsz, akkor leszel benne jó.']],
      ['4B-04-1', '-았/었 + -어야 + <b>했는데</b>', '…-nom kellett volna (pedig)', ['우산을 가져왔<b>어야 했는데</b>.', 'Hoznom kellett volna esernyőt.']],
      ['4B-05-2', '-아야/어야 + <b>-지</b>', '… kell(ene) (hát)!', ['내일부터는 일찍 일어나<b>야지</b>.', 'Holnaptól korán kell kelnem! (magamnak mondva)']],
    ],
  },
  {
    id: 'myeon', kind: 'form', title: '-(으)면',
    explanation: '<p>A -(으)면 a „ha” feltétel. Sok szerkezet épül rá: a feltétel után egy értékelés áll (좋겠다 „jó lenne”, 안 되다 „nem jó”), vagy elé kerül egy másik elem (szándék: -(으)려, elképzelt: -는다, múlt: -았/었).</p>',
    members: [
      ['2A-07-1', '-(으)면', 'ha …', ['시간이 있<b>으면</b> 같이 가요.', 'Ha van időd, menjünk együtt.']],
      ['2A-10-2', '-(으)면 + <b>좋겠다</b> („jó lenne”)', 'jó lenne, ha …; bárcsak …', ['내일 날씨가 좋<b>으면 좋겠어요</b>.', 'Bárcsak jó idő lenne holnap!']],
      ['2B-06-2', '-(으)면 + <b>안 되다</b> („nem jó”)', 'nem szabad …', ['여기에서 사진을 찍<b>으면 안 돼요</b>.', 'Itt nem szabad fényképezni.']],
      ['3A-05-2', '<b>-(으)려</b> + -면', 'ha … akarsz', ['시청에 가<b>려면</b> 2호선을 타세요.', 'Ha a városházára akarsz menni, szállj fel a 2-es metróra.']],
      ['4A-01-1', '<b>-는다</b> + -면', 'ha (netán) …', ['복권에 당첨된<b>다면</b> 세계 여행을 하고 싶어요.', 'Ha (netán) megnyerném a lottót, körbeutaznám a világot.']],
      ['4A-01-2', '<b>-았/었</b> + -으면 + 하다', 'szeretném, ha …', ['이번 시험에 합격했<b>으면 해요</b>.', 'Szeretném, ha sikerülne ez a vizsga.']],
    ],
  },
  {
    id: 'ryeo', kind: 'form', title: '-(으)려',
    explanation: '<p>A -(으)려 a szándék jele („… akar”). A -고 하다, a -면 és a -다가 végződéssel három szerkezet lesz belőle.</p>',
    members: [
      ['1B-07-1', '-(으)려 + <b>-고 하다</b>', '… akarok, szándékozom', ['주말에 등산하<b>려고 해요</b>.', 'Hétvégén túrázni akarok.']],
      ['3A-05-2', '-(으)려 + <b>-면</b>', 'ha … akarsz', ['표를 사<b>려면</b> 일찍 가야 돼요.', 'Ha jegyet akarsz venni, korán kell menned.']],
      ['3A-06-2', '-(으)려 + <b>-다가</b>', '… akartam, de (végül) …', ['버스를 타<b>려다가</b> 걸어왔어요.', 'Buszra akartam szállni, de végül gyalog jöttem.']],
    ],
  },
  {
    id: 'daga', kind: 'form', title: '-다(가)',
    explanation: '<p>A -다가 egy cselekvést megszakít, vagy átvezet egy másikba („… közben, aztán”). A 보다 („lát”) igével összetéve azt jelenti: „ha / ahogy az ember sokáig csinálja …”.</p>',
    members: [
      ['2B-04-1', '-다가', '… közben (abbahagyva) …', ['공부하<b>다가</b> 잠이 들었어요.', 'Tanulás közben elaludtam.']],
      ['3A-06-2', '-(으)려 + <b>-다가</b>', '… akartam, de (végül) …', ['전화하<b>려다가</b> 문자를 보냈어요.', 'Fel akartam hívni, de végül üzenetet küldtem.']],
      ['3A-11-1', '-다(가) + <b>보다</b> + -면', 'ha az ember sokáig …', ['한국 드라마를 자주 보<b>다 보면</b> 듣기 실력이 늘 거예요.', 'Ha sokat nézel koreai sorozatot, fejlődik a hallásértésed.']],
      ['4B-07-2', '-다(가) + <b>보다</b> + -니(까)', 'ahogy sokáig …, rájöttem', ['매일 만나<b>다 보니</b> 친해졌어요.', 'Ahogy minden nap találkoztunk, összebarátkoztunk.']],
    ],
  },
  {
    id: 'eulkka', kind: 'form', title: '-(으)ㄹ까',
    explanation: '<p>A -(으)ㄹ까 bizonytalan, „vajon?” jellegű kérdés. Ebből jön a javaslat („… -junk?”) és a találgatás („vajon …?”). Ha más elem kapcsolódik hozzá: tépelődés („azon gondolkodom”) és aggodalom („attól tartva, hogy …”).</p>',
    members: [
      ['1A-10-2', '-(으)ㄹ까요?', '… -junk? (javaslat)', ['같이 점심 먹<b>을까요</b>?', 'Együnk együtt ebédet?']],
      ['2A-02-2', '-(으)ㄹ까요?', 'vajon …? (találgatás)', ['내일 비가 <b>올까요</b>?', 'Vajon esni fog holnap?']],
      ['3A-03-1', '-(으)ㄹ까 + <b>하다</b>', 'azon gondolkodom, hogy …', ['이번 방학에 한국에 <b>갈까 해요</b>.', 'Azon gondolkodom, hogy ebben a szünetben Koreába megyek.']],
      ['3B-02-1', '-(으)ㄹ까 + <b>보다</b> + -아', 'attól tartva, hogy …', ['<b>늦을까 봐</b> 택시를 탔어요.', 'Attól tartva, hogy elkések, taxiba ültem.']],
      ['4B-03-1', '-(으)ㄹ까 … -(으)ㄹ까', '… vagy …? (tépelődés)', ['짜장면을 먹<b>을까</b> 짬뽕을 먹<b>을까</b> 고민이에요.', 'Nem tudom eldönteni, dzsadzsangmjont vagy dzsambbongot egyek.']],
    ],
  },
  {
    id: 'ji', kind: 'form', title: '-지',
    explanation: '<p>A -지 a tő után áll, és a következő elemhez köti az igét: tagadáshoz (않다, 못하다, 말다), ellentéthez (-지만) vagy a hallgatóhoz forduló kérdéshez (-지요?, -지 않아요?).</p>',
    members: [
      ['1B-09-1', '-지 + <b>만</b>', 'de, viszont', ['김치는 맵<b>지만</b> 맛있어요.', 'A kimcsi csípős, de finom.']],
      ['2A-05-2', '-지 + <b>않다</b> / <b>못하다</b>', 'nem … / nem tud …', ['저는 수영을 하<b>지 못해요</b>.', 'Nem tudok úszni.']],
      ['2A-06-2', '-지 + <b>요</b>?', '…, ugye?', ['한국 음식 좋아하<b>지요</b>?', 'Ugye szereted a koreai ételeket?']],
      ['2B-05-2', '-지 + <b>말다</b>', 'ne …!', ['수업 시간에 떠들<b>지 마세요</b>.', 'Óra alatt ne beszélgessetek.']],
      ['3A-03-2', '-지 + <b>만</b> + 않으면', 'csak (az) ne …', ['늦<b>지만 않으면</b> 괜찮아요.', 'Csak ne késs el, akkor rendben van.']],
      ['4A-09-1', '-지 + <b>않아요</b>?', 'hát nem …?', ['이 옷 좀 크<b>지 않아요</b>?', 'Nem túl nagy ez a ruha?']],
      ['4B-03-2', '-지 + <b>그래요</b>?', 'miért nem …? (tanács)', ['피곤하면 좀 쉬<b>지 그래요</b>?', 'Ha fáradt vagy, miért nem pihensz egy kicsit?']],
      ['4B-11-1', '-지 + <b>않을까</b> + 싶다', 'azt hiszem, (talán) …', ['내일은 비가 오<b>지 않을까 싶어요</b>.', 'Azt hiszem, holnap talán esni fog.']],
    ],
  },
  {
    id: 'ge', kind: 'form', title: '-게',
    explanation: '<p>A -게 a tőből határozót csinál („…-an/-en, úgy, hogy …”). A 되다 („lesz”) igével „úgy alakul”, a 하다 („csinál”) igével „ráveszi, hogy …” lesz belőle.</p>',
    members: [
      ['2B-10-2', '-게', 'úgy, hogy …; azért, hogy …', ['뒤에서도 들리<b>게</b> 크게 말해 주세요.', 'Kérem, beszéljen hangosan, hogy hátul is hallják.']],
      ['2B-12-2', '-게 + <b>되다</b> („lesz”)', 'úgy alakult, hogy …', ['한국 회사에서 일하<b>게 됐어요</b>.', 'Úgy alakult, hogy egy koreai cégnél dolgozom.']],
      ['4A-06-2', '-게 + <b>하다</b> („csinál”)', 'ráveszi, hogy …', ['엄마가 동생에게 방을 청소하<b>게 했어요</b>.', 'Anya rávette az öcsémet, hogy kitakarítsa a szobáját.']],
    ],
  },
  {
    id: 'ado', kind: 'form', title: '-아도/어도',
    explanation: '<p>Az -아도/어도 jelentése „még ha … is”. A 되다 („rendben van”) igével: „még ha megteszed is, rendben van”, azaz szabad.</p>',
    members: [
      ['2B-06-1', '-아도/어도 + <b>되다</b>', 'szabad …', ['여기 앉<b>아도 돼요</b>?', 'Leülhetek ide?']],
      ['3B-01-1', '-아도/어도', 'még ha … is; hiába …', ['아무리 바빠<b>도</b> 아침은 꼭 먹어요.', 'Akármennyire sietek is, a reggelit mindig megeszem.']],
    ],
  },
  {
    id: 'neunde', kind: 'form', title: '-는데/(으)ㄴ데',
    explanation: '<p>Ugyanaz a végződés háromféle szerepben: háttér, amire a folytatás épül; ellentét („de”); a mondat végén -요-val csodálkozás.</p>',
    members: [
      ['2A-08-1', '-는데', '…, és (ezért) … (háttér)', ['배가 고<b>픈데</b> 뭐 먹으러 갈까요?', 'Éhes vagyok, menjünk el enni valamit?']],
      ['2B-08-1', '-는데', '…, de … (ellentét)', ['형은 키가 <b>큰데</b> 저는 작아요.', 'A bátyám magas, én viszont alacsony vagyok.']],
      ['2B-09-2', '-는데 + <b>요</b>', '… ám! milyen …! (csodálkozás)', ['와, 경치가 정말 아름다<b>운데요</b>!', 'Hű, milyen gyönyörű a kilátás!']],
    ],
  },
  {
    id: 'nikka', kind: 'form', title: '-(으)니까 (két jelentés)',
    explanation: '<p>Ugyanaz az alak két jelentéssel: ok („mert”), illetve egy múltbeli cselekvés után felfedezés („amikor …, rájöttem”).</p>',
    members: [
      ['1B-12-2', '-(으)니까', 'mert … (ok)', ['비가 오<b>니까</b> 우산을 가져가세요.', 'Mivel esik, vigyél esernyőt.']],
      ['2B-07-2', '-(으)니까', 'amikor …, rájöttem (felfedezés)', ['집에 가<b>니까</b> 아무도 없었어요.', 'Amikor hazaértem, senki sem volt otthon.']],
      ['3A-05-1', '-아/어 <b>보</b> + -니까', 'amikor kipróbáltam, rájöttem …', ['신발을 신어 보<b>니까</b> 좀 작았어요.', 'Felpróbáltam a cipőt, és kiderült, hogy kicsit kicsi.']],
    ],
  },
  {
    id: 'myeonseo', kind: 'form', title: '-(으)면서 (két jelentés)',
    explanation: '<p>Ugyanaz az alak két jelentéssel: egyidejűség („miközben”) és kiváltó ok („azzal, hogy …; ahogy …, úgy …”).</p>',
    members: [
      ['2A-06-1', '-(으)면서', 'miközben … (egyidejűség)', ['음악을 들으<b>면서</b> 공부해요.', 'Zenét hallgatva tanulok.']],
      ['4A-04-2', '-(으)면서', 'azzal, hogy …; ahogy … (kiváltó ok)', ['한국 친구를 사귀<b>면서</b> 한국어 실력이 늘었어요.', 'Azzal, hogy koreai barátokat szereztem, sokat fejlődött a koreaim.']],
    ],
  },
] satisfies RelatedGroup[];
