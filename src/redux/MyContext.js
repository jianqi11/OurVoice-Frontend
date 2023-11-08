import { createContext } from 'react'

const MyContext = createContext(null)

export default MyContext

const activeCommunity = localStorage.getItem('selectedCommunity') || 'All'
const activeTrendingPost = localStorage.getItem('activeTrendingPost') || ''
const activeTrendingTitle = localStorage.getItem('activeTrendingTitle') || ''
const themeType = localStorage.getItem('themeType') || 'light'
const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}

export const globalData = {
    global: {
        lang: 'en',
        expand: true,
        themeType,
        activeCommunity,
        activeTrendingPost,
        activeTrendingTitle,
        userInfo,
        ...{ activeCommunity },
    },
}
