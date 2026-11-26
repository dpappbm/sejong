import type { ColumnTranslation } from './types';

export default {
  // ---------- 1A ----------
  '1A-1-1': [{ noun: '(ez / ő) {base}' }, { noun: '(ez / ő) {base}?' }],
  '1A-1-2': [{ noun: '{definite} (pedig) …' }],
  '1A-2-1': [{ noun: '{definite} … (alany)' }],
  '1A-2-2': [{ noun: '(ez / ő) nem {base}' }],
  '1A-4-1': [{ verb: '{presentFirstSingular}', adjective: '{base}', existential: '{base}' }],
  '1A-4-2': [{ noun: '{accusative} …' }],
  '1A-5-2': [{ noun: '{base} és …' }, { noun: '{base} és …' }],
  '1A-6-2': [{ verb: '{imperativeFormal}!' }],
  '1A-8-1': [{ verb: 'nem {presentFirstSingular}', adjective: 'nem {base}' }],
  '1A-8-2': [
    { verb: '{presentFirstSingular}', adjective: '{base}' },
    { verb: '{pastFirstSingular}', adjective: '{base} volt' },
    { verb: '{pastParticiple} …', adjective: '{base} …' },
    { verb: '{presentFirstSingular} és …', adjective: '{base} és …' },
  ],
  '1A-9-2': [{ verb: '{pastFirstSingular}', adjective: '{base} volt', existential: '{past}' }],
  '1A-10-1': [{ verb: '{infinitive} szeretnék' }, { verb: '{infinitive} szeretne' }],
  '1A-10-2': [{ verb: '{subjunctiveFirstPlural}?' }],

  // ---------- 1B ----------
  '1B-1-2': [{ verb: 'nem tudok {infinitive}' }],
  '1B-2-1': [{ verb: 'megyek {infinitive}' }],
  '1B-3-1': [{ verb: '{presentFirstSingular}, ezért …', adjective: '{base}, ezért …', existential: '{base}, ezért …' }],
  '1B-3-2': [{ verb: '{infinitive} fogok' }, { verb: '{infinitive} fogsz?' }],
  '1B-4-1': [{ adjective: '{base} …' }],
  '1B-4-2': [
    { verb: '{presentFirstSingular} (formális)', adjective: '{base} (formális)', existential: '{base} (formális)' },
    { verb: '{presentThirdSingular}? (formális)', adjective: '{base}? (formális)', existential: '{base}? (formális)' },
  ],
  '1B-5-2': [{ noun: '{roMeaning}' }],
  '1B-6-2': [{ verb: '{subjunctiveFirstPlural} együtt!' }],
  '1B-7-1': [{ verb: '{infinitive} akarok' }, { verb: '{infinitive} akartam' }],
  '1B-7-2': [{ verb: '{presentFirstSingular} és …', adjective: '{base} és …', existential: '{base} és …' }],
  '1B-8-1': [{ verb: '{afterClause}, …' }],
  '1B-9-1': [
    { verb: '{presentFirstSingular}, de …', adjective: '{base}, de …', existential: '{base}, de …' },
    { verb: '{pastFirstSingular}, de …', adjective: '{base} volt, de …', existential: '{past}, de …' },
  ],
  '1B-9-2': [
    { verb: '{infinitive} kell', adjective: 'kell, hogy {base} legyen', existential: 'kell, hogy {subjunctive}' },
  ],
  '1B-10-1': [{ verb: '{beforeClause}, …' }],
  '1B-10-2': [{ verb: '{presentFirstSingular}, és (aztán) …' }],
  '1B-11-1': [{ verb: 'tudok {infinitive}' }, { verb: 'nem tudok {infinitive}' }],
  '1B-11-2': [{ verb: 'éppen {presentFirstSingular}' }, { verb: 'éppen {pastFirstSingular}' }],
  '1B-12-2': [
    { verb: 'mert {presentFirstSingular}, …', adjective: 'mert {base}, …', existential: 'mert {base}, …' },
    { verb: 'mert {pastFirstSingular}, …', adjective: 'mert {base} volt, …', existential: 'mert {past}, …' },
  ],

  // ---------- 2A ----------
  '2A-1-1': [{ noun: '{dative} hívják' }],
  '2A-1-2': [{ verb: 'az ember, aki {presentThirdSingular}' }],
  '2A-2-1': [{ verb: '{presentFirstSingular} vagy …', adjective: '{base} vagy …', existential: '{base} vagy …' }],
  '2A-2-2': [
    { verb: 'vajon {presentThirdSingular}?', adjective: 'vajon {base}?', existential: 'vajon {base}?' },
    { verb: 'vajon {pastThirdSingular}?', adjective: 'vajon {base} volt?', existential: 'vajon {past}?' },
  ],
  '2A-3-2': [
    { verb: 'amikor {presentFirstSingular}', adjective: 'amikor {base}', existential: 'amikor {base}' },
    { verb: 'amikor {pastFirstSingular}', adjective: 'amikor {base} volt', existential: 'amikor {past}' },
  ],
  '2A-4-1': [{ verb: 'elhatároztam, hogy {presentFirstSingular}' }],
  '2A-5-1': [{ verb: 'jó (itt) {infinitive}' }],
  '2A-5-2': [{ verb: 'nem {presentFirstSingular}', adjective: 'nem {base}' }, { verb: 'nem tudok {infinitive}' }],
  '2A-6-1': [{ verb: 'miközben {presentFirstSingular}, …' }],
  '2A-6-2': [
    { verb: '{presentThirdSingular}, ugye?', adjective: '{base}, ugye?', existential: '{base}, ugye?' },
    { verb: '{pastThirdSingular}, ugye?', adjective: '{base} volt, ugye?', existential: '{past}, ugye?' },
  ],
  '2A-7-1': [{ verb: 'ha {presentFirstSingular}', adjective: 'ha {base}', existential: 'ha {base}' }],
  '2A-7-2': [
    { verb: '{presentFirstSingular}', adjective: '{base}' },
    { verb: '{pastFirstSingular}', adjective: '{base} volt' },
    { verb: 'ha {presentFirstSingular}', adjective: 'ha {base}' },
    { verb: '{presentFirstSingular} és …', adjective: '{base} és …' },
  ],
  '2A-8-1': [
    { verb: '{presentFirstSingular}, és …', adjective: '{base}, és …', existential: '{base}, és …' },
    { verb: '{pastFirstSingular}, és …', adjective: '{base} volt, és …', existential: '{past}, és …' },
  ],
  '2A-8-2': [{ verb: 'próbáljon meg {infinitive}' }],
  '2A-9-1': [
    { verb: 'úgy tűnik, {pastThirdSingular}' },
    { verb: 'úgy tűnik, {presentThirdSingular}', adjective: 'úgy tűnik, {base}', existential: 'úgy tűnik, {base}' },
    { verb: 'úgy tűnik, {infinitive} fog', adjective: 'úgy tűnik, {base} lesz', existential: 'úgy tűnik, {future}' },
  ],
  '2A-9-2': [{ verb: 'nem kéne {infinitive}?' }],
  '2A-10-1': [
    { verb: '{presentFirstSingular}', adjective: '{base}' },
    { verb: '{pastFirstSingular}', adjective: '{base} volt' },
    { verb: '{pastParticiple} …', adjective: '{base} …' },
    { verb: 'ha {presentFirstSingular}', adjective: 'ha {base}' },
    { verb: '{presentFirstSingular} és …', adjective: '{base} és …' },
  ],
  '2A-10-2': [
    {
      verb: 'jó lenne, ha {conditionalFirstSingular}',
      adjective: 'jó lenne, ha {base} lenne',
      existential: 'jó lenne, ha {conditional}',
    },
  ],
  '2A-11-1': [{ verb: '{pastFirstSingular} már (valaha)' }, { verb: 'még sosem {pastFirstSingular}' }],
  '2A-12-1': [{ verb: 'már próbáltam {infinitive}' }, { verb: 'próbáltál már {infinitive}?' }],
  '2A-12-2': [{ verb: '(az,) {relativePronoun} {pastFirstSingular}' }],

  // ---------- 2B ----------
  '2B-1-1': [{ verb: 'van kedved {infinitive}?' }],
  '2B-1-2': [{ verb: 'majd én {presentFirstSingular}' }],
  '2B-2-2': [{ verb: '(az,) {relativePronoun} {infinitive} fogok' }],
  '2B-3-1': [
    {
      verb: '{presentThirdSingular} (tiszteleti)',
      adjective: '{base} (tiszteleti)',
      existential: '{base} (tiszteleti)',
    },
    {
      verb: '{pastThirdSingular} (tiszteleti)',
      adjective: '{base} volt (tiszteleti)',
      existential: '{past} (tiszteleti)',
    },
    {
      verb: '{presentThirdSingular} (tiszteleti, formális)',
      adjective: '{base} (tiszteleti, formális)',
      existential: '{base} (tiszteleti, formális)',
    },
  ],
  '2B-4-1': [{ verb: 'éppen {presentFirstSingular}, amikor …' }],
  '2B-4-2': [
    { verb: 'kérem, {imperativeFormal} a kedvemért' },
    { verb: 'szívesen {presentFirstSingular} a kedvedért' },
  ],
  '2B-5-1': [
    { verb: 'nahát, {presentThirdSingular}!', adjective: 'de {base}!', existential: 'nahát, {base}!' },
    { verb: 'nahát, {pastThirdSingular}!', adjective: 'nahát, {base} volt!', existential: 'nahát, {past}!' },
  ],
  '2B-5-2': [{ verb: 'ne {imperativeFormal}!' }, { verb: 'ne {imperativeInformal}!' }],
  '2B-6-1': [{ verb: 'szabad {infinitive}(?)' }],
  '2B-6-2': [{ verb: 'nem szabad {infinitive}' }],
  '2B-7-2': [{ verb: 'amikor {pastFirstSingular}, kiderült, hogy …' }],
  '2B-8-1': [
    { verb: '{presentFirstSingular}, de …', adjective: '{base}, de …', existential: '{base}, de …' },
    { verb: '{pastFirstSingular}, de …', adjective: '{base} volt, de …', existential: '{past}, de …' },
  ],
  '2B-9-1': [
    { verb: 'mivel {presentFirstSingular}, …', adjective: 'mivel {base}, …', existential: 'mivel {base}, …' },
    { verb: 'mivel {pastFirstSingular}, …', adjective: 'mivel {base} volt, …', existential: 'mivel {past}, …' },
  ],
  '2B-9-2': [{ verb: '{presentThirdSingular} ám!', adjective: 'de {base}!', existential: '{base} ám!' }],
  '2B-10-1': [
    { verb: 'hajlamos vagyok {infinitive}', adjective: 'viszonylag {base}', existential: 'általában {base}' },
  ],
  '2B-10-2': [{ verb: 'hogy {imperativeFormal}', adjective: 'hogy {base} legyen', existential: 'hogy {subjunctive}' }],
  '2B-11-1': [
    { verb: '{presentFirstSingular}', adjective: '{base}', existential: '{base}' },
    { verb: '{pastFirstSingular}', adjective: '{base} volt', existential: '{past}' },
  ],
  '2B-12-2': [
    { verb: 'úgy alakult, hogy {presentFirstSingular}' },
    { verb: 'úgy fog alakulni, hogy {presentFirstSingular}' },
  ],

  // ---------- 3A ----------
  '3A-1-1': [
    { verb: '{presentSecondSingular}?', adjective: '{base}?', existential: '{base}?' },
    { verb: '{pastSecondSingular}?', adjective: '{base} volt?', existential: '{past}?' },
    { verb: '{subjunctiveFirstPlural}!' },
  ],
  '3A-1-2': [{ adjective: 'úgy tűnik, {base}' }],
  '3A-2-1': [
    { verb: 'azt mondja, {presentThirdSingular}', adjective: 'azt mondja, {base}', existential: 'azt mondja, {base}' },
    {
      verb: 'azt mondja, {pastThirdSingular}',
      adjective: 'azt mondja, {base} volt',
      existential: 'azt mondja, {past}',
    },
    { verb: 'azt mondja, {infinitive} fog', adjective: 'azt mondja, {base} lesz', existential: 'azt mondja, {future}' },
  ],
  '3A-2-2': [
    {
      verb: 'úgy látszik, {presentThirdSingular}',
      adjective: 'úgy látszik, {base}',
      existential: 'úgy látszik, {base}',
    },
    {
      verb: 'úgy látszik, {pastThirdSingular}',
      adjective: 'úgy látszik, {base} volt',
      existential: 'úgy látszik, {past}',
    },
  ],
  '3A-3-1': [{ verb: 'arra gondoltam, hogy talán {presentFirstSingular}' }],
  '3A-3-2': [
    {
      verb: 'feltéve, hogy nem {presentFirstSingular}',
      adjective: 'feltéve, hogy nem {base}',
      existential: 'feltéve, hogy {negation}',
    },
  ],
  '3A-4-1': [{ verb: '{afterClause}, (utána) …' }],
  '3A-4-2': [{ verb: 'majd én {presentFirstSingular}, (te pedig) …' }],
  '3A-5-1': [{ verb: 'amikor {pastFirstSingular}, rájöttem, hogy …' }],
  '3A-5-2': [{ verb: 'ha {infinitive} akarsz, …' }],
  '3A-6-1': [
    { verb: 'hiszen {presentThirdSingular}', adjective: 'hiszen {base}', existential: 'hiszen {base}' },
    { verb: 'hiszen {pastThirdSingular}', adjective: 'hiszen {base} volt', existential: 'hiszen {past}' },
  ],
  '3A-6-2': [{ verb: '{infinitive} akartam, de …' }],
  '3A-7-1': [{ verb: '1 éve, hogy {pastFirstSingular}' }],
  '3A-7-2': [
    { verb: 'azt javasolta, hogy {subjunctiveFirstPlural}' },
    { verb: 'azt javasolta, hogy ne {subjunctiveFirstPlural}' },
  ],
  '3A-8-1': [{ verb: 'azért, hogy {subjunctiveFirstSingular}' }],
  '3A-8-2': [{ verb: 'mindenképp {infinitive} fogok!' }],
  '3A-9-1': [{ adjective: 'egyre {comparative} lesz' }, { adjective: 'egyre {comparative} lett' }],
  '3A-9-2': [
    { verb: '{verbalNoun} helyett', adjective: '{base}, de cserébe …', existential: '{base}, de cserébe …' },
    { verb: '{pastFirstSingular}, cserébe …' },
  ],
  '3A-10-1': [{ verb: 'kérem, {imperativeFormal}' }, { verb: 'igyekszem {infinitive}' }],
  '3A-10-2': [
    {
      verb: 'csak ha {presentFirstSingular}, (akkor) …',
      adjective: 'csak ha {base}, (akkor) …',
      existential: 'csak ha {base}, (akkor) …',
    },
  ],
  '3A-11-1': [
    { verb: 'ha sokat {presentFirstSingular}, (idővel) …' },
    { verb: 'ahogy sokat {pastFirstSingular}, (rájöttem) …' },
  ],
  '3A-11-2': [
    {
      verb: 'azt tapasztaltam, hogy {presentThirdSingular}',
      adjective: 'azt tapasztaltam, hogy {base}',
      existential: 'azt tapasztaltam, hogy {base}',
    },
    {
      verb: 'azt vettem észre, hogy (már) {pastThirdSingular}',
      adjective: 'azt vettem észre, hogy {base} volt',
      existential: 'azt vettem észre, hogy {past}',
    },
  ],
  '3A-12-1': [
    {
      verb: '{presentFirstSingular} (írott stílus)',
      adjective: '{base} (írott stílus)',
      existential: '{base} (írott stílus)',
    },
    { verb: '{pastFirstSingular}', adjective: '{base} volt', existential: '{past}' },
    { verb: '{infinitive} fogok', adjective: '{base} lesz', existential: '{future}' },
  ],
  '3A-12-2': [
    { verb: 'azt mondta, hogy {subjunctiveFirstSingular}' },
    { verb: 'azt mondta, hogy ne {subjunctiveFirstSingular}' },
    { verb: 'megkért, hogy {subjunctiveFirstSingular} (a kedvéért)' },
  ],

  // ---------- 3B ----------
  '3B-1-1': [
    { verb: 'még ha {presentFirstSingular} is', adjective: 'még ha {base} is', existential: 'még ha {base} is' },
  ],
  '3B-1-2': [
    { verb: '{presentFirstSingular} a kedvéért (tiszteleti)' },
    { verb: '{pastFirstSingular} a kedvéért (tiszteleti)' },
  ],
  '3B-2-1': [
    {
      verb: 'attól tartva, hogy {infinitive} fog',
      adjective: 'attól tartva, hogy {base} lesz',
      existential: 'attól tartva, hogy {future}',
    },
    {
      verb: 'attól tartva, hogy {pastThirdSingular}',
      adjective: 'attól tartva, hogy {base} volt',
      existential: 'attól tartva, hogy {past}',
    },
  ],
  '3B-2-2': [
    {
      verb: 'biztos {presentThirdSingular}, (úgyhogy) …',
      adjective: 'biztos {base}, (úgyhogy) …',
      existential: 'biztos {base}, (úgyhogy) …',
    },
    { verb: 'biztos {pastThirdSingular}, …', adjective: 'biztos {base} volt, …', existential: 'biztos {past}, …' },
  ],
  '3B-3-1': [
    { verb: 'ugyanis {presentFirstSingular}', adjective: 'ugyanis {base}', existential: 'ugyanis {base}' },
    { verb: 'ugyanis {pastFirstSingular}', adjective: 'ugyanis {base} volt', existential: 'ugyanis {past}' },
  ],
  '3B-3-2': [
    { verb: 'á, szóval {presentSecondSingular}!', adjective: 'ó, de {base}!', existential: 'á, szóval {base}!' },
    { verb: 'á, szóval {pastSecondSingular}!', adjective: 'á, {base} volt!', existential: 'á, szóval {past}!' },
  ],
  '3B-4-1': [{ verb: 'előre {perfectiveFirstSingular}' }, { verb: 'előre {subjunctiveFirstPlural}!' }],
  '3B-4-2': [{ verb: '{afterClause}, …' }],
  '3B-5-1': [{ verb: 'amint {pastFirstSingular}, …' }],
  '3B-5-2': [{ verb: '{perfectiveFirstSingular} (teljesen, végleg)' }],
  '3B-6-1': [
    {
      verb: 'régen {pastFirstSingular} (de már nem)',
      adjective: 'régen {base} volt (de már nem)',
      existential: 'régen {past} (de már más a helyzet)',
    },
  ],
  '3B-6-2': [{ verb: 'bárcsak {pastFirstSingular} volna' }, { verb: 'kár, hogy {pastFirstSingular}' }],
  '3B-7-1': [
    { verb: '{presentFirstSingular}, és ezért …', adjective: '{base}, ezért …', existential: '{base}, ezért …' },
  ],
  '3B-7-2': [
    {
      verb: 'például {presentFirstSingular}, vagy …',
      adjective: 'például {base}, vagy …',
      existential: 'például {base}, vagy …',
    },
  ],
  '3B-8-1': [{ verb: 'mivel épp {pastFirstSingular}, (nem tudtam) …' }],
  '3B-8-2': [
    {
      verb: 'ugyan, dehogy {presentFirstSingular}!',
      adjective: 'ugyan, dehogy {base}!',
      existential: 'ugyan, dehogy {base}!',
    },
  ],
  '3B-9-1': [
    { verb: 'úgy tűnik, {presentThirdSingular}', adjective: 'úgy tűnik, {base}', existential: 'úgy tűnik, {base}' },
    { verb: 'úgy tűnik, {pastThirdSingular}' },
  ],
  '3B-10-1': [
    {
      verb: '{presentThirdSingular} ám (láttam)!',
      adjective: '{base} volt ám (láttam)!',
      existential: '{past} ám (láttam)!',
    },
    { verb: '{pastThirdSingular} ám (láttam)!', adjective: '{base} volt ám!', existential: '{past} ám!' },
  ],
  '3B-10-2': [{ verb: 'amikor {pastFirstSingular}, (erre) …' }],
  '3B-11-1': [{ verb: 'folyamatosan {presentFirstSingular}' }],
  '3B-11-2': [{ verb: 'előre {imperativeFormal}' }, { verb: 'jó előre {infinitive}' }],
  '3B-12-1': [
    { verb: '{presentFirstSingular}, az igaz', adjective: '{base}, az igaz', existential: '{base}, az igaz' },
    {
      verb: '{presentFirstSingular}, az igaz, de …',
      adjective: '{base}, az igaz, de …',
      existential: '{base}, az igaz, de …',
    },
  ],
  '3B-12-2': [{ verb: 'épp {presentFirstSingular}' }],

  // ---------- 4A ----------
  '4A-1-1': [
    {
      verb: 'ha (netán) {conditionalFirstSingular}',
      adjective: 'ha (netán) {base} lenne',
      existential: 'ha (netán) {conditional}',
    },
    { verb: 'ha {pastFirstSingular} volna', adjective: 'ha {base} lett volna', existential: 'ha {pastConditional}' },
  ],
  '4A-1-2': [
    {
      verb: 'bárcsak {conditionalFirstSingular}',
      adjective: 'bárcsak {base} lenne',
      existential: 'bárcsak {conditional}',
    },
    {
      verb: 'jó lenne, ha {conditionalFirstSingular}',
      adjective: 'jó lenne, ha {base} lenne',
      existential: 'jó lenne, ha {conditional}',
    },
  ],
  '4A-2-1': [{ verb: 'érdemes {infinitive}' }, { verb: '(az,) {relativePronoun} érdemes {infinitive}' }],
  '4A-2-2': [
    {
      verb: '{presentThirdSingular} (láttam), és …',
      adjective: '{base} volt (láttam), és …',
      existential: '{past} (láttam), és …',
    },
    { verb: '{pastThirdSingular} (láttam), és …', adjective: '{base} volt, és …', existential: '{past}, és …' },
  ],
  '4A-3-1': [
    {
      verb: 'azt mondják, {presentThirdSingular}',
      adjective: 'azt mondják, {base}',
      existential: 'azt mondják, {base}',
    },
    {
      verb: 'azt mondják, {pastThirdSingular}',
      adjective: 'azt mondják, {base} volt',
      existential: 'azt mondják, {past}',
    },
  ],
  '4A-3-2': [
    { verb: 'azt kérdezi, {presentFirstSingular}-e' },
    { verb: 'azt mondja, {subjunctiveFirstSingular}' },
    { verb: 'azt javasolja, {subjunctiveFirstPlural}' },
  ],
  '4A-4-1': [{ noun: '{definite} miatt' }, { noun: '{definite} okozta kár' }],
  '4A-4-2': [
    { verb: 'ahogy {presentThirdSingular}, (úgy) …', adjective: 'mivel {base}, …', existential: 'mivel {base}, …' },
  ],
  '4A-5-1': [
    {
      verb: 'hogy {presentFirstSingular}-e? Hát …',
      adjective: 'hogy {base}-e? Hát …',
      existential: 'hogy {base}-e? Hát …',
    },
    {
      verb: 'hogy {pastFirstSingular}-e? Hát …',
      adjective: 'hogy {base} volt-e? Hát …',
      existential: 'hogy {past}-e? Hát …',
    },
  ],
  '4A-5-2': [{ verb: 'könnyű {infinitive}' }, { verb: 'nehéz {infinitive}' }, { verb: 'kényelmes {infinitive}' }],
  '4A-6-1': [
    {
      verb: 'nemcsak {presentFirstSingular}, hanem …',
      adjective: 'nemcsak {base}, hanem …',
      existential: 'nemcsak {base}, hanem …',
    },
  ],
  '4A-6-2': [
    {
      verb: 'ráveszem, hogy {imperativeFormal}',
      adjective: 'elérem, hogy {base} legyen',
      existential: 'elérem, hogy {subjunctive}',
    },
    {
      verb: 'rávettem, hogy {imperativeFormal}',
      adjective: 'elértem, hogy {base} legyen',
      existential: 'elértem, hogy {subjunctive}',
    },
  ],
  '4A-7-1': [{ verb: 'majdnem {pastFirstSingular}' }],
  '4A-8-1': [
    {
      verb: 'mintha {conditionalThirdSingular}',
      adjective: 'mintha {base} lenne',
      existential: 'mintha {conditional}',
    },
    { verb: 'mintha {pastThirdSingular} volna' },
    { verb: 'mintha {infinitive} akarna', adjective: 'mintha {base} lenne', existential: 'mintha {conditional}' },
  ],
  '4A-9-1': [
    { verb: 'hát nem {presentThirdSingular}?', adjective: 'hát nem {base}?', existential: 'ugye {base}?' },
    { verb: 'hát nem {pastThirdSingular}?', adjective: 'hát nem {base} volt?', existential: 'ugye {past}?' },
  ],
  '4A-9-2': [
    {
      verb: 'de még mennyire {presentThirdSingular}!',
      adjective: 'de még mennyire {base}!',
      existential: 'de még mennyire {base}!',
    },
    {
      verb: 'de még mennyire {pastThirdSingular}!',
      adjective: 'de még mennyire {base} volt!',
      existential: 'de még mennyire {past}!',
    },
  ],
  '4A-10-1': [
    {
      verb: '{presentThirdSingular} (láttam), aztán …',
      adjective: '(korábban) {base} volt, de most …',
      existential: '(korábban) {past}, de most …',
    },
  ],
  '4A-10-2': [
    {
      verb: 'arról van szó, hogy {presentThirdSingular}',
      adjective: 'arról van szó, hogy {base}',
      existential: 'arról van szó, hogy {base}',
    },
    { verb: 'arról van szó, hogy {pastThirdSingular}' },
  ],
  '4A-11-1': [{ noun: '{essive}' }],
  '4A-12-1': [
    {
      verb: '{presentThirdSingular}, és … (írott)',
      adjective: '{base}, és … (írott)',
      existential: '{base}, és … (írott)',
    },
  ],
  '4A-12-2': [{ verb: '{infinitive} kívánok' }],

  // ---------- 4B ----------
  '4B-1-1': [
    { verb: '{presentThirdSingular}, ráadásul …', adjective: '{base}, ráadásul …', existential: '{base}, ráadásul …' },
    { verb: '{pastThirdSingular}, ráadásul …' },
  ],
  '4B-1-2': [
    {
      verb: 'akár {presentFirstSingular}, akár …',
      adjective: 'akár {base}, akár …',
      existential: 'akár {base}, akár …',
    },
  ],
  '4B-2-1': [
    { verb: 'azt hittem, {presentThirdSingular}', adjective: 'azt hittem, {base}', existential: 'azt hittem, {base}' },
    { verb: 'azt hittem, {pastThirdSingular}' },
    { verb: 'azt hittem, {infinitive} fog', adjective: 'azt hittem, {base} lesz', existential: 'azt hittem, {future}' },
  ],
  '4B-2-2': [
    {
      verb: '(az,) {relativePronoun} régen {pastFirstSingular}',
      adjective: '(az,) ami régen {base} volt',
      existential: '(az,) ami régen {past}',
    },
    {
      verb: '(az,) {relativePronoun} {pastFirstSingular}',
      adjective: '(az,) ami {base} volt',
      existential: '(az,) ami {past}',
    },
  ],
  '4B-3-1': [{ verb: '{subjunctiveFirstSingular}? (vagy …)' }],
  '4B-3-2': [{ verb: 'miért nem {presentSecondSingular}?' }, { verb: 'miért nem {pastSecondSingular}?' }],
  '4B-4-1': [
    { verb: '{personalInfinitiveFirstSingular} kellett volna' },
    { verb: 'nem kellett volna {personalInfinitiveFirstSingular}' },
  ],
  '4B-4-2': [
    {
      verb: 'biztos {pastThirdSingular}, (pedig) …',
      adjective: 'biztos {base} volt, (pedig) …',
      existential: 'biztos {past}, (pedig) …',
    },
  ],
  '4B-5-2': [{ verb: '{infinitive} kell!' }, { verb: 'hát persze, hogy {infinitive} kell' }],
  '4B-6-1': [
    {
      verb: 'tudod, hogy {presentThirdSingular}-e?',
      adjective: 'tudod, hogy {base}-e?',
      existential: 'tudod, hogy {base}-e?',
    },
    {
      verb: 'nem tudom, {pastThirdSingular}-e',
      adjective: 'nem tudom, {base} volt-e',
      existential: 'nem tudom, {past}-e',
    },
    {
      verb: 'nem tudom, {infinitive} fog-e',
      adjective: 'nem tudom, {base} lesz-e',
      existential: 'nem tudom, {future}-e',
    },
  ],
  '4B-6-2': [
    {
      verb: 'úgy hallottam, {presentSecondSingular}, igaz?',
      adjective: 'úgy hallottam, {base}, igaz?',
      existential: 'úgy hallottam, {base}, igaz?',
    },
    {
      verb: 'úgy hallottam, {pastSecondSingular}, igaz?',
      adjective: 'úgy hallottam, {base} volt, igaz?',
      existential: 'úgy hallottam, {past}, igaz?',
    },
  ],
  '4B-7-1': [{ verb: 'ahhoz, hogy {subjunctiveFirstSingular}' }],
  '4B-7-2': [{ verb: 'ahogy sokat {pastFirstSingular}, …' }],
  '4B-8-1': [
    { verb: 'abban, hogy {presentThirdSingular}', adjective: 'abban, hogy {base}', existential: 'abban, hogy {base}' },
    {
      verb: 'abban, hogy {pastThirdSingular}',
      adjective: 'abban, hogy {base} volt',
      existential: 'abban, hogy {past}',
    },
  ],
  '4B-8-2': [{ verb: 'annak eredményeként, hogy {pastFirstSingular}' }],
  '4B-9-1': [
    { verb: 'minél többet {presentFirstSingular}, annál …', adjective: 'minél {comparative}, annál …' },
    { verb: 'minél többet {presentFirstSingular}, annál …', adjective: 'minél {comparative}, annál …' },
  ],
  '4B-9-2': [
    { verb: '{presentFirstSingular}, azonban …', adjective: '{base}, azonban …', existential: '{base}, azonban …' },
    { verb: '{pastFirstSingular}, azonban …', adjective: '{base} volt, azonban …', existential: '{past}, azonban …' },
  ],
  '4B-10-1': [
    {
      verb: 'úgy gondolom, {presentThirdSingular}',
      adjective: 'úgy gondolom, {base}',
      existential: 'úgy gondolom, {base}',
    },
  ],
  '4B-10-2': [
    {
      verb: 'nem lehet, hogy {presentThirdSingular}?',
      adjective: 'nem lehet, hogy {base}?',
      existential: 'nem lehet, hogy {base}?',
    },
    { verb: 'nem lehet, hogy {pastThirdSingular}?' },
  ],
  '4B-11-1': [
    {
      verb: 'azt hiszem, talán {presentThirdSingular}',
      adjective: 'azt hiszem, talán {base}',
      existential: 'azt hiszem, talán {base}',
    },
    {
      verb: 'azt hiszem, talán {pastThirdSingular}',
      adjective: 'azt hiszem, talán {base} volt',
      existential: 'azt hiszem, talán {past}',
    },
  ],
  '4B-11-2': [{ verb: '{verbalNoun} helyett inkább …' }],
  '4B-12-1': [
    {
      verb: 'hogy {presentThirdSingular}! (el sem hiszem)',
      adjective: 'hogy {base}! (el sem hiszem)',
      existential: 'hogy {base}! (el sem hiszem)',
    },
    { verb: 'hogy {pastThirdSingular}!', adjective: 'hogy {base} volt!', existential: 'hogy {past}!' },
  ],
  '4B-12-2': [
    {
      verb: 'remélem, hogy {presentThirdSingular}',
      adjective: 'remélem, hogy {base}',
      existential: 'remélem, hogy {base}',
    },
    {
      verb: 'reméljük, hogy {presentThirdSingular} (formális)',
      adjective: 'reméljük, hogy {base} (formális)',
      existential: 'reméljük, hogy {base} (formális)',
    },
  ],
} satisfies Record<string, ColumnTranslation[]>;
