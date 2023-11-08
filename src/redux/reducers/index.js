import global from './global'

const combineReducers = slices => (prevState, action) =>
    Object.keys(slices).reduce(
        (nextState, nextProp) => ({
            ...nextState,
            [nextProp]: slices[nextProp](prevState[nextProp], action),
        }),
        prevState
    )

const reducer = combineReducers({
    global,
})
export default reducer
