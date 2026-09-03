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
import './mobile-power-systems.css';

export const metadata = {
  title: 'Mobile RV, Van & Boat Electrical Systems | Big Bear Vans',
  description: 'Mobile off-grid electrical systems for RVs, camper vans and boats throughout Southern California. LiFePO4 batteries, solar, inverters, Victron charging and preassembled Vankea dinette power systems.',
  alternates: {
    canonical: 'https://www.bigbearvans.com/mobile-power-systems',
  },
};

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

export default function MobilePowerSystemsPage() {
  return (
    <main className="power-page">

      <section className="hero">
        <img
          className="hero-image"
          src="https://www.bigbearvans.com/images2/fn.webp"
          alt="A premium Big Bear Vans camper van in the mountains"
        />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="kicker light"><Zap size={15} fill="currentColor" /> Solar energy • Big battery banks • True autonomy</p>
          <h1>Big battery power.<br />Solar independence.</h1>
          <p className="hero-copy">
            True off-grid autonomy for RVs, camper vans and boats—large LiFePO₄ battery banks, solar energy and intelligent charging engineered for independence on the road.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:bigbearvans@gmail.com?subject=Electrical%20system%20consultation">
              Plan my power system <ArrowRight size={18} />
            </a>
            <a className="button button-ghost" href="#power-system">Explore the dinette system</a>
          </div>
        </div>
        <div className="hero-status">
          <span className="pulse" />
          <div><strong>Mobile service available</strong><small>RVs, vans + boats</small></div>
        </div>
      </section>

      <section className="intro section-shell">
        <div>
          <p className="kicker"><PlugZap size={15} /> Power without compromise</p>
          <h2>Built for how you travel now.</h2>
        </div>
        <div className="intro-copy">
          <p>
            The hum, fumes and upkeep of a generator should not define life off-grid. Big Bear Vans brings years of custom electrical experience to a cleaner generation of power—LiFePO₄ storage, solar charging, high-output inverters and efficient 12V appliances working together as one system.
          </p>
          <div className="mini-proof">
            <span>Quiet</span><i />
            <span>Reliable</span><i />
            <span>Serviceable</span>
          </div>
        </div>
      </section>

      <section className="services section-shell" id="services">
        <div className="section-label"><span>01</span> Electrical services</div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card" key={service.title}>
                <div className="service-icon"><Icon size={24} strokeWidth={1.7} /></div>
                <p className="card-eyebrow">{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="mailto:bigbearvans@gmail.com?subject=Electrical%20service%20request">
                  Request service <ArrowRight size={15} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="system-section" id="power-system">
        <div className="system-photo-wrap">
          <video
            className="system-photo"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Real Big Bear Vans electrical system revealed inside an open Vankea dinette bench"
          >
            <source src="/mobile-power/work/dinette-reveal.m4v" type="video/x-m4v" />
          </video>
          <div className="photo-caption">
            <span>Real Big Bear Vans installation.</span>
            <span>Open the lid.</span>
            <span>See the complete system.</span>
          </div>
        </div>
        <div className="system-content">
          <div className="section-label light-label"><span>02</span> The integrated system</div>
          <p className="kicker light"><BatteryCharging size={15} /> Powered furniture by Vankea</p>
          <h2>Your off-grid power system—already inside the dinette.</h2>
          <p className="system-lead">
            The Vankea two-bench dinette transforms into a 68 × 54-inch bed and provides storage access from the top and side. Inside one bench, Big Bear Vans preassembles a complete electrical system using VanPartsOutlet batteries and inverters with proven Victron charging equipment.
          </p>
          <ul className="system-list">
            {systemIncludes.map((item) => <li key={item}><Check size={16} /> {item}</li>)}
          </ul>
          <div className="system-actions">
            <a className="button button-lime" href="https://vankea.com/products/vankea-product-ford_transit_148wb_sm-bench-passenger-side-ep-3228" target="_blank" rel="noreferrer">
              View the $5,799 dinette <ArrowRight size={18} />
            </a>
            <p>Ships assembled. Power system<br />pre-connected + bench-tested.</p>
          </div>
        </div>
      </section>

      <section className="utility-system section-shell">
        <div className="utility-intro">
          <div>
            <p className="kicker"><BatteryCharging size={15} /> The complete utility core</p>
            <h2>One bench powers the van. The other can carry water and heat.</h2>
          </div>
          <p>Skip months of sourcing, layout conflicts and complex utility work. These coordinated, preassembled systems turn finished Vankea furniture into the technical heart of a serious off-grid build.</p>
        </div>
        <div className="utility-grid">
          <div className="utility-video">
            <img src="/mobile-power/work/vankea-dinette.png" alt="Vankea two-bench dinette configured as a convertible bed platform" />
            <span>The finished Vankea dinette and convertible bed platform</span>
          </div>
          <div className="utility-cards">
            <article>
              <span className="utility-number">01 / Power bench</span>
              <h3>Loaded, wired and ready to connect.</h3>
              <p>Choose 600Ah, 1,200Ah or 1,800Ah of LiFePO₄ storage with a 2,000W or 3,000W Vantrix inverter, Victron MPPT solar controller, Victron DC-DC charging, 12V fuse panel, breakers, disconnects and protection.</p>
            </article>
            <article>
              <span className="utility-number">02 / Water + heating bench</span>
              <h3>Fresh water, cabin heat and instant hot water.</h3>
              <p>The opposite bench can be preassembled with a 30-gallon fresh-water tank, 12V pump and glycol-based diesel or gasoline heater. It warms the cabin and supplies tankless hot water while drawing fuel from the vehicle’s main tank instead of draining the batteries.</p>
            </article>
          </div>
        </div>
        <div className="fast-build">
          <div>
            <p className="card-eyebrow">Complete the fast-build interior</p>
            <h3>Cabinetry, kitchen, shower, power, water and heat—without the full luxury-conversion price.</h3>
          </div>
          <p>Add an assembled and painted Vankea kitchen plus a full-height aluminum VanPartsOutlet shower, offered in three colors and four sizes for Sprinter and Transit vans. The result solves the hardest DIY integration problems and gets the van on the road much sooner.</p>
          <div className="fast-build-links">
            <a href="https://vankea.com/collections/van-cabinets" target="_blank" rel="noreferrer">Explore Vankea cabinetry <ArrowRight size={16} /></a>
            <a href="https://vanpartsoutlet.com/" target="_blank" rel="noreferrer">Explore VanPartsOutlet <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="partnership section-shell">
        <div className="section-label"><span>03</span> One complete solution</div>
        <div className="partnership-heading">
          <h2>Three specialists.<br />One smarter system.</h2>
          <p>No piecing together parts, cabinets and advice from different places. Every partner does what it does best, so the finished system fits, works and lasts.</p>
        </div>
        <div className="partner-row">
          <article>
            <span className="partner-number">01</span>
            <div className="partner-logo"><img src="/mobile-power/brands/big-bear-vans.webp" alt="Big Bear Vans logo" /></div>
            <h3>Big Bear Vans</h3>
            <p>Electrical engineering, system design, pre-wiring, installation and long-term service.</p>
          </article>
          <article>
            <span className="partner-number">02</span>
            <div className="partner-logo"><img src="/mobile-power/brands/vanpartsoutlet.jpg" alt="VanPartsOutlet logo" /></div>
            <h3>VanPartsOutlet</h3>
            <p>Purpose-selected LiFePO₄ batteries, inverters, charging hardware and 12V appliances.</p>
          </article>
          <article>
            <span className="partner-number">03</span>
            <div className="partner-logo"><img src="/mobile-power/brands/vankea.png" alt="Vankea logo" /></div>
            <h3>Vankea</h3>
            <p>Precision-built, space-efficient cabinetry that turns the power system into usable furniture.</p>
          </article>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-label"><span>04</span> Work in the field</div>
        <div className="work-heading">
          <h2>Real systems.<br />Built by our team.</h2>
          <p>Behind every clean control panel is a carefully planned network of storage, charging, distribution and protection. These are working installations from the Big Bear Vans electrical team.</p>
        </div>
        <div className="work-grid">
          <figure className="work-tile work-wide">
            <img src="/mobile-power/work/vankea-dinette.png" alt="Clean Vankea convertible dinette platform for a preassembled power system" />
            <figcaption><span>Integrated dinette platform</span><small>Power + storage ready</small></figcaption>
          </figure>
          <figure className="work-tile work-video">
            <img src="/mobile-power/work/protected-layout.webp" alt="Protected and organized electrical system controls" />
            <figcaption><span>System controls</span><small>Simple at a glance</small></figcaption>
          </figure>
          <figure className="work-tile">
            <img src="/mobile-power/work/lifepo-storage.webp" alt="LiFePO4 battery storage installed beneath seating" />
            <figcaption><span>LiFePO₄ storage</span><small>Space-efficient</small></figcaption>
          </figure>
          <figure className="work-tile">
            <img src="/mobile-power/work/motorhome-retrofit.webp" alt="Upgraded electrical equipment inside a motorhome service bay" />
            <figcaption><span>Motorhome retrofit</span><small>Class A, B + C</small></figcaption>
          </figure>
          <figure className="work-tile work-wide">
            <img src="/mobile-power/work/serviceable-install.webp" alt="Clean and serviceable electrical system installed inside cabinetry" />
            <figcaption><span>Serviceable by design</span><small>Built to be understood</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="conversion-band">
        <div className="conversion-copy">
          <p className="kicker light"><Sun size={15} /> Generator-to-solar conversions</p>
          <h2>From noisy backup power to quiet everyday freedom.</h2>
          <p>We modernize Class A, B and C motorhomes with LiFePO₄ battery storage, solar and intelligent charging—reducing generator runtime while making more of your coach usable off-grid.</p>
          <a className="text-link" href="mailto:bigbearvans@gmail.com?subject=Generator-to-lithium%20conversion">
            Discuss your motorhome <ArrowRight size={17} />
          </a>
        </div>
        <div className="power-diagram" aria-label="Power can be charged from solar panels, alternator or shore power and stored in a lithium battery bank">
          <div className="diagram-source"><Sun size={21} /><span>Solar</span></div>
          <div className="diagram-source"><Zap size={21} /><span>Alternator</span></div>
          <div className="diagram-source"><PlugZap size={21} /><span>Shore power</span></div>
          <div className="diagram-line" />
          <div className="diagram-core"><BatteryCharging size={32} /><strong>LiFePO₄</strong><span>Power bank</span></div>
          <div className="diagram-out"><span>12V</span><span>120V</span><span>Always on</span></div>
        </div>
      </section>

      <section className="mobile-office section-shell" id="mobile-service">
        <div className="section-label"><span>05</span> Mobile office + service area</div>
        <div className="mobile-office-grid">
          <div className="mobile-office-copy">
            <p className="kicker"><MapPin size={15} /> We bring the shop to you</p>
            <h2>From Long Beach to Big Bear—and the roads around them.</h2>
            <p>
              Our additional mobile electrical office is usually based between Long Beach and Big Bear. We serve the communities throughout that corridor and surrounding areas, bringing professional tools, diagnostics and installation support directly to your RV, van, marina or storage location.
            </p>
            <a className="text-link dark-link" href="tel:+19514419748">
              Ask Art if we can come to you <ArrowRight size={17} />
            </a>
          </div>
          <div className="route-card" aria-label="Mobile electrical service from Long Beach to Big Bear and surrounding areas">
            <div className="route-line" />
            <div className="route-stop route-start"><i /><strong>Long Beach</strong><span>Marinas + coastal service</span></div>
            <div className="route-stop route-middle"><i /><strong>Inland corridor</strong><span>Homes, shops + storage</span></div>
            <div className="route-stop route-end"><i /><strong>Big Bear</strong><span>Mountain + regional service</span></div>
            <div className="city-list" aria-label="Cities in our mobile service area">
              <span>Los Angeles</span><span>Newport Beach</span><span>Huntington Beach</span><span>Irvine</span><span>Anaheim</span><span>San Bernardino</span><span>Redlands</span>
            </div>
            <p>Nearby area? Call us. Travel and trip charges are confirmed by location before the visit.</p>
          </div>
        </div>
      </section>

      <section className="pricing section-shell" id="pricing">
        <div className="section-label light-label"><span>06</span> Clear starting prices</div>
        <div className="pricing-heading">
          <div>
            <p className="kicker light"><PlugZap size={15} /> Start with the right scope</p>
            <h2>Know the starting point before we arrive.</h2>
          </div>
          <p>Every system is designed around the vehicle or vessel, available space, current equipment and the loads you want to run. These starting prices make it easier to plan the first conversation.</p>
        </div>
        <div className="service-pricing-grid">
          {servicePricing.map(([price, title, text]) => (
            <article key={title}>
              <strong>{price}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="package-intro">
          <div>
            <p className="card-eyebrow">Preassembled dinette power systems</p>
            <h3>Choose how much quiet power travels with you.</h3>
          </div>
          <p>Every package is engineered, pre-connected and bench-tested by Big Bear Vans. The linked Vankea two-bench cabinetry set is currently $5,799 and is added to the selected electrical package.</p>
        </div>
        <div className="power-package-grid">
          {powerPackages.map((pkg) => (
            <article key={pkg.capacity}>
              <p className="card-eyebrow">LiFePO₄ capacity</p>
              <h3>{pkg.capacity}</h3>
              <strong className="package-price">{pkg.price}</strong>
              <span className="package-label">Preassembled electrical system</span>
              <ul>
                <li><Check size={15} /> {pkg.batteries}</li>
                <li><Check size={15} /> {pkg.inverter}</li>
                <li><Check size={15} /> {pkg.storage}</li>
                <li><Check size={15} /> Victron MPPT + DC-DC charging</li>
                <li><Check size={15} /> 12V fuse panel, breakers + protection</li>
              </ul>
              <div className="combined-price"><span>With $5,799 dinette</span><strong>{pkg.combined}</strong></div>
            </article>
          ))}
        </div>
        <p className="pricing-note">Power-package and combined prices exclude shipping, taxes and final installation in the vehicle. Final scope and availability are confirmed in a written proposal. The 1,800Ah system uses the full electrical bench, leaving no storage in that bench.</p>
      </section>

      <section className="case-study section-shell" id="solar-castle">
        <div className="case-image-wrap">
          <img src="/mobile-power/work/motorhome-retrofit-clean.jpg" alt="Clean Class A motorhome service bay with upgraded electrical equipment" />
          <div className="case-badge"><Sun size={18} /><span>Real Big Bear Vans project</span></div>
        </div>
        <div className="case-copy">
          <div className="section-label"><span>07</span> Featured Class A conversion</div>
          <p className="kicker"><BatteryCharging size={15} /> The Wandering Solar Castle</p>
          <h2>A motorhome rebuilt for life beyond the generator.</h2>
          <p>
            This 2014 Tiffin Allegro Breeze 32 became a fully off-grid family motorhome. The original generator space under the front hood was repurposed for a high-capacity lithium power system—proof that a careful retrofit can transform how a Class A travels and lives.
          </p>
          <div className="case-specs">
            <div><strong>20</strong><span>roof-mounted solar panels</span></div>
            <div><strong>2,550W</strong><span>total solar array</span></div>
            <div><strong>50kWh</strong><span>lithium battery bank</span></div>
            <div><strong>10kW</strong><span>pure sine inverter power</span></div>
          </div>
          <a className="text-link dark-link" href="mailto:bigbearvans@gmail.com?subject=Class%20A%20off-grid%20conversion">
            Plan a Class A conversion <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section className="process section-shell" id="process">
        <div className="process-heading">
          <div className="section-label"><span>08</span> Built by professionals</div>
          <h2>A better system starts with a better process.</h2>
        </div>
        <div className="process-list">
          {process.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-glow" />
        <p className="kicker light"><MapPin size={15} /> Mobile service • Long Beach to Big Bear</p>
        <h2>Ready for power<br />that travels better?</h2>
        <p>Tell us what you drive, sail and want to power. We’ll help you choose the right next step.</p>
        <div className="hero-actions final-actions">
          <a className="button button-lime" href="mailto:bigbearvans@gmail.com?subject=Off-grid%20electrical%20consultation">
            Start a conversation <ArrowRight size={18} />
          </a>
          <a className="phone-link" href="tel:+19514419748">Art: +1 (951) 441-9748</a>
        </div>
      </section>

    </main>
  );
}
