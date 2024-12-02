import React, { useMemo, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { StateContextType } from './types';

const uploadFileContext = React.createContext<StateContextType | null>(null);

export const UploadFileContextProvider: React.FC<React.PropsWithChildren<{ children?: React.ReactNode }>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <uploadFileContext.Provider value={contextValue}>{children}</uploadFileContext.Provider>;
};

export const useUploadFileContext = () => {
  const context = React.useContext(uploadFileContext);
  if (!context) {
    throw new Error('uploadFileContext must be used within a UploadFileContextProvider');
  }
  return context;
};
