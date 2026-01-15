"use client";
import React, { useState } from "react";
import CalendarSection from "./CalendarSection";
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import Swal from "sweetalert2";
import { contact } from "../../../api/contact/contact";
import Heading2 from "../Common/Headings/Heading2";
import RichParagraph from "../Common/Paragraph/RichParagraph";

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

    // 🔹 Required field validation
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

    // 🔹 Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // 🔹 Phone validation
    if (!/^\d{10,15}$/.test(formData.phone)) {
      Swal.fire({
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number (10–15 digits).",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await contact(formData);

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Your consultation request has been submitted successfully! Please check your email to view your booking details.",
          icon: "success",
          timer: 3000,
          // showConfirmButton: false,
        });


        // 🔹 Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while submitting the form.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
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
    <>


    <div className="bg-white min-h-screen py-8 px-4 md:py-16 md:px-24 flex flex-col items-center space-y-12">
      {/* ===== Header Text ===== */}
      <div className="flex flex-col items-center text-center px-4 space-y-6">

        <Heading2 text="Schedule Your Free Consultation Call" />
        <RichParagraph className="max-w-2xl text-center">Talk with our experts in Big Bear, California, about financing, test drives, and personalized upgrades.
        </RichParagraph>
      </div>

      {/* ===== Calendar Section ===== */}
      <div className="w-full">
        <CalendarSection />
      </div>

      {/* ===== Contact Form Section ===== */}
      <div className="w-full lg:w-6/8 ">
        <ContactForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {/* ===== Map Section ===== */}
      <div className="w-full">
        <MapSection />
      </div>
    </div>
      </>
  );
}
