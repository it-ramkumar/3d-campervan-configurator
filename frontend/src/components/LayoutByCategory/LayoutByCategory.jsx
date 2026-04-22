"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../HeroSection/HeroSection";
import { Search, SlidersHorizontal, ArrowRight, X } from "lucide-react";
import {
  Heading2,
  Heading3,
  RichParagraph,
  PrimaryButton,
  SecondaryButton
} from '../Common/Common';

// --- OPTIMIZED IMAGE COMPONENT ---
const ProjectImages = ({ images, alt, slug }) => {
  const hasMultiple = images?.length > 1;

  return (
    <div className="group relative w-full h-[300px] md:h-[450px] flex gap-2 p-2 overflow-hidden bg-secondary rounded-xl">
      {/* Main Image Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative h-full overflow-hidden rounded-lg ${hasMultiple ? 'w-2/3' : 'w-full'}`}
      >
        <Image
          src={images[0]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>

      {/* Side Column (Grid) */}
      {hasMultiple && (
        <div className="w-1/3 flex flex-col gap-2 h-full">
          {images.slice(1, 3).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex-1 w-full overflow-hidden rounded-lg bg-gray-200"
            >
              <Image
                src={img}
                alt={`${alt} view ${i + 1}`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-500 hover:scale-110"
              />

              {/* More Images Overlay */}
              {i === 1 && images.length > 3 && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                  <span className="text-xl font-bold">+{images.length - 3}</span>
                  <span className="text-[10px] uppercase tracking-widest">Photos</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default function CamperProjectsClient({ category, initialData, currentParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: layouts, pages: totalPages, filters: availableFilters } = initialData;
  const currentPage = parseInt(currentParams.page) || 1;

  const [searchTerm, setSearchTerm] = useState(currentParams.search || "");

  const updateURL = (key, value) => {
    const params = new URLSearchParams(currentParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Filter change par page 1 par wapas le jana behtar hota hai
    if (key !== "page") params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const handleClearAll = () => {
    setSearchTerm("");
    router.push(pathname);
  };

  const formattedCategory = category?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main className="bg-[#F9FAFB] min-h-screen">
      <HeroSection
        title={formattedCategory}
        description={`Bespoke ${formattedCategory} configurations crafted for the ultimate journey.`}
        image="/images2/family.webp"
        showButton={false}
      />

      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-[1300px]">

          {/* --- MODERN FILTER DASHBOARD --- */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-16">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-hover/10 rounded-lg">
                  <SlidersHorizontal size={20} className="text-hover" />
                </div>
                <Heading3 text="Refine Results" className="!mb-0 !text-primary tracking-tight" />
              </div>
              {Object.keys(currentParams).length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs font-semibold text-hover hover:underline flex items-center gap-1"
                >
                  <X size={14} /> Reset Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {/* Search Field */}
              <div className="lg:col-span-1 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && updateURL("search", searchTerm)}
                    className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-hover/20 focus:border-hover transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              {/* Dynamic Selects */}
              {[
                { label: "Base Model", key: "model", options: availableFilters?.models },
                { label: "Seating", key: "sit", options: availableFilters?.sits },
                { label: "Sleeping", key: "sleep", options: availableFilters?.sleeps },
                { label: "Bed Setup", key: "bedType", options: availableFilters?.bedType },
                { label: "Sanitation", key: "bathroomType", options: availableFilters?.bathroomType },
              ].map((f) => (
                <div key={f.key} className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{f.label}</label>
                  <select
                    value={currentParams[f.key] || ""}
                    onChange={(e) => updateURL(f.key, e.target.value)}
                    className="w-full px-4 py-3 bg-secondary/50 border border-transparent rounded-xl text-sm font-medium cursor-pointer focus:bg-white focus:ring-2 focus:ring-hover/20 transition-all appearance-none"
                  >
                    <option value="">All</option>
                    {f.options && [...new Set(f.options.map(opt => opt.trim()))].map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* --- RESULTS GRID --- */}
          <AnimatePresence mode="wait">
            {layouts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100"
              >
                <Search size={48} className="mx-auto text-gray-200 mb-4" />
                <Heading3 text="No matching builds found." className="!text-gray-400" />
                <button onClick={handleClearAll} className="mt-4 text-hover font-medium">Clear search and try again</button>
              </motion.div>
            ) : (
              <div className="space-y-20 md:space-y-32">
                {layouts.map((project, index) => {
                  const isReversed = index % 2 !== 0;
                  return (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-20`}
                    >
                      {/* Content Side */}
                      <div className="w-full lg:w-5/12 space-y-6 text-center lg:text-left">
                        <div className="inline-block px-3 py-1 bg-hover/5 rounded-full">
                          <RichParagraph className="!text-hover uppercase !text-[11px] tracking-[0.2em] font-bold !mb-0">
                            Big Bear Signature
                          </RichParagraph>
                        </div>
                        <Heading2 text={project.van_listing?.title} className="!text-3xl md:!text-4xl" />
                        <RichParagraph className="text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
                          {project.van_listing?.description}
                        </RichParagraph>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                          <SecondaryButton
                            label="Explore Configuration"
                            link={`/layout-detail/${project.slug}`}
                            className="group"
                          />
                        </div>
                      </div>

                      {/* Visual Side */}
                      <div className="w-full lg:w-7/12">
                        <ProjectImages images={project.gallery} alt={project.van_listing?.title} slug={project.slug} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>

          {/* --- PREMIUM PAGINATION --- */}
          {layouts.length > 0 && (
            <div className="flex justify-center items-center gap-8 mt-32 pt-10 border-t border-gray-100">
              <button
                onClick={() => updateURL("page", currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-3 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-white hover:shadow-md transition-all"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>

              <span className="text-sm font-bold tracking-widest text-primary">
                PAGE {currentPage} <span className="text-gray-300 mx-2">/</span> {totalPages}
              </span>

              <button
                onClick={() => updateURL("page", currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-3 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-white hover:shadow-md transition-all"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}