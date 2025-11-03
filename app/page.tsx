"use client";

import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";
import type { FC } from "react";
import { useEffect, useRef } from "react";

const MatterPlayground: FC = () => {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const renderRef = useRef<Render | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const wallsRef = useRef<{
    left: Body;
    right: Body;
    top: Body;
    bottom: Body;
  } | null>(null);

  useEffect(() => {
    //  FIXME: ちゃんとチェックするなりエラー出すなりする
    if (!sceneRef.current) return;
    const container = sceneRef.current;
    const width = container.clientWidth;
    const height = Math.max(
      400,
      Math.min(800, Math.round(window.innerHeight * 0.6)),
    );

    // 1) 物理エンジン
    const engine = Engine.create({ gravity: { x: 0, y: 1 } });
    engineRef.current = engine;

    // 2) レンダラー（キャンバス）
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "#0b1020",
        pixelRatio,
      },
    });
    renderRef.current = render;

    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // 3) 壁
    const thickness = 60;
    const halfW = width / 2;
    const halfH = height / 2;

    const left = Bodies.rectangle(-thickness / 2, halfH, thickness, height, {
      isStatic: true,
    });
    const right = Bodies.rectangle(
      width + thickness / 2,
      halfH,
      thickness,
      height,
      { isStatic: true },
    );
    const top = Bodies.rectangle(
      halfW,
      -thickness / 2,
      width + thickness * 2,
      thickness,
      { isStatic: true },
    );
    const bottom = Bodies.rectangle(
      halfW,
      height + thickness / 2,
      width + thickness * 2,
      thickness,
      { isStatic: true },
    );

    wallsRef.current = { left, right, top, bottom };
    Composite.add(engine.world, [left, right, top, bottom]);

    // 4) ランダムな物体
    const colors = ["#92cbff", "#34d399", "#f59e0b", "#f472b6"];
    for (let i = 0; i < 14; i++) {
      const x = 100 + i * 40 + Math.random() * 40;
      const y = -100 - i * 20;
      const size = 20 + Math.random() * 30;
      const isCircle = Math.random() > 0.5;
      const body = isCircle
        ? Bodies.circle(x, y, size, {
            restitution: 0.6,
            render: { fillStyle: colors[i % colors.length] },
          })
        : Bodies.rectangle(x, y, size * 1.6, size, {
            chamfer: { radius: 6 },
            restitution: 0.6,
            render: { fillStyle: colors[i % colors.length] },
          });
      Composite.add(engine.world, body);
    }

    // 5) マウスでドラッグ
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(engine.world, mouseConstraint);
    //  NOTE: 型定義上は無いが runtime では存在
    render.mouse = mouse;

    // 6) クリックでブロック追加（おまけ）
    Events.on(mouseConstraint, "mouseup", () => {
      const pos = mouse.position;
      const box = Bodies.rectangle(pos.x, pos.y, 40, 40, {
        chamfer: { radius: 6 },
        restitution: 0.4,
        render: { fillStyle: "#eab308" },
      });
      Composite.add(engine.world, box);
    });

    // 7) リサイズ対応
    const handleResize = () => {
      const w = container.clientWidth;
      const h = Math.max(
        400,
        Math.min(800, Math.round(window.innerHeight * 0.6)),
      );

      render.options.width = w;
      render.options.height = h;

      const pr = Math.min(window.devicePixelRatio || 1, 2);
      render.options.pixelRatio = pr;
      render.canvas.width = w * pr;
      render.canvas.height = h * pr;
      render.canvas.style.width = `${w}px`;
      render.canvas.style.height = `${h}px`;

      const t = thickness;
      const halfW = w / 2;
      const halfH = h / 2;

      //  FIXME: ちゃんとチェックするなりエラー出すなりする
      if (!wallsRef.current) return;
      const { left, right, top, bottom } = wallsRef.current;
      Body.setPosition(left, { x: -t / 2, y: halfH });
      Body.setPosition(right, { x: w + t / 2, y: halfH });
      Body.setPosition(top, { x: halfW, y: -t / 2 });
      Body.setPosition(bottom, { x: halfW, y: h + t / 2 });

      Body.setVertices(
        left,
        Bodies.rectangle(-t / 2, halfH, t, h, { isStatic: true }).vertices,
      );
      Body.setVertices(
        right,
        Bodies.rectangle(w + t / 2, halfH, t, h, { isStatic: true }).vertices,
      );
      Body.setVertices(
        top,
        Bodies.rectangle(halfW, -t / 2, w + t * 2, t, { isStatic: true })
          .vertices,
      );
      Body.setVertices(
        bottom,
        Bodies.rectangle(halfW, h + t / 2, w + t * 2, t, { isStatic: true })
          .vertices,
      );

      Render.lookAt(render, { min: { x: 0, y: 0 }, max: { x: w, y: h } });
    };

    window.addEventListener("resize", handleResize);

    // 8) クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      Runner.stop(runner);
      render.canvas.remove();
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      renderRef.current = null;
      engineRef.current = null;
    };
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 12 }}>
        Matter.js × Next.js Playground
      </h1>
      <div
        ref={sceneRef}
        style={{
          width: "100%",
          height: "60vh", // ここがキャンバスの実高さ
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 8px 28px rgba(0,0,0,.25)",
          background: "#0b1020",
        }}
      />
      <p style={{ marginTop: 10, opacity: 0.7 }}>
        ドラッグでつかめます。クリックで箱を追加。
      </p>
    </div>
  );
};

export default function Page() {
  return <MatterPlayground />;
}
