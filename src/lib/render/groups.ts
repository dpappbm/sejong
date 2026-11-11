// "Rokon szerkezetek" (related meanings, as a scale) and "Közös építőelem" (shared building block) boxes,
// shown on the card of every member point. Their links are "group-link"s, not cross-references,
// so they do not appear in the "Kapcsolódó pontok" bar.
import groups from '../../data/groups';
import type { RelatedGroup } from '../../data/types';
import { POINTS_BY_ID } from '../content';
import { correctIncorrectList, disclosureArrow, ownTag } from '../html';
import { reportProblem } from '../problems';

/** All points of a group: scale and side branches, or members. */
const groupPointIds = (group: RelatedGroup) =>
  group.kind === 'form' ? group.members.map(member => member[0]) : [...group.scale, ...(group.side ?? [])].map(item => item[0]);

export function checkGroups(): void {
  for (const group of groups as RelatedGroup[]) {
    if (group.kind === 'form') {
      for (const [id, breakdown, hungarian, example] of group.members) {
        if (!breakdown || !hungarian) reportProblem(`building block ${group.id}: incomplete member: ${id}`);
        if (!example || !example[0] || !example[1]) reportProblem(`building block ${group.id}: member without example or translation: ${id}`);
      }
    } else {
      for (const [korean, hungarian] of group.examples ?? []) if (!korean || !hungarian) reportProblem(`related structures ${group.id}: example without translation: ${korean}`);
    }
    for (const id of groupPointIds(group)) if (!POINTS_BY_ID.has(id)) reportProblem(`related structures ${group.id}: point does not exist: ${id}`);
  }
}

function groupBox(group: RelatedGroup, self: string): string {
  const reference = (id: string) => {
    const point = POINTS_BY_ID.get(id);
    return point ? `${point.book} ${point.lesson}/${point.point}` : id;
  };
  const item = (id: string) => {
    const form = POINTS_BY_ID.get(id)?.form ?? id;
    return id === self ? `<b class="korean group-self">${form}</b>` : `<a class="group-link korean" href="#${id}" title="${reference(id)}">${form}</a>`;
  };
  if (group.kind === 'form') {
    const members = group.members.map(([id, breakdown, hungarian, example]) =>
      `<li${id === self ? ' class="self"' : ''}>${item(id)} <span class="group-breakdown">= ${breakdown}</span> <span class="hungarian">– ${hungarian}</span>` +
      (example ? `<div class="group-member-example"><span class="korean">${example[0]}</span> <span class="hungarian">– ${example[1]}</span></div>` : '') + `</li>`).join('');
    return `<details class="own related-group form-group"><summary>${disclosureArrow}${ownTag()} <b>Közös építőelem: <span class="korean">${group.title}</span></b></summary><div class="group-body">${group.explanation}<ul class="group-members">${members}</ul></div></details>`;
  }
  // The "<" breaks to a new line together with the next degree.
  const scale = group.scale.map(([id, label], index) =>
    `<span class="group-pair">${index ? '<span class="group-less-than" aria-hidden="true">&lt;</span>' : ''}<span class="group-step${id === self ? ' self' : ''}">${item(id)}<small>${label}</small></span></span>`).join('');
  const examples = (group.examples ?? []).map(([korean, hungarian]) => `<li><span class="korean">${korean}</span><span class="hungarian">${hungarian}</span></li>`).join('');
  const side = (group.side ?? []).map(([id, text]) => `<li>${item(id)} – ${text}</li>`).join('');
  return `<details class="own related-group"><summary>${disclosureArrow}${ownTag()} <b>Rokon szerkezetek: ${group.title}</b></summary><div class="group-body">` +
    `<div class="group-scale">${scale}</div>${group.explanation}${examples ? `<ul class="examples group-examples">${examples}</ul>` : ''}${correctIncorrectList(group.correctIncorrect)}${side ? `<p class="group-side-heading">Mellékágak:</p><ul class="group-side">${side}</ul>` : ''}</div></details>`;
}

/** The boxes of every group the point belongs to (collapsed by default). */
export const groupBoxesFor = (id: string) => (groups as RelatedGroup[]).filter(group => groupPointIds(group).includes(id)).map(group => groupBox(group, id)).join('');
