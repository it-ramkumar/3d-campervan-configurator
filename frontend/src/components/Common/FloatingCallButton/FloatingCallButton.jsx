"use client";
import React, { useState, useEffect, useRef } from "react";
import ContactForm from "@/components/Consultation/ContactForm";
import { contact } from "../../../api/contact/contact";

export default function FloatingCallButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const menuRef = useRef(null);

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
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      return;
    }

    setLoading(true);
    try {
      console.log("FORM SUBMIT STARTED");
      const result = await contact(formData);

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", { source: "consultation" });
      }
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    /* CRITICAL FIX: z-[9999] yahan parent par lagaya hai taake navbar (z-999) iske niche dab jaye */
    <div
      ref={menuRef}
      className="fixed bottom-10 right-10 z-[9999] flex flex-col items-end gap-3 pointer-events-none"
    >
      {/* 1. OPTIONS MENU */}
      <div
        className={`flex flex-col gap-2 mb-2 transition-all duration-300  transform ${
          isMenuOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none "
        }`}
      >
        <a
          href="tel:+1 (951) 441-9719"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3 bg-primary border border-white/10 text-white/90 px-4 py-3 rounded-xl shadow-lg hover:border-hover/40 hover:text-hover transition-all group"
        >
          <span className="text-xs font-bold uppercase tracking-wider">
            Direct Call
          </span>
          <div className="w-8 h-8 rounded-lg bg-hover/10 flex items-center justify-center text-hover group-hover:bg-hover group-hover:text-primary transition-all">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.56 11.56 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z" />
            </svg>
          </div>
        </a>

        <button
          onClick={() => {
            setIsFormOpen(true);
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-3 bg-primary border border-white/10 text-white/90 px-4 py-3 rounded-xl shadow-lg hover:border-hover/40 hover:text-hover transition-all group"
        >
          <span className="text-xs font-bold uppercase tracking-wider">
            Send Email
          </span>
          <div className="w-8 h-8 rounded-lg bg-hover/10 flex items-center justify-center text-hover group-hover:bg-hover group-hover:text-primary transition-all">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* 2. MAIN FLOATING BUTTON */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`pointer-events-auto flex items-center justify-center bg-primary border text-hover shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 w-14 h-14 rounded-full group ${
          isMenuOpen ? "border-hover rotate-90" : "border-white/10"
        }`}
        aria-label="Contact Options"
      >
        {isMenuOpen ? (
          <svg
            className="w-6 h-6 text-hover"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 transform transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* 3. CONTACT FORM MODAL */}
      {isFormOpen && (
        /* CRITICAL FIX: z-[10000] completely cuts through everything else */
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md transition-all pointer-events-auto">
          <div className="relative w-full max-w-2xl bg-white  border border-white/10 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto injector-style pointer-events-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 right-5 text-primary hover:text-hover transition-colors rounded-lg hover:bg-white/5 z-30 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <ContactForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
