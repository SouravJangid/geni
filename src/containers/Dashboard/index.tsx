/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useBusinessContext } from 'context/BusinessContext';
import { rolesType } from 'components/Layout/AdminSideBar/constants';
import AdminDashboard from './AdminDashboard';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';

const Dashboard: React.FC = React.memo(() => {
  const { user: { role } = {} } = useBusinessContext();
  if (role === rolesType.admin) {
    return <AdminDashboard />;
  }
  if (role === rolesType.doctor) {
    return <DoctorDashboard />;
  }
  if (role === rolesType.patient) {
    return <PatientDashboard />;
  }
  return null;
});

export default Dashboard;
