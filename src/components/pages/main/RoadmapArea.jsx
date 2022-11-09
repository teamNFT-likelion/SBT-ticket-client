import React, { forwardRef } from 'react';
import styled from 'styled-components';
import bgRoadmap from '@assets/img/bgRoadmap.png';
import Anchor from '@components/atoms/Anchor';

const Container = styled('div')`
  width: 100%;
  justify-content: center;
  position: relative;
`;

const RoadmapContainer = styled('div')`
  height: calc(100vh - 300px);
  background: url(${bgRoadmap}) no-repeat center;
  background-size: contain;
`;

const TitleWrapper = styled('div')`
  grid-row: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 52px;
  margin-bottom: 100px;
`;

const Title = styled('span')`
  font-family: 'Shrikhand', cursive;
  font-size: 73px;
`;

const B = styled(Title)`
  font-size: 48.16px;
`;

const RoadmapArea = forwardRef((props, ref) => {
  return (
    <Container>
      <Anchor ref={ref} />
      <TitleWrapper>
        <Title>
          <B>ttot Roadmap</B>
        </Title>
      </TitleWrapper>
      <RoadmapContainer />
    </Container>
  );
});

export default RoadmapArea;
