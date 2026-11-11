// Browser behaviour of every page: theme, per-visitor progress ("Hol tartasz?"), the loading bar of page changes,
// the sticky lesson bar, the "← Vissza" button, the floating buttons and the flash on arriving at a grammar point.
// Progress and theme live in the visitor's localStorage (kg-progress, kg-hideFuture, kg-theme); keys kept from the old site.
//
// Pages change through Astro's ClientRouter: the sidebar, the floating buttons and the loading bar persist, the rest of
// the body is swapped. Listeners on document and window are set once; per-page work runs on "astro:page-load".
import { navigate } from 'astro:transitions/client';
import './lessonExport';

const BOOKS = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'];
const LESSON_KEY_PATTERN = /^([1-4][AB])-(\d+)$/;

const root = document.documentElement;
/** The body is replaced on every page change, so its data is always read fresh. */
const pageData = () => document.body.dataset;
const base = () => pageData().base ?? '';

function readStorage(key: string, storage: Storage = localStorage): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}
function writeStorage(key: string, value: string, storage: Storage = localStorage): void {
  try {
    storage.setItem(key, value);
  } catch {
    // Storage blocked (private window, disabled site data): the page works without remembering.
  }
}

const positionOf = (book: string, lesson: string | number) => BOOKS.indexOf(book) * 100 + Number(lesson);
const lessonUrl = (book: string, lesson: string | number) => `${base()}/${book.toLowerCase()}/${lesson}/`;

// Persistent elements (they survive page changes).
const progressSelect = document.getElementById('progress-select') as HTMLSelectElement;
const hideFutureCheckbox = document.getElementById('hide-future') as HTMLInputElement;
const sidebar = document.getElementById('sidebar')!;
const toTopButton = document.getElementById('to-top')!;
const loadingBar = document.getElementById('navigation-progress')!;
const lessonKeys = Array.from(progressSelect.options).map(option => option.value).filter(value => LESSON_KEY_PATTERN.test(value));

// ---------- theme ----------
document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const isDark = current ? current === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const next = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  writeStorage('kg-theme', next);
});
// A page change copies the new page's <html> attributes; keep the chosen theme on it.
document.addEventListener('astro:before-swap', event => {
  const theme = readStorage('kg-theme');
  if (theme) event.newDocument.documentElement.setAttribute('data-theme', theme);
});

// ---------- loading bar: appears if the new page takes longer than a moment ----------
let loadingTimer: ReturnType<typeof setTimeout> | undefined;
/** 'traverse' = browser back/forward: the router restores the scroll position, so the page must not jump to the hash. */
let navigationType = 'initial';
document.addEventListener('astro:before-preparation', event => {
  navigationType = event.navigationType;
  clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => loadingBar.classList.add('loading'), 100);
});
document.addEventListener('astro:after-swap', () => {
  clearTimeout(loadingTimer);
  loadingBar.classList.remove('loading');
});

// The persisted menu is moved into the new body, which resets its scroll position: keep it.
let sidebarScrollTop = 0;
document.addEventListener('astro:before-swap', () => { sidebarScrollTop = sidebar.scrollTop; });
document.addEventListener('astro:after-swap', () => { sidebar.scrollTop = sidebarScrollTop; });

