import React from 'react';
import App from './App';

const AppContainer: React.FC = () => (
  <React.Suspense fallback='loading'>
    <App />
  </React.Suspense>
);

export default AppContainer;
