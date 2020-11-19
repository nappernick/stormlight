import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import configureStore from './store';

import { restoreCSRF, fetch } from './store/csrf'

const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF()

  window.store = store
  window.csrfFetch = fetch;
}

const Root = () => {
  return (
    <Provider>
      <Router store={store}>
        <App />
      </Router>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
