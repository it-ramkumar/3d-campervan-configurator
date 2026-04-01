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
          <Heading2 text={category.category} textColor="mb-8 flex items-center gap-4" />
            <span className="text-slate-300 text-5xl">0{catIdx + 1}</span>



          <div className="grid gap-6">
            {category.questions.map((faq, qIdx) => {
              const id = `${catIdx}-${qIdx}`;
              const isOpen = openIndex === id;

              return (
                <div
                  key={id}
                  className={`transition-all duration-300 border-b border-slate-200 ${
                    isOpen ? 'pb-6' : 'pb-0'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(id)}
                    className="w-full flex items-start justify-between py-6 text-left group"
                  >
                    <span className={`text-xl font-bold transition-colors pr-8 ${
                      isOpen ? 'text-black' : 'text-slate-600 group-hover:text-black'
                    }`}>
                      {faq.q}
                    </span>
                    <div className={`shrink-0 mt-1 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-primary' : 'text-slate-400'
                    }`}>
                      <ChevronDown size={28} strokeWidth={3} />
                    </div>
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="text-slate-500 text-lg leading-relaxed font-medium pb-4">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* FOOTER CONTACT INFO */}
      <div className="mt-32 pt-16 border-t bg-secondary/80 border-slate-200 grid md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <Heading3 text="Address" className=" uppercase mb-4 tracking-widest" />
          <RichParagraph className=" flex items-center justify-center md:justify-start gap-2">
            <MapPin size={18} /> 320 W Big Bear Blvd, CA
          </RichParagraph>
        </div>
        <div>
          <Heading3 text="Contact" className="f uppercase mb-4 tracking-widest" />
          <RichParagraph className=" flex items-center justify-center md:justify-start gap-2 mb-2">
            <Phone size={18} /> +1-951-441-9719
          </RichParagraph>
          <RichParagraph className=" flex items-center justify-center md:justify-start gap-2">
            <Mail size={18} /> visit.bigbearvans@gmail.com
          </RichParagraph>
        </div>
        <div>
          <Heading3 text="Hours" className=" uppercase mb-4 tracking-widest" />
          <RichParagraph className="flex items-center justify-center md:justify-start gap-2">
            <Clock size={18} /> Mon-Sat: Business Hours
          </RichParagraph>
        </div>
      </div>
    </div>
  );
}