// Cross-references: "3A 4. lecke" and "Alapszabályok 7." in the text become links to the exact grammar point
// or rule, and every link also shows up in reverse in the target's "Kapcsolódó pontok" bar.
import { LESSONS } from './content';
import { attributeText, escapeHtml, stripTags } from './html';
import { reportProblem } from './problems';

export interface LinkTarget {
  /** Short label, e.g. "3A 9/1" or "Alapszabályok". */
  label: string;
  form: string;
  /** Hover title. */
  title: string;
  /** true: the form is plain Hungarian text (not Korean). */
  plain?: boolean;
}

interface LessonPointCandidate {
  id: string;
  form: string;
}

export interface Edge {
  from: string;
  to: string;
}

/** Every link target by global id. */
export const linkTargets = new Map<string, LinkTarget>();
export const edges: Edge[] = [];
/** The point candidates of each lesson, by lesson key ("3A-4"). */
const lessonCandidates = new Map<string, LessonPointCandidate[]>();

/**
 * Manual resolution where the Korean form in the sentence does not decide which point of the lesson is meant.
 * Key: "<source id>|<reference text, e.g. 3A 4. lecke>" → target point id.
 */
const MANUAL_RESOLUTIONS: Record<string, string> = {
  'rule-5|1A 8. lecke': '1A-08-2', // ㅂ irregular
  'rule-5|2A 7. lecke': '2A-07-2', // ㅅ irregular
  'rule-5|2A 10. lecke': '2A-10-1', // ㅎ irregular
  'rule-6|2A 2. lecke': '2A-02-1', // (이)나
  'rule-6|1B 5. lecke': '1B-05-2', // (으)로
  'rule-8|2B 11. lecke': '2B-11-1', // 반말
  'rule-8|3A 1. lecke': '3A-01-1', // -니?, -자
  '1A-06-2|2B 5. lecke': '2B-05-2', // -지 말다
  '1A-10-2|2A 2. lecke': '2A-02-2', // guessing -(으)ㄹ까요?
  '1B-03-1|1B 12. lecke': '1B-12-2', // -(으)니까
  '1B-04-1|2A 10. lecke': '2A-10-1', // ㅎ irregular
  '1B-12-1|2B 7. lecke': '2B-07-1', // 께
  '2A-01-1|3A 12. lecke': '3A-12-2', // -(으)라고 하다
  '2A-02-2|1A 10. lecke': '1A-10-2', // -(으)ㄹ까요? (suggestion)
  '2A-08-2|2A 12. lecke': '2A-12-1', // -아/어 보다 (experience)
  '2B-08-1|2A 8. lecke': '2A-08-1', // -는데 (background)
  '4A-01-1|3A 12. lecke': '3A-12-1', // 한다체
  '4A-09-1|2A 5. lecke': '2A-05-2', // long negation
};

/** Registers every grammar point as a link target. */
export function indexPoints(): void {
  for (const lesson of LESSONS) {
    lessonCandidates.set(lesson.key, lesson.points.map(point => ({ id: point.id, form: point.form })));
    for (const point of lesson.points) {
      const name = stripTags(point.name);
      linkTargets.set(point.id, {
        label: `${lesson.book} ${lesson.lesson}/${point.point}`,
        form: point.form,
        title: `${lesson.book} · ${lesson.lesson}. lecke · ${point.point}. nyelvtan: ${point.form} – ${name}`,
      });
    }
  }
}

export function addEdge(from: string, to: string): void {
  edges.push({ from, to });
}

// ---------- resolving "<book> <lesson>. lecke" to one point of the lesson ----------
const normalizeForm = (text: string) => stripTags(text)
  .replace(/\((으|이|느|스)\)/g, '')
  .replace(/\([^)]*\)/g, '')
  .replace(/[-–…~\s.,!?()“”„"']|\b[NVA]\b/g, '');

function longestCommonSubstring(a: string, b: string): number {
  let best = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      let length = 0;
      while (i + length < a.length && j + length < b.length && a[i + length] === b[j + length]) length++;
      if (length > best) best = length;
    }
  }
  return best;
}

