"use client";
import React, { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getAllPortfolio } from "@/api/portfolio/getAllPortfolio";
import { SparklesIcon, LayoutTemplateIcon, ArrowRightIcon, Layers } from "lucide-react";
import { Heading2, RichParagraph, SecondaryButton, ImageWithSkeleton } from '../../Common/Common';

export default function All_Titles_Client({ initialData }) {
  const LIMIT = 12;

  const [portfolios, setPortfolios] = useState(initialData?.data || []);
  const [page, setPage] = useState(initialData?.page || 1);
  const [hasMore, setHasMore] = useState(initialData?.page < initialData?.pages);
  const [loading, setLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const pathname = usePathname();

  // --- LOGIC: Renderings wale items pehle dikhana ---
  const sortedPortfolios = useMemo(() => {
    return [...portfolios].sort((a, b) => {
      const aHasRendering = a.rendering && a.rendering.length > 0;
      const bHasRendering = b.rendering && b.rendering.length > 0;
      if (aHasRendering && !bHasRendering) return -1;
      if (!aHasRendering && bHasRendering) return 1;
      return 0;
    });
  }, [portfolios]);

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
      {sortedPortfolios.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPortfolios.map((item) => {
              const path = `/layout-detail/${item.slug}`;
              const isActive = pathname === path;
              const hasRenderings = item.rendering && item.rendering.length > 0;

              // Hover pe 2nd rendering, warna 1st rendering
              const displayImage = (hoveredId === item._id && item.rendering?.length > 1)
                ? item.rendering[1]
                : item.rendering?.[0];

              return (
                <Link key={item._id} href={path} className="block group">
                  <div
                    onMouseEnter={() => setHoveredId(item._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative rounded-lg border-2 overflow-hidden transition-all duration-500 flex flex-col ${isActive
                      ? "bg-primary border-primary shadow-xl translate-y-[-4px] text-white"
                      : "bg-white border-[#F5F5F0] hover:border-[#ED985F]/30 hover:shadow-2xl hover:translate-y-[-4px]"
                      }`}
                  >
                    {/* --- IMAGE SECTION --- */}
                    {/* --- IMAGE SECTION --- */}
                    <div className="relative h-48 w-full overflow-hidden bg-[#F5F5F0]">
                      {hasRenderings ? (
                        <ImageWithSkeleton
                          src={displayImage}
                          alt={item.van_listing?.title}
                          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                          style={{ filter: hoveredId === item._id ? 'brightness(1.1)' : 'brightness(1)' }}
                        />
                      ) : (
                        // ✅ Renderings empty hone par "Coming Soon" placeholder
                        <div className="flex flex-col items-center justify-center h-full bg-[#F9F9F7] border-b border-[#F5F5F0]">
                          <LayoutTemplateIcon size={32} className="text-[#001F3D]/10 mb-2" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#001F3D]/30">
                            Renderings Coming Soon
                          </span>
                          {/* Decorative pulse effect */}
                          <div className="absolute bottom-4 flex gap-1">
                            <span className="w-1 h-1 rounded-lg bg-[#ED985F]/20 animate-pulse"></span>
                            <span className="w-1 h-1 rounded-lg bg-[#ED985F]/40 animate-pulse delay-75"></span>
                            <span className="w-1 h-1 rounded-lg bg-[#ED985F]/20 animate-pulse delay-150"></span>
                          </div>
                        </div>
                      )}

                      {/* Active Indicator Overlay */}
                      {isActive && (
                        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
                      )}
                    </div>

                    {/* --- TEXT CONTENT --- */}
                    <div className="p-5 flex items-center justify-between">
                      <div className="flex flex-col min-w-0">
                        <RichParagraph className={`uppercase mb-1 !text-[10px] tracking-tighter ${isActive ? 'text-white/80' : '!text-primary/60'}`}>
                          {(() => {

                            const wb = item?.van_listing?.specifications?.wheelbase;

                            const wheelbaseMap = {

                              "144": "144 Mercedes Sprinter",

                              "170": "170 Mercedes Sprinter",

                              "159": "159 RAM Promaster",

                              "148": "148 Ford Transit"

                            };

                            return wheelbaseMap[wb] || "Custom Wheelbase";

                          })()}
                        </RichParagraph>
                        <RichParagraph className={`font-bold truncate text-sm ${isActive ? 'text-white' : '!text-primary'}`}>
                          {item?.van_listing?.title || "Untitled Build"}
                        </RichParagraph>
                      </div>

                      <div className={`transition-all duration-300 ${isActive ? "text-white opacity-100" : "text-[#ED985F]"} ${hoveredId === item._id ? "translate-x-1 opacity-100" : "opacity-40"}`}>
                        <ArrowRightIcon size={18} />
                      </div>
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