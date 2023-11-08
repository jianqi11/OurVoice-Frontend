import { Avatar, Link, Stack, Typography } from "@mui/material";
import React from "react";

const SearchUserItem = ({ user }) => {
  return (
    <Link
      href={"/profile/public/" + user?.id}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Stack flexDirection="row" alignItems="center" gap={1} marginLeft={1}>
        <Avatar sx={{ width: 30, height: 30 }} src={user?.imageUrl} />
        <Stack>
          <Typography fontSize="14px">{`${user?.firstName} ${user?.lastName}`}</Typography>
          <Typography fontSize="12px" marginTop={-0.6} color="grey">
            {user?.role}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};

export default SearchUserItem;
