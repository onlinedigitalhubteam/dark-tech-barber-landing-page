/**
 * Single source of truth for every piece of business information.
 * Change it here and the whole landing page (copy, links, schema, hours,
 * booking messages) updates.
 */

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface SocialProfile {
  label: string;
  handle: string;
  /** Leave empty to hide the platform entirely at launch. */
  url: string;
}

export const businessConfig = {
  name: "Apex Fade Barber Studio",
  owner: "Marcus Tanyi",
  role: "Founder & Lead Barber",
  category: "Barber Shop & Men's Grooming",
  tagline: "Sharp Cuts. Strong Presence.",
  taglineSecondary: "Your fresh look starts here.",
  promise:
    "Every cut is finished with precision, detail and your personal style in mind.",
  experienceYears: 8,

  location: "Batoke, Limbe, Southwest Region, Cameroon",
  areaName: "Batoke, Limbe",
  address:
    "Batoke Main Road, near the Batoke Market Area, Limbe, Southwest Region, Cameroon",
  addressShort: "Batoke Main Road, near Batoke Market Area, Limbe",

  phone: "+237677482915",
  phoneDisplay: "+237 677 482 915",
  whatsapp: "+237677482915",
  email: "hello@apexfadebarber.com",
  website: "https://apexfadebarber.com",
  websiteDisplay: "apexfadebarber.com",

  timezone: "Africa/Douala",
  currency: "FCFA",
  priceFrom: 1500,

  /**
   * Leave empty to auto-build a safe Google Maps search link from the address.
   * Replace with a real /maps/place/... URL once the shop listing is claimed.
   * Never invent GPS coordinates here.
   */
  mapsUrl: "",
  mapsQueryLabel: "Apex Fade Barber Studio, Batoke Main Road, Limbe",

  social: {
    // Set url to "" to hide a platform that isn't live yet.
    instagram: {
      label: "Instagram",
      handle: "@apexfadebarber",
      url: "https://www.instagram.com/apexfadebarber",
    } as SocialProfile,
    tiktok: {
      label: "TikTok",
      handle: "@apexfadebarber",
      url: "https://www.tiktok.com/@apexfadebarber",
    } as SocialProfile,
    facebook: {
      label: "Facebook",
      handle: "Apex Fade Barber Studio",
      url: "",
    } as SocialProfile,
  },

  hours: {
    monday: ["08:00", "19:00"],
    tuesday: ["08:00", "19:00"],
    wednesday: ["08:00", "19:00"],
    thursday: ["08:00", "19:00"],
    friday: ["08:00", "20:00"],
    saturday: ["07:30", "20:00"],
    sunday: ["10:00", "17:00"],
  } satisfies Record<DayKey, [string, string]>,
} as const;

export const DAY_ORDER: { key: DayKey; label: string; short: string }[] = [
  { key: "monday", label: "Monday", short: "Mon" },
  { key: "tuesday", label: "Tuesday", short: "Tue" },
  { key: "wednesday", label: "Wednesday", short: "Wed" },
  { key: "thursday", label: "Thursday", short: "Thu" },
  { key: "friday", label: "Friday", short: "Fri" },
  { key: "saturday", label: "Saturday", short: "Sat" },
  { key: "sunday", label: "Sunday", short: "Sun" },
];

export const DEFAULT_BOOKING_MESSAGE =
  "Hello Apex Fade Barber Studio 👋 I'd like to book a haircut.";

/** Google Maps recommended link format — no fabricated coordinates. */
export function directionsUrl(): string {
  if (businessConfig.mapsUrl.trim()) return businessConfig.mapsUrl.trim();
  const query = `${businessConfig.name}, ${businessConfig.address}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const telHref = `tel:${businessConfig.phone.replace(/\s/g, "")}`;
export const mailHref = `mailto:${businessConfig.email}`;
export const waNumber = businessConfig.whatsapp.replace(/\D/g, "");

export const activeSocials: SocialProfile[] = Object.values(businessConfig.social)
  .filter((s) => s.url.trim().length > 0)
  .sort((a, b) => a.label.localeCompare(b.label));
