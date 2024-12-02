import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import StepStyle from './AddDoctor.module.scss';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useMultistepForm } from 'containers/Doctors/hooks/useMultistepForm';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { doctorProfileUrl } from './constants';
import { useDoctorsContext } from 'containers/Doctors/state';

const specialtiesOptions = [
  { value: 'Dermatology', label: 'Dermatology' },
  { value: 'Pathology', label: 'Pathology' },
  { value: 'Emergency medicine', label: 'Emergency medicine' },
];

const yearOfExperienceOptions = [
  { value: '1', label: '1 year' },
  { value: '2', label: '2 years' },
  { value: '3', label: '3 years' },
];

const Step2 = () => {
  const { back, next } = useMultistepForm();
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const {
    state: { activeUserId },
  } = useDoctorsContext();

  const [formData, setFormData] = useState({
    medical_license_number: '',
    year_experience: '',
    specialities: [],
    education: '',
    certificates: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    medical_license_number: '',
    year_experience: '',
    specialities: '',
    education: '',
    certificates: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormChange = (name: string, value: any) => {
    switch (name) {
      case 'medical_license_number': {
        setErrorMessage({
          ...errorMessage,
          medical_license_number: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            medical_license_number: 'Medical License Number is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'year_experience': {
        setErrorMessage({
          ...errorMessage,
          year_experience: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            year_experience: 'Year Of Experience is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'specialities': {
        setErrorMessage({
          ...errorMessage,
          specialities: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            specialities: 'Specialties is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'education': {
        setErrorMessage({
          ...errorMessage,
          education: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            education: 'Education is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'certificates': {
        setErrorMessage({
          ...errorMessage,
          certificates: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            certificates: 'Certificates is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
    }
  };

  const validateForm = (data: any) => {
    const error: any = {};
    if (!data.medical_license_number) {
      error['medical_license_number'] = 'Medical License Number is a required field';
    }
    if (!data.year_experience) {
      error['year_experience'] = 'Year Of Experience is a required field';
    }
    if (!data.specialities) {
      error['specialities'] = 'Specialties is a required field';
    }
    if (!data.education) {
      error['education'] = 'Education is a required field';
    }
    if (!data.certificates) {
      error['certificates'] = 'Certificates is a required field';
    }
    setErrorMessage((prevErrors) => ({ ...prevErrors, ...error }));
    return !Object.keys(error)?.length;
  };

  function onSuccess(res: AxiosResponse) {
    console.log('success', res);
    if (res.data) {
      next();
    }
  }

  function onError(err: AxiosErrorResponseType) {
    console.log('error', err);
  }

  const handleFormSubmit = async () => {
    const isValidateForm = validateForm(formData);
    if (isValidateForm) {
      callOpenApi({
        method: 'POST',
        url: doctorProfileUrl,
        data: {
          userId: activeUserId,
          profile: formData,
        },
      });
    }
  };

  return (
    <>
      <div className={StepStyle['step1Container']}>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Medical License Number'
            name='medical_license_number'
            value={formData?.medical_license_number}
            onChange={(e) => handleFormChange('medical_license_number', e.target.value)}
            error={!!errorMessage?.medical_license_number}
            helperText={errorMessage?.medical_license_number}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <FormControl fullWidth size='medium'>
            <InputLabel id='demo-select-small-label'>Specialisations/ Specialties</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              label='Specialisations/ Specialties'
              value={formData?.specialities}
              onChange={(e) => handleFormChange('specialities', e.target.value)}
              defaultValue=''
              error={!!errorMessage?.specialities}
              multiple
            >
              {specialtiesOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {!!errorMessage?.specialities && <FormHelperText>{errorMessage?.specialities}</FormHelperText>}
          </FormControl>
        </div>
        <div className={StepStyle['input-group']}>
          <FormControl fullWidth size='medium'>
            <InputLabel id='demo-select-small-label'>Year of Experience</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={formData?.year_experience}
              label='Year of Experience'
              onChange={(e) => handleFormChange('year_experience', e.target.value)}
              defaultValue=''
              error={!!errorMessage?.year_experience}
            >
              {yearOfExperienceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {!!errorMessage?.year_experience && <FormHelperText>{errorMessage?.year_experience}</FormHelperText>}
          </FormControl>
        </div>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Education'
            name='education'
            value={formData?.education}
            onChange={(e) => handleFormChange('education', e.target.value)}
            error={!!errorMessage?.education}
            helperText={errorMessage?.education}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Certificates'
            name='certificates'
            value={formData?.certificates}
            onChange={(e) => handleFormChange('certificates', e.target.value)}
            error={!!errorMessage?.certificates}
            helperText={errorMessage?.certificates}
          />
        </div>
      </div>
      <div className={StepStyle['footer']}>
        <Button className={StepStyle['back-btn']} startIcon={<ArrowBack />} onClick={back}>
          Back
        </Button>
        <Button className={StepStyle['next-btn']} variant='contained' onClick={handleFormSubmit}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Step2;
