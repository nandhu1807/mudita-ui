import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { sagaMiddleware } from './client/utils/shared/store';
import saga from './client/sagas/saga';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

sagaMiddleware.run(saga);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();
