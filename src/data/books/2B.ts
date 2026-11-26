import {
  bold,
  exampleList,
  heading,
  korean,
  koreanWithTranslation,
  list,
  paragraph,
  reference,
  simpleTable,
  text,
} from '../../lib/richText';
import { presentModifier, withAOrEo, withPast, withEu, withPlainStem, type Word } from '../../lib/conjugation';
import type { BookData, PointSource } from '../types';
const vocabularyGrammarPageOf = (lesson: number, point: number) => 26 + 2 * (lesson - 1) + (point - 1),
  studentBookPageOf = (lesson: number, point: number) => 16 + 8 * (lesson - 1) + (point - 1);
const informalSpeech = (word: Word) => withAOrEo(word, '');

const points: PointSource[] = [
  {
    lesson: 1,
    point: 1,
    form: '-(으)ㄹ래요?',
    name: '„Lenne kedved …? / Mit szeretnél?” (a másik szándéka)',
    explanation: [
      paragraph`Ige után a hallgató ${bold('szándékára, kedvére')} kérdez rá: „Akarsz …?”, „Mit szeretnél …?”. Kötetlen, beszélt nyelvi, közvetlen hangulatú.`,
      paragraph`${bold('받침')} után: ${bold('-을래요?')}, magánhangzó után: ${bold('-ㄹ래요?')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik és ${bold('-ㄹ래요?')} jön (${korean('만들래요?')}).`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ래요?', conjugate: word => withEu(word, 'ㄹ래요?') }] },
    examples: [
      [text`이번 주 금요일에 동아리 모임 ${bold('할래요')}?`, 'Lenne kedved pénteken klubtalálkozót tartani?'],
      [text`뭐 마${bold('실래요')}?`, 'Mit innál?'],
      [text`저녁에 같이 김밥 만${bold('들래요')}?`, 'Csinálunk este együtt kimbapot?', 'ㄹ-tő: 만들다 → 만들래요'],
      [text`이 노래 같이 들${bold('을래요')}?`, 'Meghallgatod velem ezt a dalt?', 'ㄷ-rendhagyó: 듣다 → 들을래요'],
    ],
    ownNote: [
      paragraph`Kijelentésként a beszélő saját szándékát jelenti: ${korean('저는 커피 마실래요')} „Én kávét kérek”.`,
    ],
    honorific: {
      rows: [
        ['-(으)ㄹ래요?', 'akarsz …? (közvetlen)', '-(으)시겠어요?', 'parancsol …? (udvarias)'],
        ['-(으)ㄹ래요?', 'akarsz …? (közvetlen)', '-(으)실래요?', 'kér …? (barátságos, tiszteleti)'],
      ],
      note: [
        paragraph`Idősebbnek, vendégnek, ügyfélnek a ${korean('-(으)ㄹ래요?')} túl közvetlen. A legudvariasabb a ${korean('-(으)시겠어요?')}; a ${korean('-(으)실래요?')} tiszteleti, de barátságosabb, kötetlenebb. A külön tiszteleti igék itt is érvényesek: ${korean('먹다/마시다 → 드시다')}.`,
      ],
      examples: [
        [text`뭐 ${bold('드시겠어요')}?`, 'Mit parancsol? (Mit enne/inna?)'],
        [text`커피 한 잔 ${bold('드실래요')}?`, 'Kér egy kávét?'],
        [text`여기 앉${bold('으시겠어요')}?`, 'Leülne ide?'],
      ],
    },
  },
  {
    lesson: 1,
    point: 2,
    form: '-(으)ㄹ게요',
    name: '„… majd én …; megígérem, hogy …” (szándék, ígéret)',
    explanation: [
      paragraph`Ige után a beszélő ${bold('szándékát, akaratát')} fejezi ki, sokszor a hallgatóra tekintettel: ${bold('ígéret, vállalás')}. Csak első személyben, és kérdésben nem használjuk.`,
      paragraph`${bold('받침')} után: ${bold('-을게요')}, magánhangzó után: ${bold('-ㄹ게요')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik és ${bold('-ㄹ게요')} jön (${korean('만들게요')}).`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)ㄹ게요', conjugate: word => withEu(word, 'ㄹ게요') }] },
    examples: [
      [text`제가 음식을 준비${bold('할게요')}.`, 'Az ételt majd én készítem el.'],
      [text`내일 꼭 일찍 ${bold('올게요')}.`, 'Megígérem, hogy holnap korán jövök.'],
      [text`이사할 때 제가 도${bold('울게요')}.`, 'Ha költözöl, segítek.', 'ㅂ-rendhagyó: 돕다 → 도울게요'],
      [
        text`다음부터는 선생님 말씀을 잘 들${bold('을게요')}.`,
        'Mostantól jól oda fogok figyelni a tanárra.',
        'ㄷ-rendhagyó: 듣다 → 들을게요',
      ],
    ],
    ownNote: [
      paragraph`${bold('-(으)ㄹ게요 vagy -(으)ㄹ 거예요?')} Az ${korean('-(으)ㄹ 거예요')} semleges terv („ezt fogom csinálni”), a ${korean('-(으)ㄹ게요')} a hallgatónak szóló vállalás, ígéret („rendben, majd én…”). Kiejtése: [-ㄹ께요].`,
    ],
    correctIncorrect: [
      { correct: '제가 갈게요.', translation: 'Majd én megyek.' },
      { incorrect: '마크 씨가 갈게요.', reason: 'csak a beszélő szándéka lehet' },
      { incorrect: '뭐 먹을게요?', reason: 'kérdésben -(으)ㄹ래요? kell' },
    ],
  },
  {
    lesson: 2,
    point: 1,
    form: '에서부터',
    name: '„-tól/-től (kezdve)” (kiinduló hely hangsúlyozva)',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt a ${bold('helyet')} jelöli, ${bold('ahonnan')} egy cselekvés vagy állapot kiindul, és ezt ${bold('hangsúlyozza')}. Az ${korean('에서')} és a ${korean('부터')} összetétele, gyakran ${korean('까지')}-val párban. Minden főnév után ugyanaz.`,
    ],
    examples: [
      [text`세종학당${bold('에서부터')} 걸어서 10분쯤 걸려요.`, 'A Szedzsong Intézettől gyalog kb. 10 perc.'],
      [text`집${bold('에서부터')} 학교까지 뛰어왔어요.`, 'Otthonról egészen az iskoláig futottam.'],
      [text`여기${bold('에서부터')} 저기까지 청소해 주세요.`, 'Innen addig takarítsd ki, kérlek.'],
      [text`공항${bold('에서부터')} 비가 오기 시작했어요.`, 'Már a reptéren elkezdett esni.'],
    ],
    ownNote: [
      paragraph`Időnél egyszerűen ${korean('부터')}: ${korean('아침부터 저녁까지')}. Az ${korean('에서')} önmagában is jelenthet kiindulópontot (${korean('집에서 학교까지')}); a ${korean('부터')} csak kiemeli.`,
    ],
  },
  {
    lesson: 2,
    point: 2,
    form: '-(으)ㄹ (동사 미래)',
    name: 'ige jövő idejű jelzői alakja („az elvégzendő munka”)',
    explanation: [
      paragraph`Ige után áll, amikor az ige ${bold('főnevet jelöl')}, és a cselekvés ${bold('jövőbeli, tervezett, szándékolt')}: ${korean('내일 할 일')} „a holnapi teendő (amit holnap csinálok)”.`,
      paragraph`${bold('받침')} után: ${bold('-을')}, magánhangzó után: ${bold('-ㄹ')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik: ${korean('만들 음식')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-(으)ㄹ + főnév', conjugate: word => withEu(word, 'ㄹ') + ' 거' }],
    },
    examples: [
      [text`주말에 ${bold('할')} 일이 많아요.`, 'Sok teendőm van hétvégére.'],
      [text`파티에서 먹${bold('을')} 음식을 샀어요.`, 'Megvettem az ételt, amit a bulin eszünk.'],
      [
        text`여행 갈 때 들${bold('을')} 노래를 골랐어요.`,
        'Kiválasztottam a dalokat, amiket az úton hallgatok.',
        'ㄷ-rendhagyó: 듣다 → 들을',
      ],
      [
        text`내일 만${bold('들')} 케이크 재료를 준비했어요.`,
        'Előkészítettem a holnapi torta hozzávalóit.',
        'ㄹ-tő: 만들다 → 만들',
      ],
    ],
    ownNote: [
      paragraph`Sok állandó szerkezet erre épül: ${korean('-(으)ㄹ 때')}, ${korean('-(으)ㄹ 수 있다')}, ${korean('-(으)ㄹ 거예요')}, ${korean('-(으)ㄹ 것 같다')}. Összefoglaló: ${reference('rule-7')}`,
    ],
  },
  {
    lesson: 3,
    point: 1,
    form: '-(으)시-',
    name: 'tiszteleti alak (az alany tisztelete)',
    explanation: [
      paragraph`Ige vagy melléknév tövéhez kapcsolódik, és az ${bold('alany iránti tiszteletet')} fejezi ki (idősebb, magasabb rangú személy). Utána jön a többi végződés: ${korean('-(으)세요')} (= ${korean('시 + 어요')}), ${korean('-(으)셨어요')}, ${korean('-(으)십니다')}.`,
      paragraph`${bold('받침')} után: ${bold('-으시-')}, magánhangzó után: ${bold('-시-')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik: ${korean('만드시다')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen -(으)세요', conjugate: word => withEu(word, '세요') },
        { header: 'Múlt -(으)셨어요', conjugate: word => withEu(word, '셨어요') },
        { header: 'Formális -(으)십니다', conjugate: word => withEu(word, '십니다') },
      ],
    },
    customContent: [
      heading('Külön tiszteleti szavak'),
      simpleTable(
        ['Alap', 'Tiszteleti', 'Alap', 'Tiszteleti'],
        [
          [
            koreanWithTranslation('먹다 / 마시다', 'eszik / iszik'),
            koreanWithTranslation('드시다', 'eszik, iszik (tiszteleti)'),
            koreanWithTranslation('이/가', 'alanyjelölő'),
            koreanWithTranslation('께서', 'alanyjelölő (tiszteleti)'),
          ],
          [
            koreanWithTranslation('자다', 'alszik'),
            koreanWithTranslation('주무시다', 'alszik (tiszteleti)'),
            koreanWithTranslation('은/는', 'témajelölő'),
            koreanWithTranslation('께서는', 'témajelölő (tiszteleti)'),
          ],
          [
            koreanWithTranslation('있다 (személy)', 'van, ott tartózkodik'),
            koreanWithTranslation('계시다', 'van, ott tartózkodik (tiszteleti)'),
            koreanWithTranslation('에게', '-nak/-nek (személynek)'),
            koreanWithTranslation('께', '-nak/-nek (tiszteleti)'),
          ],
          [
            koreanWithTranslation('말하다', 'mond, beszél'),
            koreanWithTranslation('말씀하시다', 'mond, beszél (tiszteleti)'),
            koreanWithTranslation('집', 'ház, otthon'),
            koreanWithTranslation('댁', 'ház, otthon (tiszteleti)'),
          ],
          [
            koreanWithTranslation('아프다', 'beteg, fáj'),
            koreanWithTranslation('편찮으시다', 'beteg (tiszteleti)'),
            koreanWithTranslation('나이 / 이름', 'életkor / név'),
            koreanWithTranslation('연세 / 성함', 'életkor / név (tiszteleti)'),
          ],
        ]
      ),
    ],
    examples: [
      [
        text`할머니께서 직접 만${bold('드신')} 목걸이예요.`,
        'Ezt a nyakláncot a nagymamám maga készítette.',
        'ㄹ-tő: 만들다 → 만드신',
      ],
      [text`아버지께서는 회사에 다니${bold('세요')}.`, 'Édesapám egy cégnél dolgozik.'],
      [text`선생님께서 음악을 들${bold('으세요')}.`, 'A tanár úr zenét hallgat.', 'ㄷ-rendhagyó: 듣다 → 들으세요'],
      [text`할아버지께서 진지를 ${bold('드셨어요')}.`, 'Nagyapa megebédelt (tiszteleti szavakkal).'],
    ],
    ownNote: [
      paragraph`Magunkra soha nem használjuk. A ${korean('-(으)세요')} lehet kijelentés („ő …”), kérdés és felszólítás is (${reference('1A-06-2')}). A rendhagyók a 으-kezdetű végződés szabályait követik: ${korean('덥다 → 더우세요, 짓다 → 지으세요')}.`,
    ],
  },
  {
    lesson: 3,
    point: 2,
    form: '에게만, 에게도',
    name: '„csak neki” / „neki is”',
    conjugable: false,
    explanation: [
      paragraph`Az ${korean('에게')} („-nak/-nek”) összetételei: ${bold('에게만')} = ${korean('에게 + 만')} „${bold('csak')} neki (egyetlen személynek)”; ${bold('에게도')} = ${korean('에게 + 도')} „neki ${bold('is')} (a másik mellett)”. Minden főnév után ugyanaz; beszédben ${korean('한테만, 한테도')}.`,
    ],
    examples: [
      [text`이 이야기는 너${bold('에게만')} 말하는 거야.`, 'Ezt csak neked mondom.'],
      [text`동생${bold('에게도')} 선물을 줬어요.`, 'Az öcsémnek is adtam ajándékot.'],
      [text`저는 친구들${bold('한테만')} 연락했어요.`, 'Csak a barátaimnak szóltam.'],
    ],
    honorific: {
      rows: [
        ['에게만', 'csak neki', '께만', 'csak neki (tiszteleti)'],
        ['에게도', 'neki is', '께도', 'neki is (tiszteleti)'],
      ],
      note: [
        paragraph`Tisztelt személynél az ${korean('에게')} helyére ${korean('께')} kerül (${reference('2B-07-1')}), a ${korean('만')} és a ${korean('도')} ugyanúgy hozzájárul. Az „ad” ilyenkor ${korean('드리다')}, a „mond” ${korean('말씀드리다')}.`,
      ],
      examples: [
        [text`부모님${bold('께도')} 편지를 썼어요.`, 'A szüleimnek is írtam levelet.'],
        [text`이 일은 선생님${bold('께만')} 말씀드렸어요.`, 'Ezt csak a tanár úrnak mondtam el.'],
        [text`할아버지${bold('께도')} 선물을 드렸어요.`, 'A nagyapának is adtam ajándékot.'],
      ],
    },
  },
  {
    lesson: 4,
    point: 1,
    form: '-다가',
    name: '„… közben (abbahagyva) …”: megszakított cselekvés',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy cselekvés vagy állapot ${bold('megszakad')}, és átvált egy másikba; vagy hogy valami közben, ${bold('útközben')} történik más: ${korean('오다가 친구를 만났어요')} „idefelé jövet összefutottam egy barátommal”. A tő végétől függetlenül ${korean('-다가')}; beszédben ${korean('-다')}.`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-다가', conjugate: word => withPlainStem(word, '다가') }] },
    examples: [
      [
        text`세종학당에 오${bold('다가')} 중학교 때 친구를 만났어요.`,
        'Idefelé jövet összefutottam egy középiskolai barátommal.',
      ],
      [text`공부하${bold('다가')} 잠이 들었어요.`, 'Tanulás közben elaludtam.'],
      [
        text`음악을 듣${bold('다가')} 전화를 받았어요.`,
        'Zenehallgatás közben felvettem a telefont.',
        '-다가 előtt nincs ㄷ-változás: 듣다가',
      ],
      [text`밥을 먹${bold('다가')} 갑자기 나갔어요.`, 'Evés közben hirtelen kiment.'],
    ],
    ownNote: [
      paragraph`A két tagmondat alanya azonos. ${korean('-았다가/었다가')}: az első cselekvés ${bold('befejeződött')}, majd jött a másik: ${korean('학교에 갔다가 왔어요')} „elmentem az iskolába és visszajöttem”.`,
      paragraph`Változást jelentő igével (${korean('-아지다/어지다')}, ${reference('3A-09-1')}) jól látszik a különbség:`,
      exampleList([
        [
          '감기가 나아지다가 다시 심해졌어요.',
          'Már javulóban volt a megfázásom, de újra rosszabb lett.',
          'ㅅ-rendhagyó: 낫다 → 나아지다',
        ],
        ['감기가 나아졌다가 다시 심해졌어요.', 'Javult a megfázásom, aztán újra rosszabb lett.'],
      ]),
    ],
  },
  {
    lesson: 4,
    point: 2,
    form: '-아/어 주다',
    name: '„megteszi valakinek / valaki kedvéért”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy a cselekvést ${bold('valaki más javára')} végezzük: segítség felajánlása, ígérete, illetve ${bold('segítség kérése')} (${korean('-아/어 주세요')}). A ${bold('-아/어')} szabály szerint: ${korean('가 주다, 읽어 주다, 해 주다')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: 'Kérés: -아/어 주세요', conjugate: word => withAOrEo(word, ' 주세요') },
        { header: 'Felajánlás: -아/어 줄게요', conjugate: word => withAOrEo(word, ' 줄게요') },
      ],
    },
    examples: [
      [text`사진 좀 찍어 ${bold('주세요')}.`, 'Lefotóznál, kérlek?'],
      [text`제가 가방을 들어 ${bold('줄게요')}.`, 'Majd én viszem a táskádat.'],
      [text`친구가 길을 가르쳐 ${bold('줬어요')}.`, 'A barátom megmutatta az utat.'],
      [text`제 이야기 좀 들어 ${bold('주세요')}.`, 'Hallgass meg, kérlek.', 'ㄷ-rendhagyó: 듣다 → 들어 주세요'],
    ],
    ownNote: [
      paragraph`Ha a beszélő magának kér: ${korean('-아/어 주세요')}; idézve ${korean('-아/어 달라고 하다')} (${reference('3A-12-2')}).`,
    ],
    honorific: {
      rows: [
        ['-아/어 주다', 'megteszi valakinek', '-아/어 드리다', 'megteszi tisztelt személynek'],
        ['-아/어 주다', 'valaki megteszi nekem', '-아/어 주시다', 'tisztelt személy teszi meg nekem'],
      ],
      note: [
        paragraph`Két irány van. Ha ${bold('a kedvezményezett')} tisztelt (mi teszünk valamit egy idősebbnek), ${korean('-아/어 드리다')} kell (${reference('3B-01-2')}). Ha ${bold('a cselekvő')} tisztelt (egy idősebb tesz nekünk valamit), ${korean('-아/어 주시다')}. Kérésnél a ${korean('-아/어 주세요')} már udvarias; még udvariasabb a ${korean('-아/어 주시겠어요?')}.`,
      ],
      examples: [
        [text`할머니께 책을 읽어 ${bold('드렸어요')}.`, 'Felolvastam egy könyvet a nagymamának.'],
        [text`선생님께서 길을 가르쳐 ${bold('주셨어요')}.`, 'A tanár úr megmutatta nekem az utat.'],
        [text`제가 가방을 들어 ${bold('드릴게요')}.`, 'Majd én viszem a táskáját.'],
        [text`사진 좀 찍어 ${bold('주시겠어요')}?`, 'Lefényképezne, kérem?'],
      ],
    },
  },
  {
    lesson: 5,
    point: 1,
    form: '-네요',
    name: '„… (de) …!” (most tapasztalt dologra rácsodálkozás)',
    explanation: [
      paragraph`Ige vagy melléknév után olyasmit mond ki, amit a beszélő ${bold('épp most, közvetlenül tapasztalt')} meg; gyakran ${bold('rácsodálkozás')}: „De szép!”, „Nahát, esik!”. A tő végétől függetlenül ${korean('-네요')}, ${bold('ㄹ-tőnél')} az ㄹ kiesik (${korean('기네요, 사네요')}). Állhat előtte ${korean('-았/었-')} és ${korean('-(으)시-')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-네요', conjugate: word => withPlainStem(word, '네요') },
        { header: 'Múlt: -았네요/었네요', conjugate: word => withPast(word, '네요') },
      ],
    },
    examples: [
      [text`와, 공연장이 정말 크${bold('네요')}!`, 'Hű, de nagy ez a koncertterem!'],
      [text`밖에 비가 오${bold('네요')}.`, 'Nahát, kint esik.'],
      [text`한국어를 정말 잘하시${bold('네요')}.`, 'Ön tényleg nagyon jól beszél koreaiul!'],
      [text`오늘 날씨가 덥${bold('네요')}.`, 'Ma aztán meleg van!', '-네요 előtt nincs ㅂ-változás: 덥네요'],
    ],
    ownNote: [
      paragraph`A ㅎ-rendhagyóknál is megmarad a ㅎ: ${korean('그렇네요')} (ritkábban ${korean('그러네요')}). Barátok közt: ${korean('-네')} (${korean('예쁘네!')}). Hasonló, de egyedül, magában mondott csodálkozás: ${korean('-는구나/구나')} (${reference('3B-03-2')}).`,
    ],
  },
  {
    lesson: 5,
    point: 2,
    form: '-지 말다',
    name: 'tiltás („ne …!”)',
    explanation: [
      paragraph`Ige után ${bold('tilt')}: „ne csináld!”. Leggyakrabban ${korean('-지 마세요')} alakban. A tő végétől függetlenül ${korean('-지')}; a ${korean('말다')} ragozódik (${korean('마세요, 마, 맙시다')}).`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-지 마세요', conjugate: word => withPlainStem(word, '지 마세요') },
        { header: 'Barátnak: -지 마', conjugate: word => withPlainStem(word, '지 마') },
      ],
    },
    examples: [
      [text`공연 중에 핸드폰을 사용하${bold('지 마세요')}.`, 'Az előadás alatt ne használja a mobilját!'],
      [text`여기에서 사진을 찍${bold('지 마세요')}.`, 'Itt ne fényképezzen!'],
      [text`걱정하${bold('지 마세요')}.`, 'Ne aggódjon!'],
      [
        text`큰 소리로 음악을 듣${bold('지 마세요')}.`,
        'Ne hallgasson hangosan zenét!',
        '-지 előtt nincs ㄷ-változás: 듣지',
      ],
    ],
    ownNote: [
      paragraph`Közös tiltás: ${korean('-지 맙시다')} („ne …-junk”). Két dolog közül választva: ${korean('-지 말고')} („ne X-et, hanem Y-t”): ${korean('버스를 타지 말고 지하철을 타세요')}. Melléknévvel nem állhat.`,
    ],
  },
  {
    lesson: 6,
    point: 1,
    form: '-아도/어도 되다',
    name: '„szabad …, lehet …” (engedély)',
    explanation: [
      paragraph`Ige után ${bold('engedélyt')} kér vagy ad: „Szabad …?”, „Igen, nyugodtan …”. A ${bold('-아/어')} szabály szerint: ${korean('가도 돼요, 먹어도 돼요, 해도 돼요')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-아도/어도 돼요(?)', conjugate: word => withAOrEo(word, '도 돼요') }],
    },
    examples: [
      [text`여기에서 노트북을 사용해${bold('도 돼요')}?`, 'Használhatom itt a laptopot?'],
      [text`네, 사용해${bold('도 돼요')}.`, 'Igen, használhatja.'],
      [text`창문 좀 열어${bold('도 돼요')}?`, 'Kinyithatom az ablakot?'],
      [text`이 노래 좀 들어${bold('도 돼요')}?`, 'Meghallgathatom ezt a dalt?', 'ㄷ-rendhagyó: 듣다 → 들어도'],
    ],
    ownNote: [
      paragraph`„Nem kell …”: ${korean('안 -아도/어도 되다')} vagy ${korean('-지 않아도 되다')}: ${korean('내일은 안 와도 돼요')}. Udvariasabb engedélykérés: ${korean('-아도/어도 될까요?')}. Tiltó válasz: ${korean('-(으)면 안 되다')} (következő pont).`,
    ],
  },
  {
    lesson: 6,
    point: 2,
    form: '-(으)면 안 되다',
    name: '„nem szabad …” (tiltás)',
    explanation: [
      paragraph`Ige után azt mondja, hogy valamit ${bold('nem szabad')} megtenni, vagy valami nem lehet úgy. Szabályok, tiltások leírására.`,
      paragraph`${bold('받침')} után: ${bold('-으면 안 되다')}, magánhangzó és ${bold('ㄹ')} után: ${bold('-면 안 되다')}.`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [{ header: '-(으)면 안 돼요', conjugate: word => withEu(word, '면 안 돼요') }],
    },
    examples: [
      [text`도서관에서 음식을 먹${bold('으면 안 돼요')}.`, 'A könyvtárban nem szabad enni.'],
      [text`여기에 차를 세우${bold('면 안 돼요')}.`, 'Ide nem szabad leparkolni.'],
      [
        text`수업 시간에 음악을 들${bold('으면 안 돼요')}.`,
        'Óra alatt nem szabad zenét hallgatni.',
        'ㄷ-rendhagyó: 듣다 → 들으면',
      ],
      [
        text`가: 여기에서 사진을 찍어도 돼요? 나: 아니요, 찍${bold('으면 안 돼요')}.`,
        '– Szabad itt fényképezni? – Nem, nem szabad.',
      ],
    ],
  },
  {
    lesson: 7,
    point: 1,
    form: '에게서, 한테서, 께',
    name: '„-tól/-től” (személytől) és a tiszteleti 께',
    conjugable: false,
    explanation: [
      paragraph`Személy (vagy állat) után azt jelöli, ${bold('akitől')} valami származik: kaptunk, hallottunk, tanultunk tőle. Az ${korean('에게서')} kicsit írottabb, a ${korean('한테서')} beszélt nyelvi.`,
      paragraph`A ${bold('께')} az ${korean('에게')} („-nak/-nek”) tiszteleti párja: ${korean('할머니께 드렸어요')}. Minden főnév után ugyanaz.`,
    ],
    examples: [
      [text`마리 씨${bold('한테서')} 그 친구 이야기를 들었어요.`, 'Maritól hallottam erről a barátról.'],
      [text`친구${bold('에게서')} 편지를 받았어요.`, 'Levelet kaptam a barátomtól.'],
      [text`선생님${bold('께')} 질문했어요.`, 'Kérdeztem a tanártól (tiszteleti: a tanárnak tettem fel kérdést).'],
      [text`어머니${bold('께')} 꽃을 드렸어요.`, 'Virágot adtam édesanyámnak.'],
    ],
    ownNote: [
      paragraph`„-tól/-től” tiszteleti alakja szintén ${korean('께')}: ${korean('선생님께 배웠어요')} „a tanártól tanultam”. Beszédben a ${korean('서')} gyakran elmarad: ${korean('친구한테 들었어요')}. Helyekről: ${korean('에서')}: ${korean('회사에서 연락이 왔어요')}.`,
    ],
  },
  {
    lesson: 7,
    point: 2,
    form: '-(으)니까 (발견)',
    name: '„amikor …, rájöttem, hogy …” (felfedezés)',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy az első cselekvés közben vagy után a beszélő ${bold('rájött, észrevett')} valamit. A második tagmondat a felfedezett tény, gyakran múlt időben.`,
      paragraph`${bold('받침')} után: ${bold('-으니까')}, magánhangzó és ${bold('ㄹ')} után: ${bold('-니까')} (ㄹ kiesik: ${korean('사니까')}).`,
    ],
    table: { sampleSet: 'verbs', columns: [{ header: '-(으)니까', conjugate: word => withEu(word, '니까') }] },
    examples: [
      [text`집에 오${bold('니까')} 택배가 와 있었어요.`, 'Amikor hazaértem, már ott volt a csomag.'],
      [
        text`한국에 살아 보${bold('니까')} 정말 편해요.`,
        'Most, hogy Koreában élek, látom, hogy nagyon kényelmes.',
        { uses: ['3A-05-1'] },
      ],
      [text`아침에 일어나${bold('니까')} 눈이 오고 있었어요.`, 'Amikor reggel felkeltem, épp havazott.'],
      [
        text`그 노래를 들${bold('으니까')} 고향 생각이 났어요.`,
        'Amikor meghallottam azt a dalt, eszembe jutott az otthonom.',
        'ㄷ-rendhagyó: 듣다 → 들으니까',
      ],
    ],
    ownNote: [
      paragraph`Az első tagmondat általában ${bold('nem kap múlt időt')} (${korean('가니까')}, nem ${korean('갔으니까')}), ebben különbözik az ok-jelentésű ${korean('-(으)니까')}-tól (${reference('1B-12-2')}). Gyakori változata a ${korean('-아/어 보니까')} (${reference('3A-05-1')}).`,
    ],
  },
  {
    lesson: 8,
    point: 1,
    form: '-는데/(으)ㄴ데 (대조)',
    name: '„…, de …” (ellentét)',
    explanation: [
      paragraph`Ige, melléknév, ${korean('이다')} után azt fejezi ki, hogy a második tagmondat ${bold('ellentétben áll')} az elsővel: két szembeállított tény. Képzése azonos a ${reference('2A-08-1', '2A 8. leckében')} tanult háttér-jelentésűvel:`,
      list(
        text`${bold('Ige')} és ${bold('있다/없다')}: ${korean('-는데')} (ㄹ kiesik)`,
        text`${bold('Melléknév')}: 받침 után ${korean('-은데')}, magánhangzó után ${korean('-ㄴ데')} (ㄹ kiesik)`,
        text`Múlt: ${korean('-았는데/었는데')}, főnév: ${korean('-인데')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: 'Jelen', conjugate: word => presentModifier(word, '데') },
        { header: 'Múlt: -았는데/었는데', conjugate: word => withPast(word, '는데') },
      ],
    },
    examples: [
      [
        text`어렸을 때는 머리가 길었${bold('는데')} 지금은 짧은 머리가 편해요.`,
        'Gyerekkoromban hosszú hajam volt, most viszont a rövid kényelmes.',
      ],
      [text`형은 키가 ${bold('큰데')} 저는 작아요.`, 'A bátyám magas, én viszont alacsony.'],
      [text`이 식당은 음식은 맛있${bold('는데')} 좀 비싸요.`, 'Ebben az étteremben finom az étel, de kicsit drága.'],
      [
        text`어제는 ${bold('추웠는데')} 오늘은 따뜻해요.`,
        'Tegnap hideg volt, ma viszont meleg van.',
        'ㅂ-rendhagyó: 춥다 → 추웠는데',
      ],
    ],
    ownNote: [
      paragraph`A ${korean('-지만')}-nál (${reference('1B-09-1')}) lágyabb, beszéltebb. A szembeállítást gyakran ${korean('은/는')} is erősíti mindkét tagmondatban.`,
    ],
  },
  {
    lesson: 8,
    point: 2,
    form: '밖에',
    name: '„csak, nem más, mint …” (tagadással)',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt fejezi ki, hogy ${bold('nincs más lehetőség')}, csak ez az egy. Mindig ${bold('tagadó')} állítmánnyal áll (${korean('없다, 안, 못, 모르다')}). Minden főnév után ugyanaz.`,
    ],
    examples: [
      [text`지갑에 천 원${bold('밖에')} 없어요.`, 'Csak ezer von van a pénztárcámban.'],
      [text`저는 한국어${bold('밖에')} 몰라요.`, 'Csak koreaiul tudok.', '르-rendhagyó: 모르다 → 몰라요'],
      [text`어제 세 시간${bold('밖에')} 못 잤어요.`, 'Tegnap csak három órát tudtam aludni.'],
      [text`우리 반에는 남학생이 한 명${bold('밖에')} 없어요.`, 'Az osztályunkban csak egy fiú van.'],
    ],
    correctIncorrect: [
      { correct: '천 원밖에 없어요.', translation: 'Csak ezer wonom van.' },
      { incorrect: '천 원밖에 있어요.', reason: 'a 밖에 után tagadás kell' },
      { correct: '천 원만 있어요.', translation: 'Csak ezer wonom van.', note: 'állító mondatban: 만 „csak”' },
    ],
    ownNote: [
      paragraph`A ${korean('만')} („csak”) semleges, a ${korean('밖에')} hangsúlyozza, hogy ${bold('kevés')}, és sajnáljuk. Igével: ${korean('-(으)ㄹ 수밖에 없다')} „nem tehetek mást, mint…”.`,
    ],
  },
  {
    lesson: 9,
    point: 1,
    form: '-기 때문에',
    name: '„mivel, mert” (ok)',
    explanation: [
      paragraph`Ige vagy melléknév után az ${bold('okot, okozatot')} fejezi ki: „mivel X, Y”. A tő végétől függetlenül ${korean('-기 때문에')}. Múltra: ${korean('-았기/었기 때문에')}; a ${korean('-겠-')} nem állhat előtte. Főnévvel: ${korean('N 때문에')} „X miatt”.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-기 때문에', conjugate: word => withPlainStem(word, '기 때문에') },
        { header: 'Múlt: -았기/었기 때문에', conjugate: word => withPast(word, '기 때문에') },
      ],
    },
    examples: [
      [text`그 사람은 성격이 좋${bold('기 때문에')} 친구가 많아요.`, 'Mivel jó a természete, sok barátja van.'],
      [text`어제 늦게 ${bold('잤기 때문에')} 피곤해요.`, 'Mivel tegnap későn feküdtem le, fáradt vagyok.'],
      [
        text`날씨가 덥${bold('기 때문에')} 사람들이 바다에 가요.`,
        'Mivel meleg van, az emberek a tengerhez mennek.',
        '-기 előtt nincs ㅂ-változás: 덥기',
      ],
      [text`비 ${bold('때문에')} 경기가 취소됐어요.`, 'Az eső miatt elmaradt a meccs.'],
    ],
    ownNote: [
      paragraph`Erősebb, írottabb ok-kifejezés, mint a ${korean('-아서/어서')}. Felszólítás, javaslat előtt nem természetes; oda ${korean('-(으)니까')} kell. Mondat végén: ${korean('-기 때문이에요')} „azért, mert…”.`,
    ],
  },
  {
    lesson: 9,
    point: 2,
    form: '-는데요/(으)ㄴ데요 (감탄)',
    name: '„… ám! milyen …!” (rácsodálkozás, csodálat)',
    explanation: [
      paragraph`Mondat végén valamiről ${bold('csodálattal, meglepetéssel, lelkesedéssel')} beszél, gyakran válaszként: „Jaj, de jó!”, „Én is szeretnék!”. Képzése:`,
      list(
        text`${bold('Ige')}, ${bold('있다/없다')}: ${korean('-는데요')} (ㄹ kiesik)`,
        text`${bold('Melléknév')}: 받침 után ${korean('-은데요')}, magánhangzó után ${korean('-ㄴ데요')} (ㄹ kiesik)`,
        text`Főnév: ${korean('-인데요')}`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-는데요/(으)ㄴ데요', conjugate: word => presentModifier(word, '데요') }],
    },
    examples: [
      [text`저도 그런 사람을 만나고 싶${bold('은데요')}!`, 'Én is szeretnék egy ilyen emberrel találkozni!'],
      [text`와, 그 사람 정말 멋있${bold('는데요')}!`, 'Hű, az az ember nagyon menő!'],
      [text`이 옷 정말 예${bold('쁜데요')}!`, 'Nagyon szép ez a ruha!'],
      [text`생각보다 날씨가 ${bold('추운데요')}.`, 'Hidegebb van, mint gondoltam.', 'ㅂ-rendhagyó: 춥다 → 추운데요'],
    ],
    ownNote: [
      paragraph`Ugyanez a forma lehet ${bold('puha ellenvetés')} vagy ${bold('várakozás a válaszra')} is: ${korean('저는 내일 시간이 없는데요')} „Nekem holnap nincs időm… (szóval?)”. A hanglejtés dönti el a jelentést.`,
    ],
  },
  {
    lesson: 10,
    point: 1,
    form: '-는/(으)ㄴ 편이다',
    name: '„inkább …, viszonylag …”',
    explanation: [
      paragraph`Azt fejezi ki, hogy valami ${bold('nagyjából, inkább')} ilyen, ebbe a csoportba tartozik; óvatos, nem túl határozott állítás.`,
      list(
        text`${bold('Ige')}, ${bold('있다/없다')}: ${korean('-는 편이다')} (ㄹ kiesik)`,
        text`${bold('Melléknév')}: 받침 után ${korean('-은 편이다')}, magánhangzó után ${korean('-ㄴ 편이다')} (ㄹ kiesik)`
      ),
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-는/(으)ㄴ 편이에요', conjugate: word => presentModifier(word, ' 편이에요') }],
    },
    examples: [
      [text`산악자전거는 조금 위험${bold('한 편이에요')}.`, 'A hegyi kerékpározás viszonylag veszélyes.'],
      [text`저는 아침을 많이 먹${bold('는 편이에요')}.`, 'Reggelire inkább sokat eszem.'],
      [text`이 동네는 집값이 비${bold('싼 편이에요')}.`, 'Ezen a környéken viszonylag drágák a lakások.'],
      [
        text`한국어 문법이 좀 ${bold('어려운 편이에요')}.`,
        'A koreai nyelvtan viszonylag nehéz.',
        'ㅂ-rendhagyó: 어렵다 → 어려운',
      ],
    ],
    ownNote: [
      paragraph`Igénél gyakran határozószóval: ${korean('자주, 많이, 잘, 일찍')}: ${korean('일찍 일어나는 편이에요')}. Múltbeli jellemzőre: ${korean('-(으)ㄴ 편이었다')}.`,
    ],
  },
  {
    lesson: 10,
    point: 2,
    form: '-게',
    name: '„úgy, hogy …; azért, hogy …” (cél, eredmény)',
    explanation: [
      paragraph`Ige vagy melléknév után a következő cselekvés ${bold('célját vagy kívánt eredményét')} adja meg: „úgy csináld, hogy …”, „azért, hogy …”. A tő végétől függetlenül ${korean('-게')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [{ header: '-게', conjugate: word => withPlainStem(word, '게') }],
    },
    examples: [
      [text`다치지 않${bold('게')} 조심하세요.`, 'Vigyázz, nehogy megsérülj.'],
      [text`뒤에서도 잘 들리${bold('게')} 크게 말해 주세요.`, 'Beszéljen hangosan, hogy hátul is jól halljuk.'],
      [text`감기에 걸리지 않${bold('게')} 따뜻하게 입으세요.`, 'Öltözz fel melegen, hogy ne fázz meg.'],
      [
        text`아이들이 먹기 쉽${bold('게')} 작게 잘랐어요.`,
        'Kicsire vágtam, hogy a gyerekek könnyen meg tudják enni.',
        '-게 előtt nincs ㅂ-változás: 쉽게',
      ],
    ],
    ownNote: [
      paragraph`Melléknévből határozószót is képez: ${korean('맛있게 드세요')} „egyen jóízűen”, ${korean('예쁘게, 크게, 따뜻하게')}. Rokon szerkezetek: ${korean('-게 되다')} (${reference('2B-12-2')}), ${korean('-게 하다')} (${reference('4A-06-2')}).`,
    ],
  },
  {
    lesson: 11,
    point: 1,
    form: '-아/어 (반말)',
    name: 'tegező, közvetlen stílus (반말)',
    explanation: [
      paragraph`A ${korean('-아요/어요')} ${bold('tegező')} (반말) változata: egyszerűen elhagyjuk a ${korean('요')}-t. Fiatalabbaknak, hasonló korú barátoknak, közeli ismerősöknek. Kijelentés, kérdés, felszólítás és javaslat is lehet.`,
      paragraph`Képzése a ${bold('-아/어')} szabály szerint (${korean('가, 먹어, 해')}). Főnév + 이다: 받침 után ${korean('-이야')}, magánhangzó után ${korean('-야')}.`,
    ],
    table: {
      sampleSet: 'verbsAndAdjectives',
      columns: [
        { header: '-아/어', conjugate: informalSpeech },
        { header: 'Múlt: -았어/었어', conjugate: word => withPast(word, '어') },
      ],
    },
    examples: [
      [text`처음에는 모르는 게 많아서 답답${bold('했어')}.`, 'Eleinte sok mindent nem tudtam, frusztráló volt.'],
      [
        text`지금 뭐 ${bold('해')}? – 음악 ${bold('들어')}.`,
        '– Mit csinálsz most? – Zenét hallgatok.',
        'ㄷ-rendhagyó: 듣다 → 들어',
      ],
      [text`오늘 너무 ${bold('더워')}.`, 'Ma nagyon meleg van.', 'ㅂ-rendhagyó: 덥다 → 더워'],
      [text`이거 누구 ${bold('거야')}? – 내 ${bold('거야')}.`, '– Ez kié? – Az enyém.'],
    ],
    ownNote: [
      paragraph`반말-ban a névmások is változnak: ${korean('저 → 나 (제가 → 내가)')}, ${korean('네 → 응')}, ${korean('아니요 → 아니')}, és a ${korean('너')} „te”. Más 반말-végződések: ${korean('-니?, -자')} (${reference('3A-01-1')}), ${korean('-는구나')} (${reference('3B-03-2')}). Idősebbnek vagy ismeretlennek soha!`,
    ],
  },
  {
    lesson: 11,
    point: 2,
    form: '에는, 에서는',
    name: 'időpont / hely kiemelése témaként',
    conjugable: false,
    explanation: [
      paragraph`Az ${korean('에')} / ${korean('에서')} és a ${korean('는')} összetétele: mindkét partikula jelentése megmarad, de az időpontot vagy helyet ${bold('témává teszi, kiemeli')}, gyakran ${bold('szembeállítva')} egy másikkal. Minden főnév után ugyanaz.`,
    ],
    examples: [
      [text`처음${bold('에는')} 모르는 게 많아서 답답했어.`, 'Eleinte (az elején) sok mindent nem tudtam.'],
      [text`주말${bold('에는')} 보통 집에서 쉬어요.`, 'Hétvégén általában otthon pihenek.'],
      [text`한국${bold('에서는')} 생일에 미역국을 먹어요.`, 'Koreában születésnapon mijokgukot esznek.'],
      [
        text`집${bold('에서는')} 한국어를 안 써요. 학교${bold('에서만')} 써요.`,
        'Otthon nem beszélek koreaiul, csak az iskolában.',
      ],
    ],
    ownNote: [
      paragraph`Ugyanígy: ${korean('에도')} „-on/-en is”, ${korean('에서도')} „-ban/-ben is”, ${korean('에서만')} „csak -ban/-ben”, ${korean('에게는')} „neki pedig”.`,
    ],
  },
  {
    lesson: 12,
    point: 1,
    form: '처럼',
    name: '„mint, -ként, olyan, mint …”',
    conjugable: false,
    explanation: [
      paragraph`Főnév után azt fejezi ki, hogy valami ${bold('ugyanolyan vagy hasonló')}, mint az előtte álló főnév. Minden főnév után ugyanaz.`,
    ],
    examples: [
      [text`난 너${bold('처럼')} 카페를 하고 싶어.`, 'Én is kávézót szeretnék nyitni, mint te.'],
      [text`그 사람은 가수${bold('처럼')} 노래를 잘해요.`, 'Úgy énekel, mint egy énekes.'],
      [text`오늘은 여름${bold('처럼')} 더워요.`, 'Ma olyan meleg van, mint nyáron.', 'ㅂ-rendhagyó: 덥다 → 더워요'],
      [text`아이${bold('처럼')} 웃었어요.`, 'Úgy nevetett, mint egy gyerek.'],
    ],
    ownNote: [
      paragraph`A ${reference('3B-09-2', '3B 9. leckében')} tanult ${korean('같이')} majdnem ugyanezt jelenti. Jelzőként: ${korean('N 같은 N')} „X-hez hasonló”: ${korean('너 같은 친구')}.`,
    ],
  },
  {
    lesson: 12,
    point: 2,
    form: '-게 되다',
    name: '„úgy alakult, hogy …; …-vá vált”',
    explanation: [
      paragraph`Ige után azt fejezi ki, hogy egy helyzet vagy állapot ${bold('valamilyen hatásra megváltozott')}, „úgy alakult”, nem (csak) a saját döntésünk miatt. A tő végétől függetlenül ${korean('-게 되다')}; gyakran múltban (${korean('-게 됐어요')}).`,
    ],
    table: {
      sampleSet: 'verbs',
      columns: [
        { header: '-게 됐어요', conjugate: word => withPlainStem(word, '게 됐어요') },
        { header: 'Jövő: -게 될 거예요', conjugate: word => withPlainStem(word, '게 될 거예요') },
      ],
    },
    examples: [
      [
        text`한국 드라마를 보고 한국어를 공부하${bold('게 됐어요')}.`,
        'A koreai sorozatok miatt kezdtem el koreaiul tanulni.',
      ],
      [text`다음 달부터 서울에서 일하${bold('게 됐어요')}.`, 'Úgy alakult, hogy jövő hónaptól Szöulban dolgozom.'],
      [
        text`처음에는 매운 음식을 못 먹었는데 이제 잘 먹${bold('게 됐어요')}.`,
        'Eleinte nem bírtam a csípőset, de mostanra megszoktam.',
      ],
      [
        text`그 가수의 노래를 자주 듣${bold('게 됐어요')}.`,
        'Mostanában gyakran hallgatom annak az énekesnek a dalait (rászoktam).',
        '-게 előtt nincs ㄷ-változás: 듣게',
      ],
    ],
    ownNote: [
      paragraph`Melléknévvel inkább ${korean('-아지다/어지다')} (${reference('3A-09-1')}): ${korean('예뻐졌어요')}. Udvarias közlésben a ${korean('-게 되다')} szerényebb, mint az egyszerű múlt: ${korean('결혼하게 됐습니다')} „Úgy hozta a sors, hogy megházasodom”.`,
    ],
  },
];
export default {
  lessons: {
    1: {
      korean: '이번 주 금요일에 동아리 모임 할래요?',
      hungarian: 'Lenne kedved pénteken klubtalálkozót tartani?',
      pronunciation: '비음화',
      pronunciationHungarian: 'orrhangúsodás',
    },
    2: { korean: '세종학당에서부터 걸어서 10분쯤 걸려요', hungarian: 'A Szedzsong Intézettől gyalog kb. 10 perc.' },
    3: {
      korean: '할머니께서 직접 만드신 목걸이예요',
      hungarian: 'Ezt a nyakláncot a nagymamám készítette.',
      pronunciation: '경음화',
      pronunciationHungarian: 'keményedés ([ㄱ], [ㄷ], [ㅂ] után: 먹고 [먹꼬])',
    },
    4: {
      korean: '세종학당에 오다가 중학교 때 친구를 만났어요',
      hungarian: 'Idefelé jövet összefutottam egy középiskolai barátommal.',
    },
    5: {
      korean: '공연 중에 핸드폰을 사용하지 마세요',
      hungarian: 'Az előadás alatt ne használja a mobilját!',
      pronunciation: '억양 (감탄문)',
      pronunciationHungarian: 'a felkiáltó mondat hanglejtése',
    },
    6: { korean: '여기에서 노트북을 사용해도 돼요?', hungarian: 'Használhatom itt a laptopot?' },
    7: {
      korean: '마리 씨한테서 그 친구 이야기를 들었어요',
      hungarian: 'Maritól hallottam erről a barátról.',
      pronunciation: '끊어 말하기',
      pronunciationHungarian: 'tagolás, szünet',
    },
    8: {
      korean: '어렸을 때는 머리가 길었는데 지금은 짧은 머리가 편해요',
      hungarian: 'Gyerekkoromban hosszú hajam volt, most a rövid kényelmes.',
    },
    9: {
      korean: '저도 그런 사람을 만나고 싶은데요!',
      hungarian: 'Én is szeretnék egy ilyen emberrel találkozni!',
      pronunciation: 'ㅎ 약화',
      pronunciationHungarian: 'a ㅎ gyengülése ㄴ, ㄹ, ㅁ, ㅇ után (결혼)',
    },
    10: { korean: '산악자전거는 조금 위험한 편이에요', hungarian: 'A hegyi kerékpározás viszonylag veszélyes.' },
    11: {
      korean: '처음에는 모르는 게 많아서 답답했어',
      hungarian: 'Eleinte sok mindent nem tudtam, frusztráló volt.',
      pronunciation: '억양 (반말 의문문)',
      pronunciationHungarian: 'a tegező kérdés hanglejtése',
    },
    12: { korean: '난 너처럼 카페를 하고 싶어', hungarian: 'Én is kávézót szeretnék nyitni, mint te.' },
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
