import type { LabConfig } from "@/lib/labs";

export const labConfig: LabConfig = {
  code: "EX-04",
  title: "振り子が刻むリズムの謎",
  description:
    "振り子の長さや重さを変え、周期の変動を観察するシミュレーター。振れ幅の大小にかかわらず周期がほぼ一定に保たれる『等時性』の不思議を、その目で確かめよう。",
  tags: ["単振動", "等時性", "周期"] as const,
  accent: "from-yellow-500/30 via-amber-500/10 to-transparent",
  status: "体験可能",
  order: 4,
};

export default labConfig;
