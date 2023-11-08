import * as React from 'react'
import { styled, useTheme } from '@material-ui/core'
import { Avatar, Container, Link, MenuList, Typography } from '@material-ui/core'
import { Logo, downArrow, LogoDark } from '../../assets/index'
import { useContext, useState } from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import ChallengesView from './ChallengesView'
import PhoneMemu from '../../components/PhoneMenu'
import TopProposals from '../../components/TopProposals'
import DehazeIcon from '@material-ui/icons/Dehaze'
import COLORS from '../../theme/colors'
import _ from 'lodash'
import {
    CallToAction,
    Camera,
    DirectionsRunRounded,
    MoreVert,
    NightsStay,
    Notifications,
    NotificationsOutlined,
    Person,
    Search,
    Settings,
} from '@material-ui/icons'
import MyContext from '../../redux/MyContext'
import SearchMenu from './SearchMenu'
import { NotificationMenu } from '../../components/Notification/NotificationMenu'
import PhoneMemuDialog from '../../components/PhoneMemuDialog'
import SearchBarInputBase from '../../components/SearchBarInputBase'
import SideBar from './SideBar'
import { SearchIconWrapper } from '../../components/SearchBarIconWrapper'
import { SearchBarMain } from '../../components/SearchBarMain'
import { changeTheme } from '../../redux/actions/global'
import { useHistory } from 'react-router-dom'
import { Stack } from '@mui/material'
import { searchPost } from '../../services/post'
import { message } from 'antd'

