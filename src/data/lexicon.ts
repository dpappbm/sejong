import type { AdjectiveEntry, NounEntry, VerbEntry } from './types';

const VERB_FORM_FIELDS = [
  'infinitive',
  'personalInfinitiveFirstSingular',
  'presentFirstSingular',
  'presentSecondSingular',
  'presentThirdSingular',
  'pastFirstSingular',
  'pastSecondSingular',
  'pastThirdSingular',
  'imperativeInformal',
  'imperativeFormal',
  'subjunctiveFirstSingular',
  'subjunctiveFirstPlural',
  'conditionalFirstSingular',
  'conditionalThirdSingular',
  'verbalNoun',
  'relativePronoun',
  'pastParticiple',
];
// Hungarian dictionary for the conjugation tables: meanings and inflected Hungarian forms.
// A verb is given as one |-separated string in the order of VERB_FORM_FIELDS, e.g. írni|írnom|írok|írsz|ír|…
function createVerb(hungarian: string, forms: string, extra: Partial<VerbEntry> = {}): VerbEntry {
  const values = forms.split('|');
  if (values.length !== VERB_FORM_FIELDS.length) throw new Error(`lexicon: ${hungarian} has ${values.length} fields`);
  const entry = Object.fromEntries(VERB_FORM_FIELDS.map((field, index) => [field, values[index]]));
  return { wordClass: 'verb', hungarian, ...entry, ...extra } as VerbEntry;
}
const createAdjective = (hungarian: string, base: string, comparative: string): AdjectiveEntry => ({
  wordClass: 'adjective',
  hungarian,
  base,
  comparative,
});

