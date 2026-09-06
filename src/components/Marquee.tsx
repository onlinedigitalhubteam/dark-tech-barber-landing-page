import { tickerItems } from "@/data/services";

/**
 * Barber-shop "price board" marquee. Pure CSS animation, paused for reduced
 * motion, duplicated once so the loop is seamless.
 */
export function Marquee() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="relative border-y border-white/8 bg-surface/40">
      <div aria-hidden className="edge-fade overflow-hidden py-3.5">
        <div className="flex w-max animate-marquee items-center gap-8 pr-8 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-3 text-[0.74rem] font-semibold tracking-[0.18em] whitespace-nowrap text-muted/90 uppercase"
            >
              <span aria-hidden className="h-1 w-1 rotate-45 bg-accent" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <span className="sr-only">
        Service price list: {tickerItems.join(", ")}.
      </span>
    </div>
  );
}
