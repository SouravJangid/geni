import React, { useMemo, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { StateContextType } from './types';

const doctorsContext = React.createContext<StateContextType | null>(null);

export const DoctorsContextProvider: React.FC<React.PropsWithChildren<{ children?: React.ReactNode }>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <doctorsContext.Provider value={contextValue}>{children}</doctorsContext.Provider>;
};

export const useDoctorsContext = () => {
  const context = React.useContext(doctorsContext);
  if (!context) {
    throw new Error('useDoctorsContext must be used within a DoctorsContextProvider');
  }
  return context;
};
