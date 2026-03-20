"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown, Sparkles, Tag, Search, Truck, Filter, X, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Heading2, RichParagraph, Heading3, Heading4, ImageWithSkeleton, SecondaryButton, PrimaryButton } from '../Common/Common';

const MAX_INITIAL_ITEMS = 50;


// --- 1. RenderBlocks: Updated to show Titles correctly ---
const RenderBlocks = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-8 mt-6">
      {blocks.sort((a, b) => a.order - b.order).map((block, idx) => {
        switch (block.block_type) {
          case 'heading':
            // Yahan block.title ko ensure kiya gaya hai
            return <div key={idx} className="mb-4"><Heading2 text={block.title} /></div>;
          case 'subheading':
            return <div key={idx} className="mb-2"><Heading3 text={block.title} /></div>;
          case 'paragraph':
            return <div key={idx} className="text-primary/70 leading-relaxed text-base font-medium">{block.content}</div>;
          case 'list':
            return (
              <div key={idx} className="bg-secondary/30 p-6 rounded-lg border border-primary/5">
                {/* Agar title hai toh lazmi show hoga */}
                {block.title && <p className="font-black text-primary uppercase text-xs tracking-widest mb-4">{block.title}</p>}
                <ul className="space-y-4">
                  {block.list_items?.map((item, iIdx) => (
                    <li key={iIdx} className="group">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 bg-primary/10 p-1 rounded-lg group-hover:bg-hover transition-colors">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary group-hover:text-white" />
                        </div>
                        <span className="text-primary/80 font-semibold">{item.text}</span>
                      </div>
                      {item.sub_items?.length > 0 && (
                        <ul className="ml-8 mt-3 space-y-2 border-l-2 border-primary/10 pl-5">
                          {item.sub_items.map((sub, sIdx) => (
                            <li key={sIdx} className="text-sm text-primary/60 flex items-center gap-2 hover:!text-hover transition-colors">
                              <span className="w-1.5 h-1.5 bg-hover rounded-lg shrink-0"></span>
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
              <div key={idx} className="overflow-hidden my-6 border-2 border-primary/5 rounded-lg shadow-sm">
                {block.title && <div className="p-4 bg-primary text-white font-bold text-sm uppercase tracking-wider">{block.title}</div>}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-secondary text-primary">
                      <tr>
                        {block.table_data?.headers.map((h, hi) => (
                          <th key={hi} className="px-6 py-4 font-black uppercase text-[10px] tracking-widest border-b border-primary/10">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {block.table_data?.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-primary/5 last:border-0 hover:bg-secondary/20 transition-colors">
                          {row.map((cell, ci) => (
                            <td key={ci} className="px-6 py-4 text-primary/70 font-medium">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

// Animation Configs
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
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

const filteredCategories = (() => {
  let filtered = [...categories];

  // Category filter
  if (selectedCategoryFilter !== "all") {
    filtered = filtered.filter(cat => cat._id === selectedCategoryFilter);
  }

  // Agar search empty hai
  if (!searchQuery.trim()) {
    return filtered.slice().reverse(); // ✅ yahan reverse
  }

  const query = searchQuery.toLowerCase();

  const result = filtered.map(cat => {
    const categoryMatch = cat.title.toLowerCase().includes(query);

    const filteredSubCategories = cat.subCategories.map(sub => {
      const filteredItems = sub.items.filter(item =>
        item.title?.toLowerCase().includes(query) ||
        item.description?.some(d => d.toLowerCase().includes(query)) ||
        item.blocks?.some(b =>
          b.title?.toLowerCase().includes(query) ||
          b.content?.toLowerCase().includes(query)
        )
      );

      return {
        ...sub,
        items: filteredItems,
        hasMatch:
          sub.title.toLowerCase().includes(query) ||
          filteredItems.length > 0
      };
    }).filter(sub => sub.hasMatch);

    const filteredDirectItems = cat.items.filter(item =>
      item.title?.toLowerCase().includes(query) ||
      item.description?.some(d => d.toLowerCase().includes(query))
    );

    return {
      ...cat,
      subCategories: filteredSubCategories,
      items: filteredDirectItems,
      hasMatch:
        categoryMatch ||
        filteredSubCategories.length > 0 ||
        filteredDirectItems.length > 0
    };
  }).filter(cat => cat.hasMatch);

  return result.slice().reverse(); // ✅ final reverse yahan
})();
  return (
    <div className="bg-secondary/40 backdrop-blur-3xl rounded-lg p-4 sm:p-10 border border-primary/5">

      {/* --- SEARCH & FILTER BAR: Premium Glassmorphism --- */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 shadow-2xl border border-white flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
            <input
              type="text"
              placeholder="Search by keyword, material, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-secondary/50 border-none rounded-lg focus:ring-2 focus:ring-hover/20 outline-none text-primary font-bold placeholder:text-primary/20 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30 pointer-events-none" />
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full lg:w-72 pl-14 pr-12 py-5 bg-primary text-white rounded-lg outline-none appearance-none font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-hover transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.title}</option>)}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* --- CATEGORIES FEED --- */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((cat, index) => {
            const activeSubId = activeSubCategoryMap[cat._id];
            const allActiveItems = activeSubId != null ? cat.subCategories.find((s) => s._id === activeSubId)?.items || [] : cat.items;
            const activeItems = showFullItemListMap[cat._id] ? allActiveItems : allActiveItems.slice(0, MAX_INITIAL_ITEMS);
            const activeItem = activeItemMap[cat._id];
            const isExpanded = expandedCategories[cat._id];
            const isEven = index % 2 === 0;

            return (
              <motion.div key={cat._id} variants={itemVariants} layout className="bg-white rounded-lg border border-primary/5 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">

                {/* Category Trigger */}
                <div
                  onClick={() => toggleCategory(cat._id)}
                  className="p-8 cursor-pointer flex items-center justify-between gap-6 group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-secondary text flex items-center justify-center rounded-lg group-hover:bg-primary transition-all duration-500">
                      <Tag className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <Heading2 text={cat.title} />
                      <RichParagraph className="text-primary/40  mt-1 uppercase">{cat.subCategories.length || cat.items.length} Options Available</RichParagraph>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center transition-all ${isExpanded ? 'bg-primary border-primary' : 'group-hover:border-hover'}`}>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-white' : 'text-primary'}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >

                        {/* Sub-Nav System */}
                        {cat.subCategories.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                            {cat.subCategories.map((sub) => {
                              const isActive = activeSubId === sub._id;

                              return (
                                <SecondaryButton
                                  key={sub._id}
                                  onClick={() => {
                                    setActiveSubCategoryMap({ ...activeSubCategoryMap, [cat._id]: sub._id });
                                    setActiveItemMap({ ...activeItemMap, [cat._id]: sub.items[0] || null });
                                  }}
                                  className={`text-left p-5 rounded-lg border-2 transition-all duration-300 group
          ${isActive
                                      ? "bg-primary border-primary shadow-lg scale-[1.02]"
                                      : "bg-white border-secondary  hover:border-hover"
                                    }`}
                                  label={
                                    <div>
                                      <Heading4
                                        className={`font-bold
                ${isActive ? "text-primary" : "text-primary"}
                group-hover:${isActive ? "text-secondary" : "!text-hover"}
                transition-colors`}
                                        text={sub.title}
                                      />
                                      {sub.description && (
                                        <p
                                          className={`text-[11px] mt-2 line-clamp-2 leading-relaxed
                  ${isActive ? "text-primary hover:text-secondary" : "text-primary/50"}
                  group-hover:${isActive ? "text-secondary/70 " : "!text-hover/70"}
                  transition-colors`}
                                        >
                                          {sub.description}
                                        </p>
                                      )}
                                    </div>
                                  }
                                />
                              );
                            })}
                          </div>)}

                        {/* Item Chips */}
                      {/* Item Chips - Fixed Title Logic */}
<div className="flex flex-wrap gap-2 mb-12 bg-secondary/30 p-4 rounded-lg">
  {activeItems.map((item) => {
    const isActive = activeItem?._id === item._id;

    // Dusri file wali logic yahan add ki hai taaki "Untitled" na aaye
    const buttonLabel =
      item.heading ||
      item.title ||
      item.blocks?.find((b) => b.block_type === "heading")?.title ||
      "Untitled Option";

    return (
      <PrimaryButton
        key={item._id}
        onClick={() => setActiveItemMap({ ...activeItemMap, [cat._id]: item })}
        className={`uppercase transition-all ${
          isActive
            ? "bg-primary text-secondary shadow-lg"
            : "bg-white !text-primary/60 hover:!text-secondary"
        }`}
        label={buttonLabel} // Ab ye buttonLabel use karega
      />
    );
  })}
</div>

                        {/* Feature Display Card */}
                        <AnimatePresence mode="wait">
                          {activeItem && (
                            <motion.div
                              key={activeItem._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.5 }}
                              className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 lg:p-12 border border-white shadow-xl overflow-hidden"
                            >
                              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>

                                {/* --- Image Section with Portrait Fix --- */}
                                <div className={`relative group w-full ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                                  {/* Subtle Glow Background */}
                                  <div className="absolute inset-0 bg-primary/5 rounded-lg blur-3xl group-hover:bg-primary transition-all duration-700" />

                                  {/* Image Container: Fixed Aspect Ratio for Portrait Images */}
                                  <div className="relative z-10 overflow-hidden rounded-lg border-4 border-white shadow-2xl mx-auto bg-gray-100">
                                    <ImageWithSkeleton
                                      src={activeItem.images?.[0]}
                                      alt={activeItem.title}
                                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                  </div>
                                </div>

                                {/* --- Content Section --- */}
                                <div className={`space-y-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                                  <div>
                                    {/* <RichParagraph className="uppercase ">
                                      Featured Option
                                    </RichParagraph> */}
                                    <div className="mt-4">
                                      <Heading3 text={activeItem.title} />
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    {activeItem.description?.map((desc, i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4 p-5 bg-secondary rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow"
                                      >
                                        <div className="mt-1">
                                          <Truck className="h-5 w-5 text-primary shrink-0" />
                                        </div>
                                        <RichParagraph className=" italic">
                                          {desc}
                                        </RichParagraph>
                                      </motion.div>
                                    ))}
                                  </div>

                                  <RenderBlocks blocks={activeItem.blocks} />

                                  {activeItem.link && (
                                    <div className="pt-6">
                                      <Link to={activeItem.link} target="_blank" className="inline-block">
                                        <button className="group flex items-center gap-6 bg-primary text-secondary pl-8 pr-3 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#001F3D]/90 transition-all shadow-lg hover:shadow-xl">
                                         {activeItem.title === "AquaGuard Performance Laminate Flooring" || activeItem.title === "AquaGuard Bamboo Flooring" ? "view flooring options" : "view stain options"}
                                          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-all">
                                            <ArrowRight size={18} />
                                          </div>
                                        </button>
                                      </Link>
                                    </div>
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
      </motion.div>

      {/* No Results Fallback */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-40 bg-white rounded-lg border-2 border-dashed border-primary/10">
          <div className="bg-secondary w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-primary/20" />
          </div>
          <Heading3 text="No matches found" />
          <button onClick={() => setSearchQuery("")} className="mt-4 !text-hover font-bold hover:underline">Clear all filters</button>
        </div>
      )}
    </div>
  );
}