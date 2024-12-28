import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null,
};

export const createNewOrder = createAsyncThunk("/orders/createOrder",
    async (orderData) => {
        const response = await axios.post("http://localhost:4000/api/shop/order/create", orderData);
        return response.data;
    }
);

export const capturePayment = createAsyncThunk("/orders/capturePayment",
    async ({ orderId, paymentId, payerId }) => {
        const response = await axios.post("http://localhost:4000/api/shop/order/capture",
            {
                orderId,
                payerId,
                paymentId
            }
        );
        return response.data;
    }
);

export const getOrdersByUser = createAsyncThunk("/orders/capture",
    async(userId)=>{
        const response = await axios.get(`http://localhost:4000/api/shop/order/list/${userId}`);
        return response.data;
    }
);

export const getOrderDetails = createAsyncThunk("/orders/getOrderDetails", 
    async(id)=>{
        const response = await axios.get(`http://localhost:4000/api/shop/order/details/${id}`);
        return response.data;
    }
);

const ordersSlice = createSlice({
    name: "OrdersSlice",
    initialState,
    reducers: {
        resetOrderDetails: (state)=>{
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true;
        }).addCase(createNewOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.approvalURL = action.payload.approvalURL;
            state.orderId = action.payload.orderId;
            sessionStorage.setItem("currentOrderId",
                JSON.stringify(action.payload.orderId));
        }).addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null;
        }).addCase(capturePayment.pending, (state)=>{
            state.isLoading = true;
        }).addCase(capturePayment.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.approvalURL =action.payload.approvalURL;
            state.orderId = action.payload.orderId;

        }).addCase(capturePayment.rejected, (state)=>{
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null;
        }).addCase(getOrdersByUser.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getOrdersByUser.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getOrdersByUser.rejected, (state)=>{
            state.isLoading = false;
            state.orderList = null;
        }).addCase(getOrderDetails.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getOrderDetails.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(getOrderDetails.rejected, (state)=>{
            state.isLoading =false;
            state.orderDetails = null;
        })
    }
})

export const  {resetOrderDetails} = ordersSlice.actions;

export default ordersSlice.reducer;