import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Heading1, RichParagraph, SpanTag, ConsultationButton } from "../Common/Common";
import { PAGE_CONFIG } from "./optionsConfig";

// What each section covers, in a few words for the banner cards
const TAGLINES = {
  "exterior-options": "Awnings, windows, doors, roof decks & rear storage",
  "interior-options": "Beds, kitchens, bathrooms, seating & finishes",
  "system-options": "Solar, inverters, air conditioning, lighting & more",
};

// Bottom banner on the options pages linking the other two option sections
export default function OptionsCrossLinks({ current }) {
  const others = Object.entries(PAGE_CONFIG).filter(([key]) => key !== current);

  return (
    <section className="bg-primary text-secondary py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <SpanTag text="Complete Your Build" className="justify-center mb-5" />
          <Heading1 variant="section" text="Explore More Van Upgrades" textColor="text-secondary" className="mt-4" />
          <RichParagraph className="!text-secondary/70 mt-4">
            Every Big Bear Vans build is made from the same tried-and-tested products. See what else you can add to yours.
          </RichParagraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {others.map(([key, section]) => (
            <Link
              key={key}
              href={`/van-options/${key}`}
              className="group relative block aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden border border-hover/20"
            >
              <Image
                src={section.heroImage}
                alt={section.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex items-end justify-between gap-4">
                <div>
                  <Heading1 variant="card" text={section.label} textColor="text-secondary" />
                  <RichParagraph variant="sub" className="!text-secondary/80 mt-1">
                    {TAGLINES[key]}
                  </RichParagraph>
                </div>
                <span className="w-11 h-11 rounded-full bg-hover text-primary flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <RichParagraph className="!text-secondary/70 mb-5">
            Not sure which upgrades fit your van? Our team will help you plan the build.
          </RichParagraph>
          <ConsultationButton
            label="Book a Free Consultation"
            variant="primary"
            className="!bg-hover !border-hover !text-primary hover:!bg-secondary hover:!border-secondary"
          />
        </div>
      </div>
    </section>
  );
}
