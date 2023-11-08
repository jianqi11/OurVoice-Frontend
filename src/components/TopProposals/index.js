import { Box, Typography, Button } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";

import { makeStyles, useTheme } from "@material-ui/core";
import { Stack } from "@mui/material";
import { trendingProposals } from "../../services/post";
import { message } from "antd";
import { Skeleton } from "@material-ui/lab";
import { changeTrendingTile } from "../../redux/actions/global";
import MyContext from "../../redux/MyContext";

const useStyles = makeStyles({
  top: {
    width: "100%",
  },

  folowText: {
    color: "#6666FF",
    borderRadius: "32px",
    backgroundColor: "white",
    borderColor: "#6666FF",
    fontSize: 12,
    width: 80,
    // textTransform: 'none',
  },

  unFollowText: {
    color: "white",
    backgroundColor: "#6666FF",
    borderRadius: "32px",
    width: 80,
    fontSize: 12,
    // textTransform: 'none',
  },

  disabled: {
    opacity: 0.5,
    pointerEvents: "none",
    width: "100%",
  },
});

const TopProposals = ({ disabled }) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const {
    state: {
      global: { activeTrendingTitle },
    },
    dispatch,
  } = useContext(MyContext);

  const handleProposalClick = (data) => {
    let temp = data;
    if (data === activeTrendingTitle) temp = "";

    dispatch(changeTrendingTile({ activeTrendingTitle: temp }));
    localStorage.setItem("activeTrendingTitle", temp);
  };

  const fetchTrendingPost = async () => {
    setLoading(true);
    const res = await trendingProposals();
    setLoading(false);
    if (res?.data?.code === 200) {
      let resData = res?.data?.data || [];
      resData = resData.map((item) => item.title);
      setData(resData);
    } else {
      message.error(res?.data?.msg || "System busy");
    }
  };

  useEffect(() => {
    fetchTrendingPost();
  }, []);

  return (
    <Box className={disabled ? classes.disabled : classes.top}>
      <Box
        sx={{
          borderRadius: 8,
          marginTop: 14,
          padding: 20,
          border: theme.customColors.border,
          backgroundColor: theme.customColors.sideMenuBgColor,
        }}
      >
        <Typography
          fontWeight="bold"
          style={{ color: theme.customColors.themeBaseTextColor }}
        >
          Trending Proposals
        </Typography>
        <Box mt={2} />

        {!loading ? (
          <Stack>
            {!data || data.length == 0 ? (
              <Typography
                style={{ color: "gray", textAlign: "center", fontSize: 14 }}
              >
                No proposals to display
              </Typography>
            ) : (
              data?.map((item) => (
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  justifyContent="space-between"
                  key={item}
                  style={{ marginTop: 3 }}
                  onClick={() => handleProposalClick(item)}
                  alignItems="center"
                >
                  <Typography style={{ fontSize: 12, color: "#999999" }}>
                    {item}
                  </Typography>

                  <Button
                    style={{
                      fontSize: "10px",
                      borderRadius: "32px",
                      lineHeight: "15px",
                      color: activeTrendingTitle === item ? "#fff" : "#6666FF",
                      backgroundColor:
                        activeTrendingTitle !== item ? "#fff" : "#6666FF",
                      padding: 5,
                      minWidth: 90,
                      margin: 0,
                    }}
                    size="small"
                    variant="outlined"
                  >
                    {activeTrendingTitle === item ? "Following" : "Follow"}
                  </Button>
                </Stack>
              ))
            )}
          </Stack>
        ) : (
          <Stack>
            <Skeleton width={255} height={40} />
            <Skeleton width={255} height={40} />
            <Skeleton width={255} height={40} />
            <Skeleton width={255} height={40} />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default TopProposals;
