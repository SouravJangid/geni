import React from 'react';
import { Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import ChatStyle from './Chat.module.scss';

interface ChatProps {
  handleAnswerClick: () => void;
  handleWriteAnswerClick: () => void;
  viewAnswerVisible: boolean;
  isAnswerVisible: boolean;
  isWriteAnswerVisible: boolean;
}

const Chat: React.FC<ChatProps> = ({
  handleAnswerClick,
  handleWriteAnswerClick,
  viewAnswerVisible,
  isAnswerVisible,
  isWriteAnswerVisible,
}) => {
  return (
    <div
      className={
        viewAnswerVisible || isAnswerVisible || isWriteAnswerVisible
          ? ChatStyle['container-expanded']
          : ChatStyle['container-default']
      }
    >
      <div className={ChatStyle['header']}>
        <div className={ChatStyle['header-content']}>
          <Button>All 20</Button>
          <Button>Cancer 5</Button>
          <Button>Blood Pressure 5</Button>
          <Button>Feedback 5</Button>
        </div>
      </div>
      <div className={ChatStyle['queries']}>
        <div className={ChatStyle['queries-content-1']}>
          <h2 className={ChatStyle['text']}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text
            of the printing and typesetting industry.
          </h2>
          <div className={ChatStyle['footer']}>
            <Button>
              <CalendarTodayIcon />
              23 sep 2024
            </Button>
            <Button>
              <PersonOutlineOutlinedIcon />
              by Anna Sharma
            </Button>
            <Button onClick={handleAnswerClick}>
              <InsertEmoticonOutlinedIcon />3 Answers
            </Button>
            <Button className={ChatStyle['answer-btn']} onClick={handleWriteAnswerClick}>
              Answer
            </Button>
          </div>
        </div>
        <div className={ChatStyle['queries-content-2']}>
          <h2 className={ChatStyle['text']}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text
            of the printing and typesetting industry.
          </h2>
          <div className={ChatStyle['footer']}>
            <Button>
              <CalendarTodayIcon />
              23 sep 2024
            </Button>
            <Button>
              <PersonOutlineOutlinedIcon />
              by Anna Sharma
            </Button>
            <Button onClick={handleAnswerClick}>
              <InsertEmoticonOutlinedIcon />3 Answers
            </Button>
            <Button className={ChatStyle['answer-btn']}>Answer</Button>
          </div>
        </div>
        <div className={ChatStyle['queries-content-3']}>
          <h2 className={ChatStyle['text']}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text
            of the printing and typesetting industry.
          </h2>
          <div className={ChatStyle['footer']}>
            <Button>
              <CalendarTodayIcon />
              23 sep 2024
            </Button>
            <Button>
              <PersonOutlineOutlinedIcon />
              by Anna Sharma
            </Button>
            <Button onClick={handleAnswerClick}>
              <InsertEmoticonOutlinedIcon />3 Answers
            </Button>
            <Button className={ChatStyle['answer-btn']}>Answer</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
