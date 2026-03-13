"use client";
import React from "react";
import { Link } from "react-router-dom";
import {
  Heading2, RichParagraph, Heading3,
  ImageWithSkeleton, SecondaryButton,CustomLink
} from '../../Common/Common';

export default function SoldVans({
  vans,
  soldHeading,
  soldDesc,
  hasMore,
  loading,
  onLoadMore
}) {
  if (!vans || vans.length === 0) return null;

  return (
    <section className="bg-secondary py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* --- Section Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
               <span className="w-8 h-[2px] bg-hover opacity-30"></span>
               <RichParagraph className="text-hover uppercase  font-bold !text-xs italic">The Archive</RichParagraph>
            </div>
            <Heading2 text={soldHeading} className="text-primary" />
            <div className="mt-4">
              <RichParagraph >
                {soldDesc}
              </RichParagraph>
            </div>
          </div>


        </div>

        {/* --- Vans Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vans.map((van) => (
            <div
              key={van._id}
              className="group relative flex flex-col bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-[var(--color-primary)]/10 rounded-lg"
            >
              {/* Image Container */}
              <Link to={`/van-detail/${van.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[var(--color-primary)]/5 rounded-t-lg">

                {van?.gallery?.[0] ? (
                  <ImageWithSkeleton
                    src={van.gallery[0]}
                    alt={van?.van_listing?.title}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-primary)]/10">
                    <span className="text-[var(--color-primary)] opacity-40 text-[10px] font-bold uppercase tracking-widest">Gallery Coming Soon</span>
                  </div>
                )}

                {/* Elegant Sold Tag */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-[var(--color-primary)] text-[var(--color-secondary)] text-[9px] font-black px-3 py-1.5 uppercase tracking-widest shadow-lg rounded-sm">
                    Sold Out
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[var(--color-primary)]/30 backdrop-blur-[2px]">
                   <div className="bg-[var(--color-secondary)] text-[var(--color-primary)] px-5 py-2 font-bold text-xs uppercase tracking-widest shadow-2xl rounded-lg">
                     View Build
                   </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 via-transparent to-transparent z-0" />
              </Link>

              {/* Info Bottom */}
              <div className="p-6">
                <div className="mb-4">
                   <Heading3 text={van?.van_listing?.title || "Signature Build"} className="text-[var(--color-primary)] text-lg mb-1" />
                   <RichParagraph className=" uppercase">
                      {van?.van_listing?.subtitle || "Premium Conversion"}
                   </RichParagraph>
                </div>

                <div className="h-[1px] w-full bg-[var(--color-secondary)] mb-4" />

                <div className="flex items-center justify-between">
                  <CustomLink  to={`/van-detail/${van.slug}`} text={"  Full Specs →"}/>

                  <div className="w-2 h-2 rounded-full bg-[var(--color-highlight)] group-hover:animate-ping" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Load More Section --- */}
        <div className="flex flex-col items-center mt-20">
          <div className="w-12 h-[3px] bg-[var(--color-highlight)] mb-8 rounded-full" />
          <SecondaryButton
            onClick={onLoadMore}
            disabled={loading || !hasMore}
            label={
              loading
                ? "Opening Vault..."
                : !hasMore
                  ? "End of Archive"
                  : "Load More Past Builds"
            }
          />
        </div>

      </div>
    </section>
  );
}