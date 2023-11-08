import {
    Box,
    Button,
    CssBaseline,
    Dialog,
    DialogContent,
    FormLabel,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Tooltip,
    Typography,
} from '@material-ui/core'
import * as Yup from 'yup'
import { Stack } from '@mui/material'
import { InfoRounded, Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthPageWrapper } from './AuthPageWrapper'
import { useFormik } from 'formik'
import { FormInputWrapper } from '../../components/FormInputWrapper'
import { login } from '../../services/auth'
import { message } from 'antd'
import MyContext from '../../redux/MyContext'
import { setUserInfo } from '../../redux/actions/global'
import { Vertify } from '@alex_xu/react-slider-vertify'
import { googleUrl } from '../../utils/constant'

const PasswordStrengthTooltip = () => {
    return (
        <Box>
            <ul>
                <li>Minimum of 8 characters</li>
                <li>Contain an uppercase</li>
                <li>Contain a lowercase</li>
                <li>Contain a number (0-9)</li>
                <li>Contain a special character (!@#$%^&*)</li>
            </ul>
        </Box>
    )
}

const PasswordTooltip = ({ isError }) => {
    return (
        <Tooltip
            title={<PasswordStrengthTooltip />}
            sx={{
                marginBottom: {
                    lg: isError ? '24px' : 0,
                },
            }}>
            <IconButton>
                <InfoRounded fontSize="small" sx={{ color: '#231F20', fontSize: '1rem' }} />
            </IconButton>
        </Tooltip>
    )
}

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

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    // State for tracking loading request
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { dispatch } = useContext(MyContext)
    const history = useHistory()

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        onSubmit: async values => {
            setLoading(true)
            try {
                const res = await login(values)
                if (res?.data?.code === 200) {
                    const userInfo = { ...res?.data?.data, email: values.email }
                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    dispatch(setUserInfo(userInfo))
                    history.push('/')
                    window.location.reload()
                } else {
                    message.error(res?.data?.msg || 'Login Failure')
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Cannot be empty'),
            password: Yup.string().required('Cannot be empty'),
        }),
    })
    return (
        <AuthPageWrapper>
            <CssBaseline />
            <FormInputWrapper onSubmit={formik.handleSubmit} component="form" target="none">
                <Typography variant="h3" fontWeight="bold">
                    Sign In
                </Typography>
                <Typography variant="body1" marginTop={3}>
                    Welcome to itsourvoice.com, please enter your login credentials below to start
                    using the app.
                </Typography>
                <FormInputWrapper marginTop={6}>
                    <FormLabel style={{ display: 'block', width: 200 }}>Email*</FormLabel>
                    <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        size="small"
                        placeholder="Your Email "
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </FormInputWrapper>
                <FormInputWrapper marginTop={4}>
                    <div style={{ display: 'block', width: 200 }}>
                        <FormLabel>Password*</FormLabel>
                        <PasswordTooltip />
                    </div>

                    <TextField
                        size="small"
                        type={passwordVisible ? 'text' : 'password'}
                        variant="outlined"
                        placeholder="Your Password"
                        fullWidth
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <ShowPasswordButton
                                    onClick={() => {
                                        setPasswordVisible(!passwordVisible)
                                    }}
                                    visibility={passwordVisible}
                                />
                            ),
                        }}
                        autoComplete="new-password"
                    />
                </FormInputWrapper>
                <Typography marginTop={2} align="right" fontWeight="bold" variant="body1">
                    <Link
                        href="/resetPassword"
                        sx={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                        Forgot Password?
                    </Link>
                </Typography>
                <Stack direction="row" justifyContent="end" marginTop={8}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (formik.isValid) {
                                setOpen(true)
                                return
                            }
                            formik.handleSubmit()
                        }}
                        style={{
                            backgroundColor: '#6666F6',
                            color: '#FFF',
                            width: 150,
                            height: 50,
                            borderRadius: 30,
                        }}
                        disabled={loading}>
                        Sign In
                    </Button>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                    <IconButton
                        onClick={() => {
                            window.location.href = googleUrl
                        }}>
                        <svg
                            t="1697972055255"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="4055"
                            width="18"
                            height="18">
                            <path
                                d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512"
                                fill="#FBBC05"
                                p-id="4056"></path>
                            <path
                                d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88"
                                fill="#EA4335"
                                p-id="4057"></path>
                            <path
                                d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776"
                                fill="#34A853"
                                p-id="4058"></path>
                            <path
                                d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667"
                                fill="#4285F4"
                                p-id="4059"></path>
                        </svg>
                    </IconButton>
                    <Typography
                        onClick={() => {
                            window.location.href = googleUrl
                        }}
                        variant="inherit"
                        style={{ fontSize: 14, cursor: 'pointer' }}>
                        &nbsp;Log In with Google
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                    <Typography marginRight={1}>Don&apos;t have an account?</Typography>
                    <Link
                        href="/signUp"
                        sx={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                        Sign Up
                    </Link>
                </Stack>
            </FormInputWrapper>

            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogContent dividers>
                    <Vertify
                        width={320}
                        height={160}
                        visible={true}
                        onSuccess={() => {
                            formik.handleSubmit()
                        }} //成功触发事件
                        onFail={() => {
                            console.log('onFail: ')
                        }} // 失败触发事件
                        // onRefresh={() => alert('refresh')}
                    />
                </DialogContent>
            </Dialog>
        </AuthPageWrapper>
    )
}

export default Login
