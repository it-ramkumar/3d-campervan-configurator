import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from "./routes/Routes";
import global from "global";

import { Provider } from 'react-redux';
import { store , persistor } from './redux/store/store';
import { PersistGate } from "redux-persist/integration/react";


// Fix global for browser
if (typeof global === "undefined") {
  window.global = window;
}
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
      <PersistGate loading={null} persistor={persistor}>

    <AppRoutes />
        </PersistGate>

  </StrictMode>
  </Provider>
)
