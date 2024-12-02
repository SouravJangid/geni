import React, { useState } from 'react';
import { Menu, MenuItem, Avatar, IconButton, Divider, ListItemIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import UserProfileStyle from './UserProfile.module.scss'; // Import the SCSS for custom styling
import UserProfileImg from 'assets/images/userProfileImg.png';
import { useHistory } from 'react-router-dom';
import { Routes, ROUTES_ENUM } from 'constants/routes';
import { useBusinessContext } from 'context/BusinessContext';

enum ProfileMenuItems {
  Profile = 'Profile',
  Settings = 'Settings',
  Logout = 'Log out',
}

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const { setUser } = useBusinessContext() as any;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (itemName: ProfileMenuItems) => {
    if (itemName === ProfileMenuItems.Logout) {
      setUser({});
      history.push(Routes[ROUTES_ENUM.LOGIN]);
    }
  };

  return (
    <div className={UserProfileStyle['profile-menu']}>
      <IconButton onClick={handleClick} className={UserProfileStyle['avatar-button']}>
        <Avatar alt='User Avatar' src={UserProfileImg} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            className: UserProfileStyle['custom-menu'],
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick(ProfileMenuItems.Profile)}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon fontSize='medium' />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(ProfileMenuItems.Settings)}>
          <ListItemIcon>
            <SettingsIcon fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleMenuItemClick(ProfileMenuItems.Logout)}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfile;
