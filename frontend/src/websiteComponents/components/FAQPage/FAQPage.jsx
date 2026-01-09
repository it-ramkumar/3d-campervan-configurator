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

  return (<>
<Navbar/>
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HERO SECTION - Full Width */}
      <section className="relative h-[500px] w-full flex items-center justify-center bg-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1600"
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
                    className={`transition-all duration-300 border-b border-slate-200 bg-transparent ${
                      isOpen ? 'pb-6' : 'pb-0'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(id)}
                      className="w-full flex items-start justify-between py-6 text-left group"
                    >
                      <span className={`text-xl font-bold transition-colors pr-8 ${
                        isOpen ? 'text-black' : 'text-slate-600 group-hover:text-black'
                      }`}>
                        {faq.q}
                      </span>
                      <div className={`shrink-0 mt-1 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-black' : 'text-slate-400'
                      }`}>
                        <ChevronDown size={28} strokeWidth={3} />
                      </div>
                    </button>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
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
    <Footer/>
    </>
  );
};

export default FAQPage;