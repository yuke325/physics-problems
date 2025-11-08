import type { LabConfig } from "@/lib/labs";

export const labConfig: LabConfig = {
  code: "EX-01",
  title: "反重力ボウリング",
  description:
    "もしも重力が逆向きに働いたら？斜面上のボウリングピンを舞台に、反重力と負の摩擦係数が織りなす非直感的な世界を体験。物理法則の反転がもたらす意外な結末とは。",
  tags: ["反重力", "負の摩擦", "物理演算"] as const,
  accent: "from-purple-500/30 via-indigo-500/10 to-transparent",
  status: "体験可能",
  order: 1,
};

export default labConfig;
