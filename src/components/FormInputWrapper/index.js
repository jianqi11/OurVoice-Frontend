import { styled } from '@material-ui/core'
import { Stack } from '@mui/material'

export const FormInputWrapper = styled(Stack)(({ theme }) => ({
    justifyContent: 'space-between',
    [theme.breakpoints.only('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // [theme.breakpoints.only('md')]: {
    //     flexDirection: 'column',
    //     alignItems: 'normal',
    // },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'center',
    },
}))
