import { ExecuteContainer } from "./ExecuteContainer";

export const PhysicsContainer: React.FC<{
  title: string;
  children: React.ReactNode;
  onTry: () => void;
  onReset: () => void;
  isFalling: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}> = ({ title, children, onTry, onReset, isFalling, canvasRef }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>

      {/* パラメータ選択UI */}
      {children}

      <div className="border-4 border-gray-700 rounded-lg overflow-hidden shadow-2xl">
        <canvas ref={canvasRef} />
      </div>

      {/* 実行・リセットボタン */}
      <ExecuteContainer onTry={onTry} onReset={onReset} isFalling={isFalling} />
    </div>
  );
};
