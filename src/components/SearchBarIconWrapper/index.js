import { styled } from '@material-ui/core'

const SearchIconWrapper = styled('div')(({ theme }) => {
    return {
        padding: 4,
        position: 'absolute',
        top: 0,
        bottom: 0,
        marginLeft: 12,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        color: theme.customColors.searchIconClolor,
    }
})

export { SearchIconWrapper }
