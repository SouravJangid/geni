import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ProfileStyles from './Profile.module.scss';
import logo from 'assets/images/userimage.png';
import MenuItem from '@mui/material/MenuItem';

const ProfileContent: React.FC = () => {
  const specializations = [
    { value: 'Cancer', label: 'Cancer' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Service Offered', label: 'Service Offered' },
  ];

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
          <p>Professional Information</p>
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-number'
            label='Medical License Number'
            placeholder='1283791293012'
            type='number'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-select-country'
            select
            label='Specialisations/ Specialties'
            defaultValue='Cancer'
          >
            {specializations.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-number'
            label='Years of Expereince'
            placeholder='5'
            type='number'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            className={ProfileStyles['text-field']}
            id='education'
            label='Education'
            type='text'
            variant='outlined'
            placeholder='MBBS at AIIMS Delhi'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <p>Practice Details</p>
          <TextField
            className={ProfileStyles['text-field']}
            id='hospitalName'
            label='Hospital Name'
            type='text'
            variant='outlined'
            placeholder='Clinic/ Hospital Name'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            className={ProfileStyles['text-field']}
            id='address'
            label='Address'
            type='text'
            variant='outlined'
            placeholder='Address'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-number'
            label='Phone Number'
            placeholder='Phone Number'
            type='text'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            className={ProfileStyles['text-field']}
            id='service'
            select
            label='Service Offered'
            defaultValue='Service Offered'
          >
            {specializations.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button variant='contained' className={ProfileStyles['save-btn']}>
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default ProfileContent;
