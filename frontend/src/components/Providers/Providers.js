"use client";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store/store"; // Path check karlein
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export default function Providers({ children }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Loader />}>
          {children}
        </Suspense>
      </PersistGate>
    </Provider>
  );
}