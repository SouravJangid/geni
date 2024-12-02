import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import StepStyle from './AddDoctor.module.scss';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useMultistepForm } from 'containers/Doctors/hooks/useMultistepForm';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { doctorProfileUrl } from './constants';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { useDoctorsContext } from 'containers/Doctors/state';
import { ActionsType } from 'containers/Doctors/state/actions';

const servicesOfferedOptions = [
  { value: 'Annual checkups', label: 'Annual checkups' },
  { value: 'Preventive healthcare', label: 'Preventive healthcare' },
  { value: 'Common illnesses', label: 'Common illnesses' },
];

const Step3 = () => {
  const { back } = useMultistepForm();
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const {
    state: { activeUserId },
    dispatch,
  } = useDoctorsContext();

  const [formData, setFormData] = useState({
    clinicHospitalName: '',
    address: '',
    phoneNumber: '',
    serviceOffered: [],
  });

  const [errorMessage, setErrorMessage] = useState({
    clinicHospitalName: '',
    address: '',
    phoneNumber: '',
    serviceOffered: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormChange = (name: string, value: any) => {
    switch (name) {
      case 'clinicHospitalName': {
        setErrorMessage({
          ...errorMessage,
          clinicHospitalName: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            clinicHospitalName: 'Hospital Name is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'address': {
        setErrorMessage({
          ...errorMessage,
          address: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            address: 'Address is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'phoneNumber': {
        setErrorMessage({
          ...errorMessage,
          phoneNumber: '',
        });
        if (value && !isMobilePhone(value, 'en-US')) {
          setErrorMessage({
            ...errorMessage,
            phoneNumber: 'Phone Number is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'serviceOffered': {
        setErrorMessage({
          ...errorMessage,
          serviceOffered: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            serviceOffered: 'Services Offered is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
    }
  };

  const validateForm = (data: any) => {
    const error: any = {};
    if (!data.clinicHospitalName) {
      error['clinicHospitalName'] = 'Hospital Name is a required field';
    }
    if (!data.address) {
      error['address'] = 'Address is a required field';
    }
    if (data.phoneNumber && !isMobilePhone(data.phoneNumber, 'en-US')) {
      error['phoneNumber'] = 'Phone Number is a required field';
    }
    if (!data.serviceOffered) {
      error['serviceOffered'] = 'Services Offered is a required field';
    }
    setErrorMessage((prevErrors) => ({ ...prevErrors, ...error }));
    return !Object.keys(error)?.length;
  };

  const doctorModalCloseHandler = useCallback(() => {
    dispatch({ type: ActionsType.TOGGLE_ADD_DOCTOR_MODAL });
  }, [dispatch]);

  function onSuccess(res: AxiosResponse) {
    console.log('success', res);
    if (res.data) {
      doctorModalCloseHandler();
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
            label='Clinic/ Hospital Name'
            name='clinicHospitalName'
            value={formData?.clinicHospitalName}
            onChange={(e) => handleFormChange('clinicHospitalName', e.target.value)}
            error={!!errorMessage?.clinicHospitalName}
            helperText={errorMessage?.clinicHospitalName}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <TextField
            multiline
            rows={4}
            fullWidth
            label='Address'
            name='address'
            value={formData?.address}
            onChange={(e) => handleFormChange('address', e.target.value)}
            error={!!errorMessage?.address}
            helperText={errorMessage?.address}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <TextField
            fullWidth
            label='Phone Number'
            name='phoneNumber'
            value={formData?.phoneNumber}
            onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
            error={!!errorMessage?.phoneNumber}
            helperText={errorMessage?.phoneNumber}
          />
        </div>
        <div className={StepStyle['input-group']}>
          <FormControl fullWidth size='medium'>
            <InputLabel id='demo-select-small-label'>Services Offered</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              label='Services Offered'
              value={formData?.serviceOffered}
              onChange={(e) => handleFormChange('serviceOffered', e.target.value)}
              defaultValue=''
              error={!!errorMessage?.serviceOffered}
              multiple
            >
              {servicesOfferedOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={StepStyle['footer']}>
        <Button className={StepStyle['back-btn']} startIcon={<ArrowBack />} onClick={back}>
          Back
        </Button>
        <Button className={StepStyle['next-btn']} variant='contained' onClick={handleFormSubmit}>
          Save
        </Button>
      </div>
    </>
  );
};

export default Step3;
