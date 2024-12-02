import React from 'react';
import UploadFiles from './main';
import { UploadFileContextProvider } from './state';
import { useBusinessContext } from 'context/BusinessContext';
import { rolesType } from 'components/Layout/AdminSideBar/constants';

const UploadFilesContainer: React.FC = () => {
  const { user: { role } = {} } = useBusinessContext();
  if (role === rolesType.doctor) {
    return (
      <UploadFileContextProvider>
        <UploadFiles />
      </UploadFileContextProvider>
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

export default React.memo(UploadFilesContainer);
