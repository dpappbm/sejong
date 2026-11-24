// The play buttons of the Korean texts and the voice menu. One Audio object plays everything, and a file is loaded only
// when its button is pressed. The menu persists through page changes, the buttons are swapped with the page.
const VOICE_KEY = 'kg-voice';

const audio = new Audio();
/** Missing when the site was built without sound files. */
const voiceSelect = document.getElementById('voice-select') as HTMLSelectElement | null;
/** The button being played. */
let playing: HTMLButtonElement | null = null;
/** The button pressed last on this page: a new voice repeats it. */
let last: HTMLButtonElement | null = null;

function stop(): void {
  audio.pause();
  if (playing) {
    playing.classList.remove('playing');
    playing.removeAttribute('aria-pressed');
  }
  playing = null;
}

function fail(button: HTMLButtonElement): void {
  if (playing === button) stop();
  button.classList.add('failed');
  button.title = 'A hang most nem tölthető be';
}

function play(button: HTMLButtonElement): void {
  stop();
  if (!voiceSelect) return;
  playing = last = button;
  button.classList.remove('failed');
  button.title = 'Meghallgatás (gépi hang)';
  button.classList.add('playing');
  button.setAttribute('aria-pressed', 'true');
  audio.src = `${document.body.dataset.base ?? ''}/audio/${voiceSelect.value}/${button.dataset.sound}.mp3`;
  audio.play().catch((error: DOMException) => {
    // AbortError: stopped or replaced by another text before it could start
    if (error.name !== 'AbortError') fail(button);
  });
}

/** A text that the chosen voice says wrong has no button. */
function hideExcluded(): void {
  document.querySelectorAll<HTMLElement>('.sound-button[data-without]').forEach(button => {
    button.hidden = button.dataset.without!.split(' ').includes(voiceSelect?.value ?? '');
  });
}

audio.addEventListener('ended', stop);
audio.addEventListener('error', () => {
  if (playing) fail(playing);
});

document.addEventListener('click', event => {
  const button = (event.target as Element).closest<HTMLButtonElement>('.sound-button');
  if (!button) return;
  if (button === playing) stop();
  else play(button);
});

if (voiceSelect) {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(VOICE_KEY);
  } catch {
    // Storage blocked: the first voice is used.
  }
  if (Array.from(voiceSelect.options).some(option => option.value === saved)) voiceSelect.value = saved!;
  voiceSelect.addEventListener('change', () => {
    try {
      localStorage.setItem(VOICE_KEY, voiceSelect.value);
    } catch {
      // Storage blocked: the choice lasts until the page is left.
    }
    stop();
    hideExcluded();
    if (last && !last.hidden) play(last);
  });
}

document.addEventListener('astro:before-swap', () => {
  stop();
  last = null;
});
document.addEventListener('astro:page-load', hideExcluded);
