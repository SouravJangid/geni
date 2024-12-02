import { Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import StepStyle from './AddPatient.module.scss';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import { useMultiStepForm } from 'containers/Patients/hooks/useMultiStepForm';
import { FaMale } from 'react-icons/fa';
import { FaFemale } from 'react-icons/fa';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { patientSignupUrl } from './constants';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';
import get from 'lodash/get';
import { ActionsType } from 'containers/Patients/state/actions';
import { usePatientsContext } from 'containers/Patients/state';

const Step1 = () => {
  const { next } = useMultiStepForm();
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const { dispatch } = usePatientsContext();

  const [formData, setFormData] = useState({
    fullName: '',
    dob: null,
    password: 'Alpha@12',
    gender: 'M',
    phone: '',
    email: '',
    userType: 'patient',
    tenant: 'apollo',
    role: 'patient',
  });

  const [errorMessage, setErrorMessage] = useState({ fullName: '', dob: '', gender: '', phone: '', email: '' });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormChange = (name: string, value: any) => {
    switch (name) {
      case 'fullName': {
        setErrorMessage({
          ...errorMessage,
          fullName: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            fullName: 'Full Name is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'dob': {
        setErrorMessage({
          ...errorMessage,
          dob: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            dob: 'Date Of Birth is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'gender': {
        setErrorMessage({
          ...errorMessage,
          gender: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            gender: 'Gender is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'phone': {
        setErrorMessage({
          ...errorMessage,
          phone: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            phone: 'Phone is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'email': {
        setErrorMessage({
          ...errorMessage,
          email: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            email: 'Email is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
    }
  };

  const validateForm = (data: any) => {
    const error: any = {};
    if (!data.fullName) {
      error['fullName'] = 'Full Name is a required field';
    }
    if (!data.gender) {
      error['gender'] = 'Gender is a required field';
    }
    if (data.phone && !isMobilePhone(data.phone, 'en-US')) {
      error['phone'] = 'Phone number is not valid';
    }
    if (data.email && !isEmail(data.email)) {
      error['email'] = 'Email is not valid';
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
      callOpenApi({ method: 'POST', url: patientSignupUrl, data: formData });
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
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
            <DatePicker
              name='dob'
              className={StepStyle['date-picker']}
              label='Date of Birth'
              value={formData?.dob}
              onChange={(value) => handleFormChange('dob', value)}
              slotProps={{
                textField: {
                  error: !!errorMessage?.dob,
                  helperText: errorMessage?.dob,
                },
              }}
            />
          </LocalizationProvider>
        </div>
        <div className={StepStyle['input-group']}>
          <ToggleButtonGroup
            color='primary'
            className={StepStyle['toggle-group']}
            value={formData?.gender}
            exclusive
            onChange={(_, value) => handleFormChange('gender', value)}
          >
            <ToggleButton className={StepStyle['toggle-btn']} value='female'>
              <FaFemale /> Female
            </ToggleButton>
            <ToggleButton className={StepStyle['toggle-btn']} value='male'>
              <FaMale /> Male
            </ToggleButton>
            <ToggleButton className={StepStyle['toggle-btn']} value='other'>
              Other
            </ToggleButton>
          </ToggleButtonGroup>
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
