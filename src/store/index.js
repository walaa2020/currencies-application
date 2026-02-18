import { configureStore } from "@reduxjs/toolkit";
// import currencySlice from "./currency/currencySlice"
// import  conversionSlice from "./currency/conversionSlice";
import  conversionSlice from "./currency/conversionSlice";
import currencySlice from "./currency/currencySlice"

export const store=configureStore({
    reducer:{
        data:currencySlice,
         conversion: conversionSlice,
    }
});

export default store;