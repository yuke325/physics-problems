import Matter from "matter-js";
import type { MatterCanvasResult } from "@/lib/types";

interface CoulombForceMatterProps {
  electronsRef: React.RefObject<Matter.Body[]>;
  chargeRef: React.RefObject<Matter.Body | null>;
  chargeType: "positive" | "neutral" | "negative";
}

export const initializeCoulombForce = (
  chargeType: "positive" | "neutral" | "negative",
) => {
  // 境界壁
  const walls = [
    // 上
    Matter.Bodies.rectangle(600, -10, 1220, 20, {
      isStatic: true,
      render: { fillStyle: "rgba(100, 100, 100, 0.3)" },
    }),
    // 下
    Matter.Bodies.rectangle(600, 810, 1220, 20, {
      isStatic: true,
      render: { fillStyle: "rgba(100, 100, 100, 0.3)" },
    }),
    // 左
    Matter.Bodies.rectangle(-10, 400, 20, 820, {
      isStatic: true,
      render: { fillStyle: "rgba(100, 100, 100, 0.3)" },
    }),
    // 右
    Matter.Bodies.rectangle(1210, 400, 20, 820, {
      isStatic: true,
      render: { fillStyle: "rgba(100, 100, 100, 0.3)" },
    }),
  ];

  // 中央に電荷を配置
  let charge: Matter.Body;
  if (chargeType === "positive") {
    charge = Matter.Bodies.circle(600, 400, 40, {
      isStatic: true,
      render: {
        fillStyle: "rgba(239, 68, 68, 0.8)",
        strokeStyle: "#fca5a5",
        lineWidth: 4,
      },
      label: "positive",
    });
  } else if (chargeType === "neutral") {
    charge = Matter.Bodies.circle(600, 400, 40, {
      isStatic: true,
      render: {
        fillStyle: "rgba(156, 163, 175, 0.8)",
        strokeStyle: "#d1d5db",
        lineWidth: 4,
      },
      label: "neutral",
    });
  } else {
    charge = Matter.Bodies.circle(600, 400, 40, {
      isStatic: true,
      render: {
        fillStyle: "rgba(59, 130, 246, 0.8)",
        strokeStyle: "#93c5fd",
        lineWidth: 4,
      },
      label: "negative",
    });
  }

  // 中央の電荷の周りに円形に電子を配置（360度）
  const electrons: Matter.Body[] = [];
  const numElectrons = 16; // 16個の電子を配置
  const radius = 250; // 中心からの距離
  const centerX = 600;
  const centerY = 400;

  for (let i = 0; i < numElectrons; i++) {
    const angle = (i / numElectrons) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    electrons.push(
      Matter.Bodies.circle(x, y, 10, {
        density: 0.001,
        restitution: 0.8,
        frictionAir: 0.01,
        render: {
          fillStyle: "rgba(59, 130, 246, 0.9)",
          strokeStyle: "#93c5fd",
          lineWidth: 2,
        },
        label: "electron",
      }),
    );
  }

  return { walls, charge, electrons };
};

export const coulombForceMatter = ({
  electronsRef,
  chargeRef,
  chargeType,
}: CoulombForceMatterProps): MatterCanvasResult => {
  const { walls, charge, electrons } = initializeCoulombForce(chargeType);

  electronsRef.current = electrons;
  chargeRef.current = charge;

  return [...walls, charge, ...electrons];
};

// クーロン力を適用する関数
export const applyCoulombForce = (
  engine: Matter.Engine,
  electrons: Matter.Body[],
  charge: Matter.Body,
  forceStrength: number,
) => {
  // 各フレームでクーロン力を計算して適用
  const handler = () => {
    for (const electron of electrons) {
      const dx = charge.position.x - electron.position.x;
      const dy = charge.position.y - electron.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 5) continue; // 距離が近すぎる場合はスキップ

      // 中性電荷の場合は力を加えない
      if (charge.label === "neutral") continue;

      // クーロン力: F = k * q1 * q2 / r^2
      // 正規化された方向ベクトル
      const dirX = dx / distance;
      const dirY = dy / distance;

      // 力の大きさ（距離の2乗に反比例）
      const forceMagnitude = (forceStrength * 10000) / (distance * distance);

      // 正電荷なら引力、負電荷なら斥力
      const sign = charge.label === "positive" ? 1 : -1;

      const force = {
        x: dirX * forceMagnitude * sign * 0.0001,
        y: dirY * forceMagnitude * sign * 0.0001,
      };

      Matter.Body.applyForce(electron, electron.position, force);
    }
  };

  Matter.Events.on(engine, "beforeUpdate", handler);
  return handler;
};

// 電子をリセットする関数
export const resetElectrons = (electrons: Matter.Body[]) => {
  const numElectrons = electrons.length;
  const radius = 250;
  const centerX = 600;
  const centerY = 400;

  for (let i = 0; i < numElectrons; i++) {
    const angle = (i / numElectrons) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    Matter.Body.setPosition(electrons[i], { x, y });
    Matter.Body.setVelocity(electrons[i], { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(electrons[i], 0);
  }
};
