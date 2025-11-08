import type { LabConfig } from "@/lib/labs";

export const labConfig: LabConfig = {
  code: "EX-05",
  title: "クーロン力で動く電子",
  description:
    "電荷間に働くクーロン力をシミュレーション。電子が正電荷に引き寄せられる様子や、負電荷に反発される様子を視覚的に観察できます。",
  tags: ["クーロン力", "電荷", "静電気力"] as const,
  accent: "from-blue-500/30 via-indigo-500/10 to-transparent",
  status: "体験可能",
  order: 5,
};

export default labConfig;
