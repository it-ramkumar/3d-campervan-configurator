"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store"; // Path check karlein
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import { saveTrackingData } from "../Tracking/tracking"; // Path check karlein

export default function Providers({ children }) {
  useEffect(() => {
   saveTrackingData();
}, []);
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
    </Provider>
  );
}