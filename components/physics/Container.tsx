import ReactMarkdown from "react-markdown"; // react-markdownをインポート
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button"; // Buttonコンポーネントをインポート
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExecuteContainer } from "./ExecuteContainer";

export const PhysicsContainer: React.FC<{
  title: string;
  children: React.ReactNode;
  onTry: () => void;
  onReset: () => void;
  isFalling: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  tryLabel?: string;
  description: string; // 追加
  explanation?: string; // 追加
}> = ({
  title,
  children,
  onTry,
  onReset,
  isFalling,
  canvasRef,
  tryLabel,
  description,
  explanation,
}) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-6 p-6 max-w-[1800px] mx-auto pt-25">
      {/* Left Sidebar - Parameters */}
      <aside className="lg:w-96 flex-shrink-0 space-y-6">
        {/* Title Section */}
        <div className="space-y-3">
          {" "}
          {/* このdivがh1とDialogを囲む */}
          <div className="inline-block">
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h1>
          {/* 問題文と解説のポップアップトリガー */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-4">
                問題と解説
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              {explanation && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="explanation">
                    <AccordionTrigger>解説を見る</AccordionTrigger>
                    <AccordionContent className=" max-h-[70vh] overflow-y-auto">
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown>{explanation}</ReactMarkdown>{" "}
                        {/* ReactMarkdownを使用 */}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </DialogContent>
          </Dialog>
        </div>
        {/* ここで閉じる */}
        {/* Parameters Card */}
        <Card className="p-6 sticky top-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-cyan-400">⚙</span>
                パラメータ設定
              </h2>
              <p className="text-xs text-slate-400">
                実験条件を選択してシミュレーションを実行
              </p>
            </div>

            {/* Parameters from children */}
            <div className="space-y-6">{children}</div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10">
              <ExecuteContainer
                onTry={onTry}
                onReset={onReset}
                isFalling={isFalling}
                tryLabel={tryLabel}
              />
            </div>
          </div>
        </Card>
      </aside>
      <main className="flex-1 flex flex-col gap-6">
        <Card className="flex-1 p-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="h-full relative rounded-xl overflow-hidden border-2 border-slate-700/50 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            {/* Grid Background Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            {/* Radial Glow Effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

            <canvas ref={canvasRef} className="relative z-10" />
          </div>
        </Card>
      </main>
    </div>
  );
};
