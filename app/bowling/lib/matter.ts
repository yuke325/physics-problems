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
  const groundWidth = 600;
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
  const slopeHeight = slopeStart.y + (slopeWidth / 2) * Math.sin(slopeAngle);
  const slope = Matter.Bodies.rectangle(
    slopeStart.x + (slopeWidth / 2) * Math.cos(slopeAngle),
    slopeHeight,
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
  const circleSize = 20;
  // 斜面の始点近くの表面に箱を配置
  const circleStartX =
    slope.position.x - (slopeWidth / 2 - 50) * Math.cos(slopeAngle);
  const circleStartY =
    slope.position.y - (slopeWidth / 2 - 50) * Math.sin(slopeAngle);

  const circle = Matter.Bodies.circle(
    circleStartX,
    circleStartY - circleSize / 2,
    circleSize,
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
  const pinWidth = 25;
  const pinHeight = 45;

  const groundCenterX = slopeEndX + groundWidth / 2;
  const groundTopY = slopeEndY - 20; // 地面の上面

  const pinPositions = [
    // 1列目（1本）
    { x: groundCenterX - 50, y: groundTopY - 192 },
    // 2列目（2本）
    { x: groundCenterX - 65, y: groundTopY - 149 },
    { x: groundCenterX - 35, y: groundTopY - 149 },
    // 3列目（3本）
    { x: groundCenterX - 80, y: groundTopY - 103 },
    { x: groundCenterX - 50, y: groundTopY - 103 },
    { x: groundCenterX - 20, y: groundTopY - 103 },
    // 4列目（4本）
    { x: groundCenterX - 95, y: groundTopY - 59 },
    { x: groundCenterX - 65, y: groundTopY - 59 },
    { x: groundCenterX - 35, y: groundTopY - 59 },
    { x: groundCenterX - 5, y: groundTopY - 59 },
    // 5列目（5本）
    { x: groundCenterX - 110, y: groundTopY },
    { x: groundCenterX - 80, y: groundTopY },
    { x: groundCenterX - 50, y: groundTopY },
    { x: groundCenterX - 20, y: groundTopY },
    { x: groundCenterX + 10, y: groundTopY },
  ];

  pinPositions.forEach((pos) => {
    const pin = Matter.Bodies.rectangle(pos.x, pos.y, pinWidth, pinHeight, {
      friction: 0.5,
      frictionStatic: 0.8,
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

  // slopeRefには主要なレーンパーツ（斜面）を渡す
  const laneForRef = slope;

  return { ground, slope: laneForRef, horizontalLane, box: circle, pins };
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
