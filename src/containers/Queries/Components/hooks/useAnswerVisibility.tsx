import { useState } from 'react';

const useAnswerVisibility = () => {
  const [isAnswerVisible, setAnswerVisible] = useState(false);
  const [isWriteAnswerVisible, setWriteAnswerVisible] = useState(false);
  const [viewAnswerVisible, setViewAnswerVisible] = useState(false);

  const handleViewAnswerClick = () => {
    setViewAnswerVisible(true);
    setAnswerVisible(false);
    setWriteAnswerVisible(false);
  };

  const handleAnswerClick = () => {
    setAnswerVisible(true);
    setWriteAnswerVisible(false);
    setViewAnswerVisible(false);
  };

  const handleWriteAnswerClick = () => {
    setWriteAnswerVisible(true);
    setAnswerVisible(false);
    setViewAnswerVisible(false);
  };

  const handleCloseClick = () => {
    setAnswerVisible(false);
    setWriteAnswerVisible(false);
    setViewAnswerVisible(false);
  };

  return {
    isAnswerVisible,
    isWriteAnswerVisible,
    viewAnswerVisible,
    handleAnswerClick,
    handleCloseClick,
    handleWriteAnswerClick,
    handleViewAnswerClick,
  };
};

export default useAnswerVisibility;
