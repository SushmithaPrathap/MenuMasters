import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import store from './Store/State';


const root = ReactDOM.createRoot(document.getElementById('root'));
//Provide the store to the app, so that all the components can access it
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
