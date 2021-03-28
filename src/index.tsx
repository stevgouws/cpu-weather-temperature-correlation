import React from 'react';
import { render } from 'react-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

const container = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

render(container, document.getElementById('root'));
