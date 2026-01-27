"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllPortfolio } from "../../../../api/portfolio/getAllPortfolio";
import {
  SparklesIcon,
  LayoutTemplateIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Heading2, RichParagraph, BlackButton } from '../../Common/Common'


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

  // --- Core Fetch Function ---
  const fetchPortfolios = useCallback(async (pageNumber = 1, isLoadMore = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      setLoading(true);
      if (pageNumber === 1) setInitialLoad(true);

      // API FIX: Pass arguments individually as the function expects (page, limit, search)
      // Object nahi bhejna, warna API sirf page 1 return karegi
      const res = await getAllPortfolio(pageNumber, LIMIT, "");

      if (res.success) {
        const responseData = res.data; // Yeh axios ka data object hai
        const newData = responseData?.data || []; // Actual array of items
        const totalPages = responseData?.pages || 0;
        const currentPage = responseData?.page || pageNumber;

        if (isLoadMore) {
          setPortfolios((prev) => {
            const combined = [...prev, ...newData];
            // Remove duplicates by _id
            const uniqueMap = new Map();
            combined.forEach((item) => {
              if (item._id) uniqueMap.set(item._id, item);
            });
            return Array.from(uniqueMap.values());
          });
        } else {
          setPortfolios(newData);
        }

        // States update karein
        setPage(currentPage);
        setHasMore(currentPage < totalPages);
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
      isFetchingRef.current = false;
    }
  }, []); // Dependencies empty taake closures stale na hon

  // --- Initial Load ---
  useEffect(() => {
    fetchPortfolios(1, false);
  }, [fetchPortfolios]);

  // --- Manual Load More Handler ---
  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore || isFetchingRef.current) return;
    const nextPage = page + 1;
    fetchPortfolios(nextPage, true);
  }, [loading, hasMore, page, fetchPortfolios]);

  // --- Infinite Scroll Handler ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;

      // Jab user bottom se 300px door ho tab load kare
      if (currentScroll >= scrollHeight - 300 && hasMore && !loading) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleLoadMore, hasMore, loading]);

  // --- Loading Skeleton ---
  if (initialLoad) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-xl border border-gray-200/50">
        <div className="mb-6 flex items-center gap-3 animate-pulse">
          <div className="h-10 w-10 rounded-xl bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-100 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-50 rounded-xl border border-gray-100"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-gray-200/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 shadow-lg">
              <LayoutTemplateIcon className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <Heading2 text="Quick Access Layouts"/>
            <RichParagraph>
                 {portfolios.length} layouts loaded {hasMore ? `(more available)` : `(all loaded)`}
            </RichParagraph>

          </div>
        </div>
        <SparklesIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </div>

      {/* Grid */}
      {portfolios.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {portfolios.map((item) => {
              const path = `/layout-detail/${item.slug}`;
              const isActive = location.pathname === path;

              return (
                <Link key={item._id} to={path}>
                  <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setHoveredId(item._id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div
                      className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                        isActive
                          ? "bg-gray-900 shadow-lg"
                          : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
                      } ${hoveredId === item._id ? "scale-[1.02]" : ""}`}
                    ></div>

                    <div className="relative z-10 flex items-center justify-between p-4">
                      <span
                        className={`text-sm font-semibold truncate max-w-[85%] transition-colors ${
                          isActive ? "text-white" : "text-gray-800"
                        }`}
                        title={item?.van_listing?.title}
                      >
                        {item?.van_listing?.title || "Untitled"}
                      </span>

                      <ArrowRightIcon
                        className={`h-4 w-4 transition-all ${
                          isActive ? "text-white" : "text-gray-300"
                        } ${hoveredId === item._id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <BlackButton    onClick={handleLoadMore}
                disabled={loading}
                label=   {loading ? (
                  <>
                    Loading More...
                  </>
                ) : (
                  <>
                    Load More ({page})                  </>
                )}/>

            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LayoutTemplateIcon className="h-10 w-10 mb-2 opacity-20" />
          <p>No layouts found</p>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
          {hasMore ? "Scroll to explore more" : "End of catalog"}
        </p>
      </div>
    </div>
  );
}