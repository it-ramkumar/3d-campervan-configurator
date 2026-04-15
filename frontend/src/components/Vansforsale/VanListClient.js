"use client";
import React, { useState, useCallback } from "react";
import { vansByStatus } from "@/api/van/van-by-status";
import AvailableVans from "./AvailableVans/AvailableVans";
import SoldVans from "./SoldVans/SoldVans";

export default function VanListClient({
  initialAvailable,
  initialSold,
  initialPending,
  initialComing
}) {
  const limit = 9;

  /* ================= ALL STATES (Starting with Server Data) ================= */
  const [availableVans, setAvailableVans] = useState(initialAvailable?.data || []);
  const [availablePage, setAvailablePage] = useState(1);
  const [availableHasMore, setAvailableHasMore] = useState(initialAvailable?.hasMore || false);
  const [availableLoading, setAvailableLoading] = useState(false);

  const [soldVans, setSoldVans] = useState(initialSold?.data || []);
  const [soldPage, setSoldPage] = useState(1);
  const [soldHasMore, setSoldHasMore] = useState(initialSold?.hasMore || false);
  const [soldLoading, setSoldLoading] = useState(false);

  const [pendingVans, setPendingVans] = useState(initialPending?.data || []);
  const [pendingPage, setPendingPage] = useState(1);
  const [pendingHasMore, setPendingHasMore] = useState(initialPending?.hasMore || false);
  const [pendingLoading, setPendingLoading] = useState(false);

  const [comingVans, setComingVans] = useState(initialComing?.data || []);
  const [comingPage, setComingPage] = useState(1);
  const [comingHasMore, setComingHasMore] = useState(initialComing?.hasMore || false);
  const [comingLoading, setComingLoading] = useState(false);

  /* ================= FETCH MORE LOGIC ================= */
  const loadMore = useCallback(async (status, currentPage, setData, setHasMore, setLoading) => {
    const nextPage = currentPage + 1;
    setLoading(true);

    try {
      const res = await vansByStatus(status, nextPage, limit);
      if (res?.success) {
        setData((prev) => {
          const combined = [...prev, ...res.data];
          // Duplicate check (Just in case)
          return combined.filter((v, i, arr) => arr.findIndex((x) => x._id === v._id) === i);
        });
        setHasMore(res.hasMore);

        // Update correct page state based on status
        if (status === "available") setAvailablePage(nextPage);
        if (status === "sold") setSoldPage(nextPage);
        if (status === "sale_pending") setPendingPage(nextPage);
        if (status === "coming_soon") setComingPage(nextPage);
      }
    } catch (error) {
      console.error(`Error loading more ${status}:`, error);
    } finally {
      setLoading(false);
    }
  }, []);
 console.log(availableVans,"vans")
  return (
    <>
      {/* 1. Available Vans */}
      <AvailableVans
        availableVans={availableVans}
        hasMore={availableHasMore}
        loading={availableLoading}
        onLoadMore={() => loadMore("available", availablePage, setAvailableVans, setAvailableHasMore, setAvailableLoading)}
      />

      {/* 2. Coming Soon */}
      <SoldVans
        status="coming_soon"
        vans={comingVans}
        soldHeading="Upcoming Camper Vans"
        soldDesc="Planned builds coming soon."
        hasMore={comingHasMore}
        loading={comingLoading}
        onLoadMore={() => loadMore("coming_soon", comingPage, setComingVans, setComingHasMore, setComingLoading)}
      />

      {/* 3. Sale Pending */}
      <SoldVans
        status="sale_pending"
        vans={pendingVans}
        soldHeading="Sale Pending Vans"
        soldDesc="Reserved builds in final stages."
        hasMore={pendingHasMore}
        loading={pendingLoading}
        onLoadMore={() => loadMore("sale_pending", pendingPage, setPendingVans, setPendingHasMore, setPendingLoading)}
      />

      {/* 4. Sold Gallery */}
      <SoldVans
        status="sold"
        vans={soldVans}
        soldHeading="A Showcase of our Sold Camper Vans"
        soldDesc="The camper vans below have already found their happy owners. We’ve proudly built over 105 camper vans with a reputation for quality."
        hasMore={soldHasMore}
        loading={soldLoading}
        onLoadMore={() => loadMore("sold", soldPage, setSoldVans, setSoldHasMore, setSoldLoading)}
      />
    </>
  );
}