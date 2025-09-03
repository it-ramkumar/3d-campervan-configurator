import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 selectLayout : "First Layout", // ya {} if you're storing an object
};

const SelectLayoutSlice = createSlice({
  name: 'selectLayout',
  initialState,
  reducers: {
    setSelectLayout: (state, action) => {
      state.selectLayout = action.payload;
    },

    clearSelectLayout: (state) => {
      state.selectLayout ;
    },
  },
});

export const { setSelectLayout, clearSelectLayout } = SelectLayoutSlice.actions;

export default SelectLayoutSlice.reducer;
