// import { Add, InsertEmoticon, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import COLORS from "../../theme/colors";
import EmojiPicker from "emoji-picker-react";
import { FormInputWrapper } from "../FormInputWrapper";
import { InsertEmoticon } from "@material-ui/icons";
import { Divider, useTheme } from "@material-ui/core";
import { ShareButton } from "../PostActionButton";
import { useFormik } from "formik";
import { message } from "antd";
import { addComment } from "../../services/comment";

function AddComments({ postId, fetchCommentList }) {
  const theme = useTheme();
  const [emoji, seteEmoji] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const formik = useFormik({
    initialValues: { content: "" },
    onSubmit: async (values) => {
      const res = await addComment({ postId, ...values });
      if (res?.data?.code === 200) {
        message.success("success");
        formik.handleReset();
        fetchCommentList();
      } else {
        message.error(res?.data?.msg || "System busy");
      }
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Cannot be empty"),
    }),
  });

  useEffect(() => {
    formik.setFieldValue("content", formik.values.content + emoji);
    setTimeout(() => {
      seteEmoji("");
    }, 0);
  }, [emoji]);

  return (
    <>
      <Box mb={1}>
        <FormInputWrapper margin={1}>
          <TextField
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.content && formik.errors.content}
            spellCheck={true}
            multiline={true}
            maxRows={4}
            variant="outlined"
            size="small"
            fullWidth
            style={{
              border: "0.5px solid #999",
              borderRadius: 10,
              color: theme.customColors.themeBaseTextColor,
              backgroundColor: theme.customColors.contentBgColor,
            }}
            sx={{
              width: { sm: "100%", md: "100%", lg: "100%" },
              "& fieldset": { border: "none" },
              fontSize: "12px",
              "& .MuiInputBase-input::placeholder": {
                color: theme.palette.primary.main, // 在这里设置placeholder的颜色
              },
            }}
            inputProps={{ style: { fontSize: "12px", color: "#999" } }}
            placeholder="Add a comment with comment type"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" component="div" style={{}}>
                  <IconButton
                    onClick={handleClick}
                    id="basic-button"
                    sx={{ width: 40 }}
                  >
                    <InsertEmoticon
                      style={{
                        color: theme.customColors.sideMenuTextColor,
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{ backgroundColor: "transparent" }}
            PaperProps={{ sx: { padding: "0px", boxShadow: "none" } }}
          >
            <EmojiPicker
              searchDisabled={true}
              previewConfig={{ showPreview: false }}
              onEmojiClick={(e) => {
                seteEmoji((pre) => pre + e.emoji);
              }}
              height={350}
              width="100%"
            />
          </Menu>
        </FormInputWrapper>

        <FormInputWrapper>
          <ShareButton postId={postId} />
          <Button
            style={{
              fontSize: "12px",
              borderRadius: "32px",
              height: "28px",
              fontWeight: 400,
              lineHeight: "18px",
              minWidth: "80px",
              margin: "15px 0",
              color: theme.customColors.themeBaseTextColor,
              border: `1px ${COLORS.primary} solid`,
            }}
            sx={{
              ":hover": {
                backgroundColor: COLORS.primary,
              },
            }}
            variant="outlined"
            onClick={formik.handleSubmit}
          >
            Post
          </Button>
        </FormInputWrapper>
      </Box>
      <Divider />
    </>
  );
}

export { AddComments };
