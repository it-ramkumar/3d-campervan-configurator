"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store"; // Path check karlein
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
    </Provider>
  );
}