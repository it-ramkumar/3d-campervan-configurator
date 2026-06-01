import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AddedModelsReducer from "../slices/addedModels";
import FetchModelReducer from "../slices/fetchModel/modelSlice";
import editDataReducer from "../slices/editData";

const rootReducer = combineReducers({
  addedModels: AddedModelsReducer,
  models: FetchModelReducer,
  editData: editDataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // You can remove this too if not needed
    }),
});

// No persistor export needed anymore