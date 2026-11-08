import { describe, expect, it } from 'vitest';
import { createWord, formalEnding, modifierForm, plainStyleStatement, withAOrEo, withEu, withPast, withPlainStem } from './conjugation';

const verb = (dictionaryForm: string) => createWord(dictionaryForm, 'verb');
const adjective = (dictionaryForm: string) => createWord(dictionaryForm, 'adjective');

// Known textbook forms: [computed, expected].
const cases: [string | null, string][] = [
 // -아/어 stem
 [withAOrEo(verb('가다'),'요'),'가요'],[withAOrEo(verb('먹다'),'요'),'먹어요'],[withAOrEo(verb('보다'),'요'),'봐요'],[withAOrEo(verb('오다'),'요'),'와요'],[withAOrEo(verb('주다'),'요'),'줘요'],[withAOrEo(verb('배우다'),'요'),'배워요'],
 [withAOrEo(verb('마시다'),'요'),'마셔요'],[withAOrEo(verb('가르치다'),'요'),'가르쳐요'],[withAOrEo(verb('되다'),'요'),'돼요'],[withAOrEo(verb('쉬다'),'요'),'쉬어요'],[withAOrEo(verb('보내다'),'요'),'보내요'],[withAOrEo(verb('서다'),'요'),'서요'],
 [withAOrEo(verb('공부하다'),'요'),'공부해요'],[withAOrEo(adjective('좋다'),'요'),'좋아요'],[withAOrEo(verb('살다'),'요'),'살아요'],[withAOrEo(verb('만들다'),'요'),'만들어요'],[withAOrEo(verb('읽다'),'요'),'읽어요'],[withAOrEo(verb('켜다'),'요'),'켜요'],
 [withAOrEo(verb('듣다'),'요'),'들어요'],[withAOrEo(verb('걷다'),'요'),'걸어요'],[withAOrEo(verb('묻다'),'요'),'물어요'],[withAOrEo(verb('깨닫다'),'요'),'깨달아요'],[withAOrEo(verb('받다'),'요'),'받아요'],[withAOrEo(verb('닫다'),'요'),'닫아요'],
 [withAOrEo(adjective('덥다'),'요'),'더워요'],[withAOrEo(adjective('춥다'),'요'),'추워요'],[withAOrEo(verb('돕다'),'요'),'도와요'],[withAOrEo(adjective('가볍다'),'요'),'가벼워요'],[withAOrEo(verb('입다'),'요'),'입어요'],[withAOrEo(adjective('좁다'),'요'),'좁아요'],[withAOrEo(verb('잡다'),'요'),'잡아요'],
 [withAOrEo(verb('짓다'),'요'),'지어요'],[withAOrEo(adjective('낫다'),'요'),'나아요'],[withAOrEo(verb('붓다'),'요'),'부어요'],[withAOrEo(verb('씻다'),'요'),'씻어요'],[withAOrEo(verb('웃다'),'요'),'웃어요'],[withAOrEo(verb('벗다'),'요'),'벗어요'],
 [withAOrEo(adjective('그렇다'),'요'),'그래요'],[withAOrEo(adjective('어떻다'),'요'),'어때요'],[withAOrEo(adjective('빨갛다'),'요'),'빨개요'],[withAOrEo(adjective('하얗다'),'요'),'하얘요'],[withAOrEo(adjective('노랗다'),'요'),'노래요'],[withAOrEo(verb('놓다'),'요'),'놓아요'],[withAOrEo(verb('넣다'),'요'),'넣어요'],
 [withAOrEo(verb('모르다'),'요'),'몰라요'],[withAOrEo(verb('부르다'),'요'),'불러요'],[withAOrEo(adjective('다르다'),'요'),'달라요'],[withAOrEo(adjective('빠르다'),'요'),'빨라요'],[withAOrEo(verb('고르다'),'요'),'골라요'],
 [withAOrEo(adjective('바쁘다'),'요'),'바빠요'],[withAOrEo(verb('쓰다'),'요'),'써요'],[withAOrEo(adjective('크다'),'요'),'커요'],[withAOrEo(adjective('예쁘다'),'요'),'예뻐요'],[withAOrEo(adjective('아프다'),'요'),'아파요'],[withAOrEo(adjective('기쁘다'),'요'),'기뻐요'],[withAOrEo(verb('끄다'),'요'),'꺼요'],
 // past
 [withPast(verb('가다'),'어요'),'갔어요'],[withPast(verb('먹다'),'어요'),'먹었어요'],[withPast(verb('하다'),'어요'),'했어요'],[withPast(verb('듣다'),'어요'),'들었어요'],[withPast(adjective('덥다'),'어요'),'더웠어요'],[withPast(verb('모르다'),'어요'),'몰랐어요'],[withPast(adjective('그렇다'),'어요'),'그랬어요'],[withPast(verb('마시다'),'어요'),'마셨어요'],[withPast(verb('짓다'),'어요'),'지었어요'],[withPast(adjective('바쁘다'),'어요'),'바빴어요'],
 // optional (으)
 [withEu(verb('가다'),'면'),'가면'],[withEu(verb('먹다'),'면'),'먹으면'],[withEu(verb('만들다'),'면'),'만들면'],[withEu(verb('듣다'),'면'),'들으면'],[withEu(adjective('덥다'),'면'),'더우면'],[withEu(verb('돕다'),'면'),'도우면'],[withEu(verb('짓다'),'면'),'지으면'],[withEu(adjective('그렇다'),'면'),'그러면'],[withEu(verb('모르다'),'면'),'모르면'],[withEu(adjective('바쁘다'),'면'),'바쁘면'],
 [withEu(verb('만들다'),'세요'),'만드세요'],[withEu(verb('읽다'),'세요'),'읽으세요'],[withEu(verb('듣다'),'세요'),'들으세요'],[withEu(verb('가다'),'세요'),'가세요'],[withEu(verb('살다'),'니까'),'사니까'],[withEu(verb('만들다'),'러 가요'),'만들러 가요'],[withEu(verb('놀다'),'려고 해요'),'놀려고 해요'],
 [withEu(verb('만들다'),'ㄴ'),'만든'],[withEu(verb('만들다'),'ㄹ 거예요'),'만들 거예요'],[withEu(verb('만들다'),'ㄹ까요?'),'만들까요?'],[withEu(verb('먹다'),'ㄹ까요?'),'먹을까요?'],[withEu(verb('가다'),'ㄹ까요?'),'갈까요?'],[withEu(verb('먹다'),'ㄴ'),'먹은'],[withEu(verb('가다'),'ㄴ'),'간'],
 [withEu(adjective('덥다'),'ㄴ'),'더운'],[withEu(adjective('춥다'),'ㄹ 거예요'),'추울 거예요'],[withEu(adjective('빨갛다'),'ㄴ'),'빨간'],[withEu(adjective('그렇다'),'ㄹ'),'그럴'],[withEu(verb('듣다'),'ㄴ'),'들은'],[withEu(verb('짓다'),'ㄴ'),'지은'],[withEu(adjective('길다'),'ㄴ'),'긴'],[withEu(adjective('하얗다'),'ㄴ'),'하얀'],
 [withEu(verb('만들다'),'ㅂ니다'),'만듭니다'],[withEu(verb('알다'),'시-'),'아시-'],[withEu(verb('듣다'),'ㄹ게요'),'들을게요'],[withEu(verb('돕다'),'ㄹ게요'),'도울게요'],
 // plain stem (consonant-initial endings)
 [withPlainStem(verb('만들다'),'는'),'만드는'],[withPlainStem(verb('살다'),'네요'),'사네요'],[withPlainStem(verb('먹다'),'고'),'먹고'],[withPlainStem(verb('만들다'),'고'),'만들고'],[withPlainStem(adjective('그렇다'),'네요'),'그렇네요'],[withPlainStem(verb('알다'),'니?'),'아니?'],
 // formal ending, plain style statement, modifier form
 [formalEnding(verb('가다')),'갑니다'],[formalEnding(verb('먹다')),'먹습니다'],[formalEnding(verb('만들다')),'만듭니다'],[formalEnding(adjective('덥다')),'덥습니다'],[formalEnding(verb('살다'), true),'삽니까?'],
 [plainStyleStatement(verb('가다')),'간다'],[plainStyleStatement(verb('먹다')),'먹는다'],[plainStyleStatement(verb('만들다')),'만든다'],[plainStyleStatement(adjective('바쁘다')),'바쁘다'],[plainStyleStatement(createWord('있다','adjective')),'있다'],[plainStyleStatement(verb('듣다')),'듣는다'],
 [modifierForm(verb('먹다'),'present'),'먹는'],[modifierForm(verb('먹다'),'past'),'먹은'],[modifierForm(verb('먹다'),'future'),'먹을'],[modifierForm(adjective('작다'),'present'),'작은'],[modifierForm(createWord('맛있다','adjective'),'present'),'맛있는'],[modifierForm(createWord('있다','adjective'),'present'),'있는'],[modifierForm(verb('만들다'),'present'),'만드는'],[modifierForm(verb('만들다'),'past'),'만든'],
];

describe('conjugation engine', () => {
  it.each(cases.map(([computed, expected]) => [expected, computed]))('%s', (expected, computed) => {
    expect(computed).toBe(expected);
  });

  it('covers all known forms', () => {
    expect(cases).toHaveLength(127);
  });
});
