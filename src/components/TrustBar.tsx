import { MapPin, ShieldCheck } from "lucide-react";
import { trustItems } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { serviceIcons } from "@/components/ui/Icons";
import type { ServiceIconKey } from "@/data/services";

const extraIcons = { pin: MapPin, shield: ShieldCheck };

export function TrustBar() {
  return (
    <section aria-label="Why customers trust Apex Fade Barber Studio" className="relative">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-white/8 bg-white/8 lg:grid-cols-4">
          {trustItems.map((item, i) => {
            const Icon =
              item.icon in extraIcons
                ? extraIcons[item.icon as "pin" | "shield"]
                : serviceIcons[item.icon as ServiceIconKey];
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={i * 70}
                className="group flex h-full items-start gap-3 bg-canvas p-5 transition-colors duration-200 hover:bg-surface/60 sm:p-6"
              >
                  <span className="mt-0.5 text-accent transition-transform duration-200 group-hover:-translate-y-0.5">
                    <Icon size={19} strokeWidth={1.7} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[0.98rem] leading-tight font-bold text-ink">
                      {item.stat}
                    </p>
                    <p className="mt-1.5 text-[0.82rem] leading-snug text-muted">{item.description}</p>
                  </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
