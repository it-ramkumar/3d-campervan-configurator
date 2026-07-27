"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FilterX,
  BedDouble,
  Flame,
  Hammer,
  ArrowRightIcon,
  LayoutTemplateIcon,
  X,
  SlidersHorizontal,
  ChevronDown,
  Check,
} from "lucide-react";
import { ImageWithSkeleton, SpanTag, Heading3 } from "../../Common/Common";
import FloorPlanHero from "./FloorPlanHero";

export default function All_Titles_Client() {
  const LIMIT = 12;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. URL Se active values read karein
  const selectedChassis = searchParams.get("category") || "ALL";
  const searchQueryFromURL = searchParams.get("search") || "";
  const bathroomFilterFromURL = searchParams.get("bathroomType") || "";
  const wheelbaseFilterFromURL = searchParams.get("wheelbase") || "";
  const seatingFilterFromURL = searchParams.get("seating") || "";

  const [localSearch, setLocalSearch] = useState(searchQueryFromURL);
  const [portfolios, setPortfolios] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const filterGridRef = useRef(null);

  // Backend se aane wale dynamic filter arrays ki states
  const [dbCategories, setDbCategories] = useState([]);
  const [dbBathrooms, setDbBathrooms] = useState([]);
  const [dbWheelbases, setDbWheelbases] = useState([]);
  const [dbSeatings, setDbSeatings] = useState([]);

  // 2. TEMPORARY STATES FOR CHECKBOXES (Apply button ke liye)
  const [tempBathrooms, setTempBathrooms] = useState([]);
  const [tempWheelbases, setTempWheelbases] = useState([]);
  const [tempSeatings, setTempSeatings] = useState([]);

  // URL badalne par temporary checkboxes ko sync rakhein
  useEffect(() => {
    setLocalSearch(searchQueryFromURL);
    setTempBathrooms(bathroomFilterFromURL ? bathroomFilterFromURL.split(",") : []);
    setTempWheelbases(wheelbaseFilterFromURL ? wheelbaseFilterFromURL.split(",") : []);
    setTempSeatings(seatingFilterFromURL ? seatingFilterFromURL.split(",") : []);
  }, [searchQueryFromURL, bathroomFilterFromURL, wheelbaseFilterFromURL, seatingFilterFromURL]);

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

  const updateURL = (params) => {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "ALL" || value === "") {
        sp.delete(key);
      } else {
        sp.set(key, value);
      }
    });
    router.push(`${pathname}?${sp.toString()}`);
  };

  // 3. Handle Checkbox Toggles (Only updates local state, does not trigger API)
  const handleLocalCheckboxToggle = (stateSetter, currentArray, value) => {
    if (currentArray.includes(String(value))) {
      stateSetter(currentArray.filter((item) => item !== String(value)));
    } else {
      stateSetter([...currentArray, String(value)]);
    }
  };

  // 4. APPLY BUTTON LOGIC: Ek sath saare filters URL mein bhejta hai
  const handleApplyFilters = () => {
    setOpenDropdown(null);
    updateURL({
      bathroomType: tempBathrooms.join(","),
      wheelbase: tempWheelbases.join(","),
      seating: tempSeatings.join(","),
      page: 1, // Filters badalne par page reset 1 par
    });
  };

  const handleClearFilters = () => {
    setLocalSearch("");
    setTempBathrooms([]);
    setTempWheelbases([]);
    setTempSeatings([]);
    setOpenDropdown(null);
    router.push(pathname);
  };

  const handleSearchCommit = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      updateURL({ search: localSearch.trim() });
    }
  };

  const fetchPortfolios = useCallback(async (pageNum, category, search, bathroom, wb, seat) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/portfolio/titles-only` +
        `?page=${pageNum}&limit=${LIMIT}` +
        `&category=${category !== "ALL" ? category : ""}` +
        `&search=${encodeURIComponent(search || "")}` +
        `&bathroomType=${encodeURIComponent(bathroom || "")}` +
        `&wheelbase=${encodeURIComponent(wb || "")}` +
        `&seating=${encodeURIComponent(seat || "")}` +
        `&t=${Date.now()}`;
      const res = await fetch(url, { cache: "no-store" });
      return res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false };
    }
  }, [LIMIT]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setPage(1);
      const res = await fetchPortfolios(
        1,
        selectedChassis,
        searchQueryFromURL,
        bathroomFilterFromURL,
        wheelbaseFilterFromURL,
        seatingFilterFromURL
      );
      if (res.success) {
        setPortfolios(res.data || []);
        setHasMore(1 < res.pages);
        if (res.categories) setDbCategories(res.categories);

        // Backend se dynamic unique options save karein
        if (res.filterOptions) {
          setDbBathrooms(res.filterOptions.bathrooms || []);
          setDbWheelbases(res.filterOptions.wheelbases || []);
          setDbSeatings(res.filterOptions.seatings || []);
        }
      }
      setLoading(false);
    };
    load();
  }, [selectedChassis, searchQueryFromURL, bathroomFilterFromURL, wheelbaseFilterFromURL, seatingFilterFromURL, fetchPortfolios]);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextPage = page + 1;
    const res = await fetchPortfolios(
      nextPage,
      selectedChassis,
      searchQueryFromURL,
      bathroomFilterFromURL,
      wheelbaseFilterFromURL,
      seatingFilterFromURL
    );
    if (res.success) {
      setPortfolios((prev) => [...prev, ...(res.data || [])]);
      setPage(nextPage);
      setHasMore(nextPage < res.pages);
    }
    setLoading(false);
  };

  const getCategoryLabel = (slug) => {
    const map = {
      "amsterdam": "Amsterdam",
      "flagship-long-van-montreal": "Montreal",
      "flagship-short-van-santa-monica": "Santa Monica",
      "layouts-for-families-3-9-people": "Families",
      "layouts-for-solo-and-couple-travelers": "Solo & Couples",
      "portfolio-of-custom-builds": "Custom Builds",
      "sugarloaf": "Sugarloaf",
    };
    return map[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  const getWheelbaseLabel = (wb) => {
    const map = {
      "144": "Sprinter 144\"",
      "170": "Sprinter 170\"",
      "148": "Transit 148\"",
      "159": "ProMaster 159\"",
    };
    return map[wb] || (wb ? `${wb}"` : "Custom");
  };

  const isFilterActive =
    selectedChassis !== "ALL" ||
    searchQueryFromURL !== "" ||
    bathroomFilterFromURL !== "" ||
    wheelbaseFilterFromURL !== "" ||
    seatingFilterFromURL !== "";

  return (
    <>
      <FloorPlanHero
        title="Camper Van Floor Plans for Every Adventure"
        description="Explore our camper van floor plans, thoughtfully designed for solo travelers, families, pet owners, and moto enthusiasts. Find the perfect layout for your next adventure."
        image={portfolios[0]?.rendering?.[0]}
      />

      <div className="bg-secondary min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">

    {/* ── FILTER BAR ── */}
<div className="bg-white border border-primary/8 rounded-2xl shadow-sm mb-8 relative z-30">
  <div className="h-[2px] w-full bg-[#ED985F] rounded-t-2xl" />

  <div className="p-6 md:p-8">

    {/* Header & Results Count */}
    <div className="flex items-center justify-between mb-8 pb-5 border-b border-primary/6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#ED985F]/10 rounded-lg">
          <SlidersHorizontal size={18} className="text-[#ED985F]" />
        </div>
        <div>
          <SpanTag text="Browse Floor Plans" className="mb-0.5" />
          <Heading3 text="Filter Layouts" className="!mb-0 !text-xl md:!text-2xl !text-primary" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-ui font-semibold text-xs text-primary/60 bg-secondary px-3 py-1.5 rounded-lg border border-primary/6">
          {portfolios.length} {portfolios.length === 1 ? "Result" : "Results"}
        </span>
        {isFilterActive && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-[#ED985F] hover:text-primary flex items-center gap-1.5 transition-colors"
          >
            <X size={12} /> Reset All
          </button>
        )}
      </div>
    </div>

    {/* Click-to-toggle dropdowns (not hover) so they work on touch/mobile devices. Panels always
        open downward below their trigger. */}
    <div ref={filterGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-6">

      {/* Search */}
      <div className="space-y-2">
        <label className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/45 ml-1">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleSearchCommit}
            onBlur={handleSearchCommit}
            placeholder="Search layouts..."
            className="w-full pl-10 pr-4 py-3 bg-secondary border border-primary/10 rounded-xl font-ui text-sm text-primary placeholder:text-primary/30 focus:bg-white focus:border-[#ED985F]/40 focus:ring-2 focus:ring-[#ED985F]/10 outline-none transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30" size={15} />
        </div>
      </div>

      {/* Chassis (single-select, applies instantly) */}
      <div className="space-y-2 relative">
        <label className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/45 ml-1">
          Chassis
        </label>
        <div
          onClick={() => setOpenDropdown(openDropdown === "chassis" ? null : "chassis")}
          className={`w-full px-4 py-3 bg-secondary border rounded-xl font-ui text-sm font-medium cursor-pointer flex items-center justify-between transition-all select-none ${
            openDropdown === "chassis" ? "border-[#ED985F]/40 bg-white shadow-sm" : "border-primary/10 hover:border-primary/20"
          }`}
        >
          <span className={`truncate max-w-[140px] ${selectedChassis !== "ALL" ? "text-[#ED985F]" : "text-primary/40"}`}>
            {selectedChassis !== "ALL" ? getCategoryLabel(selectedChassis) : "All"}
          </span>
          <ChevronDown size={15} className={`transition-transform duration-200 ${openDropdown === "chassis" ? "rotate-180 text-[#ED985F]" : "text-primary/30"}`} />
        </div>
        <AnimatePresence>
          {openDropdown === "chassis" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-primary/10 shadow-xl rounded-xl p-3 max-h-60 overflow-y-auto z-50 space-y-1"
            >
              <button
                type="button"
                onClick={() => { updateURL({ category: "ALL" }); setOpenDropdown(null); }}
                className={`w-full text-left font-ui text-sm px-2 py-2 rounded-lg transition-colors duration-150 ${
                  selectedChassis === "ALL" ? "text-[#ED985F] font-semibold bg-secondary" : "text-primary/70 hover:bg-secondary"
                }`}
              >
                All Chassis
              </button>
              {dbCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { updateURL({ category: cat }); setOpenDropdown(null); }}
                  className={`w-full text-left font-ui text-sm px-2 py-2 rounded-lg transition-colors duration-150 ${
                    selectedChassis === cat ? "text-[#ED985F] font-semibold bg-secondary" : "text-primary/70 hover:bg-secondary"
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bathroom */}
      <div className="space-y-2 relative">
        <label className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/45 ml-1">
          Bathroom{tempBathrooms.length > 0 && ` (${tempBathrooms.length})`}
        </label>
        <div
          onClick={() => setOpenDropdown(openDropdown === "bathroom" ? null : "bathroom")}
          className={`w-full px-4 py-3 bg-secondary border rounded-xl font-ui text-sm font-medium cursor-pointer flex items-center justify-between transition-all select-none ${
            openDropdown === "bathroom" ? "border-[#ED985F]/40 bg-white shadow-sm" : "border-primary/10 hover:border-primary/20"
          }`}
        >
          <span className={`truncate max-w-[140px] ${tempBathrooms.length > 0 ? "text-[#ED985F]" : "text-primary/40"}`}>
            {tempBathrooms.length > 0 ? tempBathrooms.join(", ") : "All"}
          </span>
          <ChevronDown size={15} className={`transition-transform duration-200 ${openDropdown === "bathroom" ? "rotate-180 text-[#ED985F]" : "text-primary/30"}`} />
        </div>
        <AnimatePresence>
          {openDropdown === "bathroom" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-primary/10 shadow-xl rounded-xl p-3 max-h-60 overflow-y-auto z-50 space-y-1"
            >
              {dbBathrooms.length === 0 ? (
                <div className="font-ui text-xs text-primary/30 italic py-2 text-center">
                  No options available
                </div>
              ) : (
                dbBathrooms.map((type) => {
                  const isChecked = tempBathrooms.includes(type);
                  return (
                    <label key={type} className="flex items-center gap-3 px-2 py-2 hover:bg-secondary rounded-lg cursor-pointer transition-colors select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleLocalCheckboxToggle(setTempBathrooms, tempBathrooms, type)}
                        className="w-4 h-4 rounded border-primary/20 accent-[#ED985F] cursor-pointer"
                      />
                      <span className={`font-ui text-sm ${isChecked ? "text-[#ED985F] font-semibold" : "text-primary/70"}`}>
                        {type}
                      </span>
                    </label>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wheelbase */}
      <div className="space-y-2 relative">
        <label className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/45 ml-1">
          Wheelbase{tempWheelbases.length > 0 && ` (${tempWheelbases.length})`}
        </label>
        <div
          onClick={() => setOpenDropdown(openDropdown === "wheelbase" ? null : "wheelbase")}
          className={`w-full px-4 py-3 bg-secondary border rounded-xl font-ui text-sm font-medium cursor-pointer flex items-center justify-between transition-all select-none ${
            openDropdown === "wheelbase" ? "border-[#ED985F]/40 bg-white shadow-sm" : "border-primary/10 hover:border-primary/20"
          }`}
        >
          <span className={`truncate max-w-[140px] ${tempWheelbases.length > 0 ? "text-[#ED985F]" : "text-primary/40"}`}>
            {tempWheelbases.length > 0 ? tempWheelbases.map((wb) => getWheelbaseLabel(wb)).join(", ") : "All"}
          </span>
          <ChevronDown size={15} className={`transition-transform duration-200 ${openDropdown === "wheelbase" ? "rotate-180 text-[#ED985F]" : "text-primary/30"}`} />
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
              {dbWheelbases.length === 0 ? (
                <div className="font-ui text-xs text-primary/30 italic py-2 text-center">
                  No options available
                </div>
              ) : (
                dbWheelbases.map((wb) => {
                  const isChecked = tempWheelbases.includes(String(wb));
                  return (
                    <label key={wb} className="flex items-center gap-3 px-2 py-2 hover:bg-secondary rounded-lg cursor-pointer transition-colors select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleLocalCheckboxToggle(setTempWheelbases, tempWheelbases, wb)}
                        className="w-4 h-4 rounded border-primary/20 accent-[#ED985F] cursor-pointer"
                      />
                      <span className={`font-ui text-sm ${isChecked ? "text-[#ED985F] font-semibold" : "text-primary/70"}`}>
                        {getWheelbaseLabel(String(wb))}
                      </span>
                    </label>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Seats */}
      <div className="space-y-2 relative">
        <label className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/45 ml-1">
          Seats{tempSeatings.length > 0 && ` (${tempSeatings.length})`}
        </label>
        <div
          onClick={() => setOpenDropdown(openDropdown === "seats" ? null : "seats")}
          className={`w-full px-4 py-3 bg-secondary border rounded-xl font-ui text-sm font-medium cursor-pointer flex items-center justify-between transition-all select-none ${
            openDropdown === "seats" ? "border-[#ED985F]/40 bg-white shadow-sm" : "border-primary/10 hover:border-primary/20"
          }`}
        >
          <span className={`truncate max-w-[140px] ${tempSeatings.length > 0 ? "text-[#ED985F]" : "text-primary/40"}`}>
            {tempSeatings.length > 0 ? tempSeatings.map((s) => `${s} Seats`).join(", ") : "All"}
          </span>
          <ChevronDown size={15} className={`transition-transform duration-200 ${openDropdown === "seats" ? "rotate-180 text-[#ED985F]" : "text-primary/30"}`} />
        </div>
        <AnimatePresence>
          {openDropdown === "seats" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-primary/10 shadow-xl rounded-xl p-3 max-h-60 overflow-y-auto z-50 space-y-1"
            >
              {dbSeatings.length === 0 ? (
                <div className="font-ui text-xs text-primary/30 italic py-2 text-center">
                  No options available
                </div>
              ) : (
                dbSeatings.map((seat) => {
                  const isChecked = tempSeatings.includes(String(seat));
                  return (
                    <label key={seat} className="flex items-center gap-3 px-2 py-2 hover:bg-secondary rounded-lg cursor-pointer transition-colors select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleLocalCheckboxToggle(setTempSeatings, tempSeatings, seat)}
                        className="w-4 h-4 rounded border-primary/20 accent-[#ED985F] cursor-pointer"
                      />
                      <span className={`font-ui text-sm ${isChecked ? "text-[#ED985F] font-semibold" : "text-primary/70"}`}>
                        {seat} Seats
                      </span>
                    </label>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>

    {/* Apply button */}
    <div className="flex justify-end pt-5 border-t border-primary/6">
      <button
        type="button"
        onClick={handleApplyFilters}
        className="w-full md:w-auto bg-primary hover:bg-[#ED985F] text-secondary font-ui font-semibold text-[11px] uppercase tracking-[0.18em] px-8 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
      >
        <Check size={14} /> Apply Filters
      </button>
    </div>

  </div>
</div>

          {/* ── GRID ── */}
          {portfolios.length > 0 ? (
            <div className="space-y-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {portfolios.map((item) => {
                  const path = `/layout-detail/${item.slug}?view=floorplan`;
                  const hasRenderings = item.rendering && item.rendering.length > 0;
                  const displayImage = (hoveredId === item._id && item.rendering?.length > 1)
                    ? item.rendering[1]
                    : item.rendering?.[0];

                  const wb = item.van_listing?.specifications?.wheelbase;
                  const bathType = item.van_listing?.bathroomType || "No Bath";
                  const seatingCap = item.van_listing?.seating || "2";

                  return (
                    <Link key={item._id} href={path} className="block group h-full">
                      <div
                        onMouseEnter={() => setHoveredId(item._id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="relative bg-white border border-primary/8 hover:border-[#ED985F]/30 rounded-xl transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-xl hover:-translate-y-1"
                      >
                        {/* Image */}
                        <div className="relative h-52 w-full overflow-hidden bg-primary/5">
                          {hasRenderings ? (
                            <ImageWithSkeleton
                              src={displayImage}
                              alt={item.van_listing?.title || "Floor plan"}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                              <LayoutTemplateIcon size={28} className="text-primary/15 mb-2" />
                              <span className="font-ui text-[10px] uppercase tracking-[0.15em] text-primary/25">Blueprint Processing</span>
                            </div>
                          )}

                          {/* Wheelbase badge */}
                          {wb && (
                            <div className="absolute top-3 left-3 z-10">
                              <span className="font-ui font-semibold text-[9px] uppercase tracking-[0.15em] text-[#ED985F] bg-white/90 border border-[#ED985F]/25 px-2.5 py-1 rounded-lg shadow-sm">
                                {getWheelbaseLabel(wb)}
                              </span>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        </div>

                        {/* Card body */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div>
                              <span className="font-ui font-semibold text-[9px] uppercase tracking-[0.18em] text-primary/35 block mb-1">
                                Floor Plan
                              </span>
                              <h3 className="font-display font-bold text-lg leading-snug text-primary truncate">
                                {item.van_listing?.title || "Standard Layout"}
                              </h3>
                            </div>

                            {/* Dynamic Chips from Backend */}
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-secondary rounded-lg border border-primary/6">
                                <BedDouble size={13} className="text-[#ED985F] shrink-0" />
                                <span className="font-ui font-semibold text-[10px] text-primary/70">{seatingCap} Seating</span>
                              </div>
                              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-secondary rounded-lg border border-primary/6">
                                <Flame size={13} className="text-[#ED985F] shrink-0" />
                                <span className="font-ui font-semibold text-[10px] text-primary/70 truncate">{bathType}</span>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="mt-5 pt-4 border-t border-primary/6 flex flex-col gap-2">
                            <button
                              type="button"
                              className="w-full py-2 px-3 rounded-xl font-ui font-semibold text-[10px] uppercase tracking-[0.15em] bg-primary text-secondary border border-primary hover:bg-[#ED985F] hover:border-[#ED985F] transition-all duration-200 flex items-center justify-center gap-2"
                            >
                              <Hammer size={12} /> View Built Vans
                            </button>

                            <div className="flex items-center justify-between px-1 pt-0.5">
                              <span className="font-ui font-semibold text-[9px] uppercase tracking-[0.15em] text-primary/30">
                                View Details
                              </span>
                              <ArrowRightIcon size={13} className="text-[#ED985F] group-hover:translate-x-1 transition-transform duration-200" />
                            </div>
                          </div>
                        </div>

                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="flex flex-col items-center pt-6 border-t border-primary/8">
                  <div className="w-12 h-[3px] bg-[#ED985F] mb-8 rounded-full" />
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="font-ui font-semibold text-[11px] uppercase tracking-[0.18em] bg-primary text-secondary border border-primary px-12 py-3 rounded-xl hover:bg-[#ED985F] hover:border-[#ED985F] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Load More Floor Plans"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            !loading && (
              <div className="py-24 text-center bg-white border border-primary/8 rounded-2xl max-w-md mx-auto px-6">
                <FilterX size={32} className="mx-auto text-primary/15 mb-4" />
                <h3 className="font-display font-bold text-xl text-primary mb-2">No Matching Layouts</h3>
                <p className="font-ui text-sm text-primary/45 mb-5">
                  No floor plans match your current filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-[#ED985F] hover:text-primary transition-colors"
                >
                  Clear filters and try again
                </button>
              </div>
            )
          )}

          {/* Loading Skeletons */}
          {loading && portfolios.length === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white border border-primary/8 rounded-xl overflow-hidden h-[400px] flex flex-col animate-pulse">
                  <div className="h-52 bg-primary/5 w-full" />
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-2.5 bg-primary/6 rounded w-1/4" />
                      <div className="h-5 bg-primary/8 rounded w-3/4" />
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="h-7 bg-secondary rounded-lg" />
                        <div className="h-7 bg-secondary rounded-lg" />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="h-8 bg-primary/6 rounded-xl w-full" />
                      <div className="h-2.5 bg-primary/4 rounded w-1/3 mx-auto" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}