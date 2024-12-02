import React from 'react';
import EducationStyle from './Education.module.scss';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import micro from 'assets/images/micro.png';
import heart from 'assets/images/heart.png';
import run from 'assets/images/run.png';
import doc from 'assets/images/doc.png';
import { Card } from '@mui/material';

const Education: React.FC = () => {
  return (
    <div className={EducationStyle['container']}>
      <div className={EducationStyle['header']}>
        <div className={EducationStyle['header-content']}>
          <TextField
            className={EducationStyle['textField']}
            variant='outlined'
            placeholder='Ask me anything...'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button className={EducationStyle['askButton']}>Ask</Button>
                </InputAdornment>
              ),
            }}
          />
          <div className={EducationStyle['header-bottom-content']}>
            <Button>
              <h6 className={EducationStyle['text']}>
                <img src={micro} alt='logo' />
                What foods should I avoid to manage my diabetes better?
              </h6>
            </Button>
            <Button>
              <h6 className={EducationStyle['text']}>
                <img src={heart} alt='logo' />
                Can I reverse my pre-diabetes with diet and exercise?
              </h6>
            </Button>
            <Button>
              <h6 className={EducationStyle['text']}>
                <img src={run} alt='logo' />
                How can I lower my HbA1c naturally
              </h6>
            </Button>
          </div>
        </div>
      </div>
      <div className={EducationStyle['content']}>
        <div className={EducationStyle.videoContainer}>
          <Card className={EducationStyle.videoCard}>
            <img src={doc} className={EducationStyle['images']} alt='video' />
            <h6 className={EducationStyle['text']}>What foods should I avoid to manage my diabetes better?</h6>
          </Card>
          <Card className={EducationStyle.videoCard}>
            <img src={doc} className={EducationStyle['images']} alt='video' />
            <h6 className={EducationStyle['text']}>What foods should I avoid to manage my diabetes better?</h6>
          </Card>
          <Card className={EducationStyle.videoCard}>
            <img src={doc} className={EducationStyle['images']} alt='video' />
            <h6 className={EducationStyle['text']}>What foods should I avoid to manage my diabetes better?</h6>
          </Card>
        </div>
        <div className={EducationStyle.videoContainer}>
          <Card className={EducationStyle.videoCard}>
            <img src={doc} className={EducationStyle['images']} alt='video' />
            <h6 className={EducationStyle['text']}>What foods should I avoid to manage my diabetes better?</h6>
          </Card>
          <Card className={EducationStyle.videoCard}>
            <img src={doc} className={EducationStyle['images']} alt='video' />
            <h6 className={EducationStyle['text']}>What foods should I avoid to manage my diabetes better?</h6>
          </Card>
          <Card className={EducationStyle.videoCard}>
            <img src={doc} className={EducationStyle['images']} alt='video' />
            <h6 className={EducationStyle['text']}>What foods should I avoid to manage my diabetes better?</h6>
          </Card>
        </div>
      </div>
      <div className={EducationStyle['header']}></div>
      <div className={EducationStyle['content']}></div>
    </div>
  );
};

export default React.memo(Education);
