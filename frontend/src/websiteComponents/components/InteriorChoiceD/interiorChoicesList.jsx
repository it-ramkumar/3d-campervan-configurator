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
import { Link } from "react-router-dom";
import Heading2 from "../Common/Headings/Heading2";
import Heading3 from "../Common/Headings/Heading3";
import RichParagraph from "../Common/Paragraph/RichParagraph";

// --- Configuration Constant ---
const MAX_INITIAL_ITEMS = 3;

// --- Framer Motion Variants ---
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/interior`);
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
            categoryMap[cat._id].subCategories[sub._id] = { ...sub, items: [] };
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
    setExpandedCategories((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const toggleAllCategories = () => {
    const allExpanded = categories.length > 0 && Object.values(expandedCategories).every((v) => v);
    const newState = {};
    categories.forEach((cat) => { newState[cat._id] = !allExpanded; });
    setExpandedCategories(newState);
  };

  const toggleFullItemList = (categoryId) => {
    setShowFullItemListMap((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
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
  const clearFilters = () => { setSearchQuery(""); setSelectedCategoryFilter("all"); };

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

  const allExpanded = categories.length > 0 && Object.values(expandedCategories).every((v) => v);
  const hasActiveFilters = searchQuery.trim() || selectedCategoryFilter !== "all";

  return (
    <div className="min-h-screen bg-white py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
            <Heading2 text="Interior Design Choices" />
          </div>
          <RichParagraph>Here are the interior choices we offer:</RichParagraph>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="sm:w-64 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.title}</option>)}
            </select>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-4 sm:space-y-6">
          <AnimatePresence>
            {filteredCategories.map((cat, index) => {
              const activeSubId = activeSubCategoryMap[cat._id];
              const allActiveItems = activeSubId != null ? cat.subCategories.find((s) => s._id === activeSubId)?.items || [] : cat.items;
              const isFullListShown = showFullItemListMap[cat._id];
              const activeItems = isFullListShown ? allActiveItems : allActiveItems.slice(0, MAX_INITIAL_ITEMS);
              const activeItem = activeItemMap[cat._id];
              const isExpanded = expandedCategories[cat._id];
              const alternateLayout = index % 2 === 0;

              return (
                <motion.div key={cat._id} variants={categoryVariants} initial="hidden" animate="visible" className="bg-gray-50 rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <motion.div onClick={() => toggleCategory(cat._id)} className="p-4 sm:p-6 cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-2 bg-black rounded-xl">
                        <Tag className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <Heading3 text={cat.title} textColor="text" />
                        <div className="mt-4 max-w-3xl mx-auto">
                          <RichParagraph>{cat.description}</RichParagraph>
                        </div>
                      </div>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="hidden" className="p-4 sm:p-8 border-t border-gray-100">
                        {/* Subcategories */}
                        {cat.subCategories.length > 0 && (
                          <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {cat.subCategories.map((sub) => (
                              <button
                                key={sub._id}
                                onClick={() => {
                                  setActiveSubCategoryMap({ ...activeSubCategoryMap, [cat._id]: sub._id });
                                  setActiveItemMap({ ...activeItemMap, [cat._id]: sub.items[0] || null });
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeSubId === sub._id ? "bg-black text-white" : "bg-gray-200 text-gray-800"}`}
                              >
                                {sub.title}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Items Selection */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                          {activeItems.map((item) => (
                            <button
                              key={item._id}
                              onClick={() => setActiveItemMap({ ...activeItemMap, [cat._id]: item })}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeItem?._id === item._id ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}
                            >
                              {item.title}
                              {activeItem?._id === item._id && <CheckCircle className="h-4 w-4" />}
                            </button>
                          ))}
                        </div>

                        {/* Selected Item Details */}
                        <AnimatePresence mode="wait">
                          {activeItem && (
                            <motion.div key={activeItem._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl p-5 sm:p-8 shadow-inner">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className={`${alternateLayout ? "" : "md:order-2"}`}>
                                  {activeItem.images?.[0] && (
                                    <img src={activeItem.images[0]} alt={activeItem.title} className="w-full h-64 object-cover rounded-2xl shadow-lg" />
                                  )}
                                </div>
                                <div className={`space-y-4 ${alternateLayout ? "" : "md:order-1"}`}>
                                  <Heading3 text={activeItem.title} />
                                  {activeItem.description?.length > 0 && (
                                    <div className="space-y-3">
                                      {activeItem.description.map((desc, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                          <CheckCircle className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                                          <RichParagraph>{desc}</RichParagraph>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {activeItem.link && (
                                    <Link to={activeItem.link} target="_blank">
                                      <button className="mt-4 px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all">
                                        View Details
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