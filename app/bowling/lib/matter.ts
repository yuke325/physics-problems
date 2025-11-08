import Matter from "matter-js";
import type { MatterCanvasResult } from "@/lib/types";

interface AntigravityMatterProps {
  slopeRef: React.RefObject<Matter.Body | null>;
  groundRef: React.RefObject<Matter.Body | null>;
  boxRef: React.RefObject<Matter.Body | null>;
  pinsRef: React.RefObject<Matter.Body[]>;
}

export const initializeAntigravityMatter = () => {
  // 30度の斜面を作成（左側に配置）
  const slopeAngle = (30 * Math.PI) / 180; // 30度をラジアンに変換
  const slopeLength = 400;
  const slopeHeight = 40;

  const slope = Matter.Bodies.rectangle(
    200, // x座標（左側に移動）
    450, // y座標
    slopeLength, // 幅
    slopeHeight, // 高さ
    {
      isStatic: true, // 静的オブジェクト（動かない）
      angle: slopeAngle, // 30度傾ける
      friction: 0.8, // 摩擦係数を設定
      render: {
        fillStyle: "rgba(6, 182, 212, 0.8)",
        strokeStyle: "#22d3ee",
        lineWidth: 2,
      },
    },
  );

  // 斜面の右端の座標を計算
  const slopeEndX = 200 + (slopeLength / 2) * Math.cos(slopeAngle);
  const slopeEndY =
    450 + (slopeLength / 2) * Math.sin(slopeAngle) + slopeHeight / 2;

  // 平面の地面を作成（斜面の右端に接続）
  const groundWidth = 400;
  const ground = Matter.Bodies.rectangle(
    slopeEndX + groundWidth / 2, // 斜面の右端から始まる
    slopeEndY + slopeHeight / 2, // 斜面の下端と同じ高さ
    groundWidth,
    40,
    {
      isStatic: true,
      friction: 0.8,
      render: {
        fillStyle: "rgba(6, 182, 212, 0.8)",
        strokeStyle: "#22d3ee",
        lineWidth: 2,
      },
    },
  );

  // 四角い物体を作成（斜面上に配置）
  // 斜面上の適切な位置を計算
  const boxSize = 50;
  // 斜面の上面に正確に配置するための計算
  const slopeCenterX = 200;
  const slopeCenterY = 450;
  const distanceFromCenter = -150; // 斜面中心からの距離

  // 斜面に沿った位置の計算
  const boxX = slopeCenterX + distanceFromCenter * Math.cos(slopeAngle);
  const boxY =
    slopeCenterY +
    distanceFromCenter * Math.sin(slopeAngle) -
    (slopeHeight / 2 + boxSize / 2) * Math.cos(slopeAngle);

  const box = Matter.Bodies.rectangle(boxX, boxY, boxSize, boxSize, {
    angle: slopeAngle, // 斜面と同じ角度に傾ける
    friction: 0.5, // 箱の摩擦係数
    frictionStatic: 0.8, // 静止摩擦係数
    density: 0.04, // 密度を上げて重くする
    restitution: 0.3, // 反発係数
    render: {
      fillStyle: "rgba(236, 72, 153, 0.9)",
      strokeStyle: "#f9a8d4",
      lineWidth: 3,
    },
  });

  // ボーリングピン風の物体を作成（地面上に配置）
  const pins: Matter.Body[] = [];
  const groundCenterX = slopeEndX + groundWidth / 2;
  const groundTopY = slopeEndY + slopeHeight / 2 - 20; // 地面の上面

  const pinPositions = [
    // 1列目（1本）
    { x: groundCenterX - 50, y: groundTopY - 30 },
    // 2列目（2本）
    { x: groundCenterX - 80, y: groundTopY - 60 },
    { x: groundCenterX - 20, y: groundTopY - 60 },
    // 3列目（3本）
    { x: groundCenterX - 110, y: groundTopY - 90 },
    { x: groundCenterX - 50, y: groundTopY - 90 },
    { x: groundCenterX + 10, y: groundTopY - 90 },
    // 4列目（4本）
    { x: groundCenterX - 140, y: groundTopY - 120 },
    { x: groundCenterX - 80, y: groundTopY - 120 },
    { x: groundCenterX - 20, y: groundTopY - 120 },
    { x: groundCenterX + 40, y: groundTopY - 120 },
    // 5列目（5本）
    { x: groundCenterX - 170, y: groundTopY - 150 },
    { x: groundCenterX - 110, y: groundTopY - 150 },
    { x: groundCenterX - 50, y: groundTopY - 150 },
    { x: groundCenterX + 10, y: groundTopY - 150 },
    { x: groundCenterX + 70, y: groundTopY - 150 },
  ];

  pinPositions.forEach((pos) => {
    const pin = Matter.Bodies.rectangle(pos.x, pos.y, 15, 50, {
      friction: 0.5,
      density: 0.001,
      restitution: 0.5,
      render: {
        fillStyle: "rgba(251, 191, 36, 0.9)",
        strokeStyle: "#fbbf24",
        lineWidth: 2,
      },
    });
    pins.push(pin);
  });

  return { slope, ground, box, pins };
};

export const antigravityMatter = ({
  slopeRef,
  groundRef,
  boxRef,
  pinsRef,
}: AntigravityMatterProps): MatterCanvasResult => {
  const { slope, ground, box, pins } = initializeAntigravityMatter();
  slopeRef.current = slope;
  groundRef.current = ground;
  boxRef.current = box;
  pinsRef.current = pins;

  return [slope, ground, box, ...pins];
};
