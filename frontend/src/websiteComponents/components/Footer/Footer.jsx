"use client";

import React, { useState } from "react";
const Swal = () => import('sweetalert2');
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaLinkedin, FaArrowRight, FaYoutube, FaCopy } from "react-icons/fa";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import { FooterListItem } from "../Common/Li/FooterLiItem"; // ✅ Import
import RichParagraph from "../Common/Paragraph/RichParagraph";
import Heading3 from "../Common/Headings/Heading3";
import Heading4 from "../Common/Headings/Heading4";


const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
  alert(`Copied: ${text}`);
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address first!",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "You'll receive notifications and updates soon 🎉",
      confirmButtonColor: "#3085d6",
    });

    setEmail("");
  };

  return (
    <footer className="relative text-white pt-16 pb-8 bg-cover bg-center bg-no-repeat font-serif">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-no-repeat"
        style={{
          backgroundImage: "url('/heroSlider/Screenshot.webp')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/80"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <ImageWithSkeleton
                src="/images/logooFooter.webp"
                alt="BBV logo"
                className="w-[170px] h-[30px] border-none object-contain"
                click={true}
              />
            </Link>
            <RichParagraph white={true}>

              <span className="text-sm text-white">

                Wherever the road leads you is your home. Our custom campers, be it Transit or Sprinter camper vans, are designed to make every journey memorable.
              </span>
            </RichParagraph>


            {/* Social Icons */}
            <div className="flex gap-4">
              <Link
                to="https://x.com/bigbearvans_"
                aria-label="Follow us on X (Twitter)"
                className="p-2 transition-all duration-300 transform hover:scale-125"
              >
                <FaTwitter size={20} />
              </Link>

              <Link
                to="https://www.youtube.com/channel/UCQFzU9eB7Aa8x_E9ov1hD7w"
                aria-label="Visit our YouTube channel"
                className="p-2 transition-all duration-300 transform hover:scale-125"
              >
                <FaYoutube size={20} />
              </Link>

              <Link
                to="https://www.linkedin.com/company/big-bear-vans"
                aria-label="Connect with us on LinkedIn"
                className="p-2 transition-all duration-300 transform hover:scale-125"
              >
                <FaLinkedin size={20} />
              </Link>

              <Link
                to="https://www.instagram.com/bigbearvans/?hl=en"
                aria-label="Follow us on Instagram"
                className="p-2 transition-all duration-300 transform hover:scale-125"
              >
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links - ✅ Using FooterListItem */}
          <div>
            {/* H4 ki jagah H3 use karein */}
            <Heading3 text="Quick Links" textColor="text-white my-4 text-lg lg:text-xl" />
             <ul className="space-y-1">
              <FooterListItem to="/" className="text-sm">Home</FooterListItem>
              <FooterListItem to="/vans-for-sale" className="text-sm">Vans For Sale</FooterListItem>
              <FooterListItem to="/van-layouts" className="text-sm"> Layouts</FooterListItem>
              <FooterListItem to="/about-us" className="text-sm">About Us</FooterListItem>
              <FooterListItem to="/careers" className="text-sm">Career</FooterListItem>
              <FooterListItem to="/blog" className="text-sm">Blog</FooterListItem>
              <FooterListItem to="/faq" className="text-sm">FAQs</FooterListItem>
              <FooterListItem to="/quick-links" className="text-sm">Quick Links</FooterListItem>
            </ul>
          </div>

          {/* Contact Info */}
         <div>
  {/* 🟢 FIXED: Heading4 ko Heading3 kiya hierarchy theek karne ke liye */}
  <Heading3 text="Contact Info" textColor="text-white my-4" />

  <ul className="space-y-4">
    <li className="flex items-start gap-3">
      <FaMapMarkerAlt className="text-white mt-1 text-sm" aria-hidden="true" />
      <div className="flex items-center gap-2">
        <span>
          <RichParagraph white={true}>
            <span className="text-sm text-white">
              320 W Big Bear Blvd, Big Bear City, California, 92314, USA
            </span>
          </RichParagraph>
        </span>
        {/* 🟢 FIXED: Copy button ko aria-label diya */}
        <FaCopy
          role="button"
          aria-label="Copy address to clipboard"
          onClick={() => handleCopy("320 W Big Bear Blvd, Big Bear City, California, 92314, USA")}
          className="cursor-pointer text-gray-400 hover:text-white transition-colors"
        />
      </div>
    </li>

    <li className="flex items-start gap-3">
      <FaPhoneAlt className="text-white mt-1 text-sm" aria-hidden="true" />
      <div className="flex flex-col">
        {/* Phone 1 */}
        <div className="flex items-center gap-2 text-sm">
          {/* 🟢 FIXED: Link ko aria-label diya */}
          <Link to="tel:+19514419748" aria-label="Call us at +1 951 441 9748">
            <RichParagraph white={true}>
              <span className="text-sm text-white">+1 (951) 441-9748</span>
            </RichParagraph>
          </Link>
          <FaCopy
            role="button"
            aria-label="Copy phone number +1 951 441 9748"
            onClick={() => handleCopy("+19514419748")}
            className="cursor-pointer text-gray-400 hover:text-white transition-colors"
          />
        </div>

        {/* Phone 2 */}
        <div className="flex items-center gap-2 text-sm">
          {/* 🟢 FIXED: Link ko aria-label diya */}
          <Link to="tel:+19514419719" aria-label="Call us at +1 951 441 9719">
            <RichParagraph white={true}>
              <span className="text-sm text-white">+1 (951) 441-9719</span>
            </RichParagraph>
          </Link>
          <FaCopy
            role="button"
            aria-label="Copy phone number +1 951 441 9719"
            onClick={() => handleCopy("+19514419719")}
            className="cursor-pointer text-gray-400 hover:text-white transition-colors"
          />
        </div>
      </div>
    </li>

    <li className="flex items-start gap-3">
      <FaEnvelope className="text-white mt-1 text-sm" aria-hidden="true" />
      {/* 🟢 FIXED: Email link ko aria-label diya */}
      <Link to="mailto:bigbearvans@gmail.com" aria-label="Send us an email">
        <RichParagraph white={true}>
          <span className="text-sm text-white">bigbearvans@gmail.com</span>
        </RichParagraph>
      </Link>
    </li>
  </ul>
</div>

          {/* Business Hours & Newsletter */}
          <div>
            <Heading4 text="  Business Hours" textColor="text-white my-4" />


            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex justify-between text-gray-300">
                <RichParagraph white={true}>
                  <span className="text-sm text-white">
                    Mon - Fri:
                  </span>
                </RichParagraph>
                <RichParagraph white={true}>
                  <span className="text-sm text-white">
                    9:00 AM - 6:00 PM
                  </span>
                </RichParagraph>
              </li>
              <li className="flex justify-between text-gray-300">
                <RichParagraph white={true}>
                  <span className="text-sm text-white">
                    Saturday:
                  </span>
                </RichParagraph>
                <RichParagraph white={true}>
                  <span className="text-sm text-white">
                    10:00 AM - 4:00 PM
                  </span>
                </RichParagraph>

              </li>

              <li className="flex justify-between text-gray-300">
                <RichParagraph white={true}>
                  <span className="text-sm text-white">
                    Sunday:
                  </span>
                </RichParagraph>
                <RichParagraph white={true}>
                  <span className="text-sm text-white">
                    By Appointment
                  </span>
                </RichParagraph>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <Heading4 text="Stay Updated" white={true} className="my-2" />

              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  onClick={handleSubscribe}
                  aria-label="Subscribe to newsletter" // Ye label screen reader ko batayega ke ye button kya karta hai
                  className="bg-white hover:bg-gray-200 text-black p-2 rounded-lg transition-colors"
                >
                  <FaArrowRight aria-hidden="true" /> {/* Icon ko screen reader se hide kar diya */}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <RichParagraph white={true}>
            <span className="text-sm text-white">

              © {new Date().getFullYear()} BIG BEAR VANS. All Rights Reserved.
            </span>
          </RichParagraph>

        </div>
      </div>

      {/* Chatmaxima Scripts */}
      <div className="hidden">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.chatmaximaConfig = { token: 'miutk867bnhw' , theme_color:'#5c526b' , widget_icon:'https://chatmaxima.com/uploads/widget/632/2025/9/22/logo.png' };
            `,
          }}
        />
        <script src="https://widget.chatmaxima.com/embed.min.js" id="miutk867bnhw" defer></script>
      </div>
    </footer>
  );
}