import React from 'react';
import styled from 'styled-components';
import { Row } from '@atoms/wrapper.style';
import ydKim from '@assets/img/ydKim.png';
import siOh from '@assets/img/siOh.png';
import dyKim from '@assets/img/dyKim.png';
import heOk from '@assets/img/heOk.png';
import { sm, lg } from '@styles/GlobalStyle';
import { APP_MAX_W } from '@constants/styleConst';
import { Title } from '@components/atoms/wrapper.style';

const Container = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${APP_MAX_W}px;
  padding: 2.75rem;
  margin-top: 80px;
`;

const PurposeWrapper = styled(Row)`
  gap: 56px;
  margin-top: 4rem;

  ${lg`
    gap: 20px;
  `};

  ${sm`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  `};
`;

const ImgWrapper = styled('div')`
  flex: 1;

  & > img {
    width: 100%;
    height: auto;
  }
`;

const TeamArea = () => {
  return (
    <Container>
      <Title>Team NFT</Title>

      <PurposeWrapper>
        <ImgWrapper>
          <img src={ydKim} alt="ydkim" />
        </ImgWrapper>
        <ImgWrapper>
          <img src={siOh} alt="sioh" />
        </ImgWrapper>
        <ImgWrapper>
          <img src={dyKim} alt="dykim" />
        </ImgWrapper>
        <ImgWrapper>
          <img src={heOk} alt="heok" />
        </ImgWrapper>
      </PurposeWrapper>
    </Container>
  );
};

export default TeamArea;
