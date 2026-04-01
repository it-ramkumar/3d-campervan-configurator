"use client";
import React, { useState } from "react";
import CalendarSection from "./CalendarSection";
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import { contact } from "../../api/contact/contact";
import { Heading2, RichParagraph } from '../Common/Common'

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
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return;
    }

    setLoading(true);
    try {
      const result = await contact(formData);
      if (result.success) {
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary min-h-screen py-20 flex flex-col items-center space-y-16">
      {/* ===== Header Text ===== */}
      <div className="flex flex-col items-center text-center px-4 space-y-4 max-w-3xl">
        <RichParagraph className="!text-hover font-bold !text-sm tracking-wider uppercase  mb-2 block">Connect With Us</RichParagraph>
        <Heading2 text="Schedule Your Free Consultation Call" />
        <div className="w-16 h-1 bg-hover rounded-lg"></div>
        <RichParagraph className="">
          Talk with our experts in Big Bear, California, about financing, test drives, and personalized upgrades.
        </RichParagraph>
      </div>

      {/* ===== Calendar Section ===== */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-sm border border-primary/5">
        <CalendarSection />
      </div>

      {/* ===== Contact Form Section ===== */}
      <div className="w-full max-w-4xl">
        <ContactForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {/* ===== Map Section ===== */}
      <div className="w-full max-w-6xl">
        <MapSection />
      </div>
    </div>
  );
}