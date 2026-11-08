// The "Alapszabályok" (basic rules) chapter. Its tables are computed by the conjugation engine;
// every Korean cell gets a Hungarian line through the helpers (the lexicon and the table patterns).
import { createWord, formalEnding, modifierForm, withAOrEo, withEu, withPast, withPlainStem, type Word, type WordClass } from '../lib/conjugation';

export interface BasicsHelpers {
  /** Korean form with its Hungarian line, built from a {placeholder} pattern and the lexicon entry of dictionaryForm. */
  translatedCell: (korean: string | null, dictionaryForm: string, pattern: string, where?: string) => string;
  /** Hungarian meaning of a dictionary word as a translation line. */
  wordGloss: (dictionaryForm: string) => string;
  /** A Hungarian translation line. */
  translation: (hungarian: string) => string;
}

export function basicsHtml(helpers: BasicsHelpers): string {
  const korean = (text: string) => `<span class="korean">${text}</span>`;
  const simpleTable = (headers: string[], rows: string[][]) => `<div class="table-wrapper"><table class="plain"><thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const verb = (dictionaryForm: string) => createWord(dictionaryForm, 'verb'), adjective = (dictionaryForm: string) => createWord(dictionaryForm, 'adjective');
  const koreanWithGloss = (dictionaryForm: string) => korean(dictionaryForm) + helpers.wordGloss(dictionaryForm);
  const byWordClass = (word: Word, verbValue: string, adjectiveValue: string) => word.wordClass === 'verb' ? verbValue : adjectiveValue;

  const aOrEoRows = [['가다', 'ㅏ + 아 → ㅏ'], ['서다', 'ㅓ + 어 → ㅓ'], ['보다', 'ㅗ + 아 → ㅘ'], ['주다', 'ㅜ + 어 → ㅝ'], ['마시다', 'ㅣ + 어 → ㅕ'], ['되다', 'ㅚ + 어 → ㅙ'], ['보내다', 'ㅐ + 어 → ㅐ'], ['켜다', 'ㅕ + 어 → ㅕ'], ['쉬다', 'ㅟ + 어 → nincs összevonás'], ['받다', 'ㅏ, 받침 → +아'], ['먹다', 'egyéb, 받침 → +어'], ['공부하다', '하다 → 해']]
    .map(([dictionaryForm, rule]) => [koreanWithGloss(dictionaryForm), rule, helpers.translatedCell(withAOrEo(verb(dictionaryForm), '요'), dictionaryForm, '{presentFirstSingular}'), helpers.translatedCell(withPast(verb(dictionaryForm), '어요'), dictionaryForm, '{pastFirstSingular}')]);

  const rieulStemRows = ['만들다', '살다', '알다'].map(dictionaryForm => { const word = verb(dictionaryForm); return [koreanWithGloss(dictionaryForm), helpers.translatedCell(withAOrEo(word, '요'), dictionaryForm, '{presentFirstSingular}'), helpers.translatedCell(withEu(word, '면'), dictionaryForm, 'ha {presentFirstSingular}'), helpers.translatedCell(withEu(word, '세요'), dictionaryForm, 'Ön {presentThirdSingular} / {imperativeFormal}!'), helpers.translatedCell(withEu(word, '니까'), dictionaryForm, 'mert {presentFirstSingular}, …'), helpers.translatedCell(withPlainStem(word, '는'), dictionaryForm, 'aki {presentThirdSingular}'), helpers.translatedCell(withEu(word, 'ㄴ'), dictionaryForm, 'aki {pastThirdSingular}'), helpers.translatedCell(withEu(word, 'ㄹ 거예요'), dictionaryForm, '{infinitive} fogok'), helpers.translatedCell(formalEnding(word), dictionaryForm, '{presentFirstSingular} (formális)')]; });

  const REGULAR_PAIR_HUNGARIAN: Record<string, string> = { '받다, 닫다, 믿다': 'kap, bezár, hisz', '입다, 잡다, 좁다': 'visel, megfog, szűk', '씻다, 웃다, 벗다': 'mos, nevet, levesz', '좋다, 놓다, 넣다': 'jó, tesz, betesz', '따르다 (→ 따라요)': 'követ, tölt (italt)' };
  const irregularRows = (<[string, string, WordClass, string, string][]>[
    ['ㄷ', '듣다', 'verb', '1A 4. lecke (들어요) – külön szabályként nem', '받다, 닫다, 믿다'],
    ['ㄷ', '걷다', 'verb', '', ''],
    ['ㅂ', '덥다', 'adjective', '1A 8. lecke', '입다, 잡다, 좁다'],
    ['ㅂ', '돕다', 'verb', '1A 8. lecke (돕다 → 도와요 kivétel)', ''],
    ['ㅅ', '짓다', 'verb', '2A 7. lecke', '씻다, 웃다, 벗다'],
    ['ㅅ', '낫다', 'adjective', '', ''],
    ['ㅎ', '그렇다', 'adjective', '2A 10. lecke', '좋다, 놓다, 넣다'],
    ['ㅎ', '하얗다', 'adjective', '', ''],
    ['르', '모르다', 'verb', '1B–2A szókincsében (몰라요) – külön szabályként nem', '따르다 (→ 따라요)'],
    ['르', '다르다', 'adjective', '', ''],
    ['으', '바쁘다', 'adjective', 'a tankönyv példáiban (바빠요) – külön szabályként nem', '–'],
    ['으', '쓰다', 'verb', '', ''],
    ['ㄹ', '만들다', 'verb', 'minden képzési szabálynál (ㄹ-kiesés)', '–'],
  ]).map(([irregularity, dictionaryForm, wordClass, whereTaught, regularPair]) => {
    const word = createWord(dictionaryForm, wordClass);
    return [`<b>${irregularity}</b>`, koreanWithGloss(dictionaryForm), helpers.translatedCell(withAOrEo(word, '요'), dictionaryForm, byWordClass(word, '{presentFirstSingular}', '{base}')), helpers.translatedCell(withPast(word, '어요'), dictionaryForm, byWordClass(word, '{pastFirstSingular}', '{base} volt')), helpers.translatedCell(withEu(word, '면'), dictionaryForm, byWordClass(word, 'ha {presentFirstSingular}', 'ha {base}')), helpers.translatedCell(wordClass === 'verb' ? modifierForm(word, 'past') : modifierForm(word, 'present'), dictionaryForm, byWordClass(word, 'aki {pastThirdSingular}', '{base} …')), helpers.translatedCell(withEu(word, '니까'), dictionaryForm, byWordClass(word, 'mert {presentFirstSingular}, …', 'mert {base}, …')), helpers.translatedCell(withPlainStem(word, '고'), dictionaryForm, byWordClass(word, '{presentFirstSingular} és …', '{base} és …')), helpers.translatedCell(formalEnding(word), dictionaryForm, byWordClass(word, '{presentFirstSingular} (formális)', '{base} (formális)')), whereTaught, regularPair && regularPair !== '–' ? korean(regularPair) + helpers.translation(REGULAR_PAIR_HUNGARIAN[regularPair]) : regularPair];
  });

  const particleRows = [
    ['téma', '은 / 는', '책<b>은</b>', '친구<b>는</b>', '1A 1. lecke', 'a könyv (pedig) …', 'a barát (pedig) …'],
    ['alany', '이 / 가', '책<b>이</b>', '친구<b>가</b>', '1A 2. lecke', 'a könyv … (alany)', 'a barát … (alany)'],
    ['tárgy', '을 / 를', '책<b>을</b>', '친구<b>를</b>', '1A 4. lecke', 'a könyvet', 'a barátot'],
    ['„és” (főnevek)', '과 / 와 · 하고', '책<b>과</b>', '친구<b>와</b>', '1A 5. lecke', 'könyv és …', 'barát és …'],
    ['„vagy”', '이나 / 나', '책<b>이나</b>', '친구<b>나</b>', '2A 2. lecke', 'könyv vagy …', 'barát vagy …'],
    ['irány, eszköz', '으로 / 로 (ㄹ után: 로)', '책<b>으로</b>', '친구<b>로</b> · 지하철<b>로</b>', '1B 5. lecke', 'könyvvel (eszköz)', 'barátként · metróval'],
    ['„-nak hívják”', '이라고 / 라고', '책<b>이라고</b>', '친구<b>라고</b>', '2A 1. lecke', '„könyvnek” hívják', '„barátnak” hívják'],
    ['„az … -vagyok”', '이에요 / 예요', '책<b>이에요</b>', '친구<b>예요</b>', '1A 1. lecke', '(ez egy) könyv', '(ő egy) barát'],
    ['„ő nem …”', '이 아니에요 / 가 아니에요', '책<b>이 아니에요</b>', '친구<b>가 아니에요</b>', '1A 2. lecke', '(ez) nem könyv', '(ő) nem barát'],
  ].map(([role, particle, afterConsonant, afterVowel, taught, consonantHungarian, vowelHungarian]) => [role, korean(particle), korean(afterConsonant) + helpers.translation(consonantHungarian), korean(afterVowel) + helpers.translation(vowelHungarian), taught]);
  const otherParticleRows = [['에', 'hely (van), idő, irány'], ['에서', 'cselekvés helye, „-ból/-ből” (hely)'], ['에게 / 한테', '„-nak/-nek” (személy)'], ['에게서 / 한테서', '„-tól/-től” (személy)'], ['도', '„is”'], ['만', '„csak”'], ['보다', '„-nál/-nél” (összehasonlítás)'], ['까지 · 부터', '„-ig” · „-tól/-től”'], ['마다', '„minden”'], ['처럼 · 같이', '„mint”, „-ként”']]
    .map(([particle, meaning]) => [korean(particle), meaning]);

  const modifierRows = [verb('가다'), verb('먹다'), verb('만들다'), verb('듣다'), adjective('크다'), adjective('작다'), adjective('길다'), adjective('덥다'), createWord('맛있다', 'adjective')].map(word => [koreanWithGloss(word.dictionaryForm), word.wordClass === 'verb' ? 'ige' : 'melléknév',
    word.wordClass === 'verb' ? helpers.translatedCell(modifierForm(word, 'past') + ' 사람', word.dictionaryForm, 'az ember, aki {pastThirdSingular}') : '—',
    helpers.translatedCell(modifierForm(word, 'present') + (word.wordClass === 'verb' ? ' 사람' : ' 것'), word.dictionaryForm, byWordClass(word, 'az ember, aki {presentThirdSingular}', '{base} dolog')),
    helpers.translatedCell(modifierForm(word, 'future') + (word.wordClass === 'verb' ? ' 사람' : ' 것'), word.dictionaryForm, byWordClass(word, 'az ember, aki {infinitive} fog', 'ami {base} lesz'))]);
  modifierRows.push([korean('학생이다') + helpers.translation('diák (valaki)'), 'főnév + 이다', '—', korean('학생인 사람') + helpers.translation('az ember, aki diák'), korean('학생일 때') + helpers.translation('amikor diák (lesz / volt)')]);

  return `
<details class="card">
  <h3>1. Szótő, 받침 és szófajok</h3>
  <p>A szótári alak mindig <b>-다</b> végű (${korean('가다, 먹다, 작다')}). A ragozáshoz a <b>-다</b> elhagyásával kapott <b>szótő</b> kell: ${korean('가다 → 가-')}, ${korean('먹다 → 먹-')}.</p>
  <p>A legtöbb szabály azon múlik, hogy a tő utolsó szótagjának van-e <b>받침</b>-ja (zárómássalhangzója): ${korean('가-')} magánhangzóra végződik, ${korean('먹-')} mássalhangzóra (ㄱ). Külön csoport az <b>ㄹ-tő</b> (${korean('만들-, 살-')}), mert a ㄹ bizonyos végződések előtt kiesik.</p>
  <p><b>Ige</b> (동사): cselekvés, pl. ${korean('가다, 먹다')}. <b>Melléknév</b> (형용사): állapot, tulajdonság, pl. ${korean('작다, 바쁘다')}. A koreai melléknév igeként ragozódik („kicsinek lenni”). A ${korean('있다/없다')} és összetételeik (${korean('맛있다, 재미없다')}) több helyen igeként viselkednek (pl. ${korean('맛있는')}). A <b>${korean('하다')}</b> végű szavak (${korean('공부하다, 피곤하다')}) mindig szabályosan ${korean('해')}-vé változnak.</p>
</details>
<details class="card">
  <h3>2. -아/어 végződések: melyiket és hogyan vonódnak össze</h3>
  <p>Ha a tő utolsó magánhangzója <b>ㅏ vagy ㅗ</b>, akkor <b>-아</b> jön, minden más esetben <b>-어</b>, a <b>하다</b> pedig <b>해</b> lesz. Ugyanez a szabály minden -아/어 kezdetű végződésre (${korean('-아요/어요, -았/었-, -아서/어서, -아도/어도, -아야/어야, -아/어 보다, -아/어 주다')} …). Ha a tő magánhangzóra végződik, a két magánhangzó összevonódik:</p>
  ${simpleTable(['Szó', 'Szabály', '-아요/어요', 'Múlt: -았어요/었어요'], aOrEoRows)}
</details>
<details class="card">
  <h3>3. -(으) végződések: mikor kell a 으</h3>
  <p>Ha egy végződés <b>(으)</b>-val kezdődik (${korean('-(으)면, -(으)세요, -(으)니까, -(으)ㄴ, -(으)ㄹ')} …), akkor <b>mássalhangzós tő után</b> kell a 으 (${korean('먹으면')}), <b>magánhangzós tő után</b> nem kell (${korean('가면')}). Ha a végződés egyetlen ㄴ vagy ㄹ, az a tő utolsó szótagjába olvad: ${korean('가 + ㄴ → 간')}, ${korean('가 + ㄹ → 갈')}.</p>
  <p>Ugyanígy viselkednek a főnevek utáni párok: <b>mássalhangzó után</b> a hosszabb alak (${korean('책이에요, 책을, 책으로')}), <b>magánhangzó után</b> a rövidebb (${korean('친구예요, 친구를, 친구로')}). A partikulák listája a 6. pontban van.</p>
</details>
<details class="card">
  <h3>4. Az ㄹ-tő (ㄹ 탈락)</h3>
  <p>Az ㄹ-re végződő tő ㄹ-je <b>kiesik</b>, ha a végződés <b>ㄴ, ㅂ, ㅅ</b> hanggal kezdődik (${korean('만드는, 만듭니다, 만드세요, 만드니까')}), vagy ha a végződés maga ㄴ/ㄹ (${korean('만든, 만들')}). Ilyenkor <b>nincs 으</b> sem. A ${korean('-(으)면, -(으)러, -(으)려고, -(으)면서')} előtt az ㄹ megmarad, és 으 nélkül kapcsolódik: ${korean('만들면, 만들러')}. A tankönyv ezt minden „형태” résznél külön kiírja.</p>
  ${simpleTable(['Szó', '-아요/어요', '-(으)면', '-(으)세요', '-(으)니까', '-는', '-(으)ㄴ', '-(으)ㄹ 거예요', '-습니다/ㅂ니다'], rieulStemRows)}
</details>
<details class="card">
  <h3>5. A rendhagyó (불규칙) osztályok</h3>
  <p>A rendhagyóság mindig csak <b>magánhangzóval kezdődő végződés előtt</b> (${korean('-아/어, -(으)…')}) jelentkezik. Mássalhangzós végződés előtt (${korean('-고, -지만, -습니다')}) minden szó szabályos. A „Szabályos párja” oszlopban olyan szavak vannak, amelyek ugyanúgy végződnek, mégis szabályosak.</p>
  <ul>
    <li><b>ㄷ</b>: ㄷ → ㄹ magánhangzó előtt: ${korean('듣다 → 들어요, 들으면')}.</li>
    <li><b>ㅂ</b>: ㅂ → 우 (${korean('우 + 어 = 워')}): ${korean('덥다 → 더워요, 더우면, 더운')}. Kivétel: ${korean('돕다, 곱다 → 도와요, 고와요')}.</li>
    <li><b>ㅅ</b>: a ㅅ kiesik, de a 으 megmarad és nincs összevonás: ${korean('짓다 → 지어요, 지으면')}.</li>
    <li><b>ㅎ</b> (csak melléknevek): a ㅎ kiesik; -아/어 előtt a magánhangzó ㅐ (ㅑ után ㅒ): ${korean('그렇다 → 그래요, 그러면, 그런')}; ${korean('하얗다 → 하얘요')}.</li>
    <li><b>르</b>: -아/어 előtt a 르 → ㄹ + 라/러: ${korean('모르다 → 몰라요')}, ${korean('부르다 → 불러요')}.</li>
    <li><b>으</b>: -아/어 előtt a ㅡ kiesik; az előző szótag dönt az 아/어 között: ${korean('바쁘다 → 바빠요')}, ${korean('예쁘다 → 예뻐요')}, egyszótagú: ${korean('쓰다 → 써요')}.</li>
    <li><b>ㄹ</b>: lásd a 4. pontot.</li>
  </ul>
  ${simpleTable(['Osztály', 'Szó', '-아요/어요', 'Múlt', '-(으)면', 'Jelző -(으)ㄴ / -는', '-(으)니까', '-고', '-습니다', 'Hol tanultuk', 'Szabályos párja'], irregularRows)}
  <p style="font-size:.85rem;color:var(--muted)">A tankönyv külön nyelvtani pontként csak az <b>ㅂ</b> (1A 8. lecke), az <b>ㅅ</b> (2A 7. lecke) és az <b>ㅎ</b> (2A 10. lecke) rendhagyóságot tanítja, az ㄹ-kiesést pedig minden képzési szabálynál megemlíti. A <b>ㄷ, 르, 으</b> osztályok a szókincsben és a példákban fordulnak elő (${korean('들어요, 몰라요, 바빠요')}), ezek leírása itt saját kiegészítés.</p>
</details>
<details class="card">
  <h3>6. Partikulák: mássalhangzó vagy magánhangzó után</h3>
  ${simpleTable(['Szerep', 'Mássalhangzó / magánhangzó után', 'pl. 책 (받침)', 'pl. 친구 (nincs 받침)', 'Tanultuk'], particleRows)}
  <p>Változatlan partikulák (bármi után ugyanaz):</p>
  ${simpleTable(['Partikula', 'Jelentés'], otherParticleRows)}
</details>
<details class="card">
  <h3>7. Jelzői alakok (관형형) egy táblázatban</h3>
  <p>Ige: <b>múlt -(으)ㄴ</b>, <b>jelen -는</b>, <b>jövő -(으)ㄹ</b>. Melléknév: <b>jelen -(으)ㄴ</b>. A ${korean('있다/없다')} (és ${korean('맛있다')} stb.) jelen időben <b>-는</b>. Főnév: ${korean('-인')}. Rendhagyó szavaknál a rendhagyóság itt is érvényes (${korean('들은, 더운')}).</p>
  ${simpleTable(['Szó', 'Szófaj', 'Múlt (ige)', 'Jelen', 'Jövő / feltételezés'], modifierRows)}
</details>
<details class="card">
  <h3>8. Beszédszintek, amelyekkel a könyv dolgozik</h3>
  ${simpleTable(['Stílus', 'Kijelentés', 'Kérdés', 'Mikor', 'Tanultuk'], [
    [korean('해요체'), korean('가요 · 먹어요') + helpers.translation('megyek · eszem'), korean('가요? · 먹어요?') + helpers.translation('mész? · eszel?'), 'udvarias, hétköznapi', '1A 4. lecke'],
    [korean('합쇼체 (격식체)'), korean('갑니다 · 먹습니다') + helpers.translation('megyek · eszem (formális)'), korean('갑니까? · 먹습니까?') + helpers.translation('megy? · eszik? (Ön, formális)'), 'hivatalos, formális', '1B 4. lecke'],
    [korean('반말 (해체)'), korean('가 · 먹어') + helpers.translation('megyek · eszem (tegező)'), korean('가? · 먹어? · 가니? · 먹니?') + helpers.translation('mész? · eszel? (tegező)'), 'barátok, fiatalabbak', '2B 11. lecke · 3A 1. lecke'],
    [korean('한다체 (írott)'), korean('간다 · 먹는다 · 작다') + helpers.translation('megy · eszik · kicsi (írott)'), '—', 'újság, jelentés, napló', '3A 12. lecke'],
  ])}
</details>`;
}
