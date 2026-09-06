import { Copy, ExternalLink, Mail, MapPin, Navigation, Phone } from "lucide-react";
import {
  businessConfig,
  DEFAULT_BOOKING_MESSAGE,
  directionsUrl,
  mailHref,
  telHref,
} from "@/data/businessConfig";
import { track } from "@/utils/analytics";
import { openWhatsApp } from "@/utils/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Hi } from "@/components/ui/SectionHeading";
import { OpeningHours } from "@/components/OpeningHours";
import { FaWhatsapp } from "@/components/ui/Icons";

const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${businessConfig.name}, ${businessConfig.address}`,
)}&z=15&output=embed`;

const rows = [
  {
    key: "address",
    icon: MapPin,
    label: "Address",
    value: businessConfig.address,
  },
  { key: "phone", icon: Phone, label: "Phone", value: businessConfig.phoneDisplay, href: telHref },
  {
    key: "email",
    icon: Mail,
    label: "Email",
    value: businessConfig.email,
    href: mailHref,
  },
];

export function Location() {
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(businessConfig.address);
      const btn = document.getElementById("copy-address-label");
      if (btn) btn.textContent = "Copied ✓";
      window.setTimeout(() => {
        if (btn) btn.textContent = "Copy address";
      }, 2000);
    } catch {
      /* clipboard blocked — the visible address is still selectable */
    }
  };

  return (
    <section id="location" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="Location"
          title={
            <>
              Find Us in <Hi>Batoke.</Hi>
            </>
          }
          text="We're located along Batoke Main Road, near the Batoke Market Area in Limbe — easy to reach from Buea Road, Molyko and the port side of town."
        />

        <div className="mt-11 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="flex flex-col gap-5">
            <div className="card overflow-hidden">
              <div className="relative border-b border-white/8">
                <iframe
                  title={`Map showing the area around ${businessConfig.addressShort}`}
                  src={mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[240px] w-full border-0 opacity-90 contrast-[1.15] saturate-[0.35] sm:h-[280px]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/85 via-transparent to-canvas/25"
                />
                <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-canvas/90 px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.12em] text-ink uppercase backdrop-blur">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {businessConfig.areaName}
                </span>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-[1.2fr_0.8fr] sm:p-6">
                <div>
                  <ul className="grid list-none gap-4 p-0 m-0">
                    {rows.map((row) => (
                      <li key={row.key} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-accent/30 bg-accent/10 text-accent">
                          <row.icon size={15} strokeWidth={1.9} aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[0.66rem] font-semibold tracking-[0.2em] text-muted/65 uppercase">
                            {row.label}
                          </p>
                          {row.href ? (
                            <a
                              href={row.href}
                              onClick={() =>
                                row.key === "phone"
                                  ? track("phone_click", { source: "location_card" })
                                  : track("whatsapp_click", {
                                      source: "location_card",
                                      field: row.key,
                                    })
                              }
                              className="text-[0.92rem] font-medium text-ink transition-colors hover:text-accent"
                            >
                              {row.value}
                            </a>
                          ) : (
                            <p className="text-[0.92rem] leading-snug text-ink">{row.value}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={copyAddress}
                    className="btn btn-ghost mt-5 py-2 text-[0.78rem]"
                  >
                    <Copy size={14} aria-hidden className="text-accent" />
                    <span id="copy-address-label">Copy address</span>
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  <a
                    href={directionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("directions_click", { source: "location_card" })}
                    className="btn btn-primary"
                  >
                    <Navigation size={15} aria-hidden />
                    Get directions
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      track("whatsapp_click", { source: "location_card" });
                      openWhatsApp(DEFAULT_BOOKING_MESSAGE);
                    }}
                    className="btn btn-secondary"
                  >
                    <FaWhatsapp size={15} aria-hidden />
                    Message us
                  </button>
                  <p className="mt-1 text-[0.72rem] leading-snug text-muted/65">
                    Maps link is configurable in{" "}
                    <code className="text-muted">businessConfig.mapsUrl</code> — until then it opens
                    a Google Maps search for the shop address.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-5">
              <OpeningHours />
              <a
                href={telHref}
                onClick={() => track("phone_click", { source: "location_call_panel" })}
                className="group relative overflow-hidden rounded-[12px] border border-white/8 bg-gradient-to-br from-surface to-canvas p-5 transition-all duration-200 hover:border-accent/45"
              >
                <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-accent uppercase">
                  In a hurry?
                </p>
                <p className="num mt-2 text-[1.5rem] font-bold text-ink sm:text-[1.7rem]">
                  {businessConfig.phoneDisplay}
                </p>
                <p className="mt-1.5 text-[0.84rem] text-muted">
                  Call the shop directly — if the chair is free, we'll take you now.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-ink">
                  Tap to call
                  <ExternalLink size={13} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
