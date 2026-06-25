"use client";

import React, { useState } from "react";
import axios from "axios";
const Swal = async () => (await import("sweetalert2")).default;
import Link from "next/link";
import {
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaArrowRight,
  FaYoutube,
  FaCopy,
} from "react-icons/fa";
import { FooterListItem } from "../Common/Li/FooterLiItem";
import { Heading3, RichParagraph, Heading4 } from "../Common/Common";
import Image from "next/image";

const DOT_GRID = {
  backgroundImage: "radial-gradient(circle, rgba(251,251,249,0.035) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const handleSubscribe = async () => {
    const MySwal = await Swal();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      MySwal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address first!",
        confirmButtonColor: "var(--color-primary)",
      });
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/emails`, {
        email: trimmedEmail,
      });

      MySwal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "You'll receive notifications and updates soon 🎉",
        confirmButtonColor: "var(--color-primary)",
      });

      setEmail("");

      if (typeof window !== "undefined") {
        if (window.fbq) window.fbq("track", "Subscribe");
        if (window.gtag)
          window.gtag("event", "sign_up", { method: "newsletter" });
      }
    } catch (error) {
      const isDuplicate = error?.response?.status === 400;
      MySwal.fire({
        icon: isDuplicate ? "info" : "error",
        title: isDuplicate ? "Already Subscribed" : "Error",
        text: isDuplicate
          ? "This email is already on our list!"
          : "Something went wrong. Please try again.",
        confirmButtonColor: "var(--color-primary)",
      });
    }
  };

  return (
    <footer
      className="relative font-sans overflow-hidden text-[#FBFBF9]"
      style={{ backgroundColor: "#001F3D" }}
    >
      {/* Amber top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ED985F]" />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={DOT_GRID} />

      {/* Subtle radial glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(237,152,95,0.07) 0%, transparent 70%)" }}
      />

      {/* ── CTA STRIP ───────────────────────────────────────────────── */}
      <div
        className="relative border-b mx-auto max-w-7xl px-4 md:px-8 py-10"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#ED985F] text-xs uppercase tracking-widest font-bold mb-1">
              Start Your Journey
            </p>
            <p className="font-display text-xl md:text-2xl font-bold text-[#FBFBF9] leading-tight">
              Ready to build your dream campervan?
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ED985F] text-[#001F3D] font-bold text-sm uppercase tracking-[0.15em] transition-all duration-200 hover:brightness-110 whitespace-nowrap shrink-0"
          >
            Get a Free Quote <FaArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* ── MAIN GRID ───────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-10">

          {/* 1. Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="block">
              <Image
                src="/images/logooFooter.webp"
                alt="BBV logo"
                className="w-[170px] h-auto object-contain"
                width={170}
                height={76}
                priority
              />
            </Link>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(251,251,249,0.55)" }}>
              Wherever the road leads you is your home. Our custom campers, be
              it Transit or Sprinter camper vans, are designed to make every
              journey memorable.
            </p>

            <p className="text-[#ED985F] text-xs italic tracking-wide font-semibold">
              You Dream It. We Build It.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 mt-1">
              {[
                { icon: <FaTwitter />, link: "https://x.com/bigbearvans_", label: "Twitter" },
                { icon: <FaYoutube />, link: "https://www.youtube.com/channel/UCQFzU9eB7Aa8x_E9ov1hD7w", label: "YouTube" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/company/big-bear-vans", label: "LinkedIn" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/bigbearvans/?hl=en", label: "Instagram" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  aria-label={item.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-[#ED985F] hover:text-[#001F3D] hover:-translate-y-0.5"
                  style={{
                    color: "rgba(251,251,249,0.55)",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <p className="text-[#FBFBF9] text-xs uppercase tracking-widest font-bold mb-5 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-[#ED985F] inline-block" />
              Quick Links
            </p>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-2.5 gap-x-4">
              {[
                { href: "/", label: "Home" },
                { href: "/camper-vans-for-sale", label: "Vans For Sale" },
                { href: "/van-layouts", label: "Layouts" },
                { href: "/about-us", label: "About Us" },
                { href: "/careers", label: "Careers" },
                { href: "/blog", label: "Blog" },
                { href: "/faq", label: "FAQs" },
                { href: "/quick-links", label: "Quick Links" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: "rgba(251,251,249,0.55)" }}
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#ED985F] transition-all duration-300 inline-block" />
                    <span className="group-hover:text-[#FBFBF9] transition-colors duration-200">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <p className="text-[#FBFBF9] text-xs uppercase tracking-widest font-bold mb-5 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-[#ED985F] inline-block" />
              Contact Info
            </p>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(237,152,95,0.12)", border: "1px solid rgba(237,152,95,0.2)" }}>
                  <FaMapMarkerAlt className="text-[#ED985F] text-xs" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm leading-snug" style={{ color: "rgba(251,251,249,0.6)" }}>
                    320 W Big Bear Blvd, Big Bear City, California, 92314, USA
                  </span>
                  <button
                    onClick={() => handleCopy("320 W Big Bear Blvd, Big Bear City, California, 92314, USA")}
                    className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#ED985F] opacity-40 hover:opacity-100 transition-opacity mt-2 w-fit"
                  >
                    <FaCopy /> Copy Address
                  </button>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(237,152,95,0.12)", border: "1px solid rgba(237,152,95,0.2)" }}>
                  <FaPhoneAlt className="text-[#ED985F] text-xs" />
                </div>
                <div className="flex flex-col gap-2">
                  {["+1 (951) 441-9748", "+1 (951) 441-9719"].map((num) => (
                    <div key={num} className="flex items-center gap-2 group">
                      <Link
                        href={`tel:${num.replace(/\D/g, "")}`}
                        className="text-sm hover:text-[#ED985F] transition-colors"
                        style={{ color: "rgba(251,251,249,0.6)" }}
                      >
                        {num}
                      </Link>
                      <FaCopy
                        onClick={() => handleCopy(num.replace(/\D/g, ""))}
                        className="cursor-pointer text-xs hover:text-[#FBFBF9] transition-colors"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                      />
                    </div>
                  ))}
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(237,152,95,0.12)", border: "1px solid rgba(237,152,95,0.2)" }}>
                  <FaEnvelope className="text-[#ED985F] text-xs" />
                </div>
                <Link
                  href="mailto:bigbearvans@gmail.com"
                  className="text-sm truncate hover:text-[#ED985F] transition-colors"
                  style={{ color: "rgba(251,251,249,0.6)" }}
                >
                  bigbearvans@gmail.com
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Hours & Newsletter */}
          <div className="flex flex-col gap-7">
            {/* Business Hours */}
            <div
              className="rounded-lg p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[#FBFBF9] text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-[#ED985F] inline-block" />
                Business Hours
              </p>
              <div className="flex flex-col text-sm gap-2.5">
                {[
                  { day: "Mon – Fri", hours: "9:00 AM – 6:00 PM", amber: false },
                  { day: "Saturday", hours: "10:00 AM – 4:00 PM", amber: false },
                  { day: "Sunday", hours: "By Appointment", amber: true },
                ].map((row, i, arr) => (
                  <div
                    key={row.day}
                    className="flex justify-between"
                    style={i < arr.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "8px" } : {}}
                  >
                    <span style={{ color: "rgba(251,251,249,0.4)" }}>{row.day}</span>
                    <span className={row.amber ? "text-[#ED985F] font-semibold" : "text-[#FBFBF9]/80"}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div
              className="rounded-lg p-5"
              style={{ background: "rgba(237,152,95,0.06)", border: "1px solid rgba(237,152,95,0.2)" }}
            >
              <p className="text-[#ED985F] text-xs uppercase tracking-widest font-bold mb-1">
                Stay Updated
              </p>
              <p className="text-[11px] text-[#FBFBF9]/45 mb-3">
                New builds, tips & offers — straight to you.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bbv-input flex-1 min-w-0 text-sm"
                />
                <button
                  onClick={handleSubscribe}
                  aria-label="Subscribe"
                  className="p-2.5 bg-[#ED985F] text-[#001F3D] rounded-lg transition-all duration-200 flex items-center justify-center hover:brightness-110 shrink-0"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-[11px] tracking-[0.18em] uppercase" style={{ color: "rgba(251,251,249,0.3)" }}>
            © {new Date().getFullYear()} Big Bear Vans. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-[11px] tracking-[0.15em] uppercase transition-colors hover:text-[#ED985F]"
              style={{ color: "rgba(251,251,249,0.3)" }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>|</span>
            <Link
              href="/contact"
              className="text-[11px] tracking-[0.15em] uppercase transition-colors hover:text-[#ED985F]"
              style={{ color: "rgba(251,251,249,0.3)" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
