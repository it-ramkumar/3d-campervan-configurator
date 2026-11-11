import React from "react";
import Link from "next/link";
import {
  Heading1,
  RichParagraph,
  Heading3,
  ImageWithSkeleton,
  SecondaryButton,
  CustomLink,
  SpanTag,
} from "../../Common/Common";

export default function SoldVans({
  vans,
  soldHeading,
  soldDesc,
  hasMore,
  loading,
  onLoadMore,
}) {
  if (!vans || vans.length === 0) return null;

  return (
    <section className="bg-secondary py-0 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* --- Section Header --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <RichParagraph variant="sub" textColor="text-hover" >
                The Archive
              </RichParagraph>

            </div>
            <Heading1 variant="section" text={soldHeading} textColor="text-primary" />
            <div>
              {soldDesc && (
                <RichParagraph variant="body">{soldDesc}</RichParagraph>
              )}
            </div>
          </div>

          {/* --- NEW: Right Side Feature Grid --- */}
          <div className="hidden md:grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0 mt-6 lg:mt-0">
            {/* Feature 1 */}
            <div className="flex items-center gap-4 bg-white/50 px-5 py-4 rounded-xl border border-[var(--color-primary)]/10 shadow-sm">
              <div className="text-[var(--color-primary)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <RichParagraph variant="body">
                Off-Grid Adventurers
              </RichParagraph>


            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4 bg-white/50 px-5 py-4 rounded-xl border border-[var(--color-primary)]/10 shadow-sm">
              <div className="text-[var(--color-primary)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <RichParagraph variant="body">
                Family Campers
              </RichParagraph>

            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4 bg-white/50 px-5 py-4 rounded-xl border border-[var(--color-primary)]/10 shadow-sm">
              <div className="text-[var(--color-primary)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 9.36l-7.1 7.1a1 1 0 0 1-1.4 0l-2.8-2.8a1 1 0 0 1 0-1.4l7.1-7.1a6 6 0 0 1 9.36-7.94l-3.77 3.77z"></path>
                </svg>
              </div>
              <RichParagraph variant="body">
                Couple Campers
              </RichParagraph>

            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-4 bg-white/50 px-5 py-4 rounded-xl border border-[var(--color-primary)]/10 shadow-sm">
              <div className="text-[var(--color-primary)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <RichParagraph variant="body">
                Custom Builds
              </RichParagraph>

            </div>
          </div>
        </div>


        {/* --- Vans Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vans?.map((van) => (
            <div
              key={van._id}
              className="group relative flex flex-col bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-[var(--color-primary)]/10 rounded-lg"
            >
              {/* Image Container */}
              <Link
                href={`/camper-vans-for-sale/${van.slug}`}
                className="relative block aspect-[4/3] overflow-hidden bg-[var(--color-primary)]/5 rounded-t-lg"
              >
                {van?.gallery?.[0] ? (
                  <ImageWithSkeleton
                    src={van.gallery[0]}
                    alt={van?.van_listing?.title}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-primary)]/10">
<RichParagraph variant="body" textColor="text-primary" >
Gallery Coming Soon
</RichParagraph>

                  </div>
                )}

                {/* ✅ Corrected Sold Tag */}
                {van.status === "sold" && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-[#ED3500] text-[#FFFCFB] text-[9px] font-black px-3 py-1.5 uppercase tracking-widest shadow-lg rounded-sm">
                      Sold
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[var(--color-primary)]/30 backdrop-blur-[2px]">
                  <div className="bg-secondary text-[var(--color-primary)] px-5 py-2 font-bold text-xs uppercase tracking-widest shadow-2xl rounded-lg">
                    View Build
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 via-transparent to-transparent z-0" />
              </Link>

              {/* Info Bottom */}
              <div className="p-6">
                <div className="mb-4">
                  <Heading1 variant="card"
                    text={van?.van_listing?.title || "Signature Build"}
                    className="!text-primary mb-1"
                  />
                  <RichParagraph variant="card">
                    {van?.van_listing?.subtitle || "Premium Conversion"}
                  </RichParagraph>
                </div>

                <div className="h-[1px] w-full bg-secondary mb-4" />

                <div className="flex items-center justify-between">
                  <CustomLink
                    href={`/camper-vans-for-sale/${van.slug}`}
                    text={"Full Specs →"}
                  />
                  <div className="w-2 h-2 rounded-lg  group-hover:animate-ping" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Load More Section --- */}
        <div className="flex flex-col items-center mt-20">
          <div className="w-12 h-[3px] bg-[var(--color-highlight)] mb-8 rounded-full" />
          <SecondaryButton
            aria-label="Load more posts"
            onClick={onLoadMore}
            disabled={loading || !hasMore}
            label={
              loading
                ? "Opening Vault..."
                : !hasMore
                  ? ""
                  : "Load More Past Builds"
            }
          />
        </div>
      </div>
    </section>
  );
}
