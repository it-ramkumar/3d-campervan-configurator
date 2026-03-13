"use client";

import React, { useState } from "react";
// Instagram aur music (TikTok ke liye) icons add kiye hain
import { SquareArrowOutUpRight, Facebook, Twitter, Linkedin, Share2, Instagram, Music2 } from "lucide-react";

const SideShareBar = ({ url }) => {
  const [open, setOpen] = useState(false);

  const shareLink = (platform) => {
    const encodedUrl = encodeURIComponent(url || (typeof window !== "undefined" ? window.location.href : ""));
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/bigbearvans`;
        break;
      case "instagram":
        // Instagram direct sharing allow nahi karta, isliye profile link
        shareUrl = `https://www.instagram.com/bigbearvans/`;
        break;
      case "tiktok":
        // TikTok profile link
        shareUrl = `https://www.tiktok.com/@bigbearvans_`;
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
      {/* Toggle Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-0 top-[40%] transform -translate-y-1/2 z-50 p-3 rounded-r-lg shadow-lg transition-all"
        style={{
          backgroundColor: '#001F3D', // Aapka Dark Theme Color
          color: '#F5F5F0'           // Aapka Light Theme Color
        }}
      >
        <SquareArrowOutUpRight size={24} />
      </button>

      {/* Slide-in Share Icons */}
      <div
        className={`fixed left-0 top-[60%] transform -translate-y-1/2 z-40 flex flex-col space-y-4 p-3 bg-white shadow-lg transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-24"
        }`}
        style={{
          borderRadius: '0 15px 15px 0', // Aapka Rounded Border Style
          border: '1px solid #ACBAC4'   // Theme Border
        }}
      >
        <button onClick={() => shareLink("facebook")} className="hover:text-blue-600 transition-colors">
          <Facebook size={24} />
        </button>

        {/* Instagram Added */}
        <button onClick={() => shareLink("instagram")} className="hover:text-pink-600 transition-colors">
          <Instagram size={24} />
        </button>

        {/* TikTok Added */}
        <button onClick={() => shareLink("tiktok")} className="hover:text-black transition-colors">
          <Music2 size={24} /> {/* Music2 icon TikTok ke liye best hai */}
        </button>

        <button onClick={() => shareLink("copy")} className="hover:text-[#ED985F] transition-colors">
          <Share2 size={24} />
        </button>
      </div>
    </>
  );
};

export default SideShareBar;