import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./i18n";
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import setupAxios from './app/shared/SetupAxios';

setupAxios(axios)

ReactDOM.render(
  <BrowserRouter basename="/bhejoo">
    <App />
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.unregister();