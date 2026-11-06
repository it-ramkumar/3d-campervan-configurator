"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import { Search, ChevronDown, ChevronUp, Zap, Shield, Droplets, Sun, Grid, Palette, X, ArrowRight, Star, Sparkles, Download, Maximize2, Minus, Plus } from "lucide-react";
import { RichParagraph, Heading1 } from "@/components/Common/Common";
// Fabric data with colors and images (Data is unchanged, kept for completeness)
const fabricData = {
  "Classic Chenille": {
    description: "Our everyday favorite. A soft chenille with a linen-style weave that feels warm and relaxed, and keeps its shape after years of sitting, lounging and sleeping.",
    colors: [
      { id: "CC-01", name: "Dark Chocolate", code: "#2E2B27", image: "cushion-fabrics/cc-01.webp" },
      { id: "CC-02", name: "Mocha", code: "#483E32", image: "cushion-fabrics/cc-02.webp" },
      { id: "CC-03", name: "Light Tan", code: "#91725F", image: "cushion-fabrics/cc-03.webp" },
      { id: "CC-04", name: "Off-White", code: "#E1D6CB", image: "cushion-fabrics/cc-04.webp" },
      { id: "CC-05", name: "Mustard", code: "#BD8C4A", image: "cushion-fabrics/cc-05.webp" },
      { id: "CC-06", name: "Grass Green", code: "#69795F", image: "cushion-fabrics/cc-06.webp" },
      { id: "CC-07", name: "Navy", code: "#262A34", image: "cushion-fabrics/cc-07.webp" },
      { id: "CC-08", name: "Light Heather Gray", code: "#767676", image: "cushion-fabrics/cc-08.webp" },
      { id: "CC-09", name: "Medium Heather Gray", code: "#5B5B5B", image: "cushion-fabrics/cc-09.webp" },
      { id: "CC-10", name: "Black", code: "#1D1F21", image: "cushion-fabrics/cc-10.webp" }
    ]
  },
  "Textured Weave": {
    description: "A breathable, nubby woven fabric with real texture. The weave hides crumbs, dust and everyday wear, so it is a great pick for vans that see trails, beaches and kids.",
    colors: [
      { id: "TW-01", name: "Cloud White", code: "#CCCCC7", image: "cushion-fabrics/tw-01.webp" },
      { id: "TW-02", name: "Ivory", code: "#C6BEB7", image: "cushion-fabrics/tw-02.webp" },
      { id: "TW-03", name: "Linen Beige", code: "#B6AFA5", image: "cushion-fabrics/tw-03.webp" },
      { id: "TW-04", name: "Driftwood", code: "#857D74", image: "cushion-fabrics/tw-04.webp" },
      { id: "TW-05", name: "Mushroom", code: "#625951", image: "cushion-fabrics/tw-05.webp" },
      { id: "TW-06", name: "Espresso", code: "#281B14", image: "cushion-fabrics/tw-06.webp" },
      { id: "TW-07", name: "Blush", code: "#E1CCC2", image: "cushion-fabrics/tw-07.webp" },
      { id: "TW-08", name: "Burnt Orange", code: "#B14B2C", image: "cushion-fabrics/tw-08.webp" },
      { id: "TW-09", name: "Sunflower", code: "#D7AE60", image: "cushion-fabrics/tw-09.webp" },
      { id: "TW-10", name: "Sky Blue", code: "#8D9EA8", image: "cushion-fabrics/tw-10.webp" },
      { id: "TW-11", name: "Sage Mint", code: "#99AAA0", image: "cushion-fabrics/tw-11.webp" },
      { id: "TW-12", name: "Teal", code: "#47706B", image: "cushion-fabrics/tw-12.webp" },
      { id: "TW-13", name: "Forest Green", code: "#31443D", image: "cushion-fabrics/tw-13.webp" },
      { id: "TW-14", name: "Denim Blue", code: "#34516D", image: "cushion-fabrics/tw-14.webp" },
      { id: "TW-15", name: "Pale Silver", code: "#A9B0B9", image: "cushion-fabrics/tw-15.webp" },
      { id: "TW-16", name: "Pebble Gray", code: "#A1A2A1", image: "cushion-fabrics/tw-16.webp" },
      { id: "TW-17", name: "Slate Gray", code: "#707274", image: "cushion-fabrics/tw-17.webp" },
      { id: "TW-18", name: "Charcoal", code: "#2F2F31", image: "cushion-fabrics/tw-18.webp" },
      { id: "TW-19", name: "Black", code: "#262626", image: "cushion-fabrics/tw-19.webp" }
    ]
  },
  "Fine Linen": {
    description: "A fine, tightly woven linen-style fabric. Breathable and smooth, with a crisp tailored look that suits modern and minimalist interiors.",
    colors: [
      { id: "FL-01", name: "Deep Teal", code: "#1D363D", image: "cushion-fabrics/fl-01.webp" },
      { id: "FL-02", name: "White", code: "#C5C8CE", image: "cushion-fabrics/fl-02.webp" },
      { id: "FL-03", name: "Oatmeal", code: "#979187", image: "cushion-fabrics/fl-03.webp" },
      { id: "FL-04", name: "Natural Flax", code: "#999283", image: "cushion-fabrics/fl-04.webp" },
      { id: "FL-05", name: "Graphite", code: "#1F1C18", image: "cushion-fabrics/fl-05.webp" },
      { id: "FL-06", name: "Dusty Rose", code: "#834A51", image: "cushion-fabrics/fl-06.webp" },
      { id: "FL-07", name: "Terracotta", code: "#6E3E2F", image: "cushion-fabrics/fl-07.webp" },
      { id: "FL-08", name: "Cinnamon", code: "#65412B", image: "cushion-fabrics/fl-08.webp" },
      { id: "FL-09", name: "Golden Ochre", code: "#7F5526", image: "cushion-fabrics/fl-09.webp" },
      { id: "FL-10", name: "Ocean Blue", code: "#182836", image: "cushion-fabrics/fl-10.webp" },
      { id: "FL-11", name: "Light Gray", code: "#91959C", image: "cushion-fabrics/fl-11.webp" },
      { id: "FL-12", name: "Steel Gray", code: "#515457", image: "cushion-fabrics/fl-12.webp" },
      { id: "FL-13", name: "Midnight Navy", code: "#1D1E1F", image: "cushion-fabrics/fl-13.webp" },
      { id: "FL-14", name: "Black", code: "#171717", image: "cushion-fabrics/fl-14.webp" }
    ]
  },
  "Soft-Touch Fleece": {
    description: "A brushed, skin-friendly fleece that feels great against bare legs and is cozy for sleeping on. The heathered colors are forgiving and easy to live with.",
    colors: [
      { id: "SF-01", name: "Silver Mist", code: "#B4B6B6", image: "cushion-fabrics/sf-01.webp" },
      { id: "SF-02", name: "Oat Beige", code: "#C0BAAE", image: "cushion-fabrics/sf-02.webp" },
      { id: "SF-03", name: "Dusty Pink", code: "#BB9291", image: "cushion-fabrics/sf-03.webp" },
      { id: "SF-04", name: "Moss Green", code: "#728260", image: "cushion-fabrics/sf-04.webp" },
      { id: "SF-05", name: "Cocoa", code: "#856A57", image: "cushion-fabrics/sf-05.webp" },
      { id: "SF-06", name: "Chestnut", code: "#573A28", image: "cushion-fabrics/sf-06.webp" },
      { id: "SF-07", name: "Snow White", code: "#DDDED8", image: "cushion-fabrics/sf-07.webp" },
      { id: "SF-08", name: "Sage Gray", code: "#767C71", image: "cushion-fabrics/sf-08.webp" },
      { id: "SF-09", name: "Dove Gray", code: "#9A9B98", image: "cushion-fabrics/sf-09.webp" },
      { id: "SF-10", name: "Taupe", code: "#776C63", image: "cushion-fabrics/sf-10.webp" },
      { id: "SF-11", name: "Pumpkin", code: "#9B5834", image: "cushion-fabrics/sf-11.webp" },
      { id: "SF-12", name: "Brick Red", code: "#933F2D", image: "cushion-fabrics/sf-12.webp" },
      { id: "SF-13", name: "Navy", code: "#181E27", image: "cushion-fabrics/sf-13.webp" },
      { id: "SF-14", name: "Ash Gray", code: "#797B77", image: "cushion-fabrics/sf-14.webp" },
      { id: "SF-15", name: "Olive", code: "#464E2F", image: "cushion-fabrics/sf-15.webp" },
      { id: "SF-16", name: "Black", code: "#181818", image: "cushion-fabrics/sf-16.webp" }
    ]
  },
  "Plush Velvet": {
    description: "Our softest and thickest fabric. A plush chenille-velvet with a rich, luxurious hand and deep color, from crisp whites to jewel tones.",
    colors: [
      { id: "PV-01", name: "Pure White", code: "#D1D1D5", image: "cushion-fabrics/pv-01.webp" },
      { id: "PV-02", name: "Ivory", code: "#D7D5D0", image: "cushion-fabrics/pv-02.webp" },
      { id: "PV-03", name: "Cream", code: "#D6D0C6", image: "cushion-fabrics/pv-03.webp" },
      { id: "PV-04", name: "Greige", code: "#7B7463", image: "cushion-fabrics/pv-04.webp" },
      { id: "PV-05", name: "Apricot", code: "#965427", image: "cushion-fabrics/pv-05.webp" },
      { id: "PV-06", name: "Rose", code: "#8E595F", image: "cushion-fabrics/pv-06.webp" },
      { id: "PV-07", name: "Burgundy", code: "#460B1D", image: "cushion-fabrics/pv-07.webp" },
      { id: "PV-08", name: "Bark Brown", code: "#423A2C", image: "cushion-fabrics/pv-08.webp" },
      { id: "PV-09", name: "Olive", code: "#4A4932", image: "cushion-fabrics/pv-09.webp" },
      { id: "PV-10", name: "Emerald", code: "#233A31", image: "cushion-fabrics/pv-10.webp" },
      { id: "PV-11", name: "Hunter Green", code: "#343E33", image: "cushion-fabrics/pv-11.webp" },
      { id: "PV-12", name: "Royal Navy", code: "#242C41", image: "cushion-fabrics/pv-12.webp" },
      { id: "PV-13", name: "Heather Gray", code: "#44494D", image: "cushion-fabrics/pv-13.webp" },
      { id: "PV-14", name: "Charcoal", code: "#34353A", image: "cushion-fabrics/pv-14.webp" },
      { id: "PV-15", name: "Smoke", code: "#2B2A2A", image: "cushion-fabrics/pv-15.webp" },
      { id: "PV-16", name: "Black", code: "#0E0E0E", image: "cushion-fabrics/pv-16.webp" }
    ]
  },
  "Corduroy": {
    description: "A fine-wale corduroy with a delicate ribbed texture. Comfortable to the touch, with a warm vintage character that pairs beautifully with wood interiors.",
    colors: [
      { id: "CD-01", name: "Cream", code: "#CDCAC2", image: "cushion-fabrics/cd-01.webp" },
      { id: "CD-02", name: "Light Stone", code: "#A6A299", image: "cushion-fabrics/cd-02.webp" },
      { id: "CD-03", name: "Rust", code: "#A54D34", image: "cushion-fabrics/cd-03.webp" },
      { id: "CD-04", name: "Ochre", code: "#A56B30", image: "cushion-fabrics/cd-04.webp" },
      { id: "CD-05", name: "Blush Pink", code: "#B1777B", image: "cushion-fabrics/cd-05.webp" },
      { id: "CD-06", name: "Pine Green", code: "#526157", image: "cushion-fabrics/cd-06.webp" },
      { id: "CD-07", name: "Powder Blue", code: "#899697", image: "cushion-fabrics/cd-07.webp" },
      { id: "CD-08", name: "Slate Blue", code: "#4C5765", image: "cushion-fabrics/cd-08.webp" },
      { id: "CD-09", name: "Graphite", code: "#6A6A6A", image: "cushion-fabrics/cd-09.webp" },
      { id: "CD-10", name: "Midnight Navy", code: "#23252A", image: "cushion-fabrics/cd-10.webp" }
    ]
  },
  "Pet-Proof Performance": {
    description: "Built for vans that travel with dogs and cats. The tight, smooth surface resists claws and snagging, and wipes clean with a damp cloth.",
    colors: [
      { id: "PP-01", name: "Cream", code: "#E6E0D6", image: "cushion-fabrics/pp-01.webp" },
      { id: "PP-02", name: "Stone Gray", code: "#58554E", image: "cushion-fabrics/pp-02.webp" },
      { id: "PP-03", name: "Honey Gold", code: "#D19A49", image: "cushion-fabrics/pp-03.webp" },
      { id: "PP-04", name: "Caramel", code: "#A1613A", image: "cushion-fabrics/pp-04.webp" },
      { id: "PP-05", name: "Sand", code: "#AB8E6F", image: "cushion-fabrics/pp-05.webp" },
      { id: "PP-06", name: "Black", code: "#1E1E1E", image: "cushion-fabrics/pp-06.webp" }
    ]
  },
  "Waterproof Outdoor": {
    description: "A tough, waterproof outdoor fabric with a UV-resistant finish. Water beads right off, which makes it ideal for rear garages, moto vans, wet gear and outdoor seating.",
    colors: [
      { id: "OX-01", name: "Royal Blue", code: "#3A4D81", image: "cushion-fabrics/ox-01.webp" },
      { id: "OX-02", name: "Army Green", code: "#444C38", image: "cushion-fabrics/ox-02.webp" },
      { id: "OX-03", name: "Slate Teal", code: "#57686A", image: "cushion-fabrics/ox-03.webp" },
      { id: "OX-04", name: "Sand", code: "#D4BA9E", image: "cushion-fabrics/ox-04.webp" },
      { id: "OX-05", name: "White", code: "#D7D8CF", image: "cushion-fabrics/ox-05.webp" },
      { id: "OX-06", name: "Sunshine Yellow", code: "#DF9F1E", image: "cushion-fabrics/ox-06.webp" },
      { id: "OX-07", name: "Charcoal", code: "#373737", image: "cushion-fabrics/ox-07.webp" }
    ]
  }
};


