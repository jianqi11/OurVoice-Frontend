import { Box } from "@mui/material";
import React from "react";
// import { CommunityContext } from '@/context/CommunityContext'

const SideBarWrapper = ({ children, selectedItem, lastIndex, role }) => {
  const getRadiusPixels = () => {
    let result;
    if (role) {
      result = "";
    } else {
      if (lastIndex === 6) {
        result = "10px";
      } else {
        result = "";
      }
    }

    return result;
  };
  return (
    <>
      <Box
        data-testid="sideBar-wrapper"
        sx={{
          bgcolor: selectedItem ? "#CDCDFF" : "transparent",
          height: "43px",
          overflowY: "hidden",
          borderBottomLeftRadius: getRadiusPixels(),
          borderBottomRightRadius: getRadiusPixels(),
        }}
      >
        {children}
      </Box>
    </>
  );
};

export { SideBarWrapper };
