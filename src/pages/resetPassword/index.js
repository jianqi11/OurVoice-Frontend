import React, { useState } from 'react'
import { Button, CssBaseline, FormLabel, Link, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/material'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import ShowPasswordButton from './ShowPasswordButton'
import { AuthPageWrapper } from '../Login/AuthPageWrapper'
import { FormInputWrapper } from '../../components/FormInputWrapper'
import { useFormik } from 'formik'
import { resetPassword, sendVerificationEmail } from '../../services/auth'
import { message } from 'antd'

const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [beforeSendCode, setBeforeSendCode] = useState(true)

    const history = useHistory()

    const formik1 = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: async values => {
            const res = await sendVerificationEmail({ ...values, type: 2 })
            if (res?.data?.code === 200) {
                setBeforeSendCode(false)
            } else {
                message.error(res?.data?.msg || 'System busy')
            }
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().trim().required('Email is required').email('Email is invalid'),
        }),
    })
    const formik = useFormik({
        initialValues: {
            verificationCode: '',
            password: '',
            confirmPassword: '',
        },
        // resetPassword
        onSubmit: async values => {
            const res = await resetPassword({
                ...values,
                email: formik1.values.email,
            })
            if (res?.data?.code === 200) {
                message.success('Modification Failure')
                history.push('/login')
            } else {
                message.error(res?.data?.msg || 'Modification Failure')
                history.push('/resetPassword')
            }
        },
        validationSchema: Yup.object().shape({
            verificationCode: Yup.string().trim().required('Code is required'),
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
                <FormInputWrapper component="form" style={{ width: '90%' }}>
                    <Typography variant="h4">Forgot password</Typography>
                    <Typography variant="body1" marginTop={2} marginBottom={10}>
                        Please enter the email you used to create the account, and we’ll send you a
                        reset code.
                    </Typography>

                    {beforeSendCode && (
                        <FormInputWrapper marginTop={2}>
                            <FormLabel>Email*</FormLabel>
                            <TextField
                                sx={{ width: { sm: '70%', md: '100%', lg: '70%' } }}
                                placeholder="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                size="small"
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                                error={formik1.touched.email && formik1.errors.email}
                                helperText={formik1.touched.email && formik1.errors.email}
                            />
                        </FormInputWrapper>
                    )}
                    {!beforeSendCode && (
                        <>
                            <FormInputWrapper marginTop={2}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    sx={{ width: { sm: '20%', md: '100%', lg: '20%' } }}>
                                    <FormLabel>Code*</FormLabel>
                                </Stack>
                                <TextField
                                    sx={{ width: { sm: '70%', md: '100%', lg: '70%' } }}
                                    placeholder="Code"
                                    {...commonProps('verificationCode')}
                                />
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
                                                    setConfirmPasswordVisible(
                                                        !confirmPasswordVisible
                                                    )
                                                }}
                                                visibility={confirmPasswordVisible}
                                            />
                                        ),
                                    }}
                                />
                            </FormInputWrapper>
                        </>
                    )}
                    <Stack direction="row" justifyContent="end" marginTop={4}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                if (beforeSendCode) {
                                    formik1.handleSubmit()
                                } else {
                                    formik.handleSubmit()
                                }
                            }}
                            style={{
                                backgroundColor: '#6666F6',
                                color: '#FFF',
                                width: 300,
                                height: 50,
                                borderRadius: 30,
                            }}>
                            {beforeSendCode ? 'Reset Password' : 'Update Password'}
                        </Button>
                    </Stack>

                    <Stack direction="row" marginTop={6} justifyContent="flex-end">
                        <Typography marginRight={1}>Back to </Typography>
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
            </AuthPageWrapper>
        </>
    )
}

export default SignUp
