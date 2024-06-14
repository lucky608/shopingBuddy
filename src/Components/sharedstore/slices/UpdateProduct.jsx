import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (updatedProduct) => {
    try {
      const response = await fetch(
        `https://localhost:7090/Product/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        // Handle error if the response is not OK
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Dispatch the fetchProduct action after the update is successful
     // Assuming fetchProduct takes an ID as a parameter

      return data;
    } catch (error) {
      // Handle fetch error
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);
