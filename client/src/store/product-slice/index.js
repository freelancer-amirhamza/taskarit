import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productsList: [],
    productDetails:null,
};

export const addProduct = createAsyncThunk(
    "/products/addNewProduct",
    async (formData) => {
      const result = await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    }
  );
  

  
  export const updateProduct = createAsyncThunk(
    "/products/updateProduct",
    async ({formData, id}) => {
      const result = await axios.put(
        `http://localhost:5000/api/products/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    }
  );
  
  export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id) => {
      const result = await axios.delete(
        `http://localhost:5000/api/products/delete/${id}`
      );
      return result?.data;
    }
  );
export const getAllProducts = createAsyncThunk(
    "/products/getFilteredProducts",
    async () => {
        const result = await axios.get("http://localhost:5000/api/products/get");
        return result?.data;
    }
);

export const getProductDetails = createAsyncThunk("products/getProductDetails",
    async (id)=>{
        const result = await axios.get(
            `http://localhost:5000/api/products/details/${id}`
        )
        return result?.data;
    }
);


const productsSlice = createSlice({
    name: "ProductsSlice",
    initialState,
    reducers: {
        setProductDetails: (state)=>{
            state.productDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isLoading = false;
            state.productsList = action.payload.data;
        }).addCase(getAllProducts.rejected, (state) => {
            state.isLoading = false;
            state.productsList = [];
        }).addCase(getProductDetails.pending, (state)=>{
            state.isLoading= true;
        }).addCase(getProductDetails.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.productDetails = action.payload.data;
        }).addCase(getProductDetails.rejected, (state)=>{
            state.isLoading = false;
            state.productDetails = null;
        })
    },
});

export const {setProductDetails} = productsSlice.actions;

export default productsSlice.reducer;