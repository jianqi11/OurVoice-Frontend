import { Box, Divider, Link, Stack } from '@mui/material'

import React, { useContext, useEffect, useState } from 'react'

import { SideBarWrapper } from '../../components/SideBarWrapper/SideBarItem'
import MyContext from '../../redux/MyContext'
import { HouseOutlined, PeopleOutlineRounded, PersonPinCircleOutlined } from '@material-ui/icons'
import { SideBarItem } from '../../components/SideBarItem/SideBarItem'
import { useTheme } from '@material-ui/core'
import { changeSideMenu } from '../../redux/actions/global'
import { useHistory } from 'react-router'
import { community } from '../../services/other'
import { message } from 'antd'

const SideBar = ({ disableCommunities }) => {
    const history = useHistory()
    const theme = useTheme()
    const [communityData, setCommunityData] = useState([])
    const {
        state: {
            global: {
                activeCommunity,
                userInfo: { authority },
            },
        },
        dispatch,
    } = useContext(MyContext)

    const fetchCommunity = async () => {
        const res = await community()
        if (res?.data?.code === 200) {
            let resData = res?.data?.data || []
            setCommunityData(resData)
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }

    useEffect(() => {
        fetchCommunity()
    }, [])

    const handleClick = selectedCommunity => {
        history.push('/home')
        dispatch(changeSideMenu({ activeCommunity: selectedCommunity }))
        localStorage.setItem('selectedCommunity', selectedCommunity)
    }
    return (
        <>
            <Box
                bgcolor={theme.customColors.sideMenuBgColor}
                width="100%"
                height={(communityData.length + 3) * 43}
                border={theme.customColors.border}
                marginTop={4}
                style={{ position: 'sticky', top: 100, zIndex: 99 }}
                borderRadius="13px">
                <Link href={'/'} key="1" style={{ textDecoration: 'none' }}>
                    <SideBarItem
                        keyId="Home"
                        icon={
                            <HouseOutlined
                                style={{ color: theme.customColors.sideMenuTextColor }}
                            />
                        }
                        text="Home"
                        onClick={() => handleClick('ALL')}
                        selectedItem={false}
                    />
                </Link>
                <Divider sx={{ color: theme.customColors.greyIcon }} />
                <Stack sx={disableCommunities ? { opacity: 0.4 } : {}}>
                    <SideBarItem
                        keyId="Community"
                        isAdmin={authority === 'ov_super_admin'}
                        icon={
                            <PeopleOutlineRounded
                                style={{ color: theme.customColors.sideMenuTextColor }}
                            />
                        }
                        text="Community"
                        setCommunityData={setCommunityData}
                    />
                    <SideBarWrapper selectedItem={activeCommunity === 'ALL'} lastIndex={3}>
                        <Divider sx={{ color: theme.customColors.greyIcon }} />
                        <SideBarItem
                            key="3"
                            keyId="3"
                            onClick={() => handleClick('ALL')}
                            icon={
                                <PersonPinCircleOutlined
                                    style={{
                                        color:
                                            activeCommunity === 'ALL'
                                                ? '#000'
                                                : theme.customColors.sideMenuTextColor,
                                    }}
                                />
                            }
                            text="All Communities"
                            nested={true}
                            selectedItem={activeCommunity === 'ALL'}
                        />
                    </SideBarWrapper>

                    {communityData?.map((item, i) => (
                        <SideBarWrapper
                            key={i}
                            selectedItem={activeCommunity === item}
                            lastIndex={3}>
                            <Divider sx={{ color: theme.customColors.greyIcon }} />
                            <SideBarItem
                                keyId={item}
                                onClick={() => handleClick(item)}
                                icon={
                                    <PersonPinCircleOutlined
                                        style={{
                                            color:
                                                activeCommunity === item
                                                    ? '#000'
                                                    : theme.customColors.sideMenuTextColor,
                                        }}
                                    />
                                }
                                text={`${item} Communities`}
                                nested={true}
                                isAdmin={authority === 'ov_super_admin'}
                                setCommunityData={setCommunityData}
                                selectedItem={activeCommunity === item}
                            />
                        </SideBarWrapper>
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default SideBar
