"use client";

import React, { useState } from "react";
// React Icons imports
import { FaFacebookF, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FiShare2, FiExternalLink } from "react-icons/fi";

const SideShareBar = ({ url }) => {
  const [open, setOpen] = useState(false);

  const shareLink = (platform) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/bigbearvans/`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/bigbearvans/`; // Instagram direct share nahi hota
        break;
      case "tiktok":
        shareUrl = `https://www.tiktok.com/@bigbearvans_`; // TikTok profile link
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/company/big-bear-vans`;
        break;
      case "copy":
        navigator.clipboard.writeText(url || window.location.href);
        alert("Link copied!");
        return;
      default:
        break;
    }

    if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-0 top-[40%] transform -translate-y-1/2 z-50 p-2 rounded-r-lg shadow-lg transition-all"
        style={{
          backgroundColor: '#001F3D',
          color: '#F5F5F0'
        }}
      >
        <FiExternalLink size={20} />
      </button>

      {/* Slide-in Share Icons */}
      <div
        className={`fixed left-0 top-[65%] transform -translate-y-1/2 z-40 flex flex-col space-y-4 p-3 bg-white shadow-lg transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-24"
        }`}
        style={{
          borderRadius: '0 15px 15px 0',
          border: '1px solid #ACBAC4'
        }}
      >
        <button onClick={() => shareLink("facebook")} className="hover:text-blue-600 transition-colors">
          <FaFacebookF size={24} />
        </button>

        <button onClick={() => shareLink("instagram")} className="hover:text-pink-600 transition-colors">
          <FaInstagram size={24} />
        </button>

        <button onClick={() => shareLink("tiktok")} className="hover:text-black transition-colors">
          <FaTiktok size={24} />
        </button>

        <button onClick={() => shareLink("linkedin")} className="hover:text-blue-500 transition-colors">
          <FaLinkedin size={24} />
        </button>

        <button onClick={() => shareLink("copy")} className="hover:text-[#ED985F] transition-colors">
          <FiShare2 size={24} />
        </button>
      </div>
    </>
  );
};

export default SideShareBar;