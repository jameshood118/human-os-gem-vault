import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// Physical Layer Handshake: Mounting the Human OS into the 'root' DOM node
const container = document.getElementById('root');

if (!container) {
  throw new Error(
    "Critical System Error: 'root' container not found. The physical DOM is missing its anchor.",
  );
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
