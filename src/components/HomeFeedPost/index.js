import { Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Linkify from "linkify-react";
import { FormInputWrapper } from "../../components/FormInputWrapper";
import { capitalizeFirstLetter } from "../../utils/setCapital";
import {
  PostDeleteButton,
  PostFollowButton,
  PostReportButton,
} from "../../components/PostActionButton/index";
import { POST_TYPES } from "../../utils/PostTypes";
import { AddComments } from "../../components/AddComments/AddComments";
import { ThumbUp } from "@material-ui/icons";
import { Comments } from "../../components/CommentsList/Comments";
import { postLike, postList, postUnLike } from "../../services/post";
import { commentList } from "../../services/comment";
import { message } from "antd";
import { useHistory } from "react-router-dom";

export default function Index({ post, setListData }) {
  const postId = post.id;
  const containerRef = useRef(null);
  const mobileView = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [commentData, setCommentData] = useState([]);
  const postType = "GENERAL";
  const theme = useTheme();
  const history = useHistory();

  const activityData = [
    {
      votedPost: true,
      voteType: "test",
      votedComments: ["Comments1", "Comments2"],
    },
  ];
  const getColor = (data) => {
    if (data === "Wildlife") return "#CDCDFF";
    if (data === "Global Warming") return "#F6AFEE";
    if (data === "Economy") return "#DDFEDD";
  };

  const fetchCommentList = async () => {
    const res = await commentList({ postId: post.id, current: 0, size: 999 });
    if (res?.data?.code === 200) {
      setCommentData(res?.data?.data?.records || []);
    }
  };

  const getOnePost = async (id) => {
    const res = await postList({ id });
    if (res?.data?.code === 200) {
      setListData((pre) => {
        let temp = pre;
        temp = temp.map((item) => {
          let itemData = item;
          if (item.id === id) itemData = res?.data?.data?.records?.[0];
          return itemData;
        });
        return temp;
      });
    } else {
      message.error(res?.data?.msg || "System busy");
    }
  };

  const handleLike = async () => {
    const res = await postLike({ id: post.id });
    if (res?.data?.code === 200) {
      getOnePost(post.id);
    }
  };
  const handleUnLike = async () => {
    const res = await postUnLike({ id: post.id });
    if (res?.data?.code === 200) {
      getOnePost(post.id);
    }
  };
  const goto = () => {
    history.push("/postdetail/" + post.id);
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  return (
    <Paper
      key={postId}
      elevation={1}
      ref={containerRef}
      style={{
        marginTop: 20,
        color: theme.customColors.themeBaseTextColor,
        backgroundColor: theme.customColors.contentBgColor,
      }}
    >
      <Box mt={1} />
      {postType === POST_TYPES.GENERAL ? (
        <Divider
          color="rgb(102, 102, 255)"
          style={{ height: "3px", backgroundColor: "rgb(102, 102, 255)" }}
        />
      ) : (
        <Divider
          color="#EA3CD5"
          style={{ height: "3px", backgroundColor: "rgba(234, 60, 213, 1)" }}
        />
      )}
      <Box margin={2} style={{ borderRadius: "15px" }}>
        <Box mt={2} />
        <FormInputWrapper>
          <Stack
            direction={mobileView ? "row" : "column"}
            sx={{ width: { sm: "100%", md: "100%", lg: "80%" } }}
            spacing={1}
            alignItems="center"
          >
            <Stack direction="row" alignItems="center">
              <Avatar
                src={activityData?.postCreatorInfo?.imageUrl}
                style={{ width: 30, height: 30, cursor: "pointer" }}
                onClick={() => {
                  history.push("/profile?id=" + post.userId);
                }}
              />
              <Stack direction="column">
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography
                    fontWeight="600"
                    fontSize={"12px"}
                    component="span"
                    style={{ marginLeft: 8 }}
                  >
                    {`${capitalizeFirstLetter(
                      post?.userFirstName
                    )} ${capitalizeFirstLetter(post?.userLastName)}`}
                  </Typography>

                  <Typography style={{ fontSize: "9px", color: "grey" }}>
                    {moment(post.createTime).startOf("minute").fromNow()}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {!post?.isMyPost && !post.isComplained && (
            <PostReportButton postId={postId} setListData={setListData} />
          )}
          {!post?.isMyPost && (
            <PostFollowButton
              postId={postId}
              isFollowed={post.isFollowed}
              setListData={setListData}
            />
          )}

          {post?.isMyPost && (
            <PostDeleteButton postId={postId} setListData={setListData} />
          )}
        </FormInputWrapper>

        <Box mt={2} />

        <FormInputWrapper>
          <Stack
            direction={mobileView ? "row" : "column"}
            style={{ width: { sm: "100%", md: "100%", lg: "80%" } }}
            spacing={2}
          >
            {post.tags?.map((data, i) => (
              <Chip
                key={i}
                label={data}
                style={{ background: getColor(data), fontSize: "12px" }}
                size="small"
              />
            ))}
          </Stack>
        </FormInputWrapper>
        <Box mt={2} />
        <FormInputWrapper>
          <Typography
            style={{ fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onClick={goto}
          >
            {post?.title}
          </Typography>
        </FormInputWrapper>
        <Box mt={2} />
        <Divider />
        <Box mt={2} />
        <FormInputWrapper>
          <Linkify options={{ target: "_blank" }}>
            <Box
              onClick={goto}
              style={{
                fontSize: "14px",
                textAlign: "justify",
                whiteSpace: "pre-line",
                cursor: "pointer",
              }}
            >
              {post?.description?.substring(0, 250).toString()}
            </Box>
          </Linkify>
        </FormInputWrapper>
        <Box mt={2} />
      </Box>

      <Box
        padding={2}
        style={{ backgroundColor: theme.customColors.contentBgColor }}
        paddingTop={0}
      >
        <Box mt={2} />

        <FormInputWrapper>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                style={{ color: post.isLiked ? "#7650FF" : "grey" }}
                onClick={handleLike}
              >
                <ThumbUp style={{ fontSize: 20 }} />
              </IconButton>
              <Box ml={1}>
                <Typography
                  style={{
                    color: "grey",
                    fontSize: "12px",
                  }}
                >
                  {post?.likes}
                </Typography>
              </Box>
              <IconButton
                style={{
                  color: post.isUnLiked ? "#7650FF" : "grey",
                  transform: "rotate(180deg)",
                }}
                onClick={handleUnLike}
              >
                <ThumbUp style={{ fontSize: 20 }} />
              </IconButton>
              <Box ml={1}>
                <Typography
                  style={{
                    color: "grey",
                    fontSize: "12px",
                  }}
                >
                  {post?.unLikes}
                </Typography>
              </Box>
            </Box>
            <Typography
              style={{
                fontSize: "12px",
                color: "grey",
                marginBottom: 0.5,
                marginRight: 1,
              }}
            >
              {commentData?.length || 0} Comments
            </Typography>
          </Box>
        </FormInputWrapper>

        <Box mt={1} />
        <Box mt={1}>
          <AddComments
            key={postId}
            postId={postId}
            fetchCommentList={fetchCommentList}
          />
        </Box>
        <Box mt={2} />

        {commentData?.map((data, i) => {
          if (i < 3)
            return (
              <Comments
                data={data}
                key={i}
                fetchCommentList={fetchCommentList}
              />
            );
        })}
      </Box>
    </Paper>
  );
}
