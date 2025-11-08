"use client";

import Matter from "matter-js";
import type React from "react";
import { useEffect, useRef, useState } from "react";

type GravityMode = "-" | "0" | "+";
type FrictionMode = "-" | "0" | "+";

const AntiGravity: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const boxRef = useRef<Matter.Body | null>(null);
  const pinsRef = useRef<Matter.Body[]>([]);
  const slopeRef = useRef<Matter.Body | null>(null);
  const groundRef = useRef<Matter.Body | null>(null);
  const [isFalling, setIsFalling] = useState(false);
  const [gravityMode, setGravityMode] = useState<GravityMode>("0");
  const [frictionMode, setFrictionMode] = useState<FrictionMode>("0");

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

    // 30度の斜面を作成（左側に配置）
    const slopeAngle = (30 * Math.PI) / 180; // 30度をラジアンに変換
    const slopeLength = 400;
    const slopeHeight = 40;

    const slope = Matter.Bodies.rectangle(
      200, // x座標（左側に移動）
      450, // y座標
      slopeLength, // 幅
      slopeHeight, // 高さ
      {
        isStatic: true, // 静的オブジェクト（動かない）
        angle: slopeAngle, // 30度傾ける
        friction: 0.8, // 摩擦係数を設定
        render: {
          fillStyle: "#2ecc71",
        },
      },
    );
    slopeRef.current = slope;

    // 斜面の右端の座標を計算
    const slopeEndX = 200 + (slopeLength / 2) * Math.cos(slopeAngle);
    const slopeEndY =
      450 + (slopeLength / 2) * Math.sin(slopeAngle) + slopeHeight / 2;

    // 平面の地面を作成（斜面の右端に接続）
    const groundWidth = 400;
    const ground = Matter.Bodies.rectangle(
      slopeEndX + groundWidth / 2, // 斜面の右端から始まる
      slopeEndY + slopeHeight / 2, // 斜面の下端と同じ高さ
      groundWidth,
      40,
      {
        isStatic: true,
        friction: 0.8,
        render: {
          fillStyle: "#2ecc71",
        },
      },
    );
    groundRef.current = ground;

    // 四角い物体を作成（斜面上に配置）
    // 斜面上の適切な位置を計算
    const boxSize = 50;
    // 斜面の上面に正確に配置するための計算
    const slopeCenterX = 200;
    const slopeCenterY = 450;
    const distanceFromCenter = -150; // 斜面中心からの距離

    // 斜面に沿った位置の計算
    const boxX = slopeCenterX + distanceFromCenter * Math.cos(slopeAngle);
    const boxY =
      slopeCenterY +
      distanceFromCenter * Math.sin(slopeAngle) -
      (slopeHeight / 2 + boxSize / 2) * Math.cos(slopeAngle);

    const box = Matter.Bodies.rectangle(boxX, boxY, boxSize, boxSize, {
      angle: slopeAngle, // 斜面と同じ角度に傾ける
      friction: 0.5, // 箱の摩擦係数
      frictionStatic: 0.8, // 静止摩擦係数
      density: 0.04, // 密度を上げて重くする
      restitution: 0.3, // 反発係数
      render: {
        fillStyle: "#e74c3c",
      },
    });

    boxRef.current = box;

    // ボーリングピン風の物体を作成（地面上に配置）
    const pins: Matter.Body[] = [];
    const groundCenterX = slopeEndX + groundWidth / 2;
    const groundTopY = slopeEndY + slopeHeight / 2 - 20; // 地面の上面

    const pinPositions = [
      // 1列目（1本）
      { x: groundCenterX - 50, y: groundTopY - 30 },
      // 2列目（2本）
      { x: groundCenterX - 80, y: groundTopY - 60 },
      { x: groundCenterX - 20, y: groundTopY - 60 },
      // 3列目（3本）
      { x: groundCenterX - 110, y: groundTopY - 90 },
      { x: groundCenterX - 50, y: groundTopY - 90 },
      { x: groundCenterX + 10, y: groundTopY - 90 },
      // 4列目（4本）
      { x: groundCenterX - 140, y: groundTopY - 120 },
      { x: groundCenterX - 80, y: groundTopY - 120 },
      { x: groundCenterX - 20, y: groundTopY - 120 },
      { x: groundCenterX + 40, y: groundTopY - 120 },
      // 5列目（5本）
      { x: groundCenterX - 170, y: groundTopY - 150 },
      { x: groundCenterX - 110, y: groundTopY - 150 },
      { x: groundCenterX - 50, y: groundTopY - 150 },
      { x: groundCenterX + 10, y: groundTopY - 150 },
      { x: groundCenterX + 70, y: groundTopY - 150 },
    ];

    pinPositions.forEach((pos) => {
      const pin = Matter.Bodies.rectangle(pos.x, pos.y, 15, 50, {
        friction: 0.5,
        density: 0.001,
        restitution: 0.5,
        render: {
          fillStyle: "#f39c12",
        },
      });
      pins.push(pin);
    });

    pinsRef.current = pins;

    // ワールドに追加
    Matter.Composite.add(engine.world, [slope, ground, box, ...pins]);

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

  // 重力加速度の値を取得
  const getGravityValue = (mode: GravityMode): number => {
    switch (mode) {
      case "-":
        return -1; // 逆重力
      case "0":
        return 0; // 重力なし
      case "+":
        return 1; // 通常重力
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

  // Try！ボタン - 選択した設定で実行
  const handleTry = () => {
    if (boxRef.current && engineRef.current && !isFalling) {
      // 重力を設定
      engineRef.current.gravity.y = getGravityValue(gravityMode);

      const frictionValue = getFrictionValue(frictionMode);

      // 物体の摩擦係数を設定
      Matter.Body.set(boxRef.current, {
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

      // 地面の摩擦係数を設定
      if (groundRef.current) {
        Matter.Body.set(groundRef.current, {
          friction:
            frictionMode === "0" ? 0 : frictionMode === "-" ? -0.5 : 0.8,
        });
      }

      // ピンの摩擦係数を設定
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

  // 物体をリセットする関数
  const handleReset = () => {
    if (engineRef.current && boxRef.current) {
      // 重力をゼロに戻す
      engineRef.current.gravity.y = 0;

      // 古い物体とピンを削除
      Matter.Composite.remove(engineRef.current.world, boxRef.current);
      pinsRef.current.forEach((pin) => {
        Matter.Composite.remove(engineRef.current!.world, pin);
      });

      // 新しい物体を初期位置に再作成
      const slopeAngle = (30 * Math.PI) / 180;
      const boxSize = 50;
      const slopeCenterX = 200;
      const slopeCenterY = 450;
      const distanceFromCenter = -150;
      const slopeHeight = 40;

      const boxX = slopeCenterX + distanceFromCenter * Math.cos(slopeAngle);
      const boxY =
        slopeCenterY +
        distanceFromCenter * Math.sin(slopeAngle) -
        (slopeHeight / 2 + boxSize / 2) * Math.cos(slopeAngle);

      const newBox = Matter.Bodies.rectangle(boxX, boxY, boxSize, boxSize, {
        angle: slopeAngle,
        friction: 0.5,
        frictionStatic: 0.8,
        density: 0.004,
        restitution: 0.3,
        render: {
          fillStyle: "#e74c3c",
        },
      });

      // 速度と角速度を完全にゼロにリセット
      Matter.Body.setVelocity(newBox, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(newBox, 0);
      Matter.Body.setPosition(newBox, { x: boxX, y: boxY });

      boxRef.current = newBox;

      // ピンを再作成
      const slopeEndX = 200 + (400 / 2) * Math.cos(slopeAngle);
      const slopeEndY = 450 + (400 / 2) * Math.sin(slopeAngle) + 40 / 2;
      const groundWidth = 400;
      const groundCenterX = slopeEndX + groundWidth / 2;
      const groundTopY = slopeEndY + 40 / 2 - 20;

      const pins: Matter.Body[] = [];
      const pinPositions = [
        // 1列目（1本）
        { x: groundCenterX - 50, y: groundTopY - 30 },
        // 2列目（2本）
        { x: groundCenterX - 80, y: groundTopY - 60 },
        { x: groundCenterX - 20, y: groundTopY - 60 },
        // 3列目（3本）
        { x: groundCenterX - 110, y: groundTopY - 90 },
        { x: groundCenterX - 50, y: groundTopY - 90 },
        { x: groundCenterX + 10, y: groundTopY - 90 },
        // 4列目（4本）
        { x: groundCenterX - 140, y: groundTopY - 120 },
        { x: groundCenterX - 80, y: groundTopY - 120 },
        { x: groundCenterX - 20, y: groundTopY - 120 },
        { x: groundCenterX + 40, y: groundTopY - 120 },
        // 5列目（5本）
        { x: groundCenterX - 170, y: groundTopY - 150 },
        { x: groundCenterX - 110, y: groundTopY - 150 },
        { x: groundCenterX - 50, y: groundTopY - 150 },
        { x: groundCenterX + 10, y: groundTopY - 150 },
        { x: groundCenterX + 70, y: groundTopY - 150 },
      ];

      pinPositions.forEach((pos) => {
        const pin = Matter.Bodies.rectangle(pos.x, pos.y, 15, 50, {
          friction: 0.5,
          density: 0.001,
          restitution: 0.5,
          render: {
            fillStyle: "#f39c12",
          },
        });
        pins.push(pin);
      });

      pinsRef.current = pins;

      Matter.Composite.add(engineRef.current.world, [newBox, ...pins]);
      setIsFalling(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4 text-white">
        物理シミュレーター - 斜面と摩擦力
      </h1>

      {/* パラメータ選択UI */}
      <div className="mb-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-6">
          {/* 重力加速度選択 */}
          <div>
            <h3 className="text-white font-bold mb-3 text-lg">重力加速度</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGravityMode("-")}
                disabled={isFalling}
                className={`px-4 py-2 rounded font-bold transition-colors ${
                  gravityMode === "-"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                - (逆)
              </button>
              <button
                type="button"
                onClick={() => setGravityMode("0")}
                disabled={isFalling}
                className={`px-4 py-2 rounded font-bold transition-colors ${
                  gravityMode === "0"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                0 (無)
              </button>
              <button
                type="button"
                onClick={() => setGravityMode("+")}
                disabled={isFalling}
                className={`px-4 py-2 rounded font-bold transition-colors ${
                  gravityMode === "+"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                + (通常)
              </button>
            </div>
          </div>

          {/* 摩擦係数選択 */}
          <div>
            <h3 className="text-white font-bold mb-3 text-lg">摩擦係数</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFrictionMode("-")}
                disabled={isFalling}
                className={`px-4 py-2 rounded font-bold transition-colors ${
                  frictionMode === "-"
                    ? "bg-green-600 text-white"
                    : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                - (負)
              </button>
              <button
                type="button"
                onClick={() => setFrictionMode("0")}
                disabled={isFalling}
                className={`px-4 py-2 rounded font-bold transition-colors ${
                  frictionMode === "0"
                    ? "bg-green-600 text-white"
                    : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                0 (無)
              </button>
              <button
                type="button"
                onClick={() => setFrictionMode("+")}
                disabled={isFalling}
                className={`px-4 py-2 rounded font-bold transition-colors ${
                  frictionMode === "+"
                    ? "bg-green-600 text-white"
                    : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                + (正)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-4 border-gray-700 rounded-lg overflow-hidden shadow-2xl">
        <canvas ref={canvasRef} />
      </div>

      {/* 実行・リセットボタン */}
      <div className="mt-4 flex gap-4">
        <button
          type="button"
          onClick={handleTry}
          disabled={isFalling}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors text-lg"
        >
          Try！
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

export default AntiGravity;
