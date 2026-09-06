export type GalleryCategory = "Fades" | "Tapers" | "Classic" | "Beard" | "Kids";

export interface GalleryImage {
  id: string;
  /** Pexels photo id — swapped for real shop photos at launch. */
  pexelsId: number;
  title: string;
  alt: string;
  category: GalleryCategory;
  /** Drives the masonry rhythm. */
  ratio: "portrait" | "landscape" | "square";
}

export const galleryCategories: ("All" | GalleryCategory)[] = [
  "All",
  "Fades",
  "Tapers",
  "Classic",
  "Beard",
  "Kids",
];

/**
 * DEV/DEMO IMAGES ONLY.
 * These are licensed stock placeholders (Pexels) used to show layout and
 * craft. Before publishing, replace the ids with real photographs taken in
 * the shop — do not present these as actual customer work.
 */
export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    pexelsId: 18503633,
    title: "Clipper work, mid blend",
    alt: "Close-up of clippers blending the side of a men's haircut",
    category: "Fades",
    ratio: "landscape",
  },
  {
    id: "g2",
    pexelsId: 12304510,
    title: "Tight taper, dry finish",
    alt: "Barber holding a razor finishing a tapered haircut in a barber shop",
    category: "Tapers",
    ratio: "portrait",
  },
  {
    id: "g3",
    pexelsId: 7447150,
    title: "Scissor work on natural hair",
    alt: "Barber trimming an afro-textured haircut with scissors and comb",
    category: "Classic",
    ratio: "square",
  },
  {
    id: "g4",
    pexelsId: 3998412,
    title: "Beard outline and cheek line",
    alt: "Barber shaping a bearded customer's moustache and beard line with scissors",
    category: "Beard",
    ratio: "portrait",
  },
  {
    id: "g5",
    pexelsId: 33461079,
    title: "Low fade, clean fall",
    alt: "Barber using clippers and a comb to trim the side of a client's hair",
    category: "Fades",
    ratio: "portrait",
  },
  {
    id: "g6",
    pexelsId: 7697385,
    title: "First school-day cut",
    alt: "Young boy sitting in the barber chair receiving a haircut",
    category: "Kids",
    ratio: "landscape",
  },
  {
    id: "g7",
    pexelsId: 12464840,
    title: "Temple edge, razor finish",
    alt: "Close-up of a razor cleaning the temple and hairline of a haircut",
    category: "Tapers",
    ratio: "landscape",
  },
  {
    id: "g8",
    pexelsId: 5853394,
    title: "Beard length shaping",
    alt: "Hands of a barber trimming a man's beard with scissors and a comb",
    category: "Beard",
    ratio: "landscape",
  },
  {
    id: "g9",
    pexelsId: 7447152,
    title: "Classic taper, scissor top",
    alt: "Barber cutting the top of a man's hair with scissors and a comb",
    category: "Classic",
    ratio: "landscape",
  },
  {
    id: "g10",
    pexelsId: 11333875,
    title: "High fade detail pass",
    alt: "Black and white close-up of clippers cutting a high fade",
    category: "Fades",
    ratio: "portrait",
  },
  {
    id: "g11",
    pexelsId: 7697718,
    title: "Mirror check",
    alt: "Young boy in a barber chair looking at his new haircut in a hand mirror",
    category: "Kids",
    ratio: "landscape",
  },
  {
    id: "g12",
    pexelsId: 3998414,
    title: "Full groom session",
    alt: "Bearded customer receiving precision grooming in a modern barbershop",
    category: "Classic",
    ratio: "portrait",
  },
];

const sizeFor = (ratio: GalleryImage["ratio"]) => {
  switch (ratio) {
    case "portrait":
      return { w: 700, h: 980 };
    case "square":
      return { w: 760, h: 760 };
    default:
      return { w: 900, h: 620 };
  }
};

export function gallerySrc(id: number, ratio: GalleryImage["ratio"], width?: number): string {
  const { w, h } = sizeFor(ratio);
  const target = width ?? w;
  const height = Math.round((target * h) / w);
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${target}&h=${height}`;
}

export function gallerySrcSet(id: number, ratio: GalleryImage["ratio"]): string {
  const { w } = sizeFor(ratio);
  return [w, Math.round(w * 1.6)].map((width) => `${gallerySrc(id, ratio, width)} ${width}w`).join(", ");
}

export const heroImage = (width: number, height: number): string =>
  `https://images.pexels.com/photos/7447138/pexels-photo-7447138.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${height}`;

export const photoUrl = (id: number, width: number, height: number): string =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${height}`;
