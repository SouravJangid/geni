import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField, Paper, Button, Divider } from '@mui/material';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatboxStyle from './Chatbox.module.scss';
import MessageBubble from './Message';
import { useChatContext } from 'containers/Chat/state';
import useChat from 'containers/Chat/hooks/useChat';
import { ActionsType } from 'containers/Chat/state/actions';

const Chatbox: React.FC = () => {
  useChat();
  const [inputValue, setInputValue] = useState('');
  const { state, dispatch } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // console.log('All Chat Messages' + JSON.stringify(state.messages));
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      dispatch({ type: ActionsType.INPUT_VALUE, payload: inputValue });
      setInputValue('');
    }
  };

  return (
    <Paper elevation={3} className={ChatboxStyle['chat-window']} sx={{ borderRadius: '12px' }}>
      <Box className={ChatboxStyle['messages-container']}>
        {state.messages.map((message, index) => {
          // Determine if the message is the latest response from the bot
          const isLatest = index === state.messages.length - 1 && message.sender_id === '671516b41bab9066495d96e0';

          return (
            <MessageBubble
              key={message._id || index}
              message={message.message_text}
              sender_id={message.sender_id || ''}
              isLatest={isLatest}
              responce_by={message.responce_by}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      <Box className={ChatboxStyle['input-area']}>
        <Divider />
        <Box className={ChatboxStyle['chat-input-container']}>
          {/* <input type='file' onChange={handleFileChange} style={{ display: 'none' }} id='file-input' />
          <IconButton className={ChatboxStyle['attach-btn']} component='label' htmlFor='file-input'>
            <AttachFileIcon sx={{ transform: 'rotate(45deg)' }} />
          </IconButton> */}
          <Box className={ChatboxStyle['chat-input']}>
            <TextField
              className={ChatboxStyle['chat-input-field']}
              variant='standard'
              placeholder='Ask healthGeni'
              fullWidth
              InputProps={{
                disableUnderline: true,
              }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSend} className={ChatboxStyle['send-btn']} variant='contained'>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Chatbox;
