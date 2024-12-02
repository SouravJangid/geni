import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DeleteModalStyles from './DeleteModal.module.scss';

const DeleteModal = ({ onClose, onDelete }: { onClose: any; onDelete: any }) => {
  return (
    <Modal open onClose={onClose}>
      <Box className={DeleteModalStyles['modal-box']}>
        <h2 id='modal-description' className={DeleteModalStyles['modal-title']}>
          Are you sure you want to delete this file?
        </h2>
        <Divider />
        <Box className={DeleteModalStyles['button-container']}>
          <Button onClick={onClose} className={DeleteModalStyles['cancel-btn']}>
            Cancel
          </Button>
          <Button onClick={onDelete} className={DeleteModalStyles['delete-btn']}>
            Yes, Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
