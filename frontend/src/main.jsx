import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import global from "global";

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store/store';
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./websiteComponents/components/Loader/Loader"
import { HelmetProvider } from 'react-helmet-async';

// Fix global for browser
if (typeof global === "undefined") {
  window.global = window;
}

const AppRoutes = lazy(() => import('./routes/Routes')); // Lazy load routes

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Loader/>}>
        <HelmetProvider>
          <AppRoutes />
           </HelmetProvider>
        </Suspense>
      </PersistGate>
    </StrictMode>
  </Provider>
);
