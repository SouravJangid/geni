import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ProfileStyles from './Profile.module.scss';
import logo from 'assets/images/userimage.png';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const ProfileContent: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={ProfileStyles['container']}>
        <div className={ProfileStyles['logo']}>
          <img src={logo} className={ProfileStyles['icon']} alt='logo' />
          <Button className={ProfileStyles['text']}>Change Image</Button>
        </div>
        <form className={ProfileStyles['form']}>
          <h4>Personal Details</h4>
          <TextField
            className={ProfileStyles['text-field']}
            id='fullname'
            label='Full Name'
            type='text'
            variant='outlined'
            placeholder='Dr Kamal Raj Yadav'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            className={ProfileStyles['text-field']}
            label='Date of Birth'
            type='date'
            InputLabelProps={{ shrink: true }}
            defaultValue='2023-10-23'
          />
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-number'
            label='Phone Number'
            placeholder='+1 787 877 7878'
            type='number'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            className={ProfileStyles['text-field']}
            id='gender'
            label='Gender'
            type='text'
            variant='outlined'
            placeholder='Male'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            className={ProfileStyles['text-field']}
            id='email'
            label='Email'
            type='text'
            variant='outlined'
            placeholder='Kamrajyadav@gmail.com'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <Button variant='contained' className={ProfileStyles['save-btn']}>
            Save
          </Button>
        </form>
        <Button variant='contained' onClick={handleOpen} className={ProfileStyles['edit-btn']}>
          Edit
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={ProfileStyles['box']}>
          <h1 className={ProfileStyles['text']}>Edit</h1>
          <div className={ProfileStyles['field']}>
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
            <div className={ProfileStyles['buttonContainer']}>
              <Button variant='contained' className={ProfileStyles['cancel-btn']} onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='contained' className={ProfileStyles['save-btn']}>
                Save
              </Button>
            </div>
            <Divider />
            <h6 className={ProfileStyles['word']}>
              If you forgot your password, please rest via this link <Link href='#'>Reset Password</Link>
            </h6>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileContent;
