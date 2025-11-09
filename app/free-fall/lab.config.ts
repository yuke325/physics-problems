
import type { LabConfig } from "@/lib/labs";

export const labConfig: LabConfig = {
  code: "EX-06",
  title: "重力と自由落下",
  description:
    "異なる質量の物体が、空気抵抗の有無によってどのように落下するかをシミュレーション。重力の本質と物体の運動法則を探求します。",
  tags: ["自由落下", "重力", "空気抵抗", "質量"] as const,
  accent: "from-sky-500/30 via-cyan-500/10 to-transparent",
  status: "体験可能",
  order: 6,
};

export default labConfig;
