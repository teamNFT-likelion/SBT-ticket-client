import React, { forwardRef } from 'react';
import styled from 'styled-components';
import CardByToggle from '@articles/CardByToggle';
import Anchor from '../../atoms/Anchor';

const Container = styled('div')`
  position: relative;
  padding: 32px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
`;

const TitleWrapper = styled('div')`
  grid-row: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 70px 100px;
  white-space: nowrap;
  
`;

const Title = styled('span')`
  font-family: 'Shrikhand', cursive;
  font-size: 72px;
`;

const B = styled(Title)`
  font-size: 48.16px;
`;

const FAQArea = forwardRef((props, ref) => {
  return (
    <Container>
      <Anchor ref={ref} />
      <TitleWrapper>
        <Title>
          <B>Frequently Asked Question</B>
        </Title>
      </TitleWrapper>
      <CardByToggle
        initialOpen
        title="Q1. 예매 방법?"
        text={
          <div>
            tott 내 예매 방법은 두 가지 종류가 있습니다.
            <ul>
              <br />
              <li>
                &emsp; 👉 일반 예매 : 현금 혹은 코인 결제 시, 로그인한 지갑으로
                SBT 티켓이 발급됩니다.
              </li>
              <li>
                &emsp; 👉 팬 사전 예매 : 주최 측에서 정한 콘서트 티켓(이미
                사용한 SBT티켓) 보유 시, 사전 예매 좌석 구매 기회가 제공됩니다.
              </li>
            </ul>
          </div>
        }
      />
      <CardByToggle
        title="Q2. 티켓 이용 방법?"
        text={
          <div>
            <ol>
              <li>0. QR 발행은 모바일에서만 가능</li>
              <li>1. 마이페이지-구매한 티켓-QR 발행하기 버튼 클릭</li>
              <li>2. 휴대폰 본인 인증</li>
              <li>
                3. 구매한 티켓의 정보와 본인 인증 정보가 일치할 시, QR 발행
              </li>
              <li>
                4. 발행된 QR은 당일 현장에서 리더기를 통해 매칭 후 입장 
                가능
              </li>
              <li>
                5. 부정사용 방지를 위해 두 가지 정책을 따른다.
                <ul>
                  <li>&emsp; 👉10초 마다 QR코드 갱신</li>
                  <li>&emsp; 👉어쩌구 이번</li>
                </ul>
              </li>
            </ol>
          </div>
        }
      />
      <CardByToggle
        title="Q3. 팬 멤버쉽?"
        text={
          <div>
            <ul>
              <li>
                👉 팬 래플 시스템을 구축하여 티켓이나 굿즈 등을 이벤트로
                제공한다.
              </li>
              <li>
                <ul>
                  👉 카테고리별 티어 시스템(구매 횟수와 일정 구매 금액별)
                  <li>&emsp; =>🥈실버 : 할인 + 쿠폰 + 적립금</li>
                  <li>
                    &emsp; =>🥇골드 : 할인 + 쿠폰 + 적립금, 관심 콘서트 등록 시
                    알림.
                  </li>
                  <li>
                    &emsp; =>💎플레티넘 : 할인 + 쿠폰 + 적립금, 취소 좌석 알림,
                    관심 콘서트 등록 시 알림, (래플 참여권 1개)
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        }
      />
    </Container>
  );
});

export default FAQArea;
