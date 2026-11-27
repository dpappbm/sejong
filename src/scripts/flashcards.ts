// The flash-card games: a lesson's (src/components/LessonFlashcardDialog.astro) and a whole book's
// (src/components/BookFlashcardDialog.astro, on the home page). Choose rows, answer a multiple-choice round per row,
// see the summary. A book game asks its selection in batches: "Újra" draws the rows not asked yet.
// The dialogs are part of the swapped page content, so they are looked up on every event; the listeners are bound once.
import type { BookPractice, PracticeRowKind } from '../lib/bookPractice';
import {
  bookCards,
  buildRound,
  canPlay,
  cardKind,
  drawBatch,
  learnedLessonKeys,
  OPTION_COUNT,
  otherLanguage,
  putMistakesFirst,
  retryPool,
  shuffle,
  totalRounds,
  type Card,
  type Language,
  type Round,
} from '../lib/flashcards';
import { applyTreeChange, isTreeCheckbox, resetTree, selectedGroups } from './rowTree';

type Screen = 'selection' | 'round' | 'summary';
type Scope = 'lesson' | 'book';

interface Mistake {
  round: Round;
  chosenIndex: number;
}

interface GameSetup {
  /** The cards asked, in question order. */
  questions: Card[];
  /** The cards the wrong answers are drawn from. */
  pool: Card[];
  /** The rows chosen on the selection screen; "Csak a hibásak" draws wrong answers from here if its own are too few. */
  selection: Card[];
  /** A book game: the rows of the selection not asked yet, in asking order. null in a lesson game. */
  remaining: Card[] | null;
  /** A book game: the questions of a round. */
  batchSize: number;
  /** A book game: the rows of the selection asked so far in this pass through it, the current one included. */
  asked: Set<Card>;
  /** A book game: the number of the current batch in this pass ("Csak a hibásak" rounds do not count). */
  roundNumber: number;
  /** A "Csak a hibásak" round. */
  mistakeRetry?: boolean;
}

interface Game extends GameSetup {
  index: number;
  round: Round | null;
  answered: boolean;
  correctCount: number;
  mistakes: Mistake[];
}

const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];
const MINIMUM_ROWS = OPTION_COUNT;

let game: Game | null = null;
/** The rows of the open book dialog, once fetched. */
let bookPractice: BookPractice | null = null;
/** The fetched books, by book code: each is fetched once per visit. */
const practiceRequests = new Map<string, Promise<BookPractice>>();

const lessonDialog = () => document.getElementById('lesson-flashcard-dialog') as HTMLDialogElement | null;
const bookDialog = () => document.getElementById('book-flashcard-dialog') as HTMLDialogElement | null;
const openDialog = () => document.querySelector<HTMLDialogElement>('dialog.flashcard-dialog[open]');
const scopeOf = (dialog: HTMLDialogElement) => dialog.dataset.flashcardScope as Scope;
const part = <T extends Element = HTMLElement>(dialog: HTMLDialogElement, name: string) =>
  dialog.querySelector<T>(`[data-flashcard-${name}]`);
const practicePart = <T extends Element = HTMLElement>(dialog: HTMLDialogElement, name: string) =>
  dialog.querySelector<T>(`[data-practice-${name}]`);
const progress = () => (document.getElementById('progress-select') as HTMLSelectElement | null)?.value ?? '';

/** The values of the checked checkboxes that carry the attribute. */
const checkedValues = (dialog: HTMLDialogElement, attribute: string) =>
  Array.from(dialog.querySelectorAll<HTMLInputElement>(`input[${attribute}]:checked`)).map(checkbox =>
    checkbox.getAttribute(attribute)!
  );

const selectedLessonKeys = (dialog: HTMLDialogElement) => checkedValues(dialog, 'data-practice-lesson');
const selectedKinds = (dialog: HTMLDialogElement) => checkedValues(dialog, 'data-practice-kind') as PracticeRowKind[];

function selectedCards(dialog: HTMLDialogElement): Card[] {
  if (scopeOf(dialog) === 'book')
    return bookPractice ? bookCards(bookPractice, selectedLessonKeys(dialog), selectedKinds(dialog)) : [];
  return selectedGroups(dialog).flatMap(group =>
    group.rows.map(([korean, hungarian]): Card => ({ korean, hungarian, kind: cardKind(group.key) }))
  );
}

