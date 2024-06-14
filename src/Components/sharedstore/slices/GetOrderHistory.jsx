import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProduct } from "./UpdateProduct";
import { deleteProduct } from "./DeleteProduct";

const initialState = {
  Data: [
    {
      name:"shirt",
      size:"XL",
      status:"shipped",
    prize:"199",
    deliveredBy:"15/02/2025"
      },
      {
        name:"shirt",
        size:"XL",
        status:"shipped",
      prize:"199",
      deliveredBy:"15/02/2025"
        },
        {
            name:"shirt",
            size:"XL",
            status:"shipped",
          prize:"199",
          deliveredBy:"15/02/2025"
            },
            {
                name:"shirt",
                size:"XL",
                status:"shipped",
              prize:"199",
              deliveredBy:"15/02/2025"
                }
  ],
};

export const GetOrderHistory = createAsyncThunk("GetOrderHistory", async () => {
  try {
    const response = await fetch(
      "https://localhost:7090/Product/GetOrderHistory"
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

const allOrderHistory = createSlice({
  name: "allOrderHistory",
  initialState,
  reducers: {
    resetAllOrderHistory: (state) => {
      state.Data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetOrderHistory.fulfilled, (state, action) => {
        state.Data = action.payload;
      })
      .addDefaultCase((state, action) => {
        // Handle other action types or log an error
        console.error(`Unhandled action type: ${action.type}`);
        return state;
      });
  },

});
export const {
  resetQAllOrderHistory,
} = allOrderHistory.actions;
export default allOrderHistory.reducer;
