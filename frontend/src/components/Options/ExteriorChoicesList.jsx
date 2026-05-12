"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ChevronDown,
  Sparkles,
  Tag,
  Search,
  Truck,
  Filter,
  X,
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
  ImageWithSkeleton,

} from "../Common/Common";
import Image from "next/image";

const MAX_INITIAL_ITEMS = 50;

// --- 1. RenderBlocks: Content blocks within the detail view (simplified for compact view) ---
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
            // return (
            // <div key={idx} className="mb-0.5">
            //   <Heading4
            //     text={block.title}
            //     className="text-primary font-bold text-[11px]"
            //   />
            // </div>

            // );
            case "subheading":
              return (
                <div key={idx} className="mb-1">
                  <Heading4
                    text={block.title}
                    className="text-primary font-bold text-[11px]"
                  />
                </div>
              );

            case "paragraph":
              return (
                <RichParagraph
                  key={idx}
                  className="!text-primary/70 leading-relaxed  font-medium"
                >
                  {block.content}
                </RichParagraph>
              );
            case "list":
              return (
                <div
                  key={idx}
                  className="bg-secondary/10 p-3 rounded-lg border border-primary/5"
                >
                  {block.title && (
                    <RichParagraph className="font-black !text-primary/40 uppercase !text-[10px] tracking-widest mb-1.5">
                      {block.title}
                    </RichParagraph>
                  )}
                  <ul className="space-y-1.5">
                    {block.list_items?.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-2.5 w-2.5 text-hover mt-0.5 shrink-0" />
                        <RichParagraph className="!text-primary/80 !text-[12px] font-semibold leading-tight">
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

const SubCategoryNav = ({ subCategories, activeSubId, onSelect, catId }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 250;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="md:sticky md:top-[65px] z-40 bg-white/95 backdrop-blur-md py-3 md:py-4 mb-4 md:mb-8 border-b md:border border-primary/10 md:rounded-lg relative md:shadow-sm md:mx-4">
      {/* GRID: Dedicated space for arrows means they NEVER overlap */}
      <div className="grid grid-cols-[40px_1fr_40px] md:grid-cols-[50px_1fr_50px] items-center w-full px-1">
        {/* Left Arrow - Fixed Column */}
        <button
          onClick={() => scroll("left")}
          className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
          aria-label="Scroll Left"
        >
          <ArrowLeft size={16} />
        </button>

        {/* Scrollable Area - Sink and other 7 options */}
        <div
          ref={scrollRef}
          className="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth px-2 w-full"
          style={{
            justifyContent: "flex-start",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {subCategories.map((sub) => {
            const isActive = activeSubId === sub._id;
            return (
              <button
                key={sub._id}
                onClick={() => onSelect(sub)}
                className={`px-4 py-2.5 md:py-3 rounded-lg md:rounded-lg font-bold text-[10px] md:text-[11px] uppercase tracking-wider transition-all duration-300 border-2 text-center flex items-center justify-center min-w-max px-4 md:px-6 flex-shrink-0 whitespace-nowrap
                  ${isActive ? "bg-primary text-white border-primary shadow-lg" : "bg-secondary/40 text-primary/60 border-transparent hover:border-hover hover:text-hover"}`}
              >
                {sub.title}
              </button>
            );
          })}
        </div>

        {/* Right Arrow - Fixed Column */}
        <button
          onClick={() => scroll("right")}
          className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-md rounded-full border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
          aria-label="Scroll Right"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
      // Expand first category by default if none are expanded
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

  // --- Filtered Categories Logic ---
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
                    item.description?.some((d) =>
                      d.toLowerCase().includes(query),
                    ) ||
                    item.blocks?.some(
                      (b) =>
                        b.title?.toLowerCase().includes(query) ||
                        b.content?.toLowerCase().includes(query),
                    ),
                ) || [];
              return {
                ...sub,
                items: filteredItems,
                hasMatch:
                  sub.title.toLowerCase().includes(query) ||
                  filteredItems.length > 0,
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
      <div className="text-center py-20 font-bold text-primary/40 animate-pulse">
        Loading configurations...
      </div>
    );
  }

  return (
    <div className="bg-transparent md:bg-secondary/40 backdrop-blur-0 md:backdrop-blur-3xl rounded-none md:rounded-lg p-0 md:p-10 border-0 md:border border-primary/5">
      {/* className="bg-secondary/40 backdrop-blur-3xl rounded-lg p-4 sm:p-10 border border-primary/5" */}
      {/* --- RESTORED ORIGINAL SEARCH BAR --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 relative z-50"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 shadow-2xl border border-white flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
            <input
              type="text"
              placeholder="Search by keyword, material, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-secondary/50 border-none rounded-lg focus:ring-2 focus:ring-hover/20 outline-none text-primary font-bold placeholder:text-primary/20 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30 pointer-events-none" />
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full lg:w-72 pl-14 pr-12 py-5 bg-primary text-white rounded-lg outline-none appearance-none font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-hover transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* --- HYBRID CATEGORIES FEED --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredCategories?.map((cat, index) => {
            const activeSubId = activeSubCategoryMap?.[cat?._id];
            const currentSub = cat.subCategories?.find(
              (s) => s._id === activeSubId,
            );
            const items =
              activeSubId != null ? currentSub?.items || [] : cat.items || [];
            const activeItem = activeItemMap?.[cat._id] || items[0] || null;
            const isExpanded = expandedCategories?.[cat._id] || false;

            return (
              <motion.div
                key={cat._id}
                variants={itemVariants}
                layout
                className="bg-transparent md:bg-white rounded-none md:rounded-lg border-0 md:border border-primary/5 shadow-none md:shadow-sm overflow-hidden"
              >
                {/* // className="bg-white rounded-lg border border-primary/5 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500" */}
                {/* CATEGORY TRIGGER HEADER */}
                <div
                  onClick={() => toggleCategory(cat._id)}
                  className="p-8 cursor-pointer flex items-center justify-between gap-6 group bg-white border-b border-primary/5"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-secondary text flex items-center justify-center rounded-lg group-hover:bg-primary transition-all duration-500">
                      <Tag className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <Heading2 text={cat.title} />
                      <RichParagraph className="text-primary/40 mt-1 uppercase text-xs font-bold tracking-widest">
                        {(cat.subCategories?.length || 0) +
                          (cat.items?.length || 0)}{" "}
                        Options Available
                      </RichParagraph>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg border-2 border-secondary flex items-center justify-center transition-all ${isExpanded ? "bg-primary border-primary" : "group-hover:border-hover"}`}
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-500 ${isExpanded ? "rotate-180 text-white" : "text-primary"}`}
                    />
                  </div>
                </div>

                {/* EXPANDABLE MASTER-DETAIL VIEW */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-8">
                        {/* Sticky Sub-Nav within Card */}
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

                        {/* NO-SCROLL MASTER-DETAIL GRID */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
                          {/* Master Column (Items List) */}
                          <div className="lg:col-span-3 space-y-4 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar lg:sticky lg:top-64 mt-8">
                            {items.map((item, i) => {
                              const isActive = activeItem?._id === item._id;
                              return (
                                <motion.div
                                  key={item._id}
                                  whileHover={{ x: 5 }}
                                  onClick={() =>
                                    setActiveItemMap((prev) => ({
                                      ...prev,
                                      [cat._id]: item,
                                    }))
                                  }
                                  className={`relative p-3 rounded-lg cursor-pointer border-2 transition-all duration-300 flex items-center gap-3 overflow-hidden group
                                      ${
                                        isActive
                                          ? "bg-primary border-primary shadow-lg"
                                          : "bg-white border-primary/5 hover:bg-hover hover:border-hover"
                                      }`}
                                >
                                  {/* Mini Thumbnail */}
                                  <div
                                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-500
                                      ${isActive ? "border-white/20 scale-110" : "border-primary/5 group-hover:border-primary/20"}`}
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
                                        item.blocks?.find(
                                          (b) => b.block_type === "heading",
                                        )?.title ||
                                        "Untitled Option"
                                      }
                                      className={`!text-[12px] leading-tight transition-colors duration-300 ${
                                        isActive
                                          ? "!text-white"
                                          : "!text-primary"
                                      }`}
                                    />
                                  </div>

                                  {isActive && (
                                    <div className="bg-white text-primary p-1 rounded-full">
                                      <CheckCircle2 size={12} />
                                    </div>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Detail Column (Side-by-Side Card) */}
                          <div className="lg:col-span-9 lg:sticky lg:top-24 mt-4 md:mt-6">
                            <AnimatePresence mode="wait">
                              {activeItem ? (
                                <motion.div
                                  key={activeItem._id}
                                  initial={{ opacity: 0, scale: 0.99 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.99 }}
                                  className="bg-transparent md:bg-secondary/10 rounded-none md:rounded-lg p-0 md:p-6 border-0 md:border border-white/50 shadow-none md:shadow-sm overflow-hidden"
                                  // className="bg-secondary/10 rounded-2xl p-0 md:p-6 border border-white/50 shadow-sm overflow-hidden"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6">
                                    {/* Sub-Col 1: Image (Edge-to-Edge on Mobile) */}
                                    <div className="md:col-span-8 flex items-center justify-center bg-gray-50/30">
                                      <Image
                                      width={1000}
                                      height={1000}
                                        src={activeItem.images?.[0]}
                                        alt={activeItem.title || "Van option"}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>

                                    {/* Sub-Col 2: Info (Padded for Content) */}
                                    <div className="md:col-span-4 flex flex-col justify-center p-6 md:p-0">
                                      <div className="space-y-4">
                                        <Heading3
                                          text={
                                            activeItem.heading ||
                                            activeItem.title ||
                                            activeItem.blocks?.find(
                                              (b) => b.block_type === "heading",
                                            )?.title ||
                                            "Untitled Option"
                                          }
                                          className="text-xl font-bold text-primary leading-tight"
                                        />

                                        <div className="space-y-2.5">
                                          {activeItem.description?.map(
                                            (desc, i) => (
                                              <RichParagraph
                                                key={i}
                                                className=" leading-relaxed  border-l-2 border-hover/20 pl-4"
                                              >
                                                {desc}
                                              </RichParagraph>
                                            ),
                                          )}
                                          <RenderBlocks
                                            blocks={activeItem.blocks}
                                          />
                                        </div>
                                      </div>

                                      {/* Bottom Button */}
                                      {activeItem.link && (
                                        <Link
                                          href={activeItem.link}
                                          target="_blank"
                                          className="mt-6"
                                        >
                                          <button className="w-full group flex items-center justify-between bg-primary text-white p-1.5 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-hover transition-all shadow-lg">
                                            <span className="pl-4">
                                              View Complete Catalog
                                            </span>
                                            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center group-hover:bg-white/20">
                                              <ArrowRight size={14} />
                                            </div>
                                          </button>
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              ) : (
                                <div className="h-[400px] flex items-center justify-center text-primary/20 italic font-bold">
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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 31, 61, 0.1);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 31, 61, 0.2);
        }
      `}</style>
    </div>
  );
}
