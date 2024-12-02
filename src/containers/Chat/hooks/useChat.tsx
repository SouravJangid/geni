import { useEffect, useRef } from 'react';
// api
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { chatHistoryWithId, chatUrl } from 'containers/Chat/constants';
import { useChatContext } from '../state';
import { ActionsType } from '../state/actions';
const useChat = () => {
  const { state, dispatch } = useChatContext();
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const actionHistoryRef = useRef(false);

  // useEffect(() => {
  //   console.log('Updated Messages in State:', state);
  // }, [state]);

  useEffect(() => {
    if (state.chat_Id) {
      loadChatHistory(state.chat_Id);
      // console.log('this with useEffect: ' + state.chat_Id);
      dispatch({ type: ActionsType.CHAT_ID, payload: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.chat_Id]);

  const loadChatHistory = (id: string) => {
    const getchatHistoryWithId = async () => {
      actionHistoryRef.current = true;
      callOpenApi({ method: 'GET', url: `${chatHistoryWithId}${id}` });
    };
    getchatHistoryWithId();
  };

  useEffect(() => {
    if (state.input_Value !== undefined && state.input_Value.trim()) {
      // console.log('state.input_Value: ' + state.input_Value);
      // console.log('chatId wth chatHistoryWithId: ' + chatId);
      const newMessage = {
        message_text: state.input_Value,
        chat_id: state.setChat_Id,
        sender_id: '',
        loading: false,
        responce_by: 'user',
      };
      dispatch({
        type: ActionsType.ADD_CHAT,
        payload: newMessage,
      });
      const getData = async () => {
        callOpenApi({
          method: 'POST',
          url: chatUrl,
          data: {
            message: state.input_Value,
            chatId: state.setChat_Id,
          },
        });
      };
      getData();
      dispatch({ type: ActionsType.INPUT_VALUE, payload: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.input_Value]);

  useEffect(() => {
    if (state.messages.length > 0) {
      const latestChatId = state.messages[state.messages.length - 1].chat_id;
      if (latestChatId) {
        dispatch({ type: ActionsType.SET_CHAT_ID, payload: latestChatId });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.messages]);
  // console.log('after chat will empty: ' + state.chat_Id);

  function onSuccess(res: AxiosResponse) {
    // console.log('this is response: ' + JSON.stringify(res));
    if (actionHistoryRef.current === true) {
      dispatch({
        type: ActionsType.SET_CHAT,
        payload: res.data.data.result,
      });
      // setMessages(res.data.data.result);
      actionHistoryRef.current = false;
    }
    const apiResponse = res.data?.data?.result?.response;
    const apiChatId = res.data?.data?.result?.chatId;
    dispatch({ type: ActionsType.SET_CHAT_ID, payload: apiChatId });
    if (apiResponse && apiChatId) {
      const newMessage = {
        message_text: apiResponse,
        chat_id: apiChatId,
        loading: true,
        sender_id: '671516b41bab9066495d96e0',
        responce_by: 'bot',
      };
      dispatch({
        type: ActionsType.ADD_CHAT,
        payload: newMessage,
      });
    }
  }

  function onError(err: AxiosErrorResponseType) {
    console.error('Error response from API:', err);
  }
};

export default useChat;
