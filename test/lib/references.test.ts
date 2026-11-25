import { describe, expect, it } from 'vitest';
import groups from '../../src/data/groups';
import pronunciation from '../../src/data/pronunciation';
import type { RelatedGroup } from '../../src/data/types';
import { LESSONS } from '../../src/lib/content';
import {
  allTargets,
  buildReferences,
  pointSource,
  referencesFrom,
  referenceSources,
  relatedTo,
  targetOf,
} from '../../src/lib/references';
import {
  bold,
  exampleList,
  list,
  paragraph,
  plainText,
  reference,
  referencesOf,
  text,
  textsOf,
} from '../../src/lib/richText';
import { unlinkedMentions } from '../helpers';

const sources = referenceSources();

describe('references of the content', () => {
  it('lead to existing points, rules and chapter cards', () => {
    const chapterIds = pronunciation.categories.map(category => `pronunciation-${category.id}`);
    const pronunciationIds = Object.values(pronunciation.lessons).flatMap(entry =>
      [entry.rule, entry.note ?? ''].flatMap(referencesOf)
    );
    const all = [...sources.flatMap(({ id }) => referencesFrom(id)), ...pronunciationIds];
    expect(all.filter(id => !targetOf(id) && !chapterIds.includes(id))).toEqual([]);
  });

  it('do not lead to the card they stand in', () => {
    expect(sources.filter(({ id }) => referencesFrom(id).includes(id)).map(({ id }) => id)).toEqual([]);
  });

  it('are given with reference(), not as plain text', () => {
    const groupTexts = (groups as RelatedGroup[]).flatMap(group => textsOf(group.explanation));
    const pronunciationTexts = Object.values(pronunciation.lessons).flatMap(entry => [entry.rule, entry.note ?? '']);
    expect([
      ...sources.flatMap(({ id, texts }) => unlinkedMentions(id, texts)),
      ...unlinkedMentions('groups', groupTexts),
      ...unlinkedMentions('pronunciation', pronunciationTexts),
    ]).toEqual([]);
  });

  // Without references the checks above would pass on empty lists.
  it('connect more than 100 cards', () => {
    expect(allTargets().filter(({ id }) => relatedTo(id).length).length).toBeGreaterThan(100);
  });
});

describe('relatedTo', () => {
  it('is mutual', () => {
    const oneWay = allTargets().flatMap(({ id }) =>
      relatedTo(id)
        .filter(target => !relatedTo(target.id).some(back => back.id === id))
        .map(target => `${id} → ${target.id}`)
    );
    expect(oneWay).toEqual([]);
  });

  it('lists the basic rules first, then the honorific words, then the points', () => {
    const order = relatedTo('1A-04-1').map(target => target.id);
    expect(order.slice(0, 3)).toEqual(['rule-2', 'rule-5', 'rule-8']);
    expect(relatedTo('2B-03-1').map(target => target.id)[0]).toMatch(/^honorific-category-/);
  });
});

describe('buildReferences', () => {
  const point = LESSONS[0].points[0];
  const empty = { ...point, examples: [], correctIncorrect: [], honorific: undefined, ownNote: undefined };
  const referencesOfPoint = (changes: Partial<typeof point>) => [
    ...buildReferences([pointSource({ ...empty, explanation: [], ...changes })]).get(point.id)!,
  ];

  it('collects the links of the texts, nested ones too', () => {
    expect(
      referencesOfPoint({
        explanation: [paragraph`Lásd ${reference('1A-02-1')}.`, list(text`${bold(text`a ${reference('1A-02-2')}`)}`)],
        ownNote: [exampleList([['가요.', 'Megyek.', { note: text`${reference('1B-01-1')}` }]])],
        correctIncorrect: [{ incorrect: '가', reason: text`${reference('1B-02-1')}` }],
        honorific: { note: [paragraph`${reference('rule-3')}`] },
      })
    ).toEqual(['1A-02-1', '1A-02-2', '1B-01-1', 'rule-3', '1B-02-1']);
  });

  it('adds the structures used by the examples and the references field', () => {
    expect(
      referencesOfPoint({
        examples: [['가요.', 'Megyek.', { uses: ['3A-09-1'] }]],
        references: ['2A-02-2'],
      })
    ).toEqual(['3A-09-1', '2A-02-2']);
  });
});

describe('targetOf', () => {
  it('gives the label and the hover title', () => {
    expect(targetOf('3A-09-1')).toMatchObject({ label: '3A 9/1', form: '-아지다/어지다' });
    expect(targetOf('rule-2')!.title).toBe('Alapszabályok · 2. -아/어 végződések: melyiket és hogyan vonódnak össze');
    expect(plainText(targetOf('rule-2')!.form)).toMatch(/^2\. /);
    expect(targetOf('lesson-1A-1')).toBeUndefined();
  });
});
