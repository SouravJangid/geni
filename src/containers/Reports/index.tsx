import React from 'react';
import Reports from './main';
import { useBusinessContext } from 'context/BusinessContext';
import { rolesType } from 'components/Layout/AdminSideBar/constants';
const ReportsContainer: React.FC = () => {
  const { user: { role } = {} } = useBusinessContext();
  if (role !== rolesType.admin) {
    return <Reports />;
  }
  return (
    <>
      <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
        Page not found
      </h3>
    </>
  );
};

export default React.memo(ReportsContainer);
