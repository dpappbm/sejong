import { describe, expect, it } from 'vitest';
import { audioId, plainText, spokenText } from '../../../scripts/audio/spoken-text.mjs';

describe('plainText', () => {
  it('drops the markup and decodes entities', () => {
    expect(plainText('3월에 <b>입학을</b> 해요.')).toBe('3월에 입학을 해요.');
    expect(plainText('밥을 먹어요?<br>네.&nbsp;먹어요.')).toBe('밥을 먹어요? 네. 먹어요.');
  });
});

describe('spokenText', () => {
  it.each([
    ['요즘 좀 피곤<b>해 보여요</b>.', '요즘 좀 피곤해 보여요.'],
    ['가: 뭐 먹을까요? 나: 비빔밥 먹어요.', '뭐 먹을까요? 비빔밥 먹어요.'],
    ['지금 뭐 해? – 음악 들어.', '지금 뭐 해? 음악 들어.'],
    ['한국 영화 〈<b>괴물</b>〉을 좋아해요.', '한국 영화 괴물을 좋아해요.'],
    ['내일은 덜 더웠으면….', '내일은 덜 더웠으면.'],
    ['하나/한', '하나, 한'],
    ['잊어버리다 / 깜빡하다', '잊어버리다, 깜빡하다'],
  ])('reads %s as %s', (text, spoken) => {
    expect(spokenText(text)).toBe(spoken);
  });

  it('prefers the form given in overrides.json, looked up without markup', () => {
    expect(
      spokenText('서울에 산 지 <b>5년이</b> 됐어요.', { '서울에 산 지 5년이 됐어요.': '서울에 산 지 오 년이 됐어요.' })
    ).toBe('서울에 산 지 오 년이 됐어요.');
  });

  it.each([
    '3월 15일에 한국에 가요.',
    '케이팝(K-POP)',
    '(옷을) 입다',
    '-와/과 관련되다',
    '일을/업무를 맡다',
    '놓고/두고 오다',
    '…',
  ])('refuses to guess the form of %s', text => {
    expect(() => spokenText(text)).toThrow('spokenForms');
  });
});

describe('audioId', () => {
  it('is stable and depends on the spoken text', () => {
    expect(audioId('나라')).toMatch(/^[0-9a-f]{12}$/);
    expect(audioId('나라')).toBe(audioId('나라'));
    expect(audioId('나라')).not.toBe(audioId('나라.'));
  });
});
