// The groups of related points: "Rokon szerkezetek" (related meanings, as a scale) and "Közös építőelem" (shared building
// block). Their links are "group-link"s: they do not appear in the "Kapcsolódó pontok" bar.
import groups from '../data/groups';
import type { PointId, RelatedGroup } from '../data/types';

/** All points of a group: scale and side branches, or members. */
export const groupPointIds = (group: RelatedGroup): PointId[] =>
  group.kind === 'form' ? group.members.map(([id]) => id) : [...group.scale, ...(group.side ?? [])].map(([id]) => id);

/** The groups the point belongs to. */
export const groupsFor = (id: PointId): RelatedGroup[] =>
  (groups as RelatedGroup[]).filter(group => groupPointIds(group).includes(id));
