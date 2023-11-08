import {
    Box,
    Button,
    CircularProgress,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
    makeStyles,
} from '@material-ui/core'
import * as Yup from 'yup'

import React, { useContext, useState } from 'react'
import MyContext from '../../redux/MyContext'
import { useFormik } from 'formik'
import { createProposal } from '../../assets'
import EmojiPicker from 'emoji-picker-react'
import { useEffect } from 'react'
import FileUploadPreview from '../../components/FileUploadPreview'
import NewProposalInputWrapper from '../../components/NewProposalInputWrapper'
import {
    CancelOutlined,
    CloseOutlined,
    InfoRounded,
    InsertEmoticon,
    PostAddOutlined,
} from '@material-ui/icons'
import { Image, message } from 'antd'
import { Autocomplete } from '@material-ui/lab'
import { Stack } from '@mui/material'
import { createPostAPI } from '../../services/post'
import { community } from '../../services/other'
import { getUserList } from '../../services/auth'

const FileUploadTooltip = () => {
    return (
        <Box ml={1}>
            <li>Valid File Types JPG, PNG</li>
            <li>Max File Size 5MB</li>
            <li>Max File Count 5</li>
        </Box>
    )
}
const useStyles = makeStyles({
    root: {
        '& .MuiFormLabel-root': {
            color: '#000',
            marginBottom: 5,
        },
    },
    hideIcon: {
        '& .MuiSelect-icon': {
            display: props => (props.authority !== 'ov_super_admin' ? 'block' : 'none'),
        },
    },
})
const NewProposal = ({ handleOk }) => {
    const {
        state: {
            global: {
                userInfo: { authority },
            },
        },
    } = useContext(MyContext)
    const classes = useStyles({ authority })
    const [filesList, setFilesList] = useState([])
    const [userList, setUserList] = useState([])
    const [communityData, setCommunityData] = useState([])
    const [errorUpload, setErrorUpload] = useState('')
    const [isUploading, setIsUploading] = useState(false)

    const formik = useFormik({
        initialValues: {
            topic: '',
            community: '',
            type: '',
            title: '',
            description: '',
            tags: [],
            userIds: [],
            images: [],
        },
        onSubmit: async values => {
            const data = { ...values, noticeUsers: values.userIds.map(item => item.id) }
            const res = await createPostAPI(data)
            if (res?.data?.code === 200) {
                handleOk()
                message.success('Posting success')
            } else {
                message.error(res?.data?.msg || 'System busy')
            }
        },
        validationSchema: Yup.object().shape({
            topic: Yup.string().trim().required('Topic is required'),
            community: Yup.string().trim().required('Community is required'),
            description: Yup.string().trim().required('Description is required'),
            title: Yup.string().trim().required('Title is required'),
            type: Yup.string().trim().required('Post type is required'),
        }),
    })

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const postId = 0
    const [emoji, seteEmoji] = useState('')

    useEffect(() => {
        formik.setFieldValue('description', formik.values.description + emoji)
        setTimeout(() => {
            seteEmoji('')
        }, 0)
        fetchCommunity()
        fetchUserList()
    }, [emoji])

    const validateFileCount = filesCount => {
        if (filesCount > 5) {
            setErrorUpload("Can't upload more than 5 Files!")
            return false
        }
        return true
    }

    const validateFileSize = file => {
        if (file && file.size >= 5 * 1024 * 1024) {
            setErrorUpload("Can't upload images larger than 5MB!")
            return false
        }
        return true
    }

    const uploadFile = async () => {
        // const result = await S3UploadService.handleUpload(file)
        // if (result) {
        //     return { name: file?.name, url: result }
        // } else {
        //     setErrorUpload('Unable to upload image, Please try again later!')
        //     return null
        // }
    }

    const handelFileUpload = async event => {
        const filesCount = event.target.files.length + filesList.length

        if (!validateFileCount(filesCount)) return

        setIsUploading(true)
        let uploaded = []

        for (let x = 0; x < filesCount; x++) {
            const file = event.target.files[x]

            if (!file) {
                continue
            }

            if (!validateFileSize(file)) {
                setIsUploading(false)
                break
            }

            const result = await uploadFile(file)

            if (result) {
                uploaded.push(result)
            } else {
                break
            }
        }

        setFilesList([...filesList, ...uploaded])
        setIsUploading(false)
    }
    console.log('handelFileUpload: ', handelFileUpload)

    const removeImage = file => {
        let imagesList = filesList.filter(e => {
            return e != file
        })

        setFilesList(imagesList)
    }
    const fetchCommunity = async () => {
        const res = await community()
        if (res?.data?.code === 200) {
            let resData = res?.data?.data || []
            setCommunityData(resData)
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }
    const fetchUserList = async () => {
        const res = await getUserList()
        if (res?.data?.code === 200) {
            const resData =
                res?.data?.data?.map(item => ({ id: item.id, name: item.telegramName })) || []
            setUserList(resData)
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }

    const commonProps = key => {
        const { errors, values, touched, handleBlur, handleChange } = formik
        return {
            fullWidth: true,
            size: 'small',
            name: key,
            onChange: handleChange,
            onBlur: handleBlur,
            variant: 'outlined',
            value: values[key],
            error: Boolean(touched[key]) && Boolean(errors[key]),
            helperText: touched[key] && errors[key],
        }
    }
    return (
        <>
            <Box className={classes.root}>
                <Stack flexDirection="row" alignItems="center">
                    <Image src={createProposal} alt={'icon'} width={24} height={28} />
                    <Typography variant="h6">
                        {Boolean(postId) ? 'Edit Post' : 'Create New Post'}
                    </Typography>
                </Stack>

                <NewProposalInputWrapper>
                    <FormLabel>Select Topic*</FormLabel>
                    <Autocomplete
                        size="small"
                        disablePortal
                        // disabled={isLoading || Boolean(postId)}
                        options={[
                            'Animal welfare',
                            'Housing',
                            'Climate change/Environment',
                            'Education',
                            'US Alliance/Relations with China',
                            'Federal budget',
                            'Taxation',
                        ]}
                        name="topic"
                        onSelect={formik.handleChange}
                        sx={{ width: 'auto', marginTop: '4px' }}
                        renderInput={params => <TextField {...params} {...commonProps('topic')} />}
                    />
                </NewProposalInputWrapper>

                <NewProposalInputWrapper>
                    <FormLabel>Select Community*</FormLabel>
                    <TextField select className={classes.hideIcon} {...commonProps('community')}>
                        {communityData.map(data => (
                            <MenuItem key={data} value={data}>
                                {data}
                            </MenuItem>
                        ))}
                    </TextField>
                </NewProposalInputWrapper>

                <NewProposalInputWrapper>
                    <FormLabel>Select Post Type*</FormLabel>
                    <Autocomplete
                        disablePortal
                        size="small"
                        id="combo-box-demo"
                        options={['General', 'Proposal', 'Community Poll']}
                        onSelect={formik.handleChange}
                        sx={{
                            width: 'auto',
                            marginTop: '4px',
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                {...commonProps('type')}
                                FormHelperTextProps={{
                                    sx: { ':first-letter': {} },
                                }}
                            />
                        )}
                    />
                </NewProposalInputWrapper>
                <NewProposalInputWrapper>
                    <FormLabel>Title*</FormLabel>
                    <TextField {...commonProps('title')} />
                </NewProposalInputWrapper>
                <NewProposalInputWrapper>
                    <FormLabel>Description*</FormLabel>
                    <TextField
                        {...commonProps('description')}
                        spellCheck={true}
                        sx={{ marginTop: '4px' }}
                        multiline
                        rows={6}
                        inputProps={{ maxLength: 2000 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    component="div"
                                    style={{ marginBottom: '100px', marginLeft: '20px' }}>
                                    <IconButton
                                        onClick={handleClick}
                                        id="basic-button"
                                        sx={{ width: 40, marginBottom: 1.5 }}>
                                        <InsertEmoticon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{ backgroundColor: 'transparent' }}
                        PaperProps={{ sx: { padding: '0px', boxShadow: 'none' } }}>
                        <EmojiPicker
                            searchDisabled
                            previewConfig={{ showPreview: true }}
                            onEmojiClick={e => {
                                seteEmoji(pre => pre + e.emoji)
                            }}
                            height={350}
                            width="100%"
                        />
                    </Menu>
                </NewProposalInputWrapper>
                <NewProposalInputWrapper>
                    <FormLabel>@ Who</FormLabel>
                    <Autocomplete
                        multiple
                        size="small"
                        limitTags={3}
                        id="multiple-limit-tags"
                        options={userList}
                        ChipProps={{
                            variant: 'outlined',
                            deleteIcon: <CloseOutlined />,
                        }}
                        getOptionLabel={option => option.name}
                        renderInput={params => (
                            <TextField {...params} {...commonProps('userIds')} spellCheck={true} />
                        )}
                        spellCheck={true}
                        sx={{ width: 'auto', marginTop: '4px' }}
                        value={formik.values.userIds}
                        freeSolo={true}
                        onChange={(e, val) => {
                            formik.setFieldValue('userIds', val)
                        }}
                    />
                </NewProposalInputWrapper>

                <NewProposalInputWrapper>
                    <FormLabel>Tags</FormLabel>
                    <Autocomplete
                        multiple
                        size="small"
                        limitTags={3}
                        id="multiple-limit-tags"
                        options={['Wildlife', 'Global Warming', 'Economy']}
                        ChipProps={{
                            variant: 'outlined',
                            deleteIcon: <CloseOutlined />,
                        }}
                        getOptionLabel={option => option}
                        renderInput={params => (
                            <TextField {...params} {...commonProps('tags')} spellCheck={true} />
                        )}
                        spellCheck={true}
                        sx={{ width: 'auto', marginTop: '4px' }}
                        value={formik.values.tags}
                        freeSolo={true}
                        onChange={(e, val) => {
                            formik.setFieldValue('tags', val)
                        }}
                    />
                </NewProposalInputWrapper>

                <NewProposalInputWrapper>
                    <Stack direction="row" alignItems="center">
                        <FormLabel>Upload Images</FormLabel>
                        <Tooltip title={<FileUploadTooltip />} placement="right">
                            <IconButton>
                                <InfoRounded
                                    fontSize="small"
                                    sx={{ color: '#231F20', fontSize: '1rem' }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    {!isUploading ? (
                        <Grid width={'100%'} gap={1} container>
                            {filesList.map(e => {
                                return (
                                    <Grid item md={3} key={e.url}>
                                        <FileUploadPreview file={e} onClickDelete={removeImage} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    ) : (
                        <CircularProgress />
                    )}
                    {errorUpload && (
                        <Typography color="error" sx={{ marginY: 1, fontSize: 14 }}>
                            {errorUpload}
                        </Typography>
                    )}
                    <Stack flexDirection="row" alignItems="center">
                        <input
                            accept="image/png, image/jpeg"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            // onChange={handelFileUpload}
                            multiple
                            disabled={isUploading || filesList.length >= 5}
                        />
                        <label htmlFor="raised-button-file">
                            <Button
                                // startIcon={<FileUploadOutlined />}
                                variant="contained"
                                size="small"
                                sx={{ marginTop: '8px', bgcolor: 'black', width: '150px' }}
                                component="span"
                                disabled={isUploading || filesList.length >= 5}>
                                Choose File
                            </Button>
                        </label>
                    </Stack>
                </NewProposalInputWrapper>

                <Stack marginTop={4} direction="row" justifyContent="space-around">
                    <Button
                        startIcon={<CancelOutlined />}
                        variant="outlined"
                        onClick={() => {
                            handleOk()
                        }}
                        sx={{ marginTop: '8px', color: 'primary', width: '120px' }}>
                        Cancel
                    </Button>
                    <Button
                        startIcon={<PostAddOutlined />}
                        variant="outlined"
                        sx={{ marginTop: '8px', color: 'primary', width: '120px' }}
                        onClick={formik.handleSubmit}>
                        {Boolean(postId) ? 'Update' : 'Post'}
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default NewProposal
