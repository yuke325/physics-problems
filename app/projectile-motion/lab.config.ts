import type { LabConfig } from "@/lib/labs";

export const labConfig: LabConfig = {
  code: "EX-02",
  title: "投射運動シミュレーター",
  description:
    "初速と角度を調整して、物体がどのように飛んでいくかをシミュレーションします。放物線運動や空気抵抗の影響を視覚的に学べます。",
  tags: ["初速", "角度", "重力"] as const,
  accent: "from-green-500/30 via-emerald-500/10 to-transparent",
  status: "体験可能",
  order: 2,
};

export default labConfig;