function formSimilarity(korean: string, form: string): number {
  const normalized = normalizeForm(korean);
  if (!normalized) return 0;
  const variants = String(form).split(/[\/,·]/).map(normalizeForm).filter(Boolean);
  if (variants.includes(normalized) || normalizeForm(form) === normalized) return 100;
  if (variants.some(variant => variant.startsWith(normalized) || normalized.startsWith(variant))) return 50; // -(으)러 ↔ -(으)러 가다
  return Math.max(longestCommonSubstring(normalized, normalizeForm(form)), ...variants.map(variant => longestCommonSubstring(normalized, variant)));
}

const BASIC_RULE_PATTERN = /Alapszabályok (\d)\./g;
const LESSON_REFERENCE_PATTERN = /([1-4][AB]) (\d{1,2})\.((?:,? és \d{1,2}\.)*) (leck[a-záéíóöőúüű]*)/g;

interface KoreanSpan {
  text: string;
  start: number;
  end: number;
}

/** Links one block (<p>, <li>, <tr>); the Korean forms of the block give the context of the resolution. */
function linkBlock(block: string, from: string): string {
  const tokens = block.split(/(<[^>]+>)/);
  let plain = '';
  let depth = 0;
  let koreanDepth = -1;
  let insideLink = false;
  const koreanSpans: KoreanSpan[] = [];
  const textTokens: { index: number; position: number }[] = [];
  let current: { text: string; start: number } | null = null;
  tokens.forEach((token, index) => {
    if (token.startsWith('<')) {
      if (/^<a\b/.test(token)) insideLink = true;
      else if (token === '</a>') insideLink = false;
      if (/^<span\b/.test(token)) {
        depth++;
        if (koreanDepth < 0 && /class="korean\b/.test(token)) {
          koreanDepth = depth;
          current = { text: '', start: plain.length };
        }
      } else if (token === '</span>') {
        if (depth === koreanDepth && current) {
          koreanSpans.push({ ...current, end: plain.length });
          current = null;
          koreanDepth = -1;
        }
        depth--;
      }
      return;
    }
    if (current) current.text += token;
    else if (!insideLink) textTokens.push({ index, position: plain.length });
    plain += token;
  });

  // Bounds of the sentence around a position ("4." as an ordinal is not a sentence end;
  // a sentence ends with punctuation + space + capital letter or quote).
  const sentenceAround = (position: number): [number, number] => {
    const sentenceEnd = /(?<![0-9])[.!?;](?=\s+[A-ZÁÉÍÓÖŐÚÜŰ„]|\s*$)/g;
    let start = 0;
    let end = plain.length;
    let match: RegExpExecArray | null;
    while ((match = sentenceEnd.exec(plain))) {
      if (match.index < position) start = match.index + 1;
      else {
        end = match.index;
        break;
      }
    }
    return [start, end];
  };

  const resolve = (book: string, lesson: number, referenceText: string, position: number): { id: string; how: string } | null => {
    const candidates = lessonCandidates.get(`${book}-${lesson}`) ?? [];
    const manual = MANUAL_RESOLUTIONS[`${from}|${referenceText}`];
    if (manual) return { id: manual, how: 'manual' };
    if (!candidates.length) {
      reportProblem(`${from}: reference to a lesson that does not exist: ${referenceText}`);
      return null;
    }
    if (candidates.length === 1) return { id: candidates[0].id, how: 'single point' };
    const [start, end] = sentenceAround(position);
    const distance = (span: KoreanSpan) => Math.min(Math.abs(span.start - position), Math.abs(span.end - position));
    const nearby = koreanSpans.filter(span => span.start >= start && span.end <= end).sort((a, b) => distance(a) - distance(b));
    for (const span of nearby) {
      const scores = candidates.map(candidate => ({ candidate, score: formSimilarity(span.text, candidate.form) })).sort((a, b) => b.score - a.score);
      if (scores[0].score >= 2 && scores[0].score > scores[1].score) return { id: scores[0].candidate.id, how: 'form: ' + span.text.trim() };
    }
    reportProblem(`${from}: ambiguous reference (${referenceText}) – add it to MANUAL_RESOLUTIONS: ${candidates.map(c => c.id + ' ' + c.form).join(' | ')}`);
    return { id: `lesson-${book}-${lesson}`, how: 'lesson (ambiguous)' };
  };

  for (const { index, position } of textTokens) {
    tokens[index] = tokens[index].replace(BASIC_RULE_PATTERN, (match, number: string) => {
      const id = 'rule-' + number;
      const target = linkTargets.get(id);
      if (!target) {
        reportProblem(`${from}: basic rule does not exist: ${match}`);
        return match;
      }
      if (id === from) return match;
      addEdge(from, id);
      return `<a class="cross-reference" href="#${id}" title="${attributeText(target.title)}">${match}</a>`;
    });
    tokens[index] = tokens[index].replace(LESSON_REFERENCE_PATTERN, (match, book: string, firstLesson: string, more: string, lessonWord: string, offset: number) => {
      const lessonNumbers = [firstLesson, ...(more.match(/\d{1,2}/g) ?? [])];
      const pieces: string[] = [];
      lessonNumbers.forEach((lesson, n) => {
        const last = n === lessonNumbers.length - 1;
        const shown = n === 0 ? `${book} ${lesson}.` + (last ? ' ' + lessonWord : '') : `${lesson}.` + (last ? ' ' + lessonWord : '');
        const referenceText = `${book} ${lesson}. lecke`;
        const resolved = resolve(book, Number(lesson), referenceText, position + offset);
        if (!resolved || resolved.id === from) {
          pieces.push(shown);
          return;
        }
        addEdge(from, resolved.id);
        const target = linkTargets.get(resolved.id);
        pieces.push(`<a class="cross-reference" href="#${resolved.id}" title="${attributeText(target ? target.title : referenceText)}">${shown}</a>`);
      });
      // The connecting words (", és ") stay.
      const glue = match.slice((book + ' ' + firstLesson + '.').length, match.length - (' ' + lessonWord).length).match(/,? és /g) ?? [];
      return pieces.reduce((text, piece, n) => text + (n ? glue[n - 1] ?? ' és ' : '') + piece, '');
    });
  }
  return tokens.join('');
}

