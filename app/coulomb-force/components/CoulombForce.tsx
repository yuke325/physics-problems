"use client";

import Matter from "matter-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { PhysicsContainer } from "@/components/physics/Container";
import { ParamsButton } from "@/components/physics/ParamsButton";
import type { CanvasItemInfo } from "@/lib/types";
import { useMatterCanvas } from "@/lib/useMatterCanvas";
import {
  applyCoulombForce,
  coulombForceMatter,
  resetElectrons,
} from "../lib/matter";

const CoulombForce = ({ title, description, explanation }: CanvasItemInfo) => {
  // propsに追加
  const [isSelected, setIsSelected] = useState(false);
  const [chargeType, setChargeType] = useState<
    "positive" | "neutral" | "negative"
  >("positive");
  const [forceStrength, setForceStrength] = useState(5);

  const electronsRef = useRef<Matter.Body[]>([]);
  const chargeRef = useRef<Matter.Body | null>(null);
  const eventHandlerRef = useRef<(() => void) | null>(null);
  const isForceAppliedRef = useRef(false);

  const initializeScene = useCallback(
    () =>
      coulombForceMatter({
        electronsRef,
        chargeRef,
        chargeType,
      }),
    [chargeType],
  );

  const { canvasRef, engineRef, reinitialize } = useMatterCanvas(
    initializeScene,
    {
      width: 1200,
      height: 800,
    },
  );

  // 電荷タイプが変更されたらシーンを再初期化
  useEffect(() => {
    if (!isSelected) {
      reinitialize();
    }
  }, [isSelected, reinitialize]);

  const handleStart = () => {
    if (
      electronsRef.current &&
      chargeRef.current &&
      engineRef.current &&
      !isForceAppliedRef.current
    ) {
      const handler = applyCoulombForce(
        engineRef.current,
        electronsRef.current,
        chargeRef.current,
        forceStrength,
      );
      eventHandlerRef.current = handler;
      isForceAppliedRef.current = true;
      setIsSelected(true);
    }
  };

  const handleReset = () => {
    if (electronsRef.current && engineRef.current) {
      // イベントハンドラをクリア
      if (eventHandlerRef.current) {
        Matter.Events.off(
          engineRef.current,
          "beforeUpdate",
          eventHandlerRef.current,
        );
        eventHandlerRef.current = null;
      }

      resetElectrons(electronsRef.current);
      isForceAppliedRef.current = false;
      setIsSelected(false);
    }
  };

  return (
    <PhysicsContainer
      title={title}
      description={description} // 追加
      explanation={explanation} // 追加
      onTry={handleStart}
      onReset={handleReset}
      isFalling={isSelected}
      canvasRef={canvasRef}
      tryLabel="開始"
    >
      <div className="flex flex-col gap-y-6">
        {/* 電荷タイプ選択 */}
        <div className="space-y-3">
          <div>
            <h3 className="text-base font-bold text-white mb-2">
              電荷のタイプ
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ParamsButton
              label="正電荷"
              onClick={() => setChargeType("positive")}
              isSelected={chargeType === "positive"}
              disabled={isSelected}
            />
            <ParamsButton
              label="中性"
              onClick={() => setChargeType("neutral")}
              isSelected={chargeType === "neutral"}
              disabled={isSelected}
            />
            <ParamsButton
              label="負電荷"
              onClick={() => setChargeType("negative")}
              isSelected={chargeType === "negative"}
              disabled={isSelected}
            />
          </div>
        </div>

        {/* 力の強さ調整スライダー */}
        <div className="space-y-3">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              クーロン力の強さ: {forceStrength}
            </h3>
            <p className="text-xs text-slate-400">
              電荷間に働く力の強さを調整します。
            </p>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={forceStrength}
            onChange={(e) => setForceStrength(Number(e.target.value))}
            disabled={isSelected}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* 説明 */}
        <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-bold text-white">電荷の種類と効果</h3>
          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500/70 border-2 border-red-300 flex-shrink-0 mt-0.5"></div>
              <span>
                <span className="font-bold text-red-400">正電荷(+)</span>:
                電子を中心に向かって引き寄せる（引力）
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500/70 border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
              <span>
                <span className="font-bold text-gray-400">中性</span>:
                力が働かず、電子は静止したまま
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500/70 border-2 border-blue-300 flex-shrink-0 mt-0.5"></div>
              <span>
                <span className="font-bold text-blue-400">負電荷(-)</span>:
                電子を外側に反発させる（斥力）
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            力の大きさは距離の2乗に反比例します。中央から離れるほど力は弱くなります。
          </p>
        </div>
      </div>
    </PhysicsContainer>
  );
};

export default CoulombForce;
