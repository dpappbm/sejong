// Renders the whole content once (cross-references need the full link graph) and serves it page by page.
import { basicsHtml } from '../data/basics';
import honorifics from '../data/honorifics';
import pronunciation from '../data/pronunciation';
import { CHAPTER_PATHS, LESSONS, locate, withBase, type LessonInfo, type PointInfo } from './content';
import {
  completeEdges,
  fillRelatedBars,
  indexPoints,
  linkSegment,
  linkTargets,
  relatedPlaceholder,
} from './crossReferences';
import { disclosureArrow, stripTags, translationLine } from './html';
import { checkPoint } from './pointChecks';
import { problems } from './problems';
import { correctIncorrectList } from './render/correctIncorrect';
import { checkForwardReferences, forwardMark } from './render/forwardReferences';
import { checkGroups } from './render/groups';
import { honorificsChapter, honorificsIntro } from './render/honorifics';
import { pronunciationBox, pronunciationChapter } from './render/pronunciation';
import { checkVocabulary, registerVocabularyForwardReferences } from './render/vocabulary';
import { lexiconEntry, translatedCell, wordGloss } from './translations';

export interface LessonContent extends LessonInfo {
  /** Pronunciation box of the lesson. */
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
      return translatedCell(
        korean,
        dictionaryForm,
        entry ? { [entry.wordClass]: pattern } : null,
        'Alapszabályok' + (where ? ' ' + where : '')
      );
    },
    wordGloss: dictionaryForm => wordGloss(dictionaryForm, 'Alapszabályok'),
    translation: translationLine,
  });
  // Every rule card gets an id and becomes a link target.
  html = html.replace(/<h3>(\d+)\. ([\s\S]*?)<\/h3>/g, (_match, number: string, title: string) => {
    const plainTitle = `${number}. ${stripTags(title)}`;
    linkTargets.set('rule-' + number, {
      label: 'Alapszabályok',
      form: plainTitle,
      plain: true,
      title: `Alapszabályok · ${plainTitle}`,
    });
    return `<summary>${disclosureArrow}<h3 id="rule-${number}">${number}. ${title}</h3></summary>`;
  });
  // On its own page every card starts open.
  return html.replace(/<details class="card">/g, '<details class="card" open>');
}

/** Links the references of each rule card and places its "Kapcsolódó pontok" bar before the card's end. */
const linkBasics = (html: string) =>
  html.replace(/(<h3 id="(rule-\d+)"[\s\S]*?)(?=<h3 id="rule-|$)/g, (_match, segment: string, id: string) => {
    const linked = linkSegment(segment, id);
    const cardEnd = linked.lastIndexOf('</details>');
    return cardEnd < 0
      ? linked + relatedPlaceholder(id)
      : linked.slice(0, cardEnd) + relatedPlaceholder(id) + linked.slice(cardEnd);
  });

/** The components render after getSite(), so the references of the points are registered here in advance. */
function registerPointReferences(point: PointInfo): void {
  const texts = [
    point.explanation,
    point.customHtml,
    point.ownNote,
    point.honorific?.note,
    correctIncorrectList(point.correctIncorrect),
    correctIncorrectList(point.honorific?.correctIncorrect),
  ];
  for (const text of texts) linkSegment(text ?? '', point.id);
  for (const [korean] of point.examples ?? []) forwardMark(point.id, korean);
}

let site: SiteContent | null = null;

export function getSite(): SiteContent {
  if (site) return site;
  indexPoints();
  const basics = linkBasics(renderBasics()); // registers the rules as link targets
  const lessons = LESSONS.map(lesson => ({
    ...lesson,
    html: pronunciationBox(lesson.book, lesson.lesson, lesson.title),
  }));
  for (const point of LESSONS.flatMap(lesson => lesson.points)) {
    checkPoint(point);
    registerPointReferences(point);
  }
  checkGroups();
  const pronunciationHtml = pronunciationChapter();
  const honorificsHtml = honorificsIntro + honorificsChapter();
  registerVocabularyForwardReferences();
  checkForwardReferences();
  checkVocabulary();
  completeEdges();
  site = { lessons, basicsHtml: fillRelatedBars(basics), pronunciationHtml, honorificsHtml, problems };
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

/** localizeLinks() for the page of a grammar point. */
export const localizePointLinks = (html: string, pointId: string) => localizeLinks(html, locate(pointId)!.path);

/** Links the lesson references in a text of a grammar point. */
export const linkPointText = (html: string, pointId: string) => localizePointLinks(linkSegment(html, pointId), pointId);

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

export const hrefOf = (id: string) => {
  const location = locate(id)!;
  return withBase(location.path) + (location.anchor ? '#' + location.anchor : '');
};

/** The three chapters for the home page cards. */
export function chapterOutline(): ChapterOutline[] {
  getSite(); // registers the rule titles as link targets
  const rules = [...linkTargets.entries()]
    .filter(([id]) => id.startsWith('rule-'))
    .sort(([a], [b]) => Number(a.slice(5)) - Number(b.slice(5)));
  return [
    {
      path: CHAPTER_PATHS.basics,
      symbol: '★',
      title: 'Alapszabályok',
      ownTag: '＋ Saját összefoglaló',
      description: 'Szótő és 받침, a -아/어 összevonás, rendhagyó igék, partikulák, jelzői alakok és beszédszintek.',
      items: rules.map(([id, target]) => ({ label: target.form, href: hrefOf(id) })),
    },
    {
      path: CHAPTER_PATHS.pronunciation,
      symbol: '♪',
      title: 'Kiejtés',
      korean: '발음',
      description: 'A tankönyvi „발음” dobozok szabálytípus szerint, a leckék példáival.',
      items: pronunciation.categories.map(category => ({
        label: category.hungarian,
        href: hrefOf('pronunciation-' + category.id),
      })),
    },
    {
      path: CHAPTER_PATHS.honorifics,
      symbol: '◆',
      title: 'Tiszteleti szavak',
      korean: '높임말',
      ownTag: '＋ Saját összeállítás',
      description: 'Tiszteleti és szerény szópárok: partikulák, főnevek, igék, szerény alakok és megszólítás.',
      items: honorifics.categories.map((category, index) => ({
        label: category.hungarian,
        href: hrefOf(`honorific-category-${index + 1}`),
      })),
    },
  ];
}
