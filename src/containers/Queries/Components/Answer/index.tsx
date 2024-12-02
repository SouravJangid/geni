import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import AnswerStyle from './Answer.module.scss';
import Divider from '@mui/material/Divider';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useFeedback } from '../hooks/useFeedback';
import image from 'assets/images/pdficon.png';
import { FeedbackDialog } from './FeedbackDialog';

interface AnswerProps {
  handleCloseClick: () => void;
  handleViewAnswerClick: () => void;
}

const Answer: React.FC<AnswerProps> = ({ handleCloseClick, handleViewAnswerClick }) => {
  const { thumbUpActive, thumbDownActive, handleThumbUpClick, handleThumbDownClick } = useFeedback();
  const [openFeedback, setOpenFeedback] = useState(false);

  const handleOpenFeedback = () => {
    setOpenFeedback(true);
  };

  const handleCloseFeedback = () => {
    setOpenFeedback(false);
  };
  return (
    <div className={AnswerStyle['answer-container']}>
      <div className={AnswerStyle['answer-header']}>
        <h2 className={AnswerStyle['head-title']}> Questions</h2>
        <Button onClick={handleCloseClick} className={AnswerStyle['head-title']}>
          Close
        </Button>
      </div>
      <h2 className={AnswerStyle['text']}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of
        the printing and typesetting industry.
      </h2>
      <div className={AnswerStyle['answer-body']}>
        <h2 className={AnswerStyle['head-title']}> Answers</h2>
        <div className={AnswerStyle['answer-content']}>
          <div className={AnswerStyle['nav']}>
            <Button>
              <CalendarTodayIcon />
              23 sep 2024
            </Button>
            <Button>
              <PersonOutlineOutlinedIcon />
              by Anna Sharma
            </Button>
          </div>
          <h2 className={AnswerStyle['text']}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text
            of the printing and typesetting industry.
            <Button onClick={handleViewAnswerClick} className={AnswerStyle['toggle-button']}>
              Read more
            </Button>
          </h2>{' '}
          <Box className={AnswerStyle['image-box']}>
            <img src={image} className={AnswerStyle['every-image']} alt='Uploaded file' />
          </Box>
          <Divider />
          <br />
          <div className={AnswerStyle['footer']}>
            <div className={AnswerStyle['icons-container']}>
              <ThumbUpOffAltIcon
                onClick={handleThumbUpClick}
                className={thumbUpActive ? AnswerStyle['thumb-up-active'] : ''}
              />
              <ThumbDownOffAltIcon
                onClick={handleThumbDownClick}
                className={thumbDownActive ? AnswerStyle['thumb-down-active'] : ''}
              />
            </div>

            <h2 className={AnswerStyle['head-title']} onClick={handleOpenFeedback}>
              Feedback
            </h2>
          </div>
        </div>
      </div>
      {/* Feedback Dialog */}
      <FeedbackDialog open={openFeedback} handleClose={handleCloseFeedback} />
    </div>
  );
};

export default Answer;
