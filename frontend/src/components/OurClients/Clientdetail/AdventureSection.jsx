import React from "react";
import { Mountain, Zap, Car, Shield, MapPin, Home } from "lucide-react";
import ClassicImageGrid from "./ClassicImageGrid";
import { CustomLink, Heading2, Heading3, Heading4, RichParagraph } from "../../Common/Common";

const AdventureSection = ({ imageData }) => {
  const features = [
    { icon: Zap, text: "Powerful lithium battery system that lets you run the A/C with the engine off. You can go to the desert, the forest, or any remote location without a hookup." },
    { icon: Car, text: "Separate garage for motorcycles or an under-the-bed garage for the gear." },
    { icon: Shield, text: "A spacious roof deck for mounting gear and L-tracks at various places in the van to secure helmets, ramps, etc." },
    { icon: MapPin, text: "More than a dozen options for the rear door storage, where you can install storage boxes, bike tubes, gear carriers, and uplift for bicycles." }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex p-3 bg-primary rounded-lg text-secondary mb-4">
            <Mountain size={32} />
          </div>
          <Heading2 text="Adventure-ready Campervans" className="mb-4 uppercase tracking-tight text-primary" />
          <RichParagraph className="font-bold">
            Your mobile basecamp for outdoor pursuits
          </RichParagraph>
        </div>

        {/* Narrative */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <RichParagraph className="">
            At Big Bear Vans, we also build for those who live for the outdoors. Whether you love skiing, surfing, biking, fishing, dance competitions, or triathlons, our customized vans become your mobile basecamp.
          </RichParagraph>
          <RichParagraph  >
            Our campervans serve as a changing room, a base for gear, and a comfortable place to rest before and after a competition. Our customized vehicles get you to remote locations and provide a space for all gear, including dirt bikes, skis, and wetsuits.
          </RichParagraph>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-lg border-b-4 border-primary shadow-sm flex flex-col items-center text-center group hover:bg-primary transition-all duration-300">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-hover">
                <f.icon size={24} />
              </div>
              <RichParagraph className=" text-primary group-hover:text-secondary ">
                {f.text}
              </RichParagraph>
            </div>
          ))}
        </div>

        {/* MotoVan Featured Section */}
        <div className="bg-white rounded-lg p-8 lg:p-12 border border-primary/10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="rounded-lg overflow-hidden border-4 border-secondary shadow-lg">
                <ClassicImageGrid images={imageData.motovan} layout="motovan" />
              </div>
            </div>

            <div className="lg:col-span-5 pt-4">
              <div className="inline-flex px-4 py-1.5 bg-hover text-primary rounded-lg text-xs font-black uppercase tracking-widest mb-4">
                The Ultimate Moto-Base
              </div>
              <Heading3 text="The MotoVan" className="mb-4" />
              <RichParagraph className="text-primary/80 mb-8 ">
              <CustomLink href="/layout-detail/moto-van" text={" Motovan "}/>
                is one of our exclusive campervans built for riders, featuring both living space and a dedicated garage.
              </RichParagraph>

              <div className="space-y-4">
                <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <Car size={24} />
                    <Heading4 text="The Garage" className="uppercase text-sm font-bold" />
                  </div>
                  <ul className="space-y-2 text-sm text-primary/80 font-medium">
                    <li>• Secure garage for up to three motorcycles</li>
                    <li>• Integrated clothes dryer & post-ride shower</li>
                    <li>• Smart storage for riding equipment</li>
                  </ul>
                </div>
                <div className="bg-primary p-6 rounded-lg text-secondary">
                  <div className="flex items-center gap-3 mb-4">
                    <Home className="!text-hover" size={24} />
                    <Heading4 text="The Living Space" className="uppercase  text-secondary" />
                  </div>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• Sleeping for five with loft bed system</li>
                    <li>• Fully functional kitchen with fridge & oven</li>
                    <li>• Flexible convertible seating</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdventureSection;