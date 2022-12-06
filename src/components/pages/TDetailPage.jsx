import React, { useEffect, useState } from 'react';
// import * as colors from '@styles/colors';
// import styled from 'styled-components';
import Layout from '@articles/Layout';
import DetailInfo from '@components/atoms/DetailInfo';
import CategoryNav from '@components/articles/CategoryNav';
import PosterItems from './ticketList/PosterItems';
import { mainItems } from 'src/mock/items';
import { useLocation } from 'react-router-dom';
import verticalLine from '@assets/img/verticalLine.png';
import { parse } from 'query-string';
import { ContentsInfoBody, SelectInfo } from '@styles/ticketDetailStyle';
import TDPCalendar from '@components/atoms/Calendar';
import PartInfoContainer from '@components/articles/PartInfoContainer';
import RemainSeats from '@components/atoms/RemainSeats';
<<<<<<< HEAD
import Page404 from './Page404';
=======
import NullData from './NullData';
import CheckWallet from '@components/wallets/components/CheckWallet';
>>>>>>> c1cc5df (지갑 연결되어있는지 확인)

const TDetailPage = () => {
  const location = useLocation();
  const [partState, setPartState] = useState(0);
  const parsed = parse(location.search);

  const [connect, setConnect] = useState('uninstalled');

  const dataId = parsed.id;

  const data = mainItems.filter((item) => item.id === dataId)[0] || false;

  const checkwallet = CheckWallet();

  let pageComponent;

  useEffect(() => {
    if (
      typeof window.ethereum === 'undefined' &&
      typeof window.klaytn === 'undefined'
    ) {
      setConnect('none');
    } else if (window.ethereum) {
      console.log(window.ethereum._state._isUnlocked);
    } else {
      console.log(window.klaytn._state._isUnlocked);
    }
  }, [connect]);

  if (data && (connect === 'klaytn' || connect === 'ethereum')) {
    pageComponent = (
      <Layout>
        <CategoryNav />
        <DetailInfo dataId={dataId} />
        <ContentsInfoBody>
          <SelectInfo>
            <TDPCalendar />
            <img src={verticalLine} alt="verticalLine" height="260px" />
            <PartInfoContainer data={data} setPartState={setPartState} />
            <img src={verticalLine} alt="verticalLine" height="260px" />
            <RemainSeats partState={partState} dataId={dataId} data={data} />
          </SelectInfo>
        </ContentsInfoBody>
        Relative
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          <PosterItems type="concert" items={mainItems} />
        </div>
        공연정보
        <ContentsInfoBody>
          <img src={data.detailInfoImg} alt="detailInfo" width={'800px'} />
        </ContentsInfoBody>
      </Layout>
    );
  } else if (data) {
    pageComponent = (
      <Layout>
        <CategoryNav />
      </Layout>
    );
  } else {
    pageComponent = <Page404 />;
  }

  return pageComponent;
};

export default TDetailPage;
