import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import DashBoard from '../dashBoard/Dashboard'
import { connect } from 'react-redux'
import CartContainer from '../Cart/CartContainer'
import SuccessPage from '../Cart/SuccessPage'
import OrderHistory from '../sharedcomponents/OrderHistory'

const BaseRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/cart" element={<CartContainer />} />
            <Route path="/successMsg" element={<SuccessPage />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
        </Routes>
    )
}

export default connect(null, null)(BaseRoute);
