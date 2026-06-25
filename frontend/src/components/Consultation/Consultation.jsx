"use client";
import React, { useState } from "react";
import CalendarSection from "./CalendarSection";
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import { contact } from "../../api/contact/contact";
import { Heading2, RichParagraph } from "../Common/Common";

export default function Consultation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // alert("HANDLE SUBMIT RUNNING");
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      return;
    }

    setLoading(true);
    try {
      console.log("FORM SUBMIT STARTED");
      const result = await contact(formData);
      // console.log("CONTACT RESULT:", result); // TEMPORARY TEST
      if (typeof window !== "undefined" && window.fbq) {
        console.log("META PIXEL FIRED");
        window.fbq("track", "Lead", { source: "consultation" });
        // console.log("META PIXEL FIRED SUCCESS");
      }
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F8F6] min-h-screen py-20 flex flex-col items-center space-y-16 relative">
      {/* ===== Header Text ===== */}
      <div className="flex flex-col items-center text-center px-4 space-y-4 max-w-3xl relative z-10">
        <span className="text-hover text-xs uppercase tracking-widest font-bold mb-3">
          Connect With Us
        </span>
        <Heading2
          text="Schedule Your Free Consultation Call"
          className="font-display uppercase tracking-wide"
        />
        <div className="bbv-divider mb-2" />
        <RichParagraph className="!text-primary/70">
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
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {/* ===== Map Section ===== */}
      <div className="w-full max-w-6xl relative z-10">
        <MapSection />
      </div>
    </div>
  );
}
