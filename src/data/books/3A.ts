import {
  createWord,
  plainStyleStatement,
  withAOrEo,
  withEu,
  withPast,
  withPlainStem,
  type Word,
} from "../../lib/conjugation";
import { exampleList } from "../../lib/html";
import type { BookData, PointSource } from "../types";

const korean = (text: string) => `<span class="korean">${text}</span>`;
const simpleTable = (headers: string[], rows: string[][]) =>
  `<div class="table-wrapper"><table class="plain"><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const vocabularyGrammarPageOf = (lesson: number, point: number) =>
    24 + 2 * (lesson - 1) + (point - 1),
  studentBookPageOf = (lesson: number, point: number) =>
    16 + 8 * (lesson - 1) + (point - 1);
const isItdaOrEopda = (word: Word) => /(있|없)다$/.test(word.dictionaryForm);
const presentModifier = (word: Word, ending: string) =>
  word.wordClass === "verb" || isItdaOrEopda(word)
    ? withPlainStem(word, "는" + ending)
    : withEu(word, "ㄴ" + ending);
const VERBS_WITH_BODA = [
  createWord("가다", "verb"),
  createWord("먹다", "verb"),
  createWord("공부하다", "verb"),
  createWord("만들다", "verb"),
  createWord("보다", "verb"),
];

const points: PointSource[] = [
  {
    lesson: 1,
    point: 1,
    form: "-니?, -자",
    name: "tegező kérdés (-니?) és javaslat (-자)",
    explanation: `<p>Két <b>반말</b> (tegező) végződés, fiatalabbaknak és közeli barátoknak:</p>
<ul><li><b>-니?</b>: kérdés. Ige, melléknév, ${korean("이다")} után, és a ${korean("-(으)시-, -았/었-, -겠-")} után is: ${korean("먹니?, 바쁘니?, 학생이니?, 갔니?")}. ㄹ-tőnél az ㄹ kiesik: ${korean("사니?")}</li><li><b>-자</b>: javaslat („…-junk”). Csak igével: ${korean("가자, 먹자")}.</li></ul>
<p>Mindkettő a tő végétől függetlenül ugyanaz.</p>`,
    table: {
      sampleSet: "verbsAndAdjectives",
      columns: [
        { header: "-니?", conjugate: (word) => withPlainStem(word, "니?") },
        {
          header: "Múlt: -았니?/었니?",
          conjugate: (word) => withPast(word, "니?"),
        },
        {
          header: "-자 (csak ige)",
          conjugate: (word) =>
            word.wordClass === "verb" ? withPlainStem(word, "자") : null,
        },
      ],
    },
    examples: [
      ["그동안 어떻게 지냈<b>니</b>?", "Hogy voltál mostanában?"],
      ["요즘 회사 일이 바쁘<b>니</b>?", "Sok a munka mostanában a cégnél?"],
      [
        "주말에 같이 영화 보<b>자</b>.",
        "Nézzünk meg együtt egy filmet a hétvégén.",
      ],
      [
        "우리 이 노래 같이 듣<b>자</b>.",
        "Hallgassuk meg együtt ezt a dalt.",
        "-자 előtt nincs ㄷ-változás: 듣자",
      ],
    ],
    ownNote: `<p>A ${korean("-니?")} kicsit „felülről” kérdez (szülő gyereknek, idősebb fiatalabbnak); barátok közt a sima ${korean("-아/어?")} (${korean("뭐 해?")}) gyakoribb. A ${korean("-자")} tagadása: ${korean("-지 말자")} („ne …-junk”).</p>`,
  },
  {
    lesson: 1,
    point: 2,
    form: "-아/어 보이다",
    name: "„…-nak/-nek látszik, … tűnik”",
    explanation: `<p>Melléknév után azt fejezi ki, hogy valami <b>külsőre, ránézésre olyannak tűnik</b>: ${korean("피곤해 보여요")} „fáradtnak tűnsz”. A <b>-아/어</b> szabály szerint (ㅏ, ㅗ → ${korean("-아 보이다")}, egyéb → ${korean("-어 보이다")}, 하다 → ${korean("해 보이다")}).</p>`,
    table: {
      sampleSet: "adjectives",
      columns: [
        {
          header: "-아/어 보여요",
          conjugate: (word) => withAOrEo(word, " 보여요"),
        },
      ],
    },
    examples: [
      ["요즘 좀 피곤<b>해 보여요</b>.", "Mostanában kicsit fáradtnak tűnsz."],
      [
        "이 음식이 정말 맛있<b>어 보여요</b>.",
        "Ez az étel nagyon finomnak tűnik.",
      ],
      [
        "그 가방 무거<b>워 보여요</b>. 제가 들어 줄게요.",
        "Nehéznek tűnik az a táska. Majd én viszem.",
        "ㅂ-rendhagyó: 무겁다 → 무거워 보여요",
      ],
      ["오늘 기분이 좋<b>아 보이네요</b>.", "Ma jókedvűnek tűnsz!"],
    ],
    ownNote: `<p>Főnévvel: ${korean("N처럼 보이다")} vagy ${korean("N 같아 보이다")}: ${korean("학생처럼 보여요")}. A ${korean("보이다")} maga ragozódik: ${korean("보여요, 보였어요")}.</p>`,
  },
  {
    lesson: 2,
    point: 1,
    form: "-는다고/ㄴ다고/다고 하다",
    name: "függő beszéd: kijelentés idézése („azt mondja, hogy …”)",
    explanation: `<p>Más ember <b>kijelentését adjuk tovább</b>: „Azt mondja, hogy …”. Az idézett mondat egyszerű (한다체) alakot kap, és ${korean("-고 하다")} követi:</p>
<ul><li><b>Ige</b>: 받침 után ${korean("-는다고")}, magánhangzó után ${korean("-ㄴ다고")}, ㄹ-tőnél az ㄹ kiesik: ${korean("만든다고")}</li><li><b>Melléknév</b> (és ${korean("있다/없다")}): ${korean("-다고")}</li><li><b>Főnév</b>: 받침 után ${korean("-이라고")}, magánhangzó után ${korean("-라고")}</li><li><b>Múlt</b>: ${korean("-았다고/었다고")}; <b>jövő</b>: ${korean("-(으)ㄹ 거라고")}</li></ul>`,
    table: {
      sampleSet: "verbsAndAdjectives",
      columns: [
        {
          header: "Jelen",
          conjugate: (word) => plainStyleStatement(word) + "고 해요",
        },
        { header: "Múlt", conjugate: (word) => withPast(word, "다고 해요") },
        { header: "Jövő", conjugate: (word) => withEu(word, "ㄹ 거라고 해요") },
      ],
    },
    examples: [
      [
        "지수가 요즘 좀 바쁘<b>다고 해</b>.",
        "Dzsisu azt mondja, mostanában elég elfoglalt.",
      ],
      [
        "마크 씨가 주말에 이사<b>한다고 해요</b>.",
        "Mark azt mondja, hétvégén költözik.",
      ],
      [
        "뉴스에서 내일 비가 <b>올 거라고 했어요</b>.",
        "A hírekben azt mondták, holnap esni fog.",
      ],
      [
        "친구가 그 노래를 매일 듣<b>는다고 해요</b>.",
        "A barátom azt mondja, minden nap azt a dalt hallgatja.",
        "-는다 előtt nincs ㄷ-változás: 듣는다고",
      ],
    ],
    ownNote: `<p>A beszélő szempontjából változnak a névmások: ha valaki azt mondja „én”, az idézetben ${korean("자기")} vagy a neve áll. A ${korean("하다")} helyett állhat ${korean("말하다, 듣다")} is: ${korean("… 다고 들었어요")} „azt hallottam, hogy …”.</p>`,
  },
  {
    lesson: 2,
    point: 2,
    form: "-나/(으)ㄴ가 보다",
    name: "„úgy látszik, …; biztos …” (következtetés)",
    explanation: `<p>Abból, amit <b>láttunk vagy hallottunk</b>, következtetünk valamire: „úgy tűnik, hogy …”. Első személyről nem használjuk.</p>
