import { ArrowRight, Phone } from "lucide-react";
import { businessConfig, DEFAULT_BOOKING_MESSAGE, telHref } from "@/data/businessConfig";
import { track } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { FaWhatsapp } from "@/components/ui/Icons";
import { StatusPill } from "@/components/ui/StatusPill";

export function FinalCTA() {
  const book = () => {
    track("whatsapp_click", { source: "final_cta" });
    openWhatsApp(DEFAULT_BOOKING_MESSAGE);
  };

  return (
    <section aria-labelledby="final-cta-heading" className="relative overflow-hidden py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[16px] border border-accent/25 bg-gradient-to-b from-surface to-canvas px-6 py-12 text-center sm:px-10 sm:py-16 lg:py-20">
            {/* ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_58%_at_50%_35%,rgba(255,85,0,0.16),transparent_72%)]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 grid-texture opacity-45 [mask-image:radial-gradient(70%_70%_at_50%_40%,#000,transparent_75%)]" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            />

            <div className="relative mx-auto max-w-3xl">
              <p className="eyebrow justify-center">Your next look</p>
              <h2
                id="final-cta-heading"
                className="mt-4 text-[2rem] leading-[1.05] font-bold text-ink sm:text-[2.9rem] lg:text-[3.4rem]"
              >
                Your Next Fresh Cut Is{" "}
                <span className="text-accent">One Message Away.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-muted sm:text-[1.05rem]">
                Look sharp. Feel confident. Book your next cut at {businessConfig.name} —{" "}
                {businessConfig.taglineSecondary}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={book}
                  className="btn btn-primary group w-full px-6 py-4 text-[0.95rem] sm:w-auto"
                >
                  <FaWhatsapp size={18} aria-hidden />
                  Book on WhatsApp
                  <ArrowRight
                    size={17}
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
                <a
                  href={telHref}
                  onClick={() => track("phone_click", { source: "final_cta" })}
                  className="btn btn-secondary w-full px-6 py-4 text-[0.95rem] sm:w-auto"
                >
                  <Phone size={17} aria-hidden className="text-accent" />
                  Call {businessConfig.phoneDisplay}
                </a>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <StatusPill size="sm" />
                <p className="text-[0.78rem] text-muted/75">{businessConfig.promise}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
