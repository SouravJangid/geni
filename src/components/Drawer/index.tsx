import React from 'react';
import { Drawer } from '@mui/material';
import cx from 'classnames';
import {
  DrawerPosition,
  // DrawerType
} from './type';

import DrawerStyles from 'components/Drawer/Drawer.module.scss';

import { DrawerLayoutComposition, DrawerProps } from './type';

export const DrawerHeader: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className = '' }) => {
  return (
    <div
      className={cx({
        [DrawerStyles['drawerHeader']]: true,
        [className]: !!className,
      })}
    >
      {children}
    </div>
  );
};

export const DrawerContent: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className = '' }) => {
  return (
    <div
      className={cx({
        [DrawerStyles['drawerContent']]: true,
        [className]: !!className,
      })}
    >
      {children}
    </div>
  );
};

export const DrawerFooter: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className = '' }) => {
  return (
    <div
      className={cx({
        [DrawerStyles['drawerFooter']]: true,
        [className]: !!className,
      })}
    >
      {children}
    </div>
  );
};

const DrawerLayout: React.FC<DrawerProps> & DrawerLayoutComposition = ({
  open,
  drawerPosition,
  children,
  className = '',
}) => {
  return (
    <Drawer
      open={open}
      anchor={drawerPosition || DrawerPosition.right}
      classes={{
        root: cx({
          [DrawerStyles['drawerContainer']]: true,
          // [className]: !!className,
        }),
        paper: cx({
          [DrawerStyles['defaultDrawerWidth']]: open,
          [DrawerStyles['drawerWrapper']]: true,
          [className]: !!className,
        }),
      }}
    >
      <div className={DrawerStyles['drawerSidebar']}>{children}</div>
    </Drawer>
  );
};

DrawerLayout.displayName = 'DrawerLayout';
DrawerLayout.Header = DrawerHeader;
DrawerLayout.Content = DrawerContent;
DrawerLayout.Footer = DrawerFooter;

export default DrawerLayout;
