"use client";

import Matter from "matter-js";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { PhysicsContainer } from "@/components/physics/Container";
import { ParamsButton } from "@/components/physics/ParamsButton";
import { useMatterCanvas } from "@/lib/useMatterCanvas";
import {
  type GravityMode,
  getGravityValue,
  getRestitutionValue,
  INITIAL_BALL_POSITION,
  INITIAL_BLOCK_POSITION,
  type RestitutionMode,
} from "../lib/constants";
import { reboundBallMatter } from "../lib/matter";

const ReboundBall: React.FC<{
  title: string;
  description: string;
  explanation?: string;
}> = ({ title, description, explanation }) => {
  const [isFalling, setIsFalling] = useState(false);
  const [gravityMode, setGravityMode] = useState<GravityMode>("0");
  const [restitutionMode, setRestitutionMode] =
    useState<RestitutionMode>("0.5");

  const groundRef = useRef<Matter.Body | null>(null);
  const leftWallRef = useRef<Matter.Body | null>(null);
  const rightWallRef = useRef<Matter.Body | null>(null);
  const ceillingRef = useRef<Matter.Body | null>(null);
  const ballRef = useRef<Matter.Body | null>(null);
  const blockRef = useRef<Matter.Body | null>(null);

  const initializeScene = useCallback(
    () =>
      reboundBallMatter({
        groundRef,
        leftWallRef,
        rightWallRef,
        ceilingRef: ceillingRef,
        ballRef,
        blockRef,
      }),
    [],
  );

  const { canvasRef, engineRef } = useMatterCanvas(initializeScene);

  const handleTry = () => {
    if (ballRef.current && engineRef.current && !isFalling) {
      engineRef.current.gravity.y = getGravityValue(gravityMode);

      const restitutionValue = getRestitutionValue(restitutionMode);
      Matter.Body.set(ballRef.current, {
        restitution: restitutionValue,
        frictionAir: 0,
      });

      // ボールに左向きの初速度を与える
      Matter.Body.setVelocity(ballRef.current, { x: -5, y: 0 });

      if (rightWallRef.current) {
        Matter.Body.set(rightWallRef.current, {
          restitution: restitutionValue,
        });
      }

      if (leftWallRef.current) {
        Matter.Body.set(leftWallRef.current, {
          restitution: restitutionValue,
        });
      }

      if (ceillingRef.current) {
        Matter.Body.set(ceillingRef.current, {
          restitution: restitutionValue,
        });
      }

      if (groundRef.current) {
        Matter.Body.set(groundRef.current, {
          restitution: restitutionValue,
        });
      }

      if (blockRef.current) {
        Matter.Body.set(blockRef.current, {
          restitution: restitutionValue,
        });
      }

      setIsFalling(true);
    }
  };

  const handleReset = () => {
    if (ballRef.current && engineRef.current) {
      Matter.Body.setPosition(ballRef.current, INITIAL_BALL_POSITION);
      Matter.Body.setVelocity(ballRef.current, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(ballRef.current, 0);
      engineRef.current.gravity.y = 0;
      setIsFalling(false);
    }
    if (blockRef.current) {
      Matter.Body.setPosition(blockRef.current, INITIAL_BLOCK_POSITION);
      Matter.Body.setVelocity(blockRef.current, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(blockRef.current, 0);
    }
  };

  return (
    <PhysicsContainer
      title={title}
      description={description} // 追加
      explanation={explanation} // 追加
      canvasRef={canvasRef}
      onTry={handleTry}
      onReset={handleReset}
      isFalling={isFalling}
    >
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">重力</h3>
          <div className="flex gap-2">
            <ParamsButton
              label="負の重力"
              onClick={() => setGravityMode("-")}
              isSelected={gravityMode === "-"}
              disabled={isFalling}
            />
            <ParamsButton
              label="重力なし"
              onClick={() => setGravityMode("0")}
              isSelected={gravityMode === "0"}
              disabled={isFalling}
            />
            <ParamsButton
              label="正の重力"
              onClick={() => setGravityMode("+")}
              isSelected={gravityMode === "+"}
              disabled={isFalling}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">反発係数</h3>
          <div className="flex gap-2">
            <ParamsButton
              label="-0.2"
              onClick={() => setRestitutionMode("-0.2")}
              isSelected={restitutionMode === "-0.2"}
              disabled={isFalling}
            />
            <ParamsButton
              label="0.5"
              onClick={() => setRestitutionMode("0.5")}
              isSelected={restitutionMode === "0.5"}
              disabled={isFalling}
            />
            <ParamsButton
              label="1.2"
              onClick={() => setRestitutionMode("1.2")}
              isSelected={restitutionMode === "1.2"}
              disabled={isFalling}
            />
          </div>
        </div>
      </div>
    </PhysicsContainer>
  );
};

export default ReboundBall;
