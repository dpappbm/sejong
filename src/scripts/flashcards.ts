// The flash-card game of a lesson (src/components/LessonFlashcardDialog.astro): choose rows, answer a multiple-choice
// round per row, see the summary. The dialog is part of the swapped page content, so it is looked up on every event;
// the listeners are bound once.
import { buildRound, canPlay, cardKind, OPTION_COUNT, otherLanguage, retryPool, shuffle, type Card, type Language, type Round } from '../lib/flashcards';
import { applyTreeChange, isTreeCheckbox, resetTree, selectedGroups } from './rowTree';

type Screen = 'selection' | 'round' | 'summary';

interface Mistake {
  round: Round;
  chosenIndex: number;
}

interface Game {
  /** The cards asked, in question order. */
  questions: Card[];
  /** The cards the wrong answers are drawn from. */
  pool: Card[];
  /** The rows chosen on the selection screen; "Csak a hibásak" draws wrong answers from here if its own are too few. */
  selection: Card[];
  index: number;
  round: Round | null;
  answered: boolean;
  correctCount: number;
  mistakes: Mistake[];
}

const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];
const MINIMUM_ROWS = OPTION_COUNT;

let game: Game | null = null;

const flashcardDialog = () => document.getElementById('lesson-flashcard-dialog') as HTMLDialogElement | null;
const part = <T extends Element = HTMLElement>(dialog: HTMLDialogElement, name: string) => dialog.querySelector<T>(`[data-flashcard-${name}]`);

function selectedCards(dialog: HTMLDialogElement): Card[] {
  return selectedGroups(dialog).flatMap(group => group.rows.map(([korean, hungarian]): Card => ({ korean, hungarian, kind: cardKind(group.key) })));
}

function showScreen(dialog: HTMLDialogElement, screen: Screen): void {
  dialog.dataset.flashcardScreen = screen;
  for (const section of dialog.querySelectorAll<HTMLElement>('[data-flashcard-section]')) section.hidden = section.dataset.flashcardSection !== screen;
}

/** Korean text gets the Korean font and language. */
function setText(element: HTMLElement, text: string, language: Language): void {
  element.textContent = text;
  element.lang = language === 'korean' ? 'ko' : 'hu';
  element.classList.toggle('korean', language === 'korean');
}

function updateSelection(dialog: HTMLDialogElement): void {
  const cards = selectedCards(dialog);
  const playable = cards.length >= MINIMUM_ROWS && canPlay(cards, cards);
  const status = part(dialog, 'selection-status');
  if (status) {
    status.textContent = cards.length < MINIMUM_ROWS ? `${cards.length} sor – legalább ${MINIMUM_ROWS} sor kell`
      : !playable ? `${cards.length} sor – túl sok az azonos jelentésű sor, jelölj ki többet`
      : `${cards.length} sor, ${cards.length} kör`;
    status.classList.toggle('is-warning', !playable);
  }
  const start = part<HTMLButtonElement>(dialog, 'start');
  if (start) start.disabled = !playable;
}

function startGame(dialog: HTMLDialogElement, questions: Card[], pool: Card[], selection: Card[]): void {
  game = { questions: shuffle(questions), pool, selection, index: 0, round: null, answered: false, correctCount: 0, mistakes: [] };
  showScreen(dialog, 'round');
  showRound(dialog);
}

