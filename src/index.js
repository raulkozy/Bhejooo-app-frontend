import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./i18n";
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import setupAxios from './app/shared/SetupAxios';
import { usePromiseTracker } from 'react-promise-tracker';
import { ThreeDots } from 'react-loader-spinner';

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && 
   <div
     style={{
       width: "100%",
       height: "100",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       position: "absolute",
       top: "400px"
     }}
   >
     <ThreeDots color="#2BAD60" height="100" width="100" />
   </div>
};

setupAxios(axios)

ReactDOM.render(
  <BrowserRouter basename="/bhejoo">
    <App />
    <LoadingIndicator/>
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.unregister();