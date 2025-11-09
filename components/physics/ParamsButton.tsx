import { cn } from "@/lib/utils";

export const ParamsButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}> = ({ label, isSelected, onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-300",
        "border-2 backdrop-blur-sm",
        isSelected
          ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/50 scale-105"
          : "bg-slate-800/60 border-slate-600/50 text-slate-300 hover:border-cyan-400/50 hover:bg-slate-700/60 hover:text-white",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
      )}
    >
      {isSelected && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/20 to-blue-400/20 animate-pulse" />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
};
