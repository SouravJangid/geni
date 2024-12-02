import React from 'react';
import AdminSetting from 'containers/Settings/AdminSetting';
import DoctorSetting from 'containers/Settings/DoctorSetting';
import { useBusinessContext } from 'context/BusinessContext';
import { rolesType } from 'components/Layout/AdminSideBar/constants';
import PatientSetting from './PatientSetting';

const SettingsContainer: React.FC = () => {
  const { user: { role } = {} } = useBusinessContext();

  if (role === rolesType.admin) {
    return <AdminSetting />;
  }
  if (role === rolesType.doctor) {
    return <DoctorSetting />;
  }
  if (role === rolesType.patient) {
    return <PatientSetting />;
  }
  return null;
};

export default React.memo(SettingsContainer);
