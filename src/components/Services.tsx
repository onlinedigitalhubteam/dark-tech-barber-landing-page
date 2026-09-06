import { ArrowUpRight, Clock } from "lucide-react";
import { services } from "@/data/services";
import { businessConfig } from "@/data/businessConfig";
import { track } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Hi } from "@/components/ui/SectionHeading";
import { IconTile, serviceIcons } from "@/components/ui/Icons";
import { cn } from "@/utils/cn";

function bookService(name: string, price: string, source: string) {
  track("service_book_click", { service: name, source });
  openWhatsApp(
    `Hello Apex Fade Barber Studio 👋\n\nI'd like to book: ${name} (${price}).\n\nPlease let me know your next available time. Thank you.`,
  );
}

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="ambient-glow pointer-events-none absolute top-10 right-0 -z-10 h-[30rem] w-[30rem] rounded-full opacity-70"
      />
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Choose Your <Hi>Cut.</Hi>
            </>
          }
          text="From a simple clean-up to a complete transformation, choose the style that fits you. Every service includes a consultation, precise clipper or scissor work and a finished hairline."
          aside={
            <div className="card px-4 py-3.5 text-[0.8rem] sm:min-w-[15rem]">
              <p className="font-semibold tracking-[0.16em] text-accent uppercase">Walk-ins welcome</p>
              <p className="mt-1.5 text-muted">
                Busy days get busy — send a message first and we'll hold your slot.
              </p>
              <p className="num mt-2 text-[0.75rem] text-muted/70">
                Cuts from {businessConfig.priceFrom.toLocaleString("en-US")} {businessConfig.currency}
              </p>
            </div>
          }
        />

        <ul className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal
                as="li"
                key={service.id}
                delay={(index % 3) * 70}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[12px] border border-white/8 bg-surface p-5 transition-all duration-200",
                  "hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_18px_40px_-24px_rgba(255,85,0,0.55)]",
                  service.wide && "sm:p-6 xl:col-span-2",
                )}
              >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-300 group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <IconTile
                      icon={Icon}
                      className="group-hover:border-accent/60 group-hover:bg-accent/15"
                    />
                    <span className="num text-[0.7rem] font-semibold tracking-[0.2em] text-muted/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-ink transition-colors duration-200 group-hover:text-white sm:text-[1.32rem]">
                    {service.name}
                  </h3>
                  <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 p-0 list-none">
                    {service.includes.map((inc) => (
                      <li
                        key={inc}
                        className="flex items-center gap-1.5 text-[0.76rem] text-muted/85"
                      >
                        <span aria-hidden className="h-1 w-1 rotate-45 bg-accent/80" />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-white/8 pt-4">
                    <div>
                      <p className="num text-[1.35rem] font-bold text-ink">{service.priceLabel}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-[0.72rem] tracking-[0.1em] text-muted/70 uppercase">
                        <Clock size={12} aria-hidden className="text-accent/80" />
                        {service.duration}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => bookService(service.name, service.priceLabel, "service_card")}
                      className="btn btn-secondary group/btn py-2.5 text-[0.78rem] uppercase transition-all duration-200 group-hover:border-accent/60 group-hover:bg-accent group-hover:text-white group-hover:shadow-glow"
                    >
                      {service.cta}
                      <ArrowUpRight
                        size={15}
                        aria-hidden
                        className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </button>
                  </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
