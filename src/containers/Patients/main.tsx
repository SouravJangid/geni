import React, { useCallback } from 'react';
import PatientsStyle from './Patients.module.scss';
import { Button } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PatientTable from './Components/PatientsTable';
import AddPatient from './Components/AddPatient';
import { usePatientsContext } from './state';
import { ActionsType } from './state/actions';
import UserProfile from 'components/Layout/UserProfile';
import PatientDetails from './Components/PatientDetails';
// import DoctorDetails from './Components/DoctorDetails';

const Patients: React.FC = () => {
  const { dispatch } = usePatientsContext();

  const addPatientClickHandler = useCallback(() => {
    dispatch({ type: ActionsType.TOGGLE_ADD_PATIENT_MODAL });
  }, [dispatch]);

  return (
    <div className={PatientsStyle['container']}>
      <div className={PatientsStyle['header']}>
        <h6 className={PatientsStyle['header-title']}>Patient List (99)</h6>
        <Button
          className={PatientsStyle['add-doctor-btn']}
          variant='contained'
          endIcon={<AddOutlinedIcon />}
          onClick={addPatientClickHandler}
        >
          Add Patient
        </Button>
        <UserProfile />
      </div>
      <div className={PatientsStyle['content']}>
        <PatientTable />
        <AddPatient />
        <PatientDetails />
      </div>
    </div>
  );
};

export default React.memo(Patients);