/** Links every <p>, <li> and <tr> block of an HTML segment that belongs to the source id. */
export function linkSegment(html: string, from: string): string {
  const linked = html.replace(/<(p|li|tr)\b[^>]*>[\s\S]*?<\/\1>/g, block => linkBlock(block, from));
  // A reference left outside the blocks would stay unlinked.
  const rest = linked.replace(/<a class="cross-reference[\s\S]*?<\/a>/g, '').replace(/<[^>]+>/g, '');
  for (const match of rest.matchAll(LESSON_REFERENCE_PATTERN)) reportProblem(`${from}: unlinked reference: ${match[0]}`);
  for (const match of rest.matchAll(BASIC_RULE_PATTERN)) if ('rule-' + match[1] !== from) reportProblem(`${from}: unlinked reference: ${match[0]}`);
  return linked;
}

/** Placeholder for the "Kapcsolódó pontok" bar; replaced once every edge is known. */
export const relatedPlaceholder = (id: string) => `<!--related:${id}-->`;

/** The "Kapcsolódó pontok" bar: everything the id links to and everything that links to it. */
export function relatedBar(id: string): string {
  const related = new Set<string>();
  for (const edge of edges) {
    if (edge.from === id) related.add(edge.to);
    if (edge.to === id) related.add(edge.from);
  }
  related.delete(id);
  // Basic rules first, then the honorific words chapter, then the points.
  const order = (target: string) => (target.startsWith('rule-') ? '0' : target.startsWith('honorific-category-') ? '1' : '2') + target;
  const items = [...related].filter(target => linkTargets.has(target)).sort((a, b) => order(a).localeCompare(order(b)));
  if (!items.length) return '';
  const links = items.map(target => {
    const info = linkTargets.get(target)!;
    return `<a class="related-link" href="#${target}" title="${attributeText(info.title)}"><b>${info.label}</b> ${info.plain ? escapeHtml(info.form) : `<span class="korean">${info.form}</span>`}</a>`;
  });
  return `<nav class="related" aria-label="Kapcsolódó pontok"><span class="related-heading">Kapcsolódó pontok:</span>${links.join('')}</nav>`;
}

export const fillRelatedBars = (html: string) => html.replace(/<!--related:([^>]+?)-->/g, (_match, id: string) => relatedBar(id));

