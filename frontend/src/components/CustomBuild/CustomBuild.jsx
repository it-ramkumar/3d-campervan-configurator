import { ArrowRight } from "lucide-react";
import FAQs from "../Faqs/Faqs";
import HeroImage from "../Common/HeroSectionNew/HeroSectionNew";
import OurProcess from "../HomePage/OurProcess/OurProcess";
import {
  RichParagraph,
  Heading1,
  SecondaryButton,
  ImageWithSkeleton,
  PrimaryButton,
  SpanTag,
  ConsultationButton,
} from "../Common/Common";

// ── Navy sections (keep dark) ────────────────────────────────────────────────
const BG_NAVY = { background: "#001F3D" };

// ── Light sections ───────────────────────────────────────────────────────────
const BG_LIGHT = { background: "#FFFFFF" };
const BG_LIGHT_ALT = { background: "#F8F9FA" };

const DOT_GRID_LIGHT = {
  backgroundImage: "radial-gradient(circle, rgba(0,31,61,0.04) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

// Card for light sections
const CARD = {
  background: "#FFFFFF",
  border: "1px solid rgba(0,31,61,0.1)",
  boxShadow: "0 2px 12px rgba(0,31,61,0.05)",
};

// Amber accents
const AMBER_BORDER = { border: "1px solid rgba(237,152,95,0.22)" };
const AMBER_GLOW = { boxShadow: "0 0 48px rgba(237,152,95,0.08)" };

// ── Sub-components ──────────────────────────────────────────────────────────

function SectionDivider() {
  return <div className="w-12 h-[2px] bg-[#ED985F]" />;
}

function AmberLine() {
  return <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ED985F]" />;
}

// ── Main component ──────────────────────────────────────────────────────────

// Buyer-intent FAQs. Exported so app/custom-build/page.js can build FAQPage schema.
// Prices are estimates only (see docs/claude-project-knowledge/04-build-process.md).
export const faqs = [
  {
    question: "How much does a custom camper van conversion cost?",
    answer:
      "A custom conversion typically costs about $90,000 to $150,000, plus the cost of the base van. This is an estimate to help you plan. Your actual price depends on the layout, power system and options you choose, and is set in a written quote after we design your van.",
  },
  {
    question: "How long does a custom camper van build take?",
    answer:
      "About 5 months from the first sketch to pickup: around 1 month of design with 3D renders, about 2 months of engineering and planning, then the build and assembly in months 3 and 4, followed by quality checks and handover.",
  },
  {
    question: "Do I need to bring my own van?",
    answer:
      "No. You can bring your own Sprinter or Transit and we will inspect it and plan the build, or we can source a new van for you through our dealership partners in Los Angeles and San Diego at a discounted price.",
  },
  {
    question: "Should I build on a Mercedes Sprinter or a Ford Transit?",
    answer:
      "We build on the Mercedes-Benz Sprinter 144\" and 170\" and the Ford Transit 148\", most with AWD. The Sprinter 170\" gives the most living space and room for a full bathroom, while the Sprinter 144\" and Transit 148\" are easier to drive and park. We help you choose based on how many people travel and what gear you carry.",
  },
  {
    question: "How does payment work for a custom build?",
    answer:
      "50% upfront to start, 12% after the large parts are built, and the rest on completion. Financing options are available, and our team can walk you through them on a call.",
  },
  {
    question: "Where are you located, and do you build for clients outside California?",
    answer:
      "Our workshop is in Big Bear City, California, about 2 to 2.5 hours from Los Angeles and Orange County and about 2.5 to 3 hours from San Diego. We also build for clients across the US through video calls, shared design boards and weekly photo and video updates, and most out-of-state owners simply fly in to pick up their van.",
  },
  {
    question: "Will I see the design before you start building?",
    answer:
      "Yes. We create photorealistic 3D renderings of your layout and materials, with unlimited changes until you are happy. You approve every final choice, and you can see physical material samples, before we start.",
  },
  {
    question: "What warranty and support do I get after delivery?",
    answer:
      "Every build includes a 1-year warranty on craftsmanship, with a 3-year extended warranty available, plus a full walkthrough and test drive at pickup, remote assistance and service at our California workshop.",
  },
];

