import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { PlannerProvider } from './context/PlannerContext';
import './styles/index.css';
import ErrorBoundary from './components/ErrorBoundary';

if (import.meta.env.PROD) {
  const manifestLink = document.createElement('link');
  manifestLink.rel = 'manifest';
  manifestLink.href = `${import.meta.env.BASE_URL}manifest.webmanifest`;
  document.head.appendChild(manifestLink);
}

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlannerProvider>
      <ErrorBoundary>
        <HashRouter>
          <App />
        </HashRouter>
      </ErrorBoundary>
    </PlannerProvider>
  </React.StrictMode>
);