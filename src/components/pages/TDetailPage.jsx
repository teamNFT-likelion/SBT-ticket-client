import React, { useState } from 'react';
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
import RemainSeatsAndPay from '@components/atoms/RemainSeatsAndPay';
import Page404 from './Page404';

const TDetailPage = () => {
  const location = useLocation();
  const [partState, setPartState] = useState(0);
  const parsed = parse(location.search);
  const dataId = parsed.id;

  const data = mainItems.filter((item) => item.id === dataId)[0] || false;

  let pageComponent;

  if (data) {
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
            <RemainSeatsAndPay
              partState={partState}
              dataId={dataId}
              data={data}
            />
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
  } else {
    pageComponent = <Page404 />;
  }

  return pageComponent;
};

export default TDetailPage;