export const words: Record<string, VerbEntry | AdjectiveEntry> = {
  '가다': createVerb(
    'megy',
    'menni|mennem|megyek|mész|megy|mentem|mentél|ment|menj|menjen|menjek|menjünk|mennék|menne|menés|ahová|ment',
    { perfectiveFirstSingular: 'elmentem' }
  ),
  '먹다': createVerb(
    'eszik',
    'enni|ennem|eszem|eszel|eszik|ettem|ettél|evett|egyél|egyen|egyek|együnk|ennék|enne|evés|amit|megevett',
    { perfectiveFirstSingular: 'megettem', timeNoun: 'evés' }
  ),
  '공부하다': createVerb(
    'tanul',
    'tanulni|tanulnom|tanulok|tanulsz|tanul|tanultam|tanultál|tanult|tanulj|tanuljon|tanuljak|tanuljunk|tanulnék|tanulna|tanulás|amit|tanult',
    { perfectiveFirstSingular: 'megtanultam', timeNoun: 'tanulás' }
  ),
  '만들다': createVerb(
    'készít, csinál',
    'készíteni|készítenem|készítek|készítesz|készít|készítettem|készítettél|készített|készíts|készítsen|készítsek|készítsünk|készítenék|készítene|készítés|amit|készített',
    { perfectiveFirstSingular: 'elkészítettem' }
  ),
  '듣다': createVerb(
    'hallgat, hall',
    'hallgatni|hallgatnom|hallgatok|hallgatsz|hallgat|hallgattam|hallgattál|hallgatott|hallgass|hallgasson|hallgassak|hallgassunk|hallgatnék|hallgatna|hallgatás|amit|hallgatott',
    { perfectiveFirstSingular: 'meghallgattam' }
  ),
  '돕다': createVerb(
    'segít',
    'segíteni|segítenem|segítek|segítesz|segít|segítettem|segítettél|segített|segíts|segítsen|segítsek|segítsünk|segítenék|segítene|segítés|akinek|segített',
    { perfectiveFirstSingular: 'segítettem' }
  ),
  '짓다': createVerb(
    'épít; főz (rizst)',
    'építeni|építenem|építek|építesz|épít|építettem|építettél|épített|építs|építsen|építsek|építsünk|építenék|építene|építés|amit|épített',
    { perfectiveFirstSingular: 'felépítettem' }
  ),
  '부르다': createVerb(
    'énekel (dalt); hív',
    'énekelni|énekelnem|énekelek|énekelsz|énekel|énekeltem|énekeltél|énekelt|énekelj|énekeljen|énekeljek|énekeljünk|énekelnék|énekelne|éneklés|amit|énekelt',
    { perfectiveFirstSingular: 'elénekeltem', timeNoun: 'éneklés' }
  ),
  '쓰다': createVerb(
    'ír; használ',
    'írni|írnom|írok|írsz|ír|írtam|írtál|írt|írj|írjon|írjak|írjunk|írnék|írna|írás|amit|írt',
    { perfectiveFirstSingular: 'megírtam', timeNoun: 'írás' }
  ),
  '보다': createVerb(
    'lát, néz',
    'nézni|néznem|nézek|nézel|néz|néztem|néztél|nézett|nézz|nézzen|nézzek|nézzünk|néznék|nézne|nézés|amit|nézett',
    { perfectiveFirstSingular: 'megnéztem' }
  ),
  '입다': createVerb(
    'visel, felvesz (ruhát)',
    'viselni|viselnem|viselek|viselsz|visel|viseltem|viseltél|viselt|viselj|viseljen|viseljek|viseljünk|viselnék|viselne|viselés|amit|viselt'
  ),
  '잡다': createVerb(
    'megfog, elkap',
    'megfogni|megfognom|megfogok|megfogsz|megfog|megfogtam|megfogtál|megfogott|fogj meg|fogjon meg|fogjak meg|fogjunk meg|megfognék|megfogna|megfogás|amit|megfogott',
    { hasPreverb: true }
  ),
  '붓다': createVerb(
    'önt; (meg)dagad',
    'önteni|öntenem|öntök|öntesz|önt|öntöttem|öntöttél|öntött|önts|öntsön|öntsek|öntsünk|öntenék|öntene|öntés|amit|öntött'
  ),
  '젓다': createVerb(
    'kever',
    'keverni|kevernem|keverek|keversz|kever|kevertem|kevertél|kevert|keverj|keverjen|keverjek|keverjünk|kevernék|keverne|keverés|amit|kevert'
  ),
  '씻다': createVerb(
    'mos (kezet, arcot)',
    'mosni|mosnom|mosok|mosol|mos|mostam|mostál|mosott|moss|mosson|mossak|mossunk|mosnék|mosna|mosás|amit|mosott'
  ),
  '웃다': createVerb(
    'nevet',
    'nevetni|nevetnem|nevetek|nevetsz|nevet|nevettem|nevettél|nevetett|nevess|nevessen|nevessek|nevessünk|nevetnék|nevetne|nevetés|amin|nevetett'
  ),
  '벗다': createVerb(
    'levesz (ruhát)',
    'levenni|levennem|leveszek|leveszel|levesz|levettem|levettél|levett|vegyél le|vegyen le|vegyek le|vegyünk le|levennék|levenne|levétel|amit|levett',
    { hasPreverb: true }
  ),
  '놓다': createVerb(
    'tesz, letesz',
    'tenni|tennem|teszek|teszel|tesz|tettem|tettél|tett|tegyél|tegyen|tegyek|tegyünk|tennék|tenne|tevés|amit|tett'
  ),
  '넣다': createVerb(
    'betesz, belerak',
    'belerakni|beleraknom|belerakok|beleraksz|belerak|beleraktam|beleraktál|belerakott|rakj bele|rakjon bele|rakjak bele|rakjunk bele|beleraknék|belerakna|belerakás|amit|belerakott',
    { hasPreverb: true }
  ),
  '서다': createVerb(
    'áll, feláll',
    'állni|állnom|állok|állsz|áll|álltam|álltál|állt|állj|álljon|álljak|álljunk|állnék|állna|állás|ahol|állt'
  ),
  '주다': createVerb(
    'ad',
    'adni|adnom|adok|adsz|ad|adtam|adtál|adott|adj|adjon|adjak|adjunk|adnék|adna|adás|amit|adott'
  ),
  '마시다': createVerb(
    'iszik',
    'inni|innom|iszom|iszol|iszik|ittam|ittál|ivott|igyál|igyon|igyak|igyunk|innék|inna|ivás|amit|megivott'
  ),
  '되다': createVerb(
    'lesz, válik valamivé',
    'lenni|lennem|leszek|leszel|lesz|lettem|lettél|lett|legyél|legyen|legyek|legyünk|lennék|lenne|válás|ami|lett'
  ),
  '보내다': createVerb(
    'küld',
    'küldeni|küldenem|küldök|küldesz|küld|küldtem|küldtél|küldött|küldj|küldjön|küldjek|küldjünk|küldenék|küldene|küldés|amit|küldött'
  ),
  '켜다': createVerb(
    'bekapcsol, felkapcsol',
    'bekapcsolni|bekapcsolnom|bekapcsolok|bekapcsolsz|bekapcsol|bekapcsoltam|bekapcsoltál|bekapcsolt|kapcsolj be|kapcsoljon be|kapcsoljak be|kapcsoljunk be|bekapcsolnék|bekapcsolna|bekapcsolás|amit|bekapcsolt',
    { hasPreverb: true }
  ),
  '쉬다': createVerb(
    'pihen',
    'pihenni|pihennem|pihenek|pihensz|pihen|pihentem|pihentél|pihent|pihenj|pihenjen|pihenjek|pihenjünk|pihennék|pihenne|pihenés|ahol|pihent'
  ),
  '받다': createVerb(
    'kap',
    'kapni|kapnom|kapok|kapsz|kap|kaptam|kaptál|kapott|kapj|kapjon|kapjak|kapjunk|kapnék|kapna|kapás|amit|kapott'
  ),
  '살다': createVerb(
    'él, lakik',
    'élni|élnem|élek|élsz|él|éltem|éltél|élt|élj|éljen|éljek|éljünk|élnék|élne|élet|ahol|élt'
  ),
  '알다': createVerb(
    'tud, ismer',
    'tudni|tudnom|tudok|tudsz|tud|tudtam|tudtál|tudott|tudj|tudjon|tudjak|tudjunk|tudnék|tudna|tudás|amit|tudott'
  ),
  '걷다': createVerb(
    'sétál, gyalogol',
    'sétálni|sétálnom|sétálok|sétálsz|sétál|sétáltam|sétáltál|sétált|sétálj|sétáljon|sétáljak|sétáljunk|sétálnék|sétálna|séta|ahol|sétált'
  ),
  '모르다': createVerb(
    'nem tud, nem ismer',
    'nem tudni|nem tudnom|nem tudom|nem tudod|nem tudja|nem tudtam|nem tudtad|nem tudta|ne tudd|ne tudja|ne tudjam|ne tudjuk|nem tudnám|nem tudná|nem tudás|amit|nem tudott',
    { hasNegativeMeaning: true }
  ),
  // ---- additional table words (3A) ----
  '자다': createVerb(
    'alszik',
    'aludni|aludnom|alszom|alszol|alszik|aludtam|aludtál|aludt|aludj|aludjon|aludjak|aludjunk|aludnék|aludna|alvás|ahol|aludt',
    { timeNoun: 'alvás' }
  ),
  '오다': createVerb(
    'jön',
    'jönni|jönnöm|jövök|jössz|jön|jöttem|jöttél|jött|gyere|jöjjön|jöjjek|jöjjünk|jönnék|jönne|jövés|ahová|jött',
    { perfectiveFirstSingular: 'eljöttem' }
  ),
  '늦다': createVerb(
    'késik, elkésik',
    'késni|késnem|késem|késel|késik|késtem|késtél|késett|késs|késsen|késsek|késsünk|késnék|késne|késés|ahonnan|késett',
    { perfectiveFirstSingular: 'elkéstem' }
  ),
  '전화하다': createVerb(
    'telefonál, felhív',
    'telefonálni|telefonálnom|telefonálok|telefonálsz|telefonál|telefonáltam|telefonáltál|telefonált|telefonálj|telefonáljon|telefonáljak|telefonáljunk|telefonálnék|telefonálna|telefonálás|akinek|telefonált'
  ),
  '읽다': createVerb(
    'olvas',
    'olvasni|olvasnom|olvasok|olvasol|olvas|olvastam|olvastál|olvasott|olvass|olvasson|olvassak|olvassunk|olvasnék|olvasna|olvasás|amit|olvasott',
    { perfectiveFirstSingular: 'elolvastam', timeNoun: 'olvasás' }
  ),
  '묻다': createVerb(
    'kérdez',
    'kérdezni|kérdeznem|kérdezek|kérdezel|kérdez|kérdeztem|kérdeztél|kérdezett|kérdezz|kérdezzen|kérdezzek|kérdezzünk|kérdeznék|kérdezne|kérdezés|amit|kérdezett',
    { perfectiveFirstSingular: 'megkérdeztem' }
  ),
  '놀다': createVerb(
    'játszik, szórakozik',
    'játszani|játszanom|játszom|játszol|játszik|játszottam|játszottál|játszott|játssz|játsszon|játsszak|játsszunk|játszanék|játszana|játék|ahol|játszott'
  ),
  '운동하다': createVerb(
    'sportol, edz',
    'sportolni|sportolnom|sportolok|sportolsz|sportol|sportoltam|sportoltál|sportolt|sportolj|sportoljon|sportoljak|sportoljunk|sportolnék|sportolna|sportolás|ahol|sportolt',
    { timeNoun: 'edzés' }
  ),
  '사다': createVerb(
    'vesz, vásárol',
    'venni|vennem|veszek|veszel|vesz|vettem|vettél|vett|vegyél|vegyen|vegyek|vegyünk|vennék|venne|vásárlás|amit|megvett',
    { perfectiveFirstSingular: 'megvettem' }
  ),
  '준비하다': createVerb(
    'készül, előkészít',
    'készülni|készülnöm|készülök|készülsz|készül|készültem|készültél|készült|készülj|készüljön|készüljek|készüljünk|készülnék|készülne|készülődés|amire|készült',
    { perfectiveFirstSingular: 'felkészültem' }
  ),
  '배우다': createVerb(
    'tanul (valamit)',
    'tanulni|tanulnom|tanulok|tanulsz|tanul|tanultam|tanultál|tanult|tanulj|tanuljon|tanuljak|tanuljunk|tanulnék|tanulna|tanulás|amit|tanult',
    { perfectiveFirstSingular: 'megtanultam' }
  ),
  '신다': createVerb(
    'felvesz (cipőt, zoknit)',
    'felvenni|felvennem|felveszek|felveszel|felvesz|felvettem|felvettél|felvett|vegyél fel|vegyen fel|vegyek fel|vegyünk fel|felvennék|felvenne|felvétel|amit|felvett',
    { hasPreverb: true }
  ),
  '여행하다': createVerb(
    'utazik',
    'utazni|utaznom|utazom|utazol|utazik|utaztam|utaztál|utazott|utazz|utazzon|utazzak|utazzunk|utaznék|utazna|utazás|ahová|utazott',
    { timeNoun: 'utazás' }
  ),
  '운전하다': createVerb(
    'vezet (autót)',
    'vezetni|vezetnem|vezetek|vezetsz|vezet|vezettem|vezettél|vezetett|vezess|vezessen|vezessek|vezessünk|vezetnék|vezetne|vezetés|amit|vezetett'
  ),
  '모으다': createVerb(
    'gyűjt',
    'gyűjteni|gyűjtenem|gyűjtök|gyűjtesz|gyűjt|gyűjtöttem|gyűjtöttél|gyűjtött|gyűjts|gyűjtsön|gyűjtsek|gyűjtsünk|gyűjtenék|gyűjtene|gyűjtés|amit|gyűjtött',
    { perfectiveFirstSingular: 'összegyűjtöttem' }
  ),
  '만나다': createVerb(
    'találkozik',
    'találkozni|találkoznom|találkozom|találkozol|találkozik|találkoztam|találkoztál|találkozott|találkozz|találkozzon|találkozzak|találkozzunk|találkoznék|találkozna|találkozás|akivel|találkozott',
    { timeNoun: 'találkozás' }
  ),
  '일하다': createVerb(
    'dolgozik',
    'dolgozni|dolgoznom|dolgozom|dolgozol|dolgozik|dolgoztam|dolgoztál|dolgozott|dolgozz|dolgozzon|dolgozzak|dolgozzunk|dolgoznék|dolgozna|munka|ahol|dolgozott',
    { timeNoun: 'munka' }
  ),
  '등산하다': createVerb(
    'túrázik (hegyre megy)',
    'túrázni|túráznom|túrázom|túrázol|túrázik|túráztam|túráztál|túrázott|túrázz|túrázzon|túrázzak|túrázzunk|túráznék|túrázna|túrázás|ahol|túrázott',
    { timeNoun: 'túrázás' }
  ),
  '찾다': createVerb(
    'keres; megtalál',
    'keresni|keresnem|keresek|keresel|keres|kerestem|kerestél|keresett|keress|keressen|keressek|keressünk|keresnék|keresne|keresés|amit|keresett',
    { perfectiveFirstSingular: 'megtaláltam' }
  ),
  '게임하다': createVerb(
    'játszik (videojátékkal)',
    'játszani|játszanom|játszom|játszol|játszik|játszottam|játszottál|játszott|játssz|játsszon|játsszak|játsszunk|játszanék|játszana|játék|amivel|játszott'
  ),
  '산책하다': createVerb(
    'sétál, sétálni megy',
    'sétálni|sétálnom|sétálok|sétálsz|sétál|sétáltam|sétáltál|sétált|sétálj|sétáljon|sétáljak|sétáljunk|sétálnék|sétálna|séta|ahol|sétált',
    { timeNoun: 'séta' }
  ),
  '열다': createVerb(
    'nyit, kinyit',
    'nyitni|nyitnom|nyitok|nyitsz|nyit|nyitottam|nyitottál|nyitott|nyiss|nyisson|nyissak|nyissunk|nyitnék|nyitna|nyitás|amit|nyitott',
    { perfectiveFirstSingular: 'kinyitottam' }
  ),

  '작다': createAdjective('kicsi', 'kicsi', 'kisebb'),
  '크다': createAdjective('nagy', 'nagy', 'nagyobb'),
  '싸다': createAdjective('olcsó', 'olcsó', 'olcsóbb'),
  '피곤하다': createAdjective('fáradt', 'fáradt', 'fáradtabb'),
  '길다': createAdjective('hosszú', 'hosszú', 'hosszabb'),
  '바쁘다': createAdjective('elfoglalt', 'elfoglalt', 'elfoglaltabb'),
  '덥다': createAdjective('meleg (van)', 'meleg', 'melegebb'),
  '춥다': createAdjective('hideg (van)', 'hideg', 'hidegebb'),
  '맵다': createAdjective('csípős', 'csípős', 'csípősebb'),
  '무겁다': createAdjective('nehéz (súlyra)', 'nehéz', 'nehezebb'),
  '쉽다': createAdjective('könnyű (nem nehéz)', 'könnyű', 'könnyebb'),
  '좁다': createAdjective('szűk, keskeny', 'szűk', 'szűkebb'),
  '낫다': createAdjective('jobb; (meg)gyógyul', 'jobb', 'jobb'),
  '빨갛다': createAdjective('piros', 'piros', 'pirosabb'),
  '노랗다': createAdjective('sárga', 'sárga', 'sárgább'),
  '파랗다': createAdjective('kék', 'kék', 'kékebb'),
  '하얗다': createAdjective('fehér', 'fehér', 'fehérebb'),
  '까맣다': createAdjective('fekete', 'fekete', 'feketébb'),
  '그렇다': createAdjective('olyan, úgy van', 'olyan', 'inkább olyan'),
  '어떻다': createAdjective('milyen?', 'milyen', 'milyen'),
  '다르다': createAdjective('más, különböző', 'más', 'eltérőbb'),
  '좋다': createAdjective('jó', 'jó', 'jobb'),
  '맛있다': createAdjective('finom', 'finom', 'finomabb'),
  // ---- additional table words (3A) ----
  '넓다': createAdjective('tágas, széles', 'tágas', 'tágasabb'),
  '편안하다': createAdjective('kényelmes, nyugodt', 'kényelmes', 'kényelmesebb'),
  '무섭다': createAdjective('ijesztő, félelmetes', 'ijesztő', 'ijesztőbb'),
  '친절하다': createAdjective('kedves, barátságos', 'kedves', 'kedvesebb'),
  '비싸다': createAdjective('drága', 'drága', 'drágább'),
  '슬프다': createAdjective('szomorú', 'szomorú', 'szomorúbb'),
  '아프다': createAdjective('beteg; fáj', 'beteg', 'betegebb'),
  '맑다': createAdjective('tiszta, derült (idő)', 'derült', 'derültebb'),
  '재미있다': createAdjective('érdekes, szórakoztató', 'érdekes', 'érdekesebb'),
  '많다': createAdjective('sok', 'sok', 'több'),
  '흐리다': createAdjective('borús, felhős', 'borús', 'borúsabb'),
  '멀다': createAdjective('messze van, távoli', 'messze van', 'messzebb'),
  '예쁘다': createAdjective('szép, csinos', 'szép', 'szebb'),
  '깨끗하다': createAdjective('tiszta', 'tiszta', 'tisztább'),
};

