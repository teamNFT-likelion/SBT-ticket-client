import React, { useRef } from 'react';
import styled from 'styled-components';
import HeroArea from './main/HeroArea';
import MainHeader from './main/MainHeader';
import GoalArea from './main/GoalArea';
import FAQArea from './main/FAQArea';
import Footer from '@articles/Footer';
import Anchor from '@atoms/Anchor';

const TempBox = styled('div')`
  border: 2px solid black;
  padding: 32px;
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
  const benefitRef = useRef(null);
  const roadmapRef = useRef(null);
  const faqRef = useRef(null);

  const handleScrollByRef = (e) => {
    const clickedValue = e.target.value;

    let targetRef;
    if (clickedValue === 'goal') targetRef = goalRef.current;
    if (clickedValue === 'benefit') targetRef = benefitRef.current;
    if (clickedValue === 'roadmap') targetRef = roadmapRef.current;
    if (clickedValue === 'faq') targetRef = faqRef.current;

    if (targetRef) targetRef.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    //TODO: 인라인css 리팩토링필요
    <div
      style={{
        backgroundColor: '#FFFFF6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <MainHeader onNavClick={handleScrollByRef} />
      <HeroArea />
      <GoalArea ref={goalRef} />
      <TempBox>
        <Anchor ref={benefitRef} />
        Features and BeneFits
      </TempBox>
      <TempBox>
        <Anchor ref={roadmapRef} />
        Road map
      </TempBox>
      <FAQArea ref={faqRef} />
      <Footer />
    </div>
  );
};

export default MainPage;
