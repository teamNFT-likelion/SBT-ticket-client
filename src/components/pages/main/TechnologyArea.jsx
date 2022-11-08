import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Anchor from '@atoms/Anchor';
import landing_sbt from '@assets/img/landing_sbt.png';
import { Row } from '@components/atoms/wrappers.style';
import { TitleBold, Title, Desc } from './main.style';
import sbt_1 from '@assets/img/sbt_1.png';
import sbt_2 from '@assets/img/sbt_2.png';
import sbt_3 from '@assets/img/sbt_3.png';
import sbt_4 from '@assets/img/sbt_4.png';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  position: relative;
  padding: 48px;
  margin-top: 120px;
`;

const TechnologyImg = styled('img')`
  width: 100%;
  max-width: 996px;
  height: auto;
  align-self: center;
  margin: 64px 0;
`;

const ImgWrapper = styled('div')`
  flex: 1;
  margin-top: 64px;

  & > img {
    width: 100%;
    height: auto;
  }
`;

const TechnologyArea = forwardRef((props, ref) => {
  return (
    <Container>
      <Anchor ref={ref} />
      <TitleBold>
        SBT (Soul Bound Token) <span style={{ color: 'white' }}>란</span>
      </TitleBold>
      <Title>양도가 불가능한 NFT(Non-Fungible Token) 라고도 말합니다.</Title>
      <Desc marginTop="32px">
        타인에게 지급하거나 판매할 수 없는, 자신의 전자지갑에 완전히 귀속되는
        개념의 토큰을 의미합니다.
      </Desc>
      <Desc>
        SBT는 발행된 후, 처음 발급받은 지갑만이 해당 SBT를 가지고 있을 수
        있습니다.
      </Desc>
      <TechnologyImg src={landing_sbt}></TechnologyImg>
      <Desc>
        당신의 지갑에 특정 SBT를 가지고 있음으로써 (발행 목적에 따라) 자격을
        증명할 수 있습니다.
      </Desc>
      <Desc>
        이런 특성을 이용해 우리는 SBT를 다음과 같은 용도로 사용합니다.
      </Desc>
      <Row gap="56px">
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
      </Row>
    </Container>
  );
});

export default TechnologyArea;
