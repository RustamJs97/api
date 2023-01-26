import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './root'
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.interceptors.request.use((request) => {
  console.log(request, 'request');
  return request
})
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
)