import Matter from "matter-js";
import type { MatterCanvasResult } from "@/lib/types";

// オブジェクトの参照を保持するためのインターフェース
interface ProjectileMotionMatterProps {
  ballRef: React.RefObject<Matter.Body | null>;
  targetRef: React.RefObject<Matter.Body | null>;
}

// Matter.jsのワールドを初期化し、オブジェクトを作成する関数
export const initializeProjectileMotion = () => {
  // 地面 (1200x800のCanvasに対応)
  const ground = Matter.Bodies.rectangle(600, 800, 1220, 20, {
    isStatic: true,
    render: {
      fillStyle: "rgba(6, 182, 212, 0.8)",
      strokeStyle: "#22d3ee",
      lineWidth: 2,
    },
  });

  // 発射台
  const cannonBase = Matter.Bodies.rectangle(80, 775, 120, 10, {
    isStatic: true,
    render: {
      fillStyle: "rgba(150, 150, 150, 1)",
    },
  });

  // 人型のターゲットを作成
  const head = Matter.Bodies.circle(1100, 750, 8, {
    density: 0.005,
    restitution: 0.5,
    render: {
      fillStyle: "#f5d6c4",
    },
  });

  const body = Matter.Bodies.rectangle(1100, 775, 15, 30, {
    density: 0.005,
    restitution: 0.1,
    render: {
      fillStyle: "#4a90e2",
    },
  });

  const target = Matter.Body.create({
    parts: [head, body],
    isStatic: false,
    friction: 0.8,
  });
  Matter.Body.setPosition(target, { x: 1100, y: 760 });

  // 発射されるボール
  const ball = Matter.Bodies.circle(80, 760, 10, {
    density: 0.04,
    restitution: 0.6,
    render: {
      fillStyle: "rgba(236, 72, 153, 0.9)",
      strokeStyle: "#f9a8d4",
      lineWidth: 2,
    },
  });

  return { ground, cannonBase, target, ball };
};

// コンポーネントから呼び出されるメインの関数
export const projectileMotionMatter = ({
  ballRef,
  targetRef,
}: ProjectileMotionMatterProps): MatterCanvasResult => {
  const { ground, cannonBase, target, ball } = initializeProjectileMotion();

  // 参照にオブジェクトを格納
  ballRef.current = ball;
  targetRef.current = target;

  // ワールドに追加するすべてのオブジェクトを配列で返す
  return [ground, cannonBase, target, ball];
};

// ボールを発射する関数
export const fireBall = (
  ball: Matter.Body,
  target: Matter.Body,
  angle: number,
  speed: number,
  airResistance: boolean,
) => {
  // 空気抵抗を設定
  ball.frictionAir = airResistance ? 0.02 : 0;

  // ラジアンに変換
  const angleRad = (angle * Math.PI) / 180;

  // 力を計算
  const forceMagnitude = 0.005 * speed;
  const force = {
    x: forceMagnitude * Math.cos(angleRad),
    y: -forceMagnitude * Math.sin(angleRad),
  };

  // ボールを元の位置に戻す
  Matter.Body.setPosition(ball, { x: 80, y: 760 });
  Matter.Body.setVelocity(ball, { x: 0, y: 0 });
  Matter.Body.setAngularVelocity(ball, 0);

  // ターゲットも元の位置に戻す
  Matter.Body.setPosition(target, { x: 1100, y: 760 });
  Matter.Body.setVelocity(target, { x: 0, y: 0 });
  Matter.Body.setAngularVelocity(target, 0);
  target.parts.forEach((part, index) => {
    if (index === 0) return;
    Matter.Body.setAngle(part, 0);
    Matter.Body.setAngularVelocity(part, 0);
  });

  // 力を加える
  Matter.Body.applyForce(ball, ball.position, force);
};
