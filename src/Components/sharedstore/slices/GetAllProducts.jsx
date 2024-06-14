import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProduct } from "./UpdateProduct";
import { deleteProduct } from "./DeleteProduct";

const initialState = {
  Data: [
    {
      name:"shirt",
      size:"XL",
      description:"abc",
    prize:"199"
      },
      {
        name:"shirt",
        size:"XL",
        description:"abc",
      prize:"199"
        },
        {
          name:"shirt",
          size:"XL",
          description:"abc",
        prize:"199"
          }
  ],
};

export const GetAllProducts = createAsyncThunk("GetAllProducts", async () => {
  try {
    const response = await fetch(
      "https://localhost:7090/Product/GetAllProducts"
    );

    if (!response.ok) {
      // Handle error if the response is not OK
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    // Handle fetch error
    console.error("Error fetching data:", error);
    throw error;
  }
});

const allProductDetails = createSlice({
  name: "allProductDetails",
  initialState,
  reducers: {
    resetAllProductDetails: (state) => {
      state.Data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllProducts.fulfilled, (state, action) => {
        state.Data = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.Data = [...state.Data]
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedProductId = action.payload;
        console.log(action.payload);
        // Filter out the deleted product from the state
        state.Data = state.Data.filter(product => product.id !== deletedProductId);
        state.Data = [...state.Data]
      })
      .addDefaultCase((state, action) => {
        // Handle other action types or log an error
        console.error(`Unhandled action type: ${action.type}`);
        return state;
      });
  },

});
export const {
  resetAllProductDetails,
  resetActiveProjectResourceForecastErrorState,
} = allProductDetails.actions;
export default allProductDetails.reducer;
