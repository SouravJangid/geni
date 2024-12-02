import React from 'react';
import HeadStyle from './Help.module.scss';
import Button from '@mui/material/Button';
import useHelpContent from './Components/hooks/useHelpContent';
import FaqContent from './Components/Faq/index';
import VideoContent from './Components/Videos/index';

const Head: React.FC = () => {
  const { activeContent, handleFaqClick, handleVideoClick } = useHelpContent();

  return (
    <>
      <div className={HeadStyle['container']}>
        <div className={HeadStyle['header']}>
          <h6 className={HeadStyle['header-title']}>Help Centre</h6>
          <h6 className={HeadStyle['header-lines']}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </h6>
          <br />
          <Button
            variant='contained'
            disableElevation
            onClick={handleFaqClick}
            disabled={activeContent === 'FAQ'}
            className={`${HeadStyle['header-faq-btn']} ${
              activeContent === 'FAQ' ? HeadStyle['btn-active'] : HeadStyle['btn-inactive']
            }`}
          >
            <span className={HeadStyle['btn-text']}>FAQ</span>
          </Button>
          <Button
            variant='contained'
            disableElevation
            onClick={handleVideoClick}
            disabled={activeContent === 'Videos'}
            className={`${HeadStyle['header-video-btn']} ${
              activeContent === 'Videos' ? HeadStyle['btn-active'] : HeadStyle['btn-inactive']
            }`}
          >
            <span className={HeadStyle['btn-text']}>Videos</span>
          </Button>
        </div>

        <div className={HeadStyle['content']}>
          {activeContent === 'FAQ' && <FaqContent />}
          {activeContent === 'Videos' && <VideoContent />}
        </div>
      </div>
    </>
  );
};

export default React.memo(Head);
