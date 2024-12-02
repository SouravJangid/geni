import React, { useState } from 'react';

import { Menu, MenuItem, Button, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import UploadFileLayoutHeaderStyle from './UploadFileLayoutHeader.module.scss';
import { useUploadFile } from 'containers/UploadFiles/hooks/useUploadFile';
import { useUploadFileContext } from 'containers/UploadFiles/state';

const GridHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { changesGridLayoutView } = useUploadFile();

  const {
    state: { isGridLayout = false },
  } = useUploadFileContext();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createHandleMenuClick = (menuItem: string) => () => {
    console.log(`Clicked on ${menuItem}`);
    handleClose();
  };

  const handleViewChange = () => {
    changesGridLayoutView();
  };
  return (
    <>
      <div className={UploadFileLayoutHeaderStyle['header']}>
        <h6 className={UploadFileLayoutHeaderStyle['header-text']}>
          Storage &gt; {isGridLayout ? 'Storage' : 'File Name'}
        </h6>

        <div className={UploadFileLayoutHeaderStyle['header-right']}>
          <Button onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
            File Type
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
            <MenuItem onClick={createHandleMenuClick('Language settings')}>Language settings</MenuItem>
            <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
          </Menu>

          <Button onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
            Sort by
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
            <MenuItem onClick={createHandleMenuClick('Language settings')}>Language settings</MenuItem>
            <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
          </Menu>

          <div className={UploadFileLayoutHeaderStyle['header-container']}>
            <GridViewIcon
              onClick={handleViewChange}
              className={isGridLayout ? UploadFileLayoutHeaderStyle['active'] : ''}
            />
            <FormatListBulletedIcon
              onClick={handleViewChange}
              className={!isGridLayout ? UploadFileLayoutHeaderStyle['active'] : ''}
            />
          </div>
          <div className={UploadFileLayoutHeaderStyle['inputBox_container']}>
            <div className={UploadFileLayoutHeaderStyle['input-box']}>
              <SearchIcon />
              <input
                className={UploadFileLayoutHeaderStyle['inputBox']}
                id='inputBox'
                type='text'
                placeholder='Search For Products'
              />
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default GridHeader;
