import {
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Switch,
    Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import NavBar from '../Index/NavBar'
import { Paper, Stack } from '@mui/material'
import { Button, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { getUserDetails, updateDetail } from '../../services/auth'

export default function Index() {
    const history = useHistory()
    const [userData, setUserData] = useState({
        emailSubscriptionNotification: false,
        emailNotificationMode: 1,
    })
    const handleChange = data => {
        setUserData({ ...userData, ...data, postalCode: 'Syd' })
    }
    const fetchUserBasic = async () => {
        const res = await getUserDetails()
        if (res?.data?.code === 200) {
            setUserData(res?.data?.data || {})
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }

    const handleUpdateDetail = async () => {
        const res = await updateDetail(userData)
        if (res?.data?.code === 200) {
            message.success('Successful update')
            history.push('/')
        } else {
            message.error(res?.data?.msg || 'System busy')
        }
    }

    useEffect(() => {
        fetchUserBasic()
    }, [])

    return (
        <Box height="100vh">
            <NavBar />
            <Stack alignItems="center" mt={10}>
                <Stack width="50vw" alignItems="center">
                    <Paper style={{ padding: 100, paddingTop: 40 }}>
                        <Typography variant="h5">Notification Management</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="gender"
                                value={Number(userData.emailNotificationMode)}
                                onChange={(e, value) => {
                                    handleChange({ emailNotificationMode: Number(value) })
                                }}>
                                <FormControlLabel
                                    value={1}
                                    control={<Radio />}
                                    label="Daily Notification"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value={2}
                                    control={<Radio />}
                                    label="Weekly Notification"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value={3}
                                    control={<Radio />}
                                    label="Monthly Notification"
                                    labelPlacement="start"
                                />
                            </RadioGroup>
                        </FormControl>

                        <Divider style={{ margin: 20 }} />
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(e, value) => {
                                        handleChange({ emailSubscriptionNotification: value })
                                    }}
                                />
                            }
                            checked={userData.emailSubscriptionNotification}
                            value={userData.emailSubscriptionNotification}
                            label="Whether to disable"
                            labelPlacement="start"
                        />
                        <Divider style={{ margin: 20 }} />
                        <Box textAlign="center">
                            <Button
                                onClick={handleUpdateDetail}
                                style={{
                                    marginRight: 20,
                                    backgroundColor: '#7552FF',
                                    color: '#FFF',
                                    width: 100,
                                    height: 50,
                                    borderRadius: 15,
                                }}>
                                Save
                            </Button>
                            <Button
                                style={{ width: 100, height: 50, borderRadius: 15 }}
                                onClick={() => {
                                    history.go(-1)
                                }}>
                                Back
                            </Button>
                        </Box>
                    </Paper>
                </Stack>
            </Stack>
        </Box>
    )
}