/** The questions per round chosen in the book dialog ("Mind": all of them). */
function selectedBatchSize(dialog: HTMLDialogElement): number {
  const value = practicePart<HTMLSelectElement>(dialog, 'batch-size')?.value ?? 'all';
  return value === 'all' ? Infinity : Number(value);
}

function showScreen(dialog: HTMLDialogElement, screen: Screen): void {
  dialog.dataset.flashcardScreen = screen;
  for (const section of dialog.querySelectorAll<HTMLElement>('[data-flashcard-section]'))
    section.hidden = section.dataset.flashcardSection !== screen;
}

/** Korean text gets the Korean font and language. */
function setText(element: HTMLElement, text: string, language: Language): void {
  element.textContent = text;
  element.lang = language === 'korean' ? 'ko' : 'hu';
  element.classList.toggle('korean', language === 'korean');
}

function selectionStatus(dialog: HTMLDialogElement, count: number, playable: boolean): string {
  if (count < MINIMUM_ROWS) return `${count} sor – legalább ${MINIMUM_ROWS} sor kell`;
  if (!playable) return `${count} sor – túl sok az azonos jelentésű sor, jelölj ki többet`;
  if (scopeOf(dialog) === 'lesson') return `${count} sor, ${count} kör`;
  const batchSize = selectedBatchSize(dialog);
  if (batchSize >= count) return `${count} sor, egy körben`;
  return `${count} sor · ${batchSize} kérdés körönként (${Math.ceil(count / batchSize)} kör)`;
}

/** The book dialog: the row counts of the kinds in the chosen lessons, and the "Amit már vettem" button. */
function updateBookChoices(dialog: HTMLDialogElement): void {
  if (!bookPractice) return;
  const lessonKeys = selectedLessonKeys(dialog);
  for (const count of dialog.querySelectorAll<HTMLElement>('[data-practice-kind-count]')) {
    const kind = count.dataset.practiceKindCount as PracticeRowKind;
    count.textContent = `(${bookCards(bookPractice, lessonKeys, [kind]).length})`;
  }
  const learnedButton = practicePart(dialog, 'learned-lessons');
  if (learnedButton) learnedButton.hidden = !learnedLessonKeys(bookPractice, progress()).length;
}

function updateSelection(dialog: HTMLDialogElement): void {
  if (scopeOf(dialog) === 'book') updateBookChoices(dialog);
  const cards = selectedCards(dialog);
  const playable = cards.length >= MINIMUM_ROWS && canPlay(cards, cards);
  const status = part(dialog, 'selection-status');
  if (status) {
    status.textContent =
      scopeOf(dialog) === 'book' && !bookPractice ? '' : selectionStatus(dialog, cards.length, playable);
    status.classList.toggle('is-warning', !playable);
  }
  const start = part<HTMLButtonElement>(dialog, 'start');
  if (start) start.disabled = !playable;
}

function startGame(dialog: HTMLDialogElement, setup: GameSetup): void {
  game = { ...setup, index: 0, round: null, answered: false, correctCount: 0, mistakes: [] };
  showScreen(dialog, 'round');
  showRound(dialog);
}

/** The first round of a selection: a lesson game asks all of it, a book game its first batch. */
function startSelection(dialog: HTMLDialogElement): void {
  const cards = selectedCards(dialog);
  if (scopeOf(dialog) === 'lesson') {
    startGame(dialog, {
      questions: shuffle(cards),
      pool: cards,
      selection: cards,
      remaining: null,
      batchSize: Infinity,
      asked: new Set(),
      roundNumber: 1,
    });
    return;
  }
  const batchSize = selectedBatchSize(dialog);
  const { batch, remaining } = drawBatch(shuffle(cards), batchSize);
  startGame(dialog, {
    questions: batch,
    pool: cards,
    selection: cards,
    remaining,
    batchSize,
    asked: new Set(),
    roundNumber: 1,
  });
}

const includeMistakes = (dialog: HTMLDialogElement) => !!part<HTMLInputElement>(dialog, 'include-mistakes')?.checked;

