import React from 'react';

export interface StateType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: Message[];
  chat_Id: string;
  input_Value: string;
  setChat_Id: string;
}

export interface StateContextType {
  state: StateType;
  dispatch: React.Dispatch<React.SetStateAction<Actions>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Actions = any;

export interface Message {
  message_text: string;
  sender_id?: string;
  chat_id?: string;
  loading?: boolean;
  _id?: string;
  responce_by?: string ;
}

// export interface Action {
//   type: string;
//   payload?: any;
// }
