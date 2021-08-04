import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './ApiClient';
import reportWebVitals from './reportWebVitals';
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';

import { routes } from './routes';
import { stores } from './stores';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <Router history={history}>{renderRoutes(routes)}</Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
