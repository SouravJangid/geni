import React, { useEffect } from 'react';
import Shell from 'containers/Shell';
import { setupRequestInterceptors } from 'services/config';
import { BusinessContextProvider } from 'context/BusinessContext';

const App: React.FC = React.memo(() => {
  useEffect(() => {
    setupRequestInterceptors();
  }, []);

  return (
    <BusinessContextProvider>
      <Shell />
    </BusinessContextProvider>
  );
});

export default App;
