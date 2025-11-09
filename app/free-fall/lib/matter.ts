
import Matter from "matter-js";
import type { MatterCanvasResult } from "@/lib/types";

// オブジェクトの参照を保持するためのインターフェース
interface FreeFallMatterProps {
  ball1Ref: React.RefObject<Matter.Body | null>;
  ball2Ref: React.RefObject<Matter.Body | null>;
}

// Matter.jsのワールドを初期化し、オブジェクトを作成する関数
export const initializeFreeFall = () => {
  // 地面 (1200x800のCanvasに対応)
  const ground = Matter.Bodies.rectangle(600, 800, 1220, 20, {
    isStatic: true,
    render: {
      fillStyle: "rgba(6, 182, 212, 0.8)",
      strokeStyle: "#22d3ee",
      lineWidth: 2,
    },
  });

  // 落下するボール1 (軽い)
  const ball1 = Matter.Bodies.circle(550, 100, 20, {
    density: 0.01, // 密度を低く設定
    restitution: 0.6,
    render: {
      fillStyle: "rgba(236, 72, 153, 0.9)",
      strokeStyle: "#f9a8d4",
      lineWidth: 2,
    },
  });

  // 落下するボール2 (重い)
  const ball2 = Matter.Bodies.circle(650, 100, 40, {
    density: 0.04, // 密度を高く設定
    restitution: 0.6,
    render: {
      fillStyle: "rgba(168, 85, 247, 0.9)",
      strokeStyle: "#d8b4fe",
      lineWidth: 2,
    },
  });

  return { ground, ball1, ball2 };
};

// コンポーネントから呼び出されるメインの関数
export const freeFallMatter = ({
  ball1Ref,
  ball2Ref,
}: FreeFallMatterProps): MatterCanvasResult => {
  const { ground, ball1, ball2 } = initializeFreeFall();

  // 参照にオブジェクトを格納
  ball1Ref.current = ball1;
  ball2Ref.current = ball2;

  // ワールドに追加するすべてのオブジェクトを配列で返す
  return [ground, ball1, ball2];
};

// ボールを落下させる関数
export const dropBalls = (
  ball1: Matter.Body,
  ball2: Matter.Body,
  airResistance: boolean,
) => {
  // 空気抵抗を設定
  ball1.frictionAir = airResistance ? 0.02 : 0;
  ball2.frictionAir = airResistance ? 0.04 : 0; // 重いボールは空気抵抗の影響を大きく受けるように調整

  // ボールを元の位置に戻す
  Matter.Body.setPosition(ball1, { x: 550, y: 100 });
  Matter.Body.setVelocity(ball1, { x: 0, y: 0 });
  Matter.Body.setAngularVelocity(ball1, 0);

  Matter.Body.setPosition(ball2, { x: 650, y: 100 });
  Matter.Body.setVelocity(ball2, { x: 0, y: 0 });
  Matter.Body.setAngularVelocity(ball2, 0);
};
