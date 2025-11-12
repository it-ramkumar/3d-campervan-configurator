"use client";
import React, { useEffect, useState } from "react";

export default function BookingPage() {
  const [authUrl, setAuthUrl] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState()

  // ✅ LOCAL DATE FIX - ISO ki jagah local date use karein
  const getTodayDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
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

  // Step 1: Get Google OAuth URL and login status
  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/calendar/auth/url`)
      .then((res) => res.json())
      .then((data) => setAuthUrl(data.url))
      .catch((err) => console.error(err));

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/calendar/status`)
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.loggedIn))
      .catch((err) => console.error(err));
  }, []);

  // Step 2: Redirect to Google login
  const handleLogin = () => {
    window.location.href = authUrl;
  };

  // Step 3: Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 4: Fetch available slots for selected date
  useEffect(() => {
    if (isLoggedIn && selectedDate) {
      fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/calendar/slots?date=${selectedDate}`)
        .then((res) => res.json())
        .then((data) => setSlots(data))
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn, selectedDate]);

  // Step 5: Submit booking
  const handleBooking = async () => {
    if (!selectedSlot) return alert("Please select a time slot.");
    if (!formData.name || !formData.email)
      return alert("Name and Email are required.");

    const bookingData = {
      ...formData,
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
      summary: formData.summary || "Meeting",
      description: formData.description || "",
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/calendar/create-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
alert(data.message);

      if (res.status !== 200) {
        return alert(data.message || "Error creating booking");
      }

      setMeetLink(data.meetLink);
      setBookingStep(5);

      // Remove booked slot from list
      setSlots(slots.map(s => s.start === selectedSlot.start ? { ...s, available: false } : s));
    } catch (err) {
      console.error(err);
      alert("Error creating booking");
    }
  };

  // Copy meeting link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetLink)
      .then(() => alert("Meeting link copied to clipboard!"))
      .catch(err => console.error("Failed to copy: ", err));
  };

  // Reset booking process
  const resetBooking = () => {
    setSelectedSlot(null);
    setSelectedDate(getTodayDate()); // ✅ Local date use karein
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

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // ✅ UPDATED CALENDAR FUNCTION - Local time fix
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const calendar = [];
    const today = getTodayDate(); // Local today date

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      calendar.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      const isToday = dateString === today;
      const isSelected = dateString === selectedDate;
      const isPast = dateString < today; // ✅ Sahi comparison

      calendar.push({
        day,
        date: dateString,
        isToday,
        isSelected,
        isPast
      });
    }

    return calendar;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const handleDateSelect = (date) => {
    if (date.isPast) return;
    setSelectedDate(date.date);
    setBookingStep(2); // Move to time selection after date selection
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // ✅ LOCAL TIME SLOT DISPLAY FIX
  const formatTimeSlot = (slotTime) => {
    // Agar backend se ISO string aati hai toh local time mein convert karein
    const date = new Date(slotTime);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const calendar = generateCalendar();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar - Left Side */}
      <div className="hidden lg:flex lg:w-2/5 bg-black text-white p-8 flex-col justify-between">
        <div>
          {/* Website Logo - Centered */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
              <img src="/logobbv.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Brand Name - Left aligned */}
          <h1 className="text-2xl font-bold mb-12 text-left">Plan your Customvan Build!</h1>

          {/* Contact Info - Left aligned */}
          <div className="space-y-6 text-left">
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-300">Host: +1 (951) 441-9719</p>
            </div>

            <div className="w-16 h-px bg-gray-600"></div>

            <div>
              <p className="text-gray-300 leading-relaxed">
                If you have more queries, contact the host number below.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-gray-400 text-sm text-left mt-12">
          {/* <p>© 2024 Your Company. All rights reserved.</p> */}
        </div>
      </div>

      {/* Main Content - Right Side */}
      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <div className="flex-1 p-6 lg:p-8">
          {!authUrl ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : !isLoggedIn ? (
            <div className="max-w-md mx-auto mt-16">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Booking System</h1>
                <p className="text-gray-600">Please login with Google to continue</p>
              </div>
              <button
                onClick={handleLogin}
                className="bg-white text-gray-900 px-6 py-4 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 w-full font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Login with Google
              </button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Mobile Header */}
              <div className="lg:hidden mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LOGO</span>
                  </div>
                  <h1 className="text-xl font-bold">Your Brand</h1>
                </div>
                <div className="w-12 h-px bg-gray-300"></div>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-between max-w-2xl mx-auto mb-8">
                <div className={`flex flex-col items-center ${bookingStep >= 1 ? 'text-black' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="text-sm mt-1">Date</span>
                </div>
                <div className={`flex flex-col items-center ${bookingStep >= 2 ? 'text-black' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="text-sm mt-1">Time</span>
                </div>
                <div className={`flex flex-col items-center ${bookingStep >= 3 ? 'text-black' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 3 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="text-sm mt-1">Details</span>
                </div>
                <div className={`flex flex-col items-center ${bookingStep >= 4 ? 'text-black' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 4 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                    4
                  </div>
                  <span className="text-sm mt-1">Summary</span>
                </div>
              </div>

              {/* Content */}
              <div>
                {/* Step 1: Date Selection */}
                {bookingStep === 1 && (
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Select a Date</h2>

                    <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-6">
                        <button
                          onClick={() => navigateMonth(-1)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <h3 className="text-lg font-semibold">
                          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </h3>
                        <button
                          onClick={() => navigateMonth(1)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1 mb-3">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                          <div key={day + index} className="text-center text-sm font-medium py-2">
                            {day}
                          </div>
                        ))}

                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {calendar.map((date, index) => (
                          <button
                            key={index}
                            onClick={() => date && handleDateSelect(date)}
                            disabled={!date || date.isPast}
                            className={`
                              h-12 rounded-lg text-sm transition-all font-medium
                              ${!date ? 'invisible' : ''}
                              ${date?.isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                              ${date?.isToday && !date?.isSelected ? 'bg-gray-100 text-gray-900 border border-gray-300' : ''}
                              ${date?.isSelected ? 'bg-black text-white' : ''}
                              ${!date?.isPast && !date?.isSelected && !date?.isToday ? 'hover:bg-gray-50' : ''}
                            `}
                          >
                            {date?.day}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Date Display */}
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 mb-2">Selected Date</p>
                      <p className="text-xl font-semibold">{formatDate(selectedDate)}</p>
                    </div>
                  </div>
                )}

                {/* Step 2: Time Selection */}
                {bookingStep === 2 && (
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Select a Time</h2>
                    <p className="text-gray-600 text-center mb-8">{formatDate(selectedDate)}</p>

                    {slots.length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-500 text-lg">No available slots for selected day.</p>
                        <button
                          onClick={() => setBookingStep(1)}
                          className="mt-4 text-black hover:text-gray-700 font-medium"
                        >
                          Choose another date
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                        {slots.map((slot, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (slot.available) {
                                setSelectedSlot(slot);
                                setBookingStep(3);
                              }
                            }}
                            disabled={!slot.available}
                            className={`p-4 border-2 rounded-lg text-center transition-all font-medium text-lg ${selectedSlot === slot
                                ? "bg-black text-white border-black"
                                : slot.available
                                  ? "bg-white text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                              }`}
                          >
                            {/* ✅ LOCAL TIME FORMAT USE KAREIN */}
                            {formatTimeSlot(slot.start)}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="text-center">
                      <button
                        onClick={() => setBookingStep(1)}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                      >
                        Back to Date Selection
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Details Form */}
                {bookingStep === 3 && (
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Enter Your Details</h2>
                    <p className="text-gray-600 text-center mb-8">
                      {formatDate(selectedDate)} at {selectedSlot && formatTimeSlot(selectedSlot.start)}
                    </p>

                    <div className="space-y-6 mb-8">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Name *</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Phone (optional)</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Meeting Title</label>
                        <input
                          type="text"
                          name="summary"
                          placeholder="What is this meeting about?"
                          value={formData.summary}
                          onChange={handleChange}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Additional Details</label>
                        <textarea
                          name="description"
                          placeholder="Any additional information..."
                          value={formData.description}
                          onChange={handleChange}
                          rows="4"
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setBookingStep(2)}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium flex-1"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setBookingStep(4)}
                        disabled={!formData.name || !formData.email}
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium flex-1"
                      >
                        Continue to Summary
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Summary */}
                {bookingStep === 4 && (
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meeting Summary</h2>

                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-8 mb-8">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-gray-600">Date & Time</span>
                          <span className="font-semibold text-lg text-right">
                            {formatDate(selectedDate)}<br />
                            at {selectedSlot && formatTimeSlot(selectedSlot.start)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-semibold">
                            {selectedSlot && Math.round((new Date(selectedSlot.end) - new Date(selectedSlot.start)) / (1000 * 60))} minutes
                          </span>
                        </div>

                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-gray-600">Name</span>
                          <span className="font-semibold">{formData.name}</span>
                        </div>

                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-gray-600">Email</span>
                          <span className="font-semibold">{formData.email}</span>
                        </div>

                        {formData.phone && (
                          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                            <span className="text-gray-600">Phone</span>
                            <span className="font-semibold">{formData.phone}</span>
                          </div>
                        )}

                        {formData.summary && (
                          <div className="flex justify-between items-start">
                            <span className="text-gray-600">Meeting Title</span>
                            <span className="font-semibold text-right">{formData.summary}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setBookingStep(3)}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium flex-1"
                      >
                        Back to Details
                      </button>
                      <button
                        onClick={handleBooking}
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex-1"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5: Confirmation */}
                {bookingStep === 5 && (
                  <div className="text-center max-w-2xl mx-auto py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-8 text-lg">Your meeting has been scheduled successfully.</p>

                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-8">
                      <p className="text-sm text-gray-600 mb-3">Your Google Meet link:</p>
                      <div className="flex items-center bg-white p-3 rounded border">
                        <p className="text-gray-900 truncate flex-1 text-left font-medium">{meetLink}</p>
                        <button
                          onClick={copyToClipboard}
                          className="ml-3 text-gray-600 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Copy to clipboard"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={resetBooking}
                      className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                      Book Another Meeting
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden border-t border-gray-200 p-6 bg-white">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Need help? Call us at</p>
            <p className="font-semibold">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}