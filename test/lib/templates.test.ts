import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const templates = readdirSync('src', { recursive: true, encoding: 'utf8' })
  .filter(path => path.endsWith('.astro'))
  .map(path => ({ path, source: readFileSync(join('src', path), 'utf8') }));

describe('templates', () => {
  it('have no inline styles', () => {
    expect(templates.length).toBeGreaterThan(40);
    expect(templates.filter(({ source }) => /\sstyle=/.test(source)).map(({ path }) => path)).toEqual([]);
  });
});
