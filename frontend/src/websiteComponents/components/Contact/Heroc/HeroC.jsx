"use client";
// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";

const heroImage = "/heroSlider/contact.webp";
const part1Text = "Contact Us | Custom Van ";
// MODIFICATION: Split the second part for precise control over the last two letters
const part2TextMain = "Builders in Big Bear City, ";
const part2TextLast = "CA";


export default function Hero() {
  // const containerRef = useRef(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const tl = gsap.timeline();
  //     gsap.fromTo(
  //       ".bg-image",
  //       { scale: 1, x: 0, y: 0 },
  //       {
  //         scale: 1.1,
  //         x: "random(-3%, 3%)",
  //         y: "random(-3%, 3%)",
  //         duration: 15,
  //         ease: "none",
  //         repeat: -1,
  //         yoyo: true,
  //       }
  //     );
  //     tl.from(".title-char", {
  //       y: 80,
  //       opacity: 0,
  //       stagger: 0.03,
  //       duration: 1.2,
  //       ease: "power3.out",
  //     }).from(
  //       ".anim-desc",
  //       {
  //         y: 50,
  //         opacity: 0,
  //         duration: 1,
  //         ease: "power3.out",
  //       },
  //       "-=0.8"
  //     );
  //   }, containerRef);
  //   return () => ctx.revert();
  // }, []);

  return (
 <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden ">
  {/* Background Image */}
  <img
    src={heroImage}
    alt="Contact Big Bear Vans"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Black Overlay */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  {/* Text Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-8">
    <h1 className="text-3xl md:text-5xl lg:text-[64px] font-extrabold leading-tight font-serif drop-shadow-lg">
      <span className="text-gray-300">{part1Text}</span>
      <br className="md:hidden" />
      <span className="text-gray-100">{part2TextMain}{part2TextLast}</span>
    </h1>

    <p className="mt-4 text-base text-gray-200 md:text-lg lg:text-[20px] font-medium font-serif max-w-3xl mx-auto drop-shadow-md">
      Contact Big Bear Vans today for your custom van conversion. Our
      team of expert van builders in Big Bear City, California, is
      ready to help you begin your dream van life.
    </p>
  </div>
</div>

  );
}