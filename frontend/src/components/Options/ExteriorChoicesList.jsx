"use client";
import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Tag, Search, X, ArrowRight, ArrowLeft, ImageOff } from "lucide-react";
import Link from "next/link";
import { RichParagraph, Heading1 } from "../Common/Common";
import { BORDER, getItemTitle, RenderBlocks } from "./optionBlocks";
import Image from "next/image";

const itemMatches = (item, query) =>
  getItemTitle(item).toLowerCase().includes(query) ||
  item.description?.some((d) => d?.toLowerCase().includes(query)) ||
  activeBlocks(item).some(
    (b) => b.title?.toLowerCase().includes(query) || b.content?.toLowerCase().includes(query),
  );

// every item of a category, optionally limited to one subcategory
const getCategoryItems = (cat, subId = "all") => {
  if (subId !== "all") return cat.subCategories?.find((s) => s._id === subId)?.items || [];
  return [...(cat.subCategories || []).flatMap((s) => s.items || []), ...(cat.items || [])];
};

const countItems = (cat) => getCategoryItems(cat).length;

// ── ScrollRow: horizontal pill row with arrow buttons ─────────────────────────
const ScrollRow = ({ children }) => {
  const scrollRef = useRef(null);
  const scroll = (dir) =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -250 : 250, behavior: "smooth" });

  const arrowClass =
    "hidden md:flex w-9 h-9 rounded-full items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-[#ED985F] hover:text-[#001F3D] text-primary/50";

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => scroll("left")} className={arrowClass} style={{ border: BORDER }} aria-label="Scroll Left">
        <ArrowLeft size={15} />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth flex-1"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </div>
      <button onClick={() => scroll("right")} className={arrowClass} style={{ border: BORDER }} aria-label="Scroll Right">
        <ArrowRight size={15} />
      </button>
    </div>
  );
};

const Pill = ({ active, onClick, children, small }) => (
  <button
    onClick={onClick}
    className={`rounded-lg font-bold uppercase tracking-wider transition-all duration-300 min-w-max flex-shrink-0 whitespace-nowrap
      ${small ? "px-3 py-1.5 text-[10px]" : "px-4 py-2.5 text-[10px] md:text-[11px]"}
      ${active ? "bg-[#ED985F] text-[#001F3D] shadow-lg" : "text-primary/50 hover:text-[#ED985F]"}`}
    style={{ border: active ? "1px solid #ED985F" : BORDER }}
  >
    {children}
  </button>
);

