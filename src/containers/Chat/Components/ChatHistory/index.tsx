import React, { useEffect, useRef, useState } from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
  Box,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ChatHistoryStyle from './ChatHistory.module.scss';
// effect
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// api
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { useChatContext } from 'containers/Chat/state';
import { ActionsType } from 'containers/Chat/state/actions';
interface MessageMetadata {
  name?: string;
  timestamp?: string;
}
interface ChatMessage {
  _id: string;
  metadata: MessageMetadata;
  chat_type: string;
}

const ChatHistory: React.FC<any> = () => {
  const { dispatch } = useChatContext();
  // console.log('there all are state ', state.messages.length);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const listEndRef = useRef<HTMLDivElement | null>(null);

  const getList = async () => {
    callOpenApi({ method: 'Get', url: '/api/chat/metadata' });
    // callOpenApi({ method: 'Get', url: '/api/chat/metadata?limit=100&page=1' });
  };
  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSuccess(res: AxiosResponse) {
    // console.log('success', res);
    if (res.data) {
      // console.log('data', res.data.data.result[0].metadata.name);
      setHistory(res.data.data.result);
    }
  }
  function onError(err: AxiosErrorResponseType) {
    console.log('error', err);
  }

  const handleSelectChat = (_id: string) => {
    dispatch({ type: ActionsType.CHAT_ID, payload: _id });
    // console.log('after load chat history: ' + state.chat_Id);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessage(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const handleRemove = () => {
    if (selectedMessage !== null) {
      setHistory((prevMessages) => prevMessages.filter((msg) => msg._id !== selectedMessage));
      setSelectedMessage(null);
    }
    handleClose();
  };

  const handleNewChat = () => {
    dispatch({ type: ActionsType.NEW_CHAT });
    getList();
    // console.log('neChat messages length: ' + state.messages.length);
    // setHistory([]);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <div className={ChatHistoryStyle['chat-history-container']}>
      <div className={ChatHistoryStyle['top']}>
        <Typography variant='h5' className={ChatHistoryStyle['header']}>
          Chat History
        </Typography>
        <Typography className={ChatHistoryStyle['clear-chat']}>Clear chat</Typography>
      </div>

      <div className={ChatHistoryStyle['sbutton']}>
        <Box className={ChatHistoryStyle['search-box']}>
          <TextField
            variant='standard'
            placeholder='Search'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment className={ChatHistoryStyle['search-icon']} position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            className={ChatHistoryStyle['searchBar']}
          />
          <List className={ChatHistoryStyle['chat-list']}>
            <TransitionGroup>
              {history.map((message) => (
                <CSSTransition key={message._id} timeout={500} classNames={'fade'}>
                  <ListItem
                    onMouseEnter={() => setActiveMessage(message._id)} // Set active on hover
                    onMouseLeave={() => setActiveMessage(null)} // Clear active on mouse leave
                    key={message._id}
                    // className={ChatHistoryStyle['chat-item']}
                    className={`${ChatHistoryStyle['chat-item']} ${activeMessage === message._id ? ChatHistoryStyle['active'] : ''}`}
                  >
                    <div className={ChatHistoryStyle['sidetogle']}></div>
                    <ListItemText
                      onClick={() => handleSelectChat(message._id)}
                      primary={message.metadata?.name || ''}
                      className={ChatHistoryStyle['text']}
                      sx={{ '& span': { fontFamily: 'outfit' } }}
                    />
                    <IconButton
                      className={ChatHistoryStyle['icon-button']}
                      onClick={(e) => handleClick(e, message._id)}
                    >
                      <MoreVertIcon className={ChatHistoryStyle['moreverticon']} />
                    </IconButton>
                    <Menu
                      className={ChatHistoryStyle['icon-button']}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedMessage === message._id)}
                      onClose={handleClose}
                    >
                      <MenuItem className={ChatHistoryStyle['menu-item']} onClick={handleRemove}>
                        Remove
                      </MenuItem>
                    </Menu>
                  </ListItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
            <div ref={listEndRef} />
          </List>
        </Box>
        {/* New Chat Button */}
        <Button
          variant='contained'
          color='primary'
          onClick={handleNewChat}
          className={ChatHistoryStyle['new-chat-button']}
          style={{
            position: 'absolute',
            // bottom: '20px',
            // top: '85%',
            left: '35%',
            // transform: 'translateX(-50%)',
            // boxShadow: 'none',
            backgroundColor: '#CFDAFF',
            color: '#0761E9',
            borderRadius: '50px',
            // padding: '10px 20px',
            textTransform: 'none',
            marginBottom: '-1.5em',
          }}
        >
          New chat +
        </Button>
      </div>
    </div>
  );
};

export default ChatHistory;
