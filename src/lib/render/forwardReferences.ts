// Forward marks: an earlier example, vocabulary row or pronunciation example already uses a structure taught
// later; a "↗ 3A 9/1 …" link is placed after its translation. An example can also point back to an earlier
// structure it builds on ("↖ 2B 4/1 …").
import forwardReferences from '../../data/forwardReferences';
import type { ForwardReference } from '../../data/types';
import { isPointId, positionOf } from '../content';
import { addEdge, edges, linkTargets } from '../crossReferences';
import { attributeText, stripTags } from '../html';
import { reportProblem } from '../problems';

const used = new Set<ForwardReference>();

/** Lesson positions of the source and the target of a reference (undefined if either cannot be parsed). */
function positionsOf(reference: ForwardReference): { source: number; target: number } | undefined {
  const source = /([1-4][AB])-0?(\d+)/.exec(reference.location);
  const target = /^([1-4][AB])-(\d+)-/.exec(reference.target);
  return source && target ? { source: positionOf(source[1], source[2]), target: positionOf(target[1], target[2]) } : undefined;
}

/** location: a point id, "vocabulary <book>-<lesson>" or "pronunciation <book>-<lesson>". */
export function forwardMark(location: string, text: string): string {
  const plain = stripTags(text);
  return forwardReferences.filter(reference => reference.location === location && plain.includes(reference.koreanText)).map(reference => {
    used.add(reference);
    const target = linkTargets.get(reference.target);
    if (!target) {
      reportProblem(`forward reference (${location}): point does not exist: ${reference.target}`);
      return '';
    }
    // From a point the mark is bidirectional; from vocabulary and pronunciation rows it is one-way.
    if (isPointId(location) && !edges.some(edge => edge.from === location && edge.to === reference.target)) addEdge(location, reference.target);
    const positions = positionsOf(reference);
    const backward = !!positions && positions.target < positions.source;
    const title = (backward ? 'Korábban tanult szerkezet: ' : 'Később tanult szerkezet: ') + target.title;
    return ` <a class="cross-reference forward-reference${backward ? ' backward-reference' : ''}" href="#${reference.target}" title="${attributeText(title)}">${backward ? '↖' : '↗'} ${target.label} <span class="korean">${target.form}</span></a>`;
  }).join('');
}

export function checkForwardReferences(): void {
  for (const reference of forwardReferences) {
    if (!used.has(reference)) reportProblem(`forward reference matches nothing: ${reference.location} „${reference.koreanText}”`);
    const positions = positionsOf(reference);
    if (positions && positions.target === positions.source) reportProblem(`forward reference: ${reference.location} → ${reference.target} is the same lesson`);
  }
}
