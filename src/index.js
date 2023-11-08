import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import store from './redux/store'
// import { Provider } from 'react-redux'
import './index.css'
import MyProvider from './redux/MyProvider'
import App from './App'
import './mock'
ReactDOM.render(
    <BrowserRouter>
        <MyProvider>
            <App />
        </MyProvider>
    </BrowserRouter>,
    document.getElementById('root')
)

// https://newoldmax.github.io/react-material-ui-form-validator/     material-ui表单验证

// https://gitee.com/joycewu/reactjs_mobx_material-ui/blob/master/src/pages/login.js  login

//  https://segmentfault.com/a/1190000019576048  国际化

// https://www.jianshu.com/p/7d6854586562  store数据持久化

//https://blog.csdn.net/weixin_26722099/article/details/109122479 theme
