/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import docDetailsImg from 'assets/images/docDetails-img.png';
import PatientDetailsStyle from './PatientDetails.module.scss';
import { IoCallOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import { Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import { usePatientsContext } from 'containers/Patients/state';
import { AxiosResponse } from 'axios';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { patientProfileDetailUrl } from './constants';
import { get } from 'lodash';

const GenderMap: any = {
  M: 'Male',
  F: 'Female',
};
const ContentWrapper = () => {
  const {
    state: { activeUserId },
  } = usePatientsContext();

  const { callOpenApi, data, loading } = useOpenApi(onSuccess, onError);

  function onSuccess(res: AxiosResponse) {
    console.log('success', res);
  }
  function onError(err: AxiosErrorResponseType) {
    console.log('error', err);
  }

  useEffect(() => {
    if (activeUserId) {
      callOpenApi({ method: 'GET', url: `${patientProfileDetailUrl}?id=${activeUserId}` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    _id,
    email = '',
    dob = '',
    fullName = '',
    gender = '',
    phone = '',
    profile_information: {
      medical_license_number = '',
      year_experience = '',
      education = '',
      certificates = '',
      clinicHospitalName = '',
      address = '',
      phoneNumber = '',
      serviceOffered = [],
      specialities = [],
    } = {},
  } = get(data, 'data.data.result', {});

  return (
    <React.Fragment key={_id}>
      <div className={PatientDetailsStyle['briefInfo']}>
        <img className={PatientDetailsStyle['doctorImage']} src={docDetailsImg} alt='doctorImage' />
        <div className={PatientDetailsStyle['contactDetails']}>
          <div className={PatientDetailsStyle['doctorName']}>{fullName}</div>
          <div className={PatientDetailsStyle['doctorDOB']}>
            <span>{dob}</span>
            <span className={PatientDetailsStyle['separator']}></span>
            <span>{GenderMap[gender] || 'Other'}</span>
          </div>
          <div className={PatientDetailsStyle['contact']}>
            <div className={PatientDetailsStyle['contact-item']}>
              <IoCallOutline />
              <span>{phone}</span>
            </div>
            <div className={PatientDetailsStyle['contact-item']}>
              <CiMail />
              <span>{email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={PatientDetailsStyle['profDetails']}>
        <h6>Professional Details</h6>
        <div className={PatientDetailsStyle['profDetails-section']}>
          <div className={PatientDetailsStyle['profDetails-group-item']}>
            <div className={PatientDetailsStyle['profDetails-item']}>
              <label>Medical License Number</label>
              <span>{medical_license_number}</span>
            </div>
            <div className={PatientDetailsStyle['profDetails-item']}>
              <label>Years of Experience</label>
              <span>{year_experience}</span>
            </div>
          </div>
          <div className={PatientDetailsStyle['profDetails-item']}>
            <label>Specialisations/ Specialties</label>
            <div className={PatientDetailsStyle['chip-group']}>
              {specialities.map((speciality: string) => (
                <Chip key={speciality} label={speciality} variant='outlined' />
              ))}
            </div>
          </div>
          <div className={PatientDetailsStyle['profDetails-item']}>
            <label>Education</label>
            <span>{education}</span>
          </div>
          <div className={PatientDetailsStyle['profDetails-item']}>
            <label>Certificates</label>
            <span>{certificates}</span>
          </div>
        </div>
      </div>
      <Divider component={'div'} className={PatientDetailsStyle['divider']} />
      <div className={PatientDetailsStyle['practiceDetails']}>
        <h6>practice details</h6>
        <div className={PatientDetailsStyle['practiceDetails-section']}>
          <div className={PatientDetailsStyle['practiceDetails-item']}>
            <label>{clinicHospitalName}</label>
            <span>{address}</span>
          </div>
          <div className={PatientDetailsStyle['practiceDetails-item']}>
            <div className={PatientDetailsStyle['chip-group']}>
              <Chip icon={<IoCallOutline style={{ marginRight: '4px' }} />} label={phoneNumber} variant='outlined' />
            </div>
          </div>
          <div className={PatientDetailsStyle['practiceDetails-item']}>
            <div className={PatientDetailsStyle['chip-title']}>Services</div>
            <div className={PatientDetailsStyle['chip-group']}>
              {serviceOffered.map((service: string) => (
                <Chip key={service} label={service} variant='outlined' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContentWrapper;
