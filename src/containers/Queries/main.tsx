import React from 'react';
import Chat from './Components/Chat/index';
import Answer from './Components/Answer/index';
import WriteAnswer from './Components/Answer/writeAnswer';
import ViewAnswer from './Components/Answer/viewAnswer';
import useAnswerVisibility from './Components/hooks/useAnswerVisibility';
import QueriesStyle from './Queries.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import UserProfile from 'components/Layout/UserProfile';

const Queries: React.FC = () => {
  const {
    isAnswerVisible,
    handleAnswerClick,
    handleCloseClick,
    handleWriteAnswerClick,
    isWriteAnswerVisible,
    viewAnswerVisible,
    handleViewAnswerClick,
  } = useAnswerVisibility();
  return (
    <div className={QueriesStyle['container']}>
      <div className={QueriesStyle['header']}>
        <h6 className={QueriesStyle['header-title']}>Queries</h6>
        <div className={QueriesStyle['inputBox_container']}>
          <div className={QueriesStyle['input-box']}>
            <SearchIcon />
            <input className={QueriesStyle['inputBox']} id='inputBox' type='text' placeholder='Search For Products' />
          </div>
        </div>
        <UserProfile />
      </div>
      <div className={QueriesStyle['wrapper']}>
        <Chat
          handleAnswerClick={handleAnswerClick}
          handleWriteAnswerClick={handleWriteAnswerClick}
          isAnswerVisible={isAnswerVisible}
          isWriteAnswerVisible={isWriteAnswerVisible}
          viewAnswerVisible={viewAnswerVisible}
        />
        {isAnswerVisible && (
          <Answer handleCloseClick={handleCloseClick} handleViewAnswerClick={handleViewAnswerClick} />
        )}
        {isWriteAnswerVisible && <WriteAnswer handleCloseClick={handleCloseClick} />}
        {viewAnswerVisible && <ViewAnswer handleCloseClick={handleCloseClick} />}
      </div>
    </div>
  );
};

export default React.memo(Queries);
