import React from 'react';
import FilesStyles from './Files.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import file from 'assets/images/file-text.png';

const Files: React.FC = () => {
  return (
    <>
      <div className={FilesStyles['container']}>
        <div className={FilesStyles['files-layout']}>
          <Card className={FilesStyles['file-layout']}>
            <CardContent className={FilesStyles['layout']}>
              <img src={file} alt='PDF' />
              <h6 className={FilesStyles['text-1']}>PDF</h6>
            </CardContent>

            <Divider />
            <div className={FilesStyles['footer']}>
              <div className={FilesStyles['text-container']}>
                <h6 className={FilesStyles['text-2']}>Report_Alpha1</h6>
                <h6 className={FilesStyles['text-3']}>23 Feb 2023, 6:08 PM (IST)</h6>
              </div>
              <CardActions>
                <MoreVertIcon className={FilesStyles['icon']} />
              </CardActions>
            </div>
          </Card>
        </div>
        <div className={FilesStyles['files-layout']}>
          <Card className={FilesStyles['file-layout']}>
            <CardContent className={FilesStyles['layout']}>
              <img src={file} alt='PDF' />
              <h6 className={FilesStyles['text-1']}>PDF</h6>
            </CardContent>

            <Divider />
            <div className={FilesStyles['footer']}>
              <div className={FilesStyles['text-container']}>
                <h6 className={FilesStyles['text-2']}>Report_Alpha1</h6>
                <h6 className={FilesStyles['text-3']}>23 Feb 2023, 6:08 PM (IST)</h6>
              </div>
              <CardActions>
                <MoreVertIcon className={FilesStyles['icon']} />
              </CardActions>
            </div>
          </Card>
        </div>
        <div className={FilesStyles['files-layout']}>
          <Card className={FilesStyles['file-layout']}>
            <CardContent className={FilesStyles['layout']}>
              <img src={file} alt='PDF' />
              <h6 className={FilesStyles['text-1']}>PDF</h6>
            </CardContent>

            <Divider />
            <div className={FilesStyles['footer']}>
              <div className={FilesStyles['text-container']}>
                <h6 className={FilesStyles['text-2']}>Report_Alpha1</h6>
                <h6 className={FilesStyles['text-3']}>23 Feb 2023, 6:08 PM (IST)</h6>
              </div>
              <CardActions>
                <MoreVertIcon className={FilesStyles['icon']} />
              </CardActions>
            </div>
          </Card>
        </div>
        <div className={FilesStyles['files-layout']}>
          <Card className={FilesStyles['file-layout']}>
            <CardContent className={FilesStyles['layout']}>
              <img src={file} alt='PDF' />
              <h6 className={FilesStyles['text-1']}>PDF</h6>
            </CardContent>

            <Divider />
            <div className={FilesStyles['footer']}>
              <div className={FilesStyles['text-container']}>
                <h6 className={FilesStyles['text-2']}>Report_Alpha1</h6>
                <h6 className={FilesStyles['text-3']}>23 Feb 2023, 6:08 PM (IST)</h6>
              </div>
              <CardActions>
                <MoreVertIcon className={FilesStyles['icon']} />
              </CardActions>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default React.memo(Files);
