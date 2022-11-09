import React from 'react';
import styled from 'styled-components';
import logo_ttot from '@assets/img/logo_ttot.png';
import * as colors from '@styles/colors';

const Container = styled('div')`
  height: 122px;
  width: 100%;
  align-items: center;
  display: flex;
  padding: 0 20px;
  position: fixed;
  top: 0;
  background-color: ${colors.bgBlack};
  z-index: 999;
`;

const LogoImage = styled('img')`
  width: 100px;
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  margin-left: 24px;
  font-size: 32px;
`;

const Button = styled('button')`
  font-size: 24px;
  font-family: 'Shrikhand', cursive;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.282486px;
  cursor: pointer;
  padding: 1rem;
`;

const MainHeader = ({ onNavClick }) => {
  return (
    <Container>
      <LogoImage src={logo_ttot} />
      <ButtonsWrapper>
        <Button onClick={onNavClick} value="goal">
          PROBLEM &
          <br /> SOLVING
        </Button>
        <Button onClick={onNavClick} value="technology">
          KEY
          <br /> TECHNOLOGY
        </Button>
        <Button onClick={onNavClick} value="roadmap">
          ROAD MAP
        </Button>
        <Button onClick={onNavClick} value="faq">
          FAQ
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

export default MainHeader;
