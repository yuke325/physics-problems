"use client";

import Matter from "matter-js";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const ReboundBall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const ballRef = useRef<Matter.Body | null>(null);
  const leftWallRef = useRef<Matter.Body | null>(null);
  const rightWallRef = useRef<Matter.Body | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // エンジンの作成（最初は重力なし）
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 }, // 最初は重力なし
    });
    engineRef.current = engine;

    // レンダラーの作成
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 1000,
        height: 600,
        wireframes: false,
        background: "#0f0f23",
      },
    });
    renderRef.current = render;

    // 地面
    const ground = Matter.Bodies.rectangle(500, 590, 1000, 20, {
      isStatic: true,
      render: {
        fillStyle: "#2c3e50",
      },
    });

    // 左の壁（長い方） - 画面左端から高さ500の壁
    const leftWall = Matter.Bodies.rectangle(0, 300, 350, 500, {
      isStatic: true,
      restitution: 1.2, // 反発係数1.5
      render: {
        fillStyle: "#3498db",
      },
    });
    leftWallRef.current = leftWall;

    // 右の壁（短い方） - 画面右端から高さ400の壁
    const rightWall = Matter.Bodies.rectangle(550, 350, 350, 400, {
      isStatic: true,
      restitution: 1.2, // 反発係数1.5
      render: {
        fillStyle: "#e74c3c",
      },
    });
    rightWallRef.current = rightWall;

    // ボール（左の壁の右側近くに配置）
    const ball = Matter.Bodies.circle(400, 500, 20, {
      restitution: 1.2, // 反発係数1.5
      friction: 0,
      frictionAir: 0,
      density: 0.001,
      render: {
        fillStyle: "#f39c12",
      },
    });
    ballRef.current = ball;

    // ワールドに追加
    Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ball]);

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

  // 発射ボタン
  const handleLaunch = () => {
    if (ballRef.current && engineRef.current && !isSimulating) {
      // 重力を発生させる（上方向）
      engineRef.current.gravity.y = -0.4;

      // 右方向（右の壁に向かって）に発射
      Matter.Body.setVelocity(ballRef.current, { x: 10, y: 0 });
      setIsSimulating(true);
    }
  };

  // リセット
  const handleReset = () => {
    if (engineRef.current && ballRef.current) {
      // 重力をゼロに戻す
      engineRef.current.gravity.y = 0;

      // 古いボールを削除
      Matter.Composite.remove(engineRef.current.world, ballRef.current);

      // 新しいボールを初期位置に作成
      const newBall = Matter.Bodies.circle(400, 500, 20, {
        restitution: 1.2,
        friction: 0,
        frictionAir: 0,
        density: 0.001,
        render: {
          fillStyle: "#f39c12",
        },
      });

      Matter.Body.setVelocity(newBall, { x: 0, y: 0 });
      ballRef.current = newBall;

      Matter.Composite.add(engineRef.current.world, newBall);
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4 text-white">
        反発ボールシミュレーター
      </h1>

      <div className="mb-4 text-gray-300 text-center">
        <p>反発係数: 1.5 | 重力: 上方向 | 2本の壁の間でバウンド</p>
        <p className="text-sm mt-2">左の壁（青）: 長い | 右の壁（赤）: 短い</p>
      </div>

      <div className="border-4 border-gray-700 rounded-lg overflow-hidden shadow-2xl relative">
        <canvas ref={canvasRef} />
      </div>

      <div className="mt-4 flex gap-4">
        <button
          type="button"
          onClick={handleLaunch}
          disabled={isSimulating}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors text-lg"
        >
          発射！
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors text-lg"
        >
          リセット
        </button>
      </div>
    </div>
  );
};

export default ReboundBall;
