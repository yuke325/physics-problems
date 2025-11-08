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
        <div className="relative rounded-xl overflow-hidden border-2 border-slate-700/50 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Grid Background Pattern */}
          <div 
            className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Radial Glow Effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          
          <canvas ref={canvasRef} className="relative z-10" />
        </div>
      </Card>

      {/* 実行・リセットボタン */}
      <ExecuteContainer onTry={onTry} onReset={onReset} isFalling={isFalling} />
    </div>
  );
};
