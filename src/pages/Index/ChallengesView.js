import { Box, Typography, Button } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { Stack } from '@mui/material'
import { message } from 'antd'
import { trendingPost } from '../../services/post'
import MyContext from '../../redux/MyContext'
import { changeTrendingPost } from '../../redux/actions/global'

const useStyles = makeStyles({
    top: {
        width: '100%',
    },

    disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
        width: '100%',
    },

    folowText: {
        color: '#6666FF',
        borderRadius: '32px',
        backgroundColor: 'white',
        borderColor: '#6666FF',
        fontSize: 12,
        width: 80,
    },

    unFollowText: {
        color: 'white',
        backgroundColor: '#6666FF',
        borderRadius: '32px',
        width: 80,
        fontSize: 12,
    },
})

const ChallengesView = ({ disabled }) => {
    const theme = useTheme()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const classes = useStyles()

    const {
        state: {
            global: { activeTrendingPost },
        },
        dispatch,
    } = useContext(MyContext)

    const handleChallengeClick = data => {
        let temp = data
        if (data === activeTrendingPost) temp = ''
        dispatch(changeTrendingPost({ activeTrendingPost: temp }))
        localStorage.setItem('activeTrendingPost', temp)
    }

    const fetchTrendingPost = async () => {
        setLoading(true)
        const res = await trendingPost()
        setLoading(false)
        if (res?.data?.code === 200) {
            let resData = res?.data?.data || []
            resData = resData.map(item => item.topic)
            setData(resData)
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }

    useEffect(() => {
        fetchTrendingPost()
    }, [])

    return (
        <Box className={disabled ? classes.disabled : classes.top}>
            <Box
                sx={{
                    borderRadius: 8,
                    marginTop: 4,
                    padding: 20,
                    border: theme.customColors.border,
                    backgroundColor: theme.customColors.sideMenuBgColor,
                }}>
                <Typography
                    fontWeight="bold"
                    style={{ color: theme.customColors.themeBaseTextColor }}>
                    Trending Topic
                </Typography>
                <Box mt={2} />
                {!loading ? (
                    <Stack>
                        {!data || data.length == 0 ? (
                            <Typography
                                style={{ color: 'gray', textAlign: 'center', fontSize: 14 }}>
                                No challenges to display
                            </Typography>
                        ) : (
                            data?.map(item => (
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    justifyContent="space-between"
                                    alignItems="center"
                                    key={item}
                                    onClick={() => handleChallengeClick(item)}
                                    style={{ marginTop: 3 }}>
                                    <Typography style={{ fontSize: 13, color: '#999999' }}>
                                        {item}
                                    </Typography>

                                    <Button
                                        style={{
                                            fontSize: '10px',
                                            borderRadius: '32px',
                                            lineHeight: '15px',
                                            color: activeTrendingPost === item ? '#fff' : '#6666FF',
                                            backgroundColor:
                                                activeTrendingPost !== item ? '#fff' : '#6666FF',
                                            padding: 5,
                                            minWidth: 90,
                                            margin: 0,
                                        }}
                                        size="small"
                                        variant="outlined">
                                        {activeTrendingPost === item ? 'Following' : 'Follow'}
                                    </Button>
                                </Stack>
                            ))
                        )}
                    </Stack>
                ) : (
                    <Stack>
                        <Skeleton width={255} height={40} />
                        <Skeleton width={255} height={40} />
                        <Skeleton width={255} height={40} />
                        <Skeleton width={255} height={40} />
                    </Stack>
                )}
            </Box>
        </Box>
    )
}
export default ChallengesView
