"use client";

import Matter from "matter-js";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { PhysicsContainer } from "@/components/physics/Container";
import { useMatterCanvas } from "@/lib/useMatterCanvas";
import {
  initializePendulumWave,
  pendulumMotionMatter,
  startPendulumWave,
} from "../lib/matter";

const PendulumMotion: React.FC<{ title: string }> = ({ title }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [numPendulums, setNumPendulums] = useState(15); // 振り子の数

  const pendulumsRef = useRef<
    Array<{
      bob: Matter.Body;
      constraint: Matter.Constraint;
    }>
  >([]);

  const initializeScene = useCallback(
    () => pendulumMotionMatter({ pendulumsRef, numPendulums }),
    [numPendulums],
  );

  const handleTry = () => {
    if (pendulumsRef.current.length > 0 && engineRef.current) {
      engineRef.current.gravity.y = 1;
      startPendulumWave(pendulumsRef.current);
      setIsSimulating(true);
    }
  };

  const { canvasRef, engineRef, worldRef } = useMatterCanvas(initializeScene, {
    width: 1200,
    height: 800,
  });

  const handleReset = useCallback(() => {
    if (worldRef.current && pendulumsRef.current.length > 0) {
      // 古い振り子をワールドから削除
      const allObjects = pendulumsRef.current.flatMap(({ bob, constraint }) => [
        bob,
        constraint,
      ]);
      Matter.Composite.remove(worldRef.current, allObjects);
    }

    // 新しいパラメータで振り子を再生成
    const newPendulums = initializePendulumWave(numPendulums);
    pendulumsRef.current = newPendulums;
    const newAllObjects = newPendulums.flatMap(({ bob, constraint }) => [
      bob,
      constraint,
    ]);
    if (worldRef.current) {
      Matter.Composite.add(worldRef.current, newAllObjects);
    }

    setIsSimulating(false);
  }, [worldRef, numPendulums]);

  return (
    <PhysicsContainer
      title={title}
      onTry={handleTry}
      onReset={handleReset}
      isFalling={isSimulating}
      canvasRef={canvasRef}
      tryLabel="開始"
    >
      {/* 振り子の数調整スライダー */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-white mb-1">
            振り子の数: {numPendulums}
          </h3>
          <p className="text-xs text-slate-400">振り子の数を調整します。</p>
        </div>
        <input
          type="range"
          min="5"
          max="25"
          value={numPendulums}
          onChange={(e) => setNumPendulums(Number(e.target.value))}
          disabled={isSimulating}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </PhysicsContainer>
  );
};

export default PendulumMotion;
