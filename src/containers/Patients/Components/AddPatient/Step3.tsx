import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import StepStyle from './AddPatient.module.scss';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useMultiStepForm } from 'containers/Patients/hooks/useMultiStepForm';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { patientProfileUrl } from './constants';
import { ActionsType } from 'containers/Patients/state/actions';
import { usePatientsContext } from 'containers/Patients/state';

const insuranceProviderOptions = [
  { value: 'Bharti AXA Life Insurance', label: 'Bharti AXA Life Insurance' },
  { value: 'Max Life Insurance', label: 'Max Life Insurance' },
  { value: 'Bajaj Allianz', label: 'Bajaj Allianz' },
];

const relationOptions = [
  { value: 'Parent', label: 'Parent' },
  { value: 'Sibling', label: 'Sibling' },
  { value: 'Son/Daughter', label: 'Son/Daughter' },
];

const Step3 = () => {
  const { back } = useMultiStepForm();
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const {
    state: { activeUserId },
    dispatch,
  } = usePatientsContext();

  const [formData, setFormData] = useState({
    holdsInsurance: false,
    insuranceProvider: '',
    policyNumber: '',
    coverageDetails: '',
    fullName: '',
    relation: '',
    phone: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    insuranceProvider: '',
    policyNumber: '',
    coverageDetails: '',
    fullName: '',
    relation: '',
    phone: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormChange = (name: string, value: any) => {
    switch (name) {
      case 'holdsInsurance': {
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'insuranceProvider': {
        setErrorMessage({
          ...errorMessage,
          insuranceProvider: '',
        });
        if (formData.holdsInsurance && !value) {
          setErrorMessage({
            ...errorMessage,
            insuranceProvider: 'Insurance Provider is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'policyNumber': {
        setErrorMessage({
          ...errorMessage,
          policyNumber: '',
        });
        if (formData.holdsInsurance && !value) {
          setErrorMessage({
            ...errorMessage,
            policyNumber: 'Policy Number is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
      case 'coverageDetails': {
        setErrorMessage({
          ...errorMessage,
          coverageDetails: '',
        });
        if (formData.holdsInsurance && !value) {
          setErrorMessage({
            ...errorMessage,
            coverageDetails: 'Coverage Details is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
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
      case 'relation': {
        setErrorMessage({
          ...errorMessage,
          relation: '',
        });
        if (!value) {
          setErrorMessage({
            ...errorMessage,
            relation: 'Relation is a required field',
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
            phone: 'Phone Number is a required field',
          });
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
    }
  };

  const validateForm = (data: any) => {
    const error: any = {};
    if (formData.holdsInsurance && !data.insuranceProvider) {
      error['insuranceProvider'] = 'Insurance Provider is a required field';
    }
    if (formData.holdsInsurance && !data.policyNumber) {
      error['policyNumber'] = 'Policy Number is a required field';
    }
    if (formData.holdsInsurance && !data.coverageDetails) {
      error['coverageDetails'] = 'Coverage Details is a required field';
    }
    if (!data.fullName) {
      error['fullName'] = 'Full Name is a required field';
    }
    if (!data.relation) {
      error['relation'] = 'Relation is a required field';
    }
    if (!data.phone) {
      error['phone'] = 'Phone Number is a required field';
    }
    setErrorMessage((prevErrors) => ({ ...prevErrors, ...error }));
    return !Object.keys(error)?.length;
  };

  const closePatientModal = useCallback(() => {
    dispatch({ type: ActionsType.TOGGLE_ADD_PATIENT_MODAL });
  }, [dispatch]);

  function onSuccess(res: AxiosResponse) {
    console.log('success', res);
    if (res.data) {
      closePatientModal();
    }
  }

  function onError(err: AxiosErrorResponseType) {
    console.log('error', err);
  }

  const transformRequestBody = () => {
    const { fullName, relation, phone, holdsInsurance, insuranceProvider, policyNumber, coverageDetails } = formData;
    return {
      userId: activeUserId,
      profile: {
        ...(holdsInsurance && {
          insuranceProvider,
          policyNumber,
          coverageDetails,
        }),
        holdsInsurance,
        emmergencyContact: {
          fullName,
          relation,
          phone,
        },
      },
    };
  };

  const handleFormSubmit = async () => {
    const isValidateForm = validateForm(formData);
    if (isValidateForm) {
      callOpenApi({
        method: 'POST',
        url: patientProfileUrl,
        data: transformRequestBody(),
      });
    }
  };

  return (
    <>
      <div className={StepStyle['step1Container']}>
        <div className={StepStyle['form-layout']}>
          <FormControlLabel
            control={
              <Checkbox
                name='holdsInsurance'
                checked={formData?.holdsInsurance}
                onChange={(e) => handleFormChange('holdsInsurance', e.target.checked)}
              />
            }
            label='Hold Insurance'
          />
          {formData?.holdsInsurance && (
            <>
              <div className={StepStyle['input-group']}>
                <FormControl fullWidth size='medium'>
                  <InputLabel id='demo-select-small-label'>Insurance Provider</InputLabel>
                  <Select
                    labelId='demo-select-small-label'
                    id='demo-select-small'
                    label='Insurance Provider'
                    value={formData?.insuranceProvider}
                    onChange={(e) => handleFormChange('insuranceProvider', e.target.value)}
                    defaultValue=''
                    error={!!errorMessage?.insuranceProvider}
                  >
                    {insuranceProviderOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errorMessage?.insuranceProvider && (
                    <FormHelperText>{errorMessage?.insuranceProvider}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className={StepStyle['input-group']}>
                <TextField
                  fullWidth
                  label='Policy Number'
                  name='policyNumber'
                  value={formData?.policyNumber}
                  onChange={(e) => handleFormChange('policyNumber', e.target.value)}
                  error={!!errorMessage?.policyNumber}
                  helperText={errorMessage?.policyNumber}
                />
              </div>
              <div className={StepStyle['input-group']}>
                <TextField
                  fullWidth
                  label='Coverage Details'
                  name='coverageDetails'
                  value={formData?.coverageDetails}
                  onChange={(e) => handleFormChange('coverageDetails', e.target.value)}
                  error={!!errorMessage?.coverageDetails}
                  helperText={errorMessage?.coverageDetails}
                />
              </div>
            </>
          )}
        </div>
        <div className={StepStyle['form-layout']}>
          <h6 className={StepStyle['step-title']}>Emergency Contact</h6>
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
            <FormControl fullWidth size='medium'>
              <InputLabel id='demo-select-small-label'>Relation</InputLabel>
              <Select
                labelId='demo-select-small-label'
                id='demo-select-small'
                label='Relation'
                value={formData?.relation}
                onChange={(e) => handleFormChange('relation', e.target.value)}
                defaultValue=''
                error={!!errorMessage?.relation}
              >
                {relationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {!!errorMessage?.relation && <FormHelperText>{errorMessage?.relation}</FormHelperText>}
            </FormControl>
          </div>
          <div className={StepStyle['input-group']}>
            <TextField
              fullWidth
              label='Phone Number'
              name='phone'
              value={formData?.phone}
              onChange={(e) => handleFormChange('phone', e.target.value)}
              error={!!errorMessage?.phone}
              helperText={errorMessage?.phone}
            />
          </div>
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