/**
 * "Újra": a lesson game asks the same rows again. A book game ("Újra", or "Folytatás" after a "Csak a hibásak" round)
 * asks the next batch of rows not asked yet, the mistakes first if chosen.
 */
function restart(dialog: HTMLDialogElement): void {
  if (!game) return;
  const { selection, batchSize } = game;
  if (!game.remaining) {
    startGame(dialog, { ...game, questions: shuffle(game.questions) });
    return;
  }
  const mistakes = game.mistakes.map(mistake => mistake.round.card);
  let remaining = includeMistakes(dialog) ? putMistakesFirst(game.remaining, mistakes) : game.remaining;
  let { asked, roundNumber } = game;
  roundNumber++;
  // Every row has been asked: start the selection over ("Elölről").
  if (!remaining.length) {
    remaining = shuffle(selection);
    asked = new Set();
    roundNumber = 1;
  }
  const next = drawBatch(remaining, batchSize);
  startGame(dialog, {
    questions: next.batch,
    pool: selection,
    selection,
    remaining: next.remaining,
    batchSize,
    asked,
    roundNumber,
  });
}

/** The position in the round; a book game also tells the round and how many rows of the selection have come up. */
function updateProgress(dialog: HTMLDialogElement): void {
  const progressLine = part(dialog, 'progress');
  if (!progressLine || !game) return;
  let text = `${game.index + 1} / ${game.questions.length} · ${game.correctCount} jó`;
  if (game.remaining) {
    const round = game.mistakeRetry
      ? 'hibás sorok köre'
      : `${game.roundNumber} / ${totalRounds(game.roundNumber, game.remaining.length, game.batchSize)} kör`;
    text += ` (${round}, ${game.asked.size} / ${game.selection.length} összesen)`;
  }
  progressLine.textContent = text;
}

function showRound(dialog: HTMLDialogElement): void {
  if (!game) return;
  const card = game.questions[game.index];
  const round = buildRound(card, game.pool);
  if (!round) {
    // canPlay was checked before the game, so every card has a round; skip one defensively instead of getting stuck.
    nextRound(dialog);
    return;
  }
  game.round = round;
  game.asked.add(card);
  game.answered = false;
  updateProgress(dialog);
  const question = part(dialog, 'question');
  if (question) setText(question, round.question, round.questionLanguage);
  const answers = part(dialog, 'answers');
  if (answers) {
    const answerLanguage = otherLanguage(round.questionLanguage);
    answers.replaceChildren(
      ...round.options.map((option, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'flashcard-answer';
        button.dataset.flashcardAnswer = String(index);
        const letter = document.createElement('span');
        letter.className = 'flashcard-answer-letter';
        letter.textContent = ANSWER_LETTERS[index];
        const text = document.createElement('span');
        text.className = 'flashcard-answer-text';
        setText(text, option.text, answerLanguage);
        const mark = document.createElement('span');
        mark.className = 'flashcard-answer-mark';
        mark.setAttribute('aria-hidden', 'true');
        button.append(letter, text, mark);
        return button;
      })
    );
    answers.querySelector<HTMLButtonElement>('button')?.focus();
  }
  const feedback = part(dialog, 'feedback');
  if (feedback) feedback.textContent = '';
  const next = part<HTMLButtonElement>(dialog, 'next');
  if (next) next.hidden = true;
}

function answer(dialog: HTMLDialogElement, chosenIndex: number): void {
  if (!game?.round || game.answered || chosenIndex < 0 || chosenIndex >= game.round.options.length) return;
  const { round } = game;
  game.answered = true;
  const correct = chosenIndex === round.correctIndex;
  if (correct) game.correctCount++;
  else game.mistakes.push({ round, chosenIndex });
  dialog.querySelectorAll<HTMLButtonElement>('[data-flashcard-answer]').forEach((button, index) => {
    button.disabled = true;
    const mark = button.querySelector('.flashcard-answer-mark');
    if (index === round.correctIndex) {
      button.classList.add('is-correct');
      if (mark) mark.textContent = '✓';
    } else if (index === chosenIndex) {
      button.classList.add('is-incorrect');
      if (mark) mark.textContent = '✗';
    }
  });
  updateProgress(dialog);
  const feedback = part(dialog, 'feedback');
  if (feedback) {
    feedback.textContent = correct ? 'Helyes!' : 'Nem jó – a helyes válasz zölddel jelölve.';
    feedback.classList.toggle('is-correct', correct);
    feedback.classList.toggle('is-incorrect', !correct);
  }
  const next = part<HTMLButtonElement>(dialog, 'next');
  if (next) {
    next.textContent = game.index + 1 < game.questions.length ? 'Következő' : 'Eredmény';
    next.hidden = false;
    next.focus();
  }
}

