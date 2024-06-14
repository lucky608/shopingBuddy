import { Toolbar, styled } from "@mui/material";

// Styled Elements
export const WebLogoImg = styled("img")({
    maxWidth: "40px",
    marginLeft: " 15px",
    display: "flex",
    alignItems: "center",
});

export const MyFooter = styled("footer")({
    padding: "1rem",
    backgroundColor: "gray",
    color: "white",
    position: "fixed",
    textAlign: "center",
    bottom: 0,
    left: 0,
    width: "100%",
    maxHeight: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "2",
});

export const MyImg = styled("img")({
    maxHeight: "20px",
    marginRight: "10px",
    display: "inline-block",
});

// Styled Classes
const PREFIX = "EmBilling";
export const classes = {
    typography: `${PREFIX}-typography`,
    userProfileIcon: `${PREFIX}-img`,
    topBar: "custom-topBar",
};
export const ToolbarElement = styled(Toolbar)({
    [`& .${classes.typography}`]: {
        flexGrow: 1,
    },
    [`& .${classes.userProfileIcon}`]: {
        maxHeight: "24px",
        // marginRight: "25px",
        // marginTop: "5px",
        padding: "10px",
        position: "relative",
    },
})

export const CustomTopBar = styled("div")({
    [`& .${classes.topBar}`]: {
        backgroundColor: "white",
        position: "relative",
        marginTop: "-10px",
       // marginLeft: "-10px",
        width: "100vw",
    },
});
