/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import StepStyle from './AddDoctor.module.scss';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';
import { useMultistepForm } from 'containers/Doctors/hooks/useMultistepForm';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { doctorSignupUrl } from './constants';
import { useDoctorsContext } from 'containers/Doctors/state';
import { ActionsType } from 'containers/Doctors/state/actions';
import get from 'lodash/get';

const Step1 = () => {
  const { next } = useMultistepForm();
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const { dispatch } = useDoctorsContext();

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    password: '',
    gender: 'M',
    phone: '',
    email: '',
    userType: 'doctor',
    tenant: 'apollo',
    role: 'doctor',
  });

  const [errorMessage, setErrorMessage] = useState({ fullName: '', age: '', phone: '', email: '', password: '' });

  const validateForm = (data: any) => {
    const error: any = {};
    if (!data.fullName) {
      error['fullName'] = 'Full Name is a required field';
    }
    if (!data.password) {
      error['password'] = 'Password is a required field';
    }
    if (data.phone && !isMobilePhone(data.phone, 'en-US')) {
      error['phone'] = 'Phone number is not valid';
    }
    if (!data.phone) {
      error['phone'] = 'Phone is a required field';
    }
    if (data.email && !isEmail(data.email)) {
      error['email'] = 'Email is not valid';
    }
    if (!data.email) {
      error['email'] = 'Email is a required field';
    }
    setErrorMessage((prevErrors) => ({ ...prevErrors, ...error }));
    return !Object.keys(error)?.length;
  };

  function onSuccess(res: AxiosResponse) {
    console.log('success', res);
    if (res.data) {
      dispatch({ type: ActionsType.UPDATE_ACTIVE_USER_ID, payload: get(res, 'data.data.id', '') });
      next();
    }
  }

  function onError(err: AxiosErrorResponseType) {
    console.log('error', err);
  }

  const handleFormSubmit = async () => {
    const isValidateForm = validateForm(formData);
    if (isValidateForm) {
      callOpenApi({ method: 'POST', url: doctorSignupUrl, data: formData });
    }
  };

  const handleFormChange = (name: string, value: any) => {
    setErrorMessage((prev) => ({ ...prev, [name]: '' }));
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'phone' && value && !isMobilePhone(value, 'en-US')) {
      setErrorMessage((prev) => ({
        ...prev,
        phone: 'Phone number is not valid',
      }));
    }
  };

  return (
    <>
      <div className={StepStyle['step1Container']}>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Full Name'
            name='fullName'
            value={formData?.fullName}
            onChange={(e) => handleFormChange('fullName', e.target.value)}
            error={!!errorMessage?.fullName}
            helperText={errorMessage?.fullName}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Age'
            name='age'
            value={formData?.age}
            onChange={(e) => handleFormChange('age', e.target.value)}
            error={!!errorMessage?.age}
            helperText={errorMessage?.age}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Password'
            type='password'
            name='password'
            value={formData?.password}
            onChange={(e) => handleFormChange('password', e.target.value)}
            error={!!errorMessage?.password}
            helperText={errorMessage?.password}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Phone'
            name='phone'
            value={formData?.phone}
            onChange={(e) => handleFormChange('phone', e.target.value)}
            error={!!errorMessage?.phone}
            helperText={errorMessage?.phone}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Email'
            name='email'
            value={formData?.email}
            onChange={(e) => handleFormChange('email', e.target.value)}
            error={!!errorMessage?.email}
            helperText={errorMessage?.email}
          />
        </div>
      </div>
      <div className={StepStyle['footer']}>
        <Button className={StepStyle['next-btn']} variant='contained' onClick={handleFormSubmit}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Step1;
