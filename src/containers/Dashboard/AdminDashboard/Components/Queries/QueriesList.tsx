import React, { useState } from 'react';
import QueriesStyle from './Queries.module.scss';
import { Box, Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Card from './Card';

interface ChipData {
  label: string;
  count: number;
}

interface CardData {
  text: string;
  date: string;
  author: string;
  answers: number;
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

const QueryList: React.FC = () => {
  const [activeChip, setActiveChip] = useState<string>('All');
  const handleChipClick = (label: string) => {
    setActiveChip(label);
  };

  return (
    <Box p={2} bgcolor='#fff' borderRadius='16px' className={QueriesStyle['main']}>
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
        <div className={QueriesStyle['card-list']} style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {cardData.map((card, index) => (
            <Card key={index} text={card.text} date={card.date} author={card.author} answers={card.answers} />
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default QueryList;
