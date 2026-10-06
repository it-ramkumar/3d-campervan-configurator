import Image from "next/image";
import Link from "next/link";
import { Heading1, RichParagraph } from "@/components/Common/Common";

// ════════════════════════════════════════════════════════
// CONTENT — edit copy here. Do not add specs/prices that are
// not on the build pages.
// ════════════════════════════════════════════════════════

const SITE_URL = "https://www.bigbearvans.com";
const PAGE_URL = `${SITE_URL}/moto-vans`;

const SEO = {
  title: "Moto Vans for Sale | Custom Sprinter & Transit Motorcycle Haulers | Big Bear Vans",
  description:
    "Custom moto vans on the Mercedes Sprinter and Ford Transit, with a motorcycle garage, bike wash station and off-grid living space. See our builds and get a quote.",
  // TODO: replace placeholder with a real 1200x630 photo
  ogImage: "/moto-vans/hero.webp",
};

// TODO: replace placeholder with a real 1:1 photo (page also works without it)
const HERO_IMAGE = {
  src: "/moto-vans/hero.webp",
  alt: "Big Bear Vans moto van with motorcycles loaded in the rear garage",
};

/** @typedef {{ value: string, label: string }} Fact */
/** @type {Fact[]} */
const FACTS = [
  { value: "2", label: "completed builds" },
  { value: "Up to 3", label: "motorcycles per van" },
  { value: "5 + 5", label: "seats and beds, both vans" },
  { value: "Sprinter · Transit", label: "two chassis to choose from" },
];

/**
 * @typedef {Object} Build
 * @property {string} tag
 * @property {string} name
 * @property {string} subtitle
 * @property {string} blurb
 * @property {{ label: string, value: string }[]} specs
 * @property {string[]} highlights
 * @property {string} href
 * @property {{ src: string, alt: string }} image
 */
/** @type {Build[]} */
const BUILDS = [
  {
    tag: "Build 01 · Mercedes Sprinter",
    name: "Moto Van",
    subtitle: "3-bike Sprinter 170 AWD",
    blurb:
      "An adventure van built for high-utility, off-grid performance. A separate, isolated garage holds three motorcycles and includes a wash station, so bikes get cleaned at the trailhead and stay out of the living space.",
    specs: [
      { label: "Base", value: "Mercedes-Benz Sprinter" },
      { label: "Wheelbase", value: '170"' },
      { label: "Drivetrain", value: "4WD / AWD" },
      { label: "Sits / sleeps", value: "5 / 5" },
      { label: "Motorcycles", value: "Up to 3" },
    ],
    highlights: [
      "Isolated rear garage with wash station and rear wash hose",
      "Lithium battery bank, rooftop solar, DC-DC charger and inverter",
      "40 gal fresh and 20 gal gray water, outdoor shower",
      "Induction cooktop, microwave, 3.3 cu ft fridge",
      "Loft bunk plus VanKea 180° seat-to-bed",
    ],
    href: "/van-layouts/moto-van",
    // TODO: replace placeholder with a real 1:1 photo
    image: {
      src: "/moto-vans/moto-van-2.webp",
      alt: "Big Bear Vans Moto Van with rear garage open and three motorcycles loaded",
    },
  },
  {
    tag: "Build 02 · Ford Transit",
    name: "Moto Van 2",
    subtitle: "The Glen Helen Edition · Transit 148 AWD",
    blurb:
      "A luxury wooden cabin fused with a heavy-duty moto hauler. A motorized bed lifts to open a bike garage underneath, so it is a cozy glamping suite on weekdays and a race rig on weekends.",
    specs: [
      { label: "Base", value: "2025 Ford Transit 350 HR" },
      { label: "Wheelbase", value: '148" Ext' },
      { label: "Drivetrain", value: "AWD, 3.5L EcoBoost" },
      { label: "Sits / sleeps", value: "5 / 5" },
      { label: "Motorcycles", value: "2 to 3" },
    ],
    highlights: [
      "Power-lift bed (2000 × 1400 mm) above the bike garage",
      "Strap-free Peg-to-Peg Bike Binder for dirt and adventure bikes",
      "1200Ah lithium, 200W solar (upgradable to 540W), 2000W inverter",
      '32" wet bath, dry-flush toilet, exterior hot and cold bike wash',
      "Transferable 7-year / 120,000-mile Ford warranty",
    ],
    href: "/van-layouts/moto-van-2-the-glen-helen-edition",
    // TODO: replace placeholder with a real 1:1 photo
    image: {
      src: "/moto-vans/moto-van-1.webp",
      alt: "Moto Van 2 Glen Helen Edition with lift bed raised over the bike garage",
    },
  },
];

