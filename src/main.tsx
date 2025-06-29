import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/main.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import App from '@/pages/App';

const ERROR_MESSAGE = 'Root element not found';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error(ERROR_MESSAGE);
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
