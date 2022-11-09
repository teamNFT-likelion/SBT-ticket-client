import React, { forwardRef } from 'react';
import styled from 'styled-components';
import bgRoadmap from '@assets/img/bgRoadmap.png';
import { lg, sm } from '@styles/GlobalStyle';
import Anchor from '@components/atoms/Anchor';
import { Column, Title } from '@components/atoms/wrapper.style';

const Container = styled('div')`
  width: 90%;
  height: calc(100vh - 7.5rem);
  background: url(${bgRoadmap}) no-repeat center;
  background-size: contain;
  justify-content: center;

  ${lg`
    margin: 30px 44px;
    padding: 0;
  `}

  ${sm`
    margin: 0px 33px;
    padding: 0;
  `}
`;


const TitleColumn = styled(Column)`
  white-space: nowrap;
  align-items: 'center';
  margin-top: 15vh;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 50px;
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
