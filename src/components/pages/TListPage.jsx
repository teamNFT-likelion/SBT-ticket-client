import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useNavigate } from 'react-router-dom';
import Layout from '@articles/Layout';
import PosterItems from './ticketList/PosterItems';
import BigPoster from './ticketList/BigPoster';
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
import useItems from '@hooks/useItems';

const PageTypeWrapper = styled('div')`
  display: flex;
  align-self: start;
  margin-bottom: 24px;
  font-size: 24px;
`;

const PageTypeText = styled('span')`
  width: 130px;
  font-weight: 300;
  text-align: center;
  cursor: pointer;
  padding-bottom: 12px;
  color: ${({ isActive }) => (isActive ? 'orange' : colors.textWhite)};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid orange' : '0.5px solid gray')};
`;

const TListPage = () => {
  const { type } = useItems();
  const navigate = useNavigate();

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

  return (
    <Layout page="list-page">
      <PageTypeWrapper>
        <PageTypeText isActive={type === 'concert'} onClick={() => navigate('/list')}>
          공연
        </PageTypeText>
        <PageTypeText isActive={type === 'exhibit'} onClick={() => navigate('/list?type=exhibit')}>
          전시
        </PageTypeText>
        <PageTypeText isActive={type === 'sports'} onClick={() => navigate('/list?type=sports')}>
          스포츠
        </PageTypeText>
      </PageTypeWrapper>
      <BigPoster />
      <PosterItems />
    </Layout>
  );
};

export default TListPage;
