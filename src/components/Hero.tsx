import { ArrowRight, MapPin, Star } from "lucide-react";
import { businessConfig, DEFAULT_BOOKING_MESSAGE, telHref } from "@/data/businessConfig";
import { gallerySrc, heroImage, photoUrl } from "@/data/gallery";
import { track } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { FaWhatsapp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { StatusPill } from "@/components/ui/StatusPill";

const heroStats = [
  { value: "8", unit: "yrs", label: "Behind the chair" },
  { value: "9", unit: "styles", label: "Cuts & grooming services" },
  { value: "1", unit: "msg", label: "To book on WhatsApp" },
];

export function Hero() {
  const book = () => {
    track("hero_book_click", { source: "hero_primary_cta" });
    openWhatsApp(DEFAULT_BOOKING_MESSAGE);
  };

  return (
    <section id="home" className="relative isolate overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-24">
      {/* ambient layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-texture opacity-70 [mask-image:radial-gradient(120%_85%_at_60%_0%,#000_20%,transparent_75%)]" />
        <div className="ambient-glow absolute -top-40 -right-24 h-[46rem] w-[46rem] rounded-full" />
        <div className="absolute top-1/3 -left-40 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,85,0,0.07),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
        {/* ---------- Copy ---------- */}
        <div>
          <Reveal>
            <StatusPill className="mb-6" />
          </Reveal>

          <Reveal delay={40}>
            <p className="eyebrow flex flex-wrap items-center gap-2.5">
              <span aria-hidden className="h-px w-8 bg-accent" />
              Professional Barber
              <span aria-hidden className="text-accent/60">•</span>
              Batoke, Limbe
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-4 text-[2.6rem] leading-[0.95] font-bold tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]">
              Sharp Cuts.
              <br />
              <span className="relative inline-block">
                <span className="text-accent">Strong Presence.</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-[3px] w-full bg-gradient-to-r from-accent via-accent/50 to-transparent sm:-bottom-2"
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted sm:text-[1.09rem]">
              Professional haircuts and grooming for men and boys who want to look clean,
              confident and ready for whatever comes next.
            </p>
          </Reveal>

          <Reveal delay={190}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={book}
                className="btn btn-primary group px-5 py-3.5 text-[0.92rem]"
              >
                <FaWhatsapp size={17} aria-hidden />
                Book your haircut
                <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <a
                href="#gallery"
                onClick={() => track("nav_click", { target: "gallery", source: "hero_secondary_cta" })}
                className="btn btn-secondary px-5 py-3.5 text-[0.92rem]"
              >
                View our cuts
              </a>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8rem] text-muted/85">
              <span className="font-semibold text-ink">8 Years Experience</span>
              <span aria-hidden className="text-accent/70">•</span>
              <span>Professional Service</span>
              <span aria-hidden className="text-accent/70">•</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} className="text-accent" aria-hidden />
                Batoke, Limbe
              </span>
            </p>
          </Reveal>

          <Reveal delay={300}>
            <dl className="mt-9 grid max-w-xl grid-cols-3 divide-x divide-white/8 border-t border-white/8 pt-5">
              {heroStats.map((stat) => (
                <div key={stat.label} className="px-3 first:pl-0 last:pr-0">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="num block text-2xl font-bold text-ink sm:text-[1.7rem]">
                      {stat.value}
                      <span className="ml-1 text-sm font-semibold text-accent">{stat.unit}</span>
                    </span>
                    <span className="mt-1 block text-[0.68rem] leading-tight tracking-[0.12em] text-muted/75 uppercase">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ---------- Visual ---------- */}
        <Reveal delay={120} className="relative">
          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            {/* thin orange frame line */}
            <div
              aria-hidden
              className="absolute -top-3 -right-3 hidden h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] rounded-[16px] border border-accent/25 sm:block"
            />
            <div className="relative overflow-hidden rounded-[14px] border border-white/8 bg-surface shadow-deep">
              {/* aspect ratio box keeps CLS at zero */}
              <div className="relative aspect-4/5 w-full">
                <img
                  src={heroImage(900, 1125)}
                  srcSet={`${heroImage(640, 800)} 640w, ${heroImage(900, 1125)} 900w, ${heroImage(1200, 1500)} 1200w`}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  width={900}
                  height={1125}
                  alt="Barber giving a precise clipper haircut to a customer inside a modern barber studio."
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/25 to-canvas/10"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40 mix-blend-screen [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1/2 animate-scan bg-gradient-to-b from-accent/20 to-transparent"
                />
              </div>

              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 bg-canvas/85 px-4 py-3 backdrop-blur-md">
                <span className="flex items-center gap-2 text-[0.78rem] font-semibold text-ink">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {businessConfig.addressShort}
                </span>
                <a
                  href={telHref}
                  onClick={() => track("phone_click", { source: "hero_image_caption" })}
                  className="num text-[0.78rem] text-muted underline decoration-accent/50 underline-offset-4 transition-colors hover:text-ink"
                >
                  {businessConfig.phoneDisplay}
                </a>
              </figcaption>
            </div>

            {/* floating detail card */}
            <div className="relative mt-4 w-full rounded-[12px] border border-white/8 bg-surface/95 p-3 shadow-deep backdrop-blur-sm sm:absolute sm:-bottom-10 sm:-left-8 sm:mt-0 sm:w-[15.5rem] lg:-left-12">
              <div className="flex items-center gap-3">
                <img
                  src={gallerySrc(12464840, "square", 160)}
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  alt="Razor finishing the temple edge of a haircut."
                  className="h-14 w-14 rounded-[9px] object-cover"
                />
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-[0.7rem] font-semibold tracking-[0.14em] text-accent uppercase">
                    <Star size={11} fill="currentColor" aria-hidden />
                    The finish
                  </p>
                  <p className="mt-1 text-[0.8rem] leading-snug text-muted">
                    Hairline, edges and neckline checked before you stand up.
                  </p>
                </div>
              </div>
            </div>

            {/* secondary visual, desktop only */}
            <div className="absolute -right-6 -bottom-14 hidden w-40 overflow-hidden rounded-[12px] border border-white/8 xl:block">
              <img
                src={photoUrl(7447150, 420, 420)}
                width={420}
                height={420}
                loading="lazy"
                decoding="async"
                alt="Scissor work on the top of a natural haircut."
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
