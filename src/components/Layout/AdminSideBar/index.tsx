/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import SideBarStyles from './SideBar.module.scss';
import { SIDEBAR_MENU_ITEMS, SideBarNav, SideBarOptionsEnum } from './constants';
import { useHistory, useLocation } from 'react-router-dom';
import cx from 'classnames';
import get from 'lodash/get';
import MainLogo from 'assets/images/mainLogo.png';
import { useBusinessContext } from 'context/BusinessContext';
import { rolesType } from './constants';

const SideBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const { user: { role } = {} } = useBusinessContext();

  const onSidebarItemClick = (path: string) => {
    history.push(path);
  };

  const selectedMenu = useMemo(() => {
    const currentPath = `/${location.pathname.split('/')[1]}`;
    return {
      dashboard: currentPath.includes(SideBarNav[SideBarOptionsEnum.dashboard].path),
      doctors: currentPath.includes(SideBarNav[SideBarOptionsEnum.doctors].path),
      patients: currentPath.includes(SideBarNav[SideBarOptionsEnum.patients].path),
      chat: currentPath.includes(SideBarNav[SideBarOptionsEnum.chat].path),
      queries: currentPath.includes(SideBarNav[SideBarOptionsEnum.queries].path),
      setting: currentPath.includes(SideBarNav[SideBarOptionsEnum.setting].path),
      help: currentPath.includes(SideBarNav[SideBarOptionsEnum.help].path),
      reports: currentPath.includes(SideBarNav[SideBarOptionsEnum.reports].path),
      sharedfiles: currentPath.includes(SideBarNav[SideBarOptionsEnum.sharedfiles].path),
      educational: currentPath.includes(SideBarNav[SideBarOptionsEnum.educational].path),
    };
  }, [location.pathname]);

  const sidebarMenuItems = useMemo(() => {
    return SIDEBAR_MENU_ITEMS.filter((item) => {
      if (item.roles?.includes(role as rolesType)) {
        return true;
      }
      return false;
    });
  }, [role]);

  return (
    <>
      <div className={SideBarStyles['logo-container']}>
        <img src={MainLogo} className={SideBarStyles['logo-img']} alt='logo' />
      </div>
      <div className={SideBarStyles['sidebar-menu']}>
        <ul className={SideBarStyles['sidebar-list']}>
          {sidebarMenuItems.map((item, index) => {
            return (
              <li
                key={index}
                className={cx({
                  [SideBarStyles['sidebar-list-item']]: true,
                  [SideBarStyles['isSelected']]: get(selectedMenu, `${item.menu}`),
                })}
                onClick={() => onSidebarItemClick(item.path)}
              >
                <item.sidebarItem.Icon className={SideBarStyles['list-item-icon']} />
                <label>{item.sidebarItem.label}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
