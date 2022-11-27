import React from 'react';
import styled from 'styled-components';
import LinkButton from '@atoms/LinkButton';
import { Link } from 'react-router-dom';
import { Column, Row } from '@components/atoms/wrapper.style';
import Layout from '@articles/Layout';
import Footer from '@articles/Footer';
import Header from '@articles/Header';

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
const CategoryButtonsWrapper = styled(ButtonsWrapper)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 9rem 0px 4rem 0px;
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

const ContentButton = ({ to = '/', name = '홈으러' }) => {
  return (
    //TODO: 인라인css 리팩토링필요
    <Link to={to}>
      <button
        style={{
          backgroundColor: '#526600',
          color: 'white',
          width: '160px',
          height: '260px',
          fontSize: '20px',
        }}
      >
        {name}
      </button>
    </Link>
  );
};

const TDetailPage = ({ onNavClick }) => {
  return (
    <Layout>
      <CategoryButtonsWrapper>
        <LinkButton to="/list" name="공연" />
        <LinkButton to="/list" name="전시" />
        <LinkButton to="/list" name="스포츠" />
      </CategoryButtonsWrapper>
      <ContentsInfoBody>
        <ContentsInfo>Info</ContentsInfo>
        <ContentsInfo>Poster</ContentsInfo>
      </ContentsInfoBody>
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
      <ContentsInfoBody style={{ gap: '10px' }}>
        <ContentButton to="/list" name="1번" />
        <ContentButton to="/list" name="2번" />
        <ContentButton to="/list" name="3번" />
        <ContentButton to="/list" name="4번" />
        <ContentButton to="/list" name="5번" />
      </ContentsInfoBody>
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
