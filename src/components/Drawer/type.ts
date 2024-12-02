import React from 'react';

export enum DrawerPosition {
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  top = 'top',
}

export interface DrawerType {
  open: boolean;
  header?: string | React.ReactNode;
  content?: string | React.ReactNode;
  footer?: React.ReactNode;
  drawerPosition?: DrawerPosition;
}

export interface DrawerLayoutComposition {
  Header: React.FC<HeaderProps>;
  Content: React.FC<{
    className?: string;
    children?: React.ReactNode;
  }>;
  Footer: React.FC<FooterProps>;
}

export interface DrawerProps {
  open: boolean;
  children?: React.ReactNode;
  className?: string;
  drawerPosition?: DrawerPosition;
}

export interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}

export interface FooterProps {
  className?: string;
  children: React.ReactNode;
}
