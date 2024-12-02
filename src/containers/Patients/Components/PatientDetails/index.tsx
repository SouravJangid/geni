import CloseIcon from '@mui/icons-material/Close';

import DrawerLayout from 'components/Drawer';
import React, { useCallback } from 'react';
import PatientDetailsStyle from './PatientDetails.module.scss';
import { ActionsType } from 'containers/Patients/state/actions';
import ContentWrapper from './ContentWrapper';
import { usePatientsContext } from 'containers/Patients/state';

const DoctorDetails = () => {
  const {
    state: { showPatientDetailsModal = false },
    dispatch,
  } = usePatientsContext();

  const patientDetailsModalCloseHandler = useCallback(() => {
    dispatch({ type: ActionsType.TOGGLE_PATIENT_DETAILS_MODAL });
    dispatch({ type: ActionsType.UPDATE_ACTIVE_USER_ID, payload: '' });
  }, [dispatch]);

  return (
    <DrawerLayout open={showPatientDetailsModal}>
      <div className={PatientDetailsStyle['doctor-details-container']}>
        <DrawerLayout.Header className={PatientDetailsStyle['header-wrapper']}>
          <div className={PatientDetailsStyle['header']}>
            <h6 className={PatientDetailsStyle['header-title']}>Patient Details</h6>
            <CloseIcon className={PatientDetailsStyle['close-btn']} onClick={patientDetailsModalCloseHandler} />
          </div>
        </DrawerLayout.Header>
        <DrawerLayout.Content>
          <div className={PatientDetailsStyle['content']}>
            <ContentWrapper />
          </div>
        </DrawerLayout.Content>
      </div>
    </DrawerLayout>
  );
};

export default DoctorDetails;
