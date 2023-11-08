import { Menu, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import SearchPostItem from '../../components/SearchPostItem'

const SearchMenu = ({ anchorEl, onClose, open = false, searchResults, loadingResults }) => {
    return (
        <Menu
            id="long-menu"
            MenuListProps={{
                'aria-labelledby': 'long-button',
            }}
            elevation={2}
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    width: '500px',
                    borderRadius: '8px',
                    padding: 4,
                    marginTop: 8,
                },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            disableAutoFocus={true}
            disableEnforceFocus={true}>
            <Stack>
                <Typography sx={{ fontWeight: '600', marginLeft: 1, marginTop: 2 }}>
                    Top Matching Post Results
                </Typography>

                {loadingResults && (
                    <Stack margin={1}>
                        <Stack width={'50%'}>
                            <Skeleton />
                            <Skeleton sx={{ marginTop: -0.4 }} height={15} />
                        </Stack>
                        <Stack width={'70%'}>
                            <Skeleton />
                            <Skeleton sx={{ marginTop: -0.4 }} height={15} />
                        </Stack>
                    </Stack>
                )}
                {searchResults && searchResults?.length > 0 ? (
                    <Stack marginTop={1}>
                        {searchResults?.map(e => {
                            return <SearchPostItem post={e} key={e.postId} />
                        })}
                    </Stack>
                ) : (
                    <Stack margin={1}>
                        <Typography fontSize={'14px'}>
                            {loadingResults ? 'Searching...' : 'No Search Results'}
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Menu>
    )
}

export default SearchMenu
