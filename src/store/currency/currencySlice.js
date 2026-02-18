import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = 'fca_live_2e7l8NC9rDjHEdoHD4hQgkbevtedRE8KSp4FBKkm';
const BASE_URL = 'https://api.freecurrencyapi.com/v1';
const initialState = { status: "idle", data: [], error: "" }
const fetchCurrencies = createAsyncThunk("currency/fetchCurrencies", async (__, thinkApi) => {
    try {
        const response = await axios.get(`${BASE_URL}/currencies/?apikey=${API_KEY}`);
        console.log(response.data);
        return response.data.data
    } catch (error) {
        return thinkApi.rejectWithValue(error)
    }
});
const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCurrencies.pending, (state) => {
            state.status = "loading",
                state.error = ""
        });
        builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
            state.status = "succeeded",
                state.data = action.payload
        });
        builder.addCase(fetchCurrencies.rejected, (state, action) => {
            state.status = "failed",
                state.error = action.payload
        });
    }
});
export { fetchCurrencies };
export default currencySlice.reducer;