import { Mail, MapPin, Phone } from "lucide-react";
import {
  activeSocials,
  businessConfig,
  DEFAULT_BOOKING_MESSAGE,
  mailHref,
  telHref,
} from "@/data/businessConfig";
import { navLinks } from "@/data/content";
import { hoursLabel } from "@/utils/businessHours";
import { DAY_ORDER } from "@/data/businessConfig";
import { track } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { BrandMark, FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "@/components/ui/Icons";

const socialIcon: Record<string, typeof FaInstagram> = {
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  Facebook: FaFacebookF,
};

export function Footer() {
  const year = new Date().getFullYear();

  const jump = (id: string) => {
    track("nav_click", { target: id, source: "footer" });
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 78, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/8 bg-canvas-deep">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_0.9fr_0.9fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <BrandMark />
              <span>
                <span className="block font-display text-[1.05rem] font-bold text-ink">
                  {businessConfig.name}
                </span>
                <span className="text-[0.66rem] font-semibold tracking-[0.3em] text-muted/70 uppercase">
                  Batoke · Limbe
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-muted">
              Professional barbering and men's grooming in Batoke, Limbe, Cameroon. Fades, tapers,
              classic cuts, kids' cuts and beard work — finished with precision.
            </p>
            <p className="mt-5 font-display text-[0.95rem] font-bold tracking-[0.02em] text-accent">
              {businessConfig.tagline}
            </p>
            <button
              type="button"
              onClick={() => {
                track("whatsapp_click", { source: "footer" });
                openWhatsApp(DEFAULT_BOOKING_MESSAGE);
              }}
              className="btn btn-primary mt-6"
            >
              <FaWhatsapp size={15} aria-hidden />
              Book your haircut
            </button>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-[0.7rem] font-bold tracking-[0.22em] text-ink uppercase">Explore</h2>
            <ul className="mt-4 grid list-none gap-2.5 p-0">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      jump(link.id);
                    }}
                    className="link-underline inline-block text-[0.9rem] text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    jump("booking");
                  }}
                  className="link-underline inline-block text-[0.9rem] font-semibold text-accent transition-colors hover:text-accent-bright"
                >
                  Book on WhatsApp
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[0.7rem] font-bold tracking-[0.22em] text-ink uppercase">Contact</h2>
            <ul className="mt-4 grid list-none gap-3 p-0 text-[0.9rem]">
              <li>
                <a
                  href={telHref}
                  onClick={() => track("phone_click", { source: "footer" })}
                  className="flex items-start gap-2.5 text-muted transition-colors hover:text-ink"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span className="num">{businessConfig.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={mailHref}
                  className="flex items-start gap-2.5 text-muted transition-colors hover:text-ink"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  {businessConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                {businessConfig.address}
              </li>
            </ul>

            {activeSocials.length > 0 ? (
              <ul className="mt-5 flex list-none gap-2 p-0">
                {activeSocials.map((profile) => {
                  const Icon = socialIcon[profile.label] ?? FaInstagram;
                  return (
                    <li key={profile.label}>
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("social_click", { network: profile.label, source: "footer" })}
                        aria-label={`${businessConfig.name} on ${profile.label} (${profile.handle})`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/8 bg-surface text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                      >
                        <Icon size={15} aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-5 text-[0.8rem] text-muted/60">
                Social profiles launch soon — add the links in{" "}
                <code>businessConfig.social</code> to show them here.
              </p>
            )}
          </div>

          {/* Hours */}
          <div>
            <h2 className="text-[0.7rem] font-bold tracking-[0.22em] text-ink uppercase">Hours</h2>
            <dl className="mt-4 grid gap-1.5 p-0 text-[0.85rem]">
              {DAY_ORDER.map((day) => (
                <div key={day.key} className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted">{day.label}</dt>
                  <dd className="num text-muted/85">{hoursLabel(day.key)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[0.72rem] tracking-[0.12em] text-muted/55 uppercase">
              Timezone · {businessConfig.timezone}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.78rem] text-muted/70">
            © {year} {businessConfig.name}. All rights reserved.
          </p>
          <p className="text-[0.78rem] text-muted/60">
            {businessConfig.category} · {businessConfig.location} · {businessConfig.websiteDisplay}
          </p>
        </div>
      </div>
    </footer>
  );
}
