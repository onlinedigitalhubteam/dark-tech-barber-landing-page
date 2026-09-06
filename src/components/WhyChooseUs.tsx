import { MapPin, ScanFace, Sparkles, UserRound } from "lucide-react";
import { benefits } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Hi } from "@/components/ui/SectionHeading";
import { cn } from "@/utils/cn";

const iconMap = {
  target: ScanFace,
  sparkle: Sparkles,
  user: UserRound,
  pin: MapPin,
} as const;

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="relative border-y border-white/8 bg-surface/30 py-18 sm:py-22 lg:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Apex"
          title={
            <>
              More Than Just a <Hi>Haircut.</Hi>
            </>
          }
          text="Four reasons men in Batoke and Limbe keep coming back — and keep sending their friends."
          id="why-heading"
        />

        <ul className="mt-11 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <Reveal
                as="li"
                key={benefit.id}
                delay={index * 80}
                className={cn(
                    "group relative h-full overflow-hidden rounded-[12px] border border-white/8 bg-canvas p-5 transition-all duration-200",
                    "hover:-translate-y-1 hover:border-accent/40",
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 h-full w-[2px] scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
                  />
                  <div className="flex items-center justify-between">
                    <Icon size={20} strokeWidth={1.7} aria-hidden className="text-accent" />
                    <span className="num text-[1.6rem] leading-none font-bold text-white/8 transition-colors duration-300 group-hover:text-accent/25">
                      {benefit.index}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.08rem] font-bold text-ink">{benefit.title}</h3>
                  <p className="mt-1 text-[0.8rem] font-semibold tracking-[0.06em] text-accent/85">
                    {benefit.line}
                  </p>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">{benefit.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
