"use client";
import React from "react";
import Link from "next/link";
import { Share2 } from "lucide-react";

export default function JobDetailsClient({ job }) {
  const handleShare = () => {
    if (typeof window === "undefined") return;

    navigator.share?.({
      title: job?.title,
      text: `Check out this ${job?.title} role at Big Bear Vans!`,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleShare}
        className="p-4 rounded-lg bbv-card text-primary/60 hover:text-hover hover:border-hover/40 transition-all border border-primary/10"
        title="Share Job"
      >
        <Share2 className="w-5 h-5" />
      </button>

      <Link
        href={`/apply/${job._id}`}
        className="bg-hover text-primary font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
      >
        APPLY NOW
      </Link>
    </div>
  );
}
