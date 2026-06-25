
import React from "react";
import { Home, Zap, Coffee, Briefcase, Star } from "lucide-react";
import ClassicImageGrid from "./ClassicImageGrid";
import { CustomLink, Heading2, Heading3, RichParagraph } from "../../Common/Common";

const FullTimeVanLifeSection = ({ imageData }) => {
  return (
    <section className="bbv-section-light relative py-20">
      <div className="bbv-dot-grid-light" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-16 border-b border-hover/20 pb-10">
          <div className="p-4 bbv-card rounded-lg text-hover shadow-lg">
            <Home size={40} />
          </div>
          <div>
            <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Full-Time Living</p>
            <Heading2 text="4-Season Ready Campervans" className="font-display text-primary uppercase tracking-wide" />
            <RichParagraph className="text-primary/70 font-bold uppercase mt-1">
              Home on wheels for those who live the journey
            </RichParagraph>
          </div>
        </div>

        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          <div className="lg:col-span-6 bbv-card p-8 md:p-12 rounded-lg border border-hover/20 flex flex-col justify-center">
            <div className="space-y-6">
              <RichParagraph className="text-primary/80">
                Sometimes, we also build campervans for full-time van lifers who
                actually plan to live on the road for a year or more. These
                clients are remote workers, interior designers, and people who
                decided to visit different places and create travel content for
                social media.
              </RichParagraph>
              <RichParagraph className="text-primary/60 leading-relaxed">
                For full-time living, you need a ton of storage and home-like power and water facilities. At Big Bear Vans, we go beyond the standard conversion to fulfill the demanding requirements of full-time living.
              </RichParagraph>
              <div className="flex flex-wrap gap-3 pt-4">
                <RichParagraph className="text-primary/50 -mt-1">Featured Models:</RichParagraph>
                <CustomLink href="/layout-detail/calabasas" text={" Calabasas "} />
                <CustomLink href="/layout-detail/san-diego-campervan" text={" San Diego "} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bbv-card border border-hover/30 p-8 md:p-12 rounded-lg text-primary relative overflow-hidden flex flex-col justify-center shadow-xl">
            <Star className="absolute top-8 right-8 text-hover opacity-20" size={60} />
            <div className="absolute -top-4 left-8 inline-flex items-center gap-2 px-4 py-1.5 bg-hover text-primary rounded-full shadow-md">
              <span className="text-[10px] font-black uppercase tracking-[0.15em]">Testimonial</span>
            </div>
            <RichParagraph className="text-lg italic leading-relaxed mb-8 relative z-10 text-primary/80 mt-4">
              "Big Bear Vans did a full conversion for my MB Sprinter, and I could not be happier! I had very specific requests, and they met all of my requests and are truly a completely customizable conversion company. I went to about three different conversion companies, and I was only given certain planned layouts and certain colors. Not at Big Bear Vans, they accommodated my every wish. They are also extremely knowledgeable. I came back for a couple of upgrades, and they gladly accommodated me. I highly suggest Big Bear Vans for your conversion!"
            </RichParagraph>
            <div className="flex items-center gap-4 border-t border-hover/20 pt-6">
              <div>
                <RichParagraph className="text-primary font-bold">Laura</RichParagraph>
                <RichParagraph className="text-xs uppercase tracking-widest text-primary/60">Calabasas Campervan</RichParagraph>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Section */}
        <div className="bbv-card rounded-lg p-6 md:p-10 lg:p-16 border border-hover/20 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-lg overflow-hidden shadow-2xl bbv-amber-line">
                <ClassicImageGrid images={imageData.sanDiego} layout="standard" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, text: "Robust electrical & water" },
                  { icon: Home, text: "Stationary bed & garage" },
                  { icon: Coffee, text: "Full shower & kitchen" },
                  { icon: Briefcase, text: "Work desk & swivel seats" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-hover/10 p-4 rounded-lg border border-hover/20">
                    <item.icon size={18} className="text-hover" />
                    <span className="text-xs font-bold text-primary/80 uppercase tracking-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div>
                <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Case Study</p>
                <div className="bbv-divider mb-4" />
                <Heading3 text="San Diego Campervan" className="font-display text-primary uppercase tracking-wide mb-4" />
                <RichParagraph className="text-primary/80 my-4">
                  We built the
                  <CustomLink href="/layout-detail/san-diego-campervan" text={" San Diego campervan "} />
                  for an architect who worked
                  on two computers from his van and traveled. The van was
                  designed to be used both as a residence and a workspace.
                </RichParagraph>
              </div>

              <div className="bbv-card p-8 rounded-lg border-l-4 border-hover">
                <RichParagraph className="text-primary/80 italic mb-4">
                  "Big Bear Vans built an amazing custom campervan for me. They have a really nice team to work with, and I was able to really work closely with them on getting exactly what I wanted in my design. I am a remote worker, so I wanted to have an office space as well as a beefy electrical system, a full kitchen, a shower, and a bed area. I've gotten so many compliments on my buildout and couldn't be happier with how it turned out. Highly recommend Big Bear Vans if you're looking to buy a camper van."
                </RichParagraph>
                <RichParagraph className="text-hover text-sm font-bold uppercase tracking-wider">
                  — Remote Worker
                </RichParagraph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullTimeVanLifeSection;
