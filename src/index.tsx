import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';

if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, global-require, @typescript-eslint/no-var-requires
  const worker = require('./tests/handlers/worker');
  void (worker as { default: { start: () => void } }).default.start();
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
