"use client";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarSection({ date, setDate, time, setTime }) {
  // 🕒 Common time slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM",
    "03:00 PM", "04:00 PM", "05:00 PM",
  ];

  return (
    <div className="w-full lg:w-2/2 px-6">
      {/* ====== Header Section ====== */}
      <div className="flex flex-col items-center text-center mb-4">
        <h2 className="font-serif font-bold text-2xl md:text-3xl text-black">
          Plan your Customvan Build!
        </h2>
        <p className="text-gray-700 mt-1">
          If you have more queries, contact the host number below.
        </p>
        <p className="text-blue-600 font-semibold mt-1">
          Host : +1 (951) 441-9719
        </p>
      </div>

      {/* ====== Calendar Box ====== */}
      <div
        className="w-full rounded-[30px] p-4 md:p-8 flex flex-col items-center bg-white/10"
        style={{
          backdropFilter: "blur(15px)",
          boxShadow: "5px 8px 12px rgba(0,0,0,0.25)",
        }}
      >
        <div className="w-full bg-white text-black rounded-xl p-4 shadow-lg">
          <Calendar
            onChange={setDate}
            value={date}
            className="rounded-lg w-full"
          />
        </div>

        <p className="text-black mt-2 font-medium">
          Selected Date:{" "}
          <span className="font-bold text-blue-600">{date.toDateString()}</span>
        </p>

        {/* 🕐 Time Selection Dropdown */}
        <div className="mt-4 w-full">
          <label className="block text-black font-medium mb-2">
            Select Time:
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-black"
          >
            <option value="">-- Choose a Time --</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
