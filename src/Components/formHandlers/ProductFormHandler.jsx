import React from "react";
import FormDialogBox from "../sharedcomponents/FormDialogBox";

const ProductFormHandler = ({
  FormComponent,
  Title,
  open,
  handleClickOpen,
  handleClose,
  formData,
  setFormData
}) => {
  return (
    <div>
      <FormDialogBox
        FormComponent={FormComponent}
        Title={Title}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default ProductFormHandler;
