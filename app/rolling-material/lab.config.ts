import type { LabConfig } from "@/lib/labs";

export const labConfig: LabConfig = {
  code: "EX-01",
  title: "斜面ダイナミクス研究所",
  description:
    "重力・摩擦・密度の3パラメータをワンタップで切り替え、円盤が斜面を転がるスピードとエネルギーの移り変わりを直感的に確認できます。",
  tags: ["重力", "摩擦", "密度"] as const,
  accent: "from-cyan-500/30 via-sky-500/10 to-transparent",
  status: "体験可能",
  order: 1,
};

export default labConfig;
