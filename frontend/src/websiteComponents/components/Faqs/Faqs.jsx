"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import RichParagraph from "../Common/Paragraph/RichParagraph";
import Heading2 from "../Common/Headings/Heading2";
import Heading4 from "../Common/Headings/Heading4";


export default function FAQs({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100  py-12 mt-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* FAQ Section Heading */}
        <div className="text-center mb-8">
          <Heading2 text="FAQs"/>

        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-black text-white rounded-lg p-3 relative overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-lg"
            >
              {/* Left Border */}
              <div className="absolute top-0 left-0 w-2 h-full bg-[#2761FD]"></div>

              {/* Question + Toggle */}
              <div
                className="flex justify-between items-start cursor-pointer py-1"
                onClick={() => handleToggle(index)}
              >
                <RichParagraph white={true}>
                  {faq.question}
                </RichParagraph>
                <div className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-black border border-[#2761FD]">
                  {openIndex === index ? (
                    <FaMinus className="text-[#2761FD] text-sm md:text-lg" />
                  ) : (
                    <FaPlus className="text-[#2761FD] text-sm md:text-lg" />
                  )}
                </div>
              </div>

              {/* Answer */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100 mt-2"
                    : "max-h-0 opacity-0 mt-0"
                }`}
              >
                <RichParagraph white={true}>
                  {faq.answer}
                </RichParagraph>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
