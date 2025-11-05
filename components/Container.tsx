import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * A responsive wrapper that centers content
 * and applies the 1200px max width with padding.
 * Accepts extra className for flexibility.
 */
export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
