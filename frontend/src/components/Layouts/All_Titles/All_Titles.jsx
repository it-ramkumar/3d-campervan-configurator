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
  ChevronDown,
  X
} from "lucide-react";
import { SecondaryButton, ImageWithSkeleton } from "../../Common/Common";

export default function All_Titles_Client() {
  const LIMIT = 12;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL as single source of truth for query filtering
  const selectedChassis = searchParams.get("category") || "ALL";
  const searchQueryFromURL = searchParams.get("search") || "";

  // Local state for instant typing (Avoids immediate API hit)
  const [localSearch, setLocalSearch] = useState(searchQueryFromURL);

  // Dynamic Categories container extracted directly via backend schema distinct lookups
  const [dbCategories, setDbCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [portfolios, setPortfolios] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  // Sync local input state if URL updates from external events
  useEffect(() => {
    setLocalSearch(searchQueryFromURL);
  }, [searchQueryFromURL]);

  // Dynamic Dropdown Document handler to automatically close panel when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const closeDropdown = () => setDropdownOpen(false);
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, [dropdownOpen]);

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

  // Pure state reset cleanup utility
  const handleClearFilters = () => {
    setLocalSearch("");
    router.push(pathname);
  };

  // Trigger search on KeyDown (Enter) or OnBlur
  const handleSearchCommit = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      updateURL({ search: localSearch.trim() });
    }
  };

  const fetchPortfolios = useCallback(async (pageNum, category, search) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/portfolio/titles-only` +
        `?page=${pageNum}&limit=${LIMIT}` +
        `&category=${category !== "ALL" ? category : ""}` +
        `&search=${encodeURIComponent(search || "")}` +
        `&t=${Date.now()}`;

      const res = await fetch(url, { cache: "no-store" });
      return res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false };
    }
  }, [LIMIT]);

  // RESET & LOAD when verified URL parameters change
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setPage(1);

      const res = await fetchPortfolios(1, selectedChassis, searchQueryFromURL);

      if (res.success) {
        setPortfolios(res.data || []);
        setHasMore(1 < res.pages);
        // Safely map dynamic dynamic category list from upstream payload
        if (res.categories) {
          setDbCategories(res.categories);
        }
      }
      setLoading(false);
    };

    load();
  }, [selectedChassis, searchQueryFromURL, fetchPortfolios]);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    const res = await fetchPortfolios(nextPage, selectedChassis, searchQueryFromURL);

    if (res.success) {
      setPortfolios((prev) => [...prev, ...(res.data || [])]);
      setPage(nextPage);
      setHasMore(nextPage < res.pages);
    }
    setLoading(false);
  };

  // Chassis Badging System Lookups
  const getPlatformMeta = (wb) => {
    const config = {
      "144": { label: "Sprinter 144\"", style: "bg-emerald-50 text-emerald-700 border-emerald-100" },
      "170": { label: "Sprinter 170\"", style: "bg-teal-50 text-teal-700 border-teal-100" },
      "148": { label: "Transit 148\"", style: "bg-blue-50 text-blue-700 border-blue-100" },
      "159": { label: "ProMaster 159\"", style: "bg-indigo-50 text-indigo-700 border-indigo-100" }
    };
    return config[wb] || { label: wb || "Custom Chassis", style: "bg-slate-50 text-slate-600 border-slate-100" };
  };

  const isFilterActive = selectedChassis !== "ALL" || searchQueryFromURL !== "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 antialiased">

      {/* --- COMPACT INTERACTIVE MANAGEMENT UTILITY BAR --- */}
      <div className="bg-white rounded-lg border border-slate-200/80 p-4 mb-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">

        {/* DYNAMIC CATEGORY DROPDOWN */}
        <div className="relative w-full md:w-72" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-700 font-bold tracking-wide flex items-center justify-between hover:bg-slate-100 transition-all focus:outline-none"
          >
            <span className="uppercase">
              {selectedChassis === "ALL" ? "All Architecture Categories" : `Category: ${getPlatformMeta(selectedChassis).label}`}
            </span>
            <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                type="button"
                onClick={() => { updateURL({ category: "ALL" }); setDropdownOpen(false); }}
                className={`w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedChassis === "ALL" ? "bg-[#001F3D] text-white" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                All Architecture Categories
              </button>

              {dbCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { updateURL({ category: cat }); setDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    selectedChassis === cat ? "bg-[#001F3D] text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {getPlatformMeta(cat).label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Realtime Enter-based Search input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleSearchCommit}
            onBlur={handleSearchCommit}
            placeholder="Type and press Enter to search..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#001F3D]/20 focus:border-[#001F3D] transition-all"
          />
        </div>
      </div>

      {/* --- ACTIVE FILTER STATUS & CLEAR BAR --- */}
      {isFilterActive && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200/60 rounded-lg p-3 mb-8 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Active Queries:</span>

            {selectedChassis !== "ALL" && (
              <span className="inline-flex items-center gap-1.5 bg-[#001F3D] text-white text-[10px] font-bold uppercase tracking-wider pl-2.5 pr-1.5 py-1 rounded-md shadow-sm">
                Category: {getPlatformMeta(selectedChassis).label}
                <button onClick={() => updateURL({ category: "ALL" })} className="hover:bg-white/20 p-0.5 rounded transition-colors">
                  <X size={12} />
                </button>
              </span>
            )}

            {searchQueryFromURL !== "" && (
              <span className="inline-flex items-center gap-1.5 bg-[#001F3D] text-white text-[10px] font-bold uppercase tracking-wider pl-2.5 pr-1.5 py-1 rounded-md shadow-sm">
                Query: "{searchQueryFromURL}"
                <button onClick={() => { setLocalSearch(""); updateURL({ search: "" }); }} className="hover:bg-white/20 p-0.5 rounded transition-colors">
                  <X size={12} />
                </button>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleClearFilters}
            className="text-[11px] font-extrabold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/70 px-3 py-1.5 rounded-lg border border-rose-200/40 transition-all uppercase tracking-wider flex items-center gap-1"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* --- GRID RENDERING MATRIX --- */}
      {portfolios.length > 0 ? (
        <div className="space-y-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {portfolios.map((item) => {
              const path = `/floorplans/${item.slug}`;
              const isActive = pathname === path;
              const hasRenderings = item.rendering && item.rendering.length > 0;

              // Image swapping logic during card hovering
              const displayImage = (hoveredId === item._id && item.rendering?.length > 1)
                ? item.rendering[1]
                : item.rendering?.[0];

              const wb = item.van_listing?.specifications?.wheelbase;
              const meta = getPlatformMeta(wb);
              const capacitySleep = item.category?.some(c => c.includes('families')) ? "3-4" : "2";

              return (
                <Link key={item._id} href={path} className="block group h-full">
                  <div
                    onMouseEnter={() => setHoveredId(item._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative rounded-lg border transition-all duration-300 flex flex-col h-full overflow-hidden ${
                      isActive
                        ? "bg-[#001F3D] border-[#001F3D] text-white shadow-xl ring-4 ring-[#001F3D]/10"
                        : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    {/* Media Layer Frame */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      {hasRenderings ? (
                        <ImageWithSkeleton
                          src={displayImage}
                          alt={item.van_listing?.title || "Layout structural map"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50">
                          <LayoutTemplateIcon size={32} className="stroke-[1.2] mb-2 text-slate-300" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Blueprint Processing</span>
                        </div>
                      )}

                      {/* Floating Chassis Tag */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`text-[10px] font-extrabold tracking-wide px-3 py-1 rounded-lg border shadow-sm uppercase ${
                          isActive ? 'bg-white/10 border-white/20 text-white' : meta.style
                        }`}>
                          {meta.label}
                        </span>
                      </div>
                    </div>

                    {/* Metadata Content Block */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isActive ? 'text-white/50' : 'text-slate-400'}`}>
                            Structural Architecture
                          </span>
                          <h3 className={`text-lg font-bold tracking-tight leading-snug truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                            {item.van_listing?.title || "Standard Layout Platform"}
                          </h3>
                        </div>

                        {/* Structural Features Chips Grid */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${isActive ? 'bg-white/5 text-white/90' : 'bg-slate-50 text-slate-600'}`}>
                            <BedDouble size={14} className="text-[#ED985F]" />
                            <span>Sleeps {capacitySleep}</span>
                          </div>
                          <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${isActive ? 'bg-white/5 text-white/90' : 'bg-slate-50 text-slate-600'}`}>
                            <Flame size={14} className="text-[#ED985F]" />
                            <span>Full Kitchen</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Footer */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                        <button
                          type="button"
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 border ${
                            isActive
                              ? "bg-[#ED985F] border-[#ED985F] text-white hover:bg-[#d67e45]"
                              : "bg-[#001F3D] border-[#001F3D] text-white hover:bg-[#001428]"
                          }`}
                        >
                          <Hammer size={13} /> View Built Vans
                        </button>

                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider px-1 pt-1">
                          <span className={isActive ? 'text-white/60' : 'text-slate-400'}>Inspect Geometry</span>
                          <ArrowRightIcon size={14} className={`transition-transform ${isActive ? 'text-white' : 'text-[#ED985F]'} group-hover:translate-x-1`} />
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>

          {/* --- PAGINATION CONTROL LAYER --- */}
          {hasMore && (
            <div className="flex justify-center pt-6 border-t border-slate-100">
              <SecondaryButton
                onClick={handleLoadMore}
                disabled={loading}
                className="!bg-[#001F3D] hover:!bg-[#001428] !text-white !px-16 !py-3.5 !rounded-lg !font-bold shadow-md transition-all duration-200"
                label={loading ? "Syncing Platform Records..." : "Load More Architectural Frameworks"}
              />
            </div>
          )}
        </div>
      ) : (
        !loading && (
          <div className="py-20 text-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 max-w-md mx-auto px-6">
            <FilterX size={36} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-slate-800 font-bold text-base mb-1">No Matching Configurations</h3>
            <p className="text-slate-500 text-xs">No floor layouts matching your applied constraints were discovered in this sync segment.</p>
          </div>
        )
      )}

      {/* --- INITIAL LOADING SKELETON PLACEHOLDER --- */}
      {loading && portfolios.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden h-[410px] flex flex-col animate-pulse">
               <div className="h-56 bg-slate-100 w-full" />
               <div className="p-6 flex-1 flex flex-col justify-between">
                 <div className="space-y-3">
                   <div className="h-3 bg-slate-100 rounded w-1/4" />
                   <div className="h-5 bg-slate-100 rounded w-3/4" />
                   <div className="grid grid-cols-2 gap-2 pt-2">
                     <div className="h-7 bg-slate-50 rounded" />
                     <div className="h-7 bg-slate-50 rounded" />
                   </div>
                 </div>
                 <div className="space-y-2 mt-4">
                   <div className="h-9 bg-slate-100 rounded-lg w-full" />
                   <div className="h-3 bg-slate-50 rounded w-1/2 mx-auto" />
                 </div>
               </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}