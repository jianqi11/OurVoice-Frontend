import { Avatar, Box, Container, Grid, IconButton, Typography } from '@material-ui/core'
import Linkify from 'linkify-react'
import React, { useState } from 'react'

import moment from 'moment'
import { FormInputWrapper } from '../FormInputWrapper'
import { ThumbUp } from '@material-ui/icons'
import { useMediaQuery } from '@material-ui/core'
import { Stack } from '@mui/material'
import { commentLike } from '../../services/comment'

function Comments({ data, fetchCommentList }) {
    const [showMore, setShowMore] = useState(false)
    const { userImageUrl } = data
    const mobileView = useMediaQuery(theme => theme.breakpoints.up('sm'))

    const handleLike = async () => {
        const res = await commentLike({ id: data.id })
        if (res?.data?.code === 200) {
            fetchCommentList()
        }
    }

    return (
        <div style={{ marginTop: 10 }}>
            <FormInputWrapper>
                <Stack
                    direction={mobileView ? 'column' : 'row'}
                    sx={{ width: { sm: '100%', md: '100%', lg: '80%' } }}
                    spacing={1}
                    alignItems={mobileView ? 'center' : 'start'}>
                    <Stack
                        direction={mobileView ? 'row' : 'column'}
                        sx={{ width: { sm: '100%', md: '100%', lg: '100%' } }}
                        spacing={1}
                        alignItems="center">
                        <Stack direction="row" alignItems="center">
                            <Avatar src={userImageUrl} style={{ width: 30, height: 30 }} />

                            <Stack direction="column">
                                <Stack direction="column">
                                    <Stack direction="row" alignItems="center" gap={2}>
                                        <Typography style={{ marginLeft: 5 }}>
                                            {data.userTelegramName}
                                        </Typography>

                                        <Typography style={{ fontSize: '9px' }}>
                                            {moment(data.createTime).startOf('minute').fromNow()}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </FormInputWrapper>
            <Box mt={1} />

            <Stack>
                <Container sx={{ fontSize: '14px' }}>
                    <FormInputWrapper>
                        <Grid>
                            <Linkify options={{ target: '_blank' }}>
                                <Typography
                                    onClick={() => setShowMore(!showMore)}
                                    sx={{
                                        textAlign: 'justify',
                                        whiteSpace: 'pre-line',
                                        fontSize: '14px',
                                    }}>
                                    {data.content}
                                </Typography>
                            </Linkify>
                        </Grid>
                    </FormInputWrapper>
                </Container>
                <FormInputWrapper>
                    <Grid mb={1.5}>
                        <Stack alignItems="center" direction="row" marginLeft={2}>
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <IconButton
                                    onClick={handleLike}
                                    style={{ color: data.isLiked ? '#7650FF' : 'grey' }}>
                                    <ThumbUp style={{ fontSize: 20 }} />
                                </IconButton>
                                <Box ml={1}>
                                    <Typography
                                        style={{
                                            color: 'grey',
                                            fontSize: '12px',
                                        }}>
                                        {data.likes}
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                </FormInputWrapper>
            </Stack>
        </div>
    )
}

export { Comments }
