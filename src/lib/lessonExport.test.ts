import { describe, expect, it } from 'vitest';
import { LESSONS } from './content';
import { exportText } from './exportFormat';
import { buildLessonExport } from './lessonExport';

const lessonExport = (key: string) => buildLessonExport(LESSONS.find(lesson => lesson.key === key)!);
const allRows = (key: string) => {
  const data = lessonExport(key);
  return [...data.points.flatMap(point => [point.rule, ...point.examples]), ...(data.vocabulary?.textbook ?? []), ...(data.vocabulary?.own ?? [])];
};

describe('lesson export', () => {
  it('exports the header of a point as its rule row', () => {
    expect(lessonExport('1A-1').points[0].rule).toEqual(['이에요/예요', '„… vagyok / … az” (a 이다 udvarias alakja)']);
  });

  it('exports the examples without highlighting', () => {
    const examples = lessonExport('3A-9').points[0].examples;
    expect(examples).toContainEqual(['요즘 날씨가 많이 추워졌어요.', 'Mostanában nagyon hideg lett.']);
  });

  it('exports correct usage samples, never incorrect ones', () => {
    const koreanTexts = lessonExport('3A-9').points.flatMap(point => point.examples).map(row => row[0]);
    expect(koreanTexts).toContain('날씨가 따뜻해졌어요.');
    expect(koreanTexts).not.toContain('날씨가 따뜻했어졌어요.');
    expect(koreanTexts).toContain('비가 오는데 우산을 가져가세요.');
    expect(koreanTexts).not.toContain('비가 오는 대신에 우산을 가져가세요.');
  });

  it('exports a correct sample with its translation, never with its note', () => {
    const rows = [...lessonExport('1A-8').points, ...lessonExport('2B-8').points].flatMap(point => point.examples);
    expect(rows).toContainEqual(['피곤하지 않아요 / 안 피곤해요.', 'Nem vagyok fáradt.']);
    expect(rows).toContainEqual(['천 원만 있어요.', 'Csak ezer wonom van.']);
    expect(rows.map(row => row[1])).not.toContain('állító mondatban: 만 „csak”');
  });

  it('gives every lesson one export entry per point', () => {
    for (const lesson of LESSONS) expect(buildLessonExport(lesson).points.map(point => point.point)).toEqual(lesson.points.map(point => point.point));
  });

  it('has no HTML, tab, line break or empty side in any row', () => {
    for (const lesson of LESSONS) {
      for (const [korean, hungarian] of allRows(lesson.key)) {
        expect(korean + hungarian).not.toMatch(/[<>\t\n]/);
        expect(korean).not.toBe('');
        expect(hungarian).not.toBe('');
      }
    }
  });

  it('splits the vocabulary into textbook and own words', () => {
    const { vocabulary } = lessonExport('3A-9');
    expect(vocabulary?.textbook).toContainEqual(['한여름', 'a nyár dereka, kánikula']);
    expect(vocabulary?.own).toContainEqual(['폭설', 'heves havazás, nagy hó']);
  });

  it('has only textbook words where the lesson has no own words', () => {
    const { vocabulary } = lessonExport('3A-3');
    expect(vocabulary?.textbook.length).toBeGreaterThan(0);
    expect(vocabulary?.own).toEqual([]);
  });

  it('has no vocabulary where the lesson has none', () => {
    expect(lessonExport('1A-1').vocabulary).toBeNull();
  });

  it('writes one tab-separated line per row, each closed by a line break', () => {
    expect(exportText([['가다', 'megy'], ['먹다', 'eszik']])).toBe('가다\tmegy\n먹다\teszik\n');
    expect(exportText([])).toBe('');
  });
});
