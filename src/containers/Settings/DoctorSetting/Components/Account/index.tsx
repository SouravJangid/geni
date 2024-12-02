import React from 'react';
import { TextField } from '@mui/material';
import AccountStyle from './Account.module.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const AccountContent: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={AccountStyle['container']}>
        <div className={AccountStyle['field']}>
          <TextField label='Email' placeholder='abc@gmail.com' className={AccountStyle['input-field']} />
          <TextField
            label='Password'
            type='password'
            placeholder='password'
            autoComplete='current-password'
            className={AccountStyle['input-field']}
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
          <Box className={AccountStyle['box']}>
            <h1 className={AccountStyle['text']}>Change Password</h1>
            <div className={AccountStyle['field']}>
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
              <div className={AccountStyle['buttonContainer']}>
                <Button variant='contained' className={AccountStyle['cancel-btn']} onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant='contained' className={AccountStyle['save-btn']}>
                  Save
                </Button>
              </div>
              <Divider />
              <h6 className={AccountStyle['word']}>
                If you forgot your password, please rest via this link <Link href='#'>Reset Password</Link>
              </h6>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default AccountContent;
