import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import '@/styles/main.css';
import { Router } from '@/router/Router';

const ERROR_MESSAGE = 'Root element not found';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error(ERROR_MESSAGE);
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
