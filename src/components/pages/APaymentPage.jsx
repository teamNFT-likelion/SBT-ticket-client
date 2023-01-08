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
import { mainItems, restItems } from '@mock/items';
import Page404 from './Page404';
import { userState } from '@states/userState';
import { walletConnectError } from '@utils/toastMessages';
import AppStepHeader from './payment/AppStepHeader';
import App3GetInfoPage from './payment/App3GetInfoPage';
import { Outlet } from 'react-router-dom';

const APaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id: dataId } = parse(location.search);
  const items = [...mainItems, ...restItems];
  const data = items.filter((item) => item.id === dataId)[0] || false;

  const [tab, setTab] = useState('APP_Start');
  const { account } = useRecoilValue(userState);

  // 사전예매에 사용하기위해 선택한 inactive 티켓 값 저장
  const [inactiveId, setInactiveId] = useState(0);

  useLayoutEffect(() => {
    const locationTab = location.state?.tab || 'APP_Start';
    setTab(locationTab);
  }, [location, navigate, account]);

  useEffect(() => {
    if (!account) {
      walletConnectError();
      navigate(-1);
    }
  }, [account, navigate]);

  useEffect(() => {
    // TODO: 리코일로 리팩토링해서 paySuccess 에서 처리 하는 방법 고려
    if ((location.pathname = '/payment/success')) {
      setTab('APP_Pay');
    }
  }, [location]);

  if (!data) {
    return <Page404 />;
  }

  return (
    <Layout page="a-payment-page">
      <AppStepHeader step={tab} />
      <Container>
        {tab === 'APP_Start' && (
          <App1Start
            setTab={setTab}
            data={data}
            inactiveId={inactiveId}
            setInactiveId={setInactiveId}
          />
        )}
        {tab === 'APP_SelectSeats' && (
          <App2SelectSeats
            setTab={setTab}
            data={data}
            inactiveId={inactiveId}
            setInactiveId={setInactiveId}
          />
        )}
        {tab === 'APP_GetInfo' && (
          <App3GetInfoPage setTab={setTab} data={data} inactiveId={inactiveId} />
        )}
        {tab === 'APP_Done' && <App4Done dataId={data} inactiveId={inactiveId} />}
        <Outlet context={{ data }} />
      </Container>
    </Layout>
  );
};

export default APaymentPage;