function updateProgress(dialog: HTMLDialogElement): void {
  const progress = part(dialog, 'progress');
  if (progress && game) progress.textContent = `${game.index + 1} / ${game.questions.length} · ${game.correctCount} jó`;
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
  game.answered = false;
  updateProgress(dialog);
  const question = part(dialog, 'question');
  if (question) setText(question, round.question, round.questionLanguage);
  const answers = part(dialog, 'answers');
  if (answers) {
    const answerLanguage = otherLanguage(round.questionLanguage);
    answers.replaceChildren(...round.options.map((option, index) => {
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
    }));
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

function showSummary(dialog: HTMLDialogElement): void {
  if (!game) return;
  showScreen(dialog, 'summary');
  const total = game.questions.length;
  const score = part(dialog, 'score');
  if (score) score.textContent = `${game.correctCount} / ${total} helyes (${Math.round((game.correctCount / total) * 100)}%)`;
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
      list.append(...game.mistakes.map(({ round, chosenIndex }) => {
        const answerLanguage = otherLanguage(round.questionLanguage);
        const item = document.createElement('li');
        const question = document.createElement('span');
        question.className = 'flashcard-mistake-question';
        setText(question, fullText(round.card, round.questionLanguage), round.questionLanguage);
        item.append(
          question,
          mistakeLine('flashcard-mistake-correct', '✓ helyes:', fullText(round.card, answerLanguage), answerLanguage),
          mistakeLine('flashcard-mistake-chosen', '✗ a válaszod:', fullText(round.options[chosenIndex].card, answerLanguage), answerLanguage),
        );
        return item;
      }));
      mistakes.replaceChildren(heading, list);
    }
  }
  const retry = part<HTMLButtonElement>(dialog, 'retry-mistakes');
  if (retry) retry.hidden = !game.mistakes.length;
  part<HTMLButtonElement>(dialog, 'restart')?.focus();
}

function openFlashcardDialog(dialog: HTMLDialogElement): void {
  game = null;
  resetTree(dialog);
  showScreen(dialog, 'selection');
  updateSelection(dialog);
  dialog.showModal();
}

function closeFlashcardDialog(dialog: HTMLDialogElement): void {
  game = null;
  dialog.close();
}

document.addEventListener('click', event => {
  const target = event.target as Element;
  const dialog = flashcardDialog();
  if (!dialog) return;
  // A click beside the dialog (on its backdrop) intentionally does nothing.
  if (target.closest('.flashcard-open-button')) openFlashcardDialog(dialog);
  else if (!dialog.contains(target)) return;
  else if (target.closest('[data-flashcard-close]')) closeFlashcardDialog(dialog);
  else if (target.closest('[data-flashcard-start]')) {
    const cards = selectedCards(dialog);
    startGame(dialog, cards, cards, cards);
  } else if (target.closest('[data-flashcard-answer]')) {
    answer(dialog, Number(target.closest<HTMLElement>('[data-flashcard-answer]')!.dataset.flashcardAnswer));
  } else if (target.closest('[data-flashcard-next]')) nextRound(dialog);
  else if (game && target.closest('[data-flashcard-restart]')) startGame(dialog, game.questions, game.pool, game.selection);
  else if (game && target.closest('[data-flashcard-retry-mistakes]')) {
    const mistakes = game.mistakes.map(mistake => mistake.round.card);
    startGame(dialog, mistakes, retryPool(mistakes, game.selection), game.selection);
  } else if (target.closest('[data-flashcard-back]')) {
    game = null;
    showScreen(dialog, 'selection');
    updateSelection(dialog);
  }
});

document.addEventListener('change', event => {
  const dialog = flashcardDialog();
  if (!dialog || !isTreeCheckbox(dialog, event.target)) return;
  applyTreeChange(dialog, event.target);
  updateSelection(dialog);
});

/** The answer a key stands for: 1–4 or A–D (by key position, so a Korean keyboard layout works too). */
function answerIndexOfKey(event: KeyboardEvent): number {
  const digit = /^(?:Digit|Numpad)([1-4])$/.exec(event.code);
  if (digit) return Number(digit[1]) - 1;
  const letter = /^Key([A-D])$/.exec(event.code);
  return letter ? ANSWER_LETTERS.indexOf(letter[1]) : -1;
}

document.addEventListener('keydown', event => {
  const dialog = flashcardDialog();
  if (!dialog?.open || dialog.dataset.flashcardScreen !== 'round') return;
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

// "cancel" (Esc) does not bubble, so it is caught on the way down.
document.addEventListener('cancel', event => {
  const dialog = flashcardDialog();
  if (event.target === dialog && dialog?.dataset.flashcardScreen === 'round') event.preventDefault();
}, true);

document.addEventListener('close', event => {
  if (event.target === flashcardDialog()) game = null;
}, true);

// A page change swaps the dialog away; close it first so the modal state does not linger.
document.addEventListener('astro:before-swap', () => {
  const dialog = flashcardDialog();
  if (dialog?.open) closeFlashcardDialog(dialog);
});
