export type ServiceIconKey =
  | "classic"
  | "low"
  | "mid"
  | "high"
  | "taper"
  | "kids"
  | "beard"
  | "combo";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  duration: string;
  icon: ServiceIconKey;
  cta: string;
  includes: string[];
  wide?: boolean;
}

const fcfa = (n: number) => `${n.toLocaleString("en-US")} FCFA`;

export const services: Service[] = [
  {
    id: "classic-haircut",
    name: "Classic Haircut",
    description: "Clean, timeless and professionally finished.",
    price: 2000,
    priceLabel: fcfa(2000),
    duration: "30–40 min",
    icon: "classic",
    cta: "Book this cut",
    includes: ["Consultation", "Scissor & clipper work", "Neck clean-up", "Finish"],
    wide: true,
  },
  {
    id: "low-fade",
    name: "Low Fade",
    description: "A smooth low fade for a clean and understated modern look.",
    price: 2500,
    priceLabel: fcfa(2500),
    duration: "40 min",
    icon: "low",
    cta: "Book this cut",
    includes: ["Tight blended taper", "Defined hairline", "Styled finish"],
  },
  {
    id: "mid-fade",
    name: "Mid Fade",
    description: "A balanced fade that gives your haircut a sharper modern finish.",
    price: 2500,
    priceLabel: fcfa(2500),
    duration: "40–45 min",
    icon: "mid",
    cta: "Book this cut",
    includes: ["Mid-height blend", "Hard part optional", "Line-up", "Product finish"],
  },
  {
    id: "high-fade",
    name: "High Fade",
    description: "A bold, clean fade for a stronger modern appearance.",
    price: 2500,
    priceLabel: fcfa(2500),
    duration: "45 min",
    icon: "high",
    cta: "Book this cut",
    includes: ["High skin-tight blend", "Crisp edges", "Detail pass"],
  },
  {
    id: "taper-fade",
    name: "Taper Fade",
    description: "A refined taper around the sides and neckline for a polished finish.",
    price: 2500,
    priceLabel: fcfa(2500),
    duration: "35–40 min",
    icon: "taper",
    cta: "Book this cut",
    includes: ["Temple & neckline taper", "Length kept on top", "Sharp neck shave"],
  },
  {
    id: "kids-haircut",
    name: "Kids Haircut",
    description: "Clean and stylish haircuts for younger customers.",
    price: 1500,
    priceLabel: fcfa(1500),
    duration: "25–30 min",
    icon: "kids",
    cta: "Book this cut",
    includes: ["Patient chair time", "Parent-approved style", "No stress, no rush"],
  },
  {
    id: "beard-trim",
    name: "Beard Trim & Shape",
    description: "Professional beard trimming and shaping for a sharper appearance.",
    price: 1500,
    priceLabel: fcfa(1500),
    duration: "20–25 min",
    icon: "beard",
    cta: "Book this service",
    includes: ["Outline & cheek line", "Length shaping", "Hot towel", "Oil finish"],
  },
  {
    id: "haircut-beard",
    name: "Haircut + Beard",
    description: "Complete haircut and beard grooming combination.",
    price: 3500,
    priceLabel: fcfa(3500),
    duration: "60 min",
    icon: "combo",
    cta: "Book this combo",
    includes: ["Full haircut", "Beard shape & trim", "Matching edges", "Final styling"],
  },
];

export const signaturePackage: Service = {
  id: "apex-experience",
  name: "The Apex Experience",
  description:
    "The complete grooming session for customers who want to leave looking fully refreshed.",
  price: 4000,
  priceLabel: fcfa(4000),
  duration: "60–75 min",
  icon: "combo",
  cta: "Book the Apex Experience",
  includes: [
    "Precision haircut of your choice",
    "Full beard trim, shape and outline",
    "Hairline and edge detailing",
    "Hot towel finish and final styling",
  ],
};

export const bookingServiceOptions: string[] = [
  ...services.map((s) => s.name),
  signaturePackage.name,
];

/** Prices used by the marquee strip under the hero. */
export const tickerItems: string[] = [
  ...services.map((s) => `${s.name} · ${s.priceLabel}`),
  `The Apex Experience · ${signaturePackage.priceLabel}`,
];
