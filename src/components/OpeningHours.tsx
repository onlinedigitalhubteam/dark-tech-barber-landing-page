import { DAY_ORDER } from "@/data/businessConfig";
import { hoursLabel } from "@/utils/businessHours";
import { useBusinessStatus } from "@/hooks";
import { cn } from "@/utils/cn";

export function OpeningHours({ compact = false }: { compact?: boolean }) {
  const status = useBusinessStatus();

  return (
    <div className={cn("card", compact ? "p-4" : "p-5 sm:p-6")}>
      <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-3">
        <h3 className="font-display text-[0.8rem] font-bold tracking-[0.2em] text-ink uppercase">
          Opening Hours
        </h3>
        <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase">
          <span
            aria-hidden
            className={cn(
              "h-2 w-2 rounded-full",
              status.isOpen ? "bg-accent animate-pulse-dot" : "bg-muted/60",
            )}
          />
          <span className={status.isOpen ? "text-accent" : "text-muted"}>
            {status.isOpen ? "Open now" : "Closed"}
          </span>
        </p>
      </div>

      <dl className="mt-3 grid gap-1 p-0">
        {DAY_ORDER.map((day, index) => {
          const isToday = index === status.dayIndex;
          return (
            <div
              key={day.key}
              className={cn(
                "flex items-center justify-between gap-4 rounded-[8px] px-2.5 py-2 text-[0.86rem] transition-colors",
                isToday ? "bg-accent/10 text-ink" : "text-muted hover:bg-white/4",
              )}
            >
              <dt className={cn("flex items-center gap-2", isToday && "font-semibold")}>
                {isToday ? (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                ) : (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/12" />
                )}
                {day.label}
              </dt>
              <dd className={cn("num tabular-nums", isToday ? "font-semibold text-ink" : "")}>
                {hoursLabel(day.key)}
              </dd>
            </div>
          );
        })}
      </dl>

      <p className="mt-4 border-t border-white/8 pt-3 text-[0.74rem] text-muted/70">
        {status.sentence} Times shown for {businessTimezone()}.
      </p>
    </div>
  );
}

function businessTimezone(): string {
  return "Africa/Douala (WAT, UTC+1)";
}
