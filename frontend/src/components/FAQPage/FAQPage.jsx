"use client";
import React, { useState } from 'react';
import { ChevronDown, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { Heading2, Heading3, RichParagraph } from '../Common/Common';

export default function FAQClient({ faqData }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      {faqData.map((category, catIdx) => (
        <div key={catIdx} className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-display text-primary/10 text-5xl font-bold">
              0{catIdx + 1}
            </span>
            <Heading2
              text={category.category}
              className="font-display text-primary uppercase tracking-wide"
            />
          </div>

          <div className="grid gap-4">
            {category.questions.map((faq, qIdx) => {
              const id = `${catIdx}-${qIdx}`;
              const isOpen = openIndex === id;

              return (
                <div
                  key={id}
                  className={`bbv-card rounded-lg overflow-hidden transition-all duration-300 border ${
                    isOpen
                      ? 'border-hover/50'
                      : 'border-primary/10 hover:border-primary/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(id)}
                    className="w-full flex items-start justify-between py-6 px-6 text-left group"
                  >
                    <span className={`text-lg font-bold transition-colors pr-8 ${
                      isOpen ? 'text-hover' : 'text-primary group-hover:text-hover'
                    }`}>
                      {faq.q}
                    </span>
                    <div className={`shrink-0 mt-1 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-hover' : 'text-primary/40'
                    }`}>
                      <ChevronDown size={24} strokeWidth={2.5} />
                    </div>
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6">
                      <div className="h-px bg-hover/20 mb-4"></div>
                      <p className="text-primary/60 text-base leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* FOOTER CONTACT INFO */}
      <div className="mt-32 pt-16 border-t border-primary/10 grid md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-4">Address</p>
          <div className="bbv-divider mb-4" />
          <RichParagraph className="text-primary/60 flex items-center justify-center md:justify-start gap-2">
            <MapPin size={16} className="text-hover shrink-0" /> 320 W Big Bear Blvd, CA
          </RichParagraph>
        </div>
        <div>
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-4">Contact</p>
          <div className="bbv-divider mb-4" />
          <RichParagraph className="text-primary/60 flex items-center justify-center md:justify-start gap-2 mb-2">
            <Phone size={16} className="text-hover shrink-0" /> +1-951-441-9719
          </RichParagraph>
          <RichParagraph className="text-primary/60 flex items-center justify-center md:justify-start gap-2">
            <Mail size={16} className="text-hover shrink-0" /> visit.bigbearvans@gmail.com
          </RichParagraph>
        </div>
        <div>
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-4">Hours</p>
          <div className="bbv-divider mb-4" />
          <RichParagraph className="text-primary/60 flex items-center justify-center md:justify-start gap-2">
            <Clock size={16} className="text-hover shrink-0" /> Mon-Sat: Business Hours
          </RichParagraph>
        </div>
      </div>
    </div>
  );
}
