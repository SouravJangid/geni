import { useState, useEffect } from 'react';

const useHelpContent = () => {
  const [activeContent, setActiveContent] = useState<'FAQ' | 'Videos'>('FAQ');

  const handleFaqClick = () => setActiveContent('FAQ');
  const handleVideoClick = () => setActiveContent('Videos');

  useEffect(() => {
    setActiveContent('FAQ');
  }, []);

  return {
    activeContent,
    handleFaqClick,
    handleVideoClick,
  };
};

export default useHelpContent;
