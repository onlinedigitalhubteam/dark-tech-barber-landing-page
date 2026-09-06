import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallerySrc, type GalleryImage } from "@/data/gallery";
import { useBodyLock, useEscapeKey } from "@/hooks";

interface GalleryLightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

/**
 * Dependency-free lightbox: focus handling, arrow keys, Escape, backdrop
 * click and accessible labels.
 */
export function GalleryLightbox({ images, index, onClose, onNavigate }: GalleryLightboxProps) {
  const isOpen = index !== null && index >= 0 && images.length > 0;
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  useBodyLock(isOpen);
  const handleClose = useCallback(() => onClose(), [onClose]);
  useEscapeKey(isOpen, handleClose);

  useEffect(() => {
    if (!isOpen) return;
    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => restoreFocusTo.current?.focus?.();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onNavigate((index ?? 0) + 1);
      if (event.key === "ArrowLeft") onNavigate((index ?? 0) - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, index, onNavigate]);

  if (!isOpen) return null;

  const image = images[index as number];
  if (!image) return null;
  const position = (index as number) + 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${position} of ${images.length}: ${image.title}`}
      onClick={handleClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        className="relative flex w-full max-w-4xl flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <p className="num text-[0.72rem] tracking-[0.22em] text-muted uppercase">
            {String(position).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            aria-label="Close image viewer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-surface text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            <X size={18} />
          </button>
        </div>

        <figure className="relative w-full overflow-hidden rounded-[12px] border border-white/8 bg-surface">
          <img
            key={image.id}
            src={gallerySrc(image.pexelsId, image.ratio, 1400)}
            alt={`${image.alt}. Enlarged development placeholder image.`}
            width={1400}
            height={image.ratio === "portrait" ? 1960 : image.ratio === "square" ? 1400 : 964}
            decoding="async"
            className="max-h-[68vh] w-full animate-rise object-contain"
          />
          <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/8 px-4 py-3">
            <span className="text-[0.92rem] font-semibold text-ink">{image.title}</span>
            <span className="text-[0.68rem] font-semibold tracking-[0.2em] text-accent uppercase">
              {image.category}
            </span>
          </figcaption>
        </figure>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate((index as number) - 1)}
            aria-label="Previous image"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-surface text-ink transition-all hover:border-accent/60 hover:text-accent"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-[0.75rem] text-muted/70">
            Use ← → keys or the buttons to move through the gallery
          </span>
          <button
            type="button"
            onClick={() => onNavigate((index as number) + 1)}
            aria-label="Next image"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-surface text-ink transition-all hover:border-accent/60 hover:text-accent"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
