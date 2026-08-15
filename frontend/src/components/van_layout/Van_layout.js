"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowRight, X, ChevronDown, Check } from "lucide-react";
import {
  Heading2,
  Heading3,
  RichParagraph,
  SpanTag,
} from '../Common/Common';
import Link from "next/link";
import { getAllPortfolio } from "@/api/portfolio/getAllPortfolio";

// --- WHEELBASE GROUPS ---
const WHEELBASE_GROUPS = [
  { key: "short", label: "Short Vans", values: ["130", "144", "148"] },
  { key: "long", label: "Long Vans", values: ["159", "148 ext", "170", "170 ext"] },
];

// --- SHOWER GROUPS ---
const SHOWER_GROUPS = [
  { key: "full-standing", label: "Full Standing Indoor Shower", values: ["Full Aluminum", "Full Acrilic", "Full Real Tile"] },
  { key: "folding", label: "Folding / Hide Away Interior Shower", values: ["Folding Shower", "Shower in a Bench"] },
  { key: "rear-outdoor", label: "Rear Outdoor Shower Only", values: ["Rear Shower"] },
  { key: "rear-xl", label: "Rear XL Bathroom", values: ["Rear Bathroom"] },
];

// --- SUB-COMPONENT: IMAGE GRID ---
const ProjectImages = ({ images, alt }) => {
  const hasMultiple = images?.length > 1;
  const displayImages = images?.length > 0 ? images : ["/images/blockLogo.webp"];

  return (
    <div className="group relative w-full h-[300px] md:h-[460px] flex gap-2 p-2 overflow-hidden bg-primary/5 rounded-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative h-full overflow-hidden rounded-lg ${hasMultiple ? "w-2/3" : "w-full"}`}
      >
        <Image
          src={displayImages[0]}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>

      {hasMultiple && (
        <div className="w-1/3 flex flex-col gap-2 h-full">
          {displayImages.slice(1, 3).map((img, i) => (
            <div key={i} className="relative flex-1 w-full overflow-hidden rounded-lg bg-primary/10">
              <Image src={img} alt={alt} fill className="object-cover" />
              {i === 1 && displayImages.length > 3 && (
                <div className="absolute inset-0 bg-primary/60 flex flex-col items-center justify-center text-secondary">
                  <span className="text-xl font-bold font-display">+{displayImages.length - 3}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Orange corner accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ED985F] z-10" />
    </div>
  );
};

export default function Van_layout({ layout, currentParams = {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: layouts, pages: totalPages, page: currentPage } = layout;

  const [localFilters, setLocalFilters] = useState({
    wheelbase: [],
    model: [],
    sit: [],
    bathroomType: [],
    search: ""
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const filterGridRef = useRef(null);

  // Unfiltered baseline fetched once — keeps every dropdown showing ALL possible
  // options regardless of which filters are currently applied (backend narrows
  // `layout.filters` down to whatever matches the active query, so we don't use
  // that for populating options — only for reading which options are active).
  const [catalog, setCatalog] = useState({ models: [], sits: [], builds: [] });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await getAllPortfolio({ limit: 1000, is_published: true });
      if (cancelled || !res?.success) return;
      const allData = res.data?.data || [];
      setCatalog({
        models: res.data?.filters?.models || [],
        sits: res.data?.filters?.sits || [],
        builds: allData
          .filter((item) => item.slug && item.van_listing?.title)
          .map((item) => ({ slug: item.slug, title: item.van_listing.title }))
      });
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    setLocalFilters({
      wheelbase: currentParams.wheelbase ? currentParams.wheelbase.split(",") : [],
      model: currentParams.model ? currentParams.model.split(",") : [],
      sit: currentParams.sit ? currentParams.sit.split(",") : [],
      bathroomType: currentParams.bathroomType ? currentParams.bathroomType.split(",") : [],
      search: currentParams.search || ""
    });
  }, [currentParams]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (filterGridRef.current && !filterGridRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const handleCheckboxChange = (key, optionValue) => {
    setLocalFilters(prev => {
      const currentValues = prev[key];
      const updatedValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      return { ...prev, [key]: updatedValues };
    });
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(localFilters).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        params.set(key, values.join(","));
      } else if (typeof values === "string" && values.trim() !== "") {
        params.set(key, values.trim());
      }
    });
    params.set("page", "1");
    setOpenDropdown(null);
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const handleClearAll = () => {
    setLocalFilters({ wheelbase: [], model: [], sit: [], bathroomType: [], search: "" });
    setOpenDropdown(null);
    router.push(pathname);
  };

  const handleBuildJump = (slug) => {
    if (!slug) return;
    setOpenDropdown(null);
    router.push(`/van-layouts/${slug}`);
  };

  const handleWheelbaseGroupToggle = (groupValues) => {
    setLocalFilters(prev => {
      const current = prev.wheelbase;
      const isActive = groupValues.some(v => current.includes(v));
      const updatedValues = isActive
        ? current.filter(v => !groupValues.includes(v))
        : [...new Set([...current, ...groupValues])];
      return { ...prev, wheelbase: updatedValues };
    });
  };

  const handleShowerGroupToggle = (groupValues) => {
    setLocalFilters(prev => {
      const current = prev.bathroomType;
      const isActive = groupValues.some(v => current.includes(v));
      const updatedValues = isActive
        ? current.filter(v => !groupValues.includes(v))
        : [...new Set([...current, ...groupValues])];
      return { ...prev, bathroomType: updatedValues };
    });
  };

  const filterOptions = (options = []) => options.filter(Boolean).sort();

  const filterConfig = [
    { label: "Make Model", key: "model", options: filterOptions(catalog.models) },
    { label: "Seating", key: "sit", options: filterOptions(catalog.sits) },
  ];

  const hasActiveFilters = Object.keys(currentParams).length > 0;

  return (
    <main className="bg-secondary min-h-screen py-16">
      <div className="container mx-auto max-w-[1300px] px-6">

        {/* ── FILTER PANEL ── */}
        <div className="bg-white border border-primary/8 rounded-2xl shadow-sm mb-20 relative z-30">
          {/* Orange top accent */}
          <div className="h-[2px] w-full bg-[#ED985F] rounded-t-2xl" />

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-primary/6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ED985F]/10 rounded-lg">
                  <SlidersHorizontal size={18} className="text-[#ED985F]" />
                </div>
                <div>
                  <SpanTag text="Browse Layouts" className="mb-0.5" />
                  <Heading3 text="Filter Custom Builds" className="!mb-0 !text-primary" />
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleClearAll}
                  className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-[#ED985F] hover:text-primary flex items-center gap-1.5 transition-colors"
                >
                  <X size={12} /> Reset All
                </button>
              )}
            </div>

            {/* Filter inputs */}
            <div ref={filterGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-6">

              {/* Search */}
              <div className="space-y-2">
                <label className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/45 ml-1">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Keywords..."
                    value={localFilters.search}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-primary/10 rounded-xl font-ui text-sm text-primary placeholder:text-primary/30 focus:bg-white focus:border-[#ED985F]/40 focus:ring-2 focus:ring-[#ED985F]/10 outline-none transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30" size={15} />
                </div>
              </div>

              {/* Wheelbase (Short / Long) */}
              <div className="space-y-2 relative">
                <label className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/45 ml-1">
                  Wheelbase
                </label>

                <div
                  onClick={() => setOpenDropdown(openDropdown === "wheelbase" ? null : "wheelbase")}
                  className={`w-full px-4 py-3 bg-secondary border rounded-xl font-ui text-sm font-medium cursor-pointer flex items-center justify-between transition-all select-none ${
                    openDropdown === "wheelbase"
                      ? "border-[#ED985F]/40 bg-white shadow-sm"
                      : "border-primary/10 hover:border-primary/20"
                  }`}
                >
                  <span className={`truncate max-w-[140px] ${localFilters.wheelbase.length > 0 ? "text-[#ED985F]" : "text-primary/40"}`}>
                    {localFilters.wheelbase.length > 0
                      ? WHEELBASE_GROUPS.filter(g => g.values.some(v => localFilters.wheelbase.includes(v)))
                          .map(g => g.label)
                          .join(", ")
                      : "All"
                    }
                  </span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${openDropdown === "wheelbase" ? "rotate-180 text-[#ED985F]" : "text-primary/30"}`}
                  />
                </div>

                <AnimatePresence>
                  {openDropdown === "wheelbase" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-primary/10 shadow-xl rounded-xl p-3 max-h-60 overflow-y-auto z-50 space-y-1"
                    >
                      {WHEELBASE_GROUPS.map((group) => {
                        const isChecked = group.values.some(v => localFilters.wheelbase.includes(v));
                        return (
                          <label
                            key={group.key}
                            className="flex items-center gap-3 px-2 py-2 hover:bg-secondary rounded-lg cursor-pointer transition-colors select-none"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleWheelbaseGroupToggle(group.values)}
                              className="w-4 h-4 rounded border-primary/20 accent-[#ED985F] cursor-pointer"
                            />
                            <span className={`font-ui text-sm ${isChecked ? "text-[#ED985F] font-semibold" : "text-primary/70"}`}>
                              {group.label}
                            </span>
                          </label>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shower */}
              <div className="space-y-2 relative">
                <label className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/45 ml-1">
                  Shower
                </label>

                <div
                  onClick={() => setOpenDropdown(openDropdown === "shower" ? null : "shower")}
                  className={`w-full px-4 py-3 bg-secondary border rounded-xl font-ui text-sm font-medium cursor-pointer flex items-center justify-between transition-all select-none ${
                    openDropdown === "shower"
                      ? "border-[#ED985F]/40 bg-white shadow-sm"
                      : "border-primary/10 hover:border-primary/20"
                  }`}
                >
                  <span className={`truncate max-w-[140px] ${localFilters.bathroomType.length > 0 ? "text-[#ED985F]" : "text-primary/40"}`}>
                    {localFilters.bathroomType.length > 0
                      ? SHOWER_GROUPS.filter(g => g.values.some(v => localFilters.bathroomType.includes(v)))
                          .map(g => g.label)
                          .join(", ")
                      : "All"
                    }
                  </span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${openDropdown === "shower" ? "rotate-180 text-[#ED985F]" : "text-primary/30"}`}
                  />
                </div>

                <AnimatePresence>
                  {openDropdown === "shower" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-primary/10 shadow-xl rounded-xl p-3 max-h-60 overflow-y-auto z-50 space-y-1"
                    >
                      {SHOWER_GROUPS.map((group) => {
                        const isChecked = group.values.some(v => localFilters.bathroomType.includes(v));
                        return (
                          <label
                            key={group.key}
                            className="flex items-center gap-3 px-2 py-2 hover:bg-secondary rounded-lg cursor-pointer transition-colors select-none"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleShowerGroupToggle(group.values)}
                              className="w-4 h-4 rounded border-primary/20 accent-[#ED985F] cursor-pointer"
                            />
                            <span className={`font-ui text-sm ${isChecked ? "text-[#ED985F] font-semibold" : "text-primary/70"}`}>
                              {group.label}
                            </span>
                          </label>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Build (quick jump to a specific layout by name) */}
              <div className="space-y-2 relative">
                <label className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/45 ml-1">
                  Jump to Build
                </label>

                <div
                  onClick={() => setOpenDropdown(openDropdown === "build" ? null : "build")}
                  className={`w-full px-4 py-3 bg-secondary border rounded-xl font-ui text-sm font-medium cursor-pointer flex items-center justify-between transition-all select-none ${
                    openDropdown === "build"
                      ? "border-[#ED985F]/40 bg-white shadow-sm"
                      : "border-primary/10 hover:border-primary/20"
                  }`}
                >
                  <span className="truncate max-w-[140px] text-primary/40">
                    Select a build...
                  </span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${openDropdown === "build" ? "rotate-180 text-[#ED985F]" : "text-primary/30"}`}
                  />
                </div>

               <AnimatePresence>
  {openDropdown === "build" && (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-primary/10 shadow-xl rounded-xl p-3 max-h-60 overflow-y-auto z-50 space-y-1"
    >
      {catalog.builds.length === 0 ? (
        <div className="font-ui text-xs text-primary/30 italic py-2 text-center">
          Loading builds...
        </div>
      ) : (
        [...catalog.builds]
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((build) => (
            <button
              type="button"
              key={build.slug}
              onClick={() => handleBuildJump(build.slug)}
              className="w-full text-left flex items-center gap-3 px-2 py-2 hover:bg-secondary rounded-lg cursor-pointer transition-colors select-none"
            >
              <span className="font-ui text-sm text-primary/70">
                {build.title}
              </span>
            </button>
          ))
      )}
    </motion.div>
  )}
</AnimatePresence>
              </div>

              {/* Dropdown filters */}
              {filterConfig.map((f) => {
                const currentValues = localFilters[f.key] || [];
                const isOpen = openDropdown === f.key;

                return (
                  <div key={f.key} className="space-y-2 relative">
                    <label className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/45 ml-1">
                      {f.label}{currentValues.length > 0 && ` (${currentValues.length})`}
                    </label>

                    <div
                      onClick={() => setOpenDropdown(isOpen ? null : f.key)}
                      className={`w-full px-4 py-3 bg-secondary border rounded-xl font-ui text-sm font-medium cursor-pointer flex items-center justify-between transition-all select-none ${
                        isOpen
                          ? "border-[#ED985F]/40 bg-white shadow-sm"
                          : "border-primary/10 hover:border-primary/20"
                      }`}
                    >
                      <span className={`truncate max-w-[140px] ${currentValues.length > 0 ? "text-[#ED985F]" : "text-primary/40"}`}>
                        {currentValues.length > 0
                          ? currentValues.map(v => v.replace(/-+/g, " ").replace(/\b\w/g, c => c.toUpperCase())).join(", ")
                          : "All"
                        }
                      </span>
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[#ED985F]" : "text-primary/30"}`}
                      />
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-primary/10 shadow-xl rounded-xl p-3 max-h-60 overflow-y-auto z-50 space-y-1"
                        >
                          {f.options?.length === 0 ? (
                            <div className="font-ui text-xs text-primary/30 italic py-2 text-center">
                              No options available
                            </div>
                          ) : (
                            f.options.map((opt, i) => {
                              const isChecked = currentValues.includes(opt);
                              return (
                                <label
                                  key={i}
                                  className="flex items-center gap-3 px-2 py-2 hover:bg-secondary rounded-lg cursor-pointer transition-colors select-none"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleCheckboxChange(f.key, opt)}
                                    className="w-4 h-4 rounded border-primary/20 accent-[#ED985F] cursor-pointer"
                                  />
                                  <span className={`font-ui text-sm ${isChecked ? "text-[#ED985F] font-semibold" : "text-primary/70"}`}>
                                    {opt.replace(/-+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                  </span>
                                </label>
                              );
                            })
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Apply button */}
            <div className="flex justify-end pt-5 border-t border-primary/6">
              <button
                onClick={handleApplyFilters}
                className="w-full md:w-auto bg-primary hover:bg-[#ED985F] text-secondary font-ui font-semibold text-[11px] uppercase tracking-[0.18em] px-8 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Check size={14} /> Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* ── RESULTS GRID ── */}
        <AnimatePresence mode="wait">
          {layouts?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white border border-primary/8 rounded-2xl"
            >
              <Search size={40} className="mx-auto text-primary/15 mb-5" />
              <Heading3 text="No matching builds found." className="!text-primary/40" />
              <button
                onClick={handleClearAll}
                className="mt-5 font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-[#ED985F] hover:text-primary transition-colors"
              >
                Clear search and try again
              </button>
            </motion.div>
          ) : (
            <div className="space-y-24 md:space-y-36 relative z-10">
              {layouts.map((item, index) => {
                const isReversed = index % 2 !== 0;

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-20`}
                  >
                    {/* Text side */}
                    <div className="w-full lg:w-5/12 space-y-5 text-center lg:text-left">
                      <SpanTag text={`Build No. ${String(index + 1).padStart(2, "0")}`} />
                      <Heading2 text={item.van_listing?.title || "Custom Layout"} />
                      <RichParagraph>
                        {item.van_listing?.description}
                      </RichParagraph>

                      <div className="flex items-center justify-center lg:justify-start pt-2">
                        <Link
                          href={`/van-layouts/${item.slug}`}
                          className="inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-primary border border-primary/25 px-6 py-3 rounded-xl hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-200 group"
                        >
                          Explore Configuration
                          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </div>
                    </div>

                    {/* Image side */}
                    <div className="w-full lg:w-7/12">
                      <ProjectImages images={item.gallery} alt={item.van_listing?.title} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-8 mt-32 pt-10 border-t border-primary/8 relative z-10">
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(Number(currentPage) - 1));
                router.push(`${pathname}?${params.toString()}`);
              }}
              disabled={Number(currentPage) <= 1}
              className="p-3 rounded-xl border border-primary/20 bg-white text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#ED985F] hover:text-[#ED985F] transition-all"
            >
              <ArrowRight className="rotate-180" size={18} />
            </button>

            <span className="font-ui font-semibold text-[11px] uppercase tracking-[0.2em] text-primary/50">
              Page {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(Number(currentPage) + 1));
                router.push(`${pathname}?${params.toString()}`);
              }}
              disabled={Number(currentPage) >= totalPages}
              className="p-3 rounded-xl border border-primary/20 bg-white text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#ED985F] hover:text-[#ED985F] transition-all"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
