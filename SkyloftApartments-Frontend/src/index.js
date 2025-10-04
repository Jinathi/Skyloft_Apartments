// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';  // Update this path
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);