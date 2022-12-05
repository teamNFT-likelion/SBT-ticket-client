import React, { useState } from 'react';
import Layout from '@articles/Layout';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { parse } from 'query-string';
import { App1Start } from './payment/App1Start';
import { App2SelectSeats } from './payment/App2SelectSeats';
import { App4Done } from './payment/App4Done';
import { Container } from '@styles/ApaymentStyles';
import { mainItems } from '@mock/items';
import Page404 from './Page404';

const APaymentPage = () => {
  // tap 키 저장 state
  const [tab, setTab] = useState('APP_Start');
  let location = useLocation();

  const parsed = parse(location.search);

  const dataId = parsed.id;
  const data = mainItems.filter((item) => item.id === dataId)[0] || false;

  useEffect(() => {
    const locationTab = location.state?.tab || 'APP_Start';
    setTab(locationTab);
  }, [location]);

  let pageComponent;

  if (data) {
    pageComponent = (
      <Layout page="a-payment-page">
        <Container>
          {tab === 'APP_Start' && <App1Start setTab={setTab} dataId={dataId} />}
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
