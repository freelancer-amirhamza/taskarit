import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./product-slice/index"
import cartSlice from "./cart-slice"

const store = configureStore({
    reducer:{
        productsSlice,
        cartSlice,
    }
})

export default store;