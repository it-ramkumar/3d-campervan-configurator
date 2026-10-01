"use client";
import { useSearchParams } from "next/navigation";
import { Heading1, RichParagraph, SecondaryButton } from "../Common/Common";
import { useEffect, useState, useSyncExternalStore } from "react";
import { readLeadEmail } from "@/lib/track";

const SOURCE_LABELS = {
  contact: "Contact Request",
  inventory: "Van Inquiry",
  layout: "Build Inquiry",
  quiz: "Van Matchmaker",
  booking: "Consultation Booking",
  build_your_own: "Custom Build Inquiry",
};

const noopSubscribe = () => () => {};

// No conversion tracking here: generate_lead fires from the form after the API confirms the save.
const ThankYou = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "";
  const isCalendar = source === "booking";

  // Client-only read of the email saved by the form; "" during SSR
  const email = useSyncExternalStore(noopSubscribe, readLeadEmail, () => "");
  // State for Reference ID to avoid hydration mismatch
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    setReferenceId("BBV-" + Math.random().toString(36).slice(2, 11).toUpperCase());
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary p-6 relative">
      {/* Dot grid background */}
      <div className="bbv-dot-grid" />

      <div className="relative w-full max-w-2xl bbv-glass border border-white/7 rounded-lg overflow-hidden z-10">
        {/* Amber top accent */}
        <div className="h-[2px] bg-hover w-full" />

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 border border-hover/40"
              style={{ background: "rgba(237,152,95,0.12)" }}>
              <span className="text-3xl">{isCalendar ? "📧" : "✔️"}</span>
            </div>

            <Heading1
              text={isCalendar ? "Action Required: Check Your Inbox!" : "Thank You for Your Inquiry!"}
              className="!text-primary text-center"
            />
          </div>

          {/* Info Box */}
          <div className="space-y-4 mb-10">
            <div className="bg-primary/80 text-secondary p-5 rounded-md font-mono text-sm relative overflow-hidden border border-white/10">
              <div className="bbv-dot-grid" />

              <div className="relative z-10">
                <RichParagraph className="mb-2 uppercase !text-secondary/60 tracking-widest underline">
                  Submission Details
                </RichParagraph>

                <div className={`flex justify-between items-start ${email ? "border-b border-white/10 pb-2 mb-2" : ""}`}>
                  <span className="text-secondary/60">Type:</span>
                  <span className="text-secondary font-semibold">{SOURCE_LABELS[source] || "Inquiry"}</span>
                </div>

                {email && (
                  <div className="flex justify-between items-start">
                    <span className="text-secondary/60">Sent To:</span>
                    <span className="break-all text-right ml-4 font-semibold text-secondary">{email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <RichParagraph className="text-primary/70 text-center italic text-sm leading-relaxed">
              {isCalendar ? (
                <>
                  <strong className="text-hover not-italic block mb-2 text-base">Important Step to Confirm Your Meet:</strong>
                  We have sent an automated Google Calendar invitation to your email.
                  <span className="block mt-2 font-semibold not-italic text-primary">
                    Please open your inbox, open the invitation email, and click{" "}
                    <span className="text-hover">"Yes"</span> or{" "}
                    <span className="text-hover">"Going"</span> to lock in your time slot.
                  </span>
                </>
              ) : (
                <>
                  Thank you for reaching out to us. We've successfully received your inquiry and sent all the details to your email address.
                </>
              )}
              <br />
              <br />
              Please check your inbox (and spam folder just in case). Our team will review your request and get back to you shortly.
            </RichParagraph>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SecondaryButton label="Back to Home" link="/" />

            {isCalendar && (
              <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="w-full">
                <SecondaryButton
                  label="Open Gmail Inbox"
                  className="!bg-rose-600 hover:!bg-rose-700 !text-white w-full"
                />
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/5 p-3 flex justify-between items-center border-t border-white/10">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-hover animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-secondary/30"></div>
          </div>

          <span className="text-[9px] font-mono text-secondary/40 uppercase tracking-widest">
            Reference ID: {referenceId}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
