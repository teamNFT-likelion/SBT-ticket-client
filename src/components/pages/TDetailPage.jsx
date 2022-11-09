import React from 'react';
import Header from '@articles/Header';
import LinkButton from '@atoms/LinkButton';
import { TempWrapper } from '../atoms/wrapper.style';

const TDetailPage = () => {
  return (
    <TempWrapper>
      <div>티켓상세페이지~</div>
      <Header />
      <LinkButton to="/list" name="카테고리" />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{ border: '2px solid white', width: '50%', height: '500px' }}
        >
          공연상세 셜명
        </div>
        <LinkButton to="/payment" name="결제" />
      </div>
    </TempWrapper>
  );
};

export default TDetailPage;
