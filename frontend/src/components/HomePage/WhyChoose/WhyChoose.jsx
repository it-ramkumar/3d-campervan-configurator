"use client";
import React, { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Palette,
  BedDouble,
  CookingPot,
  ShowerHead,
  Armchair,
  Caravan,
  ShieldCheck,
  Wrench,
  Computer,
  Router,
  Scan,
  Users,
  TentTree,
  Table,
  Utensils,
  BatteryCharging,
  Thermometer,
  Droplets,
  AirVent,
  Sun,
} from "lucide-react";
import {
  Heading1,
  RichParagraph,
  ImageWithSkeleton,
  CustomLink,
} from "../../Common/Common";

const sections = [
  {
    title: "True Custom Builds",
    summary: "Any layout, any style, built from scratch.",
    icon: Palette,
    intro:
      "Big Bear Vans is a fully custom engineering company where we create any configuration and style you want. Instead of pre-built layouts and generic templates, we customize your entire campervan from scratch. Here's what you can choose:",
    features: [
      {
        content: (
          <>
            <strong>Ceiling, walls, and flooring kits</strong> in different
            colours and textures.
          </>
        ),
        icon: Palette,
      },
      {
        content: (
          <>
            Space-saving <strong>elevator bed</strong> front or rear.
          </>
        ),
        icon: BedDouble,
      },
      {
        content: (
          <>
            Kitchen with different{" "}
            <strong>customized cabinets and countertops.</strong>
          </>
        ),
        icon: CookingPot,
      },
      {
        content: (
          <>
            Lightweight <strong>Aluminum bathrooms</strong> in different sizes.
          </>
        ),
        icon: ShowerHead,
      },
      {
        content: (
          <>
            <strong>Swivel seats</strong> or <strong>extendable benches.</strong>
          </>
        ),
        icon: Armchair,
      },
      {
        content: (
          <>
            <strong>Exterior upgrades</strong> like suspension, wheels, tires,
            awning, storage boxes, etc.
          </>
        ),
        icon: Caravan,
      },
    ],
    outro:
      "We're small, but high-tech. That's why we can customize layouts and features other shops won't even touch.",
    image: "/Home/home-custom-build-big-bear-vans.webp",
    isReverse: false,
  },
  {
    title: "Post Build Support",
    summary: "Warranty plus servicing in our own workshop.",
    icon: ShieldCheck,
    intro:
      "From first call to last key handover, we guide and support you at every step. Unlike other RV dealers, Big Bear Vans provides great after-sales support to its customers. We offer:",
    features: [
      {
        content: (
          <>
            <strong>1-year or 3-year extended warranty</strong> on our
            craftsmanship.
          </>
        ),
        icon: ShieldCheck,
      },
      {
        content: (
          <>
            <strong>Servicing and installing upgrades</strong> in our workshop.
          </>
        ),
        icon: Wrench,
      },
    ],
    image: "/Home/home-garrage-big-bear-vans.webp",
    isReverse: true,
  },
  {
    title: "CNC Technology",
    summary: "CAD-designed, CNC-cut, 3D-scanned precision.",
    icon: Router,
    intro:
      "Our Big Bear workshop is equipped with the latest industrial CNC technology. At our workshop:",
    features: [
      {
        content: (
          <>
            A team of 5+ designers uses <strong>CAD/CAM software</strong> to
            model every part of your van.
          </>
        ),
        icon: Computer,
      },
      {
        content: (
          <>
            Components are cut by our two <strong>CNC router machines</strong>{" "}
            (metal & plywood).
          </>
        ),
        icon: Router,
      },
      {
        content: (
          <>
            We have several <strong>3D scanners</strong> for precise
            measurements.
          </>
        ),
        icon: Scan,
      },
    ],
    outro: "The result? A fully custom campervan, exactly the way you want.",
    image: "/Home/home-cnc-machine-big-bear-vans.webp",
    isReverse: false,
  },
  {
    title: "Family-friendly Layouts",
    summary: "Seat and sleep 4 to 9 people safely.",
    icon: Users,
    intro: (
      <span>
        While others are built for couples, ours are for the whole crew. We're
        proud to have built several
        <CustomLink
          href={"/van-layouts?category=layouts-for-families-3-9-people"}
          text={" family-friendly campervans "}
        />{" "}
        In our family layouts, you can:
      </span>
    ),
    features: [
      {
        content: (
          <>
            Sit, sleep, and travel safely with{" "}
            <strong>4 or even 9 people.</strong>
          </>
        ),
        icon: Users,
      },
      {
        content: (
          <>
            Enjoy outdoors in the rear{" "}
            <strong>foldable patio and roof deck.</strong>
          </>
        ),
        icon: TentTree,
      },
      {
        content: (
          <>
            Have a <strong>dinette area</strong> for meals, games, and
            homework.
          </>
        ),
        icon: Table,
      },
      {
        content: (
          <>
            Have a fully functional{" "}
            <strong>kitchen and a lightweight bathroom.</strong>
          </>
        ),
        icon: Utensils,
      },
    ],
    image: "/Home/home-family-van-big-bear-vans.webp",
    isReverse: true,
  },
  {
    title: "Off-grid Ready",
    summary: "15,600Wh lithium, solar and 12V A/C as standard.",
    icon: Sun,
    intro: (
      <span>
        Every Big Bear van comes with a professional-grade{" "}
        <CustomLink
          href={"/van-options/system-options"}
          text={"electrical and water system "}
        />
        so you can go anywhere to stay without a second thought. We install:
      </span>
    ),
    features: [
      {
        content: (
          <>
            <strong>Rapid Alternator Charging:</strong> Up to{" "}
            <strong>250A</strong> with a 2nd alternator.
          </>
        ),
        icon: BatteryCharging,
      },
      {
        content: (
          <>
            Self-heating <strong>lithium batteries (15,600Wh)</strong>.
          </>
        ),
        icon: Thermometer,
      },
      {
        content: (
          <>
            Integrated <strong>grey and fresh water tanks.</strong>
          </>
        ),
        icon: Droplets,
      },
      {
        content: (
          <>
            A <strong>12V slim A/C unit</strong> that runs for up to{" "}
            <strong>20 hours</strong>.
          </>
        ),
        icon: AirVent,
      },
      {
        content: (
          <>
            <strong>Solar panels</strong> on the roof and hood.
          </>
        ),
        icon: Sun,
      },
    ],
    outro:
      "Off-grid freedom isn't an upgrade in our converted vans, it's a standard.",
    image: "/Home/home-off-grid-road-big-bear-vans.webp",
    isReverse: false,
  },
];

