import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/App';
import '@/styles/index.css';
import { store } from '@/store';

const modalRoot = document.createElement('div');
modalRoot.id = 'modal-root';
document.body.append(modalRoot);

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
