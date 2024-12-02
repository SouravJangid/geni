import React, { useEffect } from 'react';
import UploadFileLayoutStyle from './UploadFileLayout.module.scss';
import GridView from '../GridView';
import ListView from '../ListView';
import UploadFileLayoutHeader from '../UploadFileLayoutHeader';
import { useUploadFileContext } from 'containers/UploadFiles/state';
import { useUploadFile } from 'containers/UploadFiles/hooks/useUploadFile';
import FileDetailsModal from '../FileDetailsModal';

const Grid: React.FC = () => {
  const {
    state: { isGridLayout = false, activeFileId = '' },
  } = useUploadFileContext();

  const { getFileListApi, setActiveFileId, fileDownloadApiCall } = useUploadFile();

  useEffect(() => {
    getFileListApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileDownloadClick = () => {
    fileDownloadApiCall(activeFileId);
    // Add logic to handle file download click event (e.g., download the
  };

  return (
    <div className={UploadFileLayoutStyle['container']}>
      <UploadFileLayoutHeader />
      {isGridLayout ? <GridView /> : <ListView />}
      {activeFileId && (
        <FileDetailsModal onClose={() => setActiveFileId('')} handleFileDownloadClick={handleFileDownloadClick} />
      )}
    </div>
  );
};

export default React.memo(Grid);
