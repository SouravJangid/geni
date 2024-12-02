import React from 'react';

import AppContainer from './AppContainer';
// console.log(`APP Version : ${process.env.APP_VERSION}`);

import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<AppContainer />);
