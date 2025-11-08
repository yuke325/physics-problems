export type Pathway = {
  title: string;
  body: string;
};

export const pathways: readonly Pathway[] = [
  {
    title: "気になる現象だけを選択",
    body: "各テーマは独立したショーケース。連続クイズではなく、興味を惹かれた瞬間に飛び込み、すぐにブラウザで挙動を確かめられます。",
  },
  {
    title: "シミュレーションで“面白さ”を共有",
    body: "Matter.js を軸にした物理シミュレーションで、式よりもまず動きから驚きを掴む設計。設定値の変化が視覚的に伝わります。",
  },
  {
    title: "モダンな物理美術館のように",
    body: "ダークトーンとグラデーションを基調にしつつ、アクセントカラーで物理量を想起させる UI を構築。",
  },
];
