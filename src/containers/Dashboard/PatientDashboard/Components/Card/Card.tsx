import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import StartCardStyle from './StatCard.module.scss';

interface StatCardProps {
  title: string;
  count: number;
  percentage: number;
  isProfit: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, percentage, isProfit }) => {
  return (
    <div className={StartCardStyle['stat-container']}>
      <Card className={StartCardStyle['stat-card']}>
        <CardContent className={StartCardStyle['stat-content']}>
          <Typography variant='body2' className={StartCardStyle['stat-title']}>
            {title}
          </Typography>
          <div className={StartCardStyle['stat-box1']}>
            <Typography variant='h6'>{count}</Typography>
            <Box
              className={StartCardStyle['stat-percentage']}
              style={{ backgroundColor: isProfit ? '#D4FFEB' : '#FFD4D4' }}
            >
              {isProfit ? <TrendingUpIcon /> : <TrendingDownIcon />}
              <Typography variant='body1'>{percentage}%</Typography>
            </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(StatCard);
