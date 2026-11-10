import {
  ArrowRight,
  BatteryCharging,
  Check,
  MapPin,
  PlugZap,
  ShipWheel,
  Sun,
  Van,
  Wrench,
  Zap,
} from 'lucide-react';
import {
  CustomLink,
  Heading1,
  ImageWithSkeleton,
  PrimaryButton,
  RichParagraph,
  SecondaryButton,
} from '@/components/Common/Common';

export const metadata = {
  title: 'Mobile RV, Van & Boat Electrical Systems | Big Bear Vans',
  description: 'Mobile off-grid electrical systems for RVs, camper vans and boats throughout Southern California. LiFePO4 batteries, solar, inverters, Victron charging and preassembled Vankea dinette power systems.',
  alternates: {
    canonical: 'https://www.bigbearvans.com/mobile-power-systems',
  },
};

const PHONE_HREF = 'tel:+19514419748';
const mailto = (subject) => `mailto:bigbearvans@gmail.com?subject=${encodeURIComponent(subject)}`;

const services = [
  {
    icon: Van,
    eyebrow: 'Vans + motorhomes',
    title: 'RV electrical upgrades',
    text: 'Custom systems for camper vans and Class A, B and C motorhomes—from targeted improvements to complete generator-to-lithium conversions.',
  },
  {
    icon: ShipWheel,
    eyebrow: 'At your dock or driveway',
    title: 'Mobile boat service',
    text: 'Marine-ready 12V troubleshooting, battery and inverter upgrades, solar integration and clean, serviceable electrical installations.',
  },
  {
    icon: Wrench,
    eyebrow: 'Built around your use',
    title: 'Design + installation',
    text: 'We calculate real loads, plan charging sources, protect every circuit and install a system that is intuitive to operate and easy to service.',
  },
];

const systemIncludes = [
  'LiFePO₄ battery bank',
  'Pure sine wave inverter/charger',
  'Solar charge controller',
  'DC-DC alternator charging',
  '12V + 120V distribution',
  'Fuses, disconnects and protection',
];

const process = [
  ['01', 'Assess', 'We review your vehicle or boat, the equipment you want to run and how you actually travel.'],
  ['02', 'Engineer', 'We size storage, charging and distribution as one balanced, protected system.'],
  ['03', 'Build', 'Our electricians pre-wire and bench-test the system, then complete a precise installation.'],
  ['04', 'Hand over', 'You get a clean walkthrough, clear controls and support from the team that built it.'],
];

const servicePricing = [
  ['Free', 'Phone consultation', 'A focused 15–20 minute call with Art to understand your project and the right next step.'],
  ['$295', 'On-site power assessment', 'A hands-on review of your RV, van or boat. Credited toward qualifying projects over $5,000.'],
  ['$190/hr', 'Mobile electrical labor', 'Professional diagnostics, corrections and installation with a two-hour minimum appointment.'],
  ['From $380', 'Troubleshooting', 'Electrical diagnostics for batteries, charging, inverters, solar and distribution.'],
];

const powerPackages = [
  {
    capacity: '600Ah',
    price: '$12,500',
    combined: '$18,299',
    batteries: 'One 600Ah Vantrix LiFePO₄ battery',
    storage: 'Most remaining power-bench storage',
    inverter: '2,000W or 3,000W Vantrix inverter',
  },
  {
    capacity: '1,200Ah',
    price: '$16,500',
    combined: '$22,299',
    batteries: 'Two 600Ah Vantrix LiFePO₄ batteries',
    storage: 'Some remaining power-bench storage',
    inverter: '2,000W or 3,000W Vantrix inverter',
  },
  {
    capacity: '1,800Ah',
    price: '$20,500',
    combined: '$26,299',
    batteries: 'Three 600Ah Vantrix LiFePO₄ batteries',
    storage: 'Power bench dedicated to the electrical system',
    inverter: '3,000W Vantrix inverter',
  },
];

const partners = [
  { name: 'Big Bear Vans', logo: '/mobile-power/brands/big-bear-vans.webp', text: 'Electrical engineering, system design, pre-wiring, installation and long-term service.' },
  { name: 'VanPartsOutlet', logo: '/mobile-power/brands/vanpartsoutlet.jpg', text: 'Purpose-selected LiFePO₄ batteries, inverters, charging hardware and 12V appliances.' },
  { name: 'Vankea', logo: '/mobile-power/brands/vankea.png', text: 'Precision-built, space-efficient cabinetry that turns the power system into usable furniture.' },
];

