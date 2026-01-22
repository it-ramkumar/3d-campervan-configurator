import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown, Sparkles, Tag, Search, Truck, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import Heading2 from "../Common/Headings/Heading2";
import Heading3 from "../Common/Headings/Heading3";
import RichParagraph from "../Common/Paragraph/RichParagraph";
import BlackButton from "../Common/Button/WhiteButton";
import Image from "../Common/ImageWithSkeleton/ImageWithSkeleton";

const MAX_INITIAL_ITEMS = 50;

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
  // UI States
  const [activeSubCategoryMap, setActiveSubCategoryMap] = useState(initialData.activeSubCategoryMap);
  const [activeItemMap, setActiveItemMap] = useState(initialData.activeItemMap);
  const [expandedCategories, setExpandedCategories] = useState(initialData.expandedCategories);
  const [showFullItemListMap] = useState(initialData.showFullItemListMap);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Props se data extract karein
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
        const categoryMatch = cat.title.toLowerCase().includes(query) || cat.description?.toLowerCase().includes(query);
        const filteredSubCategories = cat.subCategories.map((sub) => {
          const subMatch = sub.title.toLowerCase().includes(query);
          const filteredItems = sub.items.filter((item) =>
            item.title.toLowerCase().includes(query) || item.description?.some((desc) => desc.toLowerCase().includes(query))
          );
          return { ...sub, items: filteredItems, hasMatch: subMatch || filteredItems.length > 0 };
        }).filter((sub) => sub.hasMatch);

        const filteredDirectItems = cat.items.filter((item) =>
          item.title.toLowerCase().includes(query) || item.description?.some((desc) => desc.toLowerCase().includes(query))
        );

        return { ...cat, subCategories: filteredSubCategories, items: filteredDirectItems, hasMatch: categoryMatch || filteredSubCategories.length > 0 || filteredDirectItems.length > 0 };
      }).filter((cat) => cat.hasMatch);
    }
    return filtered;
  };

  const filteredCategories = getFilteredCategories();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Modern Design */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-black/5 rounded-2xl">
              <Sparkles className="h-7 w-7 sm:h-9 sm:w-9 text-black" />
            </div>
            <Heading2 text={`${heading} Design Choices`} />
          </div>
          <div className="max-w-2xl mx-auto">
            <RichParagraph className="text-gray-600 text-lg">
              Explore our premium {heading.toLowerCase()} selections designed to elevate your space
            </RichParagraph>
          </div>
        </motion.div>

        {/* Search and Filters - Modern Card Style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 sm:mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search materials, colors, styles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>

              <div className="relative w-full lg:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full lg:w-64 pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none appearance-none transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.title}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCategoryFilter !== "all" && (
                <div className="inline-flex items-center gap-2 bg-black/5 px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    {categories.find(c => c._id === selectedCategoryFilter)?.title}
                  </span>
                  <button
                    onClick={() => setSelectedCategoryFilter("all")}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3 text-gray-500" />
                  </button>
                </div>
              )}
              {searchQuery && (
                <div className="inline-flex items-center gap-2 bg-black/5 px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Search: "{searchQuery}"
                  </span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3 text-gray-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6">
          <AnimatePresence>
            {filteredCategories.map((cat, index) => {
              const activeSubId = activeSubCategoryMap[cat._id];
              const allActiveItems = activeSubId != null
                ? cat.subCategories.find((s) => s._id === activeSubId)?.items || []
                : cat.items;
              const isFullListShown = showFullItemListMap[cat._id];
              const activeItems = isFullListShown
                ? allActiveItems
                : allActiveItems.slice(0, MAX_INITIAL_ITEMS);
              const activeItem = activeItemMap[cat._id];
              const isExpanded = expandedCategories[cat._id];
              const alternateLayout = index % 2 === 0;

              return (
                <motion.div
                  key={cat._id}
                  variants={categoryVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Category Header */}
                  <motion.div
                    onClick={() => toggleCategory(cat._id)}
                    className="p-5 sm:p-7 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-black/5 rounded-xl">
                          <Tag className="h-6 w-6 text-black" />
                        </div>
                        <div className="text-left">
                          <Heading3 text={cat.title} className="mb-2" />
                          <div className="max-w-2xl">
                            <RichParagraph className="text-gray-600 text-sm sm:text-base">
                              {cat.description}
                            </RichParagraph>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="border-t border-gray-100"
                      >
                        <div className="p-5 sm:p-8">
                          {/* Subcategories - Modern Pill Style */}
                          {cat.subCategories.length > 0 && (
                            <div className="mb-8">
                              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                Subcategories
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {cat.subCategories.map((sub) => (
                                  <button
                                    key={sub._id}
                                    onClick={() => {
                                      setActiveSubCategoryMap({ ...activeSubCategoryMap, [cat._id]: sub._id });
                                      setActiveItemMap({ ...activeItemMap, [cat._id]: sub.items[0] || null });
                                    }}
                                    className={`px-5 py-2.5 rounded-full border transition-all duration-200 ${
                                      activeSubId === sub._id
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                                    }`}
                                  >
                                    {sub.title}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Items Selection - Modern Grid */}
                          <div className="mb-10">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                              Available Options
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {activeItems.map((item) => (
                                <button
                                  key={item._id}
                                  onClick={() => setActiveItemMap({ ...activeItemMap, [cat._id]: item })}
                                  className={`group flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                                    activeItem?._id === item._id
                                      ? "bg-black text-white border-black shadow-md"
                                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                  }`}
                                >
                                  <span className="font-medium">{item.title}</span>
                                  {activeItem?._id === item._id && (
                                    <CheckCircle className="h-4 w-4" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Selected Item Details - Modern Card */}
                          <AnimatePresence mode="wait">
                            {activeItem && (
                              <motion.div
                                key={activeItem._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-inner"
                              >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                  {/* Image Section */}
                                  <div className={`${alternateLayout ? "" : "lg:order-2"}`}>
                                    {activeItem.images?.[0] && (
                                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                                        <Image
                                          src={activeItem.images[0]}
                                          alt={activeItem.title}
                                          className="w-full h-auto object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                    )}
                                  </div>

                                  {/* Details Section */}
                                  <div className={`space-y-6 ${alternateLayout ? "" : "lg:order-1"}`}>
                                    <div>
                                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                        {activeItem.title}
                                      </h3>
                                      <div className="w-16 h-1 bg-black rounded-full"></div>
                                    </div>

                                    {activeItem.description?.length > 0 && (
                                      <div className="space-y-4">
                                        {activeItem.description.map((desc, i) => (
                                          <div key={i} className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                              <div className="p-2.5 bg-black rounded-lg">
                                                <Truck className="h-5 w-5 text-white" />
                                              </div>
                                            </div>
                                            <RichParagraph className="text-gray-700">
                                              {desc}
                                            </RichParagraph>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {activeItem.link && (
                                      <div className="pt-4">
                                        <Link to={activeItem.link} target="_blank">
                                          <button className="group relative px-8 py-3.5 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 overflow-hidden">
                                            <span className="relative z-10 font-semibold">
                                              View Complete Details
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                                          </button>
                                        </Link>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-6">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}