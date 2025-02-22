import { Stack, StackProps, styled } from '@mui/material'
import Image from '../../atoms/Image'
import Avatar from '../../atoms/Avatar'
import Typography from '../../atoms/Typography'
import { USER_NAME } from '../../../strings/constants'
import USER_AVATAR from '../../../../public/assets/icons/user_avatar.svg'
import BellIcon from '../../../../public/assets/icons/bell.svg'
import ProfileMenu from '../../molecules/ProfileMenu'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { userActions } from '../../../utils/store/user'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: theme.spacing(15),

  // sticking to top
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: theme.palette.structuralColors.white,
  boxShadow: `0px ${theme.spacing(0.25)} ${theme.spacing(
    2
  )} 0px rgba(0, 0, 0, 0.05)`,

  // layout
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingRight: theme.spacing(8),
  flexShrink: 0,
  gap: theme.spacing(3),

  '& .notification': {
    marginRight: theme.spacing(2),
  },

  '& #avatar:hover': {
    cursor: 'pointer',
  },
}))

const Header: React.FC<StackProps> = () => {
  const { isAuthenticated, logout } = useAuth0()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>()
  const openMenu = Boolean(anchorEl)
  const onAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const onClose = () => {
    setAnchorEl(undefined)
  }

  // const navigate = useNavigate()
  const onLogout = () => {
    dispatch(userActions.logoutUser())
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin + '/login' } })
    }
  }

  return (
    <StyledStack data-testid="Header">
      <Image className="notification" src={BellIcon} alt="Notifcation Icon" />
      <Avatar
        id="avatar"
        aria-controls={anchorEl && 'profile-menu'}
        src={USER_AVATAR}
        onClick={onAvatarClick}
      />
      <Typography variant="caption" color="text.mediumEmphasis">
        {USER_NAME}
      </Typography>
      <ProfileMenu
        id="profile-menu"
        aria-labelledby="avatar"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onLogout={onLogout}
      />
    </StyledStack>
  )
}

export default Header
