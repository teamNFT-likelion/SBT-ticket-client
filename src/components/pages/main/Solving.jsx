import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Column } from '@components/atoms/wrapper.style';
import { sm } from '../../../styles/GlobalStyle';

const SubTitle = styled('div')`
  font-weight: 400;
  font-size: 36px;
  line-height: 130%;
  letter-spacing: 0.5px;
  text-align: center;

  ${sm`
    font-size: 27px;
  `}
`;

const LogoText = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 2.8rem;
  color: ${colors.primary40};
  font-family: 'Shrikhand';
  font-style: italic;
  font-weight: 400;
  font-size: 120px;
  letter-spacing: 1.42683px;

  ${sm`
    font-size: 90px;
  `}
`;

const Solving = () => {
  return (
    <Column alignItems="center" marginTop="30vh" marginBottom="20vh">
      <SubTitle>
        양도불가능한 신원증명 토큰(SBT)으로
        <br /> 2차 티켓 거래를 방지하는 시스템
      </SubTitle>
      <LogoText>ttot</LogoText>
    </Column>
  );
};

export default Solving;
