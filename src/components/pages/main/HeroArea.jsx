import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heroImg from '@assets/img/landing_hero_2.svg';
import * as colors from '@styles/colors';
import { APP_HEADER_H } from '@constants/styleConst';

const Container = styled('div')`
  width: 100%;
  height: calc(100vh - 7.5rem);
  background: url(${heroImg}) no-repeat center;
  background-size: cover;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  padding: 0 2.75rem;
  margin-top: ${APP_HEADER_H};
`;

const TitleWrapper = styled('div')`
  grid-row: 2;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
`;

const Back = styled('div')`
  width: 100%;
  height: 300%;
  border-radius: 20%;
  position: absolute;
  z-index: -3;
  filter: blur(100px);
  background-color: ${colors.primary40};
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
  line-height: 1.6;
`;

const ButtonWrapper = styled('div')`
  grid-row: 6;
  display: flex;
  justify-content: center;
`;

const NextButton = styled(Link)`
  height: 6rem;
  padding: 0 5rem;
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
        <Back />
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
