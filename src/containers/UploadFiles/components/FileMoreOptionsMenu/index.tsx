import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteModal from '../DeleteModal';
import RenameModal from '../RenameModal';
import { useUploadFile } from 'containers/UploadFiles/hooks/useUploadFile';

enum MoreOptions {
  Rename = 'Rename',
  Delete = 'Delete',
}

const options = [MoreOptions.Rename, MoreOptions.Delete];

function FileMoreOptionsMenu({ fileId }: { fileId: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeModal, setActiveModal] = React.useState<MoreOptions | null>(null);
  const { getFileDeleteRenameApiApi } = useUploadFile();

  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (moreOptionsType: MoreOptions) => {
    handleCloseMenu();
    setActiveModal(moreOptionsType);
  };

  const handleFileDeleteClick = () => {
    getFileDeleteRenameApiApi({ method: 'DELETE', fileId });
    setActiveModal(null);
  };
  const handleFileRenameClick = () => {
    setActiveModal(null);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <IconButton
        id='long-button'
        aria-controls={openMenu ? 'long-menu' : undefined}
        aria-expanded={openMenu ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id='long-menu' anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOpenModal(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      {activeModal === MoreOptions.Delete && (
        <DeleteModal onClose={() => setActiveModal(null)} onDelete={handleFileDeleteClick} />
      )}
      {activeModal === MoreOptions.Rename && (
        <RenameModal onClose={() => setActiveModal(null)} onSave={handleFileRenameClick} />
      )}
    </div>
  );
}

export default React.memo(FileMoreOptionsMenu);
