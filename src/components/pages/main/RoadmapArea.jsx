import React, { forwardRef } from 'react';
import styled from 'styled-components';
import bgRoadmap from '@assets/img/bgRoadmap.png';
import { lg, sm } from '@styles/GlobalStyle';
import Anchor from '@components/atoms/Anchor';
import { Column, Title } from '@components/atoms/wrapper.style';


const TitleColumn = styled(Column)`
  white-space: nowrap;
  margin-top: 15vh;
  position: relative;
  align-items: center;
  margin: 500px 0 6rem 0;

  ${lg`
    margin: 250px 0 2rem 0 ;
  `}

  ${sm`
    margin: 150px 0 100px0;
  `}
`;


const RoadmapArea = forwardRef((props, ref) => {
  return (
    <>
      <TitleColumn>
        <Anchor ref={ref} />
          <Title>ttot Roadmap</Title>
      </TitleColumn>
      <img src={bgRoadmap} alt="bgRoadmap" style={{ height: 'auto', width:'80vw'}} />
    </>
  );
});

export default RoadmapArea;
