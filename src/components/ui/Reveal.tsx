import type { CSSProperties, ReactNode } from "react";
import { useRevealRef } from "@/hooks";
import { cn } from "@/utils/cn";

type RevealTag = "div" | "li" | "article" | "section" | "span";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal transition starts. */
  delay?: number;
  style?: CSSProperties;
  /** Rendered element — keeps list markup valid (<ul><li>) while revealing. */
  as?: RevealTag;
}

/** Scroll-reveal wrapper. Instantly visible when the user prefers reduced motion. */
export function Reveal({ children, className, delay = 0, style, as = "div" }: RevealProps) {
  const ref = useRevealRef<HTMLDivElement>();
  const Comp = as as unknown as "div";

  const merged = {
    ...style,
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <Comp ref={ref} data-reveal="" className={cn(className)} style={merged}>
      {children}
    </Comp>
  );
}
