import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    CartData: [],
};

export const GetAllProductsFromCart = createAsyncThunk("GetAllProductsFromCart", async (products) => {
    try {
        const data = await products;
        return data;
    } catch (error) {
        // Handle fetch error
        console.error("Error fetching data:", error);
        throw error;
    }
});

const allProductInCart = createSlice({
    name: "allProductInCart",
    initialState,
    reducers: {
        resetCart: (state) => {
            state.CartData = [];
        },
        increaseCartData: (state, action) => {
            console.log(action.payload, "updated");
            const updatedData = state.CartData.map(item => {
                if (item.id === action.payload) {
                    return { ...item, qty: item.qty + 1 };
                }
                return item;
            });
            state.CartData = updatedData;
        },
        decreaseCartData: (state, action) => {
            console.log(action.payload, "updated");
            const updatedData = state.CartData.map(item => {
                if (item.id === action.payload) {
                    if (item.qty === 1) {
                        return {};
                    }
                    return { ...item, qty: item.qty - 1 };
                }
                return item;
            });
            const nonEmptyData = updatedData.filter(item => Object.keys(item).length !== 0);
            state.CartData = nonEmptyData;
        },
        deleteDataFromCart: (state, action) => {
            const updatedData = state.CartData.filter(item => item.id !== action.payload);
            state.CartData = updatedData;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllProductsFromCart.fulfilled, (state, action) => {
                console.log(action.payload);
                state.CartData = [...state.CartData, action.payload];
            })
            .addDefaultCase((state, action) => {
                // Handle other action types or log an error
                console.error(`Unhandled action type: ${action.type}`);
                return state;
            });
    },

});
export const {
    resetCart,
    increaseCartData,
    decreaseCartData,
    deleteDataFromCart
} = allProductInCart.actions;
export default allProductInCart.reducer;