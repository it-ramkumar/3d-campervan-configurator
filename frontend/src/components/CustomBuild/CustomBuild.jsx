import { ArrowRight } from "lucide-react";
import FAQs from "../Faqs/Faqs";
import HeroImage from "../Common/HeroSectionNew/HeroSectionNew";
import OurProcess from "../HomePage/OurProcess/OurProcess";
import {
  RichParagraph,
  Heading2,
  Heading3,
  Heading4,
  SecondaryButton,
  ImageWithSkeleton,
  PrimaryButton,
  SpanTag,
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

// Card for light sections (replaces dark GLASS)
const CARD = {
  background: "#FFFFFF",
  border: "1px solid rgba(0,31,61,0.1)",
  boxShadow: "0 2px 12px rgba(0,31,61,0.05)",
};

// Keep amber accents unchanged
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

const faqs = [
  {
    question: "Do you work with clients remotely?",
    answer:
      "Yes. We successfully collaborate with clients across the country via video calls, shared design boards, and regular photo/video updates during the build.",
  },
  {
    question: "What if I don't have a clear design idea yet?",
    answer:
      "That's perfectly normal. Our consultation is designed to help clarify your needs. We use your lifestyle, budget, and inspiration photos to create initial concepts.",
  },
  {
    question: "Can I see physical samples of materials (countertops, fabrics, wood)?",
    answer:
      "Yes. We offer sample kits and encourage you to visit our showroom to touch and feel all material options.",
  },
  {
    question: "Can you integrate specific appliances or technology I want?",
    answer:
      "Absolutely. If you have a favorite audio system or any exterior accessory, we can design the van to accommodate it.",
  },
  {
    question: "What kind of training do you provide at delivery?",
    answer:
      "We schedule a thorough walk-through, demonstrating every system (electrical, plumbing, heating, appliances) and provide you with a detailed manual for reference.",
  },
  {
    question: "What if something needs repair or service after I take delivery?",
    answer:
      "A strong warranty backs our workmanship. We can schedule service at our workshop and also provide remote assistance to our clients.",
  },
  {
    question: "How do I prepare for our first consultation?",
    answer:
      "Think about your must-haves, your budget, and how you plan to use the van. Browsing our portfolio and saving inspiration photos is a great start.",
  },
];

const imgPath = "/custom build/";

const whyFeatures = [
  {
    title: "Customize Interior Layouts",
    img: `${imgPath}buildProcess.webp`,
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
    img: `${imgPath}IMG_9845.webp`,
    alt: "Premium Materials",
    desc: "Sustainable hardwoods, custom cabinetry, self-heating Lithium batteries, advanced Glycol heating, and high-performance insulation — every component is built to last.",
  },
  {
    title: "CNC Precision Technology",
    img: "/images2/cnc1.webp",
    alt: "CNC Technology",
    desc: "CAD/CAM software, 3D Scanners, and CNC routers ensure every cabinet is designed digitally and cut to the millimeter. Precision is not optional — it is standard.",
  },
  {
    title: "Post-Build Support",
    img: "/images2/wcu4.webp",
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
        title="Custom Campervan Builders"
        description="At Big Bear Vans, we build custom campervans from the chassis up. You choose the layout, features, and finishes — we handle the design, build, and quality checks."
        image="/images/s2.webp"
        link="/inquiry"
        showButton={false}
        overlay
        overlayOpacity="bg-black/40"
      />

      {/* ═══════════════ INTRO ═══════════════ */}
      <section className="relative py-28 overflow-hidden" style={BG_LIGHT}>
        <div className="absolute inset-0 pointer-events-none" style={DOT_GRID_LIGHT} />

        <div className="relative mx-auto px-6 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <SpanTag text="Our Philosophy" />
            <Heading2 textColor="text-primary">
              Built From a<br />
              <span className="text-hover">Blank Slate</span>
            </Heading2>
            <SectionDivider />
            <RichParagraph textColor="text-primary" className="!opacity-60">
              Our team manages everything in-house — from electrical and plumbing to cabinetry and
              painting — so your van is truly yours at the end.
            </RichParagraph>
            <RichParagraph textColor="text-primary" className="!opacity-60">
              At Big Bear Vans, "Custom" means every detail is decided by you and built by us. It's
              about co-creating a campervan that is a perfect mirror of your lifestyle and personality.
            </RichParagraph>
          </div>

          <div
            className="relative rounded-xl overflow-hidden aspect-[8/5] shadow-xl"
            style={{ ...AMBER_BORDER, ...AMBER_GLOW }}
          >
            <ImageWithSkeleton src="/images2/159.webp" alt="Big Bear Vans workshop" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(237,152,95,0.08) 0%, transparent 55%)" }}
            />
            <AmberLine />
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW WE DO IT (navy — keep) ═══════════════ */}
      <section className="py-24" style={BG_NAVY}>
        <div className="mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <SpanTag text="The Process" />
            <Heading2 textColor="text-secondary" className="mt-4 mb-4">
              This Is Exactly<br />
              <span className="text-hover">How We Do It</span>
            </Heading2>
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
                style={{ background: "rgba(2,12,24,0.72)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.07)", borderTop: "2px solid #ED985F" }}
              >
                <span className="font-display text-5xl font-black text-[#ED985F]/20 group-hover:text-[#ED985F]/40 transition-colors block">
                  {card.num}
                </span>
                <Heading4 text={card.title} textColor="text-secondary" className="mt-3 mb-4 uppercase tracking-wide" />
                <RichParagraph textColor="text-secondary" className="!opacity-55">
                  {card.desc}
                </RichParagraph>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <PrimaryButton link="/contact" label="Start a Custom Build" />
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
              <SpanTag text="Why Choose Us" />
              <Heading2 textColor="text-primary" className="mt-4">
                Built Different,<br />
                <span className="text-hover">By Design</span>
              </Heading2>
            </div>
            <RichParagraph textColor="text-primary" className="max-w-xs md:text-right !opacity-50">
              Every system, surface, and detail is engineered for life on the road.
            </RichParagraph>
          </div>

          {/* Portrait pair (top row) */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {whyFeatures.slice(0, 2).map((feature, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={CARD}>
                <div className="relative overflow-hidden aspect-[16/9]">
                  <ImageWithSkeleton src={feature.img} alt={feature.alt} />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,31,61,0.35) 0%, transparent 60%)" }}
                  />
                  <AmberLine />
                </div>
                <div className="p-8 space-y-4">
                  <Heading3 text={feature.title} textColor="text-primary" className="uppercase" />
                  <RichParagraph textColor="text-primary" className="!opacity-60">
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
                </div>
              </div>
            ))}
          </div>

          {/* Landscape pair (bottom row) */}
          <div className="grid md:grid-cols-2 gap-8">
            {whyFeatures.slice(2).map((feature, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={CARD}>
                <div className="relative overflow-hidden aspect-[16/7]">
                  <ImageWithSkeleton src={feature.img} alt={feature.alt} />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,31,61,0.35) 0%, transparent 60%)" }}
                  />
                  <AmberLine />
                </div>
                <div className="p-8 space-y-4">
                  <Heading3 text={feature.title} textColor="text-primary" className="uppercase" />
                  <RichParagraph textColor="text-primary" className="!opacity-60">
                    {feature.desc}
                  </RichParagraph>
                  {feature.cta && (
                    <div className="pt-2">
                      <SecondaryButton link="/contact" label="Contact Us" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3D CONFIGURATOR (navy — keep) ═══════════════ */}
      <section className="py-24" style={BG_NAVY}>
        <div className="mx-auto px-6 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <SpanTag text="Try It Now" />
            <Heading2 textColor="text-secondary">
              Our 3D<br />
              <span className="text-hover">Configurator</span>
            </Heading2>
            <SectionDivider />
            <RichParagraph textColor="text-secondary" className="!opacity-60">
              Start designing your dream campervan right now. Try different layouts, finishes, and
              features — all in our interactive 3D tool.
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
            className="relative rounded-xl overflow-hidden aspect-[8/5]"
            style={{ ...AMBER_BORDER, ...AMBER_GLOW }}
          >
            <ImageWithSkeleton src={`${imgPath}configurator.webp`} alt="3D Configurator preview" />
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
              <SpanTag text="Our Builds" />
              <Heading2 textColor="text-primary" className="mt-4">
                105+ Campervans<br />
                <span className="text-hover">Delivered</span>
              </Heading2>
            </div>
            <RichParagraph textColor="text-primary" className="max-w-xs md:text-right !opacity-50">
              Every van is designed for a specific person with different requirements.
            </RichParagraph>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="relative rounded-xl overflow-hidden aspect-[8/5] group"
              style={{ border: "1px solid rgba(0,31,61,0.1)" }}
            >
              <ImageWithSkeleton src="/images2/op4.webp" alt="Portfolio build" />
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
              <SpanTag text="Consistent 5-Star Rating" />
              <Heading3 textColor="text-primary" className="font-display leading-tight">
                See the full collection of our builds
              </Heading3>
              <PrimaryButton link="/van-layouts" label="View Portfolio" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR CLIENTS (navy — keep) ═══════════════ */}
      <section className="py-24" style={BG_NAVY}>
        <div className="mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <SpanTag text="Who We Build For" />
            <Heading2 textColor="text-secondary">
              Built for<br />
              <span className="text-hover">Everyone</span>
            </Heading2>
            <SectionDivider />
            <RichParagraph textColor="text-secondary" className="!opacity-60">
              We've designed custom campervans for clients from all walks of life — families, couples,
              pet-owners, bikers, full-time van lifers. Whatever layout you have in mind, we'll turn
              your idea into a spectacular reality.
            </RichParagraph>
            <PrimaryButton link="/our-clients" label="See Client Stories" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {["Families", "Couples", "Pet Owners", "Full-time Lifers"].map((label) => (
              <div
                key={label}
                className="rounded-xl p-8 flex items-center justify-center h-32 group transition-all duration-300"
                style={{ background: "rgba(2,12,24,0.72)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.07)" }}
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
      <section className="py-28 relative overflow-hidden" style={BG_LIGHT_ALT}>
        <div className="absolute inset-0 pointer-events-none" style={DOT_GRID_LIGHT} />

        <div className="relative mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <SpanTag text="Visit Us" />
            <Heading2 textColor="text-primary" className="mt-4">
              Our <span className="text-hover">Showroom</span>
            </Heading2>
          </div>

          <div
            className="relative rounded-xl overflow-hidden aspect-[9/3] mb-12"
            style={AMBER_BORDER}
          >
            <ImageWithSkeleton src={`${imgPath}40279.webp`} alt="Big Bear Vans Showroom" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(0,31,61,0.25) 0%, transparent 55%)" }}
            />
            <AmberLine />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <RichParagraph textColor="text-primary" className="!opacity-60 leading-relaxed">
              Visit our showroom in Big Bear City, California. See our building process, meet our team,
              and explore ongoing and completed projects firsthand.
            </RichParagraph>
            <div className="space-y-6">
              <RichParagraph textColor="text-primary" className="!opacity-60">
                Walk through finished vans, try different layouts, and sit down for a personal design
                session with our designers to turn your vision into a detailed plan.
              </RichParagraph>
              <SecondaryButton link="/showroom" label="Schedule a Visit" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MEET THE FOUNDERS (navy — keep) ═══════════════ */}
      <section className="py-24" style={BG_NAVY}>
        <div className="mx-auto px-6 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <div
            className="relative rounded-xl overflow-hidden aspect-square"
            style={{ ...AMBER_BORDER, ...AMBER_GLOW }}
          >
            <ImageWithSkeleton src="/images/anna.webp" alt="Artur and Anna — Big Bear Vans founders" />
            <AmberLine />
          </div>

          <div className="space-y-6">
            <SpanTag text="Our Story" />
            <Heading2 textColor="text-secondary" className="uppercase tracking-tighter">
              Meet the <span className="text-hover">Founders</span>
            </Heading2>
            <SectionDivider />
            <RichParagraph textColor="text-secondary" className="!opacity-55 italic">
              As lifelong van enthusiasts, we (Artur and Anna) started Big Bear Vans as a family
              business with a simple purpose: to build the vans we always wished existed.
            </RichParagraph>
            <RichParagraph textColor="text-secondary" className="!opacity-60">
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
