import React, { useState } from 'react'
import { Box, Button, CssBaseline, FormLabel, Link, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/material'
import * as Yup from 'yup'
import ShowPasswordButton from './ShowPasswordButton'
import { AuthPageWrapper } from '../Login/AuthPageWrapper'
import { FormInputWrapper } from '../../components/FormInputWrapper'
import { useFormik } from 'formik'
import { register, sendVerificationEmail } from '../../services/auth'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [registerData, setRegisterData] = useState({})
    const [beforeSendCode, setBeforeSendCode] = useState(false)
    const [codeBlur, setCodeBlur] = useState(false)
    const [codeError, setCodeError] = useState(false)
    const history = useHistory()

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const inviterUserId = queryParams.get('inviterUserId') // 获取名为'paramName'的query参数的值

    // Australia

    const handeleRegister = async () => {
        const res = await register({ ...registerData, inviterUserId })
        if (res?.data?.code === 200) {
            message.success('Successful registration')
            history.push('/login')
        } else {
            message.error(res?.data?.msg || 'Registration Failure')
            history.push('/signUp')
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            postalCode: '',
            suburb: '',
            country: 'Australia',
            password: '',
            confirmPassword: '',
        },
        onSubmit: async values => {
            setRegisterData(values)
            const res = await sendVerificationEmail({ email: values.email })
            if (res?.data?.code === 200) {
                setBeforeSendCode(true)
            } else {
                message.error(res?.data?.msg || 'System busy')
            }
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().trim().required('First Name is required'),
            lastName: Yup.string().trim().required('Last Name is required'),
            email: Yup.string().trim().required('Email is required').email('Email is invalid'),
            postalCode: Yup.string()
                .trim()
                .required('Postal Code is required')
                .matches(/^[0-9]{4}$/, 'Must be exactly 4 digits'),
            suburb: Yup.string().trim().required('Suburb is required'),
            country: Yup.string().trim().required('Country is required'),
            password: Yup.string()
                .trim()
                .required('Password is required')
                .min(8, 'Password must have at least 8 characters')
                .matches(/^(?=.*[a-z])/, 'Password must have at least one lowercase')
                .matches(/^(?=.*[A-Z])/, 'Password must have at least one uppercase')
                .matches(/^(?=.*[0-9])/, 'Password must have at least one number')
                .matches(
                    /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/,
                    'Password must have at least one special character'
                ),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .trim()
                .min(8, 'Password must have at least 8 characters')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
    })

    const commonProps = key => {
        const { errors, values, touched, handleChange, handleBlur } = formik
        return {
            fullWidth: true,
            size: 'small',
            name: key,
            onBlur: handleBlur,
            onChange: handleChange,
            value: values[key],
            error: touched[key] && errors[key],
            helperText: touched[key] && errors[key],
        }
    }
    return (
        <>
            <AuthPageWrapper>
                <CssBaseline />
                {!beforeSendCode && (
                    <FormInputWrapper
                        component="form"
                        onSubmit={formik.handleSubmit}
                        style={{ width: '90%' }}>
                        <Typography variant="h3">Sign Up</Typography>
                        <Typography variant="body1" marginTop={2}>
                            Get access to exclusive features by creating an account.
                        </Typography>

                        <FormInputWrapper marginTop={5}>
                            <FormLabel>Name*</FormLabel>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ width: { sm: '70%', md: '100%', lg: '70%' }, gap: 2 }}>
                                <TextField placeholder="First Name" {...commonProps('firstName')} />
                                <TextField placeholder="Last Name" {...commonProps('lastName')} />
                            </Stack>
                        </FormInputWrapper>

                        <FormInputWrapper marginTop={2}>
                            <FormLabel>Email*</FormLabel>
                            <TextField
                                sx={{ width: { sm: '70%', md: '100%', lg: '70%' } }}
                                placeholder="Email"
                                {...commonProps('email')}
                            />
                        </FormInputWrapper>
                        <FormInputWrapper marginTop={2}>
                            <FormLabel
                                sx={{
                                    width: { sm: '20%', md: '100%', lg: '20%' },
                                }}>
                                Registered Address *
                            </FormLabel>
                            <TextField
                                fullWidth
                                size="small"
                                sx={{ width: { sm: '70%', md: '100%', lg: '70%' } }}
                                defaultValue="Australia"
                                value={formik.values.country}></TextField>
                        </FormInputWrapper>
                        <FormInputWrapper marginTop={2}>
                            <Box />
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ width: { sm: '70%', md: '100%', lg: '70%' } }}
                                gap={2}>
                                <TextField placeholder="Suburb" {...commonProps('suburb')} />
                                <TextField
                                    placeholder="Postal Code"
                                    {...commonProps('postalCode')}
                                />
                            </Stack>
                        </FormInputWrapper>

                        <FormInputWrapper marginTop={2}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                sx={{ width: { sm: '20%', md: '100%', lg: '20%' } }}>
                                <FormLabel>Password*</FormLabel>
                            </Stack>
                            <TextField
                                sx={{ width: { sm: '70%', md: '100%', lg: '70%' } }}
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Password"
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
                                {...commonProps('password')}
                            />
                        </FormInputWrapper>

                        <FormInputWrapper marginTop={2}>
                            <FormLabel
                                sx={{
                                    width: { sm: '20%', md: '100%', lg: '20%' },
                                }}>
                                Confirm Password*
                            </FormLabel>
                            <TextField
                                sx={{ width: { sm: '70%', md: '100%', lg: '70%' } }}
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={formik.values.confirmPassword}
                                {...commonProps('confirmPassword')}
                                InputProps={{
                                    endAdornment: (
                                        <ShowPasswordButton
                                            onClick={() => {
                                                setConfirmPasswordVisible(!confirmPasswordVisible)
                                            }}
                                            visibility={confirmPasswordVisible}
                                        />
                                    ),
                                }}
                            />
                        </FormInputWrapper>

                        <Stack direction="row" justifyContent="end" marginTop={4}>
                            <Button
                                variant="contained"
                                size="large"
                                type="submit"
                                style={{
                                    backgroundColor: '#6666F6',
                                    color: '#FFF',
                                    width: 150,
                                    height: 50,
                                    borderRadius: 30,
                                }}>
                                Sign Up
                            </Button>
                        </Stack>

                        <Stack direction="row" marginTop={6} justifyContent="flex-end">
                            <Typography marginRight={1}>Already have an account?</Typography>
                            <Link
                                href="/login"
                                sx={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                }}>
                                Sign In
                            </Link>
                        </Stack>
                    </FormInputWrapper>
                )}
                {beforeSendCode && (
                    <>
                        <FormInputWrapper marginTop={20} style={{ width: '90%' }}>
                            <FormLabel style={{ display: 'block', width: 100 }}>Code*</FormLabel>
                            <TextField
                                // sx={{ width: { sm: '70%', md: '100%', lg: '70%' } }}

                                placeholder="Code"
                                variant="outlined"
                                fullWidth
                                size="small"
                                onChange={e => {
                                    setRegisterData({
                                        ...registerData,
                                        verificationCode: e.target.value,
                                    })
                                    const pattern = /^\d{6}$/
                                    const isMatch = pattern.test(e.target.value)
                                    if (isMatch) {
                                        setCodeError(false)
                                    } else {
                                        setCodeError(true)
                                    }
                                }}
                                onBlur={() => setCodeBlur(true)}
                                error={codeBlur && codeError}
                                helperText={
                                    codeBlur && codeError && 'Please fill in the verification code'
                                }
                            />
                        </FormInputWrapper>
                        <Stack
                            direction="row"
                            justifyContent="end"
                            marginTop={4}
                            style={{ width: '90%' }}>
                            <Button
                                onClick={() => {
                                    if (!codeBlur) {
                                        setCodeBlur(true)
                                        setCodeError(true)
                                        return
                                    }
                                    handeleRegister()
                                }}
                                variant="contained"
                                size="large"
                                type="submit"
                                style={{
                                    backgroundColor: '#6666F6',
                                    color: '#FFF',
                                    width: 150,
                                    height: 50,
                                    borderRadius: 30,
                                }}>
                                Sign Up
                            </Button>
                        </Stack>

                        <Stack
                            direction="row"
                            marginTop={6}
                            justifyContent="flex-end"
                            style={{ width: '90%' }}>
                            <Link
                                onClick={() => setBeforeSendCode(false)}
                                sx={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                }}>
                                Back
                            </Link>
                        </Stack>
                    </>
                )}
            </AuthPageWrapper>
        </>
    )
}

export default SignUp
