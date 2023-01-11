import React from 'react';
import { useScroll, useSpring } from 'framer-motion';
import Footer from '@articles/Footer';
import { Column } from '@atoms/wrapper.style';
import ScrollProgressBar from '@atoms/ScrollProgressBar';
import MainHeader from './main/MainHeader';
import SolvingAndProblem from './main/SolvingAndProblem';
import FAQArea from './main/FAQArea';
import TechnologyArea from './main/TechnologyArea';
import RoadmapArea from './main/RoadmapArea';
import TeamArea from './main/\bTeamArea';

const MainPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 700, damping: 300 });

  return (
    <Column alignItems="center">
      <ScrollProgressBar scaleX={scaleX} />
      <MainHeader />
      <SolvingAndProblem />
      <TechnologyArea />
      <RoadmapArea />
      <FAQArea />
      <TeamArea />
      <Footer />
    </Column>
  );
};

export default MainPage;
