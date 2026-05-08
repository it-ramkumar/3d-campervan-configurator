import { CheckCircle2 } from "lucide-react";
import FAQs from "../Faqs/Faqs";
import HeroImage from "../Common/HeroSectionNew/HeroSectionNew";
import OurProcess from "../HomePage/OurProcess/OurProcess"
import Image from "next/image";
import { RichParagraph, Heading2, Heading3, Heading4, SecondaryButton, ImageWithSkeleton, PrimaryButton } from "../Common/Common";

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
      <div className="w-full">
        <HeroImage
          alt={"images"}
          title={newTitleText} description={newDescriptionText} image={heroImage} link="/inquiry" buttonText="" showButton={false}
          overlay={true}
          overlayOpacity="bg-black/40"
        />
        {/* ================= INTRO ================= */}
        <section className="py-24 border-b border-secondary">
          <div className=" mx-auto px-4 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <RichParagraph >
                Our team manages everything in-house, from electrical and plumbing to cabinetry and painting, so your van is truly yours at the end. This is the essence of a Big Bear Vans custom build. Let us tell you more about our process:
              </RichParagraph>
              <Heading2 text="Big Bear Vans-The Custom Builders" className=" uppercase pt-8">

              </Heading2>
              <RichParagraph>
                At Big Bear Vans, “Custom” means every detail of your campervan is decided by you and built by us. Custom isn’t just about selecting some fabric colors or faucet types; it's about co-creating a campervan that is a perfect mirror of your lifestyle and personality.
              </RichParagraph>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl aspect-[8/5]">
              <ImageWithSkeleton src={`/images2/159.webp`} alt="Big Bear Vans Exterior" />
            </div>
          </div>
        </section>

        {/* ================= HOW WE DO IT ================= */}
        <section className="py-24 bg-secondary">
          <div className=" mx-auto px-4 max-w-7xl px-6">
            <Heading3 text="This is exactly how we do it:" className=" uppercase mb-12  text-center italic" />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-lg border border-gray-100">
                <Heading4 text="Start with an Empty Van" className="uppercase mb-4 " />
                <RichParagraph >We begin with an empty van. There are no pre-built parts to work around.</RichParagraph>
              </div>
              <div className="bg-white p-10 rounded-lg border border-gray-100">
                <Heading4 text="Zero Restrictions" className="uppercase mb-4" />
                <RichParagraph >Instead of restricting you to a few preset floor plans or feature packages, we listen to your ideas, vision, and create a 3D render for you.</RichParagraph>
              </div>
              <div className="bg-white p-10 rounded-lg border border-gray-100">
                <Heading4 text="You Control Every Detail" className=" uppercase mb-4" />
                <RichParagraph >You will see your van virtually and select every detail to your liking. From the components of your electrical system to the design for your cabinets, you make all the final choices.</RichParagraph>
              </div>
            </div>
            <div className="text-center mt-16">
              <PrimaryButton link="/contact" label="Start a Custom Build" />

            </div>
          </div>
        </section>
        {/* Our Process */}
        <section className="py-24">
          <OurProcess />
        </section>
        {/* ================= WHY CHOOSE US & LAYOUTS ================= */}
        <section className="py-24 bg-white">
          <div className="mx-auto px-4 max-w-7xl">
            {/* Main Heading */}
            <div className="mb-20">
              <Heading2 text="Why Choose Our Custom Vans?" className="uppercase mb-6" />
              <RichParagraph className="max-w-2xl">
                Big Bear Vans is a high-tech, true custom build company. Here’s why you should choose us to customize your dream campervan:
              </RichParagraph>
            </div>

            {/* Top Row: Side by Side (Portrait Focus) */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              {/* 1. Customize Interior Layouts */}
              <div className="flex flex-col space-y-6">
                <div className="rounded-2xl overflow-hidden aspect-[2/3] bg-gray-100 shadow-lg">
                  <ImageWithSkeleton src={`${imgPath}interior-layout.webp`} alt="Interior Layout"  />
                </div>
                <div className="space-y-4">
                  <Heading3 text="Customize Interior Layouts" className="uppercase" />
                  <RichParagraph>
                    At Big Bear Vans, you decide the floor plan of your campervan, and we bring it to life. Our expert team of engineers and renderers works closely with you, keeping you updated at every step. You'll see your van in a detailed 3D render long before we pick up a tool. We design custom vans according to your lifestyle and preference          </RichParagraph>
                  <div className="space-y-2 pt-4 border-t border-gray-100 italic text-sm">
                    <RichParagraph className="flex gap-2"><CheckCircle2 className="w-4 h-4" /> Do you work remotely? Your van will have an office setup.
                    </RichParagraph>
                    <RichParagraph className="flex gap-2"><CheckCircle2 className="w-4 h-4" /> Love skiing? We’ll build a garage under the bed to store all your gear.
                    </RichParagraph>
                    <RichParagraph className="flex gap-2"><CheckCircle2 className="w-4 h-4" /> Travel with a pet? We can include a dedicated pet area with a built-in feeding station.

                    </RichParagraph>
                    <RichParagraph className="font-bold not-italic">Built to match your lifestyle.</RichParagraph>
                  </div>
                </div>
              </div>

              {/* 2. Premium Materials */}
              <div className="flex flex-col space-y-6">
                <div className="rounded-2xl overflow-hidden aspect-[2/3] bg-gray-100 shadow-lg">
                  <ImageWithSkeleton src={`${imgPath}IMG_9845.webp`} alt="Materials"  />
                </div>
                <div className="space-y-4">
                  <Heading3 text="Premium, Client-Selected Materials" className="uppercase" />
                  <RichParagraph>
                    At Big Bear Vans, each component of our campervans is premium. You can choose from our curated selection of sustainable hardwoods, custom cabinetry, multi-functional furniture, and high-end exterior accessories. Beneath the surface, we install only the best systems: reliable self-heating Lithium batteries, advanced Glycol or Diesel heating, high-performance insulation, and fully integrated water systems. Every choice is high-quality and built to last.

                  </RichParagraph>
                </div>
              </div>
            </div>

            {/* Bottom Row: Side by Side (Landscape Focus) */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* 3. CNC Technology */}
              <div className="flex flex-col space-y-6">
                <div className="rounded-lg overflow-hidden aspect-video bg-gray-100 shadow-md aspect-[8/5]">
                  <ImageWithSkeleton src={'/images2/cnc1.webp'} alt="CNC" />
                </div>
                <div className="space-y-4">
                  <Heading3 text="CNC Technology" className="uppercase" />
                  <RichParagraph>
                    At Big Bear Vans, we use high-tech equipment like CAD/CAM software, 3D Scanners, and CNC routers. Every cabinet in your campervan is designed in CAD and cut to the millimeter by our CNC machines, and measured with 3D scanners. You can expect a top level of precision in our craftsmanship.

                  </RichParagraph>
                </div>
              </div>

              {/* 4. Post-Build Support */}
              <div className="flex flex-col space-y-6">
                <div className="rounded-lg overflow-hidden aspect-video bg-gray-100 shadow-md aspect-[8/5]">
                  <ImageWithSkeleton src={'/images2/wcu4.webp'} alt="Support" />
                </div>
                <div className="space-y-4">
                  <Heading3 text="Post-build support" className="uppercase" />
                  <RichParagraph>
                    A major concern for custom buyers is what happens after pickup. We offer a 1-Year Standard Warranty (and the 3-Year Extended Warranty) on our craftsmanship. We also provide remote assistance, future maintenance, and upgrades at our workshop.

                  </RichParagraph>
                  <div className="pt-2">
                    <SecondaryButton link="/contact" label={"Contact Us"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3D CONFIGURATOR ================= */}
        <section className="py-24">
          <div className=" mx-auto px-4 max-w-7xl">
            <Heading2 text="Our 3D Configurator" className="uppercase  mb-12" />
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <RichParagraph>
                  You can start designing your dream campervan right now. In our 3D configurator, you can try different layouts, finishes, and features. Jump into our configurator and start planning your campervan.
                </RichParagraph>
                <ul className="space-y-4  font-medium italic">
                  <li>— Move things around, test different layouts, and see what feels right.</li>
                  <li>— Select accessories in our configurator and see how they’ll look virtually on your campervan.</li>
                </ul>
                <SecondaryButton link="/configurator" label={"Try 3D Configurator"} />

              </div>
              <div className="aspect-[8/5]">

                <ImageWithSkeleton src={`${imgPath}configurator.webp`} alt="Configurator" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= PORTFOLIO ================= */}
        <section className="py-24">
          <div className=" mx-auto px-4 max-w-7xl">
            <Heading2 text="Our Portfolio" className=" uppercase  mb-8" />
            <RichParagraph className="my-2">
              At Big Bear Vans, we have successfully customized 105+ campervans with a consistent five-star rating. Each van is designed for a specific person with different requirements. Check our past custom builds:
            </RichParagraph>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Image src={`/images2/op4.webp`} alt="Portfolio 1" className="rounded-lg h-[400px] w-full object-cover" width={800} height={600} />
              <div className="bg-gray-50 rounded-lg p-12 flex flex-col justify-center items-center text-center">
                <PrimaryButton link="/van-layouts" label={"View Portfolio"} />
              </div>
            </div>
          </div>
        </section>

        {/* ================= OUR CLIENTS (No Image Solution) ================= */}
        <section className="py-24 bg-secondary ">
          <div className=" mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div className="space-y-8">
                <div>
                  <Heading2 text="Our Clients" className="uppercase  mb-6 " />
                  <div className="w-20 h-1 bg-black"></div>
                </div>
                <RichParagraph>
                  We’ve designed custom campervans for clients from various backgrounds with different preferences. And we cater to everyone’s needs and choices. So far, we’ve built campervans for families, couples, pet-owners, bikers, full-time van lifers, etc. Whatever specific layout you have in mind, you can always come to us to discuss, and we will turn your crazy idea into a spectacular reality.
                </RichParagraph>
                < PrimaryButton link="/our-clients" label={"See Client Stories"} />
              </div>
              {/* Typography Grid as Image Replacement */}
              <div className="grid grid-cols-2 gap-4">
                {["Families", "Couples", "Pet Owners", "Full-time Lifers"].map((label, index) => (
                  <div key={index} className="p-8 border border-gray-100 rounded-lg bg-gray-50 flex items-center justify-center h-32 hover:border-black transition-colors group">
                    <span className="text-xs font-bold text-gray-400 group-hover:text-black tracking-[0.2em] uppercase">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= SHOWROOM ================= */}
        <section className="py-24">
          <div className=" mx-auto px-4 max-w-7xl aspect-[9/3]">
            <Heading2 text="Our Showroom" className="uppercase mb-12 text-center" />

            <ImageWithSkeleton src={`${imgPath}40279.webp`} alt="Showroom" />
            <div className="grid md:grid-cols-2 gap-16 mt-6">
              <RichParagraph className=" leading-relaxed">
                To witness the process firsthand, we invite you to visit our showroom in Big Bear City, California. Here, you can see our building process, meet our team, and explore our ongoing and completed projects.
              </RichParagraph>
              <div className="space-y-6">
                <RichParagraph >
                  You can walk through finished vans to try out different layouts and features. Then, sit down for a personal design session with our designers and project manager to refine your ideas and turn your vision into a detailed plan.
                </RichParagraph>
                <SecondaryButton link="/showroom" label={"Schedule a Visit"} />
              </div>
            </div>
          </div>
        </section>

        {/* ================= MEET THE BUILDERS ================= */}
        <section className="py-24 bg-black text-white">
          <div className=" mx-auto px-4 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-lg overflow-hidden border-8 border-white/5 aspect-square">

              <ImageWithSkeleton src={`/images/anna.webp`} alt="Artur and Anna" />
            </div>
            <div className="space-y-8">
              <Heading2 text="Meet the Founders" className=" text-secondary uppercase tracking-tighter" />
              <RichParagraph className="text-secondary italic">
                As lifelong van enthusiasts, we (Artur and Anna) started Big Bear Vans as a family business with a simple purpose: to build the vans we always wished existed.              </RichParagraph>
              <RichParagraph className="text-secondary">
                Before founding Big Bear Vans, we lived on the road, traveling through Europe and the USA while converting our own RVs. That hands-on experience taught us what truly matters in a mobile home. Driven by that genuine passion, we’ve grown from building in our own backyard into operating a full-fledged workshop in Big Bear. Every van we create is shaped by real traveler experience and built for life on the road.
              </RichParagraph>
              <SecondaryButton link="/about-us" label={"Learn More About Us"} />
            </div>
          </div>
        </section>

        <FAQs faqs={faqs} />
      </div>
    </>
  );
};

export default CustomBuild;