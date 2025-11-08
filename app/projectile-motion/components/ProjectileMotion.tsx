"use client";

import Matter from "matter-js";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { PhysicsContainer } from "@/components/physics/Container";
import { useMatterCanvas } from "@/lib/useMatterCanvas";
import { projectileMotionMatter, fireBall } from "../lib/matter";

const ProjectileMotion: React.FC<{ title: string }> = ({ title }) => {
  const [isFired, setIsFired] = useState(false);
  const [angle, setAngle] = useState(45); // 初期角度 45度
  const [speed, setSpeed] = useState(15); // 初期速度 15

  const ballRef = useRef<Matter.Body | null>(null);
  const targetRef = useRef<Matter.Body | null>(null);

  const initializeScene = useCallback(
    () =>
      projectileMotionMatter({
        ballRef,
        targetRef,
      }),
    [],
  );

  const { canvasRef, engineRef } = useMatterCanvas(initializeScene);

  const handleFire = () => {
    if (ballRef.current && targetRef.current && engineRef.current) {
      // 重力を有効にする
      engineRef.current.gravity.y = 1;
      fireBall(ballRef.current, targetRef.current, angle, speed);
      setIsFired(true);
    }
  };

  const handleReset = () => {
    if (ballRef.current && targetRef.current && engineRef.current) {
      const engine = engineRef.current;
      engine.gravity.y = 0;
      Matter.Composite.remove(engine.world, targetRef.current);
      Matter.Composite.remove(engine.world, ballRef.current);

      const custom = projectileMotionMatter({
        ballRef,
        targetRef,
      });

      Matter.Composite.add(engine.world, custom);
      setIsFired(false);
    }
  };
  return (
    <PhysicsContainer
      title={title}
      onTry={handleFire}
      onReset={handleReset}
      isFalling={isFired} // isFallingをisFiredに意味的に合わせる
      canvasRef={canvasRef}
      tryLabel="発射"
    >
      {/* 角度調整スライダー */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-white mb-1">
            角度: {angle}°
          </h3>
          <p className="text-xs text-slate-400">発射する角度を調整します。</p>
        </div>
        <input
          type="range"
          min="0"
          max="90"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          disabled={isFired}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* 初速調整スライダー */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-white mb-1">初速: {speed}</h3>
          <p className="text-xs text-slate-400">発射する速さを調整します。</p>
        </div>
        <input
          type="range"
          min="1"
          max="90"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isFired}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </PhysicsContainer>
  );
};

export default ProjectileMotion;
