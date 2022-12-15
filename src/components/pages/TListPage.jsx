import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@articles/Layout';
import PosterItems from './ticketList/PosterItems';
import BigPoster from './ticketList/BigPoster';
import { mainItems } from '@mock/items.js';
import { useResetRecoilState } from 'recoil';
import {
  tDateState,
  tPartState,
  tPriceState,
  tSeatState,
} from '@states/paymentState';

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramType = searchParams.get('type');
  const [type, setType] = useState('concert');

  const resetTicketDate = useResetRecoilState(tDateState);
  const resetTicketPart = useResetRecoilState(tPartState);
  const resetTicketPrice = useResetRecoilState(tPriceState);
  const resetTicketSeat = useResetRecoilState(tSeatState);

  useEffect(() => {
    //TODO: 페이지타입별로 데이터 바꿔 줘야됨 setData 바꿔줘야댐
    if (paramType === null) {
      setType('concert');
    } else if (paramType === 'exhibit' || paramType === 'sports') {
      setType(paramType);
    } else {
      navigate('/list');
    }
  }, [paramType, navigate]);

  useEffect(() => {
    // 예매하다가 팅겨나오면 리셋해줘야댐
    resetTicketDate();
    resetTicketPart();
    resetTicketPrice();
    resetTicketSeat();
  }, [resetTicketDate, resetTicketPart, resetTicketPrice, resetTicketSeat]);

  return (
    <Layout page="list-page">
      <PageTypeWrapper>
        <PageTypeText
          isActive={type === 'concert'}
          onClick={() => navigate('/list')}
        >
          공연
        </PageTypeText>
        <PageTypeText
          isActive={type === 'exhibit'}
          onClick={() => navigate('/list?type=exhibit')}
        >
          전시
        </PageTypeText>
        <PageTypeText
          isActive={type === 'sports'}
          onClick={() => navigate('/list?type=sports')}
        >
          스포츠
        </PageTypeText>
      </PageTypeWrapper>
      <BigPoster type={type} items={mainItems} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <PosterItems type={type} items={mainItems} />
      </div>
    </Layout>
  );
};

export default TListPage;
