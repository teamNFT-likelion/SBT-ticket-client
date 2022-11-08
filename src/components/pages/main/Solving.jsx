import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Column } from '@components/atoms/wrappers.style';

const SubTitle = styled('div')`
  font-weight: 400;
  font-size: 44.8944px;
  line-height: 130%;
  letter-spacing: 0.5px;
  text-align: center;
`;

const LogoText = styled('div')`
  font-family: 'Shrikhand';
  font-style: italic;
  font-weight: 400;
  font-size: 159.805px;
  display: flex;
  align-items: center;
  letter-spacing: 1.42683px;
  color: ${colors.primary40};
`;

const Solving = () => {
  return (
    <Column alignItems="center" marginTop="80px" marginBottom="120px">
      <SubTitle>
        양도불가능한 신원증명 토큰(SBT)으로
        <br /> 2차 티켓 거래를 방지하는 시스템
      </SubTitle>
      <LogoText>ttot</LogoText>
    </Column>
  );
};

export default Solving;
