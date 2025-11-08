import { Button } from "@/components/ui/button";
import { PlayCircle, RotateCcw } from "lucide-react";

export const ExecuteContainer: React.FC<{
  onTry: () => void;
  onReset: () => void;
  isFalling: boolean;
}> = ({ onTry, onReset, isFalling }) => {
  return (
    <div className="mt-8 flex gap-4">
      <Button
        type="button"
        onClick={onTry}
        disabled={isFalling}
        size="lg"
        className="group"
      >
        <PlayCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
        Try！
      </Button>
      <Button
        type="button"
        onClick={onReset}
        variant="outline"
        size="lg"
        className="group"
      >
        <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
        リセット
      </Button>
    </div>
  );
};