// Color Detail Modal Component
function ColorDetailModal({ color, fabricName, fabricDescription, isOpen, onClose, onNavigate }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);


useEffect(() => {
  if (isOpen) {
    document.body.classList.add('no-scroll');
    setImageLoaded(false);
    setZoomLevel(1);
  } else {
    document.body.classList.remove('no-scroll');
  }

  // Cleanup function: Jab component unmount ho ya close ho,
  // toh scroll lazmi wapas enable ho jaye
  return () => {
    document.body.classList.remove('no-scroll');
  };
}, [isOpen]);


  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleDownload = async () => {
    if (!color || !color.image) return;

    try {
      const response = await fetch(color.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${color.id}_${fabricName}_${color.name}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open image in new tab
      window.open(color.image, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-x-0 top-16 bottom-0 z-[100] flex items-center justify-center pt-24 p-2 sm:p-4 bg-black/80 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white ">
          <div className="flex items-center gap-3 sm:gap-4 ">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl border-2 sm:border-3 border-gray-300 shadow-lg"
              style={{ backgroundColor: color.code }}
            />
            <div>
              <Heading1 variant="card" text={color.name}/>
              <RichParagraph>{color.id}</RichParagraph>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownload}
              className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(95vh-80px)] sm:h-[calc(90vh-120px)]">
          {/* Image Section */}
          <div className="lg:w-1/2 p-3 sm:p-4 md:p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Heading1 variant="sub" text={"Fabric Preview"} className="text-gray-900"/>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-all duration-300"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <span className="text-xs sm:text-sm font-mono bg-gray-100 px-2 sm:px-3 py-1 rounded-lg">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-all duration-300"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
                >
                  <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 relative bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-3 border-gray-300">

    <ImageWithSkeleton
                    src={color.image}
                    alt={color.name}
                    className={`w-full h-full object-cover transition-all duration-500 `}
                    style={{ transform: `scale(${zoomLevel})` }}

                  />


              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-3 sm:p-4 md:p-6 overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
            <div className="space-y-4 sm:space-y-6">
              {/* Fabric Info */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                <Heading1 variant="sub" text={"Fabric Information"} className="mb-2" />
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <Heading1 variant="sub" text={"Fabric Type"} className="!text-sm !text-gray-500"/>
                    <RichParagraph className="font-semibold">{fabricName}</RichParagraph>
                  </div>
                  <div>
                    <Heading1 variant="sub" text={"Description"} className="!text-sm !text-gray-500"/>
                    <RichParagraph>{fabricDescription}</RichParagraph>
                  </div>
                  <div>
                    <Heading1 variant="sub" text={"Color Family"} className="!text-sm !text-gray-500"/>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
                      <div
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-gray-300 shadow-md"
                        style={{ backgroundColor: color.code }}
                      />
                       <Heading1 variant="sub" text={color.name} className="!text-sm "/>
                      {/* <span className="font-medium text-gray-900 text-sm sm:text-base">{color.name}</span> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Properties */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                <Heading1 variant="sub" text={"Color Properties"} className="mb-2" />
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <Heading1 variant="sub" text={"Color Code"} className="!text-sm !text-gray-500 mb-2"/>
                    <Heading1 variant="sub" text={color.id} className="!text-base "/>
                    {/* <span className="text-xs sm:text-sm text-gray-500 block mb-1">Hex Code</span> */}
                    {/* <span className="font-mono font-bold text-gray-900 text-sm sm:text-base">{color.code}</span> */}
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <Heading1 variant="sub" text={"Color Name"} className="!text-sm !text-gray-500 mb-2"/>
                    <Heading1 variant="sub" text={color.name} className="!text-base "/>
                    {/* <span className="text-xs sm:text-sm text-gray-500 block mb-1">Color Name</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{color.name}</span> */}
                  </div>
                </div>
              </div>

              {/* Fabric Features */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                <Heading1 variant="sub" text={"Fabric Features"} className="mb-2" />
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div>
                      <RichParagraph variant="sub" className="font-semibold !text-gray-900">{"Durable"}</RichParagraph>
                      <RichParagraph variant="sub" className="!text-gray-600">{"Long-lasting"}</RichParagraph>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Droplets className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <div>
                      <RichParagraph variant="sub" className="font-semibold !text-gray-900">{"Easy Clean"}</RichParagraph>
                      <RichParagraph variant="sub" className="!text-gray-600">{"Low maintenance"}</RichParagraph>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                    </div>
                    <div>
                      <RichParagraph variant="sub" className="font-semibold !text-gray-900">{"Premium"}</RichParagraph>
                      <RichParagraph variant="sub" className="!text-gray-600">{"High quality"}</RichParagraph>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                    </div>
                    <div>
                      <RichParagraph variant="sub" className="font-semibold !text-gray-900">{"Fade Resistant"}</RichParagraph>
                      <RichParagraph variant="sub" className="!text-gray-600">{"UV protected"}</RichParagraph>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perfect For Section */}
              <div className="bg-gradient-to-br from-primary to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
                <Heading1 variant="sub" text={"Perfect For"} className="!font-bold  text-secondary mb-4"/>

                <ul className="space-y-1 sm:space-y-2">
                  <li className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                    <RichParagraph className="text-white">{"Dinette bench cushions"}</RichParagraph>
                    {/* <span className="text-sm sm:text-base">Dinette bench cushions</span> */}
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                    <RichParagraph className="text-white">{"Van conversion interiors"}</RichParagraph>
                    {/* <span className="text-sm sm:text-base">Van conversion interiors</span> */}
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                    <RichParagraph className="text-white">{"RV furniture upholstery"}</RichParagraph>
                    {/* <span className="text-sm sm:text-base">RV furniture upholstery</span> */}
                  </li>
                  <li className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                    <RichParagraph className="text-white">{"Custom cushion projects"}</RichParagraph>
                    {/* <span className="text-sm sm:text-base">Custom cushion projects</span> */}
                  </li>
                </ul>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-200">
                <button
                  onClick={() => onNavigate('prev')}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base"
                >
                  <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  Previous Color
                </button>
                <button
                  onClick={() => onNavigate('next')}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base"
                >
                  Next Color
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ColorSwatch({ color, index, isSelected, onClick, onViewDetails, fabricName }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Always show details button on mobile
  const showDetailsButton = isMobile || isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 300 }}
      className={`relative group cursor-pointer ${
        isSelected ? 'ring-3 sm:ring-4 ring-black ring-offset-2 sm:ring-offset-4' : 'ring-1 sm:ring-2 ring-gray-200'
      } transition-all duration-500 bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl hover:shadow-2xl overflow-hidden w-full mx-auto`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Enhanced Color Display with Modern Layout */}
        <div className="w-full h-28 sm:h-40 md:h-52 lg:h-64 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-50" />

          {/* Actual Image with Enhanced Overlay */}
          {!imageError ? (
            <div className="relative w-full h-full">
              <ImageWithSkeleton
                src={color.image}
                alt={color.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"


              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
            </div>
          ) : (
            // Enhanced Fallback with modern pattern
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{ backgroundColor: color.code }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-white/10 mix-blend-overlay" />
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_1px_1px,white_2px,transparent_0)] bg-[length:30px_30px]" />
              <span className="text-white font-bold text-xs sm:text-sm md:text-xl drop-shadow-2xl z-10 px-2 sm:px-4 md:px-6 text-center bg-black/30 backdrop-blur-sm py-1 sm:py-2 md:py-3 rounded-lg md:rounded-2xl">
                {color.name}
              </span>
            </div>
          )}

          {/* Selection Indicator */}
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 left-1 sm:top-2 sm:left-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-2xl z-10"
            >
              <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-black rounded-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* Always visible details button on mobile, hover on desktop */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-end justify-center pb-2 sm:pb-3 md:pb-6 ${
            showDetailsButton ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: showDetailsButton ? 0 : 20, opacity: showDetailsButton ? 1 : 0 }}
              className="flex bg-white/90 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 items-center gap-1 sm:gap-2 shadow-2xl cursor-pointer mx-2"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(color, fabricName);
              }}
            >
              <span className="font-bold text-gray-900 text-xs sm:text-sm">Details</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
            </motion.div>
          </div>

          {/* Floating Badge */}
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-black/80 backdrop-blur-sm text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold">
            {color.id}
          </div>
        </div>

        {/* Enhanced Text Information */}
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 bg-white border-t border-gray-100">
          <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-3">
            <RichParagraph className="!font-bold !text-base">{color.name}</RichParagraph>
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-md sm:rounded-lg md:rounded-xl border-2 border-gray-300 shadow-md ring-1 ring-gray-200"
                style={{ backgroundColor: color.code }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">

            <RichParagraph variant="sub" className="!text-gray-600 font-mono bg-gray-100 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 rounded-md sm:rounded-lg">{color.id}</RichParagraph>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-100 rounded-md sm:rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-gray-600" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FabricSection({ fabricName, fabricInfo, isExpanded, onToggle, selectedColor, onColorSelect, onViewDetails }) {
  const sectionRef = React.useRef(null);

  const handleToggle = () => {
    onToggle();
    if (!isExpanded && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 150);
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl hover:shadow-2xl border border-gray-300 overflow-hidden mb-4 sm:mb-6 transition-all duration-500 group"
    >
      <div
        className="p-3 sm:p-4 md:p-6 lg:p-8 cursor-pointer bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 transition-all duration-500 border-b border-gray-200 relative overflow-hidden"
        onClick={handleToggle}
      >
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-gradient-to-b from-primary to-primary" />

        <div className="flex items-start justify-between ml-1.5 sm:ml-2 md:ml-4">
          <div className="flex-1">
            {/* RESTRUCTURED for better mobile layout */}
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg sm:shadow-xl">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <Heading1 variant="section" text={fabricName}/>
                <div className="flex items-center flex-wrap gap-1 sm:gap-2 md:gap-3 mt-1 sm:mt-2">
                  <span className="bg-hover text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                    {fabricInfo.colors.length} colors
                  </span>
                  <span className="text-hover text-xs sm:text-sm">• Tap to {isExpanded ? 'collapse' : 'expand'}</span>
                </div>
                <RichParagraph className="!text-lg mt-4">{fabricInfo.description}</RichParagraph>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-1 sm:ml-2 md:ml-4 lg:ml-6">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center border border-gray-300 group-hover:bg-gray-200 transition-colors shadow-md sm:shadow-lg"
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-2 sm:p-3 md:p-4 lg:p-8 bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm">
              {/* UPDATED Grid: 2 cols on mobile, expanding from there */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 justify-items-center">
                {fabricInfo.colors.map((color, index) => (
                  <ColorSwatch
                    key={color.name}
                    color={color}
                    index={index}
                    isSelected={selectedColor?.name === color.name}
                    onClick={() => onColorSelect(color)}
                    onViewDetails={onViewDetails}
                    fabricName={fabricName}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CushionCatalog() {
  const [expandedFabric, setExpandedFabric] = useState("Classic Chenille");
  const [selectedColor, setSelectedColor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    color: null,
    fabricName: '',
    fabricDescription: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredFabrics = Object.entries(fabricData).filter(([fabricName]) =>
    fabricName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const features = [
    {
      icon: Zap,
      title: "Premium Comfort",
      description: "Made with premium 75D high-density foam for long-lasting comfort"
    },
    {
      icon: Shield,
      title: "Easy Maintenance",
      description: "Removable covers for easy cleaning"
    },
    {
      icon: Grid,
      title: "Durable Design",
      description: "Have high-duty zippers that make it easier to remove covers"
    },
    {
      icon: Droplets,
      title: "Advanced Protection",
      description: "Have features like waterproof, fade-resistant, stain-resistant, and scratch-resistant"
    }
  ];

  const handleViewDetails = (color, fabricName) => {
    const fabricInfo = fabricData[fabricName];
    setDetailModal({
      isOpen: true,
      color,
      fabricName,
      fabricDescription: fabricInfo.description
    });
  };

  const handleCloseDetailModal = () => {
    setDetailModal({
      isOpen: false,
      color: null,
      fabricName: '',
      fabricDescription: ''
    });
  };

  const handleNavigateColor = (direction) => {
    if (!detailModal.color || !detailModal.fabricName) return;

    const fabricInfo = fabricData[detailModal.fabricName];
    const currentIndex = fabricInfo.colors.findIndex(c => c.name === detailModal.color.name);

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % fabricInfo.colors.length;
    } else {
      newIndex = currentIndex - 1 < 0 ? fabricInfo.colors.length - 1 : currentIndex - 1;
    }

    const newColor = fabricInfo.colors[newIndex];
    setDetailModal(prev => ({
      ...prev,
      color: newColor
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-6 sm:pb-8 md:pb-10 lg:pb-12 bg-white overflow-hidden">
        {/* Sophisticated Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,#f8fafc_0%,transparent_50%),radial-gradient(circle_at_75%_75%,#f1f5f9_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#f8fafc_49%,#f8fafc_51%,transparent_52%)] bg-[size:50px_50px] opacity-10" />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Premium Logo/Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-hover to-hover rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-xl sm:shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl sm:rounded-3xl" />
              <Palette className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1.5 sm:inset-2 border-2 border-white/20 rounded-2xl sm:rounded-3xl"
              />
            </motion.div>
            <Heading1 variant="section" as="h1" text={"Cushion Fabric"}/>
            <Heading1 variant="section" text={"Catalog"} className="mb-4"/>
            {/* <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-3 sm:mb-4 leading-tight tracking-tight"
            >
              Cushion Fabric
              <span className="block bg-gradient-to-r from-black via-gray-800 to-gray-700 bg-clip-text text-transparent mt-1 mb-4 sm:mt-2">
                Catalog
              </span>
            </motion.h1> */}
            <RichParagraph className="!text-xl">{"Premium fabrics for dinette bench cushions"}</RichParagraph>
            <a
              href="/cushion-fabrics/big-bear-vans-cushion-fabric-guide.pdf"
              download
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-2xl bg-primary text-white font-semibold shadow-lg hover:bg-gray-800 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Download the PDF Fabric &amp; Color Guide
            </a>
            {/* <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              // className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-4 sm:mb-5 md:mb-6"
              className="Richparagraph text-xl text-gray-600 mt-4 text-medium"
            >
              Premium fabrics for dinette bench cushions
            </motion.p> */}

            {/* Enhanced Scroll Indicator */}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center gap-1 sm:gap-2 mt-6 sm:mt-8 md:mt-10"
            >
              <span className="text-gray-500 text-xs sm:text-sm font-medium tracking-wider">EXPLORE COLLECTION</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-hover rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-3 bg-hover rounded-full mt-1.5 sm:mt-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Introduction Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white relative">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* <RichParagraph>{"Dinette benches are the epitome of smart furniture, ideal for lounging during the day and sleeping at night. At Big Bear Vans, we offer 8 premium cushion fabrics in 98 colors, each made to measure for your van. Note the color code (for example CC-07) and send it to your build coordinator."}</RichParagraph> */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              // className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed max-w-5xl mx-auto font-light px-2"
              className="mb-12 text-xl"
            >
              <RichParagraph className="!text-xl">{"Dinette benches are the epitome of smart furniture, ideal for lounging during the day and sleeping at night. At Big Bear Vans, we offer 8 premium cushion fabrics in 98 colors, each made to measure for your van. Note the color code (for example CC-07) and send it to your build coordinator."}</RichParagraph>
            </motion.p>

            {/* Premium Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                  className="bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-gray-300 text-center group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >
                  {/* Background Gradient Accent */}
                  <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 bg-gradient-to-r from-primary to-primary" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg sm:shadow-xl relative z-10">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <Heading1 variant="sub" text={feature.title} className="relative z-10 mb-4"/>
                  <RichParagraph>{feature.description}</RichParagraph>

                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Thickness Options */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,#000_1px,transparent_0)] bg-[length:60px_60px]" />
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
          <Heading1 variant="section" text={"Cushion Thickness"}/>
          <Heading1 variant="card" text={"Options"} className="!text-gray-600 mb-4"/>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto px-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -6 }}
                className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-gray-300 text-center group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-primary rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 lg:mb-6 shadow-lg sm:shadow-xl relative z-10"
                >
                  <RichParagraph className="text-secondary !text-[32px]">{"3\""}</RichParagraph>
                  {/* <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl">3"</span> */}
                </motion.div>
                <Heading1 variant="card" text={"3-Inch Thickness"} className=" relative z-10 mb-4"/>
                <RichParagraph className="!text-lg">{"For the family-friendly vans, a 3-inch-thick cushion is recommended so the people sleeping in the lower bunk have more air and headspace."}</RichParagraph>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -6 }}
                className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-gray-300 text-center group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-primary rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 lg:mb-6 shadow-lg sm:shadow-xl relative z-10"
                >
                  <RichParagraph className="text-secondary !text-[32px]">{"4\""}</RichParagraph>
                  {/* <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl">4"</span> */}
                </motion.div>
                <Heading1 variant="card" text={"4-Inch Thickness"} className=" relative z-10 mb-4"/>
                <RichParagraph className="!text-lg">{"A 4-inch-thick cushion is for solo travelers and couples who want to enjoy a more comfortable sitting experience."}</RichParagraph>

              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Fabric Catalog */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          >
            <Heading1 variant="section" text={"Fabric Collection"}/>
            <RichParagraph className="!text-lg !text-gray-600">{"Discover our premium fabric options"}</RichParagraph>

          </motion.div>

          {/* Premium Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2"
          >
            <div className="relative group">
              <Search className="absolute left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 transition-colors group-focus-within:text-black" />
              <input
                type="text"
                placeholder="Search fabric types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 sm:pl-12 sm:pr-4 sm:py-3 md:pl-14 md:pr-5 md:py-4 bg-white border-2 md:border-3 border-gray-400 rounded-2xl sm:rounded-3xl focus:outline-none focus:ring-3 focus:ring-black/15 focus:border-black text-sm sm:text-base md:text-lg shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 placeholder-gray-500 font-light"
              />
            </div>
          </motion.div>

          {/* Enhanced Fabric Sections */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 px-2">
            {filteredFabrics.map(([fabricName, fabricInfo]) => (
              <FabricSection
                key={fabricName}
                fabricName={fabricName}
                fabricInfo={fabricInfo}
                isExpanded={expandedFabric === fabricName}
                onToggle={() => setExpandedFabric(expandedFabric === fabricName ? null : fabricName)}
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {filteredFabrics.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 sm:py-10 md:py-12 lg:py-16"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-lg sm:shadow-xl">
                <Search className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-500" />
              </div>
              <RichParagraph className="!text-gray-600 !text-base">{"No fabrics found"}</RichParagraph>
              <RichParagraph className="!text-gray-600 !text-lg">{"Try adjusting your search terms"}</RichParagraph>
            </motion.div>
          )}
        </div>
      </section>

      {/* Color Detail Modal */}
      <ColorDetailModal
        color={detailModal.color}
        fabricName={detailModal.fabricName}
        fabricDescription={detailModal.fabricDescription}
        isOpen={detailModal.isOpen}
        onClose={handleCloseDetailModal}
        onNavigate={handleNavigateColor}
      />

      {/* Premium Selected Color Preview */}
      <AnimatePresence>
        {selectedColor && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.8 }}
            className={`fixed ${isScrolled ? 'bottom-3 sm:bottom-4 md:bottom-6' : 'bottom-3 sm:bottom-4 md:bottom-6'} right-3 sm:right-4 md:right-6 lg:right-8 bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border-2 md:border-3 border-gray-400 p-2 sm:p-3 md:p-4 lg:p-5 max-w-xs sm:max-w-sm z-50 backdrop-blur-md bg-white/95`}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
              <Heading1 variant="sub" text={"Selected Color"}/>
              <button
                onClick={() => setSelectedColor(null)}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-gray-300 transition-colors shadow-md sm:shadow-lg"
              >
                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-700" />
              </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl md:rounded-2xl border-2 md:border-3 border-gray-500 shadow-lg sm:shadow-xl"
                style={{ backgroundColor: selectedColor.code }}
              />
              <div className="flex-1 min-w-0">
                <RichParagraph className="font-bold">{selectedColor.name}</RichParagraph>
                <RichParagraph className="text-gray-600 ">{selectedColor.id}</RichParagraph>
              </div>
            </div>
            <button
              onClick={() => setSelectedColor(null)}
              className="w-full bg-primary text-white py-1.5 sm:py-2 md:py-3 rounded-xl sm:rounded-2xl hover:bg-gray-800 transition-all duration-300 font-semibold text-xs sm:text-sm md:text-base shadow-lg sm:shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              Clear Selection
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
