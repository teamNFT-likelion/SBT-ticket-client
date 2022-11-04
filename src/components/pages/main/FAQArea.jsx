import React, { forwardRef } from 'react';
import styled from 'styled-components';
import CardByToggle from '@articles/CardByToggle';
import Anchor from '../../atoms/Anchor';

const Container = styled('div')`
  position: relative;
  border: 2px solid white;
  padding: 32px;
  display: flex;
  gap: 24px;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
`;

const FAQArea = forwardRef((props, ref) => {
  return (
    <Container>
      <Anchor ref={ref} />
      <span style={{ fontSize: '32px' }}>FREQUENTLY ASKED QUESTIONS</span>
      <CardByToggle
        initialOpen
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, alias!"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cupiditate pariatur itaque nostrum, repudiandae omnis a eum nobis fugiat delectus eveniet nihil eos assumenda, ut, hic dicta atque accusamus reprehenderit."
      />
      <CardByToggle
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, alias!"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cupiditate pariatur itaque nostrum, repudiait."
      />
      <CardByToggle
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, alias!"
        text="Lorem ipnderit."
      />
      <CardByToggle
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, alias!"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cupiditate pariatur itaque nostrum, repudiandae omnis a eum nobis fugiat delectus eveniet nihil eos assumenda, ut, hic dicta atque accusamus reprehenderit Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cupiditate pariatur itaque nostrum, repudiait."
      />
    </Container>
  );
});

export default FAQArea;
