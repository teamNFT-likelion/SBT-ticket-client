import React, { useState } from 'react';
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
import { useSetRecoilState } from 'recoil';
import { tDateState, tPartState } from '@states/ticketState';

const TDetailPage = () => {
  const location = useLocation();
  const { id: dataId } = parse(location.search);
  const data = mainItems.filter((item) => item.id === dataId)[0] || null;

  const [date, setDate] = useState(new Date());
  const [part, setPart] = useState(0);
  const setTicketDate = useSetRecoilState(tDateState);
  const setTicketPart = useSetRecoilState(tPartState);

  const handleDateChange = (_date) => {
    setDate(_date);
  };

  const handlePartClick = (e) => {
    setPart(Number(e.target.value));
  };

  const handlePaymentClick = () => {
    setTicketDate(date);
    setTicketPart(part);
  };

  let pageComponent;

  if (data) {
    pageComponent = (
      <Layout>
        <CategoryNav />
        <DetailInfo dataId={dataId} />
        <ContentsInfoBody>
          <SelectInfo>
            <TDPCalendar
              dateInfo={data.dateInfo}
              onDateChange={handleDateChange}
              value={date}
            />
            <img src={verticalLine} alt="verticalLine" height="260px" />
            <PartInfoContainer
              dateInfo={data.dateInfo}
              onPartClick={handlePartClick}
              cast={data.cast}
              partState={part}
            />
            <img src={verticalLine} alt="verticalLine" height="260px" />
            <RemainSeatsAndPay
              partState={part}
              dataId={dataId}
              data={data}
              onPaymentClick={handlePaymentClick}
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
