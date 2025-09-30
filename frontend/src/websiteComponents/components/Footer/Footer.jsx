"use client";

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaArrowRight, FaYoutube, FaWhatsapp, FaCopy } from "react-icons/fa";

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
  // Optional: Add a toast notification or some other feedback here
  alert(`Copied: ${text}`);
};

export default function Footer() {
  return (
    <footer className="relative text-white pt-16 pb-8 bg-cover bg-center bg-no-repeat">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-no-repeat"
        style={{
          backgroundImage: "url('/heroSlider/Screenshot_6.png.webp')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/80"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* Company Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              BIG BEAR VANS
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-xs">
              Wherever the road leads you is your home. Our custom campers, be it Transit or Sprinter camper vans, are designed to make every journey memorable.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full transition-all duration-300 transform hover:scale-125">
                <FaTwitter className="text-white text-lg" />
              </a>
              <a href="#" className="p-2 rounded-full transition-all duration-300 transform hover:scale-125">
                <FaYoutube className="text-white text-lg" />
              </a>
              <a href="#" className="p-2 rounded-full transition-all duration-300 transform hover:scale-125">
                <FaLinkedinIn className="text-white text-lg" />
              </a>
              <a href="#" className="p-2 rounded-full transition-all duration-300 transform hover:scale-125">
                <FaWhatsapp className="text-white text-lg" />
              </a>
              <a href="#" className="p-2 rounded-full transition-all duration-300 transform hover:scale-125">
                <FaInstagram className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 underline">Home</a>
              </li>
              <li>
                <a href="https://bigbearvans.com/vans-for-sale-2/" className="text-gray-300 hover:text-white transition-colors duration-300 underline">Vans For Sale</a>
              </li>
              <li>
                <a href="https://bigbearvans.com/layout-page/" className="text-gray-300 hover:text-white transition-colors duration-300 underline">Portfolio</a>
              </li>
              <li>
                <a href="https://bigbearvans.com/about-us/" className="text-gray-300 hover:text-white transition-colors duration-300 underline">About Us</a>
              </li>
              <li>
                <a href="https://bigbearvans.com/careers/" className="text-gray-300 hover:text-white transition-colors duration-300 underline">Career</a>
              </li>
              <li>
                <a href="https://bigbearvans.com/blog-page/" className="text-gray-300 hover:text-white transition-colors duration-300 underline">Blog</a>
              </li>
              <li>
                <a href="https://bigbearvans.com/faqs/" className="text-gray-300 hover:text-white transition-colors duration-300 underline">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-white mt-1 text-lg" />
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">320 W Big Bear Blvd, Big Bear City, California, 92314, USA</span>
                  <FaCopy onClick={() => handleCopy("320 W Big Bear Blvd, Big Bear City, California, 92314, USA")} className="cursor-pointer text-gray-400 hover:text-white transition-colors" />
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-white mt-1 text-lg" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <a href="tel:+19514419748" className="text-gray-300 hover:text-white transition-colors">+1 (951) 441-9748</a>
                    <FaCopy onClick={() => handleCopy("+19514419748")} className="cursor-pointer text-gray-400 hover:text-white transition-colors" />
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="tel:+19514419719" className="text-gray-300 hover:text-white transition-colors">+1 (951) 441-9719</a>
                    <FaCopy onClick={() => handleCopy("+19514419719")} className="cursor-pointer text-gray-400 hover:text-white transition-colors" />
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-white mt-1 text-lg" />
                <a href="mailto:info@bigbearvans.com" className="text-gray-300 hover:text-white transition-colors">info@bigbearvans.com</a>
              </li>
            </ul>
          </div>

          {/* Business Hours & Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">
              Business Hours
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex justify-between text-gray-300">
                <span>Mon - Fri:</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Sunday:</span>
                <span className="text-green-400">By Appointment</span>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium mb-3 text-white">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white hover:bg-gray-200 text-black p-2 rounded-lg transition-colors">
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} BIG BEAR VANS. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
      
      {/* Chatmaxima Scripts - Added here at the end of the footer body */}
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