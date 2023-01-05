import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Column } from '@components/atoms/wrapper.style';
import { sm } from '@styles/GlobalStyle';

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

const Title = styled('span')`
  font-family: 'Shrikhand', cursive;
  font-size: 4rem;
  text-align: center;
  color: ${colors.primary40};
  margin-bottom: 24px;

  & .logo-ko {
    font-size: 1.85rem;
    font-weight: 100;
  }
`;

const B = styled(Title)`
  font-size: 7rem;
`;

const Solving = () => {
  return (
    <Column alignItems="center" marginBottom="140px" marginTop="80px">
      <Title>
        <B>t</B>icket<B> </B> <B>to t</B>oken &nbsp;<span className="logo-ko">[ 또트 ]</span>
      </Title>
      <SubTitle>: 양도불가능한 신원증명 토큰(SBT)으로 2차 거래를 방지하는 플랫폼입니다.</SubTitle>
    </Column>
  );
};

export default Solving;
