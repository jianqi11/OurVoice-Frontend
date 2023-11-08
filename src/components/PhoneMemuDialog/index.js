import { styled } from "@mui/material";
const PhoneMemuDialog = styled("div")(({ theme }) => {
  return {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 99,
    transition: "opacity 0.3s",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
      // flexGrow: 1,
    },
  };
});

export default PhoneMemuDialog;
