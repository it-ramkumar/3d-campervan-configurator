import { isBlackFriday } from "@/utils/salePrice";

// Bright "Black Friday Deal" badge shown next to crossed-out prices.
export default function BlackFridayTag({ size = "sm", className = "" }) {
  if (!isBlackFriday()) return null;
  const sizes = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs md:text-sm",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/40 ring-2 ring-white ${sizes[size] || sizes.sm} ${className}`}
    >
      <span aria-hidden="true">⚡</span>
      Black Friday Deal
    </span>
  );
}
