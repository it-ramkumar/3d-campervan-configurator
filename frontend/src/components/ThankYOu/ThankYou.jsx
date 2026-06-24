"use client";
import { useSearchParams } from "next/navigation";
import { Heading1, RichParagraph, SecondaryButton } from "../Common/Common";
import { useEffect, useState } from "react";
import { sendGTMEvent } from '@next/third-parties/google';

const ThankYou = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user@van-life.com";
  const source = searchParams.get("source") || "unknown";
  const vanTitle = searchParams.get("van") || "No Van Selected";

  // State for Reference ID to avoid hydration mismatch
  const [referenceId, setReferenceId] = useState("");

  // Clean source for UI checks (Tension free matching)
  const isCalendar = source.toLowerCase().includes("calendar");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Generate Reference ID safely on client side
    setReferenceId("BBV-" + Math.random().toString(36).substr(2, 9).toUpperCase());

    // 🔴 DEBUG LOGS
    console.log("--- TRACKING DEBUG START ---");
    console.log("RAW SOURCE FROM URL:", source);

    if (!source || source === "unknown") {
      console.log("TRACKING SKIPPED: Source is empty or unknown");
      return;
    }

    const currentSource = source.toLowerCase();
    console.log("LOWERCASE SOURCE:", currentSource);
    console.log("--- TRACKING DEBUG END ---");

    // 🔐 DEBUNCE / SESSION LOCK SYSTEM
    window.__FIRED_CONVERSIONS__ = window.__FIRED_CONVERSIONS__ || {};
    if (window.__FIRED_CONVERSIONS__[currentSource]) {
      console.log(`LOCK ACTIVE: Conversion for [${currentSource}] already sent.`);
      return;
    }

    // Target variables
    let targetLabel = "";

    // 🎯 URL SOURCE MATCHING
    if (currentSource.includes("calendar")) {
      // 📝 TODO: Yahan apne Google Ads calendar goal ka real label paste karein
      targetLabel = "AW-16677332528/YAHAN_CALENDAR_KA_LABEL_DEIN";
    } else if (currentSource.includes("inquiry")) {
      targetLabel = "AW-16677332528/TFmwCMXKwMQcELDMr5A-";
    } else if (currentSource.includes("contact")) {
      targetLabel = "AW-16677332528/E1hYCOzM6b0cELDMr5A-";
    }

    // 🚀 FIRE EVENT TO GTM
    if (targetLabel) {
      window.__FIRED_CONVERSIONS__[currentSource] = true; // Lock immediately

      sendGTMEvent({
        event: "conversion",
        send_to: targetLabel,
      });

      console.log(`🚀 NEXT.JS GTM EVENT SENT for label: ${targetLabel}`);
    } else {
      console.log("NO MATCHING SOURCE FOUND FOR GOOGLE ADS");
    }

  }, [source, vanTitle]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-6">
      <div className="relative w-full max-w-2xl bg-white border-2 border-secondary rounded-lg shadow-xl overflow-hidden">
        <div className="h-2 bg-primary w-full" />

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center border-2 border-[#30364F] mb-6 shadow-inner">
              <span className="text-3xl">{isCalendar ? "📧" : "✔️"}</span>
            </div>

            <Heading1
              text={isCalendar ? "Action Required: Check Your Inbox!" : "Thank You for Your Inquiry!"}
              className="!text-primary text-center"
            />
          </div>

          {/* Info Box */}
          <div className="space-y-4 mb-10">
            <div className="bg-primary text-secondary p-5 rounded-md font-mono text-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(245,245,240,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(245,245,240,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

              <div className="relative z-10">
                <RichParagraph className="mb-2 uppercase !text-secondary tracking-widest underline">
                  Submission Details
                </RichParagraph>

                <div className="flex justify-between items-start border-b border-primary pb-2 mb-2">
                  <span>Type:</span>
                  <span className="text-secondary/80 font-semibold">{source}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span>Sent To:</span>
                  <span className="break-all text-right ml-4 font-semibold">{email}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <RichParagraph className="text-primary text-center italic text-sm leading-relaxed">
              {isCalendar ? (
                <>
                  <strong className="text-red-600 not-italic block mb-2 text-base">⚠️ Important Step to Confirm Your Meet:</strong>
                  We have sent an automated Google Calendar invitation to your email.
                  <span className="block mt-2 font-semibold not-italic text-slate-800">
                    Please open your inbox, open the invitation email, and click <span className="text-emerald-600">"Yes"</span> or <span className="text-emerald-600">"Going"</span> to lock in your time slot.
                  </span>
                </>
              ) : (
                <>
                  Thank you for reaching out to us. We’ve successfully received your inquiry and sent all the details to your email address.
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
        <div className="bg-primary/10 p-3 flex justify-between items-center border-t border-secondary/30">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
          </div>

          <span className="text-[9px] font-mono text-secondary uppercase tracking-widest">
            Reference ID: {referenceId}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;