// Prices are estimates, not quotes (see docs/claude-project-knowledge/04-build-process.md)
const planCards = [
  {
    label: "Cost",
    title: "From about $90k to $150k",
    desc: "Typical cost of a custom conversion, plus the base van. This is an estimate for planning. Your exact price comes in a written quote once your design is ready. Financing options are available.",
  },
  {
    label: "Timeline",
    title: "About 5 months",
    desc: "Around 1 month of design with 3D renders, 2 months of engineering and planning, then the build in months 3 and 4, with weekly photo and video updates until pickup.",
  },
  {
    label: "Chassis",
    title: "Sprinter or Transit",
    desc: "Mercedes-Benz Sprinter 144\" or 170\", or Ford Transit 148\", most with AWD. Bring your own van, or we source a new one through our dealership partners at a discount.",
  },
];

const imgPath = "/custom build/";

const whyFeatures = [
  {
    title: "Customize Interior Layouts",
    img: `${imgPath}customize-interior-layout-big-ear-vans.webp`,
    alt: "Interior Layout",
    desc: "You decide the floor plan; our engineers and renderers bring it to life in a photorealistic 3D render before a single tool is lifted.",
    bullets: [
      "Remote worker? Your van will have a full office setup.",
      "Love skiing? We'll build a gear garage under the bed.",
      "Travel with a pet? Dedicated feeding station included.",
    ],
  },
  {
    title: "Premium, Client-Selected Materials",
    img: `${imgPath}premium-material-big-bear-vans.webp`,
    alt: "Premium Materials",
    desc: "Sustainable hardwoods, custom cabinetry, self-heating Lithium batteries, advanced Glycol heating, and high-performance insulation — every component is built to last.",
  },
  {
    title: "CNC Precision Technology",
    img: "/Home/home-cnc-machine-big-bear-vans.webp",
    alt: "CNC Technology",
    desc: "CAD/CAM software, 3D Scanners, and CNC routers ensure every cabinet is designed digitally and cut to the millimeter. Precision is not optional — it is standard.",
  },
  {
    title: "Post-Build Support",
    img: "/Home/home-garrage-big-bear-vans.webp",
    alt: "Post-Build Support",
    desc: "1-Year Standard Warranty (3-Year Extended) on craftsmanship, plus remote assistance, future maintenance, and upgrades at our California workshop.",
    cta: true,
  },
];

