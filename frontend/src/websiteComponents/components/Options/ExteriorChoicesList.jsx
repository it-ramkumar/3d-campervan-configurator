"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown, Sparkles, Tag, Search, Truck, Filter, X, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Heading2, RichParagraph,Heading3,ImageWithSkeleton } from '../Common/Common'


const MAX_INITIAL_ITEMS = 50;

// --- 1. RenderBlocks Component (Wahi design jo aapko pehle diya tha) ---
const RenderBlocks = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-6 mt-4">
      {blocks.sort((a, b) => a.order - b.order).map((block, idx) => {
        switch (block.block_type) {
          case 'heading':
            return <h2 key={idx} className="text-xl font-bold text-gray-900">{block.title}</h2>;
          case 'subheading':
            return <h3 key={idx} className="text-lg font-semibold text-gray-800">{block.title}</h3>;
          case 'paragraph':
            return <div key={idx} className="text-gray-600 leading-relaxed">{block.content}</div>;
          case 'list':
            return (
              <div key={idx} className="space-y-3">
                {block.title && <p className="font-bold text-gray-800">{block.title}</p>}
                <ul className="space-y-4">
                  {block.list_items?.map((item, iIdx) => (
                    <li key={iIdx}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item.text}</span>
                      </div>
                      {item.sub_items?.length > 0 && (
                        <ul className="ml-10 mt-2 space-y-2 border-l border-gray-200 pl-4">
                          {item.sub_items.map((sub, sIdx) => (
                            <li key={sIdx} className="text-sm text-gray-500 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          case 'table':
            return (
              <div key={idx} className="overflow-x-auto my-4 border border-gray-100 rounded-lg shadow-sm">
                {block.title && <p className="p-2 font-bold bg-gray-50 text-sm border-b">{block.title}</p>}
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      {block.table_data?.headers.map((h, hi) => (
                        <th key={hi} className="px-4 py-2 font-semibold border-b">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table_data?.rows.map((row, ri) => (
                      <tr key={ri} className="border-b last:border-0">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-2 text-gray-600">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const contentVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { type: "spring", stiffness: 70, damping: 10, staggerChildren: 0.05 },
  },
};

export default function ExteriorChoicesList({ initialData, heading }) {
  const [activeSubCategoryMap, setActiveSubCategoryMap] = useState(initialData.activeSubCategoryMap);
  const [activeItemMap, setActiveItemMap] = useState(initialData.activeItemMap);
  const [expandedCategories, setExpandedCategories] = useState(initialData.expandedCategories);
  const [showFullItemListMap] = useState(initialData.showFullItemListMap);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  const categories = initialData.categories;

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

const getFilteredCategories = () => {
    let filtered = categories;

    if (selectedCategoryFilter !== "all") {
      filtered = filtered.filter((cat) => cat._id === selectedCategoryFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      filtered = filtered.map((cat) => {
        const categoryMatch =
          cat.title.toLowerCase().includes(query) ||
          cat.description?.toLowerCase().includes(query);

        const filteredSubCategories = cat.subCategories.map((sub) => {
          const subMatch = sub.title.toLowerCase().includes(query);

          const filteredItems = sub.items.filter((item) => {
            // 1. Check direct title
            const titleMatch = item.title?.toLowerCase().includes(query);

            // 2. Check description array
            const descMatch = item.description?.some((desc) =>
              desc.toLowerCase().includes(query)
            );

            // 3. Check blocks (This was missing or incomplete)
            const blockMatch = item.blocks?.some((b) =>
              b.title?.toLowerCase().includes(query) ||
              b.content?.toLowerCase().includes(query) ||
              b.list_items?.some(li => li.text?.toLowerCase().includes(query))
            );

            return titleMatch || descMatch || blockMatch;
          });

          return {
            ...sub,
            items: filteredItems,
            hasMatch: subMatch || filteredItems.length > 0
          };
        }).filter((sub) => sub.hasMatch);

        const filteredDirectItems = cat.items.filter((item) => {
          const titleMatch = item.title?.toLowerCase().includes(query);
          const descMatch = item.description?.some((desc) =>
            desc.toLowerCase().includes(query)
          );
          const blockMatch = item.blocks?.some((b) =>
            b.title?.toLowerCase().includes(query) ||
            b.content?.toLowerCase().includes(query)
          );
          return titleMatch || descMatch || blockMatch;
        });

        return {
          ...cat,
          subCategories: filteredSubCategories,
          items: filteredDirectItems,
          hasMatch: categoryMatch || filteredSubCategories.length > 0 || filteredDirectItems.length > 0
        };
      }).filter((cat) => cat.hasMatch);
    }
    return filtered;
  };

  const filteredCategories = getFilteredCategories();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-black/5 rounded-2xl">
              <Sparkles className="h-7 w-7 sm:h-9 sm:w-9 text-black" />
            </div>
            <Heading2 text={`${heading} Choices`} className="capitalize"/>
          </div>
          <div className="max-w-2xl mx-auto">
            <RichParagraph className="text-gray-600 text-lg">
              Explore our premium {heading.toLowerCase()} selections designed to elevate your space
            </RichParagraph>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 w-full relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search materials, colors, styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>
              <div className="relative w-full lg:w-auto">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full lg:w-64 pl-4 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none appearance-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.title}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6">
          <AnimatePresence>
            {filteredCategories.map((cat, index) => {
              const activeSubId = activeSubCategoryMap[cat._id];
              const allActiveItems = activeSubId != null ? cat.subCategories.find((s) => s._id === activeSubId)?.items || [] : cat.items;
              const activeItems = showFullItemListMap[cat._id] ? allActiveItems : allActiveItems.slice(0, MAX_INITIAL_ITEMS);
              const activeItem = activeItemMap[cat._id];
              const isExpanded = expandedCategories[cat._id];
              const alternateLayout = index % 2 === 0;

              return (
                <motion.div key={cat._id} variants={categoryVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                  {/* Category Header Clickable */}
                  <div onClick={() => toggleCategory(cat._id)} className="p-5 sm:p-7 cursor-pointer hover:bg-gray-50/50 transition-colors flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-3 bg-black/5 rounded-xl"><Tag className="h-6 w-6 text-black" /></div>
                      <div>
                        <Heading3 text={cat.title} className="mb-2" textColor="text-black"/>
                        <RichParagraph className="text-gray-600 text-sm">{cat.description}</RichParagraph>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><ChevronDown className="h-5 w-5 text-gray-600" /></motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="hidden" className="border-t border-gray-100 p-5 sm:p-8">

                        {/* Subcategory Buttons */}
                   {cat.subCategories.length > 0 && (
  <div className="flex flex-col gap-6 mb-8"> {/* Main vertical gap */}
    {cat.subCategories.map((sub) => (
      <div key={sub._id} className="space-y-2"> {/* Button aur Desc ka personal container */}

        {/* Button - Active state logic wahi hai */}
        <button
          onClick={() => {
            setActiveSubCategoryMap({ ...activeSubCategoryMap, [cat._id]: sub._id });
            setActiveItemMap({ ...activeItemMap, [cat._id]: sub.items[0] || null });
          }}
          className={`px-5 py-2.5 rounded-full border transition-all inline-block w-fit ${
            activeSubId === sub._id
            ? "bg-black text-white shadow-md"
            : "bg-white text-gray-700 hover:border-gray-400"
          }`}
        >
          {sub.title}
        </button>

        {/* Description - Hamesha niche aayegi */}
        {sub.description && (
          <div className="pl-1"> {/* Thodi si padding for alignment */}
             <RichParagraph className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                {sub.description}
             </RichParagraph>
          </div>
        )}

      </div>
    ))}
  </div>
)}

                        {/* Items Selection */}
                        <div className="flex flex-wrap gap-3 mb-10">
                          {activeItems.map((item) => {
                            // Logic to decide button text
                            const buttonLabel =
                              item.title ||
                              item.blocks?.find((b) => b.block_type === "heading")?.title ||
                              "Untitled Option";

                            return (
                              <button
                                key={item._id}
                                onClick={() => setActiveItemMap({ ...activeItemMap, [cat._id]: item })}
                                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${activeItem?._id === item._id
                                    ? "bg-black text-white border-black shadow-md"
                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                  }`}
                              >
                                <span className="font-medium">{buttonLabel}</span>
                                {activeItem?._id === item._id && <CheckCircle className="h-4 w-4" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Active Item Details */}
                        <AnimatePresence mode="wait">
                          {activeItem && (
                            <motion.div key={activeItem._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-10 border border-gray-100">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                                <div className={`${alternateLayout ? "" : "lg:order-2"}`}>
                                  <ImageWithSkeleton  src={activeItem.images?.[0]} alt={activeItem.title} className="rounded-xl shadow-lg" />
                                </div>
                                <div className={`space-y-6 ${alternateLayout ? "" : "lg:order-1"}`}>
                                  <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{activeItem.title}</h3>
                                    <div className="w-16 h-1 bg-black rounded-full" />
                                  </div>

                                  {/* --- Description Array --- */}
                                  {activeItem.description?.length > 0 && (
                                    <div className="space-y-4">
                                      {activeItem.description.map((desc, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                          <div className="p-2 bg-black rounded-lg shrink-0"><Truck className="h-4 w-4 text-white" /></div>
                                          <RichParagraph className="text-gray-700">{desc}</RichParagraph>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* --- BLOCKS DATA (Rendered alongside description) --- */}
                                  <RenderBlocks blocks={activeItem.blocks} />

                                  {activeItem.link && (
                                    <Link to={activeItem.link} target="_blank">
                                      <button className="px-8 py-3.5 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all">
                                        View Complete Details
                                      </button>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}