"use client";
import { Link } from "react-router-dom";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import WhiteButton from "../Common/Button/WhiteButton";

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
        className="absolute inset-0 w-full h-full object-cover z-0  md:object-center"
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 md:px-8">
        <div className="max-w-4xl text-center">
          <h1
            className="text-3xl md:text-5xl lg:text-[64px] font-extrabold leading-tight md:leading-normal font-serif text-white"
            style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)" }}
          >
            <div
              className="inline-block"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }}
            >
              {title}
            </div>
          </h1>

          <div
            className="anim-item mt-2"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <p
              className="text-base md:text-lg lg:text-[20px] font-normal font-serif text-white max-w-3xl mx-auto"
              style={{ textShadow: "1px 1px 6px rgba(0, 0, 0, 0.7)" }}
            >
              {description}
            </p>
          </div>

          {showButton && (
            <div
              className="anim-item mt-8"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }}
            >

                <WhiteButton label=  {buttonText} link={link}
                />


            </div>
          )}
        </div>
      </div>
    </div>
  );
}
