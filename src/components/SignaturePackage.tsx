import { ArrowRight, Check, Clock } from "lucide-react";
import { businessConfig } from "@/data/businessConfig";
import { signaturePackage } from "@/data/services";
import { photoUrl } from "@/data/gallery";
import { track } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { FaWhatsapp } from "@/components/ui/Icons";

export function SignaturePackage() {
  const book = () => {
    track("signature_package_click", { service: signaturePackage.name });
    openWhatsApp(
      `Hello Apex Fade Barber Studio 👋\n\nI'd like to book: ${signaturePackage.name} (${signaturePackage.priceLabel}) — haircut + beard trim + final styling.\n\nPreferred day/time: \n\nThank you.`,
    );
  };

  return (
    <section aria-labelledby="signature-title" className="relative py-6 sm:py-8">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <div className="relative rounded-[14px] bg-gradient-to-br from-accent/65 via-white/8 to-white/5 p-px shadow-[0_30px_80px_-50px_rgba(255,85,0,0.7)]">
            <div className="relative grid overflow-hidden rounded-[13px] bg-surface lg:grid-cols-[1.25fr_0.75fr]">
              <div
                aria-hidden
                className="absolute inset-0 grid-texture opacity-40 [mask-image:linear-gradient(to_right,#000,transparent_70%)]"
              />

              <div className="relative p-6 sm:p-9">
                <p className="eyebrow flex items-center gap-2.5">
                  <span aria-hidden className="inline-flex h-5 items-center rounded-full bg-accent px-2 text-[0.62rem] font-bold tracking-[0.18em] text-black uppercase">
                    Signature
                  </span>
                  Package
                </p>

                <h2
                  id="signature-title"
                  className="mt-4 text-[1.85rem] leading-tight font-bold text-ink sm:text-[2.4rem]"
                >
                  The <span className="text-accent">Apex</span> Experience
                </h2>

                <p className="mt-3 max-w-lg text-[0.97rem] leading-relaxed text-muted">
                  {signaturePackage.description}
                </p>

                <ul className="mt-6 grid gap-2.5 p-0 list-none sm:grid-cols-2">
                  {signaturePackage.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.89rem] text-muted">
                      <span className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-accent/45 bg-accent/12 text-accent">
                        <Check size={11} strokeWidth={3} aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-muted/70 uppercase">
                      Full session price
                    </p>
                    <p className="num mt-1 text-[2.1rem] leading-none font-bold text-ink sm:text-[2.5rem]">
                      {signaturePackage.priceLabel}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-muted/80">
                      <Clock size={13} aria-hidden className="text-accent" />
                      {signaturePackage.duration} · Haircut + Beard Trim + Final Styling
                    </p>
                  </div>

                  <button type="button" onClick={book} className="btn btn-primary group px-5 py-3.5">
                    <FaWhatsapp size={17} aria-hidden />
                    Book the Apex Experience
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>

              <div className="relative min-h-[220px] overflow-hidden border-t border-white/8 lg:min-h-full lg:border-t-0 lg:border-l">
                <img
                  src={photoUrl(7697679, 800, 1000)}
                  srcSet={`${photoUrl(7697679, 520, 650)} 520w, ${photoUrl(7697679, 800, 1000)} 800w`}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  alt="Barber trimming a customer's beard with scissors during a full grooming session."
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-[0.74rem] leading-snug text-muted">
                  Photo used for layout — swap in a real shot from the shop at{" "}
                  {businessConfig.areaName}.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
