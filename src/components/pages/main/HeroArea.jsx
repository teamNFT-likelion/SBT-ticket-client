import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import hero_img from '@assets/img/landing_hero.png';
import * as colors from '@styles/colors';
import { APP_HEADER_H } from '@constants/styleConst';

const Container = styled('div')`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  width: 100%;
  height: calc(100vh - ${APP_HEADER_H});
  padding: 0 2.75rem;
  margin-top: ${APP_HEADER_H};
  background: url(${hero_img}) no-repeat center;
  background-size: cover;
`;

const TitleWrapper = styled('div')`
  grid-row: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
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
