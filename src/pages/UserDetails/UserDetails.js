import {
    Box,
    Button,
    Divider,
    FormLabel,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@material-ui/core'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { FormWrapper } from '../../components/FormWrapper'
import { FormInputWrapper } from '../../components/FormInputWrapper'
import { CustomSvgIcon } from '../../components/SvgIcon/CustomSvgIcon'
import React, { useEffect } from 'react'
import COLORS from '../../theme/colors'
import EmojiPicker from 'emoji-picker-react'
import { makeStyles } from '@material-ui/core'
import { Stack } from '@mui/material'
import { Autocomplete } from '@material-ui/lab'
import { CloseOutlined, Help, InsertEmoticon } from '@material-ui/icons'
import { updateDetail } from '../../services/auth'
import { message } from 'antd'

const ElectorateTooltip = ({ text }) => <Box>{text}</Box>

const useStyles = makeStyles({
    root: {
        '& .MuiFormLabel-root': {
            minWidth: '200px',
        },
    },
    toolTipBox: {
        '& .MuiFormLabel-root': {
            minWidth: '150px',
        },
    },
    input: {
        '& input[type=number]': {
            '-moz-appearance': 'textfield',
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    },

    alert: {
        textAlign: 'center',
        marginBottom: '2px',
    },
})

const UserDetails = ({ details, userData, noIsMine }) => {
    const mobileView = useMediaQuery(theme => theme.breakpoints.up('sm'))
    const history = useHistory()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const openEmoji = Boolean(anchorEl)
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            bio: '',
            regAddressOne: '',
            regAddressTwo: '',
            regCity: '',
            suburb: '',
            postalCode: '',
            phoneNumber: '',
            gender: '',
            birthday: '',
            interests: [],
            email: '',
            country: '',
            federalElectorate: '',
            stateElectorate: '',
            localElectorate: '',
        },
        onSubmit: async values => {
            handleUpdateDetail({ ...userData, ...values })
        },
        validationSchema: Yup.object().shape({}),
    })

    const handleUpdateDetail = async data => {
        const res = await updateDetail(data)
        if (res?.data?.code === 200) {
            message.success('Successful update')
            history.push('/')
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }

    useEffect(() => {
        formik.setValues({ ...userData, interests: userData?.interests || [] })
    }, [userData])

    const classes = useStyles()

    const commonProps = key => {
        const { errors, values, touched, handleBlur, handleChange } = formik
        return {
            disabled: noIsMine,
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
    const VERIFICATION_STATUS = {}

    return (
        <Box
            bgcolor="white"
            width="100%"
            height="100%"
            marginTop={4}
            borderRadius="15px"
            border={COLORS.border}
            className={classes.root}>
            <FormWrapper component="form" margin={'auto'} marginTop={0}>
                <Box mt={2} />
                <FormInputWrapper>
                    <FormLabel>Name*</FormLabel>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: { sm: '100%', md: '100%', lg: '80%' } }}
                        gap={3}>
                        <TextField placeholder="First Name" {...commonProps('firstName')} />
                        <TextField
                            type="text"
                            placeholder="Last Name"
                            fullWidth
                            {...commonProps('lastName')}
                        />
                    </Stack>
                </FormInputWrapper>
                <FormInputWrapper marginTop={2}>
                    <FormLabel>About me</FormLabel>
                    <TextField
                        sx={{
                            width: {
                                sm: '70%',
                                md: '100%',
                                lg: '80%',
                            },
                        }}
                        inputProps={{ maxLength: 250 }}
                        multiline
                        spellCheck={true}
                        rows={3}
                        placeholder="About me"
                        {...commonProps('bio')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    component="div"
                                    style={{ paddingLeft: '-14px' }}>
                                    <IconButton onClick={handleClick}>
                                        <InsertEmoticon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openEmoji}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{ backgroundColor: 'transparent' }}
                        PaperProps={{ sx: { padding: '0px', boxShadow: 'none' } }}>
                        <EmojiPicker
                            searchDisabled={true}
                            previewConfig={{ showPreview: false }}
                            // onEmojiClick={e => {}}
                            height={350}
                            width="100%"
                        />
                    </Menu>
                </FormInputWrapper>

                <FormInputWrapper marginTop={2}>
                    <FormLabel>Registered Address</FormLabel>
                    <TextField
                        sx={{ width: { sm: '100%', md: '100%', lg: '80%' } }}
                        placeholder="Address Line 1"
                        {...commonProps('regAddressOne')}
                    />
                </FormInputWrapper>

                <FormInputWrapper marginTop={2}>
                    <FormLabel />
                    <TextField
                        sx={{ width: { sm: '100%', md: '100%', lg: '80%' } }}
                        placeholder="Address Line 2"
                        {...commonProps('regAddressTwo')}
                    />
                </FormInputWrapper>

                <FormInputWrapper marginTop={2}>
                    <FormLabel />
                    <TextField
                        sx={{ width: { sm: '100%', md: '100%', lg: '80%' } }}
                        placeholder="City"
                        {...commonProps('regCity')}
                    />
                </FormInputWrapper>
                <FormInputWrapper marginTop={2}>
                    <FormLabel>Suburb / Postal code*</FormLabel>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: { sm: '100%', md: '100%', lg: '100%' } }}
                        gap={2}>
                        <TextField placeholder="Suburb" {...commonProps('suburb')} />
                        <TextField placeholder="PostCode" {...commonProps('postalCode')} />
                    </Stack>
                </FormInputWrapper>
                <FormInputWrapper marginTop={2}>
                    <FormLabel>Phone</FormLabel>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: { sm: '100%', md: '100%', lg: '80%' } }}
                        gap={3}>
                        <TextField
                            select
                            defaultValue="def"
                            placeholder="Country"
                            variant="outlined"
                            style={{ width: 100 }}
                            disabled
                            size="small"
                            InputProps={{ inputProps: { style: { background: '#EFEFEF' } } }}>
                            {[
                                <MenuItem key={1} value={'def'}>
                                    +61
                                </MenuItem>,
                                <MenuItem key={2} value={'others'}>
                                    others
                                </MenuItem>,
                            ]}
                        </TextField>
                        <TextField
                            type="number"
                            placeholder="Phone Number"
                            className={classes.input}
                            {...commonProps('phoneNumber')}
                        />
                    </Stack>
                </FormInputWrapper>
                <FormInputWrapper marginTop={2}>
                    <FormLabel>Gender</FormLabel>
                    <TextField
                        select
                        sx={{ width: { sm: '100%', md: '100%', lg: '80%' } }}
                        {...commonProps('gender')}
                        onChange={(e, val) => {
                            formik.setFieldValue('gender', val.props.value)
                        }}>
                        {[
                            <MenuItem key={'Male'} value={'Male'}>
                                Male
                            </MenuItem>,
                            <MenuItem key={'Female'} value={'Female'}>
                                Female
                            </MenuItem>,
                        ]}
                    </TextField>
                </FormInputWrapper>
                <FormInputWrapper marginTop={2}>
                    <FormLabel>Date of birth</FormLabel>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: { sm: '100%', md: '100%', lg: '80%' } }}>
                        <TextField type="date" {...commonProps('birthday')} />
                    </Stack>
                </FormInputWrapper>
                <FormInputWrapper marginTop={2}>
                    <FormLabel>Interests</FormLabel>
                    <Autocomplete
                        multiple
                        limitTags={3}
                        id="multiple-limit-tags"
                        options={['Politics', 'Camping', 'Reading']}
                        ChipProps={{
                            variant: 'outlined',
                            deleteIcon: <CloseOutlined />,
                        }}
                        getOptionLabel={option => option}
                        fullWidth
                        disabled={noIsMine}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Tags"
                                {...commonProps('interests')}
                                spellCheck="true"
                            />
                        )}
                        spellCheck={true}
                        sx={{ width: { sm: '100%', md: '100%', lg: '80%' } }}
                        value={formik.values.interests}
                        freeSolo={true}
                        onChange={(e, val) => {
                            formik.setFieldValue('interests', val)
                        }}
                    />
                </FormInputWrapper>

                <Divider sx={{ marginY: 6 }} />

                <FormInputWrapper marginTop={2}>
                    <FormLabel>Email</FormLabel>
                    <TextField
                        sx={{
                            width: { sm: '100%', md: '100%', lg: '80%' },
                        }}
                        fullWidth
                        size="small"
                        type="text"
                        placeholder="Email"
                        value={formik.values?.email}
                        disabled
                        variant="outlined"
                        InputProps={{ inputProps: { style: { background: '#EFEFEF' } } }}
                    />
                </FormInputWrapper>
                <FormInputWrapper marginTop={2}>
                    <FormLabel>Country</FormLabel>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Country"
                        variant="outlined"
                        value={formik.values?.country}
                        InputProps={{ inputProps: { style: { background: '#EFEFEF' } } }}
                        disabled
                    />
                </FormInputWrapper>
                <FormInputWrapper marginTop={2}>
                    <Stack direction="row">
                        <Stack flexDirection="row" marginRight={1} className={classes.toolTipBox}>
                            <FormLabel>Federal Electorate</FormLabel>
                            <Tooltip
                                title={
                                    <ElectorateTooltip text="Federal Electorate is assigned based on your Suburb and Postal code." />
                                }>
                                <IconButton>
                                    <Help fontSize="small" sx={{ color: '#231F20' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                    <TextField
                        fullWidth
                        size="small"
                        sx={{
                            width: { sm: '100%', md: '100%', lg: '80%' },
                        }}
                        placeholder="Country"
                        variant="outlined"
                        value={formik.values?.federalElectorate}
                        InputProps={{ inputProps: { style: { background: '#EFEFEF' } } }}
                        disabled
                    />
                </FormInputWrapper>
                <FormInputWrapper marginTop={2}>
                    <Stack direction="row">
                        <Stack flexDirection="row" marginRight={1} className={classes.toolTipBox}>
                            <FormLabel>State Electorate</FormLabel>
                            <Tooltip
                                title={
                                    <ElectorateTooltip text="State Electorate is assigned based on your Suburb and Postal code." />
                                }>
                                <IconButton>
                                    <Help fontSize="small" sx={{ color: '#231F20' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                    <TextField
                        fullWidth
                        size="small"
                        sx={{
                            width: { sm: '100%', md: '100%', lg: '80%' },
                        }}
                        placeholder="State Electorate"
                        value={formik.values?.stateElectorate}
                        variant="outlined"
                        InputProps={{ inputProps: { style: { background: '#EFEFEF' } } }}
                        disabled
                    />
                </FormInputWrapper>
                <FormInputWrapper marginTop={2}>
                    <Stack direction="row">
                        <Stack flexDirection="row" marginRight={1} className={classes.toolTipBox}>
                            <FormLabel>Local Electorate</FormLabel>
                            <Tooltip
                                title={
                                    <ElectorateTooltip text="Local Electorate is assigned based on your Suburb and Postal code." />
                                }>
                                <IconButton>
                                    <Help fontSize="small" sx={{ color: '#231F20' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                    <TextField
                        fullWidth
                        size="small"
                        sx={{
                            width: { sm: '100%', md: '100%', lg: '80%' },
                        }}
                        placeholder="State Electorate"
                        variant="outlined"
                        value={formik.values?.localElectorate}
                        InputProps={{ inputProps: { style: { background: '#EFEFEF' } } }}
                        disabled
                    />
                </FormInputWrapper>
            </FormWrapper>

            <Stack maxWidth={640} sx={{ padding: mobileView ? 0 : 3 }}>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <Typography style={{ fontSize: '14px' }} variant="h6">
                    Verify Your Identity
                </Typography>
                <Typography style={{ fontSize: '14px' }}>
                    We’re required to verify your identity for access full features of the App.
                </Typography>
                {details?.verificationStatus != VERIFICATION_STATUS.KYC_COMPLETE ? (
                    <Stack
                        flexDirection="row"
                        marginTop={2}
                        paddingBottom={2}
                        paddingRight={3}
                        alignSelf="start">
                        <div id="digitalid-verify"></div>
                    </Stack>
                ) : (
                    // <VerifiedBadge />
                    <>VerifiedBadge</>
                )}
                <Divider style={{ marginTop: 20 }} />
            </Stack>

            <Box textAlign="center">
                {!noIsMine && (
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            marginTop: 20,
                            fontSize: '16px',
                            width: '160px',
                            height: '44px',
                            fontWeight: 400,
                            borderRadius: 20,
                        }}
                        startIcon={
                            <CustomSvgIcon
                                width={19}
                                height={19}
                                xmlns="http://www.w3.org/2000/svg"
                                d="m8.172 13.095 6.368-6.368-1.035-1.012-5.333 5.332-2.7-2.7L4.46 9.36l3.712 3.735ZM9.5 18a8.708 8.708 0 0 1-3.487-.709 9.129 9.129 0 0 1-2.87-1.935 9.129 9.129 0 0 1-1.934-2.868A8.708 8.708 0 0 1 .5 9c0-1.245.236-2.415.709-3.51a8.994 8.994 0 0 1 1.935-2.858A9.226 9.226 0 0 1 6.013.71 8.708 8.708 0 0 1 9.5 0c1.245 0 2.415.236 3.51.709a9.089 9.089 0 0 1 2.857 1.923 9.089 9.089 0 0 1 1.924 2.858A8.764 8.764 0 0 1 18.5 9c0 1.23-.236 2.393-.709 3.488a9.225 9.225 0 0 1-1.924 2.868 8.994 8.994 0 0 1-2.857 1.935A8.764 8.764 0 0 1 9.5 18Zm0-1.35c2.13 0 3.938-.746 5.422-2.239C16.407 12.92 17.15 11.115 17.15 9c0-2.13-.742-3.938-2.227-5.422C13.436 2.092 11.63 1.35 9.5 1.35c-2.115 0-3.919.742-5.411 2.228C2.596 5.063 1.85 6.87 1.85 9c0 2.115.746 3.919 2.239 5.411C5.58 15.904 7.385 16.65 9.5 16.65Z"
                                fill="#fff"
                                sx={{ marginTop: 0.6 }}
                            />
                        }
                        onClick={formik.handleSubmit}>
                        Save
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="inherit"
                    style={{
                        marginTop: 20,
                        fontSize: '16px',
                        width: '160px',
                        height: '44px',
                        fontWeight: 400,
                        borderRadius: 20,
                        marginLeft: 20,
                    }}
                    onClick={() => history.push('/')}>
                    Back
                </Button>
            </Box>
        </Box>
    )
}

export default UserDetails
