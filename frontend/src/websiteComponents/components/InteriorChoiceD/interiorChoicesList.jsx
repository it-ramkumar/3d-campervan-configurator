import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ChevronDown,
  Sparkles,
  Tag,
  ArrowRight,
  ChevronUp,
  Loader2,
  Search,
  X,
  Filter,
} from "lucide-react";

// --- Configuration Constant ---
const MAX_INITIAL_ITEMS = 3;

// --- Framer Motion Variants for smooth animations ---
const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const contentVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
      staggerChildren: 0.05,
    },
  },
};

const itemCardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function ExteriorChoicesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubCategoryMap, setActiveSubCategoryMap] = useState({});
  const [activeItemMap, setActiveItemMap] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showFullItemListMap, setShowFullItemListMap] = useState({});

  // New state for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/exterior`
      );
      const data = res.data.data || [];

      const categoryMap = {};
      const initialExpanded = {};
      const initialSubMap = {};
      const initialItemMap = {};
      const initialShowFullMap = {};

      data.forEach((item) => {
        const cat = item.categoryId;
        if (!cat) return;

        if (!categoryMap[cat._id]) {
          categoryMap[cat._id] = {
            ...cat,
            subCategories: {},
            items: [],
          };
          initialExpanded[cat._id] = true;
          initialShowFullMap[cat._id] = false;
        }

        const sub = item.subCategoryId;
        if (sub) {
          if (!categoryMap[cat._id].subCategories[sub._id]) {
            categoryMap[cat._id].subCategories[sub._id] = {
              ...sub,
              items: [],
            };
          }
          categoryMap[cat._id].subCategories[sub._id].items.push(item);
        } else {
          categoryMap[cat._id].items.push(item);
        }
      });

      const categoriesArray = Object.values(categoryMap).map((cat) => ({
        ...cat,
        subCategories: Object.values(cat.subCategories),
      }));

      categoriesArray.forEach((cat) => {
        if (cat.subCategories.length > 0) {
          initialSubMap[cat._id] = cat.subCategories[0]._id;
          initialItemMap[cat._id] = cat.subCategories[0].items[0] || null;
        } else {
          initialSubMap[cat._id] = null;
          initialItemMap[cat._id] = cat.items[0] || null;
        }
      });

      setCategories(categoriesArray);
      setActiveSubCategoryMap(initialSubMap);
      setActiveItemMap(initialItemMap);
      setExpandedCategories(initialExpanded);
      setShowFullItemListMap(initialShowFullMap);
    } catch (e) {
      console.error("Error fetching categories:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleAllCategories = () => {
    const allExpanded = categories.length > 0 && Object.values(expandedCategories).every(v => v);
    const newState = {};
    categories.forEach(cat => {
      newState[cat._id] = !allExpanded;
    });
    setExpandedCategories(newState);
  };

  const toggleFullItemList = (categoryId) => {
    setShowFullItemListMap(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Filter and search logic
  const getFilteredCategories = () => {
    let filtered = categories;

    // Filter by selected category
    if (selectedCategoryFilter !== "all") {
      filtered = filtered.filter(cat => cat._id === selectedCategoryFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.map(cat => {
        // Search in category title and description
        const categoryMatch =
          cat.title.toLowerCase().includes(query) ||
          cat.description?.toLowerCase().includes(query);

        // Search in subcategories
        const filteredSubCategories = cat.subCategories.map(sub => {
          const subMatch = sub.title.toLowerCase().includes(query);

          // Search in items
          const filteredItems = sub.items.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description?.some(desc => desc.toLowerCase().includes(query))
          );

          return {
            ...sub,
            items: filteredItems,
            hasMatch: subMatch || filteredItems.length > 0
          };
        }).filter(sub => sub.hasMatch);

        // Search in direct items (without subcategory)
        const filteredDirectItems = cat.items.filter(item =>
          item.title.toLowerCase().includes(query) ||
          item.description?.some(desc => desc.toLowerCase().includes(query))
        );

        const hasMatch = categoryMatch ||
          filteredSubCategories.length > 0 ||
          filteredDirectItems.length > 0;

        return {
          ...cat,
          subCategories: filteredSubCategories,
          items: filteredDirectItems,
          hasMatch
        };
      }).filter(cat => cat.hasMatch);
    }

    return filtered;
  };

  const filteredCategories = getFilteredCategories();

  const clearSearch = () => {
    setSearchQuery("");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategoryFilter("all");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900/5 flex items-center justify-center p-4 sm:p-8">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-gray-700 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900/5 flex items-center justify-center p-4 sm:p-8">
        <div className="text-center p-6 sm:p-8 max-w-md bg-white rounded-2xl shadow-xl border border-gray-100">
          <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories found</h3>
          <p className="text-gray-500">No content is available at the moment.</p>
        </div>
      </div>
    );
  }

  const allExpanded = categories.length > 0 && Object.values(expandedCategories).every(v => v);
  const hasActiveFilters = searchQuery.trim() || selectedCategoryFilter !== "all";

  return (
    <div className="min-h-screen bg-white py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black">
Exterior Design Choices
            </h1>
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg px-4">
Here are the exterior choices we offer:

          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 sm:mb-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items, categories, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative sm:w-64">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full pl-12 pr-10 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-sm text-gray-600 font-medium">Active filters:</span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs sm:text-sm rounded-lg">
                  Search: "{searchQuery}"
                  <button onClick={clearSearch} className="hover:bg-white/20 rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedCategoryFilter !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs sm:text-sm rounded-lg">
                  {categories.find(c => c._id === selectedCategoryFilter)?.title}
                  <button onClick={() => setSelectedCategoryFilter("all")} className="hover:bg-white/20 rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              <button
                onClick={clearFilters}
                className="text-xs sm:text-sm text-gray-600 hover:text-black font-medium underline"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Control Bar */}
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -2 }}
            onClick={toggleAllCategories}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors shadow-lg text-black font-medium text-sm sm:text-base"
          >
            {allExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {allExpanded ? "Collapse All" : "Expand All"}
          </motion.button>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-black">{filteredCategories.length}</span> of{" "}
            <span className="font-semibold text-black">{categories.length}</span> categories
          </div>
        </div>

        {/* No Results Message */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 max-w-md mx-auto border border-gray-100">
              <Search className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Categories List */}
        <div className="space-y-4 sm:space-y-6">
          <AnimatePresence>
            {filteredCategories.map((cat, index) => {
              const activeSubId = activeSubCategoryMap[cat._id];
              const allActiveItems =
                activeSubId != null
                  ? cat.subCategories.find((s) => s._id === activeSubId)?.items || []
                  : cat.items;

              const isFullListShown = showFullItemListMap[cat._id];
              const activeItems = isFullListShown
                ? allActiveItems
                : allActiveItems.slice(0, MAX_INITIAL_ITEMS);

              const activeItem = activeItemMap[cat._id];
              const isExpanded = expandedCategories[cat._id];
              const needsMoreButton = allActiveItems.length > MAX_INITIAL_ITEMS;

              // Determine alternating layout based on category index
              const alternateLayout = index % 2 === 0; // Even index = image on left

              return (
                <motion.div
                  key={cat._id}
                  variants={categoryVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  {/* Category Header - CENTERED */}
                  <motion.div
                    onClick={() => toggleCategory(cat._id)}
                    className="p-4 sm:p-6 cursor-pointer bg-white hover:bg-gray-100 transition-colors duration-300"
                    whileHover={{ scale: 1.005, backgroundColor: "#F9FAFB" }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 text-center">
                      <div className="p-2 sm:p-3 bg-black rounded-xl shadow-lg">
                        <Tag className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>

                      {/* Centered Content */}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-extrabold text-black">{cat.title}</h2>
                        </div>
                        <p className="mt-4 max-w-3xl mx-auto text-xs sm:text-sm text-gray-700 bg-gray-100 px-6 py-4 rounded-md whitespace-pre-line">
                          {cat.description}
                        </p>
                      </div>

                      <motion.div
                        className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${isExpanded ? 'bg-gray-200' : 'bg-gray-100'}`}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                      >
                        <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 ${isExpanded ? 'text-black' : 'text-gray-500'}`} />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Category Content - Expandable */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={contentVariants}
                        className="border-t border-gray-100 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-10"
                      >
                        {/* Subcategories Section - CENTERED */}
                        {cat.subCategories.length > 0 && (
                          <div className="mt-4">
                            <motion.div
                              className="flex flex-wrap justify-center gap-2 sm:gap-3"
                              variants={contentVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {cat.subCategories.map((sub) => {
                                const isActive = activeSubId === sub._id;

                                return (
                                  <motion.button
                                    key={sub._id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => {
                                      setActiveSubCategoryMap({
                                        ...activeSubCategoryMap,
                                        [cat._id]: isActive ? null : sub._id,
                                      });
                                      setActiveItemMap({
                                        ...activeItemMap,
                                        [cat._id]: sub.items[0] || null,
                                      });
                                      setShowFullItemListMap({ ...showFullItemListMap, [cat._id]: false });
                                    }}
                                    className={`group px-4 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-200
              ${isActive
                                        ? "bg-black text-white shadow-md"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                      }`}
                                  >
                                    <span className="font-semibold">{sub.title}</span>
                                  </motion.button>
                                );
                              })}
                            </motion.div>
                          </div>
                        )}


                        {/* Items Grid - CENTERED */}
                        {allActiveItems.length > 0 && (
                          <div className="mt-4 space-y-4">
                            <motion.div
                              className="flex flex-wrap justify-center gap-2 sm:gap-3"
                              variants={contentVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {activeItems.map((item) => {
                                const isActive = activeItem?._id === item._id;

                                return (
                                  <motion.button
                                    key={item._id}
                                    variants={itemCardVariants}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() =>
                                      setActiveItemMap({ ...activeItemMap, [cat._id]: item })
                                    }
                                    className={`group flex items-center gap-2 px-4 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-200
              ${isActive
                                        ? "bg-black text-white shadow-md"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                      }`}
                                  >
                                    <span className="font-semibold">{item.title}</span>

                                    {isActive && (
                                      <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    )}
                                  </motion.button>
                                );
                              })}
                            </motion.div>

                            {/* See More / Show Less */}
                            {needsMoreButton && (
                              <div className="flex justify-center pt-2">
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => toggleFullItemList(cat._id)}
                                  className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                                >
                                  {isFullListShown ? (
                                    <>
                                      <ChevronUp className="h-4 w-4" />
                                      Show Less
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="h-4 w-4" />
                                      See More
                                    </>
                                  )}
                                </motion.button>
                              </div>
                            )}
                          </div>
                        )}


                        {/* Selected Item Details - WITH ALTERNATING LAYOUT */}
                        <AnimatePresence>
                          {activeItem && (
                            <motion.div
                              key={activeItem._id}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35 }}
                              className="mt-6 pt-6 border-t border-gray-200"
                            >
                              <div className="bg-gray-50 rounded-2xl p-5 sm:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">

                                  {/* IMAGE */}
                                  {activeItem.images?.[0] && (
                                    <motion.div
                                      initial={{ opacity: 0, x: alternateLayout ? -16 : 16 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.15 }}
                                      className={`relative ${alternateLayout ? "" : "md:order-2"}`}
                                    >
                                      {/* BACK SHADOW CARD */}
                                      <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-black/5"></div>

                                      {/* IMAGE CARD */}
                                      <div className="relative overflow-hidden rounded-2xl bg-white">
                                        <img
                                          src={activeItem.images[0]}
                                          alt={activeItem.title}
                                          className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                                        />
                                      </div>
                                    </motion.div>
                                  )}


                                  {/* CONTENT */}
                                  <motion.div
                                    initial={{ opacity: 0, x: alternateLayout ? 16 : -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className={`space-y-5 ${alternateLayout ? "" : "md:order-1"}`}
                                  >
                                    <div>
                                      <h4 className="text-2xl sm:text-3xl font-semibold text-black">
                                        {activeItem.title}
                                      </h4>
                                    </div>

                                    {/* DESCRIPTION */}
                                    {activeItem.description?.length > 0 && (
                                      <ul className="space-y-3">
                                        {activeItem.description.map((desc, i) => (
                                          <motion.li
                                            key={i}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.35 + i * 0.08 }}
                                            className="flex items-start gap-3"
                                          >
                                            <CheckCircle className="h-4 w-4 text-black mt-1 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm sm:text-base">
                                              {desc}
                                            </span>
                                          </motion.li>
                                        ))}
                                      </ul>
                                    )}
                                         {
                                                                          activeItem.link && <Link to={activeItem.link} target="blank">
                                                                         <button  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                                                                           View Details
                                                                         </button>
                                    </Link>
                                                                        }

                                    {/* META */}
                                    {/* {(activeItem.price || activeItem.dimensions) && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex flex-wrap gap-4 pt-4"
                                      >
                                        {activeItem.price && (
                                          <div className="px-4 py-2 rounded-lg bg-white text-sm font-medium shadow-sm">
                                            <span className="text-gray-500 mr-1">Price:</span>
                                            <span className="text-black font-semibold">
                                              ${activeItem.price}
                                            </span>
                                          </div>
                                        )}

                                        {activeItem.dimensions && (
                                          <div className="px-4 py-2 rounded-lg bg-white text-sm font-medium shadow-sm">
                                            <span className="text-gray-500 mr-1">Size:</span>
                                            <span className="text-black font-semibold">
                                              {activeItem.dimensions}
                                            </span>
                                          </div>
                                        )}
                                      </motion.div>
                                    )} */}
                                  </motion.div>
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