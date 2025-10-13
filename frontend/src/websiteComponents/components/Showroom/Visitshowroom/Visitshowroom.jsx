"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Reusable Showroom Card Component ---
const ShowroomCard = ({ title, description, features, conclusion, imageSrc, isReversed, textWidthClass, desktopImageHeight, sectionIndex, isLastCard }) => {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const mobileImageRef = useRef(null);
  const contentRef = useRef(null); // Ref to measure content height
  const overlayColor = 'bg-black/75';

  // State for 'See More/See Less' functionality
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false); // New state to check if content overflows

  // Function to toggle expansion
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Effect to check if content overflows (only relevant for mobile)
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        // Only run check on mobile/small screens (Tailwind's 'md' breakpoint is 768px by default)
        if (window.innerWidth < 768) {
          // Check if the scroll height is greater than the client height (i.e., content overflows)
          const collapsedHeight = parseInt(getComputedStyle(document.documentElement).fontSize) * 15; // 15rem height check
          setIsOverflowing(contentRef.current.scrollHeight > collapsedHeight);
        } else {
          // On desktop, the feature is disabled, so it's never overflowing
          setIsOverflowing(false);
        }
      }
    };

    // Initial check
    checkOverflow();
    // Add event listener for window resize to re-check
    window.addEventListener('resize', checkOverflow);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for the text block (Title, Description, Features)
      gsap.from(textRef.current.querySelectorAll("h2, p, li"), {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      });

      // Animation for the desktop image block
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: isReversed ? 100 : -100,
        rotationY: isReversed ? 15 : -15,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Animation for the mobile image (if applicable)
      if (mobileImageRef.current) {
        gsap.from(mobileImageRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50, // Animate from bottom for mobile
          duration: 1,
          ease: 'power3.out',
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [isReversed]);

  // Determine container alignment and positioning classes
  const cardAlignment = isReversed ? 'ml-auto' : 'mr-auto';

  // Custom height variables
  const imageHorizontalPosition = 'calc(50% - 39rem)';

  // EXTREME MAXIMIZED PADDING
  const extremePadding = '12rem';
  const innerPadding = '3rem'; // p-12 is 3rem

  const textContainerPadding = isReversed
    ? `p-8 md:pt-${innerPadding} md:pb-${innerPadding} md:pl-${innerPadding} md:pr-[${extremePadding}]`
    : `p-8 md:pt-${innerPadding} md:pb-${innerPadding} md:pr-${innerPadding} md:pl-[${extremePadding}]`;

  // Text alignment for the content *within* the text container
  const contentAlignment = isReversed ? 'md:items-end' : 'md:items-start';

  // Apply whitespace-nowrap ONLY on desktop (md:) for the 3rd card (index 2).
  // Otherwise, use whitespace-normal to allow text wrapping on mobile.
  const headingClasses = `text-[2.25rem] font-bold font-serif mb-4 ${sectionIndex === 2 ? 'md:whitespace-nowrap whitespace-normal' : ''}`;

  // Define the margin class based on whether it's the last card
  const bottomMarginClass = isLastCard ? 'mb-8 md:mb-12' : 'mb-24 md:mb-32';

  // MODIFICATION: Reduced max-h to 'max-h-[15rem]' (from max-h-[25rem]) for mobile
  const collapseClasses = !isExpanded
    ? 'max-h-[15rem] overflow-hidden relative' // Collapsed state (mobile only): max-h and overflow hidden
    : ''; // Expanded state: no limit, relative is for positioning the gradient/button

  // Gradient overlay for collapsed state on mobile
  const gradientOverlay = !isExpanded && isOverflowing
    ? 'block' // Show overlay when collapsed and overflowing
    : 'hidden'; // Hide when expanded or on desktop (md:)

  return (
    <div ref={cardRef} className={`relative ${bottomMarginClass} w-full mx-auto`} style={{ maxWidth: '82.5rem' }}>

      {/* The background card: width 11/12 and aligned left/right */}
      <div className={`relative w-full md:w-11/12 ${cardAlignment} ${overlayColor} rounded-xl md:rounded-none`}>

        {/* IMAGE BLOCK (Mobile visibility: always first) */}
        <div className={`block md:hidden w-full p-4`}>
          <div className="w-full overflow-hidden" style={{ height: '20rem', borderRadius: '0.75rem' }}>
            <img
              ref={mobileImageRef} // Attach ref for mobile image animation
              src={imageSrc}
              alt={title}
              className="object-cover w-full h-full transform hover:scale-105 hover:-translate-y-1 transition duration-500 ease-out" // Added hover effects
            />
          </div>
        </div>

        {/* TEXT BLOCK: Applying the dynamic text width */}
        <div
          ref={textRef}
          // 🔑 FIX: Removed 'h-full' to allow the container to expand past minHeight when content is tall
          className={`flex flex-col items-center z-20 ${textContainerPadding} ${contentAlignment}`}
          style={{ minHeight: '20rem' }}
        >
          {/* Text Content Wrapper for Collapse/Expand (Mobile Only) */}
          <div className={`text-white w-full ${textWidthClass} text-center md:text-left`}>
             {/* We use `md:max-h-none` to guarantee the height constraint is lifted on desktop */}
             <div ref={contentRef} className={`md:block md:max-h-none md:overflow-visible ${collapseClasses}`}>
              {/* H2 with conditional whitespace-nowrap */}
              <h2 className={headingClasses} style={{ lineHeight: '100%', letterSpacing: '0%' }}>
                {title}
              </h2>

              <p className="text-[1.25rem] font-normal text-white/90 mb-6">
                {description}
              </p>

              {/* FEATURE LIST */}
              <ul className="list-disc list-inside space-y-2 text-[1.25rem] font-normal text-white/90 mb-6">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              {/* CONCLUSION PARAGRAPH - ONLY RENDERED IF CONCLUSION PROP EXISTS */}
              {conclusion && (
                <p className="text-[1.25rem] font-normal text-white/90">
                  {conclusion}
                </p>
              )}
            </div>

            {/* Gradient and See More/Less button for Mobile */}
            <div className={`md:hidden absolute inset-x-0 bottom-0 pointer-events-none ${gradientOverlay}`} style={{ height: '8rem' }}>
                <div className="w-full h-full bg-gradient-to-t from-black/75 to-transparent"></div>
            </div>

            {/* See More/Less Button */}
            {isOverflowing && (
                <div className="md:hidden w-full flex justify-center mt-4 -mb-4">
                    <button
                        onClick={toggleExpand}
                        className="pointer-events-auto bg-white text-black font-bold py-2 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-200 z-30"
                    >
                        {isExpanded ? "See Less" : "See More"}
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* IMAGE BLOCK (Desktop Only, Absolute Positioning) - Uses desktopImageHeight prop */}
      <div
        className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 z-10`}
        style={{
          width: '37.5rem', // 600px image width
          height: desktopImageHeight, // Dynamic height applied here
          // Extreme left/right positioning
          [isReversed ? 'left' : 'right']: imageHorizontalPosition,
          [isReversed ? 'right' : 'left']: 'auto',
        }}
      >
        <div
          ref={imageRef}
          className="bg-white p-2 w-full h-full overflow-hidden rounded-3xl shadow-2xl transition duration-300 ease-out hover:shadow-3xl hover:-translate-y-1"
          style={{
            borderRadius: '1.875rem',
            border: '2px solid #464444ff',
          }}
        >
          <img
            src={imageSrc}
            alt={title}
            className="object-cover w-full h-full transform transition duration-500 ease-out hover:scale-105 hover:-translate-y-1" // Added hover effects
            style={{ borderRadius: '1.75rem' }}
          />
        </div>
      </div>
    </div>
  );
};


// --- Main Showroom Component ---
export default function Showroom() {
  const mainTitleRef = useRef(null);

  useEffect(() => {
    // Animation for the main header block
    gsap.fromTo(mainTitleRef.current.children, // Animate all children (p and h2)
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.1, // Stagger the intro text and the main heading
        scrollTrigger: {
          trigger: mainTitleRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      }
    );
  }, []);

  const cardData = [
    {
      title: "Watch the Build Process Live",
      description: "See exactly how your van will come to life. You’ll see:",
      features: [
        "Our automated CNC machines are cutting custom cabinetry.",
        "We have several 3D scanners to ensure precise cuts.",
        "Our team is painting and assembling with expert craftsmanship.",
        "The high-quality materials that go into every van.",
      ],
      conclusion: null,
      imageSrc: "/images/s1.png",
      isReversed: false,
      textWidthClass: "md:w-[65%]",
      desktopImageHeight: '27rem', // Standard height
    },
    {
      title: "Explore Our Van Collection",
      description: "You’ll also visit our finished custom builds, vans for sale, and ongoing projects. This is your chance to:",
      features: [
        "Try out the elevator bed and dinette system.",
        "Open every drawer and cabinet.",
        "Step inside the bathroom and test the kitchen.",
        "Compare different layouts to see what works well for you.",
      ],
      conclusion: "This hands-on experience gives a clear picture of what features matter most for your van’s interior and exterior.",
      imageSrc: "/images/s2.png",
      isReversed: true,
      textWidthClass: "md:w-[55%]",
      desktopImageHeight: '32rem',
    },
    {
      title: "Have a Personal Design Session",
      description: "After your tour, sit down with our designers to discuss your questions. In our office, we’ll spread out samples of countertops, flooring, and fabrics. Over a complimentary coffee or tea, you can mix-and-match materials to create your perfect look. This will help you answer key questions, like:",
      features: [
        "What interior design style will work best for me?",
        "How big should the bathroom be?",
        "Which countertop and cabinet style feels right?",
      ],
      conclusion: null,
      imageSrc: "/images/s3.png",
      isReversed: false,
      textWidthClass: "md:w-[55%]",
      desktopImageHeight: '32rem',
    },
  ];

  return (
    // Section top padding remains reduced to keep content higher
    <section className="bg-white py-[4rem] font-serif overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main Title Block */}
        <div ref={mainTitleRef} className="text-center mb-[5rem] lg:mb-[7rem]">

          {/* Introductory text - Removed any 'dim' or reduced opacity effects */}
          <p
            className="font-serif font-normal text-[1.5rem] text-black/90 max-w-[57.8125rem] mx-auto mb-16"
            style={{
              // lineHeight: '100%',
              // letterSpacing: '0%',
              fontSize: '1.5rem'
            }}
          >
            Browsing websites is a good start, but the real thing is seeing the materials and testing the layouts firsthand to make clear decisions. That’s why we invite you to visit our workshop to see and select things personally.
          </p>

          <h2
            className="text-[3rem] font-bold font-serif text-black leading-none mb-4"
            style={{ lineHeight: '100%', letterSpacing: '0%' }}
          >
            Why visit us?
          </h2>
          <p className="text-[1.5rem] font-normal text-black/90 max-w-[57.8125rem] mx-auto">
            When you step into our workshop, you become part of the build process. Here’s why a visit to our showroom is valuable for you:
          </p>
        </div>

        {/* Showroom Cards */}
        {cardData.map((card, index) => (
          <ShowroomCard
            key={index}
            title={card.title}
            description={card.description}
            features={card.features}
            conclusion={card.conclusion}
            imageSrc={card.imageSrc}
            isReversed={card.isReversed}
            textWidthClass={card.textWidthClass}
            desktopImageHeight={card.desktopImageHeight}
            sectionIndex={index}
            isLastCard={index === cardData.length - 1}
          />
        ))}

      </div>
    </section>
  );
}