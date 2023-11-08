// 改文件生成全局的actions对象

import {
    CHANGELANGUAGE,
    CHANGEEXPAND,
    CHANGETHEME,
    CHANGESIDEMENU,
    SETUSERINFO,
    CHANGETRENDINGPOST,
    CHANGETRENDINGTITLE,
} from '../constant'

export const changeLanguage = data => ({ type: CHANGELANGUAGE, data })
export const changeExpand = data => ({ type: CHANGEEXPAND, data })
export const changeTheme = data => ({ type: CHANGETHEME, data })
export const changeTrendingPost = data => ({ type: CHANGETRENDINGPOST, data })
export const changeTrendingTile = data => ({ type: CHANGETRENDINGTITLE, data })
export const changeSideMenu = data => ({ type: CHANGESIDEMENU, data })
export const setUserInfo = data => ({ type: SETUSERINFO, data })
