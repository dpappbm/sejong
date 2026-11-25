// Renders the whole content once (cross-references need the full link graph) and serves it page by page.
import { basicRules, type BasicRule } from '../data/basics';
import honorifics from '../data/honorifics';
import pronunciation from '../data/pronunciation';
import { CHAPTER_PATHS, hrefFrom, LESSONS, locate, withBase, type LessonInfo, type PointInfo } from './content';
import { completeEdges, indexPoints, linkSegment, linkTargets } from './crossReferences';
import { checkPoint } from './pointChecks';
import { problems } from './problems';
import { correctIncorrectList } from './render/correctIncorrect';
import { checkForwardReferences, forwardMark } from './render/forwardReferences';
import { checkGroups } from './render/groups';
import { honorificsChapter, honorificsIntro } from './render/honorifics';
import { pronunciationBox, pronunciationChapter } from './render/pronunciation';
import { checkVocabulary, registerVocabularyForwardReferences } from './render/vocabulary';

export interface LessonContent extends LessonInfo {
  /** Pronunciation box of the lesson. */
  html: string;
}

export interface SiteContent {
  lessons: LessonContent[];
  pronunciationHtml: string;
  honorificsHtml: string;
  problems: string[];
}

/** Every rule becomes a link target; this has to precede the references that point to the rules. */
function registerRuleTargets(): void {
  for (const { id, title } of basicRules)
    linkTargets.set(id, { label: 'Alapszabályok', form: title, plain: true, title: `Alapszabályok · ${title}` });
}

/** The same for the rules as registerPointReferences() for the points. */
function registerRuleReferences(rule: BasicRule): void {
  for (const row of rule.referenceRows) linkSegment(`<tr>${row.join('')}</tr>`, rule.id);
}

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
  registerRuleTargets();
  basicRules.forEach(registerRuleReferences);
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
  site = { lessons, pronunciationHtml, honorificsHtml, problems };
  return site;
}

/**
 * Turns global ids into page links for the page at pagePath: href="#3A-09-1" → "/3a/9/#point-1"
 * (or just "#point-1" on the same page), and id="3A-09-1" → id="point-1".
 */
export function localizeLinks(html: string, pagePath: string): string {
  return html
    .replace(/href="#([^"]+)"/g, (match, id: string) => {
      const href = hrefFrom(id, pagePath);
      return href ? `href="${href}"` : match;
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
  return [
    {
      path: CHAPTER_PATHS.basics,
      symbol: '★',
      title: 'Alapszabályok',
      ownTag: '＋ Saját összefoglaló',
      description: 'Szótő és 받침, a -아/어 összevonás, rendhagyó igék, partikulák, jelzői alakok és beszédszintek.',
      items: basicRules.map(({ id, title }) => ({ label: title, href: hrefOf(id) })),
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
