"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PrimaryButton from "../Common/Button/PrimaryButton";
import { Heading4, Heading3, RichParagraph, Heading1 } from "../Common/Common";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Agar Next.js 13+ App Router hai
import { trackLead, withTracking, saveLeadEmail, createEventId } from "@/lib/track";
import { validateLead } from "@/lib/validateLead";

const PACIFIC_TZ = "America/Los_Angeles";

const getBrowserTz = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || PACIFIC_TZ;
  } catch {
    return PACIFIC_TZ;
  }
};

// e.g. "Pacific Time (PDT)" or "Europe/Berlin (GMT+2)"
const formatTzLabel = (tz, date = new Date()) => {
  let abbr = "";
  try {
    abbr =
      new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" })
        .formatToParts(date)
        .find((p) => p.type === "timeZoneName")?.value || "";
  } catch {
    // unknown zone; show the name only
  }
  const name = tz === PACIFIC_TZ ? "Pacific Time" : tz.replace(/_/g, " ");
  return abbr ? `${name} (${abbr})` : name;
};


export default function BookingPage() {
  const [authUrl, setAuthUrl] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();


  // Your existing functions remain the same...
  // ✅ FIXED: Get tomorrow's date instead of today
  const getTomorrowDate = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Add 1 day
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: userTimeZone,
    };
    const dateParts = new Intl.DateTimeFormat("en-US", options).formatToParts(
      now,
    );
    const year = dateParts.find((p) => p.type === "year").value;
    const month = dateParts.find((p) => p.type === "month").value;
    const day = dateParts.find((p) => p.type === "day").value;
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
  const [errors, setErrors] = useState({});
  const [bookingError, setBookingError] = useState("");
  const [copied, setCopied] = useState(false);

  // "local" = visitor's browser time zone, "pacific" = our office time
  const [tzMode, setTzMode] = useState("local");
  const browserTz = getBrowserTz();
  const displayTz = tzMode === "pacific" ? PACIFIC_TZ : browserTz;

  // All your existing useEffect and handler functions...
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/calendar/auth/url`)
      .then((res) => res.json())
      .then((data) => setAuthUrl(data.url))
      .catch((err) => console.error("Error fetching Auth URL:", err));

    fetch(`${process.env.NEXT_PUBLIC_URL}/calendar/status`)
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.loggedIn))
      .catch((err) => console.error("Error fetching Status:", err));
  }, []);

  const handleLogin = () => {
    window.location.href = authUrl;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const formatTimeSlot = (slotTime) => {
    const date = new Date(slotTime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: displayTz,
    });
  };

  // Date of a slot in the shown time zone (late-night slots can land on the next day)
  const formatSlotDate = (slotTime) =>
    new Date(slotTime).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: displayTz,
    });

  useEffect(() => {
    if (!isLoggedIn || !selectedDate) return;
    let cancelled = false;

    fetch(
      `${process.env.NEXT_PUBLIC_URL}/calendar/slots?date=${selectedDate}&timezone=${encodeURIComponent(displayTz)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setSlots(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setSlots([]);
      });

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, selectedDate, displayTz]);

  const handleReview = (e) => {
    e.preventDefault();
    const fieldErrors = validateLead(formData);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) return;
    setBookingError("");
    setBookingStep(4);
  };

  const handleBooking = async () => {
    if (submitting) return;
    setBookingError("");

    if (!selectedSlot) {
      setBookingError("Please pick a time slot first.");
      return;
    }
    const fieldErrors = validateLead(formData);
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      setBookingStep(3);
      return;
    }

    const eventId = createEventId();
    const bookingData = withTracking({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
      timezone: browserTz,
      displayTimezone: displayTz,
      summary: formData.summary || "Meeting",
      description: formData.description || "",
      event_id: eventId,
      lead_source: "booking",
    });

    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/calendar/create-event`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.success === false) {
        setBookingError(data.message || data.error || "We couldn't book this time slot.");
        setSubmitting(false);
        return;
      }

      // Booking confirmed by the API: track once, then redirect without PII in the URL.
      // submitting stays true so the button can't be pressed again during navigation.
      trackLead({ source: "booking", email: formData.email, phone: formData.phone, eventId });
      saveLeadEmail(formData.email);
      router.push("/thank-you?source=booking");
    } catch {
      setBookingError("We couldn't reach our booking system.");
      setSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(meetLink)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
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
    setErrors({});
    setBookingError("");
    setCopied(false);
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
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
      );
      const dateString = date.toLocaleDateString("en-CA", {
        timeZone: userTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
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
        isSunday,
      });
    }

    return calendar;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1,
      ),
    );
  };

  const handleDateSelect = (date) => {
    if (date.isPast || date.isSunday) return;
    setSelectedDate(date.date);
    setSelectedSlot(null);
    setBookingStep(2);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const date = new Date(year, month - 1, day);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: userTimeZone,
    });
  };

  const calendar = generateCalendar();
  const days = [
    { id: 1, label: "Sun" },
    { id: 2, label: "Mon" },
    { id: 3, label: "Tue" },
    { id: 4, label: "Wed" },
    { id: 5, label: "Thu" },
    { id: 6, label: "Fri" },
    { id: 7, label: "Sat" },
  ];

  return (
    <div className="flex bg-[#F8F8F6] min-h-screen justify-center items-center p-4">
      {/* Main Container */}
      <div className="flex w-full max-w-6xl bg-white border border-primary/10 rounded-lg shadow-2xl overflow-hidden min-h-[700px]">
        {/* Sidebar: Deep Navy Theme */}
        <div className="hidden lg:flex lg:w-1/3 bg-[#001F3D] text-secondary p-10 flex-col justify-between relative">
          <div>
            <Heading1 variant="card"
              text="Consultation Call"
              textColor="text-secondary"
              className="mb-8 uppercase tracking-wide"
            />

            {/* Step Indicators */}
            <div className="space-y-6 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-secondary/10"></div>
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-4 relative z-10">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-500 ${bookingStep >= s ? "bg-hover text-primary" : "bg-secondary/10 text-secondary/30"}`}
                  >
                    {s}
                  </div>
                  <RichParagraph variant="sub" className={` font-bold uppercase ${bookingStep >= s ? "!text-secondary" : "!text-secondary/30"}`}>
                    {s === 1
                      ? "Date"
                      : s === 2
                        ? "Time"
                        : s === 3
                          ? "Details"
                          : "Review"}
                  </RichParagraph>

                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-secondary/10 bg-secondary/5">
            <RichParagraph variant="sub" className="!text-hover mb-1">
              Support Line
            </RichParagraph>
            <RichParagraph variant="sub" className="!text-secondary mb-1">+1 (951) 441-9719</RichParagraph>

          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-transparent">
          {!isLoggedIn ? (
            <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in fade-in zoom-in-95">
              <div className="text-center">
                <Heading1 variant="card" text="Welcome Back" textColor="text-secondary" />
                <RichParagraph variant="card" className="text-secondary/70">
                  Please sign in with Google to manage your bookings.
                </RichParagraph>
              </div>
              <button
                onClick={handleLogin}
                className="flex items-center gap-4 px-8 py-4 bbv-glass border border-secondary/10 rounded-lg font-bold text-secondary hover:bg-hover hover:text-primary transition-all shadow-sm"
              >
                <Image
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  className="w-5"
                  alt="google"
                  width={20}
                  height={20}
                />
                Continue with Google
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              {/* Step 1: Date Selection */}
              {bookingStep === 1 && (
                <div className="animate-in slide-in-from-right-4 duration-500">
                  <header className="text-center mb-8">
                    <RichParagraph variant="sub" className="!text-hover mb-1">
                      Schedule
                    </RichParagraph>

                    <Heading1 variant="card" text="Select a Date" textColor="text-primary" />
                  </header>

                  <div className="bbv-glass p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-secondary/10 rounded-lg transition-all text-primary/70 hover:text-hover"
                      >
                        ←
                      </button>
                      <Heading1 variant="sub" className=" uppercase  !text-primary">
                        {currentMonth.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </Heading1>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-secondary/10 rounded-lg transition-all text-primary/70 hover:text-hover"
                      >
                        →
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {days.map((d) => (
                        <div
                          key={d.id}
                          className="text-center text-[10px] font-bold text-primary/30 py-2"
                        >
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
                            ? "invisible"
                            : d.isSelected
                              ? "bg-hover text-primary shadow-lg"
                              : d.isPast || d.isSunday
                                ? "text-primary/20 cursor-not-allowed"
                                : d.isToday
                                  ? "bg-secondary/20 text-hover hover:bg-hover hover:text-primary"
                                  : "hover:bg-hover hover:text-primary text-primary/80 bg-secondary/5"
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
                    <RichParagraph variant="sub" className="!text-hover mb-1">
                      Time
                    </RichParagraph>

                    <Heading1 variant="card" text="Available Slots" textColor="text-primary" />
                    <p className="mt-2 text-xs text-primary/70">
                      Times shown in{" "}
                      <strong className="text-primary">{formatTzLabel(displayTz)}</strong>
                    </p>
                    {browserTz !== PACIFIC_TZ && (
                      <button
                        type="button"
                        onClick={() => setTzMode((m) => (m === "pacific" ? "local" : "pacific"))}
                        className="mt-1 text-xs font-bold text-primary underline hover:text-hover"
                      >
                        {tzMode === "pacific"
                          ? `Show in my time zone (${formatTzLabel(browserTz)})`
                          : "Show in Pacific Time"}
                      </button>
                    )}
                  </header>

                  {slots.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bbv-glass rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-primary/30"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <RichParagraph variant="sub" className="!text-primary/70 mb-2">
                        No slots available for {formatDate(selectedDate)}
                      </RichParagraph>

                      <button
                        onClick={() => setBookingStep(1)}
                        className="text-hover font-bold text-xs uppercase tracking-widest hover:underline"
                      >
                        Choose Different Date
                      </button>
                    </div>
                  ) : (
                    <>
                      {Object.entries(
                        slots
                          .filter((s) => s.available !== false)
                          .reduce((groups, s) => {
                            const day = formatSlotDate(s.start);
                            (groups[day] ||= []).push(s);
                            return groups;
                          }, {}),
                      ).map(([day, daySlots]) => (
                        <div key={day} className="mb-6">
                          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary/70">
                            {day}
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {daySlots.map((s) => (
                              <button
                                key={s.start}
                                type="button"
                                onClick={() => {
                                  setSelectedSlot(s);
                                  setBookingStep(3);
                                }}
                                className={`p-4 border rounded-lg font-bold text-xs transition-all ${selectedSlot && new Date(selectedSlot.start).getTime() === new Date(s.start).getTime()
                                  ? "border-hover bg-hover/10 text-hover"
                                  : "border-secondary/10 hover:border-hover hover:text-hover bg-primary/5 text-primary/70"
                                  }`}
                              >
                                {formatTimeSlot(s.start)}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => setBookingStep(1)}
                        className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-primary/30 hover:text-primary transition-colors"
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
                    <RichParagraph variant="sub" className="!text-hover mb-1">
                      Details
                    </RichParagraph>

                    <Heading1 variant="card" text="Meeting Information" textColor="text-primary" />
                  </header>

                  <form onSubmit={handleReview} noValidate className="space-y-6">
                    <div className="space-y-4">
                      {[
                        { name: "name", label: "Full Name *", type: "text", autoComplete: "name", placeholder: "Enter your full name" },
                        { name: "email", label: "Email Address *", type: "email", autoComplete: "email", placeholder: "your.email@example.com" },
                        { name: "phone", label: "Phone Number (optional)", type: "tel", autoComplete: "tel", placeholder: "+1 (555) 123-4567" },
                      ].map((f) => (
                        <div key={f.name}>
                          <label htmlFor={`booking-${f.name}`} className="text-primary/70 text-sm font-medium mb-1 block">
                            {f.label}
                          </label>
                          <input
                            id={`booking-${f.name}`}
                            name={f.name}
                            type={f.type}
                            autoComplete={f.autoComplete}
                            value={formData[f.name]}
                            onChange={handleChange}
                            placeholder={f.placeholder}
                            aria-invalid={!!errors[f.name]}
                            aria-describedby={errors[f.name] ? `booking-${f.name}-error` : undefined}
                            className="bbv-input bbv-input--light w-full px-4 py-3"
                          />
                          {errors[f.name] && (
                            <p id={`booking-${f.name}-error`} role="alert" className="mt-1 text-xs font-semibold text-red-700">
                              {errors[f.name]}
                            </p>
                          )}
                        </div>
                      ))}

                      <div>
                        <label htmlFor="booking-summary" className="text-primary/70 text-sm font-medium mb-1 block">
                          Meeting Topic
                        </label>
                        <input
                          id="booking-summary"
                          name="summary"
                          value={formData.summary}
                          onChange={handleChange}
                          placeholder="Brief topic or purpose of meeting"
                          className="bbv-input bbv-input--light w-full px-4 py-3"
                        />
                      </div>

                      <div>
                        <label htmlFor="booking-description" className="text-primary/70 text-sm font-medium mb-1 block">
                          Additional Notes
                        </label>
                        <textarea
                          id="booking-description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Any specific topics or questions you'd like to discuss..."
                          className="bbv-input bbv-input--light w-full px-4 py-3 resize-none"
                          rows="3"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setBookingStep(2)}
                        className="flex-1 py-4 rounded-lg bbv-glass text-[10px] font-bold uppercase tracking-widest text-primary/70 hover:text-secondary transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-4 rounded-lg bg-hover text-primary text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all"
                      >
                        Review Booking
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 4: Summary */}
              {bookingStep === 4 && (
                <div className="animate-in zoom-in-95 space-y-6">
                  <header className="text-center mb-8">
                    <RichParagraph variant="sub" className="!text-hover mb-1">
                      Please review your booking details below.
                    </RichParagraph>

                    <Heading1 variant="card" text="Confirm Details" textColor="text-primary" />
                  </header>

                  <div className="bbv-glass rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-secondary/10 pb-3">
                      <RichParagraph variant="sub" >
                        Date
                      </RichParagraph>
                      <RichParagraph variant="sub" className="!text-primary font-bold">
                        {selectedSlot ? formatSlotDate(selectedSlot.start) : formatDate(selectedDate)}
                      </RichParagraph>

                    </div>
                    <div className="flex justify-between items-center border-b border-secondary/10 pb-3">
                      <RichParagraph variant="sub">
                        Time
                      </RichParagraph>
   <RichParagraph variant="sub" className="!text-primary font-bold">
                       {selectedSlot && formatTimeSlot(selectedSlot.start)}
                      </RichParagraph>

                    </div>
                    <div className="flex justify-between items-center border-b border-secondary/10 pb-3">
                      <RichParagraph variant="sub">
                        Time Zone
                      </RichParagraph>
                      <RichParagraph variant="sub" className="!text-primary font-bold text-right">
                        {formatTzLabel(displayTz, selectedSlot ? new Date(selectedSlot.start) : undefined)}
                      </RichParagraph>
                    </div>
                    <div className="flex justify-between items-center border-b border-secondary/10 pb-3">

                      <RichParagraph variant="sub">
                        Name
                      </RichParagraph>
                         <RichParagraph variant="sub" className="!text-primary font-bold">
                          {formData.name}
                      </RichParagraph>

                    </div>
                    <div className="flex justify-between items-center border-b border-secondary/10 pb-3">
                      <RichParagraph variant="sub">
                        Email
                      </RichParagraph>
   <RichParagraph variant="sub" className="!text-primary font-bold">
                         {formData.email}
                      </RichParagraph>

                    </div>
                    {formData.phone && (
                      <div className="flex justify-between items-center border-b border-secondary/10 pb-3">
                       <RichParagraph variant="sub">
Phone
                       </RichParagraph>

                        <RichParagraph variant="sub" className="!text-primary font-bold">
                          {formData.phone}
                        </RichParagraph>
                      </div>
                    )}
                 
                  </div>

                  {bookingError && (
                    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      {bookingError} Please try another time, or call us at{" "}
                      <a href="tel:+19514419719" className="font-bold underline">
                        (951) 441-9719
                      </a>
                      .
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingStep(3)}
                      disabled={submitting}
                      className="flex-1 py-4 rounded-lg bbv-glass text-[10px] font-bold uppercase tracking-widest text-primary/70 hover:text-secondary transition-colors"
                    >
                      Edit Details
                    </button>
                    <button
                      type="button"
                      onClick={handleBooking}
                      disabled={submitting}
                      aria-busy={submitting}
                      className="flex-1 py-4 rounded-lg bg-hover text-primary text-[10px] font-bold uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Booking..." : "Confirm & Schedule"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Success */}
              {bookingStep === 5 && (
                <div className="text-center py-12 animate-in fade-in zoom-in">
                  <div className="w-20 h-20 bg-hover/10 text-hover rounded-lg flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <Heading3 text="Booking Confirmed!" textColor="text-primary" />
                  <p className="text-sm text-primary/60 mb-8 max-w-sm mx-auto">
                    Your consultation is confirmed. Check your email for
                    calendar invite and meeting details.
                  </p>

                  {meetLink && (
                    <div className="p-4 bbv-glass rounded-lg border border-secondary/10 flex items-center justify-between gap-4 mb-8">
                      <span className="text-[10px] font-mono truncate text-primary/50 flex-1 text-left">
                        {meetLink}
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="text-hover font-bold text-[10px] uppercase tracking-widest hover:underline whitespace-nowrap"
                      >
                        {copied ? "Copied!" : "Copy Link"}
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
                      className="block w-full py-3 text-[10px] font-bold uppercase tracking-widest text-secondary/40 hover:text-secondary transition-colors"
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
