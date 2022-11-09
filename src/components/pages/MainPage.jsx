import React, { useRef } from 'react';
import Footer from '@articles/Footer';
import { Column } from '@atoms/wrapper.style';
import HeroArea from './main/HeroArea';
import MainHeader from './main/MainHeader';
import SolvingAndProblem from './main/SolvingAndProblem';
import FAQArea from './main/FAQArea';
import TechnologyArea from './main/TechnologyArea';
import RoadmapArea from './main/RoadmapArea';

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
    <Column alignItems="center">
      <MainHeader onNavClick={handleScrollByRef} />
      <HeroArea />
      <SolvingAndProblem ref={goalRef} />
      <TechnologyArea ref={technologyRef} />
      <RoadmapArea ref={roadmapRef} />
      <FAQArea ref={faqRef} />
      <Footer />
    </Column>
  );
};

export default MainPage;
