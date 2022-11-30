import React from 'react';
import styled from 'styled-components';
import LinkButton from '@atoms/LinkButton';
import { Column, Row } from '@components/atoms/wrapper.style';
import Layout from '@articles/Layout';
import DetailInfo from '@components/atoms/DetailInfo';
import CategoryNav from '@components/articles/CategoryNav';
import PosterItems from './ticketList/PosterItems';
import { mainItems } from '@mock/items.js';

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  font-size: 32px;
  flex: 7;
  gap: 4px;
`;
const ContentsInfoBody = styled(Row)`
  // HEADER 높이 5rem + 여분 9rem
  color: white;
  display: flex;
  justify-content: center;
  margin: 5rem;
`;

const ContentsInfo = styled(Column)`
  width: 273px;
  height: 345px;
  border: 3px solid white;
  justify-content: center;
  align-items: center;
`;

const CalenderInfo = styled(Column)`
  display: flex;
  border: 3px solid white;
  width: 300px;
  height: 300px;
`;

const TDetailPage = ({ onNavClick }) => {
  return (
    <Layout>
      <CategoryNav />
      <DetailInfo />
      <ContentsInfoBody>
        <CalenderInfo>달력</CalenderInfo>
        <CalenderInfo>회차정보</CalenderInfo>
        <CalenderInfo>
          잔여석
          <ButtonsWrapper>
            <LinkButton to="/payment" name="결제" />
          </ButtonsWrapper>
        </CalenderInfo>
      </ContentsInfoBody>
      Relative
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {/* TODO: 임시 로 items랑 타입 넘겨줌 아이템에 맞게 수정해야함. 아이템별 url
        접속 고려 해야함 */}
        <PosterItems type="concert" items={mainItems} />
      </div>
      공연정보
      <ContentsInfoBody>
        <ContentsInfo style={{ width: '896px', height: '1541px' }}>
          공연 상세정보 이미지
        </ContentsInfo>
      </ContentsInfoBody>
    </Layout>
  );
};

export default TDetailPage;
