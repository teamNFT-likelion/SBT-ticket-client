import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Anchor from '../../atoms/Anchor';
import bgRoadmap from '@assets/img/bgRoadmap.png';

const Container = styled('div')`
  border: 2px solid white;
  display: flex;
  gap: 24px;
  flex-direction: column;
  max-width: 1350px;
  position: relative;
  width: 100%;
`;

const ImageContainer = styled.div`
  max-width: 100%;
  height: 100%;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: ${(props) => `url(${props.imgUrl})`};
  background-size: cover;
  background-position: 50% 50%;
  position: relative;

  flex-shrink: 0;
  overflow: hidden;
`;

const TempBox = styled('div')`
  border: 2px solid white;
  height: 290px;
  width: 342px;
  font-size: 32px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: 0.5s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 0px 15px rgb(0 0 0 / 7%);
  }
`;



const RoadmapArea = forwardRef((props, ref) => {
  return (
    //TODO: 인라인css 리팩토링필요
    <Container>
      이미지 컨테이너바깥
      <ImageContainer imgUrl={bgRoadmap}>
        <TempBox>아니도대체왜안되는건데?</TempBox>
      </ImageContainer>
    </Container>
  );
});

export default RoadmapArea;
