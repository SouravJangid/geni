import React from 'react';
import Card from '@mui/material/Card';
import VideoStyles from './Videos.module.scss';
import doc from 'assets/images/doc.png';
import doctor from 'assets/images/doctor.png';
import mask from 'assets/images/mask.png';

const VideoContent: React.FC = () => {
  return (
    <div className={VideoStyles.videoContainer}>
      <Card className={VideoStyles.videoCard}>
        <img src={doc} className={VideoStyles['images']} alt='video' />
      </Card>
      <Card className={VideoStyles.videoCard}>
        <img src={doctor} className={VideoStyles['images']} alt='video' />
      </Card>
      <Card className={VideoStyles.videoCard}>
        <img src={mask} className={VideoStyles['images']} alt='video' />
      </Card>
    </div>
  );
};

export default VideoContent;
