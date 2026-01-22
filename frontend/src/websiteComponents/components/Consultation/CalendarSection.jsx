"use client";
import React, { useEffect, useState } from "react";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import { Link } from "react-router-dom";
import BlackButton from "../Common/Button/BlackButton";
import WhiteButton from "../Common/Button/WhiteButton"
import Heading3 from "../Common/Headings/Heading3";
import RichParagraph from "../Common/Paragraph/RichParagraph";
import Heading2 from "../Common/Headings/Heading2";
import Heading4 from "../Common/Headings/Heading4";

export default function BookingPage() {
  const [authUrl, setAuthUrl] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState();
  const [submitting, setSubmitting] = useState(false);
  // ✅ FIX: Hamesha user ke local date ko YYYY-MM-DD format mein return karein.
  const getTodayDate = () => {
    const now = new Date();
    // User ke system time zone ko use karke date string banao
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // New Date object ko user ke local time zone mein convert karke, sirf date part lein.
    // Note: Agar aapko ye complex lage to aap sirf `now.toISOString().split('T')[0]` bhi use kar sakte hain
    // agar aapka server aur client UTC mein date fetch karte hain, lekin neeche wala tareeqa behtar hai.
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: userTimeZone };
    const dateParts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);

    const year = dateParts.find(p => p.type === 'year').value;
    const month = dateParts.find(p => p.type === 'month').value;
    const day = dateParts.find(p => p.type === 'day').value;

    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
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
      .then((data) => setAuthUrl(data.url)).catch((err) => console.error("Error fetching Auth URL:", err));

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/calendar/status`)
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.loggedIn)).catch((err) => console.error("Error fetching Status:", err));
  }, []);

  // Step 2: Redirect to Google login
  const handleLogin = () => {
    window.location.href = authUrl;
  };

  // Step 3: Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ LOCAL TIME DISPLAY FUNCTION - Theek hai, backend se aayi ISO string ko local time mein dikhaega.
  const formatTimeSlot = (slotTime) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // slotTime ab backend se ISO string (offset ke saath) aayegi, new Date usko theek se parse karega.
    const date = new Date(slotTime);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: userTimeZone // Theek se local time zone mein display karein
    });
  };

  // Step 4: Fetch available slots for selected date - Timezone ke saath
  useEffect(() => {
    if (isLoggedIn && selectedDate) {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Backend ko date aur user ka time zone bhejein
      fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/calendar/slots?date=${selectedDate}&timezone=${encodeURIComponent(userTimeZone)}`)
        .then((res) => res.json())
        .then((data) => {
          //  console.log("Slots received for timezone:", userTimeZone, data);
          // Agar data mein error message hai, to slots ko empty set karein aur alert dein
          if (data.error) {
            console.error("Backend Error fetching slots:", data.error);
            setSlots([]);
            // alert("Error fetching slots: " + data.message); // Agar zaruri ho
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

  // Step 5: Submit booking - Backend ko ISO strings bhej rahe hain (correct)
  const handleBooking = async () => {
    if (!selectedSlot) return alert("Please select a time slot.");
    if (!formData.name || !formData.email)
      return alert("Name and Email are required.");


    const bookingData = {
      ...formData,
      startTime: selectedSlot.start, // ✅ Backend se aayi ISO string (offset ke saath)
      endTime: selectedSlot.end,   // ✅ Backend se aayi ISO string (offset ke saath)
      summary: formData.summary || "Meeting",
      description: formData.description || "",
    };

    setSubmitting(true);
    try {
      // console.log("Sending booking data:", bookingData);

      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/calendar/create-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Backend error:", data);
        return alert(data.message || `Error: ${res.status}`);
      }

      setMeetLink(data.meetLink);
      setBookingStep(5);

      // Remove booked slot
      setSlots(slots.map(s => s.start === selectedSlot.start ? { ...s, available: false } : s));
      setSubmitting(false);

    } catch (err) {
      console.error("Network error:", err);
      alert("Network error - check console for details");
    }
  };

  // Copy meeting link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetLink)
      .then(() => alert("Meeting link copied to clipboard!"))
      .catch(err => console.error("Failed to copy: ", err));
  };

  // ✅ FIX: Reset booking mein local date use karein (getTodayDate function use karein)
  const resetBooking = () => {
    setSelectedSlot(null);
    setSelectedDate(getTodayDate()); // FIX: Ab sahi local date set hogi
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
    // Sun=0, Mon=1, etc.
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // ✅ FIX: Calendar mein bhi local date ka comparison theek karein
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const calendar = [];

    // ✅ USER LOCAL DATE (YYYY-MM-DD string) - Yeh zaruri hai
    const todayString = getTodayDate();

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      calendar.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Date object banayein (Server ke time zone mein)
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

      // Isko YYYY-MM-DD format mein convert karein
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      const isToday = dateString === todayString;
      const isSelected = dateString === selectedDate;

      // Past check: Calendar date string ko today string se compare karein
      const isPast = dateString < todayString;

      // ✅ Sunday disable check
      const isSunday = date.getDay() === 0;

      calendar.push({
        day,
        date: dateString,
        isToday,
        isSelected,
        isPast,
        isSunday // ✅ added property
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
    setSelectedSlot(null); // Date change hone par slot reset karein
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

  // ... (rest of the code remains the same)

  const calendar = generateCalendar();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="flex bg-white justify-center">

      <div className="flex w-full max-w-6xl">


        <div className="hidden lg:flex lg:w-1/2 text-black p-8 flex-col justify-between bg-gray-50 border-r border-gray-200">
          <div>

            <div className="flex justify-start mb-8">
              <div className="overflow-hidden flex items-center justify-center">
                <Link to="/" className="block">
                  <ImageWithSkeleton
                    src="/images/blackLogo.jpg"
                    alt="BBV logo"
                    className="w-[70px] border-none object-contain"
                    click={true}
                  />
                </Link>
              </div>
            </div>

            <Heading3 text="Book Your Consultation Call" textColor="text-black" className="my-2" />



            <div className="mb-8">
              <div className="flex items-center mb-3">
                <div className={`w-7 h-7 rounded-full text-sm flex items-center justify-center mr-3 ${bookingStep >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                  1
                </div>
                <RichParagraph className={`font-medium ${bookingStep >= 1 ? 'text-black' : 'text-gray-500'}`}>Date</RichParagraph>
              </div>
              <div className="flex items-center mb-3">
                <div className={`w-7 h-7 rounded-full text-sm flex items-center justify-center mr-3 ${bookingStep >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                  2
                </div>
                <RichParagraph className={`font-medium ${bookingStep >= 2 ? 'text-black' : 'text-gray-500'}`}>Time</RichParagraph>
              </div>
              <div className="flex items-center mb-3">
                <div className={`w-7 h-7 rounded-full text-sm flex items-center justify-center mr-3 ${bookingStep >= 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                  3
                </div>
                <RichParagraph className={`font-medium ${bookingStep >= 3 ? 'text-black' : 'text-gray-500'}`}>Info</RichParagraph>
              </div>
              <div className="flex items-center mb-3">
                <RichParagraph className={` ${bookingStep >= 3 ? 'text-black' : 'text-gray-500'}`}>Details</RichParagraph>
              </div>
              <div className="flex items-center">
                <div className={`w-7 h-7 rounded-full text-sm flex items-center justify-center mr-3 ${bookingStep >= 4 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                  4
                </div>
                <RichParagraph className={` ${bookingStep >= 4 ? 'text-black' : 'text-gray-500'}`}>Confirmation</RichParagraph>
              </div>
              <div className="flex items-center">
                <RichParagraph className={` ${bookingStep >= 4 ? 'text-black' : 'text-gray-500'}`}>Summary</RichParagraph>
              </div>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <RichParagraph className="text-sm text-gray-600 mb-1">
                  Need assistance or have questions before booking?
                </RichParagraph>
                <RichParagraph className="text-black font-semibold">Host: +1 (951) 441-9719</RichParagraph>
              </div>

            </div>
          </div>
        </div>


        <div className="flex-1 flex flex-col lg:w-1/2">

          <div className="flex-1 p-6 overflow-y-auto">
            {!authUrl ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : !isLoggedIn ? (
              <div className="max-w-sm mx-auto mt-8">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Booking System</h1>
                  <RichParagraph>
                    Please login with Google to continue
                  </RichParagraph>
                </div>
                <button
                  onClick={handleLogin}
                  className="bg-white text-gray-900 px-6 py-3 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 w-full font-medium text-sm"
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
              <div className="max-w-sm mx-auto">

                <div className="lg:hidden mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <ImageWithSkeleton
                        src="/images/blackLogo.jpg"
                        alt="BBV logo"
                        className="w-[100px] h-[30px] object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-12 h-px bg-gray-300"></div>
                </div>


                <div>

                  {bookingStep === 1 && (
                    <div className="max-w-sm mx-auto">
                      <Heading4 text="Select a Date" textColor="text-black" className="text-center my-4" />

                      <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm">

                        <div className="flex items-center justify-between mb-3">
                          <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                          </button>
                          <h3 className="text-sm font-semibold">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                          <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-1">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (<div key={day + index} className="text-center text-xs font-medium py-1 text-gray-500">{day}</div>))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {calendar.map((date, index) => (
                            <button
                              key={index}
                              onClick={() => date && handleDateSelect(date)}
                              disabled={!date || date.isPast || date.isSunday}
                              className={`
                            h-7 rounded-md text-xs transition-all font-medium
                            ${!date ? 'invisible' : ''}
                            ${date?.isPast || date?.isSunday ? 'text-gray-300 cursor-not-allowed' : ''}
                            ${date?.isToday && !date?.isSelected ? 'bg-blue-50 text-blue-600 border border-blue-200' : ''}
                            ${date?.isSelected ? 'bg-black text-white shadow-md' : ''}
                            ${!date?.isPast && !date?.isSunday && !date?.isSelected && !date?.isToday ? 'hover:bg-gray-50 text-gray-700' : 'text-gray-600'}
                          `}
                            >
                              {date?.day}
                            </button>
                          ))}
                        </div>
                      </div>

                      {selectedDate && (
                        <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                          <Heading4 text="Selected Date" textColor="text-black" className="text-center my-4" />

                          <RichParagraph>
                            {formatDate(selectedDate)}
                          </RichParagraph>
                        </div>
                      )}
                      <div className="text-center">

                      </div>
                    </div>
                  )}


                  {bookingStep === 2 && (
                    <div className="max-w-sm mx-auto">
                      <Heading4 text="Select a Time" textColor="text-black" className="text-center my-4" />

                      <RichParagraph className="text-center my-2">
                        {formatDate(selectedDate)}
                      </RichParagraph>
                      {slots.length === 0 ? (
                        <div className="text-center py-6">
                          <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <RichParagraph>
                            No available slots for selected day.
                          </RichParagraph>
                          <button onClick={() => setBookingStep(1)} className="text-black hover:text-gray-700 font-medium underline text-sm">Choose another date</button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {slots.map((slot, idx) => (
                            <button
                              key={idx}
                              onClick={() => { if (slot.available) { setSelectedSlot(slot); setBookingStep(3); } }}
                              disabled={!slot.available}
                              className={`p-3 border-2 rounded-lg text-center transition-all font-medium text-sm ${selectedSlot === slot
                                ? "bg-black text-white border-black shadow-md"
                                : slot.available
                                  ? "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm"
                                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                }`}
                            >
                              {formatTimeSlot(slot.start)}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="text-center">
                        <WhiteButton label={"Back to Date Selection"} onClick={() => setBookingStep(1)} />
                      </div>
                    </div>
                  )}


                  {bookingStep === 3 && (
                    <div className="max-w-sm mx-auto font-serif">
                      <Heading4 text="Enter Your Details" textColor="text-black" className="text-center my-4" />
                      <RichParagraph className="text-center my-2">
                        {formatDate(selectedDate)} at {selectedSlot && formatTimeSlot(selectedSlot.start)}

                      </RichParagraph>

                      <div className="space-y-3 mb-4 font-serif">

                        <div><label className="block text-gray-700 mb-1 font-medium text-sm">Name *</label><input type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-sm" required /></div>
                        <div><label className="block text-gray-700 mb-1 font-medium text-sm">Email *</label><input type="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-sm" required /></div>
                        <div><label className="block text-gray-700 mb-1 font-medium text-sm">Phone (optional)</label><input type="tel" name="phone" placeholder="Your phone number" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-sm" /></div>
                        <div><label className="block text-gray-700 mb-1 font-medium text-sm">Meeting Title</label><input type="text" name="summary" placeholder="What is this meeting about?" value={formData.summary} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-sm" /></div>
                        <div><label className="block text-gray-700 mb-1 font-medium text-sm">Additional Details</label><textarea name="description" placeholder="Any additional information..." value={formData.description} onChange={handleChange} rows="3" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors text-sm" /></div>
                      </div>
                      <div className="flex gap-2">
                        <WhiteButton label={"back"} onClick={() => setBookingStep(2)} />
                        <WhiteButton label={"Continue to Summary"} onClick={() => setBookingStep(4)} disabled={!formData.name || !formData.email} />
                      </div>
                    </div>
                  )}


                  {bookingStep === 4 && (
                    <div className="max-w-sm mx-auto">
                      <Heading4 text="Meeting Summary" textColor="text-black" className="text-center my-4" />

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-sm">

                        <div className="space-y-3 font-serif">
                          <div className="flex justify-between items-center pb-2 border-b border-gray-200"><span className="text-gray-600">Date & Time</span><span className="font-semibold text-right">{formatDate(selectedDate)}<br />at {selectedSlot && formatTimeSlot(selectedSlot.start)}</span></div>
                          <div className="flex justify-between items-center pb-2 border-b border-gray-200"><span className="text-gray-600">Duration</span><span className="font-semibold">{selectedSlot && Math.round((new Date(selectedSlot.end) - new Date(selectedSlot.start)) / (1000 * 60))} min</span></div>
                          <div className="flex justify-between items-center pb-2 border-b border-gray-200"><span className="text-gray-600">Name</span><span className="font-semibold">{formData.name}</span></div>
                          <div className="flex justify-between items-center pb-2 border-b border-gray-200"><span className="text-gray-600">Email</span><span className="font-semibold">{formData.email}</span></div>
                          {formData.phone && (<div className="flex justify-between items-center pb-2 border-b border-gray-200"><span className="text-gray-600">Phone</span><span className="font-semibold">{formData.phone}</span></div>)}
                          {formData.summary && (<div className="flex justify-between items-start"><span className="text-gray-600">Title</span><span className="font-semibold text-right">{formData.summary}</span></div>)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setBookingStep(3)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium flex-1 text-sm">Back</button>
                        <button disabled={submitting} onClick={handleBooking} className={`${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"} text-white px-4 py-2 rounded-lg transition-colors font-medium flex-1 text-sm`}>{submitting ? "Submitting..." : "Confirm Booking"}</button>
                      </div>
                    </div>
                  )}


                  {bookingStep === 5 && (
                    <div className="text-center max-w-sm mx-auto py-6">

                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <Heading4 text="Booking Confirmed!" textColor="text-black" className="text-center my-4" />
                      <RichParagraph className="my-2">
                        Your meeting has been scheduled successfully.
                      </RichParagraph>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                        <RichParagraph className="my-2">
                          Your Google Meet link:
                        </RichParagraph>
                        <div className="flex items-center bg-white p-2 rounded border">
                          <RichParagraph className="my-2">
                            {meetLink}
                          </RichParagraph>
                          <button onClick={copyToClipboard} className="ml-2 text-gray-600 hover:text-black p-1 rounded hover:bg-gray-100 transition-colors" title="Copy to clipboard">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                          </button>
                        </div>
                      </div>
                      <RichParagraph className="my-2">
                        Your meeting has been successfully scheduled! Please check your inbox to confirm the booking and find all the meeting details. We look forward to connecting with you.

                      </RichParagraph>

                      <WhiteButton label={"Book Another Meeting"} onClick={resetBooking} />

                    </div>
                  )}
                </div>
              </div>
            )}
          </div>


          <div className="lg:hidden border-t border-gray-200 p-3 bg-white sticky bottom-0">
            <div className="text-center">
              <RichParagraph>
                Need help? Call us at
              </RichParagraph>
              <RichParagraph>
                +1 (951) 441-9719
              </RichParagraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}