"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

const ShareButton = ({
  title = "Check this out!",
  className = ""
}) => {

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // Mobile Native Share
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
    // Desktop Fallback → Copy Link
    else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert("Unable to copy link");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#001F3D] text-[#001F3D] font-semibold hover:bg-[#001F3D] hover:text-white transition-all ${className}`}
    >
      {copied ? <Check size={18} /> : <Share2 size={18} />}
      {copied ? "Link Copied" : "Share This Build"}
    </button>
  );
};

export default ShareButton;