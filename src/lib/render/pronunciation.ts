// Pronunciation: the textbook "발음" box of a lesson (after its grammar points) and the "Kiejtés" chapter,
// which groups every box by rule type.
import pronunciation from '../../data/pronunciation';
import type { Lesson, LessonPronunciation, PronunciationCategory } from '../../data/types';
import { LESSONS, lessonKey } from '../content';
import { disclosureArrow, ownTag } from '../html';
import { reportProblem } from '../problems';
import { forwardMark } from './forwardReferences';

const categories = new Map<string, PronunciationCategory & { number: number }>(
  pronunciation.categories.map((category, index) => [category.id, { ...category, number: index + 1 }]),
);

/** Pronunciation in square brackets; an array lists steps (→), " · " separates alternatives. */
const notation = (value: string | string[] | undefined) => Array.isArray(value)
  ? value.filter(Boolean).map(step => `<span class="pronunciation-notation">[${step}]</span>`).join(' → ')
  : (value ?? '').split(' · ').filter(Boolean).map(item => `<span class="pronunciation-notation">[${item}]</span>`).join(' · ');

/** Sample word [pronunciation]; for a list like "밝다 · 밝고 · 밝아요" pairwise. */
function sampleWithPronunciation(sample: string, value: string | string[]): string {
  const samples = sample.split(' · ');
  const values = typeof value === 'string' ? value.split(' · ') : null;
  if (values && samples.length > 1 && samples.length === values.length) return samples.map((item, index) => `<span class="korean">${item}</span> ${notation(values[index])}`).join(' · ');
  return `<span class="korean">${sample}</span>${value && value.length ? ' ' + notation(value) : ''}`;
}

export function checkPronunciation(): void {
  const seen = new Set<string>();
  for (const { book, lesson, title } of LESSONS) {
    const key = lessonKey(book, lesson);
    const entry = pronunciation.lessons[key];
    if (!title.pronunciation) {
      if (entry) reportProblem(`pronunciation ${key}: has data, but the lesson has no pronunciation label`);
      continue;
    }
    seen.add(key);
    if (!entry) {
      reportProblem(`pronunciation ${key}: missing from the pronunciation data`);
      continue;
    }
    if (!categories.has(entry.category)) reportProblem(`pronunciation ${key}: unknown category: ${entry.category}`);
    if (!entry.studentBookPage) reportProblem(`pronunciation ${key}: no student book page`);
    if (!entry.rule) reportProblem(`pronunciation ${key}: no rule`);
    if (entry.sampleWord && !entry.hungarian) reportProblem(`pronunciation ${key}: the sample word has no Hungarian translation`);
    if (!entry.examples?.length) reportProblem(`pronunciation ${key}: no practice example`);
    entry.examples?.forEach(([korean, , hungarian], index) => {
      if (!korean || !hungarian) reportProblem(`pronunciation ${key}: example ${index + 1} lacks the Korean or the Hungarian`);
    });
  }
  for (const key of Object.keys(pronunciation.lessons)) {
    if (!seen.has(key)) reportProblem(`pronunciation ${key}: no such lesson with a pronunciation label`);
  }
  for (const category of pronunciation.categories) {
    for (const [, , examples] of category.extra?.rows ?? []) {
      for (const [korean, value, hungarian] of examples) if (!korean || !value || !hungarian) reportProblem(`pronunciation: ${category.id} extra table: incomplete example: ${korean}`);
    }
    if (!Object.values(pronunciation.lessons).some(entry => entry.category === category.id)) reportProblem(`pronunciation: empty category: ${category.id}`);
  }
}

