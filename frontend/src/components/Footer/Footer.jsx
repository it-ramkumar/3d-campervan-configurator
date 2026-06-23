"use client";

import React, { useState } from "react";
import axios from "axios";
// SweetAlert dynamic import
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
        confirmButtonColor: "var(--color-primary)", // SweetAlert JS mein CSS variable use kar sakte hain
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
    <footer className="relative text-white pt-16 pb-8 bg-primary font-sans overflow-hidden">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('/heroSlider/Screenshot.webp')" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-8">
          {/* 1. Company Info & Socials */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="block">
              <Image
                src="/images/logooFooter.webp"
                alt="BBV logo"
                className="w-[180px] h-auto border-none object-contain"
                width={180}
                height={80}
                priority
              />
            </Link>
            <RichParagraph white={true}>
              <span className="text-sm text-secondary opacity-80 leading-relaxed">
                Wherever the road leads you is your home. Our custom campers, be
                it Transit or Sprinter camper vans, are designed to make every
                journey memorable.
              </span>
            </RichParagraph>
            <p className="text-hover text-xs italic tracking-wide mb-2">
              You Dream It. We Build It.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                {
                  icon: <FaTwitter />,
                  link: "https://x.com/bigbearvans_",
                  label: "Twitter",
                },
                {
                  icon: <FaYoutube />,
                  link: "https://www.youtube.com/channel/UCQFzU9eB7Aa8x_E9ov1hD7w",
                  label: "YouTube",
                },
                {
                  icon: <FaLinkedin />,
                  link: "https://www.linkedin.com/company/big-bear-vans",
                  label: "LinkedIn",
                },
                {
                  icon: <FaInstagram />,
                  link: "https://www.instagram.com/bigbearvans/?hl=en",
                  label: "Instagram",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  aria-label={item.label}
                  className="p-2.5 text-white bg-white/5 border border-white/10 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:text-hover hover:border-hover/30 flex items-center justify-center"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <Heading3
              text="Quick Links"
              textColor="text-white mb-6 text-lg font-bold"
            />
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              <FooterListItem href="/">Home</FooterListItem>
              <FooterListItem href="/camper-vans-for-sale">
                Vans For Sale
              </FooterListItem>
              <FooterListItem href="/van-layouts">Layouts</FooterListItem>
              <FooterListItem href="/about-us">About Us</FooterListItem>
              <FooterListItem href="/careers">Careers</FooterListItem>
              <FooterListItem href="/blog">Blog</FooterListItem>
              <FooterListItem href="/faq">FAQs</FooterListItem>
              <FooterListItem href="/quick-links">Quick Links</FooterListItem>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <Heading3
              text="Contact Info"
              textColor="text-white mb-6 text-lg font-bold"
            />
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-sm shrink-0 text-hover" />
                <div className="flex flex-col">
                  <span className="text-sm text-secondary opacity-90 leading-snug">
                    320 W Big Bear Blvd, Big Bear City, California, 92314, USA
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        "320 W Big Bear Blvd, Big Bear City, California, 92314, USA"
                      )
                    }
                    className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-hover opacity-40 hover:opacity-100 transition-opacity mt-2"
                  >
                    <FaCopy /> Copy Address
                  </button>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 text-sm shrink-0 text-hover" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 group">
                    <Link
                      href="tel:+19514419748"
                      className="text-sm hover:text-hover transition-colors"
                    >
                      +1 (951) 441-9748
                    </Link>
                    <FaCopy
                      onClick={() => handleCopy("+19514419748")}
                      className="cursor-pointer text-white/20 hover:text-white text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2 group">
                    <Link
                      href="tel:+19514419719"
                      className="text-sm hover:text-hover transition-colors"
                    >
                      +1 (951) 441-9719
                    </Link>
                    <FaCopy
                      onClick={() => handleCopy("+19514419719")}
                      className="cursor-pointer text-white/20 hover:text-white text-xs"
                    />
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-sm shrink-0 text-hover" />
                <Link
                  href="mailto:bigbearvans@gmail.com"
                  className="text-sm hover:text-hover transition-colors truncate"
                >
                  bigbearvans@gmail.com
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Business Hours & Newsletter */}
          <div className="flex flex-col gap-6">
            <div>
              <Heading4
                text="Business Hours"
                className="text-white mb-4 text-xs font-bold uppercase tracking-widest"
              />
              <div className="flex flex-col text-sm gap-2">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="opacity-60">Mon - Fri:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="opacity-60">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Sunday:</span>
                  <span className="text-hover">By Appointment</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="p-4 border border-white/10 bg-white/5 rounded-md">
              <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-80">
                Stay Updated
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 bg-black/20 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-hover transition-colors"
                />
                <button
                  onClick={handleSubscribe}
                  aria-label="Subscribe"
                  className="p-2.5 bg-hover text-white rounded-md transition-all duration-300 flex items-center justify-center hover:brightness-110"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] opacity-40 tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} BIG BEAR VANS. All Rights Reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="text-[11px] opacity-40 hover:opacity-100 hover:text-hover tracking-[0.2em] uppercase transition-all duration-200"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}