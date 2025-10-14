"use client";
import React, { useState } from "react";
import CalendarSection from "./CalendarSection";
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import Swal from "sweetalert2";

export default function Consultation({ vanForSale }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(""); // 🕐 added
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

  // ✅ Submit Combined Data (Form + Date + Time)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      let missingFields = [];
      if (!formData.name.trim()) missingFields.push("Name");
      if (!formData.email.trim()) missingFields.push("Email");
      if (!formData.phone.trim()) missingFields.push("Phone");

      Swal.fire({
        title: "Missing Required Fields",
        html: `<p>Please fill in the following required fields:</p>
               <ul style="text-align:left; margin-top:10px;">
                 ${missingFields.map((f) => `<li><b>${f}</b></li>`).join("")}
               </ul>`,
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      Swal.fire({
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number (10–15 digits).",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!time) {
      Swal.fire({
        title: "Select Time",
        text: "Please choose a preferred time for your consultation.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const finalData = {
      ...formData,
      selectedDate: date.toDateString(),
      selectedTime: time,
    };

    const result = await Swal.fire({
      title: "Please Confirm Your Details",
      html: `
        <div style="text-align:left;">
          <p><b>Name:</b> ${finalData.name}</p>
          <p><b>Email:</b> ${finalData.email}</p>
          <p><b>Phone:</b> ${finalData.phone}</p>
          <p><b>Message:</b> ${finalData.message || "N/A"}</p>
          <p><b>Date:</b> ${finalData.selectedDate}</p>
          <p><b>Time:</b> ${finalData.selectedTime}</p>
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
      setTime(""); // reset time
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
      {/* ===== START: UPDATED CONTENT ===== */}
 <h2 className="text-3xl md:text-5xl font-bold font-serif text-black mb-6 leading-tight">
        Ready to Start Your Adventure?
      </h2>

 <div className="w-full max-w-3xl text-left font-serif text-base md:text-lg text-black/70 leading-relaxed mb-10">
 <p className="mb-4">We're here to guide you through every step. Let's find the perfect path for you.</p>
        <ul className="space-y-2">
          <li><strong>Discuss Your Vision:</strong> Schedule a personal consultation to explore financing, custom upgrades, and transparent pricing.</li>
          <li><strong>Schedule a Test Drive:</strong> Get behind the wheel to experience the craftsmanship and performance firsthand.</li>
          <li><strong>Ask Our Experts:</strong> Have a specific question? Send us an email for a prompt and detailed response.</li>
        </ul>
 </div>
      {/* ===== END: UPDATED CONTENT ===== */}
 </>
)}
        <h3 className="text-2xl md:text-[28px] font-semibold font-serif text-black mb-3">
          Schedule a Free Consultation Call Today
        </h3>
        <p className="max-w-2xl text-black/70 font-serif text-lg md:text-xl">
          Talk with our experts in Big Bear, California, about financing, test drives, and personalized upgrades.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <CalendarSection date={date} setDate={setDate} time={time} setTime={setTime} />
          </div>
        </div>

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

      <div className="mt-16">
        <MapSection />
      </div>
    </div>
  );
}
