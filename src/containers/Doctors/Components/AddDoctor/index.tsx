import CloseIcon from '@mui/icons-material/Close';

import DrawerLayout from 'components/Drawer';
import React, { useCallback } from 'react';
import AddDoctorStyle from './AddDoctor.module.scss';
import { useDoctorsContext } from 'containers/Doctors/state';
import { ActionsType } from 'containers/Doctors/state/actions';
import ContentWrapper from './ContentWrapper';

const AddDoctor = () => {
  const {
    state: { showAddDoctorModal = false },
    dispatch,
  } = useDoctorsContext();

  const doctorModalCloseHandler = useCallback(() => {
    dispatch({ type: ActionsType.TOGGLE_ADD_DOCTOR_MODAL });
  }, [dispatch]);

  return (
    <DrawerLayout open={showAddDoctorModal}>
      <div className={AddDoctorStyle['add-doctor-container']}>
        <DrawerLayout.Header>
          <div className={AddDoctorStyle['header']}>
            <h6 className={AddDoctorStyle['header-title']}>Add Doctor</h6>
            <CloseIcon className={AddDoctorStyle['close-btn']} onClick={doctorModalCloseHandler} />
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
