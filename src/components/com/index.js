import { SvgIcon } from "@material-ui/core";
import { Box } from "@mui/material";
import React from "react";

const ProposalToolTip = ({ text }) => <Box>{text}</Box>;

function CustomSvgIcon(props) {
  return (
    <SvgIcon data-testid="custom-svg-icon" {...props}>
      <path d={props.d} fill={props.fill} />
    </SvgIcon>
  );
}

export { ProposalToolTip, CustomSvgIcon };
