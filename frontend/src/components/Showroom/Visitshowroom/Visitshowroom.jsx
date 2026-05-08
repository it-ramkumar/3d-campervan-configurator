"use client";
import React from "react";
import {
  Cog,
  Scan,
  Paintbrush,
  Layers,
  BedDouble,
  Box,
  ShowerHead,
  LayoutDashboard,
  Palette,
  Ruler,
  Hammer,
  Coffee
} from "lucide-react";
import Customize from "../../Customize/Cutomize";
import { Heading2, PrimaryButton, RichParagraph, CustomLink } from '../../Common/Common'
import Link from "next/link";
import { motion } from "framer-motion";

export default function Showroom() {

  const cardData = [
    {
      sectiontitle: "Watch the Build Process Live",
      desc: "See exactly how your van will come to life. You’ll see:",
      descriptionList: [
        { text: "Our automated CNC machines are cutting custom cabinetry.", icon: Cog },
        { text: "We have several 3D scanners to ensure precise cuts.", icon: Scan },
        { text: "Our team is painting and assembling with expert craftsmanship.", icon: Paintbrush },
        { text: "The high-quality materials that go into every van.", icon: Layers },
      ],
      image: "/images/s1.webp",
      isReversed: false
    },
    {
      sectiontitle: "Explore Our Van Collection",
      desc: "You’ll also visit our finished custom builds, vans for sale, and ongoing projects. This is your chance to:",
      descriptionList: [
        { text: "Try out the elevator bed and dinette system.", icon: BedDouble },
        { text: "Open every drawer and cabinet.", icon: Box },
        { text: "Step inside the bathroom and test the kitchen.", icon: ShowerHead },
        { text: "Compare different layouts to see what works well for you.", icon: LayoutDashboard },
      ],
      lastText:
        "This hands-on experience gives a clear picture of what features matter most for your van’s interior and exterior.",
      image: "/images/s2.webp",
      isReversed: true
    },
    {
      sectiontitle: "Personal Design Session",
      desc: "After your tour, sit down with our designers in our office over a complimentary coffee or tea. Mix-and-match materials to create your perfect look.",
      descriptionList: [
        { text: "What interior design style will work best for me?", icon: Palette },
        { text: "How big should the bathroom be?", icon: Ruler },
        { text: "Which countertop and cabinet style feels right?", icon: Hammer },
      ],
      image: "/images2/op3.webp",
      isReversed: false
    },
  ];

  return (
    <section className="bg-secondary py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* --- Header Section --- */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div

            className="space-y-6"
          >
            <RichParagraph className="!!text-hover !text-sm font-bold tracking-wider uppercase ">
              Experience the Craftsmanship
            </RichParagraph>

            <Heading2 text="Why visit us?" className="text-primary" />

            <div className="w-20 h-1.5 bg-hover mx-auto rounded-lg" />

            <RichParagraph className="!text-primary/80 mt-8">
              Browsing websites is a good start, but the real thing is seeing the materials and testing the layouts firsthand. When you step into our workshop, you become part of the{" "}
<CustomLink href="/our-process" text={" build process."}/>

            </RichParagraph>
          </div>
        </div>

        {/* --- Card Sections --- */}
        <div className="space-y-20">
          {cardData.map((card, index) => (
            <div
              key={index}

            >
              <Customize
                sectionTitle={card.sectiontitle}
                descriptionList={card.descriptionList}
                image={card}
                showButton={false}
                isReversed={card.isReversed}
                lastText={card.lastText}
                // Ensuring internal styles of Customize match BBV
                className="rounded-lg overflow-hidden"
              />
            </div>
          ))}
        </div>

        {/* --- Design Session CTA (Optional but recommended) --- */}
        <div
           className="mt-32 bg-primary rounded-lg p-10 md:p-16 text-secondary text-center relative overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <Coffee className="mx-auto !text-hover" size={48} />
            <Heading2 text="Ready to touch and feel?" className="text-secondary" />
            <RichParagraph className="max-w-xl mx-auto text-secondary opacity-80">
              Schedule your private workshop tour today. The coffee is on us.
            </RichParagraph>
            <Link href="/contact">
              <PrimaryButton label="Book My Tour" />

            </Link>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        </div>

      </div>
    </section>
  );
}