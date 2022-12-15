import React, { useState } from 'react';
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
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '@states/userState';
import { walletConnectError } from '@utils/toastMessages';
import AppStepHeader from './payment/AppStepHeader';
import { tDateState, tPartState } from '@states/ticketState';

const APaymentPage = () => {
  // tap 키 저장 state
  const [tab, setTab] = useState('APP_Start');
  const location = useLocation();
  const navigate = useNavigate();

  const parsed = parse(location.search);

  const dataId = parsed.id;
  const data = mainItems.filter((item) => item.id === dataId)[0] || false;
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

  let pageComponent;

  if (data) {
    pageComponent = (
      <Layout page="a-payment-page">
        <AppStepHeader step={tab} />
        <Container>
          {tab === 'APP_Start' && <App1Start setTab={setTab} data={data} />}
          {tab === 'APP_SelectSeats' && (
            <App2SelectSeats setTab={setTab} dataId={dataId} />
          )}
          {tab === 'APP_Done' && <App4Done setTab={setTab} dataId={dataId} />}
        </Container>
      </Layout>
    );
  } else {
    pageComponent = <Page404 />;
  }

  return pageComponent;
};

export default APaymentPage;
