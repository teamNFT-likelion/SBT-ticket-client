import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heroimg from '@assets/img/landing_hero.png';
import * as colors from '@styles/colors';

const Container = styled('div')`
  width: 100%;
  height: calc(100vh - 7.5rem);
  background: url(${heroimg}) no-repeat center;
  background-size: cover;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  flex-direction: column;
  justify-content: center;
  margin-top: 7.5rem;
`;

const TitleWrapper = styled('div')`
  grid-row: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 2rem;
`;

const Title = styled('span')`
  font-family: 'Shrikhand', cursive;
  font-size: 4.5rem;
  text-align: center;
`;

const B = styled(Title)`
  font-size: 7.25rem;
`;

const Subtitle = styled('span')`
  grid-row: 4;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 2rem;
  letter-spacing: 1.3px;
  text-align: center;
  padding: 0 2rem;
`;

const ButtonWrapper = styled('div')`
  grid-row: 6;
  display: flex;
  justify-content: center;
`;

const NextButton = styled(Link)`
  width: 27rem;
  height: 6rem;
  font-family: 'Shrikhand', cursive;
  font-style: italic;
  font-weight: 400;
  font-size: 2.5rem;
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
      </TitleWrapper>
      <Subtitle>
        Ticketing system to prevent illegal transactions using Web 3.0
      </Subtitle>
      <ButtonWrapper>
        <NextButton to="/list">Get Started</NextButton>
      </ButtonWrapper>
    </Container>
  );
};

export default HeroArea;
