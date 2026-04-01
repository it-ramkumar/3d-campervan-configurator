"use client";
import { usePathname } from "next/navigation";
import {
  Heading1,
  RichParagraph,
  SecondaryButton,
} from "../Common/Common";

const ThankYou = () => {
  const location = usePathname();


  const email = location.state?.email || "user@van-life.com";

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-6">
      {/* Main Container */}
      <div className="relative w-full max-w-2xl bg-white border-2 border-secondary rounded-lg shadow-xl overflow-hidden">

        {/* Top Accent */}
        <div className="h-2 bg-primary w-full" />

        <div className="p-8 md:p-12">

          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center border-2 border-[#30364F] mb-6 shadow-inner">
              <span className="text-3xl">✔️</span>
            </div>

            <Heading1
              text="Thank You for Your Inquiry!"
              className="!text-primary text-center"
            />
          </div>

          {/* Info Box */}
          <div className="space-y-4 mb-10">
            <div className="bg-primary text-secondary p-5 rounded-md font-mono text-sm relative overflow-hidden">

              {/* Grid Overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(245,245,240,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(245,245,240,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

              <div className="relative z-10">
                <RichParagraph className="mb-2 uppercase !text-secondary tracking-widest underline">
                  Submission Details
                </RichParagraph>

                <div className="flex justify-between items-start border-b border-primary pb-2 mb-2">
                  <span>Status:</span>
                  <span className="text-secondary/80">
                    Successfully Submitted
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <span>Email:</span>
                  <span className="break-all text-right ml-4 font-semibold">
                    {email}
                  </span>
                </div>
              </div>
            </div>

            {/* Message */}
            <RichParagraph className="text-primary text-center italic text-sm leading-relaxed">
              Thank you for reaching out to us. We’ve successfully received your
              inquiry and sent all the details to your email address.
              <br /><br />
              Please check your inbox (and spam folder just in case). Our team
              will review your request and get back to you shortly.
            </RichParagraph>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SecondaryButton
              label="Back to Home"
              link="/"
            />

          </div>
        </div>

        {/* Footer */}
        <div className="bg-primary/10 p-3 flex justify-between items-center border-t border-secondary/30">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
          </div>

          <span className="text-[9px] font-mono text-secondary uppercase tracking-widest">
            Reference ID: {Math.random().toString(36).substring(7).toUpperCase()}
          </span>
        </div>

      </div>
    </div>
  );
};

export default ThankYou;