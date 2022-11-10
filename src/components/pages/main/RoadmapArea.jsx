import React, { forwardRef } from 'react';
import styled from 'styled-components';
import bgRoadmap from '@assets/img/bgRoadmap.png';
import { lg, sm } from '@styles/GlobalStyle';
import Anchor from '@components/atoms/Anchor';
import { Column, Title } from '@components/atoms/wrapper.style';

const Container = styled('div')`
  width: 90%;
  height: 90vh;
  background: url(${bgRoadmap}) no-repeat center;
  background-size: contain;
  justify-content: center;

  ${lg`
    margin: 0px 44px;
    height: 60vh;
  `}

  ${sm`
    margin: 0px 33px;
  `}
`;


const TitleColumn = styled(Column)`
  white-space: nowrap;
  margin-top: 15vh;
  position: relative;
  align-items: center;
  margin: 5rem 0 2rem 0;

  ${sm`
    margin: 5rem 0 0 0;
  `}
`;


const RoadmapArea = forwardRef((props, ref) => {
  return (
    <>
      <TitleColumn>
        <Anchor ref={ref} />
          <Title>ttot Roadmap</Title>
      </TitleColumn>
      <Container />
    </>
  );
});

export default RoadmapArea;
