import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { businessConfig, DEFAULT_BOOKING_MESSAGE, telHref } from "@/data/businessConfig";
import { navLinks } from "@/data/content";
import { useActiveSection, useBodyLock, useEscapeKey, useScrolled } from "@/hooks";
import { track } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { BrandMark, FaWhatsapp } from "@/components/ui/Icons";
import { StatusPill } from "@/components/ui/StatusPill";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(14);
  const active = useActiveSection(navLinks.map((l) => l.id));
  const headerRef = useRef<HTMLElement | null>(null);

  useBodyLock(open);
  useEscapeKey(open, useCallback(() => setOpen(false), []));

  // Close when the user taps/clicks outside the header.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Auto-close the drawer if the viewport grows to desktop.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const go = (id: string) => {
    track("nav_click", { target: id });
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const book = (source: string) => {
    track("whatsapp_click", { source });
    openWhatsApp(DEFAULT_BOOKING_MESSAGE);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-white/8 bg-canvas/90 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300",
            scrolled ? "h-16" : "h-[72px] sm:h-20",
          )}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            className="group flex items-center gap-3"
          >
            <BrandMark className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="leading-none">
              <span className="block font-display text-[0.95rem] font-bold tracking-[0.02em] text-ink">
                Apex Fade
              </span>
              <span className="mt-[3px] block text-[9.5px] font-semibold tracking-[0.32em] text-muted/80 uppercase">
                Barber Studio
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.id);
                  }}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-[0.84rem] font-semibold transition-colors duration-200",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={telHref}
              onClick={() => track("phone_click", { source: "navbar" })}
              className="btn btn-ghost border-white/12 px-3.5 py-2.5 text-[0.8rem] tabular-nums"
            >
              <Phone size={14} strokeWidth={2} className="text-accent" />
              {businessConfig.phoneDisplay}
            </a>
            <button type="button" onClick={() => book("navbar")} className="btn btn-primary py-2.5">
              <FaWhatsapp size={15} aria-hidden />
              Book Now
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => book("navbar_mobile_compact")}
              className="btn btn-primary px-3 py-2 text-[0.75rem]"
            >
              Book
            </button>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/12 bg-surface text-ink transition-colors hover:border-accent/50"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-white/8 bg-canvas/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          open ? "max-h-[26rem] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-[1240px] px-4 py-4 sm:px-6">
          <ul className="divide-y divide-white/8">
            {navLinks.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.id);
                  }}
                  className="flex items-center justify-between py-3.5 text-[0.98rem] font-semibold text-ink"
                >
                  <span className="flex items-center gap-3">
                    <span className="num text-[0.7rem] text-accent/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </span>
                  <span aria-hidden className="text-muted/60">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <StatusPill className="mt-4" size="sm" />

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <a
              href={telHref}
              onClick={() => track("phone_click", { source: "mobile_menu" })}
              className="btn btn-secondary"
            >
              <Phone size={15} className="text-accent" /> Call now
            </a>
            <button type="button" onClick={() => book("mobile_menu")} className="btn btn-primary">
              <FaWhatsapp size={15} /> WhatsApp
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
