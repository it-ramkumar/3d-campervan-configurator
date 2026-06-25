"use client";
import React, { useState } from "react";
import {
  Upload, Send, CheckCircle2, User, Mail, FileText, Loader2
} from "lucide-react";
import Link from "next/link";

export default function ApplyForm({ jobId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resumeName, setResumeName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append("jobId", jobId);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/applications/apply`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (err) {
      alert("Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="p-12 text-center animate-in fade-in zoom-in duration-300 bbv-card rounded-lg">
        <div className="w-20 h-20 bg-hover/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-hover/30">
          <CheckCircle2 className="w-10 h-10 text-hover" />
        </div>
        <h2 className="font-display text-primary uppercase tracking-wide text-3xl font-bold mb-4">
          Submission Received!
        </h2>
        <p className="text-primary/60 mb-8 text-lg">
          Thank you for applying. Our recruiting team will review your application soon.
        </p>
        <Link
          href="/careers"
          className="inline-flex items-center justify-center bg-hover text-primary font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:brightness-110 transition-all"
        >
          Explore More Roles
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      {/* Name */}
      <div>
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">
          <User className="w-4 h-4 text-hover" /> Full Name
        </label>
        <input
          type="text"
          name="name"
          className="w-full bg-white border border-primary/20 rounded-lg px-4 py-3 text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-hover/40 focus:border-hover/50 transition-all"
          placeholder="Enter your full name"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">
          <Mail className="w-4 h-4 text-hover" /> Email Address
        </label>
        <input
          type="email"
          name="email"
          className="w-full bg-white border border-primary/20 rounded-lg px-4 py-3 text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-hover/40 focus:border-hover/50 transition-all"
          placeholder="name@example.com"
          required
        />
      </div>

      {/* Resume Upload */}
      <div>
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">
          <FileText className="w-4 h-4 text-hover" /> Resume / CV
        </label>
        <div className="relative border-2 border-dashed border-primary/10 hover:border-hover/40 rounded-xl p-8 transition-colors group text-center bg-primary/5">
          <input
            type="file"
            name="resume"
            onChange={(e) => setResumeName(e.target.files[0]?.name)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".pdf,.doc,.docx"
            required
          />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-hover/10 text-hover border border-hover/30 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-primary/70 font-medium">
              {resumeName || "Click to upload or drag and drop"}
            </p>
            <p className="text-primary/30 text-xs mt-1">PDF, DOC, DOCX up to 10MB</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-hover text-primary font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:brightness-110 transition-all transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Submit Application
            <Send className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-primary/30 mt-4">
        By submitting, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
}