// Nouns: base form, with article, accusative, dative, essive (-ként), and the typical meaning of (으)로 with the noun.
const createNoun = (
  hungarian: string,
  definite: string,
  accusative: string,
  dative: string,
  essive: string,
  roMeaning: string
): NounEntry => ({ wordClass: 'noun', hungarian, base: hungarian, definite, accusative, dative, essive, roMeaning });
export const nouns: Record<string, NounEntry> = {
  '친구': createNoun('barát', 'a barát', 'a barátot', 'barátnak', 'barátként', 'barátként'),
  '선생님': createNoun('tanár', 'a tanár', 'a tanárt', 'tanárnak', 'tanárként', 'tanárként'),
  '학생': createNoun('diák', 'a diák', 'a diákot', 'diáknak', 'diákként', 'diákként'),
  '의사': createNoun('orvos', 'az orvos', 'az orvost', 'orvosnak', 'orvosként', 'orvosként'),
  '저': createNoun('én', 'én', 'engem', 'nekem', 'én magam', '—'),
  '이름': createNoun('név', 'a név', 'a nevet', 'névnek', 'névként', 'névként'),
  '전화번호': createNoun(
    'telefonszám',
    'a telefonszám',
    'a telefonszámot',
    'telefonszámnak',
    'telefonszámként',
    'telefonszámként'
  ),
  '가방': createNoun('táska', 'a táska', 'a táskát', 'táskának', 'táskaként', 'táskaként'),
  '커피': createNoun('kávé', 'a kávé', 'kávét', 'kávénak', 'kávéként', 'kávéként'),
  '빵': createNoun('kenyér', 'a kenyér', 'kenyeret', 'kenyérnek', 'kenyérként', 'kenyérként'),
  '우유': createNoun('tej', 'a tej', 'tejet', 'tejnek', 'tejként', 'tejként'),
  '지하철': createNoun('metró', 'a metró', 'a metrót', 'metrónak', 'metróként', 'metróval'),
  '왼쪽': createNoun('bal oldal', 'a bal oldal', 'a bal oldalt', 'bal oldalnak', 'bal oldalként', 'balra'),
  '위': createNoun('fent, felső rész', 'a felső rész', 'a felső részt', 'felső résznek', 'felső részként', 'felfelé'),
  '마크': createNoun('Mark', 'Mark', 'Markot', 'Marknak', 'Markként', 'Markként'),
  '수진': createNoun('Szudzsin', 'Szudzsin', 'Szudzsint', 'Szudzsinnak', 'Szudzsinként', 'Szudzsinként'),
  '떡볶이': createNoun(
    'tokpokki (csípős rizssütemény)',
    'a tokpokki',
    'a tokpokkit',
    'tokpokkinak',
    'tokpokkiként',
    'tokpokkiként'
  ),
  '세종학당': createNoun(
    'Szedzsong Intézet',
    'a Szedzsong Intézet',
    'a Szedzsong Intézetet',
    'Szedzsong Intézetnek',
    'Szedzsong Intézetként',
    'a Szedzsong Intézet felé'
  ),
  '폭설': createNoun(
    'heves havazás',
    'a heves havazás',
    'a heves havazást',
    'heves havazásnak',
    'heves havazásként',
    'a heves havazás miatt'
  ),
  '태풍': createNoun('tájfun', 'a tájfun', 'a tájfunt', 'tájfunnak', 'tájfunként', 'a tájfun miatt'),
  '사고': createNoun('baleset', 'a baleset', 'a balesetet', 'balesetnek', 'balesetként', 'a baleset miatt'),
  '부모': createNoun('szülő', 'a szülő', 'a szülőt', 'szülőnek', 'szülőként', 'szülőként'),
  '대표': createNoun('képviselő', 'a képviselő', 'a képviselőt', 'képviselőnek', 'képviselőként', 'képviselőként'),
};
