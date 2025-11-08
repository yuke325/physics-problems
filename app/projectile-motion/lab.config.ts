import type { LabConfig } from "@/lib/labs";

export const labConfig: LabConfig = {
  code: "EX-03",
  title: "放物線の軌跡を描く",
  description:
    "初速と角度が生み出す放物線の軌跡をシミュレーション。空気抵抗の有無で、理想的な運動と現実の運動の違いを視覚的に比較・探求できます。",
  tags: ["放物運動", "空気抵抗", "射程距離"] as const,
  accent: "from-green-500/30 via-emerald-500/10 to-transparent",
  status: "体験可能",
  order: 3,
};

export default labConfig;
