import * as React from 'react';
import { render } from 'preact';
import App from './App';
import { StoreProvider } from './utils/store';

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
