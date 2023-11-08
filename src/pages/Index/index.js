import React from 'react'
import { MainWrapper } from '../../components/MainWrapper/MainPageWrapper'
import { Stack } from '@mui/material'
import ChallengesView from './ChallengesView'
import TopProposals from '../../components/TopProposals'
import SideBar from './SideBar'
import HomeMiddlePage from '../../components/HomeMiddlePage/HomeMiddlePage'
const Index = () => {
    return (
        <MainWrapper
            data-testid="home-main-wrapper"
            childrenRight={
                <Stack marginTop={4} style={{ position: 'sticky', top: 100, zIndex: 99 }}>
                    <ChallengesView /> <TopProposals />
                </Stack>
            }
            childrenLeft={<SideBar />}>
            <HomeMiddlePage />
        </MainWrapper>
    )
}

export default Index
