import React, { forwardRef } from 'react';
import styled from 'styled-components';
import bgRoadmap from '@assets/img/bgRoadmap.png';
import { lg, sm } from '@styles/GlobalStyle';
import Anchor from '@components/atoms/Anchor';
import { Column } from '@components/atoms/wrapper.style';

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

const TitleWrapper = styled('div')`
  grid-row: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 50px;
`;

const Title = styled('span')`
  font-family: 'Shrikhand', cursive;
  font-size: 73px;
`;

const RoadmapArea = forwardRef((props, ref) => {
  return (
    <>
      <Column alignItems="center" marginTop="15vh">
        <Anchor ref={ref} />
        <TitleWrapper>
          <Title>ttot Roadmap</Title>
        </TitleWrapper>
      </Column>
      <Container />
    </>
  );
});

export default RoadmapArea;