<ul><li><b>Ige</b> (és ${korean("있다/없다")}): ${korean("-나 보다")} (ㄹ kiesik: ${korean("사나 보다")}); a könyv szerint ${korean("-는가 보다")} is lehet</li><li><b>Melléknév</b>: 받침 után ${korean("-은가 보다")}, magánhangzó után ${korean("-ㄴ가 보다")}</li><li><b>Főnév</b>: ${korean("-인가 보다")}; <b>múlt</b>: ${korean("-았나/었나 보다")}</li></ul>`,
    table: {
      sampleSet: "verbsAndAdjectives",
      columns: [
        {
          header: "Jelen",
          conjugate: (word) =>
            word.wordClass === "verb" || isItdaOrEopda(word)
              ? withPlainStem(word, "나 봐요")
              : withEu(word, "ㄴ가 봐요"),
        },
        {
          header: "Múlt: -았나/었나 봐요",
          conjugate: (word) => withPast(word, "나 봐요"),
        },
      ],
    },
    examples: [
      [
        "마크 씨가 요즘 바<b>쁜가 봐요</b>. 연락이 없어요.",
        "Mark mostanában biztos elfoglalt, nem jelentkezik.",
      ],
      [
        "밖에 비가 오<b>나 봐요</b>. 사람들이 우산을 쓰고 있어요.",
        "Úgy látszik, kint esik: az emberek esernyőt tartanak.",
      ],
      ["지수 씨가 기분이 좋<b>은가 봐요</b>.", "Dzsisu úgy tűnik, jókedvű."],
      [
        "날씨가 많이 <b>추운가 봐요</b>. 다들 코트를 입었어요.",
        "Biztos nagyon hideg van, mindenki kabátot visel.",
        "ㅂ-rendhagyó: 춥다 → 추운가 봐요",
      ],
    ],
    ownNote: `<p>A ${korean("-는/(으)ㄴ/(으)ㄹ 것 같다")} (2A 9. lecke) a beszélő benyomását is kifejezheti, a ${korean("-나/(으)ㄴ가 보다")} viszont mindig <b>külső jelből</b> (láttam, hallottam) következtet.</p>`,
    correctIncorrect: [
      [1, "마크 씨가 배가 고픈가 봐요.", "Mark biztos éhes."],
      [0, "제가 배가 고픈가 봐요.", "első személyre nem"],
    ],
  },
  {
    lesson: 3,
    point: 1,
    form: "-(으)ㄹ까 하다",
    name: "„azon gondolkodom, hogy …” (bizonytalan terv)",
    explanation: `<p>Ige után a beszélő <b>bizonytalan szándékát</b>, még <b>változhat terveit</b> fejezi ki: „arra gondoltam, hogy talán …”. Gyakran ${korean("-(으)ㄹ까 해요")} vagy ${korean("-(으)ㄹ까 생각 중이에요")}.</p>
