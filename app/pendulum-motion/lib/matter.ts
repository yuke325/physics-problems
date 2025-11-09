import Matter from "matter-js";
import type { MatterCanvasResult } from "@/lib/types";

interface PendulumWaveMatterProps {
  pendulumsRef: React.RefObject<
    Array<{
      bob: Matter.Body;
      constraint: Matter.Constraint;
    }>
  >;
  numPendulums: number;
}

// ペンデュラムウェーブを生成する関数
export const initializePendulumWave = (numPendulums: number) => {
  const worldWidth = 1200;
  const pendulums = [];
  // 振り子間のスペースを動的に計算
  const spacing = worldWidth / (numPendulums + 1);
  const bobRadius = Math.max(5, Math.min(15, spacing / 2.5)); // おもりの半径も動的に

  const maxOscillations = 50; // 最長の振り子が完了する振動の数
  const baseLength = 600; // 最長の振り子の基準長

  // 衝突しないように、すべての振り子を同じ負のグループに入れる
  const collisionGroup = -1;

  for (let i = 0; i < numPendulums; i++) {
    const oscillations = maxOscillations + i;
    const length = baseLength * (maxOscillations / oscillations) ** 2;

    const anchorX = (i + 1) * spacing;
    const anchor = { x: anchorX, y: 50 };

    const bob = Matter.Bodies.circle(anchor.x, anchor.y + length, bobRadius, {
      density: 0.04,
      restitution: 0.8,
      friction: 0.01,
      frictionAir: 0.001,
      collisionFilter: {
        group: collisionGroup,
      },
      render: {
        fillStyle: `hsl(${(i / numPendulums) * 360}, 90%, 60%)`, // 色を虹色に
        strokeStyle: `hsl(${(i / numPendulums) * 360}, 90%, 40%)`,
        lineWidth: 2,
      },
    });

    const constraint = Matter.Constraint.create({
      pointA: anchor,
      bodyB: bob,
      length: length,
      stiffness: 0.9,
      render: {
        strokeStyle: "rgba(255, 255, 255, 0.5)",
        lineWidth: 1,
      },
    });

    pendulums.push({ bob, constraint });
  }

  return pendulums;
};

// コンポーネントから呼び出されるメインの関数
export const pendulumMotionMatter = ({
  pendulumsRef,
  numPendulums,
}: PendulumWaveMatterProps): MatterCanvasResult => {
  const pendulums = initializePendulumWave(numPendulums);
  pendulumsRef.current = pendulums;

  const allObjects = pendulums.flatMap(({ bob, constraint }) => [
    bob,
    constraint,
  ]);

  return allObjects;
};

// 振り子を動かし始める関数
export const startPendulumWave = (
  pendulums: Array<{ bob: Matter.Body; constraint: Matter.Constraint }>,
) => {
  pendulums.forEach(({ bob, constraint }) => {
    // 振り子の糸の長さを取得
    const length = constraint.length;
    // 固定点の位置を取得
    const anchor = constraint.pointA;

    // 振り子を30度横にずらす
    const angleOffset = Math.PI / 6; // 30度
    const newX = anchor.x - length * Math.sin(angleOffset);
    const newY = anchor.y + length * Math.cos(angleOffset);

    Matter.Body.setPosition(bob, { x: newX, y: newY });
    Matter.Body.setVelocity(bob, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(bob, 0);
  });
};
