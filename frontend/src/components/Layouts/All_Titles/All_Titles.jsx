"use client";
import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SparklesIcon, LayoutTemplateIcon, ArrowRightIcon, Layers } from "lucide-react";
import { Heading2, RichParagraph, SecondaryButton, ImageWithSkeleton } from '../../Common/Common';

export default function All_Titles_Client() {
  const LIMIT = 12;
  const [portfolios, setPortfolios] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true); // Initial loading true
  const [hoveredId, setHoveredId] = useState(null);

  const pathname = usePathname();

  // --- REUSABLE FETCH FUNCTION ---
  const fetchPortfolios = useCallback(async (pageNum) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/portfolio/titles-only?page=${pageNum}&limit=${LIMIT}&t=${Date.now()}`;
      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: { "Content-Type": "application/json" }
      });
      const res = await response.json();
      return res;
    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false };
    }
  }, [LIMIT]);

  // --- INITIAL DATA FETCH (on Mount) ---
  useEffect(() => {
    const getInitialData = async () => {
      setLoading(true);
      const res = await fetchPortfolios(1);
      if (res.success) {
        setPortfolios(res.data || []);
        setHasMore(1 < res.pages);
      }
      setLoading(false);
    };
    getInitialData();
  }, [fetchPortfolios]);

  // --- LOAD MORE LOGIC ---
  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextPage = page + 1;

    const res = await fetchPortfolios(nextPage);

    if (res.success) {
      const newData = res.data || [];
      setPortfolios((prev) => {
        const combined = [...prev, ...newData];
        // Unique filter using _id
        return combined.filter((v, i, a) => a.findIndex(t => t._id === v._id) === i);
      });
      setPage(nextPage);
      setHasMore(nextPage < res.pages);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg p-8 border border-[#001F3D]/10 shadow-sm container mx-auto my-10">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-[#F5F5F0] pb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 mt-3 bg-primary rounded-lg text-white">
            <Layers size={24} />
          </div>
          <div>
            <Heading2 text="Build Catalog" className=" !mb-1" />
            <RichParagraph className="!text-xs opacity-50 uppercase tracking-widest font-bold">
              {loading && portfolios.length === 0 ? 'Syncing...' : `${portfolios.length} Models Loaded`}
            </RichParagraph>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-black !text-hover uppercase bg-secondary px-4 py-2 rounded-lg">
          <SparklesIcon size={12} /> Live Inventory
        </div>
      </div>

      {/* GRID SECTION */}
      {portfolios.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolios.map((item) => {
              const path = `/layout-detail/${item.slug}`;
              const isActive = pathname === path;
              const hasRenderings = item.rendering && item.rendering.length > 0;

              const displayImage = (hoveredId === item._id && item.rendering?.length > 1)
                ? item.rendering[1]
                : item.rendering?.[0];

              const wb = item.van_listing?.specifications?.wheelbase;
              const wheelbaseLabel = {
                "144": "144 Mercedes Sprinter",
                "170": "170 Mercedes Sprinter",
                "159": "159 RAM Promaster",
                "148": "148 Ford Transit"
              }[wb] || "Custom Build";

              return (
                <Link key={item._id} href={path} className="block group">
                  <div
                    onMouseEnter={() => setHoveredId(item._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative rounded-lg border-2 overflow-hidden transition-all duration-500 flex flex-col ${
                      isActive ? "bg-primary border-primary text-white shadow-xl" : "bg-white border-[#F5F5F0] hover:shadow-lg"
                    }`}
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-[#F5F5F0]">
                      {hasRenderings ? (
                        <ImageWithSkeleton
                          src={displayImage}
                          alt={item.van_listing?.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-[#001F3D]/20">
                          <LayoutTemplateIcon size={32} className="mb-2" />
                          <span className="text-[10px] font-bold uppercase">Coming Soon</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex items-center justify-between">
                      <div className="flex flex-col min-w-0">
                        <RichParagraph className={`uppercase mb-1 !text-[10px] ${isActive ? 'text-white/80' : '!text-primary/60'}`}>
                          {wheelbaseLabel}
                        </RichParagraph>
                        <RichParagraph className={`font-bold truncate text-sm ${isActive ? 'text-white' : '!text-primary'}`}>
                          {item.van_listing?.title || "Untitled"}
                        </RichParagraph>
                      </div>
                      <div className={`transition-all ${isActive ? "text-white" : "text-[#ED985F]"} ${hoveredId === item._id ? "translate-x-1" : "opacity-40"}`}>
                        <ArrowRightIcon size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* LOAD MORE BUTTON */}
          {hasMore && (
            <div className="flex justify-center pt-6 border-t border-[#F5F5F0]">
              <SecondaryButton
                onClick={handleLoadMore}
                disabled={loading}
                className="!bg-[#001F3D] !text-white !px-12"
                label={loading ? "Loading..." : `Load More Layouts`}
              />
            </div>
          )}
        </div>
      ) : (
        !loading && (
          <div className="py-20 text-center bg-[#F5F5F0] rounded-lg border-2 border-dashed">
            <p className="text-[#001F3D]/40 uppercase text-sm font-bold">No Models Found</p>
          </div>
        )
      )}

      {/* Loading Skeleton Placeholder (Optional) */}
      {loading && portfolios.length === 0 && (
        <div className="grid grid-cols-4 gap-6 animate-pulse">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="h-64 bg-gray-100 rounded-lg"></div>
           ))}
        </div>
      )}
    </div>
  );
}