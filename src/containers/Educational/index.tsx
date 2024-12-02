import React from 'react';
import Education from './main';
import { useBusinessContext } from 'context/BusinessContext';
import { rolesType } from 'components/Layout/AdminSideBar/constants';

const Educational: React.FC = () => {
  const { user: { role } = {} } = useBusinessContext();
  if (role === rolesType.patient) {
    return <Education />;
  }
  return (
    <>
      <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
        Page not found
      </h3>
    </>
  );
};

export default React.memo(Educational);
