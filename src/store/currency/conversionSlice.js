import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = 'fca_live_2e7l8NC9rDjHEdoHD4hQgkbevtedRE8KSp4FBKkm';
const BASE_URL = 'https://api.freecurrencyapi.com/v1';
const initialState = { result: 0, status: "idle", error: "" }
const convertCurrency = createAsyncThunk("currency/convertCurrency", async ({ from, to, amount }) => {
  try {
    const response = await axios.get(`${BASE_URL}/latest`, {
      params: {
        apikey: API_KEY,
        base_currency: from,
        currencies: to
      }
    });

    const rate = response.data.data[to];

    if (!rate) throw new Error(`Currency ${to} not found in response`);

    return {
      result: (amount * rate).toFixed(2),
      from,
      to,
      amount
    };
  } catch (error) {
    throw new Error(error.message || 'Network error while converting currency');
  }
});

const conversionSlice = createSlice({
  name: "conversion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(convertCurrency.pending, (state) => {
      state.status = "loading",
        state.error = ""
    });
    builder.addCase(convertCurrency.fulfilled, (state, action) => {
      state.status = "succeeded",
        state.result = action.payload.result
    });
    builder.addCase(convertCurrency.rejected, (state, action) => {
      state.status = "failed",
        state.error = action.payload
    });
  }
});
export { convertCurrency };
export default conversionSlice.reducer;