const CustomBuild = () => {
  return (
    <div>
      {/* ═══════════════ HERO ═══════════════ */}
      <HeroImage
        alt="Custom camper van by Big Bear Vans"
        slogan="You Dream It. We Build It."
        title="Custom Camper Van Builders in California"
        description="Big Bear Vans builds fully custom Mercedes Sprinter and Ford Transit camper van conversions from an empty van. You choose the layout, features and finishes; we handle the 3D design, build and quality checks in our Big Bear, California workshop."
        image="/Home/home-custom-build-big-bear-vans.webp"
        link="/build-your-own-camper-van"
        showButton={false}
        overlay
        overlayOpacity="bg-black/40"
      />

      {/* ═══════════════ INTRO ═══════════════ */}
      <section className="relative py-20 overflow-hidden" style={BG_LIGHT}>
        <div className="absolute inset-0 pointer-events-none" style={DOT_GRID_LIGHT} />

        <div className="relative mx-auto px-6 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <SpanTag text="Our Philosophy" />
            <Heading1 variant="section" textColor="text-primary">
              Custom Camper Van Conversions,<br />
              <span className="text-hover">Built From an Empty Van</span>
            </Heading1>
            <SectionDivider />
            <RichParagraph variant="body">
              Our team manages everything in-house — from electrical and plumbing to cabinetry and
              painting — so your van is truly yours at the end.
            </RichParagraph>
            <RichParagraph variant="body">
              At Big Bear Vans, "Custom" means every detail is decided by you and built by us. It's
              about co-creating a campervan that is a perfect mirror of your lifestyle and personality.
            </RichParagraph>
          </div>

          <div
            className="relative rounded-xl overflow-hidden aspect-square shadow-xl"
            style={{ ...AMBER_BORDER, ...AMBER_GLOW }}
          >
            <ImageWithSkeleton src="/custom build/custom-build-big-bear-vans.webp" alt="Big Bear Vans workshop" width={1080} height={1080} />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(237,152,95,0.08) 0%, transparent 55%)" }}
            />
            <AmberLine />
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW WE DO IT (navy) ═══════════════ */}
      <section className="py-24" style={BG_NAVY}>
        <div className="mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <RichParagraph variant="sub" className="!text-hover">
              The Process
            </RichParagraph>

            <Heading1 variant="section" textColor="text-secondary" className="mt-4 mb-4">
              How Our Custom<br />
              <span className="text-hover">Van Conversion Works</span>
            </Heading1>
            <div className="w-12 h-[2px] bg-[#ED985F] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Start With an Empty Van",
                desc: "We begin with a blank chassis. No pre-built parts to work around — just a van and your vision.",
              },
              {
                num: "02",
                title: "Zero Restrictions",
                desc: "We listen to your ideas and create a detailed 3D render — no preset floor plans or feature packages.",
              },
              {
                num: "03",
                title: "You Control Every Detail",
                desc: "From the electrical system to cabinet design, you approve every final choice before we pick up a tool.",
              },
            ].map((card) => (
              <div
                key={card.num}
                className="p-8 rounded-xl group transition-all duration-300"
                style={{
                  background: "rgba(2,12,24,0.72)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderTop: "2px solid #ED985F",
                }}
              >
                <Heading1 variant="card" text={card.title} textColor="text-secondary" className="mt-3 mb-4 uppercase tracking-wide" />
                <RichParagraph variant="card" textColor="text-secondary" className="!opacity-55">
                  {card.desc}
                </RichParagraph>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <ConsultationButton label="Start a Custom Build" />
          </div>
        </div>
      </section>

      {/* ═══════════════ COST, TIMELINE & CHASSIS ═══════════════ */}
      <section className="py-24 relative overflow-hidden" style={BG_LIGHT}>
        <div className="absolute inset-0 pointer-events-none" style={DOT_GRID_LIGHT} />

        <div className="relative mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-10 border-b border-primary/10 gap-6">
            <div className="max-w-xl">
              <RichParagraph variant="sub" textColor="text-hover">
                Plan Your Build
              </RichParagraph>
              <Heading1 variant="section" textColor="text-primary" className="mt-4">
                Cost, Timeline &<br />
                <span className="text-hover">Chassis Options</span>
              </Heading1>
            </div>
            <RichParagraph variant="body" className="max-w-md md:text-right">
              Our workshop is in Big Bear City, California, about 2 to 2.5 hours from Los Angeles and
              Orange County and 2.5 to 3 hours from San Diego. We also build for clients across the US.
            </RichParagraph>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {planCards.map((card) => (
              <div key={card.title} className="rounded-xl p-8 space-y-4" style={{ ...CARD, borderTop: "2px solid #ED985F" }}>
                <RichParagraph variant="sub" textColor="text-hover">
                  {card.label}
                </RichParagraph>
                <Heading1 variant="card" text={card.title} textColor="text-primary" className="uppercase" />
                <RichParagraph variant="card">{card.desc}</RichParagraph>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR PROCESS ═══════════════ */}
      <OurProcess />

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <section className="py-28 relative overflow-hidden" style={BG_LIGHT_ALT}>
        <div className="absolute inset-0 pointer-events-none" style={DOT_GRID_LIGHT} />

        <div className="relative mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-10 border-b border-primary/10 gap-6">
            <div className="max-w-xl">
              <RichParagraph variant="sub" textColor="text-hover">
                Why Choose Us
              </RichParagraph>

              <Heading1 variant="section" textColor="text-primary" className="mt-4">
                Why Choose Us as<br />
                <span className="text-hover">Your Van Builder</span>
              </Heading1>
            </div>
            <RichParagraph variant="body" textColor="text-primary" className="max-w-xs md:text-right !opacity-50">
              Every system, surface, and detail is engineered for life on the road.
            </RichParagraph>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyFeatures.map((feature, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={CARD}>
                <div className="relative overflow-hidden aspect-square">
                  <ImageWithSkeleton src={feature.img} alt={feature.alt} />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,31,61,0.35) 0%, transparent 60%)" }}
                  />
                  <AmberLine />
                </div>
                <div className="p-8 space-y-4">
                  <Heading1 variant="card" text={feature.title} textColor="text-primary" className="uppercase" />
                  <RichParagraph variant="card">
                    {feature.desc}
                  </RichParagraph>
                  {feature.bullets && (
                    <ul className="space-y-2 pt-2">
                      {feature.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ED985F] mt-2 flex-shrink-0" />
                          <span className="text-sm font-ui italic text-[#001F3D]/55">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {feature.cta && (
                    <div className="pt-2">
                      <ConsultationButton label="Contact Us" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3D CONFIGURATOR (navy) ═══════════════ */}
      <section className="py-24" style={BG_NAVY}>
        <div className="mx-auto px-6 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <RichParagraph variant="sub" textColor="text-primary">
              Try It Now
            </RichParagraph>

            <Heading1 variant="section" textColor="text-secondary">
              Our 3D<br />
              <span className="text-hover">Configurator</span>
            </Heading1>
            <SectionDivider />
            <RichParagraph variant="body" textColor="text-secondary/80">
              Start designing your dream campervan right now. Try different layouts, finishes, and
              features all in our interactive 3D tool.
            </RichParagraph>
            <ul className="space-y-3">
              {[
                "Move things around and test different layouts.",
                "Select accessories and see how they look virtually on your van.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ArrowRight size={15} className="text-[#ED985F] mt-0.5 flex-shrink-0" />
                  <span className="font-ui text-[#FBFBF9]/55 italic text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <SecondaryButton link="/configurator" label="Try 3D Configurator" />
          </div>

          <div
            className="relative rounded-xl overflow-hidden aspect-square"
            style={{ ...AMBER_BORDER, ...AMBER_GLOW }}
          >
            <ImageWithSkeleton src={`${imgPath}3d-configurator-big-bear-vans.webp`} alt="3D Configurator preview" width={1080} height={1080} />
            <AmberLine />
          </div>
        </div>
      </section>

      {/* ═══════════════ PORTFOLIO ═══════════════ */}
      <section className="py-28 relative overflow-hidden" style={BG_LIGHT}>
        <div className="absolute inset-0 pointer-events-none" style={DOT_GRID_LIGHT} />

        <div className="relative mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-10 border-b border-primary/10 gap-6">
            <div>
              <RichParagraph variant="sub" textColor="text-hover">
                Our Builds
              </RichParagraph>

              <Heading1 variant="section" textColor="text-primary" className="mt-4">
                111+ Custom Camper Vans<br />
                <span className="text-hover">Delivered</span>
              </Heading1>
            </div>
            <RichParagraph variant="body">
              Every van is designed for a specific person with different requirements.
            </RichParagraph>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="relative rounded-xl overflow-hidden aspect-square group"
              style={{ border: "1px solid rgba(0,31,61,0.1)" }}
            >
              <ImageWithSkeleton src={`${imgPath}105-custom-build-big-bear-vans.webp`} alt="Portfolio build" width={1080} height={1080} />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,31,61,0.35) 0%, transparent 60%)" }}
              />
              <AmberLine />
            </div>

            <div
              className="rounded-xl flex flex-col items-center justify-center p-16 text-center gap-6"
              style={{ ...CARD, borderTop: "2px solid #ED985F" }}
            >
              <RichParagraph variant="sub" textColor="text-hover">
                Consistent 5-Star Rating
              </RichParagraph>

              <Heading1 variant="card" textColor="text-primary">
                See the full collection of our builds
              </Heading1>
              <PrimaryButton link="/van-layouts" label="View Portfolio" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR CLIENTS (navy) ═══════════════ */}
      <section className="py-24" style={BG_NAVY}>
        <div className="mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <RichParagraph variant="sub" textColor="text-hover">
              Who We Build For
            </RichParagraph>
            <Heading1 variant="section" textColor="text-secondary">
              Custom Vans for Families,<br />
              <span className="text-hover">Couples, Bikers & Full-Timers</span>
            </Heading1>
            <SectionDivider />
            <RichParagraph variant="body" textColor="text-secondary" className="!opacity-60">
              We've designed custom campervans for clients from all walks of life — families, couples,
              pet-owners, bikers, full-time van lifers. Whatever layout you have in mind, we'll turn
              your idea into a spectacular reality.
            </RichParagraph>
            <SecondaryButton link="/our-clients" label="See Client Stories" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {["Families", "Couples", "Pet Owners", "Full-time Lifers"].map((label) => (
              <div
                key={label}
                className="rounded-xl p-8 flex items-center justify-center h-32 group transition-all duration-300"
                style={{
                  background: "rgba(2,12,24,0.72)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span className="font-ui font-bold text-xs uppercase tracking-[0.3em] text-[#FBFBF9]/25 group-hover:text-[#ED985F] transition-colors duration-300">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SHOWROOM ═══════════════ */}
      <section className="relative py-24 md:py-32 bg-secondary overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={DOT_GRID_LIGHT} />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <RichParagraph variant="sub" textColor="text-hover">
                Visit Us
              </RichParagraph>

              <Heading1 variant="section" textColor="text-primary" className="mt-4">
                Our <span className="text-hover">Showroom</span>
              </Heading1>
            </div>

            <RichParagraph variant="body" className="max-w-md md:text-right">
              See where your van comes to life, meet our team, and explore our latest builds in person.
            </RichParagraph>
          </div>

          <div className="relative rounded-2xl overflow-hidden" style={AMBER_BORDER}>
            <ImageWithSkeleton
              src={`${imgPath}showroom-ctr-big-bear-vans.webp`}
              alt="Big Bear Vans Showroom"
              width={2048}
              height={684}
              className="w-full h-auto"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,31,61,0.8) 0%, rgba(0,31,61,0.15) 45%, transparent 75%)",
              }}
            />
            <div className="absolute left-6 bottom-6 md:left-10 md:bottom-8">
              <RichParagraph
                variant="sub"
                textColor="text-secondary"
                className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 uppercase"
              >
                Big Bear City, California
              </RichParagraph>
            </div>
            <AmberLine />
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-20 mt-12 items-start">
            <div>
              <RichParagraph variant="body" className="max-w-xl">
                Visit our showroom in Big Bear City, California. See our building process, meet our team, and explore ongoing and completed projects firsthand.
              </RichParagraph>
            </div>

            <div>
              <RichParagraph variant="body" className="max-w-xl">
                Walk through finished vans, try different layouts, and sit down for a personal design session with our designers to turn your vision into a detailed plan.
              </RichParagraph>

              <div className="mt-8">
                <SecondaryButton
                  link="/showroom"
                  label="Schedule a Visit"
                  className="!hover:bg-hover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MEET THE FOUNDERS (navy) ═══════════════ */}
      <section className="py-24" style={BG_NAVY}>
        <div className="mx-auto px-6 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <div
            className="relative rounded-xl overflow-hidden aspect-square"
            style={{ ...AMBER_BORDER, ...AMBER_GLOW }}
          >
            <ImageWithSkeleton src={`${imgPath}anna-arthur-big-bear-vans.webp`} alt="Artur and Anna — Big Bear Vans founders" width={2048} height={2048} />
            <AmberLine />
          </div>

          <div className="space-y-6">
            <RichParagraph variant="sub" textColor="text-hover">
              Our Story
            </RichParagraph>

            <Heading1 variant="section" textColor="text-secondary" className="uppercase tracking-tighter">
              Meet the <span className="text-hover">Founders</span>
            </Heading1>
            <SectionDivider />
            <RichParagraph variant="body" textColor="text-secondary/80" className="italic">
              As lifelong van enthusiasts, we (Artur and Anna) started Big Bear Vans as a family
              business with a simple purpose: to build the vans we always wished existed.
            </RichParagraph>
            <RichParagraph variant="body" textColor="text-secondary/80">
              Before founding Big Bear Vans, we lived on the road through Europe and the USA,
              converting our own RVs. That hands-on experience taught us what truly matters in a
              mobile home — and it's built into every van we create.
            </RichParagraph>
            <SecondaryButton link="/about-us" label="Learn More About Us" />
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQs ═══════════════ */}
      <FAQs faqs={faqs} />
    </div>
  );
};

export default CustomBuild;