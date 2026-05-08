import React from 'react';
import { FaCog, FaFeatherAlt, FaRulerCombined, FaBolt, FaBed, FaPalette } from 'react-icons/fa';
import { Heading2, RichParagraph, ImageWithSkeleton, Heading3 } from '@/components/Common/Common';

export default function Mission() {
  const advantages = [
    {
      icon: <FaCog size={36} />,
      title: "Custom Concept",
      text: "We craft your dream campervan exactly how you imagine it from concept to completion. See your build in 3D, choose your colors and finishes, and make it truly yours."
    },
    {
      icon: <FaFeatherAlt size={36} />,
      title: "Lightweight Build",
      text: "Built with lightweight, high-quality materials for smoother performance and better fuel efficiency backed by 100+ successful builds of real vanlife experience."
    },
    {
      icon: <FaRulerCombined size={36} />,
      title: "Smart Innovation",
      text: "We stay ahead of the curve by adding smart innovations like modern windows, elevator beds, and flexible layouts keeping your camper future-ready."
    },
    {
      icon: <FaBolt size={36} />,
      title: "Precision Engineering",
      text: "Every detail is engineered with precision using 3D CAD and CNC technology. Our custom electrical components are reliable, easy to replace, and built to last."
    },
    {
      icon: <FaBed size={36} />,
      title: "All-Season Comfort",
      text: "Experience comfort anywhere—our elevator beds save space, and full insulation keeps your van cozy in every climate, all year round."
    },
    {
      icon: <FaPalette size={36} />,
      title: "Stylish Utility",
      text: "Designed around your lifestyle: stylish interiors, smart storage, and optimized roofs with solar panels and skylights for the perfect adventure setup."
    }
  ];

  return (
    <div className="bg-secondary min-h-screen py-20 px-6 md:px-12 lg:px-24 font-body overflow-x-hidden">

      {/* Mission and Purpose Section */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <RichParagraph className="!text-hover font-bold uppercase tracking-wider !text-sm">Our Core Values</RichParagraph>
          <Heading2 text="Mission and Purpose" className='mt-2 text-primary' />
          <div className="h-1 w-16 bg-primary mx-auto mt-4 rounded-lg"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Container */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Design Element: Decorative border box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 rounded-lg -z-10 group-hover:-bottom-2 group-hover:-right-2 transition-all duration-500"></div>

            <div className="p-2 aspect-[4/5] bg-white rounded-lg shadow-xl">
              <ImageWithSkeleton
                src="/images/mission.webp"
                alt="Cozy interior of a custom campervan"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <RichParagraph className="text-xl text-primary font-medium leading-relaxed">
              At Big Bear Vans, our mission is to help more people hit the road sooner in their dream rigs.
            </RichParagraph>
            <RichParagraph className="text-primary/80 leading-relaxed">
              We focus on creating custom campervans that maximize space, especially for families needing to sit and sleep 4-5 people comfortably. Our camper builds feature innovative solutions like elevator beds, compact aluminum bathrooms, and custom kitchens to ensure optimal use of space and comfort.
            </RichParagraph>
            <RichParagraph className="text-primary/80 leading-relaxed">
              Additionally, our vans feature beautiful interior designs with personalized finishes, making each campervan unique and tailored to our clients' tastes.
            </RichParagraph>
          </div>
        </div>
      </div>

      {/* Our Advantages Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <RichParagraph className="!text-hover font-bold uppercase tracking-wider !text-sm">Why Choose Us</RichParagraph>
          <Heading2 text="Our Advantages" className='mt-2' />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="group bg-primary rounded-lg p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center mb-8 text-primary transition-transform duration-700 group-hover:rotate-[360deg]">
                {advantage.icon}
              </div>

              <Heading3 text={advantage.title} className="text-secondary mb-4" />

              <RichParagraph className="text-secondary/70">
                {advantage.text}
              </RichParagraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}