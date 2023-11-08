import { Box, Typography, Stack, Button, Skeleton, useTheme } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import ChallengesService from '@/service/Challenges/Challenges.service'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import IchallengeView from './Challenges.interface'
import COLORS from '@/themes/colors'
import FollowersService from '@/service/Followers/Followers.service'
import { handleOnMutateFollowChallenge } from './logic/onMutateFollowChallenge'
import { handleOnMutateUnFollowChallenge } from './logic/onMutateUnFollowChallenge'
import Link from 'next/link'
import { CommunityContext } from '@/context/CommunityContext'
import { MyContext } from 'src/pages/_app'
import COLORSDARK from '@/themes/colorDark'
import { makeStyles } from '@material-ui/core'
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
        // textTransform: 'none',
    },

    unFollowText: {
        color: 'white',
        backgroundColor: '#6666FF',
        borderRadius: '32px',
        width: 80,
        fontSize: 12,
        // textTransform: 'none',
    },
})

const ChallengesView = ({ disabled, selectedId }) => {
    const { setIsChallengeOrProposalSelected, isChallengeOrProposalSelected, setActiveCommunity } =
        useContext(CommunityContext)
    const theme = useTheme()
    const { themeType, setThemeType } = useContext(MyContext)
    const [displayCount, setDisplayCount] = useState(4)
    const [showSeeMore, setShowSeeMore] = useState(true)
    const queryClient = useQueryClient()

    const { isLoading, data } = useQuery(
        'topchallenges',
        async () => {
            return await ChallengesService.getTopChallenges()
        },
        {
            onSuccess: res => {
                // console.log(res)
            },
            onError: err => {
                // console.log(err)
            },
        }
    )

    const { mutateAsync: followChallenge } = useMutation(FollowersService.followChallenge, {
        onMutate: newData => {
            handleOnMutateFollowChallenge(newData, queryClient)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('topchallenges')
        },
        onError: err => {
            // console.log(err)
        },
    })

    const { mutateAsync: unfollowChallenge } = useMutation(FollowersService.unfollowChallenge, {
        onMutate: newData => {
            handleOnMutateUnFollowChallenge(newData, queryClient)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('topchallenges')
        },
        onError: err => {
            // console.log(err)
        },
    })

    const handleFollow = async ({ challengeID, title, community }) => {
        await followChallenge({ challengeID, community, title })
    }

    const handleUnFollow = async challengeID => {
        await unfollowChallenge(challengeID)
    }

    const handleSeeMore = () => {
        setDisplayCount(data?.length || 0)
        setShowSeeMore(false)
    }

    const handleSeeLess = () => {
        setDisplayCount(4)
        setShowSeeMore(true)
    }

    const classes = useStyles()

    const handleChallengeClick = () => {
        setActiveCommunity('')
        setIsChallengeOrProposalSelected(true)

        localStorage.setItem('selectedCommunity', '')
        localStorage.setItem('isChallengeOrProposalSelected', 'true')
    }

    return (
        <>
            <Box className={disabled ? classes.disabled : classes.top}>
                <Box
                    sx={{
                        borderRadius: 2,
                        marginTop: 4,
                        padding: 2,
                        backgroundColor: theme.sideBarBg,
                    }}
                    border={COLORS.border}>
                    <Typography
                        fontWeight="bold"
                        color={
                            themeType === 'light'
                                ? COLORS.themeBaseTextColor
                                : COLORSDARK.themeBaseTextColor
                        }>
                        Trending Topic
                    </Typography>
                    <Box mt={2} />
                    {!isLoading ? (
                        <Stack>
                            {!data || data.length == 0 ? (
                                <Typography fontSize={12} textAlign="center">
                                    No challenges to display
                                </Typography>
                            ) : (
                                data &&
                                data?.slice(0, displayCount).map(challenge => (
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        justifyContent="space-between"
                                        alignItems="center"
                                        key={challenge.challengeID}
                                        style={{ marginTop: 3 }}
                                        sx={
                                            selectedId == challenge.challengeID
                                                ? {
                                                      backgroundColor: COLORS.primarySelectedShade,
                                                      marginX: -2,
                                                      paddingX: 2,
                                                  }
                                                : {}
                                        }>
                                        <Link
                                            href={`/challenge/${challenge.challengeID}`}
                                            onClick={handleChallengeClick}
                                            style={{ textDecoration: 'none' }}>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    color:
                                                        selectedId == challenge.challengeID
                                                            ? 'black'
                                                            : '#999999',
                                                }}>
                                                {challenge.title}
                                            </Typography>
                                        </Link>

                                        {challenge?.followStatus ? (
                                            <Button
                                                sx={{
                                                    fontSize: '12px',
                                                    borderRadius: '32px',
                                                    height: '28px',
                                                    fontWeight: 400,
                                                    lineHeight: '18px',
                                                    minWidth: '80px',
                                                    backgroundColor: COLORS.primary,
                                                    color: 'white',
                                                    ':hover': {
                                                        backgroundColor: 'white',
                                                        color: COLORS.primary,
                                                    },
                                                    width: 35,
                                                }}
                                                variant="outlined"
                                                onClick={() => {
                                                    handleUnFollow(challenge.challengeID)
                                                }}>
                                                Following
                                            </Button>
                                        ) : (
                                            <Button
                                                sx={{
                                                    fontSize: '12px',
                                                    borderRadius: '32px',
                                                    height: '28px',
                                                    fontWeight: 400,
                                                    lineHeight: '18px',
                                                    minWidth: '80px',
                                                    ':hover': {
                                                        backgroundColor: COLORS.primary,
                                                        color: 'white',
                                                    },
                                                }}
                                                variant="outlined"
                                                onClick={() => {
                                                    handleFollow(challenge)
                                                }}>
                                                Follow
                                            </Button>
                                        )}
                                    </Stack>
                                ))
                            )}

                            {showSeeMore && data && data.length > 4 && (
                                <Typography
                                    onClick={handleSeeMore}
                                    sx={{
                                        color: COLORS.greyIcon,
                                        textAlign: 'right',
                                        fontSize: '13px',
                                        marginTop: '10px',
                                        cursor: 'pointer',
                                    }}>
                                    Show more..
                                </Typography>
                            )}

                            {displayCount > 4 && (
                                <Typography
                                    onClick={handleSeeLess}
                                    sx={{
                                        color: COLORS.greyIcon,
                                        textAlign: 'right',
                                        fontSize: '13px',
                                        marginTop: '10px',
                                        cursor: 'pointer',
                                    }}>
                                    Show less..
                                </Typography>
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
        </>
    )
}

export default ChallengesView
