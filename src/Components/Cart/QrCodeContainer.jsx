import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import emptyCart from "../sharedcomponents/Images/emptycart.png"
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../sharedstore/slices/CartProduct";
import { useNavigate } from 'react-router-dom';

const QrCodeContainer = ({setIsShowQr,totalAmountToPay}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [amountPaid, setAmountPaid] = useState(totalAmountToPay);
    useEffect(() => {
        const timer = setTimeout(() => {
          setIsPaymentSuccess(true);
        }, 30000);
      
        return () => clearTimeout(timer); // Clear the timer when component unmounts or before next render
      }, []); // Empty dependency array ensures this effect runs only once after initial render
      
   
    const handleClose = () => {
        setOpen(false);
    }
    const onOrderConfirm = async () => {
           dispatch(resetCart())
           navigate("/successMsg")
            setOpen(false);
            setIsShowQr(false);
        }
  return (
    <React.Fragment>
            <Dialog open={open} handleClose={handleClose}>
                <DialogTitle>QR Code</DialogTitle>
                <DialogContent sx={{ width: "90%" }}>
                    <DialogContentText>
                    <Grid container>
                    <Grid>
                    <Grid xs={12}>
                                <TextField
                                    value={amountPaid}
                                    sx={{ m: 0.5, width: '29ch' }}
                                    id="standard-basic"
                                    label="Total Paid Amount"
                                    variant="standard"
                                    disabled
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                />
                                </Grid>
                    <img src={emptyCart} />
                        </Grid>
                        </Grid>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                    <Button disabled={!isPaymentSuccess} sx={{ backgroundColor:`${isPaymentSuccess?"#4EE337":"gray"}`}} onClick={onOrderConfirm}>Done</Button>
                </DialogActions>
                        </Dialog>
                        </React.Fragment>
                        
                        )
}

export default QrCodeContainer