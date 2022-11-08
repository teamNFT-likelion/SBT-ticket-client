import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Anchor from '@atoms/Anchor';
import Solving from './Solving';
import Problem from './Problem';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  position: relative;
  overflow: hidden;
`;

const SolvingAndProblem = forwardRef((props, ref) => {
  return (
    <Container>
      <Anchor ref={ref} />
      <Solving />
      <Problem />
    </Container>
  );
});

export default SolvingAndProblem;
