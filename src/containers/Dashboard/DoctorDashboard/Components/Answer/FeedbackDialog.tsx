import React, { useState } from 'react';
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import AnswerStyle from './Answer.module.scss';

export const FeedbackDialog: React.FC<{ open: boolean; handleClose: () => void }> = ({ open, handleClose }) => {
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const feedbackOptions = [
    'Good',
    'Excellent',
    'Unlikely to recommend',
    'Definitely would recommend',
    'Not helpful at all',
    'Dissatisfied',
  ];

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth classes={{ paper: AnswerStyle['dialog-paper'] }}>
        <Box className={AnswerStyle['dialog']}>
          <DialogTitle>Feedback</DialogTitle>
          <Divider />
          <DialogContent>
            <Box className={AnswerStyle['chip-container']}>
              {feedbackOptions.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  onClick={() => setSelectedFeedback(option)}
                  clickable
                  className={`${AnswerStyle['feedback-chip']} ${
                    selectedFeedback === option ? AnswerStyle['selected-feedback'] : ''
                  }`}
                />
              ))}
            </Box>
            <div className={AnswerStyle['feedback-textfield']}>
              <TextField
                label='Feedback'
                fullWidth
                multiline
                rows={4}
                placeholder='Feedback write here'
                variant='outlined'
              />
            </div>
          </DialogContent>
          <Divider />
          <div className={AnswerStyle['footer-button']}>
            <div className={AnswerStyle['cancel-btn']}>
              <Button onClick={handleClose}>Cancel</Button>
            </div>
            <div className={AnswerStyle['submit-btn']}>
              <Button onClick={handleClose} sx={{ color: 'white' }}>
                Send Feedback
              </Button>
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};
