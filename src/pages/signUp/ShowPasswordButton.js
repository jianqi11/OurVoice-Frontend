import { Visibility, VisibilityOff } from '@material-ui/icons'
import { IconButton, InputAdornment } from '@mui/material'
import React from 'react'

const ShowPasswordButton = ({ onClick, visibility }) => {
    return (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={onClick}
                sx={{ color: '#CCCCCC' }}>
                {visibility ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    )
}

export default ShowPasswordButton
