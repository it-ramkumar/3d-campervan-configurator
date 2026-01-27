"use client";
import HeroParagrah from "../Common/Paragraph/HeroParagraph";
import { Heading1, WhiteButton, ImageWithSkeleton } from '../Common/Common'


export default function HeroV({
  title,
  description,
  image,
  link,
  buttonText,
  showButton,
}) {
  return (
    <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
      <ImageWithSkeleton
        src={image}
        alt="Camper Vans For Sale"
        className="absolute inset-0 w-full h-full object-cover z-0 md:object-center"
      />
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      <div className="relative z-20 flex items-center justify-center h-full px-4 md:px-8">
        <div className="max-w-4xl text-center text-white">
          <Heading1 text={title} className="mb-4 text-center" />

          <HeroParagrah className="text-center" text={description}/>


          {showButton && (
            <div className="mt-8 flex justify-center">
              <WhiteButton label={buttonText} link={link} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
