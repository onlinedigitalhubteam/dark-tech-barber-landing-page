import { useBusinessStatus } from "@/hooks";
import { cn } from "@/utils/cn";

interface StatusPillProps {
  className?: string;
  showClock?: boolean;
  size?: "sm" | "md";
}

/** Live OPEN NOW / CLOSED indicator calculated in Africa/Douala. */
export function StatusPill({ className, showClock = true, size = "md" }: StatusPillProps) {
  const status = useBusinessStatus();

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border bg-surface/80 backdrop-blur-sm",
        size === "sm" ? "px-3 py-1 text-[11px]" : "px-3.5 py-1.5 text-xs",
        status.isOpen ? "border-accent/40" : "border-white/10",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "relative inline-block h-2 w-2 shrink-0 rounded-full",
          status.isOpen ? "bg-accent animate-pulse-dot" : "bg-muted/70",
        )}
      />
      <span className="font-semibold tracking-[0.14em] text-ink uppercase">
        {status.isOpen ? "Open now" : "Closed"}
      </span>
      <span aria-hidden className="h-3 w-px bg-white/12" />
      <span className="text-muted">{status.detail}</span>
      {showClock ? (
        <span aria-hidden className="hidden text-muted/70 sm:inline">
          · {status.clock} WAT
        </span>
      ) : null}
      <span className="sr-only">
        {status.isOpen
          ? `The shop is open now. ${status.detail}`
          : `The shop is closed. ${status.detail}`}
      </span>
    </p>
  );
}
