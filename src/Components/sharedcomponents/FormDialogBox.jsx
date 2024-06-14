import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../sharedstore/slices/UpdateProduct";
import { addProduct } from "../sharedstore/slices/AddProduct";
import { GetAllProducts } from "../sharedstore/slices/GetAllProducts";

export default function FormDialogBox({
  FormComponent,
  Title,
  open,
  handleClickOpen,
  handleClose,
  formData,
  setFormData
}) {
  const dispatch = useDispatch()
  const [productName, setProductName] = useState(formData.name);
  const [productDescription, setProductDescription] = useState(formData.description);
  const [productPrize, setProductPrize] = useState(formData.prize);
  const [productWeight, setProductWeight] = useState(formData.weight);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [base64Image, setBase64Image] = useState('');
  React.useEffect(() => {
    setProductName(formData.name)
    setProductDescription(formData.description)
    setProductPrize(formData.prize)
    setProductWeight(formData.weight)
  }, [formData])

  const productDetails = {
    productName: productName,
    productDescription: productDescription,
    productPrize: productPrize,
    productWeight: productWeight,
    selectedFile: selectedFile,
    setProductName: setProductName,
    setProductDescription: setProductDescription,
    setProductPrize: setProductPrize,
    setProductWeight: setProductWeight,
    setSelectedFile: setSelectedFile
  }
  console.log(formData);
  const convertImageToBase64Image = async (file) => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        // The result property contains the data URL.
        let base64String = reader.result;

        // Remove the "data:image/png;base64," prefix
        base64String = base64String.substring(base64String.indexOf(',') + 1);

        setBase64Image(base64String);
        if (Title === "Add Product") {
          if (base64String) {
            const newProductDetails = {
              id: formData.id,
              name: productName,
              description: productDescription,
              prize: productPrize,
              weight: productWeight,
              imageData: base64String
            }
            await dispatch(addProduct(newProductDetails))
            dispatch(GetAllProducts())
            setIsDirty(true)
          }
        }
        else {
          const updatedProductDetails = {
            id: formData.id,
            name: productName,
            description: productDescription,
            prize: productPrize,
            weight: productWeight,
            imageData: base64String
          }
          await dispatch(updateProduct(updatedProductDetails))
          dispatch(GetAllProducts())
          setIsDirty(true)
        }
      };
      // Read the selected file as a data URL
      reader.readAsDataURL(file);
    } else {
      const updatedProductDetails = {
        id: formData.id,
        name: productName,
        description: productDescription,
        prize: productPrize,
        weight: productWeight,
        imageData: formData.imageData
      }
      await dispatch(updateProduct(updatedProductDetails))
      dispatch(GetAllProducts())
      setIsDirty(true)
    }
  };

  const onSaveClick = async () => {

    convertImageToBase64Image(selectedFile)

    handleClose()
  }
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{Title}</DialogTitle>
        <DialogContent sx={{ width: "53.3vh" }}>
          <DialogContentText>
            <FormComponent formData={formData} setFormData={setFormData} productDetails={productDetails} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
