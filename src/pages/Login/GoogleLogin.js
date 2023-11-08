import React, { useContext, useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import { CircularProgress, makeStyles } from '@material-ui/core'
import { oAuthLogin } from '../../services/auth'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import MyContext from '../../redux/MyContext'
import { setUserInfo } from '../../redux/actions/global'

const useStyles = makeStyles(theme => ({
    backdrop: {
        background: '#fff',
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

function GoogleLogin() {
    const { dispatch } = useContext(MyContext)
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const code = queryParams.get('code') // Get the value of the query parameter named 'paramName'

    useEffect(() => {
        if (code) {
            login()
        }
    }, [])

    const login = async () => {
        setLoading(true)
        const res = await oAuthLogin({ code })
        if (res?.data?.code === 200) {
            console.log('res?.data: ', res?.data)
            const userInfo = { ...res?.data?.data }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            dispatch(setUserInfo(userInfo))
            history.push('/home')
            window.location.reload()
        } else {
            message.error(res?.data?.msg || 'Login Failure')
        }
        setLoading(false)
    }

    return (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress />
        </Backdrop>
    )
}

export default GoogleLogin
