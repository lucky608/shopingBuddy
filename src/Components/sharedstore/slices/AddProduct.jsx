import { createAsyncThunk } from "@reduxjs/toolkit";

export const addProduct = createAsyncThunk(
    "addProduct",
    async (newProduct) => {
        try {
            const response = await fetch(
                `https://localhost:7090/Product/AddProduct`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newProduct),
                }
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
    }
);
