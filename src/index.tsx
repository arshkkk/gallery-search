import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './styles/build.css';
import {BrowserRouter} from 'react-router-dom';

require('dotenv').config();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
