"use client";

import React, { useState } from "react";
// SweetAlert dynamic import
const Swal = async () => (await import('sweetalert2')).default;
import Link from "next/link";
import {
  FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope,
  FaPhoneAlt, FaLinkedin, FaArrowRight, FaYoutube, FaCopy
} from "react-icons/fa";
import { FooterListItem } from "../Common/Li/FooterLiItem";
import { Heading3, RichParagraph, Heading4, ImageWithSkeleton } from '../Common/Common';

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const handleSubscribe = async () => {
    const MySwal = await Swal();
    if (!email.trim()) {
      MySwal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address first!",
        confirmButtonColor: "var(--color-primary)",
      });
      return;
    }

    MySwal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "You'll receive notifications and updates soon 🎉",
      confirmButtonColor: "var(--color-primary)",
    });

    setEmail("");
  };

  return (
    <footer className="relative text-white pt-16 pb-8 bg-[var(--color-primary)] font-body overflow-hidden">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('/heroSlider/Screenshot.webp')" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start"
          style={{ gap: 'var(--gap-xl)' }}
        >

          {/* 1. Company Info & Socials */}
          <div className="flex flex-col" style={{ gap: 'var(--gap-md)' }}>
            <Link href="/" className="block">
              <ImageWithSkeleton
                src="/images/logooFooter.webp"
                alt="BBV logo"
                className="w-[180px] h-auto border-none object-contain"
                click={true}
              />
            </Link>
            <RichParagraph white={true}>
              <span className="text-sm text-[var(--color-secondary)] opacity-80 leading-relaxed">
                Wherever the road leads you is your home. Our custom campers, be it Transit or Sprinter camper vans, are designed to make every journey memorable.
              </span>
            </RichParagraph>

            <div className="flex" style={{ gap: 'var(--gap-sm)' }}>
              {[
                { icon: <FaTwitter />, link: "https://x.com/bigbearvans_", label: "Twitter" },
                { icon: <FaYoutube />, link: "https://www.youtube.com/channel/UCQFzU9eB7Aa8x_E9ov1hD7w", label: "YouTube" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/company/big-bear-vans", label: "LinkedIn" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/bigbearvans/?hl=en", label: "Instagram" }
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  aria-label={item.label}
                  className="p-2.5 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                  style={{
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-md)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Quick Links - All Links Added */}
          <div>
            <Heading3 text="Quick Links" textColor="text-white mb-6 text-lg font-bold" />
            <ul className="grid grid-cols-2 lg:grid-cols-1" style={{ gap: 'var(--gap-xs)' }}>
              <FooterListItem href="/">Home</FooterListItem>
              <FooterListItem href="/camper-vans-for-sale">Vans For Sale</FooterListItem>
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
            <Heading3 text="Contact Info" textColor="text-white mb-6 text-lg font-bold" />
            <ul className="flex flex-col" style={{ gap: 'var(--gap-md)' }}>
              <li className="flex items-start" style={{ gap: 'var(--gap-sm)' }}>
                <FaMapMarkerAlt className="mt-1 text-sm shrink-0" style={{ color: 'var(--color-hover)' }} />
                <div className="flex flex-col">
                  <span className="text-sm text-[var(--color-secondary)] opacity-90 leading-snug">
                    320 W Big Bear Blvd, Big Bear City, California, 92314, USA
                  </span>
                  <button
                    onClick={() => handleCopy("320 W Big Bear Blvd, Big Bear City, California, 92314, USA")}
                    className="flex items-center gap-1 text-[10px] uppercase tracking-wider opacity-40 hover:opacity-100 transition-opacity mt-2"
                    style={{ color: 'var(--color-hover)' }}
                  >
                    <FaCopy /> Copy Address
                  </button>
                </div>
              </li>

              <li className="flex items-start" style={{ gap: 'var(--gap-sm)' }}>
                <FaPhoneAlt className="mt-1 text-sm shrink-0" style={{ color: 'var(--color-hover)' }} />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 group">
                    <Link href="tel:+19514419748" className="text-sm hover:text-[var(--color-hover)] transition-colors">+1 (951) 441-9748</Link>
                    <FaCopy onClick={() => handleCopy("+19514419748")} className="cursor-pointer text-white/20 hover:text-white text-xs" />
                  </div>
                  <div className="flex items-center gap-2 group">
                    <Link href="tel:+19514419719" className="text-sm hover:text-[var(--color-hover)] transition-colors">+1 (951) 441-9719</Link>
                    <FaCopy onClick={() => handleCopy("+19514419719")} className="cursor-pointer text-white/20 hover:text-white text-xs" />
                  </div>
                </div>
              </li>

              <li className="flex items-start" style={{ gap: 'var(--gap-sm)' }}>
                <FaEnvelope className="mt-1 text-sm shrink-0" style={{ color: 'var(--color-hover)' }} />
                <Link href="mailto:bigbearvans@gmail.com" className="text-sm hover:text-[var(--color-hover)] transition-colors truncate">
                  bigbearvans@gmail.com
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Business Hours & Newsletter */}
          <div className="flex flex-col" style={{ gap: 'var(--gap-lg)' }}>
            <div>
              <Heading4 text="Business Hours" className="text-white mb-4 text-xs font-bold uppercase tracking-widest" />
              <div className="flex flex-col text-sm" style={{ gap: 'var(--gap-xs)' }}>
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
                  <span style={{ color: 'var(--color-hover)' }}>By Appointment</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div
              className="p-4 border border-white/10"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-80">Stay Updated</p>
              <div className="flex" style={{ gap: 'var(--gap-xs)' }}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 bg-black/20 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-hover)] transition-colors"
                  style={{ borderRadius: 'var(--radius-md)' }}
                />
                <button
                  onClick={handleSubscribe}
                  aria-label="Subscribe"
                  className="p-2.5 transition-all duration-300 flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--color-hover)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)'
                  }}
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

        </div>
      </div>


    </footer>
  );
}