import type { ServiceIconKey } from "@/data/services";

export interface TrustItem {
  id: string;
  stat: string;
  label: string;
  description: string;
  icon: ServiceIconKey | "pin" | "shield";
}

export const trustItems: TrustItem[] = [
  {
    id: "experience",
    stat: "8+ Years",
    label: "Experience",
    description: "Professional barbering experience.",
    icon: "shield",
  },
  {
    id: "finish",
    stat: "Clean Finish",
    label: "Detail first",
    description: "Attention to detail from start to finish.",
    icon: "classic",
  },
  {
    id: "styles",
    stat: "Modern Styles",
    label: "Fades & tapers",
    description: "Fades, tapers, classics and more.",
    icon: "high",
  },
  {
    id: "location",
    stat: "Batoke, Limbe",
    label: "Local studio",
    description: "Professional grooming close to you.",
    icon: "pin",
  },
];

export interface Benefit {
  id: string;
  index: string;
  title: string;
  line: string;
  body: string;
  icon: "target" | "sparkle" | "user" | "pin";
}

export const benefits: Benefit[] = [
  {
    id: "precision",
    index: "01",
    title: "Precision",
    line: "Every detail matters.",
    body: "Guard sizes, blend lines and the hairline are checked before you leave the chair.",
    icon: "target",
  },
  {
    id: "clean-finish",
    index: "02",
    title: "Clean Finish",
    line: "Sharp lines, careful cuts.",
    body: "Neck, ears and edges finished properly — no stray hairs walking out of the shop.",
    icon: "sparkle",
  },
  {
    id: "personal-style",
    index: "03",
    title: "Personal Style",
    line: "A cut that fits you.",
    body: "Your haircut should fit your face, your style and how much upkeep you want.",
    icon: "user",
  },
  {
    id: "local",
    index: "04",
    title: "Local Convenience",
    line: "Right here in Batoke.",
    body: "Professional grooming on Main Road — no trip into town, no long wait.",
    icon: "pin",
  },
];

export const specialties: string[] = [
  "Fades",
  "Tapers",
  "Classic cuts",
  "Beard shaping",
  "Hairline detailing",
  "Men's grooming",
];

export const navLinks: { id: string; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "location", label: "Contact" },
];

export const seoKeywords: string[] = [
  "barber in Batoke",
  "barber shop Limbe",
  "fade haircut Limbe",
  "men's grooming Limbe",
];
