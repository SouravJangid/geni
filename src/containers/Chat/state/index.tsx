import React, { useMemo, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { StateContextType } from './types';

const ChatContext = React.createContext<StateContextType | null>(null);

export const ChatContextProvider: React.FC<React.PropsWithChildren<{ children?: React.ReactNode }>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatContextProvider');
  }
  return context;
};
