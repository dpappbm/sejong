// Renders the whole content once (cross-references need the full link graph) and serves it page by page.
import { basicsHtml } from '../data/basics';
import { lexiconEntry, translatedCell, wordGloss } from './translations';
import honorifics from '../data/honorifics';
import pronunciation from '../data/pronunciation';
import { CHAPTER_PATHS, LESSONS, locate, withBase, type LessonInfo } from './content';
import { fillRelatedBars, indexPoints, linkSegment, linkTargets, relatedPlaceholder } from './crossReferences';
import { disclosureArrow, stripTags, translationLine } from './html';
import { problems } from './problems';
import { checkForwardReferences } from './render/forwardReferences';
import { checkGroups } from './render/groups';
import { honorificsChapter, honorificsIntro } from './render/honorifics';
import { renderPoint } from './render/point';
import { pronunciationBox, pronunciationChapter } from './render/pronunciation';
import { checkVocabulary, vocabularyBox } from './render/vocabulary';

export interface LessonContent extends LessonInfo {
  /** Grammar points, pronunciation box and vocabulary bar of the lesson. */
  html: string;
}

export interface SiteContent {
  lessons: LessonContent[];
  basicsHtml: string;
  pronunciationHtml: string;
  honorificsHtml: string;
  problems: string[];
}

function renderBasics(): string {
  let html = basicsHtml({
    translatedCell: (korean, dictionaryForm, pattern, where) => {
      const entry = lexiconEntry(dictionaryForm);
      return translatedCell(korean, dictionaryForm, entry ? { [entry.wordClass]: pattern } : null, 'Alapszabályok' + (where ? ' ' + where : ''));
    },
    wordGloss: dictionaryForm => wordGloss(dictionaryForm, 'Alapszabályok'),
    translation: translationLine,
  });
  // Every rule card gets an id and becomes a link target.
  html = html.replace(/<h3>(\d+)\. ([\s\S]*?)<\/h3>/g, (_match, number: string, title: string) => {
    const plainTitle = `${number}. ${stripTags(title)}`;
    linkTargets.set('rule-' + number, { label: 'Alapszabályok', form: plainTitle, plain: true, title: `Alapszabályok · ${plainTitle}` });
    return `<summary>${disclosureArrow}<h3 id="rule-${number}">${number}. ${title}</h3></summary>`;
  });
  // On its own page every card starts open.
  return html.replace(/<details class="card">/g, '<details class="card" open>');
}

/** Links the references of each rule card and places its "Kapcsolódó pontok" bar before the card's end. */
const linkBasics = (html: string) => html.replace(/(<h3 id="(rule-\d+)"[\s\S]*?)(?=<h3 id="rule-|$)/g, (_match, segment: string, id: string) => {
  const linked = linkSegment(segment, id);
  const cardEnd = linked.lastIndexOf('</details>');
  return cardEnd < 0 ? linked + relatedPlaceholder(id) : linked.slice(0, cardEnd) + relatedPlaceholder(id) + linked.slice(cardEnd);
});

/** Links the references inside each grammar point's body (up to its related-bar placeholder). */
const linkPoints = (html: string) => html.replace(
  /(<article class="grammar-point[^"]*" id="([^"]+)"[\s\S]*?<div class="grammar-point-body">)([\s\S]*?)(<!--related:\2-->)/g,
  (_match, head: string, id: string, body: string, placeholder: string) => head + linkSegment(body, id) + placeholder,
);

let site: SiteContent | null = null;

export function getSite(): SiteContent {
  if (site) return site;
  indexPoints();
  const lessonParts = LESSONS.map(lesson => ({
    lesson,
    points: lesson.points.map(renderPoint).join(''),
    rest: pronunciationBox(lesson.book, lesson.lesson, lesson.title) + vocabularyBox(lesson.book, lesson.lesson),
  }));
  checkGroups();
  const pronunciationHtml = pronunciationChapter();
  const honorificsHtml = honorificsIntro + honorificsChapter();
  checkForwardReferences();
  checkVocabulary();
  const basics = linkBasics(renderBasics());
  const lessons = lessonParts.map(({ lesson, points, rest }) => ({ ...lesson, html: linkPoints(points) + rest }));
  site = {
    lessons: lessons.map(lesson => ({ ...lesson, html: fillRelatedBars(lesson.html) })),
    basicsHtml: fillRelatedBars(basics),
    pronunciationHtml,
    honorificsHtml,
    problems,
  };
  return site;
}

/**
 * Turns global ids into page links for the page at pagePath: href="#3A-09-1" → "/3a/9/#point-1"
 * (or just "#point-1" on the same page), and id="3A-09-1" → id="point-1".
 */
export function localizeLinks(html: string, pagePath: string): string {
  return html
    .replace(/href="#([^"]+)"/g, (match, id: string) => {
      const location = locate(id);
      if (!location) return match;
      if (location.path === pagePath) return `href="#${location.anchor}"`;
      return `href="${withBase(location.path)}${location.anchor ? '#' + location.anchor : ''}"`;
    })
    .replace(/ id="([^"]+)"/g, (match, id: string) => {
      const location = locate(id);
      return location && location.path === pagePath && location.anchor ? ` id="${location.anchor}"` : match;
    });
}

export interface ChapterOutline {
  path: string;
  symbol: string;
  title: string;
  korean?: string;
  ownTag?: string;
  description: string;
  /** The chapter's cards, each linking to its place on the chapter page. */
  items: { label: string; href: string }[];
}

const hrefOf = (id: string) => {
  const location = locate(id)!;
  return withBase(location.path) + (location.anchor ? '#' + location.anchor : '');
};

/** The three chapters for the home page cards. */
export function chapterOutline(): ChapterOutline[] {
  getSite(); // registers the rule titles as link targets
  const rules = [...linkTargets.entries()].filter(([id]) => id.startsWith('rule-')).sort(([a], [b]) => Number(a.slice(5)) - Number(b.slice(5)));
  return [
    {
      path: CHAPTER_PATHS.basics, symbol: '★', title: 'Alapszabályok', ownTag: '＋ Saját összefoglaló',
      description: 'Szótő és 받침, a -아/어 összevonás, rendhagyó igék, partikulák, jelzői alakok és beszédszintek.',
      items: rules.map(([id, target]) => ({ label: target.form, href: hrefOf(id) })),
    },
    {
      path: CHAPTER_PATHS.pronunciation, symbol: '♪', title: 'Kiejtés', korean: '발음',
      description: 'A tankönyvi „발음” dobozok szabálytípus szerint, a leckék példáival.',
      items: pronunciation.categories.map(category => ({ label: category.hungarian, href: hrefOf('pronunciation-' + category.id) })),
    },
    {
      path: CHAPTER_PATHS.honorifics, symbol: '◆', title: 'Tiszteleti szavak', korean: '높임말', ownTag: '＋ Saját összeállítás',
      description: 'Tiszteleti és szerény szópárok: partikulák, főnevek, igék, szerény alakok és megszólítás.',
      items: honorifics.categories.map((category, index) => ({ label: category.hungarian, href: hrefOf(`honorific-category-${index + 1}`) })),
    },
  ];
}
