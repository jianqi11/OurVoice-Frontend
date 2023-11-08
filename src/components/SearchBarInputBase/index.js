// import COLORS from '@/themes/colors'
// import COLORSDARK from '@/themes/colorDark'

import { InputBase, styled } from '@material-ui/core'

const SearchBarInputBase = styled(InputBase)(({ theme }) => {
    return {
        color: 'inherit',
        marginTop: 4,
        borderRadius: 15,
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 6),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            maxWidth: '650px',
        },
        '& .MuiInputBase-input::placeholder': {
            color: theme.palette.primary.main, // 在这里设置placeholder的颜色
        },
        '& input': {
            caretColor: '#999', // 在这里设置光标的颜色
        },
    }
})

export default SearchBarInputBase
