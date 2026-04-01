import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchModelAll = createAsyncThunk('models/fetchModelAll', async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/models/all`, {
      withCredentials: true,
    });
    return res.data;
});