import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { SharedButton } from "../sharedcomponents/SharedButton";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../sharedstore/slices/CartProduct";
import QrCodeContainer from "./QrCodeContainer";

const generatePDF = async (data,fullName,fullAddress,phoneNumber,amountPaid,amountLeft,paymentMode,totalAmountToPay)  => {
    const doc = new jsPDF();
  
    // Add content to PDF
    doc.text('Invoice Details', 90, 10,{ fontSize: 16 });
    doc.setFontSize(10); // Set the font size to 10
 // doc.text(`Invoice ID: ${data.invoiceId}`, 20, 20, { color: "red" });
    doc.text(`Customer: ${fullName}`, 20, 30,{ fontSize: 10 });
    doc.text(`Address: ${fullAddress}`, 20, 40,{ fontSize: 10 });
    doc.text(`Phone: ${phoneNumber}`, 20, 50,{ fontSize: 10 });
    doc.text(`Payment Mode: ${paymentMode}`, 20, 60,{ fontSize: 10 });
   //make a horizontal line here
   const startYForTable = doc.autoTable.previous.finalY;
  
   // Make a horizontal line based on the startY for the table
  
    // Add table for products
    const columns = ['ID', 'Name', 'Description', 'Price/Unit', 'Weight/Unit', 'Qty','Total Weight','Total Price'];
    const rows = data.map((product) => [
      product.id,
      product.name,
      product.description,
      product.prize,
      product.weight,
      product.qty,
      product.weight*product.qty,
      product.prize*product.qty
    ]);
  
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 70,
    });
   
    doc.setLineWidth(0.5); // Set line width
    doc.line(20, doc.autoTable.previous.finalY, 190, doc.autoTable.previous.finalY);
    // Add total amounts
    doc.setFontSize(16);
    doc.setFont('bold');
    doc.text(`Total Amount: Rs-${totalAmountToPay}/-`, 20, doc.autoTable.previous.finalY + 10);
    doc.text(`Amount Paid: Rs-${amountPaid}/-`, 20, doc.autoTable.previous.finalY + 20);
    doc.text(`Amount Left: Rs-${amountLeft}/-`, 20, doc.autoTable.previous.finalY + 30);
    doc.setLineWidth(0.5); // Set line width
    doc.line(20, doc.autoTable.previous.finalY+40, 190, doc.autoTable.previous.finalY+40);
  
    // Save or open the PDF
    doc.save('invoice.pdf');
  };

  
const CustomerDetails = ({ isCheckOut, setIsCheckOut, totalAmountToPay,setIsShowQr }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(isCheckOut);
    const [fullName, setFullName] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amountPaid, setAmountPaid] = useState(totalAmountToPay);
    const [amountLeft, setAmountLeft] = useState(totalAmountToPay - amountPaid);
    const [paymentMode, setPaymentMode] = useState('');
    console.log(isCheckOut);
    const CartData = useSelector((state) => state.AllProductInCart.CartData)

    const onPaymentModeChange = (event) => {
        setPaymentMode(event.target.value);
    };
    const onNameChange = (e) => {
        setFullName(e.target.value);
    }
    const onAddressChange = (e) => {
        setFullAddress(e.target.value);
    }
    const onPhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    }
    const onAmountPaidChange = (e) => {
        if (e.target.value <= totalAmountToPay) {
            setAmountPaid(e.target.value);
            setAmountLeft(totalAmountToPay - e.target.value)
        }
    }

    const handleClose = () => {
        setOpen(false);
        setIsCheckOut(false)
    }
    const onOrderConfirm = async () => {
    //    await generatePDF(CartData,fullName,fullAddress,phoneNumber,amountPaid,amountLeft,paymentMode,totalAmountToPay)
    //    dispatch(resetCart())
        setIsCheckOut(false)
        setOpen(false);
        setIsShowQr(true);
    }

    return (
        <React.Fragment>
            <Dialog open={open} handleClose={handleClose}>
                <DialogTitle>Customer Details</DialogTitle>
                <DialogContent sx={{ width: "90%" }}>
                    <DialogContentText>
                        <Grid container>
                            <Grid>
                                <TextField
                                    value={fullName}
                                    sx={{ width: '29ch', m: 0.5 }}
                                    id="standard-basic"
                                    label="Full Name"
                                    variant="standard"
                                    onChange={onNameChange}
                                />
                                <TextField
                                    value={phoneNumber}
                                    sx={{ width: '29ch', m: 0.5 }}
                                    id="standard-basic"
                                    label="Phone Number"
                                    variant="standard"
                                    onChange={onPhoneNumberChange}
                                />

                            </Grid>
                            <Grid xs={12}>
                                <FormControl fullWidth sx={{ m: 0.5 }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-amount">Full Address</InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        value={fullAddress}
                                        label="Full Address"
                                        onChange={onAddressChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    value={amountPaid}
                                    sx={{ m: 0.5, width: '29ch' }}
                                    id="standard-basic"
                                    label="Total Paid Amount"
                                    variant="standard"
                                    disabled
                                    // onChange={onAmountPaidChange}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                />
                                 <FormControl variant="standard" sx={{ m: 0.5, width: "29ch" }}>
                                    <InputLabel id="demo-simple-select-standard-label">Payment Mode</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={paymentMode}
                                        onChange={onPaymentModeChange}
                                        label="Age"
                                    >
                                        <MenuItem value="UPI">UPI</MenuItem>
                                       
                                    </Select>
                                </FormControl>

                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Back</Button>
                    <Button sx={{ backgroundColor:"#4EE337"}} onClick={onOrderConfirm}>Show QR</Button>
                </DialogActions>
            </Dialog>
           
        </React.Fragment>
    );
};

export default CustomerDetails;