"use client";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store/store"; // Path check karlein
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import SmoothScroll from "@/components/Common/SmoothScrolling/SmoothScroll";
import { usePathname } from "next/navigation";

export default function Providers({ children }) {
  const pathname = usePathname();

  // Dashboard check (Next.js logic)
  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/quote/preview/') || pathname.startsWith('/configurator');

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Loader />}>
          {isDashboard ? (
            children
          ) : (
            <SmoothScroll>
              {children}
            </SmoothScroll>
          )}
        </Suspense>
      </PersistGate>
    </Provider>
  );
}