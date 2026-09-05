"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
const Consultation = dynamic(() => import("@/components/Consultation/Consultation"));
import SideShareBar from "@/components/Common/ShareIcon/ShareIcon";
import SmoothScroll from "@/components/SmoothScrolling/SmoothScrolling";
import FloatingCallButton from "../Common/FloatingCallButton/FloatingCallButton";
import LaborDayPopup from "../LaborDayPopup/LaborDayPopup";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // 1. Exact paths jahan sab kuch hide karna hai
  const exactHideLayoutPaths = ["/van", "/configurator", "/dashboard"];
  const exactHideConsultationPaths = ["/build-your-own-camper-van", "/thank-you"];

  // 2. Dynamic checks (Jo paths variable elements contain karte hain)
  const isQuotePreview = pathname.startsWith("/quote/preview/");

  // Naya Check: Agar URL /configure par end ho raha ho (e.g., /camper-vans-for-sale/my-van/configure)
  const isConfiguratorPage = pathname.endsWith("/configure");

  // Final Logic Toggles
  const hideLayout =
    exactHideLayoutPaths.includes(pathname) ||
    isQuotePreview ||
    isConfiguratorPage;
  const hideConsultation =
    exactHideConsultationPaths.includes(pathname) ||
    isQuotePreview ||
    isConfiguratorPage;
  const hideShareBar = isConfiguratorPage;
  const hideFloatingButtonPaths = ["/configurator", "/build-your-own-camper-van"];

  const hideFloatingButton = hideFloatingButtonPaths.includes(pathname);

  return (
    <>
      <SmoothScroll>
        {/* Cleaned: Client side loader events completely removed */}

        {!hideLayout && <Navbar />}
        <LaborDayPopup />
        {!hideShareBar && hideShareBar && <SideShareBar />}
        {!hideFloatingButton && <FloatingCallButton />}
        <main className="flex-1">{children}</main>

        {!hideLayout && !hideConsultation && <Consultation />}
        {!hideLayout && <Footer />}
      </SmoothScroll>
    </>
  );
}