// ---------- progress ----------
/** Book and lesson a link points to: "/base/3a/9/#point-1", or "#point-1" on the current lesson page. */
function linkTarget(link: HTMLAnchorElement): [string, string] | null {
  const href = link.getAttribute('href') ?? '';
  if (href.startsWith('#point-') && pageData().book) return [pageData().book!, pageData().lesson ?? ''];
  const match = /\/([1-4][ab])\/(\d+)\/(?:#point-\d+)?$/i.exec(href);
  return match ? [match[1].toUpperCase(), match[2]] : null;
}

function applyProgress(value: string): void {
  const all = value === 'ALL';
  const lessonMatch = LESSON_KEY_PATTERN.exec(value);
  const current = all ? Infinity : lessonMatch ? positionOf(lessonMatch[1], lessonMatch[2]) : null;
  let done = 0;
  let future = 0;
  const mark = (element: Element, book: string, lesson: string) => {
    const position = positionOf(book, lesson);
    const isFuture = current !== null && position > current;
    const isDone = current !== null && position < current;
    element.classList.toggle('future', isFuture);
    element.classList.toggle('done', isDone);
    return { isFuture, isDone, isCurrent: current !== null && position === current };
  };
  document.querySelectorAll<HTMLElement>('.grammar-point[data-book]').forEach(element => mark(element, element.dataset.book!, element.dataset.lesson!));
  document.querySelectorAll<HTMLElement>('.lesson[data-book]').forEach(element => {
    const state = mark(element, element.dataset.book!, element.dataset.lesson!);
    element.classList.toggle('current', state.isCurrent);
    const button = element.querySelector<HTMLElement>('.set-current-button');
    if (button) button.hidden = state.isCurrent; // the current lesson shows the "itt tartasz" tag instead
  });
  document.querySelectorAll<HTMLElement>('.contents-book li[data-book]').forEach(element => {
    const state = mark(element, element.dataset.book!, element.dataset.lesson!);
    element.classList.toggle('current-lesson', state.isCurrent);
    if (current !== null) {
      if (state.isDone) done++;
      else future++;
    }
  });
  document.querySelectorAll<HTMLElement>('tr.pronunciation-row[data-book]').forEach(element => mark(element, element.dataset.book!, element.dataset.lesson!));
  document.querySelectorAll<HTMLAnchorElement>('a.cross-reference, a.related-link, a.group-link').forEach(link => {
    const target = linkTarget(link);
    link.classList.toggle('future', !!target && current !== null && positionOf(target[0], target[1]) > current);
  });
  document.querySelectorAll<HTMLElement>('.progress-only').forEach(element => { element.hidden = current === null; });
  document.querySelectorAll<HTMLElement>('.progress-none-only').forEach(element => { element.hidden = current !== null; });
  document.querySelectorAll<HTMLElement>('.progress-current-label').forEach(element => { element.textContent = lessonMatch ? `${lessonMatch[1]} ${lessonMatch[2]}` : ''; });
  document.querySelectorAll<HTMLAnchorElement>('.progress-current-link').forEach(link => link.setAttribute('href', lessonMatch ? lessonUrl(lessonMatch[1], lessonMatch[2]) : '#'));
  // "Mindet vettük": no current lesson, so the "itt tartasz" link and button disappear.
  document.querySelectorAll<HTMLElement>('.progress-current-only').forEach(element => { element.hidden = !lessonMatch; });
  const doneStat = document.getElementById('stat-done');
  const futureStat = document.getElementById('stat-future');
  if (doneStat) doneStat.textContent = String(done);
  if (futureStat) futureStat.textContent = String(future);
  if (current === null) {
    hideFutureCheckbox.checked = false;
    document.body.classList.remove('future-hidden');
  } else {
    hideFutureCheckbox.checked = readStorage('kg-hideFuture') === '1';
    document.body.classList.toggle('future-hidden', hideFutureCheckbox.checked);
  }
}

function setProgress(value: string): void {
  progressSelect.value = value;
  writeStorage('kg-progress', value);
  applyProgress(value);
  const match = LESSON_KEY_PATTERN.exec(value);
  const menuBook = match && document.querySelector<HTMLDetailsElement>(`.contents-book[data-book="${match[1]}"]`);
  if (menuBook) menuBook.open = true;
}

function savedProgress(): string {
  const saved = readStorage('kg-progress') ?? '';
  return Array.from(progressSelect.options).some(option => option.value === saved) ? saved : '';
}

// Choosing a lesson in "Hol tartasz?" sets the progress and opens that lesson's page.
progressSelect.addEventListener('change', () => {
  setProgress(progressSelect.value);
  const match = LESSON_KEY_PATTERN.exec(progressSelect.value);
  if (match) {
    rememberOrigin(lessonUrl(match[1], match[2]));
    navigate(lessonUrl(match[1], match[2]));
  }
});

// "◎ Itt tartok": the progress moves to this lesson (the floating ◎ button then leads here).
document.addEventListener('click', event => {
  const button = (event.target as Element).closest<HTMLElement>('.set-current-button');
  if (!button) return;
  event.preventDefault();
  if (lessonKeys.includes(button.dataset.lessonKey ?? '')) setProgress(button.dataset.lessonKey!);
});

hideFutureCheckbox.addEventListener('change', () => {
  document.body.classList.toggle('future-hidden', hideFutureCheckbox.checked);
  writeStorage('kg-hideFuture', hideFutureCheckbox.checked ? '1' : '0');
});

// ---------- the menu follows the page: highlight the shown lesson and open its book ----------
function highlightMenu(): void {
  const { book, lesson } = pageData();
  sidebar.querySelectorAll<HTMLAnchorElement>('.contents-book li[data-book] > a').forEach(link => {
    const item = link.parentElement!;
    link.classList.toggle('active', !!book && item.dataset.book === book && item.dataset.lesson === lesson);
  });
  if (book) {
    const menuBook = sidebar.querySelector<HTMLDetailsElement>(`.contents-book[data-book="${book}"]`);
    if (menuBook) menuBook.open = true;
  }
}

// ---------- arriving at an element: open its collapsed parents, flash a grammar point ----------
function openParents(element: Element): void {
  let details = element.closest('details');
  while (details) {
    details.open = true;
    details = details.parentElement?.closest('details') ?? null;
  }
}

/** smooth: true for jumps within the page; arriving from another page lands on the target at once. */
function arriveAt(id: string, smooth: boolean): void {
  const element = id ? document.getElementById(id) : null;
  if (!element) return;
  // A hidden ("not yet learned") target: switch hiding off, otherwise the link would lead nowhere.
  if (document.body.classList.contains('future-hidden') && element.closest('.future')) {
    hideFutureCheckbox.checked = false;
    document.body.classList.remove('future-hidden');
    writeStorage('kg-hideFuture', '0');
  }
  openParents(element);
  element.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' });
  if (element.classList.contains('grammar-point')) {
    element.classList.remove('flash');
    void element.offsetWidth; // restart the animation
    element.classList.add('flash');
    setTimeout(() => element.classList.remove('flash'), 1700);
  }
}

window.addEventListener('hashchange', () => arriveAt(decodeURIComponent(location.hash.slice(1)), true));
window.addEventListener('beforeprint', () => document.querySelectorAll('details').forEach(details => { details.open = true; }));

// ---------- "← Vissza" button ----------
// A link click on the site records where it came from; the next page shows the button only if it is that link's target.
interface Origin {
  target: string;
  label: string;
}
const ORIGIN_KEY = 'kg-origin';
const normalizedUrl = (url: string) => {
  const parsed = new URL(url, location.href);
  return parsed.pathname + parsed.hash;
};

function rememberOrigin(target: string): void {
  const origin: Origin = { target: normalizedUrl(target), label: pageData().pageLabel ?? '' };
  writeStorage(ORIGIN_KEY, JSON.stringify(origin), sessionStorage);
}

document.addEventListener('click', event => {
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
  // The router's own click handler runs first and cancels the default action, so defaultPrevented is not checked here.
  if (!link || link.target) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname === location.pathname) return;
  rememberOrigin(url.href);
});

