"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";
import { ImageWithSkeleton, SpanTag } from "../../Common/Common";
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
{/* Yahan se overflow-hidden ko hata kar safe kiya gaya hai taaki dropdowns baahar float kar sakein */}
<div className="bg-white border border-primary/8 rounded-2xl shadow-sm mb-8 relative">
  {/* Rounded corners border match karne ke liye custom top bar divider */}
  <div className="h-[2px] w-full bg-[#ED985F] rounded-t-2xl absolute top-0 left-0" />

  <div className="p-5 md:p-6 pt-6">

    {/* Header & Results Count */}
    <div className="flex items-center justify-between mb-5 pb-4 border-b border-primary/6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#ED985F]/10 rounded-lg">
          <SlidersHorizontal size={16} className="text-[#ED985F]" />
        </div>
        <SpanTag text="Browse Floor Plans" className="mb-0" />
      </div>
      <span className="font-ui font-semibold text-xs text-primary/60 bg-secondary px-3 py-1.5 rounded-lg border border-primary/6">
        {portfolios.length} {portfolios.length === 1 ? "Result" : "Results"}
      </span>
    </div>

    {/* Search Input Box */}
    <div className="relative w-full mb-5">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onKeyDown={handleSearchCommit}
        onBlur={handleSearchCommit}
        placeholder="Search layouts..."
        className="w-full bg-secondary border border-primary/10 rounded-xl pl-11 pr-4 py-3 font-ui text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-[#ED985F]/40 focus:ring-2 focus:ring-[#ED985F]/10 transition-all"
      />
    </div>

    {/* ── DROPDOWNS ROW ── */}
    {/* relative aur high z-index (z-40) ensure karega ki dropdown niche wale grid section se upar rahein */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 relative z-40">

      {/* 1. Chassis Dropdown */}
      <div className="relative group">
        <button
          type="button"
          className="w-full flex items-center justify-between bg-secondary border border-primary/10 rounded-xl px-4 py-2.5 font-ui text-xs font-semibold uppercase tracking-wider text-primary/80 hover:border-[#ED985F]/40 transition-all"
        >
          <span>Chassis {selectedChassis !== "ALL" ? `(${getCategoryLabel(selectedChassis)})` : "▼"}</span>
        </button>
        <div className="absolute left-0 mt-1 w-56 bg-white border border-primary/8 rounded-xl shadow-xl p-3 hidden group-hover:block hover:block z-50 max-h-60 overflow-y-auto">
          <button
            type="button"
            onClick={() => updateURL({ category: "ALL" })}
            className={`w-full text-left font-ui text-xs uppercase tracking-wider px-3 py-2 rounded-lg transition-all mb-1 ${
              selectedChassis === "ALL" ? "bg-primary text-secondary" : "hover:bg-secondary text-primary/70"
            }`}
          >
            All Chassis
          </button>
          {dbCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateURL({ category: cat })}
              className={`w-full text-left font-ui text-xs uppercase tracking-wider px-3 py-2 rounded-lg transition-all mb-1 ${
                selectedChassis === cat ? "bg-primary text-secondary" : "hover:bg-secondary text-primary/70"
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Bathroom Dropdown */}
      <div className="relative group">
        <button
          type="button"
          className="w-full flex items-center justify-between bg-secondary border border-primary/10 rounded-xl px-4 py-2.5 font-ui text-xs font-semibold uppercase tracking-wider text-primary/80 hover:border-[#ED985F]/40 transition-all"
        >
          <span>Bathroom {tempBathrooms.length > 0 ? `(${tempBathrooms.length})` : "▼"}</span>
        </button>
        <div className="absolute left-0 mt-1 w-56 bg-white border border-primary/8 rounded-xl shadow-xl p-3 hidden group-hover:block hover:block z-50 max-h-60 overflow-y-auto">
          {dbBathrooms.length > 0 ? (
            <div className="flex flex-col gap-2">
              {dbBathrooms.map((type) => (
                <label key={type} className="flex items-center gap-2 font-ui text-xs text-primary/80 cursor-pointer hover:text-primary transition-colors py-0.5">
                  <input
                    type="checkbox"
                    checked={tempBathrooms.includes(type)}
                    onChange={() => handleLocalCheckboxToggle(setTempBathrooms, tempBathrooms, type)}
                    className="rounded border-primary/20 text-[#ED985F] focus:ring-[#ED985F]/30"
                  />
                  {type}
                </label>
              ))}
            </div>
          ) : (
            <span className="font-ui text-xs text-primary/40 block text-center py-2">No options</span>
          )}
        </div>
      </div>

      {/* 3. Wheelbase Dropdown */}
      <div className="relative group">
        <button
          type="button"
          className="w-full flex items-center justify-between bg-secondary border border-primary/10 rounded-xl px-4 py-2.5 font-ui text-xs font-semibold uppercase tracking-wider text-primary/80 hover:border-[#ED985F]/40 transition-all"
        >
          <span>Wheelbase {tempWheelbases.length > 0 ? `(${tempWheelbases.length})` : "▼"}</span>
        </button>
        <div className="absolute left-0 mt-1 w-56 bg-white border border-primary/8 rounded-xl shadow-xl p-3 hidden group-hover:block hover:block z-50 max-h-60 overflow-y-auto">
          {dbWheelbases.length > 0 ? (
            <div className="flex flex-col gap-2">
              {dbWheelbases.map((wb) => (
                <label key={wb} className="flex items-center gap-2 font-ui text-xs text-primary/80 cursor-pointer hover:text-primary transition-colors py-0.5">
                  <input
                    type="checkbox"
                    checked={tempWheelbases.includes(String(wb))}
                    onChange={() => handleLocalCheckboxToggle(setTempWheelbases, tempWheelbases, wb)}
                    className="rounded border-primary/20 text-[#ED985F] focus:ring-[#ED985F]/30"
                  />
                  {getWheelbaseLabel(String(wb))}
                </label>
              ))}
            </div>
          ) : (
            <span className="font-ui text-xs text-primary/40 block text-center py-2">No options</span>
          )}
        </div>
      </div>

      {/* 4. Seats Dropdown */}
      <div className="relative group">
        <button
          type="button"
          className="w-full flex items-center justify-between bg-secondary border border-primary/10 rounded-xl px-4 py-2.5 font-ui text-xs font-semibold uppercase tracking-wider text-primary/80 hover:border-[#ED985F]/40 transition-all"
        >
          <span>Seats {tempSeatings.length > 0 ? `(${tempSeatings.length})` : "▼"}</span>
        </button>
        {/* Right side alignment safe layout for extreme or grid edge visibility */}
        <div className="absolute right-0 mt-1 w-56 bg-white border border-primary/8 rounded-xl shadow-xl p-3 hidden group-hover:block hover:block z-50 max-h-60 overflow-y-auto">
          {dbSeatings.length > 0 ? (
            <div className="flex flex-col gap-2">
              {dbSeatings.map((seat) => (
                <label key={seat} className="flex items-center gap-2 font-ui text-xs text-primary/80 cursor-pointer hover:text-primary transition-colors py-0.5">
                  <input
                    type="checkbox"
                    checked={tempSeatings.includes(String(seat))}
                    onChange={() => handleLocalCheckboxToggle(setTempSeatings, tempSeatings, seat)}
                    className="rounded border-primary/20 text-[#ED985F] focus:ring-[#ED985F]/30"
                  />
                  {seat} Seats
                </label>
              ))}
            </div>
          ) : (
            <span className="font-ui text-xs text-primary/40 block text-center py-2">No options</span>
          )}
        </div>
      </div>

    </div>

    {/* ── ACTION BUTTONS ROW ── */}
    <div className="flex justify-end gap-3 pt-3 border-t border-primary/6 relative z-10">
      {isFilterActive && (
        <button
          type="button"
          onClick={handleClearFilters}
          className="px-6 py-2 rounded-xl font-ui font-semibold text-[11px] uppercase tracking-[0.15em] bg-secondary text-primary/70 border border-primary/10 hover:border-[#ED985F]/40 hover:text-primary transition-all flex items-center gap-2 cursor-pointer"
        >
          <FilterX size={13} /> Clear Filters
        </button>
      )}
      <button
        type="button"
        onClick={handleApplyFilters}
        className="px-6 py-2 rounded-xl font-ui font-semibold text-[11px] uppercase tracking-[0.15em] bg-[#ED985F] text-white hover:bg-primary transition-all shadow-sm cursor-pointer"
      >
        Apply Filters
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