import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Basics from '../components/basics/Basics.astro';
import LessonPoint from '../components/lessonpoint/LessonPoint.astro';
import { isPointId, LESSONS, POINT_COUNT } from './content';
import { linkTargets } from './crossReferences';
import { getSite, hrefOf } from './site';

const site = getSite();
const points = LESSONS.flatMap(lesson => lesson.points);

/** Link sources by global id: grammar point cards, basic rule cards and honorific word cards. */
const sections = new Map<string, string>();
const container = await AstroContainer.create();
for (const point of points) sections.set(point.id, await container.renderToString(LessonPoint, { props: { point } }));
const basicsHtml = await container.renderToString(Basics);
for (const match of basicsHtml.matchAll(/<h3 id="(rule-\d+)"[\s\S]*?(?=<h3 id="rule-|$)/g))
  sections.set(match[1], match[0]);
for (const match of site.honorificsHtml.matchAll(
  /<h3 id="(honorific-category-\d+)"[\s\S]*?(?=<h3 id="honorific-category-|$)/g
))
  sections.set(match[1], match[0]);

/** The global id of a link: the components write page links, the honorifics HTML still has global ids. */
const idByHref = new Map([...linkTargets.keys()].map(id => [hrefOf(id), id]));
function targetId(href: string, from: string): string | undefined {
  if (from.startsWith('honorific-category-')) return href.slice(1);
  return idByHref.get(href.startsWith('#') ? hrefOf(from).split('#')[0] + href : href);
}

describe('content', () => {
  it('has all 188 grammar points', () => {
    expect(POINT_COUNT).toBe(188);
    expect([...sections.keys()].filter(isPointId)).toHaveLength(188);
  });

  it('renders without content problems', () => {
    expect(site.problems).toEqual([]);
  });

  it('has no dead cross-references and every reference shows up in reverse in the "Kapcsolódó pontok" bar', () => {
    const errors: string[] = [];
    const linkedIds = (from: string, className: string) => {
      const found = new Set<string>();
      for (const [, href] of sections
        .get(from)!
        .matchAll(new RegExp(`<a class="${className}[^"]*" href="([^"]+)"`, 'g'))) {
        const id = targetId(href, from);
        if (id && linkTargets.has(id)) found.add(id);
        else errors.push(`${from}: dead link ${href}`);
      }
      return found;
    };
    const outgoing = new Map([...sections.keys()].map(id => [id, linkedIds(id, 'cross-reference')]));
    const related = new Map([...sections.keys()].map(id => [id, linkedIds(id, 'related-link')]));
    for (const [from, targets] of outgoing) {
      if (targets.has(from)) errors.push(`${from}: links to itself`);
      for (const to of targets) {
        if (isPointId(to) && !related.get(to)?.has(from)) errors.push(`${to}: related bar misses ${from}`);
        if (isPointId(from) && !related.get(from)?.has(to)) errors.push(`${from}: related bar misses outgoing ${to}`);
      }
    }
    expect(errors).toEqual([]);
    // Without links the checks above would pass on empty sets.
    expect(points.filter(point => outgoing.get(point.id)!.size).length).toBeGreaterThan(50);
    expect(points.filter(point => related.get(point.id)!.size).length).toBeGreaterThan(100);
  });

  it('translates every Korean form in the honorific sections', () => {
    const errors: string[] = [];
    let sectionCount = 0;
    for (const [id, html] of sections) {
      const section = html.match(/<section class="honorific"[\s\S]*?<\/section>/);
      if (!section) continue;
      sectionCount++;
      // Incorrect samples need a reason, not a translation (checked by checkCorrectIncorrect).
      const withoutParagraphs = section[0]
        .replace(/<p>[\s\S]*?<\/p>/g, '')
        .replace(/<li class="incorrect">[\s\S]*?<\/li>/g, '');
      const examples = (withoutParagraphs.match(/<ul class="examples"[\s\S]*?<\/ul>/) ?? [''])[0];
      if ((examples.match(/<li\b/g) ?? []).length < 2) errors.push(`${id}: fewer than 2 examples`);
      for (const korean of withoutParagraphs.matchAll(
        /<span class="korean"[^>]*>([\s\S]*?)<\/span>(\s*<span class="(?:translation|hungarian)")?/g
      )) {
        if (!korean[2]) errors.push(`${id}: without translation: ${korean[1]}`);
      }
    }
    expect(errors).toEqual([]);
    expect(sectionCount).toBe(points.filter(point => point.honorific).length);
  });
});
