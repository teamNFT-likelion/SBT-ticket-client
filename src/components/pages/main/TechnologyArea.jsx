import React from 'react';
import styled from 'styled-components';
import { Row } from '@atoms/wrapper.style';
import sbt_1 from '@assets/img/sbt_1.png';
import sbt_2 from '@assets/img/sbt_2.png';
import sbt_3 from '@assets/img/sbt_3.png';
import sbt_4 from '@assets/img/sbt_4.png';
import landing_sbt from '@assets/img/landing_sbt.png';
import { sm, lg } from '@styles/GlobalStyle';
import { APP_MAX_W } from '@constants/styleConst';
import { TitleBold, Title, Desc } from './main.style';
import Solving from './Solving';
import { BsDot } from 'react-icons/bs';

const Container = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${APP_MAX_W}px;
  padding: 2.75rem;
`;

const TechnologyImg = styled('img')`
  width: 60%;
  max-width: 996px;
  height: auto;
  align-self: center;
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

const Text = styled(Desc)`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;

const TechnologyArea = () => {
  return (
    <Container>
      <Solving />
      <TitleBold>
        SBT (Soul Bound Token) <span style={{ color: 'white' }}>란</span>
      </TitleBold>

      <Title>양도가 불가능한 NFT(Non-Fungible Token) 라고도 말합니다.</Title>
      <div style={{ display: 'flex', marginTop: '1.5rem', gap: '24px' }}>
        <TechnologyImg src={landing_sbt}></TechnologyImg>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          <Text>
            <BsDot />
            SBT는 발행된 후, 처음 발급받은 지갑만이
            <br /> 해당 SBT를 가지고 있을 수 있습니다.
          </Text>
          <Text>
            <BsDot />
            당신의 지갑에 특정 SBT를 가지고 있음으로써 <br />
            (발행 목적에 따라) 자격을 증명할 수 있습니다.
          </Text>
          <Text>
            <BsDot />
            이런 특성을 이용해 우리는 <br />
            SBT를 아래와 같은 용도로 사용합니다.
          </Text>
        </div>
      </div>
      <PurposeWrapper>
        <ImgWrapper>
          <img src={sbt_1} alt="커뮤니티" />
        </ImgWrapper>
        <ImgWrapper>
          <img src={sbt_2} alt="참석 여부 증명" />
        </ImgWrapper>
        <ImgWrapper>
          <img src={sbt_3} alt="학위 증명" />
        </ImgWrapper>
        <ImgWrapper>
          <img src={sbt_4} alt="선거권" />
        </ImgWrapper>
      </PurposeWrapper>
    </Container>
  );
};

export default TechnologyArea;
