import { DEFAULT_BOOKING_MESSAGE } from "@/data/businessConfig";
import { useScrollProgress } from "@/hooks";
import { track } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { FaWhatsapp } from "@/components/ui/Icons";

/**
 * Always-available escape hatch to WhatsApp. Sits above the mobile action bar
 * on small screens and wears a subtle scroll-progress ring on desktop.
 */
export function FloatingWhatsApp() {
  const progress = useScrollProgress();
  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  return (
    <a
      href={`https://wa.me/me?text=${encodeURIComponent(DEFAULT_BOOKING_MESSAGE)}`}
      onClick={(e) => {
        e.preventDefault();
        track("whatsapp_click", { source: "floating_button" });
        openWhatsApp(DEFAULT_BOOKING_MESSAGE);
      }}
      aria-label="Book a haircut on WhatsApp (opens a chat with a pre-filled message)"
      className="group fixed right-4 bottom-[calc(4.9rem+env(safe-area-inset-bottom))] z-40 flex items-center gap-0 sm:right-6 lg:bottom-6"
    >
      <span className="relative inline-flex h-[58px] w-[58px] items-center justify-center">
        <svg
          aria-hidden
          viewBox="0 0 60 60"
          className="absolute inset-0 h-full w-full -rotate-90 transition-transform duration-300"
        >
          <circle cx="30" cy="30" r={radius} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="2" />
          <circle
            cx="30"
            cy="30"
            r={radius}
            fill="none"
            stroke="#FF5500"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: "stroke-dashoffset 160ms linear" }}
          />
        </svg>
        <span className="absolute inset-[6px] rounded-full bg-black/85 shadow-glow transition-all duration-200 group-hover:bg-[#1a0d05] group-hover:shadow-glow-lg" />
        <span
          aria-hidden
          className="absolute inset-[6px] rounded-full border border-accent/40 animate-pulse-dot"
        />
        <FaWhatsapp aria-hidden size={24} className="relative z-10 text-accent transition-transform duration-200 group-hover:scale-110" />
      </span>

      <span className="pointer-events-none relative max-w-0 overflow-hidden rounded-l-none rounded-r-[10px] border border-l-0 border-accent/40 bg-surface text-[0.78rem] font-semibold whitespace-nowrap text-ink opacity-0 transition-all duration-250 group-hover:ml-2 group-hover:max-w-[13rem] group-hover:px-3 group-hover:py-2.5 group-hover:opacity-100">
        Book in one message
      </span>
    </a>
  );
}
