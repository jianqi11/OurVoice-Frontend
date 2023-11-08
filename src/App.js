import React, { useContext, useEffect } from 'react'
import RouterView from './router/indexView'
import { addLocaleData, IntlProvider } from 'react-intl'
//引入connect用于连接UI组件与redux2
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import en_US from './locale/en_US'
import zh_CN from './locale/zh_CN'
import { ThemeProvider } from '@material-ui/core'
import createTheme from './theme'
import MyContext from './redux/MyContext'
addLocaleData([...en, ...zh]) // 引入多语言环境的数据  'dark'
import { useLocation, useHistory } from 'react-router-dom'
import { Box } from '@mui/material'

const App = () => {
    const location = useLocation()
    const history = useHistory()
    let messages = {}
    messages['en'] = en_US
    messages['zh'] = zh_CN
    const {
        state: { global },
    } = useContext(MyContext)
    const { lang, themeType } = global

    const theme = createTheme(themeType)

    useEffect(() => {
        const auth = localStorage.getItem('userInfo')
        const currentPath = location.pathname
        const allowedPaths = ['/login', '/signUp', '/resetPassword', '/googlelogin']
        if (!auth && !allowedPaths.includes(currentPath)) {
            history.push('/login')
        }
        if (currentPath === '/' && auth) history.push('/home')
    }, [history, location.pathname])

    return (
        <Box
            style={{
                backgroundColor: theme.customColors.bodyBgColor,
            }}>
            <IntlProvider locale={lang || 'en'} messages={messages[lang || 'en']}>
                <ThemeProvider theme={theme}>
                    <RouterView />
                </ThemeProvider>
            </IntlProvider>
        </Box>
    )
}

export default App
