import React from "react";

import Copyright from "../images/Copyright.png";
import { MyFooter, MyImg } from "./Styles";

export const Footer = () => {
    return (
        <MyFooter>
            <MyImg src={Copyright} alt="Copyright-logo" />
            <p>2024. ShopperBuddy. All rights reserved | Privacy Policy</p>
        </MyFooter>
    );
};
