import React, { useRef } from 'react';
import styled from 'styled-components';
import HeroArea from './main/HeroArea';
import MainHeader from './main/MainHeader';
import SolvingAndProblem from './main/SolvingAndProblem';
import FAQArea from './main/FAQArea';
import Footer from '@articles/Footer';
import Anchor from '@atoms/Anchor';
import TechnologyArea from './main/TechnologyArea';
import * as colors from '@styles/colors';
import RoadmapArea from './main/RoadmapArea';

const TempBox = styled('div')`
  border: 2px solid yellow;
  padding: 48px;
  display: flex;
  gap: 24px;
  flex-direction: column;
  height: 500px;
  font-size: 32px;
  max-width: 1350px;
  width: 100%;
  position: relative;
`;

const MainPage = () => {
  const goalRef = useRef(null);
  const technologyRef = useRef(null);
  const roadmapRef = useRef(null);
  const faqRef = useRef(null);

  const handleScrollByRef = (e) => {
    const clickedValue = e.target.value;

    let targetRef;
    if (clickedValue === 'goal') targetRef = goalRef.current;
    if (clickedValue === 'technology') targetRef = technologyRef.current;
    if (clickedValue === 'roadmap') targetRef = roadmapRef.current;
    if (clickedValue === 'faq') targetRef = faqRef.current;

    if (targetRef) targetRef.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    //TODO: 인라인css 리팩토링필요
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <MainHeader onNavClick={handleScrollByRef} />
      <HeroArea />
      <SolvingAndProblem ref={goalRef} />
      <TechnologyArea ref={technologyRef} />
      <RoadmapArea ref={roadmapRef}/>
      <FAQArea ref={faqRef} />
      <Footer />
    </div>
  );
};

export default MainPage;
