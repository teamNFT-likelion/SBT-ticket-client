import React from 'react';
import styled from 'styled-components';
import LinkButton from '@atoms/LinkButton';
import { Column, Row } from '@components/atoms/wrapper.style';
import Layout from '@articles/Layout';
import DetailInfo from '@components/atoms/DetailInfo';
import CategoryNav from '@components/articles/CategoryNav';
import PosterItems from './ticketList/PosterItems';
import { mainItems } from 'src/mock/items';
import { useLocation } from 'react-router-dom';


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
  const location = useLocation();
  const dataId= location.state.dataId;

  return (
    <Layout>
      <CategoryNav />
      <DetailInfo dataId={dataId}/>
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
