import React from 'react';
import Patient from 'containers/Patients/main';
import { PatientsContextProvider } from './state';
import { rolesType } from 'components/Layout/AdminSideBar/constants';
import { useBusinessContext } from 'context/BusinessContext';

const PatientsContainer: React.FC = () => {
  const { user: { role } = {} } = useBusinessContext();
  if (role === rolesType.admin || role === rolesType.doctor) {
    return (
      <PatientsContextProvider>
        <Patient />
      </PatientsContextProvider>
    );
  }
  return (
    <>
      <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
        Page not found
      </h3>
    </>
  );
};

export default React.memo(PatientsContainer);
