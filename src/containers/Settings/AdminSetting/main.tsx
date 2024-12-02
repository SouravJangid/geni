import React from 'react';
import SettingsStyle from './Settings.module.scss';
import SettingsPage from './Components/SettingSidebar';
import SearchIcon from '@mui/icons-material/Search';
import UserProfile from 'components/Layout/UserProfile';

const AdminSettings: React.FC = () => {
  return (
    <>
      <div className={SettingsStyle['container']}>
        <div className={SettingsStyle['header']}>
          <h6 className={SettingsStyle['header-title']}>Settings</h6>
          <div className={SettingsStyle['inputBox_container']}>
            <div className={SettingsStyle['input-box']}>
              <SearchIcon />
              <input
                className={SettingsStyle['inputBox']}
                id='inputBox'
                type='text'
                placeholder='Search For Products'
              />
            </div>
          </div>
          <UserProfile />
        </div>
        <div className={SettingsStyle['content']}>
          <SettingsPage />
        </div>
      </div>
    </>
  );
};

export default React.memo(AdminSettings);
