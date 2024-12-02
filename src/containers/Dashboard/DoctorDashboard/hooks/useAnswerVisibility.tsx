import { useState } from 'react';

const useAnswerVisibility = () => {
  const [isWriteAnswerVisible, setWriteAnswerVisible] = useState(false);

  const handleWriteAnswerClick = () => {
    setWriteAnswerVisible(true);
  };

  const handleCloseClick = () => {
    setWriteAnswerVisible(false);
  };

  return {
    isWriteAnswerVisible,
    handleCloseClick,
    handleWriteAnswerClick,
  };
};

export default useAnswerVisibility;
