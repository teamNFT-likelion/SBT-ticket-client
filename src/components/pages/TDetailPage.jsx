import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import Layout from '@articles/Layout';
import DetailInfo from '@components/atoms/DetailInfo';
import CategoryNav from '@components/articles/CategoryNav';
import { mainItems, restItems } from '@mock/items';
import DateSelection from './tDetail/DateSelection';
import RelatedTickets from './tDetail/RelatedTickets';
import Page404 from './Page404';
import { useResetRecoilState } from 'recoil';
import {
  tDateState,
  tPartState,
  tPriceState,
  tSeatState,
  tDeadlineState,
  tPricePerTokenState,
  tTokenPriceState,
} from '@states/paymentState';

const TDetailPage = () => {
  const location = useLocation();
  const { id: dataId } = parse(location.search);
  const items = [...mainItems, ...restItems];
  const data = items.filter((item) => item.id === dataId)[0] || null;
  const prePossible = location.state;

  const resetTicketDate = useResetRecoilState(tDateState);
  const resetTicketPart = useResetRecoilState(tPartState);
  const resetTicketPrice = useResetRecoilState(tPriceState);
  const resetTicketSeat = useResetRecoilState(tSeatState);
  const resetTicketDeadline = useResetRecoilState(tDeadlineState);
  const resetPricePerToken = useResetRecoilState(tPricePerTokenState);
  const resetTicketTokenPrice = useResetRecoilState(tTokenPriceState);

  useEffect(() => {
    // 예매하다가 팅겨나오면 리셋해줘야댐
    resetTicketDate();
    resetTicketPart();
    resetTicketPrice();
    resetTicketSeat();
    resetTicketDeadline();
    resetPricePerToken();
    resetTicketTokenPrice();
  }, [
    resetTicketDate,
    resetTicketPart,
    resetTicketPrice,
    resetTicketSeat,
    resetTicketDeadline,
    resetPricePerToken,
    resetTicketTokenPrice,
  ]);

  if (!data) {
    return <Page404 />;
  }

  return (
    <Layout>
      <CategoryNav />
      <DetailInfo data={data} />
      <DateSelection data={data} prePossible={prePossible} />
      <RelatedTickets items={items} data={data.preTicketingList} />
      <img src={data.detailInfoImg} alt="detailInfo" width={'900px'} />
    </Layout>
  );
};

export default TDetailPage;
