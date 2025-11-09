export type GravityMode = "-" | "0" | "+";
export type RestitutionMode = "-0.2" | "0.5" | "1.2";

export const INITIAL_BALL_POSITION = { x: 275, y: 500 };
export const INITIAL_BLOCK_POSITION = { x: 600, y: 125 };

export const getGravityValue = (mode: GravityMode): number => {
  switch (mode) {
    case "-":
      return -0.3;
    case "0":
      return 0;
    case "+":
      return 0.3;
    default:
      return 0;
  }
};

export const getRestitutionValue = (mode: RestitutionMode): number => {
  switch (mode) {
    case "-0.2":
      return -0.2;
    case "0.5":
      return 0.5;
    case "1.2":
      return 1.2;
    default:
      return 1;
  }
};
