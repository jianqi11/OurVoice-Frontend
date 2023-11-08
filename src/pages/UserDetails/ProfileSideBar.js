import React, { useEffect, useState } from 'react'
import { Rank, Score } from '../../assets/index'
import COLORS from '../../theme/colors'
import { Box, Dialog, Stack } from '@mui/material'
import { DataGrid } from '@material-ui/data-grid'
import moment from 'moment/moment'
import ShareIcon from '@material-ui/icons/Share'
import GroupIcon from '@material-ui/icons/Group'
import EqualizerIcon from '@material-ui/icons/Equalizer'

import {
    Avatar,
    Typography,
    Button,
    AppBar,
    IconButton,
    Slide,
    Toolbar,
    TablePagination,
    DialogTitle,
    DialogActions,
} from '@material-ui/core'
import { message } from 'antd'
import { follow } from '../../services/auth'
import { Close } from '@material-ui/icons'
import { deletePost, historyPost } from '../../services/post'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const ProfileSideBar = ({ setUserData, userData, isMine, id }) => {
    const [open, setOpen] = React.useState(false)
    const [openDelete, setOpenDelete] = React.useState(false)
    const [loading, setLoading] = useState(false)
    const [deleteId, setDeleteId] = useState()
    const [data, setData] = useState([])

    const [params, setParams] = useState({
        current: 1,
        size: 10,
        total: 0,
    })
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 1 },
        {
            field: 'description',

            headerName: 'Description',
            flex: 1,
        },
        { field: 'likes', headerName: 'Like', flex: 1 },
        { field: 'unLikes', headerName: 'Unlike', flex: 1 },
        { field: 'userTelegramName', headerName: 'CreateBy', flex: 1 },
        {
            field: 'createTime',
            headerName: 'CreateTime',
            flex: 1,
            renderCell: record => {
                const { value } = record
                return <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
        },
        {
            field: 'operation',

            headerName: 'Operation',
            width: 160,
            renderCell: record => {
                const { row } = record
                return (
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpenDelete(true)
                            setDeleteId(row.id)
                        }}
                        size="small"
                        color="secondary">
                        delete
                    </Button>
                )
            },
        },
    ]

    const onPageChange = (_, current) => {
        const newParams = {
            ...params,
            current: current + 1,
        }
        setParams(newParams)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }
    const fetchReportedList = async () => {
        setLoading(true)
        const res = await historyPost(params)
        setLoading(false)
        if (res?.data?.code === 200) {
            setParams({ ...params, total: res?.data?.data?.total })
            setData(res?.data?.data?.records || [])
        }
    }
    useEffect(() => {
        fetchReportedList()
    }, [params.current])

    const handleClose = () => {
        setOpen(false)
    }
    const handleFollow = async () => {
        const res = await follow({ id })
        if (res?.data?.code === 200) {
            setUserData(preData => ({
                ...preData,
                isFollowed: !preData.isFollowed,
                followersNum: userData.followersNum + (preData.isFollowed ? -1 : 1),
            }))
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }

    const handleDeletePost = async () => {
        const res = await deletePost({ id: deleteId })
        if (res?.data?.code === 200) {
            // setData(preData => preData.filter(item => item.id !== deleteId))
            fetchReportedList()
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
        setOpenDelete(false)
    }

    const copyToClipboard = () => {
        const textarea = document.createElement('textarea')
        textarea.value = `${window.location.host}/signUp?inviterUserId=${userData?.id}`
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
        <Stack
            bgcolor="#FFF"
            marginTop={5}
            sx={{
                borderRadius: 4,
                border: '1px solid rgb(204, 204, 204)',
                height: '100%',
            }}>
            <Stack mt={5} alignItems="center">
                <Avatar src="" style={{ width: 80, height: 80 }} />
                {!isMine && (
                    <Button
                        style={{
                            fontSize: 12,
                            borderRadius: '15px',
                            textTransform: 'none',
                            marginTop: 20,
                            width: 100,
                        }}
                        onClick={handleFollow}
                        variant="outlined">
                        {userData.isFollowed ? 'Followed' : 'Follow'}
                    </Button>
                )}
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                margin={2}
                style={{ cursor: 'pointer' }}
                onClick={copyToClipboard}>
                <Stack
                    direction="row"
                    sx={{
                        borderRadius: 3,
                        bgcolor: `#E82BCC`,
                        height: 40,
                        width: 170,
                    }}>
                    <Stack direction="column" justifyContent="center" margin={1}>
                        <ShareIcon style={{ color: '#fff' }} />
                    </Stack>
                    <Stack direction="column" justifyContent="center">
                        <Typography style={{ fontSize: 18, marginRight: 4, marginLeft: 20 }}>
                            Invite
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center">
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        borderRadius: 3,
                        bgcolor: `${COLORS.followersColor}`,
                        height: 44,
                        width: 170,
                        marginTop: 1,
                    }}>
                    <Stack direction="column" margin={1}>
                        <GroupIcon style={{ color: '#fff' }} />
                    </Stack>
                    <Typography align="center" sx={{ fontWeight: 600 }}>
                        {userData?.followersNum} Followers
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center" marginTop={2}>
                <Stack
                    direction="row"
                    sx={{
                        borderRadius: 3,
                        bgcolor: `${COLORS.reputationColor}`,
                        height: 74,

                        width: 170,
                    }}>
                    <Stack direction="column" justifyContent="center" margin={1}>
                        <img src={Score || 'Score'} alt={'Score'} width={30} height={30} />
                    </Stack>
                    <Stack direction="column" justifyContent="center">
                        <Typography sx={{ fontSize: 21, marginLeft: 2, fontWeight: 600 }}>
                            {userData?.reputationScore}
                        </Typography>
                        <Typography style={{ fontSize: 12, marginLeft: 2 }}>
                            Reputation Score
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center" marginTop={2}>
                <Stack
                    direction="row"
                    sx={{
                        borderRadius: 3,
                        bgcolor: `${COLORS.userRanking}`,
                        height: 74,

                        width: 170,
                    }}>
                    <Stack direction="column" justifyContent="center" margin={1}>
                        <EqualizerIcon style={{ color: '#939393' }} />
                    </Stack>
                    <Stack direction="column" justifyContent="center">
                        <Typography
                            style={{
                                fontSize: 21,
                                fontWeight: 600,
                                marginRight: 4,
                                marginLeft: 2,
                            }}>
                            {userData?.rank ?? 'N/A'}
                        </Typography>
                        <Typography style={{ fontSize: 12, marginRight: 4, marginLeft: 2 }}>
                            User Rank
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>

            <Box
                display="flex"
                direction="row"
                justifyContent="center"
                marginTop={2}
                onClick={handleClickOpen}
                style={{ cursor: 'pointer' }}>
                <Stack
                    direction="row"
                    sx={{
                        borderRadius: 3,
                        bgcolor: '#1892EB',
                        height: 74,

                        width: 170,
                    }}>
                    <Stack direction="column" justifyContent="center" margin={1}>
                        <img src={Rank || 'Rank'} alt={'Rank'} width={30} height={30} />
                    </Stack>
                    <Stack direction="column" justifyContent="center">
                        <Typography style={{ fontSize: 18, marginRight: 4, marginLeft: 2 }}>
                            History Post
                        </Typography>
                    </Stack>
                </Stack>
            </Box>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close">
                            <Close />
                        </IconButton>
                        <Typography variant="h6">My History Post</Typography>
                    </Toolbar>
                </AppBar>
                <Box marginTop={10} />
                <DataGrid
                    columns={columns}
                    rows={data || []}
                    loading={loading}
                    style={{ backgroundColor: '#fff' }}
                    rowsPerPageOptions={[2, 5, 10, 50]}
                    components={{
                        Pagination: () => (
                            <TablePagination
                                component="div"
                                count={params.total}
                                page={params.current - 1}
                                rowsPerPage={params.size}
                                labelRowsPerPage="每页行数"
                                onPageChange={onPageChange}
                                style={{ color: '#666666' }}
                            />
                        ),
                    }}
                />
            </Dialog>

            <Dialog
                maxWidth="md"
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle style={{ width: 400, marginTop: 20, marginLeft: 20 }}>
                    Are you sure about the deletion?
                </DialogTitle>

                <DialogActions style={{ marginBottom: 20 }}>
                    <Button
                        onClick={() => setOpenDelete(false)}
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

export { ProfileSideBar }
