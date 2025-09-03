import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 preview : [], // ya {} if you're storing an object
};

const PreviewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    setPreview: (state, action) => {
      state.preview = action.payload;
    },

    clearPreview: (state) => {
      state.preview = [];
    },
  },
});

export const { setPreview, clearPreview } = PreviewSlice.actions;

export default PreviewSlice.reducer;