<p><b>받침</b> után: <b>-을까 하다</b>, magánhangzó után: <b>-ㄹ까 하다</b>, ㄹ-tőnél: ${korean("만들까 하다")}.</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        {
          header: "-(으)ㄹ까 해요",
          conjugate: (word) => withEu(word, "ㄹ까 해요"),
        },
      ],
    },
    examples: [
      [
        "이번에 이사를 <b>할까 해요</b>.",
        "Arra gondoltam, hogy most költözöm.",
      ],
      [
        "주말에 집에서 김치를 <b>만들까 해요</b>.",
        "Azon gondolkodom, hogy hétvégén kimcsit csinálok.",
      ],
      [
        "방학에 한국어 수업을 들<b>을까 해요</b>.",
        "Arra gondolok, hogy a szünetben koreai órákat veszek.",
        "ㄷ-rendhagyó: 듣다 → 들을까",
      ],
      ["오늘은 일찍 <b>잘까 해요</b>.", "Ma talán korán lefekszem."],
    ],
    ownNote: `<p>Mennyire biztos? ${korean("-(으)ㄹ 거예요")} (biztos terv) → ${korean("-(으)려고 해요")} (szándék) → ${korean("-(으)ㄹ까 해요")} (még csak fontolgatom). Múltban: ${korean("-(으)ㄹ까 했어요")} „gondoltam rá, (de…)”.</p>`,
  },
  {
    lesson: 3,
    point: 2,
    form: "-지만 않으면",
    name: "„csak (az) ne …, és …; feltéve, hogy nem …”",
    explanation: `<p>Ige vagy melléknév után egy <b>nem kívánt helyzetet zár ki</b> feltételként: „ha csak nem …”, „feltéve, hogy nem …”. A tő végétől függetlenül ${korean("-지만 않으면")}. Főnévvel: ${korean("N만 아니면")}.</p>`,
    table: {
      sampleSet: "verbsAndAdjectives",
      columns: [
        {
          header: "-지만 않으면",
          conjugate: (word) => withPlainStem(word, "지만 않으면"),
        },
      ],
    },
    examples: [
      [
        "역에서 멀<b>지만 않으면</b> 괜찮아요.",
        "Ha nincs messze az állomástól, jó lesz.",
      ],
      [
        "비가 오<b>지만 않으면</b> 내일 등산 갈 거예요.",
        "Ha csak nem esik, holnap túrázni megyünk.",
      ],
      [
        "너무 시끄럽<b>지만 않으면</b> 이 집으로 할게요.",
        "Ha nem túl zajos, ezt a lakást választom.",
        "-지 előtt nincs ㅂ-változás: 시끄럽지",
      ],
      [
        "월세가 비싸<b>지만 않으면</b> 바로 이사하고 싶어요.",
        "Ha a lakbér nem drága, azonnal be szeretnék költözni.",
      ],
      [
        "주말<b>만 아니면</b> 언제든지 괜찮아요.",
        "Bármikor jó, csak ne hétvégén.",
      ],
    ],
  },
  {
    lesson: 4,
    point: 1,
    form: "-고 나서",
    name: "„miután befejezte …, (utána) …”",
    explanation: `<p>Ige után azt fejezi ki, hogy az első cselekvést <b>befejezzük</b>, és <b>utána</b> jön a második. A tő végétől függetlenül ${korean("-고 나서")}. Felcserélhető a ${korean("-(으)ㄴ 후에")}-vel.</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        {
          header: "-고 나서",
          conjugate: (word) => withPlainStem(word, "고 나서"),
        },
      ],
    },
    examples: [
      [
        "청소를 하<b>고 나서</b> 빨래를 할게요.",
        "Miután kitakarítottam, kimosok.",
      ],
      ["밥을 먹<b>고 나서</b> 설거지를 했어요.", "Evés után elmosogattam."],
      [
        "설명을 듣<b>고 나서</b> 질문하세요.",
        "A magyarázat meghallgatása után kérdezzen.",
        "-고 előtt nincs ㄷ-változás: 듣고",
      ],
      [
        "숙제를 다 하<b>고 나서</b> 게임을 해요.",
        "Csak miután az összes házit megcsináltam, játszom.",
      ],
    ],
    ownNote: `<p>A sima ${korean("-고")} is jelenthet időrendet, a ${korean("-고 나서")} azt hangsúlyozza, hogy az első <b>teljesen befejeződött</b>. A ${korean("-아서/어서")} (1B 10. lecke) kapcsolódó cselekvésekre kell (${korean("가서, 만나서")}), ezeknél a ${korean("-고 나서")} nem természetes.</p>`,
  },
  {
    lesson: 4,
    point: 2,
    form: "-(으)ㄹ 테니까",
    name: "„én majd …, (úgyhogy) te …” (szándék + kérés)",
    explanation: `<p>Ige után a beszélő <b>szándékát</b> mondja ki, és erre alapozva <b>kér vagy javasol</b> valamit a hallgatónak: „Én kitakarítom a nappalit, te csináld a konyhát.” A második tagmondat gyakran ${korean("-(으)세요, -아/어 주세요, -(으)ㄹ래요?")}</p>
<p><b>받침</b> után: <b>-을 테니까</b>, magánhangzó után: <b>-ㄹ 테니까</b>, ㄹ-tőnél: ${korean("만들 테니까")}. <b>Feltételezést</b> is kifejezhet: „biztos …, úgyhogy …”.</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        {
          header: "-(으)ㄹ 테니까",
          conjugate: (word) => withEu(word, "ㄹ 테니까"),
        },
      ],
    },
    examples: [
      [
        "나는 거실 청소를 <b>할 테니까</b> 넌 주방 청소를 해 줘.",
        "Én kitakarítom a nappalit, te csináld meg a konyhát.",
      ],
      [
        "제가 음식을 <b>만들 테니까</b> 마크 씨는 음료수를 사 오세요.",
        "Én megfőzöm az ételt, te hozz italt.",
      ],
      [
        "제가 짐을 들어 <b>줄 테니까</b> 문 좀 열어 주세요.",
        "Én viszem a csomagokat, te nyisd ki az ajtót.",
      ],
      [
        "길이 많이 <b>막힐 테니까</b> 지하철을 타세요.",
        "Biztos nagy lesz a dugó, menj metróval.",
      ],
      [
        "제가 이사를 도<b>울 테니까</b> 걱정하지 마세요.",
        "Majd én segítek a költözésben, ne aggódj.",
        "ㅂ-rendhagyó: 돕다 → 도울 테니까",
      ],
    ],
    ownNote: `<p>Az első tagmondat alanya a beszélő (szándék esetén), a másodiké a hallgató. Feltételezés jelentésben melléknévvel is: ${korean("추울 테니까 따뜻하게 입어")} „biztos hideg lesz, öltözz fel melegen”.</p>`,
  },
  {
    lesson: 5,
    point: 1,
    form: "-아/어 보니까",
    name: "„amikor kipróbáltam, rájöttem, hogy …”",
    explanation: `<p>Ige után azt fejezi ki, hogy egy <b>tapasztalat után</b> új tényre, érzésre, gondolatra jöttünk rá. A második tagmondat általában <b>múlt</b> idejű vagy a felismert állapot. A <b>-아/어</b> szabály szerint; a ${korean("보다")} ige esetén csak ${korean("보니까")} (nem ${korean("봐 보니까")}).</p>`,
    table: {
      words: VERBS_WITH_BODA,
      irregularWords: [
        createWord("듣다", "verb"),
        createWord("돕다", "verb"),
        createWord("짓다", "verb"),
        createWord("부르다", "verb"),
        createWord("쓰다", "verb"),
      ],
      columns: [
        {
          header: "-아/어 보니까",
          conjugate: (word) =>
            word.dictionaryForm === "보다"
              ? "보니까"
              : withAOrEo(word, " 보니까"),
        },
      ],
    },
    examples: [
      [
        "집에 와서 입어 <b>보니까</b> 옷이 좀 작았어요.",
        "Otthon felpróbáltam, és kiderült, hogy a ruha kicsit kicsi.",
      ],
      [
        "한국 음식을 먹어 <b>보니까</b> 생각보다 안 매웠어요.",
        "Amikor megkóstoltam a koreai ételt, kevésbé volt csípős, mint gondoltam.",
      ],
      [
        "그 노래를 들어 <b>보니까</b> 정말 좋았어요.",
        "Meghallgattam azt a dalt, és tényleg nagyon jó volt.",
        "ㄷ-rendhagyó: 듣다 → 들어 보니까",
      ],
      [
        "영수증을 <b>보니까</b> 가격이 잘못됐어요.",
        "Ránéztem a blokkra, és rossz volt rajta az ár.",
      ],
    ],
    ownNote: `<p>A ${korean("-(으)니까")} felfedezés-jelentésének (2B 7. lecke) változata; a ${korean("-아/어 보다")} itt azt emeli ki, hogy szándékosan kipróbáltunk valamit.</p>`,
  },
  {
    lesson: 5,
    point: 2,
    form: "-(으)려면",
    name: "„ha … akarsz, (akkor) …”",
    explanation: `<p>Ige után <b>szándékot, tervet</b> állít fel feltételként: „ha X-et akarod, akkor Y kell”. A második tagmondat gyakran ${korean("-아야/어야 되다, -(으)세요, 필요하다")}.</p>
<p><b>받침</b> után: <b>-으려면</b>, magánhangzó és <b>ㄹ</b> után: <b>-려면</b> (${korean("만들려면")}).</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        { header: "-(으)려면", conjugate: (word) => withEu(word, "려면") },
      ],
    },
    examples: [
      [
        "환불하<b>려면</b> 영수증이 필요합니다.",
        "A visszatérítéshez szükség van a blokkra.",
      ],
      [
        "명동에 가<b>려면</b> 4호선을 타세요.",
        "Ha Myeongdongba akarsz menni, szállj fel a 4-es metróra.",
      ],
      [
        "한국어를 잘하<b>려면</b> 매일 들<b>어야 돼요</b>.",
        "Ha jól akarsz koreaiul, minden nap hallgatnod kell.",
        "ㄷ-rendhagyó: 듣다 → 들어야",
      ],
      [
        "김치를 맛있게 만들<b>려면</b> 좋은 재료가 필요해요.",
        "Ha finom kimcsit akarsz csinálni, jó alapanyag kell.",
        "ㄹ-tő: 만들다 → 만들려면",
      ],
    ],
    ownNote: `<p>A ${korean("-(으)면")} egyszerű feltétel, a ${korean("-(으)려면")} = ${korean("-(으)려고 하면")} a szándékot teszi feltétellé.</p>`,
    correctIncorrect: [
      [
        1,
        "학교에 가려면 버스를 타야 돼요.",
        "Ha iskolába akarsz menni, buszra kell szállnod.",
      ],
      [0, "학교에 가면 버스를 타야 돼요.", "így azt jelenti: „ha (már) mész”"],
    ],
  },
  {
    lesson: 6,
    point: 1,
    form: "-잖아요",
    name: "„hiszen …; tudod, hogy …”",
    explanation: `<p>Ige vagy melléknév után olyasmit mond ki, amit a beszélő szerint <b>a hallgató is tud</b> (vagy tudnia kellene); <b>emlékeztet</b>, vagy indokként hivatkozik rá: „Hiszen tegnap mondtam!” A tő végétől függetlenül ${korean("-잖아요")}; múlt: ${korean("-았잖아요/었잖아요")}, főnév: ${korean("-(이)잖아요")}.</p>`,
    table: {
      sampleSet: "verbsAndAdjectives",
      columns: [
        {
          header: "-잖아요",
          conjugate: (word) => withPlainStem(word, "잖아요"),
        },
        {
          header: "Múlt: -았잖아요/었잖아요",
          conjugate: (word) => withPast(word, "잖아요"),
        },
      ],
    },
    examples: [
      [
        "이 노트북은 3년 전에 샀<b>잖아요</b>. 그래서 자주 고장 나요.",
        "Hiszen ezt a laptopot három éve vettem, ezért romlik el gyakran.",
      ],
      ["어제 제가 말<b>했잖아요</b>.", "Hiszen tegnap megmondtam!"],
      [
        "오늘 날씨가 <b>춥잖아요</b>. 따뜻하게 입으세요.",
        "Hiszen ma hideg van. Öltözz fel melegen.",
        "-잖아요 előtt nincs ㅂ-változás: 춥잖아요",
      ],
      ["마크 씨는 한국 사람<b>이잖아요</b>.", "Hiszen Mark koreai."],
    ],
    ownNote: `<p>Idősebbnek óvatosan használjuk, mert szemrehányóan is hangozhat („ezt neked tudnod kellene”). 반말-ban: ${korean("-잖아")}.</p>`,
  },
  {
    lesson: 6,
    point: 2,
    form: "-(으)려다가",
    name: "„… akartam, de (végül) …”",
    explanation: `<p>Ige után azt fejezi ki, hogy valamit <b>szándékoztunk</b> megtenni, de <b>közbejött valami</b>, ezért abbahagytuk vagy mást csináltunk.</p>
<p><b>받침</b> után: <b>-으려다가</b>, magánhangzó és <b>ㄹ</b> után: <b>-려다가</b>.</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        { header: "-(으)려다가", conjugate: (word) => withEu(word, "려다가") },
      ],
    },
    examples: [
      [
        "새로 사<b>려다가</b> 수리해서 쓰고 있어요.",
        "Újat akartam venni, de inkább megjavíttattam, és azt használom.",
      ],
      [
        "버스를 타<b>려다가</b> 사람이 너무 많아서 걸어왔어요.",
        "Buszra akartam szállni, de túl sokan voltak, ezért gyalog jöttem.",
      ],
      [
        "라면을 먹<b>으려다가</b> 밥을 했어요.",
        "Ramyeont akartam enni, de végül rizst főztem.",
      ],
      [
        "음악을 들<b>으려다가</b> 그냥 잤어요.",
        "Zenét akartam hallgatni, de inkább lefeküdtem aludni.",
        "ㄷ-rendhagyó: 듣다 → 들으려다가",
      ],
    ],
    ownNote: `<p>A ${korean("-(으)려고 하다")} + ${korean("-다가")} összevonása. A két tagmondat alanya azonos.</p>`,
  },
  {
    lesson: 7,
    point: 1,
    form: "-(으)ㄴ 지",
    name: "„… óta (eltelt idő)”",
    explanation: `<p>Ige után azt fejezi ki, mennyi <b>idő telt el</b> egy cselekvés óta. Szerkezete: ${korean("-(으)ㄴ 지 + idő + 되다 / 지나다")}. Kérdés: ${korean("-(으)ㄴ 지 얼마나 됐어요/지났어요?")}; válasz: ${korean("-(으)ㄴ 지 (idő) 됐어요/지났어요")}. A ${korean("지났어요")}-t inkább rövidebb időre mondjuk.</p>
<p><b>받침</b> után: <b>-은 지</b>, magánhangzó után: <b>-ㄴ 지</b>, ㄹ-tőnél az ㄹ kiesik: ${korean("산 지")}.</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        {
          header: "-(으)ㄴ 지 1년 됐어요",
          conjugate: (word) => withEu(word, "ㄴ 지 1년 됐어요"),
        },
      ],
    },
    examples: [
      [
        "여자 친구하고 만<b>난 지</b> 곧 3년이 돼.",
        "Nemsokára három éve járunk a barátnőmmel.",
      ],
      ["한국어를 배<b>운 지</b> 얼마나 됐어요?", "Mióta tanulsz koreaiul?"],
      [
        "서울에 <b>산 지</b> 5년이 됐어요.",
        "Öt éve élek Szöulban.",
        "ㄹ-tő: 살다 → 산 지",
      ],
      ["밥을 먹<b>은 지</b> 30분밖에 안 지났어요.", "Csak fél órája ettem."],
    ],
    ownNote: `<p>A ${korean("지")} itt önálló szó („idő, óta”), ezért mindig <b>szóközzel</b> írjuk: ${korean("만난 지")}. Napokra, hónapokra: ${korean("온 지 일주일 됐어요")} „egy hete jöttem”.</p>`,
  },
  {
    lesson: 7,
    point: 2,
    form: "-자고 하다",
    name: "függő beszéd: javaslat idézése („azt javasolta, hogy …-junk”)",
    explanation: `<p>Más <b>javaslatát, ajánlatát</b> adjuk tovább: „azt mondta, menjünk …”. Az eredeti javaslat (${korean("같이 가요 / 갑시다 / 가자")}) ige + ${korean("-자고 하다")} lesz, a tő végétől függetlenül. Más idéző ige is állhat: ${korean("-자고 했어요 / 말했어요")}.</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        {
          header: "-자고 했어요",
          conjugate: (word) => withPlainStem(word, "자고 했어요"),
        },
        {
          header: "Tagadó: -지 말자고 했어요",
          conjugate: (word) => withPlainStem(word, "지 말자고 했어요"),
        },
      ],
    },
    examples: [
      [
        "친구가 주말에 같이 영화를 보<b>자고 했어요</b>.",
        "A barátom azt javasolta, hogy hétvégén nézzünk meg együtt egy filmet.",
      ],
      [
        "여자 친구가 기념일에 여행을 가<b>자고 해요</b>.",
        "A barátnőm azt mondja, menjünk el utazni az évfordulón.",
      ],
      [
        "부장님께서 회의를 내일 하<b>자고 하셨어요</b>.",
        "Az osztályvezető azt javasolta, hogy holnap tartsuk az értekezletet.",
      ],
      [
        "동생이 같이 음악을 듣<b>자고 했어요</b>.",
        "Az öcsém azt mondta, hallgassunk együtt zenét.",
        "-자 előtt nincs ㄷ-változás: 듣자고",
      ],
    ],
    ownNote: `<p>A ${korean("-자고 하다")} akkor is jó, ha az eredeti mondat udvarias volt (${korean("같이 갈까요?")}, ${korean("갑시다")}), vagyis nem 반말-t idéz: a ${korean("-자")} itt csak az idézett tartalom formája. Két szereplő a ${korean("-자고 하다")} mellett: kinek mondta (${korean("에게/한테")}).</p>`,
  },
  {
    lesson: 8,
    point: 1,
    form: "-기 위해서",
    name: "„azért, hogy …; … céljából”",
    explanation: `<p>Ige után a <b>célt, szándékot</b> fejezi ki: „azért, hogy …”. A tő végétől függetlenül ${korean("-기 위해서")} (rövidebben ${korean("-기 위해")}). Főnévvel: ${korean("N을/를 위해서")} „valakiért, valami érdekében”.</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        {
          header: "-기 위해서",
          conjugate: (word) => withPlainStem(word, "기 위해서"),
        },
      ],
    },
    examples: [
      [
        "한글날을 기념하<b>기 위해서</b> 여러 가지 행사를 한다고 해.",
        "A hangul napja alkalmából (megünneplésére) sokféle rendezvényt tartanak.",
      ],
      [
        "건강해지<b>기 위해서</b> 매일 운동해요.",
        "Azért edzek minden nap, hogy egészséges legyek.",
      ],
      [
        "한국 회사에 취직하<b>기 위해서</b> 한국어를 배워요.",
        "Azért tanulok koreaiul, hogy koreai cégnél helyezkedjek el.",
      ],
      [
        "가족<b>을 위해서</b> 열심히 일해요.",
        "A családomért dolgozom keményen.",
      ],
      [
        "한국 뉴스를 잘 듣<b>기 위해서</b> 매일 연습해요.",
        "Minden nap gyakorlok, hogy jól értsem a koreai híreket.",
        "-기 előtt nincs ㄷ-változás: 듣기",
      ],
    ],
    ownNote: `<p>A ${korean("-(으)러")} (1B 2. lecke) csak mozgásigékkel áll, a ${korean("-기 위해서")} bármilyen igével; a ${korean("-(으)려고")} hétköznapibb, a ${korean("-기 위해서")} kicsit hivatalosabb, írottabb.</p>
<p>Főnév előtt a ${korean("위하다")} jelzői alakja áll: ${korean("N을/를 위한 + főnév")}, ${korean("-기 위한 + főnév")} „…-ra szánt, … céljára szolgáló”: ${korean("휴식을 위한 시간이 부족해요")} „kevés a pihenésre szánt idő”, ${korean("건강을 지키기 위한 방법")} „az egészség megőrzésének módja”.</p>`,
  },
  {
    lesson: 8,
    point: 2,
    form: "-아야겠다/어야겠다",
    name: "„ezt meg kell tennem!” (erős elhatározás)",
    explanation: `<p>Ige után a beszélő <b>erős szándékát, elhatározását</b> fejezi ki, gyakran egy helyzet hatására: „Akkor ezt most már meg kell csinálnom.” A <b>-아/어</b> szabály szerint (ㅏ, ㅗ → ${korean("-아야겠다")}, egyéb → ${korean("-어야겠다")}, 하다 → ${korean("해야겠다")}).</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        {
          header: "-아야겠어요/어야겠어요",
          conjugate: (word) => withAOrEo(word, "야겠어요"),
        },
      ],
    },
    examples: [
      [
        "한글날에 행사가 많네요. 저도 가 <b>봐야겠어요</b>.",
        "Sok rendezvény van a hangul napján. Nekem is el kell mennem megnézni!",
      ],
      [
        "살이 쪘어요. 오늘부터 운동을 <b>해야겠어요</b>.",
        "Híztam. Mától edzenem kell!",
      ],
      [
        "내일 시험이 있어요. 오늘은 일찍 <b>자야겠어요</b>.",
        "Holnap vizsga lesz. Ma korán le kell feküdnöm.",
      ],
      [
        "그 노래가 정말 좋다고 해요. 저도 <b>들어야겠어요</b>.",
        "Azt mondják, nagyon jó az a dal. Nekem is meg kell hallgatnom!",
        "ㄷ-rendhagyó: 듣다 → 들어야겠어요",
      ],
    ],
    ownNote: `<p>A ${korean("-아야/어야 되다/하다")} („kell”) és a ${korean("-겠-")} (szándék) összetétele. Csak a beszélő saját szándékára; másnak tanácsként: ${korean("-아야/어야 될 것 같아요")}.</p>`,
  },
  {
    lesson: 9,
    point: 1,
    form: "-아지다/어지다",
    name: "„…-vá válik, egyre …” (fokozatos változás)",
    explanation: `<p>Melléknév után azt fejezi ki, hogy egy állapot az idő múlásával <b>fokozatosan megváltozik</b>: ${korean("좋다 → 좋아지다")} „jobb lesz”. A melléknévből így <b>ige</b> lesz. A <b>-아/어</b> szabály szerint: ㅏ, ㅗ → ${korean("-아지다")}, egyéb → ${korean("-어지다")}, 하다 → ${korean("해지다")}.</p>`,
    table: {
      sampleSet: "adjectives",
      columns: [
        {
          header: "-아져요/어져요",
          conjugate: (word) => withAOrEo(word, "져요"),
        },
        {
          header: "Múlt: -아졌어요/어졌어요",
          conjugate: (word) => withAOrEo(word, "졌어요"),
        },
      ],
    },
    examples: [
      [
        "비가 오면 오히려 기분이 좋<b>아지는데요</b>.",
        "Ha esik az eső, nekem épp jobb kedvem lesz.",
      ],
      [
        "요즘 날씨가 많이 <b>추워졌어요</b>.",
        "Mostanában nagyon hideg lett.",
        "ㅂ-rendhagyó: 춥다 → 추워졌어요",
      ],
      [
        "한국어 공부가 재미있<b>어졌어요</b>.",
        "Érdekesebb lett a koreai tanulás.",
      ],
      [
        "가을이 되면 나뭇잎이 <b>빨개져요</b>.",
        "Ősszel a levelek pirosak lesznek.",
        "ㅎ-rendhagyó: 빨갛다 → 빨개져요",
      ],
      [
        "감기가 나<b>아지다가</b> 다시 심해졌어요.",
        "Már javulóban volt a megfázásom, de újra rosszabb lett.",
        "ㅅ-rendhagyó: 낫다 → 나아지다 · -다가: a javulás még tartott",
      ],
      [
        "감기가 나<b>아졌다가</b> 다시 심해졌어요.",
        "Javult a megfázásom, aztán újra rosszabb lett.",
        "-았다가/었다가: a javulás már megtörtént",
      ],
    ],
    ownNote: `<p>Mivel a ${korean("-아지다/어지다")} igét képez, a jelzői és egyéb alakok igei szabályt követnek: ${korean("좋아지는 날씨")} (jelen: ${korean("-는")}), ${korean("좋아지고 있어요")} „egyre jobb”.</p>
<p><b>Igével</b> szenvedő jelentést ad: a dolog „magától megtörténik, létrejön”.</p>
${simpleTable(["Ige", "-아/어지다", "Jelentés"], [[korean("만들다"), korean("만들어지다"), "elkészül, létrejön"], [korean("정하다"), korean("정해지다"), "eldől"], [korean("이루다"), korean("이루어지다"), "megvalósul"], [korean("짓다"), korean("지어지다"), "felépül – ㅅ-rendhagyó (2A 7. lecke)"]])}
${exampleList([["회의 날짜가 정해졌어요.", "Eldőlt a megbeszélés időpontja."], ["꿈이 이루어졌어요.", "Megvalósult az álmom."], ["이 건물은 백 년 전에 지어졌어요.", "Ez az épület száz éve épült.", "ㅅ-rendhagyó: 짓다 → 지어졌어요"]])}
<p>Sok igének saját szenvedő alakja van (4A 8. lecke): ${korean("쓰다 → 쓰이다")}, ${korean("열다 → 열리다")}; ott azt használjuk.</p>
<p>Ha nem egy tulajdonság, hanem egy <b>cselekvés vagy szokás</b> alakul ki, igével ${korean("-게 되다")} áll (2B 12. lecke):</p>
${exampleList([["한국어 실력이 좋아졌어요.", "Javult a koreaitudásom.", "좋다 „jó” → 좋아지다"], ["한국어를 좋아하게 됐어요.", "Megszerettem a koreait.", "좋아하다 „szeret” → 좋아하게 되다"]])}`,
    correctIncorrect: [
      [1, "날씨가 따뜻해졌어요.", "Melegebb lett az idő."],
      [
        0,
        "날씨가 따뜻했어졌어요.",
        "a múlt idő jele a 지다 végére kerül (-아졌어요/어졌어요), a melléknév töve után nem állhat",
      ],
    ],
  },
  {
    lesson: 9,
    point: 2,
    form: "-는/(으)ㄴ 대신에",
    name: "„… helyett; cserébe …”",
    explanation: `<p>Egy cselekvést vagy állapotot <b>mással helyettesítünk</b>: „X helyett Y”; vagy egy hátrányt <b>előny ellensúlyoz</b>: „drága, de cserébe …”.</p>
<ul><li><b>Ige</b>: ${korean("-는 대신에")}</li><li><b>Melléknév</b>: 받침 után ${korean("-은 대신에")}, magánhangzó után ${korean("-ㄴ 대신에")}</li><li><b>Főnév</b>: ${korean("N 대신에")}</li></ul>`,
    table: {
      sampleSet: "verbsAndAdjectives",
      columns: [
        {
          header: "-는/(으)ㄴ 대신에",
          conjugate: (word) => presentModifier(word, " 대신에"),
        },
      ],
    },
    examples: [
      [
        "주말에는 밖에 나가<b>는 대신에</b> 집에서 쉬어요.",
        "Hétvégén kimozdulás helyett otthon pihenek.",
      ],
      [
        "이 식당은 음식이 비<b>싼 대신에</b> 아주 맛있어요.",
        "Ebben az étteremben drága az étel, de cserébe nagyon finom.",
      ],
      [
        "날씨가 <b>추운 대신에</b> 하늘이 맑아요.",
        "Hideg van, de cserébe tiszta az ég.",
        "ㅂ-rendhagyó: 춥다 → 추운",
      ],
      ["커피 <b>대신에</b> 차를 마셨어요.", "Kávé helyett teát ittam."],
    ],
    correctIncorrect: [
      [
        0,
        "비가 오는 대신에 우산을 가져가세요.",
        "az esernyő nem helyettesíti az esőt",
      ],
      [1, "비가 오는데 우산을 가져가세요.", "Esik az eső, vigyél esernyőt."],
      [
        0,
        "한국어는 어려운 대신에 공부해요.",
        "a tanulás nem ellensúlyozza, hogy nehéz",
      ],
      [1, "한국어는 어렵지만 공부해요.", "A koreai nehéz, de tanulom."],
    ],
    ownNote: `<p>Az ${korean("에")} elhagyható: ${korean("대신")}. Az ${korean("있다/없다")} igeként ragozódik: ${korean("맛있는 대신에")}.</p>
<p><b>Helyettesítés</b> – az első elmarad, helyette a második történik:</p>
${exampleList([["버스를 타는 대신에 걸어갔어요.", "Buszozás helyett gyalog mentem."]])}
<p><b>Kompenzáció</b> – az egyiket a másik ellensúlyozza, mindkét irányban:</p>
${exampleList([["이 집은 작은 대신에 월세가 싸요.", "Ez a lakás kicsi, viszont olcsó a bérleti díja."], ["월급이 많은 대신에 일이 힘들어요.", "Jó a fizetés, cserébe nehéz a munka."]])}
<p>Nem egy újabb „de”: csak akkor használható, ha a második tag az elsőt <b>helyettesíti vagy ellensúlyozza</b>. Puszta ellentétre a ${korean("-지만")} (1B 9. lecke) vagy a lágyabb ${korean("-는데")} (2B 8. lecke) való; ha az első tag csak a folytatás háttere, szintén a ${korean("-는데")} (2A 8. lecke).</p>`,
  },
  {
    lesson: 10,
    point: 1,
    form: "-도록 하다",
    name: "„tegye meg, hogy …” (utasítás, engedély)",
    explanation: `<p>Ige után azt fejezi ki, hogy valakit <b>rávesz, utasít vagy hagy</b> megtenni valamit. Gyakori alakja a ${korean("-도록 하세요")}: udvarias, de határozott tanács, utasítás („Kérem, tegye meg, hogy …”). A beszélő saját szándékára: ${korean("-도록 할게요")} („igyekszem majd …”). A ${korean("-도록")} önállóan <b>célt</b> is jelöl: „úgy, hogy …”.</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        {
          header: "-도록 하세요",
          conjugate: (word) => withPlainStem(word, "도록 하세요"),
        },
        {
          header: "-도록 할게요",
          conjugate: (word) => withPlainStem(word, "도록 할게요"),
        },
      ],
    },
    examples: [
      ["오늘은 일찍 들어가<b>도록 하세요</b>.", "Ma menjen haza korán."],
      [
        "약을 먹고 푹 쉬<b>도록 하세요</b>.",
        "Vegye be a gyógyszert, és pihenjen sokat.",
      ],
      [
        "다음부터는 늦지 않<b>도록 할게요</b>.",
        "Legközelebb igyekszem nem késni.",
      ],
      [
        "뒤에서도 잘 들리<b>도록</b> 크게 말씀해 주세요.",
        "Kérem, beszéljen hangosan, hogy hátul is jól hallják.",
      ],
      [
        "다른 사람을 많이 돕<b>도록 하세요</b>.",
        "Igyekezzen sokat segíteni másoknak.",
        "-도록 előtt nincs ㅂ-változás: 돕도록",
      ],
    ],
    ownNote: `<p>Hangulatban a ${korean("-(으)세요")}-nél hivatalosabb, „orvosi/főnöki” utasítás. Cél jelentésben a ${korean("-게")} (2B 10. lecke) közeli rokona.</p>`,
  },
  {
    lesson: 10,
    point: 2,
    form: "-아야/어야",
    name: "„csak ha …; ahhoz, hogy … (kell)” (szükséges feltétel)",
    explanation: `<p>Ige vagy melléknév után azt fejezi ki, hogy az első rész a második <b>elengedhetetlen feltétele</b>: „csak akkor Y, ha X”. A <b>-아/어</b> szabály szerint: ${korean("가야, 먹어야, 해야")}.</p>`,
    table: {
      sampleSet: "verbsAndAdjectives",
      columns: [
        { header: "-아야/어야", conjugate: (word) => withAOrEo(word, "야") },
      ],
    },
    examples: [
      [
        "푹 쉬<b>어야</b> 감기가 빨리 나아요.",
        "Csak ha sokat pihensz, gyógyulsz meg gyorsan a megfázásból.",
      ],
      [
        "약을 먹<b>어야</b> 나을 거예요.",
        "Csak ha beveszed a gyógyszert, gyógyulsz meg.",
      ],
      [
        "날씨가 따뜻<b>해야</b> 산책을 할 수 있어요.",
        "Csak ha meleg az idő, tudunk sétálni.",
      ],
      [
        "선생님 설명을 잘 들<b>어야</b> 이해할 수 있어요.",
        "Csak ha jól figyelsz a tanár magyarázatára, érted meg.",
        "ㄷ-rendhagyó: 듣다 → 들어야",
      ],
    ],
    ownNote: `<p>A ${korean("-아야/어야 되다")} („kell”, 1B 9. lecke) is erre épül. Gyakori fordulat: ${korean("-아야/어야지요")} („hát persze, hogy …”).</p>`,
  },
  {
    lesson: 11,
    point: 1,
    form: "-다 보면",
    name: "„ha az ember sokáig …, (előbb-utóbb) …”",
    explanation: `<p>Ige után azt fejezi ki, hogy ha egy cselekvést <b>folyamatosan, sokáig</b> végzünk, akkor <b>rájövünk</b> valamire vagy <b>új állapotba</b> kerülünk. A tő végétől függetlenül ${korean("-다 보면")}. Múltbeli tapasztalatra: ${korean("-다 보니까")} („ahogy …, rájöttem / úgy alakult, hogy …”).</p>`,
    table: {
      sampleSet: "verbs",
      columns: [
        {
          header: "-다 보면",
          conjugate: (word) => withPlainStem(word, "다 보면"),
        },
        {
          header: "-다 보니까",
          conjugate: (word) => withPlainStem(word, "다 보니까"),
        },
      ],
    },
    examples: [
      [
        "한국 드라마를 계속 보<b>다 보면</b> 한국어 실력이 늘 거예요.",
        "Ha sokáig nézel koreai sorozatokat, fejlődni fog a koreaid.",
      ],
      [
        "열심히 연습하<b>다 보면</b> 잘하게 될 거예요.",
        "Ha sokat gyakorolsz, előbb-utóbb jól fog menni.",
      ],
      [
        "혼자 살<b>다 보니까</b> 요리를 잘하게 됐어요.",
        "Ahogy egyedül éltem, megtanultam jól főzni.",
      ],
      [
        "매일 듣<b>다 보니까</b> 그 노래가 좋아졌어요.",
        "Ahogy minden nap hallgattam, megszerettem azt a dalt.",
        "-다 előtt nincs ㄷ-változás: 듣다 보니까",
      ],
    ],
  },
  {
    lesson: 11,
    point: 2,
    form: "-더라고요",
    name: "„azt tapasztaltam, hogy …” (saját élmény felidézése)",
    explanation: `<p>Ige vagy melléknév után a beszélő a <b>múltban közvetlenül látott, megtapasztalt</b> dolgot idézi fel és meséli el: „(láttam, és) tényleg …”. A tő végétől függetlenül ${korean("-더라고요")}.</p>`,
    table: {
      sampleSet: "verbsAndAdjectives",
      columns: [
        {
          header: "-더라고요",
          conjugate: (word) => withPlainStem(word, "더라고요"),
        },
      ],
    },
    examples: [
      [
        "주말에는 집에서 쉬는 게 좋<b>더라고요</b>.",
        "Azt tapasztaltam, hétvégén jó otthon pihenni.",
      ],
      [
        "그 식당 음식이 정말 맛있<b>더라고요</b>.",
        "Annak az étteremnek tényleg finom az étele (voltam ott).",
      ],
      [
        "제주도는 바람이 많이 불<b>더라고요</b>.",
        "Dzsedzsun nagyon fúj a szél (tapasztaltam).",
      ],
      [
        "어제 가 보니까 날씨가 정말 덥<b>더라고요</b>.",
        "Tegnap ott voltam, és tényleg nagyon meleg volt.",
        "-더라고요 előtt nincs ㅂ-változás: 덥더라고요",
      ],
    ],
    ownNote: `<p>Saját cselekvésünkről általában nem mondjuk (${korean("제가 먹더라고요")} furcsa), csak arról, amit <b>megfigyeltünk</b>; saját érzésről viszont igen: ${korean("저는 그 영화가 슬프더라고요")}.</p>`,
  },
  {
    lesson: 12,
    point: 1,
    form: "-는다/ㄴ다/다 (한다체)",
    name: "írott, semleges stílus (újság, jelentés, napló)",
    explanation: `<p>Hírekben, cikkekben, jelentésekben, naplóban használt <b>írott</b> stílus (한다체). Nem udvarias és nem udvariatlan, egyszerűen semleges.</p>
<ul><li><b>Ige</b>: 받침 után ${korean("-는다")}, magánhangzó után ${korean("-ㄴ다")}, ㄹ-tőnél az ㄹ kiesik: ${korean("만든다")}</li><li><b>Melléknév</b> (${korean("있다/없다")} is): ${korean("-다")}</li><li><b>Főnév</b>: 받침 után ${korean("-이다")}, magánhangzó után ${korean("-다")}</li><li><b>Múlt</b>: ${korean("-았다/었다")}; <b>jövő</b>: ${korean("-(으)ㄹ 것이다")}</li></ul>`,
    table: {
      sampleSet: "verbsAndAdjectives",
      columns: [
        { header: "Jelen", conjugate: (word) => plainStyleStatement(word) },
        { header: "Múlt", conjugate: (word) => withPast(word, "다") },
        { header: "Jövő", conjugate: (word) => withEu(word, "ㄹ 것이다") },
      ],
    },
    examples: [
      [
        "이 영화를 꼭 보라고 추천하고 싶<b>다</b>.",
        "Mindenkinek ajánlom, hogy nézze meg ezt a filmet.",
      ],
      [
        "요즘 한국 드라마를 보는 사람이 늘고 있<b>다</b>.",
        "Mostanában egyre többen néznek koreai sorozatokat.",
      ],
      [
        "나는 매일 아침 음악을 <b>듣는다</b>.",
        "Minden reggel zenét hallgatok.",
        "-는다 előtt nincs ㄷ-változás: 듣는다",
      ],
      ["그 영화는 정말 감동적이<b>었다</b>.", "Az a film igazán megható volt."],
    ],
    ownNote: `<p>A függő beszéd (${korean("-는다고 하다")}, 3A 2. lecke) is erre a formára épül. Kérdés írott stílusban: ${korean("-는가? / -(으)ㄴ가?")}, ${korean("-나?")}.</p>`,
  },
  {
    lesson: 12,
    point: 2,
    form: "-(으)라고 하다",
    name: "függő beszéd: felszólítás idézése („azt mondta, hogy tegyem …”)",
    explanation: `<p>Más <b>felszólítását, kérését, tanácsát</b> adjuk tovább. Ige után:</p>
<ul><li><b>받침</b> után ${korean("-으라고 하다")}, magánhangzó és <b>ㄹ</b> után ${korean("-라고 하다")}</li><li>Tiltás (${korean("-지 마세요")}) → ${korean("-지 말라고 하다")}</li><li>Ha a beszélő <b>magának</b> kért valamit (${korean("-아/어 주세요")}) → ${korean("-아/어 달라고 하다")}; ha harmadik személynek → ${korean("-아/어 주라고 하다")}</li></ul>`,
    table: {
      sampleSet: "verbs",
      columns: [
        {
          header: "-(으)라고 했어요",
          conjugate: (word) => withEu(word, "라고 했어요"),
        },
        {
          header: "-지 말라고 했어요",
          conjugate: (word) => withPlainStem(word, "지 말라고 했어요"),
        },
        {
          header: "-아/어 달라고 했어요",
          conjugate: (word) => withAOrEo(word, " 달라고 했어요"),
        },
      ],
    },
    examples: [
      [
        "친구가 이 영화를 꼭 보<b>라고 했어요</b>.",
        "A barátom azt mondta, mindenképp nézzem meg ezt a filmet.",
      ],
      [
        "의사 선생님이 푹 쉬<b>라고 하셨어요</b>.",
        "Az orvos azt mondta, pihenjek sokat.",
      ],
      [
        "선생님께서 수업 시간에 휴대폰을 쓰지 <b>말라고 하셨어요</b>.",
        "A tanár azt mondta, ne használjuk a mobilt óra alatt.",
      ],
      [
        "동생이 숙제를 도와 <b>달라고 했어요</b>.",
        "Az öcsém megkért, hogy segítsek neki a házival.",
        "ㅂ-rendhagyó: 돕다 → 도와 달라고",
      ],
    ],
    honorific: {
      rows: [
        [
          "-아/어 주라고 하다",
          "azt mondta, tegyem meg neki (harmadik személynek)",
          "-아/어 드리라고 하다",
          "azt mondta, tegyem meg (tisztelt személynek)",
        ],
        [
          "-(으)라고 했어요",
          "azt mondta, hogy …",
          "-(으)라고 하셨어요",
          "azt mondta (tisztelt személy mondta)",
        ],
      ],
      note: `<p>Ha a felszólítás egy <b>tisztelt harmadik személy javára</b> szól, a ${korean("주라고")} helyett ${korean("드리라고")} áll (vö. ${korean("-아/어 드리다")}, 3B 1. lecke). Ha a felszólítást <b>tisztelt személy mondta</b>, az idéző ige kap tiszteleti alakot: ${korean("하셨어요")}, ${korean("말씀하셨어요")}.</p>`,
      examples: [
        [
          "어머니가 할머니를 도와 <b>드리라고 했어요</b>.",
          "Anya azt mondta, segítsek a nagymamának.",
          "ㅂ-rendhagyó: 돕다 → 도와 드리라고",
        ],
        [
          "선생님께서 내일 다시 오<b>라고 하셨어요</b>.",
          "A tanár úr azt mondta, jöjjek vissza holnap.",
        ],
        [
          "아버지께서 할아버지께 전화 <b>드리라고 하셨어요</b>.",
          "Apa azt mondta, hívjam fel a nagyapát.",
        ],
      ],
    },
    ownNote: `<p>A négy függő beszéd-típus: kijelentés ${korean("-는다고/ㄴ다고/다고")}, felszólítás ${korean("-(으)라고")}, javaslat ${korean("-자고")}, kérdés ${korean("-냐고")} (ez utóbbi a 4A 3. leckében jön, a rövidített ${korean("-냬요, -(으)래요, -재요")} alakokkal együtt).</p>`,
  },
];
export default {
  lessons: {
    1: {
      korean: "그동안 어떻게 지냈니?",
      hungarian: "Hogy voltál mostanában?",
    },
    2: {
      korean: "요즘 좀 바쁘다고 해",
      hungarian: "Azt mondja, mostanában elég elfoglalt.",
      pronunciation: "격음화",
      pronunciationHungarian: "hehezetesedés",
    },
    3: {
      korean: "이번에 이사를 할까 해요",
      hungarian: "Arra gondoltam, hogy most költözöm.",
    },
    4: {
      korean: "나는 거실 청소를 할 테니까 넌 주방 청소를 해 줘",
      hungarian: "Én kitakarítom a nappalit, te csináld a konyhát.",
      pronunciation: "경음화",
      pronunciationHungarian: "keményedés",
    },
    5: {
      korean: "환불하려면 영수증이 필요합니다",
      hungarian: "A visszatérítéshez szükség van a blokkra.",
    },
    6: {
      korean: "새로 사려다가 수리해서 쓰고 있어요",
      hungarian: "Újat akartam venni, de megjavíttattam, és azt használom.",
      pronunciation: "외래어 발음",
      pronunciationHungarian: "jövevényszavak kiejtése",
    },
    7: {
      korean: "여자 친구하고 만난 지 곧 3년이 돼",
      hungarian: "Nemsokára három éve járunk a barátnőmmel.",
    },
    8: {
      korean: "한글날을 기념하기 위해서 여러 가지 행사를 한다고 해",
      hungarian: "A hangul napja alkalmából sokféle rendezvényt tartanak.",
      pronunciation: "비음화",
      pronunciationHungarian: "orrhangúsodás",
    },
    9: {
      korean: "비가 오면 오히려 기분이 좋아지는데요",
      hungarian: "Ha esik az eső, nekem épp jobb kedvem lesz.",
    },
    10: {
      korean: "오늘은 일찍 들어가도록 하세요",
      hungarian: "Ma menjen haza korán.",
      pronunciation: "모음 ㅢ",
      pronunciationHungarian: "az ㅢ kiejtése (거의 [거의/거이])",
    },
    11: {
      korean: "주말에는 집에서 쉬는 게 좋더라고요",
      hungarian: "Azt tapasztaltam, hétvégén jó otthon pihenni.",
    },
    12: {
      korean: "이 영화를 꼭 보라고 추천하고 싶다",
      hungarian: "Mindenkinek ajánlom, hogy nézze meg ezt a filmet.",
      pronunciation: "모음 ㅚ",
      pronunciationHungarian: "az ㅚ kiejtése (괴물 [괴물/궤물])",
    },
  },
  points: points.map((point) =>
    Object.assign(
      {
        studentBookPage: studentBookPageOf(point.lesson, point.point),
        vocabularyGrammarPage: vocabularyGrammarPageOf(
          point.lesson,
          point.point,
        ),
      },
      point,
    ),
  ),
} satisfies BookData;
