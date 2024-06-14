import React from 'react';
import { Grid, IconButton } from '@mui/material';
import plus from './Images/plusicon.png';  // Replace with the actual path
import minus from './Images/minus.png';  // Replace with the actual path
import DeleteImg from "./Images/delete.png"
const AddRemoveContainer = ({ onAddClick, onRemoveClick, productUnit, productId, OnDelete, deleteHide }) => {
    return (
        <Grid container>
            <Grid
                container
                sx={{
                    height: "29px",
                    width: "78px",
                    backgroundColor: "white",
                    border: "1px solid black",
                    borderRadius: "4px",
                    display: "flex",
                    backgroundColor: "lavender"
                }}
            >
                <IconButton
                    sx={{ width: "20px", height: "20px", top: "4px",left:"1px" }}
                    onClick={() => onRemoveClick(productId)}
                >
                    <img
                        src={minus}
                        alt="add"
                        style={{ width: "20px", height: "20px" }}
                        title="addToCart"
                    />
                </IconButton>
                <Grid
                    container
                    sx={{
                        height: "22px",
                        width: "29px",
                        backgroundColor: "white",
                        border: "1px solid black",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "3px",
                        backgroundColor: "lightyellow"
                    }}
                >
                    <p style={{ margin: "0px" }}>{productUnit}</p>
                </Grid>
                <IconButton
                    sx={{ width: "20px", height: "20px", top: "4px" }}
                    onClick={() => onAddClick(productId)}
                >
                    <img
                        src={plus}
                        alt="add"
                        style={{ width: "20px", height: "20px" }}
                        title="addToCart"
                    />
                </IconButton>

            </Grid>
            {deleteHide != true ? (<IconButton aria-label="delete" onClick={() => OnDelete(productId)}>
                <img style={{ height: "20px" }} alt="Delete Product" src={DeleteImg} />
            </IconButton>) : ("")}
        </Grid>
    );
};

export default AddRemoveContainer;