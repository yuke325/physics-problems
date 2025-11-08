import Matter from "matter-js";
import type { MatterCanvasResult } from "@/lib/types";

interface AntigravityMatterProps {
  slopeRef: React.RefObject<Matter.Body | null>;
  groundRef: React.RefObject<Matter.Body | null>;
  boxRef: React.RefObject<Matter.Body | null>;
  pinsRef: React.RefObject<Matter.Body[]>;
}

export const initializeAntigravityMatter = () => {
  // --- 地面の設計 ---
  const ground = Matter.Bodies.rectangle(600, 790, 1220, 20, {
    isStatic: true,
    friction: 0.8,
    render: { fillStyle: "rgba(100, 100, 100, 0.8)" },
  });

  // --- レーンの設計 (静的ボディを組み合わせる) ---
  const laneHeight = 20;
  const laneRender = {
    fillStyle: "rgba(6, 182, 212, 0.8)",
    strokeStyle: "#22d3ee",
    lineWidth: 2,
  };

  // 1. 斜面部分
  const slopeAngle = (20 * Math.PI) / 180;
  const slopeWidth = 600;
  const slopeStart = { x: 150, y: 400 };
  const slope = Matter.Bodies.rectangle(
    slopeStart.x + (slopeWidth / 2) * Math.cos(slopeAngle),
    slopeStart.y + (slopeWidth / 2) * Math.sin(slopeAngle),
    slopeWidth,
    laneHeight,
    {
      isStatic: true,
      angle: slopeAngle,
      friction: 0.8,
      render: laneRender,
    },
  );

  // 2. 水平部分
  const horizontalWidth = 500;
  // 斜面の終点を計算
  const slopeEndX = slope.position.x + (slopeWidth / 2) * Math.cos(slopeAngle);
  const slopeEndY = slope.position.y + (slopeWidth / 2) * Math.sin(slopeAngle);
  // 水平レーンの始点を斜面の終点に合わせる
  const horizontalLane = Matter.Bodies.rectangle(
    slopeEndX + horizontalWidth / 2,
    slopeEndY,
    horizontalWidth,
    laneHeight,
    {
      isStatic: true,
      friction: 0.8,
      render: laneRender,
    },
  );

  // --- 箱の設計 ---
  const boxSize = 30;
  // 斜面の始点近くの表面に箱を配置
  const boxStartX =
    slope.position.x - (slopeWidth / 2 - 50) * Math.cos(slopeAngle);
  const boxStartY =
    slope.position.y - (slopeWidth / 2 - 50) * Math.sin(slopeAngle);

  const box = Matter.Bodies.rectangle(
    boxStartX,
    boxStartY - boxSize / 2,
    boxSize,
    boxSize,
    {
      angle: slopeAngle,
      friction: 0.5,
      frictionStatic: 0.8,
      density: 0.02,
      restitution: 0.1,
      render: {
        fillStyle: "rgba(236, 72, 153, 0.9)",
        strokeStyle: "#f9a8d4",
        lineWidth: 3,
      },
    },
  );

  // --- ピンの設計 ---
  const pins: Matter.Body[] = [];
  const pinWidth = 15;
  const pinHeight = 40;
  const pinSpacingX = 20;
  const pinSpacingY = 40;
  // 水平レーンの上にピンを配置
  const pinStartX = horizontalLane.position.x - 20;
  const pinStartY =
    horizontalLane.position.y - laneHeight / 2 - pinHeight / 2 - 5;

  const pinPositions = [
    { x: pinStartX, y: pinStartY },
    { x: pinStartX + pinSpacingX, y: pinStartY },
    { x: pinStartX + 2 * pinSpacingX, y: pinStartY },
    { x: pinStartX + 3 * pinSpacingX, y: pinStartY },
    { x: pinStartX + 4 * pinSpacingX, y: pinStartY },
    { x: pinStartX + 5 * pinSpacingX, y: pinStartY },
    { x: pinStartX + pinSpacingX / 2, y: pinStartY - pinSpacingY },
    { x: pinStartX + 1.5 * pinSpacingX, y: pinStartY - pinSpacingY },
    { x: pinStartX + 2.5 * pinSpacingX, y: pinStartY - pinSpacingY },
    { x: pinStartX + 3.5 * pinSpacingX, y: pinStartY - pinSpacingY },
    { x: pinStartX + 4.5 * pinSpacingX, y: pinStartY - pinSpacingY },
    { x: pinStartX + 1 * pinSpacingX, y: pinStartY - 2 * pinSpacingY },
    { x: pinStartX + 2 * pinSpacingX, y: pinStartY - 2 * pinSpacingY },
    { x: pinStartX + 3 * pinSpacingX, y: pinStartY - 2 * pinSpacingY },
    { x: pinStartX + 4 * pinSpacingX, y: pinStartY - 2 * pinSpacingY },
    { x: pinStartX + 1.5 * pinSpacingX, y: pinStartY - 3 * pinSpacingY },
    { x: pinStartX + 2.5 * pinSpacingX, y: pinStartY - 3 * pinSpacingY },
    { x: pinStartX + 3.5 * pinSpacingX, y: pinStartY - 3 * pinSpacingY },
    { x: pinStartX + 3 * pinSpacingX, y: pinStartY - 4 * pinSpacingY },
    { x: pinStartX + 2 * pinSpacingX, y: pinStartY - 4 * pinSpacingY },
    { x: pinStartX + 2.5 * pinSpacingX, y: pinStartY - 5 * pinSpacingY },
  ];

  pinPositions.forEach((pos) => {
    const pin = Matter.Bodies.rectangle(pos.x, pos.y, pinWidth, pinHeight, {
      friction: 0.5,
      density: 0.05,
      restitution: 0.5,
      render: {
        fillStyle: "rgba(251, 191, 36, 0.9)",
        strokeStyle: "#fbbf24",
        lineWidth: 2,
      },
    });
    pins.push(pin);
  });

  // slopeRefには主要なレーンパーツ（斜面）を渡す
  const laneForRef = slope;

  return { ground, slope: laneForRef, horizontalLane, box, pins };
};

export const antigravityMatter = ({
  slopeRef,
  groundRef,
  boxRef,
  pinsRef,
}: AntigravityMatterProps): MatterCanvasResult => {
  const { ground, slope, horizontalLane, box, pins } =
    initializeAntigravityMatter();
  slopeRef.current = slope;
  groundRef.current = ground; // groundRefも正しく設定
  boxRef.current = box;
  pinsRef.current = pins;

  return [ground, slope, horizontalLane, box, ...pins];
};
