"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import { Search, ChevronDown, ChevronUp, Zap, Shield, Droplets, Sun, Grid, Palette, X, ArrowRight, Star, Sparkles, Download, Maximize2, Minus, Plus } from "lucide-react";
import { RichParagraph, Heading2, Heading3, Heading4 } from "@/components/Common/Common";
// Fabric data with colors and images (Data is unchanged, kept for completeness)
const fabricData = {
  "Chenille Fleece": {
    description: "Chenille fleece has twisted fibers, which make it durable and smooth to the touch. This heat-absorbing fabric requires low maintenance.",
    colors: [
      { name: "Burnt Sienna", code: "#A67360", image: "Cushion fabric Optimize/Chenille Fleece/Burnt Sienna.jpg" },
      { name: "Dark Brown", code: "#40362E", image: "Cushion fabric Optimize/Chenille Fleece/Dark Brown.jpg" },
      { name: "Dark Olive Green", code: "#32402C", image: "Cushion fabric Optimize/Chenille Fleece/Dark Olive.jpg" },
      { name: "Davy's Grey", code: "#585959", image: "Cushion fabric Optimize/Chenille Fleece/Davy_s Grey.jpg" },
      { name: "Grayish-Blue", code: "#313640", image: "Cushion fabric Optimize/Chenille Fleece/Grayish-blue.jpg" },
      { name: "Raisin Black", code: "#262526", image: "Cushion fabric Optimize/Chenille Fleece/Raisin black.jpg" },
      { name: "Rustic Orange", code: "#A65437", image: "Cushion fabric Optimize/Chenille Fleece/Rustic Orange.jpg" }
    ]
  },
  "Warp Knitted Polyester Chenille": {
    description: "Knitted polyester chenille fabric has a soft and plush texture and can maintain its shape well over time, even with frequent use.",
    colors: [
      { name: "Almond Frost", code: "#9A8678", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Almond.jpg" },
      { name: "Ash Grey", code: "#8C8B88", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Ash Grey.jpg" },
      { name: "Black Eel", code: "#463E3F", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Black Eel.jpg" },
      { name: "Deep Brown", code: "#591E1E", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Deep brown.jpg" },
      { name: "Deep Olive", code: "#3D4034", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Deep Olive.jpg" },
      { name: "Dusty Green", code: "#808C85", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Dusty Green.jpg" },
      { name: "Dusty Rose", code: "#D9A79C", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Dusty rose.jpg" },
      { name: "Gold", code: "#D9AA55", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Gold.jpg" },
      { name: "Light Silver", code: "#D9D9D9", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Light silver.jpg" },
      { name: "Pale Beige", code: "#D9D0C1", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Pale beige.jpg" },
      { name: "Pearl White", code: "#F2F2EB", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Pearl White.jpg" },
      { name: "Redwood", code: "#A66249", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Redwood.jpg" },
      { name: "Shuttle Grey", code: "#565672", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Shuttle Grey.jpg" },
      { name: "Slate Gray", code: "#72736F", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/Slate gray.jpg" },
      { name: "White Rock", code: "#D4CFB4", image: "Cushion fabric Optimize/Warp Knitted Polyester Chenille/White Rock.jpg" }
    ]
  },
  "Waterproof Oxford": {
    description: "Waterproof Oxford fabric is lightweight, PU-coated, and easy to maintain. It's ideal for those who need moisture-resistant and easy-to-clean cushions.",
    colors: [
      { name: "Crimson", code: "#400D16", image: "Cushion fabric Optimize/Waterproof Oxford/Crimson.jpg" },
      { name: "Dark Gray", code: "#262626", image: "Cushion fabric Optimize/Waterproof Oxford/Dark Gray.jpg" },
      { name: "Dark Green", code: "#2E4039", image: "Cushion fabric Optimize/Waterproof Oxford/Dark Green.jpg" },
      { name: "Dark Sage", code: "#425951", image: "Cushion fabric Optimize/Waterproof Oxford/Dark sage.jpg" },
      { name: "Dark Vanilla", code: "#D9C1B4", image: "Cushion fabric Optimize/Waterproof Oxford/Dark vanilla.jpg" },
      { name: "Espresso", code: "#401F18", image: "Cushion fabric Optimize/Waterproof Oxford/espresso.jpg" },
      { name: "Garnet", code: "#A63232", image: "Cushion fabric Optimize/Waterproof Oxford/garnet.jpg" },
      { name: "Indigo", code: "#2A2D40", image: "Cushion fabric Optimize/Waterproof Oxford/indigo.jpg" },
      { name: "Ivory", code: "#F2E4D8", image: "Cushion fabric Optimize/Waterproof Oxford/ivory.jpg" },
      { name: "Lavender", code: "#957BA6", image: "Cushion fabric Optimize/Waterproof Oxford/lavender.jpg" },
      { name: "Light Brown", code: "#A68877", image: "Cushion fabric Optimize/Waterproof Oxford/light brown.jpg" },
      { name: "Light Gray", code: "#A6A1A1", image: "Cushion fabric Optimize/Waterproof Oxford/light grey.jpg" },
      { name: "Moss Green", code: "#A2A629", image: "Cushion fabric Optimize/Waterproof Oxford/moss green.jpg" },
      { name: "Mustard Brown", code: "#BF923F", image: "Cushion fabric Optimize/Waterproof Oxford/mustard brown.jpg" },
      { name: "Muted Plum", code: "#40212F", image: "Cushion fabric Optimize/Waterproof Oxford/muted plum.jpg" },
      { name: "Muted Tan", code: "#A69485", image: "Cushion fabric Optimize/Waterproof Oxford/muted tan.jpg" },
      { name: "Navy", code: "#2A2D40", image: "Cushion fabric Optimize/Waterproof Oxford/navy.jpg" },
      { name: "Nobel", code: "#9FA4BF", image: "Cushion fabric Optimize/Waterproof Oxford/nobel.jpg" },
      { name: "Olive", code: "#8C783B", image: "Cushion fabric Optimize/Waterproof Oxford/olive.jpg" },
      { name: "Orange-Brown", code: "#BF6E3F", image: "Cushion fabric Optimize/Waterproof Oxford/orange brown.jpg" },
      { name: "Pink-Magenta", code: "#D996BB", image: "Cushion fabric Optimize/Waterproof Oxford/pink magenta.jpg" },
      { name: "Sandy Brown", code: "#A6845B", image: "Cushion fabric Optimize/Waterproof Oxford/sandy brown.jpg" }
    ]
  },
  "Waterproof Chenille": {
    description: "Water-resistant chenille has a soft and luxurious texture. Its woven, thick, and insulating properties make it water and stain-resistant.",
    colors: [
      { name: "Ash Gray", code: "#BFBEBD", image: "Cushion fabric Optimize/Waterproof Chenille/Ash Gray.jpg" },
      { name: "Dark Charcoal", code: "#595654", image: "Cushion fabric Optimize/Waterproof Chenille/Dark charcoal.jpg" },
      { name: "Dark Red", code: "#733C40", image: "Cushion fabric Optimize/Waterproof Chenille/Dark red.jpg" },
      { name: "Dusty Teal", code: "#639FA6", image: "Cushion fabric Optimize/Waterproof Chenille/Dusty teal.jpg" },
      { name: "Light Beige", code: "#D9CAB8", image: "Cushion fabric Optimize/Waterproof Chenille/Light Beige.jpg" },
      { name: "Mint Frost", code: "#BAD9CE", image: "Cushion fabric Optimize/Waterproof Chenille/Mint Frost.jpg" },
      { name: "Raisin Black", code: "#262626", image: "Cushion fabric Optimize/Waterproof Chenille/Raisin black.jpg" },
      { name: "Saffron Yellow", code: "#F2B749", image: "Cushion fabric Optimize/Waterproof Chenille/Saffron Yellow.jpg" },
      { name: "Slate Blue", code: "#394459", image: "Cushion fabric Optimize/Waterproof Chenille/Slate blue.jpg" },
      { name: "Smoky Cocoa", code: "#594842", image: "Cushion fabric Optimize/Waterproof Chenille/Smoky Cocoa.jpg" },
      { name: "Stone Gray", code: "#8C8887", image: "Cushion fabric Optimize/Waterproof Chenille/Stone Gray.jpg" }
    ]
  },
  "Imitation Linen": {
    description: "Imitation Linen fabric has a classy texture. This shrinkage-resistant fabric is easy to clean and built to last.",
    colors: [
      { name: "Charcoal Brown", code: "#40332C", image: "Cushion fabric Optimize/Imitation Linen/Charcoal brown.jpg" },
      { name: "Dark Taupe", code: "#403F3E", image: "Cushion fabric Optimize/Imitation Linen/Dark taupe.jpg" },
      { name: "English Violet", code: "#593C54", image: "Cushion fabric Optimize/Imitation Linen/English violet.jpg" },
      { name: "Mauve", code: "#8C3B61", image: "Cushion fabric Optimize/Imitation Linen/Mauve.jpg" },
      { name: "Slate Blue", code: "#9BA7BF", image: "Cushion fabric Optimize/Imitation Linen/Slate blue.jpg" },
      { name: "Stone Cold", code: "#595857", image: "Cushion fabric Optimize/Imitation Linen/Stone cold.jpg" }
    ]
  },
  "Faux Leather": {
    description: "Faux leather fabric is wipeable and luxurious, making it ideal for busy households. It is durable, resistant to stains, wear & tears, and fading, ensuring long-lasting use.",
    colors: [
      { name: "Baltic Sea", code: "#3C3D3E", image: "Cushion fabric Optimize/Faux Leather/Baltic Sea.jpg" },
      { name: "Dim Gray", code: "#67655E", image: "Cushion fabric Optimize/Faux Leather/Dim Gray.jpg" },
      { name: "Hampton", code: "#EAD2A4", image: "Cushion fabric Optimize/Faux Leather/Hampton.jpg" },
      { name: "Pearl Bush", code: "#DED3CB", image: "Cushion fabric Optimize/Faux Leather/Pearl bush.jpg" },
      { name: "Pinkish Brown", code: "#B17261", image: "Cushion fabric Optimize/Faux Leather/Pinkish brown.jpg" },
      { name: "Radish Orange", code: "#FF872C", image: "Cushion fabric Optimize/Faux Leather/Radish Orange.jpg" },
      { name: "Storm Dust", code: "#747473", image: "Cushion fabric Optimize/Faux Leather/Storm Dust.jpg" },
      { name: "Warm Gray", code: "#A6A197", image: "Cushion fabric Optimize/Faux Leather/Warm Gray.jpg" }
    ]
  },
  "Dutch Velvet": {
    description: "Dutch velvet has a luxurious feel and is resistant to wear and tear. It's mainly popular due to its soft texture, resistance to piling, and fading.",
    colors: [
      { name: "Champagne Pink", code: "#F2DFCE", image: "Cushion fabric Optimize/Dutch Velvet/Champagne pink.jpg" },
      { name: "Muted Blue-Gray", code: "#76A1A6", image: "Cushion fabric Optimize/Dutch Velvet/Muted Blue-Gray.jpg" },
      { name: "Bleached Silk", code: "#F2E5D5", image: "Cushion fabric Optimize/Dutch Velvet/Bleached silk.jpg" },
      { name: "Dark Green Pea", code: "#255C3B", image: "Cushion fabric Optimize/Dutch Velvet/Dark Green pea.jpg" },
      { name: "Dark Grey", code: "#737272", image: "Cushion fabric Optimize/Dutch Velvet/Dark grey.jpg" },
      { name: "Nile Blue", code: "#245F4E", image: "Cushion fabric Optimize/Dutch Velvet/Nile blue.jpg" },
      { name: "Pale Aqua", code: "#A3D9C9", image: "Cushion fabric Optimize/Dutch Velvet/Pale Aqua.jpg" },
      { name: "Saddle Brown", code: "#8C593B", image: "Cushion fabric Optimize/Dutch Velvet/Saddle Brown.jpg" },
      { name: "Shadow Gray", code: "#565956", image: "Cushion fabric Optimize/Dutch Velvet/Shadow gray.jpg" },
      { name: "Star Dust", code: "#9F9F9C", image: "Cushion fabric Optimize/Dutch Velvet/Star dust.jpg" },
      { name: "Sun Yellow", code: "#FFDF22", image: "Cushion fabric Optimize/Dutch Velvet/Sun Yellow.jpg" },
      { name: "Taupe", code: "#A68B81", image: "Cushion fabric Optimize/Dutch Velvet/Taupe.jpg" },
      { name: "Timberwolf", code: "#D9D4CC", image: "Cushion fabric Optimize/Dutch Velvet/Timberwolf.jpg" }
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
      link.download = `${fabricName}_${color.name}_fabric.jpg`;
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
              <Heading3 text={color.name}/>
              <RichParagraph>{color.code}</RichParagraph>
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
              <Heading4 text={"Fabric Preview"} className="text-gray-900"/>
              {/* <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Fabric Preview</h3> */}
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
                <Heading4 text={"Fabric Information"}className="mb-2" />
                {/* <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 sm:mb-3">Fabric Information</h3> */}
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <Heading4 text={"Fabric Type"} className="!text-sm !text-gray-500"/>
                    <RichParagraph className="font-semibold">{fabricName}</RichParagraph>
                  </div>
                  <div>
                    <Heading4 text={"Description"} className="!text-sm !text-gray-500"/>
                    <RichParagraph>{fabricDescription}</RichParagraph>
                  </div>
                  <div>
                    <Heading4 text={"Color Family"} className="!text-sm !text-gray-500"/>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
                      <div
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-gray-300 shadow-md"
                        style={{ backgroundColor: color.code }}
                      />
                       <Heading4 text={color.name} className="!text-sm "/>
                      {/* <span className="font-medium text-gray-900 text-sm sm:text-base">{color.name}</span> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Properties */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                <Heading4 text={"Color Properties"} className="mb-2" />
                {/* <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4">Color Properties</h3> */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <Heading4 text={"Hex Code"} className="!text-sm !text-gray-500 mb-2"/>
                    <Heading4 text={color.code} className="!text-base "/>
                    {/* <span className="text-xs sm:text-sm text-gray-500 block mb-1">Hex Code</span> */}
                    {/* <span className="font-mono font-bold text-gray-900 text-sm sm:text-base">{color.code}</span> */}
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <Heading4 text={"Color Name"} className="!text-sm !text-gray-500 mb-2"/>
                    <Heading4 text={color.name} className="!text-base "/>
                    {/* <span className="text-xs sm:text-sm text-gray-500 block mb-1">Color Name</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{color.name}</span> */}
                  </div>
                </div>
              </div>

              {/* Fabric Features */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                <Heading4 text={"Fabric Featuress"} className="mb-2" />
                {/* <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4">Fabric Features</h3> */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm">Durable</p>
                      <p className="text-gray-600 text-xs">Long-lasting</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Droplets className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm">Easy Clean</p>
                      <p className="text-gray-600 text-xs">Low maintenance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm">Premium</p>
                      <p className="text-gray-600 text-xs">High quality</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm">Fade Resistant</p>
                      <p className="text-gray-600 text-xs">UV protected</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perfect For Section */}
              <div className="bg-gradient-to-br from-primary to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
                <Heading4 text={"Perfect For"} className="!font-bold  text-secondary mb-4"/>

                {/* <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">Perfect For</h4> */}
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
            #{String(index + 1).padStart(2, '0')}
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

            <p className="text-gray-600 text-xs sm:text-sm font-mono bg-gray-100 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 rounded-md sm:rounded-lg">{color.code}</p>
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
                <Heading2 text={fabricName}/>
                {/* <h3 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-900 mb-1 sm:mb-2 truncate">{fabricName}</h3> */}
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
  const [expandedFabric, setExpandedFabric] = useState("Chenille Fleece");
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
      description: "Have removable and machine-washable covers"
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
            <Heading2 text={"Cushion Fabric"}/>
            <Heading2 text={"Catalog"} className="mb-4"/>
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
          {/* <RichParagraph>{"Dinette benches are the epitome of smart furniture, ideal for lounging during the day and sleeping at night. At Big Bear Vans, we offer a range of premium, ultra-soft cushion fabrics in multiple colors."}</RichParagraph> */}
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
              <RichParagraph className="!text-xl">{"Dinette benches are the epitome of smart furniture, ideal for lounging during the day and sleeping at night. At Big Bear Vans, we offer a range of premium, ultra-soft cushion fabrics in multiple colors."}</RichParagraph>
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
                  <Heading4 text={feature.title} className="relative z-10 mb-4"/>
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
          <Heading2 text={"Cushion Thickness"}/>
          <Heading3 text={"Options"} className="!text-gray-600 mb-4"/>


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
                <Heading3 text={"3-Inch Thickness"} className=" relative z-10 mb-4"/>
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
                <Heading3 text={"4-Inch Thickness"} className=" relative z-10 mb-4"/>
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
            <Heading2 text={"Fabric Collection"}/>
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
              <Heading4 text={"Selected Color"}/>
              {/* <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900">Selected Color</h3> */}
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
                <RichParagraph className="text-gray-600 ">{selectedColor.code}</RichParagraph>
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