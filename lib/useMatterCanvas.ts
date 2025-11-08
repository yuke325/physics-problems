"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";
import type { MatterCanvasResult } from "./types";

type HooksProps = () => MatterCanvasResult;

export const useMatterCanvas = (func: HooksProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    let disposed = false;
    let animationFrame: number | null = null;

    const initialize = () => {
      if (disposed) return;

      const canvas = canvasRef.current;

      if (!canvas) {
        animationFrame = requestAnimationFrame(initialize);
        return;
      }

      const engine = Matter.Engine.create({
        gravity: { x: 0, y: 0 },
      });
      engineRef.current = engine;

      const render = Matter.Render.create({
        canvas,
        engine,
        options: {
          width: 800,
          height: 600,
          wireframes: false,
          background: "#0f0f23",
        },
      });
      renderRef.current = render;

      const custom = func();
      Matter.Composite.add(engine.world, custom);

      Matter.Render.run(render);

      const runner = Matter.Runner.create();
      runnerRef.current = runner;
      Matter.Runner.run(runner, engine);
    };

    initialize();

    return () => {
      disposed = true;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current = null;
      }
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
        runnerRef.current = null;
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        engineRef.current = null;
      }
    };
  }, [func]);

  return {
    canvasRef,
    engineRef,
  };
};
