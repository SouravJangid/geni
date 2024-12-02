import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HealthStyles from './Health.module.scss';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const HealthContent: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={HealthStyles['container']}>
        <form className={HealthStyles['form']}>
          <h4>Health Details</h4>
          <TextField
            className={HealthStyles['text-field']}
            id='medical history'
            label='Medical History'
            type='text'
            variant='outlined'
            placeholder='lorem ispum'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            className={HealthStyles['text-field']}
            label='Current Medications'
            type='text'
            InputLabelProps={{ shrink: true }}
            defaultValue='lorem ispum lorem '
          />
          <TextField
            className={HealthStyles['text-field']}
            id='allergies'
            label='Allergies'
            type='text'
            variant='outlined'
            placeholder='lorem ispum'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            className={HealthStyles['text-field']}
            id='blood type'
            label='Blood Type'
            type='text'
            variant='outlined'
            placeholder='A+'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </form>
        <Button variant='contained' onClick={handleOpen} className={HealthStyles['edit-btn']}>
          Edit
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={HealthStyles['box']}>
          <h1 className={HealthStyles['text']}>Edit</h1>
          <div className={HealthStyles['field']}>
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
            <div className={HealthStyles['buttonContainer']}>
              <Button variant='contained' className={HealthStyles['cancel-btn']} onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='contained' className={HealthStyles['save-btn']}>
                Save
              </Button>
            </div>
            <Divider />
            <h6 className={HealthStyles['word']}>
              If you forgot your password, please rest via this link <Link href='#'>Reset Password</Link>
            </h6>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default HealthContent;
