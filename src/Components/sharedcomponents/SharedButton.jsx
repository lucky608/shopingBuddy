import * as React from "react";
import Button from "@mui/material/Button";

export const SharedButton = ({ label, OnClick }) => {
  return (
    <>
      <Button variant="contained" onClick={OnClick}>
        {label}
      </Button>
    </>
  );
};
