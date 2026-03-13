"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllPortfolio } from "../../../../api/portfolio/getAllPortfolio";
import {
  SparklesIcon,
  LayoutTemplateIcon,
  ArrowRightIcon,
  Layers
} from "lucide-react";
import { Heading2, RichParagraph, SecondaryButton } from '../../Common/Common'

const LIMIT = 12;

export default function All_Titles() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const location = useLocation();
  const isFetchingRef = useRef(false);

  // --- Fetch Logic (Same as before, optimized for UI) ---
  const fetchPortfolios = useCallback(async (pageNumber = 1, isLoadMore = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      setLoading(true);
      if (pageNumber === 1) setInitialLoad(true);
      const res = await getAllPortfolio(pageNumber, LIMIT, "");
      if (res.success) {
        const responseData = res.data;
        const newData = responseData?.data || [];
        const totalPages = responseData?.pages || 0;
        const currentPage = responseData?.page || pageNumber;

        if (isLoadMore) {
          setPortfolios((prev) => {
            const combined = [...prev, ...newData];
            const uniqueMap = new Map();
            combined.forEach((item) => { if (item._id) uniqueMap.set(item._id, item); });
            return Array.from(uniqueMap.values());
          });
        } else {
          setPortfolios(newData);
        }
        setPage(currentPage);
        setHasMore(currentPage < totalPages);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => { fetchPortfolios(1, false); }, [fetchPortfolios]);

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore || isFetchingRef.current) return;
    fetchPortfolios(page + 1, true);
  }, [loading, hasMore, page, fetchPortfolios]);

  // --- UI Components ---
  if (initialLoad) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm border border-[#001F3D]/5">
        <div className="h-8 w-64 bg-[#F5F5F0] animate-pulse rounded-lg mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-16 bg-[#F5F5F0] rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-8 border border-[#001F3D]/10 shadow-sm transition-all duration-500 hover:shadow-md">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-[#F5F5F0] pb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 mt-3 bg-primary rounded-lg text-white shadow-lg shadow-primary/20">
            <Layers size={24} />
          </div>
          <div>
            <Heading2 text="Build Catalog" className=" !mb-1" />
            <RichParagraph className="!text-xs opacity-50 uppercase tracking-widest font-bold">
              {portfolios.length} Models {hasMore ? 'Available' : 'Completed'}
            </RichParagraph>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-hover uppercase  bg-secondary px-4 py-2 rounded-lg">
          <SparklesIcon size={12} /> Live Inventory
        </div>
      </div>

      {/* --- GRID --- */}
      {portfolios.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {portfolios.map((item) => {
              const path = `/layout-detail/${item.slug}`;
              const isActive = location.pathname === path;

              return (
                <Link key={item._id} to={path} className="block group">
                  <div
                    onMouseEnter={() => setHoveredId(item._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative p-5 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? "bg-[#001F3D] border-[#001F3D] shadow-xl translate-y-[-2px]"
                        : "bg-white border-[#F5F5F0] hover:border-[#ED985F]/30 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex flex-col overflow-hidden">
                      <RichParagraph className={`uppercase mb-1 !text-xs font-bold ${isActive ? "text-hover" : "text-primary/30"}`}>
                        {item?.van_listing?.specifications?.wheelbase || "Custom"}
                      </RichParagraph>
                      <RichParagraph className={`font-bold  truncate pr-4 ${isActive ? "text-white" : "text-primary"}`}>
                        {item?.van_listing?.title || "Untitled Build"}
                      </RichParagraph>
                    </div>

                    <div className={`transition-all duration-300 ${isActive ? "text-white" : "text-[#ED985F]"} ${hoveredId === item._id ? "translate-x-1" : "opacity-0"}`}>
                      <ArrowRightIcon size={18} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* --- LOAD MORE --- */}
          {hasMore && (
            <div className="flex justify-center pt-6 border-t border-[#F5F5F0]">
              <SecondaryButton
                onClick={handleLoadMore}
                disabled={loading}
                className="!bg-[#001F3D] !text-white !px-12 !py-4 !rounded-lg hover:!bg-[#ED985F] transition-colors"
                label={loading ? "Synchronizing..." : `Load More Layouts (${page})`}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#F5F5F0] rounded-lg border-2 border-dashed border-[#001F3D]/10">
          <LayoutTemplateIcon className="mx-auto h-12 w-12 text-[#001F3D]/20 mb-4" />
          <p className="font-bold text-[#001F3D]/40 uppercase tracking-widest text-sm">No Builds Found</p>
        </div>
      )}

      {/* --- FOOTER --- */}
      <div className="mt-12 flex items-center justify-center gap-4">
        <div className="h-px bg-[#F5F5F0] flex-grow"></div>
        <span className="text-[9px] font-black text-[#001F3D]/30 uppercase tracking-[0.4em]">
           Brooklyn Built Vans Catalog
        </span>
        <div className="h-px bg-[#F5F5F0] flex-grow"></div>
      </div>
    </div>
  );
}