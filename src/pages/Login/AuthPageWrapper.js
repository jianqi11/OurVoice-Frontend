import { Box, CssBaseline, Grid, Stack } from '@mui/material'
import { AuthSidePanelImage, Logo } from '../../assets/index'
import React from 'react'

const AuthPageWrapper = ({ children }) => {
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={false}
                md={6}
                sx={{
                    backgroundImage: 'url(' + AuthSidePanelImage + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <Box
                    sx={{
                        color: 'white',
                        background: 'linear-gradient(to top, #E5FE57, #EA3CD5)',
                        display: { xs: 'none', sm: 'none', md: 'block' },
                    }}
                    width={23}
                    height="100%"
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} component="div" alignItems="center">
                <Stack
                    flex={1}
                    alignItems="center"
                    // height="100%" justifyContent="space-evenly"
                >
                    <Box marginTop={6}>
                        <img src={Logo || 'Logo'} alt={'Logo Text'} width={349} height={91} />
                    </Box>

                    {children}
                </Stack>
            </Grid>
        </Grid>
    )
}

export { AuthPageWrapper }