/** @type {{ title: string, text: string }[]} */
const WHY = [
  { title: "Real garage", text: "Bikes ride in their own compartment, away from the living space and out of the weather." },
  { title: "Wash on board", text: "Hose off bikes and gear at the trailhead from the van's own water system." },
  { title: "Off-grid power", text: "Lithium, solar and a full water system, so a race weekend does not need a campsite hookup." },
  { title: "Fit to your bikes", text: "Bike count, tie-down method and layout start from what you ride." },
];

/** @type {{ label: string, a: string, b: string }[]} */
const COMPARE_ROWS = [
  { label: "Chassis", a: "Mercedes Sprinter 170, 4WD", b: "Ford Transit 350 HR 148 Ext, AWD" },
  { label: "Garage", a: "Separate rear garage, 3 bikes", b: "Under a power-lift bed, 2 to 3 bikes" },
  { label: "Bike tie-down", a: "Garage tie-downs", b: "Peg-to-Peg strap-free system" },
  { label: "Sleeping", a: "Loft bunk, VanKea seat-to-bed", b: "Lift bed, lounge and sofa" },
  { label: "Water", a: "40 gal fresh, 20 gal gray", b: "80 gal fresh, 20 gal gray" },
  { label: "Bathroom", a: "Outdoor shower", b: '32" wet bath with toilet' },
  { label: "Warranty", a: "Transferable 7-year / 120,000-mile Ford", b: "Transferable 7-year / 120,000-mile Ford" },
];

/** @type {{ title: string, text: string, href?: string }[]} */
const PICK_CARDS = [
  { title: "Pick the Sprinter if", text: "You want a fully separate garage for three bikes, a rear wash station and a loft-bunk layout." },
  { title: "Pick the Transit if", text: "You want a more compact AWD van, a lift-bed garage, a full wet bath and a warm wood-cabin interior." },
  {
    title: "Want something else?",
    text: "Both builds began as a conversation about bikes and crew. Start a custom build and we will design yours.",
    href: "/custom-build",
  },
];

/** @type {{ q: string, a: string }[]} */
const FAQS = [
  {
    q: "What is a moto van?",
    a: "A moto van is a camper van with a dedicated garage for your motorcycles. You carry the bikes, sleep, cook and clean up in one vehicle instead of towing a trailer.",
  },
  {
    q: "How many motorcycles can a moto van carry?",
    a: "Our Sprinter 170 moto van carries up to three motorcycles in its isolated rear garage. Moto Van 2, built on a Ford Transit 148, carries two to three dirt bikes or heavy adventure bikes. Capacity for a custom build depends on the bikes and the layout.",
  },
  {
    q: "Can I clean my bikes at the trailhead?",
    a: "Yes. The Sprinter has an integrated wash station and rear wash hose. Moto Van 2 has an exterior hot and cold wash station for bikes and gear. Both run off on-board fresh water.",
  },
  {
    q: "How many people can a moto van sleep?",
    a: "Both current moto vans seat and sleep five. The Sprinter uses a loft bunk and a VanKea 180° seat-to-bed. Moto Van 2 uses a motorized lift bed over the garage plus a lounge.",
  },
  {
    q: "Should I get a Sprinter or a Ford Transit?",
    a: "The Sprinter 170 gives you the longest wheelbase and a fully separate garage. The Transit 148 is more compact, carries a transferable 7-year / 120,000-mile Ford warranty and uses a lift bed to open up the garage. We will help you pick based on your bikes and crew.",
  },
  {
    q: "Can I choose my own layout?",
    a: "Yes. Every moto van starts as a conversation about your bikes, your crew and your budget. Begin on the Custom Build page and we will walk through the options.",
  },
  {
    q: "How much does a moto van cost, and is one in stock?",
    a: "Pricing depends on the base van, wheelbase, battery and solar system, and garage fit-out. Contact us for current pricing and availability, or check the Vans For Sale page for what is in stock.",
  },
];

// ════════════════════════════════════════════════════════
// SEO
// ════════════════════════════════════════════════════════

