import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import FAQs from "../Faqs/Faqs";
import Cansultation from "../Consultation/Consultation";
import HeroSection from "../HeroSection/HeroSection";
import OurProcess from "../HomePage/OurProcess/OurProcess"

const CustomBuild = () => {
  const imgPath = "/custom build/";

  const faqs = [
    {
      question: "Do you work with clients remotely?",
      answer: "Yes. We successfully collaborate with clients across the country via video calls, shared design boards, and regular photo/video updates during the build."
    },
    {
      question: "What if I don’t have a clear design idea yet?",
      answer: "That’s perfectly normal. Our consultation is designed to help clarify your needs. We use your lifestyle, budget, and inspiration photos to create initial concepts."
    },
    {
      question: "Can I see physical samples of materials (countertops, fabrics, wood)?",
      answer: "Yes. We offer sample kits and encourage you to visit our showroom to touch and feel all material options."
    },
    {
      question: "Can you integrate specific appliances or technology I want?",
      answer: "Absolutely. If you have a favorite audio system or any exterior accessory, we can design the van to accommodate it."
    },
    {
      question: "What kind of training do you provide at delivery?",
      answer: "We schedule a thorough walk-through, demonstrating every system (electrical, plumbing, heating, appliances) and provide you with a detailed manual for reference."
    },
    {
      question: "What if something needs repair or service after I take delivery?",
      answer: "A strong warranty backs our workmanship. We can schedule service at our workshop and also provide remote assistance to our clients."
    },
    {
      question: "How do I prepare for our first consultation?",
      answer: "Think about your must-haves, your budget, and how you plan to use the van. Browsing our portfolio and saving inspiration photos is a great start."
    }
  ];

  const heroImage = "/images/s2.webp";
  const newTitleText = "Custom Campervan Builders of Big Bear";
  const newDescriptionText =
    "At Big Bear Vans, we build custom campervans from the ground up. Unlike standard models or limited packages of other companies, we begin with a blank slate and build from the chassis up. You choose the layout, features, and finishes; we handle the design, build, and quality checks.";

  return (
    <>
      <Navbar />
      <div className="w-full bg-white text-black font-sans selection:bg-black selection:text-white">

        <HeroSection title={newTitleText} description={newDescriptionText} image={heroImage} link="/inquiry" buttonText="" showButton={false} />

        {/* ================= INTRO ================= */}
        <section className="py-24 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Our team manages everything in-house, from electrical and plumbing to cabinetry and painting, so your van is truly yours at the end. This is the essence of a Big Bear Vans custom build. Let us tell you more about our process:
              </p>
              <h2 className="text-4xl font-black uppercase tracking-tighter pt-8">
                Big Bear Vans-The Custom Builders
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At Big Bear Vans, “Custom” means every detail of your campervan is decided by you and built by us. Custom isn’t just about selecting some fabric colors or faucet types; it's about co-creating a campervan that is a perfect mirror of your lifestyle and personality.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img src={`/images2/159.webp`} alt="Big Bear Vans Exterior" className="w-full h-90 object-cover" />
            </div>
          </div>
        </section>

        {/* ================= HOW WE DO IT ================= */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-black uppercase mb-12 tracking-widest text-center italic">This is exactly how we do it:</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-xl border border-gray-100">
                <h4 className="font-black uppercase mb-4 text-xl tracking-tighter">Start with an Empty Van</h4>
                <p className="text-gray-500">We begin with an empty van. There are no pre-built parts to work around.</p>
              </div>
              <div className="bg-white p-10 rounded-xl border border-gray-100">
                <h4 className="font-black uppercase mb-4 text-xl tracking-tighter">Zero Restrictions</h4>
                <p className="text-gray-500">Instead of restricting you to a few preset floor plans or feature packages, we listen to your ideas, vision, and create a 3D render for you.</p>
              </div>
              <div className="bg-white p-10 rounded-xl border border-gray-100">
                <h4 className="font-black uppercase mb-4 text-xl tracking-tighter">You Control Every Detail</h4>
                <p className="text-gray-500">You will see your van virtually and select every detail to your liking. From the components of your electrical system to the design for your cabinets, you make all the final choices.</p>
              </div>
            </div>
            <div className="text-center mt-16">
              <Link to="/contact" className="inline-flex items-center gap-4 bg-black text-white px-12 py-5 rounded-sm font-black uppercase tracking-widest text-xs">
                Start a Custom Build <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US & LAYOUTS ================= */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">Why Choose Our Custom Vans?</h2>
              <p className="text-lg text-gray-700">Big Bear Vans is a high-tech, true custom build company. Here’s why you should choose us to customize your dream campervan:</p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="rounded-xl overflow-hidden">
                <img src={`${imgPath}interior-layout.JPG`} alt="Interior Layout" className="w-full object-cover" />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Customize Interior Layouts</h3>
                <p className="text-gray-600 leading-relaxed">
                  At Big Bear Vans, you decide the floor plan of your campervan, and we bring it to life. Our expert team of engineers and renderers works closely with you, keeping you updated at every step. You'll see your van in a detailed 3D render long before we pick up a tool. We design custom vans according to your lifestyle and preferences.
                </p>
                <div className="space-y-4 pt-4 border-t border-gray-100 italic">
                  <p className="flex gap-3"><CheckCircle2 className="w-5 h-5 flex-shrink-0" /> Do you work remotely? Your van will have an office setup.</p>
                  <p className="flex gap-3"><CheckCircle2 className="w-5 h-5 flex-shrink-0" /> Love skiing? We’ll build a garage under the bed to store all your gear.</p>
                  <p className="flex gap-3"><CheckCircle2 className="w-5 h-5 flex-shrink-0" /> Travel with a pet? We can include a dedicated pet area with a built-in feeding station.</p>
                  <p className="flex gap-3"><CheckCircle2 className="w-5 h-5 flex-shrink-0" /> Have a family? We’ll install an elevator bed and dinette benches for the kids.</p>
                  <p className="font-bold">Whatever your needs, we build to match.</p>
                </div>
              </div>
            </div>

            {/* Premium Materials & Tech */}
            <div className="grid md:grid-cols-2 gap-16 mb-24">
              <div className="space-y-6">
                <img src={`${imgPath}IMG_9845.jpg`} alt="Materials" className="w-full h-[400px] object-cover rounded-xl" />
                <h3 className="text-2xl font-black uppercase tracking-tighter">Premium, Client-Selected Materials</h3>
                <p className="text-gray-600">
                  At Big Bear Vans, each component of our campervans is premium. You can choose from our curated selection of sustainable hardwoods, custom cabinetry, multi-functional furniture, and high-end exterior accessories. Beneath the surface, we install only the best systems: reliable self-heating Lithium batteries, advanced Glycol or Diesel heating, high-performance insulation, and fully integrated water systems. Every choice is high-quality and built to last.
                </p>
              </div>
              <div className="space-y-6">
                <img src={'/images/w5.webp'} alt="CNC" className="w-full h-[400px] object-cover rounded-xl" />
                <h3 className="text-2xl font-black uppercase tracking-tighter">CNC Technology</h3>
                <p className="text-gray-600">
                  At Big Bear Vans, we use high-tech equipment like CAD/CAM software, 3D Scanners, and CNC routers. Every cabinet in your campervan is designed in CAD and cut to the millimeter by our CNC machines, and measured with 3D scanners. You can expect a top level of precision in our craftsmanship.
                </p>
              </div>
            </div>

            {/* Post Build Support */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Post-build support</h3>
                <p className="text-gray-600 leading-relaxed">
                  A major concern for custom buyers is what happens after pickup. We offer a 1-Year Standard Warranty (and the 3-Year Extended Warranty) on our craftsmanship. We also provide remote assistance, future maintenance, and upgrades at our workshop.
                </p>
                <Link to="/contact" className="inline-block bg-black text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest text-xs">Start a Custom Build</Link>
              </div>
              <img src={'/images2/wcu4.webp'} alt="Support" className="rounded-xl w-full" />
            </div>
          </div>
        </section>
        <section className="py-24">
          <OurProcess />
        </section>
        {/* ================= 3D CONFIGURATOR ================= */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-12">Our 3D Configurator</h2>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <p className=" text-lg">
                  You can start designing your dream campervan right now. In our 3D configurator, you can try different layouts, finishes, and features. Jump into our configurator and start planning your campervan.
                </p>
                <ul className="space-y-4  font-medium italic">
                  <li>— Move things around, test different layouts, and see what feels right.</li>
                  <li>— Select accessories in our configurator and see how they’ll look virtually on your campervan.</li>
                </ul>
                <Link to="/configurator" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-sm font-black uppercase tracking-widest text-xs">
                  Try 3D Configurator <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <img src={`${imgPath}configurator.png`} alt="Configurator" className="rounded-xl w-full h-70 border border-white/10" />
            </div>
          </div>
        </section>

        {/* ================= PORTFOLIO ================= */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">Our Portfolio</h2>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl">At Big Bear Vans, we have successfully customized 105+ campervans with a consistent five-star rating. Each van is designed for a specific person with different requirements. Check our past custom builds:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <img src={`/images2/op4.webp`} alt="Portfolio 1" className="rounded-xl h-[400px] w-full object-cover" />
              <div className="bg-gray-50 rounded-xl p-12 flex flex-col justify-center items-center text-center">
                <Link to="/van-layouts" className="text-2xl font-black uppercase tracking-tighter border-b-4 border-black pb-2">Browse Our Portfolio</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= OUR CLIENTS (No Image Solution) ================= */}
        <section className="py-24 bg-gray-50 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-none">Our Clients</h2>
                  <div className="w-20 h-1 bg-black"></div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We’ve designed custom campervans for clients from various backgrounds with different preferences. And we cater to everyone’s needs and choices. So far, we’ve built campervans for families, couples, pet-owners, bikers, full-time van lifers, etc. Whatever specific layout you have in mind, you can always come to us to discuss, and we will turn your crazy idea into a spectacular reality.
                </p>
                <Link to="/our-clients" className="inline-block bg-black text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest text-xs">Our Client Stories</Link>
              </div>
              {/* Typography Grid as Image Replacement */}
              <div className="grid grid-cols-2 gap-4">
                {["Families", "Couples", "Pet Owners", "Full-time Lifers"].map((label, index) => (
                  <div key={index} className="p-8 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-center h-32 hover:border-black transition-colors group">
                    <span className="text-xs font-bold text-gray-400 group-hover:text-black tracking-[0.2em] uppercase">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= SHOWROOM ================= */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 text-center">Our Showroom</h2>
            <img src={`${imgPath}40279.webp`} alt="Showroom" className="w-full h-[500px] object-cover rounded-xl mb-12" />
            <div className="grid md:grid-cols-2 gap-16">
              <p className="text-gray-700 leading-relaxed">
                To witness the process firsthand, we invite you to visit our showroom in Big Bear City, California. Here, you can see our building process, meet our team, and explore our ongoing and completed projects.
              </p>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  You can walk through finished vans to try out different layouts and features. Then, sit down for a personal design session with our designers and project manager to refine your ideas and turn your vision into a detailed plan.
                </p>
                <Link to="/showroom" className="inline-block border-b-2 border-black font-black uppercase tracking-widest text-sm">Visit our Showroom</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MEET THE BUILDERS ================= */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-xl overflow-hidden border-8 border-white/5">
              <img src={`/images/anna.webp`} alt="Artur and Anna" className="w-full" />
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Meet the Builders</h2>
              <p className="text-gray-300 italic">
                As lifelong van lovers, we (Artur and Anna) started Big Bear Vans as a family business for a simple reason: to build the vans we wished existed.
              </p>
              <p className="text-gray-400">
                Before founding Big Bear Vans, we lived on the road, traveling through Europe and the USA while converting our own RVs. That hands-on experience taught us what truly matters in a mobile home. Driven by that genuine passion, we’ve grown from building in our own backyard into operating a full-fledged workshop here in Big Bear. Every van we create is built with the travelers’ insights, for travelers.
              </p>
              <Link to="/about-us" className="inline-block bg-white text-black px-10 py-4 rounded-sm font-black uppercase tracking-widest text-xs">See Our Full Story</Link>
            </div>
          </div>
        </section>

        <Cansultation />
        <FAQs faqs={faqs} />
      </div>
      <Footer />
    </>
  );
};

export default CustomBuild;