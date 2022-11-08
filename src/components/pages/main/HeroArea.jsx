import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heroimg from '@assets/img/landing_hero.png';
import * as colors from '@styles/colors';

const Container = styled('div')`
  width: 100%;
  height: calc(100vh - 122px);
  background: url(${heroimg}) no-repeat center;
  background-size: cover;
  display: grid;
  grid-template-rows: repeat(4;1fr);
  flex-direction: column;
  justify-content: center;
  margin-top: 122px;
`;

const TitleWrapper = styled('div')`
  grid-row: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ButtonWrapper = styled('div')`
  grid-row: 4;
  display: flex;
  justify-content: center;
`;

const Title = styled('span')`
  font-family: 'Shrikhand', cursive;
  font-size: 73px;
`;

const Subtitle = styled('span')`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 48px;
  margin-top: 10%;
  letter-spacing: 1.3px;
  text-align: center;
`;

const B = styled(Title)`
  font-size: 154px;
`;

const NextButton = styled(Link)`
  width: 582px;
  height: 124px;
  font-family: 'Shrikhand', cursive;
  font-style: italic;
  font-weight: 400;
  font-size: 55px;
  text-align: center;
  letter-spacing: 2.44906px;
  background: ${colors.bgRed};
  border-radius: 50px;
  opacity: 0.85;
  align-items: center;
  display: flex;
  justify-content: center;
  text-decoration: none;

  &:hover {
    opacity: 1;
  }
`;

const HeroArea = () => {
  return (
    <Container>
      <TitleWrapper>
        <Title>
          <B>t</B>icket<B> </B> <B>to t</B>oken
        </Title>
        <Subtitle>
          Ticketing system to prevent illegal transactions using Web 3.0
        </Subtitle>
      </TitleWrapper>
      <ButtonWrapper>
        <NextButton to="/list">Get Started</NextButton>
      </ButtonWrapper>
    </Container>
  );
};

export default HeroArea;
