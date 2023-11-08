import { Stack } from '@mui/material'
import { Box, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@material-ui/core'
import { PostSkelton } from '../Skeletons'
import { EditOutlined } from '@material-ui/icons'
import NewProposal from '../../pages/newProposal'
import { Modal, message } from 'antd'
import HomeFeedPost from '../../components/HomeFeedPost'
import { postList } from '../../services/post'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SurveyToolbar } from '../../components/SurveyToolbar'
import MyContext from '../../redux/MyContext'

export function EndMessage() {
    return (
        <Typography
            style={{
                textAlign: 'center',
                marginTop: 40,
                paddingBottom: 30,
                color: 'grey',
            }}>
            No posts to display
        </Typography>
    )
}

function HomeMiddlePage() {
    const theme = useTheme()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [listData, setListData] = useState([])
    const [total, setTotal] = useState(0)
    const [listParams, setListParams] = useState({ current: 1, size: 2 })
    const {
        state: {
            global: { activeCommunity, activeTrendingTitle, activeTrendingPost },
        },
    } = useContext(MyContext)

    const handleOk = () => {
        handleGetList(1, 2, true)
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleGetList = async (current, size, flag) => {
        if (flag) {
            listParams.current = current
            listParams.size = size
            setListParams({ current, size })
        }
        try {
            setIsLoading(true)
            const params = flag ? { size, current } : listParams
            const res = await postList({
                ...params,
                ...(activeCommunity !== 'ALL'
                    ? {
                          community: activeCommunity,
                          title: activeTrendingTitle,
                          topic: activeTrendingPost,
                      }
                    : {}),
            })
            const resData = res?.data?.data?.records || []
            setIsLoading(false)
            if (res?.data?.code === 200) {
                setListData(flag ? resData : [...listData, ...resData] || [])
                listParams.current++
                setListParams({ ...listParams })
                setTotal(res?.data?.data?.total)
            } else {
                message.error(res?.data?.msg || 'System busy')
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleGetList(1, 2, true)
    }, [activeCommunity, activeTrendingPost, activeTrendingTitle])
    return (
        <Box
            width="100%"
            {...(listData.length ? {} : { height: '85vh' })}
            overflow="auto"
            borderRadius="16px"
            component="form">
            <Box
                style={{
                    padding: 8,
                    paddingLeft: 0,
                    borderRadius: '48px',
                    border: theme.customColors.border,
                    color: theme.customColors.sideMenuTextColor,
                    backgroundColor: theme.customColors.searchBarBackground,
                }}
                onClick={() => setIsModalOpen(true)}>
                <Stack direction={'row'} alignItems="center" paddingX={2}>
                    <EditOutlined style={{ color: theme.customColors.sideMenuTextColor }} />
                    <Typography>Create a post...</Typography>
                </Stack>
            </Box>
            <Modal open={isModalOpen} footer={[]} onOk={handleOk} onCancel={handleCancel}>
                <NewProposal handleOk={handleOk} />
            </Modal>
            <Stack direction="row" justifyContent="space-between" marginTop={1}>
                <SurveyToolbar selected="none" />
            </Stack>
            <InfiniteScroll
                hasMore={listData.length < total || false}
                next={handleGetList}
                dataLength={listData.length}
                endMessage={isLoading ? <></> : <EndMessage />}>
                {listData.map(data => (
                    <HomeFeedPost key={data.id} post={data} setListData={setListData} />
                ))}
            </InfiniteScroll>
            {isLoading && <PostSkelton />}
        </Box>
    )
}

export default HomeMiddlePage
