import { Container, Grid, Stack } from '@mui/material'

import React from 'react'
import NavBar from '../../pages/Index/NavBar'
import { useTheme } from '@material-ui/core'

const MainWrapper = ({ childrenLeft, children, childrenRight, showNavBar = true }) => {
    const { customColors } = useTheme()
    return (
        <>
            {showNavBar && <NavBar data-testid="navbar" />}
            <Container
                style={{ backgroundColor: customColors.bodyBgColor }}
                data-testid="main-page-wrapper"
                maxWidth="lg">
                <Grid container bgcolor={customColors.bodyBgColor} flex={1}>
                    <Grid
                        item
                        md={3}
                        sm={false}
                        xs={false}
                        display={{ sm: 'none', xs: 'none', md: 'flex' }}>
                        {childrenLeft}
                    </Grid>
                    <Grid
                        item
                        md={childrenRight ? 6 : 9}
                        sx={{
                            // overflowY: 'auto',
                            // maxHeight: '100vh',
                            padding: { sm: childrenRight ? 4 : 0 },
                            paddingTop: { sm: 4, xs: 4 },
                            paddingLeft: { sm: 4 },
                        }}
                        justifyContent="center"
                        justifyItems="center"
                        sm={12}
                        xs={12}>
                        {children}
                    </Grid>
                    <Grid
                        item
                        md={3}
                        sm={false}
                        xs={false}
                        display={{ sm: 'none', xs: 'none', md: 'flex' }}>
                        <Stack width={'100%'}>{childrenRight}</Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export { MainWrapper }
