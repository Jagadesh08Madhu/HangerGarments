import { configureStore } from "@reduxjs/toolkit";
import authRuducer from './slices/authSlice.js'

export const store = configureStore({
    reducer:{
        auth : authRuducer
    }
})

export default store;