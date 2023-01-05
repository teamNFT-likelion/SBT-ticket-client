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
  justify-content: center;
  margin-bottom: 30px;
  font-size: 28px;

  & span:last-child {
    border-right: none;
  }
`;

const PageTypeText = styled('span')`
  border-right: 2px solid white;
  width: 130px;
  text-align: center;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? colors.primary80 : colors.textWhite)};
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <PosterItems />
      </div>
    </Layout>
  );
};

export default TListPage;
