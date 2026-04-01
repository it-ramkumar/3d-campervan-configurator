"use client";
import React, { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"; // Next.js Link
import { getAllPortfolio } from "@/api/portfolio/getAllPortfolio";
import { SparklesIcon, LayoutTemplateIcon, ArrowRightIcon, Layers } from "lucide-react";
import { Heading2, RichParagraph, SecondaryButton } from '../../Common/Common';

export default function All_Titles_Client({ initialData }) {
  const LIMIT = 12;

  // Server se aaye huye data se state initialize karein
  const [portfolios, setPortfolios] = useState(initialData?.data || []);
  const [page, setPage] = useState(initialData?.page || 1);
  const [hasMore, setHasMore] = useState(initialData?.page < initialData?.pages);
  const [loading, setLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const pathname = usePathname();

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const res = await getAllPortfolio(nextPage, LIMIT, "");
      if (res.success) {
        const newData = res.data?.data || [];
        setPortfolios((prev) => {
           const combined = [...prev, ...newData];
           // Unique ID check
           return combined.filter((v, i, a) => a.findIndex(t => t._id === v._id) === i);
        });
        setPage(nextPage);
        setHasMore(nextPage < res.data?.pages);
      }
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 border border-[#001F3D]/10 shadow-sm transition-all duration-500 hover:shadow-md container mx-auto my-10">

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
        <div className="flex items-center gap-2 text-xs font-black !text-hover uppercase bg-secondary px-4 py-2 rounded-lg">
          <SparklesIcon size={12} /> Live Inventory
        </div>
      </div>

      {/* --- GRID --- */}
      {portfolios.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {portfolios.map((item) => {
              const path = `/layout-detail/${item.slug}`;
              const isActive = pathname === path;

              return (
                <Link key={item._id} href={path} className="block group">
                  <div
                    onMouseEnter={() => setHoveredId(item._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative p-5 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? "bg-primary border-primary shadow-xl translate-y-[-2px] text-white"
                        : "bg-white border-[#F5F5F0] hover:border-[#ED985F]/30 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex flex-col ">
                      <RichParagraph className={`uppercase mb-1 !text-xs font-bold ${isActive ? 'text-white' : '!text-primary'}`}>
                        {item?.van_listing?.specifications?.wheelbase || "Custom"}
                      </RichParagraph>
                      <RichParagraph className={`font-bold truncate pr-4 ${isActive ? 'text-white' : '!text-primary'}`}>
                        {item?.van_listing?.title || "Untitled Build"}
                      </RichParagraph>
                    </div>

                    <div className={`transition-all duration-300 ${isActive ? "text-white opacity-100" : "text-[#ED985F]"} ${hoveredId === item._id ? "translate-x-1 opacity-100" : "opacity-0"}`}>
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
                label={loading ? "Synchronizing..." : `Load More Layouts`}
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
    </div>
  );
}