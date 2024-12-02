import React from 'react';
import { TextField } from '@mui/material';
import OtherStyle from './Other.module.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const OtherContent: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={OtherStyle['container']}>
        <div className={OtherStyle['field']}>
          <TextField label='Email' placeholder='abc@gmail.com' className={OtherStyle['input-field']} />
          <TextField
            label='Password'
            type='password'
            placeholder='password'
            autoComplete='current-password'
            className={OtherStyle['input-field']}
          />
          <Button variant='contained' onClick={handleOpen}>
            Change Password
          </Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box className={OtherStyle['box']}>
            <h1 className={OtherStyle['text']}>Change Password</h1>
            <div className={OtherStyle['field']}>
              <TextField
                id='outlined-password-input'
                label='Current Password'
                type='password'
                autoComplete='current-password'
              />
              <TextField
                id='outlined-password-input'
                label='New Password'
                type='password'
                autoComplete='current-password'
              />
              <TextField
                id='outlined-password-input'
                label='Confirm Password'
                type='password'
                autoComplete='current-password'
              />
              <Divider />
              <div className={OtherStyle['buttonContainer']}>
                <Button variant='contained' className={OtherStyle['cancel-btn']} onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant='contained' className={OtherStyle['save-btn']}>
                  Save
                </Button>
              </div>
              <Divider />
              <h6 className={OtherStyle['word']}>
                If you forgot your password, please rest via this link <Link href='#'>Reset Password</Link>
              </h6>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default OtherContent;
