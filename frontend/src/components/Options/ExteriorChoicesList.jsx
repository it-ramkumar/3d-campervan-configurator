"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Tag,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import {
  Heading2,
  RichParagraph,
  Heading3,
  Heading4,
} from "../Common/Common";
import Image from "next/image";

const MAX_INITIAL_ITEMS = 50;

// ── Shared dark tokens ────────────────────────────────────────────────────────
const GLASS = {
  background: "rgba(2,12,24,0.72)",
  backdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.07)",
};
const GLASS_LIGHT = {
  background: "rgba(0,31,61,0.05)",
  border: "1px solid rgba(0,31,61,0.1)",
};

// ── RenderBlocks ──────────────────────────────────────────────────────────────
const RenderBlocks = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-3 mt-3">
      {blocks
        .sort((a, b) => a.order - b.order)
        .map((block, idx) => {
          switch (block.block_type) {
            case "heading":
              return null;

            case "subheading":
              return (
                <div key={idx} className="mb-1">
                  <Heading4
                    text={block.title}
                    textColor="text-primary"
                    className="font-bold text-[11px]"
                  />
                </div>
              );

            case "paragraph":
              return (
                <RichParagraph
                  key={idx}
                  textColor="text-primary"
                  className="!opacity-60 leading-relaxed font-medium"
                >
                  {block.content}
                </RichParagraph>
              );

            case "list":
              return (
                <div
                  key={idx}
                  className="p-3 rounded-lg"
                  style={GLASS_LIGHT}
                >
                  {block.title && (
                    <RichParagraph
                      textColor="text-primary"
                      className="font-black !opacity-35 uppercase !text-[10px] tracking-widest mb-1.5"
                    >
                      {block.title}
                    </RichParagraph>
                  )}
                  <ul className="space-y-1.5">
                    {block.list_items?.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-2.5 w-2.5 text-[#ED985F] mt-0.5 shrink-0" />
                        <RichParagraph
                          textColor="text-primary"
                          className="!text-[12px] font-semibold leading-tight !opacity-75"
                        >
                          {item.text}
                        </RichParagraph>
                      </li>
                    ))}
                  </ul>
                </div>
              );

            default:
              return null;
          }
        })}
    </div>
  );
};

