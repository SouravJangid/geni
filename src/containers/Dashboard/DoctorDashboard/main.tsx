import React from 'react';
import DashboardStyle from './Dashboard.module.scss';
import { Container, Box } from '@mui/material';
import PatientsList from './Components/Overview/PatientLists';
import QueryList from './Components/Queries/QueriesList';
import StatCard from './Components/Card/Card';
import UserProfile from 'components/Layout/UserProfile';
import WriteAnswer from './Components/Answer/writeAnswer';
import useAnswerVisibility from './hooks/useAnswerVisibility';

const Main: React.FC = React.memo(() => {
  const { handleCloseClick, handleWriteAnswerClick, isWriteAnswerVisible } = useAnswerVisibility();
  return (
    <div className={DashboardStyle['container']}>
      <div className={DashboardStyle['header']}>
        <h6 className={DashboardStyle['header-title']}>Dashboard</h6>
        <UserProfile />
      </div>
      <div className={DashboardStyle['profit-lose']}>
        <Container className={DashboardStyle['overview']}>
          <Container className={DashboardStyle['subBox']}>
            <StatCard title="No of Doctor's" count={4} percentage={20} isProfit={true} />
          </Container>
          <Container className={DashboardStyle['subBox']}>
            <StatCard title='No of Patient' count={12} percentage={20} isProfit={true} />
          </Container>
          <Container className={DashboardStyle['subBox']}>
            <StatCard title='No of Queries' count={20} percentage={10} isProfit={false} />
          </Container>
          <Container className={DashboardStyle['subBox']}>
            <StatCard title='No of Booking' count={4} percentage={20} isProfit={true} />
          </Container>
          <Container className={DashboardStyle['subBox']}>
            <StatCard title='Booking Conversation Rate' count={50} percentage={20} isProfit={true} />
          </Container>
        </Container>
      </div>
      <div className={DashboardStyle['view']}>
        <Box className={DashboardStyle['mid']}>
          <Box className={DashboardStyle['left-box']}>
            <PatientsList />
          </Box>
          <Box className={DashboardStyle['right-box']}>
            <QueryList handleWriteAnswerClick={handleWriteAnswerClick} />
          </Box>
        </Box>
      </div>
      {isWriteAnswerVisible && <WriteAnswer handleCloseClick={handleCloseClick} />}
    </div>
  );
});

export default Main;
