import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './AccountForm.module.scss';
import MainLogo from 'assets/images/mainLogo.png';
import Divider from '@mui/material/Divider';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

const AccountForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    bloodGroup: '',
    healthIssues: '',
    holdsInsurance: false,
    insuranceProvider: '',
    policyNumber: '',
    coverageDetails: '',
    password: '',
    confirmPassword: '',
    userType: 'patient',
    tenant: 'apollo',
    role: 'patient',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    if (step === 4) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      console.log('Form Data:', formData); // Log the data to the console
    }
    setError('');
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  return (
    <>
      <div className={styles.signupWrapper}>
        <div className={styles.signupContainer}>
          <img src={MainLogo} className={styles.logoImg} alt='logo' />
        </div>
        <div className={styles.signContainer}>
          <Typography variant='h6' className={styles.title}>
            Creating Account
          </Typography>
          <Typography variant='subtitle1' className={styles.subtitle}>
            {step === 1
              ? 'Your Details'
              : step === 2
                ? 'Contact Details'
                : step === 3
                  ? 'Health Details'
                  : 'Setup Password'}
          </Typography>
          {/* Progress Indicator */}
          <Box className={styles.progressBarContainer}>
            <Box className={styles.progressBarFill} style={{ width: `${step * 25}%` }} />
          </Box>
          {/* Form */}
          <Box className={styles.formWrapper}>
            {step === 1 && (
              <>
                <div className={styles.imageUpload}>
                  {image ? (
                    <img src={image} alt='Profile Preview' />
                  ) : (
                    <div className={styles.divIcon}>
                      <AccountBoxOutlinedIcon className={styles.profileIcon} />
                    </div>
                  )}
                  <label htmlFor='image-input' className={styles.imageText}>
                    Choose image
                  </label>
                  <input
                    id='image-input'
                    type='file'
                    accept='image/*'
                    className={styles.input}
                    onChange={handleImageUpload}
                  />
                </div>
                <TextField
                  label='Your name'
                  fullWidth
                  variant='outlined'
                  className={styles.inputContainer}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                <TextField
                  label='Date of Birth'
                  type='date'
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  className={styles.inputContainer}
                  value={formData.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                />
                <TextField
                  select
                  label='Gender'
                  fullWidth
                  SelectProps={{ native: true }}
                  className={styles.inputContainer}
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <option value=''></option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </TextField>
                <Divider className={styles.devider} />
                <Button variant='contained' color='primary' className={styles.button} onClick={handleNext}>
                  Next
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <TextField
                  label='Phone'
                  fullWidth
                  variant='outlined'
                  className={styles.inputContainer}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
                <TextField
                  label='Email'
                  type='email'
                  fullWidth
                  variant='outlined'
                  className={styles.inputContainer}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                <TextField
                  label='Address'
                  fullWidth
                  variant='outlined'
                  className={styles.inputContainer}
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
                <Divider className={styles.devider} />
                <Box className={styles.navButtons}>
                  <Button variant='text' className={styles.back} onClick={handleBack}>
                    ← Back
                  </Button>
                  <Button variant='contained' color='primary' className={styles.button} onClick={handleNext}>
                    Next
                  </Button>
                </Box>
              </>
            )}

            {step === 3 && (
              <>
                <Select
                  displayEmpty
                  value={formData.bloodGroup}
                  onChange={(e) => handleChange('bloodGroup', e.target.value)}
                  fullWidth
                  className={styles.input}
                >
                  <MenuItem value='' disabled>
                    Blood Group
                  </MenuItem>
                  <MenuItem value='A+'>A+</MenuItem>
                  <MenuItem value='B+'>B+</MenuItem>
                  <MenuItem value='O+'>O+</MenuItem>
                  <MenuItem value='AB+'>AB+</MenuItem>
                </Select>
                <TextField
                  label='Health Issues (Optional)'
                  fullWidth
                  multiline
                  rows={3}
                  variant='outlined'
                  className={styles.inputContainer}
                  value={formData.healthIssues}
                  onChange={(e) => handleChange('healthIssues', e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.holdsInsurance}
                      onChange={(e) => handleChange('holdsInsurance', e.target.checked)}
                      color='primary'
                    />
                  }
                  label='Holds Insurance'
                />
                {formData.holdsInsurance && (
                  <>
                    <Select
                      displayEmpty
                      value={formData.insuranceProvider}
                      onChange={(e) => handleChange('insuranceProvider', e.target.value)}
                      fullWidth
                      className={styles.input}
                    >
                      <MenuItem value='' disabled>
                        Insurance Provider
                      </MenuItem>
                      <MenuItem value='Provider1'>Provider 1</MenuItem>
                      <MenuItem value='Provider2'>Provider 2</MenuItem>
                      <MenuItem value='Provider3'>Provider 3</MenuItem>
                    </Select>
                    <TextField
                      label='Policy Number'
                      fullWidth
                      variant='outlined'
                      className={styles.inputContainer}
                      value={formData.policyNumber}
                      onChange={(e) => handleChange('policyNumber', e.target.value)}
                    />
                    <TextField
                      label='Coverage Details'
                      fullWidth
                      multiline
                      rows={2}
                      variant='outlined'
                      className={styles.inputContainer}
                      value={formData.coverageDetails}
                      onChange={(e) => handleChange('coverageDetails', e.target.value)}
                    />
                  </>
                )}
                <Divider className={styles.devider} />
                <Box className={styles.navButtons}>
                  <Button variant='text' className={styles.back} onClick={handleBack}>
                    ← Back
                  </Button>
                  <Button variant='contained' color='primary' className={styles.button} onClick={handleNext}>
                    Next
                  </Button>
                </Box>
              </>
            )}

            {step === 4 && (
              <>
                <TextField
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  variant='outlined'
                  className={styles.inputContainer}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label='Confirm Password'
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  variant='outlined'
                  className={styles.inputContainer}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={toggleConfirmPasswordVisibility}>
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Divider className={styles.devider} />
                {error && <Typography color='error'>{error}</Typography>}
                <Box className={styles.navButtons}>
                  <Button variant='text' className={styles.back} onClick={handleBack}>
                    ← Back
                  </Button>
                  <Button variant='contained' color='primary' className={styles.button} onClick={handleNext}>
                    Conform
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </div>
        <div className={styles.createAccountContainer}>
          {/* Footer Links */}
          <Typography className={styles.footer}>
            <a href='/privacy'>Privacy Policy</a> and <a href='/terms'>Terms and Conditions</a>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default AccountForm;
