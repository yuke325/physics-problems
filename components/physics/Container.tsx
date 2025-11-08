import { ExecuteContainer } from "./ExecuteContainer";
import { Card } from "@/components/ui/card";

export const PhysicsContainer: React.FC<{
  title: string;
  children: React.ReactNode;
  onTry: () => void;
  onReset: () => void;
  isFalling: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}> = ({ title, children, onTry, onReset, isFalling, canvasRef }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-block">
          <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mb-4" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      {/* パラメータ選択UI */}
      {children}

      <Card className="p-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative rounded-xl overflow-hidden border-2 border-slate-700/50 shadow-2xl">
          <canvas ref={canvasRef} />
        </div>
      </Card>

      {/* 実行・リセットボタン */}
      <ExecuteContainer onTry={onTry} onReset={onReset} isFalling={isFalling} />
    </div>
  );
};
