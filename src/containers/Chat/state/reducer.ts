import { ActionsType } from './actions';
import { Actions, StateType } from './types';

export const initialState: StateType = {
  messages: [],
  chat_Id: '',
  input_Value: '',
  setChat_Id: '',
};

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionsType.SET_CHAT:
      return {
        ...state,
        messages: action.payload,
      };
    case ActionsType.ADD_CHAT:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case ActionsType.CHAT_ID:
      return {
        ...state,
        chat_Id: action.payload,
      };
    case ActionsType.SET_CHAT_ID:
      return {
        ...state,
        setChat_Id: action.payload,
      };
    case ActionsType.NEW_CHAT:
      return {
        messages: [],
        chat_Id: '',
        input_value: '',
        setChat_Id: '',
      };
    case ActionsType.INPUT_VALUE:
      return {
        ...state,
        input_Value: action.payload,
      };
    default:
      return state;
  }
};
