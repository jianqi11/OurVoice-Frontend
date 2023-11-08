import { styled } from "@mui/material";

const PhoneMemu = styled("div")(({ theme }) => {
  return {
    // backgroundColor: themeType === 'light' ? COLORS.navBarClolor : COLORSDARK.navBarClolor,
    padding: "10px 0px 0px 10px",
    marginRight: theme.spacing(2),
    margin: "auto",
    zIndex: 100,
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      display: "none",
      // flexGrow: 1,
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
      padding: 0,
    },
  };
});

export default PhoneMemu;
