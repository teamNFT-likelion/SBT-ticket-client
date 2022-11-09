import React from 'react';
import styled from 'styled-components';
import { Column } from '@atoms/wrapper.style';
import { Title, TitleBold, Desc } from './main.style';
import problem_1_img from '@assets/img/problem_1.png';
import problem_2_img from '@assets/img/problem_2.png';
import problem_3_img from '@assets/img/problem_3.png';
import problem_4_img from '@assets/img/problem_4.png';
import problem_5_img from '@assets/img/problem_5.png';
import problem_6_img from '@assets/img/problem_6.png';
import { lg, sm } from '@styles/GlobalStyle';

const Container = styled(Column)`
  gap: 48px;
`;

const Section = styled(Column)`
  width: 100%;
  padding: 2.75rem;
`;

// TODO: 색변수 지정 및 클래스네임 변경 필요
const ImgContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 100%;
  height: auto;
  padding: 0 3rem;
  margin-top: 56px;

  ${lg`
    margin-top: 40px;
    padding: 0;
  `}

  & > .left-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 43%;
    height: auto;
    border-radius: 40px;
    padding: 1.75rem;

    ${sm`
      display: none;
    `}
  }

  & > .right-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 47%;
    height: auto;
    padding: 1.75rem;
    border: none;
    border-radius: 40px;
    background: rgba(200, 245, 60, 0.1);

    ${sm`
      width: 100%;
    `}
  }
`;

const ProblemImage = styled('img')`
  width: 100%;
  margin-bottom: 47px;
`;

const ProblemDesc = styled('div')`
  width: 100%;
  text-align: center;
  font-size: 22px;
  line-height: 29px;
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
        <ImgContainer>
          <div className="left-box">
            <ProblemImage src={problem_1_img} alt="problem1" />
            <ProblemDesc>
              기존 티켓은
              <br /> 양도가 가능합니다.
            </ProblemDesc>
          </div>
          <div className="right-box">
            <ProblemImage src={problem_2_img} alt="problem1" />
            <ProblemDesc>
              ttot 티켓은
              <br /> 양도가 불가능합니다.
            </ProblemDesc>
          </div>
        </ImgContainer>
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
        <ImgContainer>
          <div className="left-box">
            <ProblemImage src={problem_3_img} alt="problem1" />
            <ProblemDesc>
              기존 티켓은 <br /> 일회성 입니다.
            </ProblemDesc>
          </div>
          <div className="right-box">
            <ProblemImage src={problem_4_img} alt="problem1" />
            <ProblemDesc>
              ttot 티켓은 지갑에 쌓아두고
              <br /> 팬 혜택을 누릴 수 있습니다.
            </ProblemDesc>
          </div>
        </ImgContainer>
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
        <ImgContainer>
          <div className="left-box">
            <ProblemImage src={problem_5_img} alt="problem1" />
            <ProblemDesc>
              기존 티켓은 신분 대조의 과정을 통해
              <br /> 소유권을 증명합니다.
            </ProblemDesc>
          </div>
          <div className="right-box">
            <ProblemImage src={problem_6_img} alt="problem1" />
            <ProblemDesc>
              ttot 티켓은 QR코드로
              <br /> 간편하고 빠르게 소유권을 증명합니다.
            </ProblemDesc>
          </div>
        </ImgContainer>
      </Section>
    </Container>
  );
};

export default Problem;
