import { Box } from '@material-ui/core'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const SearchPostItem = ({ post }) => {
    const history = useHistory()
    return (
        <Box
            onClick={() => {
                history.push('/postdetail/' + post.id)
            }}>
            <Stack flexDirection="row" alignItems="center" gap={1} marginLeft={1} marginBottom={1}>
                <Stack>
                    <Typography
                        fontSize="14px"
                        // textTransform="capitalize"
                        lineHeight={1}
                        color="black">
                        {post?.title}
                    </Typography>
                    <Typography fontSize="12px" marginTop={-0.2} color="grey">
                        {post?.description}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default SearchPostItem
