import React from 'react';
import GridStyle from './GridView.module.scss';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import file from 'assets/images/Rectangle.png';
import FileMoreOptionsMenu from '../FileMoreOptionsMenu';
import { useUploadFileContext } from 'containers/UploadFiles/state';
import clsx from 'clsx';
import { useUploadFile } from 'containers/UploadFiles/hooks/useUploadFile';

const GridView: React.FC = () => {
  const {
    state: { uploadFileList = [] },
  } = useUploadFileContext();

  const { setActiveFileId } = useUploadFile();

  return (
    <div className={GridStyle['grid-container']}>
      {uploadFileList.map(({ _id, file_name }) => (
        <div className={GridStyle['files-layout']} key={_id} onClick={() => setActiveFileId(_id)}>
          <Card className={GridStyle['file-layout']}>
            <CardContent className={GridStyle['layout']}>
              <InsertDriveFileIcon className={GridStyle['file-icon']} />
              <h6 title={file_name} className={clsx(GridStyle['text-1'], GridStyle['ellipsis'])}>
                {file_name}
              </h6>
              <FileMoreOptionsMenu fileId={_id} />
            </CardContent>
            <div className={GridStyle['img']}>
              {/* <img src={`${process.env.BE_SERVER_ADDRESS}/${file_path}`} alt='image' /> */}
              <img src={file} alt='image' />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default GridView;
