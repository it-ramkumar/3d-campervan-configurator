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
    <section className="bbv-section-light-alt relative overflow-hidden py-20 px-4 antialiased">
      <div className="bbv-dot-grid-light" />
      <div className="max-w-3xl mx-auto relative z-10">

        {/* --- Header --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-hover/10 border border-hover/30 text-hover mb-6">
            <HelpCircle size={24} />
          </div>
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Support</p>
          <Heading2
            text="Frequently Asked Questions"
            className="font-display text-primary uppercase tracking-wide"
          />
          <div className="bbv-divider mb-6" />
          <RichParagraph className="text-primary/60">
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
                className={`group bbv-card rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  isOpen
                  ? "border-hover/50"
                  : "border-primary/10 hover:border-primary/20"
                }`}
              >
                {/* Question Area */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center gap-4 p-6 md:p-8 text-left focus:outline-none"
                >
                  <RichParagraph className={`font-bold transition-colors duration-300 ${
                    isOpen ? "text-hover" : "text-primary group-hover:text-hover"
                  }`}>
                    {faq.question}
                  </RichParagraph>

                  {/* Icon Toggle */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isOpen
                    ? "bg-hover text-primary"
                    : "bg-primary/10 text-primary/40 group-hover:bg-hover/20 group-hover:text-hover"
                  }`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
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
                    <RichParagraph className="text-primary/60 leading-relaxed">
                      {faq.answer}
                    </RichParagraph>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Footer Support --- */}
        <div className="mt-16 text-center p-8 bbv-card rounded-lg border border-dashed border-primary/20">
          <p className="text-sm text-primary/60 mb-2 font-medium">Still have questions?</p>
          <a
            href="/contact"
            className="text-hover font-black uppercase tracking-widest text-xs hover:text-secondary transition-colors flex items-center justify-center gap-2"
          >
            Contact Our Support Team <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
