import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Section component — handles vertical padding and optional background theme.
 * Usage:
 * <Section variant="light">...</Section>
 * <Section variant="dark">...</Section>
 * <Section variant="gradient">...</Section>
 */
export default function Section({
  children,
  className,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "light" | "dark" | "gradient";
}) {
  const variants = {
    default: "",
    light: "bg-section-light",
    dark: "bg-section-dark",
    gradient: "bg-section-gradient",
  };

  return (
    <section className={cn("py-16 md:py-24", variants[variant], className)}>
      {children}
    </section>
  );
}
