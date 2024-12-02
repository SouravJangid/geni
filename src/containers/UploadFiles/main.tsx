import React from 'react';
import UploadFileStyle from './UploadFiles.module.scss';
import UploadFileLayout from './components/UploadFileLayout';
import Header from './components/Header';

const UploadFiles: React.FC = () => {
  return (
    <div className={UploadFileStyle['container']}>
      <Header />
      <div className={UploadFileStyle['content']}>
        <UploadFileLayout />
      </div>
    </div>
  );
};

export default React.memo(UploadFiles);
