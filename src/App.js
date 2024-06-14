import "./App.css";
import { SharedButton } from "./Components/sharedcomponents/SharedButton";
import { ProductCont } from "./Components/sharedcomponents/ProductCont";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetAllProducts } from "./Components/sharedstore/slices/GetAllProducts";
import ProductForm from "./Components/forms/ProductForm";
import ProductFormHandler from "./Components/formHandlers/ProductFormHandler";
import { useHandlers } from "./Components/handlers/handlers";
import ProductContainer from "./Components/productContainer/ProductContainer";
import DeleteDialogBox from "./Components/sharedcomponents/DeleteDialogBox";
import { NavigationBar } from "./Components/navigation/NavigationBar";
import BaseRoute from "./Components/routes/BaseRoute";
import { Footer } from "./Components/navigation/Footer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProducts());
    console.log("called");
  }, []);
  return (
    <>
      <NavigationBar />
      <BaseRoute />
      <Footer />
    </>
  );
}

export default App;
