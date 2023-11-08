import { Divider, Link, MenuItem, Typography } from '@material-ui/core'
import { Menu, Stack } from '@mui/material'
import { useEffect, useState } from 'react'

const NotificationMenu = ({ anchorEl, onClose, open = false }) => {
    const [notifications, setNotifications] = useState([])

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
            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginY={1}>
                <Typography variant="h6">Notifications</Typography>

                <Link href={'/notifications'} style={{ textDecoration: 'none' }}>
                    <Typography>See All</Typography>
                </Link>
            </Stack>

            <Divider sx={{ marginBottom: 1 }} />
            {notifications.length > 0 ? (
                notifications.map(e => (
                    <MenuItem
                        key={e.notificationId}
                        onClick={() => {
                            // mutateAsync(e.notificationId)
                            onClose?.()
                        }}
                        sx={{ whiteSpace: 'normal' }}>
                        <NotificationItem notification={e} />
                    </MenuItem>
                ))
            ) : (
                <Typography>No Notifications</Typography>
            )}
        </Menu>
    )
}

export { NotificationMenu }
