import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // yahan object save hoga
};

const editDataSlice = createSlice({
  name: "editData",
  initialState,
  reducers: {
    setEditData: (state, action) => {
      state.editData = action.payload; // pura object save karega
    },
    clearEditData: (state) => {
      state.editData = null;
    },
  },
});

export const { setEditData, clearEditData } = editDataSlice.actions;
export default editDataSlice.reducer;
