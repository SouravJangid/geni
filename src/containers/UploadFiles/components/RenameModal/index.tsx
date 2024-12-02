import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import RenameModalStyles from './RenameModal.module.scss';

const RenameModal = ({ onClose, onSave }: { onClose: any; onSave: any }) => {
  return (
    <Modal open onClose={onClose}>
      <Box className={RenameModalStyles['modal-box']}>
        <h2 id='modal-description' className={RenameModalStyles['modal-title']}>
          Rename
        </h2>
        <Divider />
        <Box mt={2}>
          <input type='text' className={RenameModalStyles['rename-input']} />
        </Box>
        <Box className={RenameModalStyles['button-container']}>
          <Button onClick={onClose} className={RenameModalStyles['cancel-btn']}>
            Cancel
          </Button>
          <Button variant='contained' onClick={onSave} className={RenameModalStyles['save-btn']}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RenameModal;
