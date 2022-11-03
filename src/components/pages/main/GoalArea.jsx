import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Anchor from '../../atoms/Anchor';

const Container = styled('div')`
  border: 2px solid black;
  padding: 32px;
  display: flex;
  gap: 24px;
  flex-direction: column;
  max-width: 1350px;
  position: relative;
`;

const TempBox = styled('div')`
  border: 2px solid black;
  height: 300px;
  width: 40%;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: 0.5s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 0px 15px rgb(0 0 0 / 7%);
  }
`;

const GoalArea = forwardRef((props, ref) => {
  return (
    //TODO: 인라인css 리팩토링필요
    <Container>
      <Anchor ref={ref} />
      <div
        className="hover-test"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <TempBox>
          암표거래에서 붙는 프리미엄으로 인한 브랜드 및 아티스트 가치 하락
        </TempBox>
        <TempBox>SBT를 이용한 암표 거래 방지 시스템 有</TempBox>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TempBox>티켓의 단발성</TempBox>
        <TempBox>
          SBT 티켓이 쌓임으로써 팬 인증, 그에 따른 베네핏도 부여됨
        </TempBox>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TempBox>티켓 위변조 및 매크로 방지</TempBox>
        <TempBox>디지털 티켓 QR로 발행, 유효기간 짧고 위변조 어려움</TempBox>
      </div>
    </Container>
  );
});

export default GoalArea;
