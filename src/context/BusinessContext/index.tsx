/* eslint-disable @typescript-eslint/no-empty-object-type */
import usePersistState from 'hooks/usePersistState';
import React, { createContext, useEffect } from 'react';
import { removeHeader, setHeader } from 'services/config';

interface UserTypeProps {
  code: number | string;
  _id: string;
  token: string;
  role: string;
  email: string;
  userName: string;
  fullName: string;
  userType: string;
}

interface BusinessContextProps {
  user: Partial<UserTypeProps>;
  setUser: React.Dispatch<React.SetStateAction<Partial<UserTypeProps>>>;
}

export const BusinessContext = createContext<BusinessContextProps>({} as BusinessContextProps);

const BusinessContextProvider: React.FC<{ children: React.ReactElement }> = React.memo(({ children }) => {
  const [user, setUser] = usePersistState('user', {});
  const [isLoding, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  useEffect(() => {
    if (user?.token) {
      setHeader('Authorization', `bearer ${user?.token}`);
    } else {
      removeHeader('Authorization');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token, isLoding]);

  if (isLoding) {
    return <div>Loading...</div>;
  }

  return <BusinessContext.Provider value={{ user, setUser }}>{children}</BusinessContext.Provider>;
});

const useBusinessContext = (): BusinessContextProps => {
  const context = React.useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('Failed to load the context');
  }
  return context;
};

export { BusinessContextProvider, useBusinessContext };
