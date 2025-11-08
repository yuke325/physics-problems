import type { LabConfig } from "@/lib/labs";

export const labConfig: LabConfig = {
  code: "EX-03",
  title: "振り子シミュレーター",
  description:
    "振り子の長さや重さを変えると、周期がどのように変化するかを観察できます。等時性の不思議を視覚的に体験しましょう。",
  tags: ["周期運動", "等時性", "Constraint"] as const,
  accent: "from-yellow-500/30 via-amber-500/10 to-transparent",
  status: "体験可能",
  order: 3,
};

export default labConfig;
