import type { LabConfig } from "@/lib/labs";

export const labConfig: LabConfig = {
  code: "EX-02",
  title: "アンチグラビティ・ボウリング",
  description:
    "斜面上の箱とボウリングピンを舞台に、重力方向と摩擦係数を反転させて非直感的な挙動を検証するセット。ピン配置まで物理演算で再現します。",
  tags: ["逆重力", "摩擦", "ボウリング"] as const,
  accent: "from-purple-500/30 via-indigo-500/10 to-transparent",
  status: "体験可能",
  order: 2,
};

export default labConfig;
