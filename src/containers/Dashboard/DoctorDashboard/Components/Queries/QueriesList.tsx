import React, { useState } from 'react';
import QueriesStyle from './Queries.module.scss';
import { Box, Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Card from './Card';
import CardOfAnswers from './CardOfAnswers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ChipData {
  label: string;
  count: number;
}
interface AnsProps {
  handleWriteAnswerClick: () => void;
}

interface CardData {
  text: string;
  date: string;
  author: string;
  answers: number;
  onQuestionClick: () => void;
  onAnswerClick: () => void;
}

const cardData: CardData[] = [
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '23 Sep 2024',
    author: 'Anna Sharma',
    answers: 3,
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '23 Sep 2024',
    author: 'Anna Sharma',
    answers: 3,
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '23 Sep 2024',
    author: 'Anna Sharma',
    answers: 3,
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '23 Sep 2024',
    author: 'Anna Sharma',
    answers: 3,
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '23 Sep 2024',
    author: 'Anna Sharma',
    answers: 3,
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '23 Sep 2024',
    author: 'Anna Sharma',
    answers: 3,
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '23 Sep 2024',
    author: 'Anna Sharma',
    answers: 3,
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '23 Sep 2024',
    author: 'Anna Sharma',
    answers: 3,
  },
];

const chipData: ChipData[] = [
  { label: 'All', count: 20 },
  { label: 'Cancers', count: 5 },
  { label: 'Blood Pressure', count: 5 },
  { label: 'Feedback', count: 5 },
];

const QueryList: React.FC<AnsProps> = ({ handleWriteAnswerClick }) => {
  const [activeChip, setActiveChip] = useState<string>('All');
  const [activeQuestion, setActiveQuestion] = useState<boolean>(false);
  const handleChipClick = (label: string) => {
    setActiveChip(label);
  };

  // const toggleQuestionView = () => {
  //   setActiveQuestion((prev) => !prev);
  // };

  const handleQestionAndAnswer = () => {
    setActiveQuestion((pre) => !pre);
  };

  return (
    <Box p={2} bgcolor='#fff' borderRadius='16px' className={QueriesStyle['main']}>
      {!activeQuestion ? (
        <Box className={QueriesStyle['a-main']}>
          <Box display='flex' justifyContent='space-between' mb={2} className={QueriesStyle['sab-main']}>
            <Typography variant='h6'>No of queries</Typography>
            <Typography className={QueriesStyle['view-all']}>
              <Link to='/queries' className={QueriesStyle['link']}>
                View all
              </Link>
            </Typography>
          </Box>
          <Divider />
          <Box className={QueriesStyle['chips']}>
            <div className={QueriesStyle['chip-container']}>
              {chipData.map((chip) => (
                <Chip
                  key={chip.label}
                  label={`${chip.label} ${chip.count}`}
                  onClick={() => handleChipClick(chip.label)}
                  className={activeChip === chip.label ? QueriesStyle['chip-active'] : QueriesStyle['chip']}
                />
              ))}
            </div>
          </Box>
          <Box className={QueriesStyle['queries']}>
            <div className={QueriesStyle['card-list']}>
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  text={card.text}
                  date={card.date}
                  author={card.author}
                  answers={card.answers}
                  onQuestionClick={() => handleQestionAndAnswer()}
                  onAnswerClick={() => handleWriteAnswerClick()}
                />
              ))}
            </div>
          </Box>
        </Box>
      ) : (
        <Box className={QueriesStyle['question-answers']}>
          <div className={QueriesStyle['back-button']}>
            <Box display='flex' mb={2} className={QueriesStyle['sab-main']} onClick={handleQestionAndAnswer}>
              <ArrowBackIcon fontSize='small' />
              <Typography variant='subtitle2'>Back</Typography>
            </Box>
            <Divider />
          </div>
          <Box mb={2}>
            <Typography variant='caption' color='textSecondary'>
              QUESTION
            </Typography>
            <Typography variant='body1' mt={1} mb={2}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis recusandae repellat exercitationem
              hic veritatis quibusdam tempore. Magnam suscipit quasi ex?
            </Typography>
            <Typography className={QueriesStyle['write-answer']} onClick={handleWriteAnswerClick}>
              Write Your Answer
            </Typography>
          </Box>
          <Typography mb={2} variant='caption' color='textSecondary'>
            ANSWERS
          </Typography>
          <Box className={QueriesStyle['ans-queries']}>
            <div className={QueriesStyle['ans-card-list']}>
              {cardData.map((card, index) => (
                <CardOfAnswers
                  key={index}
                  text={card.text}
                  date={card.date}
                  author={card.author}
                  answers={card.answers}
                />
              ))}
            </div>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QueryList;
