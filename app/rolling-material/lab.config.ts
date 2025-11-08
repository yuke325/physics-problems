import type { LabConfig } from "@/lib/labs";

export const labConfig: LabConfig = {
  code: "EX-02",
  title: "転がる円盤の動力学",
  description:
    "重力・摩擦・慣性の三要素を操り、円盤が斜面を転がる速度とエネルギーの変化を探る実験室。位置エネルギーから運動エネルギーへの移ろいを直感的に捉えよう。",
  tags: ["動力学", "エネルギー保存", "慣性モーメント"] as const,
  accent: "from-cyan-500/30 via-sky-500/10 to-transparent",
  status: "体験可能",
  order: 2,
};

export default labConfig;
