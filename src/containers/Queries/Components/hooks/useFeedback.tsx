import { useState } from 'react';

export const useFeedback = () => {
  const [thumbUpActive, setThumbUpActive] = useState(false);
  const [thumbDownActive, setThumbDownActive] = useState(false);

  const handleThumbUpClick = () => {
    setThumbUpActive(true);
    setThumbDownActive(false); // Only one icon active at a time
  };

  const handleThumbDownClick = () => {
    setThumbUpActive(false);
    setThumbDownActive(true); // Only one icon active at a time
  };

  return { thumbUpActive, thumbDownActive, handleThumbUpClick, handleThumbDownClick };
};
