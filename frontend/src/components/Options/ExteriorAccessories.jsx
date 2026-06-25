"use client";
import React from "react";
import { motion } from 'framer-motion';
import { Heading2, RichParagraph, Heading4, Heading3, ImageWithSkeleton, SecondaryButton } from '../Common/Common';
import {
  Waves, Lightbulb, ShowerHead, Camera, Maximize,
  Activity, Disc, Zap, Droplets, ArrowRight
} from "lucide-react";

// --- Accessory Icon Mapping ---
const getAccessoryIcon = (title) => {
  const iconMap = {
    "Saucer Swing": Waves,
    "Surfboard Rack": Maximize,
    "Exterior Van Lights": Lightbulb,
    "Outdoor Van Shower": ShowerHead,
    "360° Camera": Camera,
    "Rear Foldable Patio": Maximize,
    "Van Suspension System": Activity,
    "Tires & Wheels": Disc,
    "30A Shore Power Inlet": Zap,
    "Dump Valve": Droplets,
    "Freshwater Inlet": Droplets
  };
  return iconMap[title] || Waves;
};

export default function AdditionalAccessories() {
  const accessories = [
    { title: "Saucer Swing", description: "Easy to set up and pack away. Lightweight and can be stowed without requiring extra storage space.", image: "/Exterior/Sucerswing.webp" },
    { title: "Surfboard Rack", description: "Secure your surfboard to the roof or side of the van. The right rack depends on your van and board count.", image: "/Exterior/Surfboardrack.webp" },
    { title: "Exterior Van Lights", description: "Custom placement at the front, rear, or passenger side awning for perfect campsite illumination.", image: "/Exterior/exteriorfrontendlight.webp" },
    { title: "Outdoor Van Shower", description: "Connects to your van's water system for hot and cold water. Pair with a privacy curtain for convenience.", image: "/Exterior/Rearoutdoorshower.webp" },
    { title: "360° Camera", description: "Get a complete surround view of your campervan for safer parking and navigating tight spots.", image: "/Exterior/360.webp" },
    { title: "Rear Foldable Patio", description: "Adds up to 6 sq ft of functional outdoor space. Unfolds in seconds for chairs or cooking.", image: "/Exterior/Foldablerearpatio.webp" },
    { title: "Van Suspension System", description: "Upgraded Falcon shocks, bump buddies, and leaf springs for a smooth ride on any terrain.", image: "/Exterior/suspension.webp" },
    { title: "Tires & Wheels", description: "Black Rhino Arsenal wheels (16\"-17\") paired with severe-snow-rated BFGoodrich KO2 All-Terrain Tires.", image: "/Exterior/tiree.webp" },
    { title: "Side Ladder", description: "Lightweight (18 lbs) ladder for easy roof access, typically on the driver's side or rear.", image: "/Exterior/Sideladder.webp" },
    { title: "30A Shore Power Inlet", description: "Charge your campervan before traveling with an easy connection to campground power.", image: "/Exterior/30A.webp" },
    { title: "Dump Valve", description: "For easy & hygienic removal of grey water, positioned for quick connection at disposal stations.", image: "/Exterior/Dumpvalve.webp" },
    { title: "Freshwater Inlet", description: "Refill your freshwater tank with a secure, key-operated inlet to keep your water safe.", image: "/Exterior/Freshwateinlet.webp" }
  ];

  return (
    <section className="bbv-section-light py-20 relative overflow-hidden">
      <div className="bbv-dot-grid-light" />

      <div className="container mx-auto px-4 relative z-10">

        {/* --- Header --- */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[2px] w-12 bg-hover" />
            <p className="text-hover text-xs uppercase tracking-widest font-bold">Customization</p>
          </motion.div>

          <Heading2 text="Additional Exterior Accessories" className="font-display text-primary uppercase tracking-wide" />
          <div className="bbv-divider mb-6" />
          <RichParagraph className="mt-6 max-w-2xl text-primary/60">
            Beyond our standard packages, we offer curated accessories to refine your van's utility.
            Choose from our tested selections or share your custom vision with us.
          </RichParagraph>
        </div>

        {/* --- Accessories Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessories.map((item, index) => {
            const Icon = getAccessoryIcon(item.title);

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bbv-card group rounded-lg hover:border-hover/40 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithSkeleton
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Amber top border on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md p-3 rounded-lg shadow-xl border border-secondary/10">
                    <Icon className="w-5 h-5 text-hover" />
                  </div>
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <Heading4 text={item.title} className="group-hover:!text-hover transition-colors text-primary" />
                  </div>

                  <RichParagraph className="text-primary/60 mb-6">
                    {item.description}
                  </RichParagraph>

                  {/* Footer */}
                  <div className="pt-6 border-t border-primary/10 flex items-center justify-between">
                    <p className="text-hover uppercase text-xs tracking-widest font-bold">Verified Accessory</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- Bottom CTA Bar --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-8 bg-primary rounded-lg border border-hover/20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="text-center md:text-left">
            <Heading3 text={"Have a specific accessory in mind?"} className="mb-2 text-primary font-display uppercase tracking-wide" />
            <RichParagraph className="text-primary/60">We can source and install custom equipment tailored to your build.</RichParagraph>
          </div>
          <SecondaryButton label={"Discuss Custom Ideas"} link={"/contact"} />
        </motion.div>

      </div>
    </section>
  );
}