// ── OptionCard: full description + blocks stay in the page HTML ──────────────
const OptionCard = ({ item, label, href }) => {
  const title = getItemTitle(item);
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group break-inside-avoid mb-4 md:mb-6 rounded-xl overflow-hidden bg-white flex flex-col transition-shadow duration-300 hover:shadow-xl hover:shadow-[#001F3D]/5"
      style={{ border: BORDER }}
    >
      <Link
        href={href}
        className="relative block aspect-[4/3] w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ED985F]"
        style={{ background: "rgba(0,31,61,0.04)" }}
        aria-label={title}
        tabIndex={-1}
      >
        {item.images?.[0] ? (
          <Image
            src={item.images[0]}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-primary/20">
            <ImageOff size={28} />
          </span>
        )}
        {label && (
          <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/90 text-[9px] font-bold uppercase tracking-wider text-primary">
            {label}
          </span>
        )}
      </Link>

      <div className="flex flex-col p-4 gap-2" style={{ borderTop: "1px solid rgba(237,152,95,0.15)" }}>
        <RichParagraph variant="sub" textColor="text-primary" className="font-bold !opacity-100">
          <Link href={href} className="hover:text-[#ED985F] transition-colors">
            {title}
          </Link>
        </RichParagraph>

        {item.description?.filter((d) => d?.trim()).map((desc, i) => (
          <RichParagraph variant="card" key={i}>
            {desc}
          </RichParagraph>
        ))}
        <RenderBlocks blocks={item.blocks} compact />

        <Link
          href={href}
          className="self-start pt-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#ED985F] hover:underline"
          aria-label={`View details: ${title}`}
        >
          View details
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
};

// ── Main export ───────────────────────────────────────────────────────────────
export default function ExteriorChoicesList({ initialData, basePath }) {
  // newest category first, same order as before
  const categories = useMemo(
    () => (initialData?.categories || []).slice().reverse(),
    [initialData],
  );

  const [activeCatId, setActiveCatId] = useState(categories[0]?._id || null);
  const [activeSubId, setActiveSubId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const activeCat = categories.find((c) => c._id === activeCatId) || categories[0];

  // cards currently on screen: search results across all categories, or the active tab
  const visibleItems = useMemo(() => {
    if (query) {
      return categories.flatMap((cat) =>
        getCategoryItems(cat)
          .filter((item) => cat.title.toLowerCase().includes(query) || itemMatches(item, query))
          .map((item) => ({ item, label: cat.title })),
      );
    }
    if (!activeCat) return [];
    return getCategoryItems(activeCat, activeSubId).map((item) => ({ item, label: null }));
  }, [categories, activeCat, activeSubId, query]);

  const selectCategory = (id) => {
    setActiveCatId(id);
    setActiveSubId("all");
    setSearchQuery("");
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-20 font-bold text-primary/25 animate-pulse font-ui">
        Loading configurations...
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-[1440px] mx-auto">
      {/* ── STICKY BAR: search + category tabs ── */}
      <div
        className="sticky top-[65px] z-40 -mx-4 md:mx-0 px-4 md:px-4 py-3 md:rounded-xl mb-8 space-y-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", border: BORDER }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
          <input
            type="text"
            placeholder="Search by keyword, material, or style…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-lg outline-none font-ui font-semibold text-sm text-primary placeholder:text-primary/30 transition-shadow focus:shadow-[0_0_0_2px_rgba(237,152,95,0.3)]"
            style={{ background: "#F8F9FA", border: BORDER }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-primary/40 hover:text-primary"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <ScrollRow>
          {categories.map((cat) => (
            <Pill key={cat._id} active={!query && cat._id === activeCat?._id} onClick={() => selectCategory(cat._id)}>
              {cat.title}
              <span className="ml-1.5 opacity-60">{countItems(cat)}</span>
            </Pill>
          ))}
        </ScrollRow>
      </div>

      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl flex-shrink-0 bg-[#ED985F]"
            style={{ border: "1px solid rgba(237,152,95,0.2)" }}
          >
            {query ? <Search className="h-5 w-5 text-[#001F3D]" /> : <Tag className="h-5 w-5 text-[#001F3D]" />}
          </div>
          <div>
            <Heading1
              variant="section"
              text={query ? `Results for “${searchQuery.trim()}”` : activeCat?.title}
              textColor="text-primary"
            />
            <RichParagraph variant="sub">
              {visibleItems.length} Options Available
            </RichParagraph>
          </div>
        </div>
      </div>

      {/* ── SUBCATEGORY CHIPS ── */}
      {!query && activeCat?.subCategories?.length > 0 && (
        <div className="mb-6">
          <ScrollRow>
            <Pill small active={activeSubId === "all"} onClick={() => setActiveSubId("all")}>
              All
            </Pill>
            {activeCat.subCategories.map((sub) => (
              <Pill small key={sub._id} active={activeSubId === sub._id} onClick={() => setActiveSubId(sub._id)}>
                {sub.title}
              </Pill>
            ))}
          </ScrollRow>
        </div>
      )}

      {/* ── CARD GRID ── */}
      {visibleItems.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6">
          {visibleItems.map(({ item, label }) => (
            <OptionCard key={item._id} item={item} label={label} href={`${basePath}/${item.slug}`} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-xl" style={{ border: "1px dashed rgba(0,31,61,0.15)" }}>
          <RichParagraph variant="card" className="font-ui font-bold">
            No options found{query ? ` for “${searchQuery.trim()}”` : ""}.
          </RichParagraph>
          {query && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#ED985F] hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(237,152,95,0.18);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(237,152,95,0.35);
        }
      `}</style>
    </div>
  );
}
