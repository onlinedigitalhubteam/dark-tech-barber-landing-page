import { Quote } from "lucide-react";
import { testimonials, testimonialsDisclaimer } from "@/data/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Hi } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section aria-labelledby="reviews-heading" className="relative py-18 sm:py-22 lg:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="Customer Feedback"
          title={
            <>
              The Cut Speaks <Hi>for Itself.</Hi>
            </>
          }
          text="What customers say after the cape comes off."
          id="reviews-heading"
        />

        <ul className="mt-11 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
          {testimonials.map((review, index) => (
            <Reveal
              as="li"
              key={review.id}
              delay={index * 90}
              className="group relative flex h-full flex-col rounded-[12px] border border-white/8 bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-28px_rgba(255,85,0,0.6)]"
            >
                <Quote aria-hidden className="text-accent/60 transition-colors group-hover:text-accent" size={22} />
                <p className="mt-4 text-[1rem] leading-relaxed text-ink/95">“{review.quote}”</p>
                <div className="mt-auto pt-6">
                  <p className="text-[0.85rem] font-semibold text-ink">{review.author}</p>
                  <p className="mt-1 flex items-center gap-2 text-[0.74rem] text-muted/75">
                    <span className="rounded-full border border-white/8 px-2 py-0.5 text-[0.66rem] font-semibold tracking-[0.1em] text-accent/90 uppercase">
                      {review.service}
                    </span>
                  </p>
                </div>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-6 flex items-start gap-2.5 rounded-[12px] border border-dashed border-white/12 bg-surface/40 px-4 py-3 text-[0.78rem] leading-relaxed text-muted/80">
            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
            {testimonialsDisclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
