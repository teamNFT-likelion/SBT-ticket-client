import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '@styles/colors';
import bgRoadmap from '@assets/img/bgRoadmap.png';

const Container = styled('div')`
  width: 100%;
  justify-content: center;
  margin-top: 100px;
`;

const RoadmapContainer = styled('div')`
  height: calc(100vh - 122px);
  background: url(${bgRoadmap}) no-repeat center;
  background-size: contain;
  margin-top: 100px;
`;

const TitleWrapper = styled('div')`
  grid-row: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled('span')`
  font-family: 'Shrikhand', cursive;
  font-size: 73px;
`;

const B = styled(Title)`
  font-size: 48.16px;
`;

const RoadmapArea = () => {
  return (
    <Container>
      <TitleWrapper>
        <Title>
          <B>ttot Roadmap</B>
        </Title>
      </TitleWrapper>
      <RoadmapContainer />
    </Container>
  );
};

export default RoadmapArea;
