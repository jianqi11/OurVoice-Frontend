import { Divider, Link, MenuItem, Typography } from '@material-ui/core'
import { Menu, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { NotificationItem } from './NotificationItem'
import { getNotice } from '../../services/notice'
import { useHistory } from 'react-router-dom'

const NotificationMenu = ({ anchorEl, onClose, open = false }) => {
    const [notifications, setNotifications] = useState([])
    const history = useHistory()

    const fetchtNotice = async () => {
        const res = await getNotice()
        if (res?.data?.code === 200) {
            setNotifications(res?.data?.data || [])
        }
    }

    useEffect(() => {
        fetchtNotice()
    }, [])
    return (
        <Menu
            id="long-menu"
            MenuListProps={{
                'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    width: '40vw',
                    right: 10,
                    borderRadius: '15px',
                    padding: 20,
                },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">Notifications</Typography>

                <Link href={'/notifications'} style={{ textDecoration: 'none' }}>
                    <Typography>See All</Typography>
                </Link>
            </Stack>

            <Divider sx={{ marginBottom: 1 }} />
            {notifications.length > 0 ? (
                notifications.map(item => (
                    <MenuItem
                        key={item.notificationId}
                        onClick={() => {
                            history.push('/postdetail/' + item.originId)
                            onClose?.()
                        }}
                        sx={{ whiteSpace: 'normal' }}>
                        <NotificationItem notification={item} />
                    </MenuItem>
                ))
            ) : (
                <Typography textAlign="center">No Notifications</Typography>
            )}
        </Menu>
    )
}

export { NotificationMenu }
