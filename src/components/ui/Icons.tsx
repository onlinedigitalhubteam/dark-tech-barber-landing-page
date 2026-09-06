import {
  Baby,
  BrushCleaning,
  Layers,
  Scissors,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import type { ServiceIconKey } from "@/data/services";
import { cn } from "@/utils/cn";

export const serviceIcons: Record<ServiceIconKey, LucideIcon> = {
  classic: Scissors,
  low: Layers,
  mid: Zap,
  high: Sparkles,
  taper: BrushCleaning,
  kids: Baby,
  beard: Scissors,
  combo: Layers,
};

export { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp };

/** Orange-outlined icon tile used across cards. */
export function IconTile({
  icon: Icon,
  className,
  size = 18,
}: {
  icon: LucideIcon;
  className?: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-accent/35 bg-accent/10 text-accent transition-colors duration-200",
        className,
      )}
    >
      <Icon size={size} strokeWidth={1.75} />
    </span>
  );
}

/** The shop's "fade" monogram: stacked bars that taper as they descend. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-[9px] border border-accent/50 bg-black",
        className,
      )}
    >
      <span className="flex flex-col gap-[3px]">
        <span className="block h-[3px] w-[17px] rounded-full bg-accent" />
        <span className="block h-[3px] w-[13px] rounded-full bg-accent/75" />
        <span className="block h-[3px] w-[9px] rounded-full bg-accent/50" />
        <span className="block h-[3px] w-[5px] rounded-full bg-accent/30" />
      </span>
    </span>
  );
}
