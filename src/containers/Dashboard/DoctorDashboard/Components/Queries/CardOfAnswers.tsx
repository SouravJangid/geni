import React, { useState } from 'react';
import QueriesStyle from './Queries.module.scss';
import { Chip, Divider } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { FeedbackDialog } from '../Answer/FeedbackDialog';
import { useFeedback } from '../../hooks/useFeedback';

interface CardProps {
  text: string;
  date: string;
  author: string;
  answers: number;
}

const CardOfAnswers: React.FC<CardProps> = ({ text, date, author }) => {
  const { thumbUpActive, thumbDownActive, handleThumbUpClick, handleThumbDownClick } = useFeedback();
  const [openFeedback, setOpenFeedback] = useState(false);

  const handleOpenFeedback = () => {
    setOpenFeedback(true);
  };

  const handleCloseFeedback = () => {
    setOpenFeedback(false);
  };
  return (
    <div className={QueriesStyle['card-container']}>
      <div className={QueriesStyle['details']}>
        <div className={QueriesStyle['left-ans']}>
          <Chip icon={<CalendarTodayOutlinedIcon />} label={date} className={QueriesStyle['info-item-ans']} />
          <Chip icon={<PersonOutlineRoundedIcon />} label={`by ${author}`} className={QueriesStyle['info-item-ans']} />
        </div>
        <p>{text}</p>
        <Divider className={QueriesStyle['hr-ans']} />
        <div className={QueriesStyle['feedback-ans']}>
          <div className={QueriesStyle['icons-container']}>
            <ThumbUpOffAltIcon
              onClick={handleThumbUpClick}
              className={thumbUpActive ? QueriesStyle['thumb-up-active'] : ''}
            />
            <ThumbDownOffAltIcon
              onClick={handleThumbDownClick}
              className={thumbDownActive ? QueriesStyle['thumb-down-active'] : ''}
            />
          </div>
          <h2 className={QueriesStyle['head-title']} onClick={handleOpenFeedback}>
            Feedback
          </h2>
        </div>
      </div>
      {/* Feedback Dialog */}
      <FeedbackDialog open={openFeedback} handleClose={handleCloseFeedback} />
    </div>
  );
};

export default CardOfAnswers;
