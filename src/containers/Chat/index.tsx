import React from 'react';
import Chat from 'containers/Chat/main';
import { useBusinessContext } from 'context/BusinessContext';
import { rolesType } from 'components/Layout/AdminSideBar/constants';
import { ChatContextProvider } from './state';

const ChatContainer: React.FC = () => {
  const { user: { role } = {} } = useBusinessContext();
  if (role !== rolesType.admin) {
    return (
      <ChatContextProvider>
        <Chat />
      </ChatContextProvider>
    );
  }
  return (
    <>
      <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
        Page not found
      </h3>
    </>
  );
};

export default React.memo(ChatContainer);
