import { useMemo, useState } from "react";
import { Maximize2 } from "lucide-react";
import {
  galleryCategories,
  galleryImages,
  gallerySrc,
  gallerySrcSet,
  type GalleryCategory,
} from "@/data/gallery";
import { track } from "@/utils/analytics";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Hi } from "@/components/ui/SectionHeading";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { cn } from "@/utils/cn";

type Filter = "All" | GalleryCategory;

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "All" ? galleryImages : galleryImages.filter((i) => i.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", galleryImages.length]]);
    galleryImages.forEach((img) => map.set(img.category, (map.get(img.category) ?? 0) + 1));
    return map;
  }, []);

  return (
    <section id="gallery" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Work"
          title={
            <>
              Fresh Cuts. <Hi>Real Results.</Hi>
            </>
          }
          text="See the details that make a clean haircut stand out — the blend, the edges, the beard line and the finish."
        />

        {/* Filter tabs */}
        <Reveal delay={80}>
          <div
            role="tablist"
            aria-label="Filter gallery by style"
            className="rail mt-9 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible"
          >
            {galleryCategories.map((category) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => {
                    setFilter(category);
                    setOpenIndex(null);
                  }}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition-all duration-200",
                    isActive
                      ? "border-accent/60 bg-accent/12 text-ink shadow-[0_0_0_3px_rgba(255,85,0,0.08)]"
                      : "border-white/8 bg-surface text-muted hover:border-accent/40 hover:text-ink",
                  )}
                >
                  {category}
                  <span className="num ml-2 text-[0.68rem] text-muted/60">
                    {counts.get(category) ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Masonry */}
        <div
          key={filter}
          className="mt-6 animate-rise columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          {items.map((image, index) => (
            <button
              type="button"
              key={image.id}
              onClick={() => {
                track("gallery_open", { image: image.id, category: image.category });
                setOpenIndex(index);
              }}
              className="group relative mb-4 block w-full overflow-hidden rounded-[12px] border border-white/8 bg-surface text-left transition-all duration-200 hover:border-accent/45 hover:shadow-[0_20px_44px_-26px_rgba(255,85,0,0.6)]"
            >
              <img
                src={gallerySrc(image.pexelsId, image.ratio)}
                srcSet={gallerySrcSet(image.pexelsId, image.ratio)}
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                width={image.ratio === "portrait" ? 700 : 900}
                height={image.ratio === "portrait" ? 980 : image.ratio === "square" ? 760 : 620}
                loading="lazy"
                decoding="async"
                alt={`${image.alt}. Development placeholder image.`}
                className={cn(
                  "w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]",
                  image.ratio === "portrait" && "aspect-3/4",
                  image.ratio === "square" && "aspect-square",
                  image.ratio === "landscape" && "aspect-3/2",
                )}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent opacity-80 transition-opacity duration-200 group-hover:opacity-95"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <span>
                  <span className="block text-[0.66rem] font-semibold tracking-[0.2em] text-accent uppercase">
                    {image.category}
                  </span>
                  <span className="mt-1 block text-[0.92rem] font-semibold text-ink">
                    {image.title}
                  </span>
                </span>
                <span className="inline-flex h-9 w-9 shrink-0 translate-y-1 items-center justify-center rounded-full border border-accent/45 bg-canvas/80 text-accent opacity-0 backdrop-blur transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                  <Maximize2 size={15} aria-hidden />
                </span>
              </span>
              <span className="sr-only">Open image in a larger view</span>
            </button>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 max-w-2xl text-[0.78rem] leading-relaxed text-muted/65">
            Portfolio note: these are licensed placeholder images used while the studio shoot is
            being prepared. Before launch they are replaced with real photographs taken at Apex
            Fade Barber Studio.
          </p>
        </Reveal>
      </div>

      <GalleryLightbox
        images={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(next) => {
          const bounded = (next + items.length) % items.length;
          setOpenIndex(bounded);
          track("gallery_open", { image: items[bounded]?.id, navigation: true });
        }}
      />
    </section>
  );
}
