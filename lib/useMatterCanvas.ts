"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";
import type { MatterCanvasResult } from "./types";

type HooksProps = () => MatterCanvasResult;
type CanvasOptions = {
  width?: number;
  height?: number;
};

export const useMatterCanvas = (
  func: HooksProps,
  options: CanvasOptions = {},
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const worldRef = useRef<Matter.World | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  const { width = 800, height = 600 } = options;

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
      worldRef.current = engine.world;

      const render = Matter.Render.create({
        canvas,
        engine,
        options: {
          width,
          height,
          wireframes: false,
          background: "transparent",
          pixelRatio: window.devicePixelRatio || 1,
        },
      });
      renderRef.current = render;

      const custom = func();
      Matter.Composite.add(engine.world, custom);

      // Custom render with enhanced effects
      Matter.Events.on(render, "afterRender", () => {
        const context = render.context;
        const bodies = Matter.Composite.allBodies(engine.world);

        bodies.forEach((body) => {
          const { x, y } = body.position;

          // Add shadow effect to all bodies
          context.save();
          context.shadowColor = "rgba(0, 0, 0, 0.5)";
          context.shadowBlur = 15;
          context.shadowOffsetX = 5;
          context.shadowOffsetY = 5;
          context.restore();

          // Add glow effect to moving dynamic bodies
          if (!body.isStatic && body.speed > 0.5) {
            context.save();
            context.globalCompositeOperation = "lighter";

            const gradient = context.createRadialGradient(x, y, 0, x, y, 40);
            gradient.addColorStop(0, "rgba(6, 182, 212, 0.4)");
            gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.2)");
            gradient.addColorStop(1, "rgba(6, 182, 212, 0)");

            context.fillStyle = gradient;
            context.beginPath();
            context.arc(x, y, 40, 0, Math.PI * 2);
            context.fill();
            context.restore();

            // Add motion trail
            if (body.speed > 2) {
              const velocity = body.velocity;
              const trailLength = Math.min(body.speed * 10, 50);

              context.save();
              context.globalAlpha = 0.3;
              context.strokeStyle = "#06b6d4";
              context.lineWidth = 2;
              context.lineCap = "round";

              context.beginPath();
              context.moveTo(x, y);
              context.lineTo(
                x - (velocity.x * trailLength) / body.speed,
                y - (velocity.y * trailLength) / body.speed,
              );
              context.stroke();
              context.restore();
            }
          }
        });
      });

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
  }, [func, width, height]);

  return {
    canvasRef,
    engineRef,
    worldRef,
    renderRef,
  };
};
