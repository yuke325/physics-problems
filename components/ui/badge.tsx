import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all",
  {
    variants: {
      variant: {
        default:
          "border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20",
        secondary:
          "border border-white/20 bg-white/5 text-slate-100 hover:bg-white/10",
        destructive:
          "border border-red-400/30 bg-red-500/10 text-red-300 hover:bg-red-500/20",
        outline:
          "border border-white/20 text-slate-300 hover:bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