function showBackButton(): void {
  const backButton = document.getElementById('back-button') as HTMLButtonElement | null;
  if (!backButton) return;
  let origin: Origin | null = null;
  try {
    origin = JSON.parse(readStorage(ORIGIN_KEY, sessionStorage) ?? 'null');
  } catch {
    origin = null;
  }
  if (origin && origin.target === normalizedUrl(location.href) && history.length > 1) {
    backButton.querySelector('.back-label')!.textContent = origin.label ? `: ${origin.label}` : '';
    backButton.hidden = false;
    backButton.addEventListener('click', () => history.back());
  }
}

// ---------- floating "↑" button: visible only on a scrolled page ----------
const updateToTop = () => toTopButton.classList.toggle('faded-out', window.scrollY < 400);
window.addEventListener('scroll', updateToTop, { passive: true });
toTopButton.addEventListener('click', () => {
  history.replaceState(history.state, '', location.pathname + location.search);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- sticky lesson bar ----------
// Shown once the lesson header has scrolled out while the lesson still continues ("stuck").
// "scrolling-down": on mobile the bar hides while scrolling down.
let lastScrollY = window.scrollY;
let stickyUpdateQueued = false;
function updateSticky(): void {
  stickyUpdateQueued = false;
  const y = window.scrollY;
  if (Math.abs(y - lastScrollY) > 8) {
    document.body.classList.toggle('scrolling-down', y > lastScrollY);
    lastScrollY = y;
  }
  const lessonPage = document.querySelector<HTMLElement>('.lesson-page');
  if (!lessonPage) return;
  const header = lessonPage.querySelector('.lesson-header')!.getBoundingClientRect();
  const lesson = lessonPage.getBoundingClientRect();
  lessonPage.classList.toggle('stuck', header.bottom < 0 && lesson.bottom > 36);
}
window.addEventListener('scroll', () => {
  if (!stickyUpdateQueued) {
    stickyUpdateQueued = true;
    requestAnimationFrame(updateSticky);
  }
}, { passive: true });
document.addEventListener('click', event => {
  if (!(event.target as Element).closest('.lesson-sticky-bar')) return;
  document.querySelector('.lesson-page')?.scrollIntoView({ block: 'start' });
});

// ---------- mobile menu ----------
document.getElementById('sidebar-toggle')?.addEventListener('click', () => sidebar.classList.toggle('open'));
sidebar.addEventListener('click', event => {
  if ((event.target as Element).closest('a') && innerWidth <= 900) sidebar.classList.remove('open');
});

// ---------- every page (first load and each page change) ----------
let firstLoad = true;
document.addEventListener('astro:page-load', () => {
  const saved = savedProgress();
  progressSelect.value = saved;
  applyProgress(saved);
  if (firstLoad) {
    const match = LESSON_KEY_PATTERN.exec(saved);
    const menuBook = match && document.querySelector<HTMLDetailsElement>(`.contents-book[data-book="${match[1]}"]`);
    if (menuBook) menuBook.open = true;
    firstLoad = false;
  }
  highlightMenu();
  showBackButton();
  updateToTop();
  updateSticky();
  if (location.hash && navigationType !== 'traverse') arriveAt(decodeURIComponent(location.hash.slice(1)), false);
});
