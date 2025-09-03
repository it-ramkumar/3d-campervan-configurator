import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 vanName : "white", // ya {} if you're storing an object
};

const VanNameSlice = createSlice({
  name: 'vanName',
  initialState,
  reducers: {
    setVanName: (state, action) => {
      state.vanName = action.payload;
    },

    clearVanName: (state) => {
      state.vanName ;
    },
  },
});

export const { setVanName, clearVanName } = VanNameSlice.actions;

export default VanNameSlice.reducer;
