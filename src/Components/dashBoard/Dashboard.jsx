import { useDispatch } from "react-redux";
import { useHandlers } from "../handlers/handlers";
import { useEffect } from "react";
import GetAllProducts from "../sharedstore/slices/GetAllProducts";
import BaseRoute from "../routes/BaseRoute";
import { NavigationBar } from "../navigation/NavigationBar";
import ProductFormHandler from "../formHandlers/ProductFormHandler";
import ProductForm from "../forms/ProductForm";
import { SharedButton } from "../sharedcomponents/SharedButton";
import DeleteDialogBox from "../sharedcomponents/DeleteDialogBox";
import { Grid } from "@mui/material";
import ProductContainer from "../productContainer/ProductContainer";

function DashBoard() {
    const {
        open,
        handleClickOpen,
        handleClose,
        formData,
        setFormData,
        handleClickOpenAdd,
        popupTitle,
        OnDeleteProduct,
        handleDeleteClickOpen,
        handleDeleteClose,
        deleteOpen,
        handleDeleteProduct,
        handleAddToCart
    } = useHandlers();

    return (
        <>
            <Grid container justifyContent="flex-end" alignItems="center" marginTop={1}>
                {/* <Grid item mr={2}>
                    <SharedButton label="ADD NEW PRODUCT" OnClick={handleClickOpenAdd} />
                </Grid> */}
            </Grid>
            <ProductContainer
                handleClickOpen={handleClickOpen}
                OnAddToCartClick={handleAddToCart}
                OnDeleteProduct={OnDeleteProduct}
            />
            <ProductFormHandler
                FormComponent={ProductForm}
                Title={popupTitle}
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                formData={formData}
                setFormData={setFormData}
            />
            {/* <ProductForm /> */}


            <DeleteDialogBox
                handleDeleteClickOpen={handleDeleteClickOpen}
                handleDeleteClose={handleDeleteClose}
                deleteOpen={deleteOpen}
                handleDeleteProduct={handleDeleteProduct}
            />
        </>
    );
}

export default DashBoard;