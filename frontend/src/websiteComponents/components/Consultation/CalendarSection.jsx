"use client";
import React from "react";
import { InlineWidget } from "react-calendly";

export default function CalendarSection() {
  return (
 <div className="w-full px-6 bg-gray-100 shadow-lg">
  <div className="flex flex-col lg:flex-row items-start">
    {/* ====== Left Side: Text ====== */}
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-between h-[90vh] text-left mb-8 lg:mb-0  p-4">
    <div className="pt-10">
      <img src="/logobbv.jpg" alt="contact logo" className="w-40 h-40 rounded-full"/>
    </div>
    <div className="pb-10">
    <h2 className="font-serif font-bold text-2xl md:text-3xl text-black mb-2 md:4/6">
        Plan your Customvan Build!
      </h2>
      <p className="text-gray-700 mb-2">
        If you have more queries, contact the host number below.
      </p>
      <p className="text-blue-600 font-semibold">
        Host: +1 (951) 441-9719
      </p>
    </div>

    </div>

    {/* ====== Right Side: Calendly Widget ====== */}
    <div className="w-full lg:w-1/2 rounded-xl shadow-lg overflow-hidden  p-4">
     <InlineWidget url="https://calendly.com/zainikram704/30min" styles={{ height: "440px", minWidth: "220px", backgroundColor: "#000", color: "#fff", }} pageSettings={{ primaryColor: "0e0f0f", textColor: "fffff", backgroundColor: "dedede", }} />
    </div>
  </div>
</div>

  );
}
