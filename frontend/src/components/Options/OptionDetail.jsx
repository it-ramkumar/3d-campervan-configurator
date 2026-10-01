"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ImageOff, Tag } from "lucide-react";
import { RichParagraph, Heading1, Breadcrumb } from "../Common/Common";
import { BORDER, getItemTitle, RenderBlocks } from "./optionBlocks";

// ── Gallery ───────────────────────────────────────────────────────────────────
const Gallery = ({ images, alt }) => {
  const [imageIdx, setImageIdx] = useState(0);

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-[4/4] w-full rounded-xl overflow-hidden"
        style={{ background: "rgba(0,31,61,0.04)", border: BORDER }}
      >
        {images.length > 0 ? (
          <Image
            src={images[imageIdx] || images[0]}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-contain"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary/20">
            <ImageOff size={40} />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setImageIdx(i)}
              className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all"
              style={{ border: i === imageIdx ? "2px solid #ED985F" : BORDER }}
              aria-label={`Show image ${i + 1}`}
            >
              <Image src={src} alt={`${alt} ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Related card ──────────────────────────────────────────────────────────────
const RelatedCard = ({ item, href }) => {
  const title = getItemTitle(item);
  return (
    <Link
      href={href}
      className="group rounded-xl overflow-hidden bg-white flex flex-col transition-shadow duration-300 hover:shadow-xl hover:shadow-[#001F3D]/5"
      style={{ border: BORDER }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: "rgba(0,31,61,0.04)" }}>
        {item.images?.[0] && (
          <Image
            src={item.images[0]}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-4 flex items-center justify-between gap-2" style={{ borderTop: "1px solid rgba(237,152,95,0.15)" }}>
        <RichParagraph variant="sub" textColor="text-primary" className="font-bold !opacity-100">
          {title}
        </RichParagraph>
        <ArrowRight size={14} className="text-[#ED985F] flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

// ── Detail page body ──────────────────────────────────────────────────────────
export default function OptionDetail({ item, basePath, listingLabel, related }) {
  const title = getItemTitle(item);
  const category = item.categoryId?.title;
  const subCategory = item.subCategoryId?.title;
  const images = item.images?.filter(Boolean) || [];

  return (
    <div className="bg-secondary min-h-screen font-body">
      <Breadcrumb
        customItems={[
          { name: listingLabel, href: basePath },
          { name: title, href: `${basePath}/${item.slug}` },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 self-start">
            <Gallery images={images} alt={title} />
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-5">
            {(category || subCategory) && (
              <div className="flex flex-wrap items-center gap-2">
                {[category, subCategory].filter(Boolean).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-primary/60"
                    style={{ border: BORDER }}
                  >
                    <Tag size={11} className="text-[#ED985F]" />
                    {t}
                  </span>
                ))}
              </div>
            )}

            <Heading1 variant="section" text={title} textColor="text-primary" />
            <div className="w-10 h-[2px] bg-[#ED985F]" />

            <div className="space-y-3">
              {item.description?.filter((d) => d?.trim()).map((desc, i) => (
                <RichParagraph variant="body" key={i}>
                  {desc}
                </RichParagraph>
              ))}
              <RenderBlocks blocks={item.blocks} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {item.link && (
                <Link
                  href={item.link}
                  target="_blank"
                  className="group flex-1 flex items-center justify-between p-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all bg-[#001F3D] text-[#FBFBF9] hover:bg-[#ED985F] hover:text-[#001F3D]"
                  style={{ border: "1px solid rgba(237,152,95,0.25)" }}
                >
                  <span className="pl-4">View Complete Catalog</span>
                  <span className="w-9 h-9 rounded flex items-center justify-center">
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              )}
              <Link
                href={basePath}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest text-primary/70 hover:text-[#ED985F] transition-colors"
                style={{ border: BORDER }}
              >
                <ArrowLeft size={14} />
                All {listingLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 md:mt-24">
            <div className="flex items-end justify-between gap-4 mb-6">
              <RichParagraph variant="sub" textColor="text-primary" className="font-bold uppercase tracking-widest !opacity-100">
                More in {subCategory || category || listingLabel}
              </RichParagraph>
              <Link
                href={basePath}
                className="text-[10px] font-bold uppercase tracking-widest text-[#ED985F] hover:underline whitespace-nowrap"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((r) => (
                <RelatedCard key={r._id} item={r} href={`${basePath}/${r.slug}`} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