const NavBar = () => {
    const [notificationCount, setNotificationCount] = useState(0)
    const [showPhoneMenu, setShowPhoneMenu] = React.useState(false)
    const [searchLoading, setSearchLoading] = React.useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [searchData, setSearchData] = useState([])
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const {
        state: {
            global: {
                themeType,
                userInfo: { authority, firstName, lastName, email },
            },
        },
        dispatch,
    } = useContext(MyContext)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const [anchorElNotification, setAnchorElNotification] = useState(null)
    const [anchorElSearch, setAnchorElSearch] = useState(null)

    const { setActiveCommunity, setIsChallengeOrProposalSelected } = useContext(MyContext)
    const openNotification = Boolean(anchorElNotification)
    const openSearch = Boolean(anchorElSearch)
    const theme = useTheme()
    const history = useHistory()
    const [searchText, setSearchText] = React.useState('')
    const data = {}
    const profilePic = data?.imageUrl

    const fetchData = async text => {
        setSearchLoading(true)
        const res = await searchPost({ text })
        setSearchLoading(false)
        if (res?.data?.code === 200) {
            setSearchData(res?.data?.data || [])
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }
    const debouncedFetchData = _.debounce(text => fetchData(text), 300)

    const handleOpenNotification = event => {
        setAnchorElNotification(event.currentTarget)
    }
    const handleCloseNotification = () => {
        setAnchorElNotification(null)
    }

    const handleOpenSearch = event => {
        setAnchorElSearch(event.currentTarget)
    }
    const handleCloseSearch = () => {
        setAnchorElSearch(null)
    }

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleProfilePage = () => {
        setAnchorEl(null)
        history.push('/profile')
    }

    const handleNotifications = () => {
        setAnchorEl(null)
        // navigate.push('/notifications')
        handleMobileMenuClose()
    }

    const handleLogout = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
        localStorage.removeItem('userInfo')
        history.push('/login')
    }

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleClick = selectedCommunity => {
        setActiveCommunity(selectedCommunity)
        setIsChallengeOrProposalSelected(false)

        localStorage.setItem('selectedCommunity', selectedCommunity)
        localStorage.setItem('isChallengeOrProposalSelected', 'false')
    }

    const handeleThemeChange = () => {
        if (themeType === 'light') {
            dispatch(changeTheme({ themeType: 'dark' }))

            if (typeof window !== 'undefined') {
                localStorage.setItem('themeType', 'dark')
            }
        }
        if (themeType === 'dark') {
            dispatch(changeTheme({ themeType: 'light' }))
            if (typeof window !== 'undefined') {
                localStorage.setItem('themeType', 'light')
            }
        }
    }
    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <MenuList style={{ padding: 10 }}>
                <MenuItem sx={{ marginBottom: -1 }}>
                    <Typography>{firstName + lastName}</Typography>
                </MenuItem>
                <MenuItem sx={{ fontSize: '12px' }}>{email}</MenuItem>
                <Divider />
                <MenuItem onClick={handleProfilePage}>
                    <ListItemIcon>
                        <Person fontSize="small" sx={{ color: 'black' }} />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handeleThemeChange}>
                    <ListItemIcon>
                        <NightsStay fontSize="small" style={{ color: 'grey' }} />
                    </ListItemIcon>
                    {themeType !== 'light' ? ' Light Theme' : 'Dark Theme'}
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        history.push('/notificationsetting')
                    }}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" style={{ color: 'grey' }} />
                    </ListItemIcon>
                    Notification setting
                </MenuItem>
                {authority === 'ov_super_admin' ||
                    (authority === 'ov_moderation' && (
                        <>
                            <Divider />
                            <MenuItem
                                onClick={() => {
                                    history.push('/management')
                                }}>
                                <ListItemIcon>
                                    <Camera fontSize="small" sx={{ color: 'black' }} />
                                </ListItemIcon>
                                Post Manage
                            </MenuItem>
                        </>
                    ))}
                {authority === 'ov_super_admin' && (
                    <>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" sx={{ color: 'black' }} />
                            </ListItemIcon>
                            Admin Task
                        </MenuItem>
                    </>
                )}
                {authority === 'ov_member_of_parliaments' && (
                    <>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                history.push('/panels')
                            }}>
                            <ListItemIcon>
                                <CallToAction fontSize="small" sx={{ color: 'black' }} />
                            </ListItemIcon>
                            MP Dashboard
                        </MenuItem>
                    </>
                )}
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <DirectionsRunRounded fontSize="small" sx={{ color: 'black' }} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    )

    const setNewNotificationsCount = count => {
        setNotificationCount(count)
    }

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 13,
        height: 13,
        border: `2px solid ${theme.palette.background.paper}`,
    }))

    // const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            // id={mobileMenuId}
            keepMounted
            sx={{
                '& ul': {
                    display: 'flex',
                    flexDirection: 'column',
                    paddingRight: 2,
                },
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
            <MenuItem onClick={handleNotifications}>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge
                        badgeContent={notificationCount}
                        style={{
                            color: COLORS.accentColor,
                        }}>
                        <Notifications />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit">
                    <Avatar alt="Travis Howard" src={profilePic} />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    )
    return (
        <Box style={{ position: 'sticky', top: 0, zIndex: 100 }}>
            <Box sx={{ flexGrow: 1 }} maxWidth="lg">
                <AppBar
                    position="sticky"
                    style={{
                        background: theme.customColors.navBarColor,
                        width: '100vw',
                        padding: '0 50px 0 100px',
                    }}
                    sx={{
                        [theme.breakpoints.down('md')]: {
                            padding: '0!important',
                        },
                    }}>
                    <Container maxWidth="xl">
                        <Toolbar style={{ paddingRight: 0, paddingLeft: 0 }}>
                            <Stack direction="row" flexGrow={1} justifyContent="space-between">
                                <Link href={'/'}>
                                    <img
                                        src={themeType === 'light' ? Logo : LogoDark || 'Logo'}
                                        alt={'Logo Text'}
                                        height={46}
                                        width={100}
                                        fallback={<div>failed to load</div>}
                                        onClick={() => handleClick('ALL')}
                                    />
                                </Link>

                                <SearchBarMain>
                                    <SearchIconWrapper>
                                        <Search />
                                    </SearchIconWrapper>
                                    <SearchBarInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        fullWidth
                                        onChange={e => {
                                            setSearchText(e.target.value)
                                            debouncedFetchData(e.target.value)
                                            handleOpenSearch(e)
                                        }}
                                        value={searchText}
                                    />
                                </SearchBarMain>
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '176px' }}>
                                    <Box flexGrow={1} />
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        style={{
                                            color: COLORS.accentColor,
                                            marginRight: 2,
                                        }}
                                        onClick={handleOpenNotification}>
                                        {notificationCount !== 0 ? (
                                            <Badge
                                                badgeContent={
                                                    notificationCount > 9 ? '9+' : notificationCount
                                                }
                                                sx={{
                                                    '& .MuiBadge-badge': {
                                                        color: 'white',
                                                        backgroundColor: COLORS.accentColor,
                                                    },
                                                }}>
                                                <NotificationsOutlined sx={{ fontSize: 24 }} />
                                            </Badge>
                                        ) : (
                                            <NotificationsOutlined sx={{ fontSize: 26 }} />
                                        )}
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        edge="end"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit">
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            badgeContent={
                                                <SmallAvatar alt="Remy Sharp">
                                                    <img
                                                        src={downArrow}
                                                        alt={'Logo Text'}
                                                        height={20}
                                                        width={20}
                                                    />
                                                </SmallAvatar>
                                            }>
                                            <Avatar alt="Travis Howard" src={profilePic}></Avatar>
                                        </Badge>
                                    </IconButton>
                                </Box>
                            </Stack>

                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    // aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit">
                                    <MoreVert />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>
            <PhoneMemu>
                <IconButton onClick={() => setShowPhoneMenu(v => !v)}>
                    <DehazeIcon sx={{ color: 'gray' }} />
                </IconButton>
            </PhoneMemu>
            {showPhoneMenu && (
                <PhoneMemuDialog
                    onClick={e => {
                        e.stopPropagation()
                        setShowPhoneMenu(false)
                    }}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        justifyItems="center"
                        alignItems="center"
                        overflow="auto">
                        <Stack width="80%" onClick={e => e.stopPropagation()}>
                            <SideBar />
                            <br /> <br /> <br /> <br />
                            <ChallengesView /> <TopProposals />
                        </Stack>
                    </Box>
                </PhoneMemuDialog>
            )}
            <NotificationMenu
                anchorEl={anchorElNotification}
                open={openNotification}
                onClose={handleCloseNotification}
                onNotificationCountUpdate={setNewNotificationsCount}
            />

            <SearchMenu
                anchorEl={anchorElSearch}
                open={openSearch}
                onClose={handleCloseSearch}
                searchResults={searchData}
                loadingResults={searchLoading}
            />
        </Box>
    )
}

export default NavBar
