import React from 'react';
import styled from 'styled-components';
import bgRoadmap from '@assets/img/bgRoadmap.png';
import { Title } from '@components/atoms/wrapper.style';
import { APP_MAX_W } from '@constants/styleConst';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${APP_MAX_W}px;
  padding: 2.75rem;
  margin-top: 80px;
  align-items: center;
`;

const RoadmapArea = () => {
  return (
    <Container>
      <Title>ttot Roadmap</Title>
      <img
        src={bgRoadmap}
        alt="bgRoadmap"
        style={{ height: 'auto', width: '100%', marginTop: '32px' }}
      />
    </Container>
  );
};

export default RoadmapArea;
