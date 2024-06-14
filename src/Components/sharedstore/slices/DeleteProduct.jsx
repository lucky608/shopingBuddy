import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (productId) => {
        try {
            const response = await fetch(
                `https://localhost:7090/Product/${productId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                // Handle error if the response is not OK
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data, "adadasd");
            // No need to dispatch any action here because deletion was successful

            return productId;
        } catch (error) {
            // Handle fetch error
            console.error("Error fetching data:", error);
            throw error;
        }
    }
);
