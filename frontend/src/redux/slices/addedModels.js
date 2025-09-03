import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 addedModels : [], // ya {} if you're storing an object
};

const AddedModelsSlice = createSlice({
  name: 'addedModels',
  initialState,
  reducers: {
    setAddedModels: (state, action) => {
      state.addedModels = action.payload;
    },

    clearAddedModels: (state) => {
      state.addedModels = [];
    },
  },
});

export const { setAddedModels, clearAddedModels } = AddedModelsSlice.actions;

export default AddedModelsSlice.reducer;