export const metadata = {
  title: SEO.title,
  description: SEO.description,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: PAGE_URL,
    siteName: "Big Bear Vans",
    type: "website",
    images: [{ url: `${SITE_URL}${SEO.ogImage}`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [`${SITE_URL}${SEO.ogImage}`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Moto Vans", item: PAGE_URL },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: SEO.title,
      description: SEO.description,
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: BUILDS.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          url: `${SITE_URL}${b.href}`,
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// ════════════════════════════════════════════════════════
// UI HELPERS — theme tokens only: primary / secondary / hover
// ════════════════════════════════════════════════════════

const CONTAINER = "max-w-[1180px] mx-auto px-5";

// Faint topographic contour lines, masked so they fade out at the edges
const contourStyle = (alpha) => ({
  backgroundImage: [
    `repeating-radial-gradient(ellipse at 18% 28%, transparent 0 26px, rgba(251,251,249,${alpha}) 26px 27px)`,
    `repeating-radial-gradient(ellipse at 88% 82%, transparent 0 34px, rgba(237,152,95,${alpha}) 34px 35px)`,
  ].join(","),
  maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 100%)",
});

const BTN_BASE =
  "inline-flex items-center justify-center w-full sm:w-auto rounded-lg font-ui font-bold uppercase tracking-[0.12em] text-xs sm:text-sm py-3 px-7 md:px-8 border-2 transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const BTN = {
  // On navy backgrounds
  accent: `${BTN_BASE} bg-hover border-hover text-primary hover:bg-secondary hover:border-secondary focus-visible:ring-hover focus-visible:ring-offset-primary`,
  ghostLight: `${BTN_BASE} bg-transparent border-secondary/40 text-secondary hover:border-hover hover:text-hover focus-visible:ring-hover focus-visible:ring-offset-primary`,
  // On amber backgrounds
  primary: `${BTN_BASE} bg-primary border-primary text-secondary hover:bg-secondary hover:border-secondary hover:text-primary focus-visible:ring-primary focus-visible:ring-offset-hover`,
  ghostDark: `${BTN_BASE} bg-transparent border-primary text-primary hover:bg-primary hover:text-secondary focus-visible:ring-primary focus-visible:ring-offset-hover`,
};

const FOCUS_LINK = "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hover focus-visible:ring-offset-2";

function Eyebrow({ children, onDark = false }) {
  return (
    <RichParagraph
      variant="sub"
      textColor={onDark ? "text-hover" : "text-primary/80"}
      className=" border-l-2 border-hover pl-3 py-0.5 !opacity-100"
    >
      {children}
    </RichParagraph>
  );
}

function SectionHeading({ id, children, onDark = false, className = "" }) {
  return (
    <Heading1
      as="h2"
      variant="section"
      id={id}
      textColor={onDark ? "text-secondary" : "text-primary"}
      className={` uppercase ${className}`}
    >
      {children}
    </Heading1>
  );
}

// Card-level heading (h3) built on the shared Heading1
function CardHeading({ children, textColor = "text-primary", className = "" }) {
  return (
    <RichParagraph
      variant="card"
    >
      {children}
    </RichParagraph>
  );
}

function Triangle() {
  return (
    <svg aria-hidden="true" viewBox="0 0 8 10" className="w-2 h-2.5 mt-[7px] shrink-0 fill-hover">
      <path d="M0 0 L8 5 L0 10 Z" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════
// PAGE
// ════════════════════════════════════════════════════════

export default function MotoVansPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-secondary text-primary font-ui overflow-x-hidden">
        {/* ── HERO ─────────────────────────────────────── */}
        <header className="relative bg-primary text-secondary overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={contourStyle(0.07)} />

          <div className={`${CONTAINER} relative pt-8 pb-12 md:pt-10 md:pb-16`}>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-secondary/70">
                <li>
                  <Link href="/" className={`hover:text-hover transition-colors ${FOCUS_LINK} focus-visible:ring-offset-primary`}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-secondary font-semibold">
                  Moto Vans
                </li>
              </ol>
            </nav>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <Heading1
                  as="h1"
                  variant="hero"
                  textColor="text-secondary"
                  className=" uppercase"
                >
                  Moto Vans <span className="block text-hover">for Sale</span>
                </Heading1>
                <RichParagraph variant="hero" textColor="text-secondary/80" className="mt-6 max-w-xl">
                  Camper vans with a built-in motorcycle garage, bike wash station and full off-grid living space.
                  Built on Sprinter and Ford Transit chassis in Big Bear, California.
                </RichParagraph>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/custom-build" className={BTN.accent}>
                    Build One Like This
                  </Link>
                  <a href="#builds" className={BTN.ghostLight}>
                    See Our Moto Vans
                  </a>
                </div>
              </div>

              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-navy-mid border border-secondary/10">
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 590px"
                  className="object-cover"
                />
              </div>
            </div>

            <dl className="mt-12 md:mt-16 border-t-2 border-hover grid grid-cols-2 lg:grid-cols-4">
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className={`pt-5 pb-1 pr-4 ${i % 2 === 1 ? "pl-4 border-l border-secondary/10" : ""} ${
                    i > 0 ? "lg:pl-6 lg:border-l lg:border-secondary/10" : ""
                  } ${i > 1 ? "mt-4 lg:mt-0" : ""}`}
                >
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display font-bold uppercase text-2xl sm:text-3xl leading-none text-secondary">
                    {f.value}
                  </dd>
                  <dd className="mt-2 text-xs uppercase tracking-[0.18em] text-secondary/65">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-[3px] bg-hover" />
        </header>

        {/* ── INTRO ────────────────────────────────────── */}
        <section aria-labelledby="what-is" className="py-16 md:py-24">
          <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`}>
            <div className="lg:col-span-5">
              <Eyebrow>Moto vans explained</Eyebrow>
              <SectionHeading id="what-is" className="mt-4">
                What Is a Moto Van?
              </SectionHeading>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <RichParagraph >
                A moto van is a camper van with a dedicated garage for your motorcycles. Instead of towing a trailer,
                you load your bikes inside the van, then sleep, cook and clean up in the same vehicle.
              </RichParagraph>
              <RichParagraph >
                At Big Bear Vans we build moto vans on the Mercedes-Benz Sprinter and the Ford Transit. Depending on
                the build, the garage is either a separate, isolated compartment or a smart bike bay under a
                power-lift bed, so dirt, fuel and chain oil stay away from where you sleep and eat.
              </RichParagraph>
            </div>
          </div>
        </section>

        {/* ── BUILDS ───────────────────────────────────── */}
        <section id="builds" aria-labelledby="builds-heading" className="pb-16 md:pb-24 scroll-mt-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <Eyebrow>Our moto van builds</Eyebrow>
              <SectionHeading id="builds-heading" className="mt-4">
                Two builds, two ways to haul
              </SectionHeading>
              <RichParagraph className="mt-5">
                Every moto van is designed around the bikes you ride. Here are the two we have finished.
              </RichParagraph>
            </div>

            <div className="mt-12 md:mt-16 space-y-16 md:space-y-24">
              {BUILDS.map((build, i) => (
                <article
                  key={build.href}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start"
                >
                  <div
                    className={`relative w-full aspect-square rounded-lg overflow-hidden bg-primary ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={build.image.src}
                      alt={build.image.alt}
                      fill
                      quality={85}
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover"
                    />
                  </div>

                  <div className="lg:pt-2">
                    <Eyebrow>{build.tag}</Eyebrow>
                    <CardHeading className="mt-4 ">{build.name}</CardHeading>
                    <RichParagraph variant="card" textColor="text-primary/75" className="mt-2 font-semibold !opacity-100">
                      {build.subtitle}
                    </RichParagraph>
                    <RichParagraph className="mt-5">
                      {build.blurb}
                    </RichParagraph>

                    <dl className="mt-6 rounded-lg border border-primary/15 bg-white divide-y divide-primary/10">
                      {build.specs.map((s) => (
                        <div key={s.label} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                          <dt className="text-[11px] uppercase tracking-[0.2em] text-primary/65 shrink-0">{s.label}</dt>
                          <dd className="text-sm font-semibold text-primary text-right tabular-nums">{s.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mt-6 space-y-2.5">
                      {build.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <Triangle />
                          <RichParagraph variant="sub">{h}</RichParagraph>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={build.href}
                      className={`mt-7 inline-flex items-center gap-2 font-ui font-bold uppercase tracking-[0.12em] text-sm text-primary border-b-2 border-hover pb-1 hover:text-hover transition-colors ${FOCUS_LINK}`}
                    >
                      Full build details →<span className="sr-only"> for {build.name}</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY (dark band) ─────────────────────────── */}
        <section aria-labelledby="why-heading" className="relative bg-primary text-secondary py-16 md:py-24 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={contourStyle(0.06)} />
          <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[2px] bg-hover" />
          <div className={`${CONTAINER} relative`}>
            <Eyebrow onDark>Why a moto van</Eyebrow>
            <SectionHeading id="why-heading" onDark className="mt-4">
              A garage, not a trailer hitch
            </SectionHeading>

            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-secondary/10 rounded-lg overflow-hidden">
              {WHY.map((w, i) => (
                <li key={w.title} className="bg-primary p-6 md:p-7">
                  <span aria-hidden="true" className="font-display font-bold text-sm text-secondary/40">
                    0{i + 1}
                  </span>
                  <RichParagraph className="mt-3 !text-hover font-bold">{w.title}</RichParagraph>
                  <RichParagraph variant="card" textColor="text-secondary/80" className="mt-3 !opacity-100">
                    {w.text}
                  </RichParagraph>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── COMPARE ─────────────────────────────────── */}
        <section id="compare" aria-labelledby="compare-heading" className="py-16 md:py-24 scroll-mt-20">
          <div className={CONTAINER}>
            <Eyebrow>Compare</Eyebrow>
            <SectionHeading id="compare-heading" className="mt-4">
              Sprinter or Transit?
            </SectionHeading>

            <div className="mt-10 overflow-x-auto rounded-lg border border-primary/15 bg-white">
              <table className="w-full min-w-[560px] text-left text-sm sm:text-[15px]">
                <caption className="sr-only">Moto Van and Moto Van 2 compared</caption>
                <thead className="bg-primary text-secondary">
                  <tr>
                    <td className="px-4 py-3.5 w-[22%]" />
                    <th scope="col" className="px-4 py-3.5 font-display font-bold uppercase text-lg tracking-wide">
                      Moto Van
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-display font-bold uppercase text-lg tracking-wide">
                      Moto Van 2
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {COMPARE_ROWS.map((r) => (
                    <tr key={r.label} className="even:bg-secondary">
                      <th scope="row" className="px-4 py-3.5 align-top text-[11px] uppercase tracking-[0.2em] font-semibold text-primary/70">
                        {r.label}
                      </th>
                      <td className="px-4 py-3.5 align-top text-primary/90">{r.a}</td>
                      <td className="px-4 py-3.5 align-top text-primary/90">{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {PICK_CARDS.map((c) => (
                <div key={c.title} className="bbv-card relative p-6 overflow-hidden">
                  <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[2px] bg-hover" />
                  <CardHeading>{c.title}</CardHeading>
                  <RichParagraph variant="card" textColor="text-primary/80" className="mt-3 !opacity-100">
                    {c.text}
                  </RichParagraph>
                  {c.href && (
                    <Link
                      href={c.href}
                      className={`mt-4 inline-block font-bold uppercase tracking-[0.12em] text-xs text-primary border-b-2 border-hover pb-0.5 hover:text-hover transition-colors ${FOCUS_LINK}`}
                    >
                      Start a custom build →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────── */}
        <section id="faq" aria-labelledby="faq-heading" className="pb-16 md:pb-24 scroll-mt-20">
          <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`}>
            <div className="lg:col-span-4">
              <Eyebrow>FAQ</Eyebrow>
              <SectionHeading id="faq-heading" className="mt-4">
                Moto van FAQs
              </SectionHeading>
            </div>
            <div className="lg:col-span-8 border-t border-primary/15">
              {FAQS.map((f, i) => (
                <details key={f.q} open={i === 0} className="group border-b border-primary/15">
                  <summary
                    className={`flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-ui font-semibold text-base sm:text-lg text-primary hover:text-hover transition-colors ${FOCUS_LINK}`}
                  >
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="relative w-4 h-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none group-open:rotate-45"
                    >
                      <span className="absolute top-1/2 left-0 w-4 h-[2px] -translate-y-1/2 bg-hover" />
                      <span className="absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2 bg-hover" />
                    </span>
                  </summary>
                  <RichParagraph variant="card" textColor="text-primary/80" className="pb-6 pr-10 !opacity-100">
                    {f.a}
                  </RichParagraph>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA (accent band) ─────────────────── */}
        <section aria-labelledby="cta-heading" className="bg-hover text-primary py-14 md:py-20">
          <div className={`${CONTAINER} flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8`}>
            <div className="max-w-2xl">
              <SectionHeading id="cta-heading" className="!font-extrabold">
                Ready for your own moto van?
              </SectionHeading>
              <RichParagraph textColor="text-primary/85" className="mt-4">
                Tell us your bikes, your crew size and how far off-grid you ride. We will design the layout around
                them.
              </RichParagraph>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/custom-build" className={BTN.primary}>
                Start a custom build
              </Link>
              <Link href="/camper-vans-for-sale" className={BTN.ghostDark}>
                Vans in stock
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
