import React from 'react';
import { useSelector } from 'react-redux';
import { ProductCont } from '../sharedcomponents/ProductCont';
import { Grid } from '@mui/material';

const ProductContainer = ({
    handleClickOpen,
    OnAddToCartClick,
    OnDeleteProduct
}) => {
    const products = useSelector((state) => state.AllProducts.Data);

    return (
        <Grid container spacing={2}
            sx={{
                overflowY: "scroll",
                overflowX: "hidden",
                height: "78vh",
                marginTop: "10px",
                paddingLeft: "11%",
                "::-webkit-scrollbar": {
                    width: " 0.4rem",
                    height: "0.4rem",
                    backgroundColor: "transparent",
                },
                "::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgb(98, 109, 119)",
                    border: " 5px solid transparent",
                    borderRadius: "9px",
                },
                "::-moz-scrollbar-track": {
                    marginTop: "51px",
                },
                "::-moz-scrollbar": {
                    width: " 0.4rem",
                    height: "0.4rem",
                    backgroundColor: "transparent",
                },
                "::-moz-scrollbar-thumb": {
                    backgroundColor: "rgb(98, 109, 119)",
                    border: " 5px solid transparent",
                    borderRadius: "9px",
                },
            }}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={2}>
                    <ProductCont
                        Addlabel="Add to cart"
                        Editlabel="Edit product"
                        OnAddToCartClick={OnAddToCartClick}
                        onClick={handleClickOpen}
                        ProductDetails={product}
                        OnDeleteProduct={OnDeleteProduct}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductContainer;
