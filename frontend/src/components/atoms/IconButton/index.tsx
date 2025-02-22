import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import theme from '../../../theme'

export interface IconProps {
  onClick?: () => void
  icon: string
  width?: string
  height?: string
  alt?: string
  borderRadius?: string
  borderColor?: string
  backgroundColor?: string
}

const StyledIconButton = styled(IconButton)<{
  borderRadius?: string
  borderColor?: string
  backgroundColor?: string
}>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ?? 'transparent'};

  padding: ${theme.spacing(3.5)};
  border: 1px solid
    ${({ borderColor }) => borderColor ?? theme.palette.Greys.stroke};
  border-radius: ${({ borderRadius }) => borderRadius ?? theme.spacing(1)};
`

const Icon = (props: IconProps) => {
  return (
    <StyledIconButton
      onClick={props.onClick}
      {...props}
      data-testid="iconButton"
    >
      <img
        src={props.icon}
        alt={props.alt}
        width={props.width}
        height={props.height}
      />
    </StyledIconButton>
  )
}

export default Icon
