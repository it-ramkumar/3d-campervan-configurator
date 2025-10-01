"use client";

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function OurProcess() {
  const imageSize = { width: 650, height: 400 };

  // Create refs for the elements to be animated
  const headerRef = useRef(null);
  const stepsRef = useRef([]);
  const buttonRef = useRef(null);

  // Add a ref to each element dynamically
  const addStepRef = (el) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Header animation on page load
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Animate each step on scroll
    stepsRef.current.forEach((step, index) => {
      const isEven = index % 2 === 0;
      const xDirection = isEven ? -50 : 50;

      gsap.fromTo(
        step,
        {
          opacity: 0,
          x: xDirection,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%", // Animation starts when the top of the step is 80% down from the top of the viewport
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Button animation on page load
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.5,
      }
    );
  }, []);

  // Function to handle image zoom on hover
  const handleImageHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Function to handle image return on mouse leave
  const handleImageLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div className="bg-black/75 text-white py-20 px-4 md:px-8 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-serif">
            Our Process
          </h1>
          <p className="text-base md:text-xl text-white/70 font-normal text-center font-serif">
            Here's how our complete process of customization works from ideas to keys in your hand:
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Step 1: Immediate */}
          <div
            className="flex flex-col items-center lg:items-start text-center lg:text-left mb-10 lg:mb-0"
            ref={addStepRef}
          >
            <p className="text-lg md:text-xl font-normal mb-4 font-serif">
              Bring a van or let us source a discounted base vehicle for you.
            </p>
            <div
              className="w-full relative overflow-hidden rounded-md shadow-lg"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            >
              <img
                src="/images/process1.jpg"
                alt="Vans parked in a row"
                width={imageSize.width}
                height={imageSize.height}
                className="transition-transform duration-500 ease-in-out"
                quality={85}
              />
            </div>
          </div>
          <div className="hidden lg:block"></div>

          {/* Step 2: 1 Month */}
          <div className="hidden lg:block"></div>
          <div
            className="flex flex-col items-center lg:items-start text-center lg:text-left -mt-10 lg:-mt-18 mb-10 lg:mb-0"
            ref={addStepRef}
          >
            <p className="text-lg md:text-xl font-normal mb-4 font-serif">
              Lock in your spot and timeline with a deposit.
            </p>
            <div
              className="w-full relative overflow-hidden rounded-md shadow-lg"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            >
              <img
                src="/images/process2.jpg"
                alt="Customized van with open doors"
                width={imageSize.width}
                height={imageSize.height}
                className="transition-transform duration-500 ease-in-out"
                quality={85}
              />
            </div>
          </div>

          {/* Step 3: 2 Months */}
          <div
            className="flex flex-col items-center lg:items-start text-center lg:text-left -mt-10 lg:-mt-18 mb-10 lg:mb-0"
            ref={addStepRef}
          >
            <p className="text-lg md:text-xl font-normal mb-4 font-serif">
              Collaborate with our designers to shape the layout.
            </p>
            <div
              className="w-full relative overflow-hidden rounded-md shadow-lg"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            >
              <img
                src="/images/process3.jpg"
                alt="Designers collaborating on a 3D model"
                width={imageSize.width}
                height={imageSize.height}
                className="transition-transform duration-500 ease-in-out"
                quality={85}
              />
            </div>
          </div>
          <div className="hidden lg:block"></div>

          {/* Step 4: 3 Months */}
          <div className="hidden lg:block"></div>
          <div
            className="flex flex-col items-center lg:items-start text-center lg:text-left -mt-10 lg:-mt-18 mb-10 lg:mb-0"
            ref={addStepRef}
          >
            <p className="text-lg md:text-xl font-normal mb-4 font-serif">
              Review and refine 3D renderings until you love them.
            </p>
            <div
              className="w-full relative overflow-hidden rounded-md shadow-lg"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            >
              <img
                src="/images/process4.png"
                alt="3D rendering of a van interior"
                width={imageSize.width}
                height={imageSize.height}
                className="transition-transform duration-500 ease-in-out"
                quality={85}
              />
            </div>
          </div>

          {/* Step 5: 4 Months */}
          <div
            className="flex flex-col items-center lg:items-start text-center lg:text-left -mt-10 lg:-mt-18 mb-10 lg:mb-0"
            ref={addStepRef}
          >
            <p className="text-lg md:text-xl font-normal mb-4 font-serif">
              We’ll build your van, sharing progress updates along the way.
            </p>
            <div
              className="w-full relative overflow-hidden rounded-md shadow-lg"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            >
              <img
                src="/images/process6.jpg"
                alt="A camper van being built in a workshop"
                width={imageSize.width}
                height={imageSize.height}
                className="transition-transform duration-500 ease-in-out"
                quality={85}
              />
            </div>
          </div>
          <div className="hidden lg:block"></div>

          {/* Step 6: Pickup */}
          <div className="hidden lg:block"></div>
          <div
            className="flex flex-col items-center lg:items-start text-center lg:text-left -mt-10 lg:-mt-18"
            ref={addStepRef}
          >
            <p className="text-lg md:text-xl font-normal mb-4 font-serif">
              Pick up your converted camper van in Big Bear.
            </p>
            <div
              className="w-full relative overflow-hidden rounded-md shadow-lg"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            >
              <img
                src="/images/process5.jpg"
                alt="A converted camper van in a scenic location"
                width={imageSize.width}
                height={imageSize.height}
                className="transition-transform duration-500 ease-in-out"
                quality={85}
              />
            </div>
          </div>
        </div>

        {/* Call to action button */}
        <div className="mt-16 text-center" ref={buttonRef}>
          <Link to="/inquiry" className="inline-block">
            <button className="bg-white text-black py-3 px-8 cursor-pointer rounded-md font-sans font-bold text-sm">
              Get a Quote
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}