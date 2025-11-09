"use client";

import Matter from "matter-js";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { PhysicsContainer } from "@/components/physics/Container";
import { ParamsButton } from "@/components/physics/ParamsButton";
import { useMatterCanvas } from "@/lib/useMatterCanvas";
import { antigravityMatter } from "../lib/matter";

type GravityMode = "-" | "0" | "+";
type FrictionMode = "-" | "0" | "+";

const Bowling: React.FC<{
  title: string;
  description: string; // 追加
  explanation?: string; // 追加
}> = ({ title, description, explanation }) => {
  // propsに追加
  const [isFalling, setIsFalling] = useState(false);
  const [gravityMode, setGravityMode] = useState<GravityMode>("0");
  const [frictionMode, setFrictionMode] = useState<FrictionMode>("0");

  const slopeRef = useRef<Matter.Body | null>(null);
  const groundRef = useRef<Matter.Body | null>(null);
  const boxRef = useRef<Matter.Body | null>(null);
  const pinsRef = useRef<Matter.Body[]>([]);

  const initializeScene = useCallback(
    () =>
      antigravityMatter({
        slopeRef,
        groundRef,
        boxRef,
        pinsRef,
      }),
    [],
  );

  const { canvasRef, engineRef } = useMatterCanvas(initializeScene, {
    width: 1200,
    height: 800,
  });

  const handleTry = () => {
    if (boxRef.current && engineRef.current && !isFalling) {
      engineRef.current.gravity.y = getGravityValue(gravityMode);
      const frictionValue = getFrictionValue(frictionMode);

      Matter.Body.set(boxRef.current, {
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

      if (groundRef.current) {
        Matter.Body.set(groundRef.current, {
          friction:
            frictionMode === "0" ? 0 : frictionMode === "-" ? -0.5 : 0.8,
        });
      }

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

  const handleReset = () => {
    if (engineRef.current && boxRef.current) {
      const engine = engineRef.current;
      engine.gravity.y = 0;

      Matter.Composite.remove(engine.world, boxRef.current);
      pinsRef.current.forEach((pin) => {
        Matter.Composite.remove(engine.world, pin);
      });

      const custom = antigravityMatter({
        slopeRef,
        groundRef,
        boxRef,
        pinsRef,
      });

      Matter.Composite.add(engine.world, custom);
      setIsFalling(false);
    }
  };

  return (
    <PhysicsContainer
      title={title}
      description={description} // 追加
      explanation={explanation} // 追加
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
          <p className="text-xs text-slate-400">物体に働く重力の方向と大きさ</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
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

      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            摩擦係数
          </h3>
          <p className="text-xs text-slate-400">表面の滑りやすさを決定</p>
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
    </PhysicsContainer>
  );
};

const getGravityValue = (mode: GravityMode): number => {
  switch (mode) {
    case "-":
      return -1;
    case "0":
      return 0;
    case "+":
      return 1;
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

export default Bowling;
