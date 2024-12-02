import React, { useCallback } from 'react';
import DoctorsStyle from './Doctors.module.scss';
import { Button } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DoctorTable from './Components/DoctorsTable';
import AddDoctor from './Components/AddDoctor';
import { useDoctorsContext } from './state';
import { ActionsType } from './state/actions';
import DoctorDetails from './Components/DoctorDetails';
import UserProfile from 'components/Layout/UserProfile';

const Doctors: React.FC = () => {
  const { dispatch } = useDoctorsContext();

  const addDoctorClickHandler = useCallback(() => {
    dispatch({ type: ActionsType.TOGGLE_ADD_DOCTOR_MODAL });
  }, [dispatch]);

  return (
    <div className={DoctorsStyle['container']}>
      <div className={DoctorsStyle['header']}>
        <h6 className={DoctorsStyle['header-title']}>Doctors List (99)</h6>
        <Button
          className={DoctorsStyle['add-doctor-btn']}
          variant='contained'
          endIcon={<AddOutlinedIcon />}
          onClick={addDoctorClickHandler}
        >
          Add doctor
        </Button>
        <UserProfile />
      </div>
      <div className={DoctorsStyle['content']}>
        <DoctorTable />
        <AddDoctor />
        <DoctorDetails />
      </div>
    </div>
  );
};

export default React.memo(Doctors);
