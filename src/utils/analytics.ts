/**
 * Analytics-ready event layer.
 *
 * No tracking script is installed (no credentials were provided). Wire this to
 * GA4 / Meta Pixel / Plausible by implementing `window.apexTrack` before the
 * app boots, and every CTA on the page reports to it automatically.
 */
export type TrackEvent =
  | "hero_book_click"
  | "service_book_click"
  | "signature_package_click"
  | "whatsapp_click"
  | "phone_click"
  | "gallery_open"
  | "booking_form_submit"
  | "directions_click"
  | "social_click"
  | "nav_click"
  | "cta_book_click";

declare global {
  interface Window {
    apexTrack?: (event: string, payload: Record<string, unknown>) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const DEBUG = false;

export function track(event: TrackEvent, payload: Record<string, unknown> = {}) {
  const detail = { event, ...payload, ts: Date.now() };

  if (typeof window === "undefined") return;

  try {
    if (typeof window.apexTrack === "function") {
      window.apexTrack(event, payload);
      return;
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ ...detail, event: "apex_event" });
      return;
    }
    // Set to true while wiring up a provider to preview event names/payloads.
    if (DEBUG) console.info("[apex:track]", event, payload);
  } catch {
    /* analytics must never break a booking */
  }
}

export function trackAndRun(event: TrackEvent, payload: Record<string, unknown>, run: () => void) {
  track(event, payload);
  run();
}
