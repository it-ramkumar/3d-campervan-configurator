"use client";
import React, { useEffect, useState } from "react";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import Link from "next/link";
import PrimaryButton from "../Common/Button/PrimaryButton"
import { Heading4, Heading3, RichParagraph } from '../Common/Common'
import Image from "next/image";

export default function BookingPage() {
  const [authUrl, setAuthUrl] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState();
  const [submitting, setSubmitting] = useState(false);

  // Your existing functions remain the same...
  // ✅ FIXED: Get tomorrow's date instead of today
  const getTomorrowDate = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Add 1 day
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: userTimeZone };
    const dateParts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
    const year = dateParts.find(p => p.type === 'year').value;
    const month = dateParts.find(p => p.type === 'month').value;
    const day = dateParts.find(p => p.type === 'day').value;
    return `${year}-${month}-${day}`;
  };

  // ✅ Update default state to tomorrow
  const [selectedDate, setSelectedDate] = useState(getTomorrowDate());
  const [bookingStep, setBookingStep] = useState(1);
  const [meetLink, setMeetLink] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    description: "",
  });

  // All your existing useEffect and handler functions...
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/calendar/auth/url`)
      .then((res) => res.json())
      .then((data) => setAuthUrl(data.url)).catch((err) => console.error("Error fetching Auth URL:", err));

    fetch(`${process.env.NEXT_PUBLIC_URL}/calendar/status`)
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.loggedIn)).catch((err) => console.error("Error fetching Status:", err));
  }, []);

  const handleLogin = () => {
    window.location.href = authUrl;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatTimeSlot = (slotTime) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(slotTime);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: userTimeZone
    });
  };

  useEffect(() => {
    if (isLoggedIn && selectedDate) {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      fetch(`${process.env.NEXT_PUBLIC_URL}/calendar/slots?date=${selectedDate}&timezone=${encodeURIComponent(userTimeZone)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error("Backend Error fetching slots:", data.error);
            setSlots([]);
          } else {
            setSlots(data);
          }
        })
        .catch((err) => {
          console.error("Network error fetching slots:", err);
          setSlots([]);
        });
    }
  }, [isLoggedIn, selectedDate]);

  const handleBooking = async () => {
    if (!selectedSlot) return alert("Please select a time slot.");
    if (!formData.name || !formData.email)
      return alert("Name and Email are required.");

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    const bookingData = {
      ...formData,
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
      timezone: userTimezone,
      summary: formData.summary || "Meeting",
      description: formData.description || "",
    };


    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/calendar/create-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Backend error:", data);
        alert(data.message || `Error: ${res.status}`);
        setSubmitting(false);
        return;
      }

      setMeetLink(data.meetLink);
      setBookingStep(5);
      setSlots(slots.map(s => s.start === selectedSlot.start ? { ...s, available: false } : s));
      setSubmitting(false);

    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error - check console");
      setSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetLink)
      .then(() => alert("Meeting link copied to clipboard!"))
      .catch(err => console.error("Failed to copy: ", err));
  };

  const resetBooking = () => {
    setSelectedSlot(null);
    setSelectedDate(getTomorrowDate());
    setFormData({
      name: "",
      email: "",
      phone: "",
      summary: "",
      description: "",
    });
    setBookingStep(1);
    setMeetLink("");
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const calendar = [];
    const todayString = getTomorrowDate();

    for (let i = 0; i < firstDay; i++) {
      calendar.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateString = date.toLocaleDateString('en-CA', {
        timeZone: userTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      const isToday = dateString === todayString;
      const isSelected = dateString === selectedDate;
      const isPast = dateString < todayString;
      const isSunday = date.getDay() === 0;

      calendar.push({
        day,
        date: dateString,
        isToday,
        isSelected,
        isPast,
        isSunday
      });
    }

    return calendar;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const handleDateSelect = (date) => {
    if (date.isPast || date.isSunday) return;
    setSelectedDate(date.date);
    setSelectedSlot(null);
    setBookingStep(2);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: userTimeZone
    });
  };

  const calendar = generateCalendar();
  const days = [
    { id: 1, label: 'Sun' },
    { id: 2, label: 'Mon' },
    { id: 3, label: 'Tue' },
    { id: 4, label: 'Wed' },
    { id: 5, label: 'Thu' },
    { id: 6, label: 'Fri' },
    { id: 7, label: 'Sat' }
  ];

  return (
    <div className="flex bg-[#F5F5F0] min-h-screen justify-center items-center p-4">
      {/* Main Container */}
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden min-h-[700px] border border-[#001F3D]/5">

        {/* Sidebar: Navy Theme */}
        <div className="hidden lg:flex lg:w-1/3 bg-[#001F3D] text-white p-10 flex-col justify-between relative">
          <div>


            <Heading3 text="Consultation Call" textColor="text-white" className="mb-8" />

            {/* Step Indicators */}
            <div className="space-y-6 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10"></div>
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-4 relative z-10">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-500 ${bookingStep >= s ? 'bg-[#ED985F] text-[#001F3D]' : 'bg-white/10 text-white/30'}`}>
                    {s}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${bookingStep >= s ? 'text-white' : 'text-white/30'}`}>
                    {s === 1 ? 'Date' : s === 2 ? 'Time' : s === 3 ? 'Details' : 'Review'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#ED985F] mb-1">Support Line</p>
            <p className="text-sm font-medium">+1 (951) 441-9719</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-white">
          {!isLoggedIn ? (
            <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in fade-in zoom-in-95">
              <div className="text-center">
                <Heading3 text="Welcome Back" />
                <RichParagraph>Please sign in with Google to manage your bookings.</RichParagraph>
              </div>
              <button
                onClick={handleLogin}
                className="flex items-center gap-4 px-8 py-4 bg-[#F5F5F0] border border-[#001F3D]/10 rounded-lg font-bold hover:bg-[#ED985F] hover:text-white transition-all shadow-sm"
              >
                <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" alt="google" width={20} height={20} />
                Continue with Google
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto">

              {/* Step 1: Date Selection */}
              {bookingStep === 1 && (
                <div className="animate-in slide-in-from-right-4 duration-500">
                  <header className="text-center mb-8">
                    <span className="text-[#ED985F] font-bold text-[10px] uppercase tracking-widest">Schedule</span>
                    <Heading4 text="Select a Date" />
                  </header>

                  <div className="bg-[#F5F5F0]/50 p-6 rounded-lg border border-[#001F3D]/5">
                    <div className="flex justify-between items-center mb-6">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-white rounded-lg transition-all text-[#001F3D] hover:text-[#ED985F]"
                      >
                        ←
                      </button>
                      <h3 className="font-bold text-sm uppercase tracking-widest text-[#001F3D]">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </h3>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-white rounded-lg transition-all text-[#001F3D] hover:text-[#ED985F]"
                      >
                        →
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {days.map(d => (
                        <div key={d.id} className="text-center text-[10px] font-bold text-[#001F3D]/30 py-2">
                          {d.label}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {calendar.map((d, i) => (
                        <button
                          key={i}
                          onClick={() => d && handleDateSelect(d)}
                          disabled={!d || d.isPast || d.isSunday}
                          className={`h-10 rounded-lg text-xs font-bold transition-all ${!d
                              ? 'invisible'
                              : d.isSelected
                                ? 'bg-[#001F3D] text-white shadow-lg'
                                : d.isPast || d.isSunday
                                  ? 'text-gray-300 cursor-not-allowed bg-gray-50'
                                  : d.isToday
                                    ? 'bg-[#ED985F]/20 text-[#ED985F] hover:bg-[#ED985F] hover:text-white'
                                    : 'hover:bg-[#ED985F] hover:text-white text-[#001F3D] bg-white'
                            }`}
                        >
                          {d?.day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Time Selection */}
              {bookingStep === 2 && (
                <div className="animate-in slide-in-from-right-4">
                  <header className="text-center mb-8">
                    <span className="text-[#ED985F] font-bold text-[10px] uppercase tracking-widest">Time</span>
                    <Heading4 text="Available Slots" />
                    <p className="text-xs font-bold text-[#001F3D]/60 mt-2">{formatDate(selectedDate)}</p>
                  </header>

                  {slots.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-[#F5F5F0] rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[#001F3D]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-[#001F3D]/60 mb-4">No slots available for this date</p>
                      <button
                        onClick={() => setBookingStep(1)}
                        className="text-[#ED985F] font-bold text-xs uppercase tracking-widest hover:underline"
                      >
                        Choose Different Date
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {slots.filter(s => s.available !== false).map((s, i) => (
                          <button
                            key={i}
                            onClick={() => { setSelectedSlot(s); setBookingStep(3) }}
                            className={`p-4 border rounded-lg font-bold text-xs transition-all ${selectedSlot?.start === s.start
                                ? 'border-[#ED985F] bg-[#ED985F]/10 text-[#ED985F]'
                                : 'border-[#001F3D]/10 hover:border-[#ED985F] hover:text-[#ED985F] bg-[#F5F5F0]/30 text-[#001F3D]'
                              }`}
                          >
                            {formatTimeSlot(s.start)}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setBookingStep(1)}
                        className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/40 hover:text-[#001F3D] transition-colors"
                      >
                        Change Date
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Step 3: Form */}
              {bookingStep === 3 && (
                <div className="animate-in slide-in-from-right-4 space-y-6">
                  <header className="text-center mb-8">
                    <span className="text-[#ED985F] font-bold text-[10px] uppercase tracking-widest">Details</span>
                    <Heading4 text="Meeting Information" />
                  </header>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60 ml-1 mb-2 block">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full p-4 bg-[#F5F5F0] rounded-lg border border-transparent focus:border-[#ED985F] outline-none text-sm font-medium placeholder-[#001F3D]/30"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60 ml-1 mb-2 block">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full p-4 bg-[#F5F5F0] rounded-lg border border-transparent focus:border-[#ED985F] outline-none text-sm font-medium placeholder-[#001F3D]/30"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60 ml-1 mb-2 block">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full p-4 bg-[#F5F5F0] rounded-lg border border-transparent focus:border-[#ED985F] outline-none text-sm font-medium placeholder-[#001F3D]/30"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60 ml-1 mb-2 block">
                        Meeting Topic
                      </label>
                      <input
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="Brief topic or purpose of meeting"
                        className="w-full p-4 bg-[#F5F5F0] rounded-lg border border-transparent focus:border-[#ED985F] outline-none text-sm font-medium placeholder-[#001F3D]/30"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60 ml-1 mb-2 block">
                        Additional Notes
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Any specific topics or questions you'd like to discuss..."
                        className="w-full p-4 bg-[#F5F5F0] rounded-lg border border-transparent focus:border-[#ED985F] outline-none text-sm font-medium placeholder-[#001F3D]/30 resize-none"
                        rows="3"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setBookingStep(2)}
                      className="flex-1 py-4 rounded-lg bg-[#F5F5F0] text-[10px] font-bold uppercase tracking-widest text-[#001F3D] hover:bg-[#001F3D]/5 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setBookingStep(4)}
                      disabled={!formData.name || !formData.email}
                      className="flex-1 py-4 rounded-lg bg-[#001F3D] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#ED985F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Review Booking
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Summary */}
              {bookingStep === 4 && (
                <div className="animate-in zoom-in-95 space-y-6">
                  <header className="text-center mb-8">
                    <span className="text-[#ED985F] font-bold text-[10px] uppercase tracking-widest">Review</span>
                    <Heading4 text="Confirm Details" />
                  </header>

                  <div className="bg-[#F5F5F0] rounded-lg p-6 border border-[#001F3D]/5 space-y-4">
                    <div className="flex justify-between items-center border-b border-[#001F3D]/10 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60">Date</span>
                      <span className="text-sm font-bold text-[#001F3D]">{formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#001F3D]/10 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60">Time</span>
                      <span className="text-sm font-bold text-[#001F3D]">
                        {selectedSlot && formatTimeSlot(selectedSlot.start)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#001F3D]/10 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60">Name</span>
                      <span className="text-sm font-bold text-[#001F3D]">{formData.name}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#001F3D]/10 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60">Email</span>
                      <span className="text-sm font-bold text-[#001F3D]">{formData.email}</span>
                    </div>
                    {formData.phone && (
                      <div className="flex justify-between items-center border-b border-[#001F3D]/10 pb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60">Phone</span>
                        <span className="text-sm font-bold text-[#001F3D]">{formData.phone}</span>
                      </div>
                    )}
                    {formData.summary && (
                      <div className="border-b border-[#001F3D]/10 pb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60 block mb-2">Topic</span>
                        <span className="text-sm text-[#001F3D]">{formData.summary}</span>
                      </div>
                    )}
                    {formData.description && (
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60 block mb-2">Notes</span>
                        <span className="text-sm text-[#001F3D]">{formData.description}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setBookingStep(3)}
                      className="flex-1 py-4 rounded-lg bg-[#F5F5F0] text-[10px] font-bold uppercase tracking-widest text-[#001F3D] hover:bg-[#001F3D]/5 transition-colors"
                    >
                      Edit Details
                    </button>
                    <button
                      onClick={handleBooking}
                      disabled={submitting}
                      className="flex-1 py-4 rounded-lg bg-[#ED985F] text-white text-[10px] font-bold uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Booking..." : "Confirm & Schedule"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Success */}
              {bookingStep === 5 && (
                <div className="text-center py-12 animate-in fade-in zoom-in">
                  <div className="w-20 h-20 bg-[#ED985F]/10 text-[#ED985F] rounded-lg flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <Heading3 text="Booking Confirmed!" />
                  <p className="text-sm text-[#001F3D]/60 mb-8 max-w-sm mx-auto">
                    Your consultation is confirmed. Check your email for calendar invite and meeting details.
                  </p>

                  {meetLink && (
                    <div className="p-4 bg-[#F5F5F0] rounded-lg border border-[#001F3D]/5 flex items-center justify-between gap-4 mb-8">
                      <span className="text-[10px] font-mono truncate text-[#001F3D]/60 flex-1 text-left">
                        {meetLink}
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="text-[#ED985F] font-bold text-[10px] uppercase tracking-widest hover:underline whitespace-nowrap"
                      >
                        Copy Link
                      </button>
                    </div>
                  )}

                  <div className="space-y-3">
                    <PrimaryButton
                      label="Schedule Another Meeting"
                      onClick={resetBooking}
                      className="w-full"
                    />
                    <Link
                      href="/"
                      className="block w-full py-3 text-[10px] font-bold uppercase tracking-widest text-[#001F3D]/60 hover:text-[#001F3D] transition-colors"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}