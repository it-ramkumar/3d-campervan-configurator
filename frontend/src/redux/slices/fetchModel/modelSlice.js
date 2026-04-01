import { createSlice } from "@reduxjs/toolkit";
// Aapke existing thunks ko yahan import karein
import { fetchExterior } from "@/api/model/modelExterior";
import { fetchInterior } from "@/api/model/modelInterior";
import { fetchSystem } from "@/api/model/modelSystem";

const initialState = {
  interior: [],
  exterior: [],
  system: [],
  loading: {
    interior: false,
    exterior: false,
    system: false,
  },
  error: null,
};

const modelSlice = createSlice({
  name: "models",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Interior Handling ---
    builder
      .addCase(fetchInterior.pending, (state) => { state.loading.interior = true; })
      .addCase(fetchInterior.fulfilled, (state, action) => {
        state.loading.interior = false;
        state.interior = action.payload || [];
      });

    // --- Exterior Handling ---
    builder
      .addCase(fetchExterior.pending, (state) => { state.loading.exterior = true; })
      .addCase(fetchExterior.fulfilled, (state, action) => {
        state.loading.exterior = false;
        state.exterior = action.payload|| [];
      });

    // --- System Handling ---
    builder
      .addCase(fetchSystem.pending, (state) => { state.loading.system = true; })
      .addCase(fetchSystem.fulfilled, (state, action) => {
        state.loading.system = false;
        state.system = action.payload || [];
      });
  },
});

export default modelSlice.reducer;