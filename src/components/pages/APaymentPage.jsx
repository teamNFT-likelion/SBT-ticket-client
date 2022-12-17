import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Layout from '@articles/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { parse } from 'query-string';
import { App1Start } from './payment/App1Start';
import { App2SelectSeats } from './payment/App2SelectSeats';
import { App4Done } from './payment/App4Done';
import { Container } from '@styles/ApaymentStyles';
import { mainItems } from '@mock/items';
import Page404 from './Page404';
import { userState } from '@states/userState';
import { walletConnectError } from '@utils/toastMessages';
import AppStepHeader from './payment/AppStepHeader';
import App3GetInfoPage from './payment/App3GetInfoPage';

const APaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id: dataId } = parse(location.search);
  const data = mainItems.filter((item) => item.id === dataId)[0] || false;

  const [tab, setTab] = useState('APP_Start');
  const { address } = useRecoilValue(userState);

  useLayoutEffect(() => {
    const locationTab = location.state?.tab || 'APP_Start';
    setTab(locationTab);
  }, [location, navigate, address]);

  useEffect(() => {
    if (!address) {
      walletConnectError();
      navigate(-1);
    }
  }, [address, navigate]);

  if (!data) {
    return <Page404 />;
  }

  return (
    <Layout page="a-payment-page">
      <AppStepHeader step={tab} />
      <Container>
        {tab === 'APP_Start' && <App1Start setTab={setTab} data={data} />}
        {tab === 'APP_SelectSeats' && (
          <App2SelectSeats setTab={setTab} data={data} />
        )}
        {tab === 'APP_GetInfo' && (
          <App3GetInfoPage setTab={setTab} data={data} />
        )}
        {tab === 'APP_Done' && <App4Done dataId={data} />}
      </Container>
    </Layout>
  );
};

export default APaymentPage;
