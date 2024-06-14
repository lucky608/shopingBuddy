import React, { useEffect, useState } from "react";
import GetAllProducts from "../sharedstore/slices/GetAllProducts";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../sharedstore/slices/DeleteProduct";
import { GetAllProductsFromCart } from "../sharedstore/slices/CartProduct";

export const useHandlers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [productId, setProductId] = useState()
  const [popupTitle, setPopupTitle] = useState("");
  const [formData, setFormData] = useState({
    name: "Product Name",
    prize: null,
    wight: null,
    description: "Product Description",
  });

  const handleClickOpen = (e) => {
    setOpen(true);
    setPopupTitle("Edit Product")
    setFormData(e);
  };

  const handleClickOpenAdd = (e) => {
    setOpen(true);
    setPopupTitle("Add Product")
    setFormData({
      name: "",
      prize: null,
      wight: null,
      description: "",
    });
  };
 const handleAddToCart=(e)=>{
  console.log(e,"added to cart");
  dispatch(GetAllProductsFromCart({...e,qty:1}))
 }
  const handleClose = () => {
    setOpen(false);
  };
  const OnDeleteProduct = async (e) => {
    setDeleteOpen(true);
    setProductId(e)
  }

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };
  const handleDeleteProduct = async () => {
    await dispatch(deleteProduct(productId))
    setDeleteOpen(false);
  }
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return {
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
  };
};