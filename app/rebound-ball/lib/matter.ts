import Matter from "matter-js";
import type { MatterCanvasResult } from "@/lib/types";

interface ReboundBallProps {
  groundRef: React.RefObject<Matter.Body | null>;
  leftWallRef: React.RefObject<Matter.Body | null>;
  rightWallRef: React.RefObject<Matter.Body | null>;
  ceilingRef: React.RefObject<Matter.Body | null>;
  ballRef: React.RefObject<Matter.Body | null>;
  blockRef: React.RefObject<Matter.Body | null>;
}

export const reboundBallMatter = ({
  groundRef,
  leftWallRef,
  rightWallRef,
  ballRef,
  ceilingRef,
  blockRef,
}: ReboundBallProps): MatterCanvasResult => {
  // 地面
  const ground = Matter.Bodies.rectangle(500, 590, 1000, 20, {
    isStatic: true,
    restitution: 1,
    render: {
      fillStyle: "#3498db",
    },
  });
  groundRef.current = ground;

  // 天井（低く設定）
  const ceiling = Matter.Bodies.rectangle(500, 10, 1000, 20, {
    isStatic: true,
    restitution: 1,
    render: {
      fillStyle: "#3498db",
    },
  });
  ceilingRef.current = ceiling;

  // 左の壁
  const leftWall = Matter.Bodies.rectangle(0, 300, 350, 590, {
    isStatic: true,
    restitution: 1.2,
    render: {
      fillStyle: "#3498db",
    },
  });
  leftWallRef.current = leftWall;

  // 右の壁（短い方）
  const rightWall = Matter.Bodies.rectangle(550, 300, 350, 400, {
    isStatic: true,
    restitution: 1.2,
    render: {
      fillStyle: "#3498db",
    },
  });
  rightWallRef.current = rightWall;

  // 右の壁の上に置く物体（ブロック）
  const block = Matter.Bodies.rectangle(600, 225, 50, 50, {
    isStatic: false,
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    density: 0.002,
    render: {
      fillStyle: "#9b59b6",
    },
  });
  blockRef.current = block;

  // ボール
  const ball = Matter.Bodies.circle(275, 500, 20, {
    restitution: 1.2,
    friction: 0,
    frictionAir: 0,
    density: 0.001,
    render: {
      fillStyle: "#f39c12",
    },
  });
  ballRef.current = ball;

  return [ground, ceiling, leftWall, rightWall, block, ball];
};
