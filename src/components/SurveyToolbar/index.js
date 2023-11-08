import { completedSurvey, newSurvey } from '../../assets'
import { Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import MyContext from '../../redux/MyContext'
import { Link } from '@material-ui/core'
const SurveyToolbar = ({ selected }) => {
    const {
        state: {
            global: {
                userInfo: { authority },
            },
        },
        setActiveCommunity,
        setIsChallengeOrProposalSelected,
    } = useContext(MyContext)
    const handleClick = () => {
        setActiveCommunity('')
        setIsChallengeOrProposalSelected(true)

        // Save to local storage
        localStorage.setItem('selectedCommunity', '')
        localStorage.setItem('isChallengeOrProposalSelected', '')
    }
    return (
        <>
            <Stack direction="row" justifyContent="flex-start" gap={1} alignItems="center">
                <Link href="/survey" style={{ textDecoration: 'none' }} onClick={handleClick}>
                    <Stack
                        direction="row"
                        gap={1}
                        alignItems="center"
                        padding={'12px'}
                        borderRadius={'25px'}
                        // bgcolor={selected == 'pending' ? COLORS.searchBarBackground : 'transparent'}
                        sx={{
                            cursor: 'pointer',
                            ':hover': {
                                // bgcolor: COLORS.searchBarBackground,
                            },
                        }}>
                        <img src={completedSurvey} alt="newSurvey" />
                        <Typography
                            color={selected != 'pending' ? 'gray' : 'black'}
                            fontWeight={600}
                            fontSize={14}>
                            {authority === 'ov_super_admin' ||
                            authority === 'ov_member_of_parliaments'
                                ? 'New Surveys'
                                : 'Pending Surveys'}
                        </Typography>
                    </Stack>
                </Link>

                <Link
                    href="/survey/completed"
                    style={{ textDecoration: 'none' }}
                    onClick={handleClick}>
                    <Stack
                        direction="row"
                        gap={1}
                        alignItems="center"
                        padding={'12px'}
                        borderRadius={'25px'}
                        // bgcolor={
                        //     selected == 'viewSurveys' ? COLORS.searchBarBackground : 'transparent'
                        // }
                        sx={{
                            cursor: 'pointer',
                            ':hover': {},
                        }}>
                        <img src={newSurvey} alt="viewSurveys" />
                        <Typography
                            color={selected != 'viewSurveys' ? 'gray' : 'black'}
                            fontWeight={600}
                            fontSize={14}>
                            {authority === 'ov_super_admin' ||
                            authority === 'ov_member_of_parliaments'
                                ? 'Published Surveys'
                                : 'Completed Surveys'}
                        </Typography>
                    </Stack>
                </Link>
            </Stack>
        </>
    )
}

export { SurveyToolbar }
