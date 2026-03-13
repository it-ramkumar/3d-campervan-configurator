import React, { useState } from 'react';
import {
  ChevronDown,
  MapPin,
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Helmet } from 'react-helmet-async';
// FAQ Schema Generator
const generateFAQSchema = (faqData) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.flatMap(category =>
    category.questions.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  )
});

// Organization Schema
const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Big Bear Vans",
  "description": "Custom campervan builds and conversions in Big Bear Lake, California. Expert van life solutions with premium craftsmanship.",
  "url": "https://bigbearvans.com",
"telephone": "+1-951-441-9719", // Add actual phone
  "email": "visit.bigbearvans@gmail.com", // Add actual email
"address": {
        "@type": "PostalAddress",
        "streetAddress": "320 W Big Bear Blvd, Big Bear, CA 92314, United States",
        "addressLocality": "Big Bear City",
        "addressRegion": "CA",
        "postalCode": "92314",
        "addressCountry": "US"
      },
  "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.260751,
        "longitude": -116.8497999
      },
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 10:00-16:00"
  ],
  "priceRange": "$$$",
  "serviceArea": {
    "@type": "Place",
    "name": "Southern California"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Van Conversion Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Van Conversion",
          "description": "Complete custom campervan builds"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Van Component Installation",
          "description": "Installation of van components and accessories"
        }
      }
    ]
  }
});

