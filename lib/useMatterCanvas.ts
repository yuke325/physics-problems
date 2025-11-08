import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { MatterCanvasResult } from "./types";

type HooksProps = () => MatterCanvasResult;

export const useMatterCanvas = (func: HooksProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // エンジンの作成（最初は重力なし）
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 },
    });
    engineRef.current = engine;

    // レンダラーの作成
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: "#0f0f23",
      },
    });
    renderRef.current = render;

    // 物体の作成
    const custom = func();
    // ワールドに追加
    Matter.Composite.add(engine.world, custom);

    // レンダラーを実行
    Matter.Render.run(render);

    // エンジンを実行
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // クリーンアップ関数
    return () => {
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
      }
      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, []);

  return {
    canvasRef,
    engineRef,
  };
};
