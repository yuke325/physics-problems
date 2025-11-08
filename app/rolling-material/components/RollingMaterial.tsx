"use client";

import Matter from "matter-js";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { PhysicsContainer } from "@/components/physics/Container";
import { ParamsButton } from "@/components/physics/ParamsButton";
import { Card, CardContent } from "@/components/ui/card";
import { useMatterCanvas } from "@/lib/useMatterCanvas";
import { rollingMaterialMatter } from "../lib/matter";

type GravityMode = "-" | "0" | "+";
type FrictionMode = "-" | "0" | "+";
type DensityMode = "-" | "0" | "+";

const RollingMaterial: React.FC<{ title: string }> = ({ title }) => {
  const [isFalling, setIsFalling] = useState(false);
  const [gravityMode, setGravityMode] = useState<GravityMode>("0");
  const [frictionMode, setFrictionMode] = useState<FrictionMode>("0");
  const [densityMode, setDensityMode] = useState<DensityMode>("0");

  const slopeRef = useRef<Matter.Body | null>(null);
  const circleRef = useRef<Matter.Body | null>(null);

  const initializeScene = useCallback(
    () =>
      rollingMaterialMatter({
        slopeRef,
        circleRef,
      }),
    [],
  );

  const { canvasRef, engineRef } = useMatterCanvas(initializeScene);

  // Try！ボタン - 選択した設定で実行
  const handleTry = () => {
    if (circleRef.current && engineRef.current && !isFalling) {
      // 重力を設定
      engineRef.current.gravity.y = getGravityValue(gravityMode);

      const frictionValue = getFrictionValue(frictionMode);
      const densityValue = getDensityValue(densityMode);

      // 物体の密度を設定
      Matter.Body.setDensity(circleRef.current, densityValue);

      // 物体の摩擦係数を設定
      Matter.Body.set(circleRef.current, {
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

      setIsFalling(true);
    }
  };

  // 物体をリセットする関数
  const handleReset = () => {
    if (engineRef.current && circleRef.current) {
      const engine = engineRef.current;
      // 重力をゼロに戻す
      engine.gravity.y = 0;

      Matter.Composite.remove(engine.world, circleRef.current);

      const custom = rollingMaterialMatter({ slopeRef, circleRef });

      Matter.Composite.add(engine.world, custom);
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
      <Card className="w-full max-w-5xl">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* 重力加速度選択 */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <span className="text-cyan-400">⚡</span>
                  重力加速度
                </h3>
                <p className="text-xs text-slate-400">物体の落下速度を調整</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <ParamsButton
                  label="下げる"
                  isSelected={gravityMode === "-"}
                  onClick={() => setGravityMode("-")}
                  disabled={isFalling}
                />
                <ParamsButton
                  label="なし"
                  isSelected={gravityMode === "0"}
                  onClick={() => setGravityMode("0")}
                  disabled={isFalling}
                />
                <ParamsButton
                  label="上げる"
                  isSelected={gravityMode === "+"}
                  onClick={() => setGravityMode("+")}
                  disabled={isFalling}
                />
              </div>
            </div>

            {/* 摩擦係数選択 */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <span className="text-cyan-400">🔥</span>
                  摩擦係数
                </h3>
                <p className="text-xs text-slate-400">表面の滑りやすさ</p>
              </div>
              <div className="flex gap-2 flex-wrap">
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

            {/* 密度選択 */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <span className="text-cyan-400">⚖️</span>
                  重さ選択
                </h3>
                <p className="text-xs text-slate-400">物体の質量を変更</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <ParamsButton
                  label="軽い"
                  isSelected={densityMode === "-"}
                  onClick={() => setDensityMode("-")}
                  disabled={isFalling}
                />
                <ParamsButton
                  label="普通"
                  isSelected={densityMode === "0"}
                  onClick={() => setDensityMode("0")}
                  disabled={isFalling}
                />
                <ParamsButton
                  label="重い"
                  isSelected={densityMode === "+"}
                  onClick={() => setDensityMode("+")}
                  disabled={isFalling}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PhysicsContainer>
  );
};

// ===================== utils =====================
// 重力加速度の値を取得
const getGravityValue = (mode: GravityMode): number => {
  switch (mode) {
    case "-":
      return 0.1; // 逆重力
    case "0":
      return 1; // 重力なし
    case "+":
      return 10; // 通常重力
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

// 密度の値を取得
const getDensityValue = (mode: DensityMode): number => {
  switch (mode) {
    case "-":
      return 0.001; // 軽い
    case "0":
      return 0.01; // 普通
    case "+":
      return 1; // 重い
  }
};

export default RollingMaterial;
