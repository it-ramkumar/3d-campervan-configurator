"use client";
import React from "react";
import { motion } from 'framer-motion';
import { Heading1, RichParagraph, Heading4, Heading3, ImageWithSkeleton, SecondaryButton } from '../Common/Common';
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
    { title: "Tires & Wheels", description: "Black Rhino Arsenal wheels (16\"-17\") paired with severe-snow-rated BFGoodrich KO2 All-Terrain Tires.", image: "/Exterior/tire.webp" },
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
<RichParagraph variant="sub" className="!text-hover uppercase">
Customization
</RichParagraph>
          </motion.div>

          <Heading1 variant="section" text="Additional Exterior Accessories" className=" !text-primary uppercase" />
          <div className="bbv-divider mb-6" />
          <RichParagraph variant="body" className="mt-6 max-w-2xl text-primary/60">
            Beyond our standard packages, we offer curated accessories to refine your van's utility.
            Choose from our tested selections or share your custom vision with us.
          </RichParagraph>
        </div>

        {/* --- Accessories Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessories.map((item, index) => {
            const Icon = getAccessoryIcon(item.title);

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-primary/10 shadow-[0_2px_12px_rgba(0,31,61,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-hover/40 hover:shadow-[0_20px_40px_-12px_rgba(0,31,61,0.25)]"
              >
                {/* Image Container (1:1) */}
                <div className="relative aspect-square w-full shrink-0 overflow-hidden [&>div]:h-full">
                  <ImageWithSkeleton
                    src={item.image}
                    alt={item.title}
                    overlay={false}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Soft bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/50 to-transparent pointer-events-none" />
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-lg bg-[rgba(2,12,24,0.72)] backdrop-blur-md border border-white/10">
                    <Icon className="w-[18px] h-[18px] text-hover" />
                  </div>
                  {/* Index */}
                  <span className="absolute top-4 right-4 font-ui text-[10px] font-semibold tracking-[0.3em] text-secondary/90">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Amber accent line */}
                <div className="h-[2px] w-full bg-hover origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Content */}
                <div className="p-6 h-[200px] flex flex-col">
                  <Heading1
                    variant="card"
                    text={item.title}
                    className="font-display !text-xl uppercase tracking-wide !text-primary group-hover:!text-hover transition-colors line-clamp-1 mb-2"
                  />

                  <RichParagraph variant="card" className="!text-sm text-primary/60 line-clamp-3">
                    {item.description}
                  </RichParagraph>

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t border-primary/10 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-hover" />
                    <span className="font-ui text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/50">
                      Verified Accessory
                    </span>
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
            <Heading1 variant="card" text={"Have a specific accessory in mind?"} className="mb-2 !text-secondary uppercase" />
            <RichParagraph variant="card" className="text-secondary/60">We can source and install custom equipment tailored to your build.</RichParagraph>
          </div>
          <SecondaryButton label={"Discuss Custom Ideas"} link={"/contact"} />
        </motion.div>

      </div>
    </section>
  );
}
