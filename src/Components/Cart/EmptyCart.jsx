import React from 'react'
import emptyCart from "../sharedcomponents/Images/emptycart.png"
const EmptyCart = () => {
    return (
        <div style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <img src={emptyCart} />

        </div>
    )
}

export default EmptyCart