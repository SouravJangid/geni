import React, { useEffect, useState } from 'react';
import OverviewStyle from './Overview.module.scss';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import docImgPlaceholder from 'assets/images/doc-img-placeholder.png';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
// api
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { userListpUrl } from './constants';
import { User } from './constants';

const PatientsList: React.FC = () => {
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const [patients, setPatients] = useState<User[]>([]);
  useEffect(() => {
    const getList = async () => {
      callOpenApi({ method: 'POST', url: userListpUrl, data: { userType: 'patient' } });
    };
    getList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function onSuccess(res: AxiosResponse) {
    console.log('success', res);
    if (res.data) {
      setPatients(res.data.data.users);
    }
  }
  function onError(err: AxiosErrorResponseType) {
    console.log('error', err);
  }

  return (
    <Box className={OverviewStyle['main']}>
      <Box className={OverviewStyle['sab-main']}>
        <Typography variant='h6'>Patients List</Typography>
        <Typography className={OverviewStyle['view-all']}>
          <Link to='/patients' className={OverviewStyle['link']}>
            View all
          </Link>
        </Typography>
      </Box>
      <Divider />
      <Box className={OverviewStyle['submain']}>
        <ul className={OverviewStyle['person-list']}>
          {patients.map((patient) => (
            <li key={patient._id} className={OverviewStyle['person-list-item']}>
              <img src={docImgPlaceholder} alt='person' className={OverviewStyle['person-avatar']} />
              <div className={OverviewStyle['person-info']}>
                <div className={OverviewStyle['person-name']}>{patient.fullName}</div>
                <div className={OverviewStyle['person-title']}>{patient.role}</div>
              </div>
              <IconButton aria-label='details' className={OverviewStyle['details-button']}>
                <ChevronRightIcon className={OverviewStyle['right-icon']} />
              </IconButton>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default PatientsList;
