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
      targetLabel = "AW-16677332528/YAHAN_CALENDAR_KA_LABEL_DEIN";
    } else if (currentSource.includes("inquiry")) {
      targetLabel = "AW-16677332528/tfm6CM_S-MQcELDMr5A-";
    } else if (currentSource.includes("contact")) {
      targetLabel = "AW-16677332528/zNLyCKCpjsUcELDMr5A-";
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
    <div className="flex items-center justify-center min-h-screen bg-canvas p-6 relative">
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
              className="!text-secondary text-center"
            />
          </div>

          {/* Info Box */}
          <div className="space-y-4 mb-10">
            <div className="bg-canvas/80 text-secondary p-5 rounded-md font-mono text-sm relative overflow-hidden border border-white/10">
              <div className="bbv-dot-grid" />

              <div className="relative z-10">
                <RichParagraph className="mb-2 uppercase !text-secondary/60 tracking-widest underline">
                  Submission Details
                </RichParagraph>

                <div className="flex justify-between items-start border-b border-white/10 pb-2 mb-2">
                  <span className="text-secondary/60">Type:</span>
                  <span className="text-secondary font-semibold">{source}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-secondary/60">Sent To:</span>
                  <span className="break-all text-right ml-4 font-semibold text-secondary">{email}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <RichParagraph className="text-secondary/70 text-center italic text-sm leading-relaxed">
              {isCalendar ? (
                <>
                  <strong className="text-hover not-italic block mb-2 text-base">Important Step to Confirm Your Meet:</strong>
                  We have sent an automated Google Calendar invitation to your email.
                  <span className="block mt-2 font-semibold not-italic text-secondary">
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
