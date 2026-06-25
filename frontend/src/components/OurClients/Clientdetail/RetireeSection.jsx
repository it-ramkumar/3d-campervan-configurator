
import React from "react";
import { Users, Zap, Car, Home, Shield, Coffee } from "lucide-react";
import ClassicImageGrid from "./ClassicImageGrid";
import { CustomLink, Heading2, Heading3, Heading4, RichParagraph } from "../../Common/Common";

const RetireeSection = ({ imageData }) => {
  return (
    <section className="bbv-section-navy relative py-20">
      <div className="bbv-dot-grid" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Golden Years</p>
          <div className="inline-flex p-3 bbv-glass-light rounded-lg text-hover mb-4 border border-hover/20">
            <Users size={32} />
          </div>
          <Heading2 text="Retiree-Friendly Campervans" className="font-display text-secondary uppercase tracking-wide mb-4" />
          <div className="bbv-divider mb-6" />
          <RichParagraph className="text-secondary/70 font-bold">
            Creating lasting memories with comfort and freedom
          </RichParagraph>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <RichParagraph className="italic text-secondary/80">
            At Big Bear Vans, we've built multiple campervans for retirees who want to visit family across the country, create lasting memories with their grandchildren, and travel in complete comfort, entirely off-grid.
          </RichParagraph>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {[
            { icon: Zap, text: "Extended off-grid capability with robust power and water" },
            { icon: Car, text: "All-Wheel Drive for any road condition" },
            { icon: Home, text: "Spacious interiors for multi-generational travel" },
            { icon: Shield, text: "Advanced safety and navigation systems" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bbv-glass-light p-5 rounded-lg border border-hover/20">
              <div className="bg-hover/20 p-2 rounded-lg text-hover shrink-0">
                <item.icon size={20} />
              </div>
              <RichParagraph className="text-xs font-bold uppercase tracking-wide leading-tight text-secondary/80">
                {item.text}
              </RichParagraph>
            </div>
          ))}
        </div>

        <div className="bg-primary/80 rounded-lg p-8 lg:p-16 shadow-2xl overflow-hidden relative border border-hover/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="rounded-lg overflow-hidden bbv-amber-line shadow-inner">
                <ClassicImageGrid images={imageData.vermont} layout="vermont" />
              </div>
              <div className="mt-8 bbv-glass-light backdrop-blur-md p-8 rounded-lg border-l-4 border-hover">
                <RichParagraph className="text-secondary/80 italic mb-4">
                  "We love it. It works great. We love the storage and how open everything is. And it just feels so homey. We did do a lot of looking around and searching, and Big Bear Vans just seemed to be the ones that really adapted to more than two travelers."
                </RichParagraph>
                <RichParagraph className="text-hover font-bold text-sm uppercase tracking-widest">
                  — Client from Vermont
                </RichParagraph>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 text-secondary">
              <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Featured Build</p>
              <div className="bbv-divider mb-4" />
              <Heading3 text="Vermont Campervan" className="font-display text-secondary uppercase tracking-wide mb-6" />
              <RichParagraph className="text-secondary/80 mb-10">
                <CustomLink href="/layout-detail/vermont" text={" VERMONT "} />
                is a 170 AWD Sprinter campervan that we designed for a couple who wanted to travel with their grandchildren.
              </RichParagraph>

              <div className="space-y-10">
                <div>
                  <Heading4 text="Client Vision" className="text-secondary/60 uppercase mb-4" />
                  <div className="grid gap-3">
                    {["Off-grid ready campervan", "Accommodates more than 2 people", "Spacious family kitchen", "Upgraded exterior for gear"].map((txt, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium text-secondary/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-hover" /> {txt}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-hover/20">
                  <Heading4 text="Our Delivery" className="text-secondary/60 font-black uppercase text-xs tracking-[0.2em] mb-6" />
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Zap className="text-hover shrink-0" size={20} />
                      <RichParagraph className="text-xs text-secondary/80">
                        400Ah Lithium, 3000W Inverter, 12V AC, 30-gal grey & 20-gal fresh water tanks.
                      </RichParagraph>
                    </div>
                    <div className="flex gap-4">
                      <Home className="text-hover shrink-0" size={20} />
                      <RichParagraph className="text-sm text-secondary/80">
                        Double swivel seats, elevator, and dinette bed system for 4-5 people.
                      </RichParagraph>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetireeSection;
