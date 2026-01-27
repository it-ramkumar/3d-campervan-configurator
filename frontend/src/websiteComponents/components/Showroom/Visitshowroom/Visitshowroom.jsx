"use client";
import {
  Cog,
  Scan,
  Paintbrush,
  Layers,
  BedDouble,
  Box,
  ShowerHead,
  LayoutDashboard,
  Palette,
  Ruler,
  Hammer
} from "lucide-react";
import Customize from "../../Customize/Cutomize";
import { Heading2, RichParagraph} from '../../Common/Common'


export default function Showroom() {

  const cardData = [
    {
      sectiontitle: "Watch the Build Process Live",
      desc: "See exactly how your van will come to life. You’ll see:",
      descriptionList: [
        { text: "Our automated CNC machines are cutting custom cabinetry.", icon: Cog },
        { text: "We have several 3D scanners to ensure precise cuts.", icon: Scan },
        { text: "Our team is painting and assembling with expert craftsmanship.", icon: Paintbrush },
        { text: "The high-quality materials that go into every van.", icon: Layers },
      ],
      image: "/images/s1.webp",
    },
    {
      sectiontitle: "Explore Our Van Collection",
      desc: "You’ll also visit our finished custom builds, vans for sale, and ongoing projects. This is your chance to:",
      descriptionList: [
        { text: "Try out the elevator bed and dinette system.", icon: BedDouble },
        { text: "Open every drawer and cabinet.", icon: Box },
        { text: "Step inside the bathroom and test the kitchen.", icon: ShowerHead },
        { text: "Compare different layouts to see what works well for you.", icon: LayoutDashboard },
      ],
      lastText:
        "This hands-on experience gives a clear picture of what features matter most for your van’s interior and exterior.",
      image: "/images/s2.webp",
    },
    {
      sectiontitle: "Have a Personal Design Session",
      desc: "After your tour, sit down with our designers to discuss your questions. In our office, we’ll spread out samples of countertops, flooring, and fabrics. Over a complimentary coffee or tea, you can mix-and-match materials to create your perfect look. This will help you answer key questions, like:",
      descriptionList: [
        { text: "What interior design style will work best for me?", icon: Palette },
        { text: "How big should the bathroom be?", icon: Ruler },
        { text: "Which countertop and cabinet style feels right?", icon: Hammer },
      ],
      image: "/images/s3.webp",
    },
  ];

  return (
    <section className="bg-white py-[4rem] font-serif overflow-hidden">
      <div className="container mx-auto px-4">
        <div  className="text-center mb-[5rem] lg:mb-[7rem]">
          <RichParagraph className="max-w-3xl mx-auto">
            Browsing websites is a good start, but the real thing is seeing the materials and testing the layouts firsthand to make clear decisions. That’s why we invite you to visit our workshop to see and select things personally.

          </RichParagraph>
          <Heading2 text="Why visit us?" className="my-2"/>
        <RichParagraph className="max-w-3xl mx-auto my-2">
            When you step into our workshop, you become part of the build process. Here’s why a visit to our showroom is valuable for you:
        </RichParagraph>

        </div>

        {cardData.map((card, index) => (
          <Customize
            key={index}
            sectionTitle={card.sectiontitle}
            descriptionList={card.descriptionList}
            image={card.image}
            showButton={false}
            isReversed={card.isReversed}
            lastText={card.lastText}
          />
        ))}
      </div>
    </section>
  );
}
