import {
    Box,
    Button,
    ButtonGroup,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Bar1 from './Bar1'
import ChartEmo from './ChartEmo'
import { Stack } from '@mui/material'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import BarAge from './BarAge'
import BarAge2 from './BarAge2'
import ConespondingChart from './ConespondingChart'
import { MoreVert } from '@material-ui/icons'
import { trendingPost } from '../../services/post'
import { message } from 'antd'
import { activityNumByToday } from '../../services/board'

const renderItem = props => {
    const flag = props.todayNum >= props.yesterdayNum
    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            paddingTop={2}
            width="24%"
            position="relative">
            <Typography variant="h6">{props.todayNum}</Typography>
            <Typography
                variant="body1"
                style={{ fontSize: 14, color: '#999', position: 'relative' }}>
                {props.itemCode}
            </Typography>
            <Box display="flex" alignItems="center" position="absolute" top={5} right={20}>
                {!flag && <ArrowDownwardIcon style={{ fontSize: 16, color: 'red' }} />}
                {flag && <ArrowUpwardIcon style={{ fontSize: 16, color: '#A1C281' }} />}

                <Typography
                    variant="body1"
                    style={{ fontSize: 14, color: !flag ? 'red' : '#A1C281' }}>
                    {props.risesRatio}
                </Typography>
            </Box>
        </Box>
    )
}
export default function Panels() {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const [proposalsData, setProposalsData] = useState([])
    const [totalViewData, setTotalViewData] = useState([])
    const [topic, setToic] = useState([])
    const [barAgeType, setBarAgeType] = useState('ActivityByAge')

    const fetchaActivityNumByToday = async () => {
        const res = await activityNumByToday()
        if (res?.data?.code === 200) {
            setTotalViewData(res?.data?.data || [])
        }
    }
    useEffect(() => {
        fetchaActivityNumByToday()
    }, [])
    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget)
    }
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const fetchTrendingPost = async () => {
        const res = await trendingPost()
        if (res?.data?.code === 200) {
            let resData = res?.data?.data || []
            resData = resData.map(item => item.topic)
            setProposalsData(resData)
            setToic(resData?.[0] || '')
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }

    useEffect(() => {
        fetchTrendingPost()
    }, [])
    return (
        <Stack>
            <Paper
                style={{
                    width: '100%',
                    height: 150,
                    marginTop: 40,
                    padding: '5px 20px 30px 20px',
                    boxSizing: 'border-box',
                }}>
                <Bar1 />
            </Paper>
            <Paper
                style={{
                    borderRadius: 20,
                    width: '100%',
                    height: 80,
                    marginTop: 20,
                }}>
                <Stack display="flex" flexDirection="row">
                    {totalViewData.map((data, i) => (
                        <React.Fragment key={i}>{renderItem(data)}</React.Fragment>
                    ))}
                </Stack>
            </Paper>

            <Stack flexDirection="row">
                <Paper style={{ marginTop: 20, width: 300, padding: 10 }}>
                    {barAgeType === 'LikeRateByTopic' ? (
                        <BarAge2 barAgeType={barAgeType} />
                    ) : (
                        <BarAge barAgeType={barAgeType} />
                    )}

                    <ButtonGroup
                        variant="outlined"
                        style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}
                        color="primary"
                        size="small">
                        <Button
                            variant={barAgeType === 'ActivityByAge' ? 'contained' : 'outlined'}
                            onClick={() => setBarAgeType('ActivityByAge')}
                            style={{
                                borderRadius: 10,
                                border: '1px solid rgba(102, 102, 255, 0.5)',
                                marginRight: 10,
                            }}>
                            Age
                        </Button>
                        <Button
                            variant={barAgeType === 'ActivityBySex' ? 'contained' : 'outlined'}
                            onClick={() => setBarAgeType('ActivityBySex')}
                            style={{
                                borderRadius: 10,
                                border: '1px solid rgba(102, 102, 255, 0.5)',
                                marginRight: 10,
                            }}>
                            Sex
                        </Button>
                        <Button
                            variant={barAgeType === 'ActivityByAuth' ? 'contained' : 'outlined'}
                            onClick={() => setBarAgeType('ActivityByAuth')}
                            style={{
                                borderRadius: 10,
                                border: '1px solid rgba(102, 102, 255, 0.5)',
                                marginRight: 10,
                            }}>
                            Auth
                        </Button>
                        <Button
                            variant={barAgeType === 'UserNumByFollowers' ? 'contained' : 'outlined'}
                            onClick={() => setBarAgeType('UserNumByFollowers')}
                            style={{
                                borderRadius: 10,
                                border: '1px solid rgba(102, 102, 255, 0.5)',
                                marginRight: 10,
                            }}>
                            Fans
                        </Button>
                        <Button
                            variant={barAgeType === 'LikeRateByTopic' ? 'contained' : 'outlined'}
                            onClick={() => setBarAgeType('LikeRateByTopic')}
                            style={{
                                borderRadius: 10,
                                border: '1px solid rgba(102, 102, 255, 0.5)',
                                marginRight: 10,
                            }}>
                            Topic
                        </Button>
                    </ButtonGroup>
                </Paper>
                <Paper style={{ marginTop: 20, marginLeft: 20, padding: 10 }}>
                    <ChartEmo />
                </Paper>
            </Stack>
            <Paper
                style={{
                    marginTop: 20,
                    marginBottom: 30,
                    padding: 10,
                    paddingTop: 30,
                    position: 'relative',
                }}>
                <span style={{ position: 'absolute', left: 200, fontWeight: 700 }}>{topic}</span>
                <ConespondingChart topic={topic} />
                <IconButton
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={handleMobileMenuOpen}
                    color="inherit">
                    <MoreVert />
                </IconButton>
                <Menu
                    anchorEl={mobileMoreAnchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
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
                    open={Boolean(mobileMoreAnchorEl)}
                    onClose={handleMobileMenuClose}>
                    {proposalsData.map(data => (
                        <MenuItem
                            key={data}
                            onClick={() => {
                                setToic(data)
                                handleMobileMenuClose()
                            }}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"></IconButton>
                            <p>{data}</p>
                        </MenuItem>
                    ))}
                </Menu>
            </Paper>
        </Stack>
    )
}
