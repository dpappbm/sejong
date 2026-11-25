import { bold, list, paragraph, text } from '../lib/richText';
import type { RelatedGroup } from './types';

const korean = (text: string): string => text;

export default [
  {
    id: `future-intention`,
    title: `jövőbeli szándék, elhatározottság`,
    scale: [
      [`1A-10-1`, `vágy`],
      [`3A-03-1`, `fontolgatom`],
      [`1B-07-1`, `szándékom`],
      [`1B-03-2`, `tervem, fogom`],
      [`2A-04-1`, `eldöntöttem`],
    ],
    explanation: [
      paragraph`Minél jobbra, annál biztosabb, hogy meg is lesz. A ${korean('-고 싶다')} csak vágy, nincs mögötte terv. A ${korean('-(으)ㄹ까 하다')} még csak ötlet. A ${korean('-(으)려고 하다')} szándék, de még változhat. A ${korean('-(으)ㄹ 거예요')} a sima „fogok”: terv, amit nem hangsúlyozunk külön. A ${korean('-기로 하다')} kész döntés vagy megállapodás (többnyire múlt időben: ${korean('-기로 했어요')}).`,
    ],
    examples: [
      [`여행 가고 싶어요.`, `Szeretnék elutazni.`],
      [`여행 갈까 해요.`, `Gondolkodom rajta, hogy elutazom.`],
      [`여행 가려고 해요.`, `El akarok utazni.`],
      [`여행 갈 거예요.`, `El fogok utazni.`],
      [`여행 가기로 했어요.`, `Elhatároztam (megbeszéltük), hogy elutazom.`],
    ],
    side: [
      [`3A-08-2`, `hirtelen, erős elhatározás: „ezt meg kell tennem!”`],
      [`4B-05-2`, `ugyanez magamnak mondva, tegezve`],
      [`2B-01-2`, `ígéret a hallgatónak: „majd én …”`],
      [`2B-01-1`, `„én …-t kérek / akarok”; kérdésként a másik szándékát kérdezi`],
      [`4A-12-2`, text`a ${korean('-(으)려고 하다')} hivatalos, írott párja`],
    ],
  },
  {
    id: `contrast`,
    title: `ellentét – „de, viszont, cserébe”`,
    scale: [
      [`2B-08-1`, `lágy, beszélt`],
      [`1B-09-1`, `határozott`],
      [`4B-09-2`, `írott, hivatalos`],
    ],
    explanation: [
      paragraph`Mindhárom „de”; jobbra haladva az ellentét egyre határozottabb, a stílus egyre írottabb. Beszédben a -는데 a leggyakoribb: inkább bemutatja a helyzetet, mint szembeállít. A -지만 két tényt világosan szembeállít, vagy a várttal ellentétes folytatást hoz. A -(으)나 ugyanez írásban, hivatalos szövegben.`,
      paragraph`Segítő kérdések:`,
      list(
        'Mi áll szemben az első állítással? → -지만',
        'Minek a háttere, előzménye az első tag? → -는데',
        'Mi helyettesíti vagy ellensúlyozza az első dolgot? → -는/(으)ㄴ 대신에'
      ),
    ],
    examples: [
      [`이 식당은 비싼데 음식이 맛있어요.`, `Ez az étterem drága, viszont finom az étel.`],
      [`이 식당은 비싸지만 음식이 맛있어요.`, `Ez az étterem drága, de finom az étel.`],
      [`이 식당은 비싸나 음식이 맛있습니다.`, `Az étterem drága, azonban az étel finom.`],
      [`이 식당은 비싼 대신에 음식이 정말 맛있어요.`, `Ez az étterem drága, cserébe nagyon finom az étel.`],
    ],
    correctIncorrect: [
      { incorrect: `주말에 부산에 가지만 같이 갈래요?`, reason: `nincs ellentét: az utazás csak a kérdés háttere` },
      { correct: `주말에 부산에 가는데 같이 갈래요?`, translation: `Hétvégén Busanba megyek. Jössz velem?` },
      { incorrect: `커피를 마시지만 차를 마셨어요.`, reason: `a kávé elmaradt, a tea került a helyére` },
      { correct: `커피를 마시는 대신에 차를 마셨어요.`, translation: `Kávé helyett teát ittam.` },
    ],
    side: [
      [
        `3A-09-2`,
        `nem puszta ellentét: a második tag az elsőt helyettesíti („helyett”) vagy ellensúlyozza („cserébe”)`,
      ],
      [`2A-08-1`, `ugyanaz az alak ellentét nélkül: háttér, előzmény a folytatáshoz`],
    ],
  },
  {
    id: `change`,
    title: `változás – „…-vá válik, úgy alakul, egyre …”`,
    unordered: true,
    scale: [
      [`3A-09-1`, `melléknév: az állapot megváltozik`],
      [`2B-12-2`, `ige: úgy alakul, hogy …`],
      [`3B-11-1`, `a változás halad előre`],
    ],
    explanation: [
      paragraph`Mindhárom változást fejez ki, de mást változtat. Ha egy ${bold('tulajdonság, állapot')} lesz más, a melléknévhez -아지다/어지다 járul. Ha egy ${bold('cselekvés, szokás, helyzet')} alakul ki (nem csak a saját döntésünkből), az igéhez -게 되다. Melléknévvel a -게 되다 egyszerű változásra nem természetes: 날씨가 추워졌어요, nem 춥게 됐어요. Ha viszont egy körülmény következménye, mindkettő jó: 시험을 못 봐서 합격이 어렵게 됐어요 / 어려워졌어요 („nem sikerült a vizsga, így nehéz lesz átmenni”); a -게 되다 az eredményt, az -아지다/어지다 inkább a folyamatot emeli ki (날씨가 점점 추워져요). Az -아/어 가다 azt teszi hozzá, hogy a folyamat még tart, egy végpont felé halad; az -아지다-val össze is kapcsolható: 추워져 가요.`,
    ],
    examples: [
      [`한국어 실력이 좋아졌어요.`, `Javult a koreaitudásom.`],
      [`한국어를 좋아하게 됐어요.`, `Megszerettem a koreai nyelvet.`],
      [`한국어 실력이 좋아져 가요.`, `Egyre jobb a koreaitudásom.`],
    ],
    correctIncorrect: [
      { incorrect: `한국어 실력이 좋아하게 됐어요.`, reason: `a 좋다 („jó”) állapota változik, nem a 좋아하다` },
      { correct: `한국어 실력이 좋아졌어요.`, translation: `Javult a koreaitudásom.` },
      { incorrect: `한국어를 좋아졌어요.`, reason: `a 좋아지다 mellett nem állhat 을/를` },
      {
        correct: `한국어를 좋아하게 됐어요.`,
        translation: `Megszerettem a koreait.`,
        note: `ugyanígy helyes: 한국어가 좋아졌어요.`,
      },
      { incorrect: `매일 운동해졌어요.`, reason: `az 운동하다 ige: új szokásra -게 되다` },
      { correct: `매일 운동하게 됐어요.`, translation: `Úgy alakult, hogy mindennap edzek.` },
    ],
  },

  {
    id: `gi`,
    kind: `form`,
    title: `-기`,
    explanation: [
      paragraph`A -기 az ige vagy a melléknév tövéből főnevet képez: 가다 → 가기 „menés”, 먹다 → 먹기 „evés”. Ezért kaphat partikulát (가, 를, 는, (으)로, 보다), és állhat főnév előtt (전, 때문). A család tagjainak jelentése többnyire kiolvasható a felbontásból.`,
    ],

    members: [
      [
        `1B-10-1`,
        text`-기 + ${bold('전')} („előtt”) + 에`,
        `mielőtt …`,
        [text`자${bold('기 전에')} 이를 닦아요.`, `Lefekvés előtt fogat mosok.`],
      ],
      [
        `2A-04-1`,
        text`-기 + ${bold('(으)로')} + 하다`,
        `elhatározza / megbeszélik, hogy …`,
        [
          text`주말에 친구와 영화를 보${bold('기로 했어요')}.`,
          `Megbeszéltük a barátommal, hogy hétvégén filmet nézünk.`,
        ],
      ],
      [
        `2A-05-1`,
        text`-기 + ${bold('가')} + 좋다 („jó”)`,
        `jó …-ni`,
        [text`이 공원은 산책하${bold('기가 좋아요')}.`, `Ebben a parkban jó sétálni.`],
      ],
      [
        `2B-09-1`,
        text`-기 + ${bold('때문')} („ok”) + 에`,
        `mert …`,
        [text`비가 오${bold('기 때문에')} 집에 있을 거예요.`, `Mivel esik az eső, otthon maradok.`],
      ],
      [
        `3A-08-1`,
        text`-기 + ${bold('위하다')} („-ért van”) + -아서`,
        `azért, hogy …`,
        [
          text`건강을 지키${bold('기 위해서')} 매일 걸어요.`,
          `Azért gyalogolok minden nap, hogy megőrizzem az egészségemet.`,
        ],
      ],
      [
        `3B-08-2`,
        text`-기 + ${bold('는')} + 요`,
        `ugyan már, dehogy …`,
        [
          text`가: 한국어 정말 잘하시네요. 나: 잘하${bold('기는요')}.`,
          `– Nagyon jól beszél koreaiul! – Ugyan, dehogy!`,
        ],
      ],
      [
        `3B-12-1`,
        text`-기 + ${bold('는')} + 하다`,
        `… az igaz, (de) …`,
        [text`이 옷이 예쁘${bold('기는 한데')} 너무 비싸요.`, `Ez a ruha szép, az igaz, de túl drága.`],
      ],
      [
        `4A-05-2`,
        text`-기 + ${bold('가')} + 쉽다 / 어렵다 …`,
        `könnyű / nehéz …-ni`,
        [text`한국어 발음은 정확하게 하${bold('기가 어려워요')}.`, `A koreai kiejtést nehéz pontosan eltalálni.`],
      ],
      [
        `4B-11-2`,
        text`-기 + ${bold('보다')} („-nál”) + 는`,
        `ahelyett, hogy …, inkább`,
        [text`집에서 쉬${bold('기보다는')} 밖에 나가고 싶어요.`, `Ahelyett, hogy otthon pihennék, inkább kimennék.`],
      ],
      [
        `4B-12-2`,
        text`-기 + ${bold('를')} + 바라다 („remél”)`,
        `remélem, hogy …`,
        [text`시험에 꼭 합격하${bold('기를 바라요')}.`, `Remélem, hogy mindenképp sikerül a vizsgád.`],
      ],
    ],
  },
  {
    id: `auxiliary-verbs`,
    kind: `form`,
    title: `-아/어 + segédige`,
    explanation: [
      paragraph`Az -아/어 alak (ugyanaz, mint az -아요/어요, csak -요 nélkül) után egy második ige áll. Ez a cselekvés módját, irányát vagy eredményét adja hozzá: 보다 „néz → kipróbál”, 주다 „ad → valakinek megtesz”, 놓다/두다 „tesz → elkészít és úgy hagy”, 버리다 „eldob → teljesen megtesz”, 가다 „megy → egyre …”.`,
    ],
    members: [
      [
        `2A-08-2`,
        text`-아/어 + ${bold('보다')} („néz”)`,
        `próbáld meg …`,
        [text`이 김치 한번 먹${bold('어 보세요')}.`, `Kóstold meg ezt a kimcsit!`],
      ],
      [
        `2A-12-1`,
        text`-아/어 + ${bold('보다')}, múlt időben`,
        `már csináltam (tapasztalat)`,
        [text`제주도에 ${bold('가 봤어요')}.`, `Voltam már Csedzsu-szigeten.`],
      ],
      [
        `2B-04-2`,
        text`-아/어 + ${bold('주다')} („ad”)`,
        `megteszi valakinek`,
        [text`친구가 사진을 찍${bold('어 줬어요')}.`, `A barátom lefényképezett (nekem).`],
      ],
      [
        `3A-01-2`,
        text`-아/어 + ${bold('보이다')} („látszik”)`,
        `…-nak látszik`,
        [text`오늘 피곤${bold('해 보여요')}.`, `Ma fáradtnak tűnsz.`],
      ],
      [
        `3A-05-1`,
        text`-아/어 + ${bold('보다')} + -(으)니까`,
        `amikor kipróbáltam, rájöttem …`,
        [
          text`한복을 입${bold('어 보니까')} 생각보다 편했어요.`,
          `Felpróbáltam a hanbokot, és rájöttem, hogy kényelmesebb, mint gondoltam.`,
        ],
      ],
      [
        `3A-09-1`,
        text`-아/어 + ${bold('지다')}`,
        `…-vá válik, egyre …`,
        [text`날씨가 점점 추${bold('워져요')}.`, `Egyre hidegebb lesz az idő.`],
      ],
      [
        `3B-01-2`,
        text`-아/어 + ${bold('드리다')} (a 주다 tiszteleti párja)`,
        `megteszi (tisztelt) valakinek`,
        [text`할머니께 편지를 읽${bold('어 드렸어요')}.`, `Felolvastam a levelet a nagymamának.`],
      ],
      [
        `3B-04-1`,
        text`-아/어 + ${bold('놓다')} („letesz”)`,
        `elkészít (és úgy hagy)`,
        [
          text`손님이 오기 전에 음식을 만들${bold('어 놓았어요')}.`,
          `Mielőtt a vendégek megjöttek, elkészítettem az ételt.`,
        ],
      ],
      [
        `3B-05-2`,
        text`-아/어 + ${bold('버리다')} („eldob”)`,
        `teljesen, végleg megtesz`,
        [text`케이크를 혼자 다 먹${bold('어 버렸어요')}.`, `Egyedül megettem az egész tortát.`],
      ],
      [
        `3B-07-1`,
        text`-아/어 + ${bold('가지다')} („fog, tart”) + 고`,
        `…, és ezért / és azzal …`,
        [text`돈을 모${bold('아 가지고')} 노트북을 샀어요.`, `Összegyűjtöttem a pénzt, és abból vettem laptopot.`],
      ],
      [
        `3B-11-1`,
        text`-아/어 + ${bold('가다')} („megy”)`,
        `egyre …, folyamatosan`,
        [text`한국 생활에 점점 익숙해${bold('져 가요')}.`, `Egyre jobban megszokom a koreai életet.`],
      ],
      [
        `3B-11-2`,
        text`-아/어 + ${bold('두다')} („tesz”)`,
        `előre megcsinál, eltesz`,
        [text`여행 가기 전에 호텔을 예약${bold('해 두었어요')}.`, `Utazás előtt előre lefoglaltam a szállodát.`],
      ],
    ],
  },
  {
    id: `aya`,
    kind: `form`,
    title: `-아야/어야`,
    explanation: [
      paragraph`Az -아야/어야 jelentése „csak ha …, csak úgy …” (szükséges feltétel). Erre épülnek a „kell” jelentésű szerkezetek: „csak ha megteszem, (akkor) rendben (되다)”.`,
    ],
    members: [
      [
        `1B-09-2`,
        text`-아야/어야 + ${bold('되다')}`,
        `kell, muszáj`,
        [text`내일까지 숙제를 내${bold('야 돼요')}.`, `Holnapig be kell adnom a házi feladatot.`],
      ],
      [
        `3A-08-2`,
        text`-아야/어야 + ${bold('-겠다')} (szándék)`,
        `ezt meg kell tennem!`,
        [text`너무 늦었네요. 이제 집에 가${bold('야겠어요')}.`, `Nagyon késő van, most már haza kell mennem.`],
      ],
      [
        `3A-10-2`,
        `-아야/어야 (magában)`,
        `csak ha …; ahhoz, hogy …`,
        [text`연습을 많이 해${bold('야')} 잘할 수 있어요.`, `Csak ha sokat gyakorolsz, akkor leszel benne jó.`],
      ],
      [
        `4B-04-1`,
        text`-았/었 + -어야 + ${bold('했는데')}`,
        `…-nom kellett volna (pedig)`,
        [text`우산을 가져왔${bold('어야 했는데')}.`, `Hoznom kellett volna esernyőt.`],
      ],
      [
        `4B-05-2`,
        text`-아야/어야 + ${bold('-지')}`,
        `… kell(ene) (hát)!`,
        [text`내일부터는 일찍 일어나${bold('야지')}.`, `Holnaptól korán kell kelnem! (magamnak mondva)`],
      ],
    ],
  },
  {
    id: `myeon`,
    kind: `form`,
    title: `-(으)면`,
    explanation: [
      paragraph`A -(으)면 a „ha” feltétel. Sok szerkezet épül rá: a feltétel után egy értékelés áll (좋겠다 „jó lenne”, 안 되다 „nem jó”), vagy elé kerül egy másik elem (szándék: -(으)려, elképzelt: -는다, múlt: -았/었).`,
    ],
    members: [
      [`2A-07-1`, `-(으)면`, `ha …`, [text`시간이 있${bold('으면')} 같이 가요.`, `Ha van időd, menjünk együtt.`]],
      [
        `2A-10-2`,
        text`-(으)면 + ${bold('좋겠다')} („jó lenne”)`,
        `jó lenne, ha …; bárcsak …`,
        [text`내일 날씨가 좋${bold('으면 좋겠어요')}.`, `Bárcsak jó idő lenne holnap!`],
      ],
      [
        `2B-06-2`,
        text`-(으)면 + ${bold('안 되다')} („nem jó”)`,
        `nem szabad …`,
        [text`여기에서 사진을 찍${bold('으면 안 돼요')}.`, `Itt nem szabad fényképezni.`],
      ],
      [
        `3A-05-2`,
        text`${bold('-(으)려')} + -면`,
        `ha … akarsz`,
        [text`시청에 가${bold('려면')} 2호선을 타세요.`, `Ha a városházára akarsz menni, szállj fel a 2-es metróra.`],
      ],
      [
        `4A-01-1`,
        text`${bold('-는다')} + -면`,
        `ha (netán) …`,
        [
          text`복권에 당첨된${bold('다면')} 세계 여행을 하고 싶어요.`,
          `Ha (netán) megnyerném a lottót, körbeutaznám a világot.`,
        ],
      ],
      [
        `4A-01-2`,
        text`${bold('-았/었')} + -으면 + 하다`,
        `szeretném, ha …`,
        [text`이번 시험에 합격했${bold('으면 해요')}.`, `Szeretném, ha sikerülne ez a vizsga.`],
      ],
    ],
  },
  {
    id: `ryeo`,
    kind: `form`,
    title: `-(으)려`,
    explanation: [
      paragraph`A -(으)려 a szándék jele („… akar”). A -고 하다, a -면 és a -다가 végződéssel három szerkezet lesz belőle.`,
    ],
    members: [
      [
        `1B-07-1`,
        text`-(으)려 + ${bold('-고 하다')}`,
        `… akarok, szándékozom`,
        [text`주말에 등산하${bold('려고 해요')}.`, `Hétvégén túrázni akarok.`],
      ],
      [
        `3A-05-2`,
        text`-(으)려 + ${bold('-면')}`,
        `ha … akarsz`,
        [text`표를 사${bold('려면')} 일찍 가야 돼요.`, `Ha jegyet akarsz venni, korán kell menned.`],
      ],
      [
        `3A-06-2`,
        text`-(으)려 + ${bold('-다가')}`,
        `… akartam, de (végül) …`,
        [text`버스를 타${bold('려다가')} 걸어왔어요.`, `Buszra akartam szállni, de végül gyalog jöttem.`],
      ],
    ],
  },
  {
    id: `daga`,
    kind: `form`,
    title: `-다(가)`,
    explanation: [
      paragraph`A -다가 egy cselekvést megszakít, vagy átvezet egy másikba („… közben, aztán”). A 보다 („lát”) igével összetéve azt jelenti: „ha / ahogy az ember sokáig csinálja …”.`,
    ],
    members: [
      [
        `2B-04-1`,
        `-다가`,
        `… közben (abbahagyva) …`,
        [text`공부하${bold('다가')} 잠이 들었어요.`, `Tanulás közben elaludtam.`],
      ],
      [
        `3A-06-2`,
        text`-(으)려 + ${bold('-다가')}`,
        `… akartam, de (végül) …`,
        [text`전화하${bold('려다가')} 문자를 보냈어요.`, `Fel akartam hívni, de végül üzenetet küldtem.`],
      ],
      [
        `3A-11-1`,
        text`-다(가) + ${bold('보다')} + -면`,
        `ha az ember sokáig …`,
        [
          text`한국 드라마를 자주 보${bold('다 보면')} 듣기 실력이 늘 거예요.`,
          `Ha sokat nézel koreai sorozatot, fejlődik a hallásértésed.`,
        ],
      ],
      [
        `4B-07-2`,
        text`-다(가) + ${bold('보다')} + -니(까)`,
        `ahogy sokáig …, rájöttem`,
        [text`매일 만나${bold('다 보니')} 친해졌어요.`, `Ahogy minden nap találkoztunk, összebarátkoztunk.`],
      ],
    ],
  },
  {
    id: `eulkka`,
    kind: `form`,
    title: `-(으)ㄹ까`,
    explanation: [
      paragraph`A -(으)ㄹ까 bizonytalan, „vajon?” jellegű kérdés. Ebből jön a javaslat („… -junk?”) és a találgatás („vajon …?”). Ha más elem kapcsolódik hozzá: tépelődés („azon gondolkodom”) és aggodalom („attól tartva, hogy …”).`,
    ],
    members: [
      [
        `1A-10-2`,
        `-(으)ㄹ까요?`,
        `… -junk? (javaslat)`,
        [text`같이 점심 먹${bold('을까요')}?`, `Együnk együtt ebédet?`],
      ],
      [
        `2A-02-2`,
        `-(으)ㄹ까요?`,
        `vajon …? (találgatás)`,
        [text`내일 비가 ${bold('올까요')}?`, `Vajon esni fog holnap?`],
      ],
      [
        `3A-03-1`,
        text`-(으)ㄹ까 + ${bold('하다')}`,
        `azon gondolkodom, hogy …`,
        [text`이번 방학에 한국에 ${bold('갈까 해요')}.`, `Azon gondolkodom, hogy ebben a szünetben Koreába megyek.`],
      ],
      [
        `3B-02-1`,
        text`-(으)ㄹ까 + ${bold('보다')} + -아`,
        `attól tartva, hogy …`,
        [text`${bold('늦을까 봐')} 택시를 탔어요.`, `Attól tartva, hogy elkések, taxiba ültem.`],
      ],
      [
        `4B-03-1`,
        `-(으)ㄹ까 … -(으)ㄹ까`,
        `… vagy …? (tépelődés)`,
        [
          text`짜장면을 먹${bold('을까')} 짬뽕을 먹${bold('을까')} 고민이에요.`,
          `Nem tudom eldönteni, dzsadzsangmjont vagy dzsambbongot egyek.`,
        ],
      ],
    ],
  },
  {
    id: `ji`,
    kind: `form`,
    title: `-지`,
    explanation: [
      paragraph`A -지 a tő után áll, és a következő elemhez köti az igét: tagadáshoz (않다, 못하다, 말다), ellentéthez (-지만) vagy a hallgatóhoz forduló kérdéshez (-지요?, -지 않아요?).`,
    ],
    members: [
      [
        `1B-09-1`,
        text`-지 + ${bold('만')}`,
        `de, viszont`,
        [text`김치는 맵${bold('지만')} 맛있어요.`, `A kimcsi csípős, de finom.`],
      ],
      [
        `2A-05-2`,
        text`-지 + ${bold('않다')} / ${bold('못하다')}`,
        `nem … / nem tud …`,
        [text`저는 수영을 하${bold('지 못해요')}.`, `Nem tudok úszni.`],
      ],
      [
        `2A-06-2`,
        text`-지 + ${bold('요')}?`,
        `…, ugye?`,
        [text`한국 음식 좋아하${bold('지요')}?`, `Ugye szereted a koreai ételeket?`],
      ],
      [
        `2B-05-2`,
        text`-지 + ${bold('말다')}`,
        `ne …!`,
        [text`수업 시간에 떠들${bold('지 마세요')}.`, `Óra alatt ne beszélgessetek.`],
      ],
      [
        `3A-03-2`,
        text`-지 + ${bold('만')} + 않으면`,
        `csak (az) ne …`,
        [text`늦${bold('지만 않으면')} 괜찮아요.`, `Csak ne késs el, akkor rendben van.`],
      ],
      [
        `4A-09-1`,
        text`-지 + ${bold('않아요')}?`,
        `hát nem …?`,
        [text`이 옷 좀 크${bold('지 않아요')}?`, `Nem túl nagy ez a ruha?`],
      ],
      [
        `4B-03-2`,
        text`-지 + ${bold('그래요')}?`,
        `miért nem …? (tanács)`,
        [text`피곤하면 좀 쉬${bold('지 그래요')}?`, `Ha fáradt vagy, miért nem pihensz egy kicsit?`],
      ],
      [
        `4B-11-1`,
        text`-지 + ${bold('않을까')} + 싶다`,
        `azt hiszem, (talán) …`,
        [text`내일은 비가 오${bold('지 않을까 싶어요')}.`, `Azt hiszem, holnap talán esni fog.`],
      ],
    ],
  },
  {
    id: `ge`,
    kind: `form`,
    title: `-게`,
    explanation: [
      paragraph`A -게 a tőből határozót csinál („…-an/-en, úgy, hogy …”). A 되다 („lesz”) igével „úgy alakul”, a 하다 („csinál”) igével „ráveszi, hogy …” lesz belőle.`,
    ],
    members: [
      [
        `2B-10-2`,
        `-게`,
        `úgy, hogy …; azért, hogy …`,
        [text`뒤에서도 들리${bold('게')} 크게 말해 주세요.`, `Kérem, beszéljen hangosan, hogy hátul is hallják.`],
      ],
      [
        `2B-12-2`,
        text`-게 + ${bold('되다')} („lesz”)`,
        `úgy alakult, hogy …`,
        [text`한국 회사에서 일하${bold('게 됐어요')}.`, `Úgy alakult, hogy egy koreai cégnél dolgozom.`],
      ],
      [
        `4A-06-2`,
        text`-게 + ${bold('하다')} („csinál”)`,
        `ráveszi, hogy …`,
        [
          text`엄마가 동생에게 방을 청소하${bold('게 했어요')}.`,
          `Anya rávette az öcsémet, hogy kitakarítsa a szobáját.`,
        ],
      ],
    ],
  },
  {
    id: `ado`,
    kind: `form`,
    title: `-아도/어도`,
    explanation: [
      paragraph`Az -아도/어도 jelentése „még ha … is”. A 되다 („rendben van”) igével: „még ha megteszed is, rendben van”, azaz szabad.`,
    ],
    members: [
      [
        `2B-06-1`,
        text`-아도/어도 + ${bold('되다')}`,
        `szabad …`,
        [text`여기 앉${bold('아도 돼요')}?`, `Leülhetek ide?`],
      ],
      [
        `3B-01-1`,
        `-아도/어도`,
        `még ha … is; hiába …`,
        [text`아무리 바빠${bold('도')} 아침은 꼭 먹어요.`, `Akármennyire sietek is, a reggelit mindig megeszem.`],
      ],
    ],
  },
  {
    id: `neunde`,
    kind: `form`,
    title: `-는데/(으)ㄴ데`,
    explanation: [
      paragraph`Ugyanaz a végződés háromféle szerepben: háttér, amire a folytatás épül; ellentét („de”); a mondat végén -요-val csodálkozás.`,
    ],
    members: [
      [
        `2A-08-1`,
        `-는데`,
        `…, és (ezért) … (háttér)`,
        [text`배가 고${bold('픈데')} 뭐 먹으러 갈까요?`, `Éhes vagyok, menjünk el enni valamit?`],
      ],
      [
        `2B-08-1`,
        `-는데`,
        `…, de … (ellentét)`,
        [text`형은 키가 ${bold('큰데')} 저는 작아요.`, `A bátyám magas, én viszont alacsony vagyok.`],
      ],
      [
        `2B-09-2`,
        text`-는데 + ${bold('요')}`,
        `… ám! milyen …! (csodálkozás)`,
        [text`와, 경치가 정말 아름다${bold('운데요')}!`, `Hű, milyen gyönyörű a kilátás!`],
      ],
    ],
  },
  {
    id: `nikka`,
    kind: `form`,
    title: `-(으)니까 (két jelentés)`,
    explanation: [
      paragraph`Ugyanaz az alak két jelentéssel: ok („mert”), illetve egy múltbeli cselekvés után felfedezés („amikor …, rájöttem”).`,
    ],
    members: [
      [
        `1B-12-2`,
        `-(으)니까`,
        `mert … (ok)`,
        [text`비가 오${bold('니까')} 우산을 가져가세요.`, `Mivel esik, vigyél esernyőt.`],
      ],
      [
        `2B-07-2`,
        `-(으)니까`,
        `amikor …, rájöttem (felfedezés)`,
        [text`집에 가${bold('니까')} 아무도 없었어요.`, `Amikor hazaértem, senki sem volt otthon.`],
      ],
      [
        `3A-05-1`,
        text`-아/어 ${bold('보')} + -니까`,
        `amikor kipróbáltam, rájöttem …`,
        [text`신발을 신어 보${bold('니까')} 좀 작았어요.`, `Felpróbáltam a cipőt, és kiderült, hogy kicsit kicsi.`],
      ],
    ],
  },
  {
    id: `myeonseo`,
    kind: `form`,
    title: `-(으)면서 (két jelentés)`,
    explanation: [
      paragraph`Ugyanaz az alak két jelentéssel: egyidejűség („miközben”) és kiváltó ok („azzal, hogy …; ahogy …, úgy …”).`,
    ],
    members: [
      [
        `2A-06-1`,
        `-(으)면서`,
        `miközben … (egyidejűség)`,
        [text`음악을 들으${bold('면서')} 공부해요.`, `Zenét hallgatva tanulok.`],
      ],
      [
        `4A-04-2`,
        `-(으)면서`,
        `azzal, hogy …; ahogy … (kiváltó ok)`,
        [
          text`한국 친구를 사귀${bold('면서')} 한국어 실력이 늘었어요.`,
          `Azzal, hogy koreai barátokat szereztem, sokat fejlődött a koreaim.`,
        ],
      ],
    ],
  },
] satisfies RelatedGroup[];
