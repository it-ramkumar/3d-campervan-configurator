import Link from "next/link";
import { Heading1, RichParagraph } from "@/components/Common/Common";

// SEO copy for /camper-vans-for-sale. Targets the non-branded buying queries
// from GSC ("camper van for sale", "van with bed for sale", "camper van with
// shower and toilet for sale", "pop top van for sale", "awd sprinter camper
// vans for sale", "... for sale california"). Keep claims in line with
// docs/claude-project-knowledge — no specs or prices that aren't on the site.

const CONTAINER = "container mx-auto px-6 md:px-12 lg:px-16 xl:px-20";

const FEATURES = [
  {
    title: "Camper vans with an elevator bed",
    text: "Our signature electric elevator bed lowers with a button at night and lifts to the ceiling during the day, freeing up a full garage for bikes, boards and gear.",
    href: "/van-layouts/santa-monica",
    linkLabel: "See the Santa Monica layout",
  },
  {
    title: "Camper vans with shower and toilet",
    text: "Many of our vans for sale have a full indoor wet bath with hot water, a shower and a toilet, so you are not hunting for campground bathrooms.",
    href: "/van-layouts/montreal",
    linkLabel: "See the Montreal layout",
  },
  {
    title: "Pop top camper vans",
    text: "A pop top adds a second sleeping level for kids or guests without making the van longer, so a family can travel in one van.",
    href: "/camper-vans-for-sale/montreal-170-awd-pop-top-blue-gray",
    linkLabel: "See the Montreal 170 AWD Pop Top",
  },
  {
    title: "AWD and 4x4 camper vans",
    text: "Most of our builds sit on AWD Mercedes-Benz Sprinter or Ford Transit chassis, with four-season insulation and diesel heat for snow, dirt roads and mountain passes.",
    href: "/our-clients",
    linkLabel: "See AWD vans built for our clients",
  },
  {
    title: "Family camper vans that sleep 4 to 8",
    text: "Layouts with extra seat belts, swivel seats and pop top or bunk sleeping for families, from compact 144\" builds to our 170\" flagship.",
    href: "/van-layouts?category=layouts-for-families-3-9-people",
    linkLabel: "Browse family layouts",
  },
  {
    title: "Moto vans for sale",
    text: "Camper vans with a separate motorcycle garage, tie-downs and a wash station, so you can haul your bikes and live in the same van.",
    href: "/moto-vans",
    linkLabel: "See moto vans",
  },
];

const CHASSIS = [
  {
    title: "Mercedes-Benz Sprinter",
    text: "Available in 144\" and 170\" wheelbases with AWD and a turbo diesel engine. Pick the 170\" for the most living space and a full bathroom, or the 144\" for easier city driving and parking.",
  },
  {
    title: "Ford Transit",
    text: "Our 148\" high-roof Transit builds come with AWD and the EcoBoost V6. They are a little more compact than a Sprinter 170 and are often easier to service across the US.",
  },
];

