import React, { render } from 'react';
import App from './App.js';
import { StoreProvider } from './utils/store';

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
