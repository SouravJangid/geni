import CloseIcon from '@mui/icons-material/Close';

import DrawerLayout from 'components/Drawer';
import React, { useCallback } from 'react';
import AddPatientStyle from './AddPatient.module.scss';
import { usePatientsContext } from 'containers/Patients/state';
import { ActionsType } from 'containers/Patients/state/actions';
import ContentWrapper from './ContentWrapper';

const AddDoctor = () => {
  const {
    state: { showAddPatientModal = false },
    dispatch,
  } = usePatientsContext();

  const patientModalCloseHandler = useCallback(() => {
    dispatch({ type: ActionsType.TOGGLE_ADD_PATIENT_MODAL });
    dispatch({ type: ActionsType.UPDATE_ACTIVE_USER_ID, payload: '' });
  }, [dispatch]);

  return (
    <DrawerLayout open={showAddPatientModal}>
      <div className={AddPatientStyle['add-doctor-container']}>
        <DrawerLayout.Header>
          <div className={AddPatientStyle['header']}>
            <h6 className={AddPatientStyle['header-title']}>Add Patient</h6>
            <CloseIcon className={AddPatientStyle['close-btn']} onClick={patientModalCloseHandler} />
          </div>
        </DrawerLayout.Header>
        <DrawerLayout.Content>
          <ContentWrapper />
        </DrawerLayout.Content>
      </div>
    </DrawerLayout>
  );
};

export default AddDoctor;
