import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ThemeProvider } from './context/ThemeContext';

import './utils/i18n';


import favicon from './assets/images/projects/Logo AV.png';


const link = document.createElement('link');
link.rel = 'icon';
link.href = favicon;
document.head.appendChild(link);

// Ensure page always starts at top on load/refresh
try {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
} catch {}

// Clarity now injected via official snippet in index.html


// Service worker is now handled automatically by vite-plugin-pwa

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
        <App />
    </ThemeProvider>
  </React.StrictMode>
);
