import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"

import './index.css';

import configureStore from './store';
import App from './App';

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
