// After `astro build`: every internal link of every page must point to an existing page and element id.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import config from '../astro.config.mjs';

const DIST = 'dist';
const BASE = (config.base ?? '').replace(/\/$/, '');

function htmlFiles(directory) {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

/** "<base>/3a/9/" for dist/3a/9/index.html */
const pagePathOf = file => BASE + '/' + relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '');

const pages = new Map();
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  pages.set(pagePathOf(file), { html, ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])) });
}

const errors = [];
let checked = 0;
for (const [pagePath, { html }] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = match[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:)/.test(href) || href === '#') continue;
    const [path, anchor] = href.split('#');
    const targetPath = path === '' ? pagePath : path;
    const target = pages.get(targetPath);
    checked++;
    if (!target) errors.push(`${pagePath}: link to a missing page: ${href}`);
    else if (anchor && !target.ids.has(decodeURIComponent(anchor))) errors.push(`${pagePath}: link to a missing element: ${href}`);
  }
}

console.log(`links: ${pages.size} pages, ${checked} internal links checked, ${errors.length} broken`);
for (const error of errors.slice(0, 50)) console.log('  - ' + error);
if (errors.length) process.exit(1);
