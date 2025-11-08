"use client";

import React, { useRef, useState } from "react";
import Matter from "matter-js";
import { useMatterCanvas } from "@/lib/useMatterCanvas";
import { antigravityMatter } from "../lib/matter";
import { ParamsButton } from "@/components/physics/ParamsButton";
import { PhysicsContainer } from "@/components/physics/Container";

type GravityMode = "-" | "0" | "+";
type FrictionMode = "-" | "0" | "+";

// ===================== utils =====================
// 重力加速度の値を取得
const getGravityValue = (mode: GravityMode): number => {
  switch (mode) {
    case "-":
      return -1; // 逆重力
    case "0":
      return 0; // 重力なし
    case "+":
      return 1; // 通常重力
  }
};

// 摩擦係数の値を取得
const getFrictionValue = (mode: FrictionMode): number => {
  switch (mode) {
    case "-":
      return -0.5; // 負の摩擦
    case "0":
      return 0; // 摩擦なし
    case "+":
      return 0.5; // 正の摩擦
  }
};

const AntiGravity: React.FC<{ title: string }> = ({ title }) => {
  const [isFalling, setIsFalling] = useState(false);
  const [gravityMode, setGravityMode] = useState<GravityMode>("0");
  const [frictionMode, setFrictionMode] = useState<FrictionMode>("0");

  const slopeRef = useRef<Matter.Body | null>(null);
  const groundRef = useRef<Matter.Body | null>(null);
  const boxRef = useRef<Matter.Body | null>(null);
  const pinsRef = useRef<Matter.Body[]>([]);

  const { canvasRef, engineRef } = useMatterCanvas(() =>
    antigravityMatter({
      slopeRef,
      groundRef,
      boxRef,
      pinsRef,
    }),
  );

  // Try！ボタン - 選択した設定で実行
  const handleTry = () => {
    if (boxRef.current && engineRef.current && !isFalling) {
      // 重力を設定
      engineRef.current.gravity.y = getGravityValue(gravityMode);

      const frictionValue = getFrictionValue(frictionMode);

      // 物体の摩擦係数を設定
      Matter.Body.set(boxRef.current, {
        friction: frictionValue,
        frictionStatic:
          frictionValue === 0
            ? 0
            : Math.abs(frictionValue) * 1.2 * Math.sign(frictionValue),
        frictionAir: 0, // 空気抵抗も0に
      });

      // 斜面の摩擦係数を設定
      if (slopeRef.current) {
        Matter.Body.set(slopeRef.current, {
          friction:
            frictionMode === "0" ? 0 : frictionMode === "-" ? -0.5 : 0.8,
        });
      }

      // 地面の摩擦係数を設定
      if (groundRef.current) {
        Matter.Body.set(groundRef.current, {
          friction:
            frictionMode === "0" ? 0 : frictionMode === "-" ? -0.5 : 0.8,
        });
      }

      // ピンの摩擦係数を設定
      pinsRef.current.forEach((pin) => {
        Matter.Body.set(pin, {
          friction:
            frictionMode === "0" ? 0 : frictionMode === "-" ? -0.5 : 0.5,
          frictionStatic:
            frictionMode === "0" ? 0 : frictionMode === "-" ? -0.6 : 0.6,
          frictionAir: 0,
        });
      });

      setIsFalling(true);
    }
  };

  // 物体をリセットする関数
  const handleReset = () => {
    if (engineRef.current && boxRef.current) {
      // 重力をゼロに戻す
      engineRef.current.gravity.y = 0;

      // 古い物体とピンを削除
      Matter.Composite.remove(engineRef.current.world, boxRef.current);
      pinsRef.current.forEach((pin) => {
        Matter.Composite.remove(engineRef.current!.world, pin);
      });

      // 新しい物体を初期位置に再作成
      const slopeAngle = (30 * Math.PI) / 180;
      const boxSize = 50;
      const slopeCenterX = 200;
      const slopeCenterY = 450;
      const distanceFromCenter = -150;
      const slopeHeight = 40;

      const boxX = slopeCenterX + distanceFromCenter * Math.cos(slopeAngle);
      const boxY =
        slopeCenterY +
        distanceFromCenter * Math.sin(slopeAngle) -
        (slopeHeight / 2 + boxSize / 2) * Math.cos(slopeAngle);

      const newBox = Matter.Bodies.rectangle(boxX, boxY, boxSize, boxSize, {
        angle: slopeAngle,
        friction: 0.5,
        frictionStatic: 0.8,
        density: 0.004,
        restitution: 0.3,
        render: {
          fillStyle: "#e74c3c",
        },
      });

      // 速度と角速度を完全にゼロにリセット
      Matter.Body.setVelocity(newBox, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(newBox, 0);
      Matter.Body.setPosition(newBox, { x: boxX, y: boxY });

      boxRef.current = newBox;

      // ピンを再作成
      const slopeEndX = 200 + (400 / 2) * Math.cos(slopeAngle);
      const slopeEndY = 450 + (400 / 2) * Math.sin(slopeAngle) + 40 / 2;
      const groundWidth = 400;
      const groundCenterX = slopeEndX + groundWidth / 2;
      const groundTopY = slopeEndY + 40 / 2 - 20;

      const pins: Matter.Body[] = [];
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
            fillStyle: "#f39c12",
          },
        });
        pins.push(pin);
      });

      pinsRef.current = pins;

      Matter.Composite.add(engineRef.current.world, [newBox, ...pins]);
      setIsFalling(false);
    }
  };

  return (
    <PhysicsContainer
      title={title}
      onTry={handleTry}
      onReset={handleReset}
      isFalling={isFalling}
      canvasRef={canvasRef}
    >
      {/* パラメータ選択UI */}
      <div className="mb-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          {/* 重力加速度選択 */}
          <div>
            <h3 className="text-white font-bold mb-3 text-lg">重力加速度</h3>
            <div className="flex gap-2">
              <ParamsButton
                label="- (逆)"
                isSelected={gravityMode === "-"}
                onClick={() => setGravityMode("-")}
                disabled={isFalling}
              />
              <ParamsButton
                label="0 (無)"
                isSelected={gravityMode === "0"}
                onClick={() => setGravityMode("0")}
                disabled={isFalling}
              />
              <ParamsButton
                label="+ (通常)"
                isSelected={gravityMode === "+"}
                onClick={() => setGravityMode("+")}
                disabled={isFalling}
              />
            </div>
          </div>

          {/* 摩擦係数選択 */}
          <div>
            <h3 className="text-white font-bold mb-3 text-lg">摩擦係数</h3>
            <div className="flex gap-2">
              <ParamsButton
                label="- (負)"
                isSelected={frictionMode === "-"}
                onClick={() => setFrictionMode("-")}
                disabled={isFalling}
              />
              <ParamsButton
                label="0 (無)"
                isSelected={frictionMode === "0"}
                onClick={() => setFrictionMode("0")}
                disabled={isFalling}
              />
              <ParamsButton
                label="+ (正)"
                isSelected={frictionMode === "+"}
                onClick={() => setFrictionMode("+")}
                disabled={isFalling}
              />
            </div>
          </div>
        </div>
      </div>
    </PhysicsContainer>
  );
};

export default AntiGravity;