/** The lesson's pronunciation box, after its grammar points. */
export function pronunciationBox(book: string, lesson: number, title: Lesson): string {
  if (!title.pronunciation) return '';
  const entry: LessonPronunciation | undefined = pronunciation.lessons[lessonKey(book, lesson)];
  const label = `Kiejtés: <span class="korean">${title.pronunciation}</span>${title.pronunciationHungarian ? ` – ${title.pronunciationHungarian.replace(/\s*\([^)]*\)\s*$/, '')}` : ''}`;
  if (!entry) return `<div class="pronunciation-box"><div class="pronunciation-heading">${label}</div></div>`;
  const category = categories.get(entry.category) ?? { number: '?', hungarian: '' };
  return `<div class="pronunciation-box"><div class="pronunciation-heading"><span>${label}</span><span class="source-page">SB ${entry.studentBookPage}. o.</span><a class="cross-reference" href="#pronunciation-${entry.category}">→ Kiejtés ${category.number}. ${category.hungarian}</a></div>` +
    (entry.sampleWord ? `<div class="pronunciation-sample">${sampleWithPronunciation(entry.sampleWord, entry.samplePronunciation)}${entry.hungarian ? ` <span class="hungarian">– ${entry.hungarian}</span>` : ''}</div>` : '') +
    `<p class="pronunciation-rule">${entry.rule}</p>` +
    `<ul class="examples pronunciation-examples">${entry.examples.map(([korean, value, hungarian]) =>
      `<li><span class="korean">${korean}${value ? ' ' + notation(value) : ''}</span><span class="hungarian">${hungarian}${forwardMark(`pronunciation ${book}-${lesson}`, korean)}</span></li>`).join('')}</ul>` +
    (entry.note ? `<aside class="own pronunciation-note">${ownTag()} ${entry.note}</aside>` : '') + `</div>`;
}

/** Own supplementary table of a category (e.g. the four cases of ㅢ): position | pronunciation | examples. */
function categoryExtra(extra: PronunciationCategory['extra']): string {
  if (!extra) return '';
  const rows = extra.rows.map(([position, how, examples]) =>
    `<tr><td>${position}</td><td class="korean">${how}</td><td>${examples.map(([korean, value, hungarian]) => `<span class="korean">${korean}</span> ${notation(value)} – ${hungarian}`).join('<br>')}</td></tr>`).join('');
  return `<aside class="own pronunciation-category-extra"><div class="own-heading">${ownTag()} <b>${extra.title}</b></div><div class="table-wrapper"><table class="plain"><thead><tr><th>Helyzet</th><th>Kiejtés</th><th>Példák</th></tr></thead><tbody>${rows}</tbody></table></div>${extra.note ? `<p>${extra.note}</p>` : ''}</aside>`;
}

/** The "Kiejtés" chapter: one collapsible card per rule type with every lesson's examples. */
export function pronunciationChapter(): string {
  checkPronunciation();
  const lessonsWithBox = LESSONS.filter(({ book, lesson }) => pronunciation.lessons[lessonKey(book, lesson)]);
  return pronunciation.categories.map((category, index) => {
    const lessons = lessonsWithBox.filter(({ book, lesson }) => pronunciation.lessons[lessonKey(book, lesson)].category === category.id);
    const rows = lessons.map(({ book, lesson }) => {
      const entry = pronunciation.lessons[lessonKey(book, lesson)];
      const attributes = `data-book="${book}" data-lesson="${lesson}"`;
      return `<tr class="pronunciation-row pronunciation-row-first" ${attributes}><td colspan="3"><a class="cross-reference" href="#lesson-${book}-${lesson}">${book} ${lesson}. lecke</a> <span class="source-page">SB ${entry.studentBookPage}. o.</span> <span class="tag future-tag progress-tag">még nem vettük</span><br>${entry.rule}</td></tr>` +
        (entry.sampleWord ? `<tr class="pronunciation-row" ${attributes}><td class="korean"><b>${entry.sampleWord}</b></td><td class="korean${notation(entry.samplePronunciation) ? '' : ' empty'}">${notation(entry.samplePronunciation) || '–'}</td><td>${entry.hungarian}</td></tr>` : '') +
        entry.examples.map(([korean, value, hungarian]) =>
          `<tr class="pronunciation-row" ${attributes}><td class="korean">${korean}</td><td class="korean${value ? '' : ' empty'}">${value ? notation(value) : '–'}</td><td>${hungarian}${forwardMark(`pronunciation ${book}-${lesson}`, korean)}</td></tr>`).join('');
    }).join('');
    const links = lessons.map(({ book, lesson }) => `<a class="cross-reference" href="#lesson-${book}-${lesson}">${book} ${lesson}</a>`).join(', ');
    return `<details class="card pronunciation-category" open><summary>${disclosureArrow}<h3 id="pronunciation-${category.id}">${index + 1}. ${category.hungarian} <span class="korean">(${category.korean})</span></h3></summary>` +
      `<p>${category.intro} ${ownTag()}</p><p class="pronunciation-category-lessons">Tankönyvi leckék: ${links}</p>` +
      `<div class="table-wrapper"><table class="plain pronunciation-table"><thead><tr><th>Példa</th><th>Kiejtés</th><th>Magyarul</th></tr></thead><tbody>${rows}</tbody></table></div>${categoryExtra(category.extra)}</details>`;
  }).join('\n');
}
