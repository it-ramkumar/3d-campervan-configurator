import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editData: null, // must match what component uses
};

const editDataSlice = createSlice({
  name: "editData",
  initialState,
  reducers: {
    setEditData: (state, action) => {
      state.editData = action.payload; // save the object
    },
    clearEditData: (state) => {
      state.editData = null; // reset
    },
  },
});

export const { setEditData, clearEditData } = editDataSlice.actions;
export default editDataSlice.reducer;
