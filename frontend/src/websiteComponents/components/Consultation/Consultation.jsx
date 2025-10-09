"use client";
import React, { useState } from "react";
import CalendarSection from "./CalendarSection";
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import Swal from "sweetalert2";
import { contact } from "../../../api/contact/contact";

export default function Consultation({vanForSale}) {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit Combined Data (Form + Date)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      selectedDate: date.toDateString(),
    };

    const result = await Swal.fire({
      title: "Please Confirm Your Details",
      html: `
        <div style="text-align:left;">
          <p><b>Name:</b> ${finalData.name || "N/A"}</p>
          <p><b>Email:</b> ${finalData.email || "N/A"}</p>
          <p><b>Phone:</b> ${finalData.phone || "N/A"}</p>
          <p><b>Message:</b> ${finalData.message || "N/A"}</p>
          <p><b>Selected Date:</b> ${finalData.selectedDate}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      Swal.fire({
        title: "Cancelled",
        text: "You can review your details before submitting.",
        icon: "info",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setLoading(true);
    try {
      // await contact(finalData);
      Swal.fire({
        title: "Success!",
        text: "Your consultation request has been submitted successfully!",
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while submitting the form.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-8 px-4 md:py-16 md:px-24">
      <div className="flex flex-col items-center text-center mb-12 md:mb-16 px-4">
  {vanForSale && (
    <>
      <h2 className="text-3xl md:text-5xl font-bold font-serif text-black mb-6 leading-tight">
        Ready to Buy Your Van for Sale?
      </h2>

      <div className="w-full max-w-3xl text-left font-serif text-base md:text-lg text-black/70 leading-relaxed mb-10">
        <p className="font-semibold text-black">Still have questions? We’re here to help:</p>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li>Confused about cost? Book a FREE Consultation Call.</li>
          <li>Want to drive it first? Schedule a test drive.</li>
          <li>Have a question? Send us an Email.</li>
        </ul>
      </div>
    </>
  )}

  <h3 className="text-2xl md:text-[28px] font-semibold font-serif text-black mb-3">
    Schedule a Free Consultation Call Today
  </h3>
  <p className="max-w-2xl text-black/70 font-serif text-lg md:text-xl">
    Talk with our experts in Big Bear, California, about financing, test drives, and personalized upgrades.
  </p>
</div>



      {/* ✅ Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* 🗓 Calendar Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <CalendarSection date={date} setDate={setDate} />
          </div>
        </div>

        {/* 📞 Contact Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <ContactForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              selectedDate={date}
            />
          </div>
        </div>
      </div>

      {/* 🗺 Map Section */}
      <div className="mt-16">
        <MapSection />
      </div>
    </div>
  );
}
