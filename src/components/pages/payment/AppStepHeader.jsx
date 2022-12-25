import React from 'react';
import * as colors from '@styles/colors';
import styled from 'styled-components';

const AppStepHeader = ({ step }) => {
  return (
    <StepWrapper>
      <Step isActive={step === 'APP_Start'}>날짜 / 회차 선택</Step>
      <Step isActive={step === 'APP_SelectSeats'}>등급 / 좌석 선택</Step>
      <Step isActive={step === 'APP_GetInfo' || step === 'APP_Pay'}>주문자 정보 / 결제</Step>
      <Step isActive={step === 'APP_Done'}>결제완료</Step>
    </StepWrapper>
  );
};

const StepWrapper = styled('div')`
  color: white;
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  margin-bottom: 40px;
  gap: 10px;
  font-size: 20px;
`;

const Step = styled('div')`
  flex: 1;
  background-color: ${({ isActive }) => (isActive ? 'orange' : colors.primary40)};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default AppStepHeader;
