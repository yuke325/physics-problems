"use client";

import Matter from "matter-js";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { PhysicsContainer } from "@/components/physics/Container";
import { ParamsButton } from "@/components/physics/ParamsButton";
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

  const { canvasRef, engineRef } = useMatterCanvas(initializeScene, {
    width: 1200,
    height: 800,
  });

  const handleTry = () => {
    if (circleRef.current && engineRef.current && !isFalling) {
      engineRef.current.gravity.y = getGravityValue(gravityMode);

      const frictionValue = getFrictionValue(frictionMode);
      const densityValue = getDensityValue(densityMode);

      Matter.Body.setDensity(circleRef.current, densityValue);

      Matter.Body.set(circleRef.current, {
        friction: frictionValue,
        frictionStatic:
          frictionValue === 0
            ? 0
            : Math.abs(frictionValue) * 1.2 * Math.sign(frictionValue),
        frictionAir: 0,
      });

      if (slopeRef.current) {
        Matter.Body.set(slopeRef.current, {
          friction:
            frictionMode === "0" ? 0 : frictionMode === "-" ? -0.5 : 0.8,
        });
      }

      setIsFalling(true);
    }
  };

  const handleReset = () => {
    if (engineRef.current && circleRef.current) {
      const engine = engineRef.current;
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
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            重力加速度
          </h3>
          <p className="text-xs text-slate-400">物体の落下速度を調整</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ParamsButton
            label="下げる"
            isSelected={gravityMode === "-"}
            onClick={() => setGravityMode("-")}
            disabled={isFalling}
          />
          <ParamsButton
            label="普通"
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

      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            摩擦係数
          </h3>
          <p className="text-xs text-slate-400">表面の滑りやすさ</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
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

      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            重さ選択
          </h3>
          <p className="text-xs text-slate-400">物体の質量を変更</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
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
    </PhysicsContainer>
  );
};

const getGravityValue = (mode: GravityMode): number => {
  switch (mode) {
    case "-":
      return 0.1;
    case "0":
      return 1;
    case "+":
      return 10;
  }
};

const getFrictionValue = (mode: FrictionMode): number => {
  switch (mode) {
    case "-":
      return -0.5;
    case "0":
      return 0;
    case "+":
      return 0.5;
  }
};

const getDensityValue = (mode: DensityMode): number => {
  switch (mode) {
    case "-":
      return 0.001;
    case "0":
      return 0.01;
    case "+":
      return 1;
  }
};

export default RollingMaterial;