function nextRound(dialog: HTMLDialogElement): void {
  if (!game) return;
  game.index++;
  if (game.index < game.questions.length) showRound(dialog);
  else showSummary(dialog);
}

/** A line of the mistake list: label and text (in the language of the text). */
function mistakeLine(className: string, label: string, text: string, language: Language): HTMLElement {
  const line = document.createElement('span');
  line.className = className;
  const labelElement = document.createElement('span');
  labelElement.className = 'flashcard-mistake-label';
  labelElement.textContent = label;
  const textElement = document.createElement('span');
  setText(textElement, text, language);
  line.append(labelElement, textElement);
  return line;
}

const fullText = (card: Card, language: Language) => (language === 'korean' ? card.korean : card.hungarian);

/**
 * A book game: "Folytatás" after a "Csak a hibásak" round, "Elölről" when no row is left to ask (the mistakes count if
 * they come again).
 */
function updateRestartLabel(dialog: HTMLDialogElement): void {
  const restartButton = part<HTMLButtonElement>(dialog, 'restart');
  if (!restartButton || !game) return;
  const nothingLeft = !!game.remaining && !game.remaining.length && !(includeMistakes(dialog) && game.mistakes.length);
  restartButton.textContent = nothingLeft ? 'Elölről' : game.remaining && game.mistakeRetry ? 'Folytatás' : 'Újra';
}

/** A book game: how many rows of the selection have come up (as in the progress line of the rounds). */
function showRemaining(dialog: HTMLDialogElement): void {
  const line = part(dialog, 'remaining');
  if (!line || !game?.remaining) return;
  const total = game.selection.length;
  const asked = game.asked.size;
  line.textContent =
    asked < total
      ? `Eddig ${asked} / ${total} sor volt, ${total - asked} van hátra.`
      : `Mind a ${total} sor sorra került.`;
  const includeLabel = part(dialog, 'include-mistakes-label');
  if (includeLabel) includeLabel.hidden = !game.mistakes.length;
}

function showSummary(dialog: HTMLDialogElement): void {
  if (!game) return;
  showScreen(dialog, 'summary');
  const total = game.questions.length;
  const score = part(dialog, 'score');
  if (score)
    score.textContent = `${game.correctCount} / ${total} helyes (${Math.round((game.correctCount / total) * 100)}%)`;
  showRemaining(dialog);
  const mistakes = part(dialog, 'mistakes');
  if (mistakes) {
    if (!game.mistakes.length) {
      const perfect = document.createElement('p');
      perfect.className = 'flashcard-perfect';
      perfect.textContent = 'Hibátlan: minden válasz helyes volt.';
      mistakes.replaceChildren(perfect);
    } else {
      const heading = document.createElement('h3');
      heading.className = 'flashcard-mistakes-heading';
      heading.textContent = `Elrontott sorok (${game.mistakes.length})`;
      const list = document.createElement('ul');
      list.className = 'flashcard-mistakes';
      list.append(
        ...game.mistakes.map(({ round, chosenIndex }) => {
          const answerLanguage = otherLanguage(round.questionLanguage);
          const item = document.createElement('li');
          const question = document.createElement('span');
          question.className = 'flashcard-mistake-question';
          setText(question, fullText(round.card, round.questionLanguage), round.questionLanguage);
          item.append(
            question,
            mistakeLine('flashcard-mistake-correct', '✓ helyes:', fullText(round.card, answerLanguage), answerLanguage),
            mistakeLine(
              'flashcard-mistake-chosen',
              '✗ a válaszod:',
              fullText(round.options[chosenIndex].card, answerLanguage),
              answerLanguage
            )
          );
          return item;
        })
      );
      mistakes.replaceChildren(heading, list);
    }
  }
  updateRestartLabel(dialog);
  const retry = part<HTMLButtonElement>(dialog, 'retry-mistakes');
  if (retry) retry.hidden = !game.mistakes.length;
  part<HTMLButtonElement>(dialog, 'restart')?.focus();
}

