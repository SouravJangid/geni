import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './constant';
import ProfileContent from '../Profile/index';
import AccountContent from '../Account/index';
import HealthContent from '../Health/index';
import OtherContent from '../Other/index';
import { useSettings } from '../hooks/useSettingshook';
import ContentStyle from './Content.module.scss';

const SettingsPage: React.FC = () => {
  const { selectedSection, handleSectionSelect } = useSettings();

  return (
    <div className={ContentStyle['container']}>
      <div className={ContentStyle['item']}>
        <Sidebar selectedSection={selectedSection} onSelect={handleSectionSelect} />
      </div>
      <div className={ContentStyle['items']}>
        <Box p={3}>
          {selectedSection === 'profile' && <ProfileContent />}
          {selectedSection === 'health' && <HealthContent />}
          {selectedSection === 'other' && <OtherContent />}
          {selectedSection === 'account' && <AccountContent />}
        </Box>
      </div>
    </div>
  );
};

export default SettingsPage;
