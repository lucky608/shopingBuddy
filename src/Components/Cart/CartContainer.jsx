import React, { useState } from 'react'
import ProductTable from './ProductTable'
import { useSelector } from 'react-redux'
import EmptyCart from './EmptyCart'
import CustomerDetails from './CustomerDetails'
import InvoicePDF from '../invoice/InvoicePDF'
import QrCodeContainer from './QrCodeContainer'

const CartContainer = () => {
  const [isCheckOut, setIsCheckOut] = useState(false)
  const [isShowQr, setIsShowQr] = useState(false)
  const [totalAmountToPay, setTotalAmountToPay] = useState(0)
  const CartData = useSelector((state) => state.AllProductInCart.CartData)
  const onCheckOutClick = () => {
    setIsCheckOut(true)
    console.log("yes");
    console.log("yes", isCheckOut)

  }
  return (
    <div>
      {CartData.length > 0 ?
        (
          <ProductTable
            CartData={CartData}
            onCheckOutClick={onCheckOutClick}
            setTotalAmountToPay={setTotalAmountToPay}
          />) : <EmptyCart />
      }
      {isCheckOut && <CustomerDetails
        isCheckOut={isCheckOut}
        setIsCheckOut={setIsCheckOut}
        totalAmountToPay={totalAmountToPay}
        setIsShowQr={setIsShowQr} />}
         {isShowQr &&(
                <QrCodeContainer setIsShowQr={setIsShowQr}
                totalAmountToPay={totalAmountToPay}
                />
            )}
    </div>
  )
}

export default CartContainer