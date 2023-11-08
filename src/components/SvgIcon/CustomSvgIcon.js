import { SvgIcon } from '@material-ui/core'

function CustomSvgIcon(props) {
    return (
        <SvgIcon data-testid="custom-svg-icon" {...props}>
            <path d={props.d} fill={props.fill} />
        </SvgIcon>
    )
}

export { CustomSvgIcon }
