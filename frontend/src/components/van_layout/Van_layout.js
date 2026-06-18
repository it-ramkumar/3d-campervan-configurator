"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowRight, X, ChevronDown, Check } from "lucide-react";
import {
  Heading2,
  Heading3,
  RichParagraph,
  SecondaryButton
} from '../Common/Common';

// --- SUB-COMPONENT: IMAGE GRID ---
const ProjectImages = ({ images, alt }) => {
  const hasMultiple = images?.length > 1;
  const displayImages = images?.length > 0 ? images : ["/images/blockLogo.webp"];

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

  // API DATA (Backend se aaye filters backup ka kaam karenge, ye automatically screen se gayab nahi honge)
  const { data: layouts, pages: totalPages, page: currentPage, filters } = layout;

  // ── LOCAL STATES (Bina button click kiye API hit hone se rokne ke liye) ──
  const [localFilters, setLocalFilters] = useState({
    wheelbase: [],
    category: [],
    sit: [],
    bathroomType: [],
    search: ""
  });
  const [openDropdown, setOpenDropdown] = useState(null);

  // URL query params ke badalne par local filters ko sync rakhein (Initial load ya reset par)
  useEffect(() => {
    setLocalFilters({
      wheelbase: currentParams.wheelbase ? currentParams.wheelbase.split(",") : [],
      category: currentParams.category ? currentParams.category.split(",") : [],
      sit: currentParams.sit ? currentParams.sit.split(",") : [],
      bathroomType: currentParams.bathroomType ? currentParams.bathroomType.split(",") : [],
      search: currentParams.search || ""
    });
  }, [currentParams]);

  // Dropdown se baahar click karne par automatically use close karne ka handler
  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null);
    if (typeof window !== "undefined") {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // ── LOCAL CHECKBOX STATE MANAGEMENT (No Router Push / No API Hit) ──
  const handleCheckboxChange = (key, optionValue) => {
    setLocalFilters(prev => {
      const currentValues = prev[key];
      const updatedValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];

      return { ...prev, [key]: updatedValues };
    });
  };

  // ── MAIN SUBMIT BUTTON HANDLER (Ek single click par poora network hit) ──
  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    // Local state data ko loop karke URL Query structures me parse karein
    Object.entries(localFilters).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        params.set(key, values.join(","));
      } else if (typeof values === "string" && values.trim() !== "") {
        params.set(key, values.trim());
      }
    });

    params.set("page", "1"); // Jab bhi filter badlega, pagination page 1 par reset hogi
    setOpenDropdown(null);
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const handleClearAll = () => {
    setLocalFilters({
      wheelbase: [],
      category: [],
      sit: [],
      bathroomType: [],
      search: ""
    });
    setOpenDropdown(null);
    router.push(pathname);
  };

  const filterOptions = (options = []) => {
    return options.filter(Boolean).sort();
  };

  const filterConfig = [
    { label: "Wheelbase", key: "wheelbase", options: filterOptions(filters?.wheelbase) },
    { label: "Category", key: "category", options: filterOptions(filters?.category) },
    { label: "Seating", key: "sit", options: filterOptions(filters?.sits) },
    { label: "Sanitation", key: "bathroomType", options: filterOptions(filters?.bathroomType) },
  ];

  return (
    <main className="bg-[#F9FAFB] min-h-screen py-12">
      <div className="container mx-auto max-w-[1300px] px-4">

        {/* FILTERS DASHBOARD BOARD CONTROLLER */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-16 relative z-30">

          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <SlidersHorizontal size={20} className="text-orange-500" />
              </div>
              <Heading3 text="Filter Custom Builds" className="!mb-0 !text-primary tracking-tight" />
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

          {/* INPUT FIELDS BOX */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">

            {/* KEYWORD TEXT SEARCH */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Keywords..."
                  value={localFilters.search}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* DROPDOWN EXPANDERS FOR CHECKBOXES */}
            {filterConfig.map((f) => {
              const currentValues = localFilters[f.key] || [];
              const isOpen = openDropdown === f.key;

              return (
                <div key={f.key} className="space-y-2 relative" onClick={(e) => e.stopPropagation()}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                    {f.label} {currentValues.length > 0 && `(${currentValues.length})`}
                  </label>

                  <div
                    onClick={() => setOpenDropdown(isOpen ? null : f.key)}
                    className={`w-full px-4 py-3 bg-gray-50 border ${isOpen ? 'border-orange-500/30 bg-white shadow-sm' : 'border-transparent'} rounded-xl text-sm font-medium cursor-pointer flex items-center justify-between transition-all select-none`}
                  >
                    <span className="truncate text-gray-700 max-w-[150px]">
                      {currentValues.length > 0
                        ? currentValues.map(v => v.replace(/-+/g, " ").replace(/\b\w/g, c => c.toUpperCase())).join(", ")
                        : "All"
                      }
                    </span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl p-4 max-h-60 overflow-y-auto z-50 space-y-2.5 custom-scrollbar"
                      >
                        {f.options?.length === 0 ? (
                          <div className="text-xs text-gray-400 italic py-1 text-center">No options available</div>
                        ) : (
                          f.options.map((opt, i) => {
                            const isChecked = currentValues.includes(opt);
                            return (
                              <label
                                key={i}
                                className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer text-sm font-medium transition-colors select-none"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleCheckboxChange(f.key, opt)}
                                  className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20 accent-orange-500 cursor-pointer"
                                />
                                <span className={isChecked ? "text-orange-600 font-semibold" : "text-gray-600"}>
                                  {opt.replace(/-+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                                </span>
                              </label>
                            );
                          })
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* ── BUTTON FOR SINGLE INTERACTIVE HIT ── */}
          <div className="flex justify-end pt-4 border-t border-gray-50">
            <button
              onClick={handleApplyFilters}
              className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-8 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Check size={16} /> Apply Filters
            </button>
          </div>

        </div>

        {/* DYNAMIC RESULTS CONTAINER GRID */}
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
            <div className="space-y-20 md:space-y-32 relative z-10">
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

        {/* PAGINATION SECTION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-8 mt-32 pt-10 border-t border-gray-100 relative z-10">
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(Number(currentPage) - 1));
                router.push(`${pathname}?${params.toString()}`);
              }}
              disabled={Number(currentPage) <= 1}
              className="p-3 rounded-full border bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ArrowRight className="rotate-180" size={20} />
            </button>

            <span className="text-sm font-bold">
              PAGE {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", String(Number(currentPage) + 1));
                router.push(`${pathname}?${params.toString()}`);
              }}
              disabled={Number(currentPage) >= totalPages}
              className="p-3 rounded-full border bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}

      </div>
    </main>
  );
}