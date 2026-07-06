import * as React from "react";
import { cn } from "@/lib/utils";

export interface GradientBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const GradientBorderButton = React.forwardRef<
  HTMLButtonElement,
  GradientBorderButtonProps
>(({ className, loading, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-black transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
        "bg-white",
        "before:absolute before:inset-0 before:rounded-md before:p-[2px] before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-orange-400 before:-z-10",
        "before:content-[''] before:block",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
});

GradientBorderButton.displayName = "GradientBorderButton";
