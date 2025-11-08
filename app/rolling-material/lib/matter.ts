import Matter from "matter-js";
import type { MatterCanvasResult } from "@/lib/types";

interface RollingMaterialMatterProps {
  slopeRef: React.RefObject<Matter.Body | null>;
  circleRef: React.RefObject<Matter.Body | null>;
}

export const initializePosition = () => {
  // 30度の斜面を作成（左側に配置）
  const slopeAngle = (30 * Math.PI) / 180; // 30度をラジアンに変換
  const slopeLength = 800;
  const slopeHeight = 30;

  const slope = Matter.Bodies.rectangle(
    400, // x座標（左側に移動）
    350, // y座標
    slopeLength, // 幅
    slopeHeight, // 高さ
    {
      isStatic: true, // 静的オブジェクト（動かない）
      angle: slopeAngle, // 30度傾ける
      friction: 0.8, // 摩擦係数を設定
      render: {
        fillStyle: "#2ecc71",
      },
    },
  );

  // 四角い物体を作成（斜面上に配置）
  // 斜面上の適切な位置を計算
  const boxSize = 50;
  // 斜面の上面に正確に配置するための計算
  const slopeCenterX = 400;
  const slopeCenterY = 350;
  const distanceFromCenter = -350; // 斜面中心からの距離

  // 斜面に沿った位置の計算
  const boxX = slopeCenterX + distanceFromCenter * Math.cos(slopeAngle);
  const boxY =
    slopeCenterY +
    distanceFromCenter * Math.sin(slopeAngle) -
    (slopeHeight / 2 + boxSize / 2) * Math.cos(slopeAngle);

  const circle = Matter.Bodies.circle(boxX, boxY, 20, {
    angle: slopeAngle, // 斜面と同じ角度に傾ける
    friction: 0.5, // 箱の摩擦係数
    frictionStatic: 0.8, // 静止摩擦係数
    density: 0.04, // 密度を上げて重くする
    restitution: 0.3, // 反発係数
    render: {
      fillStyle: "#e74c3c",
    },
  });

  return { slope, circle };
};

export const rollingMaterialMatter = ({
  slopeRef,
  circleRef,
}: RollingMaterialMatterProps): MatterCanvasResult => {
  const { slope, circle } = initializePosition();
  slopeRef.current = slope;
  circleRef.current = circle;

  return [slope, circle];
};
