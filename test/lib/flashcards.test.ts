import { describe, expect, it } from 'vitest';
import { LESSONS } from '../../src/lib/content';
import {
  buildRound,
  canPlay,
  cardKind,
  cardText,
  distractorCandidates,
  drawBatch,
  hideKoreanHints,
  otherLanguage,
  putMistakesFirst,
  retryPool,
  shuffle,
  type Card,
  type CardKind,
  type Random,
} from '../../src/lib/flashcards';
import { buildLessonExport, rowGroups } from '../../src/lib/lessonExport';

/** A seeded random source (mulberry32), so every run draws the same rounds. */
function seededRandom(seed: number): Random {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const card = (korean: string, hungarian: string, kind: CardKind = 'vocabulary'): Card => ({ korean, hungarian, kind });

/** All rows of a lesson as cards, deduplicated like the dialog's selection. */
function lessonCards(key: string): Card[] {
  const groups = rowGroups(buildLessonExport(LESSONS.find(lesson => lesson.key === key)!));
  const seen = new Set<string>();
  return Object.entries(groups).flatMap(([groupKey, rows]) =>
    rows
      .filter(row => {
        const rowKey = row.join('\t');
        if (seen.has(rowKey)) return false;
        seen.add(rowKey);
        return true;
      })
      .map(([korean, hungarian]) => card(korean, hungarian, cardKind(groupKey)))
  );
}

describe('flash cards', () => {
  it('tells the kind of rows from the row tree key', () => {
    expect(cardKind('point-2-rule')).toBe('rule');
    expect(cardKind('point-2-examples')).toBe('example');
    expect(cardKind('vocabulary-textbook')).toBe('vocabulary');
    expect(cardKind('vocabulary-own')).toBe('vocabulary');
  });

  it('hides the Korean hints of a Hungarian text, nothing else', () => {
    expect(hideKoreanHints('hálás (고마워요 = köszönöm)')).toBe('hálás');
    expect(hideKoreanHints('horror (공포: félelem)')).toBe('horror');
    expect(hideKoreanHints('hallgat (zenét stb.)')).toBe('hallgat (zenét stb.)');
    expect(hideKoreanHints('(고마워요)')).toBe('(고마워요)');
  });

  it('shuffles without losing or repeating items', () => {
    const items = Array.from({ length: 20 }, (_, index) => index);
    const shuffled = shuffle(items, seededRandom(1));
    expect(shuffled).not.toEqual(items);
    expect([...shuffled].sort((a, b) => a - b)).toEqual(items);
  });

  it('builds rounds of four distinct answers with exactly one correct', () => {
    const random = seededRandom(2);
    for (const key of ['1A-1', '2B-5', '3A-9', '4B-12']) {
      const cards = lessonCards(key);
      for (const asked of cards) {
        const round = buildRound(asked, cards, random)!;
        expect(round, `${key}: ${asked.korean}`).not.toBeNull();
        expect(round.options).toHaveLength(4);
        expect(new Set(round.options.map(option => option.text.toLowerCase())).size).toBe(4);
        expect(round.options.filter(option => option.card === asked)).toHaveLength(1);
        expect(round.options[round.correctIndex].card).toBe(asked);
        expect(round.question).toBe(cardText(asked, round.questionLanguage));
      }
    }
  });

  it('asks in both languages', () => {
    const random = seededRandom(3);
    const cards = lessonCards('1A-1');
    const languages = new Set(cards.map(asked => buildRound(asked, cards, random)!.questionLanguage));
    expect(languages).toEqual(new Set(['korean', 'hungarian']));
  });

  it('never offers a second correct answer', () => {
    // 3B 9: two Korean words with the same Hungarian.
    const hall = card('결혼식장', 'esküvői terem');
    const weddingHall = card('웨딩 홀', 'esküvői terem');
    const pool = [
      hall,
      weddingHall,
      card('신랑', 'vőlegény'),
      card('신부', 'menyasszony'),
      card('하객', 'esküvői vendég'),
      card('주례', 'esketést vezető személy'),
    ];
    expect(distractorCandidates(hall, 'hungarian', pool)).not.toContain(weddingHall);
    expect(distractorCandidates(hall, 'korean', pool)).not.toContain(weddingHall);
    for (let seed = 0; seed < 20; seed++) {
      const round = buildRound(hall, pool, seededRandom(seed))!;
      expect(round.options.map(option => option.card)).not.toContain(weddingHall);
    }
  });

  it('draws wrong answers from the same kind of rows first, then from the others', () => {
    const asked = card('가다', 'megy');
    const pool = [
      asked,
      card('오다', 'jön'),
      card('먹다', 'eszik'),
      card('자다', 'alszik'),
      card('보다', 'néz'),
      card('-아요/어요', 'jelen idő', 'rule'),
      card('학교에 가요.', 'Iskolába megyek.', 'example'),
    ];
    for (let seed = 0; seed < 20; seed++) {
      const round = buildRound(asked, pool, seededRandom(seed))!;
      expect(round.options.every(option => option.card.kind === 'vocabulary')).toBe(true);
    }
    const fewWords = [
      asked,
      card('오다', 'jön'),
      card('-아요/어요', 'jelen idő', 'rule'),
      card('학교에 가요.', 'Iskolába megyek.', 'example'),
    ];
    const round = buildRound(asked, fewWords, seededRandom(4))!;
    expect(round.options.map(option => option.card.kind).sort()).toEqual([
      'example',
      'rule',
      'vocabulary',
      'vocabulary',
    ]);
  });

  it('cannot play when the rows have too few distinct answers', () => {
    const cards = [
      card('결혼식장', 'esküvői terem'),
      card('웨딩 홀', 'esküvői terem'),
      card('신랑', 'vőlegény'),
      card('신부', 'menyasszony'),
    ];
    expect(canPlay(cards, cards)).toBe(false);
    expect(canPlay(cards.slice(2), cards.slice(2))).toBe(false);
    const enough = [...cards, card('하객', 'esküvői vendég')];
    expect(canPlay(enough, enough)).toBe(true);
    expect(canPlay([], enough)).toBe(false);
  });

  it('asks the other language when one has too few distinct answers', () => {
    // Two rows share the Hungarian "sétál": asked in Korean, only two distinct Hungarian answers are left.
    const asked = card('가다', 'megy');
    const pool = [asked, card('걷다', 'sétál'), card('산책하다', 'sétál'), card('오다', 'jön')];
    for (let seed = 0; seed < 10; seed++)
      expect(buildRound(asked, pool, seededRandom(seed))?.questionLanguage).toBe('hungarian');
  });

  it('retries the mistakes with their own answers if they are enough, otherwise with the earlier selection', () => {
    const selection = lessonCards('2A-3');
    const fewMistakes = selection.slice(0, 2);
    expect(retryPool(fewMistakes, selection)).toEqual(selection);
    const manyMistakes = selection.slice(0, 6);
    expect(canPlay(manyMistakes, manyMistakes)).toBe(true);
    expect(retryPool(manyMistakes, selection)).toEqual(manyMistakes);
  });

  it('can play every lesson with everything selected', () => {
    for (const lesson of LESSONS) {
      const cards = lessonCards(lesson.key);
      expect(cards.length, lesson.key).toBeGreaterThanOrEqual(4);
      expect(canPlay(cards, cards), lesson.key).toBe(true);
    }
  });

  it('draws batches that together ask every row once', () => {
    const rows = Array.from({ length: 300 }, (_, index) => index);
    const batches: number[][] = [];
    let remaining = rows;
    while (remaining.length) {
      const next = drawBatch(remaining, 20);
      batches.push(next.batch);
      remaining = next.remaining;
    }
    expect(batches).toHaveLength(15);
    expect(batches.flat()).toEqual(rows);
    expect(drawBatch(rows.slice(0, 45), 20).remaining).toHaveLength(25);
    expect(drawBatch(rows.slice(0, 5), 20)).toEqual({ batch: rows.slice(0, 5), remaining: [] });
    expect(drawBatch(rows, Infinity).batch).toHaveLength(300);
  });

  it('starts the next batch with the mistakes when they may come again', () => {
    const cards = Array.from({ length: 30 }, (_, index) => card(`단어${index}`, `szó ${index}`));
    const mistakes = [cards[2], cards[5], cards[5]];
    const remaining = putMistakesFirst(cards.slice(10), mistakes, seededRandom(5));
    expect(remaining).toHaveLength(22);
    expect(new Set(remaining.slice(0, 2))).toEqual(new Set([cards[2], cards[5]]));
    expect(remaining.slice(2)).toEqual(cards.slice(10));
    // More mistakes than a batch: the rest opens the batch after.
    const many = putMistakesFirst(cards.slice(20), cards.slice(0, 15), seededRandom(6));
    const first = drawBatch(many, 10);
    const second = drawBatch(first.remaining, 10);
    expect(first.batch.every(asked => cards.indexOf(asked) < 15)).toBe(true);
    expect(second.batch.slice(0, 5).every(asked => cards.indexOf(asked) < 15)).toBe(true);
    expect(second.batch.slice(5)).toEqual(cards.slice(20, 25));
  });

  it('switches languages', () => {
    expect(otherLanguage('korean')).toBe('hungarian');
    expect(otherLanguage('hungarian')).toBe('korean');
  });
});
