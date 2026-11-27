import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import CorrectIncorrectList from '../../src/components/shared/CorrectIncorrectList.astro';
import { LESSONS } from '../../src/lib/content';

const container = await AstroContainer.create();
const point = LESSONS.flatMap(lesson => lesson.points).find(({ id }) => id === '3A-09-2')!;
const html = await container.renderToString(CorrectIncorrectList, {
  props: { items: point.correctIncorrect, place: point },
});
const incorrectItems = [...html.matchAll(/<li class="incorrect"[^>]*>([\s\S]*?)<\/li>/g)].map(([, inner]) => inner);

describe('correct and incorrect samples', () => {
  it('show the correction at the bottom of its incorrect sample', () => {
    const item = incorrectItems.find(inner => inner.includes('한국어는 어려운 대신에 공부해요.'));
    expect(item).toBeDefined();
    const correction = item!.slice(item!.indexOf('correct-incorrect-correction"'));
    expect(correction).toContain('helyette helyesen:');
    expect(correction).toContain('한국어는 어렵지만 공부해요.');
    expect(correction).toContain('A koreai nehéz, de tanulom.');
  });

  it('do not show a correction as a correct sample of its own', () => {
    expect(html).not.toMatch(/<li class="correct"/);
  });
});
