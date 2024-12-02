import React, { useState } from 'react';
import { Box, Button, IconButton, TextField, Typography, Divider } from '@mui/material';
import AnswerStyle from './Answer.module.scss';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import pdfIcon from 'assets/images/pdficon.png';

interface AnswerProps {
  handleCloseClick: () => void;
}

interface UploadedFile {
  file: File;
  preview: string;
  type: string;
}

const WriteAnswer: React.FC<AnswerProps> = ({ handleCloseClick }) => {
  const [answer, setAnswer] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => {
        const fileType = file.type;
        let preview = '';

        if (fileType.startsWith('image/')) {
          preview = URL.createObjectURL(file);
        } else if (fileType === 'application/pdf') {
          preview = pdfIcon;
        }
        return { file, preview, type: fileType };
      });
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleFileRemove = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

  const handleSave = () => {
    console.log('Saved Answer:', answer);
  };

  return (
    <div className={AnswerStyle['full-container']}>
      <div className={AnswerStyle['answer-container']}>
        <Box className={AnswerStyle['answercontainer']}>
          <Typography sx={{ fontWeight: '500' }}>Writing Answer</Typography>
          <Button onClick={handleCloseClick} className={AnswerStyle['head-title']}>
            Close
          </Button>
        </Box>
        <Divider />

        <div className={AnswerStyle['answer-header']}>
          <h2 className={AnswerStyle['head-title']}>Question</h2>
        </div>
        <h2 className={AnswerStyle['text']}>
          Doctor, I’ve been experiencing frequent headaches lately. What could be causing them, and how can I manage or
          treat them?
        </h2>
        <Divider />
        <Box className={AnswerStyle['answer-text-area']}>
          {/* answer text area */}
          <TextField
            className={AnswerStyle['text-area']}
            label='Write your answer'
            multiline
            value={answer}
            onChange={handleAnswerChange}
            variant='outlined'
            sx={{
              '& textarea': {
                height: 'auto',
                paddingTop: '25px',
              },
              '& fieldset': { border: 'none' },
            }}
            InputLabelProps={{
              style: {
                fontSize: '1rem',
                transform: 'translate(14px, 18px) scale(1)',
                transition: 'all 0.2s ease-in-out',
              },
              shrink: answer.length > 0,
            }}
          />

          {/* Uploaded file previews */}
          <div className={AnswerStyle['file-preview-container']}>
            {uploadedFiles.map((uploadedFile, index) => (
              <div key={index} className={AnswerStyle['file-preview']}>
                {uploadedFile.type.startsWith('image/') ? (
                  <img src={uploadedFile.preview} alt='uploaded preview' className={AnswerStyle['image-preview']} />
                ) : (
                  <div className={AnswerStyle['pdf-preview']}>
                    <img src={pdfIcon} alt='pdf preview' className={AnswerStyle['pdf-icon']} />
                    <span className={AnswerStyle['pdf-label']}>PDF</span>
                  </div>
                )}
                <IconButton className={AnswerStyle['remove-btn']} onClick={() => handleFileRemove(index)}>
                  <CloseIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </Box>

        {/* File input */}

        <Divider sx={{ paddingTop: '20px' }} />
        <Box className={AnswerStyle['bottom-box']}>
          <Button component='label' className={AnswerStyle['upload-btn']}>
            <AttachFileIcon sx={{ transform: 'rotate(45deg)' }} />
            <input
              type='file'
              hidden
              multiple
              accept='image/*,application/pdf,application/msword'
              onChange={handleFileUpload}
            />
          </Button>
          <Button variant='contained' color='primary' onClick={handleSave} className={AnswerStyle['save-btn']}>
            Save
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default WriteAnswer;
