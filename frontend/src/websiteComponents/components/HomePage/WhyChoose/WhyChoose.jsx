"use client";
import React from "react";
import {Link} from "react-router-dom";

const WhyChoose = () => {
  const sections = [
    {
      title: "True Custom Builds",
      description:
        "Big Bear Vans is a fully custom engineering company where we create any configuration and style you want. Instead of pre-built layouts and generic templates, we customize your entire campervan from scratch. Here’s what you can choose:<ul><li>Ceiling, walls, and flooring kits in different colours and textures.</li><li>Space-saving elevator bed front or rear.</li><li>Kitchen with different customized cabinets and countertops.</li><li>Lightweight Aluminum bathrooms in different sizes.</li><li>Swivel seats or extendable benches.</li><li>Exterior upgrades like suspension, wheels, tires, awning, storage boxes, etc.</li></ul>We’re small, but high-tech. That’s why we can customize layouts and features other shops won’t even touch.",
      images: [
        { src: "/images/w1.jpg", alt: "Campervan interior under construction" },
        { src: "/images/w2.jpg", alt: "Campervan kitchen and swivel seats" },
      ],
      isReverse: false,
    },
    {
      title: "Post Build Support",
      description:
        "From first call to last key handover, we guide and support you at every step. Unlike other RV dealers, Big Bear Vans provides great after-sales support to its customers. We offer:<ul><li>1-year or 3-year extended warranty on our craftsmanship.</li><li>Servicing and installing upgrades in our workshop.</li></ul>",
      images: [
        { src: "/images/w3.jpg", alt: "Campervan wheel and tire installation" },
        { src: "/images/w4.jpg", alt: "Campervan exterior under construction" },
      ],
      isReverse: true,
    },
    {
      title: "CNC Technology",
      description:
        "Our Big Bear workshop is equipped with the latest industrial CNC technology. At our workshop:<ul><li>A team of 5+ designers uses CAD/CAM software to model every part of your van.</li><li>Components are cut by our two CNC router machines (metal & plywood).</li><li>We have several 3D scanners for precise measurements.</li></ul>The result? A fully custom campervan, exactly the way you want.",
      images: [
        { src: "/images/w5.png", alt: "CNC machine cutting wood" },
        { src: "/images/w6.jpg", alt: "Industrial CNC machine" },
      ],
      isReverse: false,
    },
    {
      title: "Family-friendly Layouts",
      description:
        "While others are built for couples, ours are for the whole crew. We’re proud to have built several family-friendly campervans. In our family layouts, you can:<ul><li>Sit, sleep, and travel safely with 4 or even 9 people.</li><li>Enjoy outdoors in the rear foldable patio and roof deck.</li><li>Have a dinette area for meals, games, and homework.</li><li>Have a fully functional kitchen and a lightweight bathroom.</li></ul>",
      images: [
        { src: "/images/w7.webp", alt: "Family-friendly campervan interior" },
        { src: "/images/w8.jpg", alt: "Campervan with roof deck and awning" },
      ],
      isReverse: true,
    },
    {
      title: "Off-grid Ready",
      description:
        "Every Big Bear van comes with a professional-grade electrical and water system, so you can go anywhere to stay without a second thought. We install:<ul><li>Rapid Alternator Charging: A DC-DC charger which delivers up to <strong>50A </strong> of charging while you drive and up to <strong>250A</strong> if 2nd alternator is installed.</strong></li><li>Self-heating lithium batteries with a capacity of <strong>15,600 watt-hours</strong> that operate down to sub-zero temperatures.</li><li>Integrated grey and fresh water tanks.</li><li>A diesel combined air and water heater that does not drain the battery and has excellent insulation.</li><li><strong>12V</strong> slim design optimized for vans A/C unit that works up to <strong>20 hours</strong> on the batteries.</li><li>Solar panels on the roof and hood.</li></ul>Off-grid freedom isn’t an upgrade in our converted vans, it’s a standard.",
      images: [
        { src: "/images/w9.jpg", alt: "Solar panels on a campervan roof" },
        { src: "/images/w10.jpg", alt: "Interior of an off-grid ready van" },
      ],
      isReverse: false,
    },
  ];

  return (
    <div className="bg-white text-blackish font-serif overflow-hidden">
      <header className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
          Why Choose Big Bear Vans?
        </h1>
        <p className="text-lg md:text-xl font-serif mt-4 max-w-3xl mx-auto px-4">
          At Big Bear Vans, we have a full-fledged team of experienced campervan
          builders and engineers in Big Bear, California. Let us show you what
          nobody else does like we do.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8">
        {sections.map((section, index) => (
          <section
            key={index}
            className={`py-16 flex flex-col md:flex-row items-center gap-10 md:gap-20 ${
              section.isReverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Section */}
            <div className={`md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left ${section.isReverse ? "ml-auto" : ""}`}>
              <h2 className="text-3xl md:text-4xl font-bold font-serif">
                {section.title}
              </h2>
              <div
                className="text-base md:text-lg leading-relaxed space-y-3 md:space-y-4"
                dangerouslySetInnerHTML={{
                  __html: section.description.replace(
                    /<ul>/g,
                    '<ul class="list-disc list-inside space-y-2 mt-2 text-left">'
                  ),
                }}
              />
            </div>

            {/* Image Section */}
            <div
              className={`w-full md:w-1/2 relative flex items-center justify-center md:justify-start min-h-[350px] md:min-h-[450px] ${section.isReverse ? "md:justify-end" : ""}`}
            >
              <div
                className={`w-11/12 max-w-[400px] h-[300px] md:h-[400px] relative rounded-3xl shadow-lg transform rotate-[-4.68deg] overflow-hidden
                  transition-transform duration-300 hover:scale-105 hover:z-10
                  md:w-[400px]
                  ${section.isReverse ? "md:ml-auto" : "md:mr-auto"} border-[3px] border-[#333]
                `}
              >
                <img
                  src={section.images[0].src}
                  alt={section.images[0].alt}
                  className="rounded-3xl object-cover w-full h-full"
                />
              </div>
              <div
                className={`w-2/3 max-w-[200px] h-[200px] md:max-w-[300px] md:h-[300px] absolute transform rotate-[-4.68deg] border-4 border-white rounded-2xl shadow-xl overflow-hidden
                  transition-transform duration-300 hover:scale-105 hover:z-20
                  ${section.isReverse ? "bottom-[-20px] right-[-20px] md:left-[-20px]" : "bottom-[-20px] right-[-20px] md:right-[-20px]"}
                `}
              >
                <img
                  src={section.images[1].src}
                  alt={section.images[1].alt}
                  className="rounded-2xl object-cover w-full h-full"
                />
              </div>
            </div>
          </section>
        ))}

        <div className="py-10 flex justify-center">
          <Link
            to="/inquiry"
            className=" h-[39px] px-5 py-[10px] rounded-[5px] bg-[#2761FD] text-white
              font-['Noto Sans'] text-sm font-bold shadow-md hover:bg-blue-600 transition-colors
              hover:scale-105 hover:shadow-lg transition-transform cursor-pointer"
          >
            Request a Build
          </Link>
        </div>
      </main>
    </div>
  );
};

export default WhyChoose;