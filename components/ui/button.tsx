import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60 hover:scale-[1.02]",
        destructive:
          "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:scale-[1.02]",
        outline:
          "border-2 border-cyan-400/50 bg-transparent text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400",
        secondary:
          "bg-slate-800/80 text-slate-100 backdrop-blur-sm hover:bg-slate-700/80",
        ghost: "text-slate-300 hover:bg-white/5 hover:text-white",
        link: "text-cyan-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-base",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-3 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
