// 質問への回答の選択肢
export const QUESTION_OPTIONS = [
  "静かに一人で蕎麦と酒を楽しみたい",
  "同じ趣味・話題を持つ人と話したい",
  "新しい飲み友を見つけたい",
  "スタッフと色々な話がしたい",
  "特に何も期待しない／流れに任せる",
] as const;

export type QuestionOption = (typeof QUESTION_OPTIONS)[number];
