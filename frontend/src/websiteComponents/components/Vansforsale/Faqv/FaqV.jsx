"use client";

import React, { useState, useEffect, useRef } from "react";

import { FaTwitter, FaYoutube, FaLinkedin, FaWhatsapp, FaInstagram, FaPlus, FaMinus } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the GSAP plugin if in a browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "Can I test drive the vans?",
    answer:
      "We’d love for you to take our camper vans for a spin. Please contact us to schedule a test drive at your convenience.",
  },
  {
    question: "Do you offer a Warranty?",
    answer:
      "Yes, all of our pre-built vans, including our Mercedes camper vans for sale, come with a <strong>1-year warranty</strong>. This warranty does not cover third-party products themselves.",
  },
  {
    question: "Can I add additional features or upgrades after purchase?",
    answer:
      "Yes, we can install additional features or upgrades after your purchase. Contact us to discuss the options and costs associated with adding new features to your van.",
  },
  {
    question: "Do you offer any maintenance or repair services?",
    answer:
      "Yes, we offer maintenance and repair services for our camper vans. Our experienced technicians can perform routine maintenance, repairs, and upgrades to keep your van in top condition.",
  },
];

export default function FaqV() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const socialIconsRef = useRef(null);
  const faqItemsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animation for the logo and social icons
      gsap.fromTo(
        [logoRef.current, socialIconsRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
      );

      // Animation for the FAQ items
      gsap.fromTo(
        faqItemsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // --- REMOVED ALL BOTTOM PADDING HERE (pb-4 changed to pb-0) ---
    <div ref={sectionRef} className="bg-white pt-2 pb-0 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* FAQ Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-black">
            FAQs
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={el => (faqItemsRef.current[index] = el)}
              className="bg-black text-white rounded-lg p-3 relative overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-lg"
            >
              {/* Left Border */}
              <div className="absolute top-0 left-0 w-2 h-full bg-[#2761FD]"></div>

              {/* Question and Toggle Button */}
              <div
                className="flex justify-between items-start cursor-pointer py-1"
                onClick={() => handleToggle(index)}
              >
                <h3 className="text-sm md:text-lg font-semibold font-serif leading-snug pr-4 text-white">
                  {faq.question}
                </h3>
                <div className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-black border border-[#2761FD]">
                  {openIndex === index ? (
                    <FaMinus className="text-[#2761FD] text-sm md:text-lg" />
                  ) : (
                    <FaPlus className="text-[#2761FD] text-sm md:text-lg" />
                  )}
                </div>
              </div>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                }`}
              >
                <p
                  className="text-gray-300 pr-4 text-xs md:text-sm"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Logo and Socials */}
        <div className="mt-12 flex flex-col items-center">
          <div ref={logoRef}>
            <img src="/images/logoo.png" alt="Big Bear Vans Logo" width={242} height={44} />
          </div>
          <div ref={socialIconsRef} className="flex gap-4 mt-6">
            <a href="#" className="p-2 transition-all duration-300 transform hover:scale-125">
              <FaTwitter size={30} className="text-black" />
            </a>
            <a href="#" className="p-2 transition-all duration-300 transform hover:scale-125">
              <FaYoutube size={30} className="text-black" />
            </a>
            <a href="#" className="p-2 transition-all duration-300 transform hover:scale-125">
              <FaLinkedin size={30} className="text-black" />
            </a>
            <a href="#" className="p-2 transition-all duration-300 transform hover:scale-125">
              <FaWhatsapp size={30} className="text-black" />
            </a>
            <a href="#" className="p-2 transition-all duration-300 transform hover:scale-125">
              <FaInstagram size={30} className="text-black" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}