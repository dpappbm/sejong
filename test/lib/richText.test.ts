import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Blocks from '../../src/components/text/Blocks.astro';
import { hrefOf, lessonPath, withBase } from '../../src/lib/content';
import {
  bold,
  comparisonTable,
  exampleList,
  exampleParts,
  heading,
  korean,
  koreanWithTranslation,
  lineBreak,
  list,
  paragraph,
  plainText,
  reference,
  referenceLabel,
  referencesOf,
  simpleTable,
  text,
  textsOf,
  type Content,
} from '../../src/lib/richText';

describe('text', () => {
  it('keeps plain text as a string and drops empty parts', () => {
    expect(text`sima`).toBe('sima');
    expect(text`${bold('félkövér')}`).toEqual(bold('félkövér'));
    expect(text`a ${bold('b')}`).toEqual(['a ', bold('b')]);
  });
});

describe('plainText', () => {
  it('drops the formatting', () => {
    expect(plainText(text`어떻게 지냈${bold('니')}?`)).toBe('어떻게 지냈니?');
    expect(plainText(text`Lásd ${reference('3A-09-1')}, ${bold(korean('가다'))}`)).toBe('Lásd 3A 9. lecke, 가다');
    expect(plainText(text`가${lineBreak}나`)).toBe('가 나');
  });
});

describe('reference', () => {
  it('is labelled by its id, unless a label is given', () => {
    expect(referenceLabel('1A-10-2')).toBe('1A 10. lecke');
    expect(referenceLabel('rule-7')).toBe('Alapszabályok 7.');
    expect(plainText(reference('3A-12-2', '12. leckében'))).toBe('12. leckében');
  });
});

describe('exampleParts', () => {
  it('unpacks a note and the used structures', () => {
    expect(exampleParts(['가', 'a'])).toMatchObject({ note: undefined, uses: [] });
    expect(exampleParts(['가', 'a', 'jegyzet'])).toMatchObject({ note: 'jegyzet', uses: [] });
    expect(exampleParts(['가', 'a', { uses: ['3A-09-1'] }])).toMatchObject({ note: undefined, uses: ['3A-09-1'] });
  });
});

const content: Content = [
  heading('Cím'),
  paragraph`Első ${reference('1A-01-1')}`,
  list('elem', text`${reference('1A-01-2')}`),
  exampleList([['가요.', 'Megyek.', text`jegyzet` as string]]),
  simpleTable(['fej'], [[koreanWithTranslation('가다', 'megy')]]),
  comparisonTable(
    ['A', 'B'],
    [
      [
        ['가', 'a'],
        ['나', 'b', { note: reference('1A-02-1') }],
      ],
    ]
  ),
];

describe('textsOf', () => {
  it('finds the texts of every kind of block', () => {
    expect(textsOf(content).map(plainText)).toEqual([
      ...['Cím', 'Első 1A 1. lecke', 'elem', '1A 1. lecke', '가요.', 'Megyek.', 'jegyzet'],
      ...['fej', '가다megy', 'A', 'B', '가', 'a', '나', 'b', '1A 2. lecke'],
    ]);
    expect(textsOf(content).flatMap(referencesOf)).toEqual(['1A-01-1', '1A-01-2', '1A-02-1']);
  });
});

describe('Blocks', () => {
  const render = async (blocks: Content, path = lessonPath('1A', 1)) => {
    const container = await AstroContainer.create();
    const request = new Request('https://example.com' + withBase(path));
    const html = await container.renderToString(Blocks, { props: { content: blocks }, request });
    return html.replace(/\s+(?=<)|(?<=>)\s+/g, '').trim();
  };

  it('renders the formatting and escapes the texts', async () => {
    expect(await render([paragraph`a < b ${bold('c')} ${korean(text`가${bold('나')}`)}`])).toBe(
      '<p>a &lt; b<b>c</b><span class="korean">가<b>나</b></span></p>'
    );
    expect(await render([list('egy', text`${bold('két')}tő`), heading('Cím')])).toBe(
      '<ul><li>egy</li><li><b>két</b>tő</li></ul><h5>Cím</h5>'
    );
  });

  it('keeps the spaces inside a text', async () => {
    const container = await AstroContainer.create();
    const blocks = [paragraph`a ${bold('b')} ${korean('가')}, ${reference('1A-01-1')} c`];
    const html = await container.renderToString(Blocks, { props: { content: blocks } });
    expect(html.replace(/<[^>]+>/g, '').trim()).toBe('a b 가, 1A 1. lecke c');
  });

  it('links to the anchor on the same page and to the page elsewhere', async () => {
    const blocks = [paragraph`${reference('1A-01-2')}`];
    expect(await render(blocks)).toContain('href="#point-2"');
    expect(await render(blocks, lessonPath('3A', 1))).toContain(`href="${hrefOf('1A-01-2')}"`);
  });

  it('puts the Hungarian line under the Korean form', async () => {
    expect(await render([simpleTable(['fej'], [[koreanWithTranslation('가다', 'megy')]])])).toContain(
      '<td><span class="korean">가다</span><span class="translation">megy</span></td>'
    );
  });
});
