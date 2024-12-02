import React from 'react';
import EmptyLayoutStyle from './EmptyLayout.module.scss';

const EmptyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={EmptyLayoutStyle['main-layout']}>{children}</div>;
};

export default EmptyLayout;
