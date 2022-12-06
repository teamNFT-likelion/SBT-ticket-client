import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '@articles/ScrollToTop';
import CheckWallet from '@components/wallets/components/CheckWallet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <ScrollToTop />
      <CheckWallet />
      <App />
    </BrowserRouter>
    <ToastContainer theme="dark" />
  </RecoilRoot>,
);
