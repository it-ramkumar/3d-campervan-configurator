// src/store/slices/modelsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { asyncThunkHandler } from "../../../customeHooks/handleReducerThunk"
import { fetchInterior } from "../../../api/model/modelInterior"
import { fetchExterior } from "../../../api/model/modelExterior"
import { fetchSystem } from "../../../api/model/modelSystem"
import { fetchModelAll } from "../../../api/model/modelAll"

const modelsSlice = createSlice({
  name: 'models',
  initialState: {
    interior: { data: [], status: 'idle', error: null },
    exterior: { data: [], status: 'idle', error: null },
    system: { data: [], status: 'idle', error: null },
    modelAll: { data: [], status: 'idle', error: null },
    exteriorByGroupName: { data: [], status: 'idle', error: null },
    interiorByGroupName: { data: [], status: 'idle', error: null },
    systemByGroupName: { data: [], status: 'idle', error: null }
  },

  reducers: {},
  extraReducers: (builder) => {

    asyncThunkHandler(builder, fetchInterior, 'interior');
    asyncThunkHandler(builder, fetchSystem, 'system');
    asyncThunkHandler(builder, fetchExterior, 'exterior');
    asyncThunkHandler(builder, fetchModelAll, 'modelAll');



  }
});

export default modelsSlice.reducer;
