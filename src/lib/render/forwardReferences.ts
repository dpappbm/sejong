// Forward marks: an earlier example, vocabulary row or pronunciation example already uses a structure taught
// later; a "↗ 3A 9/1 …" link is placed after its translation.
import forwardReferences from '../../data/forwardReferences';
import type { ForwardReference } from '../../data/types';
import { isPointId, positionOf } from '../content';
import { addEdge, edges, linkTargets } from '../crossReferences';
import { attributeText, stripTags } from '../html';
import { reportProblem } from '../problems';

const used = new Set<ForwardReference>();

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
    return ` <a class="cross-reference forward-reference" href="#${reference.target}" title="${attributeText('Később tanult szerkezet: ' + target.title)}">↗ ${target.label} <span class="korean">${target.form}</span></a>`;
  }).join('');
}

export function checkForwardReferences(): void {
  for (const reference of forwardReferences) {
    if (!used.has(reference)) reportProblem(`forward reference matches nothing: ${reference.location} „${reference.koreanText}”`);
    const source = /([1-4][AB])-0?(\d+)/.exec(reference.location);
    const target = /^([1-4][AB])-(\d+)-/.exec(reference.target);
    if (source && target && positionOf(target[1], target[2]) <= positionOf(source[1], source[2])) {
      reportProblem(`forward reference: ${reference.location} → ${reference.target} is not a later lesson`);
    }
  }
}
