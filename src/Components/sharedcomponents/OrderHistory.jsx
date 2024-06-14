import React from 'react'
import noOrder from "../images/noOrder.png"
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux'
const OrderHistory = () => {
    const HistoryData = useSelector((state) => state.AllOrderHistory.Data)
    const handleCancelOrder = () => {
        // Implement cancel order logic here
        console.log('Order canceled:');
      };
  return (
    <div style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
  {!!!HistoryData?( 
        <img style={{height:"300px"}} src={noOrder} />

   ):
    <Grid container spacing={2}
            sx={{
                overflowY: "scroll",
                marginTop: "10px",
                paddingLeft: "25%",
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
   {HistoryData.map((order, index) => (
     <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {order.name}
        </Typography>
        <Typography color="text.secondary">
          Size: {order.size}
        </Typography>
        <Typography color="text.secondary">
          Status: {order.status}
        </Typography>
        <Typography color="text.secondary">
          Prize: {order.prize}
        </Typography>
        <Typography color="text.secondary">
          Delivered By: {order.deliveredBy}
        </Typography>
        <Button href="#text-buttons" onClick={handleCancelOrder}>
          Cancel Order
        </Button>
      </CardContent>
    </Card>))}
    </Grid>
   }</div>
  )
}

export default OrderHistory