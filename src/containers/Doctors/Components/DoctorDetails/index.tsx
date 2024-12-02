import CloseIcon from '@mui/icons-material/Close';

import DrawerLayout from 'components/Drawer';
import React, { useCallback } from 'react';
import DoctorDetailsStyle from './DoctorDetails.module.scss';
import { useDoctorsContext } from 'containers/Doctors/state';
import { ActionsType } from 'containers/Doctors/state/actions';
import ContentWrapper from './ContentWrapper';

const DoctorDetails = () => {
  const {
    state: { showDoctorDetailsModal = false },
    dispatch,
  } = useDoctorsContext();

  const doctorDetailsModalCloseHandler = useCallback(() => {
    dispatch({ type: ActionsType.TOGGLE_DOCTOR_DETAILS_MODAL });
    dispatch({ type: ActionsType.UPDATE_ACTIVE_USER_ID, payload: '' });
  }, [dispatch]);

  return (
    <DrawerLayout open={showDoctorDetailsModal}>
      <div className={DoctorDetailsStyle['doctor-details-container']}>
        <DrawerLayout.Header className={DoctorDetailsStyle['header-wrapper']}>
          <div className={DoctorDetailsStyle['header']}>
            <h6 className={DoctorDetailsStyle['header-title']}>Doctor Details</h6>
            <CloseIcon className={DoctorDetailsStyle['close-btn']} onClick={doctorDetailsModalCloseHandler} />
          </div>
        </DrawerLayout.Header>
        <DrawerLayout.Content>
          <div className={DoctorDetailsStyle['content']}>
            <ContentWrapper />
          </div>
        </DrawerLayout.Content>
      </div>
    </DrawerLayout>
  );
};

export default DoctorDetails;
