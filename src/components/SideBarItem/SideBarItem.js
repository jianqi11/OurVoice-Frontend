import { Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import {
    Box,
    DialogActions,
    Dialog,
    Button,
    DialogTitle,
    IconButton,
    useTheme,
    TextField,
    DialogContent,
} from '@material-ui/core'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import COLORS from '../../theme/colors'
import { deleteCommunitys, newCommunitys } from '../../services/other'
import { message } from 'antd'

const banCommunity = ['Community', 'Home', 'Federal', 'State', 'Local']
const SideBarItem = ({
    keyId,
    selectedItem,
    icon,
    nested,
    text,
    isAdmin,
    setCommunityData,
    onClick,
}) => {
    console.log('isAdmin: ', isAdmin, keyId)
    const [open, setOpen] = React.useState(false)
    const [openCreateCommunity, setOpenCreateCommunity] = useState(false)
    const [newCommunityError, setNewCommunityError] = useState(false)
    const [newCommunity, setNewCommunity] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeletePost = async () => {
        const res = await deleteCommunitys({ community: keyId })
        if (res?.data?.code === 200) {
            setCommunityData(preData => preData.filter(item => item !== keyId))
            message.success('Success')
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
        handleClose()
    }

    const handleSave = async () => {
        const res = await newCommunitys({ community: newCommunity })
        if (res?.data?.code === 200) {
            setCommunityData(preData => [...preData, newCommunity])
            setCommunityData
            message.success('Success')
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
        setOpenCreateCommunity(false)
    }

    const theme = useTheme()
    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                margin={1}
                alignItems="center"
                marginTop={1}
                marginLeft={nested ? 4 : 2}>
                <Box
                    flexDirection="rows"
                    display="flex"
                    onClick={() => {
                        onClick?.(keyId)
                    }}>
                    {icon}
                    <Typography
                        style={{
                            marginLeft: 5,
                            color: selectedItem ? 'black' : theme.customColors.sideMenuTextColor,
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                        marginLeft={1}>
                        {text}
                    </Typography>
                </Box>
                {isAdmin && !banCommunity.includes(keyId) && (
                    <IconButton size="small" onClick={handleClickOpen}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                )}
                {isAdmin && keyId === 'Community' && (
                    <IconButton size="small" onClick={() => setOpenCreateCommunity(true)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                )}
            </Stack>
            {/* 添加 */}
            <Dialog onClose={() => setOpenCreateCommunity(false)} open={openCreateCommunity}>
                <DialogTitle onClose={() => setOpenCreateCommunity(false)}>
                    New Community
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={newCommunity}
                        fullWidth
                        style={{ width: 400 }}
                        error={newCommunityError}
                        onBlur={e => {
                            setNewCommunityError(!e.target.value)
                        }}
                        onChange={e => setNewCommunity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="contained" onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            {/* 删除 */}
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
        </>
    )
}

export { SideBarItem }
