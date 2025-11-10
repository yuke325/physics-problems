export type MatterCanvasResult = Array<
  Matter.Body | Matter.Composite | Matter.Constraint | Matter.MouseConstraint
>;

export interface CanvasItemInfo {
  title: string;
  description: string;
  explanation: string;
}

export interface LabConfig extends CanvasItemInfo {
  code: string;
  tags: readonly string[];
  order: number;
  accent?: string;
  status?: string;
}

export interface LabSummary extends LabConfig {
  slug: string;
}
