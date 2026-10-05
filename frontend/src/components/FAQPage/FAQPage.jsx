"use client";
import React, { useState } from 'react';
import { ChevronDown, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { Heading2, Heading1, RichParagraph } from '../Common/Common';

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
            <RichParagraph variant='section' textColor='text-primary/80' className="font-bold !text-2xl !text-hover">
              0{catIdx + 1}
            </RichParagraph>

            <Heading1
              variant="section "
              text={category.category}
              className=" !text-primary uppercase "
            />
          </div>

          <div className="grid gap-4">
            {category.questions.map((faq, qIdx) => {
              const id = `${catIdx}-${qIdx}`;
              const isOpen = openIndex === id;

              return (
                <div
                  key={id}
                  className={`bbv-card rounded-lg overflow-hidden transition-all duration-300 border ${isOpen
                      ? 'border-hover/50'
                      : 'border-primary/10 hover:border-primary/20'
                    }`}
                >
                  <button
                    onClick={() => toggleFAQ(id)}
                    className="w-full flex items-start justify-between py-6 px-6 text-left group"
                  >
                    <RichParagraph className={`font-bold transition-colors pr-8 ${isOpen ? 'text-hover' : 'text-primary group-hover:text-hover'
                      }`}>
                      {faq.q}
                    </RichParagraph>

                    <div className={`shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180 text-hover' : 'text-primary/40'
                      }`}>
                      <ChevronDown size={24} strokeWidth={2.5} />
                    </div>
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="px-6 pb-6">
                      <div className="h-px bg-hover/20 mb-4"></div>
                      <RichParagraph variant='body'>
                        {faq.a}
                      </RichParagraph>

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
          <RichParagraph>
Address
          </RichParagraph>
          <div className="bbv-divider mb-4" />

          <RichParagraph variant='sub' className="flex items-center justify-center md:justify-start gap-2">
            <MapPin size={16} className="text-hover shrink-0" /> 320 W Big Bear Blvd, Big Bear, CA 92314
          </RichParagraph>
        </div>
        <div>
          <RichParagraph>
Contact
          </RichParagraph>
          <div className="bbv-divider mb-4" />
          <RichParagraph variant='sub' className="text-primary/60 flex items-center justify-center md:justify-start gap-2 mb-2">
            <Phone size={16} className="text-hover shrink-0" /> +1-951-441-9719
          </RichParagraph>
          <RichParagraph variant='sub' className="text-primary/60 flex items-center justify-center md:justify-start gap-2">
            <Mail size={16} className="text-hover shrink-0" /> visit.bigbearvans@gmail.com
          </RichParagraph>
        </div>
        <div>
          <RichParagraph>
Hours
          </RichParagraph>
          <div className="bbv-divider mb-4" />
          <RichParagraph variant='sub' className="text-primary/60 flex items-center justify-center md:justify-start gap-2">
            <Clock size={16} className="text-hover shrink-0" /> Mon-Sat: Business Hours
          </RichParagraph>
        </div>
      </div>
    </div>
  );
}
