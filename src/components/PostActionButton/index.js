import COLORS from '../../theme/colors'
import { Button, Dialog, DialogActions, DialogTitle, useTheme } from '@material-ui/core'
import { Stack } from '@mui/material'
import React from 'react'
import { complaint, deletePost, follow } from '../../services/post'
import { message } from 'antd'

const PostFollowButton = ({ postId, isFollowed, setListData }) => {
    const theme = useTheme()

    const handleFollow = async () => {
        const res = await follow({ id: postId })
        if (res?.data?.code === 200) {
            setListData(preData =>
                preData.map(item => {
                    let itemData = item
                    if (item.id === postId) {
                        itemData = { ...itemData, isFollowed: !itemData.isFollowed }
                    }
                    return itemData
                })
            )
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }
    return (
        <>
            {isFollowed ? (
                <Stack mt={1}>
                    <Button
                        style={{
                            fontSize: '12px',
                            borderRadius: '32px',
                            height: '28px',
                            fontWeight: 400,
                            lineHeight: '18px',
                            minWidth: '80px',
                            backgroundColor: COLORS.primary,
                            color: theme.customColors.themeBaseTextColor,
                            width: 35,
                        }}
                        sx={{
                            ':hover': {
                                backgroundColor: COLORS.primary,
                            },
                        }}
                        variant="outlined"
                        onClick={handleFollow}>
                        Followed
                    </Button>
                </Stack>
            ) : (
                <Stack mt={1}>
                    <Button
                        style={{
                            fontSize: '12px',
                            borderRadius: '32px',
                            height: '28px',
                            fontWeight: 400,
                            lineHeight: '18px',
                            color: theme.customColors.themeBaseTextColor,
                            minWidth: '80px',
                            border: `1px ${COLORS.primary} solid`,
                        }}
                        sx={{
                            ':hover': {
                                backgroundColor: COLORS.primary,
                            },
                        }}
                        variant="outlined"
                        onClick={handleFollow}>
                        Follow
                    </Button>
                </Stack>
            )}
        </>
    )
}
const PostReportButton = ({ postId }) => {
    const handleReport = async () => {
        const res = await complaint({ id: postId })
        if (res?.data?.code === 200) {
            message.success('Report Success')
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }
    return (
        <Stack mt={1}>
            <Button
                color="secondary"
                style={{
                    fontSize: '12px',
                    borderRadius: '32px',
                    marginRight: 5,
                    height: '28px',
                    fontWeight: 400,
                    lineHeight: '18px',
                    minWidth: '80px',
                    border: `1px ${COLORS.accentColor} solid`,
                }}
                sx={{
                    ':hover': {
                        backgroundColor: COLORS.accentColor,
                    },
                }}
                variant="outlined"
                onClick={handleReport}>
                Report
            </Button>
        </Stack>
    )
}
const PostDeleteButton = ({ postId, setListData, isDetail }) => {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = e => {
        e.stopPropagation()
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleDeletePost = async () => {
        const res = await deletePost({ id: postId })
        if (res?.data?.code === 200) {
            if (isDetail) {
                history.go(-1)
                return
            }
            setListData(preData => preData.filter(item => item.id !== postId))
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
        handleClose()
    }
    return (
        <Stack mt={1}>
            <Button
                color="secondary"
                style={{
                    fontSize: '12px',
                    borderRadius: '32px',
                    marginRight: 5,
                    height: '28px',
                    lineHeight: '18px',
                    minWidth: '80px',
                    marginLeft: 5,
                    color: '#F7D066',
                    fontWeight: 700,
                    border: `1px #F7D066 solid`,
                }}
                sx={{
                    ':hover': {
                        color: '#FFF',
                        backgroundColor: '#F7D066',
                    },
                }}
                variant="outlined"
                onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                maxWidth="md"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle style={{ width: 400, marginTop: 20, marginLeft: 20 }}>
                    Are you sure about the deletion?
                </DialogTitle>

                <DialogActions style={{ marginBottom: 20 }}>
                    <Button
                        onClick={handleClose}
                        color="secondary"
                        style={{
                            fontSize: '12px',
                            borderRadius: '32px',
                            marginRight: 5,
                            height: '28px',
                            lineHeight: '18px',
                            minWidth: '80px',
                            marginLeft: 5,
                            color: '#F7D066',
                            fontWeight: 700,
                            border: `1px #F7D066 solid`,
                        }}
                        sx={{
                            ':hover': {
                                color: '#FFF',
                                backgroundColor: '#F7D066',
                            },
                        }}
                        variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeletePost}
                        color="secondary"
                        style={{
                            fontSize: '12px',
                            borderRadius: '32px',
                            marginRight: 5,
                            height: '28px',
                            fontWeight: 400,
                            lineHeight: '18px',
                            minWidth: '80px',
                            border: `1px ${COLORS.accentColor} solid`,
                        }}
                        sx={{
                            ':hover': {
                                backgroundColor: COLORS.accentColor,
                            },
                        }}
                        variant="outlined"
                        autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}

const ShareButton = ({ postId }) => {
    function copyToClipboard() {
        const textarea = document.createElement('textarea')
        textarea.value = window.location.origin + '/postdetail/' + postId
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'absolute'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        message.success('Copy successfully, go ahead and share it!')
    }
    return (
        <Stack mt={1}>
            <Button
                color="secondary"
                style={{
                    fontSize: '12px',
                    borderRadius: '32px',
                    marginRight: 5,
                    height: '28px',
                    fontWeight: 400,
                    lineHeight: '18px',
                    minWidth: '80px',
                    border: `1px ${COLORS.accentColor} solid`,
                }}
                sx={{
                    ':hover': {
                        backgroundColor: COLORS.accentColor,
                    },
                }}
                variant="outlined"
                onClick={copyToClipboard}>
                Share
            </Button>
        </Stack>
    )
}
const ReturnButton = () => {
    return (
        <Stack mt={1}>
            <Button
                style={{
                    fontSize: '12px',
                    borderRadius: '32px',
                    marginRight: 5,
                    height: '28px',
                    fontWeight: 400,
                    lineHeight: '18px',
                    minWidth: '80px',
                    color: 'blue',
                    border: `1px blue solid`,
                }}
                sx={{
                    ':hover': {
                        backgroundColor: COLORS.accentColor,
                    },
                }}
                variant="outlined"
                onClick={() => history.go(-1)}>
                Return
            </Button>
        </Stack>
    )
}

export { PostFollowButton, PostReportButton, ShareButton, PostDeleteButton, ReturnButton }
