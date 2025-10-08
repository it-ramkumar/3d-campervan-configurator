"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaTwitter, FaYoutube, FaLinkedin, FaWhatsapp, FaInstagram, FaPlus, FaMinus } from "react-icons/fa";
import { gsap } from "gsap";
import {Link} from "react-router-dom";

const faqs = [
  {
    question: "What Van Models Do You Customise at Big Bear Vans?",
    answer:
      "At Big Bear Vans, we mainly customise Mercedes-Benz Sprinter, RAM ProMaster, and Ford Transit vans.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes, financing is available for already-built vans through partners like Trident Funding (RV loans) or ADU Loans (using real estate). Many clients also finance a new Sprinter van through Mercedes and pay cash for the conversion. Alternatively, our partner dealership can provide full financing for both a new van and the custom build in a single auto loan.",
  },
  {
    question: "How Long Does It Take to Build a Custom Van?",
    answer:
      "It depends on various factors like your requirements, our availability, etc. Usually, it takes us about 4 to 5 months to design and build a conversion van.",
  },
  {
    question: "Do you offer a warranty on your van conversions?",
    answer:
      "Yes, all our van conversions come with a 1-year warranty against workmanship defects, starting from the pickup date. Moreover, we also offer a 3-year extended warranty on our craftsmanship. Please note that while Big Bear Vans warrants its services, this warranty does not cover third-party products themselves.",
  },
  {
    question: "Do I need to own a van, or can you source one for my conversion?",
    answer:
      "We can do both. At Big Bear Vans, we can convert your existing campervan or source a new Class B RV for you, often with discounts of up to $8,000 off MSRP.",
  },
];

export default function FAQs() {
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
    <div ref={sectionRef} className="bg-white pt-2 pb-16 px-4 md:px-8">
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
              ref={el => faqItemsRef.current[index] = el}
              className="bg-black text-white rounded-lg p-3 relative overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-lg"
            >
              {/* Left Border */}
              <div className="absolute top-0 left-0 w-2 h-full bg-[#2761FD]"></div>

              {/* Question and Toggle Button */}
              <div
                className="flex justify-between items-start cursor-pointer py-1"
                onClick={() => handleToggle(index)}
              >
                <h3 className="sm:text-base text-sm font-semibold font-serif leading-snug pr-4 text-white">
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
                <p className="text-gray-300 pr-4 sm:text-base text-sm">
                  {faq.answer}
                </p>
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
            <Link to="https://x.com/bigbearvans_" className="p-2 transition-all duration-300 transform hover:scale-125">
              <FaTwitter size={30} className="text-black" />
            </Link>
            <Link to="https://www.youtube.com/channel/UCQFzU9eB7Aa8x_E9ov1hD7w" className="p-2 transition-all duration-300 transform hover:scale-125">
              <FaYoutube size={30} className="text-black" />
            </Link>
            <Link to="https://www.linkedin.com/company/big-bear-vans" className="p-2 transition-all duration-300 transform hover:scale-125">
              <FaLinkedin size={30} className="text-black" />
            </Link>
            {/* <Link to="#" className="p-2 transition-all duration-300 transform hover:scale-125">
              <FaWhatsapp size={30} className="text-black" />
            </Link> */}
            <Link to="https://www.instagram.com/bigbearvans/?hl=en" className="p-2 transition-all duration-300 transform hover:scale-125">
              <FaInstagram size={30} className="text-black" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}