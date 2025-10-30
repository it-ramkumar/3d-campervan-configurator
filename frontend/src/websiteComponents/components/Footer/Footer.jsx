"use client";

import React,{useState} from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram,  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaLinkedin , FaArrowRight, FaYoutube, FaCopy } from "react-icons/fa";
const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
  // Optional: Add a toast notification or some other feedback here
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
      text: "You’ll receive notifications and updates soon 🎉",
      confirmButtonColor: "#3085d6",
    });

    setEmail(""); // clear input
  };
  return (
    <footer className="relative text-white pt-16 pb-8 bg-cover bg-center bg-no-repeat font-serif">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-no-repeat"
        style={{
          backgroundImage: "url('/heroSlider/Screenshot_6.webp')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/80"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* Company Info */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold">
              BIG BEAR VANS
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-xs text-sm">
              Wherever the road leads you is your home. Our custom campers, be it Transit or Sprinter camper vans, are designed to make every journey memorable.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
         <Link to="https://x.com/bigbearvans_" className="p-2 transition-all duration-300 transform hover:scale-125">
                     <FaTwitter size={30} className="" />
                   </Link>
                   <Link to="https://www.youtube.com/channel/UCQFzU9eB7Aa8x_E9ov1hD7w" className="p-2 transition-all duration-300 transform hover:scale-125">
                     <FaYoutube size={30} className="" />
                   </Link>
                   <Link to="https://www.linkedin.com/company/big-bear-vans" className="p-2 transition-all duration-300 transform hover:scale-125">
                     <FaLinkedin size={30} className="" />
                   </Link>
                   {/* <Link to="#" className="p-2 transition-all duration-300 transform hover:scale-125">
                     <FaWhatsapp size={30} className="text-black" />
                   </Link> */}
                   <Link to="https://www.instagram.com/bigbearvans/?hl=en" className="p-2 transition-all duration-300 transform hover:scale-125">
                     <FaInstagram size={30} className="" />
                   </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="sm:text-base text-sm font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 list-disc list-inside  text-sm">
              <li>
                <Link to="/" className="text-gray-300  hover:text-white transition-colors duration-300 underline">Home</Link>
              </li>
              <li>
                <Link to="/vans-for-sale" className="text-gray-300 hover:text-white transition-colors duration-300 underline">Vans For Sale</Link>
              </li>
              <li>
                <Link to="/layouts" className="text-gray-300 hover:text-white transition-colors duration-300 underline">Layout</Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-white transition-colors duration-300 underline">About Us</Link>
              </li>
              {/* <li>
                <Link to="https://bigbearvans.com/careers/" className="text-gray-300 hover:text-white transition-colors duration-300 underline">Career</Link>
              </li> */}
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-white transition-colors duration-300 underline">Blog</Link>
              </li>
              {/* <li>
                <Link to="/faqs" className="text-gray-300 hover:text-white transition-colors duration-300 underline">FAQ</Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-6 text-white">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-white mt-1 text-sm" />
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 text-sm">320 W Big Bear Blvd, Big Bear City, California, 92314, USA</span>
                  <FaCopy onClick={() => handleCopy("320 W Big Bear Blvd, Big Bear City, California, 92314, USA")} className="cursor-pointer text-gray-400 hover:text-white transition-colors" />
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-white mt-1 text-sm" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-sm">
                    <a href="tel:+19514419748" className="text-gray-300 hover:text-white transition-colors">+1 (951) 441-9748</a>
                    <FaCopy onClick={() => handleCopy("+19514419748")} className="cursor-pointer text-gray-400 hover:text-white transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <a href="tel:+19514419719" className="text-gray-300 hover:text-white transition-colors">+1 (951) 441-9719</a>
                    <FaCopy onClick={() => handleCopy("+19514419719")} className="cursor-pointer text-gray-400 hover:text-white transition-colors" />
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-white mt-1 text-sm" />
                <a href="mailto:info@bigbearvans.com" className="text-gray-300 hover:text-white transition-colors">info@bigbearvans.com</a>
              </li>
            </ul>
          </div>

          {/* Business Hours & Newsletter */}
          <div>
            <h3 className="text-base font-semibold mb-6 text-white">
              Business Hours
            </h3>
            <ul className="space-y-2 mb-6 text-sm">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          onClick={handleSubscribe}
          className="bg-white hover:bg-gray-200 text-black p-2 rounded-lg transition-colors"
        >
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
          {/* <div className="flex gap-6 text-sm text-gray-400">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div> */}
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