function openLessonDialog(dialog: HTMLDialogElement): void {
  game = null;
  resetTree(dialog);
  showScreen(dialog, 'selection');
  updateSelection(dialog);
  dialog.showModal();
}

function loadBookPractice(book: string): Promise<BookPractice> {
  let request = practiceRequests.get(book);
  if (!request) {
    request = fetch(`${document.body.dataset.base ?? ''}/${book.toLowerCase()}/practice.json`).then(response => {
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response.json() as Promise<BookPractice>;
    });
    practiceRequests.set(book, request);
  }
  return request;
}

function setLessons(dialog: HTMLDialogElement, lessonKeys: readonly string[]): void {
  for (const checkbox of dialog.querySelectorAll<HTMLInputElement>('input[data-practice-lesson]'))
    checkbox.checked = lessonKeys.includes(checkbox.dataset.practiceLesson!);
}

function fillLessons(dialog: HTMLDialogElement, practice: BookPractice): void {
  practicePart(dialog, 'lessons')?.replaceChildren(
    ...practice.lessons.map(lesson => {
      const item = document.createElement('li');
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.practiceLesson = lesson.key;
      const number = document.createElement('b');
      number.textContent = `${lesson.lesson}. lecke`;
      label.append(checkbox, ' ', number);
      if (lesson.title) {
        const title = document.createElement('span');
        setText(title, lesson.title, 'korean');
        label.append(' ', title);
      }
      const forms = document.createElement('small');
      setText(forms, lesson.forms.join(' · '), 'korean');
      label.append(' ', forms);
      item.append(label);
      return item;
    })
  );
}

/** Opens the book dialog at once, with "Betöltés…" until the rows of the book arrive. */
async function openBookDialog(dialog: HTMLDialogElement, book: string): Promise<void> {
  game = null;
  bookPractice = null;
  dialog.dataset.book = book;
  const bookLabel = practicePart(dialog, 'book-label');
  if (bookLabel) bookLabel.textContent = `${book} könyv`;
  const loading = practicePart(dialog, 'loading');
  const choices = practicePart(dialog, 'choices');
  if (loading) {
    loading.hidden = false;
    loading.textContent = 'Betöltés…';
  }
  if (choices) choices.hidden = true;
  showScreen(dialog, 'selection');
  updateSelection(dialog);
  dialog.showModal();
  let practice: BookPractice;
  try {
    practice = await loadBookPractice(book);
  } catch {
    practiceRequests.delete(book);
    if (loading && dialog.dataset.book === book)
      loading.textContent = 'Nem sikerült betölteni a könyv sorait. Zárd be, és próbáld újra.';
    return;
  }
  // Closed or another book opened in the meantime.
  if (!dialog.open || dialog.dataset.book !== book) return;
  bookPractice = practice;
  fillLessons(dialog, practice);
  const learned = learnedLessonKeys(practice, progress());
  setLessons(dialog, learned.length ? learned : practice.lessons.map(lesson => lesson.key));
  for (const checkbox of dialog.querySelectorAll<HTMLInputElement>('input[data-practice-kind]'))
    checkbox.checked = true;
  if (loading) loading.hidden = true;
  if (choices) choices.hidden = false;
  updateSelection(dialog);
}

function closeFlashcardDialog(dialog: HTMLDialogElement): void {
  game = null;
  dialog.close();
}

