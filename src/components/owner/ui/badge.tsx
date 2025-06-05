"use client";

import * as React from "react";
import { cn } from "@/utils/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80":
            variant === "default",
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80":
            variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80":
            variant === "destructive",
          "border-border bg-background hover:bg-accent hover:text-accent-foreground":
            variant === "outline",
          "border-transparent bg-green-500 text-white hover:bg-green-500/80":
            variant === "success",
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80":
            variant === "warning",
          "border-transparent bg-blue-500 text-white hover:bg-blue-500/80":
            variant === "info",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };