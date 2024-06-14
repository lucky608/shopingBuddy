import { Button, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { SharedButton } from "../sharedcomponents/SharedButton";

const ProductForm = ({ formData, setFormData, productDetails }) => {
    // const [productName, setProductName] = useState(formData.name);
    // const [productDescription, setProductDescription] = useState(formData.description);
    // const [productPrize, setProductPrize] = useState(formData.prize);
    // const [productWeight, setProductWeight] = useState(formData.weight);

    const onNameChange = (e) => {
        productDetails.setProductName(e.target.value);
    }
    const onDescriptionChange = (e) => {
        productDetails.setProductDescription(e.target.value);
    }
    const onPrizeChange = (e) => {
        productDetails.setProductPrize(e.target.value);
    }
    const onWeightChange = (e) => {
        productDetails.setProductWeight(e.target.value);
    }
  
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        productDetails.setSelectedFile(file);
    };
    return (
        <>
            <Grid container>
                <Grid>
                    <TextField
                        value={productDetails.productName}
                        sx={{ marginRight: "5px" }}
                        id="standard-basic"
                        label="Product Name"
                        variant="standard"
                        onChange={onNameChange}
                    />
                    <TextField
                        value={productDetails.productDescription}
                        id="standard-basic"
                        label="Description"
                        variant="standard"
                        onChange={onDescriptionChange}
                    />
                </Grid>
                <Grid>
                    <TextField
                        value={productDetails.productWeight}
                        sx={{ marginRight: "5px" }}
                        id="standard-basic"
                        label="Weight"
                        variant="standard"
                        onChange={onWeightChange}
                    />
                    <TextField
                        value={productDetails.productPrize}
                        id="standard-basic"
                        label="Prize"
                        variant="standard"
                        onChange={onPrizeChange}
                    />
                </Grid>
                <Grid xs={6}>
                    <>
                        <input
                            id="input-with-icon-adornment"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: 'none' }} // Hide the actual input
                        />
                        <label htmlFor="input-with-icon-adornment">
                            <Button
                                sx={{ border: '2px dotted', marginBottom: "-33px" }}
                                variant="outlined"
                                component="span">Upload Image</Button>

                        </label>
                    </>
                </Grid>
                <Grid>
                    {productDetails.selectedFile && <p style={{ width: "23vh" }}>{productDetails.selectedFile.name}</p>}
                    {!productDetails.selectedFile && <p>No file selected</p>}
                </Grid>
            </Grid>
        </>
    );
};

export default ProductForm;
