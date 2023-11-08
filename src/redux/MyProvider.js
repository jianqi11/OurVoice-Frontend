import React, { useReducer } from 'react'
import MyContext, { globalData } from './MyContext'
import reducer from './reducers'
export default function MyProvider(props) {
    const [state, dispatch] = useReducer(reducer, {
        ...globalData,
    })
    return <MyContext.Provider value={{ state, dispatch }}>{props.children}</MyContext.Provider>
}
