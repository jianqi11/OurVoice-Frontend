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
  ReturnButton,
} from "../../components/PostActionButton/index";
import { POST_TYPES } from "../../utils/PostTypes";
import { AddComments } from "../../components/AddComments/AddComments";
import { ThumbUp } from "@material-ui/icons";
import { Comments } from "../../components/CommentsList/Comments";
import { postLike, postList } from "../../services/post";
import { commentList } from "../../services/comment";
import { message } from "antd";
import { useParams } from "react-router-dom";
import NavBar from "../Index/NavBar";
import { PostSkelton } from "../../components/Skeletons";

export default function Index() {
  const { postId } = useParams();
  const containerRef = useRef(null);
  const mobileView = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [commentData, setCommentData] = useState([]);
  const [post, setPost] = useState({});
  const postType = "GENERAL";
  const challenge = "Child Welface";
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const activityData = [
    {
      votedPost: true,
      voteType: "test",
      votedComments: ["Comments1", "Comments2"],
    },
  ];
  const randomColor = () => {
    const tagColor = ["#CDCDFF", "#F6AFEE", "#F2F2F2", "#DDFEDD"];
    return tagColor[Math.floor(Math.random() * tagColor.length)];
  };

  const fetchCommentList = async () => {
    const res = await commentList({
      postId: String(postId),
      current: 0,
      size: 999,
    });
    if (res?.data?.code === 200) {
      setCommentData(res?.data?.data?.records || []);
    }
  };

  const getOnePost = async (id) => {
    setLoading(true);
    const res = await postList({ id });
    setLoading(false);
    if (res?.data?.code === 200) {
      setPost(res?.data?.data?.records?.[0] || {});
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

  useEffect(() => {
    getOnePost(postId);
    fetchCommentList();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <NavBar />
          <Paper
            key={postId}
            elevation={1}
            ref={containerRef}
            style={{
              width: "60vw",
              margin: "0 auto",
              overflowY: "auto",
              height: "90vh",
              marginTop: 20,
              color: theme.customColors.themeBaseTextColor,
              backgroundColor: theme.customColors.contentBgColor,
            }}
          >
            <PostSkelton />
          </Paper>
        </>
      ) : (
        <>
          <NavBar />
          <Paper
            key={postId}
            elevation={1}
            ref={containerRef}
            style={{
              width: "60vw",
              margin: "0 auto",
              overflowY: "auto",
              height: "90vh",
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
                style={{
                  height: "3px",
                  backgroundColor: "rgba(234, 60, 213, 1)",
                }}
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
                      style={{ width: 30, height: 30 }}
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
                  <PostReportButton postId={postId} />
                )}
                {!post?.isMyPost && (
                  <PostFollowButton
                    postId={postId}
                    isFollowed={post.isFollowed}
                  />
                )}

                {post?.isMyPost && (
                  <PostDeleteButton postId={postId} isDetail />
                )}
                <ReturnButton />
              </FormInputWrapper>

              <Box mt={2} />

              <FormInputWrapper>
                <Stack
                  direction={mobileView ? "row" : "column"}
                  style={{ width: { sm: "100%", md: "100%", lg: "80%" } }}
                  spacing={2}
                >
                  {post.tags?.map((_, i) => (
                    <Chip
                      key={i}
                      label={challenge}
                      style={{ background: randomColor(), fontSize: "12px" }}
                      size="small"
                    />
                  ))}
                </Stack>
              </FormInputWrapper>
              <Box mt={2} />
              <FormInputWrapper>
                <Typography style={{ fontSize: "14px", fontWeight: 600 }}>
                  {post?.title}
                </Typography>
              </FormInputWrapper>
              <Box mt={2} />
              <Divider />
              <Box mt={2} />
              <FormInputWrapper>
                <Linkify options={{ target: "_blank" }}>
                  <Box
                    style={{
                      fontSize: "14px",
                      textAlign: "justify",
                      whiteSpace: "pre-line",
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
                      color={post.isLiked ? "primary" : ""}
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

              {commentData?.map((data, i) => (
                <Comments
                  data={data}
                  key={i}
                  fetchCommentList={fetchCommentList}
                />
              ))}
            </Box>
          </Paper>
        </>
      )}
    </>
  );
}
