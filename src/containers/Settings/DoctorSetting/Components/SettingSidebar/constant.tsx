import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

interface SidebarProps {
  selectedSection: string;
  onSelect: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedSection, onSelect }) => {
  return (
    <List component='nav'>
      <ListItem button selected={selectedSection === 'profile'} onClick={() => onSelect('profile')}>
        <PersonOutlineOutlinedIcon sx={{ marginRight: 2 }} />
        <ListItemText primary='Profile' />{' '}
      </ListItem>
      <ListItem button selected={selectedSection === 'account'} onClick={() => onSelect('account')}>
        <SettingsOutlinedIcon sx={{ marginRight: 2 }} />
        <ListItemText primary='Account Setting' />
      </ListItem>
    </List>
  );
};

export default Sidebar;
