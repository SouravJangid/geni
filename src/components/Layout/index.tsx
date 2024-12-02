import React, { useEffect } from 'react';
import SideBar from './AdminSideBar';
import LayoutStyle from './Layout.module.scss';
import { useBusinessContext } from 'context/BusinessContext';
import { useHistory } from 'react-router-dom';
import { Routes, ROUTES_ENUM } from 'constants/routes';
// import PatientSideBar from './PatienSidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useBusinessContext();
  const history = useHistory();

  useEffect(() => {
    if (!user?.token && history.location.pathname !== Routes[ROUTES_ENUM.LOGIN]) {
      history.push(Routes[ROUTES_ENUM.LOGIN]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token, history.location.pathname]);

  return (
    <div className={LayoutStyle['main-layout']}>
      <div className={LayoutStyle['sidebar']}>
        <SideBar />
        {/* <PatientSideBar /> */}
      </div>
      <div className={LayoutStyle['main-content']}>{children}</div>
    </div>
  );
};

export default Layout;
