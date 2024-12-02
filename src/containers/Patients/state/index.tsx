import React, { useMemo, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { StateContextType } from './types';

const patientsContext = React.createContext<StateContextType | null>(null);

export const PatientsContextProvider: React.FC<React.PropsWithChildren<{ children?: React.ReactNode }>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <patientsContext.Provider value={contextValue}>{children}</patientsContext.Provider>;
};

export const usePatientsContext = () => {
  const context = React.useContext(patientsContext);
  if (!context) {
    throw new Error('usePatientsContext must be used within a PatientsContextProvider');
  }
  return context;
};