const workTiles = [
  { src: '/mobile-power/work/vankea-dinette.png', alt: 'Clean Vankea convertible dinette platform for a preassembled power system', title: 'Integrated dinette platform', tag: 'Power + storage ready', span: 'sm:col-span-2' },
  { src: '/mobile-power/work/protected-layout.webp', alt: 'Protected and organized electrical system controls', title: 'System controls', tag: 'Simple at a glance' },
  { src: '/mobile-power/work/lifepo-storage.webp', alt: 'LiFePO4 battery storage installed beneath seating', title: 'LiFePO₄ storage', tag: 'Space-efficient' },
  { src: '/mobile-power/work/motorhome-retrofit.webp', alt: 'Upgraded electrical equipment inside a motorhome service bay', title: 'Motorhome retrofit', tag: 'Class A, B + C', span: 'sm:col-span-2 lg:col-span-1' },
  { src: '/mobile-power/work/serviceable-install.webp', alt: 'Clean and serviceable electrical system installed inside cabinetry', title: 'Serviceable by design', tag: 'Built to be understood', span: 'sm:col-span-2 lg:col-span-3' },
];

const caseSpecs = [
  ['20', 'roof-mounted solar panels'],
  ['2,550W', 'total solar array'],
  ['50kWh', 'lithium battery bank'],
  ['10kW', 'pure sine inverter power'],
];

const cities = ['Los Angeles', 'Newport Beach', 'Huntington Beach', 'Irvine', 'Anaheim', 'San Bernardino', 'Redlands'];

const routeStops = [
  ['Long Beach', 'Marinas + coastal service'],
  ['Inland corridor', 'Homes, shops + storage'],
  ['Big Bear', 'Mountain + regional service'],
];

// Amber eyebrow above section headings (same pattern as the homepage sections)
function Kicker({ icon: Icon, children, className = '' }) {
  return (
    <RichParagraph
      variant="sub"
      textColor="!text-hover"
      className={`uppercase font-bold tracking-[0.16em] flex items-center gap-2 mb-3 ${className}`}
    >
      {Icon && <Icon size={14} />} {children}
    </RichParagraph>
  );
}

// Numbered section label with a divider line underneath
function SectionLabel({ num, children, dark = false }) {
  return (
    <div className={`flex items-center gap-3 pb-4 mb-10 border-b ${dark ? 'border-secondary/15' : 'border-primary/10'}`}>
      <span className="bbv-divider" />
      <RichParagraph
        variant="sub"
        textColor={dark ? 'text-secondary/60' : 'text-primary/60'}
        className="uppercase font-bold tracking-[0.16em]"
      >
        <span className="text-hover mr-2">{num}</span>{children}
      </RichParagraph>
    </div>
  );
}

// Amber underline text link (mailto / tel / in-page)
function ArrowLink({ href, children, dark = false, isExternal = false }) {
  return (
    <CustomLink
      href={href}
      isExternal={isExternal}
      className={`inline-flex items-center gap-2 tracking-[0.12em] pb-1.5 border-b-2 border-hover hover:text-hover ${dark ? 'text-secondary' : 'text-primary'}`}
    >
      {children} <ArrowRight size={15} />
    </CustomLink>
  );
}

