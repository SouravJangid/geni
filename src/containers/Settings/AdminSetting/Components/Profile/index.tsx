import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ProfileStyles from './Profile.module.scss';
import logo from 'assets/images/logo.png';
import MenuItem from '@mui/material/MenuItem';

const ProfileContent: React.FC = () => {
  const countries = [
    {
      value: 'USA',
      label: 'USA',
    },
    {
      value: 'India',
      label: 'India',
    },
    {
      value: 'UK',
      label: 'UK',
    },
    {
      value: 'Bangkok',
      label: 'Bangkok',
    },
  ];

  return (
    <>
      <div className={ProfileStyles['container']}>
        <div className={ProfileStyles['logo']}>
          <img src={logo} className={ProfileStyles['icon']} alt='logo' />
          <Button className={ProfileStyles['text']}>Change Image</Button>
        </div>
        <form className={ProfileStyles['form']}>
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-basic'
            label='Company Name'
            variant='outlined'
          />
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-basic'
            label='Business Type'
            variant='outlined'
          />
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-number'
            label='Phone Number'
            type='number'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <p>Address</p>
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-select-country'
            select
            label='Country'
            defaultValue='India'
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-select-state'
            select
            label='State'
            defaultValue='India'
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField className={ProfileStyles['text-field']} id='outlined-basic' label='Address' variant='outlined' />
          <TextField
            className={ProfileStyles['text-field']}
            id='outlined-number'
            label='Zip Code/Postal Code'
            type='number'
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
      </div>
    </>
  );
};

export default ProfileContent;
