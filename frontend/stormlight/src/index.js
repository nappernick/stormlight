import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import configureStore from './store';

import { fetch, restoreCSRF } from './store/csrf'
import * as sessionActions from "./store/session"
import Modal from "react-modal"

Modal.setAppElement("#root")

const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF()

  window.store = store
  window.csrfFetch = fetch;
  window.sessionActions = sessionActions;
}

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
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
