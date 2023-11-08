import { Container, Grid } from '@material-ui/core'
import React from 'react'

const ProfileWrapper = ({ childrenLeft, childrenRight }) => {
    return (
        <Container data-testid="profile-page-wrapper" maxWidth="lg">
            <Grid container height="100%" spacing={2} direction="row">
                <Grid
                    md={3}
                    item
                    sm={false}
                    xs={false}
                    display={{ sm: 'none', xs: 'none', md: 'flex' }}
                    style={{ flexDirection: 'column' }}>
                    {childrenLeft}
                </Grid>

                <Grid item md={9} sm={12} xs={12}>
                    {childrenRight}
                </Grid>
            </Grid>
        </Container>
    )
}

export { ProfileWrapper }
