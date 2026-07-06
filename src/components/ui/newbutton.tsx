import * as React from "react";
import { cn } from "@/lib/utils";

export interface NewButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const NewButton = React.forwardRef<HTMLButtonElement, NewButtonProps>(
  ({ className, loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  }
);

NewButton.displayName = "NewButton";
