"use client";
import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Heading2, RichParagraph } from '../Common/Common'

export default function FAQs({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-4 overflow-hidden antialiased">
      <div className="max-w-3xl mx-auto">

        {/* --- Header --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary !text-hover mb-6">
            <HelpCircle size={28} />
          </div>
          <Heading2 text="Frequently Asked Questions" />
          <div className="w-12 h-1 bg-hover mx-auto rounded-lg mt-6 mb-4"></div>
          <RichParagraph className="">
            Everything you need to know about our custom build process and services.
          </RichParagraph>
        </div>

        {/* --- Accordion --- */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`group border-2 transition-all duration-300 rounded-lg overflow-hidden ${
                  isOpen
                  ? "border-hover bg-secondary/50"
                  : "border-primary/5 bg-white hover:border-hover/30"
                }`}
              >
                {/* Question Area */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center gap-[var(--gap-sm)] p-6 md:p-8 text-left focus:outline-none"
                >
                  <RichParagraph className={`font-bold transition-colors duration-300 ${
                    isOpen ? "text-primary" : "text-primary/80"
                  }`}>
                    {faq.question}
                  </RichParagraph>

                  {/* Icon Toggle */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isOpen
                    ? "bg-hover text-secondary rotate-180"
                    : "bg-secondary text-primary/40 group-hover:bg-hover group-hover:text-secondary"
                  }`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                {/* Answer Area */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-8 md:px-8 md:pb-10">
                    <div className="h-px bg-hover/20 mb-6"></div>
                    <RichParagraph className=" leading-relaxed">
                      {faq.answer}
                    </RichParagraph>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Footer Support --- */}
        <div className="mt-16 text-center p-8 bg-secondary rounded-lg border border-dashed border-primary/20">
          <p className="text-sm text-primary/60 mb-2 font-medium">Still have questions?</p>
          <a
            href="/contact"
            className="!text-hover font-black uppercase tracking-widest text-xs hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            Contact Our Support Team <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}