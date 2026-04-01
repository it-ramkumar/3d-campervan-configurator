// src/utils/asyncThunkHandler.js

export const asyncThunkHandler = (builder, thunk, stateKey) => {
  builder
    .addCase(thunk.pending, (state) => {
      state[stateKey].status = 'loading';
      state[stateKey].error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state[stateKey].status = 'succeeded';
      state[stateKey].data = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      state[stateKey].status = 'failed';
      state[stateKey].error = action.error.message;
    });
};