export default function WhyChoose() {
  const trackRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Card step = card width + gap, read from the DOM so it follows the breakpoint
  const getStep = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild;
    if (!first) return 0;
    return first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || 0);
  };

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    if (step) setActiveCard(Math.round(track.scrollLeft / step));
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  };

  const scrollByCards = (dir) => {
    trackRef.current?.scrollBy({ left: dir * getStep(), behavior: "smooth" });
  };

  const scrollToCard = (i) => {
    trackRef.current?.scrollTo({ left: i * getStep(), behavior: "smooth" });
  };

  // Click-and-drag scrolling for mouse users (touch already swipes natively)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    drag.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setIsDragging(true);
      // Snap would fight the manual scroll, so pause it while dragging
      trackRef.current.style.scrollSnapType = "none";
      trackRef.current.setPointerCapture(e.pointerId);
    }
    if (d.moved) trackRef.current.scrollLeft = d.startScroll - dx;
  };

  const endDrag = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (!d.moved) return;
    const track = trackRef.current;
    const step = getStep();
    const delta = track.scrollLeft - d.startScroll;
    // A short flick still moves one card in the drag direction; then snap takes over again
    const pos = step ? track.scrollLeft / step : 0;
    const index = Math.abs(delta) > step * 0.15 ? (delta > 0 ? Math.ceil(pos) : Math.floor(pos)) : Math.round(pos);
    const target = index * step;
    track.scrollTo({ left: target, behavior: "smooth" });
    setTimeout(() => {
      track.style.scrollSnapType = "";
      setIsDragging(false);
    }, 400);
  };

  // A drag must not also trigger the links inside the cards
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section className="bbv-section-light overflow-hidden antialiased relative">
      <div className="bbv-dot-grid-light" />

      {/* ── HEADER ── */}
      <div className="relative border-b border-primary/10 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl py-10 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <RichParagraph
                variant="sub"
                textColor="!text-hover"
                className="uppercase font-bold"
              >
                Our Advantage
              </RichParagraph>
            </div>

            <Heading1 variant="section" textColor="text-primary">
              Why Choose
              <br />
              <span className="text-hover">Big Bear Vans?</span>
            </Heading1>

            <RichParagraph variant="body" className="leading-relaxed max-w-lg">
              Based in Big Bear, California, our team of expert builders and
              engineers deliver precision-crafted homes on wheels that stand in a
              class of their own.
            </RichParagraph>
          </div>

        </div>

        {/* Ghost brand mark */}
        <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span className="text-[260px] font-black text-primary/[0.025] leading-none pr-6">
            BBV
          </span>
        </div>
      </div>

      {/* ── FEATURE CARDS (horizontal scroll) ── */}
      <div className="container mx-auto px-6 max-w-7xl py-12 md:py-14 relative z-10">
        <div className="relative">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className={`flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-pl-6 xl:scroll-pl-0 no-scrollbar -mx-6 px-6 xl:mx-0 xl:px-0 pb-4 md:cursor-grab ${
            isDragging ? "md:cursor-grabbing select-none" : ""
          }`}
        >
          {sections.map((section, i) => {
            const num = String(i + 1).padStart(2, "0");

            return (
              <div
                key={i}
                className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[calc((100%-20px)/2)] flex flex-col bg-white rounded-lg overflow-hidden ring-1 ring-primary/10 shadow-xl"
              >
                {/* ── IMAGE ── */}
                <div className="relative aspect-[10/10] w-full overflow-hidden">
                  <ImageWithSkeleton
                    src={section.image}
                    alt={section.title}
                    wrapperClassName="h-full"
                    className="h-full"
                    sizes="(min-width: 768px) 620px, 85vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#020C18]/80 backdrop-blur-md border border-hover/30">
                    <RichParagraph variant="sub" className="font-bold !text-secondary">
                      {num}
                    </RichParagraph>
                  </div>
                  <div className="bbv-amber-line" />
                </div>

                {/* ── CONTENT ── */}
                <div className="flex flex-col gap-4 p-5 md:p-6 flex-1">
                  <Heading1 as="h3" variant="card" textColor="text-primary">
                    {section.title}
                  </Heading1>

                  <RichParagraph variant="sub" className="!text-primary/70">
                    {section.intro}
                  </RichParagraph>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {section.features.map((f, fi) => {
                      const IconComponent = f.icon;
                      return (
                        <div
                          key={fi}
                          className="group flex items-start gap-3 p-3 rounded-lg bg-primary/[0.04] hover:bg-primary/[0.08] border border-primary/[0.08] hover:border-hover/30 transition-all duration-300"
                        >
                          <span className="flex-shrink-0 p-1.5 rounded-lg bg-hover/20 text-hover group-hover:bg-hover group-hover:text-secondary transition-all mt-0.5">
                            <IconComponent size={16} />
                          </span>
                          <RichParagraph
                            variant="sub"
                            className="!text-primary/70"
                          >
                            {f.content}
                          </RichParagraph>
                        </div>
                      );
                    })}
                  </div>

                  {section.outro && (
                    <div className="mt-auto p-4 rounded-lg border-l-2 border-hover bg-hover/[0.07]">
                      <RichParagraph
                        variant="card"
                        className="!text-primary/70 !text-sm italic"
                      >
                        {section.outro}
                      </RichParagraph>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

          {/* Carousel arrows, vertically centred on the cards */}
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={atStart}
            aria-label="Previous reasons"
            className="hidden md:flex absolute left-0 xl:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-lg bg-white border border-hover/40 text-hover shadow-xl items-center justify-center transition-all hover:bg-hover hover:text-secondary hover:border-hover disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={atEnd}
            aria-label="Next reasons"
            className="hidden md:flex absolute right-0 xl:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-lg bg-white border border-hover/40 text-hover shadow-xl items-center justify-center transition-all hover:bg-hover hover:text-secondary hover:border-hover disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {sections.map((section, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show ${section.title}`}
              onClick={() => scrollToCard(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeCard ? "w-6 bg-hover" : "w-2 bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
