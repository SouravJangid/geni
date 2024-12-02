import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChatStyle from './Chat.module.scss';
import ChatHistory from './Components/ChatHistory';
import Chatbox from './Components/Chatbox';
import UserProfile from 'components/Layout/UserProfile';
// import useChat from './hooks/useChat';

const Chat: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={ChatStyle['container']}>
      <div className={ChatStyle['header']}>
        <h6 className={ChatStyle['header-title']}>Chat</h6>
        <Link className={`${ChatStyle['AI-Upload']}`} to='/sharedfiles'>
          <Button variant='contained' className={ChatStyle['contributeButton']}>
            Contribute to AI
            <AutoAwesomeIcon className={ChatStyle['sparkle']} />
          </Button>
        </Link>
        <UserProfile />
      </div>
      <div className={ChatStyle['chat']}>
        <div className={ChatStyle['chat-history']}>
          <ChatHistory
          //  loadChatHistory={loadChatHistory}
          />
        </div>
        <div className={ChatStyle['chat-box']}>
          <Chatbox
          // messages={messages}
          // inputValue={inputValue}
          // setInputValue={setInputValue}
          // handleSend={handleSend}
          // messagesEndRef={messagesEndRef}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chat);
