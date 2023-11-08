import { styled } from "@material-ui/core";

const SearchBarMain = styled("div")(({ theme }) => {
  return {
    borderRadius: 22,
    border: theme.customColors.border,
    backgroundColor: theme.customColors.searchBarBackground,
    marginRight: theme.spacing(2),
    maxWidth: "500px",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "100%",
      // flexGrow: 1,
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  };
});

export { SearchBarMain };
