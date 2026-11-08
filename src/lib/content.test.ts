import { describe, expect, it } from 'vitest';
import { POINT_COUNT } from './content';
import { getSite } from './site';

const site = getSite();
const allHtml = [site.basicsHtml, site.pronunciationHtml, site.honorificsHtml, ...site.lessons.map(lesson => lesson.html)].join('\n');
const ids = new Set([...allHtml.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]));

/** Link sources: grammar point cards, basic rule cards and honorific word cards. */
function sections(): { id: string; html: string }[] {
  const found: { id: string; html: string }[] = [];
  for (const match of allHtml.matchAll(/<article class="grammar-point[^"]*" id="([^"]+)"[\s\S]*?<\/article>/g)) found.push({ id: match[1], html: match[0] });
  for (const match of site.basicsHtml.matchAll(/<h3 id="(rule-\d+)"[\s\S]*?(?=<h3 id="rule-|$)/g)) found.push({ id: match[1], html: match[0] });
  for (const match of site.honorificsHtml.matchAll(/<h3 id="(honorific-category-\d+)"[\s\S]*?(?=<h3 id="honorific-category-|$)/g)) found.push({ id: match[1], html: match[0] });
  return found;
}

describe('content', () => {
  it('has all 188 grammar points', () => {
    expect(POINT_COUNT).toBe(188);
  });

  it('renders without content problems', () => {
    expect(site.problems).toEqual([]);
  });

  it('has no dead cross-references and every reference shows up in reverse in the "Kapcsolódó pontok" bar', () => {
    const errors: string[] = [];
    const outgoing = new Map<string, Set<string>>();
    const related = new Map<string, Set<string>>();
    for (const section of sections()) {
      outgoing.set(section.id, new Set());
      related.set(section.id, new Set());
      for (const link of section.html.matchAll(/<a class="cross-reference[^"]*" href="#([^"]+)"/g)) {
        if (!ids.has(link[1])) errors.push(`${section.id}: dead link #${link[1]}`);
        if (link[1] === section.id) errors.push(`${section.id}: links to itself`);
        outgoing.get(section.id)!.add(link[1]);
      }
      const bar = section.html.match(/<nav class="related"[\s\S]*?<\/nav>/);
      for (const link of bar?.[0].matchAll(/href="#([^"]+)"/g) ?? []) {
        if (!ids.has(link[1])) errors.push(`${section.id}: dead related link #${link[1]}`);
        related.get(section.id)!.add(link[1]);
      }
    }
    const isPoint = (id: string) => /^[1-4][AB]-\d\d-\d$/.test(id);
    for (const [from, targets] of outgoing) {
      for (const to of targets) {
        if (isPoint(to) && !related.get(to)?.has(from)) errors.push(`${to}: related bar misses ${from}`);
        if (isPoint(from) && !related.get(from)?.has(to)) errors.push(`${from}: related bar misses outgoing ${to}`);
      }
    }
    expect(errors).toEqual([]);
  });

  it('translates every Korean form in the honorific sections', () => {
    const errors: string[] = [];
    for (const article of allHtml.matchAll(/<article class="grammar-point[^"]*" id="([^"]+)"[\s\S]*?<\/article>/g)) {
      const section = article[0].match(/<section class="honorific">[\s\S]*?<\/section>/);
      if (!section) continue;
      const withoutParagraphs = section[0].replace(/<p>[\s\S]*?<\/p>/g, '');
      const examples = (withoutParagraphs.match(/<ul class="examples">[\s\S]*?<\/ul>/) ?? [''])[0];
      if ((examples.match(/<li>/g) ?? []).length < 2) errors.push(`${article[1]}: fewer than 2 examples`);
      for (const korean of withoutParagraphs.matchAll(/<span class="korean">([\s\S]*?)<\/span>(\s*<span class="(?:translation|hungarian)">)?/g)) {
        if (!korean[2]) errors.push(`${article[1]}: without translation: ${korean[1]}`);
      }
    }
    expect(errors).toEqual([]);
  });
});
