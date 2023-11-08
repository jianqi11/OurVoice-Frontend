import { Close } from '@material-ui/icons'
import { IconButton, Stack } from '@mui/material'
import { Image } from 'antd'
import React from 'react'

const FileUploadPreview = ({ file, onClickDelete }) => {
    return (
        <>
            <Stack direction="row" alignItems="start" key={file.url}>
                <Image
                    loader={() => file.url}
                    src={file.url ? file.url : ''}
                    height={50}
                    width={100}
                    alt="added"
                    style={{ objectFit: 'cover' }}
                />
                <IconButton
                    size="small"
                    onClick={() => {
                        onClickDelete(file)
                    }}
                    sx={{ top: 0, right: 0, width: 20, height: 20 }}>
                    <Close />
                </IconButton>
            </Stack>
        </>
    )
}

export default FileUploadPreview
