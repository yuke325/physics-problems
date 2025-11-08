import { Button } from "@/components/ui/button";
import { PlayCircle, RotateCcw } from "lucide-react";
import { StatusIndicator } from "@/components/ui/status-indicator";

export const ExecuteContainer: React.FC<{
  onTry: () => void;
  onReset: () => void;
  isFalling: boolean;
}> = ({ onTry, onReset, isFalling }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <StatusIndicator 
        isActive={isFalling} 
        label={isFalling ? "実行中" : "待機中"} 
      />
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          onClick={onTry}
          disabled={isFalling}
          size="lg"
          className="group w-full"
        >
          <PlayCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
          Try！
        </Button>
        <Button
          type="button"
          onClick={onReset}
          variant="outline"
          size="lg"
          className="group w-full"
        >
          <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
          リセット
        </Button>
      </div>
    </div>
  );
};
