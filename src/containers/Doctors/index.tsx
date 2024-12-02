import React from 'react';
import Doctor from 'containers/Doctors/main';
import { DoctorsContextProvider } from './state';
import { rolesType } from 'components/Layout/AdminSideBar/constants';
import { useBusinessContext } from 'context/BusinessContext';

const DoctorsContainer: React.FC = () => {
  const { user: { role } = {} } = useBusinessContext();
  if (role === rolesType.admin) {
    return (
      <DoctorsContextProvider>
        <Doctor />
      </DoctorsContextProvider>
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

export default React.memo(DoctorsContainer);
