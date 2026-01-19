import React, { useEffect, useState, useCallback } from "react";
import AvailableVans from "./AvailableVans/AvailableVans";
import SoldVans from "./SoldVans/SoldVans";
import Consultation from "../Consultation/Consultation";
import FaqV from "../Faqs/Faqs";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import HeroSection from "../HeroSection/HeroSection";
import { vansByStatus } from "../../../api/van/van-by-status";
import { createItemListSchema } from "../../schema/vanSchema";
import { createFAQSchema } from "../../schema/faqSchema";
import { createServiceSchema } from "../../schema/serviceSchema"

export default function VansForSale() {
  const limit = 9;

  /* ================= ALL STATES ================= */
  const [availableVans, setAvailableVans] = useState([]);
  const [availablePage, setAvailablePage] = useState(1);
  const [availableHasMore, setAvailableHasMore] = useState(true);
  const [availableLoading, setAvailableLoading] = useState(false);

  const [soldVans, setSoldVans] = useState([]);
  const [soldPage, setSoldPage] = useState(1);
  const [soldHasMore, setSoldHasMore] = useState(true);
  const [soldLoading, setSoldLoading] = useState(false);

  const [pendingVans, setPendingVans] = useState([]);
  const [pendingPage, setPendingPage] = useState(1);
  const [pendingHasMore, setPendingHasMore] = useState(true);
  const [pendingLoading, setPendingLoading] = useState(false);

  const [comingVans, setComingVans] = useState([]);
  const [comingPage, setComingPage] = useState(1);
  const [comingHasMore, setComingHasMore] = useState(true);
  const [comingLoading, setComingLoading] = useState(false);

  const faqs = [
    {
      question: "Can I test drive the vans?",
      answer:
        "We’d love for you to take our camper vans for a spin. Please contact us to schedule a test drive at your convenience.",
    },
    {
      question: "Do you offer a Warranty?",
      answer:
        "Yes, all of our pre-built vans, including our Mercedes camper vans for sale, come with a 1-year warranty. This warranty does not cover third-party products themselves.",
    },
    {
      question: "Can I add additional features or upgrades after purchase?",
      answer:
        "Yes, we can install additional features or upgrades after your purchase. Contact us to discuss the options and costs associated with adding new features to your van.",
    },
    {
      question: "Do you offer any maintenance or repair services?",
      answer:
        "Yes, we offer maintenance and repair services for our camper vans. Our experienced technicians can perform routine maintenance, repairs, and upgrades to keep your van in top condition.",
    },
  ];


  /* ================= GENERIC FETCH FUNCTION ================= */
  const fetchByStatus = useCallback(async (status, page, setData, hasMoreVal, setHasMore, setLoading) => {
    if (!hasMoreVal && page !== 1) return;
    setLoading(true);
    try {
      const res = await vansByStatus(status, page, limit);
      if (res?.success) {
        setData((prev) => {
          const combined = [...prev, ...res.data];
          return combined.filter((v, i, arr) => arr.findIndex((x) => x._id === v._id) === i);
        });
        setHasMore(res.hasMore);
      }
    } catch (error) {
      console.error(`Error fetching ${status}:`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ================= EFFECTS ================= */
  useEffect(() => { fetchByStatus("available", availablePage, setAvailableVans, availableHasMore, setAvailableHasMore, setAvailableLoading); }, [availablePage, fetchByStatus]);
  useEffect(() => { fetchByStatus("sold", soldPage, setSoldVans, soldHasMore, setSoldHasMore, setSoldLoading); }, [soldPage, fetchByStatus]);
  useEffect(() => { fetchByStatus("sale_pending", pendingPage, setPendingVans, pendingHasMore, setPendingHasMore, setPendingLoading); }, [pendingPage, fetchByStatus]);
  useEffect(() => { fetchByStatus("coming_soon", comingPage, setComingVans, comingHasMore, setComingHasMore, setComingLoading); }, [comingPage, fetchByStatus]);

  /* ================= SEO & JSON-LD (React 19) ================= */
  // Sab data ko merge karein Schema ke liye

  // Create schemas
  const schemas = [
    availableVans.length > 0 && createItemListSchema("Available Camper Vans", availableVans, "InStock"),
    pendingVans.length > 0 && createItemListSchema("Sale Pending Vans", pendingVans, "InStoreOnly"),
    comingVans.length > 0 && createItemListSchema("Coming Soon Vans", comingVans, "PreOrder"),
    soldVans.length > 0 && createItemListSchema("Sold Camper Vans", soldVans, "OutOfStock"),
    createFAQSchema(faqs),
    createServiceSchema(),
  ].filter(Boolean);

  const vanCount = availableVans.length;
  const pageTitle = vanCount > 0
    ? `(${vanCount}) Available Vans for Sale | Big Bear Vans`
    : "Custom Camper Vans for Sale | Big Bear Vans";

  const pageDesc = "Expert Custom Camper Van Builds. Browse our available inventory or let us build your dream van. Over 105+ high-quality custom builds completed.";
  const pageImage = "https://bigbearvans.com/images/inventory-hero.jpg"; // Ek achi inventory ki image ka path
  const currentUrl = "https://bigbearvans.com/vans-for-sale";
  return (
    <div>
      {/* --- React 19 Native Metadata Hoisting --- */}
      <title>{pageTitle}</title>
      <meta name="keywords" content="buy custom camper van, used sprinter camper for sale, ready to go campervans, inventory big bear vans" />
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content="index, follow" />
      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={currentUrl} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />
      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>

      <Navbar />
      <HeroSection title="Camper Vans For Sale" description="Buy our exclusive and ready-to-roll vans for sale Today." image="/heroSlider/herov.webp" link="/inquiry" buttonText="Get a Quote" showButton={true} />

      <AvailableVans availableVans={availableVans} hasMore={availableHasMore} loading={availableLoading} onLoadMore={() => setAvailablePage(p => p + 1)} />

      <SoldVans status="coming_soon" vans={comingVans} soldHeading="Upcoming Camper Vans" soldDesc="Planned builds coming soon." hasMore={comingHasMore} loading={comingLoading} onLoadMore={() => setComingPage(p => p + 1)} />

      <SoldVans status="sale_pending" vans={pendingVans} soldHeading="Sale Pending Vans" soldDesc="Reserved builds in final stages." hasMore={pendingHasMore} loading={pendingLoading} onLoadMore={() => setPendingPage(p => p + 1)} />

      <SoldVans status="sold" vans={soldVans} soldHeading="A Showcase of our Sold Camper Vans
" soldDesc="The camper vans below have already found their happy owners. We’ve proudly built over 105 camper vans with a reputation for quality.Check our past builds to get inspired for your custom van." hasMore={soldHasMore} loading={soldLoading} onLoadMore={() => setSoldPage(p => p + 1)} />

      <Consultation vanForSale={true} />
      <FaqV faqs={faqs} />
      <Footer />
    </div>
  );
}