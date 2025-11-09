import Matter from "matter-js";
import type { MatterCanvasResult } from "@/lib/types";

interface RollingMaterialMatterProps {
  slopeRef: React.RefObject<Matter.Body | null>;
  circleRef: React.RefObject<Matter.Body | null>;
}

export const initializeRollingMaterial = () => {
  // 地面 (1200x800のCanvasに対応)
  const ground = Matter.Bodies.rectangle(600, 800, 1220, 20, {
    isStatic: true,
    render: {
      fillStyle: "rgba(100, 100, 100, 0.8)",
    },
  });

  // 20度の斜面を作成
  const slopeAngle = (20 * Math.PI) / 180;
  const slopeWidth = 1000;
  const slopeHeight = 20;
  const slopeX = 500;
  const slopeY = 500;

  const slope = Matter.Bodies.rectangle(
    slopeX,
    slopeY,
    slopeWidth,
    slopeHeight,
    {
      isStatic: true,
      angle: slopeAngle,
      friction: 0.8,
      render: {
        fillStyle: "rgba(6, 182, 212, 0.8)",
        strokeStyle: "#22d3ee",
        lineWidth: 2,
      },
    },
  );

  // 円盤を斜面の上に配置
  const circleRadius = 25;
  const distanceFromCenter = -slopeWidth / 2 + 50; // 斜面の左端近く

  const circleX =
    slopeX +
    distanceFromCenter * Math.cos(slopeAngle) -
    (slopeHeight / 2 + circleRadius) * Math.sin(slopeAngle);
  const circleY =
    slopeY +
    distanceFromCenter * Math.sin(slopeAngle) -
    (slopeHeight / 2 + circleRadius) * Math.cos(slopeAngle);

  const circle = Matter.Bodies.circle(circleX, circleY, circleRadius, {
    angle: slopeAngle,
    friction: 0.5,
    frictionStatic: 0.8,
    density: 0.01,
    restitution: 0.3,
    render: {
      fillStyle: "rgba(168, 85, 247, 0.9)",
      strokeStyle: "#c084fc",
      lineWidth: 3,
    },
  });

  return { ground, slope, circle };
};

export const rollingMaterialMatter = ({
  slopeRef,
  circleRef,
}: RollingMaterialMatterProps): MatterCanvasResult => {
  const { ground, slope, circle } = initializeRollingMaterial();
  slopeRef.current = slope;
  circleRef.current = circle;

  return [ground, slope, circle];
};
