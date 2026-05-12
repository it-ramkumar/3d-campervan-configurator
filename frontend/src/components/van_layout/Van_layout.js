"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowRight, X } from "lucide-react";
import {
  Heading2,
  Heading3,
  RichParagraph,
  SecondaryButton
} from '../Common/Common';


// --- SUB-COMPONENT: IMAGE GRID ---
const ProjectImages = ({ images, alt }) => {
  const hasMultiple = images?.length > 1;
  const displayImages = images?.length > 0 ? images : ["/images/blockLogo.jpg"];

  return (
    <div className="group relative w-full h-[300px] md:h-[450px] flex gap-2 p-2 overflow-hidden bg-gray-100 rounded-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className={`relative h-full overflow-hidden rounded-lg ${hasMultiple ? 'w-2/3' : 'w-full'}`}
      >
        <Image
          src={displayImages[0]}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>

      {hasMultiple && (
        <div className="w-1/3 flex flex-col gap-2 h-full">
          {displayImages.slice(1, 3).map((img, i) => (
            <div key={i} className="relative flex-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <Image src={img} alt={alt} fill className="object-cover" />
              {i === 1 && displayImages.length > 3 && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                  <span className="text-xl font-bold">+{displayImages.length - 3}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Van_layout({ layout, currentParams = {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // API DATA
  const { data: layouts, pages: totalPages, page: currentPage, filters } = layout;
  // console.log("LAYOUT", filters);

  // search sync safe
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm(currentParams.search || "");
  }, [currentParams.search]);

  // ---------------------------
  // URL UPDATE
  // ---------------------------
  const updateURL = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const handleClearAll = () => {
    setSearchTerm("");
    router.push(pathname);
  };

  // ---------------------------
const filterOptions = (options = []) => {
  return options.filter(Boolean).sort();
};

  // ---------------------------
  // FILTER CONFIG (CASCADING READY)
  // ---------------------------
const filterConfig = [
  { label: "Base Model", key: "model", options: filterOptions(filters?.models) },
  { label: "Wheelbase", key: "wheelbase", options: filterOptions(filters?.wheelbase) }, // ✅ NEW
  { label: "Category", key: "category", options: filterOptions(filters?.category) },   // ✅ NEW
  { label: "Seating", key: "sit", options: filterOptions(filters?.sits) },
  { label: "Sleeping", key: "sleep", options: filterOptions(filters?.sleeps) },
  { label: "Bed Setup", key: "bedType", options: filterOptions(filters?.bedType) },
  { label: "Sanitation", key: "bathroomType", options: filterOptions(filters?.bathroomType) },
];

  return (
    <main className="bg-[#F9FAFB] min-h-screen py-12">
      <div className="container mx-auto max-w-[1300px] px-4">

        {/* FILTER DASHBOARD */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-16">

          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <SlidersHorizontal size={20} className="text-orange-500" />
              </div>
              <Heading3 text="Refine Results" className="!mb-0 !text-primary tracking-tight" />
            </div>

            {Object.keys(currentParams).length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs font-semibold text-orange-600 hover:underline flex items-center gap-1"
              >
                <X size={14} /> Reset Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">

            {/* SEARCH */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && updateURL("search", searchTerm)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* FILTERS */}
            {filterConfig.map((f) => (
              <div key={f.key} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                  {f.label}
                </label>

                <select
                  value={currentParams[f.key] || ""}
                  onChange={(e) => updateURL(f.key, e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-medium cursor-pointer focus:bg-white focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none"
                >
                  <option value="">All</option>
                  {f.options?.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* RESULTS */}
        <AnimatePresence mode="wait">
          {layouts?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100"
            >
              <Search size={48} className="mx-auto text-gray-200 mb-4" />
              <Heading3 text="No matching builds found." className="!text-gray-400" />
              <button onClick={handleClearAll} className="mt-4 text-orange-500 font-medium">
                Clear search and try again
              </button>
            </motion.div>
          ) : (
            <div className="space-y-20 md:space-y-32">

              {layouts.map((item, index) => {
                const isReversed = index % 2 !== 0;

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-20`}
                  >
                    <div className="w-full lg:w-5/12 space-y-6 text-center lg:text-left">
                      <Heading2 text={item.van_listing?.title || "Custom Layout"} />
                      <RichParagraph className="text-gray-600">
                        {item.van_listing?.description}
                      </RichParagraph>

                      <SecondaryButton
                        label="Explore Configuration"
                        link={`/layout-detail/${item.slug}`}
                      />
                    </div>

                    <div className="w-full lg:w-7/12">
                      <ProjectImages images={item.gallery} alt={item.van_listing?.title} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-8 mt-32 pt-10 border-t border-gray-100">
            <button
              onClick={() => updateURL("page", Number(currentPage) - 1)}
              disabled={Number(currentPage) <= 1}
              className="p-3 rounded-full border"
            >
              <ArrowRight className="rotate-180" size={20} />
            </button>

            <span className="text-sm font-bold">
              PAGE {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => updateURL("page", Number(currentPage) + 1)}
              disabled={Number(currentPage) >= totalPages}
              className="p-3 rounded-full border"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}

      </div>
    </main>
  );
}