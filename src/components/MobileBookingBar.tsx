import { Phone } from "lucide-react";
import { businessConfig, DEFAULT_BOOKING_MESSAGE, telHref } from "@/data/businessConfig";
import { track } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { useBusinessStatus } from "@/hooks";
import { FaWhatsapp } from "@/components/ui/Icons";

/** Mobile-only conversion bar: the two actions that close a local booking. */
export function MobileBookingBar() {
  const status = useBusinessStatus();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-canvas/95 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex w-full max-w-[520px] items-center gap-2.5 px-3">
        <a
          href={telHref}
          onClick={() => track("phone_click", { source: "mobile_bar" })}
          className="btn btn-secondary flex-1 py-3"
        >
          <Phone size={15} aria-hidden className="text-accent" />
          Call now
        </a>
        <button
          type="button"
          onClick={() => {
            track("whatsapp_click", { source: "mobile_bar" });
            openWhatsApp(DEFAULT_BOOKING_MESSAGE);
          }}
          className="btn btn-primary flex-[1.35] py-3"
        >
          <FaWhatsapp size={16} aria-hidden />
          Book on WhatsApp
        </button>
      </div>
      <p className="mt-1.5 text-center text-[0.66rem] tracking-[0.14em] text-muted/60 uppercase">
        <span aria-hidden className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${status.isOpen ? "bg-accent" : "bg-muted/60"}`} />
        {status.isOpen ? `Open now · ${status.detail}` : `Closed · ${status.detail}`}
      </p>
      <span className="sr-only">{businessConfig.address}</span>
    </div>
  );
}
