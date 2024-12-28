import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    cartItems: [],
    isLoading: false,
}


export const addToCart = createAsyncThunk("/cart/addToCart",
    async ({ productId, quantity }) => {
        const response = await axios.post("http://localhost:5000/api/cart/add",
            {
                productId,
                quantity
            });
        return response?.data;
    }
);

export const getCartItems = createAsyncThunk("/cart/getCartItems",
    async () => {
        const response = await axios.get("http://localhost:5000/api/cart/get/");
        return response.data;
    }
);

export const updateCartItems = createAsyncThunk("/cart/updateCartItems",
    async ({ productId, quantity}) => {
        const response = await axios.put(
            "http://localhost:4000/api/cart/update",
            {
                productId,
                quantity
            }
        )
        return response.data;
    }
);
export const deleteCartItems = createAsyncThunk(
    "cart/deleteCartItem",
    async ({productId }) => {
        const response = await axios.delete(
            `http://localhost:4000/api/cart//${productId}`
        );
        return response?.data;
    }
);

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(getCartItems.pending, (state) => {
            state.isLoading = true;
        }).addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(getCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(updateCartItems.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(updateCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(deleteCartItems.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCartItems.fulfilled, (state, action) => {
            state.isLoading = false,
                state.cartItems = action.payload.data;
        }).addCase(deleteCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
    }
});


export default cartSlice.reducer;