export default function MobilePowerSystemsPage() {
  return (
    <div className="bg-white text-primary overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[640px] h-[calc(100svh-65px)] flex items-end overflow-hidden bg-primary">
        <ImageWithSkeleton
          src="/images2/fn.webp"
          alt="A premium Big Bear Vans camper van in the mountains"
          wrapperClassName="!absolute inset-0 h-full !bg-primary"
          className="h-full"
          priority
          skeleton={false}
          overlay={false}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10 pb-16 md:pb-24">
          <Kicker icon={Zap}>Solar energy • Big battery banks • True autonomy</Kicker>
          <Heading1 as="h1" variant="hero" textColor="text-secondary" className="max-w-4xl">
            Big battery power. <span className="text-hover">Solar independence.</span>
          </Heading1>
          <div className="w-12 h-[3px] bg-hover rounded-full my-5" />
          <RichParagraph variant="hero" textColor="text-secondary/85" className="max-w-2xl">
            True off-grid autonomy for RVs, camper vans and boats—large LiFePO₄ battery banks, solar energy and intelligent charging engineered for independence on the road.
          </RichParagraph>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <PrimaryButton
              label="Plan my power system"
              ariaLabel="Plan my power system"
              link={mailto('Electrical system consultation')}
              className="bg-secondary !text-primary border-secondary w-full sm:w-auto"
            />
            <SecondaryButton
              label="Explore the dinette system"
              ariaLabel="Explore the dinette system"
              link="#power-system"
              className="!bg-hover !text-secondary !border-hover hover:!bg-white hover:!text-primary w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="hidden lg:flex absolute z-10 right-10 bottom-16 items-center gap-3 px-5 py-4 rounded-lg bbv-glass-light">
          <span className="w-2.5 h-2.5 rounded-full bg-hover shadow-[0_0_0_5px_rgba(237,152,95,0.2)]" />
          <div>
            <RichParagraph variant="sub" textColor="text-secondary" className="font-bold">Mobile service available</RichParagraph>
            <RichParagraph variant="sub" textColor="text-secondary/60" className="!text-[10px] uppercase tracking-[0.12em]">RVs, vans + boats</RichParagraph>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-hover z-10" />
      </section>

      {/* ── INTRO ── */}
      <section className="bbv-section-light">
        <div className="bbv-dot-grid-light" />
        <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-20">
          <div>
            <Kicker icon={PlugZap}>Power without compromise</Kicker>
            <Heading1 variant="section" textColor="text-primary">
              Built for how you <span className="text-hover">travel now.</span>
            </Heading1>
          </div>
          <div>
            <RichParagraph variant="body" className="leading-relaxed">
              The hum, fumes and upkeep of a generator should not define life off-grid. Big Bear Vans brings years of custom electrical experience to a cleaner generation of power—LiFePO₄ storage, solar charging, high-output inverters and efficient 12V appliances working together as one system.
            </RichParagraph>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {['Quiet', 'Reliable', 'Serviceable'].map((word, i) => (
                <span key={word} className="flex items-center gap-4">
                  {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-hover" />}
                  <RichParagraph variant="sub" textColor="text-primary" className="uppercase font-bold tracking-[0.16em]">{word}</RichParagraph>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 SERVICES ── */}
      <section className="bbv-section-light-alt" id="services">
        <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24">
          <SectionLabel num="01">Electrical services</SectionLabel>
          <div className="grid md:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="group bbv-card relative overflow-hidden p-7 md:p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <span className="w-12 h-12 rounded-lg bg-hover/15 text-hover flex items-center justify-center mb-10 group-hover:bg-hover group-hover:text-secondary transition-all">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <RichParagraph variant="sub" textColor="text-primary/50" className="uppercase font-bold tracking-[0.14em] mb-2">{service.eyebrow}</RichParagraph>
                  <Heading1 as="h3" variant="card" textColor="text-primary" className="mb-3">{service.title}</Heading1>
                  <RichParagraph variant="card" className="mb-8">{service.text}</RichParagraph>
                  <div className="mt-auto">
                    <ArrowLink href={mailto('Electrical service request')}>Request service</ArrowLink>
                  </div>
                  <div className="bbv-amber-line scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 02 INTEGRATED SYSTEM ── */}
      <section className="bbv-section-navy grid lg:grid-cols-2" id="power-system">
        <div className="relative min-h-[400px] lg:min-h-[720px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Real Big Bear Vans electrical system revealed inside an open Vankea dinette bench"
          >
            <source src="/mobile-power/work/dinette-reveal.m4v" type="video/x-m4v" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute left-6 md:left-10 bottom-8 md:bottom-12 z-10 flex flex-col gap-1.5">
            {['Real Big Bear Vans installation.', 'Open the lid.', 'See the complete system.'].map((line) => (
              <RichParagraph key={line} variant="sub" textColor="text-secondary" className="uppercase font-bold tracking-[0.12em]">{line}</RichParagraph>
            ))}
          </div>
        </div>
        <div className="px-6 md:px-12 xl:px-20 py-16 lg:py-20 flex flex-col justify-center">
          <SectionLabel num="02" dark>The integrated system</SectionLabel>
          <Kicker icon={BatteryCharging}>Powered furniture by Vankea</Kicker>
          <Heading1 variant="section" textColor="text-secondary">
            Your off-grid power system—<span className="text-hover">already inside the dinette.</span>
          </Heading1>
          <RichParagraph variant="body" textColor="text-secondary/70" className="mt-6 mb-8 max-w-2xl">
            The Vankea two-bench dinette transforms into a 68 × 54-inch bed and provides storage access from the top and side. Inside one bench, Big Bear Vans preassembles a complete electrical system using VanPartsOutlet batteries and inverters with proven Victron charging equipment.
          </RichParagraph>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {systemIncludes.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Check size={16} className="text-hover shrink-0" />
                <RichParagraph variant="card" textColor="text-secondary/85">{item}</RichParagraph>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mt-10">
            <CustomLink
              href="https://vankea.com/products/vankea-product-ford_transit_148wb_sm-bench-passenger-side-ep-3228"
              isExternal
              className="inline-flex items-center justify-center gap-2 tracking-[0.12em] text-sm py-3 px-8 rounded-lg bg-hover text-secondary hover:bg-secondary hover:text-primary"
            >
              View the $5,799 dinette <ArrowRight size={16} />
            </CustomLink>
            <RichParagraph variant="sub" textColor="text-secondary/50" className="uppercase tracking-[0.12em] !text-[11px]">
              Ships assembled. Power system<br />pre-connected + bench-tested.
            </RichParagraph>
          </div>
        </div>
      </section>

      {/* ── UTILITY CORE ── */}
      <section className="bbv-section-light">
        <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-12">
            <div>
              <Kicker icon={BatteryCharging}>The complete utility core</Kicker>
              <Heading1 variant="section" textColor="text-primary">
                One bench powers the van. <span className="text-hover">The other can carry water and heat.</span>
              </Heading1>
            </div>
            <RichParagraph variant="body">
              Skip months of sourcing, layout conflicts and complex utility work. These coordinated, preassembled systems turn finished Vankea furniture into the technical heart of a serious off-grid build.
            </RichParagraph>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="relative min-h-[380px] lg:min-h-[600px] rounded-lg overflow-hidden ring-1 ring-primary/10 shadow-xl">
              <ImageWithSkeleton
                src="/mobile-power/work/vankea-dinette.png"
                alt="Vankea two-bench dinette configured as a convertible bed platform"
                wrapperClassName="!absolute inset-0 h-full"
                className="h-full"
                overlay={false}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-transparent to-transparent pointer-events-none" />
              <RichParagraph variant="sub" textColor="text-secondary" className="absolute left-6 right-6 bottom-6 uppercase font-bold tracking-[0.12em]">
                The finished Vankea dinette and convertible bed platform
              </RichParagraph>
              <div className="bbv-amber-line" />
            </div>
            <div className="grid gap-5">
              {[
                ['01 / Power bench', 'Loaded, wired and ready to connect.', 'Choose 600Ah, 1,200Ah or 1,800Ah of LiFePO₄ storage with a 2,000W or 3,000W Vantrix inverter, Victron MPPT solar controller, Victron DC-DC charging, 12V fuse panel, breakers, disconnects and protection.'],
                ['02 / Water + heating bench', 'Fresh water, cabin heat and instant hot water.', 'The opposite bench can be preassembled with a 30-gallon fresh-water tank, 12V pump and glycol-based diesel or gasoline heater. It warms the cabin and supplies tankless hot water while drawing fuel from the vehicle’s main tank instead of draining the batteries.'],
              ].map(([label, title, text]) => (
                <article key={label} className="bbv-card relative overflow-hidden p-7 md:p-10 flex flex-col justify-center">
                  <div className="bbv-amber-line-top" />
                  <RichParagraph variant="sub" textColor="!text-hover" className="uppercase font-bold tracking-[0.14em]">{label}</RichParagraph>
                  <Heading1 as="h3" variant="card" textColor="text-primary" className="mt-4 mb-3">{title}</Heading1>
                  <RichParagraph variant="card">{text}</RichParagraph>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-primary p-7 md:p-12 grid lg:grid-cols-[1.1fr_1fr_auto] gap-8 items-center">
            <div>
              <RichParagraph variant="sub" textColor="!text-hover" className="uppercase font-bold tracking-[0.14em] mb-3">Complete the fast-build interior</RichParagraph>
              <Heading1 as="h3" variant="card" textColor="text-secondary">
                Cabinetry, kitchen, shower, power, water and heat—without the full luxury-conversion price.
              </Heading1>
            </div>
            <RichParagraph variant="card" textColor="text-secondary/70">
              Add an assembled and painted Vankea kitchen plus a full-height aluminum VanPartsOutlet shower, offered in three colors and four sizes for Sprinter and Transit vans. The result solves the hardest DIY integration problems and gets the van on the road much sooner.
            </RichParagraph>
            <div className="flex flex-col items-start gap-4">
              <ArrowLink href="https://vankea.com/collections/van-cabinets" isExternal dark>Explore Vankea cabinetry</ArrowLink>
              <ArrowLink href="https://vanpartsoutlet.com/" isExternal dark>Explore VanPartsOutlet</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 PARTNERSHIP ── */}
      <section className="bbv-section-light-alt">
        <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24">
          <SectionLabel num="03">One complete solution</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-end mb-12">
            <Heading1 variant="section" textColor="text-primary">
              Three specialists. <span className="text-hover">One smarter system.</span>
            </Heading1>
            <RichParagraph variant="body">
              No piecing together parts, cabinets and advice from different places. Every partner does what it does best, so the finished system fits, works and lasts.
            </RichParagraph>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {partners.map((partner, i) => (
              <article key={partner.name} className="bbv-card relative overflow-hidden p-7 flex flex-col min-h-[300px]">
                <div className="bbv-amber-line-top" />
                <RichParagraph variant="sub" textColor="text-primary/40" className="font-bold tracking-[0.14em]">{String(i + 1).padStart(2, '0')}</RichParagraph>
                <div className="h-24 mt-5 mb-8 px-4 rounded-lg bg-primary/[0.03] border border-primary/[0.08] flex items-center">
                  <ImageWithSkeleton
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    wrapperClassName="h-16 w-40 !bg-transparent"
                    className="h-full !object-contain !object-left"
                    overlay={false}
                    skeleton={false}
                    sizes="160px"
                  />
                </div>
                <Heading1 as="h3" variant="card" textColor="text-primary" className="mt-auto mb-2">{partner.name}</Heading1>
                <RichParagraph variant="card">{partner.text}</RichParagraph>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 WORK ── */}
      <section className="bbv-section-light" id="work">
        <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24">
          <SectionLabel num="04">Work in the field</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-end mb-12">
            <Heading1 variant="section" textColor="text-primary">
              Real systems. <span className="text-hover">Built by our team.</span>
            </Heading1>
            <RichParagraph variant="body">
              Behind every clean control panel is a carefully planned network of storage, charging, distribution and protection. These are working installations from the Big Bear Vans electrical team.
            </RichParagraph>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] lg:auto-rows-[320px] gap-4">
            {workTiles.map((tile) => (
              <figure key={tile.title} className={`group relative m-0 rounded-lg overflow-hidden ring-1 ring-primary/10 shadow-lg ${tile.span || ''}`}>
                <ImageWithSkeleton
                  src={tile.src}
                  alt={tile.alt}
                  wrapperClassName="!absolute inset-0 h-full"
                  className="h-full group-hover:scale-[1.03] !transition-transform !duration-500"
                  overlay={false}
                  sizes={tile.span ? '(min-width: 1024px) 75vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent pointer-events-none" />
                <figcaption className="absolute z-10 left-5 right-5 bottom-5 flex items-end justify-between gap-4">
                  <RichParagraph variant="card" textColor="text-secondary" className="font-bold">{tile.title}</RichParagraph>
                  <RichParagraph variant="sub" textColor="!text-hover" className="uppercase font-bold tracking-[0.12em] !text-[10px] text-right">{tile.tag}</RichParagraph>
                </figcaption>
                <div className="bbv-amber-line" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── GENERATOR-TO-SOLAR ── */}
      <section className="bbv-section-light pb-16 md:pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="relative overflow-hidden rounded-lg bg-primary p-7 md:p-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="bbv-amber-line-top" />
            <div>
              <Kicker icon={Sun}>Generator-to-solar conversions</Kicker>
              <Heading1 variant="section" textColor="text-secondary">
                From noisy backup power to <span className="text-hover">quiet everyday freedom.</span>
              </Heading1>
              <RichParagraph variant="body" textColor="text-secondary/70" className="my-7">
                We modernize Class A, B and C motorhomes with LiFePO₄ battery storage, solar and intelligent charging—reducing generator runtime while making more of your coach usable off-grid.
              </RichParagraph>
              <ArrowLink href={mailto('Generator-to-lithium conversion')} dark>Discuss your motorhome</ArrowLink>
            </div>

            <div
              className="relative rounded-lg border border-secondary/15 bg-secondary/[0.03] p-5 md:p-8"
              role="img"
              aria-label="Power can be charged from solar panels, alternator or shore power and stored in a lithium battery bank"
            >
              <div className="grid grid-cols-3 gap-3">
                {[[Sun, 'Solar'], [Zap, 'Alternator'], [PlugZap, 'Shore power']].map(([Icon, label]) => (
                  <div key={label} className="h-20 rounded-lg border border-secondary/15 flex flex-col items-center justify-center gap-2 text-hover">
                    <Icon size={20} />
                    <RichParagraph variant="sub" textColor="text-secondary/70" className="uppercase tracking-[0.12em] !text-[10px]">{label}</RichParagraph>
                  </div>
                ))}
              </div>
              <div className="w-px h-12 bg-hover/60 mx-auto" />
              <div className="w-48 h-36 mx-auto rounded-lg bg-hover text-primary flex flex-col items-center justify-center shadow-xl">
                <BatteryCharging size={30} />
                <Heading1 as="p" variant="card" textColor="text-primary" className="mt-2 !font-bold">LiFePO₄</Heading1>
                <RichParagraph variant="sub" textColor="text-primary" className="uppercase tracking-[0.15em] !text-[10px]">Power bank</RichParagraph>
              </div>
              <div className="flex justify-center gap-6 mt-5">
                {['12V', '120V', 'Always on'].map((out) => (
                  <RichParagraph key={out} variant="sub" textColor="text-secondary/60" className="uppercase tracking-[0.12em] !text-[10px]">{out}</RichParagraph>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 MOBILE OFFICE ── */}
      <section className="bbv-section-light-alt" id="mobile-service">
        <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24">
          <SectionLabel num="05">Mobile office + service area</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <Kicker icon={MapPin}>We bring the shop to you</Kicker>
              <Heading1 variant="section" textColor="text-primary">
                From Long Beach to Big Bear—<span className="text-hover">and the roads around them.</span>
              </Heading1>
              <RichParagraph variant="body" className="my-7">
                Our additional mobile electrical office is usually based between Long Beach and Big Bear. We serve the communities throughout that corridor and surrounding areas, bringing professional tools, diagnostics and installation support directly to your RV, van, marina or storage location.
              </RichParagraph>
              <ArrowLink href={PHONE_HREF}>Ask Art if we can come to you</ArrowLink>
            </div>

            <div className="bbv-card relative overflow-hidden p-7 md:p-10" aria-label="Mobile electrical service from Long Beach to Big Bear and surrounding areas">
              <div className="bbv-amber-line-top" />
              <div className="relative">
              <span className="absolute left-[7px] top-2 bottom-2 w-px bg-hover/40" aria-hidden="true" />
              <ol className="relative space-y-10 pl-9">
                {routeStops.map(([city, note]) => (
                  <li key={city} className="relative">
                    <span className="absolute -left-9 top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-white outline outline-1 outline-hover" />
                    <Heading1 as="p" variant="sub" textColor="text-primary" className="!font-bold">{city}</Heading1>
                    <RichParagraph variant="sub" textColor="text-primary/50" className="uppercase tracking-[0.1em] mt-1">{note}</RichParagraph>
                  </li>
                ))}
              </ol>
              </div>
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-primary/10" aria-label="Cities in our mobile service area">
                {cities.map((city) => (
                  <span key={city} className="px-3 py-1.5 rounded-md bg-primary/[0.05] text-primary/80 text-[10px] font-bold uppercase tracking-[0.09em]">{city}</span>
                ))}
              </div>
              <RichParagraph variant="sub" textColor="text-primary/60" className="mt-6 pt-5 border-t border-primary/10">
                Nearby area? Call us. Travel and trip charges are confirmed by location before the visit.
              </RichParagraph>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 PRICING ── */}
      <section className="bbv-section-navy" id="pricing">
        <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24">
          <SectionLabel num="06" dark>Clear starting prices</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-end mb-12">
            <div>
              <Kicker icon={PlugZap}>Start with the right scope</Kicker>
              <Heading1 variant="section" textColor="text-secondary">
                Know the starting point <span className="text-hover">before we arrive.</span>
              </Heading1>
            </div>
            <RichParagraph variant="body" textColor="text-secondary/65">
              Every system is designed around the vehicle or vessel, available space, current equipment and the loads you want to run. These starting prices make it easier to plan the first conversation.
            </RichParagraph>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicePricing.map(([price, title, text]) => (
              <article key={title} className="bbv-glass-light p-6 flex flex-col min-h-[240px]">
                <Heading1 as="p" variant="card" textColor="!text-hover" className="!text-2xl md:!text-3xl !font-bold">{price}</Heading1>
                <Heading1 as="h3" variant="sub" textColor="text-secondary" className="mt-auto mb-2 !font-semibold">{title}</Heading1>
                <RichParagraph variant="sub" textColor="text-secondary/60">{text}</RichParagraph>
              </article>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-end mt-16 md:mt-20">
            <div>
              <RichParagraph variant="sub" textColor="!text-hover" className="uppercase font-bold tracking-[0.14em] mb-3">Preassembled dinette power systems</RichParagraph>
              <Heading1 as="h3" variant="section" textColor="text-secondary">Choose how much quiet power travels with you.</Heading1>
            </div>
            <RichParagraph variant="card" textColor="text-secondary/65">
              Every package is engineered, pre-connected and bench-tested by Big Bear Vans. The linked Vankea two-bench cabinetry set is currently $5,799 and is added to the selected electrical package.
            </RichParagraph>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 mt-10">
            {powerPackages.map((pkg, i) => (
              <article key={pkg.capacity} className={`relative overflow-hidden rounded-lg p-7 flex flex-col ${i === 1 ? 'bg-secondary text-primary shadow-2xl' : 'bbv-glass-light'}`}>
                {i === 1 && <div className="bbv-amber-line-top !h-[3px]" />}
                <RichParagraph variant="sub" textColor={i === 1 ? '!text-hover' : 'text-secondary/50'} className="uppercase font-bold tracking-[0.14em]">LiFePO₄ capacity</RichParagraph>
                <Heading1 as="h3" variant="hero" textColor={i === 1 ? 'text-primary' : 'text-secondary'} className="!text-5xl mt-2 mb-6">{pkg.capacity}</Heading1>
                <Heading1 as="p" variant="card" textColor="!text-hover" className="!text-3xl !font-bold">{pkg.price}</Heading1>
                <RichParagraph variant="sub" textColor={i === 1 ? 'text-primary/50' : 'text-secondary/45'} className="uppercase tracking-[0.14em] !text-[10px] mt-1">Preassembled electrical system</RichParagraph>
                <ul className="my-7 space-y-3">
                  {[pkg.batteries, pkg.inverter, pkg.storage, 'Victron MPPT + DC-DC charging', '12V fuse panel, breakers + protection'].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={15} className="text-hover shrink-0 mt-0.5" />
                      <RichParagraph variant="sub" textColor={i === 1 ? 'text-primary/80' : 'text-secondary/75'}>{item}</RichParagraph>
                    </li>
                  ))}
                </ul>
                <div className={`mt-auto pt-5 border-t flex items-end justify-between gap-4 ${i === 1 ? 'border-primary/10' : 'border-secondary/15'}`}>
                  <RichParagraph variant="sub" textColor={i === 1 ? 'text-primary/55' : 'text-secondary/55'} className="uppercase tracking-[0.1em] !text-[10px]">With $5,799 dinette</RichParagraph>
                  <Heading1 as="p" variant="card" textColor={i === 1 ? 'text-primary' : 'text-secondary'} className="!font-bold whitespace-nowrap">{pkg.combined}</Heading1>
                </div>
              </article>
            ))}
          </div>
          <RichParagraph variant="sub" textColor="text-secondary/45" className="mt-6 max-w-4xl">
            Power-package and combined prices exclude shipping, taxes and final installation in the vehicle. Final scope and availability are confirmed in a written proposal. The 1,800Ah system uses the full electrical bench, leaving no storage in that bench.
          </RichParagraph>
        </div>
      </section>

      {/* ── 07 CASE STUDY ── */}
      <section className="bbv-section-light" id="solar-castle">
        <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          <div className="relative min-h-[400px] lg:min-h-[620px] rounded-lg overflow-hidden ring-1 ring-primary/10 shadow-xl">
            <ImageWithSkeleton
              src="/mobile-power/work/motorhome-retrofit-clean.jpg"
              alt="Clean Class A motorhome service bay with upgraded electrical equipment"
              wrapperClassName="!absolute inset-0 h-full"
              className="h-full"
              overlay={false}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute z-10 left-5 bottom-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-hover text-secondary">
              <Sun size={16} />
              <RichParagraph variant="sub" textColor="text-secondary" className="uppercase font-bold tracking-[0.12em] !text-[10px]">Real Big Bear Vans project</RichParagraph>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <SectionLabel num="07">Featured Class A conversion</SectionLabel>
            <Kicker icon={BatteryCharging}>The Wandering Solar Castle</Kicker>
            <Heading1 variant="section" textColor="text-primary">
              A motorhome rebuilt for <span className="text-hover">life beyond the generator.</span>
            </Heading1>
            <RichParagraph variant="body" className="my-7">
              This 2014 Tiffin Allegro Breeze 32 became a fully off-grid family motorhome. The original generator space under the front hood was repurposed for a high-capacity lithium power system—proof that a careful retrofit can transform how a Class A travels and lives.
            </RichParagraph>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {caseSpecs.map(([value, label]) => (
                <div key={label} className="bbv-card p-5">
                  <Heading1 as="p" variant="card" textColor="text-primary" className="!text-2xl md:!text-3xl !font-bold">{value}</Heading1>
                  <RichParagraph variant="sub" textColor="text-primary/55" className="uppercase tracking-[0.11em] !text-[10px] mt-1">{label}</RichParagraph>
                </div>
              ))}
            </div>
            <div>
              <ArrowLink href={mailto('Class A off-grid conversion')}>Plan a Class A conversion</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 PROCESS ── */}
      <section className="bbv-section-light-alt" id="process">
        <div className="container mx-auto px-6 max-w-7xl py-16 md:py-24">
          <SectionLabel num="08">Built by professionals</SectionLabel>
          <Heading1 variant="section" textColor="text-primary" className="max-w-3xl mb-12">
            A better system starts with <span className="text-hover">a better process.</span>
          </Heading1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map(([number, title, text]) => (
              <article key={number} className="group bbv-card relative overflow-hidden p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <span className="inline-flex w-11 h-11 rounded-lg bg-primary text-secondary items-center justify-center text-sm font-bold group-hover:bg-hover transition-colors">{number}</span>
                <Heading1 as="h3" variant="card" textColor="text-primary" className="mt-6 mb-2">{title}</Heading1>
                <RichParagraph variant="card">{text}</RichParagraph>
                <div className="bbv-amber-line scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bbv-section-navy overflow-hidden">
        <div className="absolute -right-24 -top-56 w-[540px] h-[540px] rounded-full bg-[radial-gradient(circle,rgba(237,152,95,0.22),transparent_68%)] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl py-20 md:py-28 relative z-10">
          <Kicker icon={MapPin}>Mobile service • Long Beach to Big Bear</Kicker>
          <Heading1 variant="hero" textColor="text-secondary" className="max-w-3xl">
            Ready for power <span className="text-hover">that travels better?</span>
          </Heading1>
          <RichParagraph variant="body" textColor="text-secondary/65" className="max-w-xl my-7">
            Tell us what you drive, sail and want to power. We’ll help you choose the right next step.
          </RichParagraph>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <SecondaryButton
              label="Start a conversation"
              ariaLabel="Start a conversation"
              link={mailto('Off-grid electrical consultation')}
              className="!bg-hover !text-secondary !border-hover hover:!bg-white hover:!text-primary w-full sm:w-auto"
            />
            <CustomLink href={PHONE_HREF} className="text-secondary/75 hover:text-hover tracking-[0.1em] text-center p-3">
              Art: +1 (951) 441-9748
            </CustomLink>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-hover" />
      </section>

    </div>
  );
}
