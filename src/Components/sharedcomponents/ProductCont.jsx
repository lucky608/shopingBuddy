import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import DeleteImg from "../sharedcomponents/Images/delete.png";
import EditImg from "../sharedcomponents/Images/edit.png";
import GetAllProducts from "../sharedstore/slices/GetAllProducts";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCartData, increaseCartData } from "../sharedstore/slices/CartProduct";
import demoVideo from "../images/demoVideo.mp4"
import AddRemoveContainer from "./AddRemoveContainer";

export const ProductCont = ({
  ProductDetails,
  Addlabel,
  Editlabel,
  onClick,
  OnAddToCartClick,
  OnDeleteProduct
}) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [productQty, setProductQty] = React.useState(0);

  const [isAddedIntoCart, setIsAddedIntoCart] = React.useState(false);
  const CartData = useSelector((state) => state.AllProductInCart.CartData)
  // Create an image URL
  const imageUrl = `data:image/png;base64,${ProductDetails.imageData}`;

  const OnEditClick = (e) => {
    onClick(e);
  };
  const OnDelete = async () => {
    await OnDeleteProduct(ProductDetails.id);
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const OnAddClick = (e) => {
    OnAddToCartClick(e);
  };
  const onAddClick = (productId) => {
    console.log(productId, "add click");
    dispatch(increaseCartData(productId))
  }

  const onRemoveClick = (productId) => {
    console.log("remove click");
    dispatch(decreaseCartData(productId))
  }
  const ProductDetailsFromCart = CartData.find(item => item.id === ProductDetails.id);
  React.useEffect(() => {
    const isDataInCart = CartData.some(item => item.id === ProductDetails.id);
    if (isDataInCart) {
      setIsAddedIntoCart(true)
    } else {
      setIsAddedIntoCart(false)
    }
    console.log(CartData, "cartDataUpdated");
  }, [CartData])

  return (
    <Card sx={{ maxWidth: 250, position: "relative" }}>
      <CardMedia sx={{ height: 250, position: "relative" }} component ="video" controls title="green iguana" >
         <source src={demoVideo} type="video/mp4" />
        </CardMedia>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {ProductDetails.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Product Name: {ProductDetails.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {ProductDetails.weight}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          MRP: {ProductDetails.prize}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Technical: {expanded ? ProductDetails.description : `${ProductDetails.description.slice(0, 25)}`}
          {ProductDetails.description.length > 25 && (
            <Button sx={{ height: "20px", fontSize: "0.700rem" }} onClick={toggleDescription}>
              {expanded ? "Read Less" : "Read More"}
            </Button>
          )}
        </Typography>
      </CardContent>
      {/* <CardActions sx={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: "white",
        height: "11px",
        borderRadius: "0px 0px 0px 12px",
        borderColor: "#CDCBCB",
        borderStyle: "solid",
        borderWidth: "3px"
      }}> */}
        {/* <IconButton sx={{ padding: "4px" }} aria-label="edit" onClick={() => OnEditClick(ProductDetails)}>
          <img style={{ height: "20px" }} alt={Editlabel} src={EditImg} />
        </IconButton>
        <IconButton sx={{ marginLeft: "-8px", padding: "4px" }} aria-label="delete" onClick={OnDelete}>
          <img style={{ height: "20px" }} alt="Delete Product" src={DeleteImg} />
        </IconButton> */}
      {/* </CardActions> */}
      <CardActions sx={{ justifyContent: 'flex-end', zIndex: 0 }}>
        {isAddedIntoCart && ProductDetailsFromCart ? (<AddRemoveContainer
          onAddClick={onAddClick}
          onRemoveClick={onRemoveClick}
          productUnit={ProductDetailsFromCart.qty}
          productId={ProductDetails.id}
          deleteHide={true}
        />) : (<Button size="small" onClick={() => OnAddClick(ProductDetails)}>
          {Addlabel}
        </Button>)}
      </CardActions>
    </Card>
  );
};