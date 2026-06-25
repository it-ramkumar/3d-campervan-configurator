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

  const selectedChassis = searchParams.get("category") || "ALL";
  const searchQueryFromURL = searchParams.get("search") || "";

  const [localSearch, setLocalSearch] = useState(searchQueryFromURL);
  const [dbCategories, setDbCategories] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    setLocalSearch(searchQueryFromURL);
  }, [searchQueryFromURL]);

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

  const handleClearFilters = () => {
    setLocalSearch("");
    router.push(pathname);
  };

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

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setPage(1);
      const res = await fetchPortfolios(1, selectedChassis, searchQueryFromURL);
      if (res.success) {
        setPortfolios(res.data || []);
        setHasMore(1 < res.pages);
        if (res.categories) setDbCategories(res.categories);
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

  const isFilterActive = selectedChassis !== "ALL" || searchQueryFromURL !== "";

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
          <div className="bg-white border border-primary/8 rounded-2xl shadow-sm mb-8 overflow-hidden">
            <div className="h-[2px] w-full bg-[#ED985F]" />
            <div className="p-5 md:p-6">

              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-primary/6">
                <div className="p-2 bg-[#ED985F]/10 rounded-lg">
                  <SlidersHorizontal size={16} className="text-[#ED985F]" />
                </div>
                <SpanTag text="Browse Floor Plans" className="mb-0" />
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">

                {/* Category buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => updateURL({ category: "ALL" })}
                    className={`font-ui font-semibold text-[10px] uppercase tracking-[0.15em] px-4 py-2 rounded-xl border transition-all ${
                      selectedChassis === "ALL"
                        ? "bg-primary border-primary text-secondary"
                        : "bg-secondary border-primary/12 text-primary/60 hover:border-[#ED985F]/40 hover:text-primary"
                    }`}
                  >
                    All
                  </button>

                  {dbCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => updateURL({ category: cat })}
                      className={`font-ui font-semibold text-[10px] uppercase tracking-[0.15em] px-4 py-2 rounded-xl border transition-all ${
                        selectedChassis === cat
                          ? "bg-primary border-primary text-secondary"
                          : "bg-secondary border-primary/12 text-primary/60 hover:border-[#ED985F]/40 hover:text-primary"
                      }`}
                    >
                      {getCategoryLabel(cat)}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72 shrink-0">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/30" />
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    onKeyDown={handleSearchCommit}
                    onBlur={handleSearchCommit}
                    placeholder="Search layouts..."
                    className="w-full bg-secondary border border-primary/10 rounded-xl pl-9 pr-4 py-2.5 font-ui text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-[#ED985F]/40 focus:ring-2 focus:ring-[#ED985F]/10 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── ACTIVE FILTERS ── */}
          {isFilterActive && (
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-primary/8 rounded-xl px-4 py-3 mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-ui font-semibold text-[10px] uppercase tracking-[0.18em] text-primary/35 mr-1">
                  Active:
                </span>

                {selectedChassis !== "ALL" && (
                  <span className="inline-flex items-center gap-1.5 bg-primary text-secondary font-ui text-[10px] font-semibold uppercase tracking-[0.12em] pl-3 pr-2 py-1 rounded-lg">
                    {getCategoryLabel(selectedChassis)}
                    <button onClick={() => updateURL({ category: "ALL" })} className="hover:bg-secondary/20 p-0.5 rounded transition-colors">
                      <X size={11} />
                    </button>
                  </span>
                )}

                {searchQueryFromURL !== "" && (
                  <span className="inline-flex items-center gap-1.5 bg-primary text-secondary font-ui text-[10px] font-semibold uppercase tracking-[0.12em] pl-3 pr-2 py-1 rounded-lg">
                    &ldquo;{searchQueryFromURL}&rdquo;
                    <button onClick={() => { setLocalSearch(""); updateURL({ search: "" }); }} className="hover:bg-secondary/20 p-0.5 rounded transition-colors">
                      <X size={11} />
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleClearFilters}
                className="font-ui font-semibold text-[10px] uppercase tracking-[0.15em] text-[#ED985F] hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                <X size={11} /> Clear All
              </button>
            </div>
          )}

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
                  const capacitySleep = item.category?.some(c => c.includes("families")) ? "3–4" : "2";

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

                          {/* Gradient overlay on hover */}
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

                            {/* Feature chips */}
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-secondary rounded-lg border border-primary/6">
                                <BedDouble size={13} className="text-[#ED985F] shrink-0" />
                                <span className="font-ui font-semibold text-[10px] text-primary/70">Sleeps {capacitySleep}</span>
                              </div>
                              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-secondary rounded-lg border border-primary/6">
                                <Flame size={13} className="text-[#ED985F] shrink-0" />
                                <span className="font-ui font-semibold text-[10px] text-primary/70">Full Kitchen</span>
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

          {/* Loading skeleton */}
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
