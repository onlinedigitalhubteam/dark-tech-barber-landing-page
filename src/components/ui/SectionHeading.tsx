import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  aside?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  aside,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", align === "center" && "text-center")}>
        <p className="eyebrow flex items-center gap-2.5">
          <span aria-hidden className="h-px w-6 bg-accent" />
          {eyebrow}
        </p>
        <h2
          className={cn(
            "mt-3 text-[1.9rem] leading-[1.06] font-bold sm:text-4xl lg:text-[2.9rem]",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {text ? (
          <p className="mt-4 text-[0.98rem] leading-relaxed text-muted sm:text-base">{text}</p>
        ) : null}
      </Reveal>
      {aside ? <Reveal delay={90}>{aside}</Reveal> : null}
    </div>
  );
}

/** Orange highlight for a keyword inside a heading. */
export function Hi({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>;
}