const fmt = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function ForSaleGuide({ priceRange, availableCount = 0 }) {
  const hasRange = priceRange && priceRange.min > 0 && priceRange.max > 0;
  const priceText = hasRange
    ? priceRange.min === priceRange.max
      ? `Our ready-to-buy van is currently listed at ${fmt(priceRange.min)}.`
      : `Our ready-to-buy vans are currently listed from ${fmt(priceRange.min)} to ${fmt(priceRange.max)}, depending on chassis, wheelbase, power system and bathroom.`
    : "Prices depend on chassis, wheelbase, power system and bathroom, and each listing shows its current price.";

  return (
    <>
      {/* ── INTRO ─────────────────────────────────── */}
      <section aria-labelledby="buy-heading" className="py-16 md:py-24">
        <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`}>
          <div className="lg:col-span-5">
            <RichParagraph variant="sub" textColor="text-primary/80" className="border-l-2 border-hover pl-3 py-0.5 !opacity-100">
              Buying a camper van
            </RichParagraph>
            <Heading1 as="h2" variant="section" id="buy-heading" textColor="text-primary" className="uppercase mt-4">
              Custom Camper Vans for Sale in California
            </Heading1>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <RichParagraph>
              Every camper van for sale on this page was built in our workshop in Big Bear, California, about 2 to 2.5
              hours from Los Angeles. They are not used RVs or mass-produced campers. Each one is a fully custom
              Mercedes-Benz Sprinter or Ford Transit conversion with off-grid lithium power, four-season insulation
              and a real kitchen{availableCount > 0 ? `, and ${availableCount} ${availableCount === 1 ? "is" : "are"} ready to buy right now` : ""}.
            </RichParagraph>
            <RichParagraph>
              {priceText} Financing is available, and you can visit our showroom or book a virtual tour by FaceTime
              or Zoom before you buy. Buyers from across the US pick up their van in Big Bear, with a full walkthrough
              and test drive of every system.
            </RichParagraph>
          </div>
        </div>
      </section>

      {/* ── SHOP BY FEATURE ───────────────────────── */}
      <section aria-labelledby="features-heading" className="relative bg-primary text-secondary py-16 md:py-24 overflow-hidden">
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[2px] bg-hover" />
        <div className={CONTAINER}>
          <RichParagraph variant="sub" textColor="text-hover" className="border-l-2 border-hover pl-3 py-0.5 !opacity-100">
            Shop by feature
          </RichParagraph>
          <Heading1 as="h2" variant="section" id="features-heading" textColor="text-secondary" className="uppercase mt-4">
            Find the right van for how you travel
          </Heading1>

          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-secondary/10 rounded-lg overflow-hidden">
            {FEATURES.map((f) => (
              <li key={f.title} className="bg-primary p-6 md:p-7 flex flex-col">
                <Heading1 as="h3" variant="card" textColor="text-hover" className="!text-hover font-bold">
                  {f.title}
                </Heading1>
                <RichParagraph variant="card" textColor="text-secondary/80" className="mt-3 !opacity-100">
                  {f.text}
                </RichParagraph>
                {f.href && (
                  <Link
                    href={f.href}
                    className="mt-4 text-sm font-semibold text-secondary underline underline-offset-4 decoration-hover hover:text-hover"
                  >
                    {f.linkLabel} →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SPRINTER VS TRANSIT ───────────────────── */}
      <section aria-labelledby="chassis-heading" className="py-16 md:py-24">
        <div className={CONTAINER}>
          <RichParagraph variant="sub" textColor="text-primary/80" className="border-l-2 border-hover pl-3 py-0.5 !opacity-100">
            Compare
          </RichParagraph>
          <Heading1 as="h2" variant="section" id="chassis-heading" textColor="text-primary" className="uppercase mt-4">
            Sprinter or Transit camper van?
          </Heading1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHASSIS.map((c) => (
              <div key={c.title} className="bbv-card relative p-6 overflow-hidden">
                <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[2px] bg-hover" />
                <Heading1 as="h3" variant="card" textColor="text-primary" className="font-bold">
                  {c.title}
                </Heading1>
                <RichParagraph variant="card" textColor="text-primary/80" className="mt-3 !opacity-100">
                  {c.text}
                </RichParagraph>
              </div>
            ))}
          </div>
          <RichParagraph className="mt-8">
            Not finding the exact van you want? Every van for sale can be customized in our{" "}
            <Link href="/configurator" className="font-semibold underline underline-offset-4 decoration-hover hover:text-hover">
              3D configurator
            </Link>
            , or we can{" "}
            <Link href="/build-your-own-camper-van" className="font-semibold underline underline-offset-4 decoration-hover hover:text-hover">
              build one from scratch
            </Link>
            . See{" "}
            <Link href="/financing" className="font-semibold underline underline-offset-4 decoration-hover hover:text-hover">
              financing options
            </Link>
            .
          </RichParagraph>
        </div>
      </section>
    </>
  );
}
