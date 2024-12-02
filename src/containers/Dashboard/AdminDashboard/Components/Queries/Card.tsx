import React from 'react';
import QueriesStyle from './Queries.module.scss';
import { Chip, Typography } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

interface CardProps {
  text: string;
  date: string;
  author: string;
  answers: number;
}

const Card: React.FC<CardProps> = ({ text, date, author, answers }) => {
  return (
    <div className={QueriesStyle['card-container']}>
      <div className={QueriesStyle['details']}>
        <p>{text}</p>

        <div className={QueriesStyle['meta-info']}>
          <div className={QueriesStyle['left']}>
            <Chip icon={<CalendarTodayOutlinedIcon />} label={date} className={QueriesStyle['info-item']} />
            <Chip icon={<PersonOutlineRoundedIcon />} label={`by ${author}`} className={QueriesStyle['info-item']} />
            <Chip icon={<InsertEmoticonIcon />} label={`${answers} Answers`} className={QueriesStyle['info-item']} />
          </div>
          <Typography className={QueriesStyle['answer-button']}>Answer</Typography>
        </div>
      </div>
    </div>
  );
};

export default Card;