// Breadcrumb Schema
const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bigbearvans.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "FAQs",
      "item": "https://bigbearvans.com/faq"
    }
  ]
});
const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      category: "About Big Bear Vans",
      questions: [
        { q: "Where is Big Bear Vans located? What are your working hours?", a: "The exact location of Big Bear Vans is 320 W Big Bear Blvd, Big Bear City, CA 92314, USA. We’re available Mon-Fri from 9 AM to 6 PM and on Saturday from 10 AM to 4 PM." },
        { q: "What models of vans do you work on?", a: "At Big Bear Vans, we primarily customize Mercedes-Benz Sprinters, RAM ProMasters, and Ford Transits." },
        { q: "What makes you different?", a: "Unlike other companies, we are true custom builders. We don’t hand over general templates or fixed layouts; instead, our campervans are built exactly according to our clients’ choice. Whether your campervan inspiration is from a Pinterest picture or an Instagram reel, we turn every wild idea into a reality." },
        { q: "Can you install van components for me?", a: "Yes, at Big Bear Vans, we also install various van components, including swivel seats, aluminum bathrooms, custom cabinets, etc, for you." },
        { q: "Do you offer financing options?", a: "Yes, financing is available for already-built vans through partners like Trident funding (RV loans) or ADU loans (using real estate). Many clients also finance a new Sprinter van through Mercedes and pay cash for the conversion. Alternatively, our partner dealership can provide full financing for both a new van and a custom build in a single auto loan." },
        { q: "How many people can sleep in a campervan?", a: "It depends on the layout you choose for your van. Campervans with our signature Santa Monica layout can accommodate up to 4-6 people." },
        { q: "Can I book a tour to see your models or a current build in person?", a: "Absolutely, you can book a tour to our spacious showroom in Big Bear. In our showroom, you can see our ready-to-go campervans, ongoing projects, and the whole process through which we bring your dream van to life." },
        { q: "Do you offer builds that fit more than two people?", a: "Yes, most of our custom builds accommodate more than two people. Our custom vans, like Blue Whale and Santa Monica black, can accommodate sitting and sleeping for six and five people, respectively." },
        { q: "How does the payment process work?", a: "When you come on board with us, we take a 50% advance to start the building process. After building the large parts of the campervan, we take 12% more and then charge the rest after completing the campervan." },
        { q: "What kind of after-sales support do you provide?", a: "At Big Bear Vans, our relationship doesn't end at delivery. We provide a 1-year or 3-year extended warranty on the craftsmanship of our campervans. We also offer servicing, installing upgrades in our workshop, and can assist with troubleshooting." },
        { q: "How can I contact Big Bear Vans?", a: "You can contact us by scheduling a free consultation call. Or you can email us, and we’ll get back to you. Moreover, you can also visit our showroom in Big Bear." }
      ]
    },
    {
      category: "About Campervan Customization",
      questions: [
        { q: "What is the first step in starting a custom campervan build?", a: "The first step is to schedule a free consultation call with our design team. We'll discuss your vision, budget, timeline, and must-have features to create a plan and quote." },
        { q: "Do I need to provide the base vehicle, or can you help source one?", a: "We offer both options! You can provide a van you already own, or we can leverage our industry connections with LA/San Diego dealership partners to help you find the perfect new base vehicle at up to $8000 off." },
        { q: "Can you build a mobile office for me?", a: "Yes. At Big Bear Vans, we’ve built custom campervans for digital nomads, pet owners, families, etc. Our San Diego campervan was for an architect who used to work remotely." },
        { q: "Can I be involved in the design process?", a: "Absolutely! We consider this a collaborative journey. You'll have Zoom calls with our design team, reviewing floor plans, material samples, and 3D renderings." },
        { q: "How long will it take to build my custom van conversion?", a: "The timeline varies significantly based on complexity, but a typical full conversion takes about 4-5 months. This includes the design phase, materials selection, and the physical build-out." },
        { q: "Which features and layouts can you customize?", a: "Literally everything! This includes the floor plan, electrical systems (solar, lithium batteries), plumbing (sink, shower, toilet), heating/cooling, cabinetry, and upholstery." },
        { q: "Will I be warm enough in your campervan during winter?", a: "Yes, all of our campervans are fully insulated. We also install a glycol combined water and air heater, directly hooked to the fuel." },
        { q: "Will I be cool enough in your campervan during the summer?", a: "Yes! All of our campervans are fully insulated and have a robust electrical system. We install a 12V AC that runs for up to 20 hours, a roof fan, solar panels, and lithium batteries." }
      ]
    },
    {
      category: "About Campervans for Sale",
      questions: [
        { q: "Do you have campervans available for immediate purchase?", a: "We often have a rotating inventory of ready-to-go vans available for quick sale. Check our 'vans for sale' page for the latest available campervan." },
        { q: "What is included in your standard 'ready-to-go' campervan package?", a: "Our ready-to-go vans are fully self-contained and typically include a sleeping area, a kitchenette with sink and fridge, a fully-functional bathroom, and a lithium electrical system." },
        { q: "Can I make minor changes to a pre-built campervan?", a: "Yes! If the van is still in the final stages, you can request changes. After completion, we can add accessories like extra seats or lap belts for an additional fee." },
        { q: "Do you offer delivery, and can I purchase a van remotely?", a: "Yes, we can deliver to your doorstep. We deliver in Southern California for free and can also organize shipments to all states." },
        { q: "What is the warranty on a pre-built campervan?", a: "Our pre-built vans come with a one-year warranty on our workmanship. The base vehicle's factory warranty also applies." }
      ]
    },
    {
      category: "General Questions about Campervans",
      questions: [
        { q: "What is a Class B RV?", a: "A Class B RV, often called a camper van, is a motorhome built within a van chassis. It includes essential amenities like a sleeping area, kitchenette, and sometimes a wet bath." },
        { q: "How does a toilet work in a camper van?", a: "Toilets function by flushing waste into a holding tank or a sealed bag. The waste must then be manually removed and emptied at a dump station." },
        { q: "How often do you need to empty a campervan toilet?", a: "Typically every 2-4 days for a couple using a cassette toilet. Dry-flush electric toilets depend on cartridge capacity (usually 15-17 flushes)." },
        { q: "Is buying a campervan worth it?", a: "A campervan is worth it if you highly value spontaneous travel and the freedom to explore. For outdoor lovers, the benefits easily outweigh the costs." }
      ]
    }
  ];

  const toggleFAQ = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };
 // SEO Data
  const pageTitle = "Frequently Asked Questions | Big Bear Vans";
  const pageDescription = "Get answers to all your campervan questions. From custom builds to financing, locations to warranties - everything you need to know about Big Bear Vans.";
  const pageUrl = "https://bigbearvans.com/faq";
  const pageImage = "https://bigbearvans.com/images/w9.webp";

  // Generate schemas
  const faqSchema = generateFAQSchema(faqData);
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema();
  return (
  <>
    <Helmet>
        {/* ✅ 1. Standard SEO Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Big Bear Vans FAQ, campervan questions, van conversion FAQ, custom van builds, van life questions, RV conversion FAQ" />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Geographic targeting */}
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Big Bear City" />
        <meta name="geo.position" content="34.2439;-116.9114" />

        {/* ✅ 2. Enhanced Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Big Bear Vans" />
        <meta property="og:locale" content="en_US" />

        {/* Business specific */}
        <meta property="business:contact_data:street_address" content="320 W Big Bear Blvd" />
        <meta property="business:contact_data:locality" content="Big Bear City" />
        <meta property="business:contact_data:region" content="CA" />
        <meta property="business:contact_data:postal_code" content="92314" />
        <meta property="business:contact_data:country_name" content="USA" />

        {/* ✅ 3. Enhanced Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@BigBearVans" />
        <meta name="twitter:creator" content="@BigBearVans" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <meta name="twitter:image:alt" content="Big Bear Vans FAQ - Custom Campervan Builds" />

        {/* ✅ 4. Additional Meta Tags */}
        <meta name="author" content="Big Bear Vans" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="format-detection" content="telephone=no" />

        {/* ✅ 5. Multiple JSON-LD Schemas */}
        <script type="application/ld+json">
          {JSON.stringify([
            faqSchema,
            organizationSchema,
            breadcrumbSchema,
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": pageTitle,
              "description": pageDescription,
              "url": pageUrl,
              "image": pageImage,
              "inLanguage": "en-US",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Big Bear Vans",
                "url": "https://bigbearvans.com"
              },
              "about": {
                "@type": "Organization",
                "name": "Big Bear Vans"
              },
              "mainContentOfPage": {
                "@type": "FAQPage"
              }
            }
          ])}
        </script>
      </Helmet>
    <Navbar />
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HERO SECTION - Full Width */}
      <section className="relative h-[500px] w-full flex items-center justify-center bg-black overflow-hidden">
        <img
          src="/longVans/image1.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Big Bear Van Adventure"
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight">
            FAQ<span className="text-slate-400">s</span>
          </h1>
          <div className="w-32 h-1.5 bg-white mx-auto mb-8"></div>
          <p className="text-white text-xl md:text-2xl font-light opacity-90 tracking-wide">
            Your Comprehensive Guide to Big Bear Vans
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto py-24 px-6">
        {faqData.map((category, catIdx) => (
          <div key={catIdx} className="mb-24">
            <h2 className="text-3xl font-black text-slate-900 mb-12 uppercase tracking-tighter flex items-center gap-4">
              <span className="text-slate-300 text-5xl">0{catIdx + 1}</span>
              {category.category}
            </h2>

            <div className="grid gap-6">
              {category.questions.map((faq, qIdx) => {
                const id = `${catIdx}-${qIdx}`;
                const isOpen = openIndex === id;

                return (
                  <div
                    key={id}
                    className={`transition-all duration-300 border-b border-slate-200 bg-transparent ${isOpen ? 'pb-6' : 'pb-0'
                      }`}
                  >
                    <button
                      onClick={() => toggleFAQ(id)}
                      className="w-full flex items-start justify-between py-6 text-left group"
                    >
                      <span className={`text-xl font-bold transition-colors pr-8 ${isOpen ? 'text-black' : 'text-slate-600 group-hover:text-black'
                        }`}>
                        {faq.q}
                      </span>
                      <div className={`shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180 text-black' : 'text-slate-400'
                        }`}>
                        <ChevronDown size={28} strokeWidth={3} />
                      </div>
                    </button>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                      <div className="text-slate-500 text-lg leading-relaxed font-medium pb-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* MINIMAL FOOTER CONTACT */}
        <div className="mt-32 pt-16 border-t border-slate-200 grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h4 className="font-black text-slate-900 uppercase mb-4 tracking-widest">Address</h4>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
              <MapPin size={18} /> 320 W Big Bear Blvd, CA
            </p>
          </div>
          <div>
            <h4 className="font-black text-slate-900 uppercase mb-4 tracking-widest">Contact</h4>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 mb-2">
              <Phone size={18} /> (Schedule a call)
            </p>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
              <Mail size={18} /> Email us
            </p>
          </div>
          <div>
            <h4 className="font-black text-slate-900 uppercase mb-4 tracking-widest">Hours</h4>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
              <Clock size={18} /> Mon-Sat: Business Hours
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default FAQPage;