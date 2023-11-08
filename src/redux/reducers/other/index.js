/* 
	1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import { CHANGELANGUAGE, CHANGEEXPAND, CHANGETHEME } from '../../constant'
export default function globalReaducer(preState, action) {
    //从action中获取type，data
    const { type, data } = action

    // 根据type进行对data数据的加工
    switch (type) {
        case CHANGELANGUAGE:
            return Object.assign({}, preState, data)
        case CHANGEEXPAND:
            return Object.assign({}, preState, data)
        case CHANGETHEME:
            return Object.assign({}, preState, data)
        default:
            return preState
    }
}
