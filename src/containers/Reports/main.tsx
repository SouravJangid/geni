import React from 'react';
import ReportStyle from './Report.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import Files from './Components/Files';

const Reports: React.FC = () => {
  return (
    <>
      <div className={ReportStyle['container']}>
        <div className={ReportStyle['header']}>
          <h6 className={ReportStyle['header-title']}>Reports</h6>
          <div className={ReportStyle['inputBox_container']}>
            <div className={ReportStyle['input-box']}>
              <SearchIcon />
              <input className={ReportStyle['inputBox']} id='inputBox' type='text' placeholder='Search For Products' />
            </div>
          </div>
        </div>
        <div className={ReportStyle['content']}>
          <Files />
        </div>
      </div>
    </>
  );
};

export default React.memo(Reports);
