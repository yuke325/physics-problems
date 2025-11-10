"use client";

import Matter from "matter-js";
import { useCallback, useRef, useState } from "react";
import { PhysicsContainer } from "@/components/physics/Container";
import { ParamsButton } from "@/components/physics/ParamsButton";
import type { CanvasItemInfo } from "@/lib/types";
import { useMatterCanvas } from "@/lib/useMatterCanvas";
import { dropBalls, freeFallMatter } from "../lib/matter";

const FreeFall = ({ title, description, explanation }: CanvasItemInfo) => {
  // propsに追加
  const [isDropped, setIsDropped] = useState(false);
  const [airResistance, setAirResistance] = useState(false); // 空気抵抗

  const ball1Ref = useRef<Matter.Body | null>(null);
  const ball2Ref = useRef<Matter.Body | null>(null);

  const initializeScene = useCallback(
    () =>
      freeFallMatter({
        ball1Ref,
        ball2Ref,
      }),
    [],
  );

  const { canvasRef, engineRef } = useMatterCanvas(initializeScene, {
    width: 1200,
    height: 800,
  });

  const handleDrop = () => {
    if (ball1Ref.current && ball2Ref.current && engineRef.current) {
      // 重力を有効にする
      engineRef.current.gravity.y = 1;
      dropBalls(ball1Ref.current, ball2Ref.current, airResistance);
      setIsDropped(true);
    }
  };

  const handleReset = () => {
    if (ball1Ref.current && ball2Ref.current && engineRef.current) {
      const engine = engineRef.current;
      engine.gravity.y = 0;

      // オブジェクトを一旦削除
      Matter.Composite.remove(engine.world, [
        ball1Ref.current,
        ball2Ref.current,
      ]);

      // 再度初期化
      const custom = freeFallMatter({
        ball1Ref,
        ball2Ref,
      });

      Matter.Composite.add(engine.world, custom);
      setIsDropped(false);
    }
  };

  return (
    <PhysicsContainer
      title={title}
      description={description} // 追加
      explanation={explanation} // 追加
      onTry={handleDrop}
      onReset={handleReset}
      isFalling={isDropped}
      canvasRef={canvasRef}
      tryLabel="落下開始"
    >
      <div className="flex flex-col gap-y-6">
        {/* パラメータ選択 */}
        <div className="flex flex-wrap items-center gap-3">
          <ParamsButton
            label="空気抵抗"
            onClick={() => setAirResistance((prev) => !prev)}
            isSelected={airResistance}
            disabled={isDropped}
          />
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              シミュレーション設定
            </h3>
            <p className="text-xs text-slate-400">
              質量の異なる2つのボール（ピンクが小、紫が大）を同時に落下させます。「空気抵抗」の有無で落下の様子がどう変わるか観察しましょう。
            </p>
          </div>
        </div>
      </div>
    </PhysicsContainer>
  );
};

export default FreeFall;
