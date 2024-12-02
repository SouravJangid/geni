import React, { useState, useCallback, useRef } from 'react';
import { Button, Box, Modal } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import UploadIcon from '@mui/icons-material/Upload';
import CancelIcon from '@mui/icons-material/Cancel';
import toast from 'react-hot-toast';
import star from 'assets/images/Icon.png';
import HeaderStyle from './Header.module.scss';
import { useUploadFile } from 'containers/UploadFiles/hooks/useUploadFile';
import UserProfile from 'components/Layout/UserProfile';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0); // Progress in MB
  const { getFileUploadApi } = useUploadFile();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE_MB = 200;

  const handleFileUpload = useCallback(
    (files: FileList) => {
      const totalSize = Array.from(files).reduce((acc, file) => acc + file.size / (1024 * 1024), 0);
      if (progress + totalSize > MAX_SIZE_MB) {
        toast.error('File size exceeds 200MB limit!');
        return;
      }

      setUploadedFiles((prev) => [...prev, ...Array.from(files)]);
      setProgress((prev) => prev + totalSize);

      // Simulating file upload API call
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append('file', file));
      getFileUploadApi(formData);

      toast.success('File uploaded successfully!');
    },
    [progress, getFileUploadApi],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileRemove = (index: number) => {
    const fileToRemove = uploadedFiles[index];
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setProgress((prev) => prev - fileToRemove.size / (1024 * 1024));
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setUploadedFiles([]);
    setProgress(0);
  };

  return (
    <div className={HeaderStyle['header']}>
      <img src={star} alt='star' />
      <div className={HeaderStyle['header-container']}>
        <h6 className={HeaderStyle['header-text']}>Contribution</h6>
        <h6 className={HeaderStyle['header-text-2']}>By Adding files here you contribute in training the AI</h6>
      </div>
      <Button
        className={HeaderStyle['upload-data-btn']}
        variant='contained'
        endIcon={<CloudUploadIcon />}
        onClick={() => setModalOpen(true)}
      >
        Upload Data
      </Button>
      <UserProfile />

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div className={HeaderStyle['modal']}>
          <div className={HeaderStyle['modal-header']}>
            <div className={HeaderStyle['icon-container-1']}>
              <PermMediaIcon sx={{ color: 'rgb(14, 142, 174)' }} onClick={() => inputFileRef.current?.click()} />
              <input
                type='file'
                multiple
                hidden
                ref={inputFileRef}
                onChange={(e) => handleFileUpload(e.target.files!)}
              />
            </div>
            <div className={HeaderStyle['icon-container-2']}>
              <UploadIcon sx={{ color: 'green' }} />
            </div>
            <div className={HeaderStyle['icon-container-3']}>
              <CancelIcon sx={{ color: 'red' }} onClick={handleModalClose} />
            </div>
            <div className={HeaderStyle['progress-bar']}>
              <div className={HeaderStyle['progress-container']}>
                <div
                  className={HeaderStyle['progress-fill']}
                  style={{ width: `${(progress / MAX_SIZE_MB) * 100}%` }}
                ></div>
              </div>
              <span>{`${progress.toFixed(1)}MB / ${MAX_SIZE_MB}MB`}</span>
            </div>
          </div>

          <Box className={HeaderStyle['dropzone']} onDragOver={handleDragOver} onDrop={handleDrop}>
            Drag and Drop Your File Here
          </Box>
          <div className={HeaderStyle['file-list']}>
            {uploadedFiles.map((file, index) => (
              <div key={index} className={HeaderStyle['file-item']}>
                <span>{file.name}</span>
                <span>{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                <CancelIcon className={HeaderStyle['red-icon']} onClick={() => handleFileRemove(index)} />
              </div>
            ))}
          </div>
          <Button variant='contained' color='secondary' onClick={handleModalClose} className={HeaderStyle['close-btn']}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
