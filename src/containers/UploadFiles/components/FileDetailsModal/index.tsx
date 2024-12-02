import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, IconButton, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import Image from 'assets/images/file-detail-dummy.png'; // replace with your image path
import FileDetailsModalStyle from './FileDetailsModal.module.scss';

function FileDetailsModal({
  onClose,
  handleFileDownloadClick,
}: {
  onClose: () => void;
  handleFileDownloadClick: () => void;
}) {
  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      classes={{
        root: FileDetailsModalStyle['file-details-modal'],
        paper: FileDetailsModalStyle['file-details-paper'],
      }}
    >
      <DialogTitle>
        File Details
        <IconButton aria-label='close' onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={FileDetailsModalStyle['file-details-content']}>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body1'>File Name</Typography>
          <Typography variant='body2' color='text.secondary'>
            Health_report.pdf
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body1'>Size</Typography>
          <Typography variant='body2' color='text.secondary'>
            12MB
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body1'>Uploaded on</Typography>
          <Typography variant='body2' color='text.secondary'>
            23 Feb 2023, 4:08 PM (IST)
          </Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            mb: 3,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: 'grey.200',
          }}
        >
          <img src={Image} alt='File preview' style={{ width: '100%', height: 'auto' }} />
        </Box>

        <Box marginTop='auto' display='flex' justifyContent='space-between'>
          <Button variant='outlined' startIcon={<ShareIcon />}>
            Share
          </Button>
          <Button variant='contained' color='primary' startIcon={<DownloadIcon />} onClick={handleFileDownloadClick}>
            Download
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default FileDetailsModal;
