import React from 'react';
import styled from 'styled-components';
import logo_ttot from '@assets/img/logo_ttot.png';
import * as colors from '@styles/colors';
import { lg } from '@styles/GlobalStyle';
import { APP_HEADER_H } from '@constants/styleConst';

const Container = styled('div')`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${APP_HEADER_H};
  padding: 0 2.75rem;
  background-color: ${colors.bgBlack};
  z-index: 999;
`;

const LogoImage = styled('img')`
  width: 130px;
  margin-right: 24px;

  ${lg`
    display: none;
  `}
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  font-size: 32px;
  flex: 7;
`;

const Space = styled('div')`
  flex: 1;

  ${lg`
    display: none;
  `}
`;

const Button = styled('button')`
  font-size: 1.1rem;
  font-family: 'Shrikhand', cursive;
  font-style: italic;
  font-weight: 300;
  letter-spacing: 0.282486px;
  cursor: pointer;
  padding: 0.7em;
`;

const MainHeader = ({ onNavClick }) => {
  return (
    <Container>
      <LogoImage src={logo_ttot} />
      <ButtonsWrapper>
        <Button onClick={onNavClick} value="goal">
          PROBLEM & SOLVING
        </Button>
        <Button onClick={onNavClick} value="technology">
          KEY TECHNOLOGY
        </Button>
        <Button onClick={onNavClick} value="roadmap">
          ROAD MAP
        </Button>
        <Button onClick={onNavClick} value="faq">
          Frequently Asked Questions
        </Button>
      </ButtonsWrapper>
      <Space />
    </Container>
  );
};

export default MainHeader;
