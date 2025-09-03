import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // localStorage use karega
import { persistReducer, persistStore } from "redux-persist";

import VanNameReducer from "../slices/vanNameSlice";
import AddedModelsReducer from "../slices/addedModels";
import selectLayoutReducer from "../slices/selectLayout";
import FetchModelReducer from "../slices/fetchModel/modelSlice";
import PreviewReducer from "../slices/previewSlice";

// Redux Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["selectLayout"], // ✅ sirf selectLayout persist hoga
};

const rootReducer = combineReducers({
  vanName: VanNameReducer,
  addedModels: AddedModelsReducer,
  selectLayout: selectLayoutReducer,
  models: FetchModelReducer,
  preview: PreviewReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
