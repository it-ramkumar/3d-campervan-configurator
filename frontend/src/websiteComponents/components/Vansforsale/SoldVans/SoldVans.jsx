"use client";
import React from "react";
import { Link } from "react-router-dom";
import { Heading2, RichParagraph,Heading3,ImageWithSkeleton, BlackButton } from '../../Common/Common'


export default function SoldVans({ vans,
  soldHeading,
  soldDesc,
  hasMore,
  loading,
  onLoadMore }) {

  return (
    <>

      {vans.length > 0 ? (<section className="bg-white md:mt-24 mt-10 py-10 px-4 md:px-8 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">

          {/* Heading Section */}

          <div className="text-center mb-10 md:mb-16">
            <Heading2 text={soldHeading} />
            <RichParagraph className="max-w-2xl mx-auto">
              {soldDesc}
            </RichParagraph>

          </div>

          {/* Vans Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {vans?.length > 0 ? (
              vans.map((van) => (
                <div
                  key={van._id}
                  className="group relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border-2 border-gray-800 shadow-xl transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-2"
                >
                  <Link to={`/van-detail/${van.slug}`}>
                  <div className="relative w-full h-full">
  {/* Image OR Designed Fallback */}
  {van?.gallery?.[0] ? (
    <ImageWithSkeleton
      src={van.gallery[0]}
      alt={van?.van_listing?.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
  ) : (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      {/* subtle pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,#2761FD_0%,transparent_40%)]" />

      {/* big model / year feel */}
      <span className="text-gray-500 text-xs uppercase tracking-widest">
        Image coming soon
      </span>
    </div>
  )}

  {/* SOLD Stamp */}
  {van?.status === "sold" && (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      <div className="transform -rotate-12 bg-red-600 text-white font-black text-xl md:text-2xl px-8 py-2 rounded-lg shadow-2xl border-2 border-white/40 backdrop-blur-sm">
        SOLD
      </div>
    </div>
  )}

  {/* Gradient overlay – always */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>

  {/* Content */}
  <div className="absolute inset-0 p-6 flex flex-col justify-end z-30">
    <Heading3 text={van?.van_listing?.title || "Custom Camper Build"} />

    <RichParagraph className="text-white/80 text-sm">
      View Details →
    </RichParagraph>
  </div>
</div>

                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400 text-lg">No sold vans found.</p>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-12">
            <BlackButton
              onClick={onLoadMore}
              disabled={loading || !hasMore}
              label={
                loading
                  ? "Fetching..."
                  : !hasMore
                    ? "No More Builds"
                    : "Load More Builds"
              }
            />
          </div>

        </div>
      </section>) : ""}
    </>
  );
}