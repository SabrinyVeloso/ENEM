import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { PlannerProvider } from './context/PlannerContext';
import './styles/index.css';

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlannerProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </PlannerProvider>
  </React.StrictMode>
);