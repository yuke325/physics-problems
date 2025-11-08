export type MatterCanvasResult = Array<
  Matter.Body | Matter.Composite | Matter.Constraint | Matter.MouseConstraint
>;

export interface AntigravityMatterProps {
  slopeRef: React.RefObject<Matter.Body | null>;
  groundRef: React.RefObject<Matter.Body | null>;
  boxRef: React.RefObject<Matter.Body | null>;
  pinsRef: React.RefObject<Matter.Body[]>;
}
