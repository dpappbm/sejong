// The groups of related points: "Rokon szerkezetek" (related meanings, as a scale) and "Közös építőelem" (shared building
// block). Lookup and content checks; the boxes are rendered by components/lessonpoint/groups/GroupBox.astro.
// Their links are "group-link"s, not cross-references, so they do not appear in the "Kapcsolódó pontok" bar.
import groups from '../../data/groups';
import type { RelatedGroup } from '../../data/types';
import { POINTS_BY_ID } from '../content';
import { checkCorrectIncorrect } from '../pointChecks';
import { reportProblem } from '../problems';

/** All points of a group: scale and side branches, or members. */
const groupPointIds = (group: RelatedGroup) =>
  group.kind === 'form'
    ? group.members.map(member => member[0])
    : [...group.scale, ...(group.side ?? [])].map(item => item[0]);

export function checkGroups(): void {
  for (const group of groups as RelatedGroup[]) {
    if (group.kind === 'form') {
      for (const [id, breakdown, hungarian, example] of group.members) {
        if (!breakdown || !hungarian) reportProblem(`building block ${group.id}: incomplete member: ${id}`);
        if (!example || !example[0] || !example[1])
          reportProblem(`building block ${group.id}: member without example or translation: ${id}`);
      }
    } else {
      for (const [korean, hungarian] of group.examples ?? [])
        if (!korean || !hungarian)
          reportProblem(`related structures ${group.id}: example without translation: ${korean}`);
      checkCorrectIncorrect(`related structures ${group.id}`, group.correctIncorrect);
    }
    for (const id of groupPointIds(group))
      if (!POINTS_BY_ID.has(id)) reportProblem(`related structures ${group.id}: point does not exist: ${id}`);
  }
}

/** The groups the point belongs to. */
export const groupsFor = (id: string) => (groups as RelatedGroup[]).filter(group => groupPointIds(group).includes(id));
