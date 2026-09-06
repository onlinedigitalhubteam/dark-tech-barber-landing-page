import { ArrowRight, Award, Scissors } from "lucide-react";
import { businessConfig, DEFAULT_BOOKING_MESSAGE } from "@/data/businessConfig";
import { specialties } from "@/data/content";
import { photoUrl } from "@/data/gallery";
import { track } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Hi } from "@/components/ui/SectionHeading";
import { FaWhatsapp } from "@/components/ui/Icons";

const facts = [
  { icon: Award, label: "Experience", value: "8 years professional" },
  { icon: Scissors, label: "Focus", value: "Men's & boys' grooming" },
];

export function AboutBarber() {
  const book = () => {
    track("whatsapp_click", { source: "about_barber" });
    openWhatsApp(
      `${DEFAULT_BOOKING_MESSAGE.replace("I'd like to book a haircut.", "I'd like to book a cut with " + businessConfig.owner + ".")}`,
    );
  };

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_15%_30%,rgba(255,85,0,0.07),transparent_70%)]"
      />
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Portrait */}
        <Reveal className="relative order-1">
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute -top-4 -left-4 h-24 w-24 border-t border-l border-accent/45"
            />
            <div
              aria-hidden
              className="absolute -right-4 -bottom-4 h-24 w-24 border-r border-b border-accent/45"
            />
            <div className="overflow-hidden rounded-[14px] border border-white/8 bg-surface">
              <img
                src={photoUrl(9992819, 760, 950)}
                srcSet={`${photoUrl(9992819, 520, 650)} 520w, ${photoUrl(9992819, 760, 950)} 760w`}
                sizes="(min-width: 1024px) 34vw, 90vw"
                width={760}
                height={950}
                loading="lazy"
                decoding="async"
                alt="Barber working closely on a customer's haircut and beard inside the studio."
                className="aspect-4/5 w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 w-[min(20rem,92%)] -translate-x-1/2 rounded-[12px] border border-white/8 bg-canvas/95 px-4 py-3 text-center shadow-deep backdrop-blur">
              <p className="font-display text-[0.95rem] font-bold text-ink">{businessConfig.owner}</p>
              <p className="mt-0.5 text-[0.7rem] font-semibold tracking-[0.18em] text-accent uppercase">
                {businessConfig.role}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-2">
          <SectionHeading
            eyebrow="The Barber"
            title={
              <>
                Precision Is the <Hi>Standard.</Hi>
              </>
            }
          />

          <Reveal delay={80}>
            <blockquote className="relative mt-8 rounded-[12px] border border-white/8 bg-surface p-5 sm:p-6">
              <span
                aria-hidden
                className="display absolute -top-4 left-4 text-4xl leading-none font-bold text-accent/70"
              >
                “
              </span>
              <p className="text-[1rem] leading-relaxed text-ink/95 italic sm:text-[1.06rem]">
                I've spent the last eight years developing my craft around one simple idea: a great
                haircut is all about the details. From the fade to the hairline and final finish,
                every part of the cut should work together.
              </p>
              <footer className="mt-4 text-[0.78rem] font-semibold tracking-[0.14em] text-muted/80 uppercase">
                — {businessConfig.owner}, {businessConfig.role}
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-muted">
              At {businessConfig.name}, every customer gets personal attention, professional
              service and a finish designed around their own style. {businessConfig.promise}
            </p>
          </Reveal>

          <Reveal delay={190}>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center gap-3 rounded-[12px] border border-white/8 bg-surface/70 px-4 py-3"
                >
                  <fact.icon size={17} className="shrink-0 text-accent" aria-hidden />
                  <p className="text-[0.86rem] text-muted">
                    <span className="mr-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-muted/60 uppercase">
                      {fact.label}
                    </span>
                    <span className="font-semibold text-ink">{fact.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={230}>
            <div className="mt-7">
              <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-muted/70 uppercase">
                Specialties
              </p>
              <ul className="mt-3 flex flex-wrap gap-2 p-0 list-none">
                {specialties.map((specialty) => (
                  <li
                    key={specialty}
                    className="rounded-full border border-white/8 bg-surface px-3.5 py-1.5 text-[0.8rem] font-medium text-muted transition-colors duration-200 hover:border-accent/45 hover:text-ink"
                  >
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <button type="button" onClick={book} className="btn btn-primary group mt-8 px-5 py-3.5">
              <FaWhatsapp size={17} aria-hidden />
              Book with Marcus
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
