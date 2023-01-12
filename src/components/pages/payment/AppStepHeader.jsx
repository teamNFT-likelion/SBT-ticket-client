import React from 'react';
import * as colors from '@styles/colors';
import styled, { css } from 'styled-components';

const stepInfo = {
  APP_Start: 1,
  APP_SelectSeats: 2,
  APP_GetInfo: 3,
  APP_Pay: 3,
  APP_Done: 4,
};

const AppStepHeader = ({ step }) => {
  return (
    <StepWrapper>
      <Step isActive={step === 'APP_Start'} isCompleted={stepInfo[step] > 1}>
        날짜 / 회차 선택
      </Step>
      <Step isActive={step === 'APP_SelectSeats'} isCompleted={stepInfo[step] > 2}>
        등급 / 좌석 선택
      </Step>
      <Step
        isActive={step === 'APP_GetInfo' || step === 'APP_Pay'}
        isCompleted={stepInfo[step] > 3}
      >
        주문자 정보 / 결제
      </Step>
      <Step isActive={step === 'APP_Done'} isCompleted={stepInfo[step] > 4}>
        결제완료
      </Step>
    </StepWrapper>
  );
};

const StepWrapper = styled('div')`
  color: white;
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  font-size: 20px;
`;

const Step = styled('div')`
  flex: 1;
  color: ${({ isActive }) => (isActive ? `orange` : 'white')};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ isActive }) => (isActive ? `2px solid orange` : `2px solid ${colors.primary40}`)};
  border-radius: 20px;

  ${({ isCompleted }) =>
    isCompleted &&
    css`
      background-color: ${colors.primary40};
      border: none;
    `}
`;

export default AppStepHeader;