// ── SubCategoryNav ────────────────────────────────────────────────────────────
const SubCategoryNav = ({ subCategories, activeSubId, onSelect }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 250;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="md:sticky md:top-[65px] z-40 py-3 md:py-4 mb-4 md:mb-8 border-b md:border md:rounded-lg relative"
      style={{
        background: "#ffffff",
        borderColor: "rgba(0,31,61,0.1)",
      }}
    >
      <div className="grid grid-cols-[40px_1fr_40px] md:grid-cols-[50px_1fr_50px] items-center w-full px-1">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ED985F] hover:text-[#001F3D] text-primary/50"
          style={{ border: "1px solid rgba(0,31,61,0.1)" }}
          aria-label="Scroll Left"
        >
          <ArrowLeft size={16} />
        </button>

        {/* Scrollable pills */}
        <div
          ref={scrollRef}
          className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar py-1 scroll-smooth px-2 w-full"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {subCategories.map((sub) => {
            const isActive = activeSubId === sub._id;
            return (
              <button
                key={sub._id}
                onClick={() => onSelect(sub)}
                className={`px-4 py-2.5 md:py-2.5 rounded-lg font-bold text-[10px] md:text-[11px] uppercase tracking-wider transition-all duration-300 min-w-max flex-shrink-0 whitespace-nowrap
                  ${isActive
                    ? "bg-[#ED985F] text-[#001F3D] shadow-lg"
                    : "text-primary/50 hover:text-[#ED985F]"
                  }`}
                style={
                  isActive
                    ? { border: "1px solid #ED985F" }
                    : { border: "1px solid rgba(0,31,61,0.1)" }
                }
              >
                {sub.title}
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#ED985F] hover:text-[#001F3D] text-primary/50"
          style={{ border: "1px solid rgba(0,31,61,0.1)" }}
          aria-label="Scroll Right"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ── Main export ───────────────────────────────────────────────────────────────
export default function ExteriorChoicesList({ initialData, heading }) {
  const [activeSubCategoryMap, setActiveSubCategoryMap] = useState(
    initialData?.activeSubCategoryMap || {},
  );
  const [activeItemMap, setActiveItemMap] = useState(
    initialData?.activeItemMap || {},
  );
  const [expandedCategories, setExpandedCategories] = useState(
    initialData?.expandedCategories || {},
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  useEffect(() => {
    if (initialData) {
      setActiveSubCategoryMap(initialData.activeSubCategoryMap || {});
      setActiveItemMap(initialData.activeItemMap || {});
      if (
        initialData.categories?.length > 0 &&
        Object.keys(expandedCategories).length === 0
      ) {
        setExpandedCategories({ [initialData.categories[0]._id]: true });
      }
    }
  }, [initialData]);

  const categories = initialData?.categories || [];

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const filteredCategories = useMemo(() => {
    let filtered = [...categories];
    if (selectedCategoryFilter !== "all") {
      filtered = filtered.filter((cat) => cat._id === selectedCategoryFilter);
    }
    if (!searchQuery.trim()) return filtered.slice().reverse();

    const query = searchQuery.toLowerCase();
    return filtered
      .map((cat) => {
        const categoryMatch = cat.title.toLowerCase().includes(query);
        const filteredSubCategories =
          cat.subCategories
            ?.map((sub) => {
              const filteredItems =
                sub.items?.filter(
                  (item) =>
                    item.title?.toLowerCase().includes(query) ||
                    item.description?.some((d) => d.toLowerCase().includes(query)) ||
                    item.blocks?.some(
                      (b) =>
                        b.title?.toLowerCase().includes(query) ||
                        b.content?.toLowerCase().includes(query),
                    ),
                ) || [];
              return {
                ...sub,
                items: filteredItems,
                hasMatch: sub.title.toLowerCase().includes(query) || filteredItems.length > 0,
              };
            })
            .filter((sub) => sub.hasMatch) || [];

        const filteredDirectItems =
          cat.items?.filter(
            (item) =>
              item.title?.toLowerCase().includes(query) ||
              item.description?.some((d) => d.toLowerCase().includes(query)),
          ) || [];

        return {
          ...cat,
          subCategories: filteredSubCategories,
          items: filteredDirectItems,
          hasMatch:
            categoryMatch ||
            filteredSubCategories.length > 0 ||
            filteredDirectItems.length > 0,
        };
      })
      .filter((cat) => cat.hasMatch)
      .slice()
      .reverse();
  }, [categories, searchQuery, selectedCategoryFilter]);

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-20 font-bold text-primary/25 animate-pulse font-ui">
        Loading configurations...
      </div>
    );
  }

  return (
    <div
      className="rounded-none md:rounded-xl p-0 md:p-8"
      style={{ background: "transparent" }}
    >
      {/* ── SEARCH + FILTER BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 relative z-50"
      >
        <div
          className="rounded-xl p-3 flex flex-col lg:flex-row gap-3"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,31,61,0.1)",
          }}
        >
          {/* Search input */}
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30" />
            <input
              type="text"
              placeholder="Search by keyword, material, or style…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-13 pr-6 py-4 rounded-lg outline-none font-ui font-semibold text-sm text-primary placeholder:text-primary/30 transition-all"
              style={{
                background: "#F8F9FA",
                border: "1px solid rgba(0,31,61,0.1)",
              }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px rgba(237,152,95,0.3)")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          {/* Category filter */}
          <div className="relative">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/30 pointer-events-none" />
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full lg:w-64 pl-12 pr-10 py-4 rounded-lg outline-none appearance-none font-ui font-black text-[11px] uppercase tracking-widest cursor-pointer transition-colors text-primary"
              style={{
                background: "#F8F9FA",
                border: "1px solid rgba(0,31,61,0.1)",
              }}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* ── CATEGORY ACCORDION FEED ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredCategories?.map((cat) => {
            const activeSubId = activeSubCategoryMap?.[cat?._id];
            const currentSub = cat.subCategories?.find((s) => s._id === activeSubId);
            const items = activeSubId != null ? currentSub?.items || [] : cat.items || [];
            const activeItem = activeItemMap?.[cat._id] || items[0] || null;
            const isExpanded = expandedCategories?.[cat._id] || false;

            return (
              <motion.div
                key={cat._id}
                variants={itemVariants}
                layout
                className="rounded-xl overflow-hidden"
                style={{
                  background: "#ffffff",
                  border: isExpanded
                    ? "1px solid rgba(237,152,95,0.35)"
                    : "1px solid rgba(0,31,61,0.1)",
                  transition: "border-color 0.3s ease",
                }}
              >
                {/* CATEGORY HEADER */}
                <div
                  onClick={() => toggleCategory(cat._id)}
                  className="p-6 md:p-8 cursor-pointer flex items-center justify-between gap-6 group transition-all duration-300"
                  style={{
                    background: isExpanded
                      ? "rgba(0,31,61,0.04)"
                      : "#ffffff",
                    borderBottom: isExpanded
                      ? "1px solid rgba(237,152,95,0.15)"
                      : "1px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-5">
                    {/* Icon box */}
                    <div
                      className="w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-500 flex-shrink-0"
                      style={{
                        background: isExpanded
                          ? "#ED985F"
                          : "rgba(0,31,61,0.08)",
                        border: "1px solid rgba(237,152,95,0.2)",
                      }}
                    >
                      <Tag
                        className="h-5 w-5 transition-colors duration-300"
                        style={{ color: isExpanded ? "#001F3D" : "#ED985F" }}
                      />
                    </div>

                    <div>
                      <Heading2
                        text={cat.title}
                        textColor="text-primary"
                        className="!text-2xl md:!text-3xl"
                      />
                      <p className="mt-1 font-ui font-bold text-[10px] uppercase tracking-[0.25em] text-primary/30">
                        {(cat.subCategories?.length || 0) + (cat.items?.length || 0)} Options Available
                      </p>
                    </div>
                  </div>

                  {/* Chevron toggle */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isExpanded ? "#ED985F" : "rgba(0,31,61,0.08)",
                      border: isExpanded
                        ? "1px solid #ED985F"
                        : "1px solid rgba(0,31,61,0.1)",
                    }}
                  >
                    <ChevronDown
                      className="h-5 w-5 transition-transform duration-500"
                      style={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        color: isExpanded ? "#001F3D" : "#001F3D",
                      }}
                    />
                  </div>
                </div>

                {/* EXPANDABLE CONTENT */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-8">
                        {/* Sub-category nav */}
                        {cat.subCategories?.length > 0 && (
                          <SubCategoryNav
                            catId={cat._id}
                            subCategories={cat.subCategories}
                            activeSubId={activeSubId}
                            onSelect={(sub) => {
                              setActiveSubCategoryMap((prev) => ({
                                ...prev,
                                [cat._id]: sub._id,
                              }));
                              setActiveItemMap((prev) => ({
                                ...prev,
                                [cat._id]: sub.items?.[0] || null,
                              }));
                            }}
                          />
                        )}

                        {/* MASTER–DETAIL GRID */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                          {/* Master: item list */}
                          <div className="lg:col-span-3 space-y-2.5 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar lg:sticky lg:top-64 mt-6">
                            {items.map((item) => {
                              const isActive = activeItem?._id === item._id;
                              return (
                                <motion.div
                                  key={item._id}
                                  whileHover={{ x: 4 }}
                                  onClick={() =>
                                    setActiveItemMap((prev) => ({
                                      ...prev,
                                      [cat._id]: item,
                                    }))
                                  }
                                  className="relative p-3 rounded-xl cursor-pointer flex items-center gap-3 overflow-hidden transition-all duration-300"
                                  style={
                                    isActive
                                      ? {
                                          background: "rgba(0,31,61,0.9)",
                                          border: "1px solid rgba(237,152,95,0.5)",
                                          boxShadow: "0 0 20px rgba(237,152,95,0.08)",
                                        }
                                      : {
                                          background: "rgba(0,31,61,0.04)",
                                          border: "1px solid rgba(0,31,61,0.1)",
                                        }
                                  }
                                >
                                  {/* Thumbnail */}
                                  <div
                                    className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300"
                                    style={{
                                      border: isActive
                                        ? "1px solid rgba(237,152,95,0.4)"
                                        : "1px solid rgba(0,31,61,0.1)",
                                      transform: isActive ? "scale(1.05)" : "scale(1)",
                                    }}
                                  >
                                    <Image
                                      src={item.images?.[0]}
                                      alt={item.title || "Van option"}
                                      className="w-full h-full object-cover"
                                      width={100}
                                      height={100}
                                    />
                                  </div>

                                  <div className="flex-1 min-w-0 pr-1">
                                    <Heading3
                                      text={
                                        item.heading ||
                                        item.title ||
                                        item.blocks?.find((b) => b.block_type === "heading")?.title ||
                                        "Untitled Option"
                                      }
                                      textColor={isActive ? "text-secondary" : "text-primary"}
                                      className={`!text-[12px] leading-tight transition-colors duration-300 ${isActive ? "!opacity-100" : "!opacity-55"}`}
                                    />
                                  </div>

                                  {isActive && (
                                    <div
                                      className="p-1 rounded-full flex-shrink-0"
                                      style={{ background: "#ED985F" }}
                                    >
                                      <CheckCircle2 size={12} color="#001F3D" />
                                    </div>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Detail panel */}
                          <div className="lg:col-span-9 lg:sticky lg:top-24 mt-4 md:mt-6">
                            <AnimatePresence mode="wait">
                              {activeItem ? (
                                <motion.div
                                  key={activeItem._id}
                                  initial={{ opacity: 0, scale: 0.99 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.99 }}
                                  className="rounded-xl overflow-hidden"
                                  style={{
                                    background: "#ffffff",
                                    border: "1px solid rgba(237,152,95,0.2)",
                                  }}
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-0">
                                    {/* Image */}
                                    <div
                                      className="md:col-span-8 flex items-center justify-center min-h-[280px]"
                                      style={{ background: "rgba(0,31,61,0.03)" }}
                                    >
                                      <Image
                                        width={1000}
                                        height={1000}
                                        src={activeItem.images?.[0]}
                                        alt={activeItem.title || "Van option"}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>

                                    {/* Info */}
                                    <div
                                      className="md:col-span-4 flex flex-col justify-center p-6"
                                      style={{ borderLeft: "1px solid rgba(237,152,95,0.1)" }}
                                    >
                                      <div className="space-y-4">
                                        {/* amber top accent */}
                                        <div className="w-8 h-[2px] bg-[#ED985F]" />

                                        <Heading3
                                          text={
                                            activeItem.heading ||
                                            activeItem.title ||
                                            activeItem.blocks?.find((b) => b.block_type === "heading")?.title ||
                                            "Untitled Option"
                                          }
                                          textColor="text-primary"
                                          className="font-bold leading-tight"
                                        />

                                        <div className="space-y-3">
                                          {activeItem.description?.map((desc, i) => (
                                            <RichParagraph
                                              key={i}
                                              textColor="text-primary"
                                              className="!opacity-60 leading-relaxed border-l-2 border-[#ED985F]/20 pl-4"
                                            >
                                              {desc}
                                            </RichParagraph>
                                          ))}
                                          <RenderBlocks blocks={activeItem.blocks} />
                                        </div>
                                      </div>

                                      {/* CTA */}
                                      {activeItem.link && (
                                        <Link
                                          href={activeItem.link}
                                          target="_blank"
                                          className="mt-6 block"
                                        >
                                          <button
                                            className="w-full group flex items-center justify-between p-1.5 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all"
                                            style={{
                                              background: "#001F3D",
                                              border: "1px solid rgba(237,152,95,0.25)",
                                              color: "#FBFBF9",
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.background = "#ED985F";
                                              e.currentTarget.style.color = "#001F3D";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.background = "#001F3D";
                                              e.currentTarget.style.color = "#FBFBF9";
                                            }}
                                          >
                                            <span className="pl-4">View Complete Catalog</span>
                                            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "rgba(0,31,61,0.08)" }}>
                                              <ArrowRight size={14} />
                                            </div>
                                          </button>
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              ) : (
                                <div className="h-[400px] flex items-center justify-center font-ui italic font-bold text-primary/20">
                                  Select an option to view details
                                </div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

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
        .pl-13 { padding-left: 3.25rem; }
      `}</style>
    </div>
  );
}
