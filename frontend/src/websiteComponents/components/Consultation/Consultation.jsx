"use client";
import React, { useState } from "react";
import CalendarSection from "./CalendarSection";
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import Swal from "sweetalert2";
import { contact } from "../../../api/contact/contact";

export default function Consultation() {
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

    // 🟡 Step 1: Confirmation before sending
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

    // 🟢 Step 2: If confirmed, send data
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

      // Optional: Reset form
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
      <h2 className="text-4xl font-bold font-serif text-black text-center mb-12">
        Schedule a Free Consultation Call
      </h2>

      <div className="flex flex-col lg:flex-row justify-between">
        {/* 🗓 Calendar Section */}
        <CalendarSection date={date} setDate={setDate} />

        <div className="mx-8 hidden lg:block w-[3px] bg-gray-200"></div>

        {/* 📞 Contact Form */}
        <ContactForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          selectedDate={date}
        />
      </div>

      <div className="mt-16">
        <MapSection />
      </div>
    </div>
  );
}
