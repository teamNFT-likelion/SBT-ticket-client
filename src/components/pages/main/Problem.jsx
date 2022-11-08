import React from 'react';
import styled from 'styled-components';
import { Column } from '@components/atoms/wrappers.style';
import { Title, TitleBold, Desc } from './main.style';

const Container = styled(Column)`
  gap: 48px;
`;

const Section = styled(Column)`
  width: 100%;
  padding: 48px;
`;

// TODO: 색변수 지정 및 클래스네임 변경 필요
const ImgsWrapper = styled('div')`
  width: 1165px;
  height: 443px;
  align-self: center;
  display: flex;
  justify-content: space-between;
  margin-top: 68px;

  & > .img-box {
    width: 535px;
    height: 443px;
    border: 2px solid white;
    border-radius: 40px;
  }

  & > .bg-primary {
    background: rgba(200, 245, 60, 0.1);
    border: none;
  }
`;

const Problem = () => {
  return (
    <Container>
      <Section>
        <Column>
          <Title>위변조 및 2차 거래를 방지하는</Title>
          <TitleBold>SBT 티켓</TitleBold>
          <Desc>
            SBT(Soul Bound Token)은 출처 및 개인정보를 담아 발행한 NFT입니다.
          </Desc>
          <Desc>양도가 불가능하여 인증수단으로 사용될 수 있습니다.</Desc>
        </Column>
        <ImgsWrapper>
          <div className="img-box"></div>
          <div className="img-box bg-primary"></div>
        </ImgsWrapper>
      </Section>
      <Section>
        <Column>
          <Title>티켓을 간직하고 팬심을 증명할 수 있는 </Title>
          <TitleBold>Blockchain 지갑</TitleBold>
          <Desc>
            지갑에 티켓들을 보관하고, 쌓인 티켓으로 당신의 팬심을 증명해보세요.
          </Desc>
          <Desc>팬이 아닌 이들과 차별화된 혜택을 누릴 수 있습니다.</Desc>
        </Column>
        <ImgsWrapper>
          <div className="img-box"></div>
          <div className="img-box bg-primary"></div>
        </ImgsWrapper>
      </Section>
      <Section>
        <Column>
          <Title>빠르고 정확한 증명을 가능하게 하는</Title>
          <TitleBold>QR코드 시스템</TitleBold>
          <Desc>
            QR 코드는 빠른 인식 속도, 높은 정확도를 가지며, 많은 용량의 정보를
            담을 수 있습니다.
          </Desc>
          <Desc>
            SBT 티켓 사용 시 복잡한 신분대조 없이 빠르게 입장할 수 있습니다.
          </Desc>
        </Column>
        <ImgsWrapper>
          <div className="img-box"></div>
          <div className="img-box bg-primary"></div>
        </ImgsWrapper>
      </Section>
    </Container>
  );
};

export default Problem;
