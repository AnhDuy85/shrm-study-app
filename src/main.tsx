import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Configure the pdf.js worker before any <Document> renders.
import './lib/pdf';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
