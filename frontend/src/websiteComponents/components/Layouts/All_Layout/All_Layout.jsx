"use client";
import BlackButton from "../../Common/Button/BlackButton";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";



export default function All_Layout({ layout, LayoutText, text }) {
  const { image1, image2, image3, image4, title, link } = layout;
  return (
    <section className="bg-white text-black font-serif pt-12 md:pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Text */}
    {  text &&    <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 animate-fadeInUp">
            <p className="text-[1.25rem] leading-relaxed text-gray-700 mb-8">
  {LayoutText.text}
            </p>

            <p className="mt-12 text-[1.25rem] leading-relaxed text-gray-700 animate-fadeInUp delay-[0.3s]">
            {LayoutText.description}
            </p>
          </div>
}
        {/* Heading */}
        <h2 className="text-center font-bold text-4xl md:text-5xl lg:text-[3rem] mb-8 md:mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent animate-fadeInUp">
{title}
        </h2>

        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">

  <div className="col-span-1 h-[250px] md:h-[400px] overflow-hidden animate-fadeInUp delay-[0.1s]">
    <ImageWithSkeleton
      src={image1}
      alt="Campervan interior with bunk beds"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="col-span-1 h-[250px] md:h-[400px] overflow-hidden animate-fadeInUp delay-[0.2s]">
    <ImageWithSkeleton
      src={image2}
      alt="Campervan kitchen and seating area"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="col-span-1 row-span-2 h-[520px] md:h-[820px] overflow-hidden animate-fadeInUp delay-[0.3s]">
    <ImageWithSkeleton
      src={image4}
      alt="Detailed view of campervan kitchen amenities"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="col-span-2 h-[250px] md:h-[400px] overflow-hidden animate-fadeInUp delay-[0.4s]">
    <ImageWithSkeleton
      src={image3}
      alt="Spacious interior view of a family campervan"
      className="w-full h-full object-cover"
    />
  </div>

</div>


        <div className="flex justify-center animate-fadeInUp delay-[0.5s]">
          <BlackButton label="Click To Explore" link={link} />
        </div>
      </div>
    </section>
  );
}
