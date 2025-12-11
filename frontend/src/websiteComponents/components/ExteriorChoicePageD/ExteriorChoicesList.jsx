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

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/interior`
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
              Interior Choices
            </h1>
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg px-4">
            Curated list of design elements. Select categories, narrow down subcategories, and pick your preferred item.
          </p>
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
        </div>

        {/* Categories List */}
        <div className="space-y-4 sm:space-y-6">
          <AnimatePresence>
            {categories.map((cat, index) => {
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
                        <p className="text-gray-600 mt-2 max-w-3xl mx-auto text-xs sm:text-sm px-2">{cat.description}</p>
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
                          <div className="space-y-3 sm:space-y-4">
                            <motion.div
                              className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4"
                              variants={contentVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {cat.subCategories.map((sub) => (
                                <motion.button
                                  key={sub._id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    setActiveSubCategoryMap({
                                      ...activeSubCategoryMap,
                                      [cat._id]: activeSubCategoryMap[cat._id] === sub._id ? null : sub._id,
                                    });
                                    setActiveItemMap({
                                      ...activeItemMap,
                                      [cat._id]: sub.items[0] || null,
                                    });
                                    setShowFullItemListMap({ ...showFullItemListMap, [cat._id]: false });
                                  }}
                                  className={`group relative px-1 sm:px-1 py-1 sm:py-1 rounded-lg sm:rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center min-w-[140px] sm:min-w-[180px] shadow-sm
                                    ${activeSubId === sub._id
                                      ? "border-black bg-white text-black font-extrabold shadow-lg"
                                      : "border-gray-300 bg-gray-900 hover:border-black hover:bg-black/90 text-white"
                                    }`}
                                >
                                  {/* Title, Centered */}
                                  <div className="text-center">
                                    <div className="font-extrabold text-sm sm:text-base lg:text-lg">{sub.title}</div>
                                    {sub.description && (
                                      <div className="text-xs mt-1 opacity-90 line-clamp-2">{sub.description}</div>
                                    )}
                                  </div>
                                  {activeSubId === sub._id && (
                                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-black mt-1 sm:mt-2" />
                                  )}
                                </motion.button>
                              ))}
                            </motion.div>
                          </div>
                        )}

                        {/* Items Grid - CENTERED */}
                        {allActiveItems.length > 0 && (
                          <div className="space-y-3 sm:space-y-4">
                            <motion.div
                              className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4"
                              variants={contentVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {activeItems.map((item) => (
                                <motion.button
                                  key={item._id}
                                  variants={itemCardVariants}
                                  whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() =>
                                    setActiveItemMap({ ...activeItemMap, [cat._id]: item })
                                  }
                                  className={`group relative px-2 sm:px-4 py-1 sm:py-1 rounded-lg sm:rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center min-w-[120px] sm:min-w-[160px] shadow-sm
                                    ${activeItem?._id === item._id
                                      ? "border-black bg-white shadow-lg text-black"
                                      : "border-gray-300 bg-gray-900 hover:border-black hover:bg-black/90 text-white"
                                    }`}
                                >
                                  {/* Item Title, Centered */}
                                  <div className="space-y-1 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                      <span className="font-extrabold text-sm sm:text-base lg:text-lg">
                                        {item.title}
                                      </span>
                                    </div>
                                    {activeItem?._id === item._id && (
                                      <div className="flex justify-center">
                                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-black mt-1 sm:mt-2" />
                                      </div>
                                    )}
                                  </div>
                                </motion.button>
                              ))}
                            </motion.div>

                            {/* See More/Show Less Button */}
                            {needsMoreButton && (
                              <motion.div className="flex justify-center pt-3 sm:pt-4">
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => toggleFullItemList(cat._id)}
                                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
                                >
                                  {isFullListShown ? (
                                    <>
                                      <ChevronUp className="h-4 w-4" />
                                      Show Less ({allActiveItems.length - MAX_INITIAL_ITEMS} Hidden)
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="h-4 w-4" />
                                      See More ({allActiveItems.length - MAX_INITIAL_ITEMS} Items)
                                    </>
                                  )}
                                </motion.button>
                              </motion.div>
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
                              transition={{ duration: 0.4 }}
                              className="mt-4 sm:mt-6 pt-6 sm:pt-8 border-t border-gray-100"
                            >
                              <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-inner border border-gray-200">
                                {/* ALTERNATING GRID LAYOUT */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                                  {/* IMAGE SECTION - Alternates based on category index */}
                                  {activeItem.images?.[0] && (
                                    <motion.div
                                      initial={{ opacity: 0, x: alternateLayout ? -20 : 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.2 }}
                                      className={`${alternateLayout ? '' : 'md:order-2'}`}
                                    >
                                      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl border border-gray-300">
                                        <img
                                          src={activeItem.images[0]}
                                          alt={activeItem.title}
                                          className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                                        />
                                      </div>
                                    </motion.div>
                                  )}

                                  {/* CONTENT SECTION - Alternates based on category index */}
                                  <motion.div
                                    initial={{ opacity: 0, x: alternateLayout ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className={`space-y-4 sm:space-y-6 ${alternateLayout ? '' : 'md:order-1'}`}
                                  >
                                    <div>
                                      <h4 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4 border-b border-gray-200 pb-2">
                                        {activeItem.title}
                                      </h4>

                                      {activeItem.description?.length > 0 && (
                                        <div className="space-y-3 sm:space-y-4 mt-4">
                                          <ul className="space-y-2 sm:space-y-3">
                                            {activeItem.description.map((desc, i) => (
                                              <motion.li
                                                key={i}
                                                initial={{ x: -10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-300"
                                              >
                                                <div className="p-1 sm:p-1.5 bg-black rounded-lg flex-shrink-0">
                                                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                                </div>
                                                <span className="text-gray-700 text-sm sm:text-base">{desc}</span>
                                              </motion.li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>

                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.6 }}
                                      className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-200"
                                    >
                                      {activeItem.price && (
                                        <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-300">
                                          <div className="text-xs sm:text-sm text-gray-700 font-medium mb-1">Price</div>
                                          <div className="text-xl sm:text-2xl font-bold text-black">${activeItem.price}</div>
                                        </div>
                                      )}
                                      {activeItem.dimensions && (
                                        <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-300">
                                          <div className="text-xs sm:text-sm text-gray-700 font-medium mb-1">Dimensions</div>
                                          <div className="text-base sm:text-lg font-semibold text-black">{activeItem.dimensions}</div>
                                        </div>
                                      )}
                                    </motion.div>
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