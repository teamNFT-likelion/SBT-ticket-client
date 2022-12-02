import React, { useState } from 'react';
import Layout from '@articles/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { parse } from 'query-string';
import { App1Start } from './payment/App1Start';
import { App2SelectSeats } from './payment/App2SelectSeats';
import { App4Done } from './payment/App4Done';
import { Container } from '@styles/ApaymentStyles';

const APaymentPage = () => {
  // tap 키 저장 state
  const [tab, setTab] = useState('APP_Start');
  const navigate = useNavigate();
  let location = useLocation();

  const parsed = parse(location.search);

  const dataId = parsed.id;
  console.log(tab);
  console.log(location);

  useEffect(() => {
    if (location.state?.tab === 'APP_Done') {
      setTab('APP_Done');
    }
  }, [location]);

  return (
    <Layout page="a-payment-page">
      <Container>
        {tab === 'APP_Start' && <App1Start setTab={setTab} dataId={dataId} />}
        {tab === 'APP_SelectSeats' && (
          <App2SelectSeats setTab={setTab} dataId={dataId} />
        )}
        {tab === 'APP_GetInfo' && navigate('/payment')}
        {tab === 'APP_Done' && <App4Done setTab={setTab} dataId={dataId} />}
      </Container>
    </Layout>
  );
};

export default APaymentPage;
