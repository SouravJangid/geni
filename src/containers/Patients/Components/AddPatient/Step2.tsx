import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import StepStyle from './AddPatient.module.scss';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useMultiStepForm } from 'containers/Patients/hooks/useMultiStepForm';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { patientProfileUrl } from './constants';
import { usePatientsContext } from 'containers/Patients/state';

const bloodTypeOptions = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

const Step2 = () => {
  const { back, next } = useMultiStepForm();
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const {
    state: { activeUserId },
  } = usePatientsContext();

  const [formData, setFormData] = useState({
    medicalHistory: '',
    currentMedication: '',
    allergies: '',
    bloodType: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    medicalHistory: '',
    currentMedication: '',
    allergies: '',
    bloodType: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormChange = (name: string, value: any) => {
    switch (name) {
      case 'medicalHistory': {
        setErrorMessage({
          ...errorMessage,
          medicalHistory: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            medicalHistory: 'Medical History Number is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'currentMedication': {
        setErrorMessage({
          ...errorMessage,
          currentMedication: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            currentMedication: 'Current Medication is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'allergies': {
        setErrorMessage({
          ...errorMessage,
          allergies: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            allergies: 'Allergies is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'bloodType': {
        setErrorMessage({
          ...errorMessage,
          bloodType: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            bloodType: 'Blood Type is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
    }
  };

  const validateForm = (data: any) => {
    const error: any = {};
    if (!data.medicalHistory) {
      error['medicalHistory'] = 'Medical History Number is a required field';
    }
    if (!data.currentMedication) {
      error['currentMedication'] = 'Current Medication is a required field';
    }
    if (!data.allergies) {
      error['allergies'] = 'Allergies is a required field';
    }
    if (!data.bloodType) {
      error['bloodType'] = 'Blood Type is a required field';
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
        url: patientProfileUrl,
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
            multiline
            rows={4}
            label='Medical History'
            name='medicalHistory'
            value={formData?.medicalHistory}
            onChange={(e) => handleFormChange('medicalHistory', e.target.value)}
            error={!!errorMessage?.medicalHistory}
            helperText={errorMessage?.medicalHistory}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <FormControl fullWidth size='medium'>
            <InputLabel id='demo-select-small-label'>Blood Type</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={formData?.bloodType}
              label='Blood Type'
              onChange={(e) => handleFormChange('bloodType', e.target.value)}
              defaultValue=''
              error={!!errorMessage?.bloodType}
            >
              {bloodTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {!!errorMessage?.bloodType && <FormHelperText>{errorMessage?.bloodType}</FormHelperText>}
          </FormControl>
        </div>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Current Medications'
            name='currentMedication'
            value={formData?.currentMedication}
            onChange={(e) => handleFormChange('currentMedication', e.target.value)}
            error={!!errorMessage?.currentMedication}
            helperText={errorMessage?.currentMedication}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Allergies'
            name='allergies'
            value={formData?.allergies}
            onChange={(e) => handleFormChange('allergies', e.target.value)}
            error={!!errorMessage?.allergies}
            helperText={errorMessage?.allergies}
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
