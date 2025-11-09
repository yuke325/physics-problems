import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  isActive: boolean;
  label: string;
}

export function StatusIndicator({ isActive, label }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 backdrop-blur-sm">
      <div className="relative">
        <Activity
          className={cn(
            "h-5 w-5 transition-colors duration-300",
            isActive ? "text-cyan-400" : "text-slate-500",
          )}
        />
        {isActive && (
          <div className="absolute inset-0">
            <Activity className="h-5 w-5 text-cyan-400 animate-ping" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
          Status
        </p>
        <p
          className={cn(
            "text-sm font-bold transition-colors duration-300",
            isActive ? "text-cyan-300" : "text-slate-300",
          )}
        >
          {label}
        </p>
      </div>
      <div
        className={cn(
          "h-2 w-2 rounded-full transition-all duration-300",
          isActive
            ? "bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse"
            : "bg-slate-600",
        )}
      />
    </div>
  );
}
