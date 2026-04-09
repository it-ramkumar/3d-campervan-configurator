"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Consultation from "@/components/Consultation/Consultation";
import SideShareBar from "@/components/Common/ShareIcon/ShareIcon";
import Loader from "@/components/Loader/Loader";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Loader ke liye useEffect
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // App Router me routeChangeStart/Complete direct events nahi hote
    // Lekin client-side navigation me Link click se turant loader show karne ke liye:
    const handleLinkClick = (e) => {
      const link = e.target.closest("a");
      if (link && link.href && !link.target) {
        handleStart();
      }
    };

    document.addEventListener("click", handleLinkClick);

    // Optional: loader 3s me auto hide agar SSR slow ho
    const timeout = setTimeout(() => setLoading(false), 3000);

    return () => {
      document.removeEventListener("click", handleLinkClick);
      clearTimeout(timeout);
    };
  }, []);

const exactHideLayoutPaths = ["/van", "/configurator", "/dashboard"];
  const exactHideConsultationPaths = ["/inquiry", "/thank-you"];

  // 2. Dynamic check (Check if path STARTS with certain string)
  const isQuotePreview = pathname.startsWith("/quote/preview/");

  // Final Logic
  const hideLayout = exactHideLayoutPaths.includes(pathname) || isQuotePreview;
  const hideConsultation = exactHideConsultationPaths.includes(pathname) || isQuotePreview;

  return (
    <>
      {loading && <Loader />}
      {!hideLayout && <Navbar />}
      <SideShareBar />
      <main className="flex-1">{children}</main>
      {!hideLayout && !hideConsultation && <Consultation />}
      {!hideLayout && <Footer />}
    </>
  );
}