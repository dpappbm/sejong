// What the cards show must be what the store knows: the links of the rendered cards against the reference graph.
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import ContentCard from '../../src/components/ContentCard.astro';
import HonorificCategoryCard from '../../src/components/honorifics/HonorificCategoryCard.astro';
import LessonPoint from '../../src/components/lessonpoint/LessonPoint.astro';
import { basicRules } from '../../src/data/basics';
import honorifics from '../../src/data/honorifics';
import { numbersCards } from '../../src/data/numbers';
import pronunciation from '../../src/data/pronunciation';
import type { ReferenceId } from '../../src/data/types';
import { hrefOf, lessonId, LESSONS } from '../../src/lib/content';
import { allTargets, honorificCategoryId, referencesFrom, relatedTo } from '../../src/lib/references';

const container = await AstroContainer.create();
const cards: { id: ReferenceId; html: string }[] = [];
const render = async (id: ReferenceId, component: Parameters<typeof container.renderToString>[0], props: object) => {
  const request = new Request('https://example.com' + hrefOf(id));
  cards.push({ id, html: await container.renderToString(component, { props: { ...props }, request }) });
};
for (const point of LESSONS.flatMap(lesson => lesson.points)) await render(point.id, LessonPoint, { point });
for (const card of [...basicRules, ...numbersCards]) await render(card.id, ContentCard, { card });
for (const [index, category] of honorifics.categories.entries())
  await render(honorificCategoryId(index), HonorificCategoryCard, { category, index });

const linkableIds: ReferenceId[] = [
  ...allTargets().map(({ id }) => id),
  ...LESSONS.map(({ book, lesson }) => lessonId(book, lesson)),
  ...pronunciation.categories.map(({ id }) => `pronunciation-${id}` as const),
];
const idByHref = new Map(linkableIds.map(id => [hrefOf(id), id]));
/** The ids (or the unknown addresses) of the links of a kind on a card. */
const linkedIds = ({ id, html }: (typeof cards)[number], className: string): string[] => {
  const page = hrefOf(id)!.split('#')[0];
  const hrefs = [...html.matchAll(new RegExp(`<a class="${className}[^"]*"(?: href="([^"]+)")?`, 'g'))].map(
    ([, href = 'missing']) => (href.startsWith('#') ? page + href : href)
  );
  return [...new Set(hrefs.map(href => idByHref.get(href) ?? `dead link ${href}`))].sort();
};

describe('rendered cards', () => {
  it('are all the cards of the store', () => {
    expect(cards.map(card => card.id).sort()).toEqual(
      allTargets()
        .map(target => target.id)
        .sort()
    );
  });

  it.each([
    ['cross-reference', (id: ReferenceId) => referencesFrom(id)],
    ['group-link', null],
  ] as const)('have no dead %s', (className, expected) => {
    for (const card of cards) {
      const links = linkedIds(card, className);
      expect(
        links.filter(link => link.startsWith('dead')),
        card.id
      ).toEqual([]);
      // A card with a "references" field refers to more cards than its texts.
      const known: string[] | undefined = expected?.(card.id);
      if (known)
        expect(
          links.filter(link => !known.includes(link)),
          card.id
        ).toEqual([]);
    }
  });

  it('show every related card in the "Kapcsolódó pontok" bar', () => {
    for (const card of cards.filter(({ id }) => !id.startsWith('honorific-category-'))) {
      const related = relatedTo(card.id).map(target => target.id as string);
      expect(linkedIds(card, 'related-link'), card.id).toEqual(related.sort());
    }
  });
});

describe('honorific sections', () => {
  it('translate every Korean form', () => {
    const errors: string[] = [];
    for (const { id, html } of cards) {
      const section = html.match(/<section class="honorific"[\s\S]*?<\/section>/)?.[0] ?? '';
      // Incorrect samples need a reason, not a translation.
      const translated = section
        .replace(/<p>[\s\S]*?<\/p>/g, '')
        .replace(/<li class="incorrect">[\s\S]*?<\/li>/g, '')
        .replace(/<button[\s\S]*?<\/button>/g, '');
      for (const [, korean, next] of translated.matchAll(
        /<span class="korean"[^>]*>([\s\S]*?)<\/span>(\s*<span class="(?:translation|hungarian)")?/g
      ))
        if (!next) errors.push(`${id}: without translation: ${korean}`);
    }
    expect(errors).toEqual([]);
  });
});