document.addEventListener('click', event => {
  const target = event.target as Element;
  const bookButton = target.closest<HTMLElement>('.book-flashcard-open-button');
  if (bookButton) {
    // The button sits in the <summary> of the book: the book must not fold up.
    event.preventDefault();
    const dialog = bookDialog();
    if (dialog && bookButton.dataset.book) void openBookDialog(dialog, bookButton.dataset.book);
    return;
  }
  if (target.closest('.flashcard-open-button')) {
    const dialog = lessonDialog();
    if (dialog) openLessonDialog(dialog);
    return;
  }
  // A click beside the dialog (on its backdrop) intentionally does nothing.
  const dialog = target.closest<HTMLDialogElement>('dialog.flashcard-dialog');
  if (!dialog) return;
  if (target.closest('[data-flashcard-close]')) closeFlashcardDialog(dialog);
  else if (target.closest('[data-flashcard-start]')) startSelection(dialog);
  else if (target.closest('[data-flashcard-answer]')) {
    answer(dialog, Number(target.closest<HTMLElement>('[data-flashcard-answer]')!.dataset.flashcardAnswer));
  } else if (target.closest('[data-flashcard-next]')) nextRound(dialog);
  else if (game && target.closest('[data-flashcard-restart]')) restart(dialog);
  else if (game && target.closest('[data-flashcard-retry-mistakes]')) {
    const mistakes = game.mistakes.map(mistake => mistake.round.card);
    startGame(dialog, {
      ...game,
      questions: shuffle(mistakes),
      pool: retryPool(mistakes, game.selection),
      mistakeRetry: true,
    });
  } else if (target.closest('[data-flashcard-back]')) {
    game = null;
    showScreen(dialog, 'selection');
    updateSelection(dialog);
  } else if (bookPractice && target.closest('[data-practice-all-lessons]')) {
    setLessons(
      dialog,
      bookPractice.lessons.map(lesson => lesson.key)
    );
    updateSelection(dialog);
  } else if (bookPractice && target.closest('[data-practice-learned-lessons]')) {
    setLessons(dialog, learnedLessonKeys(bookPractice, progress()));
    updateSelection(dialog);
  }
});

document.addEventListener('change', event => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const dialog = target.closest<HTMLDialogElement>('dialog.flashcard-dialog');
  if (!dialog) return;
  if (scopeOf(dialog) === 'lesson') {
    if (!isTreeCheckbox(dialog, target)) return;
    applyTreeChange(dialog, target);
    updateSelection(dialog);
  } else if (target.matches('[data-practice-lesson], [data-practice-kind], [data-practice-batch-size]'))
    updateSelection(dialog);
  else if (target.matches('[data-flashcard-include-mistakes]')) updateRestartLabel(dialog);
});

/** The answer a key stands for: 1–4 or A–D (by key position, so a Korean keyboard layout works too). */
function answerIndexOfKey(event: KeyboardEvent): number {
  const digit = /^(?:Digit|Numpad)([1-4])$/.exec(event.code);
  if (digit) return Number(digit[1]) - 1;
  const letter = /^Key([A-D])$/.exec(event.code);
  return letter ? ANSWER_LETTERS.indexOf(letter[1]) : -1;
}

document.addEventListener('keydown', event => {
  const dialog = openDialog();
  if (!dialog || dialog.dataset.flashcardScreen !== 'round') return;
  if (event.key === 'Escape') {
    // Esc does not end a game; ✕ does.
    event.preventDefault();
    return;
  }
  if (event.ctrlKey || event.metaKey || event.altKey || !game || game.answered) return;
  const index = answerIndexOfKey(event);
  if (index >= 0) {
    event.preventDefault();
    answer(dialog, index);
  }
});

const isFlashcardDialog = (target: EventTarget | null): target is HTMLDialogElement =>
  target instanceof HTMLDialogElement && target.classList.contains('flashcard-dialog');

// "cancel" (Esc) does not bubble, so it is caught on the way down.
document.addEventListener(
  'cancel',
  event => {
    if (isFlashcardDialog(event.target) && event.target.dataset.flashcardScreen === 'round') event.preventDefault();
  },
  true
);

document.addEventListener(
  'close',
  event => {
    if (isFlashcardDialog(event.target)) game = null;
  },
  true
);

// A page change swaps the dialogs away; close the open one first so the modal state does not linger.
document.addEventListener('astro:before-swap', () => {
  const dialog = openDialog();
  if (dialog) closeFlashcardDialog(dialog);
});
