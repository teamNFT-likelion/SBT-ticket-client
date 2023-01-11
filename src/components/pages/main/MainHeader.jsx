import React from 'react';
import styled, { keyframes } from 'styled-components';
import logo_ttot from '@assets/img/logo_ttot.png';
import * as colors from '@styles/colors';
import { lg } from '@styles/GlobalStyle';
import { APP_HEADER_H } from '@constants/styleConst';
import { APP_MAX_W } from '../../../constants/styleConst';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const borderGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`;

const shine = keyframes`
	from {
		background-position: 0%;
		opacity: 0.9;
	}

	to {
		background-position: 200%;
		opacity: 1;
	}
`;

const Container = styled('div')`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: ${APP_MAX_W}px;
  height: ${APP_HEADER_H};
  padding: 0 2.75rem;
  background-color: ${colors.bgBlack};
  z-index: 999;
  justify-content: space-between;
  border-bottom: solid 1px #2e2e2e;
`;

const LogoImage = styled('img')`
  width: 130px;
  margin-right: 24px;

  ${lg`
    display: none;
  `}
`;

const EnterButton = styled('button')`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  cursor: pointer;
  height: 50px;
  border-radius: 15px;
  padding: 0 30px;
  background-color: ${colors.bgBlack};

  position: relative;

  &:after {
    --borderWidth: 3px;
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(
      60deg,
      #ff770f,
      #c8f53c,
      #a166ab,
      #5073b8,
      #1098ad,
      #f37055,
      #07b39b
    );
    border-radius: 15px;
    z-index: -1;
    animation: ${borderGradient} 3s ease alternate infinite;
    background-size: 300% 300%;
  }
`;

const MainHeader = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <LogoImage src={logo_ttot} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      <EnterButton onClick={() => navigate('/list')}>
        <GradientSectionTitle>ENTER DAPP</GradientSectionTitle>
        <AiOutlineArrowRight />
      </EnterButton>
    </Container>
  );
};

export default MainHeader;

export const textGradient = `linear-gradient(
    90deg,
    #f0d6ef,
    #dae6d1 25.52%,
    #daedd3 50%,
    #d6d6e0 76.04%,
    #edddd3
  );`;

const GradientSectionTitle = styled('span')`
  font-size: 18px;
  font-weight: 700;
  background: ${textGradient};
  background-size: 200% auto;
  background-position: 0%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 4s linear infinite;
`;
