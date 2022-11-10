import React, { forwardRef } from 'react';
import styled from 'styled-components';
import CardByToggle from '@articles/CardByToggle';
import Anchor from '../../atoms/Anchor';
import { lg, sm } from '@styles/GlobalStyle';
import * as colors from '@styles/colors';
import { Column, Title } from '@components/atoms/wrapper.style';

const Container = styled(Column)`
  align-items: center;
  justify-content: center;
  margin-bottom: 300px;
`;


const ContentsContainer = styled(Column)`
  line-height: 150%;
  font-size: 1.5rem;
  text-align: left;
  margin-top: 3rem;
  overflow: hidden;
  padding: 0.5rem 1.5rem;

  ${lg`
    font-size: 1.4rem;
    padding: 0.5rem 1.4rem;
    margin-top: 1.4rem;
  `}
  ${sm`
    font-size: 1.2rem;
    padding: 0.5rem 1.2rem;
    margin-top: 1.2rem;
  `};
`;

const Ul = styled('ul')`
  padding-left: 20px;
`;

const Li = styled('li')`
  padding-left: 20px;
  color: ${colors.textTertiary};
`;

const Ol = styled('ol')`
  padding-left: 20px;
`;

const TitleColumn = styled(Column)`
  white-space: nowrap;
  margin: 500px 0 6rem 0;
  position: relative;

  ${lg`
    margin: 250px 0 2rem 0 ;
  `}

  ${sm`
    margin: 150px 0 100px0;
  `}
`;

const Q1 = () => {
  return(
        <CardByToggle title="Q1. 예매 방법?">
          <ContentsContainer>
            tott 내 예매 방법은 두 가지 종류가 있습니다.
            <Ul>
              <br />
              <Li>
                👉 일반 예매 : 현금 혹은 코인 결제 시, 로그인한 지갑으로 SBT
                티켓이 발급됩니다.
              </Li>
              <Li>
                👉 팬 사전 예매 : 주최 측에서 정한 콘서트 티켓(이미 사용한
                SBT티켓) 보유 시, 사전 예매 좌석 구매 기회가 제공됩니다.
              </Li>
            </Ul>
          </ContentsContainer>
        </CardByToggle>
  );
};

const Q2 = () => {
  return (
    <CardByToggle title="Q2. 티켓 이용 방법?">
      <ContentsContainer>
        <Ol>
          <Li>0. QR 발행은 모바일에서만 가능</Li>
          <Li>1. '마이페이지'-'구매한 티켓'-'QR 발행하기' 클릭</Li>
          <Li>2. 휴대폰 본인 인증</Li>
          <Li>3. 구매한 티켓의 정보와 본인 인증 정보가 일치할 시, QR 발행</Li>
          <Li>4. 발행된 QR은 당일 현장에서 리더기를 통해 매칭 후 입장 가능</Li>
          <Li>
            5. 부정사용 방지를 위해 두 가지 정책을 따릅니다.
            <Ul>
              <Li>👉10초 마다 QR코드 갱신</Li>
              <Li>👉보안 정책상 캡처 불가</Li>
            </Ul>
          </Li>
        </Ol>
      </ContentsContainer>
    </CardByToggle>
  );
};

const Q3 = () => {
  return (
    <CardByToggle title="Q3. 팬 멤버쉽?">
      <ContentsContainer>
        <Ul>
          <Li>
            👉 팬 래플 시스템을 구축하여 티켓이나 굿즈 등을 이벤트로 제공한다.
          </Li>
          <Li>
            👉 카테고리별 티어 시스템(구매 횟수와 일정 구매 금액별)
            <Ul>
              <Li>🥈실버 : 할인 + 쿠폰 + 적립금</Li>
              <Li>🥇골드 : 할인 + 쿠폰 + 적립금, 관심 콘서트 등록 시 알림.</Li>
              <Li>
                💎플레티넘 : 할인 + 쿠폰 + 적립금, 취소 좌석 알림, 관심 콘서트
                등록 시 알림, (래플 참여권 1개)
              </Li>
            </Ul>
          </Li>
        </Ul>
      </ContentsContainer>
    </CardByToggle>
  );
}


const FAQArea = forwardRef((props, ref) => {
  return (
    <Container>
      <TitleColumn>
        <Anchor ref={ref} />
          <Title>Frequently Asked Questions</Title>
      </TitleColumn>
      <Q1/>
      <Q2/>
      <Q3/>
    </Container>
  );
});

export default FAQArea;
