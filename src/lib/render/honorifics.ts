// The "Tiszteleti szavak" chapter: one collapsible card per group (particles, nouns, verbs, humble forms, address).
// Its links point to hand-picked points (references, and [[<point id>]] in the notes) and are bidirectional.
import honorifics from '../../data/honorifics';
import type { KoreanHungarian } from '../../data/types';
import { isPointId } from '../content';
import { addEdge, linkTargets } from '../crossReferences';
import { attributeText, correctIncorrectList, disclosureArrow, escapeHtml } from '../html';
import { reportProblem } from '../problems';

export const honorificsIntro = honorifics.intro;

export function honorificsChapter(): string {
  const link = (from: string, id: string) => {
    const target = linkTargets.get(id);
    if (!target || !isPointId(id)) {
      reportProblem(`honorific words ${from}: point does not exist: ${id}`);
      return escapeHtml(id);
    }
    addEdge(from, id);
    return `<a class="cross-reference" href="#${id}" title="${attributeText(target.title)}">${target.label}</a>`;
  };
  const withLinks = (from: string, text: string | undefined) => String(text ?? '').replace(/\[\[([^\]]+)\]\]/g, (_match, id: string) => link(from, id));
  const pair = (value: KoreanHungarian | null, where: string) => {
    if (!value) return '<td class="empty">–</td>';
    if (!value[0] || !value[1]) reportProblem(`honorific words ${where}: missing Korean or Hungarian`);
    return `<td><span class="korean">${escapeHtml(value[0])}</span><span class="translation">${escapeHtml(value[1])}</span></td>`;
  };
  return honorifics.categories.map((category, index) => {
    const id = `honorific-category-${index + 1}`;
    const title = `${index + 1}. ${category.hungarian}`;
    linkTargets.set(id, { label: 'Tiszteleti szavak', form: title, plain: true, title: `Tiszteleti szavak · ${title}` });
    const rows = category.rows.map((row, rowIndex) => {
      const where = `${id} row ${rowIndex + 1}`;
      if (!row.honorific || !row.example || !row.example[0] || !row.example[1]) reportProblem(`honorific words ${where}: missing honorific form or example translation`);
      const references = (row.references ?? []).map(target => link(id, target)).join(', ');
      return `<tr class="honorific-row">${pair(row.base, where)}${pair(row.honorific, where)}<td class="honorific-example"><span class="korean">${escapeHtml(row.example[0])}</span><span class="translation">${escapeHtml(row.example[1])}</span></td><td class="honorific-lessons${references ? '' : ' empty'}">${references || '–'}</td></tr>`;
    }).join('');
    return `<details class="card honorific-category" open><summary>${disclosureArrow}<h3 id="${id}">${title} <span class="korean">(${category.korean})</span></h3></summary>` +
      withLinks(id, category.intro) +
      `<div class="table-wrapper"><table class="plain honorifics-table"><thead><tr><th>Alap</th><th>${category.hungarian === 'Szerény alakok' ? 'Szerény' : 'Tiszteleti'}</th><th>Példa</th><th>Leckék</th></tr></thead><tbody>${rows}</tbody></table></div>` +
      withLinks(id, category.note) + correctIncorrectList(category.correctIncorrect) + `</details>`;
  }).join('\n');
}
