import React, { memo, useEffect, useState } from "react";


import { AppBar, Button, IconButton, Stack, Typography } from "@mui/material";
import { CustomTopBar, WebLogoImg, ToolbarElement, classes } from "./Styles";
import ShopLogo from "../images/ShopLogo.png"
import UserProfileIcon from "../images/UserProfileIcon.jpg"
import addToCartImage from "../images/addToCart.png"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const NavigationBar = (
    ({ showDropDown = true }) => {
        const CartData = useSelector((state) => state.AllProductInCart.CartData)
        const [productCount, setProductCount] = useState(0);
        const [showProfile, setShowProfile] = useState(false);
        const handleClickOutside = (event) => {
            setShowProfile(false);
        };

        useEffect(() => {
            if (showProfile) {
                window.addEventListener("click", handleClickOutside);
            }
            return () => {
                window.removeEventListener("click", handleClickOutside);
            };
        }, [showProfile]);

        useEffect(() => {
            setProductCount(CartData?.length)
        }, [CartData])

        const navigate = useNavigate();
        return (
            <CustomTopBar>
                <AppBar className="custom-topBar" data-testid="navbar">
                    <ToolbarElement data-testid="toolbar">
                        <Typography variant="button" className={classes.typography}>
                            <WebLogoImg
                                src={ShopLogo}
                                alt="WebLogo"
                                onClick={() => {
                                    navigate("/");
                                }}
                            />
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            {/* {showDropDown && <DropDown />} */}
                            
                            <Button variant="text" onClick={() => {
                                navigate("/orderHistory");
                            }}>History</Button>
                            <IconButton
                                className="dropdown-profile"
                                onClick={(e) => {
                                    navigate("/cart");
                                }}
                            >
                                {productCount > 0 && <p style={{
                                    color: "#141313",
                                    margin: "6px",
                                    position: "absolute",
                                    top: "5px",
                                    right: "0px",
                                    height: "6px",
                                    width: "7px",
                                    border: "1px solid red",
                                    borderRadius: "50%",
                                    padding: "4px",
                                    backgroundColor: "red",
                                    fontSize: "small",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    {productCount}
                                </p>}
                                <img
                                    src={addToCartImage}
                                    alt="addToCartImage"
                                    className={classes.userProfileIcon}
                                    title="addToCart"
                                />
                            </IconButton>
                            <IconButton
                                className="dropdown-profile"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowProfile(!showProfile);
                                }}
                            >
                                <img
                                    src={UserProfileIcon}
                                    alt="userProfileIcon"
                                    className={classes.userProfileIcon}
                                    title="Profile"
                                />
                            </IconButton>
                            {/* {accessTokenFromSlice && showProfile && (
                                <ProfileMenu showProfile={showProfile} />
                            )} */}
                        </Stack>
                    </ToolbarElement>
                </AppBar>
            </CustomTopBar>
        );
    }
);