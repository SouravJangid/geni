/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import docDetailsImg from 'assets/images/docDetails-img.png';
import DoctorDetailsStyle from './DoctorDetails.module.scss';
import { IoCallOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import { Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useDoctorsContext } from 'containers/Doctors/state';
import { AxiosResponse } from 'axios';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { doctorProfileDetailUrl } from './constants';
import { get } from 'lodash';

const GenderMap: any = {
  M: 'Male',
  F: 'Female',
};
const ContentWrapper = () => {
  const {
    state: { activeUserId },
  } = useDoctorsContext();

  const { callOpenApi, data, loading } = useOpenApi(onSuccess, onError);

  function onSuccess(res: AxiosResponse) {
    console.log('success', res);
  }
  function onError(err: AxiosErrorResponseType) {
    console.log('error', err);
  }

  useEffect(() => {
    if (activeUserId) {
      callOpenApi({ method: 'GET', url: `${doctorProfileDetailUrl}?id=${activeUserId}` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    _id,
    email = '',
    age = '',
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
      <div className={DoctorDetailsStyle['briefInfo']}>
        <img className={DoctorDetailsStyle['doctorImage']} src={docDetailsImg} alt='doctorImage' />
        <div className={DoctorDetailsStyle['contactDetails']}>
          <div className={DoctorDetailsStyle['doctorName']}>{fullName}</div>
          <div className={DoctorDetailsStyle['doctorDOB']}>
            <span>{age}</span>
            <span className={DoctorDetailsStyle['separator']}></span>
            <span>{GenderMap[gender] || 'Other'}</span>
          </div>
          <div className={DoctorDetailsStyle['contact']}>
            <div className={DoctorDetailsStyle['contact-item']}>
              <IoCallOutline />
              <span>{phone}</span>
            </div>
            <div className={DoctorDetailsStyle['contact-item']}>
              <CiMail />
              <span>{email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={DoctorDetailsStyle['profDetails']}>
        <h6>Professional Details</h6>
        <div className={DoctorDetailsStyle['profDetails-section']}>
          <div className={DoctorDetailsStyle['profDetails-group-item']}>
            <div className={DoctorDetailsStyle['profDetails-item']}>
              <label>Medical License Number</label>
              <span>{medical_license_number}</span>
            </div>
            <div className={DoctorDetailsStyle['profDetails-item']}>
              <label>Years of Experience</label>
              <span>{year_experience}</span>
            </div>
          </div>
          <div className={DoctorDetailsStyle['profDetails-item']}>
            <label>Specialisations/ Specialties</label>
            <div className={DoctorDetailsStyle['chip-group']}>
              {specialities.map((speciality: string) => (
                <Chip key={speciality} label={speciality} variant='outlined' />
              ))}
            </div>
          </div>
          <div className={DoctorDetailsStyle['profDetails-item']}>
            <label>Education</label>
            <span>{education}</span>
          </div>
          <div className={DoctorDetailsStyle['profDetails-item']}>
            <label>Certificates</label>
            <span>{certificates}</span>
          </div>
        </div>
      </div>
      <Divider component={'div'} className={DoctorDetailsStyle['divider']} />
      <div className={DoctorDetailsStyle['practiceDetails']}>
        <h6>practice details</h6>
        <div className={DoctorDetailsStyle['practiceDetails-section']}>
          <div className={DoctorDetailsStyle['practiceDetails-item']}>
            <label>{clinicHospitalName}</label>
            <span>{address}</span>
          </div>
          <div className={DoctorDetailsStyle['practiceDetails-item']}>
            <div className={DoctorDetailsStyle['chip-group']}>
              <Chip icon={<IoCallOutline style={{ marginRight: '4px' }} />} label={phoneNumber} variant='outlined' />
            </div>
          </div>
          <div className={DoctorDetailsStyle['practiceDetails-item']}>
            <div className={DoctorDetailsStyle['chip-title']}>Services</div>
            <div className={DoctorDetailsStyle['chip-group']}>
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
