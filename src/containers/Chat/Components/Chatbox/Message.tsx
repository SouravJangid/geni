import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
// import CachedIcon from '@mui/icons-material/Cached';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatboxStyle from './Chatbox.module.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MessageBubbleProps {
  message: string;
  sender_id: string;
  isLatest?: boolean;
  isLoading?: boolean;
  responce_by?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message = '',
  sender_id,
  // isLoading = false,
  isLatest = false,
  // responce_by,
}) => {
  // const formattedMessage = <div dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, '<br />') }}></div>;
  const [displayedMessage, setDisplayedMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(true);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsUser(sender_id !== '671516b41bab9066495d96e0'); // Update only when sender_id changes
  }, [sender_id]);

  useEffect(() => {
    setDisplayedMessage(''); // Reset to default (empty) after 2 seconds
    // Ensure the message is trimmed and checked
    const trimmedMessage = message.trim();
    if (!isUser && isLatest && trimmedMessage) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        let index = 0;
        const interval = setInterval(() => {
          setDisplayedMessage((prev) => prev + trimmedMessage[index - 1]);
          if (index >= trimmedMessage.length - 1) clearInterval(interval); // Stop when all characters are displayed
          index++;
        }, 4);
        return () => clearInterval(interval); // Cleanup on unmount
      }, 4000); // Show loading for 4 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    } else {
      setDisplayedMessage(trimmedMessage); // Set message directly if it's from the user
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, isUser, isLatest]);

  // Scroll to the latest message whenever displayedMessage updates
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessage]);

  const renderMessage = (message_text: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(message_text)) !== null) {
      const [fullMatch, language, code] = match;

      if (match.index > lastIndex) {
        const textBeforeCode = message_text.slice(lastIndex, match.index);
        parts.push(renderTextWithFormatting(textBeforeCode, boldRegex));
      }

      parts.push(
        <SyntaxHighlighter key={match.index} style={dark} language={language || 'plaintext'}>
          {code.trim()}
        </SyntaxHighlighter>,
      );

      lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < message_text.length) {
      parts.push(renderTextWithFormatting(message_text.slice(lastIndex), boldRegex));
    }

    return parts;
  };

  const renderTextWithFormatting = (message_text: string, boldRegex: RegExp) => {
    const elements = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(message_text)) !== null) {
      const [fullMatch, boldText] = match;

      if (match.index > lastIndex) {
        elements.push(message_text.slice(lastIndex, match.index));
      }

      elements.push(
        <strong key={match.index} style={{ fontWeight: 600, color: '#333' }}>
          {boldText}
        </strong>,
      );

      lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < message_text.length) {
      elements.push(message_text.slice(lastIndex));
    }

    return (
      <span>
        {elements.map((part, i) =>
          typeof part === 'string'
            ? part.split('\n').map((line, index) => (
                <React.Fragment key={i + '-' + index}>
                  {line}
                  {index < part.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))
            : part,
        )}
      </span>
    );
  };
  //

  return (
    <>
      <Box sx={{ display: 'flex', alignSelf: isUser ? 'flex-end' : 'flex-start', marginBottom: '0.2em' }}>
        {/* <Tooltip title={responce_by}> */}
        <Tooltip title={''}>
          <IconButton size='small' sx={{ marginRight: '0.2em' }}>
            {isUser ? <PersonIcon /> : <SmartToyIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        className={ChatboxStyle[`message-bubble ${isUser ? 'user' : 'bot'}`]}
        sx={{
          fontFamily: 'outfit',
          backgroundColor: isUser ? '#F2F2F2' : '#F1F7FF',
          alignSelf: isUser ? 'flex-end' : 'flex-start',
          margin: isUser ? '4px 0' : '4px 0 40px 0',
          color: 'black',
          padding: '10px 14px',
          borderRadius: '18px',
          maxWidth: '75%',
          position: 'relative',
          display: 'flow',
        }}
      >
        {!isUser && isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(3)].map((_, index) => (
              <span key={index} className={`${ChatboxStyle['dot']} ${ChatboxStyle[`dot-${index}`]}`} />
            ))}
          </Box>
        ) : (
          renderMessage(displayedMessage)
        )}
        {/* {formattedMessage} */}
        {/* {!sender_id && (
        <Box className={ChatboxStyle['regenerate-text']}>
          {isLatest && (
            <Tooltip title='Re-Generate Response'>
              <IconButton onClick={onRegenerate} className={ChatboxStyle['regenerate-res']}>
                Re-Generate Response
                <CachedIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title='Copy'>
            <IconButton onClick={onCopy} className={ChatboxStyle['copy']}>
              <ContentCopyIcon fontSize='small' sx={{ transform: 'scaleX(-1)' }} />
            </IconButton>
          </Tooltip>
        </Box>
      )} */}
        <div ref={messageEndRef} />
      </Box>
    </>
  );
};

export default MessageBubble;
