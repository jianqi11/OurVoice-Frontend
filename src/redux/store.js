import { createStore, applyMiddleware, combineReducers } from 'redux'
//引入为Count组件服务的reducer
import global from './reducers/global'

//引入reduxthunk，用于支持异步action
import thunk from 'redux-thunk'
// 开发调试
import { composeWithDevTools } from 'redux-devtools-extension'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

// 配置持久化的key， 这里默认使用loacl storage 做持久化的
const persistConfig = {
    key: 'blog',
    storage: storage,
}

//汇总redux
const allReducer = combineReducers({
    global,
})
const myPersistReducer = persistReducer(persistConfig, allReducer)

const store = createStore(myPersistReducer, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)

//暴露store
export default store
