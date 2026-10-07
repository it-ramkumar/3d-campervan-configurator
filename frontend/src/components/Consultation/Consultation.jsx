"use client";
import React from "react";
import CalendarSection from "./CalendarSection";
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import { Heading1, RichParagraph } from "../Common/Common";

export default function Consultation() {
  return (
    <div className="bg-[#F8F8F6] min-h-screen py-20 flex flex-col items-center space-y-16 relative">
      {/* ===== Header Text ===== */}
      <div className="flex flex-col items-center text-center px-4 space-y-4 max-w-3xl relative z-10">
<RichParagraph variant="sub" textColor="!text-hover" className="uppercase font-bold">
  Connect With Us
</RichParagraph>

        <Heading1 variant="section"
        textColor="text-primary"
          text="Schedule Your Free Consultation Call"
          className=" uppercase "
        />
        <div className="bbv-divider mb-2" />
        <RichParagraph variant="body" >
          Talk with our experts in Big Bear, California, about financing, test
          drives, and personalized upgrades.
        </RichParagraph>
      </div>

      {/* ===== Calendar Section ===== */}
      <div className="w-full max-w-6xl border-t-2 border-hover relative z-10">
        <CalendarSection />
      </div>

      {/* ===== Contact Form Section ===== */}
      <div className="w-full max-w-4xl relative z-10">
        <ContactForm
          leadSource="contact"
        />
      </div>

      {/* ===== Map Section ===== */}
      <div className="w-full max-w-6xl relative z-10">
        <MapSection />
      </div>
    </div>
  );
}
